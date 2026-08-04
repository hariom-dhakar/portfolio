import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Folder,
  FolderOpen,
  ChevronRight,
  FileCode,
  Cpu,
  Code2,
  Server,
  Cloud,
  Box,
  BarChart3
} from 'lucide-react';
import { type CategoryFolder, type TechnologyNode } from '../../../data/knowledgeData';

// Dynamic Tech Icon Component Mapper
export const TechIcon: React.FC<{ iconName?: string; name: string; className?: string }> = ({
  iconName,
  name,
  className = 'w-4 h-4'
}) => {
  const n = name.toLowerCase();

  if (iconName === 'Cpu' || n.includes('crew') || n.includes('rag') || n.includes('llm')) {
    return <Cpu className={`${className} text-cyan-400`} />;
  }
  if (iconName === 'Code' || n.includes('python') || n.includes('c++') || n.includes('script') || n.includes('sql')) {
    return <Code2 className={`${className} text-sky-400`} />;
  }
  if (iconName === 'Server' || n.includes('fastapi') || n.includes('rest') || n.includes('redis')) {
    return <Server className={`${className} text-indigo-400`} />;
  }
  if (iconName === 'Cloud' || n.includes('azure') || n.includes('databrick') || n.includes('postgres')) {
    return <Cloud className={`${className} text-blue-400`} />;
  }
  if (iconName === 'Container' || n.includes('docker') || n.includes('git') || n.includes('kubernetes')) {
    return <Box className={`${className} text-emerald-400`} />;
  }
  if (iconName === 'BarChart3' || n.includes('pandas') || n.includes('scikit') || n.includes('torch')) {
    return <BarChart3 className={`${className} text-amber-400`} />;
  }

  return <FileCode className={`${className} text-cyan-400`} />;
};

interface CategoryNodeProps {
  folder: CategoryFolder;
  isExpanded: boolean;
  onToggleExpand: (folderId: string) => void;
  selectedTechId: string | null;
  onSelectTech: (tech: TechnologyNode) => void;
  searchQuery: string;
}

export const CategoryNodeItem: React.FC<CategoryNodeProps> = ({
  folder,
  isExpanded,
  onToggleExpand,
  selectedTechId,
  onSelectTech,
  searchQuery
}) => {
  // Filter items matching query if search is active
  const matchingItems = searchQuery.trim()
    ? folder.items.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.keyConcepts.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : folder.items;

  if (searchQuery.trim() && matchingItems.length === 0) {
    return null; // Hide folder if searching and no matches
  }

  const shouldExpand = searchQuery.trim() ? true : isExpanded;

  return (
    <div className="space-y-1 font-mono text-xs select-none">
      {/* Folder Header */}
      <button
        onClick={() => onToggleExpand(folder.id)}
        className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-900/60 transition-colors cursor-pointer group"
      >
        <div className="flex items-center gap-2">
          <motion.span
            animate={{ rotate: shouldExpand ? 90 : 0 }}
            transition={{ duration: 0.15 }}
            className="text-neutral-500 group-hover:text-neutral-300"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </motion.span>

          {shouldExpand ? (
            <FolderOpen className="w-4 h-4 text-cyan-400" />
          ) : (
            <Folder className="w-4 h-4 text-neutral-400 group-hover:text-cyan-300" />
          )}

          <span className="font-medium text-neutral-200 group-hover:text-cyan-300">
            {folder.name}
          </span>
        </div>

        <span className="text-[10px] text-neutral-500 font-mono px-1.5 py-0.5 rounded bg-neutral-900">
          {matchingItems.length}
        </span>
      </button>

      {/* Children File Nodes */}
      <AnimatePresence initial={false}>
        {shouldExpand && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="pl-4 ml-3 border-l border-neutral-850 space-y-0.5 overflow-hidden"
          >
            {matchingItems.map((tech) => {
              const isSelected = selectedTechId === tech.id;
              return (
                <button
                  key={tech.id}
                  onClick={() => onSelectTech(tech)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-all cursor-pointer group ${
                    isSelected
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(34,211,238,0.2)] font-semibold'
                      : 'text-neutral-400 hover:text-neutral-100 hover:bg-neutral-900/40 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <TechIcon iconName={folder.iconName} name={tech.name} className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{tech.name}</span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {tech.level === 'Expert' && (
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
                    )}
                    <span className="text-[10px] font-mono opacity-60 group-hover:opacity-100">
                      {tech.years}
                    </span>
                  </div>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
