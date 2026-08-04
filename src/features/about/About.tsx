import { useRef, useEffect } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

const AnimatedNumber = ({ value, suffix = "" }: { value: number, suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const spring = useSpring(0, { mass: 1, stiffness: 50, damping: 15 });
  const display = useTransform(spring, (current) => Math.round(current) + suffix);

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  return <motion.span ref={ref} className="tabular-nums">{display}</motion.span>;
};

export const About = () => {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: custom * 0.1, ease: [0.21, 0.47, 0.32, 0.98] as const }
    })
  };

  return (
    <section 
      id="about"
      ref={containerRef}
      className="relative w-full flex items-center justify-center py-16 md:py-20 px-6 md:px-12 lg:px-24 bg-[var(--bg-primary)] overflow-hidden border-t border-[var(--border-primary)]"
    >
      <div className="max-w-7xl w-full mx-auto flex flex-col gap-12 md:gap-16">
        {/* Header Section */}
        <div className="flex flex-col gap-3">
          <motion.h2 
            custom={1}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUpVariant}
            className="text-4xl md:text-6xl font-display font-medium text-[var(--text-primary)] tracking-tight"
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
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 border-y border-[var(--border-primary)] py-10"
        >
          <div className="flex flex-col gap-1">
            <span className="text-3xl md:text-5xl font-display font-light text-[var(--text-accent)]">
              <AnimatedNumber value={3} />
            </span>
            <span className="text-xs md:text-sm font-mono text-[var(--text-tertiary)] uppercase tracking-wider">
              Production Systems
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-3xl md:text-5xl font-display font-light text-[var(--text-accent)]">
              <AnimatedNumber value={7} />
            </span>
            <span className="text-xs md:text-sm font-mono text-[var(--text-tertiary)] uppercase tracking-wider">
              AI Agents Deployed
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-3xl md:text-5xl font-display font-light text-[var(--text-accent)]">
              <AnimatedNumber value={70} suffix="%" />
            </span>
            <span className="text-xs md:text-sm font-mono text-[var(--text-tertiary)] uppercase tracking-wider">
              Automation Achieved
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-3xl md:text-5xl font-display font-light text-[var(--text-accent)]">
              <AnimatedNumber value={500} suffix="+" />
            </span>
            <span className="text-xs md:text-sm font-mono text-[var(--text-tertiary)] uppercase tracking-wider">
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
          className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16"
        >
          <div className="flex flex-col gap-4">
            <p className="text-base md:text-lg font-sans font-light text-[var(--text-secondary)] leading-relaxed">
              Early-career AI/ML engineer specializing in multi-agent orchestration, retrieval-augmented generation, and high-performance FastAPI backends. Focused on building systems that eliminate hallucinations and automate complex analytical workflows.
            </p>
          </div>
          
          <div className="flex flex-col gap-6 justify-center md:pl-8 border-t md:border-t-0 md:border-l border-[var(--border-primary)] pt-6 md:pt-0">
            <div className="flex flex-col gap-1">
              <span className="text-[var(--text-primary)] font-medium text-base md:text-lg">B.Tech CS</span>
              <span className="text-[var(--text-secondary)] font-light text-sm md:text-base">Arya College, Jaipur • 2022-2026</span>
              <span className="text-[var(--text-tertiary)] font-mono text-xs md:text-sm">CGPA 7.70</span>
            </div>
            
            <div className="w-8 h-[1px] bg-[var(--border-primary)] hidden md:block" />

            <div className="flex flex-col gap-1">
              <span className="text-[var(--text-primary)] font-medium text-base md:text-lg">Certifications</span>
              <span className="text-[var(--text-secondary)] font-light text-sm md:text-base">Databricks Certified GenAI Engineer Associate</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
