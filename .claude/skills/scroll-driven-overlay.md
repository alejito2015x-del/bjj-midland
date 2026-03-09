# Skill: Scroll-Driven Sections with Stacked Overlay Transitions

## What this skill builds

A sequence of full-screen sections where:
1. Each section **locks the page scroll** and uses wheel/touch input to scrub through a frame-by-frame animation (image sequence or video).
2. When the animation completes, scroll is **released** and the next section **rises from below** with rounded top corners, sliding over the current section like a card stack.
3. Scrolling **back up** reverses the transition cleanly: the upper card slides down, the lower section stays pinned, then the scroll-driven animation replays in reverse.

---

## Stack

- **Next.js** (App Router, `"use client"`)
- **Framer Motion** (`useScroll`, `useTransform`, `useMotionValue`, `useMotionValueEvent`)
- No additional libraries needed

---

## Core Architecture

### Layout structure (per section)

```
<div ref={containerRef} style={{ height: `${scrollHeightVh}vh` }}>   ← scroll range
  <motion.div style={{ position: "sticky", top: 0, height: "100vh", y: exitY }}>
    {/* media + overlay + text content */}
  </motion.div>
</div>
```

The container creates the scroll room. The inner `motion.div` sticks to the top of the viewport while the container scrolls. Three scroll-driven values are layered onto that motion.div:

| Value | Framer offset | Purpose |
|---|---|---|
| `entryOpacity` / `entryScale` | `["start end", "start start"]` | Fade + scale in as section rises from below |
| `exitY` | `["end end", "end start"]` | Pin section in place while the next one slides over it |
| `scrollYProgress` (virtual) | virtual wheel scrub | Drives frame index / video time |

---

## The Three Key Mechanisms

### 1. Entry animation

Fires while the section is still below the viewport (before sticky activates).

```ts
const { scrollYProgress: entryProgress } = useScroll({
  target: containerRef,
  offset: ["start end", "start start"],
  // 0 = container top at viewport bottom (just entering)
  // 1 = container top at viewport top   (sticky just activated)
});

const entryOpacity = useTransform(entryProgress, [0, 1], [0.82, 1]);
const entryScale   = useTransform(entryProgress, [0, 1], [0.98, 1]);
```

Apply to the sticky `motion.div` via `style={{ opacity: entryOpacity, scale: entryScale }}`.

For the card-stack look, add on the motion.div when `roundedTop` is true:
```ts
clipPath: "inset(0 round 28px 28px 0px 0px)",
boxShadow: "0 -32px 80px rgba(0,0,0,0.9)",
```

---

### 2. Exit pin (exitY) — CRITICAL

After the scroll lock completes and the user continues scrolling, the sticky constraint breaks. Without compensation the section immediately scrolls off the top. `exitY` cancels that drift, keeping the section visible while the next one rises over it.

**Math**: sticky breaks when `scrollY = containerTop + (containerHeight - viewportHeight)`. After that, the element drifts upward at 1px per scroll px. `exitY` counteracts exactly that.

```ts
const { scrollYProgress: exitProgress } = useScroll({
  target: containerRef,
  offset: ["end end", "end start"],
  // 0 = container bottom at viewport bottom (sticky just broke)
  // 1 = container bottom at viewport top   (section fully gone)
});

const exitY = useTransform(exitProgress, [0, 1], ["0vh", "100vh"]);
```

Apply as `y: exitY` on the same sticky `motion.div`.

The `"end end" → "end start"` range covers exactly 100vh of scroll — the same distance the sticky element would drift upward — so `exitY = 100vh` at the end perfectly cancels it.

---

### 3. Virtual scroll lock

The lock intercepts wheel/touch/keyboard events, prevents native scroll, and maps accumulated delta to a `scrollYProgress` value (0→1) that drives the animation.

```ts
// Module-level: coordinates lock across multiple sections on the same page
let activeScrollScrubOwner: string | null = null;
```

#### shouldCaptureSection — THE KEY GUARD

```ts
const shouldCaptureSection = () => {
  const rect = container.getBoundingClientRect();
  const margin = 80; // px from viewport top
  return rect.top <= margin && rect.bottom > window.innerHeight;
};
```

**Critical**: use `rect.bottom > window.innerHeight`, NOT `rect.bottom > 0`.

