import { memo } from 'react';
import { m } from 'framer-motion';
import { Award, ShieldCheck, ExternalLink } from 'lucide-react';

interface Certification {
  id: string;
  title: string;
  issuer: string;
  issuedDate: string;
  badge: string;
  url: string;
}

const CERTIFICATIONS: Certification[] = [
  {
    id: 'databricks-genai',
    title: 'Databricks Certified Generative AI Engineer Associate',
    issuer: 'Databricks',
    issuedDate: 'Issued 2026',
    badge: 'GenAI & RAG',
    url: 'https://credentials.databricks.com/c35e55a8-eab2-4085-b1e6-64e7459626d3#acc.Q0ciCAqk',
  },
  {
    id: 'claude-associate',
    title: 'Claude Certified Associate – Foundations',
    issuer: 'Anthropic',
    issuedDate: 'Issued 2026',
    badge: 'LLM Systems',
    url: 'https://www.credly.com/badges/4df03c90-aa84-41df-9507-ba3c7af470f4/linked_in_profile',
  },
  {
    id: 'azure-ai-103',
    title: 'Microsoft Certified: Azure AI Apps and Agents Developer Associate',
    issuer: 'Microsoft',
    issuedDate: 'Issued 2026',
    badge: 'Agentic AI & Cloud',
    url: 'https://learn.microsoft.com/en-us/users/hariomdhakar-11/credentials/ee760fe79141a3a7?ref=https%3A%2F%2Fwww.linkedin.com%2F',
  },
  {
    id: 'udemy-git-devops',
    title: 'GIT, GitLab, GitHub Fundamentals for Software Developers',
    issuer: 'Udemy (MTF Institute)',
    issuedDate: 'Issued May 2025',
    badge: 'Git & DevOps',
    url: 'https://www.udemy.com/certificate/UC-1464251c-1069-4656-af66-de9a44e8360f/',
  },
  {
    id: 'hackerrank-problem-solving',
    title: 'Problem Solving Skill Certification',
    issuer: 'HackerRank',
    issuedDate: 'Verified Skill',
    badge: 'Problem Solving & DSA',
    url: 'https://www.hackerrank.com/certificates/58a98c7e570c',
  },
  {
    id: 'hackerrank-python',
    title: 'Python Core Skill Certification',
    issuer: 'HackerRank',
    issuedDate: 'Verified Skill',
    badge: 'Python Core',
    url: 'https://www.hackerrank.com/certificates/8921e6d3dab0',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export const Certifications = memo(() => {
  return (
    <section
      id="certifications"
      className="relative w-full overflow-hidden border-t border-[var(--border-primary)]"
      aria-label="Credentials Section"
    >
      <div className="section-layout">
        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="flex flex-col"
        >
          {/* Section Header */}
          <div className="flex flex-col mb-8">
            <m.span variants={itemVariants} className="section-label">
              <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
              Accreditation // 05
            </m.span>

            <m.h2 variants={itemVariants} className="section-title">
              Credentials & Certifications
            </m.h2>

            <m.p variants={itemVariants} className="section-description">
              Verified industry accreditations validating expertise in Generative AI, LLM architectures, agentic workflows, and algorithmic problem solving.
            </m.p>
          </div>

          {/* Certifications 3-in-a-row Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 md:gap-4">
            {CERTIFICATIONS.map((cert, index) => (
              <m.a
                key={cert.id}
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                className="card-primary p-4 sm:p-5 group flex flex-col justify-between gap-3.5 relative overflow-hidden transition-all hover:border-[var(--border-glow)] cursor-pointer"
                aria-label={`Verify ${cert.title} issued by ${cert.issuer}`}
              >
                <div className="flex flex-col gap-2.5">
                  {/* Top Bar: Icon + Index + Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-md bg-[var(--bg-tertiary)] text-[var(--text-tertiary)] border border-[var(--border-primary)] group-hover:text-[var(--text-primary)] group-hover:border-[var(--border-glow)] transition-colors shrink-0">
                        <Award className="w-3.5 h-3.5" aria-hidden="true" />
                      </div>
                      <span className="font-mono text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider">
                        0{index + 1}
                      </span>
                    </div>

                    <span className="px-2 py-0.5 rounded-md bg-[var(--bg-tertiary)] border border-[var(--border-primary)] font-mono text-[11px] text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                      {cert.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-display font-semibold text-[var(--text-primary)] tracking-tight leading-snug group-hover:text-[var(--text-primary)] transition-colors">
                    {cert.title}
                  </h3>
                </div>

                {/* Footer: Issuer + Date + External Link */}
                <div className="flex items-center justify-between pt-2.5 border-t border-[var(--border-primary)] text-xs text-[var(--text-tertiary)] font-mono">
                  <span className="text-[var(--text-secondary)]">{cert.issuer}</span>
                  <div className="flex items-center gap-1 text-[var(--text-tertiary)] group-hover:text-[var(--text-accent)] transition-colors">
                    <span className="text-[11px]">{cert.issuedDate}</span>
                    <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                  </div>
                </div>
              </m.a>
            ))}
          </div>
        </m.div>
      </div>
    </section>
  );
});

Certifications.displayName = 'Certifications';
