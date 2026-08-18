import { memo, useRef } from 'react';
import { m, useInView } from 'framer-motion';
import { Mail, Phone, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../../components/icons';

export const Contact = memo(() => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] as const,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
  };

  const links = [
    {
      name: "Email",
      value: "harudhakar@gmail.com",
      href: "mailto:harudhakar@gmail.com",
      icon: <Mail className="w-5 h-5" aria-hidden="true" />
    },
    {
      name: "GitHub",
      value: "github.com/hariom-dhakar",
      href: "https://github.com/hariom-dhakar",
      icon: <GithubIcon className="w-5 h-5" aria-hidden="true" />
    },
    {
      name: "LinkedIn",
      value: "linkedin.com/in/hariomdhakar11",
      href: "https://linkedin.com/in/hariomdhakar11",
      icon: <LinkedinIcon className="w-5 h-5" aria-hidden="true" />
    },
    {
      name: "Phone",
      value: "+91-7737718909",
      href: "tel:+917737718909",
      icon: <Phone className="w-5 h-5" aria-hidden="true" />
    }
  ];

  return (
    <section 
      id="contact" 
      className="relative overflow-hidden border-t border-[var(--border-primary)]"
      aria-label="Contact Section"
    >
      <m.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="section-layout flex flex-col items-start space-y-6"
      >
        <div className="space-y-1 max-w-2xl">
          <m.span variants={itemVariants} className="section-label">
            Inquiries // 07
          </m.span>
          <m.h2 
            variants={itemVariants}
            className="section-title"
          >
            Get in Touch
          </m.h2>
          <m.p 
            variants={itemVariants}
            className="section-description"
          >
            Open to AI engineering roles, multi-agent systems development, and high-impact engineering collaborations.
          </m.p>
        </div>

        <m.div 
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full"
        >
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : '_self'}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={`${link.name}: ${link.value}`}
              className="card-primary group p-4 flex flex-col justify-between gap-3 focus-visible:outline-2 focus-visible:outline-cyan-400"
            >
              <div className="flex items-center justify-between text-[var(--text-tertiary)] group-hover:text-[var(--text-primary)] transition-colors">
                <span className="p-1.5 rounded-md bg-[var(--bg-tertiary)] border border-[var(--border-primary)]">
                  {link.icon}
                </span>
                {link.href.startsWith('http') && (
                  <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                )}
              </div>
              
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-tertiary)]">
                  {link.name}
                </span>
                <span className="text-xs font-mono text-[var(--text-primary)] truncate">
                  {link.value}
                </span>
              </div>
            </a>
          ))}
        </m.div>

        <m.div 
          variants={itemVariants}
          className="flex items-center gap-2 pt-2 border-t border-[var(--border-primary)] w-full"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span className="text-xs font-mono text-[var(--text-tertiary)]">
            Active status: Available for new engineering opportunities
          </span>
        </m.div>
      </m.div>
    </section>
  );
});

Contact.displayName = 'Contact';
