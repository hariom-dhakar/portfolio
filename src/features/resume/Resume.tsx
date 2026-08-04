import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Download, FileText } from 'lucide-react';
import resumePdf from '../../assets/Hariom_Dhakar_CV.pdf';

export const Resume = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <section 
      id="resume" 
      className="py-12 md:py-16 bg-[var(--bg-primary)] relative flex items-center justify-center overflow-hidden border-t border-[var(--border-primary)]"
    >
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-4xl mx-auto px-6 flex flex-col items-center text-center space-y-6"
      >
        <h2 className="text-4xl md:text-6xl font-display font-medium tracking-tight text-[var(--text-primary)]">
          Resume
        </h2>
        
        <div className="flex flex-col items-center space-y-4 max-w-xl mx-auto">
          <p className="text-base md:text-lg text-[var(--text-secondary)] font-sans leading-relaxed">
            Download my detailed resume for a comprehensive overview of my experience.
          </p>
          
          <a
            href={resumePdf}
            download="Hariom_Dhakar_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <FileText className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
            <span>Download Resume</span>
            <Download className="w-4 h-4 group-hover:translate-y-1 transition-all duration-300" />
          </a>
        </div>
      </motion.div>
    </section>
  );
};
