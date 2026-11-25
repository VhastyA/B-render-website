import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { STUDIO_LOGO } from '../data/projects';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

const NAV_LINKS = [
  { label: 'Projects', target: 'projects' },
  { label: 'Services', target: 'services' },
  { label: 'Contact', target: 'booking' },
];

export function BRenderLogo({ className = 'h-9 w-auto' }: { className?: string }) {
  return (
    <img
      src={STUDIO_LOGO}
      alt="B-Render Architectural Studio"
      referrerPolicy="no-referrer"
      className={`${className} object-contain select-none`}
    />
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
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('top');
          }}
          className="inline-flex items-center py-1 shrink-0"
          aria-label="B-Render Architectural Studio home"
        >
          <BRenderLogo className="h-9 w-auto" />
        </a>

        <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">
          {NAV_LINKS.map((item) => (
            <a
              key={item.target}
              href={`#${item.target}`}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(item.target);
              }}
              className="group relative py-1 text-sm font-medium text-[#F4F2ED]/85 transition-colors duration-150 hover:text-[#F4F2ED] whitespace-nowrap shrink-0"
            >
              {item.label}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-[#C69C4E] transition-transform duration-200 group-hover:scale-x-100"
              />
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="inline-flex md:hidden h-11 w-11 items-center justify-center text-[#F4F2ED] transition-colors hover:text-[#C69C4E] cursor-pointer"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden border-b border-white/10 bg-[#121417] px-6 py-4"
          >
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              {NAV_LINKS.map((item) => (
                <a
                  key={item.target}
                  href={`#${item.target}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.target);
                  }}
                  className="flex min-h-[44px] items-center border-b border-white/5 text-base font-medium text-[#F4F2ED]/90 last:border-b-0 hover:text-[#C69C4E]"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
