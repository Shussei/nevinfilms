"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import SplitText from "@/components/SplitText";
import GradientText from "@/components/GradientText";
import "@/styles/pitchdeck.css";

const PITCH_DECKS = [
    {
        id: "pitch-1",
        title: "PITCH DECK: VI",
        category: "Pitch",
        roles: ["Pitch Producer"],
        desc: "A comprehensive project deck for 'VI', detailing the visual language, world-building, and artistic vision for the project.",
        pdfUrl: "https://drive.google.com/file/d/12BQMid4u4WPLYodaDxjtcfb7NVUV1-F9/preview",
        customThumbnail: "https://images.unsplash.com/photo-1544911845-1f34a3eb46b1?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: "pitch-2",
        title: "PITCH DECK",
        category: "Pitch",
        roles: ["Pitch Producer"],
        desc: "Visual development deck focusing on character storyboards and stylistic narrative progression.",
        pdfUrl: "https://drive.google.com/file/d/1dWgCnsGoT3SiezvTALpuES1JABhuweAM/preview",
        customThumbnail: "https://images.unsplash.com/photo-1512446816042-444d641267d4?q=80&w=2070&auto=format&fit=crop"
    }
];

export default function PitchDeck() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [selectedDeck, setSelectedDeck] = useState<typeof PITCH_DECKS[0] | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // ─── BODY SCROLL LOCK ───
    useEffect(() => {
        if (selectedDeck) {
            document.body.classList.add("modal-open");
        } else {
            document.body.classList.remove("modal-open");
        }
        return () => document.body.classList.remove("modal-open");
    }, [selectedDeck]);

    return (
        <div ref={containerRef} className="pitchdeck-wrapper">
            <div className="pitchdeck-section">
                <SplitText
                    text="PITCH DECKS"
                    className="pitchdeck-title gsap-reveal mobile-reveal"
                    tag="h2"
                />

                <div className="pitchdeck-grid">
                    {PITCH_DECKS.map((deck) => (
                        <div
                            key={deck.id}
                            className="pitchdeck-card gsap-reveal mobile-reveal"
                            onClick={() => setSelectedDeck(deck)}
                        >
                            <div className="pitchdeck-image-container">
                                <img src={deck.customThumbnail} alt={deck.title} className="pitchdeck-image" />
                                <div className="pitchdeck-hover-overlay">
                                    <span>OPEN PITCH DECK</span>
                                </div>
                            </div>
                            <div className="pitchdeck-info">
                                <GradientText
                                    colors={["#C4B5FD", "#8B7CF6", "#E2D9F3"]}
                                    animationSpeed={10}
                                    className="pitchdeck-meta"
                                >
                                    {deck.roles.join(" & ")}
                                </GradientText>
                                <h3 className="pitchdeck-name">{deck.title}</h3>
                                <p className="pitchdeck-desc">{deck.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pitch Deck PDF Modal */}
            {selectedDeck && mounted && createPortal(
                <div
                    className="pitch-modal-overlay"
                    onClick={() => setSelectedDeck(null)}
                    onWheel={(e) => e.stopPropagation()}
                >
                    <div
                        className="pitch-modal-content"
                        onClick={e => e.stopPropagation()}
                    >
                        <button className="pitch-modal-close" onClick={() => setSelectedDeck(null)}>✕ CLOSE</button>

                        <div className="pitch-modal-body">
                            <div
                                className="pitch-modal-pdf"
                                onWheel={(e) => e.stopPropagation()}
                            >
                                <iframe
                                    src={selectedDeck.pdfUrl}
                                    className="pitch-drive-iframe"
                                    title={selectedDeck.title}
                                    allow="autoplay"
                                    loading="lazy"
                                />
                            </div>
                            <div className="pitch-modal-details">
                                <GradientText
                                    colors={["#C4B5FD", "#8B7CF6", "#E2D9F3"]}
                                    animationSpeed={10}
                                    className="pitch-modal-meta"
                                >
                                    {selectedDeck.roles.join(" & ")}
                                </GradientText>
                                <h2>{selectedDeck.title}</h2>
                                <div className="pitch-modal-divider"></div>
                                <p className="pitch-modal-desc">{selectedDeck.desc}</p>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}
