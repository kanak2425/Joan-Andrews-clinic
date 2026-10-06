import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustIntro } from './components/TrustIntro';
import { WalkThroughExperience } from './components/WalkThroughExperience';
import { InteractiveServicesTooth } from './components/InteractiveServicesTooth';
import { WhyJoanSection } from './components/WhyJoanSection';
import { PatientStories } from './components/PatientStories';
import { ClinicGallery } from './components/ClinicGallery';
import { ConsultationBooking } from './components/ConsultationBooking';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingBookingCTA } from './components/FloatingBookingCTA';
import { AppointmentModal } from './components/AppointmentModal';
import { ToothAnatomy } from './components/ToothAnatomy';
import { ServicesPage } from './components/pages/ServicesPage';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';

export default function App() {
  const [activePage, setActivePage] = useState<string>('home');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [bookingServiceId, setBookingServiceId] = useState<string | undefined>(undefined);
  const [showWalkthrough, setShowWalkthrough] = useState<boolean>(true);

  // Sync with browser hash if present
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['home', 'services', 'about', 'reviews', 'contact'].includes(hash)) {
        if (hash === 'reviews') {
          setActivePage('home');
          setTimeout(() => {
            const el = document.getElementById('reviews');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } else {
          setActivePage(hash);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: string) => {
    if (page === 'reviews') {
      setActivePage('home');
      window.location.hash = 'reviews';
      setTimeout(() => {
        const el = document.getElementById('reviews');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return;
    }

    setActivePage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (serviceId?: string) => {
    // If on homepage, scroll to the interactive booking experience smoothly
    const bookingEl = document.getElementById('booking');
    if (activePage === 'home' && bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      setBookingServiceId(serviceId);
      setIsBookingModalOpen(true);
    }
  };

  const handleCloseBooking = () => {
    setIsBookingModalOpen(false);
    setBookingServiceId(undefined);
  };

  const handlePlayWalkthrough = () => {
    setShowWalkthrough(true);
  };

  const handleCompleteWalkthrough = () => {
    setShowWalkthrough(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-stone-900 selection:bg-stone-200">
      {/* 1. The Walk Through The Tooth Experience */}
      {showWalkthrough && (
        <WalkThroughExperience
          isOpen={showWalkthrough}
          onComplete={handleCompleteWalkthrough}
        />
      )}

      {/* Skip to Content for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-stone-900 text-white rounded-md text-xs font-semibold"
      >
        Skip to main content
      </a>

      {/* Top Navigation */}
      <Header
        activePage={activePage}
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
        onPlayIntro={handlePlayWalkthrough}
      />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1">
        {activePage === 'home' && (
          <>
            {/* 2. Hero Section: Emerging from the tooth into bright minimalist clinic */}
            <Hero
              onOpenBooking={() => handleOpenBooking()}
              onPlayIntro={handlePlayWalkthrough}
            />

            {/* 3. Trust Introduction */}
            <TrustIntro />

            {/* 4. Interactive Services: Tooth-Inspired Layout */}
            <InteractiveServicesTooth
              onSelectService={(serviceId) => {
                setBookingServiceId(serviceId);
                const el = document.getElementById('booking');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* 5. Deep Anatomical Molar Explorer & Cutaway */}
            <ToothAnatomy />

            {/* 6. "Why Joan" Section: Care That Goes Beyond the Smile */}
            <WhyJoanSection onOpenBooking={() => handleOpenBooking()} />

            {/* 7. Patient Stories: Real People. Real Confidence (5.0 Google Rating) */}
            <PatientStories />

            {/* 8. Inside the Clinic: Real Google Maps Facility Tour */}
            <ClinicGallery />

            {/* 9. Interactive Consultation Booking: Let's Talk About Your Smile */}
            <ConsultationBooking initialServiceId={bookingServiceId} />

            {/* 10. Contact: Visit Joan Andrews Denture Clinic on Topsail Road */}
            <ContactSection onOpenBooking={() => handleOpenBooking()} />
          </>
        )}

        {activePage === 'services' && (
          <ServicesPage
            onOpenBooking={(serviceId) => handleOpenBooking(serviceId)}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'about' && (
          <AboutPage
            onOpenBooking={() => handleOpenBooking()}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'contact' && (
          <ContactPage
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Floating Booking CTA for desktop & sticky bottom bar for mobile */}
      <FloatingBookingCTA onOpenBooking={() => handleOpenBooking()} />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Modal Fallback for dedicated page views */}
      <AppointmentModal
        isOpen={isBookingModalOpen}
        onClose={handleCloseBooking}
        preselectedServiceId={bookingServiceId}
      />
    </div>
  );
}
