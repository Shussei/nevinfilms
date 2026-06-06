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
    const isDesktop = useIsDesktop();

    useEffect(() => {
        const handleSectionChange = (e: any) => {
            const index = e.detail.activeIndex;
            // Map panel index to navbar item index:
            // 0 -> 0 (Home), 1 -> 1 (About), 2 -> 2 (Skills)
            // 3 -> 3 (Work), 4 -> 3 (Work, Pitch Deck extension)
            // 5 -> 4 (Contact)
            let navIndex = index;
            if (index === 4) {
                navIndex = 3;
            } else if (index === 5) {
                navIndex = 4;
            }
            setActiveIndex(Math.max(0, Math.min(navIndex, 4)));
        };
        window.addEventListener("sectionChange", handleSectionChange);
        
        return () => {
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
        setActiveIndex(index); // Immediate UI update
        if (isMenuOpen) toggleMenu();

        if (isDesktop) {
            const st = ScrollTrigger.getById("main-scroller");
            if (st) {
                // Map navbar click index to scroller panel index:
                // 0 -> 0, 1 -> 1, 2 -> 2, 3 -> 3 (Work), 4 -> 5 (Contact, skipping Pitch Deck)
                let sectionIndex = index;
                if (index === 4) {
                    sectionIndex = 5;
                }
                const targetScroll = st.labelToScroll(`section-${sectionIndex}`);
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
            // Mobile sections layout mapping:
            // Home (0), About (1), Skills (2), Work (3), Pitch Deck (4), Contact (5)
            let sectionIndex = index;
            if (index === 4) {
                sectionIndex = 5;
            }
            const target = sections[sectionIndex];
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    return (
        <nav className="cinematic-nav">

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
