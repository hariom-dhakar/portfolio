import { useState, useEffect, memo } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowUpRight } from 'lucide-react';

const FOCUS_TAGS = ['Agentic Systems', 'Custom RAG', 'FastAPI Backends', 'LLM Guardrails'];
const SUBTITLES = [
  'Agentic AI Engineer',
  'Gen AI Engineer',
  'Applied AI Systems',
];

export const Hero = memo(() => {
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSubtitleIndex((prev) => (prev + 1) % SUBTITLES.length);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="hero"
      className="relative min-h-[92vh] sm:min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-transparent px-5 sm:px-6 md:px-8 pt-20 pb-12"
      aria-label="Introduction"
    >
      <div className="z-10 flex flex-col items-center text-center w-full max-w-[760px] mx-auto space-y-6 md:space-y-7">
        
        {/* Availability Badge */}
        <m.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-primary)] shadow-xs"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="text-[11px] font-mono text-[var(--text-secondary)] tracking-wide">
            Available for New Opportunities
          </span>
        </m.div>

        {/* Name & Primary Headline Hierarchy */}
        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-2 w-full"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-rajdhani uppercase font-bold tracking-wider sm:tracking-widest text-[var(--text-primary)] leading-[1.08] select-none">
            H<span className="text-[var(--text-accent)]">A</span>R<span className="text-[var(--text-accent)]">I</span>OM DHAKAR
          </h1>
          
          {/* Positioning */}
          <div className="relative h-8 sm:h-9 md:h-10 w-full flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <m.span
                key={SUBTITLES[currentSubtitleIndex]}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="absolute text-lg sm:text-xl md:text-2xl text-[var(--text-secondary)] font-medium tracking-tight font-display"
              >
                {SUBTITLES[currentSubtitleIndex]}
              </m.span>
            </AnimatePresence>
          </div>
        </m.div>

        {/* Clean, Intentional Value Statement */}
        <m.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm sm:text-base text-[var(--text-secondary)] max-w-lg font-normal leading-relaxed"
        >
          Building production-ready AI systems, document intelligence pipelines, RAG systems, and autonomous multi-agent workflows.
        </m.p>

        {/* Subtle Capability Badges */}
        <m.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-wrap items-center justify-center gap-2 max-w-lg"
        >
          {FOCUS_TAGS.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-md bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-xs font-mono text-[var(--text-secondary)]"
            >
              {tag}
            </span>
          ))}
        </m.div>

        {/* Clean Action Buttons */}
        <m.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center gap-3 pt-2 w-full sm:w-auto"
        >
          <a 
            href="#projects" 
            className="btn-primary w-full sm:w-auto text-center justify-center text-xs md:text-sm py-2 px-5 font-medium focus-visible:outline-2 focus-visible:outline-cyan-400 group"
          >
            <span>Explore Work</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <a 
            href="#contact" 
            className="btn-ghost w-full sm:w-auto text-center justify-center text-xs md:text-sm py-2 px-5 font-medium focus-visible:outline-2 focus-visible:outline-cyan-400"
          >
            Get in Touch
          </a>
        </m.div>
      </div>

      {/* Subtle Scroll Down Prompt */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-tertiary)] font-mono">Scroll</span>
        <ChevronDown className="w-3.5 h-3.5 text-[var(--text-tertiary)]" strokeWidth={1.5} aria-hidden="true" />
      </m.div>
    </section>
  );
});

Hero.displayName = 'Hero';
