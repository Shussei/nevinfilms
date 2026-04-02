"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import "@/styles/work.css";
import { useIsDesktop } from "@/hooks/useIsDesktop";

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
    }
];

export default function WorkGallery() {
    const [selectedWork, setSelectedWork] = useState<typeof WORKS[0] | null>(null);
    const [hoveredWork, setHoveredWork] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);
    const isDesktop = useIsDesktop();

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section className="panel-section work-panel">
            <div className="work-header">
                <h2 className="gsap-reveal">Selected Works</h2>
            </div>

            <div className="work-grid">
                {WORKS.map((work) => (
                    <div
                        key={work.id}
                        className="work-grid-item gsap-reveal"
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
                                if (!work.customThumbnail && !target.src.includes("hqdefault")) {
                                    target.src = `https://img.youtube.com/vi/${work.youtubeId}/hqdefault.jpg`;
                                }
                            }}
                        />

                        {isDesktop && (
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
                            <h3>{work.title}</h3>
                            <p>{work.category}</p>
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
                    >
                        <div
                            className="work-modal-content"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="work-modal-close"
                                onClick={() => setSelectedWork(null)}
                            >
                                ✕ CLOSE
                            </button>

                            <div className="work-modal-video">
                                <iframe
                                    src={`https://www.youtube.com/embed/${selectedWork.youtubeId}?autoplay=1&controls=1&rel=0`}
                                    title={selectedWork.title}
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                    className="work-modal-iframe"
                                />
                            </div>

                            <div className="work-modal-details">
                                <h2>{selectedWork.title}</h2>

                                <div className="work-modal-meta">
                                    <span>{selectedWork.category}</span>
                                    <span className="separator">|</span>
                                    <span>{selectedWork.roles.join(" & ")}</span>
                                </div>

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