import React, { useState, useRef, useCallback, memo } from 'react';
import { m, useInView, AnimatePresence } from 'framer-motion';
import { BookOpen, Search } from 'lucide-react';
import { KNOWLEDGE_TREE_DATA, type TechnologyNode } from '../../data/knowledgeData';
import { KnowledgeTree } from './components/KnowledgeTree';
import { InspectorPanel } from './components/InspectorPanel';
import { ViewToggle, type SkillsViewMode } from './components/ViewToggle';
import { SimpleSkills } from './components/SimpleSkills';

export const Skills: React.FC = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });

  const [viewMode, setViewMode] = useState<SkillsViewMode>('interactive');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const defaultTech = KNOWLEDGE_TREE_DATA[0].items[0];
  const [selectedTech, setSelectedTech] = useState<TechnologyNode | null>(defaultTech);

  const handleSelectTechById = useCallback((id: string) => {
    const found = KNOWLEDGE_TREE_DATA.flatMap((f) => f.items).find((n) => n.id === id);
    if (found) {
      setSelectedTech(found);
    }
  }, []);

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative w-full border-t border-[var(--border-primary)] overflow-hidden"
      aria-label="Engineering Skills Section"
    >
      <div className="section-layout space-y-6">
        
        {/* COMPRESSED HEADER */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4 border-b border-[var(--border-primary)] pb-4"
        >
          {/* TITLE & LABEL WITH NODES/CATEGORIES BADGE */}
          <div className="space-y-1">
            <span className="section-label inline-flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" /> Technical Expertise
            </span>
            <div className="flex flex-wrap items-baseline gap-3">
              <h2 className="section-title">Tech Stack</h2>
              <span className="text-xs font-mono text-[var(--text-tertiary)] bg-[var(--bg-tertiary)] px-2.5 py-0.5 rounded-full border border-[var(--border-primary)] font-medium">
                34 Nodes • 7 Categories
              </span>
            </div>
          </div>

          {/* CONTROLS BAR: SEARCH IN MIDDLE | VIEW TOGGLE ON RIGHT */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* SEARCH INPUT IN MIDDLE */}
            <div className="w-full sm:max-w-md">
              <div className="relative w-full">
                <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search technologies, RAG, CrewAI..."
                  className="w-full bg-[var(--bg-secondary)] border border-[var(--border-primary)] focus:border-[var(--border-glow)] rounded-xl py-2 pl-10 pr-4 text-xs font-mono text-[var(--text-primary)] placeholder-[var(--text-tertiary)] outline-none transition-all shadow-sm"
                />
              </div>
            </div>

            {/* VIEW TOGGLE ON RIGHT */}
            <div className="flex items-center justify-end shrink-0">
              <ViewToggle
                viewMode={viewMode}
                onViewModeChange={setViewMode}
              />
            </div>
          </div>
        </m.div>

        <AnimatePresence mode="wait">
          {viewMode === 'interactive' ? (
            <m.div
              key="interactive-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
            >
              {/* STICKY EXPLORER PANEL (34% / 4 Cols) */}
              <div className="lg:col-span-4 w-full sticky top-24 z-10 self-start">
                <KnowledgeTree
                  selectedTechId={selectedTech?.id || null}
                  onSelectTech={setSelectedTech}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                />
              </div>

              {/* DETAILS PANEL (66% / 8 Cols) */}
              <div className="lg:col-span-8 w-full">
                <InspectorPanel
                  tech={selectedTech}
                  onSelectTechById={handleSelectTechById}
                />
              </div>
            </m.div>
          ) : (
            <m.div
              key="simple-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <SimpleSkills searchQuery={searchQuery} />
            </m.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
});

Skills.displayName = 'Skills';
