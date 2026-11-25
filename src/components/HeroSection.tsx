import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { HERO_RENDER, PageRoute, RENDER_PROJECTS } from '../data/projects';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  onNavigate: (page: PageRoute) => void;
}

const HERO_SLIDES = [
  {
    id: 'aburi-hero',
    image: HERO_RENDER.image,
    alt: HERO_RENDER.alt,
    title: 'Aburi Horizon Villa Terrace',
  },
  ...RENDER_PROJECTS.map((project) => ({
    id: project.id,
    image: project.image,
    alt: `${project.title} — ${project.location}`,
    title: project.title,
  })),
];

const SLIDE_INTERVAL_MS = 6800;

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    HERO_SLIDES.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, []);

  const currentSlide = HERO_SLIDES[activeIndex];

  return (
    <section className="bg-[#F7F6F3] dark:bg-[#0B0C0E] pt-8 pb-16 lg:pt-10 lg:pb-24 transition-colors duration-200">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        {/* Aligned crisp rectangular 3D render showcase */}
        <div className="relative aspect-[16/9] max-h-[70vh] w-full overflow-hidden border border-black/15 dark:border-white/15 bg-[#EFECE6] dark:bg-[#121417]">
          <AnimatePresence mode="sync" initial={false}>
            <motion.div
              key={currentSlide.id}
              initial={{
                opacity: 0,
                scale: shouldReduceMotion ? 1 : 1.045,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: {
                  opacity: {
                    duration: shouldReduceMotion ? 0.3 : 2.2,
                    ease: 'easeInOut',
                  },
                  scale: {
                    duration: shouldReduceMotion ? 0 : 9.0,
                    ease: 'easeOut',
                  },
                },
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: shouldReduceMotion ? 0.3 : 2.2,
                  ease: 'easeInOut',
                },
              }}
              className="absolute inset-0 will-change-transform"
            >
              <ResilientImage
                src={currentSlide.image}
                alt={currentSlide.alt}
                fallbackTitle={`B-Render Architectural Studio — ${currentSlide.title}`}
                className="h-full w-full object-cover object-center"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Minimal, direct studio title and multi-page links */}
        <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-[#141414] dark:text-[#F4F2ED] sm:text-3xl">
            <span className="text-[#9A7228] dark:text-[#C69C4E]">B-Render</span> Architectural Studio
          </h1>

          <div className="flex flex-wrap items-center gap-8">
            <button
              type="button"
              onClick={() => onNavigate('projects')}
              className="border-b border-black/30 dark:border-white/30 pb-1 text-sm font-medium text-[#141414] dark:text-[#F4F2ED] transition-colors hover:border-[#9A7228] dark:hover:border-[#C69C4E] hover:text-[#9A7228] dark:hover:text-[#C69C4E] cursor-pointer"
            >
              Projects
            </button>
            <button
              type="button"
              onClick={() => onNavigate('services')}
              className="border-b border-[#9A7228] dark:border-[#C69C4E] pb-1 text-sm font-medium text-[#9A7228] dark:text-[#C69C4E] transition-colors hover:border-[#141414] dark:hover:border-[#F4F2ED] hover:text-[#141414] dark:hover:text-[#F4F2ED] cursor-pointer"
            >
              Explore Our Services
            </button>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="border-b border-black/30 dark:border-white/30 pb-1 text-sm font-medium text-[#141414] dark:text-[#F4F2ED] transition-colors hover:border-[#9A7228] dark:hover:border-[#C69C4E] hover:text-[#9A7228] dark:hover:text-[#C69C4E] cursor-pointer"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
