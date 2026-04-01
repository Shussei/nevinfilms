"use client";

import { useEffect, ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScroller({ children }: { children: ReactNode }) {
  useEffect(() => {
    let lenis: Lenis;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    
    // ─── HARD DISABLE FOR MOBILE ───
    if (isMobile) {
      (window as any).lenis = undefined;
      return;
    }

    lenis = new Lenis({
        lerp: 0.05,
        duration: 1.2,
        smoothWheel: true,
        // @ts-ignore - part of user-provided mandatory config
        smoothTouch: true,
    });

    // Expose lenis for global control (e.g. mobile menu lock)
    (window as any).lenis = lenis;

    // Scroller Proxy (MANDATORY)
    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value as number);
        }
        return (lenis as any).scroll?.y ?? window.scrollY;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight
        };
      }
    });

    // Unified RAF Loop (MANDATORY)
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      ScrollTrigger.update();
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Refresh Sync after initialization
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(rafId);
      if (lenis) {
          lenis.destroy();
      }
    };
  }, []);

  return <>{children}</>;
}
