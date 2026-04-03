"use client";

import { useEffect, useState, useRef } from "react";
import "@/styles/backgrounds.css";

type SectionType = "home" | "about" | "skills" | "work" | "contact";

export default function GlobalBackgroundController() {
    const [activeSection, setActiveSection] = useState<SectionType>("home");
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const isMobile = window.innerWidth < 768;

        // ─── DESKTOP: LISTEN TO SCROLLER EVENTS ───
        const handleSectionChange = (e: any) => {
            if (isMobile) return;
            const index = e.detail.activeIndex;
            const sections: SectionType[] = ["home", "about", "skills", "work", "contact"];
            if (sections[index]) {
                setActiveSection(sections[index]);
            }
        };

        window.addEventListener("sectionChange", handleSectionChange);

        // ─── MOBILE: INTERSECTION OBSERVER ───
        if (isMobile) {
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

    return (
        <div className="global-bg" data-active-section={activeSection}>
            {/* LAYER: HOME (Clean Black - Base) */}
            <div className={`bg-layer bg-home ${activeSection === "home" ? "active" : ""}`} />

            {/* LAYER: ABOUT (Soft Gradient) */}
            <div className={`bg-layer bg-about ${activeSection === "about" ? "active" : ""}`} />

            {/* LAYER: SKILLS (Pattern/Grid) */}
            <div className={`bg-layer bg-skills ${activeSection === "skills" ? "active" : ""}`} />

            {/* LAYER: WORK (Grain + Vignette) */}
            <div className={`bg-layer bg-work ${activeSection === "work" ? "active" : ""}`} />

            {/* LAYER: CONTACT (Clean Black) */}
            <div className={`bg-layer bg-contact ${activeSection === "contact" ? "active" : ""}`} />
            
            {/* VIGNETTE OVERLAY (Always Present for Cinematic Feel) */}
            <div className="cinematic-overlay" />
        </div>
    );
}
