"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    key: "gi",
    num: "01",
    title: "BJJ GI",
    subtitle: "Technique, control and precision",
    description:
      "Discover the gentle art. Build patience, strategy, and technical precision with traditional gi training for self-defense and competition.",
    bullets: [
      "Fundamentals and advanced techniques",
      "Better physical and mental conditioning",
      "Strong community and discipline",
    ],
    ctaText: "View GI Schedule",
    ctaHref: "/?scheduleFilter=bjj-gi#schedule",
    image: "/images/bjj-gi-mobile-v2.jpg",
    imagePosition: "center 55%",
  },
  {
    key: "nogi",
    num: "02",
    title: "BJJ NO-GI",
    subtitle: "Speed, pressure and transitions",
    description:
      "Train without the kimono in a faster-paced grappling format. Perfect for athletes who want explosive takedowns, scrambles, and submissions.",
    bullets: [
      "Dynamic submission wrestling",
      "High pace rounds and cardio gains",
      "Direct transfer to MMA and self-defense",
    ],
    ctaText: "View NO-GI Schedule",
    ctaHref: "/?scheduleFilter=bjj-nogi#schedule",
    image: "/images/bjj-nogi-mobile.png",
    imagePosition: "center top",
  },
  {
    key: "mma",
    num: "03",
    title: "MMA / WRESTLING",
    subtitle: "Complete combat development",
    description:
      "Combine striking, wrestling, and submissions in one integrated system. Develop timing, pressure, and fight IQ for real competitive performance.",
    bullets: [
      "Striking, takedowns, and ground control",
      "Scenario-based fight preparation",
      "Coaching for amateur and advanced levels",
    ],
    ctaText: "View MMA Schedule",
    ctaHref: "/?scheduleFilter=mma#schedule",
    image: "/images/mma-mobile-chatgpt-20260311.jpg",
    imagePosition: "30% top",
  },
];

const variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

const transition = {
  x: { type: "tween" as const, ease: [0.32, 0, 0.67, 0] as [number, number, number, number], duration: 0.38 },
  opacity: { duration: 0.22 },
};

export default function MobileProgramCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((next: number, dir: number) => {
    setDirection(dir);
    setIndex(next);
  }, []);

  const stopInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  const resetInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % slides.length);
    }, 3000);
  }, []);

  useEffect(() => {
    if (paused) {
      stopInterval();
    } else {
      resetInterval();
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [paused, resetInterval, stopInterval]);

  const prev = () => { goTo((index - 1 + slides.length) % slides.length, -1); };
  const next = () => { goTo((index + 1) % slides.length, 1); };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 44) {
      // Swipe: advance and reset the timer from scratch
      dx < 0 ? next() : prev();
      setPaused(false);
      resetInterval();
    } else if (Math.abs(dx) < 8 && Math.abs(dy) < 8) {
      // Tap (no movement): toggle pause
      setPaused((p) => !p);
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const slide = slides[index];

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        background: "#0A0A0A",
        touchAction: "pan-y",
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={slide.key}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={transition}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            background: "#0A0A0A",
          }}
        >
          {/* Image area — fixed height, image contained inside */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "42svh",
              flexShrink: 0,
              background: "#0A0A0A",
            }}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              sizes="100vw"
              priority={index === 0}
              style={{
                objectFit: "cover",
                objectPosition: slide.imagePosition,
              }}
            />
            {/* Fade bottom edge into background */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "40%",
                background: "linear-gradient(to bottom, transparent, #0A0A0A)",
              }}
            />
          </div>

          {/* Content — directly below image, fixed layout so all slides are identical */}
          <div
            style={{
              padding: "0.75rem 1.25rem 1rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.65rem",
            }}
          >
            {/* Title — fixed height so short/long titles don't shift content below */}
            <div style={{ height: "3.6rem", display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2.8rem",
                  color: "#fff",
                  lineHeight: 0.92,
                  letterSpacing: "0.01em",
                  margin: 0,
                  whiteSpace: "nowrap",
                  textAlign: "center",
                }}
              >
                {slide.title}
              </h3>
            </div>

            {/* Subtitle */}
            <p
              style={{
                color: "#D4A74B",
                fontSize: "1rem",
                fontWeight: 600,
                lineHeight: 1.3,
                margin: 0,
              }}
            >
              {slide.subtitle}
            </p>

            {/* Description */}
            <p
              style={{
                color: "rgba(255,255,255,0.78)",
                fontSize: "0.88rem",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {slide.description}
            </p>

            {/* Bullets — 3 items, fixed gap */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
              {slide.bullets.map((b) => (
                <div
                  key={b}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.65rem",
                    color: "rgba(255,255,255,0.88)",
                    fontSize: "0.88rem",
                    height: "1.4rem",
                  }}
                >
                  <span
                    style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      background: "#D4A74B",
                      boxShadow: "0 0 8px rgba(212,167,75,0.6)",
                      flexShrink: 0,
                    }}
                  />
                  {b}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ marginTop: "0.4rem", display: "flex", justifyContent: "center" }}>
              <Link
                href={slide.ctaHref}
                className="inline-flex items-center gap-2 btn-predator btn-gold text-black/95"
                style={{
                  fontSize: "0.84rem",
                  paddingInline: "1.2rem",
                  paddingBlock: "0.85rem",
                  letterSpacing: "0.1em",
                }}
              >
                <span>{slide.ctaText}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dot indicators + pause hint */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          padding: "14px 0 18px",
        }}
      >
        {slides.map((s, i) => (
          <button
            key={s.key}
            onClick={() => { goTo(i, i > index ? 1 : -1); setPaused(false); resetInterval(); }}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: i === index ? "24px" : "8px",
              height: "8px",
              borderRadius: "4px",
              background: i === index
                ? (paused ? "rgba(212,167,75,0.45)" : "#D4A74B")
                : "rgba(255,255,255,0.3)",
              border: "none",
              padding: 0,
              cursor: "pointer",
              transition: "width 0.3s ease, background 0.3s ease",
            }}
          />
        ))}
        {paused && (
          <span style={{
            fontSize: "9px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
            fontFamily: "var(--font-display)",
            marginLeft: "4px",
          }}>
            Paused
          </span>
        )}
      </div>
    </div>
  );
}
