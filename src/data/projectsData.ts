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
  motivation: string;
  problem: string;
  solution: string;
  overview: string;
  implementationHighlights: string[];
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
    tagline: 'Clinical literature retrieval system with LangGraph self-correction.',
    motivation: 'Bridge the gap between raw medical literature search and clinical decision-making by eliminating ungrounded AI assertions.',
    problem: 'Manual clinical record review is slow and vulnerable to ungrounded LLM hallucinations in high-stakes medical contexts.',
    solution: 'Engineered a self-correcting multi-agent RAG workflow with LangGraph that audits medical assertions against PubMed citations.',
    overview: 'MedInsight ingests medical datasets and PubMed papers, orchestrating a 5-node agent graph with async ChromaDB vector retrieval, real-time claim auditing, and reflection fallback loops.',
    implementationHighlights: [
      'State-driven LangGraph conditional routing with self-correction retry loops.',
      'Asynchronous ChromaDB vector retrieval with domain-aware medical text splitters.',
      'Isolated Critic evaluator node classifying assertions into Supported vs Unsupported claims.'
    ],
    metrics: [
      { label: 'Agents', value: '5' },
      { label: 'Records', value: '20k+' },
      { label: 'Datasets', value: '3' },
    ],
    tech: ['LangGraph', 'ChromaDB', 'FastAPI', 'Groq'],
    github: 'https://github.com/hariom-dhakar/MedInsight-Agent',
    architecture: [
      { id: 'm1', title: 'Retrieve', description: 'Async ChromaDB search with fallback query logic.', icon: Search },
      { id: 'm2', title: 'Generate', description: 'Synthesis with inline citation tags and warnings.', icon: Cpu },
      { id: 'm3', title: 'Critic', description: 'Claim audit classifying assertions as Supported/Unsupported.', icon: ShieldCheck },
      { id: 'm4', title: 'Evaluate', description: 'Parallel scoring for groundedness and relevance.', icon: Activity },
      { id: 'm5', title: 'Reflect', description: 'Weighted confidence threshold check with retry loops.', icon: GitBranch },
    ],
    productionConsiderations: [
      { title: 'Rate Limiting', detail: 'Token-bucket gateway limits to enforce provider RPM caps.' },
      { title: 'Retry & Fallback', detail: 'Exponential backoff with jitter on database timeouts.' },
      { title: 'Observability', detail: 'Span instrumentation tracking latency and evaluation scores.' },
      { title: 'PII Sanitization', detail: 'Client-side stripping of identifiers before LLM dispatch.' },
      { title: 'Caching', detail: 'LRU caching for high-frequency terms and queries.' },
    ],
    lessonsLearned: [
      { title: 'Reflection Loops', takeaway: 'Multi-step feedback loops reduced medical hallucination rates significantly.' },
      { title: 'Semantic Chunking', takeaway: 'Medical domain-aware chunking outperformed fixed-character splitters.' },
      { title: 'Isolated Auditing', takeaway: 'Separate evaluator nodes prevented ungrounded assertions.' },
    ],
  },
  {
    id: 'proposal',
    title: 'ProposalAI',
    tagline: 'Autonomous multi-agent proposal generator with ReportLab PDF compilation.',
    motivation: 'Automate complex RFP proposal generation and cloud consumption estimation without compromising corporate document formatting standards.',
    problem: 'Enterprise teams spend days drafting complex technical proposals, estimating cloud infrastructure costs, and formatting multi-section documents.',
    solution: 'Built an autonomous multi-agent pipeline executing parallel cloud research, pricing estimation, self-auditing quality cutoffs, and ReportLab PDF compilation.',
    overview: 'ProposalAI orchestrates specialist agents to parse briefs, execute parallel ChromaDB RAG queries, estimate cloud infrastructure costs, and compile boardroom-ready portrait PDFs.',
    implementationHighlights: [
      '19-section modular proposal generation engine with real-time SSE telemetry streaming.',
      'Self-correcting audit loop with automated prompt remediation if evaluation score drops < 0.85.',
      'ReportLab two-pass NumberedCanvas engine compiling pixel-perfect corporate PDFs.'
    ],
    metrics: [
      { label: 'Proposal Sections', value: '19' },
      { label: 'Quality Cutoff', value: '0.85' },
      { label: 'Avg Latency', value: '18.5s' },
    ],
    tech: ['FastAPI', 'Groq (Llama 3.3)', 'LangChain', 'ChromaDB', 'MongoDB', 'ReportLab'],
    github: 'https://github.com/hariom-dhakar/AI-Proposal-Agent',
    architecture: [
      { id: 'p1', title: 'Parser Agent', description: 'Extracts goals, scope, and risks from client briefs.', icon: MessageSquare },
      { id: 'p2', title: 'Research & Pricing', description: 'RAG retrieval and cloud cost estimation.', icon: Database },
      { id: 'p3', title: 'Drafting Agent', description: 'Generates 19 proposal sections with markdown support.', icon: Layers },
      { id: 'p4', title: 'Evaluator Agent', description: 'Audits quality dimensions with auto-remediation if score < 0.85.', icon: ShieldCheck },
      { id: 'p5', title: 'Telemetry Engine', description: 'Streams real-time token cost and execution logs.', icon: Activity },
      { id: 'p6', title: 'Portrait PDF', description: 'Compiles corporate PDF with ReportLab two-pass page numbering.', icon: BarChart },
      { id: 'p7', title: 'Mongo Persistence', description: 'Indexes run metadata and historical audit scores.', icon: GitBranch },
    ],
    productionConsiderations: [
      { title: 'Async SSE Streaming', detail: 'Streams section generation in real-time without gateway timeouts.' },
      { title: 'Prompt Versioning', detail: 'Semantic version tags to guarantee consistent output layout.' },
      { title: 'Cost Control', detail: 'Redis price catalog cache and token cap limits.' },
      { title: 'State Persistence', detail: 'MongoDB transactions for audit trails and error recovery.' },
      { title: 'Document PDF Engine', detail: 'ReportLab NumberedCanvas for header and footer rules.' },
    ],
    lessonsLearned: [
      { title: 'Async Orchestration', takeaway: 'FastAPI async gateways were essential for multi-section processing.' },
      { title: 'Remediation Cutoffs', takeaway: 'Feedback loops caught structural gaps before compilation.' },
      { title: 'Catalog Caching', takeaway: 'Local pricing caches cut external API latency by 40%.' },
    ],
  },
  {
    id: 'eda',
    title: 'CrewAI EDA Analyzer',
    tagline: 'Tabular data profiling and analysis via multi-agent delegation.',
    motivation: 'Replace manual exploratory data analysis boilerplate with autonomous Python code generation and sandboxed statistical execution.',
    problem: 'Exploratory data analysis requires manual Python scripting for missing value imputation, correlation analysis, and chart generation.',
    solution: 'Designed a multi-agent workflow that cleans tabular datasets, engineers features, and executes sandboxed Python code to produce automated data profiling reports.',
    overview: 'CrewAI EDA Analyzer delegates data cleaning, feature engineering, and statistical chart generation to role-specialized agents executing in isolated environments.',
    implementationHighlights: [
      'Decoupled agent roles for data profiling, feature selection, and plot generation.',
      'Containerized Python execution sandbox preventing unauthorized code injection.',
      'Automated self-healing code loops that repair syntax and Pandas errors using execution tracebacks.'
    ],
    metrics: [
      { label: 'Automation', value: '70%' },
      { label: 'Agents', value: '3' },
      { label: 'Formats', value: '5+' },
    ],
    tech: ['CrewAI', 'FastAPI', 'Pandas', 'Matplotlib', 'Python'],
    github: 'https://github.com/hariom-dhakar',
    architecture: [
      { id: 'e1', title: 'Raw Dataset', description: 'CSV/JSON ingestion and initial profiling.', icon: Database },
      { id: 'e2', title: 'Data Cleaning', description: 'Missing value imputation and scaling.', icon: Settings },
      { id: 'e3', title: 'Feature Eng', description: 'Feature selection and correlation mapping.', icon: Layers },
      { id: 'e4', title: 'Agent Router', description: 'Task delegation to specialist agents.', icon: BrainCircuit },
      { id: 'e5', title: 'Code Executor', description: 'Sandboxed script execution in secure environments.', icon: Terminal },
      { id: 'e6', title: 'Viz Engine', description: 'Dynamic plot generation and statistical charts.', icon: BarChart },
      { id: 'e7', title: 'Insights Synthesis', description: 'LLM reasoning summary and executive report.', icon: Zap },
    ],
    productionConsiderations: [
      { title: 'Sandboxed Execution', detail: 'Docker containers with CPU/memory limits for user scripts.' },
      { title: 'Schema Enforcement', detail: 'Tabular validation to prevent corrupt file ingestion.' },
      { title: 'Self-Healing Code', detail: 'Error traceback feedback for automated code repairs.' },
      { title: 'Concurrency', detail: 'Async task worker queues to prevent thread starvation.' },
    ],
    lessonsLearned: [
      { title: 'Role Decoupling', takeaway: 'Separating analysis from visualization boosted throughput by 70%.' },
      { title: 'Execution Security', takeaway: 'Sandboxing python execution is mandatory to block code injection.' },
      { title: 'Imputation Quality', takeaway: 'Upstream data cleaning directly dictates reasoning accuracy.' },
    ],
  },
  {
    id: 'observability',
    title: 'LLM Observability Gateway',
    tagline: 'Inference gateway with safety guardrails and RAGAS evaluations.',
    motivation: 'Provide enterprise AI applications with high-availability model routing, threat interception, and automated RAG evaluation metrics.',
    problem: 'Production AI pipelines lack real-time visibility into prompt injection threats, model latency spikes, and evaluation scores.',
    solution: 'Developed a high-throughput inference gateway with PII masking, dynamic provider fallback routing, OpenTelemetry tracing, and RAGAS evaluations.',
    overview: 'The Observability Gateway acts as a central proxy for all LLM calls, enforcing PII sanitization, semantic fallback routing, distributed tracing, and real-time faithfulness evaluation.',
    implementationHighlights: [
      'Redis-backed rate limiting and token consumption tracking gateway.',
      'Circuit-breaker multi-provider fallback routing preventing single-vendor downtime.',
      'Asynchronous RAGAS context relevance and hallucination scoring pipeline.'
    ],
    metrics: [
      { label: 'Latency Drop', value: '45%' },
      { label: 'Faithfulness', value: '98%' },
      { label: 'Evals', value: '10k+' },
    ],
    tech: ['FastAPI', 'Langfuse', 'RAGAS', 'Docker', 'Redis'],
    github: 'https://github.com/hariom-dhakar',
    architecture: [
      { id: 'o1', title: 'Ingress Validation', description: 'API gateway payload check.', icon: MessageSquare },
      { id: 'o2', title: 'Safety Guard', description: 'PII masking and prompt injection block.', icon: Lock },
      { id: 'o3', title: 'Semantic Router', description: 'Dynamic routing to cost-optimal models.', icon: GitBranch },
      { id: 'o4', title: 'Fallback Gateway', description: 'Multi-provider fallback and retry.', icon: Cpu },
      { id: 'o5', title: 'Tracing Engine', description: 'Langfuse trace instrumentation.', icon: FileCode },
      { id: 'o6', title: 'Grounding Eval', description: 'RAGAS context relevance and faithfulness checks.', icon: CheckCircle2 },
      { id: 'o7', title: 'Secure Output', description: 'Delivery of validated response.', icon: ShieldCheck },
    ],
    productionConsiderations: [
      { title: 'Auth & Quotas', detail: 'Bearer validation and Redis-backed rate limiting.' },
      { title: 'Fallback Routing', detail: 'Circuit breakers routing to backup providers on 5xx errors.' },
      { title: 'Ingress Security', detail: 'Real-time injection filtering before model dispatch.' },
      { title: 'Distributed Tracing', detail: 'OpenTelemetry spans tracking latency and model costs.' },
    ],
    lessonsLearned: [
      { title: 'Circuit Breakers', takeaway: 'Unified fallback layers kept availability at 99.9%.' },
      { title: 'Continuous Evaluation', takeaway: 'Real-time scoring pipelines detected model drift instantly.' },
      { title: 'Edge Guardrails', takeaway: 'Intercepting payloads at the gateway prevented data leakage.' },
    ],
  },
];
