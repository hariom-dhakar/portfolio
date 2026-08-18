import React, { useEffect, useRef, memo } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  isHub: boolean;
}

interface Pulse {
  fromIndex: number;
  toIndex: number;
  progress: number;
  speed: number;
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
    let pulses: Pulse[] = [];
    let isTabVisible = true;
    let isIntersecting = true;

    let particleCount = 65;
    let maxDistance = 140;
    let maxDistanceSq = maxDistance * maxDistance;
    const mousePullDistSq = 180 * 180;

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
      const gridDotColor = isLight ? 'rgba(0, 0, 0, 0.045)' : 'rgba(255, 255, 255, 0.035)';
      const gridSize = 44;
      offCtx.fillStyle = gridDotColor;
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          offCtx.beginPath();
          offCtx.arc(x, y, 0.9, 0, Math.PI * 2);
          offCtx.fill();
        }
      }
      cachedThemeIsLight = isLight;
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      if (window.innerWidth < 768) {
        particleCount = 28;
        maxDistance = 100;
      } else if (window.innerWidth < 1200) {
        particleCount = 48;
        maxDistance = 125;
      } else {
        particleCount = 68;
        maxDistance = 145;
      }
      maxDistanceSq = maxDistance * maxDistance;

      const isLight = document.documentElement.classList.contains('light');
      renderOffscreenGrid(isLight);
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      pulses = [];
      const w = canvas.width;
      const h = canvas.height;

      for (let i = 0; i < particleCount; i++) {
        const isHub = i % 7 === 0;
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
          radius: isHub ? Math.random() * 1.5 + 2.5 : Math.random() * 1.2 + 1.2,
          baseAlpha: isHub ? 0.65 : Math.random() * 0.35 + 0.30,
          isHub,
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

    let lastPulseTime = 0;

    const animate = (timestamp: number) => {
      if (!isTabVisible || !isIntersecting) return;

      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isLight = document.documentElement.classList.contains('light');
      if (cachedThemeIsLight !== isLight) {
        renderOffscreenGrid(isLight);
      }

      if (offscreenGridCanvas) {
        ctx.drawImage(offscreenGridCanvas, 0, 0);
      }
      
      const nodeColor = isLight ? '71, 85, 105' : '161, 161, 170';
      const hubColor = isLight ? '8, 145, 178' : '6, 182, 212';
      const lineColor = isLight ? '148, 163, 184' : '100, 116, 139';
      const activeColor = isLight ? '8, 145, 178' : '6, 182, 212';

      // Subtle mouse glow spotlight
      if (mouse.x > 0 && mouse.y > 0) {
        const spotlightRadius = 320;
        const grad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          spotlightRadius
        );
        grad.addColorStop(0, `rgba(${activeColor}, ${isLight ? '0.08' : '0.06'})`);
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Randomly spawn synaptic pulses between close nodes
      if (timestamp - lastPulseTime > 700 && particles.length > 2) {
        const i1 = Math.floor(Math.random() * particles.length);
        const p1 = particles[i1];
        
        for (let j = 0; j < particles.length; j++) {
          if (i1 === j) continue;
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          if (dx * dx + dy * dy < maxDistanceSq) {
            pulses.push({
              fromIndex: i1,
              toIndex: j,
              progress: 0,
              speed: 0.015 + Math.random() * 0.02,
            });
            lastPulseTime = timestamp;
            break;
          }
        }
      }

      // 1. Draw connecting lines between particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistanceSq) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / maxDistance) * (isLight ? 0.32 : 0.28);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = (p.isHub || p2.isHub)
              ? `rgba(${hubColor}, ${alpha * 1.3})`
              : `rgba(${lineColor}, ${alpha})`;
            ctx.lineWidth = (p.isHub || p2.isHub) ? 0.9 : 0.6;
            ctx.stroke();
          }
        }
      }

      // 2. Draw synaptic pulses travelling across lines
      for (let k = pulses.length - 1; k >= 0; k--) {
        const pulse = pulses[k];
        const p1 = particles[pulse.fromIndex];
        const p2 = particles[pulse.toIndex];

        if (!p1 || !p2) {
          pulses.splice(k, 1);
          continue;
        }

        pulse.progress += pulse.speed;
        if (pulse.progress >= 1) {
          pulses.splice(k, 1);
          continue;
        }

        const px = p1.x + (p2.x - p1.x) * pulse.progress;
        const py = p1.y + (p2.y - p1.y) * pulse.progress;

        ctx.beginPath();
        ctx.arc(px, py, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${hubColor}, 0.85)`;
        ctx.shadowColor = `rgba(${hubColor}, 0.8)`;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 3. Draw nodes and mouse interaction
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse gentle interaction
        if (mouse.x > 0 && mouse.y > 0) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < mousePullDistSq) {
            const dist = Math.sqrt(distSq);
            const force = (180 - dist) / 180;
            p.x -= (dx / dist) * force * 0.8;
            p.y -= (dy / dist) * force * 0.8;

            const alpha = (1 - dist / 180) * 0.45;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(${activeColor}, ${alpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.isHub
          ? `rgba(${hubColor}, ${p.baseAlpha})`
          : `rgba(${nodeColor}, ${p.baseAlpha})`;
        ctx.fill();

        // Hub node glowing ring
        if (p.isHub) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius + 2, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${hubColor}, 0.25)`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

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
        className="absolute inset-0 w-full h-full bg-transparent"
        aria-hidden="true"
      />

      {/* Atmospheric ambient glows */}
      <div className="absolute top-1/4 -right-20 w-[550px] h-[550px] bg-cyan-500/[0.04] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-32 left-1/4 w-[500px] h-[500px] bg-sky-500/[0.03] rounded-full blur-[140px] pointer-events-none" />
    </div>
  );
});

NeuralBackground.displayName = 'NeuralBackground';
