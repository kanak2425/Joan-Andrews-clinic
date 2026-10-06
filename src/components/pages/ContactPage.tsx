import React, { useState } from 'react';
import { MapPin, Phone, Clock, Navigation, Car, Accessibility, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { SERVICES_DATA } from '../ServicesSection';

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const directionsUrl = 'https://www.google.com/maps/search/?api=1&query=538+Topsail+Rd+St+Johns+NL+A1E+2C5+Canada';

  const [formState, setFormState] = useState({
    fullName: '',
    phone: '',
    email: '',
    serviceId: 'consultation',
    preferredTime: 'morning',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.fullName.trim() || !formState.phone.trim()) {
      setError('Please provide your name and phone number.');
      return;
    }
    setError(null);
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

  return (
    <div className="py-12 sm:py-16 bg-white animate-fadeIn">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-3">
            <button onClick={() => onNavigate('home')} className="hover:text-stone-900 cursor-pointer">
              Home
            </button>
            <span>/</span>
            <span className="text-stone-900 font-medium">Contact &amp; Book</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 tracking-tight mb-4">
            Contact &amp; Book an Appointment
          </h1>
          <p className="text-stone-600 text-base leading-relaxed">
            Reach out directly to schedule a consultation, request a repair, or ask any questions about our denture care services.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          {/* Clinic Information Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FAF9F5] rounded-2xl border border-stone-200/90 p-6 sm:p-8 space-y-6 shadow-2xs">
              <div>
                <h2 className="font-serif text-2xl text-stone-900 font-semibold mb-1">
                  Joan Andrews Denture Clinic
                </h2>
                <p className="text-xs text-stone-500">
                  St. John&apos;s, Newfoundland &amp; Labrador
                </p>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-white border border-stone-200/70 flex items-center justify-center text-stone-800 shrink-0">
                  <MapPin className="w-4 h-4 text-stone-700" />
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-stone-900 block mb-0.5">Address</span>
                  <address className="not-italic text-stone-600 leading-relaxed text-xs sm:text-sm">
                    538 Topsail Rd<br />
                    St. John&apos;s, NL A1E 2C5<br />
                    Canada
                  </address>
                </div>
              </div>

              {/* Telephone */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-white border border-stone-200/70 flex items-center justify-center text-stone-800 shrink-0">
                  <Phone className="w-4 h-4 text-stone-700" />
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-stone-900 block mb-0.5">Phone</span>
                  <a
                    href="tel:+17093648100"
                    className="text-stone-900 font-semibold tabular-nums hover:underline"
                  >
                    +1 709-364-8100
                  </a>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Monday to Friday, 9:00 AM – 4:30 PM
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-white border border-stone-200/70 flex items-center justify-center text-stone-800 shrink-0">
                  <Clock className="w-4 h-4 text-stone-700" />
                </div>
                <div className="text-sm w-full">
                  <span className="font-semibold text-stone-900 block mb-1">Hours</span>
                  <div className="text-xs text-stone-600 space-y-1">
                    <div className="flex justify-between border-b border-stone-200/60 pb-1">
                      <span>Mon – Fri:</span>
                      <span className="font-medium text-stone-800">9:00 AM – 4:30 PM</span>
                    </div>
                    <div className="flex justify-between pt-0.5 text-stone-500">
                      <span>Sat – Sun:</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Access */}
              <div className="pt-2 flex flex-col gap-2 text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-stone-500" />
                  <span>Free on-site parking on Topsail Rd</span>
                </div>
                <div className="flex items-center gap-2">
                  <Accessibility className="w-4 h-4 text-stone-500" />
                  <span>Wheelchair accessible, ground-level entrance</span>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200/70 flex gap-3">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-1/2 py-2.5 px-3 text-xs font-semibold text-stone-800 bg-white border border-stone-300 rounded-xl hover:bg-stone-50 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Directions</span>
                </a>
                <a
                  href="tel:+17093648100"
                  className="w-1/2 py-2.5 px-3 text-xs font-semibold text-white bg-stone-900 rounded-xl hover:bg-stone-800 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Us</span>
                </a>
              </div>
            </div>
          </div>

          {/* Inline Appointment Request Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-10 shadow-2xs">
            <h2 className="font-serif text-2xl text-stone-900 font-semibold mb-1">
              Request an Appointment Online
            </h2>
            <p className="text-xs text-stone-500 mb-6">
              Fill out your details below and Joan Andrews Denture Clinic will reach out promptly to confirm.
            </p>

            {submitted ? (
              <div className="text-center py-10 space-y-4 animate-fadeIn">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-800 rounded-full flex items-center justify-center mx-auto border border-emerald-900/10">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl text-stone-900 font-semibold">
                  Request Received
                </h3>
                <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-stone-900">{formState.fullName}</strong>. We have logged your request and will call you at{' '}
                  <strong className="text-stone-900">{formState.phone}</strong> to confirm your consultation time.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({
                        fullName: '',
                        phone: '',
                        email: '',
                        serviceId: 'consultation',
                        preferredTime: 'morning',
                        notes: '',
                      });
                    }}
                    className="px-6 py-2.5 text-xs font-semibold text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-xl cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-800 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Full Name <span className="text-stone-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Mercer"
                    value={formState.fullName}
                    onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-stone-900 text-stone-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      Phone Number <span className="text-stone-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(709) 555-0199"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-stone-900 text-stone-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      Email Address <span className="text-stone-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.ca"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-stone-900 text-stone-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Service Required
                  </label>
                  <select
                    value={formState.serviceId}
                    onChange={(e) => setFormState({ ...formState, serviceId: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-stone-900 text-stone-900 cursor-pointer"
                  >
                    <option value="consultation">Initial Consultation / Checkup</option>
                    {SERVICES_DATA.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title}
                      </option>
                    ))}
                    <option value="other">Other / Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Preferred Time Window
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'morning', label: 'Morning (9–12)' },
                      { id: 'afternoon', label: 'Afternoon (12–4:30)' },
                      { id: 'flexible', label: 'Anytime' },
                    ].map((time) => (
                      <button
                        type="button"
                        key={time.id}
                        onClick={() => setFormState({ ...formState, preferredTime: time.id })}
                        className={`py-2 px-2 text-xs font-medium rounded-lg border text-center transition-all cursor-pointer ${
                          formState.preferredTime === time.id
                            ? 'border-stone-900 bg-stone-900 text-white shadow-2xs'
                            : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                        }`}
                      >
                        {time.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Message or Details
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Please let us know how we can help you..."
                    value={formState.notes}
                    onChange={(e) => setFormState({ ...formState, notes: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-stone-900 text-stone-900"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 text-sm font-semibold text-white bg-stone-900 rounded-xl hover:bg-stone-800 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-75"
                >
                  <Calendar className="w-4 h-4 text-stone-300" />
                  <span>{submitting ? 'Submitting...' : 'Request Appointment'}</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Facility Visual Guide & Embedded Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Real Photo Guide */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs flex flex-col justify-between">
            <div className="relative h-48 bg-stone-100 overflow-hidden">
              <img
                src="/src/assets/images/clinic_exterior_building.jpg"
                alt="Exterior of 538 Topsail Rd clinic building"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 to-transparent flex items-end p-4">
                <span className="text-white text-xs font-semibold drop-shadow-xs">
                  538 Topsail Road · Clinic Front &amp; Parking
                </span>
              </div>
            </div>
            <div className="p-5 text-xs text-stone-600 space-y-3">
              <p>
                <strong>Parking &amp; Entry:</strong> Free client parking is situated directly in front of the ground-level entryway. Wheelchair accessible with no steps or elevators required.
              </p>
              <div className="pt-2 border-t border-stone-100 flex items-center gap-3">
                <img
                  src="/src/assets/images/clinic_operatory_1.jpg"
                  alt="Operatory suite"
                  className="w-12 h-12 rounded-lg object-cover border border-stone-200"
                />
                <div>
                  <span className="font-semibold text-stone-900 block">Private Operatory</span>
                  <span className="text-[11px] text-stone-500">Sanitized, private fitting suite</span>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-7 rounded-2xl border border-stone-200 overflow-hidden shadow-2xs flex flex-col">
            <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between text-xs text-stone-600 bg-stone-50">
              <span className="font-medium text-stone-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-600" />
                538 Topsail Rd, St. John&apos;s, NL A1E 2C5
              </span>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-900 underline font-semibold hover:text-stone-700"
              >
                Open in Google Maps &rarr;
              </a>
            </div>
            <div className="w-full flex-1 min-h-[260px] bg-stone-100">
              <iframe
                title="Joan Andrews Denture Clinic Google Map"
                src="https://maps.google.com/maps?q=538+Topsail+Rd,+St.+John's,+NL+A1E+2C5,+Canada&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full min-h-[260px] border-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
