import React, { useState } from 'react';
import { X, Phone, Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { AppointmentFormData } from '../types';
import { SERVICES_DATA } from './ServicesSection';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId
}) => {
  const [formData, setFormData] = useState<AppointmentFormData>({
    fullName: '',
    phone: '',
    email: '',
    serviceId: preselectedServiceId || 'consultation',
    preferredTime: 'morning',
    notes: ''
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Basic validation
    if (!formData.fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMessage('Please enter a phone number so our clinic can reach you.');
      return;
    }

    setIsSubmitting(true);
    // Simulate swift confirmation
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 450);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      serviceId: 'consultation',
      preferredTime: 'morning',
      notes: ''
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-white w-full max-w-lg rounded-2xl border border-stone-200 shadow-xl overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header bar */}
        <div className="px-6 py-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
          <div>
            <h3 id="modal-title" className="font-serif text-xl text-stone-900 font-semibold">
              Request an Appointment
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Joan Andrews Denture Clinic · St. John&apos;s, NL
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-4 animate-fadeIn">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-800 rounded-full flex items-center justify-center mx-auto border border-emerald-900/10">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-2xl text-stone-900 font-semibold">
                Thank You, {formData.fullName.split(' ')[0]}!
              </h4>
              <p className="text-sm text-stone-600 max-w-sm mx-auto leading-relaxed">
                Your appointment request has been received. Our clinic will phone you at{' '}
                <strong className="text-stone-900 font-medium">{formData.phone}</strong> to confirm your exact visit time.
              </p>
              <div className="pt-2">
                <div className="p-3 bg-stone-50 rounded-xl text-xs text-stone-600 inline-block text-left mb-4">
                  <div><strong>Clinic:</strong> 538 Topsail Rd, St. John&apos;s</div>
                  <div><strong>Phone:</strong> (709) 364-8100</div>
                  <div><strong>Hours:</strong> Mon – Fri, 9:00 AM – 4:30 PM</div>
                </div>
              </div>
              <div>
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-stone-900 rounded-xl hover:bg-stone-800 cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-800 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Patient Name */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Full Name <span className="text-stone-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mary O'Brien"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-stone-900 focus:border-stone-900 transition-all text-stone-900"
                />
              </div>

              {/* Contact row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Phone Number <span className="text-stone-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(709) 555-0123"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-stone-900 focus:border-stone-900 transition-all text-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Email Address <span className="text-stone-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.ca"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-stone-900 focus:border-stone-900 transition-all text-stone-900"
                  />
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Reason for Visit
                </label>
                <select
                  value={formData.serviceId}
                  onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-stone-900 focus:border-stone-900 text-stone-900 cursor-pointer"
                >
                  <option value="consultation">Initial Consultation / Checkup</option>
                  {SERVICES_DATA.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title}
                    </option>
                  ))}
                  <option value="other">Other / Not Sure</option>
                </select>
              </div>

              {/* Preferred Time Window */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Preferred Time of Day
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
                      onClick={() => setFormData({ ...formData, preferredTime: time.id })}
                      className={`py-2 px-2 text-xs font-medium rounded-lg border text-center transition-all cursor-pointer ${
                        formData.preferredTime === time.id
                          ? 'border-stone-900 bg-stone-900 text-white shadow-2xs'
                          : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      {time.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Additional notes */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Any specific notes or questions?
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Existing denture feels loose, or interested in a complete new set..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-stone-900 focus:border-stone-900 text-stone-900"
                />
              </div>

              {/* Direct call banner & Submit */}
              <div className="pt-2 flex flex-col gap-2.5">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 text-sm font-semibold text-white bg-stone-900 rounded-xl hover:bg-stone-800 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-70"
                >
                  <Calendar className="w-4 h-4 text-stone-300" />
                  <span>{isSubmitting ? 'Submitting Request...' : 'Submit Request'}</span>
                </button>

                <div className="text-center text-xs text-stone-500 pt-1">
                  Prefer to speak right now?{' '}
                  <a
                    href="tel:+17093648100"
                    className="font-semibold text-stone-900 underline underline-offset-2 hover:text-stone-700"
                  >
                    Call (709) 364-8100
                  </a>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
