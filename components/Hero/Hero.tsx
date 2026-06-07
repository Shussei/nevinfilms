"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "@/styles/hero.css";
import Shuffle from "@/components/Shuffle";
import GradientText from "@/components/GradientText";

export default function Hero() {
    const container = useRef<HTMLDivElement>(null);
    const introOverlayRef = useRef<HTMLDivElement>(null);
    const nameContainerRef = useRef<HTMLDivElement>(null);
    const flareRef = useRef<HTMLDivElement>(null);
    const leakRef = useRef<HTMLDivElement>(null);
    const [introFinished, setIntroFinished] = useState(false);

    useEffect(() => {
        // 1. Initial State Setup
        const navElement = document.querySelector(".cinematic-nav");
        
        // Setup starting values for animating elements to prevent any loading flash
        if (navElement) gsap.set(navElement, { opacity: 0, y: -20 });
        gsap.set(".hero-titles", { opacity: 1 });
        gsap.set(".hero-subtitle", { opacity: 0, y: 15 });
        gsap.set(".hero-background img", { opacity: 0, scale: 1.15 });

        // Calculate responsive letters spreading based on viewport width
        const count = 11; // N E V I N _ J O S E P H
        const letterMid = (count - 1) / 2;
        const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
        const spreadFactor = typeof window !== "undefined" ? Math.min(window.innerWidth * 0.03, 30) : 25;

        // Spread the letters outwards and blur them initially
        gsap.set(".hero-intro-letter", {
            opacity: 0,
            filter: isMobile ? "none" : "blur(25px)",
            scale: 0.8,
            x: (i) => (i - letterMid) * spreadFactor
        });

        // Set name container to a zoomed out state for the slow camera dolly-in
        gsap.set(nameContainerRef.current, { scale: 0.9 });
        gsap.set(leakRef.current, { opacity: 0, scale: 0.8 });

        // 2. Timeline Animation
        const tl = gsap.timeline({
            onComplete: () => {
                if (introOverlayRef.current) {
                    introOverlayRef.current.style.display = "none";
                }
            }
        });

        // Slow camera Dolly-In over the focus stage (0s to 3.5s)
        tl.to(nameContainerRef.current, {
            scale: 1.15,
            duration: 3.5,
            ease: "power1.out"
        }, 0);

        // Aperture Focus Phase: Stagger letters focusing from center
        tl.to(".hero-intro-letter", {
            opacity: 1,
            filter: isMobile ? "none" : "blur(0px)",
            scale: 1,
            x: 0,
            duration: 2.4,
            ease: "power2.out",
            stagger: {
                each: 0.08,
                from: "center"
            }
        }, 0);

        // Shutter Flicker: Analog projector bulb flicker as light starts passing
        tl.to(nameContainerRef.current, {
            opacity: 0.82,
            duration: 0.05,
            yoyo: true,
            repeat: 4,
            ease: "steps(1)"
        }, 0.15);
        tl.to(nameContainerRef.current, {
            opacity: 1,
            duration: 0.08
        }, 0.4);

        // Background Light Leak Sweep (Gold/Violet radial pulse)
        tl.to(leakRef.current, {
            opacity: 1,
            scale: 1.35,
            duration: 2.5,
            ease: "power2.out"
        }, 0.1);
        tl.to(leakRef.current, {
            opacity: 0,
            duration: 1.5,
            ease: "power2.inOut"
        }, 1.8);

        // Horizontal Lens Flare Scan Phase
        tl.set(flareRef.current, { opacity: 0.95, scaleX: 0 }, 0.6);
        tl.to(flareRef.current, {
            scaleX: 1,
            duration: 2.0,
            ease: "power3.inOut"
        }, 0.6);
        tl.to(flareRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        }, 1.8);

        // Zoom-Through Transition Phase (Starts after letters resolve and dolly-in finishes)
        const transitionStartTime = 3.5;

        // Launch camera through the text (massive scaling)
        tl.to(nameContainerRef.current, {
            scale: 32,
            opacity: 0,
            duration: 1.6,
            ease: "power4.in",
        }, transitionStartTime);

        // Simulate high-speed Motion Blur on the letters during zoom
        tl.to(".hero-intro-letter", {
            filter: isMobile ? "none" : "blur(15px)",
            letterSpacing: "0.18em",
            duration: 1.0,
            ease: "power3.in"
        }, transitionStartTime);

        // Fade overlay backdrop
        tl.to(introOverlayRef.current, {
            opacity: 0,
            duration: 1.3,
            ease: "power2.inOut",
        }, transitionStartTime + 0.3);

        // Reveal Home Page: Parallax zoom-out camera handoff (scale down from 1.15 to 1.0)
        tl.to(".hero-background img", {
            opacity: 0.5,
            scale: 1,
            duration: 2.0,
            ease: "power3.out",
        }, transitionStartTime + 0.2);

        // Staggered reveal of page branding & header info
        tl.add(() => setIntroFinished(true), transitionStartTime + 0.5);

        tl.to(".hero-subtitle", {
            opacity: 1,
            y: 0,
            duration: 1.4,
            ease: "power3.out",
        }, transitionStartTime + 0.8);

        if (navElement) {
            tl.to(navElement, {
                opacity: 1,
                y: 0,
                duration: 1.4,
                ease: "power3.out",
            }, transitionStartTime + 0.8);
        }

        // Cinematic Flicker (Flickering light reflection on page content)
        tl.add(() => {
            const flickerTl = gsap.timeline({
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
        }, transitionStartTime + 2.0);

        return () => {
            tl.kill();
        };
    }, []);

    // Split text into letters for animating
    const introName = "NEVIN JOSEPH";
    const introLetters = introName.split("");

    return (
        <div ref={container} className="hero-container">

            {/* Cinematic Intro Text Overlay */}
            <div ref={introOverlayRef} className="hero-intro-overlay-wrap">
                <div className="hero-intro-vignette" />
                <div ref={leakRef} className="hero-intro-light-leak" />
                <div ref={flareRef} className="hero-intro-lens-flare" />
                <div ref={nameContainerRef} className="hero-intro-name-container">
                    {introLetters.map((char, index) => {
                        if (char === " ") {
                            return <span key={index} className="hero-intro-space" />;
                        }
                        return (
                            <span key={index} className="hero-intro-letter">
                                {char}
                            </span>
                        );
                    })}
                </div>
            </div>

            {/* Background Image */}
            <div className="hero-background">
                <img src="/hero-bg.png" alt="Nevin Joseph Background" />
                <div className="hero-overlay"></div>
            </div>

            {/* Main Content */}
            <div className="hero-section hero-main-page">
                <div className="film-grain"></div>

                <div className="hero-titles">
                    {introFinished ? (
                        <Shuffle
                            text="NEVIN JOSEPH"
                            className="hero-main-title"
                            shuffleDirection="right"
                            duration={0.35}
                            animationMode="evenodd"
                            shuffleTimes={1}
                            ease="power3.out"
                            stagger={0.03}
                            threshold={0.1}
                            triggerOnce={true}
                            triggerOnHover
                            respectReducedMotion={true}
                            loop={false}
                            loopDelay={0}
                            tag="h1"
                        />
                    ) : (
                        <h1 className="hero-main-title" style={{ opacity: 0 }}>NEVIN JOSEPH</h1>
                    )}
                    <GradientText
                        colors={["#C4B5FD", "#8B7CF6", "#E2D9F3"]}
                        animationSpeed={10}
                        className="hero-subtitle parallax-lite"
                    >
                        DIRECTOR
                    </GradientText>
                </div>
            </div>
        </div>
    );
}
