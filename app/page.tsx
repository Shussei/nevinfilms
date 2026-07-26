import Hero from "@/components/Hero/Hero";
import HorizontalScroller from "@/components/HorizontalScroller";
import NavBar from "@/components/NavBar";
import WorkGallery from "@/components/Work/WorkGallery";
import PitchDeck from "@/components/PitchDeck";
import BTS from "@/components/BTS";
import About from "@/components/About/About";
import Skills from "@/components/Skills/Skills";
import Contact from "@/components/Contact/Contact";
import "@/styles/scroller.css";
import "@/styles/bts.css";

export default function Home() {
  return (
    <main>
      <NavBar />
      <HorizontalScroller>

        <section className="panel-section hero-panel">
          <Hero />
        </section>

        <section className="panel-section about-panel" data-scroll-vertical="true">
          <About />
        </section>

        <section className="panel-section skills-panel">
          <Skills />
        </section>

        <WorkGallery />

        <section className="panel-section pitch-deck-panel">
          <PitchDeck />
        </section>

        <section className="panel-section bts-panel">
          <BTS />
        </section>

        <section className="panel-section contact-panel">
          <Contact />
        </section>

      </HorizontalScroller>
    </main>
  );
}