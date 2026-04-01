"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import "@/styles/certificates.css";

const CERTIFICATES = [
    {
        id: "cert-1",
        title: "Festival Director Accreditation",
        issuer: "Fete International Short Film Festival (Oct 2022)",
        year: "2022",
        image: "/FestDirect_Cert.png",
        desc: "Successfully launched and managed an international short film festival. Oversaw selection process, scheduling, and marketing initiatives. Coordinated with filmmakers, industry professionals, and sponsors. Managed event logistics and programming."
    },
    {
        id: "cert-2",
        title: "BEYOND 96 HOURS Official Selection",
        issuer: "20th Thoduppuzha Film Festival",
        year: "2026",
        image: "/B96_Cert.png",
        desc: "Directed Short film \"Beyond 96hrs\" (2025)."
    },
    {
        id: "cert-3",
        title: "BEYOND 96 HOURS Official Selection",
        issuer: "4th West Bengal Short Film Festival",
        year: "2025",
        image: "/WBB96_Cert.jpeg",
        desc: "Directed Short film \"Beyond 96hrs\" (2025)."
    },
    {
        id: "cert-4",
        title: "BEYOND 96 HOURS Official Selection",
        issuer: "7th Travancore International Film Award",
        year: "2026",
        image: "/travancore_Cert.jpeg",
        desc: "Directed Short film \"Beyond 96hrs\" (2025)."
    },
    {
        id: "cert-5",
        title: "BEYOND 96 HOURS Official Selection",
        issuer: "6th Kerala Short Film Festival",
        year: "2026",
        image: "/KSFS_B96_cert.JPG.jpeg",
        desc: "Directed Short film \"Beyond 96hrs\" (2025)."
    }
];

export default function Certificates() {
    const [selectedCert, setSelectedCert] = useState<typeof CERTIFICATES[0] | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="certificates-section">
            <h2 className="certificates-title gsap-reveal">Certifications & Honors</h2>
            <div className="certificates-grid">
                {CERTIFICATES.map((cert) => (
                    <div
                        key={cert.id}
                        className="certificate-card gsap-reveal"
                        onClick={() => setSelectedCert(cert)}
                    >
                        <div className="certificate-image-container">
                            <img src={cert.image} alt={cert.title} className="certificate-image" />
                            <div className="certificate-hover-overlay">
                                <span>SELECT TO VIEW</span>
                            </div>
                        </div>
                        <div className="certificate-info">
                            <h3 className="certificate-name">{cert.title}</h3>
                            <p className="certificate-meta">{cert.issuer} • {cert.year}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Certificate Modal */}
            {selectedCert && mounted && createPortal(
                <div className="cert-modal-overlay" onClick={() => setSelectedCert(null)}>
                    <div className="cert-modal-content" onClick={e => e.stopPropagation()}>
                        <button className="cert-modal-close" onClick={() => setSelectedCert(null)}>✕ CLOSE</button>

                        <div className="cert-modal-body">
                            <div className="cert-modal-image">
                                <img src={selectedCert.image} alt={selectedCert.title} />
                            </div>
                            <div className="cert-modal-details">
                                <h2>{selectedCert.title}</h2>
                                <p className="cert-modal-meta">{selectedCert.issuer} | {selectedCert.year}</p>
                                <div className="cert-modal-divider"></div>
                                <p className="cert-modal-desc">{selectedCert.desc}</p>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}
