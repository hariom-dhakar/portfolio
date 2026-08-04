import { useRef, useEffect, useState, useCallback, memo } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { PROJECTS_DATA, type ProjectData, type ArchitectureStep } from '../../data/projectsData';
import { ArchitectureSidebar } from '../../components/ArchitectureSidebar';

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

  const handleStepSelect = useCallback((idx: number) => {
    setActiveStepIndex((prev) => (prev !== idx ? idx : prev));
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
                  step={step}
                  stepIdx={stepIdx}
                  isActive={activeStepIndex === stepIdx}
                  onStepSelect={() => handleStepSelect(stepIdx)}
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

const StepItemCard = memo(({ 
  step, 
  stepIdx, 
  isActive, 
  onStepSelect 
}: { 
  step: ArchitectureStep; 
  stepIdx: number; 
  isActive: boolean; 
  onStepSelect: () => void; 
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { margin: "-30% 0px -40% 0px" });

  useEffect(() => {
    if (isInView) {
      onStepSelect();
    }
  }, [isInView, onStepSelect]);

  const Icon = step.icon;

  return (
    <div
      ref={itemRef}
      onClick={onStepSelect}
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
});

StepItemCard.displayName = 'StepItemCard';
