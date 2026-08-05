import React, { memo, useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { FolderTree, LayoutGrid, Sparkles } from 'lucide-react';

export type SkillsViewMode = 'interactive' | 'simple';

interface ViewToggleProps {
  viewMode: SkillsViewMode;
  onViewModeChange: (mode: SkillsViewMode) => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = memo(({
  viewMode,
  onViewModeChange
}) => {
  const [hoveredButton, setHoveredButton] = useState<SkillsViewMode | null>(null);

  return (
    <div className="flex items-center gap-2.5 relative">
      {/* "TRY THIS!" CALLOUT BADGE */}
      <m.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 font-mono text-[10px] font-bold tracking-wide shadow-sm shrink-0 animate-pulse"
      >
        <Sparkles className="w-3 h-3 text-amber-400" />
        <span>Try this!</span>
      </m.div>

      {/* ICON-ONLY TOGGLE CONTAINER */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[var(--bg-glass)] border border-[var(--border-primary)] shadow-md glass-panel relative">
        
        {/* INTERACTIVE EXPLORER BUTTON (ICON ONLY WITH HOVER TOOLTIP) */}
        <div className="relative group">
          <button
            onClick={() => onViewModeChange('interactive')}
            onMouseEnter={() => setHoveredButton('interactive')}
            onMouseLeave={() => setHoveredButton(null)}
            aria-label="Interactive Explorer View"
            aria-pressed={viewMode === 'interactive'}
            className={`relative p-2 rounded-lg text-xs font-mono font-semibold transition-colors duration-200 flex items-center justify-center cursor-pointer z-10 ${
              viewMode === 'interactive'
                ? 'text-[var(--text-accent)]'
                : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <FolderTree className="w-4 h-4" />
            {viewMode === 'interactive' && (
              <m.div
                layoutId="skillsViewPill"
                className="absolute inset-0 bg-[var(--brand-glow)] border border-[var(--border-glow)] rounded-lg -z-10 shadow-xs"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </button>

          {/* HOVER TOOLTIP */}
          <AnimatePresence>
            {hoveredButton === 'interactive' && (
              <m.div
                initial={{ opacity: 0, y: 4, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded-md bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[10px] font-mono text-[var(--text-primary)] whitespace-nowrap shadow-lg pointer-events-none z-30"
              >
                Interactive Explorer
              </m.div>
            )}
          </AnimatePresence>
        </div>

        {/* QUICK GRID VIEW BUTTON (ICON ONLY WITH HOVER TOOLTIP) */}
        <div className="relative group">
          <button
            onClick={() => onViewModeChange('simple')}
            onMouseEnter={() => setHoveredButton('simple')}
            onMouseLeave={() => setHoveredButton(null)}
            aria-label="Quick Grid View"
            aria-pressed={viewMode === 'simple'}
            className={`relative p-2 rounded-lg text-xs font-mono font-semibold transition-colors duration-200 flex items-center justify-center cursor-pointer z-10 ${
              viewMode === 'simple'
                ? 'text-[var(--text-accent)]'
                : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            {viewMode === 'simple' && (
              <m.div
                layoutId="skillsViewPill"
                className="absolute inset-0 bg-[var(--brand-glow)] border border-[var(--border-glow)] rounded-lg -z-10 shadow-xs"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </button>

          {/* HOVER TOOLTIP */}
          <AnimatePresence>
            {hoveredButton === 'simple' && (
              <m.div
                initial={{ opacity: 0, y: 4, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded-md bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[10px] font-mono text-[var(--text-primary)] whitespace-nowrap shadow-lg pointer-events-none z-30"
              >
                Quick Grid View
              </m.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
});

ViewToggle.displayName = 'ViewToggle';
