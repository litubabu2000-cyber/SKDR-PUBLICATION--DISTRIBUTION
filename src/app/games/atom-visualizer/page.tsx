
'use client';
import React, { useState, useEffect, useMemo, useRef } from 'react';

// Complete Data for first 18 elements with Stable Neutron counts
const ELEMENTS = [
  { number: 0, symbol: '?', name: 'Select an Element', mass: 0, stableNeutrons: 0, category: 'unknown' }, 
  { number: 1, symbol: 'H', name: 'Hydrogen', mass: 1.008, stableNeutrons: 0, category: 'nonmetal' },
  { number: 2, symbol: 'He', name: 'Helium', mass: 4.003, stableNeutrons: 2, category: 'noble' },
  { number: 3, symbol: 'Li', name: 'Lithium', mass: 6.94, stableNeutrons: 4, category: 'alkali' },
  { number: 4, symbol: 'Be', name: 'Beryllium', mass: 9.012, stableNeutrons: 5, category: 'alkaline' },
  { number: 5, symbol: 'B', name: 'Boron', mass: 10.81, stableNeutrons: 6, category: 'metalloid' },
  { number: 6, symbol: 'C', name: 'Carbon', mass: 12.01, stableNeutrons: 6, category: 'nonmetal' },
  { number: 7, symbol: 'N', name: 'Nitrogen', mass: 14.007, stableNeutrons: 7, category: 'nonmetal' },
  { number: 8, symbol: 'O', name: 'Oxygen', mass: 15.999, stableNeutrons: 8, category: 'nonmetal' },
  { number: 9, symbol: 'F', name: 'Fluorine', mass: 18.998, stableNeutrons: 10, category: 'halogen' },
  { number: 10, symbol: 'Ne', name: 'Neon', mass: 20.18, stableNeutrons: 10, category: 'noble' },
  { number: 11, symbol: 'Na', name: 'Sodium', mass: 22.99, stableNeutrons: 12, category: 'alkali' },
  { number: 12, symbol: 'Mg', name: 'Magnesium', mass: 24.305, stableNeutrons: 12, category: 'alkaline' },
  { number: 13, symbol: 'Al', name: 'Aluminium', mass: 26.98, stableNeutrons: 14, category: 'metal' },
  { number: 14, symbol: 'Si', name: 'Silicon', mass: 28.085, stableNeutrons: 14, category: 'metalloid' },
  { number: 15, symbol: 'P', name: 'Phosphorus', mass: 30.97, stableNeutrons: 16, category: 'nonmetal' },
  { number: 16, symbol: 'S', name: 'Sulfur', mass: 32.06, stableNeutrons: 16, category: 'nonmetal' },
  { number: 17, symbol: 'Cl', name: 'Chlorine', mass: 35.45, stableNeutrons: 18, category: 'halogen' },
  { number: 18, symbol: 'Ar', name: 'Argon', mass: 39.95, stableNeutrons: 22, category: 'noble' },
];

const CATEGORY_COLORS: Record<string, string> = {
    nonmetal: 'bg-blue-500/20 border-blue-500/50 text-blue-200',
    noble: 'bg-purple-500/20 border-purple-500/50 text-purple-200',
    alkali: 'bg-red-500/20 border-red-500/50 text-red-200',
    alkaline: 'bg-orange-500/20 border-orange-500/50 text-orange-200',
    metalloid: 'bg-emerald-500/20 border-emerald-500/50 text-emerald-200',
    halogen: 'bg-yellow-500/20 border-yellow-500/50 text-yellow-200',
    metal: 'bg-slate-500/20 border-slate-500/50 text-slate-200',
    unknown: 'bg-gray-800'
};

const MAX_Particle_LIMIT = 18;

declare global {
  interface Window {
    THREE: any;
  }
}

