"use client";

export default function GlobalBackgroundVideo() {
    return (
        <div className="global-video-container">
            {/* 
                RECOMMENDATION: Use a 4K 'Slow Light Leak' or 'Dust Particulates' video.
                - Low contrast, high bitrate.
                - Color: Amber/Orange for warmth or subtle Blue for cool mystery.
            */}
            <video 
                autoPlay 
                muted 
                loop 
                playsInline
                className="global-bg-video"
            >
                <source src="https://assets.mixkit.co/videos/preview/mixkit-dust-particles-in-the-air-4113-large.mp4" type="video/mp4" />
            </video>
            <div className="global-video-overlay"></div>
        </div>
    );
}
