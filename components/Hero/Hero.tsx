"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import "@/styles/hero.css";
import { useIsDesktop } from "@/hooks/useIsDesktop";

export default function Hero() {
    const container = useRef<HTMLDivElement>(null);
    const isDesktop = useIsDesktop();

    useEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();
            const navElement = document.querySelector(".cinematic-nav");
            if (navElement) gsap.set(navElement, { opacity: 0, y: -20 });

            // ─── Base Intro (Universal) ───
            const tl = gsap.timeline();

            // 1. Branding Intro (Logo hold)
            tl.to(".hero-logo-container", {
                duration: 2.0,
            });

            // 2. The Transition to content
            tl.to(".hero-logo-container", {
                opacity: 0,
                scale: 1.1,
                duration: 1.2,
                ease: "power2.inOut",
                onComplete: () => {
                    gsap.set(".hero-logo-container", { display: "none" });
                }
            });

            tl.to(".hero-background img", {
                opacity: 0.5,
                scale: 1,
                duration: 2.0,
                ease: "power2.out",
            }, "-=0.8");

            tl.to(".hero-titles", {
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: "power3.out",
            }, "-=1.2");

            if (navElement) {
                tl.to(navElement, { 
                    opacity: 1, 
                    y: 0, 
                    duration: 1.0, 
                    ease: "power3.out" 
                }, "-=0.8");
            }

            // ─── Desktop-Only Cinematic Pipeline (>= 1024px) ───
            mm.add("(min-width: 1024px)", () => {
                const flickerTl = gsap.timeline({
                    paused: true,
                    repeat: -1,
                    repeatRefresh: true
                });

                flickerTl
                    .to(".hero-titles", {
                        opacity: () => gsap.utils.random(0.9, 0.95),
                        duration: () => gsap.utils.random(0.04, 0.08)
                    })
                    .to(".hero-titles", {
                        opacity: 1,
                        duration: () => gsap.utils.random(0.1, 0.2)
                    })
                    .to(".hero-titles", {
                        opacity: () => gsap.utils.random(0.92, 0.97),
                        duration: () => gsap.utils.random(0.03, 0.06)
                    })
                    .to(".hero-titles", {
                        opacity: 1,
                        duration: () => gsap.utils.random(0.1, 0.2)
                    })
                    .to({}, {
                        duration: () => gsap.utils.random(4, 10)
                    });

                // Attach flicker precisely after intro
                tl.add(() => {
                    console.log("[GSAP] Initializing cinematic flicker (Desktop Only)");
                    flickerTl.play(0);
                });

                return () => {
                    flickerTl.kill();
                };
            });

        }, container);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={container} className="hero-container">
            {/* Branding Intro Page */}
            <div className="hero-section hero-intro-page">
                <div className="hero-logo-container">
                    <svg className="hero-aperture" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
                        <path d="M50 2 L50 30 M75 15 L60 40 M98 50 L70 50 M75 85 L60 60 M50 98 L50 70 M25 85 L40 60 M2 50 L30 50 M25 15 L40 40" stroke="currentColor" strokeWidth="1" fill="none" />
                        <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    </svg>
                </div>
            </div>

            {/* Main Content Page */}
            <div className="hero-section hero-main-page">
                <div className="hero-background">
                    <img src="/hero-bg.png" alt="Cinematic Background" loading="lazy" />
                    <div className="hero-overlay"></div>
                </div>
                
                <div className="film-grain"></div>
                
                <div className="hero-titles">
                    <h1 className="hero-main-title">NEVIN JOSEPH</h1>
                    <p className="hero-subtitle">CINEMATOGRAPHER</p>
                </div>
            </div>
        </div>
    );
}