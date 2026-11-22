import { useState } from 'react';
import { ArrowUpRight, MoreHorizontal, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { BRenderWordmark } from './Navbar';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const [quickMenuOpen, setQuickMenuOpen] = useState(false);

  const handleQuickAction = (target: string) => {
    setQuickMenuOpen(false);
    onNavigate(target);
  };

  return (
    <>
      <footer className="border-t border-white/10 bg-[#0B0C0E] py-12">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-8 px-6 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <div>
            <BRenderWordmark />
            <p className="mt-3 text-xs text-[#9E9A90]">
              B-Render Architectural Studio · 3D Visualization &amp; Spatial Design
            </p>
          </div>

          <nav
            className="flex flex-wrap items-center gap-6 text-xs text-[#9E9A90]"
            aria-label="Footer navigation"
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('projects');
              }}
              className="transition-colors hover:text-[#F4F2ED]"
            >
              Projects
            </a>
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('services');
              }}
              className="transition-colors hover:text-[#F4F2ED]"
            >
              Services
            </a>
            <a
              href="#studio"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('studio');
              }}
              className="transition-colors hover:text-[#F4F2ED]"
            >
              Philosophy
            </a>
            <a
              href="#booking"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('booking');
              }}
              className="transition-colors hover:text-[#C69C4E]"
            >
              Book a Render
            </a>
          </nav>

          <p className="text-xs text-[#9E9A90]">
            &copy; 2026 B-Render Architectural Studio. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Signature circular quick-action button matching the reference screenshot */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-3">
        <AnimatePresence>
          {quickMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="w-56 rounded-sm border border-white/15 bg-[#121417] p-2 shadow-xl"
            >
              <button
                type="button"
                onClick={() => handleQuickAction('booking')}
                className="flex min-h-[42px] w-full items-center justify-between rounded-sm px-3 text-left text-xs font-medium text-[#F4F2ED] transition-colors hover:bg-[#1E2127] hover:text-[#C69C4E] cursor-pointer"
              >
                <span>Book a Render</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[#C69C4E]" />
              </button>
              <button
                type="button"
                onClick={() => handleQuickAction('projects')}
                className="flex min-h-[42px] w-full items-center justify-between rounded-sm px-3 text-left text-xs font-medium text-[#F4F2ED]/85 transition-colors hover:bg-[#1E2127] hover:text-[#F4F2ED] cursor-pointer"
              >
                <span>Project Galleries</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[#9E9A90]" />
              </button>
              <button
                type="button"
                onClick={() => handleQuickAction('services')}
                className="flex min-h-[42px] w-full items-center justify-between rounded-sm px-3 text-left text-xs font-medium text-[#F4F2ED]/85 transition-colors hover:bg-[#1E2127] hover:text-[#F4F2ED] cursor-pointer"
              >
                <span>Explore Services</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[#9E9A90]" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => setQuickMenuOpen((prev) => !prev)}
          aria-expanded={quickMenuOpen}
          aria-label={quickMenuOpen ? 'Close quick studio menu' : 'Open quick studio menu'}
          className="inline-flex h-13 w-13 items-center justify-center rounded-full bg-[#C69C4E] text-[#0B0C0E] shadow-lg transition-transform duration-150 hover:scale-105 hover:bg-[#D9B670] cursor-pointer"
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
