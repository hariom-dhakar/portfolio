import React, { useState, useEffect, useRef, useMemo, useCallback, memo } from 'react';
import { createPortal } from 'react-dom';
import { m, useReducedMotion } from 'framer-motion';
import { CheckCircle2, Clock, Cpu, Hash, RotateCcw, Activity } from 'lucide-react';
import type { ArchitectureStep } from '../data/projectsData';

interface AnimatedPipelineFlowProps {
  architecture: ArchitectureStep[];
  projectId: string;
  activeStepIndex: number;
  onStepSelect?: (index: number) => void;
}

interface TelemetryData {
  executionTime: string;
  status: string;
  model: string;
  promptTokens: number;
  outputTokens: number;
  retries: number;
}

const getTelemetryForStep = (index: number, projectId: string): TelemetryData => {
  if (projectId === 'medinsight') {
    const steps = [
      { model: 'text-embedding-004', executionTime: '0.15s', promptTokens: 120, outputTokens: 0, retries: 0 },
      { model: 'Gemini-1.5-Flash', executionTime: '1.40s', promptTokens: 1500, outputTokens: 800, retries: 0 },
      { model: 'Groq-Llama-3-70B', executionTime: '0.85s', promptTokens: 1100, outputTokens: 450, retries: 0 },
      { model: 'Groq-Llama-3-70B', executionTime: '1.60s', promptTokens: 2200, outputTokens: 900, retries: 0 },
      { model: 'Groq-Llama-3-70B', executionTime: '0.50s', promptTokens: 600, outputTokens: 150, retries: 0 },
    ];
    return {
      status: '200 OK',
      ...(steps[index] || { model: 'Gemini-1.5-Flash', executionTime: '1.0s', promptTokens: 1000, outputTokens: 500, retries: 0 })
    };
  }

  if (projectId === 'proposal') {
    const steps = [
      { model: 'Groq-Llama-3.3', executionTime: '1.80s', promptTokens: 1200, outputTokens: 800, retries: 0 },
      { model: 'gemini-embedding-001', executionTime: '1.20s', promptTokens: 1000, outputTokens: 0, retries: 0 },
      { model: 'Groq-Llama-3.3', executionTime: '8.40s', promptTokens: 4500, outputTokens: 2500, retries: 0 },
      { model: 'Groq-Llama-3.3', executionTime: '3.20s', promptTokens: 1800, outputTokens: 700, retries: 1 },
      { model: 'System Node', executionTime: '0.05s', promptTokens: 0, outputTokens: 0, retries: 0 },
      { model: 'ReportLab Engine', executionTime: '3.50s', promptTokens: 0, outputTokens: 0, retries: 0 },
      { model: 'MongoDB', executionTime: '0.30s', promptTokens: 0, outputTokens: 0, retries: 0 },
    ];
    return {
      status: '200 OK',
      ...(steps[index] || { model: 'Groq-Llama-3.3', executionTime: '1.0s', promptTokens: 1000, outputTokens: 500, retries: 0 })
    };
  }

  if (projectId === 'eda') {
    const steps = [
      { model: 'Pandas Profiler', executionTime: '0.20s', promptTokens: 0, outputTokens: 0, retries: 0 },
      { model: 'Pandas / NumPy', executionTime: '0.80s', promptTokens: 0, outputTokens: 0, retries: 0 },
      { model: 'Pandas / SciPy', executionTime: '1.10s', promptTokens: 0, outputTokens: 0, retries: 0 },
      { model: 'CrewAI (Llama-3)', executionTime: '1.50s', promptTokens: 1200, outputTokens: 400, retries: 0 },
      { model: 'Sandboxed Python', executionTime: '2.30s', promptTokens: 0, outputTokens: 0, retries: 0 },
      { model: 'Matplotlib', executionTime: '1.80s', promptTokens: 0, outputTokens: 0, retries: 0 },
      { model: 'CrewAI (Llama-3)', executionTime: '3.20s', promptTokens: 2500, outputTokens: 1200, retries: 0 },
    ];
    return {
      status: '200 OK',
      ...(steps[index] || { model: 'CrewAI (Llama-3)', executionTime: '1.0s', promptTokens: 1000, outputTokens: 500, retries: 0 })
    };
  }

  if (projectId === 'observability') {
    const steps = [
      { model: 'FastAPI Gateway', executionTime: '0.05s', promptTokens: 0, outputTokens: 0, retries: 0 },
      { model: 'Guardrails / PII', executionTime: '0.15s', promptTokens: 0, outputTokens: 0, retries: 0 },
      { model: 'Groq-Llama-3-70B', executionTime: '0.25s', promptTokens: 400, outputTokens: 100, retries: 0 },
      { model: 'Inference Router', executionTime: '1.20s', promptTokens: 850, outputTokens: 450, retries: 0 },
      { model: 'Langfuse / OTel', executionTime: '0.08s', promptTokens: 0, outputTokens: 0, retries: 0 },
      { model: 'RAGAS / LLM-Judge', executionTime: '1.80s', promptTokens: 1800, outputTokens: 800, retries: 0 },
      { model: 'FastAPI Gateway', executionTime: '0.02s', promptTokens: 0, outputTokens: 0, retries: 0 },
    ];
    return {
      status: '200 OK',
      ...(steps[index] || { model: 'Inference Router', executionTime: '1.0s', promptTokens: 1000, outputTokens: 500, retries: 0 })
    };
  }

  // Fallback
  return {
    executionTime: '1.0s',
    status: '200 OK',
    model: 'Groq-Llama-3.3',
    promptTokens: 1000,
    outputTokens: 500,
    retries: 0,
  };
};

