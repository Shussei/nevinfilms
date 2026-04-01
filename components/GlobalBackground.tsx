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

    // --- Cinematic Particle System (Dust Motes) ---
    const particles: { x: number; y: number; size: number; speedX: number; speedY: number; opacity: number }[] = [];
    for (let i = 0; i < 20; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 2 + 1,
            speedX: (Math.random() - 0.5) * 0.15,
            speedY: (Math.random() - 0.5) * 0.15,
            opacity: Math.random() * 0.15 + 0.05
        });
    }

    const draw = () => {
      frame++;
      
      // Fluid mouse interpolation (smooth follow)
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // 1. Deep Cinematic Base
      const bgGradient = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, width
      );
      bgGradient.addColorStop(0, "#0a0a0a"); // Slightly deeper gray base
      bgGradient.addColorStop(1, "#000000"); // Infinite black corners
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // 2. Secondary Ambient Color (Warm Amber)
      const warmX = width * 0.4 + Math.cos(frame * 0.002) * width * 0.2;
      const warmY = height * 0.4 + Math.sin(frame * 0.001) * height * 0.2;
      const warmLight = ctx.createRadialGradient(warmX, warmY, 0, warmX, warmY, width * 0.6);
      warmLight.addColorStop(0, "rgba(220, 160, 60, 0.025)"); // Very subtle warm glow
      warmLight.addColorStop(1, "rgba(220, 160, 60, 0)");
      ctx.fillStyle = warmLight;
      ctx.fillRect(0, 0, width, height);

      // 3. Primary Ambient Color (Cool Blue)
      const coolX = width * 0.6 + Math.sin(frame * 0.002) * width * 0.3;
      const coolY = height * 0.5 + Math.cos(frame * 0.0015) * height * 0.2;
      const coolLight = ctx.createRadialGradient(coolX, coolY, 0, coolX, coolY, width * 0.5);
      coolLight.addColorStop(0, "rgba(100, 150, 220, 0.035)"); // Subdued silver-blue
      coolLight.addColorStop(1, "rgba(100, 150, 220, 0)");
      ctx.fillStyle = coolLight;
      ctx.fillRect(0, 0, width, height);

      // 4. Interactive Spotlight (Organic Pulse)
      const pulse = Math.sin(frame * 0.02) * 0.05 + 1.0; // Slow pulse 0.95 -> 1.05
      const spotlightRadius = width * 0.4 * pulse;
      const spotLight = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, spotlightRadius);
      spotLight.addColorStop(0, "rgba(255, 255, 255, 0.12)"); // Crisp white light
      spotLight.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = spotLight;
      ctx.fillRect(0, 0, width, height);

      // 5. Cinematic Particle Loop (Dust Motes)
      particles.forEach(p => {
          // Movement
          p.x += p.x < 0 ? width : p.x > width ? -width : p.speedX;
          p.y += p.y < 0 ? height : p.y > height ? -height : p.speedY;

          // Catch the spotlight light
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const inLight = Math.max(0, 1 - dist / (spotlightRadius * 0.8));
          
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity + (inLight * 0.3)})`;
          ctx.fill();
      });

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