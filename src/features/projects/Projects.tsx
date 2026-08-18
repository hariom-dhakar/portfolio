import { useRef, useState, useCallback, memo } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  ChevronUp, 
  Lightbulb, 
  ShieldCheck, 
  ExternalLink, 
  AlertTriangle, 
  CheckCircle2, 
  Cpu, 
  Activity,
  Code2,
  Layers
} from 'lucide-react';
import { PROJECTS_DATA, type ProjectData, type ArchitectureStep } from '../../data/projectsData';
import { AnimatedPipelineFlow } from '../../components/AnimatedPipelineFlow';

export const Projects = memo(() => {
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);

  const handleToggleExpand = useCallback((projectId: string) => {
    setExpandedProjectId((prev) => (prev === projectId ? null : projectId));
  }, []);

  const projectPairs: [ProjectData, ProjectData | undefined][] = [];
  for (let i = 0; i < PROJECTS_DATA.length; i += 2) {
    projectPairs.push([PROJECTS_DATA[i], PROJECTS_DATA[i + 1]]);
  }

  return (
    <section id="projects" className="w-full overflow-hidden border-t border-[var(--border-primary)]">
      <div className="section-layout">
        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col mb-8"
        >
          <span className="section-label">Showcase // 03</span>
          <h2 className="section-title">Featured Engineering Projects</h2>
          <p className="section-description">
            Production-grade systems featuring multi-agent orchestration, structured RAG architectures, and deterministic evaluation.
          </p>
        </m.div>

        {/* Paired 2-in-one-row Projects Rows */}
        <div className="flex flex-col gap-4 md:gap-5">
          {projectPairs.map((pair, rowIndex) => (
            <ProjectRow
              key={`row-${rowIndex}-${pair[0].id}`}
              pair={pair}
              rowIndex={rowIndex}
              expandedProjectId={expandedProjectId}
              onToggleExpand={handleToggleExpand}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

Projects.displayName = 'Projects';

interface ProjectRowProps {
  pair: [ProjectData, ProjectData | undefined];
  rowIndex: number;
  expandedProjectId: string | null;
  onToggleExpand: (id: string) => void;
}

const ProjectRow = memo(({ pair, rowIndex, expandedProjectId, onToggleExpand }: ProjectRowProps) => {
  const [p1, p2] = pair;
  const isP1Expanded = expandedProjectId === p1.id;
  const isP2Expanded = p2 ? expandedProjectId === p2.id : false;
  const hasExpanded = isP1Expanded || isP2Expanded;

  const activeProject = isP1Expanded ? p1 : isP2Expanded ? p2 : null;
  const siblingProject = isP1Expanded ? p2 : isP2Expanded ? p1 : null;
  const activeIndex = isP1Expanded ? rowIndex * 2 : rowIndex * 2 + 1;

  return (
    <div className="relative w-full">
      {hasExpanded && activeProject ? (
        <div className="relative w-full pb-4 pr-3 sm:pb-5 sm:pr-4">
          {/* Sibling Card Visually Stacked Behind */}
          {siblingProject && (
            <div 
              onClick={() => onToggleExpand(siblingProject.id)}
              className="absolute inset-0 translate-x-2.5 translate-y-2.5 sm:translate-x-3.5 sm:translate-y-3.5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-secondary)] z-10 p-4 flex flex-col justify-end items-end cursor-pointer group/stack hover:translate-x-3.5 hover:translate-y-3.5 sm:hover:translate-x-4 sm:hover:translate-y-4 transition-all duration-200 shadow-md"
              title={`Click to bring ${siblingProject.title} forward`}
              aria-label={`Project underneath: ${siblingProject.title}. Click to view.`}
            >
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[var(--bg-tertiary)] border border-[var(--border-primary)] font-mono text-xs text-[var(--text-secondary)] group-hover/stack:text-[var(--text-primary)] group-hover/stack:border-[var(--border-glow)] transition-colors shadow-xs">
                <Layers className="w-3.5 h-3.5 text-[var(--text-accent)]" aria-hidden="true" />
                <span>Underneath: <strong className="text-[var(--text-primary)] font-medium">{siblingProject.title}</strong></span>
                <span className="text-[var(--text-accent)] font-medium">↗ Click to bring forward</span>
              </div>
            </div>
          )}

          {/* Active Front Card */}
          <div className="relative z-20 w-full">
            <ProjectCard
              project={activeProject}
              index={activeIndex}
              isExpanded={true}
              onToggleExpand={() => onToggleExpand(activeProject.id)}
              siblingProject={siblingProject}
              onSwitchToSibling={siblingProject ? () => onToggleExpand(siblingProject.id) : undefined}
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 items-start">
          <ProjectCard
            project={p1}
            index={rowIndex * 2}
            isExpanded={false}
            onToggleExpand={() => onToggleExpand(p1.id)}
          />
          {p2 && (
            <ProjectCard
              project={p2}
              index={rowIndex * 2 + 1}
              isExpanded={false}
              onToggleExpand={() => onToggleExpand(p2.id)}
            />
          )}
        </div>
      )}
    </div>
  );
});

ProjectRow.displayName = 'ProjectRow';

const INLINE_TABS = [
  { id: 'problem', label: 'Problem' },
  { id: 'solution', label: 'Solution' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'execution', label: 'Execution' },
  { id: 'lessons', label: 'Lessons' },
] as const;

type InlineTabId = typeof INLINE_TABS[number]['id'];

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  isExpanded: boolean;
  onToggleExpand: () => void;
  siblingProject?: ProjectData;
  onSwitchToSibling?: () => void;
}

const ProjectCard = memo(({ 
  project, 
  index, 
  isExpanded, 
  onToggleExpand,
  siblingProject,
  onSwitchToSibling 
}: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<InlineTabId>('architecture');

  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const handleStepSelect = useCallback((idx: number) => {
    setActiveStepIndex(idx);
  }, []);

  return (
    <m.div 
      layout
      ref={cardRef}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ 
        layout: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
        opacity: { duration: 0.3 },
        y: { duration: 0.3 }
      }}
      className="card-primary p-5 sm:p-6 relative w-full overflow-hidden transition-all"
    >
      <div className="w-full flex flex-col gap-4">
        
        {/* CARD HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[var(--border-primary)] pb-4">
          <div className="space-y-1 max-w-2xl">
            <span className="font-mono text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider block">
              Project // 0{index + 1}
            </span>
            <h3 className="text-lg sm:text-xl font-display font-semibold tracking-tight text-[var(--text-primary)]">
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-normal leading-relaxed">
              {project.tagline}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {isExpanded && siblingProject && onSwitchToSibling && (
              <button
                onClick={onSwitchToSibling}
                className="btn-ghost shrink-0 text-xs py-1.5 px-3 focus-visible:outline-2 focus-visible:outline-cyan-400 cursor-pointer"
                title={`View ${siblingProject.title}`}
              >
                <span>View {siblingProject.title} ↔</span>
              </button>
            )}

            <a 
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost shrink-0 text-xs py-1.5 px-3.5 focus-visible:outline-2 focus-visible:outline-cyan-400"
              aria-label={`View ${project.title} GitHub Repository`}
            >
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>

            <button
              onClick={onToggleExpand}
              className="btn-primary text-xs py-1.5 px-3.5 focus-visible:outline-2 focus-visible:outline-cyan-400 cursor-pointer"
              aria-expanded={isExpanded}
              aria-label={isExpanded ? `Collapse ${project.title}` : `Expand ${project.title}`}
            >
              <span>{isExpanded ? 'Hide Details' : 'View Architecture'}</span>
              {isExpanded ? (
                <ChevronUp className="w-3 h-3" aria-hidden="true" />
              ) : (
                <ChevronDown className="w-3 h-3" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* TECH STACK & METRICS PREVIEW */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-mono text-[var(--text-tertiary)] mr-1">Stack:</span>
            {project.tech.map((t, i) => (
              <span 
                key={i}
                className="px-2 py-0.5 rounded-md bg-[var(--bg-tertiary)] border border-[var(--border-primary)] text-xs font-mono text-[var(--text-secondary)]"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {project.metrics.map((mItem, i) => (
              <div key={i} className="flex items-baseline gap-1.5 font-mono">
                <span className="text-sm md:text-base font-semibold text-[var(--text-primary)]">{mItem.value}</span>
                <span className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)]">{mItem.label}</span>
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
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden border-t border-[var(--border-primary)] pt-4 mt-2"
            >
              {/* STICKY IN-CARD NAVBAR */}
              <div className="sticky top-0 z-20 bg-[var(--bg-secondary)] border border-[var(--border-primary)] p-1.5 mb-5 rounded-lg flex items-center justify-between gap-2 shadow-xs">
                <nav className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar py-0.5 px-1" aria-label={`${project.title} Case Study Tabs`}>
                  {INLINE_TABS.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative py-1 px-2.5 text-xs rounded-md transition-colors duration-150 cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                          isActive
                            ? 'bg-[var(--bg-tertiary)] text-[var(--text-primary)] font-medium border border-[var(--border-primary)]'
                            : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'
                        }`}
                      >
                        {tab.label}
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

                  {/* TAB 4: EXECUTION (PRODUCTION EXECUTION GUARDRAILS) */}
                  {activeTab === 'execution' && (
                    <m.div
                      key="tab-execution"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="space-y-4"
                    >
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
