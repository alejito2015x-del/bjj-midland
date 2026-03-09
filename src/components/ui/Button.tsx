"use client";

import { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      fullWidth = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-black uppercase tracking-[0.2em] transition-all duration-300 focus:outline-none";

    const variants = {
      primary:
        "bg-brand-neon text-black hover:bg-white glow-neon",
      secondary:
        "bg-brand-red text-white hover:opacity-90 glow-red",
      outline:
        "border border-brand-border text-white hover:border-white hover:bg-white/5",
      ghost:
        "text-white/40 hover:text-white hover:bg-white/5",
    };

    const sizes = {
      sm: "px-6 py-3 text-[10px]",
      md: "px-8 py-4 text-[11px]",
      lg: "px-12 py-6 text-[12px]",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""
          } ${className}`}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export default Button;