- `> 0` fires during the exit phase (the 100vh transition window), causing the lock to activate mid-transition and freeze `exitY`, creating a visual cut.
- `> window.innerHeight` only fires during the active sticky range, where the container is still taller than the viewport.

#### Lock flow

```ts
// Lock: freeze native scroll, start virtual scrub
const lockScroll = (startProgress: number) => {
  activeScrollScrubOwner = animKey;
  isLocked = true;
  isVirtualScrollLockedRef.current = true;
  virtualProgress = startProgress;
  scrollYProgress.set(startProgress);
  html.style.overflow = "hidden";
  if (scrollbarWidth > 0) html.style.paddingRight = `${scrollbarWidth}px`;
};

// Unlock: restore scroll, jump to correct position
const unlockScroll = (direction: "down" | "up") => {
  const absTop = window.scrollY + container.getBoundingClientRect().top;
  const range  = container.offsetHeight - window.innerHeight;
  const targetTop =
    direction === "down"
      ? absTop + range          // land at sticky-break point → exitY phase starts
      : Math.max(absTop, 0);   // land at container top → enter from top

  releaseLock();
  window.scrollTo({ top: targetTop, behavior: "instant" as ScrollBehavior });
};
```

#### Delta handler (wheel + touch + keyboard)

```ts
const handleDelta = (deltaY: number, e: Event) => {
  if (activeScrollScrubOwner && activeScrollScrubOwner !== animKey) return;

  if (!isLocked) {
    if (!tryStartLock(deltaY)) return;
  }

  if (!shouldCaptureSection()) { releaseLock(); return; }

  e.preventDefault();

  virtualProgress = Math.min(1, Math.max(0, virtualProgress + deltaY / lockScrollPixels));
  scrollYProgress.set(virtualProgress);

  if (virtualProgress >= 0.999 && deltaY > 0) { unlockScroll("down"); return; }
  if (virtualProgress <= 0.001 && deltaY < 0) { unlockScroll("up"); }
};
```

`lockScrollPixels` (default `5000`) = total wheel delta pixels to scrub 0→1. Tune to taste — lower = faster scrub.

---

## Image Sequence Mode

Preload all frames into memory at mount. Map `scrollYProgress` to a frame index and draw to a `<canvas>` via `requestAnimationFrame`.

```ts
// Preload
imageFrames.forEach((src, index) => {
  const img = new window.Image();
  img.decoding = "async";
  img.src = src;
  img.onload = () => {
    loadedFramesRef.current[index] = img;
    if (index === 0) scheduleCanvasDraw(0);
  };
});

// Map progress → frame
scrollYProgress.on("change", (p) => {
  const nextFrame = Math.min(frameCount - 1, Math.floor(p * (frameCount - 1)));
  if (nextFrame !== currentFrameRef.current) {
    currentFrameRef.current = nextFrame;
    scheduleCanvasDraw(nextFrame);
  }
});

// Draw with object-fit: contain behavior
function drawFrame(frameIndex: number) {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");
  const frame = loadedFramesRef.current[frameIndex];
  if (!frame) return;

  const dpr = window.devicePixelRatio || 1;
  canvas.width  = Math.round(canvas.clientWidth  * dpr);
  canvas.height = Math.round(canvas.clientHeight * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const scale = Math.min(
    canvas.clientWidth  / frame.naturalWidth,
    canvas.clientHeight / frame.naturalHeight
  );
  const w = frame.naturalWidth  * scale;
  const h = frame.naturalHeight * scale;
  ctx.drawImage(frame, (canvas.clientWidth - w) / 2, (canvas.clientHeight - h) / 2, w, h);
}
```

Canvas must be `position: absolute; inset: 0; width: 100%; height: 100%` inside the sticky div.

---

## Text reveal pattern

Use a small `Reveal` wrapper that maps `scrollYProgress` ranges to opacity + translateY:

```tsx
function Reveal({ progress, range, children, yOffset = 28 }) {
  const opacity = useTransform(progress, range, [0, 1]);
  const y       = useTransform(progress, range, [yOffset, 0]);
  return <motion.div style={{ opacity, y }}>{children}</motion.div>;
}

// Usage — stagger each element by shifting the range
<Reveal progress={scrollYProgress} range={[0,    0.05]}>Title</Reveal>
<Reveal progress={scrollYProgress} range={[0.01, 0.08]}>Subtitle</Reveal>
<Reveal progress={scrollYProgress} range={[0.05, 0.13]}>Description</Reveal>
<Reveal progress={scrollYProgress} range={[0.10, 0.18]}>Bullet 1</Reveal>
<Reveal progress={scrollYProgress} range={[0.14, 0.22]}>Bullet 2</Reveal>
<Reveal progress={scrollYProgress} range={[0.18, 0.26]}>Bullet 3</Reveal>
<Reveal progress={scrollYProgress} range={[0.22, 0.30]}>CTA</Reveal>
```

All content appears by `0.30` of the scrub — leaving `0.30–1.0` as "dwell" time at full content.

---

## Page-level stacking

Stack sections in DOM order — no explicit z-index needed. Framer Motion transforms create stacking contexts; later DOM elements naturally paint on top.

```tsx
<HeroPinWrapper />          {/* 200vh, exitY pin, zIndex: 0 */}
<GiScrollSection />         {/* 430vh, roundedTop, rises over Hero */}
<NoGiScrollSection />       {/* 430vh, roundedTop, rises over GI */}
<MmaScrollSection />        {/* 430vh, roundedTop, rises over NoGI */}
<NextRegularSection />
```

`HeroPinWrapper` uses the same `exitY` pattern (`["end end", "end start"]`) to stay pinned while the first scroll section rises over it. Its container is `200vh` (100vh hero + 100vh transition room).

---

## Props reference (ScrollProgramSection)

```ts
interface ScrollProgramSectionProps {
  imageFrames?: string[];      // array of /public image paths, loaded in order
  videoSrc?: string;           // alternative: video scrub mode
  title: string;
  subtitle: string;
  description: string;
  bullets: [string, string, string];
  ctaText: string;
  ctaHref: string;
  align: "left" | "right";     // text block position
  overlayGradient: string;     // CSS gradient over the media
  animKey: string;             // unique string per section (used for @keyframes name + lock owner ID)
  roundedTop?: boolean;        // adds clipPath + shadow for card-stack look
  scrollHeightVh?: number;     // total container height (default 350). 430 works well for ~70-150 frames
  lockUntilComplete?: boolean; // enable virtual scroll lock (default true)
  lockScrollPixels?: number;   // wheel delta to scrub 0→1 (default 5000)
}
```

---

## Common issues & fixes

| Symptom | Cause | Fix |
|---|---|---|
| Transition cuts when scrolling back up; animation replays instead | `shouldCaptureSection` uses `rect.bottom > 0`, fires during exitY phase | Change to `rect.bottom > window.innerHeight` |
| Scroll jump is animated instead of instant | `html { scroll-behavior: smooth }` overrides `behavior: "instant"` in some browsers | Test without smooth scroll; or call `releaseLock()` before `scrollTo` (already done) |
| Safari: sticky breaks early or transforms don't compose | Known Safari bug with sticky + transform | Add `will-change: transform` to the sticky motion.div |
| Canvas is blank on first load | Frame 0 not yet decoded | Draw frame 0 inside `img.onload` for index 0 |
| Lock conflicts between sections | Module-level `activeScrollScrubOwner` stale after hot reload | Hard refresh; in production this doesn't occur |
| Text flickers on scroll up | `nativeScrollYProgress` updates `scrollYProgress` during virtual lock | Guard with `isVirtualScrollLockedRef.current` check in the `change` listener |

---

## Minimal reproduction checklist

1. Each section component is `"use client"` and imports `ScrollProgramSection`.
2. Image frames are in `/public/images/<section-name>-scroll-sequence/` named `ezgif-frame-001.jpg` etc.
3. Each section has a unique `animKey` string.
4. `roundedTop={true}` on every section except the first one.
5. `scrollHeightVh` ≥ 300. A good formula: `Math.ceil(frameCount / 15) * 100` (roughly 100vh per 15 frames).
6. `shouldCaptureSection` uses `rect.bottom > window.innerHeight`.
7. The module-level `activeScrollScrubOwner` variable lives in the same file as `ScrollProgramSection`, not imported from elsewhere.
