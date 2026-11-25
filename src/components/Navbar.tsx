import { useEffect, useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { PageRoute, STUDIO_LOGO } from '../data/projects';

interface NavbarProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

const NAV_LINKS: { label: string; page: PageRoute; href: string }[] = [
  { label: 'Home', page: 'home', href: '/' },
  { label: 'Projects', page: 'projects', href: '/projects' },
  { label: 'Services', page: 'services', href: '/services' },
  { label: 'Contact', page: 'contact', href: '/contact' },
];

export function BRenderLogo({ className = 'h-9 w-auto' }: { className?: string }) {
  return (
    <img
      src={STUDIO_LOGO}
      alt="B-Render Architectural Studio"
      referrerPolicy="no-referrer"
      className={`${className} object-contain select-none invert dark:invert-0 transition-[filter] duration-200`}
    />
  );
}

export function Navbar({
  currentPage,
  onNavigate,
  theme,
  onToggleTheme,
}: NavbarProps) {
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

  const handleLinkClick = (page: PageRoute) => {
    setMobileOpen(false);
    onNavigate(page);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 dark:border-white/10 bg-[#F7F6F3]/95 dark:bg-[#0B0C0E]/95 backdrop-blur-md transition-colors duration-200">
      <div className="mx-auto grid h-16 max-w-[1320px] grid-cols-2 md:grid-cols-3 items-center gap-4 px-6 lg:px-10">
        {/* Left: Brand Logo */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('home');
          }}
          className="justify-self-start inline-flex items-center py-1 shrink-0"
          aria-label="B-Render Architectural Studio home"
        >
          <BRenderLogo className="h-9 w-auto" />
        </a>

        {/* Top Middle: Centered Multi-Page Menu */}
        <nav
          className="hidden md:flex justify-self-center items-center gap-8"
          aria-label="Primary navigation"
        >
          {NAV_LINKS.map((item) => {
            const isActive = currentPage === item.page;
            return (
              <a
                key={item.page}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.page);
                }}
                aria-current={isActive ? 'page' : undefined}
                className={`group relative py-1 text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-[#9A7228] dark:text-[#C69C4E]'
                    : 'text-[#141414]/80 dark:text-[#F4F2ED]/85 hover:text-[#141414] dark:hover:text-[#F4F2ED]'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-0.5 h-[1.5px] bg-[#9A7228] dark:bg-[#C69C4E] transition-transform duration-200 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Right: Light/Dark Theme Switch + Mobile Menu Trigger */}
        <div className="justify-self-end flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="inline-flex h-10 w-10 items-center justify-center border border-black/15 dark:border-white/15 bg-white dark:bg-[#121417] text-[#141414] dark:text-[#F4F2ED] transition-colors hover:border-[#9A7228] dark:hover:border-[#C69C4E] hover:text-[#9A7228] dark:hover:text-[#C69C4E] cursor-pointer"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex md:hidden h-10 w-10 items-center justify-center border border-black/15 dark:border-white/15 bg-white dark:bg-[#121417] text-[#141414] dark:text-[#F4F2ED] transition-colors hover:text-[#9A7228] dark:hover:text-[#C69C4E] cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
            className="md:hidden border-b border-black/10 dark:border-white/10 bg-white dark:bg-[#121417] px-6 py-4"
          >
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              {NAV_LINKS.map((item) => {
                const isActive = currentPage === item.page;
                return (
                  <a
                    key={item.page}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(item.page);
                    }}
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex min-h-[44px] items-center justify-between border-b border-black/5 dark:border-white/5 text-base font-medium last:border-b-0 ${
                      isActive
                        ? 'text-[#9A7228] dark:text-[#C69C4E]'
                        : 'text-[#141414]/90 dark:text-[#F4F2ED]/90'
                    }`}
                  >
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
