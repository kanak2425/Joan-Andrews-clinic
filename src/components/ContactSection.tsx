import React from 'react';
import { MapPin, Phone, Clock, Navigation, Car, Accessibility } from 'lucide-react';

interface ContactSectionProps {
  onOpenBooking: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenBooking }) => {
  const directionsUrl = 'https://www.google.com/maps/search/?api=1&query=538+Topsail+Rd+St+Johns+NL+A1E+2C5+Canada';

  return (
    <section id="contact" className="py-20 sm:py-24 bg-stone-50/70 border-t border-stone-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-2xl mx-auto text-center mb-14">
          <span className="text-xs uppercase tracking-[0.2em] font-medium text-stone-500 mb-2 block">
            Visit Our Clinic
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 tracking-tight mb-4">
            Contact &amp; Location
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Conveniently situated on Topsail Road in St. John&apos;s with dedicated parking and ground-level access.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Clinic Details Card */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-8 flex flex-col justify-between shadow-2xs">
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-2xl text-stone-900 font-semibold mb-1">
                  Joan Andrews Denture Clinic
                </h3>
                <p className="text-xs text-stone-500">
                  Direct Denturist Consultations &amp; Lab Services
                </p>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3.5 pt-2">
                <div className="w-9 h-9 rounded-lg bg-stone-100 flex items-center justify-center text-stone-800 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-stone-900 block mb-0.5">Address</span>
                  <address className="not-italic text-stone-600 leading-relaxed">
                    538 Topsail Rd<br />
                    St. John&apos;s, NL A1E 2C5<br />
                    Canada
                  </address>
                </div>
              </div>

              {/* Telephone */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-stone-100 flex items-center justify-center text-stone-800 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-stone-900 block mb-0.5">Phone</span>
                  <a
                    href="tel:+17093648100"
                    className="text-stone-800 hover:text-stone-950 font-semibold tabular-nums underline underline-offset-4"
                  >
                    +1 709-364-8100
                  </a>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Call during clinic hours for direct inquiries or repairs
                  </p>
                </div>
              </div>

              {/* Clinic Hours */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-stone-100 flex items-center justify-center text-stone-800 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="text-sm w-full">
                  <span className="font-semibold text-stone-900 block mb-1">Hours of Operation</span>
                  <div className="space-y-1 text-xs text-stone-600">
                    <div className="flex justify-between border-b border-stone-100 pb-1">
                      <span>Monday – Friday</span>
                      <span className="font-medium text-stone-800">9:00 AM – 4:30 PM</span>
                    </div>
                    <div className="flex justify-between pt-0.5 text-stone-500">
                      <span>Saturday &amp; Sunday</span>
                      <span>Closed (Emergency on-call)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Accessibility badges */}
              <div className="pt-2 flex flex-wrap gap-2 text-xs text-stone-600">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-stone-50 rounded-md border border-stone-200/60">
                  <Car className="w-3.5 h-3.5 text-stone-500" />
                  Free On-Site Parking
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-stone-50 rounded-md border border-stone-200/60">
                  <Accessibility className="w-3.5 h-3.5 text-stone-500" />
                  Ground Floor / Wheelchair Access
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-6 mt-6 border-t border-stone-100 grid grid-cols-2 gap-3">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 text-xs font-semibold text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors flex items-center justify-center gap-1.5 text-center cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5 text-stone-700" />
                <span>Get Directions</span>
              </a>

              <a
                href="tel:+17093648100"
                className="py-2.5 px-3 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-colors flex items-center justify-center gap-1.5 text-center cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Clinic</span>
              </a>
            </div>
          </div>

          {/* Interactive Map & Real Exterior Card */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-2xs flex flex-col">
            {/* Real Exterior Banner */}
            <div className="relative h-44 sm:h-52 overflow-hidden border-b border-stone-100 bg-stone-100">
              <img
                src="/src/assets/images/clinic_exterior_building.jpg"
                alt="Joan Andrews Denture Clinic building exterior on 538 Topsail Road with on-site parking"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent flex items-end p-4">
                <div className="text-white text-xs">
                  <span className="font-semibold text-sm block drop-shadow-xs">538 Topsail Road</span>
                  <span className="text-stone-200 text-[11px] drop-shadow-xs">Dedicated clinic entrance &amp; free parking lot on site</span>
                </div>
              </div>
            </div>

            {/* Top Map Bar */}
            <div className="px-5 py-3 border-b border-stone-100 flex items-center justify-between text-xs text-stone-600 bg-stone-50/70">
              <span className="font-medium text-stone-800 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-red-600" />
                Live Map &amp; Directions
              </span>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-stone-900 underline underline-offset-2 hover:text-stone-700"
              >
                Open in Google Maps
              </a>
            </div>

            {/* Embedded Google Maps iFrame */}
            <div className="w-full flex-1 min-h-[260px] relative bg-stone-100">
              <iframe
                title="Joan Andrews Denture Clinic Location Map"
                src="https://maps.google.com/maps?q=538+Topsail+Rd,+St.+John's,+NL+A1E+2C5,+Canada&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full min-h-[260px] border-0"
                loading="lazy"
                aria-label="Google Map showing 538 Topsail Rd, St. John's, NL"
              />
            </div>

            {/* Map bottom note */}
            <div className="p-4 bg-white border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span>Located directly on Topsail Road between Cowan Ave and Burgeo St.</span>
              <button
                onClick={onOpenBooking}
                className="font-medium text-stone-900 underline underline-offset-2 hover:text-stone-700 cursor-pointer"
              >
                Book online &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
