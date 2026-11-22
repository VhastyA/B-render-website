import { useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import {
  STUDIO_SERVICES,
  STUDIO_WORKFLOW,
  ServiceScopeId,
} from '../data/projects';

interface StudioServicesProps {
  onSelectServiceForBooking: (serviceId: ServiceScopeId) => void;
}

export function StudioServices({ onSelectServiceForBooking }: StudioServicesProps) {
  const [activeServiceId, setActiveServiceId] =
    useState<ServiceScopeId>('exterior-stills');

  const activeService =
    STUDIO_SERVICES.find((s) => s.id === activeServiceId) ?? STUDIO_SERVICES[0];

  return (
    <section id="services" className="border-b border-white/10 bg-[#121417] py-20 lg:py-28">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        {/* Services Split Workspace */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-stretch">
          {/* Left: Service Selector List */}
          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-[1.5px] w-7 bg-[#C69C4E]" aria-hidden="true" />
                <span className="text-xs font-medium tracking-[0.18em] uppercase text-[#9E9A90]">
                  Visualization Capabilities
                </span>
              </div>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-[#F4F2ED] sm:text-4xl">
                Precision <span className="text-[#C69C4E]">Studio Services</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#9E9A90]">
                Select a discipline to inspect standard deliverables, production cadence, and
                technical preparation requirements.
              </p>
            </div>

            <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
              {STUDIO_SERVICES.map((service) => {
                const isSelected = service.id === activeServiceId;
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => setActiveServiceId(service.id)}
                    className={`group flex min-h-[60px] w-full items-center justify-between gap-4 py-4 text-left transition-colors cursor-pointer ${
                      isSelected ? 'text-[#F4F2ED]' : 'text-[#9E9A90] hover:text-[#F4F2ED]'
                    }`}
                  >
                    <div className="flex items-baseline gap-4">
                      <span
                        className={`font-mono text-xs tabular-nums ${
                          isSelected ? 'text-[#C69C4E]' : 'text-[#9E9A90]/70'
                        }`}
                      >
                        {service.index}.
                      </span>
                      <span className="font-display text-lg font-medium tracking-tight">
                        {service.title}
                      </span>
                    </div>
                    <span
                      className={`text-xs font-mono tabular-nums whitespace-nowrap shrink-0 ${
                        isSelected ? 'text-[#C69C4E]' : 'text-[#9E9A90]/60'
                      }`}
                    >
                      {service.turnaround}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Active Service Specification Panel */}
          <div className="lg:col-span-7 flex">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex w-full flex-col justify-between rounded-sm border border-white/10 bg-[#16181C] p-8 sm:p-10"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
                    <div className="flex items-center gap-3 text-xs text-[#9E9A90]">
                      <span className="font-mono text-[#C69C4E] tabular-nums">
                        {activeService.index}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>Standard Turnaround: {activeService.turnaround}</span>
                    </div>
                  </div>

                  <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-[#F4F2ED] sm:text-3xl">
                    {activeService.title}
                  </h3>

                  <p className="mt-4 text-base leading-relaxed text-[#F4F2ED]/80">
                    {activeService.description}
                  </p>

                  <div className="mt-8">
                    <h4 className="text-xs font-semibold tracking-[0.14em] uppercase text-[#9E9A90]">
                      Included Deliverables
                    </h4>
                    <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {activeService.deliverables.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-sm text-[#F4F2ED]/90"
                        >
                          <Check
                            className="mt-0.5 h-4 w-4 shrink-0 text-[#C69C4E]"
                            strokeWidth={2}
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-xs text-[#9E9A90]">
                    <span className="block text-[#F4F2ED]/70 font-medium">Recommended For</span>
                    <span>{activeService.idealFor}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectServiceForBooking(activeService.id)}
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-sm border border-[#8E3B1D]/60 bg-[#5C220E] px-6 py-3 text-xs font-semibold tracking-[0.14em] uppercase text-[#F4F2ED] transition-colors hover:bg-[#752C13] whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Book This Service</span>
                    <ArrowUpRight className="w-4 h-4 text-[#C69C4E]" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* 3-Step Studio Workflow */}
        <div id="process" className="mt-20 border-t border-white/10 pt-16">
          <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-[1.5px] w-7 bg-[#C69C4E]" aria-hidden="true" />
                <span className="text-xs font-medium tracking-[0.18em] uppercase text-[#9E9A90]">
                  Production Pipeline
                </span>
              </div>
              <h3 className="font-display text-2xl font-semibold tracking-tight text-[#F4F2ED] sm:text-3xl">
                From Architectural CAD to Final Light
              </h3>
            </div>
            <p className="max-w-md text-xs leading-relaxed text-[#9E9A90]">
              Structured milestones ensure zero surprises on materiality, camera perspective, or
              delivery dates.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {STUDIO_WORKFLOW.map((phase) => (
              <div
                key={phase.step}
                className="rounded-sm border border-white/10 bg-[#0B0C0E] p-7"
              >
                <div className="font-mono text-xs font-medium text-[#C69C4E] tabular-nums">
                  {phase.step}.
                </div>
                <h4 className="mt-3 font-display text-lg font-semibold text-[#F4F2ED]">
                  {phase.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-[#9E9A90]">{phase.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
