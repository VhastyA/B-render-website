import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BookingSection } from './components/BookingSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { ProjectGallery } from './components/ProjectGallery';
import { StudioServices } from './components/StudioServices';
import { PageRoute, ServiceScopeId } from './data/projects';

const ROUTE_PATHS: Record<PageRoute, string> = {
  home: '/',
  projects: '/projects',
  services: '/services',
  contact: '/contact',
};

function getRouteFromPath(pathname: string): PageRoute {
  const clean = pathname.toLowerCase().replace(/\/+$/, '') || '/';
  if (clean === '/projects') return 'projects';
  if (clean === '/services') return 'services';
  if (clean === '/contact') return 'contact';
  return 'home';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>(() =>
    getRouteFromPath(window.location.pathname)
  );
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem('brender-theme');
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {
      // Ignore storage access errors
    }
    return 'dark';
  });
  const [preselectedService, setPreselectedService] =
    useState<ServiceScopeId>('exterior-stills');
  const [referenceProjectTitle, setReferenceProjectTitle] = useState<string | null>(
    null
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try {
      localStorage.setItem('brender-theme', theme);
    } catch {
      // Ignore storage access errors
    }
  }, [theme]);

  useEffect(() => {
    const onPopState = () => {
      setCurrentPage(getRouteFromPath(window.location.pathname));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigateToPage = useCallback((page: PageRoute) => {
    const targetPath = ROUTE_PATHS[page];
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const handleCommissionScope = useCallback(
    (scope: ServiceScopeId, projectTitle: string) => {
      setPreselectedService(scope);
      setReferenceProjectTitle(projectTitle);
      navigateToPage('contact');
    },
    [navigateToPage]
  );

  const handleSelectServiceForBooking = useCallback(
    (serviceId: ServiceScopeId) => {
      setPreselectedService(serviceId);
      setReferenceProjectTitle(null);
      navigateToPage('contact');
    },
    [navigateToPage]
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F6F3] text-[#141414] dark:bg-[#0B0C0E] dark:text-[#F4F2ED] transition-colors duration-200">
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateToPage}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {currentPage === 'home' && <HeroSection onNavigate={navigateToPage} />}
            {currentPage === 'projects' && (
              <ProjectGallery onCommissionScope={handleCommissionScope} />
            )}
            {currentPage === 'services' && (
              <StudioServices
                onSelectServiceForBooking={handleSelectServiceForBooking}
              />
            )}
            {currentPage === 'contact' && (
              <BookingSection
                preselectedService={preselectedService}
                referenceProjectTitle={referenceProjectTitle}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer onNavigate={navigateToPage} />
    </div>
  );
}
