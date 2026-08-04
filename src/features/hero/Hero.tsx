import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const ROLES = ['AI Engineer', 'GenAI Engineer', 'Agentic AI Engineer'];

export function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[80vh] md:min-h-[85vh] w-full flex flex-col items-center justify-center overflow-hidden bg-transparent px-4 md:px-8 py-12">
      {/* Subtle radial gradient glow behind the name */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] min-w-[400px] min-h-[400px] bg-brand-glow/20 rounded-full blur-[100px] md:blur-[140px] pointer-events-none -z-10" />

      <div className="z-10 flex flex-col items-center text-center w-full max-w-5xl mx-auto space-y-6 md:space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-4 w-full"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-medium tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-text-primary to-text-secondary/60">
            Hariom Dhakar
          </h1>
          
          <div className="relative h-8 md:h-10 w-full flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={ROLES[currentRoleIndex]}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute text-lg md:text-xl text-text-accent font-light tracking-wide"
              >
                {ROLES[currentRoleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-base md:text-lg text-text-secondary max-w-xl font-light"
        >
          Building production multi-agent systems and RAG pipelines.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="flex flex-row items-center gap-4 pt-2"
        >
          <a href="#projects" className="btn-primary">
            Explore Work
          </a>
          <a href="#contact" className="btn-ghost">
            Get in Touch
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] md:text-xs uppercase tracking-[0.3em] text-text-tertiary">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-3.5 h-3.5 md:w-4 md:h-4 text-text-tertiary" strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  );
}
