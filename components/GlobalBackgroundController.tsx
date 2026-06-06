"use client";

import { useEffect, useState, useRef } from "react";
import "@/styles/backgrounds.css";
import LightRays from "./LightRays";
import DotGrid from "./DotGrid";

type SectionType = "home" | "about" | "skills" | "work" | "pitchdeck" | "contact";


export default function GlobalBackgroundController() {
    const [activeSection, setActiveSection] = useState<SectionType>("home");
    const [isMobile, setIsMobile] = useState(false);
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const mobile = window.innerWidth < 768;
        setIsMobile(mobile);
        const isMobileLocal = mobile;

        // ─── DESKTOP: LISTEN TO SCROLLER EVENTS ───
        const handleSectionChange = (e: any) => {
            if (isMobileLocal) return;
            const index = e.detail.activeIndex;
            const sections: SectionType[] = ["home", "about", "skills", "work", "pitchdeck", "contact"];
            if (sections[index]) {
                setActiveSection(sections[index]);
            }
        };

        window.addEventListener("sectionChange", handleSectionChange);

        // ─── MOBILE: INTERSECTION OBSERVER ───
        if (isMobileLocal) {
            const options = {
                threshold: 0.1, // Trigger when 10% is visible
                rootMargin: "-25% 0px -25% 0px" // Trigger as section enters the middle half of the screen
            };

            const callback = (entries: IntersectionObserverEntry[]) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const target = entry.target as HTMLElement;
                        console.log(`[GlobalBG] Mobile detected intersecting:`, target.className);
                        if (target.classList.contains("hero-panel")) setActiveSection("home");
                        else if (target.classList.contains("about-panel")) setActiveSection("about");
                        else if (target.classList.contains("skills-panel")) setActiveSection("skills");
                        else if (target.classList.contains("work-panel")) setActiveSection("work");
                        else if (target.classList.contains("pitch-deck-panel")) setActiveSection("pitchdeck");
                        else if (target.classList.contains("contact-panel")) setActiveSection("contact");
                    }
                });
            };

            observerRef.current = new IntersectionObserver(callback, options);
            const sections = document.querySelectorAll(".panel-section");
            sections.forEach((section) => observerRef.current?.observe(section));
        }

        return () => {
            window.removeEventListener("sectionChange", handleSectionChange);
            observerRef.current?.disconnect();
        };
    }, []);

    const showRays = activeSection === "about" || activeSection === "skills" || activeSection === "work" || activeSection === "pitchdeck";

    return (
        <div className="global-bg" data-active-section={activeSection}>
            {/* LAYER: HOME (Clean Black - Base) */}
            <div className={`bg-layer bg-home ${activeSection === "home" ? "active" : ""}`} />

            {/* SHARED WebGL LIGHT RAYS (For About, Skills, Work sections) */}
            <div className={`bg-layer bg-rays-shared ${showRays ? "active" : ""}`}>
                {showRays && (
                    <LightRays
                        raysOrigin="top-center"
                        raysColor="#ffffff"
                        raysSpeed={1.0}
                        lightSpread={0.5}
                        rayLength={3.0}
                        followMouse={!isMobile}
                        mouseInfluence={isMobile ? 0 : 0.1}
                        noiseAmount={0.0}
                        distortion={0.0}
                        pulsating={false}
                        fadeDistance={1.0}
                        saturation={1.0}
                    />
                )}
            </div>

            {/* LAYER: CONTACT (DotGrid Background) */}
            <div className={`bg-layer bg-contact ${activeSection === "contact" ? "active" : ""}`}>
                {activeSection === "contact" && (
                    <DotGrid
                        dotSize={3}
                        gap={18}
                        baseColor="#1f182c"
                        activeColor="#5227FF"
                        proximity={120}
                        shockStrength={3}
                    />
                )}
            </div>
            
            {/* VIGNETTE OVERLAY (Always Present for Cinematic Feel) */}
            <div className="cinematic-overlay" />
        </div>
    );
}
