"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

type AnimationVariant = "fadeUp" | "fadeLeft" | "fadeRight" | "scale" | "clip";

type SectionRevealProps = {
  children: ReactNode;
  delay?: number;
  amount?: number;
  className?: string;
  variant?: AnimationVariant;
};

type MotionValues = {
  opacity?: number;
  y?: number;
  x?: number;
  scale?: number;
  clipPath?: string;
};

function getInitialValues(variant: AnimationVariant): MotionValues {
  switch (variant) {
    case "fadeUp":
      return { opacity: 0, y: 60 };
    case "fadeLeft":
      return { opacity: 0, x: 80 };
    case "fadeRight":
      return { opacity: 0, x: -80 };
    case "scale":
      return { opacity: 0, scale: 0.88 };
    case "clip":
      return { opacity: 0, clipPath: "inset(0 0 100% 0)" };
  }
}

function getAnimateValues(variant: AnimationVariant): MotionValues {
  switch (variant) {
    case "fadeUp":
      return { opacity: 1, y: 0 };
    case "fadeLeft":
      return { opacity: 1, x: 0 };
    case "fadeRight":
      return { opacity: 1, x: 0 };
    case "scale":
      return { opacity: 1, scale: 1 };
    case "clip":
      return { opacity: 1, clipPath: "inset(0 0 0% 0)" };
  }
}

export default function SectionReveal({
  children,
  delay = 0,
  amount = 0.14,
  className,
  variant = "fadeUp",
}: SectionRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const initial = shouldReduceMotion ? { opacity: 1 } : getInitialValues(variant);
  const animate = getAnimateValues(variant);

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, amount }}
      transition={{
        duration: 0.75,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
