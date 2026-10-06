import React from 'react';
import { Calendar } from 'lucide-react';

interface SmileConfidenceProps {
  onOpenBooking: () => void;
}

export const SmileConfidence: React.FC<SmileConfidenceProps> = ({ onOpenBooking }) => {
  return (
    <section className="py-20 sm:py-24 bg-[#FBFBFA] border-y border-stone-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Image Column */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden border border-stone-200/90 shadow-xs bg-white">
              <img
                src="/src/assets/images/senior_confident_smile_1791314432472.jpg"
                alt="Older adult laughing and smiling naturally and comfortably with dentures"
                className="w-full aspect-4/3 object-cover object-center"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="p-4 bg-white border-t border-stone-100 flex items-center justify-between text-xs text-stone-600">
                <span className="font-medium text-stone-800">Real Patient Comfort</span>
                <span className="text-stone-400">Natural Bite & Clarity</span>
              </div>
            </div>
          </div>

          {/* Text Column */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-stone-500 block">
              Patient Well-Being
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 leading-[1.15] tracking-tight text-balance">
              More Than a Denture.<br />
              <span className="italic font-normal">A Reason to Smile Again.</span>
            </h2>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-xl">
              Missing or poorly fitting teeth do more than affect appearance—they can make sharing a meal with friends uncomfortable, alter clear speech, and slowly take away the simple joy of an effortless smile.
            </p>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-xl">
              Properly fitted dentures restore stability, alleviate tension in the jaw, and provide the natural facial support you deserve. At Joan Andrews Denture Clinic, our goal is simple: making you feel completely at ease smiling, laughing, and enjoying life every day.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-stone-900 rounded-xl hover:bg-stone-800 active:scale-[0.99] transition-all shadow-2xs inline-flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-stone-300" />
                <span>Book a Consultation</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
