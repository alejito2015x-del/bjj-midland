"use client";

import { useEffect } from "react";

/**
 * Disables browser scroll restoration and resets scroll to 0 on every page load.
 * This ensures scroll-driven animations (Framer Motion useScroll, sticky sections)
 * always initialize from the correct starting position.
 */
export default function ScrollReset() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    // Prevent browser from restoring scroll position on refresh
    window.history.scrollRestoration = "manual";
    // Use 'instant' so Framer Motion always initializes at scroll 0
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return null;
}
