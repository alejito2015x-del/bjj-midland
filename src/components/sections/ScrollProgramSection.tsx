"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  MotionValue,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

// Coordinates scroll lock across multiple scrub sections on the page.
let activeScrollScrubOwner: string | null = null;

interface ScrollProgramSectionProps {
  sectionId?: string;
  navFocusKey?: string;
  videoSrc?: string;
  imageFrames?: string[];
  title: string;
  subtitle: string;
  description: string;
  bullets: [string, string, string];
  ctaText: string;
  ctaHref: string;
  /** "left" mirrors GI card, "right" mirrors No-GI card */
  align: "left" | "right";
  overlayGradient: string;
  /** Unique prefix for keyframe animation name */
  animKey: string;
  /** Rounded top corners (for overlap slide transition) */
  roundedTop?: boolean;
  /** Total section height in viewport units (sticky viewport stays 100vh) */
  scrollHeightVh?: number;
  /** Prevent leaving section while scroll-scrub is not complete */
  lockUntilComplete?: boolean;
  /** Wheel delta pixels required to scrub 0→1 */
  lockScrollPixels?: number;
}

// Small helper — wraps a child in a motion.div driven by scroll progress
function Reveal({
  progress,
  range,
  children,
  yOffset = 28,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  children: React.ReactNode;
  yOffset?: number;
}) {
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, [yOffset, 0]);

  return (
    <motion.div style={{ opacity, y }}>
      {children}
    </motion.div>
  );
}

