import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, ArrowRight, Eye, Sparkles } from 'lucide-react';

interface OpeningAnimationProps {
  onComplete: () => void;
  isOpen: boolean;
}

export type AnatomyLayerId = 'enamel' | 'dentin' | 'pulp' | 'nerves' | 'vessels' | 'canal' | 'roots';

interface CalloutPin {
  id: AnatomyLayerId;
  title: string;
  sub: string;
  xPercent: number; // 0 to 100 relative to tooth container
  yPercent: number;
  revealTime: number; // in seconds
  color: string;
}

const CALLOUTS: CalloutPin[] = [
  {
    id: 'enamel',
    title: 'Translucent Enamel',
    sub: 'Outer protective mineralized shell',
    xPercent: 78,
    yPercent: 24,
    revealTime: 4.0,
    color: '#38bdf8'
  },
  {
    id: 'dentin',
    title: 'Dentin Core',
    sub: 'Resilient shock-absorbing structure',
    xPercent: 24,
    yPercent: 32,
    revealTime: 4.5,
    color: '#fbbf24'
  },
  {
    id: 'pulp',
    title: 'Pulp Chamber',
    sub: 'Vital coronal vascular tissue',
    xPercent: 68,
    yPercent: 39,
    revealTime: 5.0,
    color: '#f43f5e'
  },
  {
    id: 'nerves',
    title: 'Nerve Filaments',
    sub: 'Sensory transmission network',
    xPercent: 26,
    yPercent: 47,
    revealTime: 5.4,
    color: '#facc15'
  },
  {
    id: 'vessels',
    title: 'Blood Vessels',
    sub: 'Micro-capillary arterial & venous supply',
    xPercent: 72,
    yPercent: 49,
    revealTime: 5.8,
    color: '#ef4444'
  },
  {
    id: 'canal',
    title: 'Root Canals',
    sub: 'Dual neurovascular conduits',
    xPercent: 32,
    yPercent: 66,
    revealTime: 6.2,
    color: '#0284c7'
  },
  {
    id: 'roots',
    title: 'Anatomical Roots',
    sub: 'Alveolar bone anchorage',
    xPercent: 64,
    yPercent: 82,
    revealTime: 6.5,
    color: '#94a3b8'
  }
];

