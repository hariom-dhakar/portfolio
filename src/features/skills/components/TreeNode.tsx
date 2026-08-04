import { memo } from 'react';
import {
  Folder,
  FolderOpen,
  ChevronRight,
  Code2,
  Cpu,
  Brain,
  Database,
  Cloud,
  Terminal,
  Shield,
  Layers,
  Sparkles
} from 'lucide-react';
import { type CategoryFolder, type TechnologyNode } from '../../../data/knowledgeData';

interface TreeNodeProps {
  node: CategoryFolder | TechnologyNode;
  isFolder: boolean;
  expandedFolders: Record<string, boolean>;
  selectedTechId: string | null;
  onToggleFolder: (id: string) => void;
  onSelectTech: (tech: TechnologyNode) => void;
}

export const TechIcon = memo(({ name, className = "w-4 h-4" }: { name: string; className?: string }) => {
  const lower = name.toLowerCase();
  if (lower.includes('crewai') || lower.includes('langgraph') || lower.includes('agent')) return <Brain className={className} />;
  if (lower.includes('fastapi') || lower.includes('python') || lower.includes('langchain')) return <Terminal className={className} />;
  if (lower.includes('postgres') || lower.includes('redis') || lower.includes('faiss') || lower.includes('chromadb')) return <Database className={className} />;
  if (lower.includes('azure') || lower.includes('docker') || lower.includes('databricks')) return <Cloud className={className} />;
  if (lower.includes('pytorch') || lower.includes('tensorflow') || lower.includes('huggingface')) return <Cpu className={className} />;
  if (lower.includes('rag') || lower.includes('eda')) return <Sparkles className={className} />;
  if (lower.includes('react') || lower.includes('typescript')) return <Code2 className={className} />;
  return <Layers className={className} />;
});

TechIcon.displayName = 'TechIcon';

export const CategoryFolderItem = memo(({
  folder,
  isExpanded,
  onToggle
}: {
  folder: CategoryFolder;
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  return (
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between py-2 px-3 rounded-xl hover:bg-[var(--bg-secondary)] border border-transparent hover:border-[var(--border-primary)] transition-all cursor-pointer text-left group"
    >
      <div className="flex items-center gap-2.5">
        <ChevronRight
          className={`w-4 h-4 text-[var(--text-tertiary)] transition-transform duration-200 ${
            isExpanded ? 'rotate-90 text-[var(--text-accent)]' : ''
          }`}
        />
        {isExpanded ? (
          <FolderOpen className="w-4.5 h-4.5 text-[var(--text-accent)]" />
        ) : (
          <Folder className="w-4.5 h-4.5 text-[var(--text-tertiary)] group-hover:text-[var(--text-primary)]" />
        )}
        <span className="text-xs font-mono font-semibold text-[var(--text-primary)] tracking-wide">
          {folder.name}
        </span>
      </div>
      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--bg-tertiary)] text-[var(--text-tertiary)] border border-[var(--border-primary)]">
        {folder.items.length} items
      </span>
    </button>
  );
});

CategoryFolderItem.displayName = 'CategoryFolderItem';

export const TechFileItem = memo(({
  tech,
  isSelected,
  onSelect
}: {
  tech: TechnologyNode;
  isSelected: boolean;
  onSelect: () => void;
}) => {
  return (
    <button
      onClick={onSelect}
      className={`w-full flex items-center justify-between py-1.5 px-3 rounded-lg text-left transition-all duration-200 cursor-pointer ${
        isSelected
          ? 'bg-[var(--brand-glow)] border border-[var(--border-glow)] text-[var(--text-accent)] font-semibold shadow-sm'
          : 'hover:bg-[var(--bg-secondary)] border border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
      }`}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <div className={`p-1 rounded ${isSelected ? 'text-[var(--text-accent)]' : 'text-[var(--text-tertiary)]'}`}>
          <TechIcon name={tech.name} className="w-3.5 h-3.5" />
        </div>
        <span className="text-xs font-mono truncate">{tech.name}.ts</span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {tech.certifications && <Shield className="w-3 h-3 text-[var(--text-gold)]" />}
        <span className="text-[10px] font-mono text-[var(--text-tertiary)] opacity-80">
          {tech.level}
        </span>
      </div>
    </button>
  );
});

TechFileItem.displayName = 'TechFileItem';

export const TreeNode = memo(({
  node,
  isFolder,
  expandedFolders,
  selectedTechId,
  onToggleFolder,
  onSelectTech
}: TreeNodeProps) => {
  if (isFolder) {
    const folder = node as CategoryFolder;
    const isExpanded = !!expandedFolders[folder.id];

    return (
      <div className="space-y-1">
        <CategoryFolderItem
          folder={folder}
          isExpanded={isExpanded}
          onToggle={() => onToggleFolder(folder.id)}
        />
        {isExpanded && (
          <div className="pl-4 ml-3 border-l border-[var(--border-primary)] space-y-1 pt-1">
            {folder.items.map((childTech: TechnologyNode) => (
              <TechFileItem
                key={childTech.id}
                tech={childTech}
                isSelected={selectedTechId === childTech.id}
                onSelect={() => onSelectTech(childTech)}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  const tech = node as TechnologyNode;
  return (
    <TechFileItem
      tech={tech}
      isSelected={selectedTechId === tech.id}
      onSelect={() => onSelectTech(tech)}
    />
  );
});

TreeNode.displayName = 'TreeNode';
