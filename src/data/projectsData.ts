import {
  MessageSquare,
  Layers,
  Database,
  Search,
  Cpu,
  Activity,
  GitBranch,
  Settings,
  BarChart,
  BrainCircuit,
  ShieldCheck,
  Zap,
  Terminal,
  FileCode,
  Lock,
  CheckCircle2
} from 'lucide-react';
import type { ComponentType } from 'react';

export interface ArchitectureStep {
  id: string;
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
}

export interface Metric {
  label: string;
  value: string;
}

export interface ProjectData {
  id: string;
  title: string;
  tagline: string;
  metrics: Metric[];
  tech: string[];
  github: string;
  architecture: ArchitectureStep[];
}

export const PROJECTS_DATA: ProjectData[] = [
  {
    id: 'medinsight',
    title: 'MedInsight',
    tagline: 'Production-grade Self-RAG system with LangGraph self-correction for clinical literature',
    metrics: [
      { label: 'Agents', value: '5' },
      { label: 'Records', value: '20k+' },
      { label: 'Datasets', value: '3' },
    ],
    tech: ['LangGraph', 'ChromaDB', 'FastAPI', 'Self-RAG', 'Groq'],
    github: 'https://github.com/hariom-dhakar/MedInsight-Agent',
    architecture: [
      { id: 'm1', title: 'Retrieve', description: 'Async ChromaDB vector search with fallback context for low-correlation queries', icon: Search },
      { id: 'm2', title: 'Generate', description: 'Clinical evidence synthesis with inline citation tags and disclaimer handling', icon: Cpu },
      { id: 'm3', title: 'Critic', description: 'Granular claim audit classifying assertions as Supported or Unsupported', icon: ShieldCheck },
      { id: 'm4', title: 'Evaluate', description: 'Parallel LLM-as-a-Judge scoring for groundedness, faithfulness, and relevance', icon: Activity },
      { id: 'm5', title: 'Reflect', description: 'Weighted confidence check (≥80.0) with up to 3 retry loops back to retrieval', icon: GitBranch },
    ],
  },
  {
    id: 'proposal',
    title: 'ProposalAI',
    tagline: 'Multi-agent autonomous proposal system with self-correcting evaluation loops and PDF engine',
    metrics: [
      { label: 'Proposal Sections', value: '19' },
      { label: 'Quality Cutoff', value: '0.85' },
      { label: 'Avg Latency', value: '18.5s' },
    ],
    tech: ['FastAPI', 'Groq (Llama 3.3)', 'LangChain', 'ChromaDB', 'MongoDB', 'ReportLab'],
    github: 'https://github.com/hariom-dhakar/AI-Proposal-Agent',
    architecture: [
      { id: 'p1', title: 'Parser Agent', description: 'Extracts goals, scope, risks, and systems from raw client briefs', icon: MessageSquare },
      { id: 'p2', title: 'Research & Pricing', description: 'ChromaDB vector RAG retrieval and Azure cloud pricing estimation', icon: Database },
      { id: 'p3', title: 'Drafting Agent', description: 'Generates 19 standard proposal sections with inline markdown formatting', icon: Layers },
      { id: 'p4', title: 'Evaluator Agent', description: 'Audits 8 quality dimensions with automated remediation if score < 0.85', icon: ShieldCheck },
      { id: 'p5', title: 'Telemetry Engine', description: 'Calculates LLM token usage, per-agent USD costs, and SSE stream logs', icon: Activity },
      { id: 'p6', title: 'Portrait PDF', description: 'Compiles corporate PDF with ReportLab, NumberedCanvas, and header rules', icon: BarChart },
      { id: 'p7', title: 'Mongo Persistence', description: 'Indexes run execution metadata, audit scores, and log history', icon: GitBranch },
    ],
  },
  {
    id: 'eda',
    title: 'CrewAI EDA Analyzer',
    tagline: 'Automated exploratory data analysis with multi-agent orchestration',
    metrics: [
      { label: 'Automation', value: '70%' },
      { label: 'Agents', value: '3' },
      { label: 'Formats', value: '5+' },
    ],
    tech: ['CrewAI', 'FastAPI', 'Pandas', 'Matplotlib', 'Python'],
    github: 'https://github.com/hariom-dhakar',
    architecture: [
      { id: 'e1', title: 'Raw Dataset', description: 'CSV/JSON tabular data ingestion & profiling', icon: Database },
      { id: 'e2', title: 'Data Cleaning', description: 'Automated missing value imputation & scaling', icon: Settings },
      { id: 'e3', title: 'Feature Eng', description: 'Feature selection & correlation matrix analysis', icon: Layers },
      { id: 'e4', title: 'Agent Router', description: 'Task delegation to specialist EDA agents', icon: BrainCircuit },
      { id: 'e5', title: 'Code Executor', description: 'Sandboxed Python execution for data analysis', icon: Terminal },
      { id: 'e6', title: 'Viz Engine', description: 'Dynamic plot generation & statistical charts', icon: BarChart },
      { id: 'e7', title: 'Insights Synthesis', description: 'LLM reasoning summary & executive report', icon: Zap },
    ],
  },
  {
    id: 'observability',
    title: 'LLM Observability Gateway',
    tagline: 'Production AI guardrails, RAGAS evaluation, and multi-LLM fallback gateway',
    metrics: [
      { label: 'Latency Drop', value: '45%' },
      { label: 'Faithfulness', value: '98%' },
      { label: 'Evals', value: '10k+' },
    ],
    tech: ['FastAPI', 'Langfuse', 'RAGAS', 'Docker', 'Redis'],
    github: 'https://github.com/hariom-dhakar',
    architecture: [
      { id: 'o1', title: 'Prompt Ingress', description: 'API Gateway request interception & payload validation', icon: MessageSquare },
      { id: 'o2', title: 'Safety Guard', description: 'PII redaction & prompt injection filtering', icon: Lock },
      { id: 'o3', title: 'Semantic Router', description: 'Dynamic task routing to cost-optimal LLM model', icon: GitBranch },
      { id: 'o4', title: 'Fallback Gateway', description: 'Multi-provider inference with auto-retry logic', icon: Cpu },
      { id: 'o5', title: 'Tracing Engine', description: 'Langfuse & OpenTelemetry span telemetry logging', icon: FileCode },
      { id: 'o6', title: 'Grounding Eval', description: 'RAGAS context relevance & faithfulness scoring', icon: CheckCircle2 },
      { id: 'o7', title: 'Secure Output', description: 'Validated response delivery & metrics dashboard', icon: ShieldCheck },
    ],
  },
];
