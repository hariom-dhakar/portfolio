import { lazy, Suspense } from 'react';
import './index.css';
import { useTheme } from './hooks/useTheme';
import { Navigation } from './components/Navigation';
import { NeuralBackground } from './features/background/NeuralBackground';
import { Hero } from './features/hero/Hero';
import { About } from './features/about/About';
import { Experience } from './features/experience/Experience';

const Projects = lazy(() => import('./features/projects/Projects').then((m) => ({ default: m.Projects })));
const Skills = lazy(() => import('./features/skills/Skills').then((m) => ({ default: m.Skills })));
const Certifications = lazy(() => import('./features/certifications/Certifications').then((m) => ({ default: m.Certifications })));
const ResumeViewer = lazy(() => import('./features/resume/ResumeViewer').then((m) => ({ default: m.ResumeViewer })));
const Contact = lazy(() => import('./features/contact/Contact').then((m) => ({ default: m.Contact })));
const Footer = lazy(() => import('./components/Footer').then((m) => ({ default: m.Footer })));

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

        <Suspense fallback={<div className="min-h-[200px]" />}>
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

          {/* Footer */}
          <Footer />
        </Suspense>
      </main>
    </div>
  );
}