export const AnimatedPipelineFlow: React.FC<AnimatedPipelineFlowProps> = memo(({
  architecture,
  projectId,
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

  const telemetryDataMap = useMemo(() => {
    return architecture.map((_, idx) => getTelemetryForStep(idx, projectId));
  }, [architecture, projectId]);

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
            AI Execution Trace Pipeline
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-[var(--bg-tertiary)] border border-[var(--border-primary)] text-[10px] text-[var(--text-tertiary)]">
            OpenTelemetry / LangSmith Trace
          </span>
        </div>

        <div className="flex items-center gap-3 text-[10px] text-[var(--text-tertiary)]">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 -ml-2.5" />
            <span className="text-[var(--text-secondary)] font-semibold">Active Trace</span>
          </span>
          <span className="hidden md:inline text-[var(--text-tertiary)]">Loop: 9.0s</span>
        </div>
      </div>

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

      <div className="flex sm:hidden flex-col gap-2.5 py-1">
        {architecture.map((step, index) => {
          const Icon = step.icon;
          const isCurrentActive = activeNodeIndex === index;
          const isCompleted = activeNodeIndex > index;
          const telemetry = telemetryDataMap[index];

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
                  <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
                    {telemetry.model} • {telemetry.executionTime}
                  </span>
                </div>
              </div>

              {isCurrentActive && (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[var(--text-accent)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-accent)] animate-ping" />
                  Executing
                </span>
              )}
            </div>
          );
        })}
      </div>

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
          className="w-56 p-3 rounded-xl bg-[var(--bg-primary)]/95 backdrop-blur-xl border border-[var(--border-glow)] shadow-2xl pointer-events-none space-y-2 font-mono text-left"
        >
          <div className="flex items-center justify-between border-b border-[var(--border-primary)] pb-1.5">
            <span className="text-xs font-bold text-[var(--text-primary)] truncate">
              {architecture[hoveredNodeIndex]?.title}
            </span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
              {telemetryDataMap[hoveredNodeIndex]?.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-1.5 text-[10px]">
            <div className="flex items-center gap-1 text-[var(--text-secondary)]">
              <Clock className="w-3 h-3 text-[var(--text-accent)] shrink-0" />
              <span>{telemetryDataMap[hoveredNodeIndex]?.executionTime}</span>
            </div>
            <div className="flex items-center gap-1 text-[var(--text-secondary)]">
              <Cpu className="w-3 h-3 text-[var(--text-gold)] shrink-0" />
              <span className="truncate">{telemetryDataMap[hoveredNodeIndex]?.model}</span>
            </div>
            <div className="flex items-center gap-1 text-[var(--text-tertiary)]">
              <Hash className="w-3 h-3 shrink-0" />
              <span>{telemetryDataMap[hoveredNodeIndex]?.promptTokens} in</span>
            </div>
            <div className="flex items-center gap-1 text-[var(--text-tertiary)]">
              <Hash className="w-3 h-3 shrink-0" />
              <span>{telemetryDataMap[hoveredNodeIndex]?.outputTokens} out</span>
            </div>
          </div>

          {telemetryDataMap[hoveredNodeIndex]?.retries > 0 && (
            <div className="pt-1 border-t border-[var(--border-primary)]/40 text-[9px] text-amber-400 flex items-center gap-1">
              <RotateCcw className="w-2.5 h-2.5" /> Retries: {telemetryDataMap[hoveredNodeIndex]?.retries}
            </div>
          )}
        </m.div>,
        document.body
      )}
    </div>
  );
});

AnimatedPipelineFlow.displayName = 'AnimatedPipelineFlow';
