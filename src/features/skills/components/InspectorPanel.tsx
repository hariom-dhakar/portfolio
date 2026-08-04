import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
      <div className="h-full min-h-[400px] flex flex-col items-center justify-center p-8 bg-neutral-950/60 rounded-2xl border border-[var(--border-primary)] text-center space-y-4 font-sans">
        <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-850 text-cyan-400">
          <BookOpen className="w-8 h-8" />
        </div>
        <div className="space-y-1 max-w-sm">
          <h3 className="text-lg font-display font-semibold text-neutral-200">
            No Technology Selected
          </h3>
          <p className="text-xs text-neutral-400 font-light">
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

  // Find connected technology objects for relatedTech
  const relatedTechNodes = KNOWLEDGE_TREE_DATA.flatMap((f) => f.items).filter((node) =>
    tech.relatedTech.includes(node.id)
  );

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={tech.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="h-full bg-neutral-950/90 rounded-2xl border border-[var(--border-primary)] p-5 md:p-8 space-y-6 shadow-2xl flex flex-col justify-between overflow-hidden font-sans"
      >
        <div className="space-y-6">
          
          {/* Header & Category Breadcrumb */}
          <div className="space-y-3 border-b border-[var(--border-primary)] pb-5">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <span>AI Engineering</span>
              <span>&gt;</span>
              <span>{tech.categoryName}</span>
              <span>&gt;</span>
              <span className="text-neutral-200 font-semibold">{tech.name}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <TechIcon name={tech.name} className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-text-primary tracking-tight">
                    {tech.name}
                  </h3>
                  <p className="text-xs text-text-tertiary font-mono">
                    Node ID: <span className="text-cyan-400">#{tech.id}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-semibold">
                  {tech.level}
                </span>
                <span className="px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 font-mono text-xs">
                  {tech.years}
                </span>
              </div>
            </div>

            <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-light">
              {tech.description}
            </p>
          </div>

          {/* WHAT I USE IT FOR */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400">
              <Zap className="w-3.5 h-3.5" />
              <span>What I Use It For</span>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-850 text-xs md:text-sm text-neutral-200 leading-relaxed font-light">
              {tech.usage}
            </div>
          </div>

          {/* KEY CONCEPTS */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400">
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Key Concepts & Capabilities</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {tech.keyConcepts.map((concept, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300 flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  {concept}
                </span>
              ))}
            </div>
          </div>

          {/* CODE SNIPPET BOX */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400">
                <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Example Implementation Snippet</span>
              </div>

              <button
                onClick={handleCopySnippet}
                className="px-2.5 py-1 rounded bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-[11px] font-mono text-neutral-300 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {hasCopied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>

            <div className="relative rounded-xl bg-neutral-950 border border-neutral-850 p-4 font-mono text-xs overflow-x-auto text-neutral-300 scrollbar-thin">
              <pre className="leading-relaxed whitespace-pre font-mono text-[11px] md:text-xs">
                <code>{tech.codeSnippet}</code>
              </pre>
            </div>
          </div>

          {/* INTEGRATED PROJECTS */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Integrated Systems & Projects</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {tech.projects.map((proj, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-lg bg-neutral-900/80 border border-neutral-800 text-xs font-mono text-cyan-300 flex items-center gap-1.5"
                >
                  <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
                  {proj}
                </span>
              ))}
            </div>
          </div>

          {/* RELATED TECHNOLOGIES */}
          {relatedTechNodes.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-[var(--border-primary)]">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400">
                <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
                <span>Related Knowledge Nodes</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {relatedTechNodes.map((rel) => (
                  <button
                    key={rel.id}
                    onClick={() => onSelectTechById(rel.id)}
                    className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-xs font-mono text-neutral-300 hover:text-cyan-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <TechIcon name={rel.name} className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{rel.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CERTIFICATIONS (IF APPLICABLE) */}
          {tech.certifications && (
            <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center gap-3 text-xs font-mono text-cyan-300">
              <Award className="w-5 h-5 shrink-0 text-cyan-400" />
              <div>
                <span className="block font-semibold">Accreditation Verified</span>
                <span>{tech.certifications}</span>
              </div>
            </div>
          )}

        </div>

        {/* Footer Links */}
        <div className="pt-4 mt-4 border-t border-[var(--border-primary)] flex items-center justify-between text-xs font-mono text-neutral-500">
          <span>STATUS // PRODUCTION READY</span>
          {tech.github && (
            <a
              href={tech.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:underline flex items-center gap-1.5"
            >
              <span>GitHub Repository</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

      </motion.div>
    </AnimatePresence>
  );
};
