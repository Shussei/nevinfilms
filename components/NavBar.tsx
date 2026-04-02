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
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const isDesktop = useIsDesktop();

    useEffect(() => {
        const handleScroll = () => {
            const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            setScrollProgress(scrolled);
        };

        window.addEventListener("scroll", handleScroll);
        // Initial check
        handleScroll();

        const handleSectionChange = (e: any) => {
            const index = e.detail.activeIndex;
            const validIndex = Math.max(0, Math.min(index, 4));
            setActiveIndex(validIndex);
        };
        window.addEventListener("sectionChange", handleSectionChange);
        
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("sectionChange", handleSectionChange);
        };
    }, []);

    const navItems = ["Home", "About", "Skills", "Work", "Contact"];

    const toggleMenu = () => {
        const nextState = !isMenuOpen;
        setIsMenuOpen(nextState);
        
        // Lenis Scroll Lock
        const lenis = (window as any).lenis;
        if (lenis) {
            if (nextState) {
                lenis.stop();
                document.body.classList.add("menu-open");
            } else {
                lenis.start();
                document.body.classList.remove("menu-open");
            }
        }
    };

    const handleNavClick = (index: number) => {
        if (isMenuOpen) toggleMenu();

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
        <nav className="cinematic-nav">
            {/* Scroll Progress Bar (Top) */}
            <div className="scroll-progress-container">
                <div 
                    className="scroll-progress-bar" 
                    style={{ width: `${scrollProgress}%` }}
                />
            </div>

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

            {/* Mobile Menu Toggle */}
            <button 
              className={`nav-toggle ${isMenuOpen ? "is-active" : ""}`} 
              onClick={toggleMenu}
              aria-label="Toggle Menu"
            >
                <div className="hamburger-box">
                    <span className="hamburger-inner"></span>
                </div>
            </button>

            {/* Overlay */}
            <div className={`nav-overlay ${isMenuOpen ? "is-visible" : ""}`} onClick={toggleMenu} />

            {/* Mobile Drawer - Using classes from navbar.css */}
            <div className={`nav-drawer ${isMenuOpen ? "is-open" : ""}`}>
                <div className="nav-drawer__list">
                    {navItems.map((item, index) => (
                        <button
                            key={item}
                            className={`nav-drawer__btn ${activeIndex === index ? "active" : ""}`}
                            onClick={() => handleNavClick(index)}
                        >
                            <span className="drawer-btn-num">0{index + 1}</span>
                            <span className="drawer-btn-text">{item}</span>
                        </button>
                    ))}
                    <div className="nav-drawer__footer">
                        <p>© 2025 NEVIN JOSEPH</p>
                    </div>
                </div>
            </div>
        </nav>
    );
}
