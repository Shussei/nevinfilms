"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import "@/styles/work.css";
import { useIsDesktop } from "@/hooks/useIsDesktop";

const PDFViewer = dynamic(() => import("./PDFViewer"), { ssr: false });

const WORKS = [
    {
        id: "0",
        youtubeId: "OT9_KA6bgz0",
        title: "2026 Showreel",
        category: "Showreel",
        roles: ["Editor"],
        desc: "Editor for Govind K Saji's 2026 Director/DP Showreel, dynamically showcasing a curated selection of cinematic works through high-energy visual storytelling."
    },
    {
        id: "1",
        youtubeId: "m2nR8E1W-cQ",
        title: "Janeeva Limited",
        category: "Commercial",
        roles: ["Editor"],
        desc: "Editor for this stylized commercial, focusing on rhythmic pacing and visual flow to elevate the brand's aesthetic."
    },
    {
        id: "2",
        youtubeId: "ARxlarNq5Dk",
        title: "Sangeeth Hospital 01",
        category: "Commercial",
        roles: ["Director"],
        desc: "Directed this healthcare film, emphasizing human connection and warmth through authentic storytelling and careful performance guidance."
    },
    {
        id: "3",
        youtubeId: "I3KqGtY3Hbk",
        title: "Sangeeth Hospital 02",
        category: "Commercial",
        roles: ["Director", "Editor"],
        desc: "Director and Editor for this commercial, balancing large-scale visuals with precision editing to communicate reliability and professional excellence."
    },
    {
        id: "4",
        youtubeId: "-mh3UHYfTow",
        title: "To Be Continued",
        category: "Short Film",
        roles: ["Director", "Editor", "DOP"],
        desc: "Director, Editor, and Director of Photography for this short film, meticulously crafting tension through high-contrast cinematography and pulse-quickening pacing."
    },
    {
        id: "5",
        youtubeId: "J99P5NVyjyc",
        title: "Hamurabi",
        category: "Music Video",
        roles: ["Director", "Editor"],
        desc: "Directed and Edited this music video, creating a seamless fusion of dynamic lighting and rhythmic cuts to bring the track's energy to life."
    },
    {
        id: "6",
        youtubeId: "b213XARRlMA",
        title: "Dear Delhi Police",
        category: "Social Awareness",
        roles: ["DOP", "Editor"],
        desc: "Director of Photography and Editor for this social awareness film, utilizing raw, grounded cinematography and honest editing to tell a powerful real-world story."
    },
    {
        id: "7",
        youtubeId: "Ieat2PHUPwg",
        title: "Krishna - Menon Associates",
        category: "Architectural",
        roles: ["Cinematography"],
        desc: "A cinematic walkthrough of 'Krishna,' a residential haven in Aluva designed by Menon Associates, part of the Silpaayanam series.",
        customThumbnail: "/krishna-thumb.png"
    },
    {
        id: "8",
        youtubeId: "yq08mco-pA4",
        title: "Sreelakam - Menon Associates",
        category: "Architectural",
        roles: ["Cinematography"],
        desc: "A rhythmic journey through light and movement, showcasing innovative camera pacing."
    },
    {
        id: "9",
        title: "PITCH DECK: VI",
        category: "Pitch",
        roles: ["Director", "Creative Lead"],
        desc: "A comprehensive project deck for 'VI', detailing the visual language, world-building, and artistic vision for the project.",
        pdfUrl: "/pitches/PITCH DECK for VI.pdf",
        customThumbnail: "https://images.unsplash.com/photo-1544911845-1f34a3eb46b1?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: "10",
        title: "PITCH DECK",
        category: "Pitch",
        roles: ["Creative Producer"],
        desc: "Visual development deck focusing on character storyboards and stylistic narrative progression.",
        pdfUrl: "/pitches/pitch-deck.pdf",
        customThumbnail: "https://images.unsplash.com/photo-1512446816042-444d641267d4?q=80&w=2070&auto=format&fit=crop"
    }
];

