import React, { useEffect, useRef, memo } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
}

interface FloatingFormula {
  text: string;
  x: number;
  y: number;
  vy: number;
  alpha: number;
  size: number;
}

const MATH_SYMBOLS = [
  'QKᵀ / √dₖ',
  'Softmax(QKᵀ)V',
  'Attention(Q,K,V)',
  'MultiHead(Q,K,V)',
  'SelfAttention(x)',
  'CrossAttention(x)',
  'RoPE(x)',
  'KV Cache',
  'Top-k Sampling',
  'Top-p = 0.95',
  'Temperature = 0.7',

  'Embedding(x)',
  'e ∈ ℝ⁷⁶⁸',
  '||x||₂',
  'L2 Norm',
  'CosineSim(A,B)',
  'cos(θ)',
  'ANN Search',
  'HNSW',
  'FAISS',
  'ChromaDB',
  'Pinecone',
  'Vector → ℝ¹⁵³⁶',

  'P(y|x)',
  'argmax P(y|x)',
  'Token → Embedding',
  'Next Token',
  'BPE',
  'SentencePiece',
  'Prompt → Context',
  'Context Window',
  'RAG',
  'Self-RAG',
  'LangGraph(G,S)',
  'CrewAI',
  'Agent → Tool',
  'Reflection Loop',
  'Tool Calling',

  'P(A|B)',
  'P(A∩B)',
  'P(X=x)',
  'P(θ|D)',
  'Bayes Rule',
  'E[X]',
  'E[X|Y]',
  'Var(X)',
  'Cov(X,Y)',
  'σ²',
  'μ',
  'π(x)',
  'N(μ,σ²)',
  'Bernoulli(p)',
  'Binomial(n,p)',
  'Poisson(λ)',
  '𝓝(0,1)',

  'R²',
  'MAE',
  'MSE',
  'RMSE',
  'Cross Validation',
  'AUC',
  'ROC',
  'Precision',
  'Recall',
  'F1 Score',
  'Confusion Matrix',
  'p ≤ 0.05',
  '95% CI',

  '∇L(θ)',
  '∂L/∂W',
  'θ ← θ − η∇L',
  'AdamW',
  'SGD',
  'Learning Rate',
  'η = 0.001',
  'Weight Decay',
  'Momentum',
  'Backprop',
  'Gradient Clip',

  'Loss = ||y−ŷ||²',
  'CrossEntropy',
  'Binary CE',
  'KL Divergence',
  'Huber Loss',
  'Triplet Loss',
  'Contrastive Loss',
  'InfoNCE',
  'Perplexity',
  'BLEU',
  'ROUGE',
  'BERTScore',

  'ReLU(Wx+b)',
  'GELU(x)',
  'SiLU(x)',
  'LayerNorm',
  'BatchNorm',
  'Dropout',
  'Residual(x)',
  'MLP',
  'FFN',
  'Dense(768)',
  'Conv2D',
  'LSTM',
  'GRU',

  'Ax = b',
  'A⁻¹',
  'Aᵀ',
  'AᵀA',
  'det(A)',
  'rank(A)',
  'λ',
  'Eigenvector',
  'SVD',
  'PCA',
  'QR',
  'ℝⁿ',
  'x ∈ ℝᵈ',
  'W ∈ ℝ⁷⁶⁸ˣ⁷⁶⁸',
  'v · w',
  'x⊗y',
  '||A||F',

  'Epoch 42',
  'Batch = 64',
  'FP16',
  'BF16',
  'CUDA',
  'Mixed Precision',
  'Inference',
  'Fine-Tuning',
  'LoRA',
  'QLoRA',
  'PEFT',
  'Checkpoint',

  'Semantic Search',
  'Hybrid Search',
  'BM25',
  'Dense Retrieval',
  'Sparse Retrieval',
  'Chunk Size = 512',
  'Retriever',
  'Re-ranker',
  'MMR',
  'k = 5',

  'Planner',
  'Executor',
  'Critic',
  'Reflect',
  'Memory',
  'Tool Use',
  'Workflow DAG',
  'State Machine',
  'Agent Loop',
  'Decision Node',
  'Execution Trace',

  'MLflow',
  'Databricks',
  'Unity Catalog',
  'Delta Lake',
  'Azure OpenAI',
  'Azure ML',
  'OpenTelemetry',
  'Inference API',
  'Serving Endpoint',
  'Docker',
  'Kubernetes',
  'GPU Cluster',

  'Σ',
  'Π',
  '∀x',
  '∃x',
  'lim x→∞',
  '∫f(x)dx',
  '∑ᵢ',
  '√Σ',
  '∂',
  '∞',
  '⊕',
  '⊗',
  '≈',
  '≠',
  '≤',
  '≥',
];

