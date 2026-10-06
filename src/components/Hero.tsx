import React from 'react';
import { Phone, Calendar, MapPin, Star, Play } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onPlayIntro?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onPlayIntro }) => {
  return (
    <section className="relative pt-12 pb-18 sm:pt-16 sm:pb-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Location Line & Animation pill */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 text-xs font-medium text-stone-600 bg-stone-100/80 px-3 py-1.5 rounded-full">
                <MapPin className="w-3.5 h-3.5 text-stone-500" />
                <span>St. John&apos;s, Newfoundland & Labrador</span>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span className="text-stone-500">538 Topsail Road</span>
              </div>

              {onPlayIntro && (
                <button
                  onClick={onPlayIntro}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-sky-800 bg-sky-50 hover:bg-sky-100/80 px-3 py-1.5 rounded-full transition-colors cursor-pointer border border-sky-200/60"
                >
                  <Play className="w-3 h-3 fill-sky-700" />
                  <span>Cinematic Anatomy Intro</span>
                </button>
              )}
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-stone-900 leading-[1.12] tracking-tight text-balance">
              A Confident Smile Starts Here.
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-stone-600 max-w-xl leading-relaxed font-normal">
              Personalized denture care focused on comfort, fit and confidence.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-stone-900 rounded-xl hover:bg-stone-800 active:scale-[0.99] transition-all shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-sky-300" />
                <span>BOOK A CONSULTATION</span>
              </button>

              <a
                href="tel:+17093648100"
                className="px-6 py-3.5 text-sm font-semibold text-stone-800 bg-stone-50 hover:bg-stone-100 border border-stone-200/90 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-stone-600" />
                <span>CALL 709-364-8100</span>
              </a>
            </div>

            {/* Trust Marker */}
            <div className="pt-4 border-t border-stone-100 flex items-center gap-3 text-xs text-stone-500">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                ))}
              </div>
              <span className="font-medium text-stone-800">5.0 Star Rating</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>Locally recommended in Newfoundland</span>
            </div>
          </div>

          {/* Right Visual Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Subtle hairline framing */}
              <div className="relative rounded-2xl overflow-hidden border border-stone-200/80 shadow-sm bg-stone-50">
                <img
                  src="/src/assets/images/hero_natural_smile_1791314418842.jpg"
                  alt="Healthy, natural and confident smile achieved with personalized dentures at Joan Andrews Denture Clinic"
                  className="w-full aspect-4/3 object-cover object-center"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />

                {/* Quiet caption badge */}
                <div className="p-4 bg-white/95 backdrop-blur-xs border-t border-stone-100 text-xs text-stone-600 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-stone-900 block">Personal Denture Craftsmanship</span>
                    <span className="text-[11px] text-stone-500">Tailored to your facial harmony & bite</span>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-emerald-800 font-medium bg-emerald-50 px-2 py-0.5 rounded border border-emerald-900/10">
                    Accepting Patients
                  </span>
                </div>
              </div>

              {/* Decorative minimal accent element */}
              <div className="absolute -bottom-3 -right-3 w-24 h-24 border-r-2 border-b-2 border-stone-200 rounded-br-2xl -z-10 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
