"use client";

import { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import "@/styles/navbar.css";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);
}

export default function NavBar() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isDesktop = useIsDesktop();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 30);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleSectionChange = (e: any) => {
            const index = e.detail.activeIndex;
            setActiveIndex(Math.max(0, Math.min(index, 6)));
        };
        window.addEventListener("sectionChange", handleSectionChange);
        
        return () => {
            window.removeEventListener("sectionChange", handleSectionChange);
        };
    }, []);

    const navItems = ["Home", "About", "Skills", "Work", "Pitch Deck", "BTS", "Contact"];

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleNavClick = (index: number) => {
        setActiveIndex(index); // Immediate UI update
        if (isMenuOpen) setIsMenuOpen(false);

        if (isDesktop) {
            const st = ScrollTrigger.getById("main-scroller");
            if (st) {
                const targetScroll = st.labelToScroll(`section-${index}`);
                // Use Lenis if available for smoother transition that doesn't fight the scroller
                const lenis = (window as any).lenis;
                if (lenis) {
                    lenis.scrollTo(targetScroll, { duration: 1.2 });
                } else {
                    window.scrollTo({ top: targetScroll, behavior: "smooth" });
                }
            }
        } else {
            const sections = document.querySelectorAll(".panel-section");
            const target = sections[index];
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    return (
        <nav className={`cinematic-nav ${isScrolled ? "is-scrolled" : ""} ${isMenuOpen ? "menu-open" : ""}`}>
            
            {/* Desktop Navigation */}
            <ul className="cinematic-nav__list">
                {navItems.map((item, index) => (
                    <li key={item}>
                        <button
                            className={`cinematic-nav__btn ${activeIndex === index ? "active" : ""}`}
                            onClick={() => handleNavClick(index)}
                        >
                            <span className="nav-btn-num">0{index + 1}</span>
                            <span className="nav-btn-text">{item}</span>
                        </button>
                    </li>
                ))}
            </ul>

            {/* Mobile Menu Toggle (3-line button) */}
            <button 
              className={`nav-toggle ${isMenuOpen ? "is-active" : ""}`} 
              onClick={toggleMenu}
              aria-label="Toggle Menu"
            >
                <div className="hamburger-box">
                    <span className="hamburger-inner"></span>
                </div>
            </button>

            {/* Mobile Drawer with horizontal layout */}
            <div className={`nav-drawer ${isMenuOpen ? "is-open" : ""}`}>
                <ul className="nav-drawer__list">
                    {navItems.map((item, index) => (
                        <li key={item}>
                            <button
                                className={`nav-drawer__btn ${activeIndex === index ? "active" : ""}`}
                                onClick={() => handleNavClick(index)}
                            >
                                <span className="drawer-btn-num">0{index + 1}</span>
                                <span className="drawer-btn-text">{item}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
