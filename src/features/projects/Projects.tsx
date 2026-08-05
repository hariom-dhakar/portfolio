import { useRef, useEffect, useState, useCallback, memo, forwardRef } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  Lightbulb, 
  ShieldCheck, 
  BookOpen, 
  ExternalLink, 
  AlertTriangle, 
  CheckCircle2, 
  Cpu, 
  Activity,
  Layers,
  Code2
} from 'lucide-react';
import { PROJECTS_DATA, type ProjectData, type ArchitectureStep } from '../../data/projectsData';
import { AnimatedPipelineFlow } from '../../components/AnimatedPipelineFlow';

export const Projects = memo(() => {
  return (
    <section id="projects" className="w-full overflow-hidden border-t border-[var(--border-primary)]">
      <div className="section-layout">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col mb-8 md:mb-10"
        >
          <span className="section-label">System Showcases</span>
          <h2 className="section-title">Selected Work</h2>
          <p className="section-description">
            Production systems with custom execution architectures and multi-agent pipelines.
          </p>
        </m.div>

        <div className="flex flex-col gap-8 md:gap-10">
          {PROJECTS_DATA.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
});

Projects.displayName = 'Projects';

const INLINE_TABS = [
  { id: 'problem', label: 'Problem' },
  { id: 'solution', label: 'Solution' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'execution', label: 'Execution' },
  { id: 'lessons', label: 'Lessons' },
] as const;

type InlineTabId = typeof INLINE_TABS[number]['id'];

const ProjectCard = memo(({ project, index }: { project: ProjectData; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<InlineTabId>('problem');

  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleStepSelect = useCallback((idx: number) => {
    setActiveStepIndex(idx);
  }, []);

  return (
    <m.div 
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="card-primary p-5 md:p-6 relative w-full overflow-hidden"
    >
      <div className="w-full flex flex-col gap-4">
        
        {/* CARD HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border-primary)] pb-4">
          <div className="space-y-1 max-w-2xl">
            <span className="font-mono text-[10px] text-[var(--text-gold)] uppercase tracking-widest flex items-center gap-2 font-semibold">
              PROJECT 0{index + 1}
            </span>
            <h3 className="text-2xl md:text-3xl font-display font-bold tracking-tight text-[var(--text-primary)]">
              {project.title}
            </h3>
            <p className="text-xs md:text-sm text-[var(--text-secondary)] font-light leading-relaxed">
              {project.tagline}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <a 
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost shrink-0 text-xs py-2 px-4 focus-visible:outline-2 focus-visible:outline-cyan-400"
              aria-label={`View ${project.title} GitHub Repository`}
            >
              <span>GitHub Repo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => {
                setIsExpanded((prev) => !prev);
                if (!isExpanded) setActiveTab('problem');
              }}
              className="btn-primary text-xs py-2 px-4 focus-visible:outline-2 focus-visible:outline-cyan-400 cursor-pointer"
              aria-expanded={isExpanded}
              aria-label={isExpanded ? `Collapse ${project.title}` : `Expand ${project.title}`}
            >
              <span>{isExpanded ? 'Collapse' : 'Expand'}</span>
              {isExpanded ? (
                <ChevronUp className="w-3.5 h-3.5" aria-hidden="true" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* TECH STACK & METRICS PREVIEW */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-tertiary)] mr-1">Stack:</span>
            {project.tech.map((t, i) => (
              <span 
                key={i}
                className="px-2.5 py-0.5 rounded-md bg-[var(--bg-tertiary)] border border-[var(--border-primary)] text-xs font-mono text-[var(--text-secondary)]"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {project.metrics.map((mItem, i) => (
              <div key={i} className="flex items-baseline gap-1.5 font-mono">
                <span className="text-sm md:text-base font-bold text-[var(--text-gold)]">{mItem.value}</span>
                <span className="text-[9px] uppercase tracking-wider text-[var(--text-tertiary)]">{mItem.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* INLINE TABBED CASE STUDY (EXPANDABLE) */}
        <AnimatePresence>
          {isExpanded && (
            <m.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden border-t border-[var(--border-primary)] pt-4"
            >
              {/* STICKY IN-CARD NAVBAR */}
              <div className="sticky top-0 z-20 bg-[var(--bg-secondary)]/95 backdrop-blur-xl border border-[var(--border-primary)] p-2 mb-6 rounded-xl flex items-center justify-between gap-2 shadow-lg">
                <nav className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-1 px-2" aria-label={`${project.title} Case Study Tabs`}>
                  {INLINE_TABS.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative py-1 text-xs md:text-sm font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-cyan-400 rounded-md px-1 ${
                          isActive
                            ? 'text-[var(--text-primary)] font-semibold'
                            : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'
                        }`}
                      >
                        {tab.label}
                        {isActive && (
                          <m.div
                            layoutId={`activeInCardTab-${project.id}`}
                            className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[var(--text-accent)] rounded-full"
                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          />
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* TABBED PANELS CONTAINER */}
              <div className="min-h-[280px] px-1 py-2">
                <AnimatePresence mode="wait">
                  
                  {/* TAB 1: PROBLEM */}
                  {activeTab === 'problem' && (
                    <m.div
                      key="tab-problem"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider font-semibold">
                          <Lightbulb className="w-4 h-4" />
                          <span>Project Motivation</span>
                        </div>
                        <div className="p-4 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-primary)] text-xs md:text-sm text-[var(--text-primary)] font-light leading-relaxed">
                          {project.motivation}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs font-mono text-rose-400 uppercase tracking-wider font-semibold">
                          <AlertTriangle className="w-4 h-4" />
                          <span>Core Challenge</span>
                        </div>
                        <div className="p-4 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-primary)] text-xs md:text-sm text-[var(--text-secondary)] font-light leading-relaxed">
                          {project.problem}
                        </div>
                      </div>

                      <div className="space-y-2 pt-2">
                        <span className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider block">Key Performance Benchmarks</span>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {project.metrics.map((mItem, i) => (
                            <div key={i} className="p-3.5 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-primary)] space-y-1">
                              <span className="text-2xl md:text-3xl font-bold font-mono text-[var(--text-gold)] glow-text-gold">{mItem.value}</span>
                              <span className="text-[10px] uppercase font-mono tracking-widest text-[var(--text-tertiary)] block">{mItem.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </m.div>
                  )}

                  {/* TAB 2: SOLUTION */}
                  {activeTab === 'solution' && (
                    <m.div
                      key="tab-solution"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Solution Overview</span>
                        </div>
                        <div className="p-4 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-primary)] text-xs md:text-sm text-[var(--text-primary)] font-light leading-relaxed">
                          {project.solution}
                        </div>
                        <p className="text-xs md:text-sm text-[var(--text-secondary)] font-light leading-relaxed pt-1">
                          {project.overview}
                        </p>
                      </div>

                      <div className="space-y-3 pt-2">
                        <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-accent)] uppercase tracking-wider font-semibold">
                          <Code2 className="w-4 h-4" />
                          <span>Implementation Highlights</span>
                        </div>
                        <div className="space-y-2">
                          {project.implementationHighlights.map((highlight, hIdx) => (
                            <div 
                              key={hIdx}
                              className="p-3 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-primary)] flex items-start gap-3 text-xs md:text-sm text-[var(--text-secondary)] font-light"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-accent)] mt-1.5 shrink-0" />
                              <span>{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[var(--border-primary)]/40">
                        <span className="text-xs font-mono text-[var(--text-tertiary)] mr-2">Technologies Used:</span>
                        {project.tech.map((t, i) => (
                          <span 
                            key={i}
                            className="px-3 py-1 rounded-md bg-[var(--bg-tertiary)] border border-[var(--border-gold)] text-xs font-mono text-[var(--text-gold)]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </m.div>
                  )}

                  {/* TAB 3: ARCHITECTURE (EXISTING ARCHITECTURE DIAGRAM & EXPLANATION) */}
                  {activeTab === 'architecture' && (
                    <m.div
                      key="tab-architecture"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="space-y-6"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-gold)] uppercase tracking-wider font-semibold">
                          <Cpu className="w-4 h-4" />
                          <span>System Architecture Diagram</span>
                        </div>
                        <span className="text-[10px] font-mono text-[var(--text-tertiary)] hidden sm:inline">
                          Interactive step visualization
                        </span>
                      </div>

                      {/* UNCHANGED ARCHITECTURE PIPELINE DIAGRAM */}
                      <AnimatedPipelineFlow 
                        architecture={project.architecture}
                        projectId={project.id}
                        activeStepIndex={activeStepIndex}
                        onStepSelect={handleStepSelect}
                      />

                      <div className="p-4 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-primary)] space-y-2">
                        <span className="text-xs font-mono text-[var(--text-gold)] font-semibold block">Architecture Design Mindset</span>
                        <p className="text-xs text-[var(--text-secondary)] font-light leading-relaxed">
                          Decoupled processing layers ensure isolated node execution, explicit error handling boundaries, and real-time observability across all stages of model inference.
                        </p>
                      </div>
                    </m.div>
                  )}

                  {/* TAB 4: EXECUTION (EXISTING AI EXECUTION TRACE PIPELINE & STEP CARDS) */}
                  {activeTab === 'execution' && (
                    <m.div
                      key="tab-execution"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="space-y-6"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-accent)] uppercase tracking-wider font-semibold">
                          <Activity className="w-4 h-4" />
                          <span>AI Execution Trace & Workflow Breakdown</span>
                        </div>
                        <span className="text-[10px] font-mono text-[var(--text-accent)]">
                          Select step to inspect
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                        {project.architecture.map((step, stepIdx) => (
                          <StepItemCard 
                            key={step.id}
                            ref={(el) => {
                              stepRefs.current[stepIdx] = el;
                            }}
                            step={step}
                            stepIdx={stepIdx}
                            isActive={activeStepIndex === stepIdx}
                            onStepClick={handleStepSelect}
                          />
                        ))}
                      </div>

                      <div className="border-t border-[var(--border-primary)]/40 pt-4 space-y-3">
                        <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-primary)] uppercase tracking-wider font-semibold">
                          <ShieldCheck className="w-4 h-4 text-[var(--text-accent)]" />
                          <span>Production Execution Guardrails</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {project.productionConsiderations.map((item, pIdx) => (
                            <div
                              key={pIdx}
                              className="p-3.5 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-primary)] space-y-1 hover:border-[var(--border-glow)] transition-all"
                            >
                              <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-accent)] shrink-0" />
                                <span className="font-mono text-xs font-semibold text-[var(--text-primary)]">
                                  {item.title}
                                </span>
                              </div>
                              <p className="text-xs text-[var(--text-secondary)] font-light leading-relaxed pl-3.5">
                                {item.detail}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </m.div>
                  )}

                  {/* TAB 5: LESSONS */}
                  {activeTab === 'lessons' && (
                    <m.div
                      key="tab-lessons"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="space-y-6"
                    >
                      <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-gold)] uppercase tracking-wider font-semibold">
                        <Lightbulb className="w-4 h-4" />
                        <span>Engineering Decisions & Lessons Learned</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {project.lessonsLearned.map((lesson, lIdx) => (
                          <div 
                            key={lIdx}
                            className="p-4 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-primary)] space-y-2 hover:border-[var(--border-gold)]/40 transition-colors"
                          >
                            <span className="font-mono text-xs font-semibold text-[var(--text-primary)] block">
                              {lesson.title}
                            </span>
                            <p className="text-xs text-[var(--text-secondary)] font-light leading-relaxed">
                              {lesson.takeaway}
                            </p>
                          </div>
                        ))}
                      </div>

                    </m.div>
                  )}

                </AnimatePresence>
              </div>
            </m.div>
          )}
        </AnimatePresence>

      </div>
    </m.div>
  );
});

ProjectCard.displayName = 'ProjectCard';

interface StepItemCardProps {
  step: ArchitectureStep;
  stepIdx: number;
  isActive: boolean;
  onStepClick: (idx: number) => void;
}

const StepItemCard = memo(
  forwardRef<HTMLDivElement, StepItemCardProps>(
    ({ step, stepIdx, isActive, onStepClick }, ref) => {
      const Icon = step.icon;

      return (
        <div
          ref={ref}
          onClick={() => onStepClick(stepIdx)}
          className={`p-2.5 md:p-3 rounded-xl border transition-all duration-200 cursor-pointer flex items-start gap-3 ${
            isActive
              ? 'bg-[var(--brand-glow)] border-[var(--border-glow)] shadow-sm'
              : 'bg-[var(--bg-tertiary)] border-[var(--border-primary)] hover:border-[var(--border-glow)]'
          }`}
        >
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center border shrink-0 transition-colors ${
            isActive ? 'bg-[var(--brand-glow)] text-[var(--text-accent)] border-[var(--border-glow)]' : 'bg-[var(--bg-secondary)] text-[var(--text-tertiary)] border-[var(--border-primary)]'
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
