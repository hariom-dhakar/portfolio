import React, { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';

const STEPS = [
  { text: 'H', sub: 'Booting Core Kernel...' },
  { text: 'HAR', sub: 'Initializing AI Engineering System...' },
  { text: 'HARIOM', sub: 'Loading Multi-Agent Frameworks...' },
  { text: 'HARIOM DHAKAR', sub: 'Architecting High-Performance Intelligence' },
  { text: 'HARIOM DHAKAR', sub: 'Configuring LLM Observability & Guardrails...' },
  { text: 'HARIOM DHAKAR', sub: 'Syncing Vector Databases & RAG Pipelines...' },
  { text: 'HARIOM DHAKAR', sub: 'Loading Production Artifacts...' },
  { text: 'HARIOM DHAKAR', sub: 'Optimizing Neural Shaders...' },
  { text: 'HARIOM DHAKAR', sub: 'System Ready // Enter the Matrix' },
];

interface LoadingIntroProps {
  onComplete: () => void;
}

export const LoadingIntro: React.FC<LoadingIntroProps> = ({ onComplete }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (stepIndex < STEPS.length - 1) {
      const timer = setTimeout(() => {
        setStepIndex((prev) => prev + 1);
      }, 350);
      return () => clearTimeout(timer);
    } else {
      const exitTimer = setTimeout(() => {
        setIsFadingOut(true);
        setTimeout(() => {
          onComplete();
        }, 500);
      }, 500);
      return () => clearTimeout(exitTimer);
    }
  }, [stepIndex, onComplete]);

  const currentStep = STEPS[stepIndex];
  const progressPercent = Math.round(((stepIndex + 1) / STEPS.length) * 100);

 return (
  <AnimatePresence>
    {!isFadingOut && (
      <m.div
        key="loading-intro-overlay"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden select-none"
        style={{
          background: "var(--bg-primary)",
          color: "var(--text-primary)",
        }}
      >
        {/* Ambient Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, var(--text-accent-glow) 0%, transparent 75%)",
            opacity: 0.08,
          }}
        />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(var(--border-primary) 1px, transparent 1px),
              linear-gradient(90deg, var(--border-primary) 1px, transparent 1px)
            `,
            backgroundSize: "42px 42px",
          }}
        />

        <div className="relative z-10 flex flex-col items-center gap-5 text-center px-8">

          {/* Name */}
          <div className="min-h-[88px] flex items-center">
            <h1
              className="font-display font-black uppercase tracking-[0.18em]
              text-4xl md:text-6xl whitespace-nowrap"
              style={{
                color: "var(--text-primary)",
                textShadow: "0 0 18px var(--text-accent-glow)",
              }}
            >
              {currentStep.text}

              <span
                className="inline-block w-[3px] h-[0.9em] ml-2 animate-pulse rounded-full"
                style={{
                  background: "var(--text-accent)",
                  boxShadow: "0 0 10px var(--text-accent-glow)",
                }}
              />
            </h1>
          </div>

          {/* Subtitle */}
          <AnimatePresence mode="wait">
            <m.p
              key={currentStep.sub}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="font-mono uppercase tracking-[0.25em] text-xs md:text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              {currentStep.sub}
            </m.p>
          </AnimatePresence>

          {/* Progress */}
          <div
            className="mt-3 w-72 rounded-full overflow-hidden"
            style={{
              height: 5,
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-primary)",
            }}
          >
            <m.div
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.4 }}
              style={{
                height: "100%",
                background:
                  "linear-gradient(90deg,var(--text-accent),#22d3ee,#67e8f9)",
                boxShadow: "0 0 12px var(--text-accent-glow)",
              }}
            />
          </div>

          <span
            className="font-mono tracking-[0.3em] uppercase text-[10px]"
            style={{ color: "var(--text-tertiary)" }}
          >
            {progressPercent}% SYSTEM BOOT
          </span>
        </div>

        {/* Status */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em]"
          style={{ color: "var(--text-secondary)" }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{
              background: "var(--text-accent)",
              boxShadow: "0 0 10px var(--text-accent-glow)",
            }}
          />

          Workspace • Hariom Dhakar • AI Systems Ready
        </div>
      </m.div>
    )}
  </AnimatePresence>
);
};
