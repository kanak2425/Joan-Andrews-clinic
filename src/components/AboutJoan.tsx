import React from 'react';
import { Award, UserCheck, Shield, Sparkles } from 'lucide-react';

export const AboutJoan: React.FC = () => {
  return (
    <section id="about" className="py-20 sm:py-24 bg-[#FBFBFA] border-y border-stone-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Portrait Column */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <div className="rounded-2xl overflow-hidden border border-stone-200/90 shadow-xs bg-white">
                <img
                  src="/src/assets/images/joan_andrews_portrait_1791314448633.jpg"
                  alt="Joan Andrews, experienced denturist practitioner in St. John's, NL"
                  className="w-full aspect-3/4 object-cover object-top"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="p-4 bg-white border-t border-stone-100">
                  <div className="font-serif text-lg font-semibold text-stone-900">
                    Joan Andrews
                  </div>
                  <div className="text-xs text-stone-500 tracking-wide uppercase font-medium">
                    Licensed Denturist · St. John&apos;s, NL
                  </div>
                </div>
              </div>

              {/* Sub-card with real clinic operatory snapshot */}
              <div className="hidden sm:flex items-center gap-3 bg-white/95 backdrop-blur-xs p-3 rounded-xl border border-stone-200/80 shadow-xs absolute -bottom-6 -right-4 max-w-xs">
                <img
                  src="/src/assets/images/clinic_operatory_1.jpg"
                  alt="Joan Andrews Denture Clinic real operatory room and fitting chair"
                  className="w-14 h-14 rounded-lg object-cover border border-stone-100"
                  loading="lazy"
                />
                <div className="text-xs">
                  <span className="font-semibold text-stone-900 block">Private Fitting Suite</span>
                  <span className="text-[11px] text-stone-500">538 Topsail Road operatory</span>
                </div>
              </div>
            </div>
          </div>

          {/* Copy Column */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-stone-500 block">
              Meet Your Practitioner
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 tracking-tight">
              Personal Care. Professional Craft.
            </h2>

            <div className="space-y-4 text-stone-600 text-sm sm:text-base leading-relaxed">
              <p>
                At Joan Andrews Denture Clinic, you are never passed between rotating technicians or corporate departments. From your very first consultation to your final fitting, Joan personally oversees every detail of your care.
              </p>
              <p>
                With extensive clinical experience serving St. John&apos;s and surrounding communities across Newfoundland, Joan believes that successful dentures require both technical precision and genuine empathy. She takes time to listen to your history, understand any discomfort you may have endured, and craft a solution that fits securely and looks naturally radiant.
              </p>
              <p>
                Our Topsail Road clinic is intentionally warm, quiet, and welcoming—providing a relaxed, non-intimidating space where you can ask questions freely and leave with renewed confidence in your smile.
              </p>
            </div>

            {/* Core Values / Commitments */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-200/80">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-700 shrink-0">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
                    Direct Practitioner Care
                  </h4>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Consult, fit, and adjust with Joan at every stage.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-700 shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
                    Non-Intimidating Clinic
                  </h4>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Gentle, patient, and completely judgment-free.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-700 shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
                    Local Experience
                  </h4>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Decades of trusted service right on Topsail Road.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-700 shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
                    Confidence Restored
                  </h4>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Helping you eat, speak, and smile naturally again.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
