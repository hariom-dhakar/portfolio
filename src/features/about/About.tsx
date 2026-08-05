import { useRef, useEffect, memo } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

const AnimatedNumber = memo(({ value, suffix = "" }: { value: number, suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const spring = useSpring(0, { mass: 1, stiffness: 50, damping: 15 });
  const display = useTransform(spring, (current) => Math.round(current) + suffix);

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  return <motion.span ref={ref} className="tabular-nums font-display font-semibold">{display}</motion.span>;
});

AnimatedNumber.displayName = 'AnimatedNumber';

export const About = memo(() => {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 24 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: custom * 0.12, ease: [0.16, 1, 0.3, 1] as const }
    })
  };

  return (
    <section 
      id="about"
      ref={containerRef}
      className="relative w-full flex items-center justify-center py-16 md:py-24 px-4 md:px-8 overflow-hidden border-t border-[var(--border-primary)]"
      aria-label="About Section"
    >
      <div className="max-w-7xl w-full mx-auto flex flex-col gap-12 md:gap-16">
        {/* Header Section */}
        <div className="flex flex-col gap-3">
          <motion.h2 
            custom={1}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUpVariant}
            className="text-4xl md:text-6xl font-display font-bold text-[var(--text-primary)] tracking-tight"
          >
            The Engineer
          </motion.h2>
          <motion.p 
            custom={2}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUpVariant}
            className="text-lg md:text-2xl font-sans font-light text-[var(--text-secondary)] max-w-3xl leading-relaxed"
          >
            Designing production AI systems that reason, retrieve, and respond.
          </motion.p>
        </div>

        {/* Metrics Section */}
        <motion.div 
          custom={3}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUpVariant}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 border-y border-[var(--border-primary)] py-10"
        >
          <div className="flex flex-col gap-1 p-4 rounded-xl glass-panel">
            <span className="text-3xl md:text-5xl font-display font-medium text-[var(--text-gold)] glow-text-gold">
              <AnimatedNumber value={3} />
            </span>
            <span className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider">
              Production Systems
            </span>
          </div>
          <div className="flex flex-col gap-1 p-4 rounded-xl glass-panel">
            <span className="text-3xl md:text-5xl font-display font-medium text-[var(--text-gold)] glow-text-gold">
              <AnimatedNumber value={7} />
            </span>
            <span className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider">
              AI Agents Deployed
            </span>
          </div>
          <div className="flex flex-col gap-1 p-4 rounded-xl glass-panel">
            <span className="text-3xl md:text-5xl font-display font-medium text-[var(--text-gold)] glow-text-gold">
              <AnimatedNumber value={70} suffix="%" />
            </span>
            <span className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider">
              Automation Achieved
            </span>
          </div>
          <div className="flex flex-col gap-1 p-4 rounded-xl glass-panel">
            <span className="text-3xl md:text-5xl font-display font-medium text-[var(--text-gold)] glow-text-gold">
              <AnimatedNumber value={500} suffix="+" />
            </span>
            <span className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider">
              DSA Problems Solved
            </span>
          </div>
        </motion.div>

        {/* Content Section */}
        <motion.div 
          custom={4}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUpVariant}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center"
        >
          <div className="flex flex-col gap-4">
            <p className="text-base md:text-lg font-sans font-light text-[var(--text-secondary)] leading-relaxed">
              Early-career AI/ML engineer specializing in multi-agent orchestration, retrieval-augmented generation (RAG), and high-performance FastAPI backends. Focused on building production systems that eliminate hallucinations and automate complex analytical workflows.
            </p>
          </div>
          
          <div className="glass-card p-6 md:p-8 rounded-2xl flex flex-col gap-6 border border-[var(--border-primary)]">
            <div className="flex flex-col gap-1 border-b border-[var(--border-primary)] pb-4">
              <span className="text-xs font-mono text-[var(--text-gold)] uppercase tracking-widest font-semibold">Education</span>
              <span className="text-[var(--text-primary)] font-display font-bold text-lg md:text-xl">B.Tech in Computer Science Engineering</span>
              <span className="text-[var(--text-secondary)] font-light text-sm">Arya College of Engineering & IT, Jaipur • 2022-2026</span>
              <span className="text-[var(--text-gold)] font-mono text-xs mt-1 font-semibold">CGPA 7.70</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs font-mono text-[var(--text-gold)] uppercase tracking-widest font-semibold">Credentials</span>
              <span className="text-[var(--text-primary)] font-display font-bold text-base md:text-lg">Databricks Certified Generative AI Engineer Associate</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

About.displayName = 'About';
