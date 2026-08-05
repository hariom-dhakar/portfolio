import { memo, useRef } from 'react';
import { m, useInView } from 'framer-motion';
import { Award } from 'lucide-react';

export const Certifications = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  return (
    <section id="certifications" className="py-12 px-4 md:px-8 max-w-7xl mx-auto" aria-label="Credentials Section">
      <m.div
        ref={containerRef}
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
        className="glass-card p-6 md:p-8 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8 border border-[var(--border-primary)]"
      >
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-gold)] font-semibold">
            Verified Accreditation
          </span>
          <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight text-[var(--text-primary)]">
            Credentials & Certifications
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3.5 group p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-gold)] hover:border-[var(--border-glow)] transition-all">
            <div className="p-2.5 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-gold)] border border-[var(--border-gold)] group-hover:scale-105 transition-transform">
              <Award className="w-5 h-5" aria-hidden="true" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm md:text-base font-display font-semibold text-[var(--text-primary)] tracking-wide group-hover:text-[var(--text-gold)] transition-colors">
                Databricks Certified Generative AI Engineer Associate
              </span>
              <span className="text-xs font-mono text-[var(--text-tertiary)]">
                Issued 2025 • Industry Standard GenAI Certification
              </span>
            </div>
          </div>
        </div>
      </m.div>
    </section>
  );
});

Certifications.displayName = 'Certifications';
