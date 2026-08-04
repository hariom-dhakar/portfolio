import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Sparkles } from 'lucide-react';

interface HistoryItem {
  command: string;
  output: React.ReactNode;
}

export const InteractiveTerminal: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: 'welcome',
      output: (
        <div className="text-text-secondary leading-relaxed">
          <p className="text-text-accent font-semibold flex items-center gap-1.5">
            <TerminalIcon className="w-4 h-4" /> Hariom Dhakar - AI & Agentic Systems Engineer
          </p>
          <p className="text-xs mt-1 text-text-tertiary">
            System loaded successfully. Type <span className="text-text-primary font-mono bg-bg-tertiary px-1 rounded">help</span> to view available terminal commands.
          </p>
        </div>
      )
    }
  ]);
  
  const terminalEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    let response: React.ReactNode;

    switch (trimmedCmd) {
      case 'help':
        response = (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 font-mono text-xs">
            <div><span className="text-text-accent">skills</span> - Listing of tech skills</div>
            <div><span className="text-text-accent">stack</span> - Core framework preferences</div>
            <div><span className="text-text-accent">llm</span> - Models and Gateway stacks</div>
            <div><span className="text-text-accent">backend</span> - Server, APIs & Data engines</div>
            <div><span className="text-text-accent">cloud</span> - Deployment & DBs</div>
            <div><span className="text-text-accent">projects</span> - Deployed agent projects</div>
            <div><span className="text-text-accent">about</span> - Professional introduction</div>
            <div><span className="text-text-accent">contact</span> - Retrieve contact links</div>
            <div><span className="text-text-accent">clear</span> - Flush screen logs</div>
          </div>
        );
        break;
      case 'skills':
        response = (
          <pre className="font-mono text-xs text-text-secondary whitespace-pre leading-relaxed">
{`Hariom's Technical Competencies
├── Languages
│   ├── Python (Expert)
│   ├── C++
│   └── SQL
├── AI / LLM
│   ├── Agentic AI & Multi-Agent Systems (CrewAI, LangGraph)
│   ├── RAG Systems & Self-RAG Grounding
│   └── Observability (RAGAS, Langfuse)
└── Frameworks & Libraries
    ├── FastAPI, REST APIs
    └── PyTorch, TensorFlow, Scikit-Learn`}
          </pre>
        );
        break;
      case 'stack':
        response = (
          <div className="font-mono text-xs leading-relaxed">
            <p className="text-text-primary font-semibold mb-1">Core Tech Stack Preference:</p>
            <p>• Language: <span className="text-text-accent">Python</span> (fast backend, rich ML package network)</p>
            <p>• Frameworks: <span className="text-text-accent">FastAPI</span>, <span className="text-text-accent">LangGraph</span>, <span className="text-text-accent">CrewAI</span></p>
            <p>• Vector Stores: <span className="text-text-accent">ChromaDB</span>, <span className="text-text-accent">FAISS</span></p>
            <p>• Persistance: <span className="text-text-accent">MongoDB</span>, <span className="text-text-accent">MySQL</span></p>
          </div>
        );
        break;
      case 'llm':
        response = (
          <div className="font-mono text-xs leading-relaxed">
            <p className="text-text-primary font-semibold mb-1">Inference & Guardrails Stack:</p>
            <p>• LLM Inference: <span className="text-text-accent">Groq</span> (Low-latency), <span className="text-text-accent">Gemini APIs</span> (Fallback & Large Context)</p>
            <p>• Frameworks: <span className="text-text-accent">LangChain</span>, <span className="text-text-accent">LangGraph Orchestrations</span></p>
            <p>• Observability: <span className="text-text-accent">Langfuse</span> (latency/trace mapping)</p>
            <p>• Evals & Guardrails: <span className="text-text-accent">RAGAS</span>, Context Grounding validation</p>
          </div>
        );
        break;
      case 'backend':
        response = (
          <div className="font-mono text-xs leading-relaxed">
            <p className="text-text-primary font-semibold mb-1">Server & Data Science Frameworks:</p>
            <p>• REST API: <span className="text-text-accent">FastAPI</span> (Scalable, async, self-documenting Swagger UI)</p>
            <p>• ML & Math: <span className="text-text-accent">Scikit-Learn</span>, <span className="text-text-accent">Pandas</span>, <span className="text-text-accent">NumPy</span></p>
            <p>• Protocols: CORS control, Bearer Auth, SSE (Server-Sent Events) streaming</p>
          </div>
        );
        break;
      case 'cloud':
        response = (
          <div className="font-mono text-xs leading-relaxed">
            <p className="text-text-primary font-semibold mb-1">Database & Infrastructure Pipelines:</p>
            <p>• Cloud Platforms: <span className="text-text-accent">Azure</span>, <span className="text-text-accent">Databricks</span> (GenAI Certified)</p>
            <p>• Containerization: <span className="text-text-accent">Docker</span>, <span className="text-text-accent">Kubernetes</span></p>
            <p>• Storage: <span className="text-text-accent">MongoDB</span>, <span className="text-text-accent">ChromaDB</span>, <span className="text-text-accent">FAISS</span>, <span className="text-text-accent">MySQL</span></p>
            <p>• Repos & Registries: GitHub Actions, Hugging Face Spaces</p>
          </div>
        );
        break;
      case 'projects':
        response = (
          <div className="font-mono text-xs space-y-2 leading-relaxed">
            <div>
              <p className="text-text-primary font-semibold">1. MedInsight Agent (Agentic RAG Medical Assistant)</p>
              <p className="text-text-secondary">Self-RAG checking, ChromaDB vector search, FastAPI backend, Langfuse trace logs.</p>
            </div>
            <div>
              <p className="text-text-primary font-semibold">2. AI Proposal Agent (7-Agent LangGraph System)</p>
              <p className="text-text-secondary">LangGraph sequential routing, FAISS matching, ReportLab PDF generators, MongoDB.</p>
            </div>
            <div>
              <p className="text-text-primary font-semibold">3. EDA Analyzer (CrewAI Data Analysis Tool)</p>
              <p className="text-text-secondary">CrewAI agent delegation, auto-cleaning, visualization, and report compile outputs.</p>
            </div>
          </div>
        );
        break;
      case 'about':
        response = (
          <p className="font-mono text-xs text-text-secondary leading-relaxed">
            Hariom Dhakar is an AI/ML and Agentic AI Engineer specializing in multi-agent orchestrations, retrieval augmented generation pipelines, and high-performance FastAPI backends. Experienced at designing scalable AI systems that automate tasks, evaluate LLM grounding, and reduce manual operations by up to 70%.
          </p>
        );
        break;
      case 'contact':
        response = (
          <div className="font-mono text-xs leading-relaxed">
            <p>• Email: <a href="mailto:harudhakar@gmail.com" className="text-text-accent hover:underline">harudhakar@gmail.com</a></p>
            <p>• Mobile: <span className="text-text-accent">+91-7737718909</span></p>
            <p>• GitHub: <a href="https://github.com/hariom-dhakar" target="_blank" rel="noopener noreferrer" className="text-text-accent hover:underline">github.com/hariom-dhakar</a></p>
            <p>• LinkedIn: <a href="https://linkedin.com/in/hariomdhakar11" target="_blank" rel="noopener noreferrer" className="text-text-accent hover:underline">linkedin.com/in/hariomdhakar11</a></p>
            <p>• Location: <span className="text-text-secondary">Jaipur, Rajasthan</span></p>
          </div>
        );
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case '':
        response = null;
        break;
      default:
        response = (
          <p className="text-xs font-mono text-red-400">
            Error: command not found: '{cmd}'. Type <span className="text-text-primary bg-bg-tertiary px-1 rounded">help</span> to view lists.
          </p>
        );
    }

    if (trimmedCmd !== '' || response !== null) {
      setHistory((prev) => [...prev, { command: cmd, output: response }]);
    }
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  return (
    <div 
      onClick={focusInput}
      className="w-full bg-[#06070a] border border-border-primary rounded-xl p-4 font-mono shadow-2xl relative overflow-hidden group cursor-text"
    >
      {/* Gloss header */}
      <div className="flex items-center justify-between pb-3 border-b border-border-primary mb-3 text-text-tertiary">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          <span className="text-[10px] ml-2 text-text-secondary flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-text-accent" /> bash - portfolio-shell
          </span>
        </div>
        <span className="text-[10px]">60 FPS GPU</span>
      </div>

      {/* Output Console Log */}
      <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
        {history.map((item, index) => (
          <div key={index} className="space-y-1">
            {item.command !== 'welcome' && (
              <div className="flex items-center gap-1.5 text-xs text-text-tertiary">
                <span className="text-text-accent font-semibold">guest@hariom-ai:~$</span>
                <span>{item.command}</span>
              </div>
            )}
            <div className="text-xs pl-2 text-text-primary">
              {item.output}
            </div>
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Input Prompt Area */}
      <div className="flex items-center gap-1.5 text-xs text-text-tertiary mt-4 pt-3 border-t border-border-primary">
        <span className="text-text-accent font-semibold shrink-0">guest@hariom-ai:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-text-primary font-mono text-xs focus:ring-0 focus:outline-none"
          placeholder="type command..."
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          aria-label="Terminal input command"
        />
      </div>
    </div>
  );
};
