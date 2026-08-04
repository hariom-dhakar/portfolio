import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award } from 'lucide-react';

export const Certifications = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  return (
    <section id="certifications" className="py-12 px-4 md:px-8 max-w-7xl mx-auto" aria-label="Credentials Section">
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
        animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 24, filter: 'blur(6px)' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
        className="glass-card p-6 md:p-8 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8 border border-border-primary/60"
      >
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">
            Verified Accreditation
          </span>
          <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight text-text-primary">
            Credentials & Certifications
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3.5 group p-3 rounded-xl bg-neutral-950/60 border border-neutral-850 hover:border-cyan-500/40 transition-all">
            <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 group-hover:scale-105 transition-transform">
              <Award className="w-5 h-5" aria-hidden="true" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm md:text-base font-display font-semibold text-text-primary tracking-wide group-hover:text-cyan-300 transition-colors">
                Databricks Certified Generative AI Engineer Associate
              </span>
              <span className="text-xs font-mono text-text-tertiary">
                Issued 2025 • Industry Standard GenAI Certification
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
