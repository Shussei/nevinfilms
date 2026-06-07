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
            return;
        }

        const ctx = gsap.context(() => {
            if (!wrapperRef.current || !containerRef.current) return;

            const container = containerRef.current;
            const sections = gsap.utils.toArray(".panel-section") as HTMLElement[];
            if (sections.length === 0) return;

            // Instantiating ResizeObserver to trigger ScrollTrigger updates when height changes
            const resizeObserver = new ResizeObserver(() => {
                ScrollTrigger.refresh();
            });

            sections.forEach((section) => {
                const inner = section.querySelector(".vertical-inner");
                if (inner) {
                    resizeObserver.observe(inner);
                }
            });

            // 1. Initial State (Source of Truth)
            gsap.set(sections, { opacity: 0.35, filter: "brightness(0.6)" });
            gsap.set(sections[0], { opacity: 1, filter: "brightness(1)" }); 
            
            const animBg = document.querySelector(".animated-bg");
            if (animBg) gsap.set(animBg, { opacity: 0 });

            let currentActiveIndex = 0;
            let lastIndex = -1;

            // Function to animate active section's reveals automatically
            const playSectionReveals = (index: number) => {
                const section = sections[index];
                if (!section) return;

                // SPECIAL TIMELINE FOR ABOUT PANEL (INDEX 1)
                if (index === 1) {
                    const name = section.querySelector(".about-name");
                    const role = section.querySelector(".about-role");
                    const statement = section.querySelector(".about-statement");
                    const credentials = section.querySelector(".about-background");
                    const certTitle = section.querySelector(".certificates-title");
                    const image = section.querySelector(".about-image");
                    const gridWrapper = section.querySelector(".chromagrid-wrapper");
                    
                    const tl = gsap.timeline({ overwrite: "auto" });

                    if (image) {
                        gsap.killTweensOf(image);
                        tl.fromTo(image,
                            { y: 30, opacity: 0 },
                            { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
                            0
                        );
                    }

                    if (name) {
                        const chars = name.querySelectorAll(".split-char");
                        if (chars.length > 0) {
                            gsap.killTweensOf(chars);
                            tl.fromTo(chars, 
                                { y: 20, opacity: 0 }, 
                                { y: 0, opacity: 1, duration: 0.5, stagger: 0.02, ease: "power2.out" },
                                0
                            );
                        } else {
                            gsap.killTweensOf(name);
                            tl.fromTo(name, 
                                { y: 30, opacity: 0 }, 
                                { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
                                0
                            );
                        }
                    }

                    if (role) {
                        gsap.killTweensOf(role);
                        tl.fromTo(role, 
                            { y: 20, opacity: 0 }, 
                            { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }, 
                            ">-0.1"
                        );
                    }

                    if (statement) {
                        const chars = statement.querySelectorAll(".split-char");
                        const words = statement.querySelectorAll(".split-word");
                        if (chars.length > 0) {
                            gsap.killTweensOf(chars);
                            tl.fromTo(chars, 
                                { y: 20, opacity: 0 }, 
                                { y: 0, opacity: 1, duration: 0.5, stagger: 0.003, ease: "power2.out" }, 
                                ">+0.1"
                            );
                        } else if (words.length > 0) {
                            gsap.killTweensOf(words);
                            tl.fromTo(words, 
                                { y: 15, opacity: 0 }, 
                                { y: 0, opacity: 1, duration: 0.5, stagger: 0.012, ease: "power2.out" }, 
                                ">+0.1"
                            );
                        } else {
                            gsap.killTweensOf(statement);
                            tl.fromTo(statement, 
                                { y: 30, opacity: 0 }, 
                                { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, 
                                ">+0.1"
                            );
                        }
                    }

                    if (credentials) {
                        gsap.killTweensOf(credentials);
                        tl.fromTo(credentials, 
                            { y: 20, opacity: 0 }, 
                            { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }, 
                            ">+0.1"
                        );
                    }

                    if (certTitle) {
                        gsap.killTweensOf(certTitle);
                        tl.fromTo(certTitle, 
                            { y: 20, opacity: 0 }, 
                            { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }, 
                            ">+0.1"
                        );
                    }

                    if (gridWrapper) {
                        gsap.killTweensOf(gridWrapper);
                        tl.fromTo(gridWrapper, 
                            { y: 20, opacity: 0 }, 
                            { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, 
                            ">+0.1"
                        );
                    }
                    return;
                }

                const reveals = section.querySelectorAll(".gsap-reveal");
                reveals.forEach((reveal, idx) => {
                    const chars = reveal.querySelectorAll(".split-char");
                    const words = reveal.querySelectorAll(".split-word");
                    const delay = idx * 0.15;

                    if (chars.length > 0) {
                        gsap.killTweensOf(chars);
                        gsap.fromTo(chars,
                            { y: 20, opacity: 0 },
                            {
                                y: 0,
                                opacity: 1,
                                duration: 0.6,
                                stagger: 0.015,
                                ease: "power2.out",
                                delay: delay,
                                overwrite: "auto"
                            }
                        );
                    } else if (words.length > 0) {
                        gsap.killTweensOf(words);
                        gsap.fromTo(words,
                            { y: 15, opacity: 0 },
                            {
                                y: 0,
                                opacity: 1,
                                duration: 0.5,
                                stagger: 0.03,
                                ease: "power2.out",
                                delay: delay,
                                overwrite: "auto"
                            }
                        );
                    } else {
                        gsap.killTweensOf(reveal);
                        gsap.fromTo(reveal,
                            { y: 30, opacity: 0 },
                            {
                                y: 0,
                                opacity: 1,
                                duration: 0.5,
                                ease: "power2.out",
                                delay: delay,
                                overwrite: "auto"
                            }
                        );
                    }
                });
            };

            const handleUpdateIndex = (newIndex: number) => {
                if (newIndex === lastIndex) return;

                // Reset reveals of the section we are leaving (except Hero)
                if (lastIndex !== -1 && lastIndex !== 0) {
                    const prevSection = sections[lastIndex];
                    if (prevSection) {
                        const reveals = prevSection.querySelectorAll(".gsap-reveal");
                        reveals.forEach((reveal) => {
                            const chars = reveal.querySelectorAll(".split-char");
                            const words = reveal.querySelectorAll(".split-word");
                            if (chars.length > 0) {
                                gsap.killTweensOf(chars);
                                gsap.set(chars, { y: 20, opacity: 0 });
                            } else if (words.length > 0) {
                                gsap.killTweensOf(words);
                                gsap.set(words, { y: 15, opacity: 0 });
                            } else {
                                gsap.killTweensOf(reveal);
                                gsap.set(reveal, { y: 30, opacity: 0 });
                            }
                        });
                    }
                }

                lastIndex = newIndex;
                currentActiveIndex = newIndex;
                window.dispatchEvent(new CustomEvent("sectionChange", { detail: { activeIndex: newIndex } }));

                playSectionReveals(newIndex);
            };

            // Hide initially all other reveals
            sections.forEach((section, index) => {
                if (index > 0) {
                    const reveals = section.querySelectorAll(".gsap-reveal");
                    reveals.forEach((reveal) => {
                        const chars = reveal.querySelectorAll(".split-char");
                        if (chars.length > 0) {
                            gsap.set(chars, { y: 20, opacity: 0 });
                        } else {
                            gsap.set(reveal, { y: 30, opacity: 0 });
                        }
                    });
                }
            });

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
                            handleUpdateIndex(0);
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

                        handleUpdateIndex(newIndex);
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
                    mainTimeline.to(inner, {
                        y: () => -(inner.scrollHeight - window.innerHeight),
                        duration: 2,
                        ease: "none"
                    });
                    // Unique label for end of vertical area
                    mainTimeline.addLabel(`${arrivalLabel}-vertical-end`);
                }


            });

            requestAnimationFrame(() => ScrollTrigger.refresh());

            return () => {
                resizeObserver.disconnect();
            };

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