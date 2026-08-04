import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ProjectData } from '../data/projectsData';

interface ArchitectureSidebarProps {
  selectedProject: ProjectData;
  activeStepIndex: number;
}

export const ArchitectureSidebar: React.FC<ArchitectureSidebarProps> = ({
  selectedProject,
  activeStepIndex,
}) => {
  const steps = selectedProject.architecture;

  return (
    <div className="w-full flex flex-col gap-4 p-5 glass-panel rounded-2xl border border-[var(--border-primary)] shadow-2xl relative overflow-hidden">
      {/* Glow Backdrop */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col gap-1 border-b border-[var(--border-primary)] pb-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-400/80 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Live Pipeline
          </span>
          <span className="font-mono text-[10px] text-neutral-500">
            {activeStepIndex + 1}/{steps.length}
          </span>
        </div>
        <h3 className="font-display text-sm font-semibold text-text-primary tracking-tight truncate">
          {selectedProject.title}
        </h3>
      </div>

      {/* Dynamic Animated Node Chain */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedProject.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
          className="flex flex-col relative py-1"
        >
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isCompleted = activeStepIndex >= idx;
            const isActive = activeStepIndex === idx;

            return (
              <div
                key={step.id}
                className="flex items-start gap-3.5 relative min-h-[48px] py-1 transition-all duration-300"
              >
                {/* Connector Line to Next Node */}
                {idx < steps.length - 1 && (
                  <div className="absolute left-[15px] top-[30px] w-[2px] h-[calc(100%-12px)] bg-neutral-850">
                    <motion.div
                      className="absolute top-0 left-0 right-0 bg-cyan-400 shadow-[0_0_8px_#06b6d4]"
                      initial={{ height: 0 }}
                      animate={{ height: activeStepIndex > idx ? '100%' : '0%' }}
                      transition={{ duration: 0.35, ease: 'easeInOut' as const }}
                    />
                    {/* Traveling Light Dot */}
                    {activeStepIndex === idx + 1 && (
                      <motion.div
                        className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#fff]"
                        animate={{ top: ['0%', '100%'] }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' as const }}
                      />
                    )}
                  </div>
                )}

                {/* Node Circle */}
                <div className="relative z-10 flex items-center justify-center w-8 h-8 shrink-0">
                  <motion.div
                    animate={{
                      borderColor: isActive
                        ? 'rgba(34, 211, 238, 1)'
                        : isCompleted
                          ? 'rgba(34, 211, 238, 0.45)'
                          : 'rgba(255, 255, 255, 0.08)',
                      scale: isActive ? 1.08 : 1,
                    }}
                    className={`w-8 h-8 rounded-lg border bg-neutral-950 flex items-center justify-center relative transition-all duration-300 ${
                      isActive
                        ? 'shadow-[0_0_14px_rgba(34,211,238,0.3)] bg-neutral-900'
                        : isCompleted
                          ? 'bg-neutral-950'
                          : 'bg-neutral-950/60'
                    }`}
                  >
                    {/* Active Pulsing Ring */}
                    {isActive && (
                      <motion.div
                        className="absolute -inset-1 rounded-xl border border-cyan-400/40"
                        animate={{ scale: [0.95, 1.15, 0.95], opacity: [0.3, 0.8, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' as const }}
                      />
                    )}

                    <Icon
                      className={`w-3.5 h-3.5 transition-colors duration-300 ${
                        isActive
                          ? 'text-cyan-300'
                          : isCompleted
                            ? 'text-cyan-400/80'
                            : 'text-neutral-600'
                      }`}
                    />
                  </motion.div>
                </div>

                {/* Step Metadata */}
                <motion.div
                  animate={{
                    opacity: isCompleted ? 1 : 0.4,
                    x: isActive ? 3 : 0,
                  }}
                  className="flex flex-col min-w-0 pt-0.5"
                >
                  <span
                    className={`text-xs font-mono tracking-tight truncate transition-colors duration-300 ${
                      isActive
                        ? 'text-cyan-300 font-semibold'
                        : isCompleted
                          ? 'text-neutral-200 font-medium'
                          : 'text-neutral-500'
                    }`}
                  >
                    {step.title}
                  </span>
                  <span className="text-[10px] text-neutral-500 font-sans leading-tight line-clamp-1">
                    {step.description}
                  </span>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Footer Info */}
      <div className="pt-2 border-t border-[var(--border-primary)] flex items-center justify-between text-[10px] font-mono text-neutral-500">
        <span>MODE // AGENTIC</span>
        <span className="text-cyan-400/80 uppercase">{selectedProject.id}</span>
      </div>
    </div>
  );
};
