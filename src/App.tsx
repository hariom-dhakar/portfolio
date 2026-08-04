import './index.css';
import { useTheme } from './hooks/useTheme';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { NeuralBackground } from './features/background/NeuralBackground';
import { Hero } from './features/hero/Hero';
import AIPipeline from './features/pipeline/AIPipeline';
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
      {/* Global Canvas Background */}
      <NeuralBackground />

      {/* Navigation */}
      <Navigation theme={theme} toggleTheme={toggleTheme} />

      {/* Main Content Flow */}
      <main>
        {/* Hero - Full viewport cinematic intro */}
        <div id="hero">
          <Hero />
        </div>

        {/* Pipeline - Sticky scroll AI pipeline storytelling */}
        <div id="pipeline">
          <AIPipeline />
        </div>

        {/* About - Metrics & typography */}
        <div id="about">
          <About />
        </div>

        {/* Experience - Deployment history */}
        <div id="experience">
          <Experience />
        </div>

        {/* Projects - Immersive full-width showcases */}
        <div id="projects">
          <Projects />
        </div>

        {/* Skills - Typography constellation */}
        <div id="skills">
          <Skills />
        </div>

        {/* Certifications - Minimal credentials */}
        <div id="certifications">
          <Certifications />
        </div>

        {/* Resume - Preview & Download */}
        <div id="resume">
          <ResumeViewer />
        </div>

        {/* Contact - API endpoint dispatch */}
        <div id="contact">
          <Contact />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
