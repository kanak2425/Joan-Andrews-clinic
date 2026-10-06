import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronRight, RotateCcw, Volume2, VolumeX, Eye } from 'lucide-react';

export type JourneyStage = 'opening' | 'enamel' | 'dentin' | 'pulp' | 'root' | 'emerging';

interface WalkThroughExperienceProps {
  onComplete: () => void;
  isOpen: boolean;
}

interface StageConfig {
  id: JourneyStage;
  label: string;
  sub: string;
  description: string;
  clinicalNote: string;
  image: string;
  cameraScale: number;
  durationMs: number;
}

const STAGES: StageConfig[] = [
  {
    id: 'opening',
    label: 'The Anatomy of a Smile',
    sub: 'Full 3D Molar Architecture',
    description: 'Every natural tooth is an architectural wonder—providing chewing stability, facial support, and natural resonance.',
    clinicalNote: 'Joan Andrews designs personalized dentures that honor this underlying biological blueprint.',
    image: '/src/assets/images/chatgpt_tooth_full.png',
    cameraScale: 1.0,
    durationMs: 4000
  },
  {
    id: 'enamel',
    label: 'ENAMEL',
    sub: 'The protective outer layer',
    description: 'The hardest substance in the human body. Translucent crystalline prisms refract natural daylight and defend against daily wear.',
    clinicalNote: 'Our denture teeth feature multi-chromatic micro-filler acrylics that emulate real enamel translucency and luster.',
    image: '/src/assets/images/tooth_journey_enamel_1791315405052.jpg',
    cameraScale: 1.25,
    durationMs: 3600
  },
  {
    id: 'dentin',
    label: 'DENTIN',
    sub: 'The strong layer beneath the enamel',
    description: 'A resilient, shock-absorbing mineralized core traversed by millions of microscopic tubules that provide warmth and flexibility.',
    clinicalNote: 'Denture craft mimics this inner warmth so your smile appears vital and lifelike, never opaque or artificial.',
    image: '/src/assets/images/tooth_journey_dentin_1791315417898.jpg',
    cameraScale: 1.35,
    durationMs: 3600
  },
  {
    id: 'pulp',
    label: 'PULP',
    sub: 'Where nerves and blood vessels live',
    description: 'The vital coronal chamber housing branching sensory nerve fibers and micro-capillary vascular pathways.',
    clinicalNote: 'Understanding oral neurology ensures your denture borders sit comfortably without impinging on sensitive nerve branches.',
    image: '/src/assets/images/tooth_journey_pulp_1791315428976.jpg',
    cameraScale: 1.4,
    durationMs: 3800
  },
  {
    id: 'root',
    label: 'ROOT',
    sub: 'Anchoring the tooth beneath the gumline',
    description: 'Dual anatomical root conduits descending deep into the alveolar bone ridge, distributing bite forces evenly across the jaw.',
    clinicalNote: 'Custom impressions at our clinic capture your unique ridge contours for maximum suction, stability, and zero rubbing.',
    image: '/src/assets/images/tooth_journey_root_1791315440771.jpg',
    cameraScale: 1.5,
    durationMs: 3800
  }
];

