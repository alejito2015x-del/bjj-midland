"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
 */
export default function HeroPinWrapper() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: exitProgress } = useScroll({
    target: containerRef,
    offset: ["end end", "end start"],
  });

  // Cancels the -1px/px drift after sticky breaks → Hero stays at top:0
  const exitY = useTransform(exitProgress, [0, 1], ["0vh", "100vh"]);

  return (
    <div ref={containerRef} style={{ position: "relative", height: "200vh" }}>
      <motion.div style={{ position: "sticky", top: 0, y: exitY, zIndex: 0 }}>
        <Hero />
      </motion.div>
    </div>
  );
}
