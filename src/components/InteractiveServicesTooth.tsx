import React, { useState } from 'react';
import { SmilePlus, ShieldCheck, Wrench, RefreshCw, ArrowRight, CheckCircle2 } from 'lucide-react';

interface InteractiveServicesToothProps {
  onSelectService: (serviceId: string) => void;
}

export type ToothHighlightArea = 'full' | 'partial' | 'repair' | 'adjustment';

interface ServiceQuadrant {
  id: string;
  highlightArea: ToothHighlightArea;
  title: string;
  tagline: string;
  description: string;
  anatomicalFocus: string;
  benefits: string[];
}

const SERVICES_QUADRANTS: ServiceQuadrant[] = [
  {
    id: 'complete-dentures',
    highlightArea: 'full',
    title: 'Complete Dentures',
    tagline: 'Full smile arch replacement',
    description: 'Custom-sculpted full dentures engineered to recreate your natural facial harmony, proper lip support, and effortless chewing dynamics when all natural teeth are missing.',
    anatomicalFocus: 'Comprehensive Tooth & Ridge Alignment',
    benefits: [
      'Multi-layered acrylic teeth mimicking real enamel depth',
      'Engineered suction adhering comfortably to alveolar ridges',
      'Personalized try-in sessions before final acrylic processing'
    ]
  },
  {
    id: 'partial-dentures',
    highlightArea: 'partial',
    title: 'Partial Dentures',
    tagline: 'Preserving existing healthy teeth',
    description: 'Precision prosthetics designed when you retain one or several healthy natural teeth. Replaces missing gaps while guarding remaining teeth against shifting or tipping.',
    anatomicalFocus: 'Crown & Natural Clasp Retention',
    benefits: [
      'Discreet, low-profile retention clasps',
      'Seamless color-match to existing natural enamel',
      'Lightweight, bio-compatible framework'
    ]
  },
  {
    id: 'denture-repairs',
    highlightArea: 'repair',
    title: 'Denture Repairs',
    tagline: 'Restoring structure & function',
    description: 'Prompt, on-site laboratory repairs for cracked bases, chipped teeth, or fractured clasps. Restores original strength and surface integrity without messy temporary fixes.',
    anatomicalFocus: 'Enamel Surface & Acrylic Matrix',
    benefits: [
      'Fast turnaround at our Topsail Road clinic',
      'High-impact medical polymer bonding',
      'Bite check to identify the source of breakage'
    ]
  },
  {
    id: 'denture-adjustments',
    highlightArea: 'adjustment',
    title: 'Denture Adjustments',
    tagline: 'Relieving pressure & restoring suction',
    description: 'Fine chairside adjustments, soft relines, and re-basings as your gums naturally change shape over time. Eliminates sore spots, rubbing, and slipping.',
    anatomicalFocus: 'Alveolar Ridge & Gum Tissue Interface',
    benefits: [
      'Instant relief from painful pinching or sores',
      'Re-establishes balanced occlusion and bite pressure',
      'Gentle, unhurried chairside care by Joan'
    ]
  }
];

