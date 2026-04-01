"use client";

import { useRef, useEffect } from "react";

export default function FilmGrain() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const renderGrain = () => {
            const { width, height } = canvas;
            const imageData = ctx.createImageData(width, height);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                const v = Math.random() * 255;
                data[i] = v;       // R
                data[i + 1] = v;   // G
                data[i + 2] = v;   // B
                data[i + 3] = 255; // A
            }

            ctx.putImageData(imageData, 0, 0);
            animationId = requestAnimationFrame(renderGrain);
        };

        resize();
        window.addEventListener("resize", resize);
        renderGrain();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return <canvas ref={canvasRef} className="film-grain" />;
}
