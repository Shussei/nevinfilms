"use client";

export default function TitleCard() {
    return (
        <div className="title-card">
            {/* The portrait image */}
            <div className="title-card__portrait">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/IMG_4314.JPG.jpeg" alt="Nevin Joseph" />
                <div className="portrait-overlay" />
            </div>

            <div className="title-card__text">
                <h1 className="title-card__name">NEVIN JOSEPH</h1>
                <p className="title-card__tagline">Director & Cinematographer</p>
                <div className="title-card__accent-line" />
            </div>
        </div>
    );
}