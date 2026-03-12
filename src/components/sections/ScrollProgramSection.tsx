"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  useMotionValue,
  MotionValue,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Coordinates scroll lock across multiple scrub sections on the page.
let activeScrollScrubOwner: string | null = null;

interface ScrollProgramSectionProps {
  sectionId?: string;
  navFocusKey?: string;
  instantOverlay?: boolean;
  disableExitPin?: boolean;
  pretitle?: string;
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
  /** Override image shown in the mobile static card */
  mobileImage?: string;
  /** Override object-position for mobile static image */
  mobileImagePosition?: string;
}

// Small helper — wraps a child and animates it based on scroll progress.
// Uses direct DOM manipulation (progress.on("change")) instead of Framer Motion's
// useTransform + motion.div, which may not reconnect subscriptions correctly
// after SSR hydration (causing animations to be stuck on first page load).
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
  const ref = useRef<HTMLDivElement>(null);
  // Keep latest range/yOffset in refs so the subscription closure stays current
  const rangeRef  = useRef(range);
  const offsetRef = useRef(yOffset);
  rangeRef.current  = range;
  offsetRef.current = yOffset;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const apply = (p: number) => {
      const [r0, r1] = rangeRef.current;
      const t = r1 > r0 ? Math.min(1, Math.max(0, (p - r0) / (r1 - r0))) : (p >= r0 ? 1 : 0);
      el.style.opacity    = String(t);
      el.style.transform  = `translateY(${offsetRef.current * (1 - t)}px)`;
    };

    // Apply immediately in case scrollYProgress already has a non-zero value
    apply(progress.get());
    return progress.on("change", apply);
  }, [progress]); // progress never changes identity after mount

  return (
    <div
      ref={ref}
      style={{ opacity: 0, transform: `translateY(${yOffset}px)`, willChange: "opacity, transform" }}
    >
      {children}
    </div>
  );
}

