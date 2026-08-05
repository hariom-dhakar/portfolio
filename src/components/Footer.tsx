import { memo } from 'react';
import { m } from 'framer-motion';

export const Footer = memo(() => {
  return (
    <footer className="relative w-full py-8 px-6 border-t border-[var(--border-primary)]/40">
      <div className="max-w-[1180px] mx-auto px-6">
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-3 text-center"
        >
          {/* Subtle Glowing Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent mb-3" />

          <p className="text-xs md:text-sm text-[var(--text-tertiary)] tracking-wide">
            Designed & Built by{' '}
            <span className="text-[var(--text-primary)] font-medium">Hariom Dhakar</span>
          </p>

          <p className="text-[10px] md:text-xs text-[var(--text-tertiary)]/60 font-mono">
            © {new Date().getFullYear()} • Agentic AI Engineer
          </p>
        </m.div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