export const NeuralBackground: React.FC = memo(() => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: -1000,
    y: -1000,
    targetX: -1000,
    targetY: -1000,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let formulas: FloatingFormula[] = [];
    let isTabVisible = true;
    let isIntersecting = true;

    let particleCount = 120;
    let maxDistance = 105;
    let maxDistanceSq = maxDistance * maxDistance;
    const mousePullDistSq = 160 * 160;

    let offscreenGridCanvas: HTMLCanvasElement | null = null;
    let cachedThemeIsLight: boolean | null = null;

    const renderOffscreenGrid = (isLight: boolean) => {
      if (!offscreenGridCanvas) {
        offscreenGridCanvas = document.createElement('canvas');
      }
      offscreenGridCanvas.width = canvas.width;
      offscreenGridCanvas.height = canvas.height;
      const offCtx = offscreenGridCanvas.getContext('2d');
      if (!offCtx) return;

      offCtx.clearRect(0, 0, canvas.width, canvas.height);
      const gridDotColor = isLight ? 'rgba(19, 94, 84, 0.15)' : 'rgba(255, 255, 255, 0.07)';
      const gridSize = 50;
      offCtx.fillStyle = gridDotColor;
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          offCtx.beginPath();
          offCtx.arc(x, y, 1, 0, Math.PI * 2);
          offCtx.fill();
        }
      }
      cachedThemeIsLight = isLight;
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      if (window.innerWidth < 768) {
        particleCount = 50;
        maxDistance = 75;
      } else {
        particleCount = 130;
        maxDistance = 105;
      }
      maxDistanceSq = maxDistance * maxDistance;

      const isLight = document.documentElement.classList.contains('light');
      renderOffscreenGrid(isLight);
      initParticles();
      initFormulas();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.38,
          vy: (Math.random() - 0.5) * 0.38,
          radius: Math.random() * 1.6 + 1.1,
          baseAlpha: Math.random() * 0.35 + 0.15,
        });
      }
    };

    const initFormulas = () => {
      formulas = [];
      const formulaCount = window.innerWidth < 768 ? 4 : 8;
      for (let i = 0; i < formulaCount; i++) {
        formulas.push({
          text: MATH_SYMBOLS[i % MATH_SYMBOLS.length],
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vy: -0.25 - Math.random() * 0.25,
          alpha: 0.20 + Math.random() * 0.25,
          size: Math.floor(10 + Math.random() * 3),
        });
      }
    };

    let mouseTicking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseTicking) {
        requestAnimationFrame(() => {
          mouseRef.current.targetX = e.clientX;
          mouseRef.current.targetY = e.clientY;
          mouseTicking = false;
        });
        mouseTicking = true;
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      checkAnimationLoop();
    };

    const checkAnimationLoop = () => {
      if (isTabVisible && isIntersecting) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(animate);
      } else {
        cancelAnimationFrame(animationFrameId);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        checkAnimationLoop();
      },
      { threshold: 0 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    handleResize();

    const animate = () => {
      if (!isTabVisible || !isIntersecting) return;

      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.18;
      mouse.y += (mouse.targetY - mouse.y) * 0.18;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isLight = document.documentElement.classList.contains('light');
      if (cachedThemeIsLight !== isLight) {
        renderOffscreenGrid(isLight);
      }

      if (offscreenGridCanvas) {
        ctx.drawImage(offscreenGridCanvas, 0, 0);
      }
      
      const baseColor = isLight ? '108, 158, 190' : '200, 200, 200';
      const activeColor = isLight ? '126, 113, 244' : '20, 227, 216';
      const formulaColor = isLight ? 'rgba(30, 41, 59,' : 'rgba(225, 225, 225,';

      ctx.font = '11px monospace';
      for (let k = 0; k < formulas.length; k++) {
        const f = formulas[k];
        f.y += f.vy;
        if (f.y < -30) {
          f.y = canvas.height + 20;
          f.x = Math.random() * canvas.width;
        }

        ctx.fillStyle = `${formulaColor}${f.alpha})`;
        ctx.fillText(f.text, f.x, f.y);
      }

      if (mouse.x > 0 && mouse.y > 0) {
        const spotlightRadius = 450;
        const grad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          spotlightRadius
        );
        grad.addColorStop(0, `rgba(${activeColor}, ${isLight ? '0.20' : '0.16'})`);
        grad.addColorStop(0.5, `rgba(${baseColor}, ${isLight ? '0.08' : '0.06'})`);
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${baseColor}, ${p.baseAlpha})`;
        ctx.fill();

        if (mouse.x > 0 && mouse.y > 0) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < mousePullDistSq) {
            const dist = Math.sqrt(distSq);
            const force = (160 - dist) / 160;
            p.x -= (dx / dist) * force * 1.2;
            p.y -= (dy / dist) * force * 1.2;

            const alpha = (1 - dist / 160) * 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(${activeColor}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistanceSq) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / maxDistance) * (isLight ? 0.70 : 0.28);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${baseColor}, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden translate-z-0 will-change-transform"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full bg-transparent transition-opacity duration-300"
        aria-hidden="true"
      />

      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#14E3D8]/5 rounded-full blur-[100px] md:blur-[160px] pointer-events-none animate-pulse-slow" />
      <div className="absolute top-1/3 -right-40 w-[550px] h-[550px] bg-[#14E3D8]/6 rounded-full blur-[100px] md:blur-[160px] pointer-events-none animate-pulse-slow" />
      <div className="absolute -bottom-40 left-1/3 w-[650px] h-[650px] bg-[#14E3D8]/4 rounded-full blur-[100px] md:blur-[160px] pointer-events-none" />

      <svg className="absolute inset-0 w-full h-full opacity-[0.03] mix-blend-overlay pointer-events-none" aria-hidden="true">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
});

NeuralBackground.displayName = 'NeuralBackground';