export default function ScrollProgramSection({
  sectionId,
  navFocusKey,
  instantOverlay = false,
  disableExitPin = false,
  pretitle,
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
  mobileImage,
  mobileImagePosition,
}: ScrollProgramSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef    = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const durationRef = useRef(0);
  const isVirtualScrollLockedRef = useRef(false);
  const loadedFramesRef = useRef<(HTMLImageElement | null)[]>([]);
  const drawRafRef = useRef<number | null>(null);
  const currentFrameRef = useRef(0);
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  // ── Manual scroll progress — computed directly from the DOM on every scroll
  //    event so it initialises correctly on first page load (no IntersectionObserver
  //    timing dependency like Framer Motion's useScroll has on cold loads). ───────
  const scrollYProgress = useMotionValue(0);
  const entryOpacity    = useMotionValue(0.82);
  const entryScale      = useMotionValue(0.98);
  const exitY           = useMotionValue("0vh");

  const hasImageSequence = !!imageFrames && imageFrames.length > 0;
  const frameCount = imageFrames?.length ?? 0;
  const effectiveScrollHeightVh = isMobileViewport
    ? Math.min(scrollHeightVh, 170)
    : scrollHeightVh;
  const effectiveScrollHeightCss = isMobileViewport
    ? `${effectiveScrollHeightVh}svh`
    : `${effectiveScrollHeightVh}vh`;
  const effectiveLockUntilComplete = lockUntilComplete && !isMobileViewport;
  const effectiveLockScrollPixels = isMobileViewport
    ? Math.max(520, Math.round(lockScrollPixels * 0.55))
    : lockScrollPixels;
  const stickyViewportHeight = isMobileViewport ? "100svh" : "100vh";

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(max-width: 1023px)");
    const apply = () => setIsMobileViewport(mediaQuery.matches);
    apply();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", apply);
      return () => mediaQuery.removeEventListener("change", apply);
    }

    mediaQuery.addListener(apply);
    return () => mediaQuery.removeListener(apply);
  }, []);

  // ── Video setup: load duration and show first frame ──────────────────────
  useEffect(() => {
    if (isMobileViewport) return;
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
  }, [hasImageSequence, isMobileViewport, videoSrc]);

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

  // Stable ref so the lock mechanism can force a redraw without being in the dep array
  const scheduleCanvasDrawRef = useRef(scheduleCanvasDraw);
  scheduleCanvasDrawRef.current = scheduleCanvasDraw;

  // ── Seek video whenever progress changes ─────────────────────────────────
  useEffect(() => {
    if (isMobileViewport) return;
    if (!videoSrc || hasImageSequence) return;
    return scrollYProgress.on("change", (p) => {
      const v = videoRef.current;
      const dur = durationRef.current;
      if (!v || dur <= 0) return;
      v.currentTime = Math.min(Math.max(p * dur, 0), dur - 0.001);
    });
  }, [hasImageSequence, isMobileViewport, scrollYProgress, videoSrc]);

  // ── Image sequence mode: map scroll progress to frame index ──────────────
  useEffect(() => {
    if (isMobileViewport) return;
    if (!hasImageSequence || frameCount <= 0) return;

    return scrollYProgress.on("change", (p) => {
      const clamped = Math.min(Math.max(p, 0), 1);
      const nextFrame = Math.min(
        frameCount - 1,
        Math.floor(clamped * (frameCount - 1))
      );
      currentFrameRef.current = nextFrame;
      scheduleCanvasDraw(nextFrame);
    });
  }, [frameCount, hasImageSequence, isMobileViewport, scheduleCanvasDraw, scrollYProgress]);

  // ── Redraw canvas when section transitions in/out of viewport ────────────
  // The browser can drop the canvas GPU layer when the sticky div is
  // transformed off-screen (exitY > 0). When the section re-enters,
  // scrollYProgress still holds the same value so .on("change") never fires.
  // Subscribing to exitY and entryOpacity ensures a redraw on every transition.
  useEffect(() => {
    if (isMobileViewport) return;
    if (!hasImageSequence || frameCount <= 0) return;
    const redraw = () => scheduleCanvasDrawRef.current(currentFrameRef.current);
    const u1 = exitY.on("change", redraw);
    const u2 = entryOpacity.on("change", redraw);
    return () => { u1(); u2(); };
  }, [hasImageSequence, frameCount, isMobileViewport, exitY, entryOpacity]);

  // Preload sequence frames in memory for smooth scrubbing on canvas.
  useEffect(() => {
    if (isMobileViewport) return;
    if (!hasImageSequence || !imageFrames) return;

    let cancelled = false;
    loadedFramesRef.current = new Array(imageFrames.length).fill(null);

    imageFrames.forEach((src, index) => {
      const img = new window.Image();
      img.decoding = "async";

      const handleLoaded = () => {
        if (cancelled) return;
        if (loadedFramesRef.current[index] === img) return;
        loadedFramesRef.current[index] = img;

        if (index === 0 || index === currentFrameRef.current) {
          scheduleCanvasDraw(currentFrameRef.current);
        }
      };

      img.onload = handleLoaded;
      img.src = src;

      // Cached images may already be complete by the time handlers run.
      if (img.complete && img.naturalWidth > 0) {
        handleLoaded();
      }
    });

    return () => {
      cancelled = true;
      loadedFramesRef.current = [];
      if (drawRafRef.current !== null) {
        cancelAnimationFrame(drawRafRef.current);
        drawRafRef.current = null;
      }
    };
  }, [hasImageSequence, imageFrames, isMobileViewport, scheduleCanvasDraw]);

  // Keep canvas sharp on layout/viewport changes and ensure first frame
  // paints after hydration when canvas dimensions are finally non-zero.
  useEffect(() => {
    if (isMobileViewport) return;
    if (!hasImageSequence) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const redrawCurrentFrame = () => {
      scheduleCanvasDraw(currentFrameRef.current);
    };

    const observer = new ResizeObserver(() => {
      redrawCurrentFrame();
    });
    observer.observe(canvas);

    // Two phased draws help when hydration/layout settles over multiple frames.
    const rafA = requestAnimationFrame(redrawCurrentFrame);
    const rafB = requestAnimationFrame(() => {
      requestAnimationFrame(redrawCurrentFrame);
    });

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafA);
      cancelAnimationFrame(rafB);
    };
  }, [hasImageSequence, isMobileViewport, scheduleCanvasDraw]);

  // ── Manual scroll + entry/exit tracker ───────────────────────────────────
  // Replaces Framer Motion's useScroll (which relies on IntersectionObserver
  // and does not fire an initial "change" event on first page load, causing the
  // scroll lock and text reveals to start in the wrong state).
  useEffect(() => {
    if (isMobileViewport) return;
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
      if (instantOverlay) {
        entryOpacity.set(1);
        entryScale.set(1);
      } else {
        const rawEntry = 1 - rect.top / vh;
        entryOpacity.set(0.82 + 0.18 * Math.min(1, Math.max(0, rawEntry)));
        entryScale.set(0.98 + 0.02 * Math.min(1, Math.max(0, rawEntry)));
      }

      // Exit: counteracts the natural upward drift once sticky breaks.
      // Can be disabled for sections that should hand off immediately.
      if (disableExitPin) {
        exitY.set("0vh");
      } else {
        const rawExit = 1 - rect.bottom / vh;
        const exitFrac = Math.min(1, Math.max(0, rawExit));
        exitY.set(`${exitFrac * 100}vh`);
      }
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update(); // Initialise immediately — no timing dependency

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [isMobileViewport, scrollYProgress, entryOpacity, entryScale, exitY, instantOverlay, disableExitPin]);

  // ── Apply sticky-card styles directly to DOM ────────────────────────────
  // motion.div with MotionValue styles doesn't reconnect after SSR hydration —
  // the internal Framer Motion binding is not re-established on existing DOM
  // nodes, so exitY / entryOpacity / entryScale never update on first page load.
  // Using a plain div + direct DOM writes fixes this on both first load and SPA.
  useEffect(() => {
    if (isMobileViewport) return;
    const el = stickyRef.current;
    if (!el) return;

    const apply = () => {
      el.style.opacity   = String(entryOpacity.get());
      el.style.transform = `scale(${entryScale.get()}) translateY(${exitY.get()})`;
    };

    apply(); // Sync current values immediately on mount
    const u1 = entryOpacity.on("change", apply);
    const u2 = entryScale.on("change",   apply);
    const u3 = exitY.on("change",        apply);
    return () => { u1(); u2(); u3(); };
  }, [isMobileViewport, entryOpacity, entryScale, exitY]);

  // ── Lock mechanism: overflow:hidden + virtual scroll via wheel ────────────
  useEffect(() => {
    if (!effectiveLockUntilComplete) {
      isVirtualScrollLockedRef.current = false;
      return;
    }
    const container = containerRef.current;
    if (!container) return;

    const html = document.documentElement;
    let isLocked = false;
    let virtualProgress = 0;
    let lockedAtScrollY = 0;
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
      // Force canvas redraw in case scrollYProgress value didn't change
      // (e.g. re-entering section from below with progress already at 1)
      scheduleCanvasDrawRef.current(currentFrameRef.current);
      lockedAtScrollY = window.scrollY;
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

    const shouldCaptureSection = () => {
      const rect = container.getBoundingClientRect();
      const margin = 80;
      return rect.top <= margin && rect.bottom >= window.innerHeight;
    };

    const tryStartLock = (deltaY: number) => {
      if (activeScrollScrubOwner && activeScrollScrubOwner !== animKey) {
        return false;
      }
      if (!shouldCaptureSection()) return false;

      const rect  = container.getBoundingClientRect();
      const range = container.offsetHeight - window.innerHeight;
      const currentProgress = range > 0
        ? Math.min(1, Math.max(0, -rect.top / range))
        : 0;

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
      virtualProgress = Math.min(
        1,
        Math.max(0, prev + deltaY / effectiveLockScrollPixels)
      );
      scrollYProgress.set(virtualProgress);

      if (virtualProgress >= 0.999 && deltaY > 0) {
        unlockScroll("down");
        return;
      }

      if (virtualProgress <= 0.001 && deltaY < 0) {
        unlockScroll("up");
      }
    };

    // Belt-and-suspenders: if overflow:hidden + e.preventDefault() both fail
    // (e.g. browser passive-listener intervention), reset scroll position back
    // to where it was when we locked so the page cannot drift.
    const onScrollReset = () => {
      if (isLocked && window.scrollY !== lockedAtScrollY) {
        window.scrollTo({ top: lockedAtScrollY, behavior: "instant" as ScrollBehavior });
      }
    };

    const onWheel = (e: WheelEvent) => {
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

    // wheel: capture phase on document makes the event cancelable even when Chrome's
    // passive-listener intervention would otherwise force it to be non-cancelable on window.
    window.addEventListener("scroll", onScrollReset, { passive: true });
    document.addEventListener("wheel", onWheel, { passive: false, capture: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchmove", onTouchMove, { passive: false, capture: true });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("touchcancel", onTouchEnd);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("scroll", onScrollReset);
      document.removeEventListener("wheel", onWheel, { capture: true });
      window.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchmove", onTouchMove, { capture: true });
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
      if (isLocked) releaseLock();
    };
  }, [animKey, effectiveLockScrollPixels, effectiveLockUntilComplete, scrollYProgress]);

  const pretitleRef = useRef<HTMLDivElement>(null);
  const hintRef     = useRef<HTMLDivElement>(null);

  // Pretitle: fades out as scroll progresses
  useEffect(() => {
    if (isMobileViewport) return;
    const el = pretitleRef.current;
    if (!el) return;
    const apply = (p: number) => {
      const opacity = p < 0.14 ? 1 : p < 0.2 ? 1 - (p - 0.14) / 0.06 : 0;
      const y = p * -12 / 0.2;
      el.style.opacity   = String(Math.max(0, opacity));
      el.style.transform = `translateX(-50%) translateY(${Math.min(0, y)}px)`;
    };
    apply(scrollYProgress.get());
    return scrollYProgress.on("change", apply);
  }, [isMobileViewport, scrollYProgress]);

  // Scroll hint: fades out very early
  useEffect(() => {
    if (isMobileViewport) return;
    const el = hintRef.current;
    if (!el) return;
    const apply = (p: number) => {
      el.style.opacity = String(Math.max(0, 1 - p / 0.04));
    };
    apply(scrollYProgress.get());
    return scrollYProgress.on("change", apply);
  }, [isMobileViewport, scrollYProgress]);

  // ── Text reveal ranges — compact so text appears quickly ────────────────────
  const titleRange:       [number, number] = [0, 0.05];
  const subtitleRange:    [number, number] = [0.01, 0.08];
  const descRange:        [number, number] = [0.05, 0.13];
  const bullet0Range:     [number, number] = [0.10, 0.18];
  const bullet1Range:     [number, number] = [0.14, 0.22];
  const bullet2Range:     [number, number] = [0.18, 0.26];
  const ctaRange:         [number, number] = [0.22, 0.30];

  const isRight = align === "right";
  const mobileLastFrame =
    mobileImage ??
    (hasImageSequence && frameCount > 0
      ? imageFrames?.[frameCount - 1] ?? imageFrames?.[0]
      : undefined);

  if (isMobileViewport) {
    return (
      <section
        id={sectionId}
        data-programs-focus={navFocusKey}
        style={{
          background: "#0A0A0A",
          padding: "clamp(1.2rem, 4vw, 1.6rem) clamp(1rem, 4.5vw, 1.4rem)",
        }}
      >
        <div
          style={{
            maxWidth: "100%",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "1.2rem",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "center", textAlign: "center" }}>
            {pretitle ? (
              <p
                style={{
                  color: "rgba(212,167,75,0.92)",
                  fontFamily: "var(--font-display)",
                  fontSize: "0.86rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                }}
              >
                {pretitle}
              </p>
            ) : null}

            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 11vw, 2.8rem)",
                color: "#fff",
                lineHeight: 0.95,
                letterSpacing: "0.01em",
              }}
            >
              {title}
            </h3>
          </div>

          <div
            style={{
              position: "relative",
              width: "100%",
              height: "22rem",
              margin: "0 auto",
              borderRadius: "0px",
              overflow: "hidden",
              border: "0",
              boxShadow: "none",
              background: "#111",
            }}
          >
            {mobileLastFrame ? (
              <Image
                src={mobileLastFrame}
                alt={`${title} program frame`}
                fill
                sizes="100vw"
                style={{ objectFit: "cover", objectPosition: mobileImagePosition ?? "center" }}
              />
            ) : null}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.36) 100%)",
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.72rem", alignItems: "center", textAlign: "center" }}>
            <p
              style={{
                color: "#D4A74B",
                fontSize: "clamp(0.95rem, 4.5vw, 1.1rem)",
                fontWeight: 600,
                lineHeight: 1.3,
              }}
            >
              {subtitle}
            </p>

            <p
              style={{
                color: "rgba(255,255,255,0.82)",
                fontSize: "clamp(0.9rem, 3.9vw, 0.98rem)",
                lineHeight: 1.6,
                alignSelf: "stretch",
                textAlign: "left",
              }}
            >
              {description}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.56rem", alignSelf: "stretch", alignItems: "flex-start", textAlign: "left" }}>
              <BulletItem text={bullets[0]} />
              <BulletItem text={bullets[1]} />
              <BulletItem text={bullets[2]} />
            </div>

            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 btn-predator btn-gold text-black/95"
              style={{
                alignSelf: "center",
                fontSize: "0.85rem",
                paddingInline: "1.2rem",
                paddingBlock: "0.86rem",
                letterSpacing: "0.1em",
                marginTop: "0.35rem",
              }}
            >
              <span>{ctaText}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div
      ref={containerRef}
      id={sectionId}
      data-programs-focus={navFocusKey}
      style={{ height: effectiveScrollHeightCss }}
    >
      <div
        ref={stickyRef}
        style={{
          position: "sticky",
          top: 0,
          height: stickyViewportHeight,
          width: "100%",
          overflow: "hidden",
          background: "#0A0A0A",
          opacity: 0.82,
          transform: "scale(0.98) translateY(0vh)",
          willChange: "opacity, transform",
          ...(roundedTop && {
            clipPath: "inset(0 round 28px 28px 0px 0px)",
            boxShadow: "0 -32px 80px rgba(0,0,0,0.9)",
          }),
        }}
      >
        {/* Background media */}
        {hasImageSequence ? (
          <>
            {imageFrames?.[0] ? (
              <div style={{ position: "absolute", inset: 0 }}>
                <Image
                  src={imageFrames[0]}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="100vw"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </div>
            ) : null}
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
          </>
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

        {pretitle ? (
          <div
            ref={pretitleRef}
            style={{
              position: "absolute",
              top: "clamp(5.5rem, 9vh, 7rem)",
              left: "50%",
              transform: "translateX(-50%) translateY(0px)",
              zIndex: 12,
              padding: "0.35rem 0.9rem",
              border: "1px solid rgba(212,167,75,0.35)",
              background: "rgba(0,0,0,0.42)",
              backdropFilter: "blur(3px)",
              opacity: 1,
              willChange: "opacity, transform",
            }}
          >
            <span
              style={{
                color: "#D4A74B",
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.05rem, 2.2vw, 1.5rem)",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                textShadow: "0 0 18px rgba(0,0,0,0.35)",
              }}
            >
              {pretitle}
            </span>
          </div>
        ) : null}

        {/* Content */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: isMobileViewport ? "flex-end" : "center",
            justifyContent: isMobileViewport ? "flex-start" : isRight ? "flex-end" : "flex-start",
            paddingTop: isMobileViewport ? "clamp(5.75rem, 14svh, 8rem)" : "0",
            paddingBottom: isMobileViewport ? "clamp(1.8rem, 5svh, 3rem)" : "0",
            paddingLeft: isMobileViewport ? "clamp(1rem, 4.8vw, 1.6rem)" : "clamp(1.5rem, 6vw, 6rem)",
            paddingRight: isMobileViewport ? "clamp(1rem, 4.8vw, 1.6rem)" : "clamp(1.5rem, 6vw, 6rem)",
          }}
        >
          <div
            style={{
              maxWidth: isMobileViewport ? "100%" : "520px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: isMobileViewport ? "0.95rem" : "clamp(0.9rem, 2vw, 1.5rem)",
            }}
          >
            {/* Title */}
            <Reveal progress={scrollYProgress} range={titleRange} yOffset={36}>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: isMobileViewport
                    ? "clamp(2.15rem, 13vw, 3.1rem)"
                    : "clamp(3.5rem, 8vw, 6rem)",
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
                  fontSize: isMobileViewport
                    ? "clamp(1rem, 5vw, 1.25rem)"
                    : "clamp(1.1rem, 2.5vw, 1.5rem)",
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
                  fontSize: isMobileViewport
                    ? "clamp(0.92rem, 3.9vw, 1rem)"
                    : "clamp(0.9rem, 1.7vw, 1.1rem)",
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
                className="inline-flex items-center gap-2 btn-predator btn-gold text-black/95"
                style={{
                  fontSize: isMobileViewport ? "0.88rem" : "1.05rem",
                  paddingInline: isMobileViewport ? "1.35rem" : "2.5rem",
                  paddingBlock: isMobileViewport ? "0.9rem" : "1.25rem",
                  letterSpacing: "0.1em",
                }}
              >
                <span>{ctaText}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </Reveal>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          ref={hintRef}
          style={{
            position: "absolute",
            bottom: isMobileViewport ? "22px" : "36px",
            left: "50%",
            transform: "translateX(-50%)",
            opacity: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            pointerEvents: "none",
            willChange: "opacity",
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
        </div>
      </div>

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
