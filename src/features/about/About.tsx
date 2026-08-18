import { useRef, useEffect, memo } from 'react';
import { m, useInView, useSpring, useTransform } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const AnimatedNumber = memo(({ value, suffix = "" }: { value: number, suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const spring = useSpring(0, { mass: 1, stiffness: 60, damping: 20 });
  const display = useTransform(spring, (current) => Math.round(current) + suffix);

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  return <m.span ref={ref} className="tabular-nums font-display font-medium text-[var(--text-primary)]">{display}</m.span>;
});

AnimatedNumber.displayName = 'AnimatedNumber';

export const About = memo(() => {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 16 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: custom * 0.08, ease: [0.16, 1, 0.3, 1] as const }
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
        <div className="flex flex-col mb-8">
          <m.span 
            custom={1}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUpVariant}
            className="section-label"
          >
            Overview // 01
          </m.span>
          <m.h2 
            custom={2}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUpVariant}
            className="section-title"
          >
            Engineering Profile
          </m.h2>
          <m.p 
            custom={3}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUpVariant}
            className="section-description"
          >
            Architecting reliable systems that retrieve, reason, and act deterministically.
          </m.p>
        </div>

        {/* Telemetry Metrics */}
        <m.div 
          custom={4}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUpVariant}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8"
        >
          <div className="card-primary p-4 flex flex-col justify-between">
            <span className="text-2xl sm:text-3xl font-display font-medium">
              <AnimatedNumber value={3} />
            </span>
            <span className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider mt-2">
              Production Systems
            </span>
          </div>

          <div className="card-primary p-4 flex flex-col justify-between">
            <span className="text-2xl sm:text-3xl font-display font-medium">
              <AnimatedNumber value={7} />
            </span>
            <span className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider mt-2">
              Agents Deployed
            </span>
          </div>

          <div className="card-primary p-4 flex flex-col justify-between">
            <span className="text-2xl sm:text-3xl font-display font-medium">
              <AnimatedNumber value={70} suffix="%" />
            </span>
            <span className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider mt-2">
              Process Automation
            </span>
          </div>

          <a 
            href="https://codolio.com/profile/hariom007"
            target="_blank"
            rel="noopener noreferrer"
            className="card-primary p-4 flex flex-col justify-between group hover:border-[var(--border-glow)] transition-colors cursor-pointer"
            aria-label="View Codolio Profile (500+ DSA Solved)"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl sm:text-3xl font-display font-medium group-hover:text-[var(--text-primary)] transition-colors">
                <AnimatedNumber value={500} suffix="+" />
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-[var(--text-tertiary)] opacity-60 group-hover:opacity-100 group-hover:text-[var(--text-primary)] transition-all" aria-hidden="true" />
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider">
                DSA Solved
              </span>
              <span className="text-[10px] font-mono text-[var(--text-accent)] font-medium">
                Codolio ↗
              </span>
            </div>
          </a>
        </m.div>

        {/* Bio & Education */}
        <m.div 
          custom={5}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUpVariant}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 items-stretch"
        >
          <div className="card-primary p-5 md:p-6 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider">Background</span>
              <p className="text-sm md:text-base text-[var(--text-secondary)] font-normal leading-relaxed">
                AI engineer focused on building production-grade multi-agent architectures, structured RAG pipelines, and deterministic FastAPI microservices. Passionate about eliminating hallucinations through rigorous evaluation loops and guardrails.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[var(--border-primary)] flex items-center justify-between text-xs text-[var(--text-tertiary)] font-mono">
              <span>Location: Jaipur, India</span>
              <span>Focus: Agentic & GenAI</span>
            </div>
          </div>
          
          <div className="card-primary p-5 md:p-6 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider">Academic Foundation</span>
              <div>
                <h3 className="text-base font-semibold text-[var(--text-primary)]">B.Tech in Computer Science Engineering</h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-0.5">Arya College of Engineering & IT • 2022–2026</p>
                <p className="text-xs font-mono text-[var(--text-accent)] mt-1">CGPA: 7.70</p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[var(--border-primary)] space-y-1.5">
              <span className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider block">Leadership & Campus Initiatives</span>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--bg-tertiary)] border border-[var(--border-primary)] text-xs text-[var(--text-secondary)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-accent)]" />
                  Led Cipher Coding Club
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--bg-tertiary)] border border-[var(--border-primary)] text-xs text-[var(--text-secondary)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-accent)]" />
                  Organized College Hackathon
                </span>
              </div>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
});

About.displayName = 'About';
