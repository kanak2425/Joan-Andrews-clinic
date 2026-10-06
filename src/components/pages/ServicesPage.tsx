import React, { useState } from 'react';
import { SERVICES_DATA } from '../ServicesSection';
import { CheckCircle2, Phone, Calendar, ArrowRight, ShieldCheck, Clock, HelpCircle } from 'lucide-react';

interface ServicesPageProps {
  onOpenBooking: (serviceId?: string) => void;
  onNavigate: (page: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenBooking, onNavigate }) => {
  const [selectedService, setSelectedService] = useState<string>(SERVICES_DATA[0].id);

  const active = SERVICES_DATA.find((s) => s.id === selectedService) || SERVICES_DATA[0];

  return (
    <div className="py-12 sm:py-16 bg-white animate-fadeIn">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb & Title */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-3">
            <button onClick={() => onNavigate('home')} className="hover:text-stone-900 cursor-pointer">
              Home
            </button>
            <span>/</span>
            <span className="text-stone-900 font-medium">Dentures &amp; Services</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 tracking-tight mb-4">
            Dentures &amp; Clinical Services
          </h1>
          <p className="text-stone-600 text-base leading-relaxed">
            Joan Andrews provides personalized, gentle denture solutions crafted for natural appearance, daily comfort, and longevity. All assessments and fittings are performed directly with Joan at our St. John&apos;s clinic.
          </p>
        </div>

        {/* Interactive Service Selector & Detail Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          {/* Service Tabs */}
          <div className="lg:col-span-4 space-y-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-stone-500 mb-2 block">
              Select a Service
            </span>
            {SERVICES_DATA.map((service) => (
              <button
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                  selectedService === service.id
                    ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                    : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50 hover:border-stone-300'
                }`}
              >
                <div className="font-serif text-lg font-semibold mb-1">
                  {service.title}
                </div>
                <div className={`text-xs line-clamp-2 ${selectedService === service.id ? 'text-stone-300' : 'text-stone-500'}`}>
                  {service.shortDesc}
                </div>
              </button>
            ))}

            <div className="pt-4">
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/80 text-xs text-stone-600">
                <span className="font-semibold text-stone-900 block mb-1">Emergency Denture Repairs</span>
                Broken or cracked denture? Call us directly at{' '}
                <a href="tel:+17093648100" className="text-stone-900 font-semibold underline">
                  709-364-8100
                </a>{' '}
                for prompt turnaround times.
              </div>
            </div>
          </div>

          {/* Active Service In-Depth View */}
          <div className="lg:col-span-8 bg-[#FAF9F5] rounded-2xl border border-stone-200/90 p-6 sm:p-10 shadow-2xs">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-stone-200/70">
              <div>
                <span className="text-xs uppercase tracking-wider font-medium text-stone-500 block mb-1">
                  Service Overview
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 font-semibold">
                  {active.title}
                </h2>
              </div>
              <button
                onClick={() => onOpenBooking(active.id)}
                className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors shadow-2xs cursor-pointer flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book For This Service</span>
              </button>
            </div>

            <div className="py-6 space-y-6">
              <div>
                <h3 className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-2">
                  Clinical Description
                </h3>
                <p className="text-sm text-stone-700 leading-relaxed">
                  {active.fullDesc}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-3">
                  What You Can Expect
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {active.benefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-stone-200/70 text-xs text-stone-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-200/70 text-xs">
                <div className="flex items-center gap-2 text-stone-600">
                  <Clock className="w-4 h-4 text-stone-400" />
                  <span><strong>Timeline:</strong> {active.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-stone-600">
                  <ShieldCheck className="w-4 h-4 text-stone-400" />
                  <span><strong>Suited For:</strong> {active.recommendedFor}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-stone-200/70 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-stone-500">
                Have questions before booking? Call our clinic directly.
              </span>
              <a
                href="tel:+17093648100"
                className="text-xs font-semibold text-stone-900 hover:underline flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call (709) 364-8100</span>
              </a>
            </div>
          </div>
        </div>

        {/* Simple Denture Care FAQs */}
        <div className="pt-12 border-t border-stone-200">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <h3 className="font-serif text-2xl text-stone-900 font-semibold mb-2">
              Common Questions About Denture Care
            </h3>
            <p className="text-xs text-stone-500">
              Clear answers to help you feel informed and comfortable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-stone-50 p-5 rounded-xl border border-stone-200/80">
              <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-stone-500" />
                How often should dentures be checked or adjusted?
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                We recommend an annual checkup to assess gum tissue health and verify your bite alignment. If you experience soreness, slipping, or trouble chewing, an adjustment should be made immediately.
              </p>
            </div>

            <div className="bg-stone-50 p-5 rounded-xl border border-stone-200/80">
              <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-stone-500" />
                Do I need a dental referral to visit Joan Andrews?
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                No referral is required. You can contact our clinic directly to book a consultation for new dentures, partial dentures, relines, or repairs.
              </p>
            </div>

            <div className="bg-stone-50 p-5 rounded-xl border border-stone-200/80">
              <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-stone-500" />
                How long does it take to get used to new dentures?
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Most patients adapt within a few weeks as mouth muscles and tongue learn the new contours. Joan provides follow-up fine-tuning appointments to ensure total comfort.
              </p>
            </div>

            <div className="bg-stone-50 p-5 rounded-xl border border-stone-200/80">
              <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-stone-500" />
                Can broken or cracked dentures be repaired?
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Yes! Most fractures, chips, or loose teeth can be professionally repaired in our St. John&apos;s clinic. Never attempt to glue dentures at home with household adhesives.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
