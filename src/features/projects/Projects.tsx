import { useRef, useEffect, useState, useCallback, memo, forwardRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { PROJECTS_DATA, type ProjectData, type ArchitectureStep } from '../../data/projectsData';
import { ArchitectureSidebar } from '../../components/ArchitectureSidebar';

/**
 * Detects when the browser finishes scrolling.
 * Uses the native 'scrollend' event where available, with a scroll-idle
 * fallback (no scroll activity for `idleMs` milliseconds).
 * Returns a cleanup function to tear down listeners early.
 */
function onScrollEnd(callback: () => void, idleMs = 150): () => void {
  let idleTimer: ReturnType<typeof setTimeout> | null = null;
  let settled = false;

  const settle = () => {
    if (settled) return;
    settled = true;
    teardown();
    callback();
  };

  const onScroll = () => {
    if (idleTimer) clearTimeout(idleTimer);
    idleTimer = setTimeout(settle, idleMs);
  };

  // Kick off an initial idle timer so that if scrollIntoView is a no-op
  // (element already centered), we still release the lock promptly.
  idleTimer = setTimeout(settle, idleMs);

  window.addEventListener('scroll', onScroll, { passive: true });

  if ('onscrollend' in window) {
    window.addEventListener('scrollend', settle, { once: true });
  }

  function teardown() {
    window.removeEventListener('scroll', onScroll);
    if ('onscrollend' in window) {
      window.removeEventListener('scrollend', settle);
    }
    if (idleTimer) {
      clearTimeout(idleTimer);
      idleTimer = null;
    }
  }

  return teardown;
}

export const Projects = memo(() => {
  return (
    <section id="projects" className="w-full py-16 md:py-24 overflow-hidden px-4 md:px-8 border-t border-[var(--border-primary)]">
      <div className="max-w-[1600px] mx-auto mb-12 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center justify-center text-center space-y-4"
        >
          <span className="font-mono text-xs text-[var(--text-gold)] uppercase tracking-widest px-3 py-1 rounded-full border border-[var(--border-gold)] bg-[var(--bg-tertiary)] font-semibold">
            System Showcases
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tighter text-[var(--text-primary)]">
            Selected Work
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-sm md:text-base font-light">
            Production-grade AI systems, multi-agent orchestrations, and LLM pipelines with custom execution architectures.
          </p>
          <div className="w-24 h-px bg-[var(--border-gold)] opacity-50" />
        </motion.div>
      </div>

      {/* Projects List */}
      <div className="max-w-[1600px] mx-auto flex flex-col gap-16 md:gap-24">
        {PROJECTS_DATA.map((project, idx) => (
          <ProjectCard key={project.id} project={project} index={idx} />
        ))}
      </div>
    </section>
  );
});

Projects.displayName = 'Projects';

const ProjectCard = memo(({ project, index }: { project: ProjectData; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isProgrammaticScroll = useRef(false);
  const scrollCleanupRef = useRef<(() => void) | null>(null);
  const observerDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Tear down scroll-end listener and observer debounce on unmount
  useEffect(() => {
    return () => {
      scrollCleanupRef.current?.();
      if (observerDebounceRef.current) clearTimeout(observerDebounceRef.current);
    };
  }, []);

  const handleStepSelect = useCallback((idx: number, isClick = false) => {
    if (isClick) {
      // Cancel any pending observer debounce so it cannot override the click
      if (observerDebounceRef.current) {
        clearTimeout(observerDebounceRef.current);
        observerDebounceRef.current = null;
      }

      // Tear down any previous scroll-end listener (handles rapid clicks)
      scrollCleanupRef.current?.();

      // Immediate, authoritative state update
      setActiveStepIndex(idx);

      const targetEl = stepRefs.current[idx];
      if (targetEl) {
        // Lock observer-driven updates for the duration of the scroll
        isProgrammaticScroll.current = true;

        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });

        // Release the lock only after scrolling has actually finished
        scrollCleanupRef.current = onScrollEnd(() => {
          isProgrammaticScroll.current = false;
          scrollCleanupRef.current = null;
        });
      }
    } else {
      // Observer-driven update: debounce to coalesce rapid IntersectionObserver
      // callbacks from multiple cards entering/leaving the viewport at once.
      if (observerDebounceRef.current) {
        clearTimeout(observerDebounceRef.current);
      }
      observerDebounceRef.current = setTimeout(() => {
        // Re-check the guard — a click may have fired during the debounce window
        if (!isProgrammaticScroll.current) {
          setActiveStepIndex(idx);
        }
        observerDebounceRef.current = null;
      }, 80);
    }
  }, []);

  const variants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: index % 2 === 0 ? 0.98 : 1.02,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] as const
      } 
    }
  };

  return (
    <motion.div 
      ref={cardRef}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={variants}
      className="glass-card p-6 md:p-10 rounded-3xl border border-[var(--border-primary)] shadow-2xl relative w-full"
    >
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start relative w-full">
        
        {/* LEFT HAND SIDE PANEL FOR THIS SPECIFIC PROJECT (Sticky on Desktop) */}
        <div className="w-full lg:w-[320px] shrink-0 lg:sticky lg:top-24 self-start py-1 z-10">
          <ArchitectureSidebar 
            selectedProject={project} 
            activeStepIndex={activeStepIndex} 
            onStepSelect={(idx) => handleStepSelect(idx, true)}
          />
        </div>

        {/* RIGHT HAND SIDE DETAILS FOR THIS SPECIFIC PROJECT */}
        <div className="flex-1 w-full min-w-0 flex flex-col gap-8">
          
          {/* Header & Meta */}
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 border-b border-[var(--border-primary)] pb-4">
            <div className="space-y-2">
              <span className="font-mono text-xs text-[var(--text-gold)] uppercase tracking-widest flex items-center gap-2 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-gold)] animate-pulse" />
                PROJECT 0{index + 1}
              </span>
              <h3 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-[var(--text-primary)]">
                {project.title}
              </h3>
              <p className="text-base md:text-lg text-[var(--text-secondary)] font-light leading-relaxed max-w-2xl">
                {project.tagline}
              </p>
            </div>

            <a 
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost shrink-0 w-fit text-xs md:text-sm py-2 px-4"
            >
              GitHub Repository
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Metrics Bar */}
          <div className="flex flex-wrap gap-8 md:gap-14 py-2">
            {project.metrics.map((metric, i) => (
              <div key={i} className="flex flex-col gap-0.5">
                <span className="text-3xl md:text-4xl font-display font-medium text-[var(--text-gold)] glow-text-gold">
                  {metric.value}
                </span>
                <span className="text-[10px] md:text-xs uppercase tracking-widest text-[var(--text-tertiary)] font-mono">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>

          {/* Execution Steps & Workflow Breakdown Grid */}
          <div className="border-t border-[var(--border-primary)] pt-6 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[var(--text-tertiary)] uppercase tracking-wider">
                Execution Steps & Workflow Breakdown
              </span>
              <span className="font-mono text-[10px] text-[var(--text-accent)]">
                Click step to trigger left panel
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.architecture.map((step, stepIdx) => (
                <StepItemCard 
                  key={step.id}
                  ref={(el) => {
                    stepRefs.current[stepIdx] = el;
                  }}
                  step={step}
                  stepIdx={stepIdx}
                  isActive={activeStepIndex === stepIdx}
                  isProgrammaticScrollRef={isProgrammaticScroll}
                  onStepSelect={(idx) => handleStepSelect(idx, false)}
                  onStepClick={(idx) => handleStepSelect(idx, true)}
                />
              ))}
            </div>
          </div>

          {/* Tech Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-[var(--border-primary)]/50">
            <span className="text-xs font-mono text-[var(--text-tertiary)] mr-2">Stack:</span>
            {project.tech.map((tech, i) => (
              <span 
                key={i} 
                className="px-2.5 py-1 rounded-md bg-[var(--bg-tertiary)] border border-[var(--border-primary)] text-xs font-mono text-[var(--text-secondary)]"
              >
                {tech}
              </span>
            ))}
          </div>

        </div>

      </div>
    </motion.div>
  );
});

ProjectCard.displayName = 'ProjectCard';

interface StepItemCardProps {
  step: ArchitectureStep;
  stepIdx: number;
  isActive: boolean;
  isProgrammaticScrollRef: React.RefObject<boolean>;
  onStepSelect: (idx: number) => void;
  onStepClick: (idx: number) => void;
}

const StepItemCard = memo(
  forwardRef<HTMLDivElement, StepItemCardProps>(
    ({ step, stepIdx, isActive, isProgrammaticScrollRef, onStepSelect, onStepClick }, ref) => {
      const cardContainerRef = useRef<HTMLDivElement | null>(null);

      const setRef = useCallback(
        (node: HTMLDivElement | null) => {
          cardContainerRef.current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
          }
        },
        [ref]
      );

      const isInView = useInView(cardContainerRef, { margin: "-30% 0px -40% 0px" });

      useEffect(() => {
        if (isInView && !isProgrammaticScrollRef.current) {
          onStepSelect(stepIdx);
        }
      }, [isInView, stepIdx, onStepSelect, isProgrammaticScrollRef]);

      const Icon = step.icon;

      return (
        <div
          ref={setRef}
          onClick={() => onStepClick(stepIdx)}
          className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer flex items-start gap-3.5 ${
            isActive
              ? 'bg-[var(--brand-glow)] border-[var(--border-glow)] shadow-sm'
              : 'bg-[var(--bg-secondary)] border-[var(--border-primary)] hover:border-[var(--border-glow)]'
          }`}
        >
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center border shrink-0 transition-colors ${
            isActive ? 'bg-[var(--brand-glow)] text-[var(--text-accent)] border-[var(--border-glow)]' : 'bg-[var(--bg-tertiary)] text-[var(--text-tertiary)] border-[var(--border-primary)]'
          }`}>
            <Icon className="w-3.5 h-3.5" />
          </div>
          <div className="flex flex-col gap-0.5 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-[var(--text-tertiary)]">Step 0{stepIdx + 1}</span>
              <span className={`text-xs font-display font-medium truncate ${isActive ? 'text-[var(--text-accent)]' : 'text-[var(--text-primary)]'}`}>
                {step.title}
              </span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] font-light leading-snug">
              {step.description}
            </p>
          </div>
        </div>
      );
    }
  )
);

StepItemCard.displayName = 'StepItemCard';
