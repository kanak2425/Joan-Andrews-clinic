import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Wrench, RefreshCw, SmilePlus } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectService: (serviceId: string) => void;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'complete-dentures',
    title: 'Complete Dentures',
    shortDesc: 'Full dentures designed for patients who need a complete replacement of their natural teeth.',
    fullDesc: 'When all natural teeth in either the upper or lower jaw need replacement, complete dentures restore both the appearance of your natural smile and the structural support of your lips and cheeks. Every set is custom-crafted to harmonize with your facial contours, skin tone, and personal smile preferences.',
    benefits: [
      'Custom acrylic shading for a lifelike appearance',
      'Precise alveolar ridge suction for secure fit',
      'Restores clear speech and confident chewing',
      'Multiple try-in visits to ensure perfect aesthetics'
    ],
    duration: 'Multi-stage personalized fitting',
    recommendedFor: 'Patients missing all upper or lower teeth'
  },
  {
    id: 'partial-dentures',
    title: 'Partial Dentures',
    shortDesc: 'Comfortable solutions for replacing missing teeth while preserving your natural smile.',
    fullDesc: 'Partial dentures are designed when one or more of your natural teeth remain healthy. They fill in the gaps with precision prosthetic teeth, preventing adjacent natural teeth from shifting out of alignment while restoring full chewing function and a seamless smile.',
    benefits: [
      'Preserves and protects your existing healthy teeth',
      'Discreet, precision-fitted retention clasps',
      'Lightweight and comfortable for daily wear',
      'Removable for easy cleaning and hygiene'
    ],
    duration: 'Custom impressions & personalized alignment',
    recommendedFor: 'Patients with one or several missing teeth'
  },
  {
    id: 'denture-repairs',
    title: 'Denture Repairs',
    shortDesc: 'Professional repairs to help restore the comfort and function of your dentures.',
    fullDesc: 'Accidental drops, normal wear, or changes in bite pressure can cause cracks, fractured acrylic, or loosened teeth. Joan Andrews provides professional on-site repairs to restore structural integrity quickly, safely, and cleanly.',
    benefits: [
      'Prompt local turnaround to minimize downtime',
      'Medical-grade acrylic reinforcement',
      'Tooth re-bonding and fracture sealing',
      'Integrity inspection to prevent future breaks'
    ],
    duration: 'Same-day or expedited turnaround',
    recommendedFor: 'Cracked, chipped, or fractured dentures'
  },
  {
    id: 'denture-adjustments',
    title: 'Denture Adjustments',
    shortDesc: 'Fine adjustments to improve fit, comfort, and everyday confidence.',
    fullDesc: 'Over time, your gums and jawbone naturally change shape, which can cause dentures to loosen, rub, or create sore spots. Joan performs precise micro-adjustments and relines to restore snug suction, relieve pressure points, and bring back total comfort.',
    benefits: [
      'Immediate relief from sore spots and rubbing',
      'Relining to adapt to natural gum changes',
      'Bite rebalancing for smoother chewing',
      'Gentle, non-intimidating chairside care'
    ],
    duration: 'Quick chairside visit',
    recommendedFor: 'Loose fitting dentures or localized soreness'
  }
];

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'complete-dentures':
        return SmilePlus;
      case 'partial-dentures':
        return ShieldCheck;
      case 'denture-repairs':
        return Wrench;
      case 'denture-adjustments':
        return RefreshCw;
      default:
        return SmilePlus;
    }
  };

  return (
    <section id="services" className="py-20 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-2xl mx-auto text-center mb-14 sm:mb-16">
          <span className="text-xs uppercase tracking-[0.2em] font-medium text-stone-500 mb-2 block">
            Comprehensive Denture Care
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 tracking-tight mb-4">
            Denture Services
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Every smile has unique anatomical needs. Joan Andrews delivers focused, gentle denture solutions crafted with precision materials right here in St. John&apos;s.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {SERVICES_DATA.map((service) => {
            const Icon = getServiceIcon(service.id);
            const isExpanded = expandedId === service.id;

            return (
              <div
                key={service.id}
                className={`bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-8 transition-all duration-200 flex flex-col justify-between hover:-translate-y-1 hover:border-stone-300 hover:shadow-xs ${
                  isExpanded ? 'ring-1 ring-stone-900/10' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-stone-50 border border-stone-100 flex items-center justify-center text-stone-800">
                      <Icon className="w-5 h-5 stroke-[1.75]" />
                    </div>
                    <span className="text-xs font-medium text-stone-400">
                      St. John&apos;s Clinic
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl text-stone-900 font-semibold mb-2.5">
                    {service.title}
                  </h3>

                  <p className="text-sm text-stone-600 leading-relaxed mb-4">
                    {service.shortDesc}
                  </p>

                  {/* Expandable Clinical Details */}
                  {isExpanded && (
                    <div className="pt-4 border-t border-stone-100 space-y-4 animate-fadeIn">
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {service.fullDesc}
                      </p>

                      <div className="space-y-1.5">
                        <span className="text-[11px] font-semibold text-stone-900 uppercase tracking-wider block">
                          Key Benefits
                        </span>
                        {service.benefits.map((benefit, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-stone-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-800 shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>

                      <div className="bg-stone-50 p-3 rounded-lg text-[11px] text-stone-500 flex items-center justify-between">
                        <span><strong>Recommended:</strong> {service.recommendedFor}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-6 mt-4 border-t border-stone-100/80 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : service.id)}
                    className="text-xs font-medium text-stone-600 hover:text-stone-900 underline underline-offset-4 cursor-pointer"
                  >
                    {isExpanded ? 'Show less' : 'Learn more'}
                  </button>

                  <button
                    onClick={() => onSelectService(service.id)}
                    className="text-xs font-semibold text-stone-900 hover:text-stone-700 inline-flex items-center gap-1.5 group cursor-pointer"
                  >
                    <span>Inquire about this</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quiet Note */}
        <div className="mt-12 text-center text-xs text-stone-500">
          Not sure which option is best? We offer relaxed, informative consultations to assess your gums and explain your options with zero pressure.
        </div>
      </div>
    </section>
  );
};
