import "@/styles/contact.css";

export default function Contact() {
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

    return (
        <div className="contact-inner">
            {/* Display heading */}
            <div className="contact-heading-wrap gsap-reveal mobile-reveal">
                <p className="contact-eyebrow">Get in touch</p>
                <h2 className="contact-display">CONTACT</h2>
            </div>

            {/* Contact rows */}
            <div className="contact-rows gsap-reveal mobile-reveal delay-1">
                {items.map((item) => (
                    <a
                        key={item.label}
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="contact-row"
                    >
                        <span className="contact-row-icon">{item.icon}</span>
                        <span className="contact-row-label">{item.label}</span>
                        <span className="contact-row-value">{item.value}</span>
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
