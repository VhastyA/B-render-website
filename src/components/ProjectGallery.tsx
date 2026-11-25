import { useCallback, useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, SlidersHorizontal, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ProjectCategory,
  RENDER_PROJECTS,
  RenderProject,
  ServiceScopeId,
} from '../data/projects';
import { ResilientImage } from './ResilientImage';

interface ProjectGalleryProps {
  onCommissionScope: (scope: ServiceScopeId, projectTitle: string) => void;
}

const CATEGORIES: ProjectCategory[] = [
  'All',
  'Exterior',
  'Interior',
  'Civic',
  'Hospitality',
];

export function ProjectGallery({ onCommissionScope }: ProjectGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [splitPercent, setSplitPercent] = useState<number>(100);
  const [clayCompareActive, setClayCompareActive] = useState<boolean>(false);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return RENDER_PROJECTS;
    return RENDER_PROJECTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const activeProject: RenderProject | null =
    selectedIndex !== null ? filteredProjects[selectedIndex] ?? null : null;

  const closeModal = useCallback(() => {
    setSelectedIndex(null);
    setClayCompareActive(false);
    setSplitPercent(100);
  }, []);

  const showPrev = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null) return null;
      return (prev - 1 + filteredProjects.length) % filteredProjects.length;
    });
  }, [filteredProjects.length]);

  const showNext = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null) return null;
      return (prev + 1) % filteredProjects.length;
    });
  }, [filteredProjects.length]);

  useEffect(() => {
    if (selectedIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedIndex, closeModal, showPrev, showNext]);

  const handleToggleClay = () => {
    setClayCompareActive((prev) => {
      const next = !prev;
      setSplitPercent(next ? 50 : 100);
      return next;
    });
  };

  return (
    <section className="bg-[#F7F6F3] dark:bg-[#0B0C0E] py-14 lg:py-20 transition-colors duration-200">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        {/* Header + Filter Tabs */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-[#141414] dark:text-[#F4F2ED] sm:text-3xl">
            Projects
          </h1>

          <div
            className="flex flex-wrap items-center gap-1 border border-black/15 dark:border-white/15 bg-white dark:bg-[#121417] p-1"
            role="tablist"
            aria-label="Filter projects"
          >
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    setActiveCategory(category);
                    setSelectedIndex(null);
                  }}
                  className={`relative min-h-[38px] px-4 py-1.5 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'text-[#0B0C0E]'
                      : 'text-[#5E5B54] dark:text-[#9E9A90] hover:text-[#141414] dark:hover:text-[#F4F2ED]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeGalleryTab"
                      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 bg-[#C69C4E]"
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Uniform Aligned 2x2 Grid */}
        <motion.div
          layout
          className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {filteredProjects.map((project, idx) => (
            <motion.article
              key={project.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col border border-black/15 dark:border-white/15 bg-white dark:bg-[#121417] transition-colors duration-200 hover:border-[#9A7228] dark:hover:border-[#C69C4E]/60"
            >
              <button
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className="relative w-full overflow-hidden text-left focus-visible:outline-none cursor-pointer"
                aria-label={`View ${project.title}`}
              >
                <div className="aspect-[4/3] w-full overflow-hidden border-b border-black/15 dark:border-white/15 bg-[#EFECE6] dark:bg-[#0B0C0E]">
                  <ResilientImage
                    src={project.image}
                    alt={`${project.title} architectural 3D render`}
                    fallbackTitle={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  />
                </div>
              </button>

              <div className="flex items-center justify-between gap-4 px-5 py-4">
                <div className="min-w-0">
                  <h2 className="truncate text-base font-bold text-[#141414] dark:text-[#F4F2ED]">
                    {project.title}
                  </h2>
                  <div className="mt-1 flex items-center gap-2 text-xs text-[#5E5B54] dark:text-[#9E9A90]">
                    <span className="text-[#9A7228] dark:text-[#C69C4E] font-medium">
                      {project.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="truncate">{project.location}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{project.year}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedIndex(idx)}
                  className="text-xs font-medium text-[#9A7228] dark:text-[#C69C4E] hover:text-[#141414] dark:hover:text-[#F4F2ED] whitespace-nowrap shrink-0 cursor-pointer"
                >
                  View
                </button>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 dark:bg-[#0B0C0E]/95 p-4 backdrop-blur-md sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={activeProject.title}
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden border border-black/20 dark:border-white/15 bg-white dark:bg-[#121417]"
            >
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close lightbox"
                className="absolute right-4 top-4 z-30 inline-flex h-10 w-10 items-center justify-center border border-black/20 dark:border-white/20 bg-white/90 dark:bg-[#0B0C0E]/85 text-[#141414] dark:text-[#F4F2ED] transition-colors hover:border-[#9A7228] dark:hover:border-[#C69C4E] hover:text-[#9A7228] dark:hover:text-[#C69C4E] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#EFECE6] dark:bg-[#0B0C0E]">
                <ResilientImage
                  src={activeProject.image}
                  alt={`${activeProject.title} clay study`}
                  fallbackTitle={activeProject.title}
                  className="h-full w-full object-cover grayscale contrast-125 brightness-95"
                />
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ clipPath: `inset(0 ${100 - splitPercent}% 0 0)` }}
                >
                  <ResilientImage
                    src={activeProject.image}
                    alt={activeProject.title}
                    fallbackTitle={activeProject.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                {clayCompareActive && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 w-[1.5px] bg-[#C69C4E]"
                    style={{ left: `${splitPercent}%` }}
                  />
                )}

                {filteredProjects.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={showPrev}
                      aria-label="Previous render"
                      className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center border border-white/25 bg-[#0B0C0E]/75 text-[#F4F2ED] hover:border-[#C69C4E] cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={showNext}
                      aria-label="Next render"
                      className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center border border-white/25 bg-[#0B0C0E]/75 text-[#F4F2ED] hover:border-[#C69C4E] cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-black/15 dark:border-white/15 bg-white dark:bg-[#121417] px-6 py-4">
                <div>
                  <h3 className="text-base font-bold text-[#141414] dark:text-[#F4F2ED]">
                    {activeProject.title}
                  </h3>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-[#5E5B54] dark:text-[#9E9A90]">
                    <span className="text-[#9A7228] dark:text-[#C69C4E]">
                      {activeProject.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{activeProject.location}</span>
                    <span aria-hidden="true">·</span>
                    <span>{activeProject.specs.engine}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleToggleClay}
                    className={`inline-flex min-h-[38px] items-center gap-2 border px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                      clayCompareActive
                        ? 'border-[#9A7228] dark:border-[#C69C4E] bg-[#C69C4E]/15 text-[#9A7228] dark:text-[#C69C4E]'
                        : 'border-black/15 dark:border-white/15 bg-[#F7F6F3] dark:bg-[#0B0C0E] text-[#141414] dark:text-[#F4F2ED]/85 hover:border-black/30 dark:hover:border-white/30'
                    }`}
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>Clay Pass</span>
                  </button>

                  {clayCompareActive && (
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={splitPercent}
                      onChange={(e) => setSplitPercent(Number(e.target.value))}
                      aria-label="Clay pass comparison slider"
                      className="w-28 accent-[#C69C4E] cursor-pointer"
                    />
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      const scope = activeProject.serviceType;
                      const title = activeProject.title;
                      closeModal();
                      onCommissionScope(scope, title);
                    }}
                    className="min-h-[38px] border border-[#8E3B1D]/60 bg-[#5C220E] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#F4F2ED] transition-colors hover:bg-[#752C13] cursor-pointer"
                  >
                    Book Similar
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
