"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import "@/styles/cursor.css";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const text = textRef.current;
    if (!cursor || !text) return;

    // Center origin
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    let xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3.out" });
    let yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3.out" });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);

    // Hover states
    const setHover = () => {
      gsap.to(cursor, { scale: 3, backgroundColor: "rgba(255,255,255,0.1)", backdropFilter: "blur(4px)", duration: 0.3 });
    };
    
    // Video play state
    const setPlayHover = () => {
      gsap.to(cursor, { scale: 4.5, backgroundColor: "#fff", mixBlendMode: "normal", duration: 0.3 });
      text.innerText = "PLAY";
      gsap.to(text, { opacity: 1, scale: 0.25, duration: 0.2, delay: 0.1 });
    };

    const removeHover = () => {
      gsap.to(cursor, { scale: 1, backgroundColor: "#fff", mixBlendMode: "difference", backdropFilter: "blur(0px)", duration: 0.3 });
      gsap.to(text, { opacity: 0, scale: 0, duration: 0.2 });
    };

    const handleMouseOver = (e: Event) => {
      const target = e.target as HTMLElement;
      // Button/link hover
      if (target.closest("a") || target.closest("button") || target.closest(".cinematic-nav__btn")) {
        setHover();
      } 
      // Work Gallery specific hover
      else if (target.closest(".work-grid-item")) {
        setPlayHover();
      }
      else {
          removeHover();
      }
    };

    document.addEventListener("mouseover", handleMouseOver);

    // Initial check removal when cursor leaves document
    const handleMouseLeave = () => {
        gsap.to(cursor, { opacity: 0, duration: 0.2 });
    };
    const handleMouseEnter = () => {
        gsap.to(cursor, { opacity: 1, duration: 0.2 });
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  return (
    <div ref={cursorRef} className="custom-cursor">
      <div ref={textRef} className="custom-cursor-text"></div>
    </div>
  );
}