export default function WorkGallery() {
    const [selectedWork, setSelectedWork] = useState<any | null>(null);
    const [hoveredWork, setHoveredWork] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);
    const isDesktop = useIsDesktop();

    useEffect(() => {
        setMounted(true);
    }, []);

    // ─── BODY SCROLL LOCK ───
    useEffect(() => {
        if (selectedWork) {
            document.body.classList.add("modal-open");
        } else {
            document.body.classList.remove("modal-open");
        }
        return () => document.body.classList.remove("modal-open");
    }, [selectedWork]);

    return (
        <section className="panel-section work-panel">
            <div className="work-header">
                <h2 className="gsap-reveal mobile-reveal">Selected Works</h2>
            </div>

            <div className="section-divider"></div>
            <div className="work-grid">
                {WORKS.map((work, index) => (
                    <div
                        key={work.id}
                        className={`work-grid-item gsap-reveal mobile-reveal mobile-reveal-image parallax-lite delay-${(index % 3) + 1}`}
                        onClick={() => setSelectedWork(work)}
                        onMouseEnter={() => isDesktop && setHoveredWork(work.id)}
                        onMouseLeave={() => isDesktop && setHoveredWork(null)}
                    >
                        <img
                            src={work.customThumbnail || `https://img.youtube.com/vi/${work.youtubeId}/maxresdefault.jpg`}
                            alt={work.title}
                            className="work-hover-image"
                            loading="lazy"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                if (!work.customThumbnail && work.youtubeId && !target.src.includes("hqdefault")) {
                                    target.src = `https://img.youtube.com/vi/${work.youtubeId}/hqdefault.jpg`;
                                }
                            }}
                        />

                        {isDesktop && work.youtubeId && (
                            <>
                                <iframe
                                    className={`work-hover-iframe${hoveredWork === work.id ? " is-visible" : ""}`}
                                    src={
                                        hoveredWork === work.id
                                            ? `https://www.youtube.com/embed/${work.youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${work.youtubeId}&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3`
                                            : "about:blank"
                                    }
                                    allow="autoplay"
                                    title={work.title}
                                    tabIndex={-1}
                                />
                                <div className="work-preview-label">Play Preview</div>
                            </>
                        )}

                        <div className="work-item-overlay">
                            <h3 className="work-item-title text-focus">{work.title}</h3>
                            <p className="work-item-category text-focus">{work.category}</p>
                        </div>
                    </div>
                ))}
            </div>

            {selectedWork &&
                mounted &&
                createPortal(
                    <div
                        className="work-modal-overlay"
                        onClick={() => setSelectedWork(null)}
                        onWheel={(e) => e.stopPropagation()}
                    >
                        <div
                            className={`work-modal-content${selectedWork ? " is-open" : ""}`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="work-modal-close"
                                onClick={() => setSelectedWork(null)}
                            >
                                ✕ CLOSE
                            </button>

                            {selectedWork.pdfUrl ? (
                                <div 
                                    className="work-modal-pdf"
                                    onContextMenu={(e) => e.preventDefault()}
                                    onWheel={(e) => e.stopPropagation()}
                                >
                                    <PDFViewer file={selectedWork.pdfUrl} />
                                </div>
                            ) : (
                                <div className="work-modal-video">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${selectedWork.youtubeId}?autoplay=1&controls=1&rel=0`}
                                        title={selectedWork.title}
                                        allow="autoplay; encrypted-media"
                                        allowFullScreen
                                        className="work-modal-iframe"
                                    />
                                </div>
                            )}

                            <div className="work-modal-details">
                                <h2 className="work-modal-role">{selectedWork.roles.join(" & ")}</h2>
                                <h3 className="work-modal-type">{selectedWork.title} — {selectedWork.category}</h3>
                                
                                <div className="work-modal-divider"></div>

                                <p className="work-modal-desc">
                                    {selectedWork.desc}
                                </p>
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
        </section>
    );
}