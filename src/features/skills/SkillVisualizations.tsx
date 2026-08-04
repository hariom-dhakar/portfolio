import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { InteractiveTerminal } from '../terminal/InteractiveTerminal';
import { Code2, Brain, Database, Cpu, Terminal as TerminalIcon } from 'lucide-react';

interface Skill {
  name: string;
  level: string;
  category: string;
  x: number; // percentage coordinate for clustering layout
  y: number;
}

const SKILL_DATA: Skill[] = [
  // Languages
  { name: 'Python', level: 'Expert', category: 'Languages', x: 20, y: 35 },
  { name: 'C++', level: 'Intermediate', category: 'Languages', x: 15, y: 55 },
  { name: 'SQL', level: 'Advanced', category: 'Languages', x: 25, y: 15 },
  
  // AI & LLMs
  { name: 'Agentic AI', level: 'Expert', category: 'AI', x: 45, y: 25 },
  { name: 'Multi-Agent', level: 'Expert', category: 'AI', x: 55, y: 15 },
  { name: 'RAG', level: 'Expert', category: 'LLMs', x: 40, y: 40 },
  { name: 'LangGraph', level: 'Expert', category: 'LLMs', x: 50, y: 50 },
  { name: 'CrewAI', level: 'Expert', category: 'LLMs', x: 60, y: 35 },
  { name: 'LangChain', level: 'Advanced', category: 'LLMs', x: 38, y: 58 },
  { name: 'Langfuse', level: 'Advanced', category: 'LLMs', x: 50, y: 70 },
  { name: 'RAGAS', level: 'Advanced', category: 'LLMs', x: 60, y: 65 },
  { name: 'Fine-Tuning', level: 'Intermediate', category: 'AI', x: 30, y: 70 },
  { name: 'PyTorch', level: 'Intermediate', category: 'AI', x: 32, y: 85 },
  
  // Frameworks & Backend
  { name: 'FastAPI', level: 'Expert', category: 'Frameworks', x: 75, y: 30 },
  { name: 'REST APIs', level: 'Expert', category: 'Frameworks', x: 70, y: 15 },
  { name: 'Pandas', level: 'Advanced', category: 'Backend', x: 72, y: 48 },
  { name: 'NumPy', level: 'Advanced', category: 'Backend', x: 82, y: 40 },
  { name: 'Scikit-Learn', level: 'Advanced', category: 'Backend', x: 80, y: 60 },

  // Databases & Cloud
  { name: 'MongoDB', level: 'Advanced', category: 'Databases', x: 85, y: 18 },
  { name: 'ChromaDB', level: 'Expert', category: 'Databases', x: 45, y: 85 },
  { name: 'FAISS', level: 'Expert', category: 'Databases', x: 58, y: 85 },
  { name: 'Databricks', level: 'Certified', category: 'Cloud', x: 90, y: 50 },
  { name: 'Docker', level: 'Advanced', category: 'Cloud', x: 92, y: 72 },
  { name: 'Kubernetes', level: 'Intermediate', category: 'Cloud', x: 88, y: 85 },
  { name: 'Azure', level: 'Intermediate', category: 'Cloud', x: 72, y: 78 }
];

const CATEGORIES = [
  { id: 'Languages', icon: Code2, label: 'Languages' },
  { id: 'AI', icon: Brain, label: 'AI & Machine Learning' },
  { id: 'LLMs', icon: Cpu, label: 'Agents & LLM Systems' },
  { id: 'Frameworks', icon: Database, label: 'Frameworks & Databases' }
];

