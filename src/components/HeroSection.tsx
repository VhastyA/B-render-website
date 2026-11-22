import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  HERO_RENDER,
  RENDER_PROJECTS,
  STUDIO_METRICS,
} from '../data/projects';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  onExploreGallery: () => void;
  onExploreServices: () => void;
}

const HERO_SLIDES = [
  {
    id: 'aburi-hero',
    image: HERO_RENDER.image,
    alt: HERO_RENDER.alt,
    title: 'Aburi Horizon Villa Terrace',
    caption: HERO_RENDER.caption,
  },
  ...RENDER_PROJECTS.filter(
    (project) => project.image !== HERO_RENDER.image
  ).map((project) => ({
    id: project.id,
    image: project.image,
    alt: `${project.title} — ${project.location} 3D architectural visualization`,
    title: project.title,
    caption: `B-Render Architectural Studio · ${project.title} · ${project.specs.engine}`,
  })),
];

const SLIDE_INTERVAL_MS = 3800;

export function HeroSection({
  onExploreGallery,
  onExploreServices,
}: HeroSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  // Preload all hero slides so automatic transitions are instant without flicker
  useEffect(() => {
    HERO_SLIDES.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  // Always-on automatic transition loop
  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, []);

  const currentSlide = HERO_SLIDES[activeIndex];

  return (
    <section id="top" className="relative bg-[#0B0C0E]">
      {/* Pure, unobstructed, automatically transitioning 3D render showcase */}
      <div className="relative w-full border-b border-white/10 bg-[#121417]">
        <div className="mx-auto max-w-[1440px]">
          <div className="relative aspect-[16/10] max-h-[70vh] w-full overflow-hidden bg-[#0B0C0E]">
            <AnimatePresence mode="sync" initial={false}>
              <motion.div
                key={currentSlide.id}
                initial={{
                  opacity: 0,
                  scale: shouldReduceMotion ? 1 : 1.07,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  opacity: {
                    duration: shouldReduceMotion ? 0.25 : 1.15,
                    ease: [0.16, 1, 0.3, 1],
                  },
                  scale: {
                    duration: shouldReduceMotion ? 0 : 4.6,
                    ease: 'easeOut',
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
        </div>
      </div>

      {/* Minimalist Editorial Statement & Philosophy Block directly beneath hero image */}
      <div id="studio" className="border-b border-white/10 bg-[#0B0C0E]">
        <div className="mx-auto max-w-[1320px] px-6 py-14 sm:py-20 lg:px-10 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <h1 className="font-display text-2xl font-medium leading-[1.32] tracking-tight text-[#F4F2ED] sm:text-3xl lg:text-[2.25rem]">
              <span className="text-[#C69C4E]">B-Render Architectural Studio</span> is an
              architectural and design visualization studio creating hyper-realistic 3D spaces,
              daylight studies, and spatial narratives.
            </h1>

            <div className="mt-8 flex flex-wrap items-center gap-8">
              <button
                type="button"
                onClick={onExploreServices}
                className="border-b border-[#C69C4E] pb-1 text-base font-medium text-[#F4F2ED] transition-colors duration-150 hover:border-[#F4F2ED] hover:text-[#C69C4E] cursor-pointer"
              >
                Explore Our Services
              </button>

              <button
                type="button"
                onClick={onExploreGallery}
                className="border-b border-white/25 pb-1 text-base font-medium text-[#9E9A90] transition-colors duration-150 hover:border-[#C69C4E] hover:text-[#F4F2ED] cursor-pointer"
              >
                View Project Gallery
              </button>
            </div>
          </motion.div>

          {/* Studio Philosophy paragraph */}
          <div className="mt-16 grid grid-cols-1 gap-8 border-t border-white/10 pt-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              <p className="text-lg leading-relaxed text-[#F4F2ED]/85 sm:text-xl">
                The B-Render Architectural Studio philosophy is simple: Create beautiful,
                hyper-realistic visualizations that honor material grain, natural illumination,
                and architectural proportion before ground is broken.
              </p>
            </div>

            <div className="lg:col-span-5 lg:text-right">
              <span className="font-mono text-xs text-[#9E9A90]">{currentSlide.caption}</span>
            </div>
          </div>

          {/* 4-column studio metrics strip */}
          <div className="mt-14 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 md:grid-cols-4">
            {STUDIO_METRICS.map((metric) => (
              <div key={metric.label}>
                <div className="font-display text-2xl font-semibold tracking-tight text-[#C69C4E] tabular-nums sm:text-3xl">
                  {metric.value}
                </div>
                <div className="mt-1 text-xs font-medium tracking-wide text-[#9E9A90]">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
