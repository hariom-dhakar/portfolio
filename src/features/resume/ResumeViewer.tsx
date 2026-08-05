import React, { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, FileText, Eye, EyeOff } from 'lucide-react';
import resumePdf from '../../assets/Hariom_Dhakar_CV.pdf';

export const ResumeViewer: React.FC = memo(() => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section 
      id="resume" 
      className="relative py-12 md:py-20 px-4 md:px-8 max-w-7xl mx-auto border-t border-[var(--border-primary)]"
      aria-label="Resume Section"
    >
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border-glow)] bg-[var(--brand-glow)] text-[var(--text-accent)] text-[11px] font-mono mb-3"
          >
            <FileText className="w-3.5 h-3.5" aria-hidden="true" /> Resume
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-display font-bold tracking-tight text-[var(--text-primary)] mb-3"
          >
            Curriculum Vitae
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[var(--text-secondary)] max-w-2xl mx-auto text-xs md:text-sm font-light leading-relaxed mb-6"
          >
            Download my detailed CV or toggle the interactive document preview below.
          </motion.p>

          {/* Action CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5"
          >
            <a
              href={resumePdf}
              download="Hariom_Dhakar_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full sm:w-auto text-xs md:text-sm py-2.5 px-6 focus-visible:outline-2 focus-visible:outline-cyan-400"
              aria-label="Download Resume PDF"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              <span>Download Resume</span>
            </a>

            <button
              onClick={() => setIsExpanded((prev) => !prev)}
              className="btn-ghost w-full sm:w-auto text-xs md:text-sm py-2.5 px-6 focus-visible:outline-2 focus-visible:outline-cyan-400"
              aria-expanded={isExpanded}
              aria-controls="resume-preview-container"
              aria-label={isExpanded ? "Hide document preview" : "Preview document"}
            >
              {isExpanded ? (
                <>
                  <EyeOff className="w-4 h-4 text-[var(--text-accent)]" aria-hidden="true" />
                  <span>Hide Preview</span>
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 text-[var(--text-accent)]" aria-hidden="true" />
                  <span>Preview Resume</span>
                </>
              )}
            </button>
          </motion.div>
        </div>

        {/* Collapsible Document Viewer (Hidden by Default) */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              id="resume-preview-container"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
              className="overflow-hidden pt-4"
            >
              <div className="space-y-4">
                {/* Controls Toolbar */}
                <div className="glass-panel rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                  <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                    <FileText className="w-4 h-4 text-[var(--text-accent)]" aria-hidden="true" />
                    <span>Hariom_Dhakar_CV.pdf</span>
                  </div>

                  <a
                    href={resumePdf}
                    download="Hariom_Dhakar_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-[var(--brand-glow)] hover:opacity-90 border border-[var(--border-glow)] text-[var(--text-accent)] font-semibold flex items-center gap-1.5 transition-all text-[11px]"
                  >
                    <Download className="w-3.5 h-3.5" aria-hidden="true" /> Download File
                  </a>
                </div>

                {/* Paper View Container */}
                <div className="w-full flex justify-center bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-primary)] h-[500px] sm:h-[650px] md:h-[800px] overflow-hidden shadow-2xl">
                  <iframe
                    src={`${resumePdf}#toolbar=0&navpanes=0&scrollbar=1`}
                    className="w-full h-full border-none bg-white rounded-2xl"
                    title="Hariom Dhakar CV PDF Document"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
});

ResumeViewer.displayName = 'ResumeViewer';
