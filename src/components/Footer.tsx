import { motion } from 'framer-motion';

export function Footer() {
  return (
    <footer className="relative w-full py-8 px-6 bg-[var(--bg-primary)] border-t border-[var(--border-primary)]/10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-3"
        >
          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--border-primary)] to-transparent mb-4" />

          <p className="text-xs md:text-sm text-[var(--text-tertiary)] tracking-wide">
            Designed & Built by{' '}
            <span className="text-[var(--text-secondary)]">Hariom Dhakar</span>
          </p>

          <p className="text-[10px] md:text-xs text-[var(--text-tertiary)]/60 font-mono">
            © {new Date().getFullYear()}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
