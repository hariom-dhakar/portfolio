import { useRef, useEffect, memo } from 'react';
import { m, useInView, useSpring, useTransform } from 'framer-motion';

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

  return <m.span ref={ref} className="tabular-nums font-display font-semibold">{display}</m.span>;
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
      className="relative w-full overflow-hidden border-t border-[var(--border-primary)]"
      aria-label="About Section"
    >
      <div className="section-layout">
        <div className="flex flex-col mb-8 md:mb-10">
          <m.span 
            custom={1}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUpVariant}
            className="section-label"
          >
            Profile
          </m.span>
          <m.h2 
            custom={2}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUpVariant}
            className="section-title"
          >
            The Engineer
          </m.h2>
          <m.p 
            custom={3}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUpVariant}
            className="section-description"
          >
            Designing production systems that retrieve, reason, and act.
          </m.p>
        </div>

        <m.div 
          custom={4}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUpVariant}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 border-y border-[var(--border-primary)] py-8 mb-10"
        >
          <div className="flex flex-col gap-1 p-4 rounded-xl card-secondary">
            <span className="text-3xl md:text-5xl font-display font-medium text-[var(--text-gold)] glow-text-gold">
              <AnimatedNumber value={3} />
            </span>
            <span className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider">
              Production Systems
            </span>
          </div>
          <div className="flex flex-col gap-1 p-4 rounded-xl card-secondary">
            <span className="text-3xl md:text-5xl font-display font-medium text-[var(--text-gold)] glow-text-gold">
              <AnimatedNumber value={7} />
            </span>
            <span className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider">
              Agents Deployed
            </span>
          </div>
          <div className="flex flex-col gap-1 p-4 rounded-xl card-secondary">
            <span className="text-3xl md:text-5xl font-display font-medium text-[var(--text-gold)] glow-text-gold">
              <AnimatedNumber value={70} suffix="%" />
            </span>
            <span className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider">
              Automation Achieved
            </span>
          </div>
          <div className="flex flex-col gap-1 p-4 rounded-xl card-secondary">
            <span className="text-3xl md:text-5xl font-display font-medium text-[var(--text-gold)] glow-text-gold">
              <AnimatedNumber value={500} suffix="+" />
            </span>
            <span className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider">
              DSA Solved
            </span>
          </div>
        </m.div>

        <m.div 
          custom={5}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUpVariant}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
        >
          <div className="flex flex-col gap-4">
            <p className="text-sm md:text-base font-sans font-light text-[var(--text-secondary)] leading-relaxed">
              AI systems engineer specializing in multi-agent orchestration, custom RAG pipelines, and high-performance FastAPI backends, focused on building production-grade solutions that eliminate hallucinations.
            </p>
          </div>
          
          <div className="card-primary p-6 flex flex-col gap-6">
            <div className="flex flex-col gap-1 border-b border-[var(--border-primary)] pb-4">
              <span className="text-xs font-mono text-[var(--text-gold)] uppercase tracking-widest font-semibold">Education</span>
              <span className="text-[var(--text-primary)] font-display font-bold text-base md:text-lg">B.Tech in Computer Science Engineering</span>
              <span className="text-[var(--text-secondary)] font-light text-sm">Arya College of Engineering & IT, Jaipur • 2022-2026</span>
              <span className="text-[var(--text-gold)] font-mono text-xs mt-1 font-semibold">CGPA 7.70</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs font-mono text-[var(--text-gold)] uppercase tracking-widest font-semibold">Credentials</span>
              <span className="text-[var(--text-primary)] font-display font-bold text-sm md:text-base">Databricks Certified Generative AI Engineer Associate</span>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
});

About.displayName = 'About';
