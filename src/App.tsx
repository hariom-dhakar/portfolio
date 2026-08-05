import { useState, lazy, Suspense } from 'react';
import { LazyMotion } from 'framer-motion';
import './index.css';
import { useTheme } from './hooks/useTheme';
import { Navigation } from './components/Navigation';
import { NeuralBackground } from './features/background/NeuralBackground';
import { Hero } from './features/hero/Hero';
import { About } from './features/about/About';
import { EngineeringPhilosophy } from './features/philosophy/EngineeringPhilosophy';
import { Experience } from './features/experience/Experience';
import { LoadingIntro } from './components/LoadingIntro';

const loadFeatures = () => import('framer-motion').then((res) => res.domMax);

const Projects = lazy(() => import('./features/projects/Projects').then((m) => ({ default: m.Projects })));
const Skills = lazy(() => import('./features/skills/Skills').then((m) => ({ default: m.Skills })));
const Certifications = lazy(() => import('./features/certifications/Certifications').then((m) => ({ default: m.Certifications })));
const ResumeViewer = lazy(() => import('./features/resume/ResumeViewer').then((m) => ({ default: m.ResumeViewer })));
const Contact = lazy(() => import('./features/contact/Contact').then((m) => ({ default: m.Contact })));
const Footer = lazy(() => import('./components/Footer').then((m) => ({ default: m.Footer })));

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(() => {
    return !sessionStorage.getItem('intro_seen');
  });

  const handleLoadingComplete = () => {
    sessionStorage.setItem('intro_seen', 'true');
    setIsLoading(false);
  };

  return (
    <LazyMotion features={loadFeatures}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10000] focus:px-4 focus:py-2 focus:bg-[var(--bg-secondary)] focus:text-[var(--text-accent)] focus:border focus:border-[var(--border-glow)] focus:rounded-xl focus:font-mono focus:text-xs shadow-lg"
      >
        Skip to main content
      </a>

      {isLoading && <LoadingIntro onComplete={handleLoadingComplete} />}
      <div className="relative min-h-screen overflow-x-hidden">
      <NeuralBackground />

      <Navigation theme={theme} toggleTheme={toggleTheme} />

      <main id="main-content" className="relative z-10 w-full">
        <Hero />

        <About />

        <EngineeringPhilosophy />

        <Experience />

        <Suspense fallback={<div className="min-h-[200px]" />}>
          <Projects />

          <Skills />

          <Certifications />

          <ResumeViewer />

          <Contact />

          <Footer />
        </Suspense>
      </main>
      </div>
    </LazyMotion>
  );
}
