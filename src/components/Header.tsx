import React, { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';

interface HeaderProps {
  activePage: string;
  onNavigate: (page: string) => void;
  onOpenBooking: () => void;
  onPlayIntro?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activePage, onNavigate, onOpenBooking, onPlayIntro }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Zone: Clean typographic wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left group cursor-pointer focus:outline-hidden"
          aria-label="Joan Andrews Denture Clinic Home"
        >
          <span className="block font-serif text-xl sm:text-2xl font-semibold tracking-wider text-stone-900 group-hover:text-stone-700 transition-colors">
            JOAN ANDREWS
          </span>
          <span className="block text-[10px] sm:text-[11px] tracking-[0.25em] text-stone-500 font-medium uppercase -mt-0.5">
            Denture Clinic
          </span>
        </button>

        {/* Desktop Nav Zone */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`cursor-pointer transition-colors relative py-1 ${
                activePage === item.id
                  ? 'text-stone-950 font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {item.label}
              {activePage === item.id && (
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-stone-900" />
              )}
            </button>
          ))}
        </nav>

        {/* Action Zone: Booking button & direct phone */}
        <div className="hidden sm:flex items-center gap-3">
          {onPlayIntro && (
            <button
              onClick={onPlayIntro}
              className="text-xs text-stone-500 hover:text-stone-900 transition-colors py-2 px-2.5 rounded-md hover:bg-stone-50 cursor-pointer flex items-center gap-1.5"
              title="Watch Opening Anatomy Animation"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
              <span>Tooth Anatomy</span>
            </button>
          )}

          <a
            href="tel:+17093648100"
            className="text-xs text-stone-600 hover:text-stone-900 font-medium flex items-center gap-1.5 transition-colors py-2 px-2"
            title="Call Joan Andrews Denture Clinic"
          >
            <Phone className="w-3.5 h-3.5 text-stone-700" />
            <span className="tabular-nums">709-364-8100</span>
          </a>

          <button
            onClick={onOpenBooking}
            className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 active:scale-[0.99] transition-all shadow-2xs whitespace-nowrap cursor-pointer tracking-wider uppercase text-[11px]"
          >
            BOOK A CONSULTATION
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenBooking}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-stone-900 rounded-md cursor-pointer"
          >
            BOOK
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-stone-600 hover:text-stone-900 rounded-md focus:outline-hidden cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200/80 bg-white px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activePage === item.id
                    ? 'bg-stone-100 text-stone-900 font-semibold'
                    : 'text-stone-600 hover:bg-stone-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-stone-100 flex flex-col gap-2">
            {onPlayIntro && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onPlayIntro();
                }}
                className="w-full py-2.5 text-xs font-medium text-stone-700 bg-stone-50 hover:bg-stone-100 rounded-lg text-center flex items-center justify-center gap-2 border border-stone-200"
              >
                <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                <span>Replay Tooth Anatomy Opening</span>
              </button>
            )}
            <a
              href="tel:+17093648100"
              className="flex items-center justify-center gap-2 py-2.5 text-xs font-medium text-stone-800 bg-stone-100 rounded-lg"
            >
              <Phone className="w-4 h-4" />
              Call Clinic: (709) 364-8100
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-2.5 text-xs font-semibold text-white bg-stone-900 rounded-lg text-center tracking-wider uppercase"
            >
              BOOK A CONSULTATION
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
