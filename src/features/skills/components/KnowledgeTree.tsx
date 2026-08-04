import React, { useState } from 'react';
import { Search, X, FolderTree, ChevronsUpDown } from 'lucide-react';
import { KNOWLEDGE_TREE_DATA, type TechnologyNode } from '../../../data/knowledgeData';
import { CategoryNodeItem } from './TreeNode';

interface KnowledgeTreeProps {
  selectedTechId: string | null;
  onSelectTech: (tech: TechnologyNode) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const KnowledgeTree: React.FC<KnowledgeTreeProps> = ({
  selectedTechId,
  onSelectTech,
  searchQuery,
  onSearchChange
}) => {
  // Track expanded folder IDs (default: expand first 2 folders)
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(['ai-llm', 'languages'])
  );

  const toggleExpand = (folderId: string) => {
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      if (next.has(folderId)) {
        next.delete(folderId);
      } else {
        next.add(folderId);
      }
      return next;
    });
  };

  const handleExpandAll = () => {
    const allIds = KNOWLEDGE_TREE_DATA.map((f) => f.id);
    setExpandedFolders(new Set(allIds));
  };

  // Total count of tech nodes
  const totalTechCount = KNOWLEDGE_TREE_DATA.reduce((acc, f) => acc + f.items.length, 0);

  return (
    <div className="flex flex-col h-full bg-neutral-950/80 rounded-2xl border border-[var(--border-primary)] overflow-hidden">
      {/* Tree Header */}
      <div className="p-3.5 border-b border-[var(--border-primary)] bg-neutral-950 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <FolderTree className="w-4 h-4" />
            <span className="font-semibold uppercase tracking-wider">KNOWLEDGE BASE</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleExpandAll}
              title="Expand All Folders"
              className="p-1 rounded hover:bg-neutral-900 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <ChevronsUpDown className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-mono text-neutral-500 bg-neutral-900 px-2 py-0.5 rounded">
              {totalTechCount} NODES
            </span>
          </div>
        </div>

        {/* Search Input Bar */}
        <div className="relative w-full">
          <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search technology or keyword..."
            className="w-full pl-9 pr-7 py-2 rounded-xl bg-neutral-900/90 border border-neutral-850 text-xs font-mono text-neutral-200 placeholder:text-neutral-500 focus:border-cyan-400 focus:outline-none transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Tree Content Area */}
      <div className="p-3 space-y-1 overflow-y-auto max-h-[500px] md:max-h-[620px] scrollbar-thin">
        {KNOWLEDGE_TREE_DATA.map((folder) => (
          <CategoryNodeItem
            key={folder.id}
            folder={folder}
            isExpanded={expandedFolders.has(folder.id)}
            onToggleExpand={toggleExpand}
            selectedTechId={selectedTechId}
            onSelectTech={onSelectTech}
            searchQuery={searchQuery}
          />
        ))}
      </div>

      {/* Tree Footer */}
      <div className="p-3 border-t border-[var(--border-primary)] bg-neutral-950/90 text-[10px] font-mono text-neutral-500 flex items-center justify-between">
        <span>OBSIDIAN GRAPH // V2.6</span>
        <span className="flex items-center gap-1 text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> INDEXED
        </span>
      </div>
    </div>
  );
};
