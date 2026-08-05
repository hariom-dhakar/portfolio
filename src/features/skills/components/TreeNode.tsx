import { memo } from 'react';
import {
  Folder,
  FolderOpen,
  ChevronRight,
  Brain,
  Database,
  Shield,
  Layers,
  Sparkles,
  Server,
  Network,
  Cpu,
  Workflow,
  Cloud
} from 'lucide-react';
import {
  SiPython,
  SiFastapi,
  SiLangchain,
  SiGoogle,
  SiHuggingface,
  SiPytorch,
  SiTensorflow,
  SiDatabricks,
  SiDocker,
  SiKubernetes,
  SiPostgresql,
  SiRedis,
  SiMeta,
  SiPandas,
  SiNumpy,
  SiScikitlearn,
  SiMlflow,
  SiReact,
  SiTypescript,
  SiJavascript,
  SiCplusplus,
  SiGithubactions
} from 'react-icons/si';
import {
  OpenAILogo,
  PythonLogo,
  TypeScriptLogo,
  ReactLogo,
  FastAPILogo,
  DockerLogo,
  KubernetesLogo,
  AzureLogo,
  PyTorchLogo,
  GitLogo,
  PostgreSQLLogo,
  RedisLogo,
  DatabricksLogo
} from '../../../components/icons/TechLogos';
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

  // Exact Brand Icon Mappings
  if (lower.includes('python')) return <PythonLogo className={className} />;
  if (lower.includes('fastapi')) return <FastAPILogo className={className} />;
  if (lower.includes('crewai')) return <Brain className={className} />;
  if (lower.includes('langchain')) return <SiLangchain className={className} />;
  if (lower.includes('langgraph')) return <Workflow className={className} />;
  if (lower.includes('openai')) return <OpenAILogo className={className} />;
  if (lower.includes('anthropic') || lower.includes('claude')) return <Sparkles className={className} />;
  if (lower.includes('gemini') || lower.includes('google')) return <SiGoogle className={className} />;
  if (lower.includes('huggingface') || lower.includes('transformers')) return <SiHuggingface className={className} />;
  if (lower.includes('pytorch')) return <PyTorchLogo className={className} />;
  if (lower.includes('tensorflow')) return <SiTensorflow className={className} />;
  if (lower.includes('databricks')) return <DatabricksLogo className={className} />;
  if (lower.includes('azure')) return <AzureLogo className={className} />;
  if (lower.includes('docker')) return <DockerLogo className={className} />;
  if (lower.includes('kubernetes')) return <KubernetesLogo className={className} />;
  if (lower.includes('postgres') || lower.includes('postgresql')) return <PostgreSQLLogo className={className} />;
  if (lower.includes('redis')) return <RedisLogo className={className} />;
  if (lower.includes('faiss')) return <SiMeta className={className} />;
  if (lower.includes('chroma')) return <Database className={className} />;
  if (lower.includes('git') || lower.includes('github')) return <GitLogo className={className} />;
  if (lower.includes('pandas')) return <SiPandas className={className} />;
  if (lower.includes('numpy')) return <SiNumpy className={className} />;
  if (lower.includes('scikit')) return <SiScikitlearn className={className} />;
  if (lower.includes('mlflow')) return <SiMlflow className={className} />;
  if (lower.includes('react')) return <ReactLogo className={className} />;
  if (lower.includes('typescript')) return <TypeScriptLogo className={className} />;
  if (lower.includes('javascript')) return <SiJavascript className={className} />;
  if (lower.includes('c++') || lower.includes('cplusplus')) return <SiCplusplus className={className} />;
  if (lower.includes('actions')) return <SiGithubactions className={className} />;
  if (lower.includes('ragas') || lower.includes('rag')) return <Sparkles className={className} />;
  if (lower.includes('rest') || lower.includes('api')) return <Network className={className} />;
  if (lower.includes('backend') || lower.includes('microservices')) return <Server className={className} />;
  if (lower.includes('machine learning') || lower.includes('ml')) return <Cpu className={className} />;

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
