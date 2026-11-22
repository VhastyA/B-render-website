import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

const NAV_LINKS = [
  { label: 'Projects', target: 'projects' },
  { label: 'Services', target: 'services' },
  { label: 'Philosophy', target: 'studio' },
  { label: 'Process', target: 'process' },
];

export function BRenderWordmark() {
  return (
    <span className="inline-flex items-center gap-2.5 font-display whitespace-nowrap shrink-0">
      <svg
        width="26"
        height="24"
        viewBox="0 0 28 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M3 23V3H15.5C19.8 3 22.5 5.1 22.5 8.4C22.5 10.9 20.8 12.6 18 13.1C21.4 13.6 23.5 15.6 23.5 18.6C23.5 21.6 20.6 23 16 23H3Z"
          stroke="#F4F2ED"
          strokeWidth="2.1"
          strokeLinejoin="round"
        />
        <path
          d="M3 13H17.5"
          stroke="#C69C4E"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
      </svg>
      <span className="text-lg font-semibold tracking-[0.16em] text-[#F4F2ED]">
        B-RENDER
      </span>
    </span>
  );
}

export function Navbar({ onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLinkClick = (target: string) => {
    setMobileOpen(false);
    onNavigate(target);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0B0C0E]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between gap-8 px-6 lg:px-10">
        {/* Mobile spacer to keep brand centered on mobile just like reference */}
        <div className="w-11 md:hidden" aria-hidden="true" />

        {/* Zone 1: Single-element brand wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('top');
          }}
          className="inline-flex items-center py-1 whitespace-nowrap shrink-0 focus-visible:rounded"
          aria-label="B-Render Architectural Studio home"
        >
          <BRenderWordmark />
        </a>

        {/* Zone 2: Clean single-line navigation links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">
          {NAV_LINKS.map((item) => (
            <a
              key={item.target}
              href={`#${item.target}`}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(item.target);
              }}
              className="group relative py-1 text-sm font-medium text-[#F4F2ED]/80 transition-colors duration-150 hover:text-[#F4F2ED] whitespace-nowrap shrink-0"
            >
              {item.label}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-[#C69C4E] transition-transform duration-200 group-hover:scale-x-100"
              />
            </a>
          ))}
        </nav>

        {/* Zone 3: Single primary action on desktop, clean minimalist hamburger on mobile */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleLinkClick('booking')}
            className="hidden md:inline-flex items-center justify-center rounded-sm border border-[#8E3B1D]/50 bg-[#5C220E] px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-[#F4F2ED] transition-colors duration-150 hover:bg-[#752C13] whitespace-nowrap shrink-0 cursor-pointer"
          >
            Book a Render
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex md:hidden h-11 w-11 items-center justify-center rounded-sm text-[#F4F2ED] transition-colors hover:text-[#C69C4E] cursor-pointer"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden border-b border-white/10 bg-[#121417] px-6 py-6"
          >
            <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
              {NAV_LINKS.map((item, idx) => (
                <a
                  key={item.target}
                  href={`#${item.target}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.target);
                  }}
                  className="flex min-h-[44px] items-center justify-between border-b border-white/5 text-base font-medium text-[#F4F2ED]/90 hover:text-[#C69C4E]"
                >
                  <span>{item.label}</span>
                  <span className="font-mono text-xs text-[#9E9A90]">0{idx + 1}</span>
                </a>
              ))}
              <button
                type="button"
                onClick={() => handleLinkClick('booking')}
                className="mt-4 inline-flex min-h-[44px] w-full items-center justify-center rounded-sm border border-[#8E3B1D]/50 bg-[#5C220E] px-5 py-3 text-xs font-semibold tracking-wider uppercase text-[#F4F2ED] transition-colors hover:bg-[#752C13] cursor-pointer"
              >
                Book a Render
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
