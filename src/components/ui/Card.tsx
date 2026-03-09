"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface CardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  variant?: "default" | "elevated" | "highlighted";
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
}

export default function Card({
  children,
  variant = "default",
  padding = "md",
  hover = true,
  className = "",
  ...props
}: CardProps) {
  const variants = {
    default: "bg-[#141414] border border-[#D4A74B]/10",
    elevated: "bg-[#1A1A1A] border border-[#D4A74B]/20 shadow-lg",
    highlighted: "bg-[#141414] border-2 border-[#D4A74B] glow-gold",
  };

  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={hover ? { borderColor: "rgba(212, 167, 75, 0.3)" } : undefined}
      transition={{ duration: 0.3 }}
      className={`rounded-xl ${variants[variant]} ${paddings[padding]} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
