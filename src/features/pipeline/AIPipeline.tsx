import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  MessageSquare,
  Layers,
  Database,
  Search,
  Cpu,
  GitBranch,
  Settings,
  CheckCircle,
  BarChart,
  Activity
} from 'lucide-react';

const PIPELINES = {
  production: [
    { id: 'q', label: 'Query Input', desc: 'User intent parsed and semantic search initialized', icon: MessageSquare },
    { id: 'emb', label: 'Embedding', desc: 'Text converted to high-dimensional vector representations', icon: Layers },
    { id: 'vec', label: 'Vector Search', desc: 'Approximate Nearest Neighbor (ANN) query executed', icon: Database },
    { id: 'ret', label: 'Retrieval', desc: 'Relevant context slices aggregated from knowledge base', icon: Search },
    { id: 'llm', label: 'LLM Gateway', desc: 'Dynamic model selection and API routing', icon: Cpu },
    { id: 'orch', label: 'Orchestration', desc: 'Multi-agent planning and task breakdown', icon: GitBranch },
    { id: 'tool', label: 'Execution', desc: 'External tool use, API integrations, and sandboxed runtimes', icon: Settings },
    { id: 'eval', label: 'Evaluation', desc: 'Output verified against safety and factual alignment policies', icon: CheckCircle },
    { id: 'res', label: 'Response', desc: 'Final structured output streamed back to client', icon: BarChart },
  ],
  medinsight: [
    { id: 'm1', label: 'Patient Data', desc: 'EHR ingestion and secure FHIR record extraction', icon: MessageSquare },
    { id: 'm2', label: 'Semantic Embed', desc: 'Domain-specific medical term encoding', icon: Layers },
    { id: 'm3', label: 'Clinical DB', desc: 'Vector storage query across medical literature bases', icon: Database },
    { id: 'm4', label: 'Chart Retrieve', desc: 'Patient history matching and context retrieval', icon: Search },
    { id: 'm5', label: 'Medical LLM', desc: 'Inference run on fine-tuned clinical model', icon: Cpu },
    { id: 'm6', label: 'Verify', desc: 'Validation against medical guidelines and benchmarks', icon: CheckCircle },
    { id: 'm7', label: 'Assessment', desc: 'Differential diagnosis options and report output', icon: Activity },
  ],
  proposal: [
    { id: 'p1', label: 'RFP Input', desc: 'RFP document ingestion and structure analysis', icon: MessageSquare },
    { id: 'p2', label: 'Chunking', desc: 'Structural text chunking and contextual embedding', icon: Layers },
    { id: 'p3', label: 'Archive DB', desc: 'Vector query matching historical bid records', icon: Database },
    { id: 'p4', label: 'Match Retrieval', desc: 'Retrieval of matching requirements and past proposals', icon: Search },
    { id: 'p5', label: 'Orchestrate', desc: 'Section assignment to specialist generator agents', icon: GitBranch },
    { id: 'p6', label: 'Pricing Tool', desc: 'Pricing model validation and cost estimation tool run', icon: Settings },
    { id: 'p7', label: 'Final Proposal', desc: 'Compilation of polished RFP response document', icon: BarChart },
  ]
};

type PipelineType = keyof typeof PIPELINES;

