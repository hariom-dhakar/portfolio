import { memo, useRef } from 'react';
import { m, useInView } from 'framer-motion';
import { Compass, ShieldCheck, Cpu, Sliders, Activity } from 'lucide-react';

export const EngineeringPhilosophy = memo(() => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const pillars = [
    {
      icon: Cpu,
      title: 'Production-First & Modular',
      description: 'Designing AI architectures as decoupled, testable components rather than monolithic prompt chains.',
    },
    {
      icon: Activity,
      title: 'Measurable & Observable',
      description: 'Embedding telemetry and grounding evaluation at every stage to catch hallucination drift early.',
    },
    {
      icon: Sliders,
      title: 'Pragmatic Tradeoffs',
      description: 'Prioritizing simple, deterministic logic over unnecessary model complexity whenever possible.',
    },
    {
      icon: ShieldCheck,
      title: 'Reliable & Maintainable',
      description: 'Building robust fallback gateways, strict input guardrails, and deterministic state persistence.',
    },
  ];

  return (
    <section
      id="philosophy"
      className="py-16 md:py-24 px-6 max-w-[1000px] mx-auto border-t border-[var(--border-primary)]"
      aria-label="Engineering Philosophy Section"
    >
      <m.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-8"
      >
        <div className="space-y-3 max-w-2xl">
          <span className="font-mono text-xs text-[var(--text-gold)] uppercase tracking-widest px-3 py-1 rounded-full border border-[var(--border-gold)] bg-[var(--bg-tertiary)] inline-flex items-center gap-1.5 font-semibold">
            <Compass className="w-3.5 h-3.5 text-[var(--text-gold)]" /> System Mindset
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-[var(--text-primary)]">
            Engineering Philosophy
          </h2>
          <p className="text-sm md:text-base text-[var(--text-secondary)] font-light leading-relaxed">
            I approach AI engineering with a production-first mindset: an LLM is only as effective as the software architecture surrounding it. My focus is on building modular, observable, and deterministic AI systems that balance raw model capability with real-world engineering tradeoffs. By treating prompt versioning, structured evaluation, and fallback gateways as core infrastructure, I build systems designed for long-term reliability and scalability.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className="glass-card p-4 md:p-5 rounded-2xl border border-[var(--border-primary)] space-y-2 hover:border-[var(--border-glow)] transition-all shadow-md flex flex-col justify-between"
              >
                <div className="p-2 rounded-xl bg-[var(--brand-glow)] border border-[var(--border-glow)] text-[var(--text-accent)] w-fit">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="space-y-1 pt-1">
                  <h3 className="font-display font-semibold text-sm text-[var(--text-primary)]">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] font-light leading-snug">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </m.div>
    </section>
  );
});

EngineeringPhilosophy.displayName = 'EngineeringPhilosophy';
