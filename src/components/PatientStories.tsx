import React from 'react';
import { Star, CheckCircle } from 'lucide-react';
import { REVIEWS_DATA } from './ReviewsSection';

export const PatientStories: React.FC = () => {
  return (
    <section id="reviews" className="py-20 sm:py-24 bg-[#FBFBFA] border-y border-stone-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Google Rating Badge */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-stone-500 mb-2 block">
            Verified Experiences
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 tracking-tight mb-4">
            Real People. Real Confidence.
          </h2>

          {/* Prominent 5.0 Rating Badge */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white border border-stone-200 shadow-2xs text-xs text-stone-700">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
              ))}
            </div>
            <span className="font-bold text-stone-900 text-sm">5.0 Google Rating</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="text-stone-500">5 Reviews</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="text-emerald-700 font-medium flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" /> 100% Recommended
            </span>
          </div>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {REVIEWS_DATA.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-3xl p-7 sm:p-8 border border-stone-200/90 shadow-2xs flex flex-col justify-between hover:border-stone-300 transition-colors"
            >
              <div>
                <div className="flex text-amber-500 mb-5">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>

                <p className="font-serif text-xl sm:text-2xl text-stone-900 leading-snug mb-6">
                  &ldquo;{review.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span className="font-semibold text-stone-800">{review.author}</span>
                <span className="text-stone-400 font-mono text-[11px]">{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
