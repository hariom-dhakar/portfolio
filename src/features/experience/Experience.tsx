import { memo } from 'react';
import { m } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const DELIVERABLES = [
  {
    title: 'CrewAI EDA Analyzer',
    impact: 'Automated exploratory data workflows, reducing manual analysis overhead by 70% for engineering teams.',
  },
  {
    title: 'LLM Reasoning Pipeline',
    impact: 'Engineered deterministic reasoning pipelines for auto-generating structured executive reports.',
  },
  {
    title: 'FastAPI Microservices',
    impact: 'Developed high-throughput asynchronous gateways supporting low-latency multi-agent orchestration.',
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
          <div className="flex flex-col mb-8">
            <m.span variants={itemVariants} className="section-label">
              Career // 02
            </m.span>

            <m.h2 variants={itemVariants} className="section-title">
              Work Experience
            </m.h2>

            <m.p variants={itemVariants} className="section-description">
              Production engineering contributions and technical ownership.
            </m.p>
          </div>

          {/* Experience Card */}
          <m.div
            variants={itemVariants}
            className="card-primary p-5 sm:p-6 md:p-7 space-y-6"
          >
            {/* Header */}
            <div className="border-b border-[var(--border-primary)] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2.5">
                  <h3 className="font-display text-lg sm:text-xl font-semibold text-[var(--text-primary)]">
                    Celebal Technologies
                  </h3>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-[10px] tracking-wider border border-emerald-500/20 uppercase font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Current
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-0.5 font-normal">
                  AI Engineer • Generative AI & Intelligent Systems
                </p>
              </div>

              <div className="font-mono text-xs text-[var(--text-tertiary)] px-3 py-1 rounded-md bg-[var(--bg-tertiary)] border border-[var(--border-primary)] w-fit">
                Feb 2026 → Present
              </div>
            </div>

            {/* Deliverables List */}
            <div className="space-y-3">
              <span className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider block">
                Key Deliverables & Impact
              </span>

              <div className="grid grid-cols-1 gap-3">
                {DELIVERABLES.map((item, index) => (
                  <div
                    key={item.title}
                    className="p-3.5 sm:p-4 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-primary)] flex flex-col gap-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display text-sm sm:text-base font-semibold text-[var(--text-primary)]">
                        {item.title}
                      </span>
                      <span className="font-mono text-[10px] text-[var(--text-tertiary)]">
                        0{index + 1}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-normal leading-relaxed">
                      {item.impact}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap items-center gap-1.5 pt-4 border-t border-[var(--border-primary)]">
              <span className="text-xs font-mono text-[var(--text-tertiary)] mr-2">
                Stack:
              </span>

              {TECH_TAGS.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-md bg-[var(--bg-tertiary)] border border-[var(--border-primary)] font-mono text-xs text-[var(--text-secondary)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </m.div>
        </m.div>
      </div>
    </section>
  );
});

Experience.displayName = 'Experience';