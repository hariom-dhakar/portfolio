import { memo } from 'react';
import { m } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const DELIVERABLES = [
  {
    title: 'CrewAI EDA Analyzer',
    impact: '70% reduction in manual data analysis effort for ML engineers',
  },
  {
    title: 'LLM Reasoning Pipeline',
    impact: 'Auto-generated executive business insights & structured reports',
  },
  {
    title: 'FastAPI Microservices',
    impact: 'High-throughput async data processing & agent API gateways',
  },
];

const TECH_TAGS = [
  'CrewAI',
  'FastAPI',
  'Pandas',
  'NumPy',
  'Scikit-Learn',
  'REST APIs',
  'Python',
];

export const Experience = memo(() => {
  return (
    <section
      id="experience"
      className="relative w-full overflow-hidden border-t border-[var(--border-primary)]"
      aria-label="Experience Section"
    >
      <div className="section-layout">
        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-col"
        >
          {/* Section Header */}
          <div className="flex flex-col mb-8 md:mb-10">
            <m.span variants={itemVariants} className="section-label">
              System Log
            </m.span>

            <m.h2 variants={itemVariants} className="section-title">
              Experiences
            </m.h2>

            <m.p variants={itemVariants} className="section-description">
              Delivering automated analytical systems and agentic microservices.
            </m.p>
          </div>

          {/* Experience Card */}
          <m.div
            variants={itemVariants}
            className="card-primary p-6 md:p-8 space-y-6 relative overflow-hidden"
          >
            {/* Header */}
            <div className="border-b border-[var(--border-primary)] pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 font-mono text-[10px] tracking-wider border border-emerald-500/20 uppercase w-fit font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Current
                </span>

                <div>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-[var(--text-primary)]">
                    Celebal Technologies
                  </h3>

                  <p className="text-[var(--text-accent)] font-mono text-xs md:text-sm mt-0.5 font-semibold">
                    AI Engineer
                  </p>
                </div>
              </div>

              <div className="font-mono text-[var(--text-gold)] text-xs px-3.5 py-1.5 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-primary)] w-fit font-semibold">
                Feb 2026 → Present
              </div>
            </div>

            {/* Deliverables Timeline */}
            <div className="relative pl-6 space-y-4 border-l-2 border-[var(--border-glow)]">
              <m.div
                className="absolute left-[-2px] top-0 w-[2px] h-full bg-[var(--text-accent)] shadow-[0_0_10px_var(--text-accent-glow)]"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ transformOrigin: 'top' }}
              />

              <ul className="space-y-4">
                {DELIVERABLES.map((item, index) => (
                  <m.li
                    key={item.title}
                    variants={itemVariants}
                    className="relative list-none flex flex-col gap-1 p-4 rounded-xl card-secondary"
                  >
                    <span className="font-mono text-[var(--text-gold)] text-[9px] uppercase tracking-widest font-semibold">
                      DELIVERABLE_0{index + 1}
                    </span>

                    <span className="font-display text-base md:text-lg font-semibold text-[var(--text-primary)]">
                      {item.title}
                    </span>

                    <span className="font-mono text-[var(--text-accent)] text-xs">
                      &gt; {item.impact}
                    </span>
                  </m.li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <m.div
              variants={itemVariants}
              className="flex flex-wrap gap-2 pt-4 border-t border-[var(--border-primary)]"
            >
              <span className="text-xs font-mono text-[var(--text-tertiary)] mr-2 py-1">
                Stack:
              </span>

              {TECH_TAGS.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md bg-[var(--bg-tertiary)] border border-[var(--border-primary)] font-mono text-[10px] tracking-wider uppercase text-[var(--text-secondary)] hover:text-[var(--text-accent)] hover:border-[var(--border-glow)] transition-all"
                >
                  #{tag}
                </span>
              ))}
            </m.div>
          </m.div>
        </m.div>
      </div>
    </section>
  );
});

Experience.displayName = 'Experience';