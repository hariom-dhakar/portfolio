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
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Global Neural Network Background Canvas (z-0) */}
      <NeuralBackground />

      {/* Navigation (z-50) */}
      <Navigation theme={theme} toggleTheme={toggleTheme} />

      {/* Main Full-Width Content Flow (z-10 above background canvas) */}
      <main className="relative z-10 w-full">
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

        {/* Projects - Dynamic Work Showcase */}
        <div id="projects">
          <Projects />
        </div>

        {/* Skills - Obsidian Engineering Knowledge Base */}
        <div id="skills">
          <Skills />
        </div>

        {/* Certifications - Credentials */}
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
