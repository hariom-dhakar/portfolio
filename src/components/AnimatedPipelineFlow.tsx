import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { createPortal } from 'react-dom';
import { m, useReducedMotion } from 'framer-motion';
import { CheckCircle2, Activity } from 'lucide-react';
import type { ArchitectureStep } from '../data/projectsData';

interface AnimatedPipelineFlowProps {
  architecture: ArchitectureStep[];
  projectId: string;
  activeStepIndex: number;
  onStepSelect?: (index: number) => void;
}

export const AnimatedPipelineFlow: React.FC<AnimatedPipelineFlowProps> = memo(({
  architecture,
  projectId: _projectId,
  onStepSelect,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pipelineScrollRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isUserInteractingRef = useRef<boolean>(false);
  const shouldReduceMotion = useReducedMotion();
  const startTimeRef = useRef<number>(performance.now());

  const [activeNodeIndex, setActiveNodeIndex] = useState<number>(0);
  const [hoveredNodeIndex, setHoveredNodeIndex] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ left: number; top: number } | null>(null);

  const nodeCount = architecture.length;

  useEffect(() => {
    if (shouldReduceMotion) return;

    const intervalTime = 9000 / nodeCount;
    const updateActiveNode = () => {
      const elapsed = performance.now() - startTimeRef.current;
      const currentStep = Math.floor((elapsed % 9000) / intervalTime) % nodeCount;
      setActiveNodeIndex(currentStep);
    };

    updateActiveNode();
    const timer = setInterval(updateActiveNode, 100);

    return () => clearInterval(timer);
  }, [nodeCount, shouldReduceMotion]);

  useEffect(() => {
    isUserInteractingRef.current = false;

    const container = pipelineScrollRef.current;
    const targetNode = nodeRefs.current[activeNodeIndex];

    if (!container || !targetNode) return;

    const containerRect = container.getBoundingClientRect();
    const nodeRect = targetNode.getBoundingClientRect();

    const isOutOfView =
      nodeRect.left < containerRect.left + 16 ||
      nodeRect.right > containerRect.right - 16;

    if (isOutOfView) {
      const targetScrollLeft =
        targetNode.offsetLeft - container.clientWidth / 2 + targetNode.clientWidth / 2;

      container.scrollTo({
        left: Math.max(0, targetScrollLeft),
        behavior: 'smooth',
      });
    }
  }, [activeNodeIndex]);

  const updateTooltipPos = useCallback(() => {
    if (hoveredNodeIndex === null) {
      setTooltipPos(null);
      return;
    }
    const targetNode = nodeRefs.current[hoveredNodeIndex];
    if (targetNode) {
      const rect = targetNode.getBoundingClientRect();
      setTooltipPos({
        left: rect.left + rect.width / 2,
        top: rect.top - 8,
      });
    }
  }, [hoveredNodeIndex]);

  useEffect(() => {
    if (hoveredNodeIndex !== null) {
      updateTooltipPos();
      const scrollContainer = pipelineScrollRef.current;

      window.addEventListener('scroll', updateTooltipPos, { passive: true });
      window.addEventListener('resize', updateTooltipPos, { passive: true });
      if (scrollContainer) {
        scrollContainer.addEventListener('scroll', updateTooltipPos, { passive: true });
      }

      return () => {
        window.removeEventListener('scroll', updateTooltipPos);
        window.removeEventListener('resize', updateTooltipPos);
        if (scrollContainer) {
          scrollContainer.removeEventListener('scroll', updateTooltipPos);
        }
      };
    } else {
      setTooltipPos(null);
    }
  }, [hoveredNodeIndex, updateTooltipPos]);

  useEffect(() => {
    const el = pipelineScrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      isUserInteractingRef.current = true;
      if (e.deltaX === 0 && e.deltaY !== 0) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    const onTouchStart = () => {
      isUserInteractingRef.current = true;
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('touchstart', onTouchStart, { passive: true });

    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('touchstart', onTouchStart);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full bg-[var(--bg-secondary)]/50 border border-[var(--border-primary)] rounded-2xl p-3 md:p-3.5 my-2.5 shadow-inner font-sans relative overflow-hidden"
    >
      <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[var(--border-primary)]/60 text-xs font-mono">
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-[var(--text-accent)] animate-pulse" />
          <span className="text-[var(--text-primary)] font-bold uppercase tracking-wider text-[11px]">
            Architecture Pipeline Flow
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-[var(--bg-tertiary)] border border-[var(--border-primary)] text-[10px] text-[var(--text-tertiary)]">
            Deterministic Graph
          </span>
        </div>

        <div className="flex items-center gap-3 text-[10px] text-[var(--text-tertiary)]">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 -ml-2.5" />
            <span className="text-[var(--text-secondary)] font-semibold">Active Node Flow</span>
          </span>
        </div>
      </div>

      {/* Desktop Pipeline Flow */}
      <div 
        ref={pipelineScrollRef}
        className="relative hidden sm:flex items-center gap-2 md:gap-3 w-full py-1 overflow-x-auto overflow-y-visible select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {architecture.map((step, index) => {
          const Icon = step.icon;
          const isCurrentActive = activeNodeIndex === index;
          const isCompleted = activeNodeIndex > index;

          return (
            <React.Fragment key={step.id}>
              <div 
                ref={(el) => { nodeRefs.current[index] = el; }}
                className="relative flex flex-col items-center group cursor-pointer z-10 shrink-0"
                onMouseEnter={() => setHoveredNodeIndex(index)}
                onMouseLeave={() => setHoveredNodeIndex(null)}
                onClick={() => onStepSelect?.(index)}
              >
                <div
                  className={`px-3 py-2 rounded-xl border flex items-center gap-2 transition-all duration-300 ${
                    isCurrentActive
                      ? 'bg-[var(--brand-glow)] border-[var(--border-glow)] shadow-[0_0_15px_var(--text-accent-glow)] text-[var(--text-primary)] font-semibold scale-105'
                      : isCompleted
                      ? 'bg-[var(--bg-tertiary)] border-[var(--border-primary)] text-[var(--text-primary)] shadow-sm'
                      : 'bg-[var(--bg-secondary)] border-[var(--border-primary)]/50 text-[var(--text-tertiary)] opacity-70 hover:opacity-100 hover:border-[var(--border-glow)]'
                  }`}
                >
                  <div className={`p-1 rounded-md ${
                    isCurrentActive
                      ? 'bg-[var(--brand-glow)] text-[var(--text-accent)] border border-[var(--border-glow)]'
                      : isCompleted
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'bg-[var(--bg-tertiary)] text-[var(--text-tertiary)]'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Icon className="w-3.5 h-3.5" />
                    )}
                  </div>

                  <span className="text-xs font-mono tracking-tight whitespace-nowrap">
                    {step.title}
                  </span>

                  {isCurrentActive && (
                    <span className="w-2 h-2 rounded-full bg-[var(--text-accent)] animate-pulse shrink-0" />
                  )}
                </div>
              </div>

              {index < nodeCount - 1 && (
                <div className="relative h-[2px] min-w-[32px] max-w-[64px] flex-1 shrink-0 bg-[var(--border-primary)] overflow-visible">
                  <div 
                    className={`absolute inset-0 transition-all duration-500 ${
                      isCompleted ? 'bg-[var(--text-accent)]/50 shadow-[0_0_6px_var(--text-accent-glow)]' : 'bg-transparent'
                    }`} 
                  />

                  {isCurrentActive && !shouldReduceMotion && (
                    <m.div
                      key={`packet-${index}`}
                      className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[var(--text-accent)] shadow-[0_0_10px_var(--text-accent-glow)] z-20"
                      initial={{ left: '0%' }}
                      animate={{ left: '100%' }}
                      transition={{
                        duration: 9000 / nodeCount / 1000,
                        ease: 'easeInOut',
                      }}
                    />
                  )}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Mobile Flow */}
      <div className="flex sm:hidden flex-col gap-2.5 py-1">
        {architecture.map((step, index) => {
          const Icon = step.icon;
          const isCurrentActive = activeNodeIndex === index;
          const isCompleted = activeNodeIndex > index;

          return (
            <div
              key={step.id}
              onClick={() => onStepSelect?.(index)}
              className={`p-2.5 rounded-xl border flex items-center justify-between transition-all duration-300 ${
                isCurrentActive
                  ? 'bg-[var(--brand-glow)] border-[var(--border-glow)] shadow-[0_0_12px_var(--text-accent-glow)]'
                  : isCompleted
                  ? 'bg-[var(--bg-tertiary)] border-[var(--border-primary)]'
                  : 'bg-[var(--bg-secondary)] border-[var(--border-primary)]/40 opacity-70'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className={`p-1.5 rounded-lg shrink-0 ${
                  isCurrentActive ? 'bg-[var(--brand-glow)] text-[var(--text-accent)]' : 'bg-[var(--bg-tertiary)] text-[var(--text-tertiary)]'
                }`}>
                  {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Icon className="w-3.5 h-3.5" />}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-mono font-semibold text-[var(--text-primary)] truncate">
                    {step.title}
                  </span>
                  <span className="text-[10px] text-[var(--text-secondary)] truncate">
                    {step.description}
                  </span>
                </div>
              </div>

              {isCurrentActive && (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[var(--text-accent)] shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-accent)] animate-ping" />
                  Active
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Desktop Hover Tooltip */}
      {hoveredNodeIndex !== null && tooltipPos && typeof document !== 'undefined' && createPortal(
        <m.div
          initial={{ opacity: 0, y: 6, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.95 }}
          transition={{ duration: 0.15 }}
          style={{
            position: 'fixed',
            left: `${tooltipPos.left}px`,
            top: `${tooltipPos.top}px`,
            transform: 'translate(-50%, -100%)',
            zIndex: 9999,
          }}
          className="w-64 p-3 rounded-xl bg-[var(--bg-primary)]/95 backdrop-blur-xl border border-[var(--border-glow)] shadow-2xl pointer-events-none space-y-1.5 text-left"
        >
          <div className="flex items-center justify-between border-b border-[var(--border-primary)] pb-1.5">
            <span className="text-xs font-bold font-display text-[var(--text-primary)] truncate">
              {architecture[hoveredNodeIndex]?.title}
            </span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono font-semibold">
              Step 0{hoveredNodeIndex + 1}
            </span>
          </div>

          <p className="text-[11px] text-[var(--text-secondary)] font-normal leading-relaxed">
            {architecture[hoveredNodeIndex]?.description}
          </p>
        </m.div>,
        document.body
      )}
    </div>
  );
});

AnimatedPipelineFlow.displayName = 'AnimatedPipelineFlow';
