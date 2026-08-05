import React, { useMemo, memo } from 'react';
import { Shield } from 'lucide-react';
import { KNOWLEDGE_TREE_DATA, type CategoryFolder, type TechnologyNode } from '../../../data/knowledgeData';
import { TechIcon } from './TreeNode';

interface SimpleSkillsProps {
  searchQuery: string;
}

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

  return (
    <div className="space-y-8 font-sans">
      {filteredCategories.length === 0 ? (
        <div className="py-16 text-center text-sm font-mono text-[var(--text-tertiary)] glass-panel rounded-2xl p-8">
          No matching technologies found for "{searchQuery}".
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
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
  return (
    <div className="card-primary p-5 space-y-4">
      
      <div className="flex items-center justify-between pb-3 border-b border-[var(--border-primary)]">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-[var(--brand-glow)] text-[var(--text-accent)] border border-[var(--border-glow)]">
            <TechIcon name={category.name} className="w-4 h-4" />
          </div>
          <h3 className="font-display font-bold text-base md:text-lg text-[var(--text-primary)]">
            {category.name}
          </h3>
        </div>
        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[var(--bg-tertiary)] text-[var(--text-tertiary)] border border-[var(--border-primary)] font-semibold">
          {category.items.length} skills
        </span>
      </div>

      <div className="flex flex-wrap gap-2.5 pt-1">
        {category.items.map((tech: TechnologyNode) => (
          <SkillChip key={tech.id} tech={tech} />
        ))}
      </div>

    </div>
  );
});

SkillCategoryCard.displayName = 'SkillCategoryCard';

const SkillChip = memo(({ tech }: { tech: TechnologyNode }) => {
  return (
    <div className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)] hover:border-[var(--border-glow)] hover:bg-[var(--bg-tertiary)] hover:-translate-y-0.5 transition-all duration-200 cursor-default shadow-xs">
      <div className="text-[var(--text-accent)] group-hover:scale-110 transition-transform">
        <TechIcon name={tech.name} className="w-3.5 h-3.5" />
      </div>

      <span className="text-xs font-mono text-[var(--text-primary)] font-medium group-hover:text-[var(--text-accent)] transition-colors">
        {tech.name}
      </span>

      <div className="flex items-center gap-1 pl-1 border-l border-[var(--border-primary)]/60">
        {tech.certifications ? (
          <span className="inline-flex items-center gap-0.5 text-[9px] font-mono px-1.5 py-0.2 rounded bg-[var(--brand-glow)] text-[var(--text-gold)] border border-[var(--border-gold)] font-bold">
            <Shield className="w-2.5 h-2.5" />
            Cert
          </span>
        ) : (
          <span className="text-[10px] font-mono text-[var(--text-tertiary)] group-hover:text-[var(--text-secondary)]">
            {tech.level}
          </span>
        )}
      </div>
    </div>
  );
});

SkillChip.displayName = 'SkillChip';
