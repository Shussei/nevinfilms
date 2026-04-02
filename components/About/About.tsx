"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Certificates from "./Certificates";
import "@/styles/about.css";

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
                        <h1 className="about-name gsap-reveal mobile-reveal delay-1 text-focus">NEVIN J MADEKKAL</h1>
                        <p className="about-role gsap-reveal mobile-reveal delay-2 text-focus">FILMMAKER & MEDIA PROFESSIONAL</p>

                        <p className="about-statement gsap-reveal mobile-reveal delay-3 text-focus">
                            Dynamic filmmaker and media professional with extensive experience in directing,
                            cinematography, and production. Proven track record in managing film festivals
                            and creating compelling visual content across multiple formats.
                        </p>

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