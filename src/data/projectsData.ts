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

export interface ProductionConsideration {
  title: string;
  detail: string;
}

export interface LessonLearned {
  title: string;
  takeaway: string;
}

export interface ProjectData {
  id: string;
  title: string;
  tagline: string;
  metrics: Metric[];
  tech: string[];
  github: string;
  architecture: ArchitectureStep[];
  productionConsiderations: ProductionConsideration[];
  lessonsLearned: LessonLearned[];
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
    productionConsiderations: [
      { title: 'Rate Limiting & Throttling', detail: 'Token-bucket rate limiting at gateway level to enforce provider RPM caps during batch literature ingestion.' },
      { title: 'Retry & Fallback Strategy', detail: 'Exponential backoff with jitter on ChromaDB vector queries and automated LLM fallback on request timeouts.' },
      { title: 'Observability & Tracing', detail: 'LangSmith span instrumentation tracking per-reflection token cost, groundedness score, and retrieval latency.' },
      { title: 'HIPAA & PII Sanitization', detail: 'Client-side stripping of patient identifiers prior to dispatching prompt payloads to external LLM endpoints.' },
      { title: 'Caching Layer', detail: 'Redis caching for high-frequency medical terminology embeddings and repeated clinical literature queries.' },
    ],
    lessonsLearned: [
      { title: 'Reflection Loops vs Single Pass', takeaway: 'Single-pass prompt engineering was insufficient for clinical accuracy; multi-step LangGraph reflection loops reduced hallucination rates significantly.' },
      { title: 'Domain Chunking Strategy', takeaway: 'Vector retrieval quality depended heavily on medical domain-aware chunking over generic fixed-character splitters.' },
      { title: 'Isolated Critic Auditing', takeaway: 'Groundedness scoring via an isolated critic agent prevented unsupported medical assertions from reaching the final output.' },
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
    productionConsiderations: [
      { title: 'Async SSE Streaming', detail: 'Server-Sent Events (SSE) with background task queues to stream real-time section generation without HTTP timeouts.' },
      { title: 'Prompt Versioning', detail: 'Immutable prompt templates stored with semantic version tags to guarantee consistent 19-section PDF structure.' },
      { title: 'Caching & Cost Control', detail: 'Redis caching for Azure pricing catalogs and token usage caps per section to prevent budget overruns.' },
      { title: 'State & Persistence', detail: 'MongoDB transaction indexing for execution audit trails, draft recovery, and automated error rollbacks.' },
      { title: 'Document PDF Engine', detail: 'ReportLab NumberedCanvas for dynamic two-pass page numbering and multi-page corporate header rendering.' },
    ],
    lessonsLearned: [
      { title: 'Async Non-Blocking Architecture', takeaway: 'Async FastAPI gateways were essential for orchestrating multi-agent workflows spanning 19 sections without blocking the main event loop.' },
      { title: 'Automated Remediation Cutoffs', takeaway: 'Automated quality scoring with remediation thresholds (< 0.85) caught structural gaps before rendering final PDFs.' },
      { title: 'Catalog Caching', takeaway: 'Caching static cloud pricing data reduced external API latency by 40% and stabilized cost estimation calculations.' },
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
    productionConsiderations: [
      { title: 'Sandboxed Python Execution', detail: 'Isolated Docker execution environment with strict CPU/memory limits to safely run generated Python data analysis scripts.' },
      { title: 'Input Schema Enforcement', detail: 'Tabular file schema verification (CSV/JSON) and column profiling to catch corrupt or malicious uploads.' },
      { title: 'Self-Healing Code Execution', detail: 'Execution error traceback capture fed back to the Python agent for automated script repair upon runtime exceptions.' },
      { title: 'Worker Pool Concurrency', detail: 'Asynchronous task worker pools to process concurrent data profiling jobs without thread starvation.' },
    ],
    lessonsLearned: [
      { title: 'Decoupled Agent Responsibilities', takeaway: 'Decoupling raw data profiling from visual chart synthesis allowed specialist agents to work in parallel, improving throughput by 70%.' },
      { title: 'Execution Sandboxing', takeaway: 'Sandboxing Python execution was mandatory to prevent arbitrary code execution vulnerabilities during automated script generation.' },
      { title: 'Imputation Impact', takeaway: 'Upstream data cleaning and null-value imputation quality directly dictated the accuracy of downstream LLM statistical insights.' },
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
    productionConsiderations: [
      { title: 'Authentication & Tenant Quotas', detail: 'Bearer token validation and tenant-based token bucket rate limiting at gateway ingress via Redis.' },
      { title: 'Multi-Provider Fallback Routing', detail: 'Circuit breaker logic routing prompts to secondary LLM endpoints if primary model latency spikes or returns 5xx errors.' },
      { title: 'Ingress Security & Guardrails', detail: 'Real-time PII masking and prompt injection detection before forwarding payloads to inference providers.' },
      { title: 'Distributed Telemetry & Evals', detail: 'OpenTelemetry span tracing with automated RAGAS context relevance and faithfulness scoring dashboards.' },
    ],
    lessonsLearned: [
      { title: 'Circuit Breaker Fallbacks', takeaway: 'A unified gateway layer with automated model fallback improved overall API availability to 99.9% despite upstream provider outages.' },
      { title: 'Continuous Grounding Evals', takeaway: 'Real-time RAGAS evaluation pipelines were crucial for detecting hallucination drift across model provider updates.' },
      { title: 'Ingress Guardrails', takeaway: 'Adding prompt injection guardrails at ingress prevented system prompt leaks and malicious jailbreak attempts.' },
    ],
  },
];
