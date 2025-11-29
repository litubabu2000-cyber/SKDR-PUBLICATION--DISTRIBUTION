'use client';

import React, { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Check, 
  RefreshCw, 
  Activity, 
  Utensils, 
  Heart, 
  Droplet, 
  Filter, 
  Upload, 
  Image as ImageIcon, 
  Edit2,
  Loader2
} from 'lucide-react';

// --- Types ---

interface Part {
  id: string;
  label: string;
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
}

interface Feedback {
  type: 'success' | 'error';
  message: string;
}

interface DraggedCoords {
  x: string;
  y: string;
  initialMouseX: number;
  initialMouseY: number;
}

type SystemType = 'digestive' | 'respiratory' | 'heart' | 'excretory' | 'kidney';

// --- Data ---

const DIGESTIVE_PARTS: Part[] = [
  { id: 'mouth', label: 'Mouth/Pharynx', x: 50, y: 12 },
  { id: 'esophagus', label: 'Esophagus', x: 50, y: 28 },
  { id: 'stomach', label: 'Stomach', x: 58, y: 42 },
  { id: 'liver', label: 'Liver', x: 42, y: 40 },
  { id: 'pancreas', label: 'Pancreas', x: 58, y: 48 },
  { id: 'small_intestine', label: 'Small Intestine', x: 50, y: 58 },
  { id: 'large_intestine', label: 'Large Intestine', x: 50, y: 70 },
  { id: 'rectum', label: 'Rectum', x: 50, y: 82 },
];

const RESPIRATORY_PARTS: Part[] = [
  { id: 'nasal', label: 'Nasal Cavity', x: 50, y: 12 },
  { id: 'trachea', label: 'Trachea', x: 50, y: 35 },
  { id: 'right_lung', label: 'Right Lung', x: 35, y: 55 },
  { id: 'left_lung', label: 'Left Lung', x: 65, y: 55 },
  { id: 'diaphragm', label: 'Diaphragm', x: 50, y: 75 },
];

const HEART_PARTS: Part[] = [
  { id: 'vena_cava', label: 'Superior Vena Cava', x: 35, y: 25 },
  { id: 'aorta', label: 'Aorta', x: 65, y: 20 },
  { id: 'pulmonary_artery', label: 'Pulmonary Artery', x: 55, y: 30 },
  { id: 'right_atrium', label: 'Right Atrium', x: 35, y: 45 },
  { id: 'left_atrium', label: 'Left Atrium', x: 65, y: 45 },
  { id: 'right_ventricle', label: 'Right Ventricle', x: 40, y: 65 },
  { id: 'left_ventricle', label: 'Left Ventricle', x: 60, y: 65 },
];

const EXCRETORY_PARTS: Part[] = [
  { id: 'left_kidney', label: 'Left Kidney', x: 60, y: 40 },
  { id: 'right_kidney', label: 'Right Kidney', x: 40, y: 45 },
  { id: 'ureters', label: 'Ureters', x: 50, y: 60 },
  { id: 'bladder', label: 'Urinary Bladder', x: 50, y: 80 },
  { id: 'urethra', label: 'Urethra', x: 50, y: 92 },
];

const KIDNEY_PARTS: Part[] = [
  { id: 'cortex', label: 'Renal Cortex', x: 25, y: 50 },
  { id: 'medulla', label: 'Renal Medulla (Pyramids)', x: 40, y: 50 },
  { id: 'pelvis', label: 'Renal Pelvis', x: 55, y: 50 },
  { id: 'ureter', label: 'Ureter', x: 55, y: 80 },
  { id: 'artery', label: 'Renal Artery', x: 70, y: 35 },
  { id: 'vein', label: 'Renal Vein', x: 70, y: 45 },
];

const SYSTEM_DATA_MAP: Record<SystemType, Part[]> = {
  digestive: DIGESTIVE_PARTS,
  respiratory: RESPIRATORY_PARTS,
  heart: HEART_PARTS,
  excretory: EXCRETORY_PARTS,
  kidney: KIDNEY_PARTS,
};


