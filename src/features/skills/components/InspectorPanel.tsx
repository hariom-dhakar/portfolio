import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Copy,
  Check,
  GitBranch,
  ExternalLink,
  Award,
  BookOpen,
  Zap,
  Code2,
  ChevronDown,
  ChevronUp,
  ArrowRight
} from 'lucide-react';
import { KNOWLEDGE_TREE_DATA, type TechnologyNode } from '../../../data/knowledgeData';
import { TechIcon } from './TreeNode';

interface InspectorPanelProps {
  tech: TechnologyNode | null;
  onSelectTechById: (id: string) => void;
}

export const InspectorPanel: React.FC<InspectorPanelProps> = ({
  tech,
  onSelectTechById
}) => {
  const [hasCopied, setHasCopied] = useState(false);
  const [isCodeExpanded, setIsCodeExpanded] = useState(false);
  const [showAllTags, setShowAllTags] = useState(false);

  if (!tech) {
    return (
      <div className="card-secondary h-full min-h-[320px] flex flex-col items-center justify-center p-6 text-center space-y-3 font-sans">
        <div className="p-3 rounded-2xl bg-[var(--bg-tertiary)] border border-[var(--border-primary)] text-[var(--text-accent)]">
          <BookOpen className="w-6 h-6" />
        </div>
        <div className="space-y-1 max-w-sm">
          <h3 className="text-base font-display font-semibold text-[var(--text-primary)]">
            No Technology Selected
          </h3>
          <p className="text-xs text-[var(--text-secondary)] font-light leading-relaxed">
            Select any technology from the knowledge tree on the left to inspect architectural details, production usage, code snippets, and integrated systems.
          </p>
        </div>
      </div>
    );
  }

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(tech.codeSnippet);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  const relatedTechNodes = KNOWLEDGE_TREE_DATA.flatMap((f) => f.items).filter((node) =>
    tech.relatedTech.includes(node.id)
  );

  const displayedConcepts = showAllTags ? tech.keyConcepts : tech.keyConcepts.slice(0, 3);
  const hiddenTagsCount = tech.keyConcepts.length - 3;

  return (
    <AnimatePresence mode="wait">
      <m.div
        key={tech.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="card-primary h-full p-4 sm:p-5 space-y-4 flex flex-col justify-between font-sans"
      >
        <div className="space-y-4">
          
          {/* HEADER (ENGINEERING FOCUSED, NO PROFICIENCY BADGES) */}
          <div className="space-y-2.5 border-b border-[var(--border-primary)] pb-3.5">
            <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--text-gold)]">
              <span>AI Stack</span>
              <span>&gt;</span>
              <span>{tech.categoryName}</span>
              <span>&gt;</span>
              <span className="text-[var(--text-primary)] font-semibold">{tech.name}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-xl bg-[var(--brand-glow)] border border-[var(--border-glow)] text-[var(--text-accent)]">
                  <TechIcon name={tech.name} className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-[var(--text-primary)] tracking-tight">
                    {tech.name}
                  </h3>
                  <p className="text-xs text-[var(--text-tertiary)] font-mono">
                    System Component: <span className="text-[var(--text-accent)]">#{tech.id}</span>
                  </p>
                </div>
              </div>

              {/* PROJECT-BASED VALIDATION BADGES */}
              {tech.projects && tech.projects.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                  <span className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase mr-1">Used In:</span>
                  {tech.projects.map((proj, pIdx) => (
                    <span 
                      key={pIdx}
                      className="px-2 py-0.5 rounded-md bg-[var(--bg-tertiary)] border border-[var(--border-gold)]/40 text-[10px] font-mono text-[var(--text-gold)] font-medium"
                    >
                      {proj}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed font-light">
              {tech.description}
            </p>
          </div>

          {/* PRODUCTION USAGE */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[var(--text-gold)] font-semibold">
              <Zap className="w-3.5 h-3.5 text-[var(--text-gold)]" />
              <span>Production Integration & Capability</span>
            </div>
            <div className="p-3 rounded-xl bg-[var(--bg-tertiary)] text-xs md:text-sm text-[var(--text-primary)] leading-relaxed font-light">
              {tech.usage}
            </div>
          </div>

          {/* KEY CONCEPTS (COLLAPSIBLE TAG CLUTTER REDUCTION) */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)]">
              <FileText className="w-3.5 h-3.5 text-[var(--text-accent)]" />
              <span>Core Concepts</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {displayedConcepts.map((concept, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md bg-[var(--bg-tertiary)] border border-[var(--border-primary)] text-xs font-mono text-[var(--text-secondary)] flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-accent)]" />
                  {concept}
                </span>
              ))}

              {hiddenTagsCount > 0 && !showAllTags && (
                <button
                  onClick={() => setShowAllTags(true)}
                  className="px-2.5 py-1 rounded-md bg-[var(--bg-tertiary)] hover:bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-xs font-mono text-[var(--text-accent)] cursor-pointer transition-colors"
                >
                  +{hiddenTagsCount} more
                </button>
              )}

              {showAllTags && hiddenTagsCount > 0 && (
                <button
                  onClick={() => setShowAllTags(false)}
                  className="px-2 py-1 rounded-md bg-[var(--bg-tertiary)] text-xs font-mono text-[var(--text-tertiary)] hover:text-[var(--text-primary)] cursor-pointer"
                >
                  Show Less
                </button>
              )}
            </div>
          </div>

          {/* EXAMPLE IMPLEMENTATION CODE SNIPPET (SHORTENED WITH SHOW MORE TOGGLE) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)]">
                <Code2 className="w-3.5 h-3.5 text-[var(--text-accent)]" />
                <span>Implementation Preview</span>
              </div>

              <button
                onClick={handleCopySnippet}
                className="px-2.5 py-1 rounded bg-[var(--bg-tertiary)] hover:bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[11px] font-mono text-[var(--text-secondary)] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {hasCopied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-500" />
                    <span className="text-emerald-500">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>

            <div className="relative rounded-xl bg-[var(--bg-code)] border border-[var(--border-primary)] p-4 font-mono text-xs overflow-hidden text-[var(--text-primary)]">
              <pre className={`leading-relaxed whitespace-pre font-mono text-[11px] md:text-xs ${
                !isCodeExpanded ? 'max-h-[110px] overflow-hidden' : 'overflow-x-auto scrollbar-thin'
              }`}>
                <code>{tech.codeSnippet}</code>
              </pre>

              {!isCodeExpanded && (
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[var(--bg-code)] to-transparent pointer-events-none flex items-end justify-center pb-1" />
              )}
            </div>

            <button
              onClick={() => setIsCodeExpanded((prev) => !prev)}
              className="w-full py-1.5 px-3 rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-xs font-mono text-[var(--text-accent)] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>{isCodeExpanded ? 'Show Less Code' : 'Show Full Implementation'}</span>
              {isCodeExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* RELATED TECHNOLOGIES (DEPENDENCY CHAIN VISUALIZATION) */}
          {relatedTechNodes.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-[var(--border-primary)]">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)]">
                <GitBranch className="w-3.5 h-3.5 text-[var(--text-accent)]" />
                <span>Dependency & System Relationships</span>
              </div>

              <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl bg-[var(--bg-tertiary)] font-mono text-xs">
                <span className="px-2.5 py-1 rounded bg-[var(--brand-glow)] text-[var(--text-accent)] font-semibold border border-[var(--border-glow)] flex items-center gap-1.5">
                  <TechIcon name={tech.name} className="w-3.5 h-3.5" />
                  {tech.name}
                </span>

                {relatedTechNodes.map((rel) => (
                  <React.Fragment key={rel.id}>
                    <ArrowRight className="w-3.5 h-3.5 text-[var(--text-tertiary)] shrink-0" />
                    <RelatedTechButton techNode={rel} onSelect={onSelectTechById} />
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}

          {tech.certifications && (
            <div className="p-3 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-gold)]/50 flex items-center gap-3 text-xs font-mono text-[var(--text-gold)] font-semibold">
              <Award className="w-4 h-4 shrink-0 text-[var(--text-gold)]" />
              <span>Accredited: {tech.certifications}</span>
            </div>
          )}

        </div>

        <div className="pt-3 mt-4 border-t border-[var(--border-primary)] flex items-center justify-between text-xs font-mono text-[var(--text-tertiary)]">
          <span>STATUS // PRODUCTION READY</span>
          {tech.github && (
            <a
              href={tech.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-accent)] hover:underline flex items-center gap-1.5"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

      </m.div>
    </AnimatePresence>
  );
};

const RelatedTechButton = React.memo(({
  techNode,
  onSelect
}: {
  techNode: TechnologyNode;
  onSelect: (id: string) => void;
}) => {
  const handleClick = React.useCallback(() => {
    onSelect(techNode.id);
  }, [techNode.id, onSelect]);

  return (
    <button
      onClick={handleClick}
      className="px-2.5 py-1 rounded bg-[var(--bg-secondary)] hover:bg-[var(--bg-primary)] border border-[var(--border-primary)] text-[var(--text-secondary)] hover:text-[var(--text-accent)] flex items-center gap-1.5 transition-colors cursor-pointer"
    >
      <TechIcon name={techNode.name} className="w-3.5 h-3.5 text-[var(--text-accent)]" />
      <span>{techNode.name}</span>
    </button>
  );
});

RelatedTechButton.displayName = 'RelatedTechButton';
