import { useState, useEffect, memo } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FOCUS_TAGS = ['Agentic Systems', 'Custom RAG', 'FastAPI Backends', 'LLM Guardrails'];
const SUBTITLES = [
  'AI Engineer',
  'Gen AI Engineer',
  'Agentic AI Engineer',
];

export const Hero = memo(() => {
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSubtitleIndex((prev) => (prev + 1) % SUBTITLES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="hero"
      className="relative h-[75vh] min-h-[580px] max-h-[750px] w-full flex flex-col items-center justify-center overflow-hidden bg-transparent px-4 md:px-8 py-6"
      aria-label="Introduction"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45vw] h-[45vw] min-w-[300px] min-h-[300px] max-w-[600px] max-h-[600px] bg-brand-glow/20 rounded-full blur-[100px] md:blur-[140px] pointer-events-none -z-10" />

      <div className="z-10 flex flex-col items-center text-center w-full max-w-[760px] mx-auto px-6 space-y-5 md:space-y-6">
        <m.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-3 w-full"
        >
          {/* <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-tertiary)]/80 backdrop-blur-md border border-[var(--border-primary)] text-[10px] md:text-xs font-mono text-[var(--text-tertiary)] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="w-2 h-2 rounded-full bg-emerald-400 -ml-4" />
            <span className="text-[var(--text-primary)] font-semibold uppercase tracking-wider">AI Systems & Multi-Agent Engineer</span>
            <span className="opacity-40">|</span>
            <span>Latency &lt;12ms</span>
          </div> */}

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-text-primary to-text-secondary/60">
            Hariom Dhakar
          </h1>
          
          <div className="relative h-10 md:h-12 w-full flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <m.span
                key={SUBTITLES[currentSubtitleIndex]}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute text-base sm:text-lg md:text-xl text-[var(--text-accent)] font-medium tracking-wide font-display max-w-2xl px-2"
              >
                {SUBTITLES[currentSubtitleIndex]}
              </m.span>
            </AnimatePresence>
          </div>
        </m.div>

        <m.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="text-xs sm:text-sm md:text-base text-[var(--text-secondary)] max-w-xl font-light leading-relaxed"
        >
          Designing production-ready AI systems, document intelligence pipelines, and multi-agent workflows.
        </m.p>

        <m.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-2 max-w-xl"
        >
          {FOCUS_TAGS.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-[var(--bg-tertiary)] border border-[var(--border-primary)] text-[10px] md:text-xs font-mono text-[var(--text-secondary)] shadow-xs"
            >
              {tag}
            </span>
          ))}
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-3 pt-2 w-full sm:w-auto"
        >
          <a 
            href="#projects" 
            className="btn-primary w-full sm:w-auto text-center justify-center focus-visible:outline-2 focus-visible:outline-cyan-400"
          >
            Hire Me
          </a>
          <a 
            href="#contact" 
            className="btn-ghost w-full sm:w-auto text-center justify-center focus-visible:outline-2 focus-visible:outline-cyan-400"
          >
            Get in Touch
          </a>
        </m.div>
      </div>

      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] md:text-xs uppercase tracking-[0.3em] text-[var(--text-tertiary)] font-mono">Scroll</span>
        <m.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-3.5 h-3.5 md:w-4 md:h-4 text-[var(--text-tertiary)]" strokeWidth={1.5} aria-hidden="true" />
        </m.div>
      </m.div>
    </section>
  );
});

Hero.displayName = 'Hero';
