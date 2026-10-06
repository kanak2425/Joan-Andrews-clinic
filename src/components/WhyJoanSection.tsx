import React from 'react';
import { UserCheck, Sparkles, Smile, ShieldCheck, HeartHandshake } from 'lucide-react';

interface WhyJoanSectionProps {
  onOpenBooking: () => void;
}

export const WhyJoanSection: React.FC<WhyJoanSectionProps> = ({ onOpenBooking }) => {
  const points = [
    {
      icon: UserCheck,
      title: 'Personal Attention',
      description: 'Every patient receives individualized care from start to finish. You deal directly with Joan—never rotating technicians.'
    },
    {
      icon: ShieldCheck,
      title: 'Comfortable Fit',
      description: 'Thoughtful attention to anatomical fit, bite balance, and everyday comfort without painful rubbing or looseness.'
    },
    {
      icon: Smile,
      title: 'Natural Confidence',
      description: 'Helping patients feel completely at ease smiling, laughing, speaking, and enjoying their favorite foods again.'
    }
  ];

  return (
    <section id="about" className="py-20 sm:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Images Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              {/* Joan Portrait Card */}
              <div className="rounded-3xl overflow-hidden border border-stone-200 shadow-sm bg-white">
                <img
                  src="/src/assets/images/joan_andrews_portrait_1791314448633.jpg"
                  alt="Joan Andrews, experienced denturist in St. John's, NL"
                  className="w-full aspect-3/4 object-cover object-top"
                  loading="lazy"
                />
                <div className="p-4 bg-white border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-stone-900">
                      Joan Andrews
                    </h3>
                    <p className="text-xs text-stone-500">
                      Licensed Denturist · Topsail Road
                    </p>
                  </div>
                  <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-900/10">
                    Direct Care
                  </span>
                </div>
              </div>

              {/* Inset Operatory Room Card from Real Google Maps Photo */}
              <div className="hidden sm:flex items-center gap-3 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-stone-200 shadow-md absolute -bottom-6 -right-6 max-w-xs animate-fadeIn">
                <img
                  src="/src/assets/images/clinic_operatory_1.jpg"
                  alt="Real consultation operatory at 538 Topsail Road"
                  className="w-14 h-14 rounded-xl object-cover border border-stone-200 shrink-0"
                  loading="lazy"
                />
                <div className="text-xs">
                  <span className="font-semibold text-stone-900 block">Private Operatory</span>
                  <span className="text-[11px] text-stone-500">Our quiet 538 Topsail Rd fitting room</span>
                </div>
              </div>
            </div>
          </div>

          {/* Copy Column */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-stone-500 mb-2 block">
                The Joan Andrews Approach
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 tracking-tight leading-[1.15]">
                Care That Goes Beyond the Smile.
              </h2>
            </div>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              At Joan Andrews Denture Clinic, we know that visiting a denture provider can sometimes feel daunting. That is why our practice was intentionally established to be welcoming, quiet, and completely judgment-free. Joan takes the time to listen to your history, understand your everyday routine, and craft dentures that feel like a natural part of you.
            </p>

            {/* 3 Core Pillars */}
            <div className="space-y-4 pt-2">
              {points.map((pt, i) => {
                const Icon = pt.icon;
                return (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-[#FBFBFA] border border-stone-200/80 flex items-start gap-4 hover:border-stone-300 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white border border-stone-200/70 flex items-center justify-center text-stone-900 shrink-0 shadow-2xs">
                      <Icon className="w-5 h-5 stroke-[1.75]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-stone-900 mb-1">
                        {pt.title}
                      </h4>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {pt.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3.5 text-xs font-semibold text-white bg-stone-900 rounded-xl hover:bg-stone-800 transition-all shadow-xs cursor-pointer"
              >
                Meet Joan For a Consultation
              </button>

              <a
                href="tel:+17093648100"
                className="px-6 py-3.5 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-xl transition-all"
              >
                Call Clinic: 709-364-8100
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
