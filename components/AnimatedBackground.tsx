"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useIsDesktop } from "@/hooks/useIsDesktop";

export default function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    // Accessibility & Breakpoint Guard
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !isDesktop) return;

    const ctx = gsap.context(() => {
      // Layer 1 - FAR
      gsap.to(".blob-far", {
        x: "+=150",
        y: "+=100",
        scale: 1.05,
        duration: () => gsap.utils.random(30, 45),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Layer 2 - MID
      gsap.to(".blob-mid", {
        x: "-=200",
        y: "+=150",
        scale: 1.08,
        duration: () => gsap.utils.random(18, 25),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Layer 3 - NEAR
      gsap.to(".blob-near", {
        x: "+=250",
        y: "-=180",
        scale: 1.12,
        duration: () => gsap.utils.random(10, 16),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isDesktop]);

  // Animation Degradation: Remove heavy GPU effects on small devices
  if (isDesktop === false) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -10,
          backgroundColor: "#030303", // Static clean background
        }}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className="animated-bg"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        overflow: "hidden",
        backgroundColor: "transparent",
      }}
    >
      {/* blob layers only render for desktop to avoid GPU overhead on mobile */}
      {isDesktop && (
        <>
          <div 
            className="ambient-blob blob-far"
            style={{
              position: "absolute",
              top: "5%",
              left: "10%",
              width: "600px",
              height: "600px",
              borderRadius: "50%",
              backgroundColor: "#7c3aed",
              opacity: 0.08,
              filter: "blur(130px)",
              willChange: "transform"
            }}
          />
          <div 
            className="ambient-blob blob-far"
            style={{
              position: "absolute",
              bottom: "5%",
              right: "5%",
              width: "650px",
              height: "550px",
              borderRadius: "50%",
              backgroundColor: "#06b6d4",
              opacity: 0.07,
              filter: "blur(140px)",
              willChange: "transform"
            }}
          />
          <div 
            className="ambient-blob blob-mid"
            style={{
              position: "absolute",
              top: "40%",
              left: "60%",
              width: "450px",
              height: "450px",
              borderRadius: "50%",
              backgroundColor: "#ec4899",
              opacity: 0.12,
              filter: "blur(80px)",
              willChange: "transform",
              transform: "translate(-50%, -50%)"
            }}
          />
          <div 
            className="ambient-blob blob-near"
            style={{
              position: "absolute",
              bottom: "15%",
              left: "25%",
              width: "350px",
              height: "350px",
              borderRadius: "50%",
              backgroundColor: "#06b6d4",
              opacity: 0.15,
              filter: "blur(50px)",
              willChange: "transform"
            }}
          />
        </>
      )}
    </div>
  );
}
