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
      className="py-16 md:py-24 relative flex items-center justify-center overflow-hidden border-t border-[var(--border-primary)]"
      aria-label="Contact Section"
    >
      <m.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-[900px] mx-auto px-6 w-full flex flex-col items-start space-y-10"
      >
        <div className="space-y-3 max-w-2xl">
          <m.h2 
            variants={itemVariants}
            className="text-4xl md:text-6xl font-display font-medium tracking-tight text-[var(--text-primary)]"
          >
            Let's Connect
          </m.h2>
          <m.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-[var(--text-secondary)] font-sans font-light leading-relaxed"
          >
            Have an AI engineering opportunity or multi-agent project in mind? Let's build together.
          </m.p>
        </div>

        <m.div 
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
        >
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : '_self'}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={`${link.name}: ${link.value}`}
              className="group p-4 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-secondary)]/40 hover:bg-[var(--bg-secondary)] hover:border-[var(--border-glow)] transition-all duration-300 flex flex-col gap-3 focus-visible:outline-2 focus-visible:outline-cyan-400"
            >
              <div className="flex items-center justify-between text-[var(--text-tertiary)] group-hover:text-[var(--text-accent)] transition-colors">
                <span className="p-2 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-primary)]">
                  {link.icon}
                </span>
                {link.href.startsWith('http') && (
                  <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300" aria-hidden="true" />
                )}
              </div>
              
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-tertiary)]">
                  {link.name}
                </span>
                <span className="text-xs md:text-sm font-mono text-[var(--text-primary)] group-hover:text-[var(--text-accent)] truncate transition-colors">
                  {link.value}
                </span>
              </div>
            </a>
          ))}
        </m.div>

        <m.div 
          variants={itemVariants}
          className="flex items-center gap-3 pt-6 border-t border-[var(--border-primary)]/40 w-full"
        >
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </div>
          <span className="text-xs md:text-sm font-mono text-[var(--text-tertiary)] uppercase tracking-wider">
            Available for new opportunities & role invitations
          </span>
        </m.div>
      </m.div>
    </section>
  );
});

Contact.displayName = 'Contact';
