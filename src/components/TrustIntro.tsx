import React from 'react';
import { Smile, Sparkles, HeartHandshake } from 'lucide-react';

export const TrustIntro: React.FC = () => {
  const features = [
    {
      icon: Smile,
      title: 'Personalized Fit',
      description: 'Dentures designed around your comfort and individual needs.'
    },
    {
      icon: Sparkles,
      title: 'Natural Appearance',
      description: 'Thoughtfully crafted for a natural-looking smile.'
    },
    {
      icon: HeartHandshake,
      title: 'Experienced Care',
      description: 'Personal attention from consultation through fitting.'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-stone-50/70 border-t border-stone-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro text */}
        <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-14">
          <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 tracking-tight mb-3">
            Dentures Made With Care
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Joan Andrews provides personalized denture care focused on comfort, fit, function, and helping patients feel confident in their smile again.
          </p>
        </div>

        {/* 3 Simple Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 sm:p-7 border border-stone-200/80 shadow-2xs hover:border-stone-300 transition-all text-center flex flex-col items-center"
              >
                <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center text-stone-800 mb-4">
                  <Icon className="w-5 h-5 stroke-[1.75]" />
                </div>
                <h3 className="text-base font-semibold text-stone-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-xs">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
