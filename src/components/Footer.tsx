import { memo } from 'react';
import { m } from 'framer-motion';

export const Footer = memo(() => {
  return (
    <footer className="relative w-full py-8 border-t border-[var(--border-primary)]">
      <div className="section-layout !py-0">
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--text-tertiary)] font-mono"
        >
          <span>
            Designed & Engineered by <strong className="text-[var(--text-primary)] font-medium">Hariom Dhakar</strong>
          </span>

          <span>
            © {new Date().getFullYear()} • Agentic AI & Systems Architecture
          </span>
        </m.div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
