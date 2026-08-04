import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award } from 'lucide-react';

export const Certifications = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  return (
    <section id="certifications" className="py-10 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
        className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 md:gap-8 border-t border-border-primary/20 pt-10"
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-text-primary shrink-0">
          Credentials
        </h2>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3 group">
            <div className="p-2 rounded-full bg-text-accent/10 text-text-accent transition-transform duration-300 group-hover:scale-110">
              <Award className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base md:text-lg font-medium text-text-primary tracking-wide">
                Databricks Certified GenAI Engineer Associate
              </span>
              <span className="text-xs md:text-sm font-mono text-text-tertiary">
                (2025)
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