export const SkillVisualizations: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'graph' | 'list' | 'terminal'>('graph');
  const [hoveredNode, setHoveredNode] = useState<Skill | null>(null);

  const getConnections = () => {
    // Generate linkages between close coordinates in the cluster
    const connections: { from: Skill; to: Skill }[] = [];
    for (let i = 0; i < SKILL_DATA.length; i++) {
      for (let j = i + 1; j < SKILL_DATA.length; j++) {
        const s1 = SKILL_DATA[i];
        const s2 = SKILL_DATA[j];
        const dx = s1.x - s2.x;
        const dy = s1.y - s2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Link skills if they're close geographically and share category or have relevance
        if (dist < 20 && (s1.category === s2.category || s1.name === 'Python' || s2.name === 'Python')) {
          connections.push({ from: s1, to: s2 });
        }
      }
    }
    return connections;
  };

  const connections = getConnections();

  return (
    <section id="skills" className="relative py-24 px-4 overflow-hidden border-b border-border-premium">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border-glow bg-brand-glow text-text-accent text-xs font-mono mb-4"
          >
            <Brain className="w-3.5 h-3.5" /> Capabilities
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4"
          >
            Technical Competencies
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-text-secondary max-w-2xl mx-auto text-base md:text-lg"
          >
            Explore three distinct visual layouts of the engineering stack. Toggle options below.
          </motion.p>
        </div>

        {/* Vis Options Toggles */}
        <div className="flex justify-center gap-2 mb-12">
          <button
            onClick={() => setActiveTab('graph')}
            className={`px-4 py-2 rounded-lg font-mono text-xs md:text-sm transition-all duration-300 border ${
              activeTab === 'graph'
                ? 'bg-text-accent border-text-accent text-bg-primary font-medium glow-card'
                : 'bg-bg-secondary hover:bg-bg-tertiary border-border-primary text-text-secondary hover:text-text-primary'
            }`}
          >
            [1] Interactive Neural Map
          </button>
          <button
            onClick={() => setActiveTab('list')}
            className={`px-4 py-2 rounded-lg font-mono text-xs md:text-sm transition-all duration-300 border ${
              activeTab === 'list'
                ? 'bg-text-accent border-text-accent text-bg-primary font-medium glow-card'
                : 'bg-bg-secondary hover:bg-bg-tertiary border-border-primary text-text-secondary hover:text-text-primary'
            }`}
          >
            [2] Category Directory
          </button>
          <button
            onClick={() => setActiveTab('terminal')}
            className={`px-4 py-2 rounded-lg font-mono text-xs md:text-sm transition-all duration-300 border ${
              activeTab === 'terminal'
                ? 'bg-text-accent border-text-accent text-bg-primary font-medium glow-card'
                : 'bg-bg-secondary hover:bg-bg-tertiary border-border-primary text-text-secondary hover:text-text-primary'
            }`}
          >
            [3] Interactive CLI
          </button>
        </div>

        {/* Visualization Content Switcher */}
        <div className="relative min-h-[500px]">
          {/* Tab 1: Interactive Neural Map */}
          {activeTab === 'graph' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="glass-panel rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center relative min-h-[550px]"
            >
              <div className="absolute top-4 left-6 text-xs text-text-secondary font-mono flex items-center gap-1">
                <span>[Neural Cluster map - Hover to inspect linkages]</span>
              </div>
              
              {/* Core SVG node paths */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                {connections.map((c, i) => {
                  const isHovered = hoveredNode && (hoveredNode.name === c.from.name || hoveredNode.name === c.to.name);
                  return (
                    <line
                      key={i}
                      x1={`${c.from.x}%`}
                      y1={`${c.from.y}%`}
                      x2={`${c.to.x}%`}
                      y2={`${c.to.y}%`}
                      stroke={isHovered ? 'var(--text-accent)' : 'var(--border-primary)'}
                      strokeWidth={isHovered ? 1.5 : 0.6}
                      className="transition-all duration-300"
                    />
                  );
                })}
              </svg>

              {/* Node items */}
              <div className="w-full h-full relative min-h-[400px]">
                {SKILL_DATA.map((node) => {
                  const isHovered = hoveredNode?.name === node.name;
                  const isLinked = hoveredNode && (
                    hoveredNode.name === node.name || 
                    connections.some(c => 
                      (c.from.name === hoveredNode.name && c.to.name === node.name) ||
                      (c.to.name === hoveredNode.name && c.from.name === node.name)
                    )
                  );
                  
                  return (
                    <motion.div
                      key={node.name}
                      style={{ left: `${node.x}%`, top: `${node.y}%` }}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
                      onMouseEnter={() => setHoveredNode(node)}
                      onMouseLeave={() => setHoveredNode(null)}
                      whileHover={{ scale: 1.15 }}
                    >
                      <div className={`px-3 py-1.5 rounded-lg border font-mono text-[10px] md:text-xs transition-all duration-300 ${
                        isHovered 
                          ? 'bg-text-accent text-bg-primary border-text-accent glow-card' 
                          : isLinked
                            ? 'bg-bg-tertiary text-text-accent border-text-accent border-opacity-50'
                            : 'bg-bg-secondary text-text-primary border-border-primary'
                      }`}>
                        {node.name}
                      </div>
                      
                      {/* Tooltip detail */}
                      {isHovered && (
                        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-bg-primary border border-border-secondary p-2.5 rounded-lg shadow-2xl text-[10px] w-36 text-center pointer-events-none z-30 font-sans">
                          <p className="font-bold text-text-primary">{node.name}</p>
                          <p className="text-text-secondary mt-0.5">{node.category}</p>
                          <p className="text-text-accent mt-0.5 font-mono">{node.level}</p>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Tab 2: Category Directory (List) */}
          {activeTab === 'list' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {CATEGORIES.map((cat) => {
                const catSkills = SKILL_DATA.filter((s) => s.category === cat.id || (cat.id === 'Frameworks' && (s.category === 'Frameworks' || s.category === 'Databases' || s.category === 'Cloud' || s.category === 'Backend')));
                const IconComponent = cat.icon;

                return (
                  <div key={cat.id} className="glass-panel rounded-2xl p-6 relative overflow-hidden group">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 rounded-lg bg-brand-glow text-text-accent border border-border-glow">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-display font-semibold text-text-primary">
                        {cat.label}
                      </h3>
                    </div>

                    <div className="space-y-4">
                      {catSkills.map((skill, idx) => {
                        // Estimate numerical levels for dynamic progress graphics
                        let pct = '85%';
                        if (skill.level === 'Expert' || skill.level === 'Certified') pct = '95%';
                        else if (skill.level === 'Intermediate') pct = '60%';

                        return (
                          <div key={idx} className="space-y-1.5">
                            <div className="flex items-center justify-between text-xs font-mono">
                              <span className="text-text-primary font-medium">{skill.name}</span>
                              <span className="text-text-secondary text-[10px]">{skill.level}</span>
                            </div>
                            <div className="w-full h-1.5 bg-bg-secondary rounded-full overflow-hidden border border-border-primary">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: pct }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: idx * 0.05 }}
                                className="h-full bg-text-accent rounded-full"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}

          {/* Tab 3: Interactive CLI Terminal */}
          {activeTab === 'terminal' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-3xl mx-auto"
            >
              <div className="mb-4 text-center">
                <span className="text-[10px] font-mono text-text-secondary bg-bg-secondary px-3 py-1.5 rounded-full border border-border-primary inline-flex items-center gap-1.5">
                  <TerminalIcon className="w-3.5 h-3.5 text-text-accent animate-pulse" /> Try commands: skills, stack, llm, backend, cloud, projects
                </span>
              </div>
              <InteractiveTerminal />
            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
};
