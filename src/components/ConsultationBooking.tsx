import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Check, ChevronLeft, ChevronRight, User, Phone, Mail, MessageSquare, AlertCircle } from 'lucide-react';

interface ConsultationBookingProps {
  initialServiceId?: string;
}

const SERVICES_LIST = [
  { id: 'complete', title: 'Complete Dentures', note: 'Full upper or lower teeth replacement' },
  { id: 'partial', title: 'Partial Dentures', note: 'Replacing missing gaps, saving healthy teeth' },
  { id: 'repair', title: 'Denture Repair', note: 'Cracks, fractures, broken teeth' },
  { id: 'adjustment', title: 'Denture Adjustment', note: 'Relieving sore spots, improving suction' },
  { id: 'consultation', title: 'Consultation', note: 'Personal evaluation & discussion with Joan' }
];

const TIME_SLOTS = [
  { time: '9:00 AM', period: 'Morning' },
  { time: '10:30 AM', period: 'Morning' },
  { time: '11:30 AM', period: 'Morning' },
  { time: '1:00 PM', period: 'Afternoon' },
  { time: '2:30 PM', period: 'Afternoon' },
  { time: '3:45 PM', period: 'Afternoon' }
];

export const ConsultationBooking: React.FC<ConsultationBookingProps> = ({ initialServiceId }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedService, setSelectedService] = useState<string>(initialServiceId || 'consultation');
  
  // Interactive Calendar states
  const [selectedDate, setSelectedDate] = useState<string>('2026-10-12');
  const [currentMonth, setCurrentMonth] = useState<string>('October 2026');
  
  // Time selection
  const [selectedTime, setSelectedTime] = useState<string>('10:30 AM');

  // Contact details
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Calendar days generation
  const daysInOctober = [
    { day: 5, date: '2026-10-05', isPast: true },
    { day: 6, date: '2026-10-06', isPast: false }, // Today
    { day: 7, date: '2026-10-07', isPast: false },
    { day: 8, date: '2026-10-08', isPast: false },
    { day: 9, date: '2026-10-09', isPast: false },
    { day: 12, date: '2026-10-12', isPast: false },
    { day: 13, date: '2026-10-13', isPast: false },
    { day: 14, date: '2026-10-14', isPast: false },
    { day: 15, date: '2026-10-15', isPast: false },
    { day: 16, date: '2026-10-16', isPast: false },
    { day: 19, date: '2026-10-19', isPast: false },
    { day: 20, date: '2026-10-20', isPast: false },
    { day: 21, date: '2026-10-21', isPast: false },
    { day: 22, date: '2026-10-22', isPast: false },
    { day: 23, date: '2026-10-23', isPast: false },
  ];

  const handleNext = () => {
    setErrorMessage(null);
    if (currentStep === 1 && !selectedService) {
      setErrorMessage('Please select a service to proceed.');
      return;
    }
    if (currentStep === 2 && !selectedDate) {
      setErrorMessage('Please select a preferred date.');
      return;
    }
    if (currentStep === 3 && !selectedTime) {
      setErrorMessage('Please choose a preferred time slot.');
      return;
    }
    setCurrentStep((prev) => Math.min(4, prev + 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!phone.trim()) {
      setErrorMessage('Please enter your phone number so our clinic can call you.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 400);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setCurrentStep(1);
    setFullName('');
    setPhone('');
    setEmail('');
    setMessage('');
  };

  const selectedServiceName = SERVICES_LIST.find((s) => s.id === selectedService)?.title || 'Consultation';

  return (
    <section id="booking" className="py-20 sm:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-stone-500 mb-2 block">
            Online Consultation Request
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 tracking-tight mb-4">
            Let&apos;s Talk About Your Smile.
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Take the first step toward comfortable, confident denture care. Complete our simple step-by-step request below, and Joan Andrews Denture Clinic will phone you to confirm your visit.
          </p>
        </div>

        {/* Step-by-Step Card Container */}
        <div className="bg-[#FAF9F5] rounded-3xl border border-stone-200/90 p-6 sm:p-10 shadow-xs">
          {isSubmitted ? (
            /* Submission Confirmation Screen */
            <div className="text-center py-10 space-y-5 animate-fadeIn">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-800 rounded-full flex items-center justify-center mx-auto border border-emerald-900/10">
                <Check className="w-8 h-8" />
              </div>

              <h3 className="font-serif text-3xl text-stone-900 font-semibold">
                Thank you, {fullName.split(' ')[0]}.
              </h3>

              <p className="font-medium text-stone-900 text-base">
                Your consultation request has been received.
              </p>

              <div className="max-w-md mx-auto bg-white p-5 rounded-2xl border border-stone-200/80 text-xs text-stone-600 text-left space-y-2">
                <div className="flex justify-between border-b border-stone-100 pb-2">
                  <span className="text-stone-400">Service:</span>
                  <span className="font-semibold text-stone-900">{selectedServiceName}</span>
                </div>
                <div className="flex justify-between border-b border-stone-100 pb-2">
                  <span className="text-stone-400">Requested Date &amp; Time:</span>
                  <span className="font-semibold text-stone-900">{selectedDate} at {selectedTime}</span>
                </div>
                <div className="flex justify-between border-b border-stone-100 pb-2">
                  <span className="text-stone-400">Contact Number:</span>
                  <span className="font-semibold text-stone-900">{phone}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-stone-400">Clinic Location:</span>
                  <span className="font-semibold text-stone-900">538 Topsail Rd, St. John&apos;s</span>
                </div>
              </div>

              <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
                Joan or our receptionist will phone you to confirm your exact appointment opening. <em>(Frontend prototype request logged for clinic review).</em>
              </p>

              <div className="pt-3">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 text-xs font-semibold text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-xl cursor-pointer"
                >
                  Start New Request
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Stepper Progress Indicator */}
              <div className="flex items-center justify-between pb-8 mb-8 border-b border-stone-200/70 text-xs font-medium">
                {[
                  { step: 1, title: 'Service' },
                  { step: 2, title: 'Date' },
                  { step: 3, title: 'Time' },
                  { step: 4, title: 'Details' },
                ].map((s) => {
                  const isActive = currentStep === s.step;
                  const isDone = currentStep > s.step;
                  return (
                    <button
                      key={s.step}
                      onClick={() => isDone && setCurrentStep(s.step)}
                      className={`flex items-center gap-2 transition-colors cursor-pointer ${
                        isActive ? 'text-stone-950 font-semibold' : isDone ? 'text-emerald-800' : 'text-stone-400'
                      }`}
                    >
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                          isActive
                            ? 'bg-stone-900 text-white'
                            : isDone
                            ? 'bg-emerald-100 text-emerald-900 font-bold'
                            : 'bg-stone-200 text-stone-600'
                        }`}
                      >
                        {isDone ? '✓' : s.step}
                      </span>
                      <span className="hidden sm:inline">{s.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* Error Message if any */}
              {errorMessage && (
                <div className="mb-6 p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* STEP 1: CHOOSE A SERVICE */}
              {currentStep === 1 && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="mb-4">
                    <span className="text-xs uppercase tracking-wider font-semibold text-stone-500 block mb-1">
                      Step 1 of 4
                    </span>
                    <h3 className="font-serif text-2xl text-stone-900 font-semibold">
                      Choose a service
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SERVICES_LIST.map((srv) => {
                      const isSel = selectedService === srv.id;
                      return (
                        <div
                          key={srv.id}
                          onClick={() => setSelectedService(srv.id)}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                            isSel
                              ? 'border-stone-900 bg-white ring-2 ring-stone-900 shadow-xs'
                              : 'border-stone-200/80 bg-white/70 hover:bg-white hover:border-stone-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-serif text-base font-semibold text-stone-900">
                              {srv.title}
                            </span>
                            <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSel ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-300'}`}>
                              {isSel && '✓'}
                            </span>
                          </div>
                          <p className="text-xs text-stone-500 leading-relaxed">
                            {srv.note}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 2: CHOOSE A PREFERRED DATE */}
              {currentStep === 2 && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-xs uppercase tracking-wider font-semibold text-stone-500 block mb-1">
                        Step 2 of 4
                      </span>
                      <h3 className="font-serif text-2xl text-stone-900 font-semibold">
                        Choose a preferred date
                      </h3>
                    </div>
                    <span className="text-xs font-semibold text-stone-800 bg-white px-3 py-1.5 rounded-lg border border-stone-200">
                      {currentMonth}
                    </span>
                  </div>

                  {/* Clean Calendar UI */}
                  <div className="bg-white p-5 rounded-2xl border border-stone-200/90">
                    <div className="grid grid-cols-5 gap-2 text-center text-xs font-semibold text-stone-400 pb-3 border-b border-stone-100">
                      <span>Mon</span>
                      <span>Tue</span>
                      <span>Wed</span>
                      <span>Thu</span>
                      <span>Fri</span>
                    </div>

                    <div className="grid grid-cols-5 gap-2 pt-3 text-center">
                      {daysInOctober.map((d) => {
                        const isSelected = selectedDate === d.date;
                        return (
                          <button
                            key={d.date}
                            type="button"
                            disabled={d.isPast}
                            onClick={() => setSelectedDate(d.date)}
                            className={`p-3 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                              d.isPast
                                ? 'opacity-30 cursor-not-allowed bg-stone-50 text-stone-400'
                                : isSelected
                                ? 'bg-stone-900 text-white shadow-xs font-bold'
                                : 'bg-stone-50 hover:bg-stone-100 text-stone-800'
                            }`}
                          >
                            <span className="block text-sm">{d.day}</span>
                            <span className="text-[10px] opacity-75">Oct</span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-100 text-xs text-stone-500 flex items-center justify-between">
                      <span>Selected Date: <strong className="text-stone-900">{selectedDate}</strong></span>
                      <span className="text-emerald-700 font-medium">Clinic open 9:00 AM – 4:30 PM</span>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: CHOOSE A TIME */}
              {currentStep === 3 && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="mb-4">
                    <span className="text-xs uppercase tracking-wider font-semibold text-stone-500 block mb-1">
                      Step 3 of 4
                    </span>
                    <h3 className="font-serif text-2xl text-stone-900 font-semibold">
                      Choose a time
                    </h3>
                    <p className="text-xs text-stone-500 mt-1">
                      Available opening slots on {selectedDate}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {TIME_SLOTS.map((slot) => {
                      const isSel = selectedTime === slot.time;
                      return (
                        <button
                          key={slot.time}
                          type="button"
                          onClick={() => setSelectedTime(slot.time)}
                          className={`p-4 rounded-2xl border text-center transition-all cursor-pointer ${
                            isSel
                              ? 'border-stone-900 bg-stone-900 text-white shadow-xs font-semibold'
                              : 'border-stone-200/90 bg-white hover:bg-stone-50 text-stone-800'
                          }`}
                        >
                          <Clock className={`w-4 h-4 mx-auto mb-1 ${isSel ? 'text-sky-300' : 'text-stone-400'}`} />
                          <span className="text-sm block">{slot.time}</span>
                          <span className={`text-[10px] ${isSel ? 'text-stone-300' : 'text-stone-400'}`}>
                            {slot.period}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 4: YOUR DETAILS */}
              {currentStep === 4 && (
                <form onSubmit={handleSubmit} className="space-y-4 animate-fadeIn">
                  <div className="mb-4">
                    <span className="text-xs uppercase tracking-wider font-semibold text-stone-500 block mb-1">
                      Step 4 of 4
                    </span>
                    <h3 className="font-serif text-2xl text-stone-900 font-semibold">
                      Your Details
                    </h3>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-stone-200 text-xs text-stone-600 mb-4 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span>Requested: <strong>{selectedServiceName}</strong></span>
                      <span className="mx-2">·</span>
                      <span><strong>{selectedDate}</strong> at <strong>{selectedTime}</strong></span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="text-stone-900 underline font-semibold cursor-pointer"
                    >
                      Change
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      Full Name <span className="text-stone-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Eleanor Power"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-stone-900 text-stone-900"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                        Phone Number <span className="text-stone-400">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="(709) 555-0199"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-stone-900 text-stone-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                        Email Address <span className="text-stone-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="email"
                        placeholder="eleanor@example.ca"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-stone-900 text-stone-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      Message or Symptoms <span className="text-stone-400 font-normal">(Optional)</span>
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Tell us if you have loose dentures, sore spots, or are looking for your first set..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm bg-white border border-stone-300 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-stone-900 text-stone-900"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 text-sm font-semibold text-white bg-stone-900 rounded-2xl hover:bg-stone-800 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-75 uppercase tracking-wider"
                  >
                    <span>{isSubmitting ? 'Sending Request...' : 'REQUEST CONSULTATION'}</span>
                  </button>
                </form>
              )}

              {/* Navigation Back & Next Bar (For Steps 1-3) */}
              {currentStep < 4 && (
                <div className="pt-6 mt-6 border-t border-stone-200/60 flex items-center justify-between">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={() => setCurrentStep((prev) => prev - 1)}
                      className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 flex items-center gap-1 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2.5 text-xs font-semibold text-white bg-stone-900 rounded-xl hover:bg-stone-800 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Continue</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
