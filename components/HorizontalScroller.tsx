"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface Props {
    children: React.ReactNode;
}

export default function HorizontalScroller({ children }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const isMobile = window.innerWidth < 768;

        // ─── HARD DISABLE & CLEANUP FOR MOBILE ───
        if (isMobile) {
            ScrollTrigger.getAll().forEach(st => st.kill());
            gsap.killTweensOf("*");
            return;
        }

        const ctx = gsap.context(() => {
            if (!wrapperRef.current || !containerRef.current) return;

            const container = containerRef.current;
            const sections = gsap.utils.toArray(".panel-section") as HTMLElement[];
            if (sections.length === 0) return;

            // 1. Initial State (Source of Truth)
            gsap.set(sections, { opacity: 0.35, filter: "brightness(0.6)" });
            gsap.set(sections[0], { opacity: 1, filter: "brightness(1)" }); 
            
            const animBg = document.querySelector(".animated-bg");
            if (animBg) gsap.set(animBg, { opacity: 0 });

            let currentActiveIndex = 0;
            // 2. Timeline Core - 1:1 Direct Control
            const mainTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: wrapperRef.current,
                    id: "main-scroller",
                    pin: true,
                    scrub: true, 
                    start: "top top",
                    end: "10000", // Stable high fixed capacity
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        // Force ActiveIndex 0 and Brightness at exactly 0 progress
                        if (self.progress === 0) {
                            if (currentActiveIndex !== 0) {
                                currentActiveIndex = 0;
                                window.dispatchEvent(new CustomEvent("sectionChange", { detail: { activeIndex: 0 } }));
                            }
                            gsap.set(sections[0], { opacity: 1, filter: "brightness(1)" });
                            return;
                        }

                        // Determine Index by comparing current time to labels
                        const time = mainTimeline.time();
                        const labels = mainTimeline.labels;
                        let newIndex = 0;
                        
                        Object.entries(labels).forEach(([label, labelTime]) => {
                            const match = label.match(/^section-(\d+)$/);
                            if (match && time >= (labelTime as number) - 0.01) {
                                newIndex = Math.max(newIndex, parseInt(match[1]));
                            }
                        });

                        if (newIndex !== currentActiveIndex) {
                            currentActiveIndex = newIndex;
                            window.dispatchEvent(new CustomEvent("sectionChange", { detail: { activeIndex: newIndex } }));
                        }
                    }
                }
            });

            // 3. Build Sequence
            sections.forEach((section, i) => {
                const isVerticalTransition = section.dataset.scrollVertical === "true";
                const inner = section.querySelector(".vertical-inner") as HTMLElement;
                const arrivalLabel = `section-${i}`;

                // --- A. MOVEMENT & LIGHTING TO ARRIVAL ---
                if (i > 0) {
                    const prevSection = sections[i-1];
                    const moveStartTime = mainTimeline.duration();

                    // Movement Move
                    mainTimeline.to(container, {
                        x: () => -(section.offsetLeft - container.offsetLeft),
                        duration: 1,
                        ease: "none"
                    });

                    // Lighting Shift (BAKED INTO TIMELINE)
                    // Dim PREVIOUS during the movement
                    mainTimeline.to(prevSection, { 
                        opacity: 0.35, 
                        filter: "brightness(0.6)", 
                        duration: 1,
                        ease: "power2.inOut"
                    }, moveStartTime); 

                    // Brighten CURRENT during the movement
                    mainTimeline.to(section, { 
                        opacity: 1, 
                        filter: "brightness(1)", 
                        duration: 1,
                        ease: "power2.inOut",
                        onComplete: () => {
                            // Backup dispatch for precision
                            window.dispatchEvent(new CustomEvent("sectionChange", { 
                                detail: { activeIndex: i } 
                            }));
                        }
                    }, moveStartTime);
                }

                // --- B. ARRIVAL POINT (LOCK INDEX HERE) ---
                mainTimeline.addLabel(arrivalLabel);
                
                // Dispatch of index changes is now handled in onUpdate via label-time comparison
                // to ensure absolute sync even when scrubbing or snapping.

                // --- C. VERTICAL CONTENT PAUSE ---
                // Vertical content must happen AFTER the index trigger for THAT section
                if (isVerticalTransition && inner) {
                    const innerDist = inner.scrollHeight - window.innerHeight;
                    mainTimeline.to(inner, {
                        y: -innerDist,
                        duration: 2,
                        ease: "none"
                    });
                    // Unique label for end of vertical area
                    mainTimeline.addLabel(`${arrivalLabel}-vertical-end`);
                }

                // --- D. REVEALS ---
                const reveals = section.querySelectorAll(".gsap-reveal");
                if (reveals.length) {
                    const isAbout = section.classList.contains("about-panel");
                    mainTimeline.fromTo(reveals, 
                        { y: 50, opacity: 0 },
                        { 
                            y: 0, 
                            opacity: 1, 
                            duration: 0.4, 
                            stagger: isAbout ? 0 : 0.1, 
                            ease: "power2.out" 
                        },
                        isAbout ? `${arrivalLabel}-=0.2` : arrivalLabel // About reveals slightly earlier
                    );
                }
            });

            requestAnimationFrame(() => ScrollTrigger.refresh());

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={wrapperRef} className="horizontal-wrapper" style={{ background: "transparent" }}>
            <div ref={containerRef} className="horizontal-container" style={{ background: "transparent" }}>
                {children}
            </div>
        </div>
    );
}