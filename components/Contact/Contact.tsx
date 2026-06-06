"use client";

import React, { useState, useEffect, useRef } from "react";
import EncryptedText from "@/components/ui/EncryptedText";
import "@/styles/contact.css";

export default function Contact() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeDecryptIndex, setActiveDecryptIndex] = useState(-1);

    const items = [
        {
            label: "Phone",
            value: "+91 83019 64158",
            href: "tel:+918301964158",
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 5.94 5.94l.96-.96a2 2 0 0 1 2.11-.45c.91.33 1.85.56 2.81.69A2 2 0 0 1 22 16.92z"/>
                </svg>
            )
        },
        {
            label: "Email",
            value: "nevinjmadekkal@gmail.com",
            href: "mailto:nevinjmadekkal@gmail.com",
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
            )
        },
        {
            label: "Instagram",
            value: "@mad_nevinjoseph",
            href: "https://www.instagram.com/mad_nevinjoseph",
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                </svg>
            )
        },
        {
            label: "LinkedIn",
            value: "Nevin Joseph",
            href: "https://www.linkedin.com/in/nevin-joseph-a741561aa",
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                </svg>
            )
        }
    ];

    const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

    const startDecryptionSequence = () => {
        // Clear any active timeouts to prevent overlaps
        timeoutsRef.current.forEach(clearTimeout);
        
        setActiveDecryptIndex(0);
        
        const t1 = setTimeout(() => setActiveDecryptIndex(1), 500);
        const t2 = setTimeout(() => setActiveDecryptIndex(2), 1300);
        const t3 = setTimeout(() => setActiveDecryptIndex(3), 1900);
        const t4 = setTimeout(() => setActiveDecryptIndex(4), 2400);

        timeoutsRef.current = [t1, t2, t3, t4];
    };

    const resetDecryptionSequence = () => {
        timeoutsRef.current.forEach(clearTimeout);
        timeoutsRef.current = [];
        setActiveDecryptIndex(-1);
    };

    useEffect(() => {
        const isMobile = window.innerWidth < 768;

        if (isMobile) {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        startDecryptionSequence();
                    } else {
                        resetDecryptionSequence();
                    }
                },
                { threshold: 0.1 }
            );

            if (containerRef.current) {
                observer.observe(containerRef.current);
            }
            return () => {
                observer.disconnect();
                timeoutsRef.current.forEach(clearTimeout);
            };
        } else {
            // Desktop horizontal scrolling
            const handleSection = (e: any) => {
                if (e.detail.activeIndex !== 5) {
                    resetDecryptionSequence();
                } else {
                    startDecryptionSequence();
                }
            };

            window.addEventListener("sectionChange", handleSection);
            return () => {
                window.removeEventListener("sectionChange", handleSection);
                timeoutsRef.current.forEach(clearTimeout);
            };
        }
    }, []);

    return (
        <div ref={containerRef} className="contact-inner">
            {/* Display heading */}
            <div className="contact-heading-wrap gsap-reveal mobile-reveal">
                <p className="contact-eyebrow">Get in touch</p>
                <h2 className="contact-display">CONTACT</h2>
            </div>

            {/* Contact rows */}
            <div className="contact-rows gsap-reveal mobile-reveal delay-1">
                {items.map((item, index) => (
                    <a
                        key={item.label}
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="contact-row"
                    >
                        <span className="contact-row-icon">{item.icon}</span>
                        <span className="contact-row-label">{item.label}</span>
                        
                        <span className="contact-row-value">
                            <EncryptedText
                                text={item.value}
                                trigger={activeDecryptIndex >= index}
                                revealDelayMs={30}
                                revealedClassName="contact-value-revealed"
                                encryptedClassName="contact-value-encrypted"
                            />
                        </span>
                        
                        <span className="contact-row-arrow">→</span>
                    </a>
                ))}
            </div>

            <p className="contact-tagline gsap-reveal mobile-reveal delay-2">
                Available for film, commercial &amp; creative collaborations.
            </p>
        </div>
    );
}