export const WalkThroughExperience: React.FC<WalkThroughExperienceProps> = ({ onComplete, isOpen }) => {
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const [isAutoAdvancing, setIsAutoAdvancing] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  const stage = STAGES[currentStageIndex];

  // Optional subtle clinical sine tone
  const playChime = (freq: number) => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioContextRef.current && AudioCtx) {
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (!ctx) return;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.035, ctx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch {
      // Audio not permitted
    }
  };

  const advanceStage = (nextIndex?: number) => {
    const target = nextIndex !== undefined ? nextIndex : currentStageIndex + 1;
    if (target >= STAGES.length) {
      // Emerging into homepage!
      setIsTransitioning(true);
      setTimeout(() => {
        onComplete();
      }, 600);
      return;
    }

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStageIndex(target);
      setIsTransitioning(false);
      playChime(350 + target * 70);
    }, 350);
  };

  // Start walking forward through the tooth
  const handleStartExperience = () => {
    setIsAutoAdvancing(true);
    advanceStage(1); // Move into Enamel
  };

  // Auto progression if in tour mode
  useEffect(() => {
    if (!isAutoAdvancing || currentStageIndex === 0) return;

    const timer = setTimeout(() => {
      advanceStage();
    }, stage.durationMs);

    return () => clearTimeout(timer);
  }, [isAutoAdvancing, currentStageIndex]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-gradient-to-b from-[#EEF4F8] via-[#F4F8FB] to-[#E9F1F6] flex flex-col justify-between select-none">
      {/* Soft Ambient Clinical Radiance Glow */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.95) 0%, rgba(225, 238, 246, 0.5) 55%, rgba(205, 224, 237, 0.3) 100%)'
        }}
      />

      {/* Top Header Bar */}
      <header className="relative z-30 w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div>
          <span className="font-serif text-lg sm:text-xl font-semibold tracking-wider text-slate-900 block">
            JOAN ANDREWS
          </span>
          <span className="text-[10px] sm:text-[11px] tracking-[0.25em] text-slate-500 uppercase font-medium">
            Denture Clinic · St. John&apos;s
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 text-slate-500 hover:text-slate-900 bg-white/70 hover:bg-white rounded-full border border-slate-200/80 transition-colors cursor-pointer"
            title={isMuted ? 'Turn Sound On' : 'Mute Sound'}
            aria-label="Toggle sound"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-700" />}
          </button>

          <button
            onClick={onComplete}
            className="px-4 py-2 text-xs font-semibold text-slate-800 bg-white/90 hover:bg-white rounded-full border border-slate-300 shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>Skip to Clinic</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Center Stage: The Interactive Camera Viewport */}
      <div className="relative z-10 flex-1 w-full max-w-5xl mx-auto flex flex-col items-center justify-center px-4 sm:px-6">
        {/* Dynamic Macro / Perspective Camera Frame */}
        <div 
          className={`relative w-full max-w-3xl aspect-16/9 rounded-3xl overflow-hidden shadow-xl border border-white/80 bg-slate-900/5 transition-all duration-700 ease-out ${
            isTransitioning ? 'scale-105 opacity-40 blur-xs' : 'scale-100 opacity-100 blur-0'
          }`}
        >
          {/* Active Layer Macro Visual */}
          <img
            src={stage.image}
            alt={stage.label}
            className="w-full h-full object-cover object-center transition-transform duration-3000 ease-out"
            style={{
              transform: `scale(${stage.cameraScale})`,
            }}
          />

          {/* Measured Cinematic Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-6 sm:p-10 text-white">
            <div className="max-w-xl space-y-2 animate-fadeIn">
              <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-sky-300 block">
                {currentStageIndex === 0 ? 'Step Inside A Smile' : `Anatomical Depth · ${stage.sub}`}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white drop-shadow-sm">
                {stage.label}
              </h1>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed drop-shadow-xs max-w-lg">
                {stage.description}
              </p>
              <div className="pt-2 text-[11px] text-sky-200/90 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                <span>{stage.clinicalNote}</span>
              </div>
            </div>
          </div>

          {/* Opening CTA Overlay (Only on Stage 0) */}
          {currentStageIndex === 0 && (
            <div className="absolute inset-0 bg-slate-950/30 backdrop-blur-2xs flex flex-col items-center justify-center p-6 text-center text-white animate-fadeIn">
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-sky-200 mb-2">
                Joan Andrews Denture Clinic
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-semibold max-w-xl mb-4 tracking-tight drop-shadow-md">
                A Better Smile Begins With Understanding.
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 max-w-md mb-8 leading-relaxed">
                Walk through the microscopic anatomy of a tooth to discover how personalized dentures restore natural comfort, function, and everyday confidence.
              </p>

              <button
                onClick={handleStartExperience}
                className="group px-8 py-4 text-sm font-semibold text-slate-900 bg-white hover:bg-sky-50 rounded-full shadow-lg active:scale-95 transition-all flex items-center gap-3 cursor-pointer"
              >
                <span>ENTER THE EXPERIENCE</span>
                <ArrowRight className="w-4 h-4 text-slate-900 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Walk-Through Navigation & Timeline */}
      <footer className="relative z-30 w-full max-w-4xl mx-auto px-6 py-6">
        <div className="bg-white/85 backdrop-blur-md rounded-2xl border border-slate-200/80 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Layer Step Indicators */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {STAGES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => {
                  setIsAutoAdvancing(false);
                  advanceStage(idx);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  currentStageIndex === idx
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/80'
                }`}
              >
                <span className="text-[10px] font-mono opacity-60">0{idx}</span>
                <span className="hidden sm:inline">{s.label.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* Action Button: Next Layer or Emerge */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            {currentStageIndex > 0 && (
              <button
                onClick={() => advanceStage()}
                className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-full transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <span>{currentStageIndex === STAGES.length - 1 ? 'Emerge to Clinic' : 'Next Layer'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};
