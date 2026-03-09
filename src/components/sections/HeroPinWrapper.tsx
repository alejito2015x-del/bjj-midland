"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import Hero from "./Hero";

/**
 * Keeps the Hero section pinned at the top of the viewport while the BJJ GI
 * card rises from below and slides over it.
 *
 * Layout math:
 *   - Container = 200vh  (100vh Hero + 100vh scroll room for GI's rise)
 *   - Hero sticky breaks at scrollY = absTop + 100vh
 *   - exitY compensates the natural upward drift (+1px per px of scroll)
 *     so Hero stays visually at top:0 during the full 100vh GI rise.
 *   - When GI reaches top:0 and sticks, it fully covers the Hero.
 *
 * Uses a manual scroll listener instead of Framer Motion's useScroll so the
 * initial value is always computed correctly on first page load.
 */
export default function HeroPinWrapper() {
  const containerRef = useRef<HTMLDivElement>(null);
  const exitY = useMotionValue("0vh");

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh   = window.innerHeight;

      // exitProgress: 0 when container bottom = viewport bottom,
      //               1 when container bottom = viewport top.
      // Same as useScroll offset ["end end", "end start"].
      const rawExit = 1 - rect.bottom / vh;
      const frac    = Math.min(1, Math.max(0, rawExit));
      exitY.set(`${frac * 100}vh`);
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update(); // Initialise immediately — correct on first load

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [exitY]);

  return (
    <div ref={containerRef} style={{ position: "relative", height: "200vh" }}>
      <motion.div style={{ position: "sticky", top: 0, y: exitY, zIndex: 0 }}>
        <Hero />
      </motion.div>
    </div>
  );
}