export const OpeningAnimation: React.FC<OpeningAnimationProps> = ({ onComplete, isOpen }) => {
  const [currentTime, setCurrentTime] = useState<number>(0); // 0 to 8.5s
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [activeHighlight, setActiveHighlight] = useState<AnatomyLayerId | null>(null);

  const requestRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialize playback loop
  useEffect(() => {
    if (!isOpen) {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      return;
    }

    lastTimeRef.current = performance.now();

    const loop = (time: number) => {
      if (lastTimeRef.current !== null && isPlaying) {
        const delta = (time - lastTimeRef.current) / 1000;
        setCurrentTime((prev) => {
          const next = prev + delta;
          if (next >= 8.8) {
            // Sequence finishes
            return 8.8;
          }
          return next;
        });
      }
      lastTimeRef.current = time;
      requestRef.current = requestAnimationFrame(loop);
    };

    requestRef.current = requestAnimationFrame(loop);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isOpen, isPlaying]);

  // Subtle audio tone synthesizer for medical elegance
  const playSubtleChime = (freq: number) => {
    if (isMuted) return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioContextRef.current && AudioContextClass) {
        audioContextRef.current = new AudioContextClass();
      }
      const ctx = audioContextRef.current;
      if (!ctx) return;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch {
      // Audio not permitted or supported
    }
  };

  // Play chimes at key moments
  const chimeTrackerRef = useRef<{ [key: string]: boolean }>({});
  useEffect(() => {
    if (currentTime >= 2.0 && !chimeTrackerRef.current['solid']) {
      chimeTrackerRef.current['solid'] = true;
      playSubtleChime(440);
    }
    if (currentTime >= 4.0 && !chimeTrackerRef.current['reveal']) {
      chimeTrackerRef.current['reveal'] = true;
      playSubtleChime(554.37);
    }
    if (currentTime >= 6.0 && !chimeTrackerRef.current['deep']) {
      chimeTrackerRef.current['deep'] = true;
      playSubtleChime(659.25);
    }
  }, [currentTime]);

  const handleRestart = () => {
    chimeTrackerRef.current = {};
    setCurrentTime(0);
    setIsPlaying(true);
    lastTimeRef.current = performance.now();
  };

  if (!isOpen) return null;

  // Animation Stage Calculations
  // Stage 1 (0 to 2s): Outline drawn
  const outlineProgress = Math.min(1, Math.max(0, currentTime / 2.0));
  const strokeDashoffset = 1200 * (1 - outlineProgress);

  // Stage 2 (2 to 4s): Solid 3D Tooth emerges
  const solidOpacity = currentTime < 2.0 
    ? 0 
    : currentTime < 4.0 
      ? Math.min(1, (currentTime - 2.0) / 1.6)
      : Math.max(0, 1 - (currentTime - 4.0) / 1.4);

  // Stage 3 (4s to 8s+): Translucent cutaway internal anatomy reveals
  const internalOpacity = currentTime < 3.8
    ? 0
    : Math.min(1, (currentTime - 3.8) / 1.5);

  // Gentle rotation (few degrees: -3deg to +3deg)
  const rotationDegrees = Math.sin((currentTime / 8) * Math.PI) * 2.8;

  // Gentle scale breathe
  const scaleValue = 0.96 + Math.min(0.04, (currentTime / 4) * 0.04);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-gradient-to-b from-[#EFF5F9] via-[#F4F8FA] to-[#EBF2F7] flex flex-col items-center justify-between select-none animate-fadeIn">
      {/* Soft Ambient Clinical Radiance Glow */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(circle at 50% 45%, rgba(255, 255, 255, 0.9) 0%, rgba(224, 237, 245, 0.4) 50%, rgba(206, 225, 238, 0.2) 100%)'
        }}
      />

      {/* Top Bar: Brand, Timeline, Sound & Skip */}
      <div className="w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between relative z-20">
        <div>
          <span className="font-serif text-lg sm:text-xl font-semibold tracking-wider text-slate-800 block">
            JOAN ANDREWS
          </span>
          <span className="text-[10px] sm:text-[11px] tracking-[0.25em] text-slate-500 uppercase font-medium">
            Denture Clinic · St. John&apos;s
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-white/70 rounded-full transition-colors cursor-pointer border border-slate-200/60 bg-white/40 backdrop-blur-xs"
            title={isMuted ? 'Turn Sound On' : 'Mute Sound'}
            aria-label="Toggle audio"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-700" />}
          </button>

          <button
            onClick={onComplete}
            className="px-4 py-2 text-xs font-semibold text-slate-800 bg-white/80 hover:bg-white hover:text-slate-950 border border-slate-300/80 rounded-full shadow-2xs backdrop-blur-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>Skip Intro</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Centerpiece: Cinematic Tooth Transformation Stage */}
      <div className="relative flex-1 w-full max-w-4xl flex items-center justify-center p-4">
        {/* Stage 1: Fine Anatomical Outline (0-2s, fading as 3D emerges) */}
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-1000"
          style={{ opacity: currentTime < 3.2 ? Math.max(0, 1 - (currentTime - 1.8) / 1.2) : 0 }}
        >
          <svg
            viewBox="0 0 600 600"
            className="w-[320px] sm:w-[420px] lg:w-[480px] h-auto drop-shadow-sm"
            fill="none"
          >
            {/* Crown Outer Contour */}
            <path
              d="M 200 160 C 210 135 240 120 270 140 C 290 155 310 155 330 140 C 360 120 390 135 400 160 C 425 220 410 310 375 350 C 370 380 375 460 370 510 C 365 525 350 525 345 505 C 335 450 330 380 300 350 C 270 380 265 450 255 505 C 250 525 235 525 230 510 C 225 460 230 380 225 350 C 190 310 175 220 200 160 Z"
              stroke="#0284c7"
              strokeWidth="1.5"
              strokeDasharray="1200"
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              strokeOpacity="0.45"
            />
            {/* Internal Anatomical Guide Lines */}
            <path
              d="M 235 210 C 270 230 330 230 365 210 C 375 270 365 310 340 330 C 330 380 340 450 340 485"
              stroke="#0369a1"
              strokeWidth="1"
              strokeDasharray="600"
              strokeDashoffset={Math.max(0, 600 * (1 - outlineProgress * 1.3))}
              strokeLinecap="round"
              strokeOpacity="0.3"
            />
            <path
              d="M 260 330 C 270 380 260 450 260 485"
              stroke="#0369a1"
              strokeWidth="1"
              strokeDasharray="400"
              strokeDashoffset={Math.max(0, 400 * (1 - outlineProgress * 1.3))}
              strokeLinecap="round"
              strokeOpacity="0.3"
            />
            {/* Pulp Chamber Contour Guide */}
            <path
              d="M 270 240 C 285 230 315 230 330 240 C 340 270 330 300 320 320 L 325 440 M 275 320 L 270 440"
              stroke="#e11d48"
              strokeWidth="1"
              strokeDasharray="500"
              strokeDashoffset={Math.max(0, 500 * (1 - outlineProgress * 1.4))}
              strokeLinecap="round"
              strokeOpacity="0.25"
            />
          </svg>
        </div>

        {/* Tooth Display Vessel with Subtle Dynamic 3D Rotation */}
        <div
          className="relative w-[340px] sm:w-[460px] lg:w-[540px] aspect-16/9 flex items-center justify-center transition-transform duration-700 ease-out"
          style={{
            transform: `rotate(${rotationDegrees}deg) scale(${scaleValue})`,
          }}
        >
          {/* Ground Contact Shadow */}
          <div 
            className="absolute bottom-3 w-48 sm:w-64 h-6 rounded-full bg-slate-900/10 blur-md pointer-events-none transition-opacity duration-1000"
            style={{ opacity: currentTime > 1.8 ? 0.6 : 0 }}
          />

          {/* Stage 2: Solid Enamel 3D Tooth (emerges 2-4s, gently fades as cutaway reveals) */}
          <img
            src="/src/assets/images/solid_enamel_tooth_1791314972140.jpg"
            alt="Pristine natural molar tooth in pure enamel"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none transition-opacity duration-700"
            style={{
              opacity: solidOpacity,
              mixBlendMode: 'multiply'
            }}
          />

          {/* Stage 3: Realistic Internal Cutaway (reveals from 4s onward) */}
          <div
            className="absolute inset-0 w-full h-full flex items-center justify-center transition-opacity duration-1000"
            style={{
              opacity: internalOpacity,
            }}
          >
            <img
              src="/src/assets/images/chatgpt_tooth_full.png"
              alt="Anatomical cross section of molar showing enamel, dentin, pulp, nerves, blood vessels and roots"
              className="w-full h-full object-contain pointer-events-none"
              style={{
                mixBlendMode: 'multiply'
              }}
            />

            {/* Interactive Anatomical Pins & Progressive Callouts */}
            {CALLOUTS.map((pin) => {
              const isVisible = currentTime >= pin.revealTime;
              const isSelected = activeHighlight === pin.id;

              if (!isVisible) return null;

              return (
                <div
                  key={pin.id}
                  className="absolute pointer-events-auto transition-all duration-500 animate-fadeIn"
                  style={{
                    left: `${pin.xPercent}%`,
                    top: `${pin.yPercent}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  onMouseEnter={() => setActiveHighlight(pin.id)}
                  onMouseLeave={() => setActiveHighlight(null)}
                >
                  {/* Pin Dot with Gentle Pulse */}
                  <div className="relative group cursor-pointer">
                    <span 
                      className="absolute -inset-1 rounded-full animate-ping opacity-30" 
                      style={{ backgroundColor: pin.color }}
                    />
                    <div 
                      className={`w-3.5 h-3.5 rounded-full border-2 border-white shadow-md transition-transform ${
                        isSelected ? 'scale-125 ring-2 ring-slate-900/20' : 'hover:scale-110'
                      }`}
                      style={{ backgroundColor: pin.color }}
                    />

                    {/* Popover Callout */}
                    <div 
                      className={`absolute left-1/2 -translate-x-1/2 bottom-5 whitespace-nowrap bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-200/80 shadow-md text-left pointer-events-none transition-all duration-200 ${
                        isSelected || currentTime > pin.revealTime + 0.3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
                      }`}
                    >
                      <div className="text-[11px] font-semibold text-slate-900 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: pin.color }} />
                        {pin.title}
                      </div>
                      <div className="text-[9px] text-slate-500">
                        {pin.sub}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stage Subtitle & Editorial Caption */}
      <div className="w-full max-w-xl mx-auto text-center px-4 mb-4 relative z-20">
        <div className="h-10 flex items-center justify-center">
          {currentTime < 2.0 && (
            <p className="text-xs sm:text-sm text-slate-500 font-medium tracking-wide animate-fadeIn">
              01 · Medical Outline · Precise Anatomical Blueprint
            </p>
          )}
          {currentTime >= 2.0 && currentTime < 4.0 && (
            <p className="text-xs sm:text-sm text-slate-700 font-medium tracking-wide animate-fadeIn">
              02 · Emergence · Natural Form &amp; Pearlescent Enamel
            </p>
          )}
          {currentTime >= 4.0 && currentTime < 6.5 && (
            <p className="text-xs sm:text-sm text-slate-800 font-medium tracking-wide animate-fadeIn">
              03 · Layer Reveal · Enamel, Dentin, Pulp &amp; Micro-Vascular Root Canals
            </p>
          )}
          {currentTime >= 6.5 && (
            <div className="animate-fadeIn">
              <span className="font-serif text-sm sm:text-base text-slate-900 font-semibold block">
                The Foundation of Every Beautiful Denture
              </span>
              <span className="text-[11px] text-slate-500">
                Sculpted with deep understanding of natural tissue &amp; bite dynamics
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Timeline Controls & Action Bar */}
      <div className="w-full max-w-3xl mx-auto px-6 pb-8 pt-2 relative z-20 flex flex-col gap-4">
        {/* Progress Bar Scrubber */}
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono text-slate-500 w-8 tabular-nums">
            {currentTime.toFixed(1)}s
          </span>

          <div className="relative flex-1 h-1.5 bg-slate-200/80 rounded-full overflow-hidden">
            <div
              className="absolute left-0 top-0 bottom-0 bg-slate-800 rounded-full transition-all duration-75"
              style={{ width: `${Math.min(100, (currentTime / 8.8) * 100)}%` }}
            />
          </div>

          <span className="text-[11px] font-mono text-slate-400 w-8 tabular-nums">
            8.8s
          </span>
        </div>

        {/* Transport Buttons & Quick Layer Focus */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 text-slate-700 bg-white/70 hover:bg-white rounded-lg border border-slate-200/80 shadow-2xs transition-colors cursor-pointer"
              title={isPlaying ? 'Pause' : 'Play'}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            </button>

            <button
              onClick={handleRestart}
              className="p-2 text-slate-700 bg-white/70 hover:bg-white rounded-lg border border-slate-200/80 shadow-2xs transition-colors cursor-pointer"
              title="Replay from Beginning"
              aria-label="Replay"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* Quick Layer Switchers when cutaway is reached */}
            {currentTime >= 4.0 && (
              <div className="hidden sm:flex items-center gap-1 pl-2 border-l border-slate-200">
                <span className="text-[11px] text-slate-400 mr-1 flex items-center gap-1">
                  <Eye className="w-3 h-3" /> Inspect:
                </span>
                {CALLOUTS.slice(0, 5).map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setActiveHighlight(activeHighlight === c.id ? null : c.id)}
                    className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors cursor-pointer ${
                      activeHighlight === c.id
                        ? 'bg-slate-900 text-white'
                        : 'bg-white/60 text-slate-600 hover:bg-white'
                    }`}
                  >
                    {c.title.split(' ')[0]}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Primary Action Button */}
          <button
            onClick={onComplete}
            className="px-6 py-2.5 text-xs font-semibold text-white bg-slate-900 rounded-full hover:bg-slate-800 shadow-sm active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Enter Clinic Website</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
