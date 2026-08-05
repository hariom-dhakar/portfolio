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
      <div className="section-layout space-y-8">
        
        <m.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--border-primary)] pb-6"
        >
          <div className="space-y-2">
            <span className="section-label inline-flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" /> Technical Expertise
            </span>
            <h2 className="section-title">Tech Stack </h2>
            <p className="section-description">
              Production technologies, multi-agent frameworks, and architectural capabilities.
            </p>
          </div>

          <ViewToggle
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        </m.div>

        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search technologies, frameworks, RAG..."
            className="w-full bg-[var(--bg-secondary)] border border-[var(--border-primary)] focus:border-[var(--border-glow)] rounded-xl py-2.5 pl-10 pr-4 text-xs md:text-sm font-mono text-[var(--text-primary)] placeholder-[var(--text-tertiary)] outline-none transition-all shadow-sm"
          />
        </div>

        <AnimatePresence mode="wait">
          {viewMode === 'interactive' ? (
            <m.div
              key="interactive-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
            >
              <div className="lg:col-span-5 w-full">
                <KnowledgeTree
                  selectedTechId={selectedTech?.id || null}
                  onSelectTech={setSelectedTech}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                />
              </div>

              <div className="lg:col-span-7 w-full">
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
              transition={{ duration: 0.3 }}
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