export default function ScrollProgramSection({
  sectionId,
  navFocusKey,
  videoSrc,
  imageFrames,
  title,
  subtitle,
  description,
  bullets,
  ctaText,
  ctaHref,
  align,
  overlayGradient,
  animKey,
  roundedTop = false,
  scrollHeightVh = 350,
  lockUntilComplete = true,
  lockScrollPixels = 2200,
}: ScrollProgramSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const durationRef = useRef(0);
  const isVirtualScrollLockedRef = useRef(false);
  const loadedFramesRef = useRef<(HTMLImageElement | null)[]>([]);
  const drawRafRef = useRef<number | null>(null);
  const currentFrameRef = useRef(0);

  // ── Manual scroll progress — computed directly from the DOM on every scroll
  //    event so it initialises correctly on first page load (no IntersectionObserver
  //    timing dependency like Framer Motion's useScroll has on cold loads). ───────
  const scrollYProgress = useMotionValue(0);
  const entryOpacity    = useMotionValue(0.82);
  const entryScale      = useMotionValue(0.98);
  const exitY           = useMotionValue("0vh");

  const hasImageSequence = !!imageFrames && imageFrames.length > 0;
  const frameCount = imageFrames?.length ?? 0;

  // ── Video setup: load duration and show first frame ──────────────────────
  useEffect(() => {
    if (!videoSrc || hasImageSequence) return;
    const v = videoRef.current;
    if (!v) return;

    const onReady = () => {
      const dur = v.duration;
      if (!Number.isFinite(dur) || dur <= 0) return;
      durationRef.current = dur;
      // Seek to first frame so video is never black
      v.currentTime = 0.001;
    };

    v.addEventListener("loadedmetadata", onReady);
    v.addEventListener("canplay", onReady);
    if (v.readyState >= 1) onReady();

    return () => {
      v.removeEventListener("loadedmetadata", onReady);
      v.removeEventListener("canplay", onReady);
    };
  }, [hasImageSequence, videoSrc]);

  const drawFrameToCanvas = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const frame =
      loadedFramesRef.current[frameIndex] ??
      loadedFramesRef.current.find(
        (img): img is HTMLImageElement => img !== null
      );
    if (!frame || !frame.naturalWidth || !frame.naturalHeight) return;

    const cssWidth = canvas.clientWidth;
    const cssHeight = canvas.clientHeight;
    if (!cssWidth || !cssHeight) return;

    const dpr = window.devicePixelRatio || 1;
    const targetWidth = Math.round(cssWidth * dpr);
    const targetHeight = Math.round(cssHeight * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssWidth, cssHeight);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const scale = Math.max(cssWidth / frame.naturalWidth, cssHeight / frame.naturalHeight);
    const drawWidth = frame.naturalWidth * scale;
    const drawHeight = frame.naturalHeight * scale;
    const offsetX = (cssWidth - drawWidth) / 2;
    const offsetY = (cssHeight - drawHeight) / 2;

    ctx.drawImage(frame, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  const scheduleCanvasDraw = useCallback((frameIndex: number) => {
    if (drawRafRef.current !== null) {
      cancelAnimationFrame(drawRafRef.current);
    }

    drawRafRef.current = requestAnimationFrame(() => {
      drawFrameToCanvas(frameIndex);
      drawRafRef.current = null;
    });
  }, [drawFrameToCanvas]);

  // ── Seek video whenever progress changes ─────────────────────────────────
  useEffect(() => {
    if (!videoSrc || hasImageSequence) return;
    return scrollYProgress.on("change", (p) => {
      const v = videoRef.current;
      const dur = durationRef.current;
      if (!v || dur <= 0) return;
      v.currentTime = Math.min(Math.max(p * dur, 0), dur - 0.001);
    });
  }, [hasImageSequence, scrollYProgress, videoSrc]);

  // ── Image sequence mode: map scroll progress to frame index ──────────────
  useEffect(() => {
    if (!hasImageSequence || frameCount <= 0) return;

    return scrollYProgress.on("change", (p) => {
      const clamped = Math.min(Math.max(p, 0), 1);
      const nextFrame = Math.min(
        frameCount - 1,
        Math.floor(clamped * (frameCount - 1))
      );
      if (nextFrame !== currentFrameRef.current) {
        currentFrameRef.current = nextFrame;
        scheduleCanvasDraw(nextFrame);
      }
    });
  }, [frameCount, hasImageSequence, scheduleCanvasDraw, scrollYProgress]);

  // Preload sequence frames in memory for smooth scrubbing on canvas.
  useEffect(() => {
    if (!hasImageSequence || !imageFrames) return;

    let cancelled = false;
    loadedFramesRef.current = new Array(imageFrames.length).fill(null);

    imageFrames.forEach((src, index) => {
      const img = new window.Image();
      img.decoding = "async";
      img.src = src;

      img.onload = () => {
        if (cancelled) return;
        loadedFramesRef.current[index] = img;

        if (index === 0 || index === currentFrameRef.current) {
          scheduleCanvasDraw(currentFrameRef.current);
        }
      };
    });

    return () => {
      cancelled = true;
      loadedFramesRef.current = [];
      if (drawRafRef.current !== null) {
        cancelAnimationFrame(drawRafRef.current);
        drawRafRef.current = null;
      }
    };
  }, [hasImageSequence, imageFrames, scheduleCanvasDraw]);

  // Keep canvas sharp on viewport resizes.
  useEffect(() => {
    if (!hasImageSequence) return;

    const onResize = () => scheduleCanvasDraw(currentFrameRef.current);
    window.addEventListener("resize", onResize);
    onResize();

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [hasImageSequence, scheduleCanvasDraw]);

  // ── Manual scroll + entry/exit tracker ───────────────────────────────────
  // Replaces Framer Motion's useScroll (which relies on IntersectionObserver
  // and does not fire an initial "change" event on first page load, causing the
  // scroll lock and text reveals to start in the wrong state).
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const h    = el.offsetHeight;
      const vh   = window.innerHeight;

      // Main scrub progress: 0 when container top = viewport top,
      //                       1 when container bottom = viewport bottom.
      if (!isVirtualScrollLockedRef.current) {
        const range = h - vh;
        const p = range > 0 ? Math.min(1, Math.max(0, -rect.top / range)) : 0;
        scrollYProgress.set(p);
      }

      // Entry: 0 = container top at viewport bottom → 1 = at viewport top
      const rawEntry = 1 - rect.top / vh;
      entryOpacity.set(0.82 + 0.18 * Math.min(1, Math.max(0, rawEntry)));
      entryScale.set(0.98 + 0.02 * Math.min(1, Math.max(0, rawEntry)));

      // Exit: counteracts the natural upward drift once sticky breaks
      const rawExit = 1 - rect.bottom / vh;
      const exitFrac = Math.min(1, Math.max(0, rawExit));
      exitY.set(`${exitFrac * 100}vh`);
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update(); // Initialise immediately — no timing dependency

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [scrollYProgress, entryOpacity, entryScale, exitY]);

  // ── Lock mechanism: overflow:hidden + virtual scroll via wheel ────────────
  useEffect(() => {
    if (!lockUntilComplete) {
      isVirtualScrollLockedRef.current = false;
      return;
    }
    const container = containerRef.current;
    if (!container) return;

    const html = document.documentElement;
    let isLocked = false;
    let virtualProgress = 0;
    // Preserve scrollbar width to prevent layout shift
    const scrollbarWidth = window.innerWidth - html.clientWidth;

    const releaseLock = () => {
      isLocked = false;
      isVirtualScrollLockedRef.current = false;
      html.style.overflow = "";
      html.style.paddingRight = "";
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      if (activeScrollScrubOwner === animKey) activeScrollScrubOwner = null;
    };

    const lockScroll = (startProgress: number) => {
      if (activeScrollScrubOwner && activeScrollScrubOwner !== animKey) {
        return false;
      }
      activeScrollScrubOwner = animKey;
      isLocked = true;
      isVirtualScrollLockedRef.current = true;
      virtualProgress = startProgress;
      scrollYProgress.set(startProgress);
      html.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        html.style.paddingRight = `${scrollbarWidth}px`;
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      return true;
    };

    const unlockScroll = (direction: "down" | "up") => {
      const rect = container.getBoundingClientRect();
      const absTop = window.scrollY + rect.top;
      const range = container.offsetHeight - window.innerHeight;
      const targetTop =
        // down: land at the end of the scroll range (section fully completed)
        // up:   land at the container top — section is at full opacity at
        //       viewport top, exitY then smoothly reveals the section below
        direction === "down" ? absTop + range : Math.max(absTop, 0);

      releaseLock();
      window.scrollTo({ top: targetTop, behavior: "instant" as ScrollBehavior });
    };

    const getProgress = () => {
      const rect  = container.getBoundingClientRect();
      const range = container.offsetHeight - window.innerHeight;
      return range > 0 ? Math.min(1, Math.max(0, -rect.top / range)) : 0;
    };

    const shouldCaptureSection = () => {
      const rect = container.getBoundingClientRect();
      const margin = 80;
      const result = rect.top <= margin && rect.bottom > window.innerHeight;
      console.log(`[LOCK:${animKey}] shouldCapture`, { top: Math.round(rect.top), bottom: Math.round(rect.bottom), vh: window.innerHeight, result });
      return result;
    };

    const tryStartLock = (deltaY: number) => {
      if (activeScrollScrubOwner && activeScrollScrubOwner !== animKey) {
        console.log(`[LOCK:${animKey}] blocked — owner is ${activeScrollScrubOwner}`);
        return false;
      }
      if (!shouldCaptureSection()) return false;

      const currentProgress = getProgress();
      console.log(`[LOCK:${animKey}] tryStartLock`, { deltaY, currentProgress });

      if (deltaY > 0 && currentProgress < 0.995) {
        return lockScroll(currentProgress);
      }

      if (deltaY < 0 && currentProgress > 0.005) {
        return lockScroll(currentProgress);
      }

      return false;
    };

    let lastTouchY: number | null = null;

    const handleDelta = (deltaY: number, e: Event) => {
      if (activeScrollScrubOwner && activeScrollScrubOwner !== animKey) return;

      if (!isLocked) {
        if (!tryStartLock(deltaY)) {
          return;
        }
      }

      if (!shouldCaptureSection()) {
        releaseLock();
        return;
      }

      e.preventDefault();

      const prev = virtualProgress;
      virtualProgress = Math.min(1, Math.max(0, prev + deltaY / lockScrollPixels));
      scrollYProgress.set(virtualProgress);

      if (virtualProgress >= 0.999 && deltaY > 0) {
        unlockScroll("down");
        return;
      }

      if (virtualProgress <= 0.001 && deltaY < 0) {
        unlockScroll("up");
      }
    };

    const onWheel = (e: WheelEvent) => {
      console.log(`[LOCK:${animKey}] wheel`, { deltaY: e.deltaY, isLocked });
      handleDelta(e.deltaY, e);
    };

    const onTouchStart = (e: TouchEvent) => {
      lastTouchY = e.touches[0]?.clientY ?? null;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (lastTouchY === null) return;
      const y = e.touches[0]?.clientY ?? lastTouchY;
      handleDelta(lastTouchY - y, e);
      lastTouchY = y;
    };
    const onTouchEnd = () => { lastTouchY = null; };

    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.closest("input,textarea,select,[contenteditable]");
      if (tag) return;
      const map: Record<string, number> = {
        ArrowDown: 200, PageDown: 600, " ": 600,
        ArrowUp: -200, PageUp: -600,
      };
      const delta = map[e.key];
      if (delta !== undefined) handleDelta(delta, e);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("touchcancel", onTouchEnd);
    window.addEventListener("keydown", onKeyDown);

    // Auto-start lock on mount if the user is already inside this section.
    // This handles the race where the user scrolled in before JS finished loading.
    {
      const initProgress = getProgress();
      const inSection = shouldCaptureSection();
      console.log(`[LOCK:${animKey}] mounted`, { initProgress, inSection, scrollY: window.scrollY });
      if (inSection && initProgress > 0.005 && initProgress < 0.995) {
        console.log(`[LOCK:${animKey}] auto-locking at`, initProgress);
        lockScroll(initProgress);
      }
    }

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
      if (isLocked) releaseLock();
    };
  }, [animKey, lockScrollPixels, lockUntilComplete, scrollYProgress]);

  // Scroll hint fades out early
  const hintOpacity = useTransform(scrollYProgress, [0, 0.04], [1, 0]);

  // ── Text reveal ranges — compact so text appears quickly ────────────────────
  const titleRange:       [number, number] = [0, 0.05];
  const subtitleRange:    [number, number] = [0.01, 0.08];
  const descRange:        [number, number] = [0.05, 0.13];
  const bullet0Range:     [number, number] = [0.10, 0.18];
  const bullet1Range:     [number, number] = [0.14, 0.22];
  const bullet2Range:     [number, number] = [0.18, 0.26];
  const ctaRange:         [number, number] = [0.22, 0.30];

  const isRight = align === "right";

  return (
    <div
      ref={containerRef}
      id={sectionId}
      data-programs-focus={navFocusKey}
      style={{ height: `${scrollHeightVh}vh` }}
    >
      <motion.div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          overflow: "hidden",
          background: "#0A0A0A",
          opacity: entryOpacity,
          scale: entryScale,
          y: exitY,
          ...(roundedTop && {
            clipPath: "inset(0 round 28px 28px 0px 0px)",
            boxShadow: "0 -32px 80px rgba(0,0,0,0.9)",
          }),
        }}
      >
        {/* Background media */}
        {hasImageSequence ? (
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
            }}
          />
        ) : (
          <video
            ref={videoRef}
            src={videoSrc}
            muted
            playsInline
            preload="auto"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        )}

        {/* Overlay */}
        <div style={{ position: "absolute", inset: 0, background: overlayGradient }} />

        {/* Content */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: isRight ? "flex-end" : "flex-start",
            paddingLeft:  "clamp(1.5rem, 6vw, 6rem)",
            paddingRight: "clamp(1.5rem, 6vw, 6rem)",
          }}
        >
          <div
            style={{
              maxWidth: "520px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "clamp(0.9rem, 2vw, 1.5rem)",
            }}
          >
            {/* Title */}
            <Reveal progress={scrollYProgress} range={titleRange} yOffset={36}>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(3.5rem, 8vw, 6rem)",
                  color: "#fff",
                  lineHeight: 0.92,
                  letterSpacing: "0.01em",
                }}
              >
                {title}
              </h3>
            </Reveal>

            {/* Subtitle */}
            <Reveal progress={scrollYProgress} range={subtitleRange} yOffset={24}>
              <p
                style={{
                  color: "#D4A74B",
                  fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
                  fontWeight: 600,
                  lineHeight: 1.3,
                }}
              >
                {subtitle}
              </p>
            </Reveal>

            {/* Description */}
            <Reveal progress={scrollYProgress} range={descRange} yOffset={20}>
              <p
                style={{
                  color: "rgba(255,255,255,0.82)",
                  fontSize: "clamp(0.9rem, 1.7vw, 1.1rem)",
                  lineHeight: 1.65,
                }}
              >
                {description}
              </p>
            </Reveal>

            {/* Bullets — each one enters individually */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              <Reveal progress={scrollYProgress} range={bullet0Range} yOffset={16}>
                <BulletItem text={bullets[0]} />
              </Reveal>
              <Reveal progress={scrollYProgress} range={bullet1Range} yOffset={16}>
                <BulletItem text={bullets[1]} />
              </Reveal>
              <Reveal progress={scrollYProgress} range={bullet2Range} yOffset={16}>
                <BulletItem text={bullets[2]} />
              </Reveal>
            </div>

            {/* CTA */}
            <Reveal progress={scrollYProgress} range={ctaRange} yOffset={20}>
              <Link
                href={ctaHref}
                className="inline-flex items-center gap-2 btn-predator btn-gold px-10 py-5 text-black/95"
              >
                <span>{ctaText}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </Reveal>
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div
          style={{
            position: "absolute",
            bottom: "36px",
            left: "50%",
            translateX: "-50%",
            opacity: hintOpacity,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: "10px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              fontFamily: "var(--font-display)",
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: "1px",
              height: "36px",
              background: "linear-gradient(to bottom, rgba(212,167,75,0.8), transparent)",
              animation: `${animKey}Pulse 1.5s ease-in-out infinite`,
            }}
          />
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes ${animKey}Pulse {
          0%, 100% { opacity: 0.3; transform: scaleY(0.7); }
          50%       { opacity: 1;   transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}

function BulletItem({ text }: { text: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        color: "rgba(255,255,255,0.9)",
        fontSize: "clamp(0.9rem, 1.6vw, 1.05rem)",
      }}
    >
      <span
        style={{
          width: "9px",
          height: "9px",
          borderRadius: "50%",
          background: "#D4A74B",
          boxShadow: "0 0 12px rgba(212,167,75,0.7)",
          flexShrink: 0,
        }}
      />
      {text}
    </div>
  );
}
