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
  CheckCircle2
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

  if (!tech) {
    return (
      <div className="card-secondary h-full min-h-[400px] flex flex-col items-center justify-center p-8 text-center space-y-4 font-sans">
        <div className="p-4 rounded-2xl bg-[var(--bg-tertiary)] border border-[var(--border-primary)] text-[var(--text-accent)]">
          <BookOpen className="w-8 h-8" />
        </div>
        <div className="space-y-1 max-w-sm">
          <h3 className="text-lg font-display font-semibold text-[var(--text-primary)]">
            No Technology Selected
          </h3>
          <p className="text-xs text-[var(--text-secondary)] font-light">
            Select any technology from the knowledge tree on the left to inspect architectural details, usage, key concepts, and code snippets.
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

  return (
    <AnimatePresence mode="wait">
      <m.div
        key={tech.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="card-primary h-full p-5 md:p-6 space-y-6 flex flex-col justify-between overflow-hidden font-sans"
      >
        <div className="space-y-6">
          
          <div className="space-y-3 border-b border-[var(--border-primary)] pb-5">
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-gold)]">
              <span>AI Engineering</span>
              <span>&gt;</span>
              <span>{tech.categoryName}</span>
              <span>&gt;</span>
              <span className="text-[var(--text-primary)] font-semibold">{tech.name}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-[var(--brand-glow)] border border-[var(--border-glow)] text-[var(--text-accent)]">
                  <TechIcon name={tech.name} className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-[var(--text-primary)] tracking-tight">
                    {tech.name}
                  </h3>
                  <p className="text-xs text-[var(--text-tertiary)] font-mono">
                    Node ID: <span className="text-[var(--text-accent)]">#{tech.id}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="px-3 py-1 rounded-full bg-[var(--brand-glow)] border border-[var(--border-glow)] text-[var(--text-accent)] font-mono text-xs font-semibold">
                  {tech.level}
                </span>
                <span className="px-3 py-1 rounded-full bg-[var(--bg-tertiary)] border border-[var(--border-gold)] text-[var(--text-gold)] font-mono text-xs font-semibold">
                  {tech.years}
                </span>
              </div>
            </div>

            <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed font-light">
              {tech.description}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--text-gold)] font-semibold">
              <Zap className="w-3.5 h-3.5 text-[var(--text-gold)]" />
              <span>What I Use It For</span>
            </div>
            <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-xs md:text-sm text-[var(--text-primary)] leading-relaxed font-light">
              {tech.usage}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)]">
              <FileText className="w-3.5 h-3.5 text-[var(--text-accent)]" />
              <span>Key Concepts & Capabilities</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {tech.keyConcepts.map((concept, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md bg-[var(--bg-tertiary)] border border-[var(--border-primary)] text-xs font-mono text-[var(--text-secondary)] flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-accent)]" />
                  {concept}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)]">
                <Code2 className="w-3.5 h-3.5 text-[var(--text-accent)]" />
                <span>Example Implementation Snippet</span>
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

            <div className="relative rounded-xl bg-[var(--bg-code)] border border-[var(--border-primary)] p-4 font-mono text-xs overflow-x-auto text-[var(--text-primary)] scrollbar-thin">
              <pre className="leading-relaxed whitespace-pre font-mono text-[11px] md:text-xs">
                <code>{tech.codeSnippet}</code>
              </pre>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[var(--text-accent)]" />
              <span>Integrated Systems & Projects</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {tech.projects.map((proj, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-primary)] text-xs font-mono text-[var(--text-accent)] flex items-center gap-1.5"
                >
                  <GitBranch className="w-3.5 h-3.5 text-[var(--text-accent)]" />
                  {proj}
                </span>
              ))}
            </div>
          </div>

          {relatedTechNodes.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-[var(--border-primary)]">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)]">
                <GitBranch className="w-3.5 h-3.5 text-[var(--text-accent)]" />
                <span>Related Knowledge Nodes</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {relatedTechNodes.map((rel) => (
                  <button
                    key={rel.id}
                    onClick={() => onSelectTechById(rel.id)}
                    className="px-3 py-1.5 rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-accent)] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <TechIcon name={rel.name} className="w-3.5 h-3.5 text-[var(--text-accent)]" />
                    <span>{rel.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {tech.certifications && (
            <div className="p-3.5 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-gold)] flex items-center gap-3 text-xs font-mono text-[var(--text-gold)] font-semibold">
              <Award className="w-5 h-5 shrink-0 text-[var(--text-gold)]" />
              <div>
                <span className="block font-semibold">Accreditation Verified</span>
                <span>{tech.certifications}</span>
              </div>
            </div>
          )}

        </div>

        <div className="pt-4 mt-4 border-t border-[var(--border-primary)] flex items-center justify-between text-xs font-mono text-[var(--text-tertiary)]">
          <span>STATUS // PRODUCTION READY</span>
          {tech.github && (
            <a
              href={tech.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-accent)] hover:underline flex items-center gap-1.5"
            >
              <span>GitHub Repository</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

      </m.div>
    </AnimatePresence>
  );
};
