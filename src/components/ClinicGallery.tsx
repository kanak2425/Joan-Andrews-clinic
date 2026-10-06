import React, { useState } from 'react';
import { MapPin, X, ZoomIn, Building2, Armchair, Sparkles } from 'lucide-react';

export interface ClinicPhoto {
  id: string;
  src: string;
  title: string;
  subtitle: string;
  description: string;
  aspect: string;
}

export const CLINIC_PHOTOS: ClinicPhoto[] = [
  {
    id: 'exterior',
    src: '/src/assets/images/clinic_exterior_building.jpg',
    title: 'Clinic Exterior on Topsail Road',
    subtitle: '538 Topsail Rd, St. John\'s',
    description: 'Easily accessible location with dedicated free on-site parking directly in front of the ground-level entrance.',
    aspect: 'aspect-4/3'
  },
  {
    id: 'operatory',
    src: '/src/assets/images/clinic_operatory_1.jpg',
    title: 'Private Operatory & Fitting Suite',
    subtitle: 'Chairside Patient Care',
    description: 'Comfortable patient chair, full vanity mirror, and sanitized operatory tailored for private consultations and fitting evaluations.',
    aspect: 'aspect-3/4'
  },
  {
    id: 'reception',
    src: '/src/assets/images/clinic_reception_interior.jpg',
    title: 'Welcoming Reception & Lounge',
    subtitle: 'Relaxed Atmosphere',
    description: 'A bright, quiet, and calming waiting environment designed to help you feel comfortable from the moment you step through our door.',
    aspect: 'aspect-4/3'
  },
  {
    id: 'consultation',
    src: '/src/assets/images/clinic_consultation_room.jpg',
    title: 'Consultation & Treatment Room',
    subtitle: 'Gentle Direct Care',
    description: 'Modern clinical equipment where Joan personally listens to your concerns and performs meticulous adjustments.',
    aspect: 'aspect-3/4'
  }
];

export const ClinicGallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<ClinicPhoto | null>(null);

  return (
    <section className="py-20 sm:py-24 bg-white border-b border-stone-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-[0.2em] font-medium text-stone-500 mb-2 block">
            Inside Joan Andrews Denture Clinic
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 tracking-tight mb-4">
            A Welcoming, Non-Intimidating Space
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Take a look inside our Topsail Road clinic in St. John&apos;s. We take pride in maintaining an unhurried, comfortable, and spotlessly clean healthcare environment.
          </p>
        </div>

        {/* 4 Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CLINIC_PHOTOS.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group bg-[#FBFBFA] rounded-2xl border border-stone-200/80 overflow-hidden shadow-2xs hover:border-stone-300 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="relative overflow-hidden bg-stone-100">
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full aspect-4/3 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-white/95 text-stone-900 px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-md">
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>View Photo</span>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-stone-400 block mb-1">
                    {photo.subtitle}
                  </span>
                  <h3 className="font-serif text-lg text-stone-900 font-semibold mb-2">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {photo.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-stone-200/50 flex items-center justify-between text-[11px] text-stone-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-stone-400" />
                    538 Topsail Rd
                  </span>
                  <span className="text-stone-700 font-medium group-hover:underline">
                    Expand &rarr;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust features row */}
        <div className="mt-12 p-6 rounded-2xl bg-[#FAF9F5] border border-stone-200/80 flex flex-wrap items-center justify-between gap-6 text-xs text-stone-600">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white border border-stone-200 flex items-center justify-center text-stone-800 shrink-0">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <span className="font-semibold text-stone-900 block">Ground Level Accessibility</span>
              <span>Zero stairs, direct entry from front parking</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white border border-stone-200 flex items-center justify-center text-stone-800 shrink-0">
              <Armchair className="w-4 h-4" />
            </div>
            <div>
              <span className="font-semibold text-stone-900 block">Private Operatories</span>
              <span>Confidential, unhurried chairside care</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white border border-stone-200 flex items-center justify-center text-stone-800 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="font-semibold text-stone-900 block">Hospital-Grade Sanitation</span>
              <span>Rigorous clinical sterilization protocols</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-xs p-4 sm:p-6 flex items-center justify-center animate-fadeIn"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className="relative bg-white rounded-2xl overflow-hidden max-w-3xl w-full border border-stone-200 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-stone-100 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg text-stone-900 font-semibold">
                  {selectedPhoto.title}
                </h3>
                <p className="text-xs text-stone-500">
                  {selectedPhoto.subtitle} · 538 Topsail Rd, St. John&apos;s
                </p>
              </div>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="p-1.5 text-stone-400 hover:text-stone-900 rounded-lg hover:bg-stone-100 cursor-pointer"
                aria-label="Close photo"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-stone-100 max-h-[70vh] flex items-center justify-center overflow-hidden">
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                className="max-h-[68vh] w-auto object-contain mx-auto"
              />
            </div>

            <div className="p-4 sm:p-5 bg-white text-xs text-stone-600 border-t border-stone-100">
              {selectedPhoto.description}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