// --- Main Component ---

function AnatomyPuzzle() {
  const searchParams = useSearchParams();
  const initialSystem = (searchParams.get('system') as SystemType) || 'digestive';

  const [activeSystem, setActiveSystem] = useState<SystemType>(initialSystem);
  const [parts, setParts] = useState<Part[]>(SYSTEM_DATA_MAP[initialSystem]);
  const [placements, setPlacements] = useState<Record<string, Part>>({});
  const [selectedLabel, setSelectedLabel] = useState<Part | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [shuffledLabels, setShuffledLabels] = useState<Part[]>([]);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  
  // Dragging state for Edit Mode
  const [isDragging, setIsDragging] = useState(false);
  const [draggedPartId, setDraggedPartId] = useState<string | null>(null);
  const [draggedCoords, setDraggedCoords] = useState<DraggedCoords | null>(null);

  const diagramRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize and Shuffle
  useEffect(() => {
    switchSystem(initialSystem);
  }, [initialSystem]); 

  const switchSystem = (system: SystemType) => {
    setActiveSystem(system);
    const newParts = SYSTEM_DATA_MAP[system];
    
    setParts(newParts);
    setPlacements({});
    setSelectedLabel(null);
    setFeedback(null);
    setShowSuccess(false);
    setCustomImage(null);
    if (!isEditMode) {
      setShuffledLabels([...newParts].sort(() => Math.random() - 0.5));
    } else {
      setShuffledLabels([]);
    }
  };

  const resetGame = (currentParts = parts) => {
    setPlacements({});
    setSelectedLabel(null);
    setFeedback(null);
    setShowSuccess(false);
    
    if (!isEditMode) {
        setShuffledLabels([...currentParts].sort(() => Math.random() - 0.5));
    } else {
        setShuffledLabels([]);
    }
  };

  const handleLabelClick = (part: Part) => {
    if (placements[part.id] || isEditMode) return;
    
    if (selectedLabel && selectedLabel.id === part.id) {
      setSelectedLabel(null);
    } else {
      setSelectedLabel(part);
      setFeedback(null);
    }
  };

  const handleDropZoneClick = (targetId: string) => {
    if (!selectedLabel || isEditMode) return;

    if (selectedLabel.id === targetId) {
      const newPlacements = { ...placements, [targetId]: selectedLabel };
      setPlacements(newPlacements);
      setSelectedLabel(null);
      setFeedback({ type: 'success', message: 'Correct!' });
      
      setShuffledLabels(prev => prev.filter(p => p.id !== selectedLabel.id));

      if (Object.keys(newPlacements).length === parts.length) {
        setTimeout(() => setShowSuccess(true), 500);
      }
    } else {
      setFeedback({ type: 'error', message: 'Incorrect, try again.' });
    }
    setTimeout(() => setFeedback(null), 1500);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCustomImage(imageUrl);
      setPlacements({});
      setSelectedLabel(null);
    }
  };

  const isPlaced = (partId: string) => !!placements[partId];

  // --- AI Handlers ---

  const getSystemName = () => {
      return activeSystem === 'heart' ? 'Human Heart' : `${activeSystem.charAt(0).toUpperCase() + activeSystem.slice(1)} System`;
  };

  // --- Drag Logic for Edit Mode ---
  const handleStartDrag = (e: React.MouseEvent | React.TouchEvent, partId: string) => {
    if (!isEditMode) return;
    e.preventDefault(); 
    setIsDragging(true);
    setDraggedPartId(partId);
    
    const clientX = 'touches' in e.nativeEvent ? e.nativeEvent.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e.nativeEvent ? e.nativeEvent.touches[0].clientY : (e as React.MouseEvent).clientY;
    
    const part = parts.find(p => p.id === partId);
    if (part) {
        setDraggedCoords({ 
            x: part.x.toString(), 
            y: part.y.toString(), 
            initialMouseX: clientX, 
            initialMouseY: clientY 
        });
    }
  };
  
  const handleDrag = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging || !diagramRef.current || !draggedPartId) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
    
    const diagramRect = diagramRef.current.getBoundingClientRect();
    
    const newX = clientX - diagramRect.left;
    const newY = clientY - diagramRect.top;
    
    const newXPercent = Math.max(0, Math.min(100, (newX / diagramRect.width) * 100));
    const newYPercent = Math.max(0, Math.min(100, (newY / diagramRect.height) * 100));

    const fixedX = parseFloat(newXPercent.toFixed(1));
    const fixedY = parseFloat(newYPercent.toFixed(1));

    setDraggedCoords((prev) => prev ? ({ 
        ...prev,
        x: newXPercent.toFixed(1), 
        y: newYPercent.toFixed(1) 
    }) : null);

    setParts(currentParts => currentParts.map(part => 
        part.id === draggedPartId ? { ...part, x: fixedX, y: fixedY } : part
    ));
  }, [isDragging, draggedPartId]);

  const handleEndDrag = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    setDraggedPartId(null);
  }, [isDragging]);

  useEffect(() => {
    if (isEditMode) {
      window.addEventListener('mousemove', handleDrag);
      window.addEventListener('mouseup', handleEndDrag);
      window.addEventListener('touchmove', handleDrag, { passive: false });
      window.addEventListener('touchend', handleEndDrag);
    }
    return () => {
      window.removeEventListener('mousemove', handleDrag);
      window.removeEventListener('mouseup', handleEndDrag);
      window.removeEventListener('touchmove', handleDrag);
      window.removeEventListener('touchend', handleEndDrag);
    };
  }, [isEditMode, handleDrag, handleEndDrag]);
  
  const toggleEditMode = () => {
    setIsEditMode(prev => !prev);
    if (isEditMode) {
        resetGame(parts);
        setDraggedCoords(null);
    } else {
        setPlacements({});
        setSelectedLabel(null);
    }
  };

  const getSystemColor = (opacity = 1) => {
    if (activeSystem === 'digestive') return `rgba(59, 130, 246, ${opacity})`;
    if (activeSystem === 'respiratory') return `rgba(6, 182, 212, ${opacity})`;
    if (activeSystem === 'heart') return `rgba(239, 68, 68, ${opacity})`;
    if (activeSystem === 'excretory') return `rgba(124, 58, 237, ${opacity})`;
    return `rgba(217, 119, 6, ${opacity})`;
  };

  const getBackgroundClass = () => {
    if (activeSystem === 'digestive') return 'bg-blue-50';
    if (activeSystem === 'respiratory') return 'bg-cyan-50';
    if (activeSystem === 'heart') return 'bg-red-50';
    if (activeSystem === 'excretory') return 'bg-violet-50';
    return 'bg-amber-50';
  }

  return (
    <div className={`flex flex-col items-center w-full min-h-screen pb-12 transition-colors duration-500 ${getBackgroundClass()} font-sans`}>
      
      {/* Header */}
      <header className="w-full max-w-6xl p-4 mb-2 lg:mb-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 lg:p-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col items-center md:items-start">
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-800 flex items-center gap-3">
                <span className="text-4xl">
                    {activeSystem === 'digestive' && '🫁'}
                    {activeSystem === 'respiratory' && '🫀'}
                    {activeSystem === 'heart' && '❤️'}
                    {activeSystem === 'excretory' && '💧'}
                    {activeSystem === 'kidney' && '🥜'}
                </span> 
                {getSystemName()} Puzzle
            </h1>
            <p className="text-slate-500 text-sm mt-1">Identify the anatomy correctly</p>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-3">
                <div className="flex flex-wrap justify-center bg-slate-100 p-1 rounded-xl mb-2 md:mb-0">
                    <button onClick={() => switchSystem('digestive')} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${activeSystem === 'digestive' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`} title="Digestive">
                        <Utensils size={16} /> <span className="hidden xl:inline">Digestive</span>
                    </button>
                    <button onClick={() => switchSystem('respiratory')} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${activeSystem === 'respiratory' ? 'bg-white text-cyan-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`} title="Respiratory">
                        <Activity size={16} /> <span className="hidden xl:inline">Respiratory</span>
                    </button>
                    <button onClick={() => switchSystem('heart')} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${activeSystem === 'heart' ? 'bg-white text-red-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`} title="Heart">
                        <Heart size={16} /> <span className="hidden xl:inline">Heart</span>
                    </button>
                    <button onClick={() => switchSystem('excretory')} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${activeSystem === 'excretory' ? 'bg-white text-violet-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`} title="Excretory">
                        <Droplet size={16} /> <span className="hidden xl:inline">Excretory</span>
                    </button>
                    <button onClick={() => switchSystem('kidney')} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${activeSystem === 'kidney' ? 'bg-white text-amber-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`} title="Kidney">
                        <Filter size={16} /> <span className="hidden xl:inline">Kidney</span>
                    </button>
                </div>

                <div className="flex flex-wrap justify-center gap-2">
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                    
                    <button onClick={() => fileInputRef.current?.click()} className="p-2 md:px-4 md:py-2 bg-slate-50 text-slate-600 rounded-lg hover:bg-slate-100 transition-colors text-sm font-semibold border border-slate-200" title="Upload Custom Image" disabled={isEditMode}>
                        {customImage ? <ImageIcon size={18} /> : <Upload size={18} />}
                    </button>
                    
                    <button onClick={toggleEditMode} className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm font-semibold shadow-sm border ${isEditMode ? 'bg-orange-600 text-white border-orange-700 shadow-md' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}>
                        <Edit2 size={16} />
                        <span className="hidden sm:inline">{isEditMode ? 'Done' : 'Edit'}</span>
                    </button>

                    <button onClick={() => resetGame(parts)} className="p-2 md:px-4 md:py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors text-sm font-semibold" title="Reset Puzzle">
                        <RefreshCw size={18} />
                    </button>
                </div>
            </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-6xl flex flex-col lg:flex-row gap-6 lg:gap-8 px-4 items-start justify-center">
        
        {/* Diagram Area */}
        <div 
          ref={diagramRef}
          className="relative flex-shrink-0 w-full max-w-[500px] aspect-[3/4] bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden mx-auto select-none"
        >
          {/* Progress Bar */}
          {!isEditMode && (
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-100 z-10">
                <div 
                    className={`h-full transition-all duration-700 ease-out`}
                    style={{ 
                        width: `${(Object.keys(placements).length / parts.length) * 100}%`,
                        backgroundColor: getSystemColor(1)
                    }}
                />
              </div>
          )}

          {feedback && (
            <div className={`absolute top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-2 rounded-full shadow-lg font-bold text-sm animate-[bounce_0.5s_infinite] ${
              feedback.type === 'success' 
                ? 'bg-green-100 text-green-700 border border-green-200' 
                : 'bg-red-100 text-red-700 border border-red-200'
            }`}>
              {feedback.message}
            </div>
          )}

          {/* Edit Mode Info */}
          {isEditMode && (
            <div className="absolute top-0 left-0 right-0 p-2 bg-orange-50/90 backdrop-blur-sm text-orange-800 text-center text-xs font-medium z-30 border-b border-orange-100">
                {draggedCoords ? (
                    <span>X: {draggedCoords.x}% | Y: {draggedCoords.y}%</span>
                ) : (
                    <span>Drag the numbered dots to reposition</span>
                )}
            </div>
          )}

          {/* SVG / Image */}
          <div className="w-full h-full relative touch-none">
             {customImage ? (
               <img 
                src={customImage} 
                alt="Diagram" 
                className="w-full h-full object-contain bg-slate-50"
              />
             ) : (
               <div className="relative w-full h-full bg-slate-50">
                   {activeSystem === 'digestive' && (
                       <svg viewBox="0 0 400 600" className="w-full h-full opacity-100 pointer-events-none">
                            <defs>
                                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                                <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.1"/>
                                </filter>
                            </defs>
                            <path d="M 120 600 L 120 350 Q 90 350 80 250 Q 70 150 130 150 L 130 100 Q 130 20 200 20 Q 270 20 270 100 L 270 150 Q 330 150 320 250 Q 310 350 280 350 L 280 600" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" />
                            <path d="M 200 90 L 200 250" fill="none" stroke="#fca5a5" strokeWidth="12" strokeLinecap="round" />
                            <path d="M 200 240 C 240 240 260 280 240 320 C 220 350 180 340 190 290" fill="#f87171" stroke="#b91c1c" strokeWidth="2" filter="url(#shadow)"/>
                            <path d="M 190 240 L 140 240 C 110 240 110 300 160 300 L 190 280 Z" fill="#7f1d1d" stroke="#450a0a" strokeWidth="2" filter="url(#shadow)"/>
                            <ellipse cx="170" cy="290" rx="8" ry="12" fill="#166534" />
                            <path d="M 210 310 C 230 310 250 300 260 310 C 250 330 220 330 210 320" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
                            <ellipse cx="270" cy="270" rx="15" ry="20" fill="#7f1d1d" opacity="0.8" />
                            <path d="M 240 450 L 240 360 C 240 340 160 340 160 360 L 160 480 C 160 500 180 500 190 490" fill="none" stroke="#ec4899" strokeWidth="25" strokeLinecap="round" strokeLinejoin="round" filter="url(#shadow)"/>
                            <path d="M 190 370 Q 220 380 190 400 Q 160 420 190 440 Q 220 460 200 480" fill="none" stroke="#f9a8d4" strokeWidth="18" strokeLinecap="round" filter="url(#shadow)"/>
                            <path d="M 200 490 L 200 530" fill="none" stroke="#ec4899" strokeWidth="15" />
                            <path d="M 150 470 L 150 490" fill="none" stroke="#ec4899" strokeWidth="8" strokeLinecap="round" />
                            <path d="M 190 70 Q 200 60 210 70 Q 210 90 190 90 Z" fill="#ef4444" opacity="0.5" />
                       </svg>
                   )}
                   {activeSystem === 'respiratory' && (
                       <svg viewBox="0 0 400 600" className="w-full h-full opacity-100 pointer-events-none">
                            <defs>
                                <filter id="shadow-resp" x="-20%" y="-20%" width="140%" height="140%">
                                <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.1"/>
                                </filter>
                            </defs>
                            <path d="M 120 600 L 120 350 Q 90 350 80 250 Q 70 150 130 150 L 130 100 Q 130 20 200 20 Q 270 20 270 100 L 270 150 Q 330 150 320 250 Q 310 350 280 350 L 280 600" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" />
                            <path d="M 190 70 Q 200 60 210 70 Q 210 90 190 90 Z" fill="#fca5a5" opacity="0.5" />
                            <path d="M 200 150 L 200 280" stroke="#cbd5e1" strokeWidth="20" strokeLinecap="round" />
                            <path d="M 200 160 L 200 270" stroke="#e2e8f0" strokeWidth="16" strokeDasharray="4 6" strokeLinecap="round" />
                            <path d="M 200 280 C 150 280 100 300 100 400 C 100 500 180 520 190 450 Z" fill="#fda4af" stroke="#f43f5e" strokeWidth="3" filter="url(#shadow-resp)" />
                            <path d="M 200 280 C 250 280 300 300 300 400 C 300 500 220 520 210 450 Z" fill="#fda4af" stroke="#f43f5e" strokeWidth="3" filter="url(#shadow-resp)" />
                            <path d="M 200 280 L 170 330" stroke="#e2e8f0" strokeWidth="6" strokeLinecap="round" opacity="0.5" />
                            <path d="M 200 280 L 230 330" stroke="#e2e8f0" strokeWidth="6" strokeLinecap="round" opacity="0.5" />
                            <path d="M 100 420 Q 200 550 300 420" fill="none" stroke="#be123c" strokeWidth="4" strokeLinecap="round" strokeDasharray="10 5" opacity="0.6" />
                       </svg>
                   )}
                   {activeSystem === 'heart' && (
                        <svg viewBox="0 0 400 600" className="w-full h-full opacity-100 pointer-events-none">
                            <defs>
                                <linearGradient id="gradRed" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style={{stopColor:'#fca5a5', stopOpacity:1}} />
                                    <stop offset="100%" style={{stopColor:'#f87171', stopOpacity:1}} />
                                </linearGradient>
                                <linearGradient id="gradBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style={{stopColor:'#93c5fd', stopOpacity:1}} />
                                    <stop offset="100%" style={{stopColor:'#60a5fa', stopOpacity:1}} />
                                </linearGradient>
                                <filter id="heart-shadow" x="-20%" y="-20%" width="140%" height="140%">
                                    <feDropShadow dx="3" dy="3" stdDeviation="4" floodOpacity="0.15"/>
                                </filter>
                            </defs>
                            <path d="M 140 130 L 140 220" stroke="url(#gradBlue)" strokeWidth="35" strokeLinecap="round" filter="url(#heart-shadow)" />
                            <path d="M 190 220 C 190 120 250 100 280 200" fill="none" stroke="url(#gradRed)" strokeWidth="35" strokeLinecap="round" filter="url(#heart-shadow)" />
                            <path d="M 200 240 L 260 160" stroke="url(#gradBlue)" strokeWidth="25" strokeLinecap="round" filter="url(#heart-shadow)" />
                            <path d="M 130 220 Q 100 270 140 320 L 180 300 Z" fill="url(#gradBlue)" stroke="#3b82f6" strokeWidth="2" filter="url(#heart-shadow)"/>
                            <path d="M 240 220 Q 290 240 280 290 L 240 280 Z" fill="url(#gradRed)" stroke="#ef4444" strokeWidth="2" filter="url(#heart-shadow)"/>
                            <path d="M 140 320 Q 120 400 190 450 L 200 320 Z" fill="url(#gradBlue)" stroke="#3b82f6" strokeWidth="2" filter="url(#heart-shadow)"/>
                            <path d="M 280 290 Q 320 380 230 460 L 200 320 Z" fill="url(#gradRed)" stroke="#ef4444" strokeWidth="2" filter="url(#heart-shadow)"/>
                            <path d="M 140 400 L 140 480" stroke="url(#gradBlue)" strokeWidth="25" strokeLinecap="round" opacity="0.8" />
                            <path d="M 190 450 Q 230 460 230 460" stroke="#fecaca" strokeWidth="2" fill="none" />
                        </svg>
                   )}
                   {activeSystem === 'excretory' && (
                       <svg viewBox="0 0 400 600" className="w-full h-full opacity-100 pointer-events-none">
                            <defs>
                                <filter id="shadow-excretory" x="-20%" y="-20%" width="140%" height="140%">
                                <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.1"/>
                                </filter>
                                <linearGradient id="gradKidney" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style={{stopColor:'#b45309', stopOpacity:1}} />
                                    <stop offset="100%" style={{stopColor:'#78350f', stopOpacity:1}} />
                                </linearGradient>
                            </defs>
                            <path d="M 120 600 L 120 350 Q 90 350 80 250 Q 70 150 130 150 L 130 100 Q 130 20 200 20 Q 270 20 270 100 L 270 150 Q 330 150 320 250 Q 310 350 280 350 L 280 600" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" />
                            <path d="M 185 100 L 185 600" stroke="#93c5fd" strokeWidth="20" opacity="0.4" />
                            <path d="M 215 100 L 215 600" stroke="#fca5a5" strokeWidth="20" opacity="0.4" />
                            <path d="M 230 240 C 290 230 290 310 230 310 C 220 280 220 260 230 240 Z" fill="url(#gradKidney)" stroke="#451a03" strokeWidth="2" filter="url(#shadow-excretory)" />
                            <path d="M 170 260 C 110 250 110 330 170 330 C 180 300 180 280 170 260 Z" fill="url(#gradKidney)" stroke="#451a03" strokeWidth="2" filter="url(#shadow-excretory)" />
                            <path d="M 240 290 Q 250 400 210 500" fill="none" stroke="#fcd34d" strokeWidth="4" strokeLinecap="round" />
                            <path d="M 160 310 Q 150 400 190 500" fill="none" stroke="#fcd34d" strokeWidth="4" strokeLinecap="round" />
                            <path d="M 170 500 Q 200 480 230 500 Q 230 560 170 560 Q 170 500 170 500 Z" fill="#fbbf24" stroke="#d97706" strokeWidth="2" filter="url(#shadow-excretory)" />
                            <path d="M 215 270 L 230 275" stroke="#ef4444" strokeWidth="6" strokeLinecap="round" />
                            <path d="M 185 290 L 170 295" stroke="#3b82f6" strokeWidth="6" strokeLinecap="round" />
                            <path d="M 200 560 L 200 580" stroke="#fbbf24" strokeWidth="6" strokeLinecap="round" />
                       </svg>
                   )}
                   {activeSystem === 'kidney' && (
                       <svg viewBox="0 0 400 600" className="w-full h-full opacity-100 pointer-events-none">
                            <defs>
                                <filter id="shadow-kidney" x="-20%" y="-20%" width="140%" height="140%">
                                    <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.1"/>
                                </filter>
                                <linearGradient id="gradBean" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style={{stopColor:'#fbbf24', stopOpacity:1}} />
                                    <stop offset="100%" style={{stopColor:'#d97706', stopOpacity:1}} />
                                </linearGradient>
                            </defs>
                            
                            {/* Main Kidney Bean Shape (Outer Capsule/Cortex) */}
                            <path d="M 120 150 Q 60 150 60 300 Q 60 450 120 450 Q 180 450 200 400 L 200 350 L 200 250 L 200 200 Q 180 150 120 150" 
                                fill="#fcd34d" stroke="#b45309" strokeWidth="3" filter="url(#shadow-kidney)" />
                            
                            {/* Renal Medulla (Pyramids) - Triangles */}
                            <path d="M 80 200 L 110 180 L 130 210 Z" fill="#92400e" opacity="0.8" />
                            <path d="M 70 250 L 100 240 L 120 260 Z" fill="#92400e" opacity="0.8" />
                            <path d="M 70 350 L 100 360 L 120 340 Z" fill="#92400e" opacity="0.8" />
                            <path d="M 80 400 L 110 420 L 130 390 Z" fill="#92400e" opacity="0.8" />
                            
                            {/* Renal Pelvis */}
                            <path d="M 200 280 L 150 300 L 200 320" fill="#fef3c7" stroke="#fbbf24" strokeWidth="2" />
                            
                            {/* Ureter */}
                            <path d="M 200 300 L 200 500" stroke="#fef3c7" strokeWidth="15" strokeLinecap="round" />
                            <path d="M 200 300 L 200 500" stroke="#fbbf24" strokeWidth="15" strokeLinecap="round" opacity="0.3" />
                            
                            {/* Renal Artery */}
                            <path d="M 280 200 L 220 250 L 160 260" fill="none" stroke="#ef4444" strokeWidth="12" strokeLinecap="round" />
                            
                            {/* Renal Vein */}
                            <path d="M 280 240 L 220 280 L 160 290" fill="none" stroke="#3b82f6" strokeWidth="12" strokeLinecap="round" />
                            
                            <text x="100" y="580" className="text-sm fill-slate-400 font-sans" textAnchor="middle">Cross Section</text>
                       </svg>
                   )}
               </div>
             )}

             {/* Drop Zones */}
             {parts.map((part, index) => {
                 const isCompleted = isPlaced(part.id);
                 return (
                    <div
                        key={part.id}
                        className={`absolute w-8 h-8 -ml-4 -mt-4 rounded-full border-2 flex items-center justify-center transition-all duration-300 z-20 
                        ${isCompleted 
                            ? 'bg-green-500 border-green-600 scale-100 shadow-md' 
                            : (selectedLabel && !isEditMode)
                                ? 'bg-white/80 border-dashed border-slate-400 animate-pulse cursor-pointer hover:scale-125 hover:bg-yellow-100 hover:border-yellow-400'
                                : 'bg-slate-200/50 border-slate-300 scale-75'
                        }
                        ${isEditMode ? 'cursor-move hover:bg-orange-200 hover:border-orange-500 hover:scale-110' : ''}
                        `}
                        style={{ 
                            left: `${part.x}%`, 
                            top: `${part.y}%` 
                        }}
                        onClick={() => !isEditMode && handleDropZoneClick(part.id)}
                        onMouseDown={(e) => handleStartDrag(e, part.id)}
                        onTouchStart={(e) => handleStartDrag(e, part.id)}
                    >
                        {isCompleted ? (
                            <Check size={16} className="text-white" />
                        ) : (
                            <span className="text-xs font-bold text-slate-500">{index + 1}</span>
                        )}
                    </div>
                 );
             })}
          </div>
        </div>

        {/* Labels / Interactions Area */}
        <div className="flex-1 w-full max-w-lg flex flex-col gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 lg:p-6">
            <h2 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
                Part Names
                <span className="text-xs font-normal text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
                    {Object.keys(placements).length} / {parts.length}
                </span>
            </h2>

            {/* Labels Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {shuffledLabels.map((part) => (
                <button
                  key={part.id}
                  onClick={() => handleLabelClick(part)}
                  className={`
                    p-3 rounded-xl text-left text-sm font-semibold transition-all duration-200 border-2 shadow-sm
                    ${selectedLabel?.id === part.id
                      ? `bg-${activeSystem === 'heart' ? 'red' : activeSystem === 'digestive' ? 'blue' : activeSystem === 'respiratory' ? 'cyan' : activeSystem === 'excretory' ? 'violet' : 'amber'}-50 
                         border-${activeSystem === 'heart' ? 'red' : activeSystem === 'digestive' ? 'blue' : activeSystem === 'respiratory' ? 'cyan' : activeSystem === 'excretory' ? 'violet' : 'amber'}-500 
                         text-${activeSystem === 'heart' ? 'red' : activeSystem === 'digestive' ? 'blue' : activeSystem === 'respiratory' ? 'cyan' : activeSystem === 'excretory' ? 'violet' : 'amber'}-700 scale-105`
                      : 'bg-white border-slate-100 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                    }
                  `}
                >
                  {part.label}
                </button>
              ))}
            </div>

            {/* Completed List */}
            {Object.keys(placements).length > 0 && (
                <div className="border-t border-slate-100 pt-4">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Identified</h3>
                    <div className="flex flex-wrap gap-2">
                        {Object.values(placements).map(part => (
                            <button 
                                key={part.id} 
                                onClick={() => handleLabelClick(part)}
                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border animate-[fadeIn_0.3s_ease-out] transition-colors
                                ${selectedLabel?.id === part.id 
                                    ? 'bg-blue-100 text-blue-800 border-blue-300' 
                                    : 'bg-green-50 text-green-700 border-green-100 hover:bg-green-100'
                                }`}
                            >
                                <Check size={12} /> {part.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
            
            {showSuccess && (
                <div className="mt-6 p-6 bg-green-50 rounded-xl border border-green-100 text-center animate-[slideUp_0.5s_ease-out]">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 text-4xl">
                        🏆
                    </div>
                    <h3 className="text-xl font-bold text-green-800 mb-1">Excellent Work!</h3>
                    <p className="text-green-600 text-sm mb-4">You have identified all parts correctly.</p>
                    <button 
                        onClick={() => resetGame(parts)}
                        className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold shadow-sm shadow-green-200 transition-colors"
                    >
                        Play Again
                    </button>
                </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function AnatomyPuzzlePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AnatomyPuzzle />
        </Suspense>
    )
}

    