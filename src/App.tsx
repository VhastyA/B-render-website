import { useCallback, useState } from 'react';
import { BookingSection } from './components/BookingSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { ProjectGallery } from './components/ProjectGallery';
import { StudioServices } from './components/StudioServices';
import { ServiceScopeId } from './data/projects';

export default function App() {
  const [preselectedService, setPreselectedService] =
    useState<ServiceScopeId>('exterior-stills');
  const [referenceProjectTitle, setReferenceProjectTitle] = useState<string | null>(
    null
  );

  const scrollToSection = useCallback((sectionId: string) => {
    if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleCommissionScope = useCallback(
    (scope: ServiceScopeId, projectTitle: string) => {
      setPreselectedService(scope);
      setReferenceProjectTitle(projectTitle);
      scrollToSection('booking');
    },
    [scrollToSection]
  );

  const handleSelectServiceForBooking = useCallback(
    (serviceId: ServiceScopeId) => {
      setPreselectedService(serviceId);
      setReferenceProjectTitle(null);
      scrollToSection('booking');
    },
    [scrollToSection]
  );

  return (
    <div className="min-h-screen bg-[#0B0C0E] text-[#F4F2ED]">
      <Navbar onNavigate={scrollToSection} />
      <main>
        <HeroSection
          onExploreGallery={() => scrollToSection('projects')}
          onExploreServices={() => scrollToSection('services')}
        />
        <ProjectGallery onCommissionScope={handleCommissionScope} />
        <StudioServices onSelectServiceForBooking={handleSelectServiceForBooking} />
        <BookingSection
          preselectedService={preselectedService}
          referenceProjectTitle={referenceProjectTitle}
        />
      </main>
      <Footer onNavigate={scrollToSection} />
    </div>
  );
}
