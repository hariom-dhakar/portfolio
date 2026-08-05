import React, { useMemo, memo } from 'react';
import { Shield, Sparkles } from 'lucide-react';
import { KNOWLEDGE_TREE_DATA, type CategoryFolder, type TechnologyNode } from '../../../data/knowledgeData';
import { TechIcon } from './TreeNode';

interface SimpleSkillsProps {
  searchQuery: string;
}

const CATEGORY_MAP: Record<string, { title: string; formula: string; isPrimary?: boolean }> = {
  'ai-llm': {
    title: 'AI Engineering',
    formula: 'Attention(Q,K,V) • RoPE • KV Cache • LoRA • RAG',
    isPrimary: true,
  },
  'multi-agent': {
    title: 'Multi-Agent Frameworks',
    formula: 'Hierarchical Orchestration • ReAct Loop • State Graph',
    isPrimary: true,
  },
  'backend': {
    title: 'Backend Systems & Microservices',
    formula: 'AsyncIO • FastAPIRouter • gRPC • Middleware • Pydantic',
    isPrimary: true,
  },
  'cloud-data': {
    title: 'Cloud Platforms & Data',
    formula: 'Azure OpenAI • AKS • Databricks • Blob Storage • Terraform',
    isPrimary: true,
  },
  'vector-databases': {
    title: 'Vector Databases & Search',
    formula: 'Cosine Similarity • HNSW • IVFFlat • Dense Embeddings',
  },
  'ml-data': {
    title: 'Applied Machine Learning',
    formula: 'CrossEntropy • ∇L(θ) • PCA • Confusion Matrix • XGBoost',
  },
  'deployment': {
    title: 'Infrastructure & Deployment',
    formula: 'Dockerfile • K8s Helm • CI/CD Actions • Ingress Controller',
  },
  'languages': {
    title: 'Core Languages',
    formula: 'Type System • Asynchronous Runtime • Memory Allocation',
  },
};

