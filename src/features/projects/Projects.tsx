import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { PROJECTS_DATA, type ProjectData, type ArchitectureStep } from '../../data/projectsData';
import { ArchitectureSidebar } from '../../components/ArchitectureSidebar';

export const Projects = () => {
  return (
    <section id="projects" className="w-full bg-[var(--bg-primary)] py-16 md:py-24 overflow-hidden px-4 md:px-8 border-t border-[var(--border-primary)]">
      <div className="max-w-[1600px] mx-auto mb-12 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center justify-center text-center space-y-4"
        >
          <span className="font-mono text-xs text-text-accent uppercase tracking-widest px-3 py-1 rounded-full border border-border-glow bg-brand-glow">
            System Showcases
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tighter text-[var(--text-primary)]">
            Selected Work
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-sm md:text-base font-light">
            Production-grade AI systems, multi-agent orchestrations, and LLM pipelines with custom execution architectures.
          </p>
          <div className="w-24 h-px bg-[var(--border-glow)] opacity-50" />
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
};

function ProjectCard({ project, index }: { project: ProjectData; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

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
              <span className="font-mono text-xs text-cyan-400/80 uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
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
                <span className="text-3xl md:text-4xl font-display font-medium text-[var(--text-accent)] glow-text">
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
              <span className="font-mono text-xs text-text-tertiary uppercase tracking-wider">
                Execution Steps & Workflow Breakdown
              </span>
              <span className="font-mono text-[10px] text-cyan-400/80">
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
                  onStepSelect={() => setActiveStepIndex(stepIdx)}
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
                className="px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300"
              >
                {tech}
              </span>
            ))}
          </div>

        </div>

      </div>
    </motion.div>
  );
}

function StepItemCard({ 
  step, 
  stepIdx, 
  isActive, 
  onStepSelect 
}: { 
  step: ArchitectureStep; 
  stepIdx: number; 
  isActive: boolean; 
  onStepSelect: () => void; 
}) {
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
          ? 'bg-neutral-900/80 border-cyan-500/50 shadow-[0_0_20px_rgba(34,211,238,0.14)]'
          : 'bg-neutral-950/40 border-[var(--border-primary)] hover:border-neutral-700'
      }`}
    >
      <div className={`w-7 h-7 rounded-lg flex items-center justify-center border shrink-0 transition-colors ${
        isActive ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' : 'bg-neutral-900 text-neutral-500 border-neutral-800'
      }`}>
        <Icon className="w-3.5 h-3.5" />
      </div>
      <div className="flex flex-col gap-0.5 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-neutral-500">Step 0{stepIdx + 1}</span>
          <span className={`text-xs font-display font-medium truncate ${isActive ? 'text-cyan-300' : 'text-text-primary'}`}>
            {step.title}
          </span>
        </div>
        <p className="text-xs text-text-secondary font-light leading-snug">
          {step.description}
        </p>
      </div>
    </div>
  );
}
