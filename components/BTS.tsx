"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import SplitText from "@/components/SplitText";
import "@/styles/bts.css";

// Updated BTS layout - clip titles only

interface BTSItem {
    id: string;
    title: string;
    videoUrl: string;
}

const BTS_ITEMS: BTSItem[] = [
    {
        id: "bts-1",
        title: "BTS CLIP 1",
        videoUrl: "/IMG_8692.MP4"
    },
    {
        id: "bts-2",
        title: "BTS CLIP 2",
        videoUrl: "/IMG_8872.MP4"
    },
    {
        id: "bts-3",
        title: "BTS CLIP 3",
        videoUrl: "/IMG_9723.MP4"
    }
];

export default function BTS() {
    const [selectedVideo, setSelectedVideo] = useState<BTSItem | null>(null);
    const [mounted, setMounted] = useState(false);
    const [playingId, setPlayingId] = useState<string | null>(null);
    const [mutedState, setMutedState] = useState<{ [key: string]: boolean }>({
        "bts-1": true,
        "bts-2": true,
        "bts-3": true
    });
    const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

    useEffect(() => {
        setMounted(true);
    }, []);

    // ─── BODY SCROLL LOCK WHEN MODAL OPEN ───
    useEffect(() => {
        if (selectedVideo) {
            document.body.classList.add("modal-open");
        } else {
            document.body.classList.remove("modal-open");
        }
        return () => document.body.classList.remove("modal-open");
    }, [selectedVideo]);

    const togglePlay = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const video = videoRefs.current[id];
        if (!video) return;

        if (video.paused) {
            // Pause all other videos
            Object.keys(videoRefs.current).forEach((key) => {
                if (key !== id && videoRefs.current[key]) {
                    videoRefs.current[key]?.pause();
                }
            });
            video.play().catch(() => {});
            setPlayingId(id);
        } else {
            video.pause();
            setPlayingId(null);
        }
    };

    const toggleMute = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const video = videoRefs.current[id];
        if (!video) return;
        video.muted = !video.muted;
        setMutedState((prev) => ({ ...prev, [id]: video.muted }));
    };

    return (
        <div className="bts-wrapper">
            <div className="bts-section">
                <div className="bts-header">
                    <SplitText
                        text="BEHIND THE SCENES"
                        className="bts-title gsap-reveal mobile-reveal"
                        tag="h2"
                    />
                </div>

                <div className="bts-grid">
                    {BTS_ITEMS.map((item) => {
                        const isPlaying = playingId === item.id;
                        const isMuted = mutedState[item.id] ?? true;

                        return (
                            <div
                                key={item.id}
                                className="bts-card gsap-reveal mobile-reveal"
                                onClick={() => setSelectedVideo(item)}
                            >
                                <div className="bts-video-container">
                                    <video
                                        ref={(el) => { videoRefs.current[item.id] = el; }}
                                        src={item.videoUrl}
                                        className="bts-video"
                                        loop
                                        muted={isMuted}
                                        playsInline
                                        preload="metadata"
                                    />

                                    {/* Video Action Overlay */}
                                    <div className="bts-video-overlay">
                                        <button
                                            className="bts-play-btn"
                                            onClick={(e) => togglePlay(item.id, e)}
                                            aria-label={isPlaying ? "Pause Video" : "Play Video"}
                                        >
                                            {isPlaying ? (
                                                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                                                    <rect x="6" y="4" width="4" height="16" rx="1" />
                                                    <rect x="14" y="4" width="4" height="16" rx="1" />
                                                </svg>
                                            ) : (
                                                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            )}
                                        </button>

                                        <button
                                            className="bts-mute-btn"
                                            onClick={(e) => toggleMute(item.id, e)}
                                            aria-label={isMuted ? "Unmute Sound" : "Mute Sound"}
                                        >
                                            {isMuted ? (
                                                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73 4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                                                </svg>
                                            ) : (
                                                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                                                </svg>
                                            )}
                                        </button>

                                        <div className="bts-expand-tag">
                                            <span>TAP TO EXPAND</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bts-card-info">
                                    <h3 className="bts-card-title">{item.title}</h3>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* FULLSCREEN BTS VIDEO MODAL */}
            {selectedVideo && mounted && createPortal(
                <div
                    className="bts-modal-overlay"
                    onClick={() => setSelectedVideo(null)}
                    onWheel={(e) => e.stopPropagation()}
                >
                    <div
                        className="bts-modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="bts-modal-close"
                            onClick={() => setSelectedVideo(null)}
                        >
                            ✕ CLOSE
                        </button>

                        <div className="bts-modal-body">
                            <div className="bts-modal-video-wrapper">
                                <video
                                    src={selectedVideo.videoUrl}
                                    className="bts-modal-video"
                                    controls
                                    autoPlay
                                    playsInline
                                />
                            </div>

                            <div className="bts-modal-details">
                                <h2>{selectedVideo.title}</h2>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}
