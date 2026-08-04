import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, Phone, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../../components/icons';

export const Contact = () => {
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
      value: "hariomdhakar85@gmail.com",
      href: "mailto:hariomdhakar85@gmail.com",
      icon: <Mail className="w-5 h-5" />
    },
    {
      name: "GitHub",
      value: "github.com/hariom-dhakar",
      href: "https://github.com/hariom-dhakar",
      icon: <GithubIcon className="w-5 h-5" />
    },
    {
      name: "LinkedIn",
      value: "linkedin.com/in/hariom-dhakar",
      href: "https://linkedin.com/in/hariom-dhakar",
      icon: <LinkedinIcon className="w-5 h-5" />
    },
    {
      name: "Phone",
      value: "+91-7737718909",
      href: "tel:+917737718909",
      icon: <Phone className="w-5 h-5" />
    }
  ];

  return (
    <section 
      id="contact" 
      className="py-16 md:py-24 bg-var(--bg-primary) relative flex items-center justify-center overflow-hidden border-t border-[var(--border-primary)]"
    >
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-5xl mx-auto px-6 w-full flex flex-col items-start space-y-10"
      >
        <div className="space-y-3 max-w-2xl">
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-6xl font-display font-medium tracking-tight text-var(--text-primary)"
          >
            Let's Connect
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-var(--text-secondary) font-sans font-light"
          >
            Have a project in mind? Let's build something together.
          </motion.p>
        </div>

        <motion.div 
          variants={itemVariants}
          className="flex flex-col md:flex-row gap-4 md:gap-8 flex-wrap items-start"
        >
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : '_self'}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : ''}
              className="group flex items-center gap-3 text-var(--text-secondary) hover:text-var(--text-accent) transition-colors duration-300 font-mono text-sm md:text-base relative pb-1"
            >
              <span className="opacity-70 group-hover:opacity-100 transition-opacity">
                {link.icon}
              </span>
              <span>{link.value}</span>
              {link.href.startsWith('http') && (
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:-translate-y-2 group-hover:translate-x-1 transition-all duration-300" />
              )}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-var(--text-accent) group-hover:w-full transition-all duration-300 ease-out" />
            </a>
          ))}
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="flex items-center gap-3 mt-4 pt-4 border-t border-var(--border-primary)/20 w-full"
        >
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </div>
          <span className="text-xs md:text-sm font-mono text-var(--text-tertiary) uppercase tracking-wider">
            Available for opportunities
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
};
