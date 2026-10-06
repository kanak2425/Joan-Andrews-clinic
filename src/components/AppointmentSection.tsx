import React from 'react';
import { Calendar, Phone } from 'lucide-react';

interface AppointmentSectionProps {
  onOpenBooking: () => void;
}

export const AppointmentSection: React.FC<AppointmentSectionProps> = ({ onOpenBooking }) => {
  return (
    <section className="py-20 sm:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-[#FAF9F5] rounded-3xl border border-stone-200/90 p-8 sm:p-14 shadow-2xs">
          <span className="text-xs uppercase tracking-[0.2em] font-medium text-stone-500 mb-3 block">
            Begin With a Consultation
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 tracking-tight mb-4">
            Ready to Feel Confident in Your Smile?
          </h2>

          <p className="text-stone-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-8">
            Get in touch with Joan Andrews Denture Clinic to discuss your denture needs and find the right solution for you.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={onOpenBooking}
              className="px-6 py-3.5 text-sm font-semibold text-white bg-stone-900 rounded-xl hover:bg-stone-800 active:scale-[0.99] transition-all shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-stone-300" />
              <span>Book an Appointment</span>
            </button>

            <a
              href="tel:+17093648100"
              className="px-6 py-3.5 text-sm font-semibold text-stone-800 bg-white hover:bg-stone-50 border border-stone-200 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4 text-stone-600" />
              <span>Call 709-364-8100</span>
            </a>
          </div>

          <div className="mt-8 pt-6 border-t border-stone-200/60 flex flex-wrap items-center justify-center gap-6 text-xs text-stone-500">
            <span>538 Topsail Rd, St. John&apos;s, NL</span>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span>No Referral Required</span>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span>Wheelchair Accessible</span>
          </div>
        </div>
      </div>
    </section>
  );
};
