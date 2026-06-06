"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Certificates from "./Certificates";
import "@/styles/about.css";
import SplitText from "@/components/SplitText";
import GradientText from "@/components/GradientText";

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={containerRef} className="about-wrapper">
            <div className="section-divider"></div>
            <div className="vertical-inner" data-scroll-vertical="true">
                {/* Part 1: Main Profile */}
                <div className="about-hero-section">
                    {/* Glassmorphic image frame — gradient border via padding trick */}
                    <div className="about-image gsap-reveal mobile-reveal mobile-reveal-image parallax-lite">
                        <div className="about-image-inner">
                            <img src="/IMG_4314.JPG.jpeg" alt="Nevin J Madekkal Portrait" />
                        </div>
                    </div>

                    <div className="about-content">
                        <SplitText
                            text="NEVIN J MADEKKAL"
                            className="about-name gsap-reveal mobile-reveal delay-1 text-focus"
                            tag="h1"
                        />
                        <GradientText
                            colors={["#C4B5FD", "#8B7CF6", "#E2D9F3"]}
                            animationSpeed={10}
                            className="about-role gsap-reveal mobile-reveal delay-2 text-focus"
                        >
                            FILMMAKER & MEDIA PROFESSIONAL
                        </GradientText>

                        <SplitText
                            text="Dynamic filmmaker and media professional with extensive experience in directing, cinematography, and production. Proven track record in managing film festivals and creating compelling visual content across multiple formats."
                            className="about-statement gsap-reveal mobile-reveal delay-3 text-focus"
                            tag="p"
                        />

                        <div className="about-background gsap-reveal mobile-reveal delay-4">
                            <span className="about-credential">M.A. Cinema & Television — SH College Thevera (2021–2023)</span>
                            <span className="about-credential">B.A. Mass Communication — Nitte Institute (2018–2021)</span>
                            <span className="about-credential">Festival Director — Fete Int. Short Film Festival (Oct 2022)</span>
                        </div>
                    </div>
                </div>

                {/* Part 2: Vertical Extension (Certificates) */}
                <Certificates />
            </div>
        </div>
    );
}