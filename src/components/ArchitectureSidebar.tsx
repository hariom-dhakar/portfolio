import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Activity, GitBranch } from 'lucide-react';
import { type ProjectData } from '../data/projectsData';

interface ArchitectureSidebarProps {
  selectedProject: ProjectData;
  activeStepIndex: number;
  onStepSelect?: (index: number) => void;
}

export const ArchitectureSidebar = memo(({ selectedProject, activeStepIndex, onStepSelect }: ArchitectureSidebarProps) => {
  const currentStep = selectedProject.architecture[activeStepIndex] || selectedProject.architecture[0];
  const StepIcon = currentStep.icon;

  return (
    <div className="glass-card p-5 rounded-2xl border border-[var(--border-primary)] space-y-5 relative overflow-hidden font-sans">
      
      {/* Sidebar Header */}
      <div className="border-b border-[var(--border-primary)] pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[var(--text-accent)]" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
            Execution Pipeline
          </span>
        </div>
        <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[var(--bg-tertiary)] border border-[var(--border-primary)] font-mono text-[10px] text-[var(--text-accent)]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          LIVE
        </span>
      </div>

      {/* Selected Active Architecture Component Highlight Box */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="p-4 rounded-xl bg-[var(--brand-glow)] border border-[var(--border-glow)] space-y-2.5"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-[var(--text-accent)] uppercase tracking-wider font-semibold">
              ACTIVE NODE // STEP 0{activeStepIndex + 1}
            </span>
            <div className="p-1.5 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-accent)] border border-[var(--border-glow)]">
              <StepIcon className="w-4 h-4" />
            </div>
          </div>
          
          <h4 className="font-display font-bold text-base text-[var(--text-primary)] leading-tight">
            {currentStep.title}
          </h4>

          <p className="text-xs text-[var(--text-secondary)] font-light leading-relaxed">
            {currentStep.description}
          </p>

          <div className="pt-2 border-t border-[var(--border-primary)]/40 flex items-center justify-between text-[10px] font-mono text-[var(--text-tertiary)]">
            <span className="flex items-center gap-1">
              <Activity className="w-3 h-3 text-[var(--text-accent)]" /> Latency: &lt;10ms
            </span>
            <span>Status: 200 OK</span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Pipeline Node Step List */}
      <div className="space-y-1.5">
        <span className="font-mono text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider block mb-1">
          Pipeline Sequence
        </span>
        {selectedProject.architecture.map((step, idx) => {
          const isActive = idx === activeStepIndex;
          const Icon = step.icon;
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onStepSelect?.(idx)}
              className={`p-2.5 rounded-xl border flex items-center gap-3 transition-all duration-200 w-full text-left cursor-pointer ${
                isActive
                  ? 'bg-[var(--bg-secondary)] border-[var(--border-glow)] text-[var(--text-primary)] shadow-sm'
                  : 'bg-[var(--bg-secondary)]/40 border-[var(--border-primary)] text-[var(--text-tertiary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <div className={`w-6 h-6 rounded-md flex items-center justify-center border text-xs font-mono shrink-0 ${
                isActive ? 'bg-[var(--brand-glow)] border-[var(--border-glow)] text-[var(--text-accent)] font-bold' : 'bg-[var(--bg-tertiary)] border-[var(--border-primary)]'
              }`}>
                {idx + 1}
              </div>
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[var(--text-accent)]' : 'opacity-60'}`} />
                <span className={`text-xs truncate font-mono ${isActive ? 'font-semibold text-[var(--text-primary)]' : ''}`}>
                  {step.title}
                </span>
              </div>
              {isActive && (
                <GitBranch className="w-3.5 h-3.5 text-[var(--text-accent)] shrink-0 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

    </div>
  );
});

ArchitectureSidebar.displayName = 'ArchitectureSidebar';
