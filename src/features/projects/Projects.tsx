import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    title: 'MedInsight Agent',
    tagline: 'Multi-agent clinical AI system powered by CrewAI',
    metrics: [
      { label: 'Agents', value: '4' },
      { label: 'Accuracy', value: '95%' },
      { label: 'Documents', value: '200+' },
    ],
    tech: ['CrewAI', 'LangChain', 'Llama 3', 'FAISS', 'RAG'],
    github: 'https://github.com/hariom-dhakar'
  },
  {
    title: 'AI Proposal Generator',
    tagline: 'Zero-shot proposal automation with intelligent retrieval',
    metrics: [
      { label: 'Time Saved', value: '80%' },
      { label: 'Template Match', value: '95%' },
      { label: 'Sections', value: '12' },
    ],
    tech: ['LangChain', 'GPT-4', 'ChromaDB', 'DOCX', 'Jinja2'],
    github: 'https://github.com/hariom-dhakar'
  },
  {
    title: 'CrewAI EDA Analyzer',
    tagline: 'Automated exploratory data analysis with multi-agent orchestration',
    metrics: [
      { label: 'Automation', value: '70%' },
      { label: 'Agents', value: '3' },
      { label: 'Formats', value: '5+' },
    ],
    tech: ['CrewAI', 'FastAPI', 'Pandas', 'Matplotlib', 'Python'],
    github: 'https://github.com/hariom-dhakar'
  }
];

const ProjectItem = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  // Unique reveal animations per project
  const variants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: index % 2 === 0 ? 0.98 : 1.02,
      x: index % 2 === 0 ? -20 : 20,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      x: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] as const
      } 
    }
  };

  return (
    <motion.div 
      ref={ref}
      style={{ opacity }}
      className="glass-card flex flex-col justify-center py-10 md:py-14 px-6 md:px-12 my-6 relative w-full rounded-2xl"
    >
      <motion.div
        variants={variants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-5xl w-full mx-auto flex flex-col gap-6 md:gap-8"
      >
        <div className="space-y-4">
          <motion.h3 
            style={{ y }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-[var(--text-primary)]"
          >
            {project.title}
          </motion.h3>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] font-light max-w-3xl leading-tight">
            {project.tagline}
          </p>
        </div>

        <div className="flex flex-wrap gap-8 md:gap-16 pt-4">
          {project.metrics.map((metric, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span className="text-4xl md:text-5xl font-display font-medium text-[var(--text-accent)] glow-text">
                {metric.value}
              </span>
              <span className="text-xs md:text-sm uppercase tracking-widest text-[var(--text-tertiary)] font-mono">
                {metric.label}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-6 pt-6 mt-auto">
          <div className="flex flex-wrap items-center gap-3 text-sm md:text-base font-mono text-[var(--text-secondary)]">
            {project.tech.map((tech, i) => (
              <span key={i} className="flex items-center gap-3">
                {tech}
                {i < project.tech.length - 1 && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-tertiary)] opacity-50" />
                )}
              </span>
            ))}
          </div>

          <a 
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost w-fit"
          >
            View on GitHub 
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const Projects = () => {
  return (
    <section id="projects" className="w-full bg-[var(--bg-primary)] py-16 md:py-20 overflow-hidden px-4 md:px-8 border-t border-[var(--border-primary)]">
      <div className="max-w-7xl mx-auto mb-10 md:mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center justify-center text-center space-y-4"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tighter text-[var(--text-primary)]">
            Selected Work
          </h2>
          <div className="w-24 h-px bg-[var(--border-glow)] opacity-50" />
        </motion.div>
      </div>

      <div className="flex flex-col w-full">
        {projects.map((project, idx) => (
          <ProjectItem key={project.title} project={project} index={idx} />
        ))}
      </div>
    </section>
  );
};
