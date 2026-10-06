import React, { useState, useEffect } from 'react';
import { Calendar, Phone } from 'lucide-react';

interface FloatingBookingCTAProps {
  onOpenBooking: () => void;
}

export const FloatingBookingCTA: React.FC<FloatingBookingCTAProps> = ({ onOpenBooking }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when user scrolls past 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Desktop Floating Pill: bottom-right */}
      <div className="hidden sm:flex fixed bottom-6 right-6 z-40 animate-fadeIn items-center gap-2">
        <a
          href="tel:+17093648100"
          className="p-3 bg-white hover:bg-stone-50 text-stone-800 rounded-full border border-stone-200/90 shadow-lg hover:shadow-xl transition-all flex items-center justify-center cursor-pointer"
          title="Call Joan Andrews Denture Clinic"
          aria-label="Call clinic directly"
        >
          <Phone className="w-4 h-4 text-stone-700" />
        </a>

        <button
          onClick={onOpenBooking}
          className="px-5 py-3 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-full shadow-lg hover:shadow-xl active:scale-95 transition-all flex items-center gap-2 cursor-pointer border border-stone-800"
        >
          <Calendar className="w-4 h-4 text-sky-300" />
          <span className="tracking-wide">BOOK A CONSULTATION</span>
        </button>
      </div>

      {/* Mobile Sticky Bottom CTA Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/80 p-3 shadow-xl flex items-center gap-2 animate-fadeIn">
        <a
          href="tel:+17093648100"
          className="w-1/3 py-2.5 text-xs font-medium text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-xl flex items-center justify-center gap-1.5"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Call</span>
        </a>

        <button
          onClick={onOpenBooking}
          className="w-2/3 py-2.5 text-xs font-semibold text-white bg-stone-900 rounded-xl flex items-center justify-center gap-2 active:scale-98 transition-all"
        >
          <Calendar className="w-3.5 h-3.5 text-sky-300" />
          <span>BOOK CONSULTATION</span>
        </button>
      </div>
    </>
  );
};
