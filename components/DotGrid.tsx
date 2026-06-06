"use client";

import { useRef, useEffect } from "react";
import "./DotGrid.css";

interface DotGridProps {
    dotSize?: number;
    gap?: number;
    baseColor?: string;
    activeColor?: string;
    proximity?: number;
    shockRadius?: number;
    shockStrength?: number;
    resistance?: number;
    returnDuration?: number;
    className?: string;
    style?: React.CSSProperties;
}

export default function DotGrid({
    dotSize = 3,
    gap = 20,
    baseColor = "#2F293A",
    activeColor = "#5227FF",
    proximity = 120,
    shockRadius = 250,
    shockStrength = 5,
    resistance = 750,
    returnDuration = 1.5,
    className = "",
    style
}: DotGridProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const dotsRef = useRef<Array<{
        x: number;
        y: number;
        ox: number;
        oy: number;
        vx: number;
        vy: number;
    }>>([]);
    const mouseRef = useRef({ x: -1000, y: -1000, active: false });

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        
        const handleResize = () => {
            const rect = container.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;

            const cols = Math.floor(canvas.width / gap);
            const rows = Math.floor(canvas.height / gap);
            
            const startX = (canvas.width - (cols - 1) * gap) / 2;
            const startY = (canvas.height - (rows - 1) * gap) / 2;

            const dots = [];
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const x = startX + c * gap;
                    const y = startY + r * gap;
                    dots.push({
                        x,
                        y,
                        ox: x,
                        oy: y,
                        vx: 0,
                        vy: 0
                    });
                }
            }
            dotsRef.current = dots;
        };

        handleResize();

        const resizeObserver = new ResizeObserver(() => {
            handleResize();
        });
        resizeObserver.observe(container);

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
                active: true
            };
        };

        const handleMouseLeave = () => {
            mouseRef.current = {
                x: -1000,
                y: -1000,
                active: false
            };
        };

        // Attach listeners to container
        container.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("mouseleave", handleMouseLeave);

        const spring = 0.035;
        const friction = 0.88;

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const mouse = mouseRef.current;
            const dots = dotsRef.current;
            
            for (let i = 0; i < dots.length; i++) {
                const dot = dots[i];
                
                if (mouse.active) {
                    const dx = dot.x - mouse.x;
                    const dy = dot.y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dist < proximity) {
                        const force = (proximity - dist) / proximity;
                        const angle = Math.atan2(dy, dx);
                        const pushX = Math.cos(angle) * force * shockStrength;
                        const pushY = Math.sin(angle) * force * shockStrength;
                        
                        dot.vx += pushX;
                        dot.vy += pushY;
                    }
                }
                
                const ax = (dot.ox - dot.x) * spring;
                const ay = (dot.oy - dot.y) * spring;
                
                dot.vx = (dot.vx + ax) * friction;
                dot.vy = (dot.vy + ay) * friction;
                
                dot.x += dot.vx;
                dot.y += dot.vy;

                let color = baseColor;
                let size = dotSize;
                
                if (mouse.active) {
                    const dx = dot.x - mouse.x;
                    const dy = dot.y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < proximity) {
                        const ratio = 1 - dist / proximity;
                        // Blend between base color and active color based on proximity ratio
                        color = activeColor;
                        size = dotSize + ratio * 3;
                    }
                }
                
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, size / 2, 0, Math.PI * 2);
                ctx.fill();
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animationFrameId);
            resizeObserver.disconnect();
            container.removeEventListener("mousemove", handleMouseMove);
            container.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [dotSize, gap, baseColor, activeColor, proximity, shockRadius, shockStrength, resistance, returnDuration]);

    return (
        <div ref={containerRef} className={`dot-grid-container ${className}`} style={style}>
            <canvas ref={canvasRef} />
        </div>
    );
}
