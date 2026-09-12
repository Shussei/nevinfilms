"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import "@/styles/work.css";
import CircularGallery from "./CircularGallery";

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
        roles: ["Videography", "Editor"],
        desc: "A cinematic walkthrough of 'Krishna,' a residential haven in Aluva designed by Menon Associates, part of the Silpaayanam series.",
        customThumbnail: "/krishna-thumb.png"
    },
    {
        id: "8",
        youtubeId: "yq08mco-pA4",
        title: "Sreelakam - Menon Associates",
        category: "Architectural",
        roles: ["Videography", "Editor"],
        desc: "A rhythmic journey through light and movement, showcasing innovative camera pacing."
    },
    {
        id: "9",
        videoSrc: "/Benakd_1F.mp4",
        title: "beNAKD - Fashion Shoot 01",
        category: "Fashion Film",
        roles: ["Videography", "Editor"],
        desc: "Videographer and Editor for this social reel for youth label bé NAKD., capturing raw street aesthetics and the relaxed silhouette of their denim line through grounded urban cinematography."
    },
    {
        id: "10",
        videoSrc: "/beNAKD-2.mp4",
        title: "beNAKD - Fashion Shoot 02",
        category: "Fashion Film",
        roles: ["Videography", "Editor"],
        desc: "Handled videography and editing for this social campaign, blending clean architectural lines, stylized split-screen framing, and rhythmic cuts to showcase modern youth denim styling."
    },
    {
        id: "11",
        videoSrc: "/Benakd_3F.mp4",
        title: "beNAKD - Fashion Shoot 03",
        category: "Fashion Film",
        roles: ["Videography", "Editor"],
        desc: "Videographer and Editor for this high-energy social lookbook reel, using dynamic beat-synced pacing, lens transitions, and vibrant urban street motion to spotlight the denim collection."
    }
];

export default function WorkGallery() {
    const [selectedWork, setSelectedWork] = useState<any | null>(null);
    const [centerIndex, setCenterIndex] = useState<number>(0);
    const [isCentered, setIsCentered] = useState<boolean>(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (selectedWork) {
            document.body.classList.add("modal-open");
        } else {
            document.body.classList.remove("modal-open");
        }
        return () => document.body.classList.remove("modal-open");
    }, [selectedWork]);

    const galleryItems = useMemo(() => WORKS.map(work => ({
        image: work.customThumbnail || work.videoSrc || `https://img.youtube.com/vi/${work.youtubeId}/maxresdefault.jpg`,
        text: work.title
    })), []);

    const handleCenterChange = useCallback((index: number, centered: boolean) => {
        setCenterIndex(index);
        setIsCentered(centered);
    }, []);

    const handleCenterClick = useCallback((index: number) => {
        if (WORKS[index]) {
            setSelectedWork(WORKS[index]);
        }
    }, []);

    const activeWork = WORKS[centerIndex];

    return (
        <section className="panel-section work-panel">
            <div className="work-header">
                <h2 className="gsap-reveal mobile-reveal">Selected Works</h2>
            </div>

            {/* Circular Gallery Canvas */}
            <div className="work-gallery-canvas-wrapper">
                {/* Overlays for active center item inside the canvas relative wrapper */}
                <div className={`work-center-overlay work-role-overlay ${isCentered && activeWork ? "is-active" : ""}`}>
                    <span className="work-role-text">
                        {activeWork ? activeWork.roles.join(" & ") : ""}
                    </span>
                </div>

                <CircularGallery
                    items={galleryItems}
                    bend={1.2}
                    textColor="#ffffff"
                    borderRadius={0.05}
                    font="bold 30px Figtree"
                    scrollEase={0.06}
                    scrollSpeed={2.2}
                    paused={!!selectedWork}
                    onCenterItemChange={handleCenterChange}
                    onCenterItemClick={handleCenterClick}
                />

                <div className={`work-center-overlay work-title-overlay ${isCentered && activeWork ? "is-active" : ""}`}>
                    <h3 className="work-title-text">
                        {activeWork ? activeWork.title : ""}
                    </h3>
                </div>
            </div>

            {/* Cinematic Modal Overlay */}
            {selectedWork && mounted && createPortal(
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

                        <div className="work-modal-video">
                            {selectedWork.videoSrc ? (
                                <video
                                    key={selectedWork.id}
                                    className="work-modal-video-element"
                                    src={selectedWork.videoSrc}
                                    autoPlay
                                    controls
                                    loop
                                    playsInline
                                />
                            ) : (
                                <iframe
                                    src={`https://www.youtube.com/embed/${selectedWork.youtubeId}?autoplay=1&controls=1&rel=0`}
                                    title={selectedWork.title}
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                    className="work-modal-iframe"
                                />
                            )}
                        </div>

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