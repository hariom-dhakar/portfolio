import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export const Experience = () => {
  const deliverables = [
    { title: 'CrewAI EDA Analyzer', impact: '70% reduction in manual analysis' },
    { title: 'LLM Reasoning Pipeline', impact: 'Auto-generated business insights' },
    { title: 'FastAPI Microservices', impact: 'Scalable async data processing' },
  ];

  const techTags = ['CrewAI', 'FastAPI', 'Pandas', 'NumPy', 'Scikit-Learn', 'REST APIs', 'Python'];

  return (
    <section id="experience" className="py-16 md:py-20 px-6 md:px-12 max-w-6xl mx-auto border-t border-[var(--border-primary)]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="flex flex-col space-y-12"
      >
        {/* Header */}
        <div className="space-y-2">
          <motion.h2 
            variants={itemVariants}
            className="font-display text-4xl md:text-6xl font-bold tracking-tight text-text-primary"
          >
            Deployment History
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-text-secondary text-xs md:text-sm font-mono tracking-wide"
          >
            SYSTEM LOG // RECENT PRODUCTION RELEASES
          </motion.p>
        </div>

        {/* Deployment Record */}
        <motion.div variants={itemVariants} className="flex flex-col space-y-10">
          {/* Status Line */}
          <div className="border-t border-border-primary pt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-xs tracking-widest border border-emerald-500/20 uppercase w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active Deployment
              </span>
              <div>
                <h3 className="font-display text-2xl md:text-3xl font-semibold text-text-primary">Celebal Technologies</h3>
                <p className="text-text-accent font-mono text-base mt-0.5">AI Engineer</p>
              </div>
            </div>
            <div className="font-mono text-text-tertiary text-sm">
              Feb 2026 &rarr; Present
            </div>
          </div>

          {/* Deliverables */}
          <div className="flex flex-col gap-6 md:pl-6">
            {deliverables.map((item, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="flex flex-col border-l-2 border-text-accent/30 pl-5 py-0.5"
              >
                <span className="font-mono text-text-secondary text-xs mb-1">OUTPUT_TARGET_{index + 1}</span>
                <span className="font-sans text-xl font-medium text-text-primary mb-0.5">{item.title}</span>
                <span className="font-mono text-text-accent/80 text-base">&gt; {item.impact}</span>
              </motion.div>
            ))}
          </div>

          {/* Tech Tags */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap gap-x-4 gap-y-2.5 pt-4"
          >
            {techTags.map((tag, idx) => (
              <span key={idx} className="font-mono text-text-tertiary text-xs md:text-sm tracking-wider uppercase hover:text-text-accent transition-colors">
                #{tag}
              </span>
            ))}
          </motion.div>
        </motion.div>

      </motion.div>
    </section>
  );
};