export default function AtomBuilder() {
  const [protons, setProtons] = useState(1);
  const [neutrons, setNeutrons] = useState(0);
  const [electrons, setElectrons] = useState(1);
  const [showLabels, setShowLabels] = useState(true);
  const [rotationSpeed, setRotationSpeed] = useState(10);
  const [viewMode, setViewMode] = useState('3d'); // '2d' or '3d'
  const [isDrawMode, setIsDrawMode] = useState(false); // New Drawing State
  
  // --- AI State ---
  const [aiOutput, setAiOutput] = useState<{mode: string, text: string} | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // --- Derived State ---
  const currentElement = ELEMENTS[protons] || { number: protons, symbol: '?', name: 'Unknown' };
  const massNumber = protons + neutrons;
  const netCharge = protons - electrons;
  const stability = calculateStability(protons, neutrons);

  function calculateStability(p: number, n: number) {
    if (p === 0) return "Empty";
    const ratio = n / p;
    if (p === 1 && n === 0) return "Stable";
    if (ratio < 0.8 || ratio > 1.6) return "Unstable";
    return "Stable";
  }

  // --- Handlers ---
  const selectElement = (element: typeof ELEMENTS[0]) => {
    setProtons(element.number);
    setNeutrons(element.stableNeutrons);
    setElectrons(element.number);
    setAiOutput(null);
  };

  const triggerGemini = async (mode: 'analyze' | 'usage') => {
    setIsAiLoading(true);
    setAiOutput(null);
    const apiKey = ""; 

    let prompt = "";
    if (mode === 'analyze') {
        prompt = `I have built an atom with ${protons} protons (${currentElement.name}), ${neutrons} neutrons, and ${electrons} electrons. 
        Act as a physics teacher. 
        1. Identify the Isotope.
        2. Explain if it is stable or radioactive and why.
        3. Explain its charge status.
        Keep the answer under 60 words and use emojis.`;
    } else {
        prompt = `I have built ${currentElement.name} (Isotope ${massNumber}).
        Tell me 2 interesting real-world uses or facts about this specific isotope or element.
        Keep the answer under 50 words and use emojis.`;
    }

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
            }
        );
        const data = await response.json();
        if (data.error) throw new Error(data.error.message);
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "No insights found.";
        setAiOutput({ mode, text });
    } catch (error) {
        setAiOutput({ mode: 'error', text: "AI Connection failed. Try again!" });
    } finally {
        setIsAiLoading(false);
    }
  };

  // Distribute electrons
  const electronShells = useMemo(() => {
    let remaining = electrons;
    const shells: { shellIndex: number; count: number; capacity: number }[] = [];
    const capacities = [2, 8, 8];

    for (let i = 0; i < capacities.length; i++) {
      if (remaining <= 0) break;
      const count = Math.min(remaining, capacities[i]);
      shells.push({ shellIndex: i + 1, count, capacity: capacities[i] });
      remaining -= count;
    }
    return shells;
  }, [electrons]);

  const configString = electronShells.map(s => s.count).join(' - ');

  // Nucleus packing
  const nucleusParticles = useMemo(() => {
    const particles: {type: string; x: number; y: number; id: number}[] = [];
    const types = [
        ...Array(protons).fill({ type: 'proton' }), 
        ...Array(neutrons).fill({ type: 'neutron' })
    ].sort(() => Math.random() - 0.5);

    types.forEach((p, i) => {
        const radius = Math.sqrt(i) * 6;
        const angle = i * 2.4; 
        particles.push({
            ...p,
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius,
            id: i
        });
    });
    return particles;
  }, [protons, neutrons]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col md:flex-row overflow-hidden">
      
      {/* LEFT PANEL: Controls & Periodic Table */}
      {/* Fixed height on mobile (40vh), Full height on desktop */}
      <div className="w-full md:w-[400px] flex flex-col border-r border-slate-700 bg-slate-800/90 backdrop-blur h-[40vh] md:h-screen overflow-y-auto custom-scrollbar shrink-0">
        <div className="p-4 md:p-6 pb-2">
          <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Atom Visualizer</h1>
          <p className="text-slate-400 text-xs mt-1">Select an element or build manually.</p>
        </div>

        {/* Quick Select Grid */}
        <div className="px-4 md:px-6 mb-4 md:mb-6">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Quick Select Element</label>
            <div className="grid grid-cols-6 gap-1.5">
                {ELEMENTS.slice(1).map((el) => (
                    <button
                        key={el.symbol}
                        onClick={() => selectElement(el)}
                        className={`
                            aspect-square flex items-center justify-center rounded border text-xs font-bold transition-all
                            ${protons === el.number 
                                ? 'bg-white text-slate-900 border-white scale-110 z-10 shadow-[0_0_15px_rgba(255,255,255,0.3)]' 
                                : `${CATEGORY_COLORS[el.category] || 'bg-slate-800 border-slate-700 text-slate-400'} hover:bg-slate-700 hover:border-slate-500`}
                        `}
                        title={el.name}
                    >
                        {el.symbol}
                    </button>
                ))}
            </div>
        </div>

        {/* Info Card */}
        <div className="px-4 md:px-6">
            <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50 relative overflow-hidden">
                <div className="relative z-10 flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white">{currentElement.name}</h2>
                        <div className="text-sm text-slate-400 font-mono mt-1">
                            Config: <span className="text-cyan-300">{configString}</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl md:text-4xl font-black text-slate-700/50">{currentElement.symbol}</div>
                        <div className={`text-xs font-bold uppercase px-2 py-0.5 rounded mt-1 ${stability === 'Stable' ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'}`}>
                            {stability}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Sliders/Controls */}
        <div className="p-4 md:p-6 space-y-3 md:space-y-5">
            <ControlRow label="Protons" count={protons} color="text-red-400" bg="bg-red-500" onInc={() => setProtons(p => Math.min(p + 1, MAX_Particle_LIMIT))} onDec={() => setProtons(p => Math.max(p - 1, 1))} />
            <ControlRow label="Neutrons" count={neutrons} color="text-slate-300" bg="bg-slate-500" onInc={() => setNeutrons(n => n + 1)} onDec={() => setNeutrons(n => Math.max(n - 1, 0))} />
            <ControlRow label="Electrons" count={electrons} color="text-cyan-400" bg="bg-cyan-500" onInc={() => setElectrons(e => Math.min(e + 1, MAX_Particle_LIMIT))} onDec={() => setElectrons(e => Math.max(e - 1, 0))} />
        </div>

        {/* AI Section */}
        <div className="px-4 md:px-6 pb-8 mt-auto">
            <div className="bg-indigo-900/20 rounded-xl p-4 border border-indigo-500/30">
                <div className="flex gap-2 mb-3">
                    <button onClick={() => triggerGemini('analyze')} disabled={isAiLoading} className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded text-xs font-bold transition">
                        {isAiLoading ? '...' : 'Analyze'}
                    </button>
                    <button onClick={() => triggerGemini('usage')} disabled={isAiLoading} className="flex-1 bg-purple-600 hover:bg-purple-500 text-white py-2 rounded text-xs font-bold transition">
                        {isAiLoading ? '...' : 'Fun Facts'}
                    </button>
                </div>
                {aiOutput && <div className="text-xs md:text-sm text-indigo-100 leading-relaxed animate-fade-in">{aiOutput.text}</div>}
            </div>
        </div>
      </div>

      {/* RIGHT PANEL: Visualization */}
      {/* Takes remaining height on mobile (60vh), Flex-1 on desktop */}
      <div className="w-full md:flex-1 h-[60vh] md:h-auto bg-slate-950 relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

        {/* View Toggle & Draw Mode Button */}
        <div className="absolute top-4 right-4 z-30 flex gap-2 flex-col md:flex-row items-end">
            {!isDrawMode && (
                <button 
                    onClick={() => setIsDrawMode(true)}
                    className="px-3 py-1.5 md:px-4 rounded-full text-xs font-bold bg-pink-600 text-white hover:bg-pink-500 border border-pink-400 shadow-lg transition flex items-center gap-2"
                >
                    <span>🔒 Draw</span>
                </button>
            )}
            
            {!isDrawMode && (
                <div className="flex gap-2">
                    <button 
                    onClick={() => setShowLabels(!showLabels)}
                    className={`hidden md:block px-3 py-1 rounded-full text-xs font-medium border transition ${showLabels ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-900 border-slate-700 text-slate-400'}`}
                    >
                    {showLabels ? 'Labels On' : 'Labels Off'}
                    </button>
                    <div className="flex bg-slate-800 rounded-full p-1 border border-slate-700">
                        <button 
                            onClick={() => setViewMode('2d')}
                            className={`px-3 py-1 rounded-full text-xs font-bold transition ${viewMode === '2d' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
                        >
                            2D
                        </button>
                        <button 
                            onClick={() => setViewMode('3d')}
                            className={`px-3 py-1 rounded-full text-xs font-bold transition ${viewMode === '3d' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
                        >
                            3D
                        </button>
                    </div>
                </div>
            )}
        </div>

        {/* DRAWING CANVAS OVERLAY */}
        {isDrawMode && (
            <DrawingCanvas onClose={() => setIsDrawMode(false)} />
        )}

        {/* Legend (Hidden if Drawing) */}
        {!isDrawMode && (
            <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 flex gap-2 md:gap-4 text-[10px] md:text-xs font-mono text-slate-500 z-10 pointer-events-none flex-wrap">
                <div className="flex items-center gap-1 md:gap-2"><div className="w-2 h-2 rounded-full bg-red-500"></div>Protons (+)</div>
                <div className="flex items-center gap-1 md:gap-2"><div className="w-2 h-2 rounded-full bg-slate-500"></div>Neutrons (0)</div>
                <div className="flex items-center gap-1 md:gap-2"><div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>Electrons (-)</div>
            </div>
        )}

        {/* Visualization SVG or ThreeJS */}
        {viewMode === '2d' ? (
            // Increased viewBox to 500 (zoomed out) for better mobile fit
            <svg viewBox="-250 -250 500 500" className="w-full h-full max-w-3xl max-h-3xl animate-fade-in">
                <defs>
                    <filter id="glow-electron">
                        <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                        <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                </defs>

                {/* Shells */}
                {electronShells.map((shell, index) => {
                    // Reduced multiplier from 35 to 30 for tighter packing on small screens
                    const radius = 50 + (shell.shellIndex * 30);
                    return (
                        <g key={`shell-${shell.shellIndex}`}>
                            <circle cx="0" cy="0" r={radius} fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
                            <g className="electron-orbit" style={{ animationDuration: `${rotationSpeed + (index * 6)}s`, animationDirection: index % 2 === 0 ? 'normal' : 'reverse' }}>
                                {Array.from({ length: shell.count }).map((_, eIndex) => {
                                    const angle = (eIndex / shell.count) * Math.PI * 2;
                                    // Trail Particles for 2D View
                                    const trail1X = Math.cos(angle - 0.15) * radius;
                                    const trail1Y = Math.sin(angle - 0.15) * radius;
                                    const trail2X = Math.cos(angle - 0.3) * radius;
                                    const trail2Y = Math.sin(angle - 0.3) * radius;

                                    return (
                                        <g key={`e-${index}-${eIndex}`}>
                                             {/* Trail 2 (Faintest) */}
                                            <circle cx={trail2X} cy={trail2Y} r={2} fill="#22d3ee" opacity="0.2" />
                                             {/* Trail 1 (Faint) */}
                                            <circle cx={trail1X} cy={trail1Y} r={3} fill="#22d3ee" opacity="0.5" />
                                            {/* Main Electron */}
                                            <circle cx={Math.cos(angle) * radius} cy={Math.sin(angle) * radius} r={5} fill="#22d3ee" filter="url(#glow-electron)" />
                                        </g>
                                    );
                                })}
                            </g>
                        </g>
                    );
                })}

                {/* Nucleus */}
                <g className="nucleus transition-all duration-500">
                     {nucleusParticles.map((p) => (
                         <circle key={`${p.type}-${p.id}`} cx={p.x} cy={p.y} r={6} fill={p.type === 'proton' ? '#ef4444' : '#64748b'} stroke={p.type === 'proton' ? '#991b1b' : '#334155'} strokeWidth="0.5" />
                     ))}
                     {showLabels && (
                        <g>
                             <text y="-2" x="0" textAnchor="middle" fontSize="12" fill="#fff" fontWeight="bold" style={{ textShadow: '0px 2px 4px rgba(0,0,0,0.8)' }}>
                                {protons}p
                             </text>
                        </g>
                     )}
                </g>
            </svg>
        ) : (
            <ThreeScene protons={protons} neutrons={neutrons} electronShells={electronShells} />
        )}
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .electron-orbit { animation-name: spin; animation-timing-function: linear; animation-iteration-count: infinite; transform-origin: 0 0; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #1e293b; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #475569; border-radius: 4px; }
        .animate-fade-in { animation: fadeIn 0.5s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}

function ControlRow({ label, count, color, bg, onInc, onDec }: { label: string, count: number, color: string, bg: string, onInc: () => void, onDec: () => void }) {
    return (
        <div className="flex items-center justify-between bg-slate-800/50 p-2 rounded border border-slate-700/50">
            <span className="text-xs font-bold text-slate-400 uppercase w-16 md:w-20">{label}</span>
            <div className="flex items-center gap-2 md:gap-3">
                <button onClick={onDec} className="w-6 h-6 rounded bg-slate-700 hover:bg-slate-600 text-white flex items-center justify-center text-sm">-</button>
                <span className={`w-6 text-center font-mono font-bold ${color}`}>{count}</span>
                <button onClick={onInc} className={`w-6 h-6 rounded text-white flex items-center justify-center text-sm ${bg} hover:brightness-110`}>+</button>
            </div>
        </div>
    );
}

// --- DRAWING COMPONENT ---
function DrawingCanvas({ onClose }: {onClose: () => void}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#ffffff');
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Resize canvas to match parent
    const parent = canvas.parentElement;
    if (!parent) return;
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 3;
    ctx.strokeStyle = color;

    const handleResize = () => {
        if (!canvas.parentElement) return;
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = 3;
        ctx.strokeStyle = color;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if(canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) ctx.strokeStyle = color;
    }
  }, [color]);

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const endDraw = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="absolute inset-0 z-40 bg-transparent">
        {/* Toolbar */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-slate-800/90 border border-slate-600 p-1.5 md:p-2 rounded-full flex gap-2 md:gap-3 items-center shadow-xl z-50 pointer-events-auto whitespace-nowrap">
            <div className="text-[10px] md:text-xs font-bold text-white px-1.5 border-r border-slate-600">DRAW</div>
            <button onClick={() => setColor('#ffffff')} className={`w-5 h-5 md:w-6 md:h-6 rounded-full bg-white border-2 ${color === '#ffffff' ? 'border-blue-500 scale-110' : 'border-transparent'}`} />
            <button onClick={() => setColor('#ef4444')} className={`w-5 h-5 md:w-6 md:h-6 rounded-full bg-red-500 border-2 ${color === '#ef4444' ? 'border-white scale-110' : 'border-transparent'}`} />
            <button onClick={() => setColor('#22d3ee')} className={`w-5 h-5 md:w-6 md:h-6 rounded-full bg-cyan-400 border-2 ${color === '#22d3ee' ? 'border-white scale-110' : 'border-transparent'}`} />
            <button onClick={() => setColor('#fbbf24')} className={`w-5 h-5 md:w-6 md:h-6 rounded-full bg-amber-400 border-2 ${color === '#fbbf24' ? 'border-white scale-110' : 'border-transparent'}`} />
            
            <div className="w-px h-6 bg-slate-600 mx-1"></div>
            
            <button onClick={clearCanvas} className="text-xs text-slate-300 hover:text-white font-bold px-1 md:px-2">Clear</button>
            <button onClick={onClose} className="px-2 md:px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded-full text-[10px] md:text-xs font-bold">Exit</button>
        </div>

        <canvas 
            ref={canvasRef}
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={endDraw}
            onMouseLeave={endDraw}
            onTouchStart={startDraw}
            onTouchMove={draw}
            onTouchEnd={endDraw}
            className="w-full h-full cursor-crosshair touch-none"
        />
    </div>
  );
}

// --- THREE.JS IMPLEMENTATION ---

function ThreeScene({ protons, neutrons, electronShells }: {protons: number, neutrons: number, electronShells: { shellIndex: number; count: number; capacity: number }[]}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{ scene: any, particlesGroup: any, electronsGroup: any, renderer: any, camera: any, THREE: any } | null>(null);

  useEffect(() => {
    // Declare variables at the TOP to ensure they exist for initScene
    let renderer: any, scene: any, camera: any, particlesGroup: any, electronsGroup: any;
    let animationId: number;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    // 1. Load Three.js if not present
    if (!window.THREE) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        script.onload = initScene;
        document.head.appendChild(script);
    } else {
        initScene();
    }

    function initScene() {
        const THREE = window.THREE;
        if (!containerRef.current) return;

        // Setup
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(50, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
        camera.position.z = 80;

        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        
        // Clear previous canvas if any
        while(containerRef.current.firstChild) containerRef.current.removeChild(containerRef.current.firstChild);
        containerRef.current.appendChild(renderer.domElement);

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        
        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(10, 10, 10);
        scene.add(pointLight);

        const glowLight = new THREE.PointLight(0x4444ff, 2, 50);
        glowLight.position.set(0, 0, 0);
        scene.add(glowLight);

        // Groups
        particlesGroup = new THREE.Group();
        electronsGroup = new THREE.Group();
        scene.add(particlesGroup); // Rotatable
        particlesGroup.add(electronsGroup);

        sceneRef.current = { scene, particlesGroup, electronsGroup, renderer, camera, THREE };
        
        // Start Loop
        animate();
        updateParticles(); // Initial Draw
        
        // Events
        renderer.domElement.addEventListener('mousedown', onMouseDown);
        renderer.domElement.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    }

    function updateParticles() {
        if (!sceneRef.current) return;
        const { THREE, particlesGroup, electronsGroup } = sceneRef.current;

        // Clear existing
        while(particlesGroup.children.length > 1) { // Keep electronsGroup (index 0 usually, but safer to filter)
             const child = particlesGroup.children.find((c: any) => c !== electronsGroup);
             if(!child) break;
             particlesGroup.remove(child);
        }
        while(electronsGroup.children.length > 0) electronsGroup.remove(electronsGroup.children[0]);

        // 1. Build Nucleus
        const protonGeo = new THREE.SphereGeometry(1.0, 16, 16);
        const protonMat = new THREE.MeshPhongMaterial({ color: 0xff4444, shininess: 100 });
        const neutronGeo = new THREE.SphereGeometry(1.0, 16, 16);
        const neutronMat = new THREE.MeshPhongMaterial({ color: 0x888888, shininess: 50 });
        
        // Add Nucleus Glow Sprite
        const glowGeo = new THREE.SphereGeometry(4, 16, 16);
        const glowMat = new THREE.MeshBasicMaterial({ color: 0xffaa44, transparent: true, opacity: 0.2 });
        const glowMesh = new THREE.Mesh(glowGeo, glowMat);
        particlesGroup.add(glowMesh);

        const totalNucleons = protons + neutrons;
        const nucleoRadius = Math.max(2, Math.cbrt(totalNucleons) * 1.5);

        // Simple packing: random points inside sphere
        for (let i = 0; i < totalNucleons; i++) {
            const isProton = i < protons;
            const mesh = new THREE.Mesh(isProton ? protonGeo : neutronGeo, isProton ? protonMat : neutronMat);
            
            // Random position in clump
            const phi = Math.acos(-1 + (2 * i) / totalNucleons);
            const theta = Math.sqrt(totalNucleons * Math.PI) * phi;
            
            mesh.position.setFromSphericalCoords(
                Math.random() * nucleoRadius * 0.8, 
                phi,
                theta
            );

            particlesGroup.add(mesh);
        }

        // 2. Build Electrons (REALISTIC ORBITS)
        const electronGeo = new THREE.SphereGeometry(0.4, 16, 16);
        const electronMat = new THREE.MeshPhongMaterial({ 
            color: 0x22d3ee, 
            emissive: 0x116677,
            shininess: 100 
        });
        
        electronShells.forEach((shell, sIndex) => {
            const radius = 10 + (shell.shellIndex * 6); // Spread out more
            
            // Visual Guide for Shell (Faint Sphere)
            const shellGeo = new THREE.SphereGeometry(radius, 32, 32);
            const shellMat = new THREE.MeshBasicMaterial({ 
                color: 0x475569, 
                transparent: true, 
                opacity: 0.05, 
                wireframe: true 
            });
            const shellMesh = new THREE.Mesh(shellGeo, shellMat);
            electronsGroup.add(shellMesh);

            // Electrons
            for(let e = 0; e < shell.count; e++) {
                const electron = new THREE.Mesh(electronGeo, electronMat);
                
                // Randomize Orbit Axis
                const axis = new THREE.Vector3(Math.random()-0.5, Math.random()-0.5, Math.random()-0.5).normalize();
                const startAngle = Math.random() * Math.PI * 2;

                // Create Visible Orbit Path (Ring)
                const orbitCurve = new THREE.EllipseCurve(0, 0, radius, radius, 0, 2 * Math.PI, false, 0);
                const orbitPoints = orbitCurve.getPoints(64);
                const orbitGeo = new THREE.BufferGeometry().setFromPoints(orbitPoints);
                const orbitMat = new THREE.LineBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.15 }); // Faint cyan
                const orbit = new THREE.Line(orbitGeo, orbitMat);
                
                // Rotate orbit to match electron axis
                // We need to rotate the orbit (initially on XY plane) to the random axis
                const quaternion = new THREE.Quaternion();
                quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1), axis);
                orbit.quaternion.copy(quaternion);
                
                electronsGroup.add(orbit); // Add Ring
                
                // Add Electron
                electron.userData = {
                    radius: radius,
                    axis: axis,
                    angle: startAngle,
                    speed: 0.05 - (sIndex * 0.005) + (Math.random() * 0.01)
                };
                electronsGroup.add(electron);
            }
        });
    }

    function animate() {
        animationId = requestAnimationFrame(animate);
        if (!sceneRef.current) return;
        
        const { renderer, scene, camera, electronsGroup, particlesGroup, THREE } = sceneRef.current;

        // Animate Electrons on 3D orbits
        electronsGroup.children.forEach((child: any) => {
            if (child.geometry && child.geometry.type === 'SphereGeometry' && child.userData.axis) { 
                // It's an electron
                child.userData.angle += child.userData.speed;
                
                // Rotate a vector (radius, 0, 0) around the random axis
                const x = child.userData.radius * Math.cos(child.userData.angle);
                const y = child.userData.radius * Math.sin(child.userData.angle);
                
                const pos = new THREE.Vector3(x, y, 0);
                const quaternion = new THREE.Quaternion();
                quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1), child.userData.axis);
                pos.applyQuaternion(quaternion);
                
                child.position.copy(pos);
            }
        });

        // Gentle floating rotation for the whole atom if not dragging
        if (!isDragging) {
            particlesGroup.rotation.y += 0.002;
            particlesGroup.rotation.z += 0.001;
            
            // Nucleus Pulse
            const scale = 1 + Math.sin(Date.now() * 0.002) * 0.02;
            particlesGroup.scale.set(scale, scale, scale);
        }

        renderer.render(scene, camera);
    }

    // Interaction
    function onMouseDown(e: MouseEvent) {
        isDragging = true;
        previousMousePosition = { x: e.clientX, y: e.clientY };
    }
    function onMouseMove(e: MouseEvent) {
        if (isDragging && sceneRef.current) {
            const deltaMove = {
                x: e.clientX - previousMousePosition.x,
                y: e.clientY - previousMousePosition.y
            };
            
            const { particlesGroup } = sceneRef.current;
            particlesGroup.rotation.y += deltaMove.x * 0.01;
            particlesGroup.rotation.x += deltaMove.y * 0.01;

            previousMousePosition = { x: e.clientX, y: e.clientY };
        }
    }
    function onMouseUp() {
        isDragging = false;
    }

    // Watch for props changes to rebuild scene
    updateParticles();

    return () => {
        if (animationId) cancelAnimationFrame(animationId);
        if (renderer && renderer.domElement && renderer.domElement.parentElement) {
          renderer.domElement.parentElement.removeChild(renderer.domElement);
        }
        window.removeEventListener('mouseup', onMouseUp);
    };
  }, [protons, neutrons, electronShells]); // Re-run if atom structure changes

  return <div ref={containerRef} className="w-full h-full cursor-move" />;
}

