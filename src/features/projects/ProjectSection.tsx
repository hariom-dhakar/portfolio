import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Shield, Server, ChevronRight, Activity } from 'lucide-react';
import { GithubIcon } from '../../components/icons';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  github: string;
  problem: string;
  solution: string;
  impact: string;
  tech: string[];
  role: string;
  diagram: React.ReactNode;
}

export const ProjectSection: React.FC = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 'medinsight',
      title: 'MedInsight Agent',
      subtitle: 'Agentic RAG Medical Assistant',
      github: 'https://github.com/hariom-dhakar/MedInsight-Agent',
      role: 'Lead AI Engineer',
      problem: 'Medical diagnostic and clinical documents require 100% factual accuracy. RAG pipelines often struggle with loose chunking strategies and generate unsafe, hallucinated clinical statements.',
      solution: 'Developed a Self-RAG based medical assistant that verifies context relevance before generation. Designed a recursive document parser and custom chunking strategy over a ChromaDB store, routing queries through a FastAPI backend. Implemented Langfuse tracing to monitor latency and evaluation metrics.',
      impact: 'Significantly restricted model outputs to grounded clinical facts, eliminating hallucinated claims and enabling clinical teams to audit the reasoning pathway step-by-step.',
      tech: ['FastAPI', 'ChromaDB', 'Self-RAG', 'Langfuse', 'Hugging Face', 'Sentence-Transformers', 'Python'],
      diagram: (
        <svg viewBox="0 0 800 200" className="w-full h-auto text-text-secondary opacity-90 stroke-current fill-none">
          <g strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            {/* Steps Nodes */}
            <rect x="20" y="70" width="110" height="60" rx="6" className="fill-bg-secondary stroke-border-primary" />
            <rect x="180" y="70" width="110" height="60" rx="6" className="fill-bg-secondary stroke-border-primary" />
            <rect x="340" y="70" width="110" height="60" rx="6" className="fill-bg-secondary stroke-border-primary" />
            <rect x="500" y="70" width="110" height="60" rx="6" className="fill-bg-secondary stroke-border-primary" />
            <rect x="660" y="70" width="120" height="60" rx="6" className="fill-bg-secondary stroke-border-primary" />
            
            {/* Arrows */}
            <path d="M 130 100 L 180 100" className="stroke-text-accent" />
            <polygon points="180,100 174,97 174,103" className="fill-text-accent text-text-accent" />
            
            <path d="M 290 100 L 340 100" className="stroke-text-accent" />
            <polygon points="340,100 334,97 334,103" className="fill-text-accent text-text-accent" />

            <path d="M 450 100 L 500 100" className="stroke-text-accent" />
            <polygon points="500,100 494,97 494,103" className="fill-text-accent text-text-accent" />

            <path d="M 610 100 L 660 100" className="stroke-text-accent" />
            <polygon points="660,100 654,97 654,103" className="fill-text-accent text-text-accent" />

            {/* Texts */}
            <text x="75" y="105" dominantBaseline="middle" textAnchor="middle" className="font-mono text-[9px] fill-text-primary stroke-none font-semibold">1. Parse PDF</text>
            <text x="235" y="105" dominantBaseline="middle" textAnchor="middle" className="font-mono text-[9px] fill-text-primary stroke-none font-semibold">2. ChromaDB</text>
            <text x="395" y="105" dominantBaseline="middle" textAnchor="middle" className="font-mono text-[9px] fill-text-primary stroke-none font-semibold">3. Self-RAG</text>
            <text x="550" y="105" dominantBaseline="middle" textAnchor="middle" className="font-mono text-[9px] fill-text-primary stroke-none font-semibold">4. Grounding check</text>
            <text x="720" y="105" dominantBaseline="middle" textAnchor="middle" className="font-mono text-[9px] fill-text-primary stroke-none font-semibold">5. Verified Response</text>

            <text x="75" y="50" textAnchor="middle" className="text-[10px] fill-text-secondary stroke-none font-sans">Recursive Splitter</text>
            <text x="235" y="50" textAnchor="middle" className="text-[10px] fill-text-secondary stroke-none font-sans">Semantic Search</text>
            <text x="395" y="50" textAnchor="middle" className="text-[10px] fill-text-secondary stroke-none font-sans">Relevance Eval</text>
            <text x="550" y="50" textAnchor="middle" className="text-[10px] fill-text-secondary stroke-none font-sans">Langfuse Traces</text>
            <text x="720" y="50" textAnchor="middle" className="text-[10px] fill-text-secondary stroke-none font-sans">Structured Output</text>
          </g>
        </svg>
      )
    },
    {
      id: 'proposal',
      title: 'AI Proposal Agent',
      subtitle: 'Production Multi-Agent Proposal System',
      github: 'https://github.com/hariom-dhakar/AI-Proposal-Agent',
      role: 'Architect & Lead Backend Engineer',
      problem: 'Enterprise pitch deck and proposal compiling requires cross-referencing multiple internal files, checking business constraints, adjusting tone of voice, and compiling pixel-perfect PDFs automatically.',
      solution: 'Architected a production-grade multi-agent workspace leveraging LangGraph for governed state handoffs across 7 specialized agents (Document Analysis, Planning, Content generation, Validation, etc.). Combined a FastAPI server, FAISS retrieval index, and ReportLab PDF layout compiling. Integrated MongoDB for user state tracking.',
      impact: 'Successfully automated complete RFP and sales pitch generation workflows, eliminating manual structural verification and layout drafting.',
      tech: ['FastAPI', 'LangGraph', 'FAISS', 'Gemini APIs', 'Groq', 'ReportLab', 'MongoDB', 'Python'],
      diagram: (
        <svg viewBox="0 0 800 200" className="w-full h-auto text-text-secondary opacity-90 stroke-current fill-none">
          <g strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            {/* Steps Nodes */}
            <rect x="15" y="70" width="110" height="60" rx="6" className="fill-bg-secondary stroke-border-primary" />
            <rect x="175" y="70" width="125" height="60" rx="6" className="fill-bg-secondary stroke-border-primary" />
            <rect x="350" y="70" width="110" height="60" rx="6" className="fill-bg-secondary stroke-border-primary" />
            <rect x="510" y="70" width="110" height="60" rx="6" className="fill-bg-secondary stroke-border-primary" />
            <rect x="670" y="70" width="115" height="60" rx="6" className="fill-bg-secondary stroke-border-primary" />
            
            {/* Arrows */}
            <path d="M 125 100 L 175 100" className="stroke-text-accent" />
            <polygon points="175,100 169,97 169,103" className="fill-text-accent text-text-accent" />
            
            <path d="M 300 100 L 350 100" className="stroke-text-accent" />
            <polygon points="350,100 344,97 344,103" className="fill-text-accent text-text-accent" />

            <path d="M 460 100 L 510 100" className="stroke-text-accent" />
            <polygon points="510,100 504,97 504,103" className="fill-text-accent text-text-accent" />

            <path d="M 620 100 L 670 100" className="stroke-text-accent" />
            <polygon points="670,100 664,97 664,103" className="fill-text-accent text-text-accent" />

            {/* Texts */}
            <text x="70" y="105" dominantBaseline="middle" textAnchor="middle" className="font-mono text-[9px] fill-text-primary stroke-none font-semibold">1. Upload Docs</text>
            <text x="238" y="105" dominantBaseline="middle" textAnchor="middle" className="font-mono text-[9px] fill-text-primary stroke-none font-semibold">2. LangGraph Router</text>
            <text x="405" y="105" dominantBaseline="middle" textAnchor="middle" className="font-mono text-[9px] fill-text-primary stroke-none font-semibold">3. Content Crew</text>
            <text x="565" y="105" dominantBaseline="middle" textAnchor="middle" className="font-mono text-[9px] fill-text-primary stroke-none font-semibold">4. ReportLab compiler</text>
            <text x="728" y="105" dominantBaseline="middle" textAnchor="middle" className="font-mono text-[9px] fill-text-primary stroke-none font-semibold">5. Pitch PDF</text>

            <text x="70" y="50" textAnchor="middle" className="text-[10px] fill-text-secondary stroke-none font-sans">Multi-Enterprise</text>
            <text x="238" y="50" textAnchor="middle" className="text-[10px] fill-text-secondary stroke-none font-sans">7-Agent State Engine</text>
            <text x="405" y="50" textAnchor="middle" className="text-[10px] fill-text-secondary stroke-none font-sans">FAISS references</text>
            <text x="565" y="50" textAnchor="middle" className="text-[10px] fill-text-secondary stroke-none font-sans">Formatted Layouts</text>
            <text x="728" y="50" textAnchor="middle" className="text-[10px] fill-text-secondary stroke-none font-sans">MongoDB Persist</text>
          </g>
        </svg>
      )
    },
    {
      id: 'eda',
      title: 'EDA Analyzer',
      subtitle: 'CrewAI Multi-Agent Data Analysis Tool',
      github: 'https://github.com/hariom-dhakar', // main profile as generic fallback
      role: 'AI & Data Backend Engineer',
      problem: 'Exploratory data analysis is a labor-intensive manual phase of ML engineering. Cleaning tables, plotting distributions, and compiling business reports requires repetitive code blocks.',
      solution: 'Created a CrewAI-based multi-agent workspace routing raw dataset tables to dedicated agents (Cleaning, Visualization, and Insight generators). Built Python execution loops generating statistical reports and charts.',
      impact: 'Successfully automated raw analytical workflows for ML teams, reducing initial manual dataset analysis workloads by 70%.',
      tech: ['CrewAI', 'FastAPI', 'Pandas', 'NumPy', 'Scikit-Learn', 'Python', 'REST APIs'],
      diagram: (
        <svg viewBox="0 0 800 200" className="w-full h-auto text-text-secondary opacity-90 stroke-current fill-none">
          <g strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            {/* Steps Nodes */}
            <rect x="20" y="70" width="110" height="60" rx="6" className="fill-bg-secondary stroke-border-primary" />
            <rect x="180" y="70" width="110" height="60" rx="6" className="fill-bg-secondary stroke-border-primary" />
            <rect x="340" y="70" width="110" height="60" rx="6" className="fill-bg-secondary stroke-border-primary" />
            <rect x="500" y="70" width="110" height="60" rx="6" className="fill-bg-secondary stroke-border-primary" />
            <rect x="660" y="70" width="120" height="60" rx="6" className="fill-bg-secondary stroke-border-primary" />
            
            {/* Arrows */}
            <path d="M 130 100 L 180 100" className="stroke-text-accent" />
            <polygon points="180,100 174,97 174,103" className="fill-text-accent text-text-accent" />
            
            <path d="M 290 100 L 340 100" className="stroke-text-accent" />
            <polygon points="340,100 334,97 334,103" className="fill-text-accent text-text-accent" />

            <path d="M 450 100 L 500 100" className="stroke-text-accent" />
            <polygon points="500,100 494,97 494,103" className="fill-text-accent text-text-accent" />

            <path d="M 610 100 L 660 100" className="stroke-text-accent" />
            <polygon points="660,100 654,97 654,103" className="fill-text-accent text-text-accent" />

            {/* Texts */}
            <text x="75" y="105" dominantBaseline="middle" textAnchor="middle" className="font-mono text-[9px] fill-text-primary stroke-none font-semibold">1. Input Dataset</text>
            <text x="235" y="105" dominantBaseline="middle" textAnchor="middle" className="font-mono text-[9px] fill-text-primary stroke-none font-semibold">2. CrewAI Router</text>
            <text x="395" y="105" dominantBaseline="middle" textAnchor="middle" className="font-mono text-[9px] fill-text-primary stroke-none font-semibold">3. Cleaning agent</text>
            <text x="555" y="105" dominantBaseline="middle" textAnchor="middle" className="font-mono text-[9px] fill-text-primary stroke-none font-semibold">4. Plotting Agent</text>
            <text x="720" y="105" dominantBaseline="middle" textAnchor="middle" className="font-mono text-[9px] fill-text-primary stroke-none font-semibold">5. Insights Report</text>

            <text x="75" y="50" textAnchor="middle" className="text-[10px] fill-text-secondary stroke-none font-sans">CSV/Excel uploads</text>
            <text x="235" y="50" textAnchor="middle" className="text-[10px] fill-text-secondary stroke-none font-sans">Task delegation</text>
            <text x="395" y="50" textAnchor="middle" className="text-[10px] fill-text-secondary stroke-none font-sans">Pandas / NumPy</text>
            <text x="555" y="50" textAnchor="middle" className="text-[10px] fill-text-secondary stroke-none font-sans">Matplotlib Gen</text>
            <text x="720" y="50" textAnchor="middle" className="text-[10px] fill-text-secondary stroke-none font-sans">FastAPI backbones</text>
          </g>
        </svg>
      )
    }
  ];

  return (
    <section id="projects" className="relative py-24 px-4 border-b border-border-premium">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border-glow bg-brand-glow text-text-accent text-xs font-mono mb-4"
          >
            <Server className="w-3.5 h-3.5" /> Deployed systems
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4"
          >
            Agentic AI & Production Projects
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-text-secondary max-w-2xl mx-auto text-base md:text-lg"
          >
            Explore actual systems built, featuring complete multi-agent flows, vector search retrievers, and microservice APIs.
          </motion.p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-panel rounded-2xl p-6 flex flex-col justify-between h-full group border-border-primary hover:border-border-secondary transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono text-text-accent bg-brand-glow px-2 py-0.5 rounded border border-border-glow">
                    {project.role}
                  </span>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary hover:text-text-primary transition-colors"
                    aria-label={`View ${project.title} on GitHub`}
                  >
                    <GithubIcon className="w-5 h-5" />
                  </a>
                </div>

                <h3 className="text-xl font-display font-semibold text-text-primary mb-1">
                  {project.title}
                </h3>
                <p className="text-xs font-mono text-text-secondary mb-4">
                  {project.subtitle}
                </p>
                <p className="text-sm text-text-secondary line-clamp-4 mb-6 leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tech.slice(0, 4).map((t) => (
                    <span key={t} className="text-[9px] font-mono px-2 py-0.5 rounded bg-bg-secondary border border-border-primary text-text-secondary">
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-bg-secondary border border-border-primary text-text-tertiary">
                      +{project.tech.length - 4} more
                    </span>
                  )}
                </div>

                <button
                  onClick={() => setActiveProject(project)}
                  className="w-full py-2.5 px-4 rounded-lg bg-bg-tertiary hover:bg-bg-secondary text-text-primary border border-border-primary hover:border-border-secondary text-xs font-mono font-medium transition-all flex items-center justify-center gap-1.5"
                >
                  View Case Study <ChevronRight className="w-3.5 h-3.5 text-text-accent" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Expandable Case Study Modal */}
        <AnimatePresence>
          {activeProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
            >
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: -15 }}
                transition={{ duration: 0.3 }}
                className="bg-bg-secondary border border-border-secondary w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl"
              >
                {/* Modal Header */}
                <div className="p-6 border-b border-border-primary flex items-start justify-between bg-bg-tertiary">
                  <div>
                    <span className="text-[10px] font-mono text-text-accent uppercase tracking-wider">
                      Case Study
                    </span>
                    <h3 className="text-xl md:text-2xl font-display font-semibold text-text-primary mt-1">
                      {activeProject.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveProject(null)}
                    className="text-xs text-text-secondary hover:text-text-primary font-mono bg-bg-primary px-2.5 py-1 rounded border border-border-primary"
                  >
                    [Close]
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 md:p-8 space-y-6 overflow-y-auto max-h-[70vh]">
                  {/* Architecture Diagram Visualization */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-mono text-text-accent uppercase flex items-center gap-1">
                      <Activity className="w-3.5 h-3.5" /> Pipeline Architecture Diagram
                    </h4>
                    <div className="bg-bg-primary p-4 rounded-xl border border-border-primary overflow-x-auto">
                      <div className="min-w-[650px] py-2">
                        {activeProject.diagram}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    {/* Problem */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-mono text-text-accent uppercase">
                        The Challenge
                      </h4>
                      <p className="text-sm text-text-secondary leading-relaxed bg-bg-primary/50 p-4 rounded-xl border border-border-primary min-h-[120px]">
                        {activeProject.problem}
                      </p>
                    </div>

                    {/* Solution */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-mono text-text-accent uppercase">
                        The Solution
                      </h4>
                      <p className="text-sm text-text-secondary leading-relaxed bg-bg-primary/50 p-4 rounded-xl border border-border-primary min-h-[120px]">
                        {activeProject.solution}
                      </p>
                    </div>
                  </div>

                  {/* Impact */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-mono text-text-accent uppercase flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5" /> Performance & Business Impact
                    </h4>
                    <p className="text-sm text-text-primary font-medium leading-relaxed bg-brand-glow/30 p-4 rounded-xl border border-border-glow">
                      {activeProject.impact}
                    </p>
                  </div>

                  {/* Stack Badges */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-mono text-text-tertiary uppercase">
                      Technologies Leveraged
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {activeProject.tech.map((t) => (
                        <span key={t} className="text-xs font-mono px-3 py-1 rounded bg-bg-primary border border-border-primary text-text-primary">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-4 border-t border-border-primary bg-bg-tertiary flex justify-end gap-3">
                  <a
                    href={activeProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-bg-primary border border-border-primary text-text-primary text-xs font-mono transition-colors flex items-center gap-1.5 hover:bg-bg-secondary"
                  >
                    <GithubIcon className="w-4 h-4" /> GitHub Repository <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
