import React, { useEffect, useRef, useState } from 'react';
import { Info, RotateCw, Eye } from 'lucide-react';

export type AnatomyLayer = 'all' | 'enamel' | 'dentin' | 'pulp' | 'root';

interface LayerInfo {
  id: AnatomyLayer;
  name: string;
  depth: string;
  description: string;
  clinicalSignificance: string;
}

const LAYERS: LayerInfo[] = [
  {
    id: 'enamel',
    name: 'Enamel Layer',
    depth: 'Outer Shell (1.5 – 2.5 mm)',
    description: 'The hardest substance in the human body, providing natural translucency, light refraction, and daily wear resistance.',
    clinicalSignificance: 'In our dentures, premium cross-linked micro-filler acrylics are shade-matched to emulate genuine enamel translucency and luster.'
  },
  {
    id: 'dentin',
    name: 'Dentin Core',
    depth: 'Sub-surface Structure',
    description: 'The vital shock-absorbing mineralized tissue beneath the enamel with microscopic tubules that lend teeth their warm, natural hue.',
    clinicalSignificance: 'We incorporate multi-layered depth inside each prosthetic tooth so the inner warmth shows through naturally in daylight.'
  },
  {
    id: 'pulp',
    name: 'Pulp Chamber & Canals',
    depth: 'Inner Core (Living Tissue)',
    description: 'The vascular and nerve bundle that once nourished the natural tooth through delicate root canals into the jaw.',
    clinicalSignificance: 'Understanding neural anatomy ensures our denture flanges are contoured to sit comfortably without impinging on sensitive nerve exits.'
  },
  {
    id: 'root',
    name: 'Root & Ridge Foundation',
    depth: 'Alveolar Ridge Support',
    description: 'The anatomical root anchors the tooth into the maxillary or mandibular bone, surrounded by the periodontal ligament.',
    clinicalSignificance: 'For complete and partial dentures, custom impressions capture the exact contours of your alveolar ridge for maximum suction and stability.'
  }
];

