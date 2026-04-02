"use client";

import { useEffect } from "react";

/**
 * MobileReveal Component
 * Handles cinematic reveals on mobile (<768px) using native IntersectionObserver.
 * Strictly avoids GSAP for scroll-based triggers on mobile.
 */
export default function MobileReveal() {
  useEffect(() => {
    // Only run on mobile
    if (window.innerWidth >= 768) return;

    // ─── REVEAL OBSERVER ───
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const revealElements = document.querySelectorAll(
      ".mobile-reveal, .mobile-reveal-image, .section-divider, .text-focus"
    );
    revealElements.forEach((el) => revealObserver.observe(el));

    // ─── PARALLAX LITE (Scroll Offset) ───
    let ticking = false;
    const updateScrollOffset = () => {
      document.documentElement.style.setProperty("--scroll-offset", window.scrollY.toString());
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollOffset);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    // Cleanup
    return () => {
      revealObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null; // Side-effect only component
}
