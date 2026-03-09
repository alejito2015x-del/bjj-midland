"use client";

import { useState, useEffect, ReactNode } from "react";

/**
 * Renders children only after client hydration is complete.
 * Prevents Framer Motion animations from initializing mid-hydration,
 * which causes them to intermittently not fire on refresh.
 */
export default function ClientShell({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <>{children}</>;
}
