import "@/styles/skills.css";

export default function Skills() {
    return (
        <div className="skills-container">
            <div className="section-divider"></div>

            <div className="skills-block gsap-reveal mobile-reveal">
                <h2 className="text-focus">Creative Skills</h2>
                <ul className="skills-list">
                    <li>Visual Storytelling</li>
                    <li>Content Development</li>
                    <li>Communication</li>
                    <li>Team Collaboration</li>
                </ul>
            </div>

            <div className="skills-block gsap-reveal mobile-reveal">
                <h2 className="text-focus">Technical Skills</h2>
                <ul className="skills-list">
                    <li>Premiere Pro & Final Cut Pro</li>
                    <li>Photoshop</li>
                    <li>Adobe Audition</li>
                    <li>Lighting Composition</li>
                    <li>Cinematography/Camera Handling</li>
                </ul>
            </div>

        </div>
    );
}