export const ToothAnatomy: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeLayer, setActiveLayer] = useState<AnatomyLayer>('all');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [rotationAngle, setRotationAngle] = useState<number>(0.15);
  const [cutawayAmount, setCutawayAmount] = useState<number>(0.55); // 0 to 1 cutaway
  const [renderMode, setRenderMode] = useState<'canvas' | 'render'>('render');
  const isDraggingRef = useRef<boolean>(false);
  const lastMouseXRef = useRef<number>(0);
  const targetAngleRef = useRef<number>(0.15);

  // Scroll reactivity: gently turn as user scrolls through the section
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top < windowHeight && rect.bottom > 0) {
        const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
        targetAngleRef.current = 0.15 + (progress - 0.5) * 0.8;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth rotation animation loop & Canvas render
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let currentAngle = rotationAngle;

    const render = () => {
      // Gentle auto-rotation when not dragging
      if (!isDraggingRef.current && !isHovered) {
        targetAngleRef.current += 0.003;
      }

      // Smooth lerp
      currentAngle += (targetAngleRef.current - currentAngle) * 0.05;
      setRotationAngle(currentAngle);

      const dpr = window.devicePixelRatio || 1;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Center reference
      const cx = width / 2;
      const cy = height / 2 - 10;
      const scale = Math.min(width, height) / 360;

      // 3D projection parameters
      const cosA = Math.cos(currentAngle);
      const sinA = Math.sin(currentAngle);

      // Subtle shadow on white ground
      ctx.beginPath();
      ctx.ellipse(cx, cy + 130 * scale, 85 * scale, 18 * scale, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(28, 25, 23, 0.04)';
      ctx.fill();

      ctx.beginPath();
      ctx.ellipse(cx, cy + 130 * scale, 55 * scale, 10 * scale, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(28, 25, 23, 0.03)';
      ctx.fill();

      // Draw Anatomical Tooth Cutaway Model
      drawAnatomicalTooth(ctx, cx, cy, scale, cosA, sinA, activeLayer, cutawayAmount);

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, [activeLayer, isHovered, cutawayAmount]);

  // Pointer drag controls for intuitive 3D rotation
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    lastMouseXRef.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - lastMouseXRef.current;
    lastMouseXRef.current = e.clientX;
    targetAngleRef.current += deltaX * 0.01;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // safely ignore if already released
    }
  };

  const selectedLayerInfo = LAYERS.find((l) => l.id === activeLayer);

  return (
    <div ref={containerRef} className="relative py-20 bg-[#FBFBFA] border-y border-stone-200/60 overflow-hidden">
      {/* Background subtle dental grid hairline */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(#1c1917 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.2em] font-medium text-stone-500 mb-2 block">
            Signature Clinical Craft
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 tracking-tight mb-4">
            Anatomical Precision in Every Tooth
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Authentic dentures do not just look like natural teeth on the surface. They are sculpted with deep respect for natural oral anatomy, ridge contours, and physiological chewing dynamics.
          </p>
        </div>

        {/* Interactive Canvas & Inspector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* 3D Canvas / Photorealistic Viewport */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200/80 p-6 sm:p-8 shadow-xs relative flex flex-col items-center">
            <div className="w-full flex items-center justify-between text-xs text-stone-500 pb-3 border-b border-stone-100">
              <div className="flex items-center gap-1 p-0.5 bg-stone-100 rounded-lg">
                <button
                  onClick={() => setRenderMode('render')}
                  className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors cursor-pointer ${
                    renderMode === 'render'
                      ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  3D Studio Cutaway
                </button>
                <button
                  onClick={() => setRenderMode('canvas')}
                  className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors cursor-pointer ${
                    renderMode === 'canvas'
                      ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Interactive Rotation
                </button>
              </div>

              <span className="flex items-center gap-1 text-stone-400">
                {renderMode === 'canvas' ? (
                  <>
                    <RotateCw className="w-3.5 h-3.5 animate-spin-slow opacity-60" />
                    <span>Drag to rotate view</span>
                  </>
                ) : (
                  <span>Realistic Canadian Studio Render</span>
                )}
              </span>
            </div>

            {/* Viewport Area */}
            {renderMode === 'render' ? (
              <div className="w-full h-[340px] sm:h-[400px] relative flex items-center justify-center select-none overflow-hidden rounded-xl bg-gradient-to-b from-[#EFF5F9]/60 to-[#EBF2F7]/40">
                <img
                  src="/src/assets/images/chatgpt_tooth_full.png"
                  alt="Cinematic 3D render of molar tooth anatomy showing enamel, dentin, pulp, and roots"
                  className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 hover:scale-[1.02]"
                />

                {/* Layer Callout Pins */}
                {activeLayer === 'enamel' && (
                  <div className="absolute top-[26%] right-[22%] bg-white/95 px-3 py-1.5 rounded-lg border border-sky-200 shadow-md text-xs font-semibold text-sky-900 animate-fadeIn flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-sky-500" />
                    Enamel: Hard Pearlescent Shield
                  </div>
                )}
                {activeLayer === 'dentin' && (
                  <div className="absolute top-[32%] left-[24%] bg-white/95 px-3 py-1.5 rounded-lg border border-amber-200 shadow-md text-xs font-semibold text-amber-900 animate-fadeIn flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    Dentin: Structural Shock Absorber
                  </div>
                )}
                {activeLayer === 'pulp' && (
                  <div className="absolute top-[40%] right-[32%] bg-white/95 px-3 py-1.5 rounded-lg border border-rose-200 shadow-md text-xs font-semibold text-rose-900 animate-fadeIn flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    Pulp: Coronal Nerves &amp; Vessels
                  </div>
                )}
                {activeLayer === 'root' && (
                  <div className="absolute bottom-[22%] left-[34%] bg-white/95 px-3 py-1.5 rounded-lg border border-stone-300 shadow-md text-xs font-semibold text-stone-900 animate-fadeIn flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-stone-500" />
                    Roots: Alveolar Ridge Anchor
                  </div>
                )}

                <div className="absolute bottom-3 left-4 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md border border-stone-200 text-[11px] text-stone-600">
                  Exact Anatomical Model
                </div>
              </div>
            ) : (
              <div 
                className="w-full h-[340px] sm:h-[400px] cursor-grab active:cursor-grabbing relative flex items-center justify-center select-none"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <canvas 
                  ref={canvasRef} 
                  className="w-full h-full block touch-none"
                />

                {/* Minimal Callout Overlays */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md border border-stone-200/60 text-[11px] text-stone-600 shadow-2xs pointer-events-none">
                  Rot: {(rotationAngle % (Math.PI * 2)).toFixed(2)} rad
                </div>

                {activeLayer !== 'all' && (
                  <div className="absolute bottom-4 left-4 bg-stone-900 text-white px-3 py-1.5 rounded-lg text-xs font-medium shadow-md flex items-center gap-1.5 pointer-events-none animate-fadeIn">
                    <Eye className="w-3.5 h-3.5 text-emerald-300" />
                    Isolating: {LAYERS.find(l => l.id === activeLayer)?.name}
                  </div>
                )}
              </div>
            )}

            {/* Cutaway Scrubber */}
            <div className="w-full pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600 gap-4">
              <span className="shrink-0 font-medium">Cutaway Depth:</span>
              <input
                type="range"
                min="0.1"
                max="0.9"
                step="0.05"
                value={cutawayAmount}
                onChange={(e) => setCutawayAmount(parseFloat(e.target.value))}
                className="w-full accent-stone-800 cursor-pointer h-1.5 bg-stone-100 rounded-lg appearance-none"
                aria-label="Cross-section cutaway depth"
              />
              <span className="shrink-0 text-stone-500 font-mono w-10 text-right">
                {Math.round(cutawayAmount * 100)}%
              </span>
            </div>
          </div>

          {/* Interactive Layer Breakdown & Educational Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-xs">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-stone-500 mb-4">
                Explore Anatomical Layers
              </h3>

              <div className="grid grid-cols-2 gap-2 mb-6">
                <button
                  onClick={() => setActiveLayer('all')}
                  className={`px-3 py-2 text-xs font-medium rounded-lg text-left transition-all ${
                    activeLayer === 'all'
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200/50'
                  }`}
                >
                  Complete Tooth
                </button>
                {LAYERS.map((layer) => (
                  <button
                    key={layer.id}
                    onClick={() => setActiveLayer(layer.id)}
                    className={`px-3 py-2 text-xs font-medium rounded-lg text-left transition-all flex items-center justify-between ${
                      activeLayer === layer.id
                        ? 'bg-stone-900 text-white shadow-xs'
                        : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200/50'
                    }`}
                  >
                    <span>{layer.name.replace(' Layer', '')}</span>
                    <span 
                      className={`w-2 h-2 rounded-full ${
                        layer.id === 'enamel' ? 'bg-amber-100 border border-amber-300' :
                        layer.id === 'dentin' ? 'bg-amber-300' :
                        layer.id === 'pulp' ? 'bg-rose-400' : 'bg-stone-300'
                      }`} 
                    />
                  </button>
                ))}
              </div>

              {/* Detailed Active Layer Breakdown */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/70">
                {selectedLayerInfo ? (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <h4 className="text-sm font-semibold text-stone-900">
                        {selectedLayerInfo.name}
                      </h4>
                      <span className="text-[11px] text-stone-500 font-medium">
                        {selectedLayerInfo.depth}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed mb-3">
                      {selectedLayerInfo.description}
                    </p>
                    <div className="pt-2.5 border-t border-stone-200/70 text-xs text-emerald-950 bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-900/10">
                      <span className="font-semibold block mb-0.5 text-emerald-900 flex items-center gap-1">
                        <Info className="w-3.5 h-3.5" />
                        Denture Craftsmanship Relevance:
                      </span>
                      {selectedLayerInfo.clinicalSignificance}
                    </div>
                  </div>
                ) : (
                  <div>
                    <h4 className="text-sm font-semibold text-stone-900 mb-1">
                      Full Physiological Tooth View
                    </h4>
                    <p className="text-xs text-stone-600 leading-relaxed mb-3">
                      A healthy natural tooth is an integrated biological marvel. Each layer—from exterior enamel to the deepest root embedded in bone—dictates how natural teeth function.
                    </p>
                    <p className="text-xs text-stone-700 bg-white p-2.5 rounded-lg border border-stone-200/70">
                      Joan Andrews builds dentures that simulate this natural morphology, restoring facial height, comfortable lip support, and effortless speech.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Quality Commitment Callout */}
            <div className="bg-[#FAF9F5] rounded-2xl border border-stone-200/80 p-5 text-xs text-stone-600">
              <span className="font-semibold text-stone-900 block mb-1">
                Custom Hand-Crafted Fitting
              </span>
              Every full and partial denture is meticulously adjusted at our St. John&apos;s clinic to eliminate pressure hotspots and deliver a natural, beautiful smile.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Canvas drawing routine for anatomical tooth cross-section
function drawAnatomicalTooth(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  scale: number,
  cosA: number,
  sinA: number,
  activeLayer: AnatomyLayer,
  cutaway: number
) {
  // Projection offset based on rotation
  const xOffset = sinA * 15 * scale;

  ctx.save();
  ctx.translate(cx + xOffset, cy);

  // Highlighting opacity settings
  const isAll = activeLayer === 'all';
  const enamelAlpha = isAll || activeLayer === 'enamel' ? 1.0 : 0.25;
  const dentinAlpha = isAll || activeLayer === 'dentin' ? 1.0 : 0.25;
  const pulpAlpha = isAll || activeLayer === 'pulp' ? 1.0 : 0.25;
  const rootAlpha = isAll || activeLayer === 'root' ? 1.0 : 0.25;

  // 1. ROOT FOUNDATION (Cementum & Roots)
  ctx.save();
  ctx.globalAlpha = rootAlpha;

  // Left root
  ctx.beginPath();
  ctx.moveTo(-35 * scale, 10 * scale);
  ctx.bezierCurveTo(-45 * scale, 50 * scale, -40 * scale, 95 * scale, -28 * scale, 115 * scale);
  ctx.bezierCurveTo(-22 * scale, 120 * scale, -15 * scale, 115 * scale, -15 * scale, 90 * scale);
  ctx.bezierCurveTo(-15 * scale, 60 * scale, -8 * scale, 25 * scale, 0, 15 * scale);
  ctx.fillStyle = '#E8E3D8';
  ctx.fill();
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = '#D1C9BA';
  ctx.stroke();

  // Right root
  ctx.beginPath();
  ctx.moveTo(0, 15 * scale);
  ctx.bezierCurveTo(8 * scale, 25 * scale, 15 * scale, 60 * scale, 18 * scale, 90 * scale);
  ctx.bezierCurveTo(22 * scale, 118 * scale, 28 * scale, 120 * scale, 34 * scale, 112 * scale);
  ctx.bezierCurveTo(45 * scale, 90 * scale, 45 * scale, 50 * scale, 35 * scale, 10 * scale);
  ctx.fillStyle = '#E4DFD4';
  ctx.fill();
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = '#D1C9BA';
  ctx.stroke();

  ctx.restore();

  // 2. DENTIN CORE (Inner body of tooth)
  ctx.save();
  ctx.globalAlpha = dentinAlpha;
  ctx.beginPath();
  ctx.moveTo(-36 * scale, 8 * scale);
  ctx.bezierCurveTo(-40 * scale, -25 * scale, -35 * scale, -55 * scale, -20 * scale, -65 * scale);
  ctx.bezierCurveTo(-10 * scale, -70 * scale, -5 * scale, -60 * scale, 0, -62 * scale);
  ctx.bezierCurveTo(5 * scale, -60 * scale, 10 * scale, -70 * scale, 20 * scale, -65 * scale);
  ctx.bezierCurveTo(35 * scale, -55 * scale, 40 * scale, -25 * scale, 36 * scale, 8 * scale);
  ctx.bezierCurveTo(25 * scale, 20 * scale, -25 * scale, 20 * scale, -36 * scale, 8 * scale);

  const dentinGrad = ctx.createLinearGradient(0, -70 * scale, 0, 30 * scale);
  dentinGrad.addColorStop(0, '#F5E6BF');
  dentinGrad.addColorStop(0.7, '#EBD5A2');
  dentinGrad.addColorStop(1, '#DEC28E');
  ctx.fillStyle = dentinGrad;
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#D4BB85';
  ctx.stroke();
  ctx.restore();

  // 3. PULP CHAMBER & ROOT CANALS (Vascular & Nerve core)
  ctx.save();
  ctx.globalAlpha = pulpAlpha;
  ctx.beginPath();
  // Pulp chamber in crown
  ctx.moveTo(-16 * scale, -40 * scale);
  ctx.bezierCurveTo(-12 * scale, -52 * scale, -8 * scale, -42 * scale, 0, -45 * scale);
  ctx.bezierCurveTo(8 * scale, -42 * scale, 12 * scale, -52 * scale, 16 * scale, -40 * scale);
  ctx.bezierCurveTo(15 * scale, -20 * scale, 10 * scale, 0, 8 * scale, 10 * scale);
  // Down right canal
  ctx.bezierCurveTo(10 * scale, 40 * scale, 18 * scale, 80 * scale, 24 * scale, 105 * scale);
  ctx.lineTo(21 * scale, 105 * scale);
  ctx.bezierCurveTo(15 * scale, 80 * scale, 8 * scale, 40 * scale, 3 * scale, 12 * scale);
  // Center fork
  ctx.lineTo(-3 * scale, 12 * scale);
  // Down left canal
  ctx.bezierCurveTo(-8 * scale, 40 * scale, -15 * scale, 80 * scale, -21 * scale, 105 * scale);
  ctx.lineTo(-24 * scale, 105 * scale);
  ctx.bezierCurveTo(-18 * scale, 80 * scale, -10 * scale, 40 * scale, -8 * scale, 10 * scale);
  ctx.bezierCurveTo(-10 * scale, 0, -15 * scale, -20 * scale, -16 * scale, -40 * scale);

  const pulpGrad = ctx.createLinearGradient(0, -55 * scale, 0, 100 * scale);
  pulpGrad.addColorStop(0, '#E57373');
  pulpGrad.addColorStop(0.5, '#EF5350');
  pulpGrad.addColorStop(1, '#C62828');
  ctx.fillStyle = pulpGrad;
  ctx.fill();
  ctx.restore();

  // 4. OUTER ENAMEL SHELL (with cutaway perspective)
  ctx.save();
  ctx.globalAlpha = enamelAlpha;

  // Crown full outer contour
  ctx.beginPath();
  ctx.moveTo(-46 * scale, 5 * scale);
  // Left cusp
  ctx.bezierCurveTo(-52 * scale, -30 * scale, -45 * scale, -75 * scale, -26 * scale, -82 * scale);
  // Central fossa & middle groove
  ctx.bezierCurveTo(-15 * scale, -85 * scale, -8 * scale, -70 * scale, 0, -72 * scale);
  // Right cusp
  ctx.bezierCurveTo(8 * scale, -70 * scale, 15 * scale, -85 * scale, 26 * scale, -82 * scale);
  // Right margin
  ctx.bezierCurveTo(45 * scale, -75 * scale, 52 * scale, -30 * scale, 46 * scale, 5 * scale);
  // Cervical line (gumline)
  ctx.bezierCurveTo(30 * scale, 12 * scale, -30 * scale, 12 * scale, -46 * scale, 5 * scale);

  // If cutaway is applied, clip or split
  if (cutaway < 0.95) {
    const enamelGrad = ctx.createLinearGradient(-40 * scale, -80 * scale, 40 * scale, 10 * scale);
    enamelGrad.addColorStop(0, 'rgba(255, 255, 255, 0.92)');
    enamelGrad.addColorStop(0.5, 'rgba(247, 246, 242, 0.85)');
    enamelGrad.addColorStop(1, 'rgba(238, 235, 227, 0.7)');

    ctx.fillStyle = enamelGrad;
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#D8D4CA';
    ctx.stroke();

    // Subtle pearlescent enamel highlight along cusp
    ctx.beginPath();
    ctx.moveTo(-28 * scale, -78 * scale);
    ctx.bezierCurveTo(-20 * scale, -80 * scale, -10 * scale, -68 * scale, 0, -70 * scale);
    ctx.bezierCurveTo(10 * scale, -68 * scale, 20 * scale, -80 * scale, 28 * scale, -78 * scale);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.lineWidth = 2.5;
    ctx.stroke();
  }

  // Cross section cutaway line indicators
  ctx.beginPath();
  ctx.moveTo(0, -72 * scale);
  ctx.lineTo(0, 15 * scale);
  ctx.strokeStyle = 'rgba(168, 162, 158, 0.4)';
  ctx.lineWidth = 1;
  ctx.setLineDash([3, 3]);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.restore();

  // Subtle clean leader line callout tags when specific layer is selected
  if (activeLayer === 'enamel') {
    drawCalloutLeader(ctx, -38 * scale, -60 * scale, -85 * scale, -80 * scale, 'Enamel Shell', scale);
  } else if (activeLayer === 'dentin') {
    drawCalloutLeader(ctx, -15 * scale, -25 * scale, -85 * scale, -30 * scale, 'Dentin Core', scale);
  } else if (activeLayer === 'pulp') {
    drawCalloutLeader(ctx, 0, -35 * scale, 85 * scale, -40 * scale, 'Pulp Chamber', scale);
  } else if (activeLayer === 'root') {
    drawCalloutLeader(ctx, -22 * scale, 75 * scale, -85 * scale, 75 * scale, 'Anatomical Root', scale);
  }

  ctx.restore();
}

function drawCalloutLeader(
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  label: string,
  scale: number
) {
  ctx.save();
  // Anchor dot
  ctx.beginPath();
  ctx.arc(startX, startY, 3 * scale, 0, Math.PI * 2);
  ctx.fillStyle = '#1c1917';
  ctx.fill();

  // Hairline leader line
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo((startX + endX) / 2, endY);
  ctx.lineTo(endX, endY);
  ctx.strokeStyle = '#1c1917';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Small text label
  ctx.font = `500 ${Math.max(10, 11 * scale)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillStyle = '#1c1917';
  ctx.textAlign = endX < startX ? 'right' : 'left';
  ctx.fillText(label, endX + (endX < startX ? -6 : 6), endY + 3.5);

  ctx.restore();
}
