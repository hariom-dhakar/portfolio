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
    title: 'MedInsight Agent',
    tagline: 'Multi-agent clinical AI system powered by CrewAI and Self-RAG',
    metrics: [
      { label: 'Agents', value: '4' },
      { label: 'Accuracy', value: '95%' },
      { label: 'Documents', value: '200+' },
    ],
    tech: ['CrewAI', 'LangChain', 'Llama 3', 'FAISS', 'RAG'],
    github: 'https://github.com/hariom-dhakar/MedInsight-Agent',
    architecture: [
      { id: 'm1', title: 'Patient Data', description: 'EHR ingestion and secure FHIR record parsing', icon: MessageSquare },
      { id: 'm2', title: 'Semantic Embed', description: 'Domain-specific medical term & clinical encoding', icon: Layers },
      { id: 'm3', title: 'Clinical DB', description: 'Vector search across medical literature & guidelines', icon: Database },
      { id: 'm4', title: 'Chart Retrieve', description: 'Context aggregation & patient history matching', icon: Search },
      { id: 'm5', title: 'Medical LLM', description: 'Inference on fine-tuned clinical LLM gateway', icon: Cpu },
      { id: 'm6', title: 'Verify', description: 'Protocol safety check & hallucination filter', icon: ShieldCheck },
      { id: 'm7', title: 'Assessment', description: 'Structured differential diagnosis & output', icon: Activity },
    ],
  },
  {
    id: 'proposal',
    title: 'AI Proposal Generator',
    tagline: 'Zero-shot proposal automation with intelligent multi-agent retrieval',
    metrics: [
      { label: 'Time Saved', value: '80%' },
      { label: 'Template Match', value: '95%' },
      { label: 'Sections', value: '12' },
    ],
    tech: ['LangChain', 'GPT-4', 'ChromaDB', 'DOCX', 'Jinja2'],
    github: 'https://github.com/hariom-dhakar/AI-Proposal-Agent',
    architecture: [
      { id: 'p1', title: 'RFP Input', description: 'Multi-format RFP document parsing & structural breakdown', icon: MessageSquare },
      { id: 'p2', title: 'Chunking', description: 'Structural text chunking & semantic embedding', icon: Layers },
      { id: 'p3', title: 'Archive DB', description: 'Vector query matching historical bid records', icon: Database },
      { id: 'p4', title: 'Match Retrieval', description: 'Requirement context extraction & similarity score', icon: Search },
      { id: 'p5', title: 'Orchestrate', description: 'LangGraph multi-agent section assignment', icon: GitBranch },
      { id: 'p6', title: 'Pricing Tool', description: 'Cost estimation & compliance validation tool', icon: Settings },
      { id: 'p7', title: 'Final Proposal', description: 'Compiled RFP response & ReportLab PDF export', icon: BarChart },
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
