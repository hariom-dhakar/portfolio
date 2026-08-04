import './index.css';
import { useTheme } from './hooks/useTheme';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { NeuralBackground } from './features/background/NeuralBackground';
import { Hero } from './features/hero/Hero';
import { About } from './features/about/About';
import { Experience } from './features/experience/Experience';
import { Projects } from './features/projects/Projects';
import { Skills } from './features/skills/Skills';
import { Certifications } from './features/certifications/Certifications';
import { ResumeViewer } from './features/resume/ResumeViewer';
import { Contact } from './features/contact/Contact';

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[var(--bg-primary)]">
      {/* Global Canvas Background */}
      <NeuralBackground />

      {/* Navigation */}
      <Navigation theme={theme} toggleTheme={toggleTheme} />

      {/* Main Full-Width Content Flow */}
      <main className="w-full">
        {/* Hero - Cinematic Intro */}
        <div id="hero">
          <Hero />
        </div>

        {/* About - Engineer Details & Metrics */}
        <div id="about">
          <About />
        </div>

        {/* Experience - Deployment History */}
        <div id="experience">
          <Experience />
        </div>

        {/* Projects - Dynamic Work Showcase with Local Sticky Architecture */}
        <div id="projects">
          <Projects />
        </div>

        {/* Skills - Tech Stack Constellation */}
        <div id="skills">
          <Skills />
        </div>

        {/* Certifications - Minimal Credentials */}
        <div id="certifications">
          <Certifications />
        </div>

        {/* Resume - Document Viewer */}
        <div id="resume">
          <ResumeViewer />
        </div>

        {/* Contact - Dispatch & Links */}
        <div id="contact">
          <Contact />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
