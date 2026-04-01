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
    const ctx = gsap.context(() => {
      const isMobile = !isDesktop;

      // Layer 1 - FAR
      gsap.to(".blob-far", {
        x: isMobile ? "+=50" : "+=150",
        y: isMobile ? "+=30" : "+=100",
        scale: isMobile ? 1.02 : 1.05,
        duration: isMobile ? 35 : 22,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Layer 2 - MID
      gsap.to(".blob-mid", {
        x: isMobile ? "-=60" : "-=200",
        y: isMobile ? "+=40" : "+=150",
        scale: isMobile ? 1.03 : 1.08,
        duration: isMobile ? 25 : 16,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Layer 3 - NEAR
      gsap.to(".blob-near", {
        x: isMobile ? "+=70" : "+=250",
        y: isMobile ? "-=50" : "-=180",
        scale: isMobile ? 1.04 : 1.12,
        duration: isMobile ? 20 : 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isDesktop]);

  // Mobile optimization: Render blobs with extremely low opacity and simplified styles
  const isMobile = !isDesktop;

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
      {/* blob layers render with boosted opacity for contrast */}
        <>
      <div 
        className="ambient-blob blob-far"
        style={{
          position: "absolute",
          top: "5%",
          left: "10%",
          width: isMobile ? "300px" : "600px",
          height: isMobile ? "300px" : "600px",
          borderRadius: "50%",
          backgroundColor: "#064e3b", // Deep Emerald
          opacity: isMobile ? 0.08 : 0.15,
          filter: isMobile ? "blur(60px)" : "blur(130px)",
          willChange: "transform"
        }}
      />
      <div 
        className="ambient-blob blob-far"
        style={{
          position: "absolute",
          bottom: "5%",
          right: "5%",
          width: isMobile ? "350px" : "650px",
          height: isMobile ? "250px" : "550px",
          borderRadius: "50%",
          backgroundColor: "#1e1b4b", // Midnight Indigo
          opacity: isMobile ? 0.06 : 0.12,
          filter: isMobile ? "blur(70px)" : "blur(140px)",
          willChange: "transform"
        }}
      />
      <div 
        className="ambient-blob blob-mid"
        style={{
          position: "absolute",
          top: "40%",
          left: "60%",
          width: isMobile ? "250px" : "450px",
          height: isMobile ? "250px" : "450px",
          borderRadius: "50%",
          backgroundColor: "#312e81", // Slightly lighter Indigo
          opacity: isMobile ? 0.12 : 0.22,
          filter: isMobile ? "blur(40px)" : "blur(80px)",
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
          width: isMobile ? "200px" : "350px",
          height: isMobile ? "200px" : "350px",
          borderRadius: "50%",
          backgroundColor: "#92400e", // Muted Amber for subtle cinematic warmth
          opacity: isMobile ? 0.14 : 0.28,
          filter: isMobile ? "blur(30px)" : "blur(60px)",
          willChange: "transform"
        }}
      />
        </>
    </div>
  );
}
