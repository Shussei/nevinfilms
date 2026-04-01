import "@/styles/skills.css";

export default function Skills() {
    return (
        <div className="skills-container">

            <div className="skills-block gsap-reveal">
                <h2>Creative Skills</h2>
                <ul className="skills-list">
                    <li>Visual Storytelling</li>
                    <li>Content Creation</li>
                    <li>Team Collaboration & Cross-Functional Comm.</li>
                    <li>Narrative Pacing & Tension</li>
                    <li>Directorial Vision</li>
                </ul>
            </div>

            <div className="skills-block gsap-reveal">
                <h2>Technical Skills</h2>
                <ul className="skills-list">
                    <li>Premiere Pro & Final Cut Pro</li>
                    <li>Adobe Audition</li>
                    <li>Lighting Composition</li>
                    <li>Photoshop</li>
                    <li>Problem Solving</li>
                </ul>
            </div>

        </div>
    );
}