export default function AIPipeline() {
  const [activeTab, setActiveTab] = useState<PipelineType>('production');
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabChange = (tab: PipelineType) => {
    setActiveTab(tab);
    setActiveIndex(0);
  };

  const currentPipeline = PIPELINES[activeTab];

  return (
    <section className="relative w-full bg-[var(--bg-primary)] selection:bg-cyan-900 py-16 md:py-24 border-t border-[var(--border-primary)]">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="z-10 w-full max-w-7xl mx-auto px-6 md:px-12 relative">
        
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-12">
          <h2 className="text-[clamp(2.2rem,5vw,4.5rem)] font-display font-light text-center tracking-tighter">
            System <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">Architecture</span>
          </h2>
          <div className="mt-4 h-px w-24 bg-gradient-to-r from-cyan-500 to-transparent" />
        </div>

        {/* Controls */}
        <div className="mb-12 flex flex-wrap justify-center gap-2">
          <TabButton 
            active={activeTab === 'production'} 
            onClick={() => handleTabChange('production')}
          >
            Production Pipeline
          </TabButton>
          <TabButton 
            active={activeTab === 'medinsight'} 
            onClick={() => handleTabChange('medinsight')}
          >
            MedInsight Agent
          </TabButton>
          <TabButton 
            active={activeTab === 'proposal'} 
            onClick={() => handleTabChange('proposal')}
          >
            AI Proposal System
          </TabButton>
        </div>

        {/* Side-by-side Layout */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start relative w-full">
          
          {/* Left Side: Sticky Architecture Diagram */}
          <div className="w-full lg:w-[45%] lg:sticky lg:top-24 h-auto lg:h-[70vh] flex flex-col justify-center items-center py-6 border border-[var(--border-primary)] lg:border-none bg-neutral-950/20 lg:bg-transparent rounded-2xl p-4 lg:p-0">
            <ArchitectureDiagram 
              pipeline={currentPipeline} 
              activeIndex={activeIndex} 
            />
          </div>

          {/* Right Side: Scrollable explanation cards */}
          <div className="w-full lg:w-[55%] flex flex-col gap-6 lg:gap-10 pb-12 lg:pb-24">
            {currentPipeline.map((stage, idx) => (
              <StepCard 
                key={`${activeTab}-${stage.id}`}
                stage={stage}
                index={idx}
                setActiveIndex={setActiveIndex}
                isActive={activeIndex === idx}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

function TabButton({ active, onClick, children }: { active: boolean, onClick: () => void, children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 cursor-pointer ${
        active 
          ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/40 shadow-[0_0_15px_rgba(34,211,238,0.15)]' 
          : 'bg-neutral-900/50 text-neutral-400 border border-neutral-800 hover:border-neutral-600 hover:text-neutral-200'
      }`}
    >
      {children}
    </button>
  );
}

function StepCard({ 
  stage, 
  index, 
  setActiveIndex,
  isActive
}: { 
  stage: any; 
  index: number; 
  setActiveIndex: (i: number) => void;
  isActive: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Triggers active index when card enters the viewport center
  const isInView = useInView(cardRef, {
    margin: "-35% 0px -45% 0px"
  });

  useEffect(() => {
    if (isInView) {
      setActiveIndex(index);
    }
  }, [isInView, index, setActiveIndex]);

  const Icon = stage.icon;

  return (
    <motion.div 
      ref={cardRef} 
      initial={{ opacity: 0.4, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      animate={{ 
        borderColor: isActive ? 'rgba(6, 182, 212, 0.4)' : 'rgba(255, 255, 255, 0.08)',
        boxShadow: isActive ? '0 0 25px rgba(6, 182, 212, 0.12)' : 'none',
        opacity: isActive ? 1 : 0.6
      }}
      className={`glass-card p-6 md:p-8 flex flex-col gap-3 border transition-all duration-300 relative rounded-2xl ${
        isActive ? 'bg-neutral-900/30' : 'bg-neutral-950/10'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all duration-300 ${
          isActive 
            ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' 
            : 'bg-neutral-900/50 text-neutral-500 border-neutral-800'
        }`}>
          <Icon className="w-4.5 h-4.5" />
        </div>
        <span className="font-mono text-xs text-[var(--text-tertiary)] uppercase tracking-wider">
          Step {index + 1}
        </span>
      </div>
      <h4 className={`text-lg md:text-xl font-display font-medium transition-colors duration-300 ${
        isActive ? 'text-cyan-300' : 'text-[var(--text-primary)]'
      }`}>
        {stage.label}
      </h4>
      <p className="text-xs md:text-sm text-[var(--text-secondary)] font-light leading-relaxed">
        {stage.desc}
      </p>
    </motion.div>
  );
}

function ArchitectureDiagram({ pipeline, activeIndex }: { pipeline: any[]; activeIndex: number }) {
  return (
    <div className="w-full flex justify-center items-center relative">
      {/* Desktop Vertical Flow */}
      <div className="hidden lg:flex flex-col relative w-full max-w-sm pl-12 gap-0 py-4">
        {pipeline.map((stage, idx) => {
          const Icon = stage.icon;
          const isCompleted = activeIndex >= idx;
          const isActive = activeIndex === idx;

          return (
            <div key={stage.id} className="flex items-center gap-6 relative min-h-[50px] py-1.5">
              
              {/* Connector line under the node */}
              {idx < pipeline.length - 1 && (
                <div className="absolute left-[19px] top-[34px] w-[2px] h-[34px] bg-neutral-900">
                  <motion.div
                    className="absolute top-0 left-0 right-0 bg-cyan-500 shadow-[0_0_8px_#06b6d4]"
                    initial={{ height: 0 }}
                    animate={{ height: activeIndex > idx ? '100%' : '0%' }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  />
                  {/* Traveling light dot */}
                  {activeIndex === idx + 1 && (
                    <motion.div
                      className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#fff]"
                      animate={{ top: ['0%', '100%'] }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    />
                  )}
                </div>
              )}

              {/* Node Circle */}
              <div className="relative z-10 flex items-center justify-center w-10 h-10">
                <motion.div
                  animate={{
                    borderColor: isActive 
                      ? 'rgba(6, 182, 212, 1)' 
                      : isCompleted 
                        ? 'rgba(6, 182, 212, 0.5)' 
                        : 'rgba(255, 255, 255, 0.08)',
                    scale: isActive ? 1.08 : 1,
                  }}
                  className={`w-10 h-10 rounded-xl border bg-neutral-950 flex items-center justify-center relative transition-all duration-300 ${
                    isActive ? 'shadow-[0_0_15px_rgba(6, 182, 212, 0.25)]' : ''
                  }`}
                >
                  {/* Pulsing ring for the active node */}
                  {isActive && (
                    <motion.div
                      className="absolute -inset-1.5 rounded-2xl border border-cyan-500/30"
                      animate={{ scale: [0.95, 1.15, 0.95], opacity: [0.3, 0.8, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}

                  <Icon className={`w-4 h-4 transition-colors duration-300 ${
                    isActive 
                      ? 'text-cyan-300' 
                      : isCompleted 
                        ? 'text-cyan-400/80' 
                        : 'text-neutral-600'
                  }`} />
                </motion.div>
              </div>

              {/* Node Label */}
              <motion.div 
                animate={{
                  opacity: isCompleted ? 1 : 0.4,
                  x: isActive ? 4 : 0
                }}
                className="flex flex-col text-left"
              >
                <span className={`text-xs md:text-sm font-medium transition-colors duration-300 ${
                  isActive 
                    ? 'text-cyan-400 font-semibold' 
                    : isCompleted 
                      ? 'text-neutral-200' 
                      : 'text-neutral-500'
                }`}>
                  {stage.label}
                </span>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Mobile / Tablet Horizontal Flow */}
      <div className="flex lg:hidden flex-wrap justify-center items-center gap-2 md:gap-3 w-full py-4 px-2">
        {pipeline.map((stage, idx) => {
          const Icon = stage.icon;
          const isCompleted = activeIndex >= idx;
          const isActive = activeIndex === idx;

          return (
            <div key={stage.id} className="flex items-center gap-1.5">
              <motion.div
                animate={{
                  borderColor: isActive 
                    ? 'rgba(6, 182, 212, 1)' 
                    : isCompleted 
                      ? 'rgba(6, 182, 212, 0.5)' 
                      : 'rgba(255, 255, 255, 0.08)',
                  scale: isActive ? 1.05 : 1,
                }}
                className={`w-9 h-9 rounded-lg border bg-neutral-950 flex items-center justify-center relative transition-all duration-300 ${
                  isActive ? 'shadow-[0_0_10px_rgba(6, 182, 212, 0.2)]' : ''
                }`}
              >
                <Icon className={`w-3.5 h-3.5 transition-colors duration-300 ${
                  isActive 
                    ? 'text-cyan-300' 
                    : isCompleted 
                      ? 'text-cyan-400/80' 
                      : 'text-neutral-600'
                }`} />
              </motion.div>
              
              {idx < pipeline.length - 1 && (
                <div className="w-1.5 md:w-3 h-[1px] bg-neutral-800 relative">
                  <motion.div 
                    className="absolute inset-y-0 left-0 bg-cyan-500"
                    initial={{ width: 0 }}
                    animate={{ width: activeIndex > idx ? '100%' : '0%' }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
