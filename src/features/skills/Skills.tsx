import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { KNOWLEDGE_TREE_DATA, type TechnologyNode } from '../../data/knowledgeData';
import { KnowledgeTree } from './components/KnowledgeTree';
import { InspectorPanel } from './components/InspectorPanel';

export const Skills: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });

  const defaultTech = KNOWLEDGE_TREE_DATA[0].items[0]; // CrewAI
  const [selectedTech, setSelectedTech] = useState<TechnologyNode | null>(defaultTech);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSelectTechById = (id: string) => {
    const found = KNOWLEDGE_TREE_DATA.flatMap((f) => f.items).find((n) => n.id === id);
    if (found) {
      setSelectedTech(found);
    }
  };

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative w-full py-16 md:py-24 px-4 md:px-8 border-t border-[var(--border-primary)] overflow-hidden"
      aria-label="Obsidian Engineering Knowledge Base Section"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-2"
        >
          <span className="font-mono text-xs text-[var(--text-gold)] uppercase tracking-widest px-3 py-1 rounded-full border border-[var(--border-gold)] bg-[var(--bg-tertiary)] inline-flex items-center gap-1.5 font-semibold">
            <BookOpen className="w-3.5 h-3.5" /> Obsidian Engineering Knowledge Base
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-[var(--text-primary)]">
            Tech Stack & Knowledge Explorer
          </h2>
          <p className="text-text-secondary text-sm md:text-base font-light max-w-2xl">
            Explore my engineering knowledge tree, architectural usage, key concepts, and code implementations.
          </p>
        </motion.div>

        {/* 2-Column Desktop Explorer Layout (35% Tree / 65% Inspector) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Panel: Knowledge Tree (35% on Desktop -> lg:col-span-5) */}
          <div className="lg:col-span-5 w-full">
            <KnowledgeTree
              selectedTechId={selectedTech?.id || null}
              onSelectTech={setSelectedTech}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>

          {/* Right Panel: Knowledge Inspector (65% on Desktop -> lg:col-span-7) */}
          <div className="lg:col-span-7 w-full">
            <InspectorPanel
              tech={selectedTech}
              onSelectTechById={handleSelectTechById}
            />
          </div>

        </div>

      </div>
    </section>
  );
};
