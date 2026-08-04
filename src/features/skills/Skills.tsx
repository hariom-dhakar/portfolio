import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface SkillItem {
  name: string;
  isPrimary: boolean;
}

interface SkillCategory {
  label: string;
  skills: SkillItem[];
}

const CATEGORIES: SkillCategory[] = [
  {
    label: 'AI & ML',
    skills: [
      { name: 'CrewAI', isPrimary: true },
      { name: 'LangChain', isPrimary: true },
      { name: 'RAG', isPrimary: true },
      { name: 'FAISS', isPrimary: true },
      { name: 'ChromaDB', isPrimary: false },
      { name: 'HuggingFace', isPrimary: false },
      { name: 'Transformers', isPrimary: false },
      { name: 'LLM Orchestration', isPrimary: true },
    ],
  },
  {
    label: 'Languages & Frameworks',
    skills: [
      { name: 'Python', isPrimary: true },
      { name: 'TypeScript', isPrimary: false },
      { name: 'FastAPI', isPrimary: true },
      { name: 'React', isPrimary: false },
      { name: 'Scikit-learn', isPrimary: false },
      { name: 'Pandas', isPrimary: true },
      { name: 'NumPy', isPrimary: false },
    ],
  },
  {
    label: 'Infrastructure',
    skills: [
      { name: 'Docker', isPrimary: true },
      { name: 'AWS', isPrimary: false },
      { name: 'PostgreSQL', isPrimary: false },
      { name: 'Redis', isPrimary: false },
      { name: 'Git', isPrimary: true },
      { name: 'REST APIs', isPrimary: true },
      { name: 'CI/CD', isPrimary: false },
    ],
  },
  {
    label: 'Specialties',
    skills: [
      { name: 'Multi-Agent Systems', isPrimary: true },
      { name: 'Agentic AI', isPrimary: true },
      { name: 'Prompt Engineering', isPrimary: true },
      { name: 'Vector Databases', isPrimary: true },
      { name: 'NLP', isPrimary: false },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
      staggerChildren: 0.05,
    },
  },
};

const skillVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="skills"
      className="relative w-full py-16 md:py-24 px-6 md:px-12 border-t border-[var(--border-primary)]"
    >
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-display font-semibold tracking-tight text-[var(--text-primary)]">
            Tech Stack
          </h2>
          <div className="mt-4 h-px w-20 bg-gradient-to-r from-[var(--text-accent)] to-transparent" />
        </motion.div>

        {/* Skill Categories */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-10 md:space-y-12"
        >
          {CATEGORIES.map((category) => (
            <motion.div
              key={category.label}
              variants={rowVariants}
              className="flex flex-col md:flex-row gap-3 md:gap-8 items-start"
            >
              {/* Category Label */}
              <span className="text-[11px] md:text-xs font-mono uppercase tracking-[0.2em] text-[var(--text-tertiary)] md:w-40 md:pt-1.5 shrink-0">
                {category.label}
              </span>

              {/* Skills Flow */}
              <div className="flex flex-wrap gap-x-4 gap-y-2 md:gap-x-6 md:gap-y-3 items-baseline">
                {category.skills.map((skill) => (
                  <motion.span
                    key={skill.name}
                    variants={skillVariants}
                    className={`
                      cursor-default transition-all duration-300
                      ${
                        skill.isPrimary
                          ? 'text-xl md:text-2xl font-display font-medium text-[var(--text-primary)] hover:text-[var(--text-accent)]'
                          : 'text-base md:text-lg font-light text-[var(--text-secondary)] opacity-65 hover:opacity-100 hover:text-[var(--text-accent)]'
                      }
                    `}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
