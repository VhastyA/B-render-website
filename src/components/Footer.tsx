import { useState } from 'react';
import { ArrowUpRight, MoreHorizontal, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { PageRoute } from '../data/projects';
import { BRenderLogo } from './Navbar';

interface FooterProps {
  onNavigate: (page: PageRoute) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const [quickMenuOpen, setQuickMenuOpen] = useState(false);

  const handleQuickAction = (page: PageRoute) => {
    setQuickMenuOpen(false);
    onNavigate(page);
  };

  return (
    <>
      <footer className="border-t border-black/10 dark:border-white/10 bg-[#F7F6F3] dark:bg-[#0B0C0E] py-10 transition-colors duration-200">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-6 px-6 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('home');
            }}
            aria-label="B-Render Architectural Studio home"
          >
            <BRenderLogo className="h-8 w-auto" />
          </a>

          <nav
            className="flex flex-wrap items-center gap-6 text-xs text-[#5E5B54] dark:text-[#9E9A90]"
            aria-label="Footer navigation"
          >
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home');
              }}
              className="transition-colors hover:text-[#141414] dark:hover:text-[#F4F2ED]"
            >
              Home
            </a>
            <a
              href="/projects"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('projects');
              }}
              className="transition-colors hover:text-[#141414] dark:hover:text-[#F4F2ED]"
            >
              Projects
            </a>
            <a
              href="/services"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('services');
              }}
              className="transition-colors hover:text-[#141414] dark:hover:text-[#F4F2ED]"
            >
              Services
            </a>
            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('contact');
              }}
              className="transition-colors hover:text-[#9A7228] dark:hover:text-[#C69C4E]"
            >
              Contact
            </a>
          </nav>

          <p className="text-xs text-[#5E5B54] dark:text-[#9E9A90]">
            &copy; 2026 B-Render Architectural Studio
          </p>
        </div>
      </footer>

      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-3">
        <AnimatePresence>
          {quickMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="w-48 border border-black/15 dark:border-white/15 bg-white dark:bg-[#121417] p-1.5 shadow-xl"
            >
              <button
                type="button"
                onClick={() => handleQuickAction('contact')}
                className="flex min-h-[40px] w-full items-center justify-between px-3 text-left text-xs font-medium text-[#141414] dark:text-[#F4F2ED] hover:bg-[#EFECE6] dark:hover:bg-[#1E2127] hover:text-[#9A7228] dark:hover:text-[#C69C4E] cursor-pointer"
              >
                <span>Contact</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[#9A7228] dark:text-[#C69C4E]" />
              </button>
              <button
                type="button"
                onClick={() => handleQuickAction('projects')}
                className="flex min-h-[40px] w-full items-center justify-between px-3 text-left text-xs font-medium text-[#141414]/85 dark:text-[#F4F2ED]/85 hover:bg-[#EFECE6] dark:hover:bg-[#1E2127] cursor-pointer"
              >
                <span>Projects</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[#5E5B54] dark:text-[#9E9A90]" />
              </button>
              <button
                type="button"
                onClick={() => handleQuickAction('services')}
                className="flex min-h-[40px] w-full items-center justify-between px-3 text-left text-xs font-medium text-[#141414]/85 dark:text-[#F4F2ED]/85 hover:bg-[#EFECE6] dark:hover:bg-[#1E2127] cursor-pointer"
              >
                <span>Services</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[#5E5B54] dark:text-[#9E9A90]" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => setQuickMenuOpen((prev) => !prev)}
          aria-expanded={quickMenuOpen}
          aria-label={quickMenuOpen ? 'Close menu' : 'Open menu'}
          className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#C69C4E] text-[#0B0C0E] shadow-lg transition-transform duration-150 hover:scale-105 hover:bg-[#D9B670] cursor-pointer"
        >
          {quickMenuOpen ? (
            <X className="h-5 w-5" strokeWidth={2.2} />
          ) : (
            <MoreHorizontal className="h-6 w-6" strokeWidth={2.4} />
          )}
        </button>
      </div>
    </>
  );
}