export const SimpleSkills: React.FC<SimpleSkillsProps> = memo(({ searchQuery }) => {
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return KNOWLEDGE_TREE_DATA;

    const query = searchQuery.toLowerCase();
    return KNOWLEDGE_TREE_DATA.map((category) => {
      const matchingTech = category.items.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.id.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.keyConcepts.some((c) => c.toLowerCase().includes(query))
      );

      return {
        ...category,
        items: matchingTech,
      };
    }).filter((category) => category.items.length > 0);
  }, [searchQuery]);

  const totalTechCount = useMemo(() => {
    return KNOWLEDGE_TREE_DATA.reduce((acc, cat) => acc + cat.items.length, 0);
  }, []);

  return (
    <div className="space-y-4 font-sans">
      
      {/* LIGHTWEIGHT SECTION METADATA BAR */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-2 py-1 font-mono text-[11px] text-[var(--text-tertiary)] border-b border-[var(--border-primary)]/50 pb-2.5">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[var(--text-gold)]" />
          <span className="text-[var(--text-primary)] font-semibold">{totalTechCount} Technologies</span>
          <span>•</span>
          <span>{KNOWLEDGE_TREE_DATA.length} Categories</span>
        </div>
        <div className="flex items-center gap-3">
          <span>4 Production Systems</span>
          <span>•</span>
          <span>2 Cloud Platforms</span>
        </div>
      </div>

      {filteredCategories.length === 0 ? (
        <div className="py-12 text-center text-xs font-mono text-[var(--text-tertiary)] card-secondary rounded-xl p-6">
          No matching technologies found for "{searchQuery}".
        </div>
      ) : (
        /* BALANCED 2-COLUMN DESKTOP GRID */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          {filteredCategories.map((category: CategoryFolder) => (
            <SkillCategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}
    </div>
  );
});

SimpleSkills.displayName = 'SimpleSkills';

const SkillCategoryCard = memo(({ category }: { category: CategoryFolder }) => {
  const meta = CATEGORY_MAP[category.id] || {
    title: category.name,
    formula: 'Production Architecture • High Performance Systems',
  };

  return (
    <div className={`relative p-4 rounded-xl border transition-all duration-200 overflow-hidden font-sans space-y-3 ${
      meta.isPrimary
        ? 'bg-[var(--bg-secondary)]/80 border-[var(--border-primary)] hover:border-[var(--border-glow)] hover:bg-[var(--bg-tertiary)] shadow-xs'
        : 'bg-[var(--bg-secondary)]/40 border-[var(--border-primary)]/60 hover:border-[var(--border-glow)]/70 hover:bg-[var(--bg-tertiary)]/70 shadow-none'
    }`}>
      
      {/* FAINT CONTEXTUAL TECHNICAL BACKGROUND FORMULA ELEMENT (3-5% OPACITY) */}
      <div 
        aria-hidden="true"
        className="absolute -bottom-1 right-2 font-mono text-[9px] text-[var(--text-tertiary)] opacity-[0.04] pointer-events-none select-none tracking-widest uppercase whitespace-nowrap overflow-hidden max-w-[85%]"
      >
        {meta.formula}
      </div>

      {/* COMPACT CATEGORY HEADER */}
      <div className="flex items-center justify-between pb-2 border-b border-[var(--border-primary)]/50">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-[var(--brand-glow)] text-[var(--text-accent)] border border-[var(--border-glow)]">
            <TechIcon name={category.name} className="w-3.5 h-3.5" />
          </div>
          <h3 className="font-display font-semibold text-sm md:text-base text-[var(--text-primary)] tracking-tight">
            {meta.title}
          </h3>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[var(--bg-tertiary)] text-[var(--text-tertiary)] border border-[var(--border-primary)]/60 font-medium">
          {category.items.length} items
        </span>
      </div>

      {/* STANDARDIZED SKILL ROWS (2 COLUMNS INSIDE CARD FOR COMPACT RHYTHM) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
        {category.items.map((tech: TechnologyNode) => (
          <SkillRow key={tech.id} tech={tech} />
        ))}
      </div>

    </div>
  );
});

SkillCategoryCard.displayName = 'SkillCategoryCard';

const SkillRow = memo(({ tech }: { tech: TechnologyNode }) => {
  const projCount = tech.projects ? tech.projects.length : 0;
  const metaLabel = tech.certifications
    ? 'Certified'
    : projCount > 0
    ? `Used in ${projCount} Proj`
    : 'Production Ready';

  return (
    <div className="flex items-center justify-between py-1 px-2.5 rounded-lg bg-[var(--bg-tertiary)]/60 border border-[var(--border-primary)]/40 hover:border-[var(--border-glow)] hover:bg-[var(--bg-tertiary)] transition-all duration-200 group cursor-default">
      <div className="flex items-center gap-2 min-w-0">
        <div className="text-[var(--text-accent)] shrink-0 transition-transform duration-200 group-hover:scale-105">
          <TechIcon name={tech.name} className="w-3.5 h-3.5" />
        </div>
        <span className="text-xs font-mono text-[var(--text-primary)] font-medium truncate group-hover:text-[var(--text-accent)] transition-colors">
          {tech.name}
        </span>
      </div>

      <div className="flex items-center gap-1 shrink-0 pl-1.5">
        {tech.certifications ? (
          <span className="inline-flex items-center gap-0.5 text-[9px] font-mono px-1.5 py-0.2 rounded bg-[var(--brand-glow)] text-[var(--text-gold)] font-bold">
            <Shield className="w-2.5 h-2.5" />
            Cert
          </span>
        ) : (
          <span className="text-[9px] font-mono text-[var(--text-tertiary)] group-hover:text-[var(--text-secondary)]">
            {metaLabel}
          </span>
        )}
      </div>
    </div>
  );
});

SkillRow.displayName = 'SkillRow';
