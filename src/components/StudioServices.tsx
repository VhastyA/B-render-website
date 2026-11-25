import { Check } from 'lucide-react';
import { STUDIO_SERVICES, ServiceScopeId } from '../data/projects';

interface StudioServicesProps {
  onSelectServiceForBooking: (serviceId: ServiceScopeId) => void;
}

export function StudioServices({ onSelectServiceForBooking }: StudioServicesProps) {
  return (
    <section className="bg-[#F7F6F3] dark:bg-[#0B0C0E] py-14 lg:py-20 transition-colors duration-200">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        <h1 className="text-2xl font-bold tracking-tight text-[#141414] dark:text-[#F4F2ED] sm:text-3xl">
          Services
        </h1>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {STUDIO_SERVICES.map((service) => (
            <div
              key={service.id}
              className="flex flex-col justify-between border border-black/15 dark:border-white/15 bg-white dark:bg-[#121417] p-6 sm:p-8"
            >
              <div>
                <div className="flex items-center justify-between gap-4 border-b border-black/10 dark:border-white/10 pb-4">
                  <span className="text-xs font-bold text-[#9A7228] dark:text-[#C69C4E] tabular-nums">
                    {service.index}
                  </span>
                  <span className="text-xs text-[#5E5B54] dark:text-[#9E9A90] tabular-nums">
                    {service.turnaround}
                  </span>
                </div>

                <h2 className="mt-5 text-lg font-bold text-[#141414] dark:text-[#F4F2ED]">
                  {service.title}
                </h2>

                <ul className="mt-4 space-y-2">
                  {service.deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-sm text-[#5E5B54] dark:text-[#9E9A90]"
                    >
                      <Check
                        className="h-4 w-4 shrink-0 text-[#9A7228] dark:text-[#C69C4E]"
                        strokeWidth={2}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 border-t border-black/10 dark:border-white/10 pt-4">
                <button
                  type="button"
                  onClick={() => onSelectServiceForBooking(service.id)}
                  className="text-xs font-bold uppercase tracking-wider text-[#9A7228] dark:text-[#C69C4E] hover:text-[#141414] dark:hover:text-[#F4F2ED] cursor-pointer"
                >
                  Select Service
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
