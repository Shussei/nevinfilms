"use client";

import { useState, useEffect } from "react";

/**
 * SSR-safe hook to detect if the current viewport is Desktop (>= 1024px).
 * strictly maps to the 'desktop' breakpoint in the responsive strategy.
 */
export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    
    // Initial check
    setIsDesktop(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return isDesktop;
}
