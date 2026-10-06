import React from 'react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white border-t border-stone-200 py-12 text-stone-600 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-stone-100">
          {/* Brand & Address */}
          <div>
            <div className="font-serif text-lg font-semibold tracking-wider text-stone-900">
              JOAN ANDREWS
            </div>
            <div className="text-[10px] tracking-[0.25em] text-stone-500 font-medium uppercase mb-2">
              Denture Clinic
            </div>
            <p className="text-stone-500 text-xs">
              538 Topsail Rd, St. John&apos;s, NL A1E 2C5
            </p>
            <p className="text-stone-700 font-medium text-xs mt-1">
              Phone:{' '}
              <a href="tel:+17093648100" className="hover:underline text-stone-900">
                709-364-8100
              </a>
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center gap-6 sm:gap-8 font-medium text-stone-700">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-stone-950 transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('services')}
              className="hover:text-stone-950 transition-colors cursor-pointer"
            >
              Services
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="hover:text-stone-950 transition-colors cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="hover:text-stone-950 transition-colors cursor-pointer"
            >
              Contact
            </button>
          </nav>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-stone-400 text-[11px]">
          <div>
            &copy; {new Date().getFullYear()} Joan Andrews Denture Clinic. All rights reserved.
          </div>
          <div>
            St. John&apos;s, Newfoundland &amp; Labrador, Canada
          </div>
        </div>
      </div>
    </footer>
  );
};
