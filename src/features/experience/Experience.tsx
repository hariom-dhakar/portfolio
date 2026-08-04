import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export const Experience = () => {
  const deliverables = [
    { title: 'CrewAI EDA Analyzer', impact: '70% reduction in manual data analysis effort for ML engineers' },
    { title: 'LLM Reasoning Pipeline', impact: 'Auto-generated executive business insights & structured reports' },
    { title: 'FastAPI Microservices', impact: 'High-throughput async data processing & agent API gateways' },
  ];

  const techTags = ['CrewAI', 'FastAPI', 'Pandas', 'NumPy', 'Scikit-Learn', 'REST APIs', 'Python'];

  return (
    <section 
      id="experience" 
      className="py-16 md:py-24 px-4 md:px-8 max-w-6xl mx-auto border-t border-[var(--border-primary)]"
      aria-label="Experience Section"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="flex flex-col space-y-12"
      >
        {/* Header */}
        <div className="space-y-2">
          <motion.h2 
            variants={itemVariants}
            className="font-display text-4xl md:text-6xl font-bold tracking-tight text-[var(--text-primary)]"
          >
            Deployment History
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-[var(--text-gold)] text-xs md:text-sm font-mono tracking-wider"
          >
            SYSTEM LOG // RECENT PRODUCTION RELEASES
          </motion.p>
        </div>

        {/* Deployment Record Card */}
        <motion.div variants={itemVariants} className="glass-card p-6 md:p-10 rounded-3xl border border-[var(--border-primary)] space-y-8 relative overflow-hidden">
          
          {/* Top Status Header */}
          <div className="border-b border-[var(--border-primary)] pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 font-mono text-xs tracking-widest border border-emerald-500/20 uppercase w-fit shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active Deployment
              </span>
              <div>
                <h3 className="font-display text-2xl md:text-4xl font-bold text-[var(--text-primary)]">Celebal Technologies</h3>
                <p className="text-[var(--text-accent)] font-mono text-sm md:text-base mt-0.5 font-semibold">AI Engineer</p>
              </div>
            </div>
            <div className="font-mono text-[var(--text-gold)] text-xs md:text-sm px-3.5 py-1.5 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-gold)] w-fit font-semibold">
              Feb 2026 &rarr; Present
            </div>
          </div>

          {/* Deliverables Vertical Timeline */}
          <div className="relative pl-6 space-y-6 border-l-2 border-[var(--border-glow)]">
            
            {/* Animated Pulse Beam down the line */}
            <motion.div
              className="absolute left-[-2px] top-0 w-[2px] h-full bg-[var(--text-accent)] shadow-[0_0_10px_var(--text-accent-glow)]"
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />

            {deliverables.map((item, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="relative flex flex-col gap-1 p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)] hover:border-[var(--border-glow)] transition-colors"
              >
                {/* Node Bullet Dot */}
                <div className="absolute -left-[31px] top-5 w-2.5 h-2.5 rounded-full bg-[var(--text-accent)] shadow-[0_0_8px_var(--text-accent-glow)] border border-[var(--bg-primary)]" />

                <span className="font-mono text-[var(--text-gold)] text-[10px] uppercase tracking-widest font-semibold">DELIVERABLE_0{index + 1}</span>
                <span className="font-display text-lg md:text-xl font-semibold text-[var(--text-primary)]">{item.title}</span>
                <span className="font-mono text-[var(--text-accent)] text-xs md:text-sm">&gt; {item.impact}</span>
              </motion.div>
            ))}
          </div>

          {/* Tech Tags */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap gap-2 pt-4 border-t border-[var(--border-primary)]"
          >
            <span className="text-xs font-mono text-[var(--text-tertiary)] mr-2 py-1">Stack:</span>
            {techTags.map((tag, idx) => (
              <span 
                key={idx} 
                className="px-2.5 py-1 rounded-md bg-[var(--bg-tertiary)] border border-[var(--border-primary)] font-mono text-[var(--text-secondary)] text-xs tracking-wider uppercase hover:text-[var(--text-accent)] hover:border-[var(--border-glow)] transition-all cursor-default"
              >
                #{tag}
              </span>
            ))}
          </motion.div>

        </motion.div>

      </motion.div>
    </section>
  );
};
