import { useState, useEffect, memo } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const ROLES = ['AI Engineer', 'GenAI Engineer', 'Agentic AI Engineer'];

export const Hero = memo(() => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="hero"
      className="relative min-h-[80vh] md:min-h-[85vh] w-full flex flex-col items-center justify-center overflow-hidden bg-transparent px-4 md:px-8 py-12"
      aria-label="Introduction"
    >
      {/* Radial gradient glow behind the main heading */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45vw] h-[45vw] min-w-[300px] min-h-[300px] max-w-[600px] max-h-[600px] bg-brand-glow/20 rounded-full blur-[100px] md:blur-[140px] pointer-events-none -z-10" />

      <div className="z-10 flex flex-col items-center text-center w-full max-w-5xl mx-auto space-y-6 md:space-y-8">
        <m.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-4 w-full"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-medium tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-text-primary to-text-secondary/60">
            Hariom Dhakar
          </h1>
          
          <div className="relative h-8 md:h-10 w-full flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <m.span
                key={ROLES[currentRoleIndex]}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute text-base sm:text-lg md:text-xl text-text-accent font-light tracking-wide font-mono"
              >
                {ROLES[currentRoleIndex]}
              </m.span>
            </AnimatePresence>
          </div>
        </m.div>

        <m.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="text-sm sm:text-base md:text-lg text-text-secondary max-w-xl font-light leading-relaxed"
        >
          Building production multi-agent systems, Self-RAG architectures, and scalable LLM gateways.
        </m.p>

        <m.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-3.5 pt-2 w-full sm:w-auto"
        >
          <a 
            href="#projects" 
            className="btn-primary w-full sm:w-auto text-center justify-center focus-visible:outline-2 focus-visible:outline-cyan-400"
          >
            Explore Work
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
        <span className="text-[9px] md:text-xs uppercase tracking-[0.3em] text-text-tertiary font-mono">Scroll</span>
        <m.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-3.5 h-3.5 md:w-4 md:h-4 text-text-tertiary" strokeWidth={1.5} aria-hidden="true" />
        </m.div>
      </m.div>
    </section>
  );
});

Hero.displayName = 'Hero';
