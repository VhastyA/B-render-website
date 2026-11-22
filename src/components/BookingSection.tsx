import { FormEvent, useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Mail,
  MapPin,
  Minus,
  Plus,
} from 'lucide-react';
import { motion } from 'motion/react';
import { STUDIO_SERVICES, ServiceScopeId } from '../data/projects';

interface BookingSectionProps {
  preselectedService: ServiceScopeId;
  referenceProjectTitle: string | null;
}

type CadStatus = '3d-model-ready' | 'cad-2d-drawings' | 'concept-sketches';

interface BookingReceipt {
  referenceId: string;
  fullName: string;
  email: string;
  company: string;
  serviceTitle: string;
  viewCount: number;
  consultationDate: string;
  estimatedDays: string;
}

const CAD_OPTIONS: { id: CadStatus; label: string }[] = [
  { id: '3d-model-ready', label: '3D Model Ready (Revit / Rhino / SketchUp)' },
  { id: 'cad-2d-drawings', label: '2D CAD Floorplans & Elevations' },
  { id: 'concept-sketches', label: 'Concept Massing / Reference Sketches' },
];

export function BookingSection({
  preselectedService,
  referenceProjectTitle,
}: BookingSectionProps) {
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [serviceId, setServiceId] = useState<ServiceScopeId>(preselectedService);
  const [viewCount, setViewCount] = useState<number>(4);
  const [cadStatus, setCadStatus] = useState<CadStatus>('3d-model-ready');
  const [consultationDate, setConsultationDate] = useState('');
  const [targetDelivery, setTargetDelivery] = useState('');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receipt, setReceipt] = useState<BookingReceipt | null>(null);

  useEffect(() => {
    setServiceId(preselectedService);
  }, [preselectedService]);

  useEffect(() => {
    if (referenceProjectTitle) {
      setNotes((prev) => {
        const prefix = `Reference project style: ${referenceProjectTitle}`;
        if (prev.includes(prefix)) return prev;
        return prev ? `${prefix}\n${prev}` : prefix;
      });
    }
  }, [referenceProjectTitle]);

  const selectedService = useMemo(
    () => STUDIO_SERVICES.find((s) => s.id === serviceId) ?? STUDIO_SERVICES[0],
    [serviceId]
  );

  const estimatedDays = useMemo(() => {
    const base =
      serviceId === 'architectural-film'
        ? 10
        : serviceId === 'competition-package'
          ? 4
          : 5;
    const perView = serviceId === 'architectural-film' ? 1 : 0.75;
    const cadExtra = cadStatus === '3d-model-ready' ? 0 : cadStatus === 'cad-2d-drawings' ? 2 : 3;
    const minDays = Math.round(base + (viewCount - 1) * perView + cadExtra);
    const maxDays = minDays + 2;
    return `${minDays}–${maxDays} Business Days`;
  }, [serviceId, viewCount, cadStatus]);

  const minDate = useMemo(() => new Date().toISOString().split('T')[0], []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);

    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setErrorMsg('Please enter a valid work email address.');
      return;
    }
    if (!consultationDate) {
      setErrorMsg('Please select a preferred kick-off consultation date.');
      return;
    }

    setIsSubmitting(true);

    // Deterministic brief processing feedback
    window.setTimeout(() => {
      const code = Math.floor(1000 + Math.random() * 9000);
      setReceipt({
        referenceId: `BR-2026-${code}`,
        fullName: trimmedName,
        email: trimmedEmail,
        company: company.trim() || 'Independent Practice',
        serviceTitle: selectedService.title,
        viewCount,
        consultationDate,
        estimatedDays,
      });
      setIsSubmitting(false);
    }, 400);
  };

  const resetForm = () => {
    setReceipt(null);
    setErrorMsg(null);
    setFullName('');
    setCompany('');
    setEmail('');
    setNotes('');
  };

  return (
    <section id="booking" className="bg-[#0B0C0E] py-20 lg:py-28">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-stretch">
          {/* Left Column: Studio Contact + Live Commission Estimator */}
          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-[1.5px] w-7 bg-[#C69C4E]" aria-hidden="true" />
                <span className="text-xs font-medium tracking-[0.18em] uppercase text-[#9E9A90]">
                  Project Commissions
                </span>
              </div>

              <h2 className="font-display text-3xl font-semibold tracking-tight text-[#F4F2ED] sm:text-4xl">
                Book a <span className="text-[#C69C4E]">3D Visualization</span> Slot
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-[#9E9A90]">
                Reserve studio capacity with B-Render Architectural Studio for upcoming renders,
                competition submissions, or investor films. We respond within one business day.
              </p>

              {/* Direct Studio Contact Details */}
              <div className="mt-8 space-y-4 border-t border-white/10 pt-6 text-sm">
                <div className="flex items-start gap-3 text-[#F4F2ED]/85">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#C69C4E]" />
                  <div>
                    <div className="font-medium text-[#F4F2ED]">
                      B-Render Architectural Studio
                    </div>
                    <div className="text-xs text-[#9E9A90]">
                      Accra Studio · Commissions Worldwide
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-[#F4F2ED]/85">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#C69C4E]" />
                  <div>
                    <div className="font-medium text-[#F4F2ED]">
                      studio@brenderstudio.com
                    </div>
                    <div className="text-xs text-[#9E9A90]">
                      Mon–Fri · 08:30–18:00 GMT
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Scope Summary Card */}
            <div className="mt-10 rounded-sm border border-white/10 bg-[#121417] p-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-semibold tracking-[0.14em] uppercase text-[#9E9A90]">
                  Estimated Scope Preview
                </span>
                <span className="font-mono text-xs text-[#C69C4E] tabular-nums">
                  {selectedService.index}
                </span>
              </div>

              <dl className="mt-4 space-y-3 text-xs">
                <div className="flex justify-between gap-4">
                  <dt className="text-[#9E9A90]">Discipline</dt>
                  <dd className="font-medium text-[#F4F2ED] text-right">
                    {selectedService.title}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[#9E9A90]">
                    {serviceId === 'architectural-film' ? 'Camera Sequences' : 'Hero Views'}
                  </dt>
                  <dd className="font-mono text-[#F4F2ED] tabular-nums">
                    {viewCount} {serviceId === 'architectural-film' ? 'Sequences' : 'Frames'}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[#9E9A90]">Estimated Delivery</dt>
                  <dd className="font-mono font-medium text-[#C69C4E] tabular-nums">
                    {estimatedDays}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[#9E9A90]">Deliverable Format</dt>
                  <dd className="font-mono text-[#F4F2ED]">
                    {serviceId === 'architectural-film' ? '4K ProRes & MP4' : '8K 16-bit TIFF'}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Right Column: Interactive Booking Form / Receipt */}
          <div className="lg:col-span-7">
            <div className="h-full rounded-sm border border-white/10 bg-[#16181C] p-6 sm:p-10">
              {receipt ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="flex h-full flex-col justify-between"
                >
                  <div>
                    <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.14em] uppercase text-[#C69C4E]">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Commission Inquiry Logged</span>
                    </div>

                    <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-[#F4F2ED] sm:text-3xl">
                      Thank you, {receipt.fullName}.
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-[#9E9A90]">
                      Your project parameters have been prepared for our visualization directors. A
                      calendar confirmation and NDA-ready upload link will be sent to{' '}
                      <span className="text-[#F4F2ED]">{receipt.email}</span>.
                    </p>

                    <dl className="mt-8 space-y-3 border-y border-white/10 py-6 text-sm">
                      <div className="flex justify-between gap-4">
                        <dt className="text-[#9E9A90]">Reference ID</dt>
                        <dd className="font-mono text-[#C69C4E] tabular-nums">
                          {receipt.referenceId}
                        </dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-[#9E9A90]">Practice / Studio</dt>
                        <dd className="text-[#F4F2ED]">{receipt.company}</dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-[#9E9A90]">Selected Scope</dt>
                        <dd className="text-[#F4F2ED]">{receipt.serviceTitle}</dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-[#9E9A90]">Requested Volume</dt>
                        <dd className="font-mono text-[#F4F2ED] tabular-nums">
                          {receipt.viewCount} views · {receipt.estimatedDays}
                        </dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-[#9E9A90]">Kick-off Consultation</dt>
                        <dd className="font-mono text-[#F4F2ED] tabular-nums">
                          {receipt.consultationDate}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div className="mt-8">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="inline-flex min-h-[44px] items-center justify-center rounded-sm border border-white/20 bg-[#121417] px-6 py-3 text-xs font-semibold tracking-[0.14em] uppercase text-[#F4F2ED] transition-colors hover:border-[#C69C4E] hover:text-[#C69C4E] cursor-pointer"
                    >
                      Submit Another Commission
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  {errorMsg && (
                    <div
                      role="alert"
                      className="flex items-center gap-2.5 rounded-sm border border-[#B84A2E]/60 bg-[#5C220E]/40 px-4 py-3 text-xs font-medium text-[#F4F2ED]"
                    >
                      <AlertCircle className="h-4 w-4 shrink-0 text-[#E58A6E]" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="booking-name"
                        className="block text-xs font-medium tracking-wide text-[#9E9A90]"
                      >
                        Full Name *
                      </label>
                      <input
                        id="booking-name"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Ama Mensah"
                        className="mt-2 min-h-[44px] w-full rounded-sm border border-white/15 bg-[#0B0C0E] px-3.5 py-2.5 text-sm text-[#F4F2ED] placeholder:text-[#9E9A90]/50 focus:border-[#C69C4E] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="booking-company"
                        className="block text-xs font-medium tracking-wide text-[#9E9A90]"
                      >
                        Architecture Firm / Studio
                      </label>
                      <input
                        id="booking-company"
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Okyere & Partners"
                        className="mt-2 min-h-[44px] w-full rounded-sm border border-white/15 bg-[#0B0C0E] px-3.5 py-2.5 text-sm text-[#F4F2ED] placeholder:text-[#9E9A90]/50 focus:border-[#C69C4E] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="booking-email"
                      className="block text-xs font-medium tracking-wide text-[#9E9A90]"
                    >
                      Work Email *
                    </label>
                    <input
                      id="booking-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="architect@practice.com"
                      className="mt-2 min-h-[44px] w-full rounded-sm border border-white/15 bg-[#0B0C0E] px-3.5 py-2.5 text-sm text-[#F4F2ED] placeholder:text-[#9E9A90]/50 focus:border-[#C69C4E] focus:outline-none"
                    />
                  </div>

                  {/* Service Discipline Selector */}
                  <div>
                    <span className="block text-xs font-medium tracking-wide text-[#9E9A90]">
                      Visualization Scope
                    </span>
                    <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {STUDIO_SERVICES.map((service) => {
                        const active = service.id === serviceId;
                        return (
                          <button
                            key={service.id}
                            type="button"
                            onClick={() => setServiceId(service.id)}
                            className={`flex min-h-[44px] items-center justify-between rounded-sm border px-3.5 py-2.5 text-left text-xs font-medium transition-colors cursor-pointer ${
                              active
                                ? 'border-[#C69C4E] bg-[#C69C4E]/10 text-[#F4F2ED]'
                                : 'border-white/10 bg-[#0B0C0E] text-[#9E9A90] hover:border-white/25 hover:text-[#F4F2ED]'
                            }`}
                          >
                            <span className="truncate">{service.title}</span>
                            <span className="ml-2 font-mono text-[11px] text-[#C69C4E] shrink-0">
                              {service.index}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* View Count Stepper + CAD Model Readiness */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <span className="block text-xs font-medium tracking-wide text-[#9E9A90]">
                        {serviceId === 'architectural-film'
                          ? 'Film Sequences'
                          : 'Number of Render Views'}
                      </span>
                      <div className="mt-2 flex min-h-[44px] items-center justify-between rounded-sm border border-white/15 bg-[#0B0C0E] px-2">
                        <button
                          type="button"
                          onClick={() => setViewCount((v) => Math.max(1, v - 1))}
                          aria-label="Decrease view count"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-sm text-[#9E9A90] transition-colors hover:bg-white/5 hover:text-[#F4F2ED] cursor-pointer"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="font-mono text-sm font-medium text-[#F4F2ED] tabular-nums">
                          {viewCount} {viewCount === 1 ? 'View' : 'Views'}
                        </span>
                        <button
                          type="button"
                          onClick={() => setViewCount((v) => Math.min(12, v + 1))}
                          aria-label="Increase view count"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-sm text-[#9E9A90] transition-colors hover:bg-white/5 hover:text-[#F4F2ED] cursor-pointer"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="booking-cad"
                        className="block text-xs font-medium tracking-wide text-[#9E9A90]"
                      >
                        Source Files Readiness
                      </label>
                      <select
                        id="booking-cad"
                        value={cadStatus}
                        onChange={(e) => setCadStatus(e.target.value as CadStatus)}
                        className="mt-2 min-h-[44px] w-full rounded-sm border border-white/15 bg-[#0B0C0E] px-3 py-2.5 text-xs text-[#F4F2ED] focus:border-[#C69C4E] focus:outline-none"
                      >
                        {CAD_OPTIONS.map((opt) => (
                          <option key={opt.id} value={opt.id}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Consultation & Target Delivery Dates */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="booking-consult-date"
                        className="block text-xs font-medium tracking-wide text-[#9E9A90]"
                      >
                        Preferred Consultation Date *
                      </label>
                      <div className="relative mt-2">
                        <input
                          id="booking-consult-date"
                          type="date"
                          required
                          min={minDate}
                          value={consultationDate}
                          onChange={(e) => setConsultationDate(e.target.value)}
                          className="min-h-[44px] w-full rounded-sm border border-white/15 bg-[#0B0C0E] px-3.5 py-2.5 text-sm text-[#F4F2ED] focus:border-[#C69C4E] focus:outline-none [color-scheme:dark]"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="booking-delivery-date"
                        className="block text-xs font-medium tracking-wide text-[#9E9A90]"
                      >
                        Target Final Delivery (Optional)
                      </label>
                      <input
                        id="booking-delivery-date"
                        type="date"
                        min={consultationDate || minDate}
                        value={targetDelivery}
                        onChange={(e) => setTargetDelivery(e.target.value)}
                        className="mt-2 min-h-[44px] w-full rounded-sm border border-white/15 bg-[#0B0C0E] px-3.5 py-2.5 text-sm text-[#F4F2ED] focus:border-[#C69C4E] focus:outline-none [color-scheme:dark]"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="booking-notes"
                      className="block text-xs font-medium tracking-wide text-[#9E9A90]"
                    >
                      Project Brief &amp; Lighting Mood Notes
                    </label>
                    <textarea
                      id="booking-notes"
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Describe site context, key materials, or preferred time-of-day mood..."
                      className="mt-2 w-full rounded-sm border border-white/15 bg-[#0B0C0E] px-3.5 py-2.5 text-sm text-[#F4F2ED] placeholder:text-[#9E9A90]/50 focus:border-[#C69C4E] focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2 text-xs text-[#9E9A90]">
                      <Calendar className="h-4 w-4 text-[#C69C4E]" />
                      <span>NDA protection standard on all CAD uploads</span>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex min-h-[44px] items-center justify-center rounded-sm border border-[#8E3B1D]/60 bg-[#5C220E] px-7 py-3 text-xs font-semibold tracking-[0.14em] uppercase text-[#F4F2ED] transition-colors hover:bg-[#752C13] disabled:opacity-60 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      {isSubmitting ? 'Logging Inquiry...' : 'Request Booking & Quote'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
