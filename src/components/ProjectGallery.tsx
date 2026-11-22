import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  SlidersHorizontal,
  X,
} from 'lucide-react';
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
  'All Renders',
  'Exterior',
  'Interior',
  'Civic & Cultural',
  'Hospitality',
];

export function ProjectGallery({ onCommissionScope }: ProjectGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All Renders');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [splitPercent, setSplitPercent] = useState<number>(100);
  const [clayCompareActive, setClayCompareActive] = useState<boolean>(false);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All Renders') return RENDER_PROJECTS;
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
    <section id="projects" className="border-b border-white/10 bg-[#0B0C0E] py-20 lg:py-28">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        {/* Section Header + Category Filters */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-[1.5px] w-7 bg-[#C69C4E]" aria-hidden="true" />
              <span className="text-xs font-medium tracking-[0.18em] uppercase text-[#9E9A90]">
                Selected Works
              </span>
            </div>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#F4F2ED] sm:text-4xl">
              Architectural <span className="text-[#C69C4E]">Render Archive</span>
            </h2>
          </div>

          <div
            className="flex flex-wrap items-center gap-1.5 rounded-sm border border-white/10 bg-[#121417] p-1"
            role="tablist"
            aria-label="Filter projects by typology"
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
                  className={`relative min-h-[40px] px-4 py-2 text-xs font-medium tracking-wide transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'text-[#0B0C0E]'
                      : 'text-[#9E9A90] hover:text-[#F4F2ED]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeGalleryTab"
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 rounded-[2px] bg-[#C69C4E]"
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Bento / Editorial Grid */}
        <motion.div
          layout
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-12"
        >
          {filteredProjects.map((project, idx) => {
            const isLead = activeCategory === 'All Renders' && idx === 0;
            const isWideLast =
              activeCategory === 'All Renders' && idx === filteredProjects.length - 1;
            const colSpanClass = isLead
              ? 'md:col-span-7'
              : activeCategory === 'All Renders' && idx === 1
                ? 'md:col-span-5'
                : isWideLast
                  ? 'md:col-span-12 lg:col-span-6'
                  : 'md:col-span-6';

            return (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className={`group flex flex-col overflow-hidden rounded-sm border border-white/10 bg-[#16181C] transition-colors duration-200 hover:border-[#C69C4E]/45 ${colSpanClass}`}
              >
                <button
                  type="button"
                  onClick={() => setSelectedIndex(idx)}
                  className="relative w-full overflow-hidden text-left focus-visible:outline-none cursor-pointer"
                  aria-label={`Inspect ${project.title} in high resolution`}
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-[#121417]">
                    <ResilientImage
                      src={project.image}
                      alt={`${project.title} architectural 3D render`}
                      fallbackTitle={project.title}
                      className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                    />
                  </div>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0C0E]/70 via-transparent to-transparent opacity-60 transition-opacity duration-200 group-hover:opacity-80"
                  />
                  <span className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-sm border border-white/20 bg-[#0B0C0E]/80 text-[#F4F2ED] opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
                    <Maximize2 className="w-4 h-4 text-[#C69C4E]" />
                  </span>
                </button>

                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#9E9A90]">
                      <span className="text-[#C69C4E] font-medium">{project.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.location}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">{project.year}</span>
                    </div>

                    <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-[#F4F2ED]">
                      {project.title}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-[#9E9A90] line-clamp-2">
                      {project.summary}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs">
                    <span className="font-mono text-[#9E9A90] truncate max-w-[65%]">
                      {project.specs.engine}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedIndex(idx)}
                      className="inline-flex items-center gap-1.5 font-medium text-[#F4F2ED] transition-colors hover:text-[#C69C4E] whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>Inspect Render</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#C69C4E]" />
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>

      {/* Fullscreen Lightbox Modal with Clay Lighting Study Comparison */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0C0E]/95 p-4 backdrop-blur-md sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={`${activeProject.title} render inspection`}
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-sm border border-white/15 bg-[#121417] lg:grid lg:grid-cols-12"
            >
              {/* Close button */}
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close lightbox"
                className="absolute right-4 top-4 z-30 inline-flex h-10 w-10 items-center justify-center rounded-sm border border-white/20 bg-[#0B0C0E]/85 text-[#F4F2ED] transition-colors hover:border-[#C69C4E] hover:text-[#C69C4E] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Media Viewport */}
              <div className="relative bg-[#0B0C0E] lg:col-span-8 flex flex-col justify-between">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  {/* Base Layer: Clay / Monochrome Illumination Study */}
                  <ResilientImage
                    src={activeProject.image}
                    alt={`${activeProject.title} clay lighting study`}
                    fallbackTitle={activeProject.title}
                    className="h-full w-full object-cover grayscale contrast-125 brightness-95"
                  />

                  {/* Top Layer: Final Full-Color 8K Render Clipped by Split Slider */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{
                      clipPath: `inset(0 ${100 - splitPercent}% 0 0)`,
                    }}
                  >
                    <ResilientImage
                      src={activeProject.image}
                      alt={`${activeProject.title} final render`}
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

                  {/* Navigation Arrows */}
                  {filteredProjects.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={showPrev}
                        aria-label="Previous render"
                        className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-sm border border-white/20 bg-[#0B0C0E]/75 text-[#F4F2ED] backdrop-blur-sm transition-colors hover:border-[#C69C4E] cursor-pointer"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={showNext}
                        aria-label="Next render"
                        className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-sm border border-white/20 bg-[#0B0C0E]/75 text-[#F4F2ED] backdrop-blur-sm transition-colors hover:border-[#C69C4E] cursor-pointer"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>

                {/* Lightbox Comparison Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 bg-[#16181C] px-5 py-3">
                  <button
                    type="button"
                    onClick={handleToggleClay}
                    className={`inline-flex min-h-[36px] items-center gap-2 rounded-sm border px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                      clayCompareActive
                        ? 'border-[#C69C4E] bg-[#C69C4E]/15 text-[#C69C4E]'
                        : 'border-white/15 bg-[#121417] text-[#F4F2ED]/85 hover:border-white/30'
                    }`}
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>
                      {clayCompareActive
                        ? 'Clay & Lighting Pass Active'
                        : 'Compare Lighting & Clay Pass'}
                    </span>
                  </button>

                  {clayCompareActive && (
                    <div className="flex flex-1 items-center gap-3 min-w-[180px] max-w-xs">
                      <span className="text-[11px] font-mono text-[#9E9A90]">Final</span>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={splitPercent}
                        onChange={(e) => setSplitPercent(Number(e.target.value))}
                        aria-label="Clay pass comparison slider"
                        className="w-full accent-[#C69C4E] cursor-pointer"
                      />
                      <span className="text-[11px] font-mono text-[#9E9A90]">Clay</span>
                    </div>
                  )}

                  <span className="font-mono text-xs text-[#9E9A90] tabular-nums">
                    {(selectedIndex ?? 0) + 1} / {filteredProjects.length}
                  </span>
                </div>
              </div>

              {/* Metadata & Commission Panel */}
              <div className="flex flex-col justify-between overflow-y-auto p-6 lg:col-span-4 lg:p-8">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#9E9A90]">
                    <span className="text-[#C69C4E] font-medium">{activeProject.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{activeProject.location}</span>
                  </div>

                  <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-[#F4F2ED]">
                    {activeProject.title}
                  </h3>

                  <p className="mt-4 text-sm leading-relaxed text-[#9E9A90]">
                    {activeProject.summary}
                  </p>

                  <dl className="mt-6 space-y-3 border-t border-white/10 pt-5 text-xs">
                    <div className="flex justify-between gap-4">
                      <dt className="text-[#9E9A90]">Architect</dt>
                      <dd className="font-medium text-[#F4F2ED] text-right">
                        {activeProject.architect}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-[#9E9A90]">Render Engine</dt>
                      <dd className="font-mono text-[#F4F2ED] text-right">
                        {activeProject.specs.engine}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-[#9E9A90]">Camera Optics</dt>
                      <dd className="font-mono text-[#F4F2ED] text-right tabular-nums">
                        {activeProject.specs.lens}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-[#9E9A90]">Master Output</dt>
                      <dd className="font-mono text-[#F4F2ED] text-right tabular-nums">
                        {activeProject.specs.resolution}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-[#9E9A90]">Atmosphere</dt>
                      <dd className="text-[#F4F2ED] text-right">
                        {activeProject.specs.lighting}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="mt-8 border-t border-white/10 pt-6">
                  <button
                    type="button"
                    onClick={() => {
                      const scope = activeProject.serviceType;
                      const title = activeProject.title;
                      closeModal();
                      onCommissionScope(scope, title);
                    }}
                    className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-sm border border-[#8E3B1D]/60 bg-[#5C220E] px-5 py-3 text-xs font-semibold tracking-[0.14em] uppercase text-[#F4F2ED] transition-colors hover:bg-[#752C13] cursor-pointer"
                  >
                    <span>Commission Similar Scope</span>
                    <ArrowUpRight className="w-4 h-4 text-[#C69C4E]" />
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