export const InteractiveServicesTooth: React.FC<InteractiveServicesToothProps> = ({ onSelectService }) => {
  const [activeArea, setActiveArea] = useState<ToothHighlightArea>('full');

  const activeService = SERVICES_QUADRANTS.find((s) => s.highlightArea === activeArea) || SERVICES_QUADRANTS[0];

  return (
    <section id="services" className="py-20 sm:py-28 bg-[#FBFBFA] border-y border-stone-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-14 sm:mb-18">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-stone-500 mb-2 block">
            Anatomical Service Map
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 tracking-tight mb-4">
            Denture Services Designed Around Anatomy
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Select an area of the tooth to explore how Joan Andrews tailors complete dentures, partials, repairs, and fine adjustments to your exact oral anatomy.
          </p>
        </div>

        {/* 2-Column Interactive Layout: Central Tooth + Interactive Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Interactive Tooth Anatomy Visual & Selector Pods */}
          <div className="lg:col-span-6 bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 shadow-xs flex flex-col items-center">
            {/* 4 Quadrant Selector Tabs */}
            <div className="w-full grid grid-cols-2 gap-2 mb-6">
              {SERVICES_QUADRANTS.map((quad) => {
                const isSelected = activeArea === quad.highlightArea;
                return (
                  <button
                    key={quad.id}
                    onClick={() => setActiveArea(quad.highlightArea)}
                    onMouseEnter={() => setActiveArea(quad.highlightArea)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                        : 'border-stone-200/70 bg-stone-50/60 text-stone-700 hover:bg-stone-100/70'
                    }`}
                  >
                    <div className="text-xs font-semibold">{quad.title}</div>
                    <div className={`text-[10px] truncate ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                      {quad.tagline}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Central Realistic 3D Tooth Model with Responsive Highlight Zones */}
            <div className="relative w-full max-w-sm aspect-square flex items-center justify-center p-2">
              {/* Central Realistic 3D Tooth */}
              <img
                src="/src/assets/images/chatgpt_tooth_full.png"
                alt="Interactive anatomical molar showing clinical denture focus zones"
                className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500"
              />

              {/* Subtly Animated Anatomical Target Overlays */}
              {activeArea === 'full' && (
                <div className="absolute inset-4 rounded-3xl border-2 border-stone-900/30 bg-stone-900/5 pointer-events-none animate-fadeIn flex items-center justify-center">
                  <div className="absolute top-4 bg-stone-900 text-white text-[10px] px-3 py-1 rounded-full font-medium shadow-sm">
                    Full Arch &amp; Occlusal Alignment
                  </div>
                </div>
              )}

              {activeArea === 'partial' && (
                <div className="absolute top-10 left-6 right-6 h-36 rounded-2xl border-2 border-sky-600/40 bg-sky-500/10 pointer-events-none animate-fadeIn flex items-start justify-center pt-2">
                  <div className="bg-sky-950 text-white text-[10px] px-3 py-1 rounded-full font-medium shadow-sm">
                    Natural Crown &amp; Clasp Interface
                  </div>
                </div>
              )}

              {activeArea === 'repair' && (
                <div className="absolute top-12 left-10 right-10 h-28 rounded-xl border-2 border-amber-600/40 bg-amber-500/10 pointer-events-none animate-fadeIn flex items-center justify-center">
                  <div className="bg-amber-950 text-white text-[10px] px-3 py-1 rounded-full font-medium shadow-sm">
                    Outer Enamel &amp; Acrylic Repair
                  </div>
                </div>
              )}

              {activeArea === 'adjustment' && (
                <div className="absolute bottom-8 left-12 right-12 h-36 rounded-2xl border-2 border-emerald-600/40 bg-emerald-500/10 pointer-events-none animate-fadeIn flex items-end justify-center pb-2">
                  <div className="bg-emerald-950 text-white text-[10px] px-3 py-1 rounded-full font-medium shadow-sm">
                    Alveolar Ridge &amp; Border Seal
                  </div>
                </div>
              )}
            </div>

            <span className="text-[11px] text-stone-400 mt-2 font-mono">
              Hover or click quadrants above to isolate dental zones
            </span>
          </div>

          {/* Service Clinical Insight Panel */}
          <div className="lg:col-span-6 bg-white rounded-3xl border border-stone-200/90 p-8 sm:p-10 shadow-xs flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-900/10 inline-block mb-3">
                  {activeService.anatomicalFocus}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-stone-900 font-semibold mb-2">
                  {activeService.title}
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {activeService.description}
                </p>
              </div>

              {/* Core Benefits */}
              <div className="space-y-2.5 pt-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-stone-900 block mb-2">
                  Clinical Standards &amp; Care
                </span>
                {activeService.benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-stone-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              {/* Direct Practitioner Reassurance */}
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100 text-xs text-stone-600 leading-relaxed">
                <strong className="text-stone-900 block mb-0.5">Direct Chairside Attention</strong>
                All assessments and fittings for {activeService.title.toLowerCase()} are personally managed by Joan Andrews at our St. John&apos;s clinic.
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-8 mt-6 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={() => onSelectService(activeService.id)}
                className="px-6 py-3.5 text-xs font-semibold text-white bg-stone-900 rounded-xl hover:bg-stone-800 active:scale-95 transition-all shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <span>Book For {activeService.title}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href="tel:+17093648100"
                className="text-xs font-semibold text-stone-800 hover:text-stone-950 underline underline-offset-4"
              >
                Call 709-364-8100
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
