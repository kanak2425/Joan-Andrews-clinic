import React from 'react';
import { Star } from 'lucide-react';
import { ReviewItem } from '../types';

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: 'rev-1',
    quote: 'Excellent experience, excellent service.',
    author: 'Local Patient',
    context: 'Complete Denture Fitting',
    rating: 5,
    date: 'Verified Google Review'
  },
  {
    id: 'rev-2',
    quote: 'She knows what she is doing and gave me confidence to smile again.',
    author: 'Patient in St. John’s',
    context: 'Denture Adjustment & Care',
    rating: 5,
    date: 'Verified Google Review'
  },
  {
    id: 'rev-3',
    quote: 'One of the best denture clinics in town for sure.',
    author: 'Newfoundland Resident',
    context: 'Partial Denture Craft',
    rating: 5,
    date: 'Verified Google Review'
  }
];

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Rating Badge */}
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-14">
          <span className="text-xs uppercase tracking-[0.2em] font-medium text-stone-500 mb-2 block">
            Patient Feedback
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 tracking-tight mb-4">
            Trusted by Our Patients
          </h2>

          {/* Google Review Proof Badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-stone-50 border border-stone-200/80 text-xs text-stone-700">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
              ))}
            </div>
            <span className="font-semibold text-stone-900">5.0 ★ Google Rating</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="text-stone-500">5 Reviews</span>
          </div>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS_DATA.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-xl p-6 sm:p-7 border border-stone-200/80 shadow-2xs flex flex-col justify-between hover:border-stone-300 transition-colors"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex text-amber-500 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>

                <p className="font-serif text-lg sm:text-xl text-stone-900 leading-snug mb-6">
                  &ldquo;{review.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span className="font-medium text-stone-700">{review.author}</span>
                <span className="text-[11px] text-stone-400">{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
