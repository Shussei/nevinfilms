"use client";

import { useEffect, useRef } from "react";

export default function GlobalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetX = width / 2;
    let targetY = height / 2;

    const setSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    setSize();
    window.addEventListener("resize", setSize);

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };
    window.addEventListener("mousemove", onMouseMove);

    let frame = 0;
    let animationId: number;

    const draw = () => {
      frame++;
      
      // Fluid mouse interpolation (smooth follow)
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Deep cinematic base
      const bgGradient = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, width
      );
      bgGradient.addColorStop(0, "#080808");
      bgGradient.addColorStop(1, "#000000");
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Interactive Spotlight (follows mouse, very dynamic)
      const spotLight = ctx.createRadialGradient(
        mouseX, mouseY, 0,
        mouseX, mouseY, width * 0.4
      );
      spotLight.addColorStop(0, "rgba(255, 255, 255, 0.1)"); // Crisp white light
      spotLight.addColorStop(1, "rgba(255, 255, 255, 0)");
      
      ctx.fillStyle = spotLight;
      ctx.fillRect(0, 0, width, height);

      // Ambient moving light (cool daylight)
      const coolX = width * 0.5 + Math.sin(frame * 0.003) * width * 0.3;
      const coolY = height * 0.5 + Math.cos(frame * 0.002) * height * 0.3;

      const coolLight = ctx.createRadialGradient(
        coolX, coolY, 0,
        coolX, coolY, width * 0.5
      );
      coolLight.addColorStop(0, "rgba(180, 200, 220, 0.04)"); // Subdued silver/blue
      coolLight.addColorStop(1, "rgba(180, 200, 220, 0)");

      ctx.fillStyle = coolLight;
      ctx.fillRect(0, 0, width, height);

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", setSize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="global-bg" />;
}