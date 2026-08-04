import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Lock, Unlock } from 'lucide-react';
import resumePdf from '../../assets/Hariom_Dhakar_CV.pdf';

export const ResumeViewer: React.FC = () => {
  const [hasPreviewed, setHasPreviewed] = useState(false);

  const handleDownload = () => {
    if (!hasPreviewed) return;
    const link = document.createElement('a');
    link.href = resumePdf;
    link.download = 'Hariom_Dhakar_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="resume" className="relative py-12 md:py-16 px-6 md:px-12 max-w-7xl mx-auto border-t border-[var(--border-primary)]/10">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-transparent to-bg-primary pointer-events-none -z-10" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border-glow bg-brand-glow text-text-accent text-[11px] font-mono mb-3"
          >
            <FileText className="w-3.5 h-3.5" /> Document
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-2"
          >
            Resume Preview
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-text-secondary max-w-2xl mx-auto text-xs md:text-sm"
          >
            Preview my full curriculum vitae directly below. Note: Download unlocks once the document finishes loading.
          </motion.p>
        </div>

        {/* Viewer Area */}
        <div className="max-w-4xl mx-auto space-y-4">
          
          {/* Controls toolbar */}
          <div className="glass-panel rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 text-text-secondary">
              <FileText className="w-4 h-4 text-text-accent" />
              <span>Hariom_Dhakar_CV.pdf</span>
            </div>

            <div>
              {hasPreviewed ? (
                <button
                  onClick={handleDownload}
                  className="px-4 py-1.5 rounded-lg bg-text-accent hover:opacity-95 text-bg-primary font-semibold flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                >
                  <Download className="w-4 h-4" /> Download Resume <Unlock className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  className="px-4 py-1.5 rounded-lg bg-bg-tertiary text-text-tertiary border border-border-primary flex items-center gap-1.5 cursor-not-allowed"
                  title="Document loading..."
                >
                  Download Locked <Lock className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Paper View Container */}
          <div className="w-full flex justify-center bg-bg-secondary rounded-2xl border border-border-primary h-[600px] md:h-[800px] overflow-hidden">
            <iframe
              src={`${resumePdf}#toolbar=0&navpanes=0&scrollbar=1`}
              className="w-full h-full border-none bg-white rounded-2xl"
              title="Hariom Dhakar CV"
              onLoad={() => setHasPreviewed(true)}
            />
          </div>

        </div>

      </div>
    </section>
  );
};
