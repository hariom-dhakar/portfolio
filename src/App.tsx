import { lazy, Suspense } from 'react';
import { LazyMotion } from 'framer-motion';
import './index.css';
import { useTheme } from './hooks/useTheme';
import { Navigation } from './components/Navigation';
import { NeuralBackground } from './features/background/NeuralBackground';
import { Hero } from './features/hero/Hero';
import { About } from './features/about/About';
import { Experience } from './features/experience/Experience';

const loadFeatures = () => import('framer-motion').then((res) => res.domMax);

const Projects = lazy(() => import('./features/projects/Projects').then((m) => ({ default: m.Projects })));
const Skills = lazy(() => import('./features/skills/Skills').then((m) => ({ default: m.Skills })));
const Certifications = lazy(() => import('./features/certifications/Certifications').then((m) => ({ default: m.Certifications })));
const ResumeViewer = lazy(() => import('./features/resume/ResumeViewer').then((m) => ({ default: m.ResumeViewer })));
const Contact = lazy(() => import('./features/contact/Contact').then((m) => ({ default: m.Contact })));
const Footer = lazy(() => import('./components/Footer').then((m) => ({ default: m.Footer })));

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <LazyMotion features={loadFeatures}>
      <div className="relative min-h-screen overflow-x-hidden">
      <NeuralBackground />

      <Navigation theme={theme} toggleTheme={toggleTheme} />

      <main className="relative z-10 w-full">
        <Hero />

        <About />

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
