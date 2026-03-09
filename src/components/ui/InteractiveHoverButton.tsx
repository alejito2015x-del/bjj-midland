"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  icon?: React.ReactNode;
  variant?: "gold" | "outline";
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ text = "Button", icon, variant = "gold", className, ...props }, ref) => {
  const isGold = variant === "gold";

  return (
    <button
      ref={ref}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-full text-center font-semibold text-sm tracking-[0.15em] uppercase transition-all duration-500 ease-out",
        isGold
          ? "bg-gradient-to-r from-gold via-gold-light to-gold text-background border border-gold-light/50 shadow-[0_0_20px_rgba(212,167,75,0.25)] hover:shadow-[0_0_40px_rgba(212,167,75,0.5),0_0_80px_rgba(212,167,75,0.15)]"
          : "bg-transparent text-gold border border-gold/40 hover:border-gold/80 shadow-[0_0_15px_rgba(212,167,75,0.08)] hover:shadow-[0_0_30px_rgba(212,167,75,0.2)]",
        "hover:scale-[1.03] active:scale-[0.98]",
        className,
      )}
      {...props}
    >
      {/* Shimmer sweep */}
      <div
        className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
        style={{
          background: isGold
            ? "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.35) 50%, transparent 60%)"
            : "linear-gradient(105deg, transparent 40%, rgba(212,167,75,0.15) 50%, transparent 60%)",
        }}
      />

      {/* Ambient glow layer for outline */}
      {!isGold && (
        <div className="absolute inset-0 rounded-full bg-gold/0 group-hover:bg-gold/[0.06] transition-all duration-500" />
      )}

      {/* Inner highlight edge (top) */}
      <div
        className={cn(
          "absolute top-0 left-[10%] right-[10%] h-px transition-opacity duration-500",
          isGold
            ? "bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-60 group-hover:opacity-100"
            : "bg-gradient-to-r from-transparent via-gold/30 to-transparent opacity-0 group-hover:opacity-100",
        )}
      />

      {/* Default state text */}
      <span className="relative z-10 inline-flex items-center gap-2.5 transition-all duration-500 ease-out group-hover:opacity-0 group-hover:-translate-x-3">
        {icon}
        {text}
      </span>

      {/* Hover state text */}
      <span
        className={cn(
          "absolute inset-0 z-10 flex items-center justify-center gap-2.5 translate-x-3 opacity-0 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:opacity-100",
          isGold ? "text-background" : "text-gold",
        )}
      >
        {text}
        <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
      </span>

      {/* Bottom highlight edge */}
      <div
        className={cn(
          "absolute bottom-0 left-[10%] right-[10%] h-px transition-opacity duration-500",
          isGold
            ? "bg-gradient-to-r from-transparent via-gold-dark/60 to-transparent opacity-40"
            : "bg-gradient-to-r from-transparent via-gold/20 to-transparent opacity-0 group-hover:opacity-60",
        )}
      />
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };
