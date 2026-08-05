import { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';
import type { Theme } from '../hooks/useTheme';

interface NavigationProps {
  theme: Theme;
  toggleTheme: () => void;
}

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'certifications', label: 'Credentials' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
];

export const Navigation = memo(({ theme, toggleTheme }: NavigationProps) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const isScrolledNow = window.scrollY > 20;
          setScrolled((prev) => (prev !== isScrolledNow ? isScrolledNow : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionHeights = new Map<string, number>();
    const observedIds = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            sectionHeights.set(entry.target.id, entry.intersectionRect.height);
          } else {
            sectionHeights.set(entry.target.id, 0);
          }
        });

        const isAtBottom =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 20;

        let bestSection = '';
        let maxVisibleHeight = 0;

        if (isAtBottom) {
          bestSection = NAV_ITEMS[NAV_ITEMS.length - 1].id;
        } else {
          sectionHeights.forEach((height, id) => {
            if (height > 25 && height > maxVisibleHeight) {
              maxVisibleHeight = height;
              bestSection = id;
            }
          });
        }

        if (bestSection) {
          setActiveSection((prev) => (prev !== bestSection ? bestSection : prev));
        }
      },
      {
        root: null,
        rootMargin: '-80px 0px 0px 0px',
        threshold: Array.from({ length: 51 }, (_, i) => i / 50),
      }
    );

    const observeElements = () => {
      NAV_ITEMS.forEach(({ id }) => {
        if (!observedIds.has(id)) {
          const el = document.getElementById(id);
          if (el) {
            observer.observe(el);
            observedIds.add(id);
          }
        }
      });
    };

    observeElements();

    let mutationObserver: MutationObserver | null = null;
    if (observedIds.size < NAV_ITEMS.length) {
      mutationObserver = new MutationObserver(() => {
        observeElements();
        if (observedIds.size === NAV_ITEMS.length && mutationObserver) {
          mutationObserver.disconnect();
          mutationObserver = null;
        }
      });
      mutationObserver.observe(document.body, { childList: true, subtree: true });
    }

    return () => {
      observer.disconnect();
      if (mutationObserver) mutationObserver.disconnect();
    };
  }, []);

  const handleNavClick = (id: string) => {
  setIsMobileMenuOpen(false);

  const element = document.getElementById(id);

  if (!element) return;

  setActiveSection(id);

  element.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[var(--bg-glass)] backdrop-blur-xl border-b border-[var(--border-primary)] py-3.5 shadow-sm'
            : 'bg-transparent border-b border-transparent py-5'
        }`}
      >
        <div className="max-w-[1180px] mx-auto px-6 flex items-center justify-between">
          <button
            onClick={() => handleNavClick('hero')}
            className="font-display font-semibold text-lg tracking-tight text-[var(--text-primary)] hover:text-[var(--text-accent)] transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-cyan-400 rounded-md px-1"
            aria-label="Hariom Dhakar - Return to top"
          >
            Hariom Dhakar
          </button>

          <nav className="hidden lg:flex items-center gap-7" aria-label="Main Navigation">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative py-1 text-xs md:text-sm font-medium transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-cyan-400 rounded-md px-1 ${
                    isActive ? 'text-[var(--text-primary)] font-semibold' : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[var(--text-accent)] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-cyan-400"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4.5 h-4.5 text-amber-400" aria-hidden="true" />
              ) : (
                <Moon className="w-4.5 h-4.5 text-slate-700" aria-hidden="true" />
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors duration-200 cursor-pointer lg:hidden relative z-50 focus-visible:outline-2 focus-visible:outline-cyan-400"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-navigation-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[var(--bg-primary)]/95 backdrop-blur-2xl lg:hidden flex flex-col items-center justify-center px-6"
          >
            <nav className="flex flex-col items-center gap-6 text-center" aria-label="Mobile Navigation">
              {NAV_ITEMS.map((item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.25, delay: index * 0.03 }}
                    onClick={() => handleNavClick(item.id)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`text-xl md:text-2xl font-display font-semibold transition-colors duration-200 cursor-pointer ${
                      isActive ? 'text-[var(--text-accent)]' : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

Navigation.displayName = 'Navigation';
