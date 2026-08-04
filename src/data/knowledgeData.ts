export interface TechnologyNode {
  id: string;
  name: string;
  categoryId: string;
  categoryName: string;
  level: 'Expert' | 'Advanced' | 'Certified' | 'Intermediate';
  years: string;
  description: string;
  usage: string;
  codeSnippet: string;
  keyConcepts: string[];
  projects: string[];
  relatedTech: string[];
  certifications?: string;
  github?: string;
}

export interface CategoryFolder {
  id: string;
  name: string;
  iconName: string;
  items: TechnologyNode[];
}

export const KNOWLEDGE_TREE_DATA: CategoryFolder[] = [
  {
    id: 'ai-llm',
    name: 'AI & LLM',
    iconName: 'Cpu',
    items: [
      {
        id: 'crewai',
        name: 'CrewAI',
        categoryId: 'ai-llm',
        categoryName: 'AI & LLM',
        level: 'Expert',
        years: '6+ months',
        description: 'Autonomous multi-agent orchestration framework for delegating complex tasks to specialized AI agent roles.',
        usage: 'Building production-grade multi-agent teams where autonomous agents collaborate sequentially or hierarchically with custom tool delegation.',
        codeSnippet: `from crewai import Agent, Task, Crew, Process

researcher = Agent(
    role='Medical Researcher',
    goal='Analyze FHIR records & clinical literature',
    backstory='Specialized clinical AI agent trained on medical protocols.',
    verbose=True
)

task = Task(
    description='Extract patient symptoms and query vector store.',
    agent=researcher
)

crew = Crew(agents=[researcher], tasks=[task], process=Process.sequential)`,
        keyConcepts: ['Role Delegation', 'Sequential Handoffs', 'Custom Tools', 'Memory Persistence'],
        projects: ['MedInsight Agent', 'CrewAI EDA Analyzer'],
        relatedTech: ['python', 'fastapi', 'langchain', 'openai'],
        github: 'https://github.com/hariom-dhakar/MedInsight-Agent'
      },
      {
        id: 'langchain',
        name: 'LangChain',
        categoryId: 'ai-llm',
        categoryName: 'AI & LLM',
        level: 'Expert',
        years: '1+ yrs',
        description: 'Framework for constructing context-aware LLM chains, custom document retrievers, and prompt templates.',
        usage: 'Structuring RAG pipelines, parsing multi-format documents, and connecting vector stores with multi-provider LLMs.',
        codeSnippet: `from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain.chains import create_retrieval_chain

embeddings = OpenAIEmbeddings()
vectorstore = FAISS.load_local("index", embeddings)
retriever = vectorstore.as_retriever(search_kwargs={"k": 4})
chain = create_retrieval_chain(retriever, ChatOpenAI(model="gpt-4o"))`,
        keyConcepts: ['Retrieval Chains', 'Document Loaders', 'Prompt Templates', 'Vector Retrievers'],
        projects: ['AI Proposal Generator', 'MedInsight Agent'],
        relatedTech: ['langgraph', 'rag', 'faiss', 'chromadb', 'openai'],
        github: 'https://github.com/hariom-dhakar/AI-Proposal-Agent'
      },
      {
        id: 'langgraph',
        name: 'LangGraph',
        categoryId: 'ai-llm',
        categoryName: 'AI & LLM',
        level: 'Expert',
        years: '1+ yrs',
        description: 'Stateful, cyclic multi-agent graph framework governing complex agent handoffs and document workflows.',
        usage: 'Architecting proposal generation graphs with governed loops, approval nodes, and parallel section processing.',
        codeSnippet: `from langgraph.graph import StateGraph, END

builder = StateGraph(ProposalState)
builder.add_node("analyzer", analyze_rfp)
builder.add_node("writer", generate_sections)
builder.add_edge("analyzer", "writer")
builder.add_edge("writer", END)
graph = builder.compile()`,
        keyConcepts: ['Stateful Graphs', 'Cyclic Handoffs', 'Human-in-the-Loop', 'Parallel Execution'],
        projects: ['AI Proposal Generator'],
        relatedTech: ['langchain', 'crewai', 'python', 'fastapi'],
        github: 'https://github.com/hariom-dhakar/AI-Proposal-Agent'
      },
      {
        id: 'rag',
        name: 'Self-RAG',
        categoryId: 'ai-llm',
        categoryName: 'AI & LLM',
        level: 'Expert',
        years: '1+ yrs',
        description: 'Retrieval-Augmented Generation architecture enhanced with self-reflection and hallucination filtering.',
        usage: 'Constraining clinical assistant responses to verified medical documents to ensure zero-hallucination outputs.',
        codeSnippet: `# Self-RAG Grounding & Reflection Check
def evaluate_grounding(context: str, generation: str) -> bool:
    score = ragas_evaluator.measure_faithfulness(context, generation)
    return score >= 0.95  # Reject ungrounded claims`,
        keyConcepts: ['Context Grounding', 'Self-Reflection', 'Hallucination Filter', 'RAGAS Evals'],
        projects: ['MedInsight Agent'],
        relatedTech: ['langchain', 'faiss', 'chromadb', 'huggingface'],
        github: 'https://github.com/hariom-dhakar/MedInsight-Agent'
      },
      {
        id: 'faiss',
        name: 'FAISS',
        categoryId: 'ai-llm',
        categoryName: 'AI & LLM',
        level: 'Expert',
        years: '1+ yrs',
        description: 'High-density vector indexing library developed by Meta AI for fast similarity search.',
        usage: 'Indexing historical RFP bid records and clinical guidelines for millisecond semantic retrieval.',
        codeSnippet: `import faiss
import numpy as np

dimension = 1536
index = faiss.IndexFlatIP(dimension)  # Inner product for cosine similarity
faiss.normalize_L2(vectors)
index.add(vectors)`,
        keyConcepts: ['Dense Vector Search', 'Cosine Distance', 'Flat Indexing', 'L2 Normalization'],
        projects: ['MedInsight Agent', 'AI Proposal Generator'],
        relatedTech: ['chromadb', 'rag', 'langchain', 'python']
      },
      {
        id: 'chromadb',
        name: 'ChromaDB',
        categoryId: 'ai-llm',
        categoryName: 'AI & LLM',
        level: 'Advanced',
        years: '1+ yrs',
        description: 'Open-source vector database built for AI embeddings and fast semantic document queries.',
        usage: 'Storing embedded document chunks with rich metadata filtering for multi-enterprise proposal generation.',
        codeSnippet: `import chromadb

client = chromadb.PersistentClient(path="./chroma_db")
collection = client.get_or_create_collection(name="rfp_chunks")
collection.add(
    documents=["RFP section text..."],
    metadatas=[{"section": "pricing"}],
    ids=["chunk_01"]
)`,
        keyConcepts: ['Persistent Vector Storage', 'Metadata Filtering', 'Document Embedding'],
        projects: ['AI Proposal Generator'],
        relatedTech: ['faiss', 'langchain', 'rag', 'python']
      },
      {
        id: 'huggingface',
        name: 'HuggingFace & Transformers',
        categoryId: 'ai-llm',
        categoryName: 'AI & LLM',
        level: 'Advanced',
        years: '1+ yrs',
        description: 'Open-source model hub and PyTorch transformers library for local LLM inference and fine-tuning.',
        usage: 'Fine-tuning domain-specific open models (Llama 3, Mistral) using LoRA / QLoRA parameter-efficient adapters.',
        codeSnippet: `from transformers import AutoModelForCausalLM, AutoTokenizer

model_id = "meta-llama/Meta-Llama-3-8B-Instruct"
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(model_id, device_map="auto")`,
        keyConcepts: ['Open Models', 'LoRA / QLoRA', 'Tokenization', 'Local Inference'],
        projects: ['MedInsight Agent'],
        relatedTech: ['python', 'pytorch', 'rag', 'openai']
      }
    ]
  },
  {
    id: 'languages',
    name: 'Languages',
    iconName: 'Code',
    items: [
      {
        id: 'python',
        name: 'Python',
        categoryId: 'languages',
        categoryName: 'Languages',
        level: 'Expert',
        years: '2+ yrs',
        description: 'Core programming language for AI agent systems, machine learning, data engineering, and backend services.',
        usage: 'Building multi-agent workflows, data processing engines, FastAPI microservices, and RAG systems.',
        codeSnippet: `@dataclass(frozen=True)
class AgentConfig:
    name: str
    model: str = "gpt-4o"
    temperature: float = 0.2
    
async def run_pipeline(config: AgentConfig) -> dict:
    # Async execution engine
    pass`,
        keyConcepts: ['AsyncIO', 'Type Hinting', 'Data Classes', 'Decorators', 'Generators'],
        projects: ['MedInsight Agent', 'AI Proposal Generator', 'CrewAI EDA Analyzer', 'LLM Gateway'],
        relatedTech: ['fastapi', 'crewai', 'langchain', 'pandas']
      },
      {
        id: 'cpp',
        name: 'C++',
        categoryId: 'languages',
        categoryName: 'Languages',
        level: 'Advanced',
        years: '3+ yrs',
        description: 'Low-level language for memory-efficient algorithms, data structures, and competitive problem solving.',
        usage: 'Solving 500+ LeetCode/HackerRank DSA problems with optimal time & space complexity constraints.',
        codeSnippet: `template<typename T>
class VectorSearch {
    std::vector<T> data;
public:
    void insert(const T& val) { data.push_back(val); }
    auto find_binary(const T& target) {
        return std::lower_bound(data.begin(), data.end(), target);
    }
};`,
        keyConcepts: ['STL Containers', 'Pointers & Memory', 'Binary Search', 'Algorithm Complexity'],
        projects: ['500+ LeetCode Solved'],
        relatedTech: ['python', 'sql']
      },
      {
        id: 'sql',
        name: 'SQL',
        categoryId: 'languages',
        categoryName: 'Languages',
        level: 'Advanced',
        years: '2+ yrs',
        description: 'Standard language for querying, indexing, and structuring relational database systems.',
        usage: 'Writing optimized queries, window functions, and joining relational schemas for analytics.',
        codeSnippet: `SELECT 
    p.project_name, 
    COUNT(a.agent_id) AS agent_count,
    AVG(a.execution_time_ms) AS avg_latency
FROM projects p
JOIN agents a ON p.id = a.project_id
GROUP BY p.project_name
HAVING COUNT(a.agent_id) > 2;`,
        keyConcepts: ['Window Functions', 'Indexing Strategies', 'Complex Joins', 'Query Optimization'],
        projects: ['Enterprise DB Systems'],
        relatedTech: ['postgresql', 'python', 'fastapi']
      }
    ]
  },
  {
    id: 'backend',
    name: 'Backend',
    iconName: 'Server',
    items: [
      {
        id: 'fastapi',
        name: 'FastAPI',
        categoryId: 'backend',
        categoryName: 'Backend',
        level: 'Expert',
        years: '2+ yrs',
        description: 'High-performance, asynchronous Python web framework for building modern REST APIs.',
        usage: 'Exposing asynchronous LLM gateway endpoints, streaming server-sent events, and background agent execution.',
        codeSnippet: `from fastapi import FastAPI, BackgroundTasks
from pydantic import BaseModel

app = FastAPI(title="LLM Gateway API")

class PromptRequest(BaseModel):
    query: str
    temperature: float = 0.2

@app.post("/v1/agent/query")
async def dispatch_agent(req: PromptRequest):
    result = await agent_runner.process(req.query)
    return {"status": "success", "data": result}`,
        keyConcepts: ['Pydantic Validation', 'Async Route Handlers', 'Dependency Injection', 'OpenAPI Specs'],
        projects: ['MedInsight Agent', 'AI Proposal Generator', 'CrewAI EDA Analyzer'],
        relatedTech: ['python', 'redis', 'docker']
      },
      {
        id: 'rest-apis',
        name: 'REST APIs',
        categoryId: 'backend',
        categoryName: 'Backend',
        level: 'Expert',
        years: '2+ yrs',
        description: 'Architectural style for designing stateless, predictable, and scalable web endpoints.',
        usage: 'Designing enterprise microservice APIs supporting multi-enterprise document ingestion and LLM routing.',
        codeSnippet: `# RESTful Resource Routing Standard
GET    /api/v1/proposals          # List proposals
POST   /api/v1/proposals          # Create proposal
GET    /api/v1/proposals/{id}     # Retrieve detail
DELETE /api/v1/proposals/{id}     # Remove proposal`,
        keyConcepts: ['Stateless Routing', 'HTTP Status Codes', 'JSON Serialization', 'Rate Limiting'],
        projects: ['MedInsight Agent', 'AI Proposal Generator'],
        relatedTech: ['fastapi', 'python', 'docker']
      },
      {
        id: 'redis',
        name: 'Redis',
        categoryId: 'backend',
        categoryName: 'Backend',
        level: 'Advanced',
        years: '1+ yrs',
        description: 'In-memory data structure store used as a high-speed database, cache, and message broker.',
        usage: 'Caching LLM prompt responses to cut latency by 45% and managing session rate limits.',
        codeSnippet: `import redis.asyncio as aioredis

redis_client = aioredis.from_url("redis://localhost")

async def get_cached_llm_response(prompt_hash: str):
    cached = await redis_client.get(f"llm:{prompt_hash}")
    return cached.decode() if cached else None`,
        keyConcepts: ['In-Memory Caching', 'TTL Expiration', 'Pub/Sub Messaging', 'Rate Limiting'],
        projects: ['LLM Gateway'],
        relatedTech: ['fastapi', 'python', 'docker']
      }
    ]
  },
  {
    id: 'cloud-data',
    name: 'Cloud & Data',
    iconName: 'Cloud',
    items: [
      {
        id: 'databricks',
        name: 'Databricks',
        categoryId: 'cloud-data',
        categoryName: 'Cloud & Data',
        level: 'Certified',
        years: '1+ yrs',
        description: 'Enterprise unified data analytics and AI platform for lakehouse architectures.',
        certifications: 'Databricks Certified Generative AI Engineer Associate',
        usage: 'Building generative AI data pipelines, evaluating LLMs, and managing enterprise Spark workloads.',
        codeSnippet: `# Databricks MLflow LLM Tracking
import mlflow

with mlflow.start_run(run_name="llama3_eval"):
    mlflow.log_param("temperature", 0.2)
    mlflow.log_metric("ragas_faithfulness", 0.96)
    mlflow.register_model(model_uri, "MedicalAgentLlama3")`,
        keyConcepts: ['Delta Lakehouse', 'MLflow Tracking', 'GenAI Associate Certified', 'Spark Jobs'],
        projects: ['Databricks Certified GenAI Engineer'],
        relatedTech: ['azure', 'python', 'sql']
      },
      {
        id: 'azure',
        name: 'Azure AI & Cloud',
        categoryId: 'cloud-data',
        categoryName: 'Cloud & Data',
        level: 'Advanced',
        years: '1+ yrs',
        description: 'Microsoft Azure cloud services for deploying secure AI workloads, Key Vault, and app gateways.',
        usage: 'Provisioning cloud resources, managing secrets with Azure Key Vault, and hosting containerized services.',
        codeSnippet: `# Azure Key Vault Secret Access
from azure.identity import DefaultAzureCredential
from azure.keyvault.secrets import SecretClient

vault_url = "https://ai-vault.vault.azure.net/"
client = SecretClient(vault_url=vault_url, credential=DefaultAzureCredential())
openai_key = client.get_secret("OPENAI-API-KEY").value`,
        keyConcepts: ['Key Vault Secrets', 'App Services', 'DefaultAzureCredential', 'Cloud Gateways'],
        projects: ['Celebal Technologies Projects'],
        relatedTech: ['databricks', 'docker', 'python']
      },
      {
        id: 'postgresql',
        name: 'PostgreSQL',
        categoryId: 'cloud-data',
        categoryName: 'Cloud & Data',
        level: 'Advanced',
        years: '6+ months',
        description: 'Powerful open-source relational database with support for JSONB and vector extensions (pgvector).',
        usage: 'Persisting relational application data, user accounts, and document metadata for agent workloads.',
        codeSnippet: `CREATE TABLE proposal_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rfp_title VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'processing',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`,
        keyConcepts: ['ACID Compliance', 'JSONB Storage', 'pgvector', 'Schema Design'],
        projects: ['Backend Relational DB'],
        relatedTech: ['sql', 'fastapi', 'python']
      }
    ]
  },
  {
    id: 'deployment',
    name: 'Deployment',
    iconName: 'Container',
    items: [
      {
        id: 'docker',
        name: 'Docker',
        categoryId: 'deployment',
        categoryName: 'Deployment',
        level: 'Expert',
        years: '2+ yrs',
        description: 'Containerization platform for packaging applications and dependencies into isolated runtimes.',
        usage: 'Creating lightweight multi-stage Docker containers for FastAPI LLM backends and agent microservices.',
        codeSnippet: `FROM python:3.11-slim as builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]`,
        keyConcepts: ['Multi-Stage Builds', 'Container Isolation', 'Docker Compose', 'Image Optimization'],
        projects: ['MedInsight Agent', 'AI Proposal Generator', 'CrewAI EDA Analyzer'],
        relatedTech: ['kubernetes', 'fastapi', 'python', 'git']
      },
      {
        id: 'git',
        name: 'Git & GitHub Actions',
        categoryId: 'deployment',
        categoryName: 'Deployment',
        level: 'Expert',
        years: '3+ yrs',
        description: 'Distributed version control and automated CI/CD pipeline engine for continuous integration.',
        usage: 'Managing codebase version history, feature branching, and automated CI/CD build & test workflows.',
        codeSnippet: `name: CI Pipeline
on: [push, pull_request]
jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run PyTest
        run: pytest tests/`,
        keyConcepts: ['Branching Models', 'CI/CD Automation', 'GitHub Workflows', 'Pull Request Review'],
        projects: ['All Portfolio Repositories'],
        relatedTech: ['docker', 'python', 'typescript'],
        github: 'https://github.com/hariom-dhakar'
      },
      {
        id: 'kubernetes',
        name: 'Kubernetes',
        categoryId: 'deployment',
        categoryName: 'Deployment',
        level: 'Advanced',
        years: '1+ yrs',
        description: 'Container orchestration engine for automating deployment, scaling, and management of containerized apps.',
        usage: 'Orchestrating multi-node agent service pods with auto-scaling and ingress load balancing.',
        codeSnippet: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: llm-gateway-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: llm-gateway`,
        keyConcepts: ['Pod Scaling', 'Ingress Routing', 'Service Discovery', 'Rolling Updates'],
        projects: ['Microservice Deployments'],
        relatedTech: ['docker', 'fastapi', 'azure']
      }
    ]
  },
  {
    id: 'machine-learning',
    name: 'Machine Learning',
    iconName: 'BarChart3',
    items: [
      {
        id: 'pandas',
        name: 'Pandas & NumPy',
        categoryId: 'machine-learning',
        categoryName: 'Machine Learning',
        level: 'Expert',
        years: '2+ yrs',
        description: 'Data manipulation and numerical computation libraries for structured data processing.',
        usage: 'Automating data cleaning, feature extraction, and matrix computations in the CrewAI EDA Analyzer.',
        codeSnippet: `import pandas as pd
import numpy as np

def profile_dataset(df: pd.DataFrame) -> dict:
    missing = df.isnull().sum()
    correlations = df.corr(numeric_only=True)
    return {"missing": missing.to_dict(), "corr": correlations}`,
        keyConcepts: ['DataFrames', 'Vectorized Operations', 'Missing Value Imputation', 'Feature Engineering'],
        projects: ['CrewAI EDA Analyzer'],
        relatedTech: ['python', 'scikit-learn', 'fastapi']
      },
      {
        id: 'scikit-learn',
        name: 'Scikit-Learn',
        categoryId: 'machine-learning',
        categoryName: 'Machine Learning',
        level: 'Advanced',
        years: '2+ yrs',
        description: 'Machine learning library for classification, regression, clustering, and data preprocessing.',
        usage: 'Fitting baseline predictive models and running feature selection algorithms during dataset analysis.',
        codeSnippet: `from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
clf = RandomForestClassifier(n_estimators=100)
clf.fit(X_train, y_train)
score = clf.score(X_test, y_test)`,
        keyConcepts: ['Random Forests', 'Train/Test Split', 'Feature Scaling', 'Model Metrics'],
        projects: ['CrewAI EDA Analyzer'],
        relatedTech: ['python', 'pandas', 'pytorch']
      },
      {
        id: 'pytorch',
        name: 'PyTorch',
        categoryId: 'machine-learning',
        categoryName: 'Machine Learning',
        level: 'Advanced',
        years: '1+ yrs',
        description: 'Open-source machine learning framework for deep learning and neural network computation.',
        usage: 'Running tensor computations, embedding model inference, and experimenting with deep learning architectures.',
        codeSnippet: `import torch
import torch.nn as nn

class ResidualBlock(nn.Module):
    def __init__(self, dim: int):
        super().__init__()
        self.fc = nn.Linear(dim, dim)
        self.relu = nn.ReLU()
    def forward(self, x):
        return x + self.relu(self.fc(x))`,
        keyConcepts: ['Tensor Operations', 'Autograd', 'Neural Networks', 'GPU Acceleration'],
        projects: ['ML Experiments'],
        relatedTech: ['python', 'huggingface', 'scikit-learn']
      }
    ]
  }
];
