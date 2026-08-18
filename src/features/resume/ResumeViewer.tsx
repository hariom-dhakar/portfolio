import React, { useState, memo } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Download, FileText, Eye, EyeOff } from 'lucide-react';
import resumePdf from '../../assets/Hariom_Dhakar_CV.pdf';

export const ResumeViewer: React.FC = memo(() => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section 
      id="resume" 
      className="relative border-t border-[var(--border-primary)]"
      aria-label="Resume Section"
    >
      <div className="section-layout">
        
        <div className="text-center mb-6">
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-1.5"
          >
            <span className="section-label inline-flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" aria-hidden="true" /> Curriculum Vitae // 06
            </span>
            <h2 className="section-title">Resume & Background</h2>
            <p className="section-description text-center mx-auto">
              Download complete resume or inspect document preview.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
              <a
                href={resumePdf}
                download="Hariom_Dhakar_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full sm:w-auto text-xs md:text-sm py-2 px-5 focus-visible:outline-2 focus-visible:outline-cyan-400"
                aria-label="Download Resume PDF"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                <span>Download CV</span>
              </a>

              <button
                onClick={() => setIsExpanded((prev) => !prev)}
                className="btn-ghost w-full sm:w-auto text-xs md:text-sm py-2 px-5 focus-visible:outline-2 focus-visible:outline-cyan-400"
                aria-expanded={isExpanded}
                aria-controls="resume-preview-container"
                aria-label={isExpanded ? "Hide document preview" : "Preview document"}
              >
                {isExpanded ? (
                  <>
                    <EyeOff className="w-4 h-4" aria-hidden="true" />
                    <span>Hide Document</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4" aria-hidden="true" />
                    <span>Preview Document</span>
                  </>
                )}
              </button>
            </div>
          </m.div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <m.div
              id="resume-preview-container"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
              className="overflow-hidden pt-4"
            >
              <div className="space-y-4">
                <div className="card-glass p-3 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
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

                <div className="w-full flex justify-center bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-primary)] h-[500px] sm:h-[650px] md:h-[800px] overflow-hidden shadow-2xl">
                  <iframe
                    src={`${resumePdf}#toolbar=0&navpanes=0&scrollbar=1`}
                    className="w-full h-full border-none bg-white rounded-2xl"
                    title="Hariom Dhakar CV PDF Document"
                  />
                </div>
              </div>
            </m.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
});

ResumeViewer.displayName = 'ResumeViewer';
