import React, { useState, useMemo, useCallback, memo } from 'react';
import { Search, FolderTree } from 'lucide-react';
import { KNOWLEDGE_TREE_DATA, type CategoryFolder, type TechnologyNode } from '../../../data/knowledgeData';
import { TreeNode } from './TreeNode';

interface KnowledgeTreeProps {
  selectedTechId: string | null;
  onSelectTech: (tech: TechnologyNode) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const KnowledgeTree: React.FC<KnowledgeTreeProps> = memo(({
  selectedTechId,
  onSelectTech,
  searchQuery,
  onSearchChange
}) => {
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    'ai-llm': true,
    'multi-agent': true,
    'vector-databases': true,
  });

  const handleToggleFolder = useCallback((folderId: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
  }, []);

  const filteredTree = useMemo(() => {
    if (!searchQuery.trim()) return KNOWLEDGE_TREE_DATA;

    const query = searchQuery.toLowerCase();
    return KNOWLEDGE_TREE_DATA.map((folder) => {
      const matchingItems = folder.items.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.id.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.keyConcepts.some((c) => c.toLowerCase().includes(query))
      );

      return {
        ...folder,
        items: matchingItems,
      };
    }).filter((folder) => folder.items.length > 0);
  }, [searchQuery]);

  const totalNodeCount = useMemo(() => {
    return KNOWLEDGE_TREE_DATA.reduce((acc, folder) => acc + folder.items.length, 0);
  }, []);

  return (
    <div className="h-full bg-[var(--bg-glass)] rounded-2xl border border-[var(--border-primary)] p-4 md:p-6 space-y-4 shadow-xl flex flex-col justify-between font-sans glass-card">
      <div className="space-y-4">
        
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border-primary)]">
          <div className="flex items-center gap-2">
            <FolderTree className="w-4 h-4 text-[var(--text-accent)]" />
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-primary)]">
              Explorer: AI Knowledge Tree
            </h3>
          </div>
          <span className="text-[10px] font-mono text-[var(--text-tertiary)] bg-[var(--bg-tertiary)] px-2 py-0.5 rounded-full border border-[var(--border-primary)]">
            {totalNodeCount} nodes
          </span>
        </div>

        <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1 scrollbar-thin">
          {filteredTree.length === 0 ? (
            <div className="py-8 text-center text-xs font-mono text-[var(--text-tertiary)]">
              No matching knowledge nodes found.
            </div>
          ) : (
            filteredTree.map((folder: CategoryFolder) => (
              <TreeNode
                key={folder.id}
                node={folder}
                isFolder={true}
                expandedFolders={
                  searchQuery.trim()
                    ? { ...expandedFolders, [folder.id]: true }
                    : expandedFolders
                }
                selectedTechId={selectedTechId}
                onToggleFolder={handleToggleFolder}
                onSelectTech={onSelectTech}
              />
            ))
          )}
        </div>

      </div>

      <div className="pt-3 border-t border-[var(--border-primary)] flex items-center justify-between text-[10px] font-mono text-[var(--text-tertiary)]">
        <span>OBSIDIAN_FORMAT_V2</span>
        <span>{KNOWLEDGE_TREE_DATA.length} CATEGORIES</span>
      </div>
    </div>
  );
});

KnowledgeTree.displayName = 'KnowledgeTree';
