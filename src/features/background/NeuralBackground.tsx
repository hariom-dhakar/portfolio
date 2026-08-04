import React, { useEffect, useRef, memo } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
}

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
    let isTabVisible = true;
    let isIntersecting = true;

    let particleCount = 70;
    let maxDistance = 135;
    let maxDistanceSq = maxDistance * maxDistance;
    const mousePullDistSq = 160 * 160;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      if (window.innerWidth < 768) {
        particleCount = 30;
        maxDistance = 85;
      } else {
        particleCount = 70;
        maxDistance = 135;
      }
      maxDistanceSq = maxDistance * maxDistance;

      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
          radius: Math.random() * 1.6 + 1.1,
          baseAlpha: Math.random() * 0.35 + 0.35,
        });
      }
    };

    // Throttle mousemove events via RAF
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

    // Pause RAF when canvas is scrolled off-screen
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
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isLight = document.documentElement.classList.contains('light');
      
      const baseColor = isLight ? '168, 213, 227' : '23, 133, 130';
      const activeColor = isLight ? '255, 120, 172' : '191, 161, 129';
      const gridDotColor = isLight ? 'rgba(168, 213, 227, 0.25)' : 'rgba(191, 161, 129, 0.06)';

      // 1. Draw Technical Grid Dots
      const gridSize = 40;
      ctx.fillStyle = gridDotColor;
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          ctx.beginPath();
          ctx.arc(x, y, 0.85, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 2. Draw Interactive Mouse Radial Spotlight
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
        grad.addColorStop(0, `rgba(${activeColor}, ${isLight ? '0.14' : '0.16'})`);
        grad.addColorStop(0.5, `rgba(${baseColor}, ${isLight ? '0.08' : '0.06'})`);
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // 3. Render Particles & Connectors (With pre-squared thresholding)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${baseColor}, ${p.baseAlpha})`;
        ctx.fill();

        // Mouse distance pull & active connector
        if (mouse.x > 0 && mouse.y > 0) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < mousePullDistSq) {
            const dist = Math.sqrt(distSq);
            const force = (160 - dist) / 160;
            p.x -= (dx / dist) * force * 1.2;
            p.y -= (dy / dist) * force * 1.2;

            const alpha = (1 - dist / 160) * 0.48;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(${activeColor}, ${alpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }

        // Inter-particle connection lines (Pre-squared check skips expensive Math.sqrt calls)
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistanceSq) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / maxDistance) * (isLight ? 0.45 : 0.28);
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
      {/* Background Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full bg-transparent transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* Ambient Drifting Aura Blobs */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#FF78AC]/10 rounded-full blur-[140px] pointer-events-none animate-pulse-slow" />
      <div className="absolute top-1/3 -right-40 w-[550px] h-[550px] bg-[#A8D5E3]/18 rounded-full blur-[150px] pointer-events-none animate-pulse-slow" />
      <div className="absolute -bottom-40 left-1/3 w-[650px] h-[650px] bg-[#FF78AC]/8 rounded-full blur-[160px] pointer-events-none" />

      {/* Subtle Noise Texture Overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03] mix-blend-overlay pointer-events-none" aria-hidden="true">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
});

NeuralBackground.displayName = 'NeuralBackground';
