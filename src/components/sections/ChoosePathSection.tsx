"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ChoosePathSection() {
  const ref = useRef<HTMLDivElement>(null);

  // Track as the section scrolls off the top of the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "end start"],
  });

  const scale   = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const y       = useTransform(scrollYProgress, [0, 1], [0, -20]);

  return (
    <div ref={ref}>
      <motion.section
        id="programs"
        style={{ scale, opacity, y, willChange: "transform, opacity" }}
        className="bg-background-elevated relative pt-8 md:pt-12 pb-2 overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(212,167,75,0.03),transparent)]" />
        <div className="relative text-center px-6">
          <h2
            className="text-5xl md:text-7xl lg:text-8xl text-white mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            CHOOSE YOUR
            <span className="block text-gradient-gold">PATH</span>
          </h2>
        </div>
      </motion.section>
    </div>
  );
}
