import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { FolderTree, LayoutGrid } from 'lucide-react';

export type SkillsViewMode = 'interactive' | 'simple';

interface ViewToggleProps {
  viewMode: SkillsViewMode;
  onViewModeChange: (mode: SkillsViewMode) => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = memo(({
  viewMode,
  onViewModeChange
}) => {
  return (
    <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[var(--bg-glass)] border-2 border-[var(--border-gold)] shadow-xl glass-panel relative z-10">
      <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-tertiary)] px-2.5 font-semibold hidden sm:inline-block">
        View:
      </span>

      {/* Interactive Mode Button */}
      <button
        onClick={() => onViewModeChange('interactive')}
        aria-pressed={viewMode === 'interactive'}
        className={`relative px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-colors duration-200 flex items-center gap-2 cursor-pointer z-10 ${
          viewMode === 'interactive'
            ? 'text-[var(--text-accent)]'
            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
        }`}
      >
        <FolderTree className="w-3.5 h-3.5" />
        <span>Interactive Explorer</span>
        {viewMode === 'interactive' && (
          <motion.div
            layoutId="skillsViewPill"
            className="absolute inset-0 bg-[var(--brand-glow)] border border-[var(--border-glow)] rounded-xl -z-10 shadow-sm"
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        )}
      </button>

      {/* Simple View Mode Button */}
      <button
        onClick={() => onViewModeChange('simple')}
        aria-pressed={viewMode === 'simple'}
        className={`relative px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-colors duration-200 flex items-center gap-2 cursor-pointer z-10 ${
          viewMode === 'simple'
            ? 'text-[var(--text-accent)]'
            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
        }`}
      >
        <LayoutGrid className="w-3.5 h-3.5" />
        <span>Quick Skills View</span>
        {viewMode === 'simple' && (
          <motion.div
            layoutId="skillsViewPill"
            className="absolute inset-0 bg-[var(--brand-glow)] border border-[var(--border-glow)] rounded-xl -z-10 shadow-sm"
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        )}
      </button>
    </div>
  );
});

ViewToggle.displayName = 'ViewToggle';
