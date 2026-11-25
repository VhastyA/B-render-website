import { FormEvent, useEffect, useMemo, useState } from 'react';
import { AlertCircle, CheckCircle2, Minus, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { STUDIO_SERVICES, ServiceScopeId } from '../data/projects';

interface BookingSectionProps {
  preselectedService: ServiceScopeId;
  referenceProjectTitle: string | null;
}

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

export function BookingSection({
  preselectedService,
  referenceProjectTitle,
}: BookingSectionProps) {
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [serviceId, setServiceId] = useState<ServiceScopeId>(preselectedService);
  const [viewCount, setViewCount] = useState<number>(4);
  const [consultationDate, setConsultationDate] = useState('');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receipt, setReceipt] = useState<BookingReceipt | null>(null);

  useEffect(() => {
    setServiceId(preselectedService);
  }, [preselectedService]);

  useEffect(() => {
    if (referenceProjectTitle) {
      setNotes(`Reference: ${referenceProjectTitle}`);
    }
  }, [referenceProjectTitle]);

  const selectedService = useMemo(
    () => STUDIO_SERVICES.find((s) => s.id === serviceId) ?? STUDIO_SERVICES[0],
    [serviceId]
  );

  const minDate = useMemo(() => new Date().toISOString().split('T')[0], []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);

    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      setErrorMsg('Please enter your name.');
      return;
    }
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setErrorMsg('Please enter a valid email.');
      return;
    }
    if (!consultationDate) {
      setErrorMsg('Please select a consultation date.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: trimmedName,
          company: company.trim(),
          email: trimmedEmail,
          serviceTitle: selectedService.title,
          viewCount,
          consultationDate,
          notes: notes.trim(),
          estimatedDays: selectedService.turnaround,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Unable to submit booking.');
      }

      setReceipt(data as BookingReceipt);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Unable to submit booking.');
    } finally {
      setIsSubmitting(false);
    }
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
    <section className="bg-[#F7F6F3] dark:bg-[#0B0C0E] py-14 lg:py-20 transition-colors duration-200">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-[#141414] dark:text-[#F4F2ED] sm:text-3xl">
            Contact &amp; Booking
          </h1>
          <span className="text-xs text-[#5E5B54] dark:text-[#9E9A90]">
            studio@brenderstudio.com
          </span>
        </div>

        <div className="mt-8 border border-black/15 dark:border-white/15 bg-white dark:bg-[#121417] p-6 sm:p-10">
          {receipt ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9A7228] dark:text-[#C69C4E]">
                <CheckCircle2 className="w-4 h-4" />
                <span>Booking Confirmed · {receipt.referenceId}</span>
              </div>

              <dl className="grid grid-cols-1 gap-4 border-y border-black/10 dark:border-white/10 py-6 text-sm sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <dt className="text-xs text-[#5E5B54] dark:text-[#9E9A90]">Name</dt>
                  <dd className="mt-1 font-medium text-[#141414] dark:text-[#F4F2ED]">
                    {receipt.fullName}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-[#5E5B54] dark:text-[#9E9A90]">Service</dt>
                  <dd className="mt-1 font-medium text-[#141414] dark:text-[#F4F2ED]">
                    {receipt.serviceTitle}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-[#5E5B54] dark:text-[#9E9A90]">Views</dt>
                  <dd className="mt-1 font-medium text-[#141414] dark:text-[#F4F2ED] tabular-nums">
                    {receipt.viewCount}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-[#5E5B54] dark:text-[#9E9A90]">Date</dt>
                  <dd className="mt-1 font-medium text-[#141414] dark:text-[#F4F2ED] tabular-nums">
                    {receipt.consultationDate}
                  </dd>
                </div>
              </dl>

              <button
                type="button"
                onClick={resetForm}
                className="min-h-[44px] border border-black/20 dark:border-white/20 bg-[#F7F6F3] dark:bg-[#0B0C0E] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#141414] dark:text-[#F4F2ED] transition-colors hover:border-[#9A7228] dark:hover:border-[#C69C4E] hover:text-[#9A7228] dark:hover:text-[#C69C4E] cursor-pointer"
              >
                New Booking
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {errorMsg && (
                <div
                  role="alert"
                  className="flex items-center gap-2.5 border border-[#B84A2E]/60 bg-[#5C220E]/15 dark:bg-[#5C220E]/40 px-4 py-3 text-xs font-medium text-[#752C13] dark:text-[#F4F2ED]"
                >
                  <AlertCircle className="h-4 w-4 shrink-0 text-[#B84A2E] dark:text-[#E58A6E]" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                <div>
                  <label
                    htmlFor="booking-name"
                    className="block text-xs text-[#5E5B54] dark:text-[#9E9A90]"
                  >
                    Name *
                  </label>
                  <input
                    id="booking-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name"
                    className="mt-2 min-h-[44px] w-full border border-black/15 dark:border-white/15 bg-[#F7F6F3] dark:bg-[#0B0C0E] px-3.5 py-2.5 text-sm text-[#141414] dark:text-[#F4F2ED] placeholder:text-[#5E5B54]/60 dark:placeholder:text-[#9E9A90]/50 focus:border-[#9A7228] dark:focus:border-[#C69C4E] focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="booking-email"
                    className="block text-xs text-[#5E5B54] dark:text-[#9E9A90]"
                  >
                    Email *
                  </label>
                  <input
                    id="booking-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@studio.com"
                    className="mt-2 min-h-[44px] w-full border border-black/15 dark:border-white/15 bg-[#F7F6F3] dark:bg-[#0B0C0E] px-3.5 py-2.5 text-sm text-[#141414] dark:text-[#F4F2ED] placeholder:text-[#5E5B54]/60 dark:placeholder:text-[#9E9A90]/50 focus:border-[#9A7228] dark:focus:border-[#C69C4E] focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="booking-company"
                    className="block text-xs text-[#5E5B54] dark:text-[#9E9A90]"
                  >
                    Studio / Firm
                  </label>
                  <input
                    id="booking-company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Optional"
                    className="mt-2 min-h-[44px] w-full border border-black/15 dark:border-white/15 bg-[#F7F6F3] dark:bg-[#0B0C0E] px-3.5 py-2.5 text-sm text-[#141414] dark:text-[#F4F2ED] placeholder:text-[#5E5B54]/60 dark:placeholder:text-[#9E9A90]/50 focus:border-[#9A7228] dark:focus:border-[#C69C4E] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                <div>
                  <label
                    htmlFor="booking-service"
                    className="block text-xs text-[#5E5B54] dark:text-[#9E9A90]"
                  >
                    Service
                  </label>
                  <select
                    id="booking-service"
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value as ServiceScopeId)}
                    className="mt-2 min-h-[44px] w-full border border-black/15 dark:border-white/15 bg-[#F7F6F3] dark:bg-[#0B0C0E] px-3.5 py-2.5 text-sm text-[#141414] dark:text-[#F4F2ED] focus:border-[#9A7228] dark:focus:border-[#C69C4E] focus:outline-none"
                  >
                    {STUDIO_SERVICES.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <span className="block text-xs text-[#5E5B54] dark:text-[#9E9A90]">Views</span>
                  <div className="mt-2 flex min-h-[44px] items-center justify-between border border-black/15 dark:border-white/15 bg-[#F7F6F3] dark:bg-[#0B0C0E] px-2">
                    <button
                      type="button"
                      onClick={() => setViewCount((v) => Math.max(1, v - 1))}
                      aria-label="Decrease views"
                      className="inline-flex h-9 w-9 items-center justify-center text-[#5E5B54] dark:text-[#9E9A90] hover:text-[#141414] dark:hover:text-[#F4F2ED] cursor-pointer"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="text-sm font-medium text-[#141414] dark:text-[#F4F2ED] tabular-nums">
                      {viewCount}
                    </span>
                    <button
                      type="button"
                      onClick={() => setViewCount((v) => Math.min(12, v + 1))}
                      aria-label="Increase views"
                      className="inline-flex h-9 w-9 items-center justify-center text-[#5E5B54] dark:text-[#9E9A90] hover:text-[#141414] dark:hover:text-[#F4F2ED] cursor-pointer"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="booking-consult-date"
                    className="block text-xs text-[#5E5B54] dark:text-[#9E9A90]"
                  >
                    Date *
                  </label>
                  <input
                    id="booking-consult-date"
                    type="date"
                    required
                    min={minDate}
                    value={consultationDate}
                    onChange={(e) => setConsultationDate(e.target.value)}
                    className="mt-2 min-h-[44px] w-full border border-black/15 dark:border-white/15 bg-[#F7F6F3] dark:bg-[#0B0C0E] px-3.5 py-2.5 text-sm text-[#141414] dark:text-[#F4F2ED] focus:border-[#9A7228] dark:focus:border-[#C69C4E] focus:outline-none dark:[color-scheme:dark]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="booking-notes"
                  className="block text-xs text-[#5E5B54] dark:text-[#9E9A90]"
                >
                  Notes
                </label>
                <textarea
                  id="booking-notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Project notes..."
                  className="mt-2 w-full border border-black/15 dark:border-white/15 bg-[#F7F6F3] dark:bg-[#0B0C0E] px-3.5 py-2.5 text-sm text-[#141414] dark:text-[#F4F2ED] placeholder:text-[#5E5B54]/60 dark:placeholder:text-[#9E9A90]/50 focus:border-[#9A7228] dark:focus:border-[#C69C4E] focus:outline-none"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="min-h-[44px] border border-[#8E3B1D]/60 bg-[#5C220E] px-8 py-3 text-xs font-bold uppercase tracking-wider text-[#F4F2ED] transition-colors hover:bg-[#752C13] disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Booking'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
