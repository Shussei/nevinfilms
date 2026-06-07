"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "@/styles/hero.css";
import Shuffle from "@/components/Shuffle";
import GradientText from "@/components/GradientText";

export default function Hero() {
    const container = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const videoWrapRef = useRef<HTMLDivElement>(null);
    const [introFinished, setIntroFinished] = useState(false);
    const didTransition = useRef(false);

    // The crossfade from video to hero content
    const runTransition = () => {
        if (didTransition.current) return;
        didTransition.current = true;

        const navElement = document.querySelector(".cinematic-nav");
        const tl = gsap.timeline();

        // Fade out the video overlay
        tl.to(videoWrapRef.current, {
            opacity: 0,
            duration: 1.0,
            ease: "power2.inOut",
            onComplete: () => {
                if (videoWrapRef.current) videoWrapRef.current.style.display = "none";
                if (videoRef.current) {
                    videoRef.current.pause();
                    videoRef.current.src = "";
                }
            }
        });

        // Simultaneously reveal the background image
        tl.to(".hero-background img", {
            opacity: 0.5,
            scale: 1,
            duration: 1.4,
            ease: "power2.out",
        }, 0);

        // Trigger name shuffle immediately as video fades
        tl.add(() => setIntroFinished(true), 0.1);

        // DIRECTOR + nav fade in after name shuffle has started
        tl.to(".hero-subtitle", {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: "power3.out",
        }, 0.9);

        if (navElement) {
            tl.to(navElement, {
                opacity: 1,
                y: 0,
                duration: 1.0,
                ease: "power3.out",
            }, 0.9);
        }

        // Cinematic flicker after everything is in
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
        }, ">+0.5");
    };

    useEffect(() => {
        const navElement = document.querySelector(".cinematic-nav");
        if (navElement) gsap.set(navElement, { opacity: 0, y: -20 });
        gsap.set(".hero-titles", { opacity: 1 });
        gsap.set(".hero-subtitle", { opacity: 0, y: 15 });
        gsap.set(".hero-background img", { opacity: 0, scale: 1.08 });

        const video = videoRef.current;
        if (!video) { runTransition(); return; }

        const onEnded = () => runTransition();
        const onError = () => runTransition();

        // Safety: if video is blocked (autoplay policy) but loaded, skip after 12s
        const safetyTimer = setTimeout(() => runTransition(), 12000);

        video.addEventListener("ended", onEnded);
        video.addEventListener("error", onError);

        // Try autoplay; if browser blocks it, skip to hero immediately
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                // Autoplay blocked — skip intro and show hero directly
                runTransition();
            });
        }

        return () => {
            clearTimeout(safetyTimer);
            video.removeEventListener("ended", onEnded);
            video.removeEventListener("error", onError);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div ref={container} className="hero-container">

            {/* Intro Video Overlay */}
            <div ref={videoWrapRef} className="hero-intro-video-wrap">
                <video
                    ref={videoRef}
                    className="hero-intro-video"
                    src="/intro.mp4?v=2"
                    autoPlay
                    muted
                    playsInline
                    /* @ts-ignore -- webkit-playsinline for older iOS Safari */
                    webkit-playsinline="true"
                    preload="auto"
                    disablePictureInPicture
                    x5-playsinline="true"
                />
                <div className="hero-intro-vignette" />
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
