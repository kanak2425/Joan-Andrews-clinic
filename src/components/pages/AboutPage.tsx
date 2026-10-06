import React from 'react';
import { Calendar, Phone, CheckCircle2, Heart, Award, Sparkles, MapPin } from 'lucide-react';

interface AboutPageProps {
  onOpenBooking: () => void;
  onNavigate: (page: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenBooking, onNavigate }) => {
  return (
    <div className="py-12 sm:py-16 bg-white animate-fadeIn">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-3">
            <button onClick={() => onNavigate('home')} className="hover:text-stone-900 cursor-pointer">
              Home
            </button>
            <span>/</span>
            <span className="text-stone-900 font-medium">About Joan</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 tracking-tight mb-4">
            About Joan Andrews Denture Clinic
          </h1>
          <p className="text-stone-600 text-base leading-relaxed">
            Founded on patient-first values, genuine listening, and precise clinical craft on Topsail Road, St. John&apos;s.
          </p>
        </div>

        {/* Main Practitioner Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-xs bg-white">
              <img
                src="/src/assets/images/joan_andrews_portrait_1791314448633.jpg"
                alt="Joan Andrews, denturist in St. John's, Newfoundland"
                className="w-full aspect-3/4 object-cover object-top"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              <div className="p-4 bg-white border-t border-stone-100">
                <span className="font-serif text-xl font-semibold text-stone-900 block">Joan Andrews</span>
                <span className="text-xs text-stone-500">Practicing Denturist · Topsail Road</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5 text-stone-600 text-sm sm:text-base leading-relaxed">
            <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 font-semibold tracking-tight">
              A Personal Approach to Denture Care
            </h2>
            <p>
              Joan Andrews has dedicated her career to helping patients across St. John&apos;s and neighboring Newfoundland communities rediscover what it feels like to chew with ease, speak with clarity, and smile with genuine confidence.
            </p>
            <p>
              Unlike larger corporate dental environments where patients are often examined by one person and fitted by another, Joan personally manages every step of your care. From preliminary impressions and bite registrations to wax try-ins, acrylic finishing, and subsequent adjustments, she stays directly involved.
            </p>
            <p>
              She understands that visiting a denture clinic can occasionally feel intimidating, especially for individuals who have struggled with ill-fitting prosthetics or discomfort in the past. That is why our clinic maintains a gentle, compassionate, and unhurried environment.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={onOpenBooking}
                className="px-5 py-3 text-xs font-semibold text-white bg-stone-900 rounded-xl hover:bg-stone-800 transition-colors shadow-2xs cursor-pointer flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-stone-300" />
                <span>Book a Consultation</span>
              </button>

              <a
                href="tel:+17093648100"
                className="px-5 py-3 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-stone-600" />
                <span>Call (709) 364-8100</span>
              </a>
            </div>
          </div>
        </div>

        {/* Guiding Principles */}
        <div className="bg-[#FAF9F5] rounded-3xl border border-stone-200/90 p-8 sm:p-12 mb-16">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-wider font-semibold text-stone-500 block mb-1">
              Our Practice Philosophy
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-stone-900 font-semibold">
              The Standards We Uphold Every Day
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-stone-200/80">
              <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center text-stone-800 mb-4">
                <Heart className="w-5 h-5 text-rose-800" />
              </div>
              <h4 className="text-sm font-semibold text-stone-900 mb-2">
                Patience &amp; Respect
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                We take all the time necessary to hear your concerns. No rush, no clinical jargon, and complete respect for your personal preferences.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200/80">
              <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center text-stone-800 mb-4">
                <Award className="w-5 h-5 text-emerald-800" />
              </div>
              <h4 className="text-sm font-semibold text-stone-900 mb-2">
                Precision Hand Craftsmanship
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Dentures crafted with medical-grade resins, subtle tooth shading, and contours tailored specifically to your facial symmetry and alveolar ridge.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200/80">
              <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center text-stone-800 mb-4">
                <Sparkles className="w-5 h-5 text-amber-700" />
              </div>
              <h4 className="text-sm font-semibold text-stone-900 mb-2">
                Ongoing Long-Term Support
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Our care does not end when you walk out the door. We provide adjustments and maintenance whenever your gums naturally adapt over time.
              </p>
            </div>
          </div>
        </div>

        {/* Real Clinic Photos Showcase */}
        <div className="mb-16">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs uppercase tracking-wider font-semibold text-stone-500 block mb-1">
              Our St. John&apos;s Facility
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-stone-900 font-semibold">
              Tour Our Clinic at 538 Topsail Road
            </h3>
            <p className="text-xs text-stone-600 mt-2">
              Clean, quiet, and designed specifically for your comfort and dignity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-2xs">
              <img
                src="/src/assets/images/clinic_exterior_building.jpg"
                alt="Clinic exterior building on Topsail Road"
                className="w-full aspect-4/3 object-cover"
                loading="lazy"
              />
              <div className="p-3 text-xs">
                <span className="font-semibold text-stone-900 block">Clinic Exterior</span>
                <span className="text-[11px] text-stone-500">Free parking directly in front</span>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-2xs">
              <img
                src="/src/assets/images/clinic_operatory_1.jpg"
                alt="Private patient fitting operatory"
                className="w-full aspect-4/3 object-cover"
                loading="lazy"
              />
              <div className="p-3 text-xs">
                <span className="font-semibold text-stone-900 block">Fitting &amp; Operatory</span>
                <span className="text-[11px] text-stone-500">Private chairside room</span>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-2xs">
              <img
                src="/src/assets/images/clinic_reception_interior.jpg"
                alt="Welcoming reception and waiting area"
                className="w-full aspect-4/3 object-cover"
                loading="lazy"
              />
              <div className="p-3 text-xs">
                <span className="font-semibold text-stone-900 block">Reception Lounge</span>
                <span className="text-[11px] text-stone-500">Relaxed and unhurried</span>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-2xs">
              <img
                src="/src/assets/images/clinic_consultation_room.jpg"
                alt="Consultation and treatment suite"
                className="w-full aspect-4/3 object-cover"
                loading="lazy"
              />
              <div className="p-3 text-xs">
                <span className="font-semibold text-stone-900 block">Consultation Room</span>
                <span className="text-[11px] text-stone-500">Direct assessment with Joan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Craftsmanship detail photo banner */}
        <div className="rounded-2xl border border-stone-200/90 overflow-hidden bg-white p-6 sm:p-8 flex flex-col md:flex-row items-center gap-8">
          <img
            src="/src/assets/images/denture_craftsmanship_detail_1791314460461.jpg"
            alt="Meticulous denture finishing craftsmanship"
            className="w-full md:w-64 aspect-4/3 object-cover rounded-xl border border-stone-100"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          <div className="space-y-3">
            <h4 className="font-serif text-xl sm:text-2xl text-stone-900 font-semibold">
              Visit Us on Topsail Road
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-xl">
              Conveniently located at 538 Topsail Rd, with ground level entrance and hassle-free free parking right at the door. We look forward to welcoming you.
            </p>
            <div className="flex items-center gap-2 text-xs font-medium text-stone-800 pt-1">
              <MapPin className="w-4 h-4 text-stone-500" />
              <span>538 Topsail Rd, St. John&apos;s, NL A1E 2C5 · (709) 364-8100</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
