
'use client';

import { useState, useMemo, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { DrawingCanvas, type DrawingCanvasRef } from "@/components/drawing-canvas";
import { ChevronLeft, ChevronRight, Sparkles, Eraser } from 'lucide-react';
import { cn } from '@/lib/utils';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const colors = [
  { name: 'Red', value: '#ef4444' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Green', value: '#22c55e' },
  { name: 'Yellow', value: '#f59e0b' },
  { name: 'White', value: '#ffffff' },
];

export default function AlphabetPracticePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [drawingColor, setDrawingColor] = useState(colors[0].value);
  const canvasRef = useRef<DrawingCanvasRef>(null);

  const currentLetter = useMemo(() => alphabet[currentIndex], [currentIndex]);

  const clearCanvas = () => {
    canvasRef.current?.clear();
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : alphabet.length - 1));
    clearCanvas();
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < alphabet.length - 1 ? prevIndex - 1 : 0));
    clearCanvas();
  };

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 to-purple-200 dark:from-blue-900 dark:to-purple-900 overflow-hidden">
      
      {/* Background shapes for fun */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-20 right-20 w-48 h-48 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-10 left-20 w-24 h-24 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <DrawingCanvas ref={canvasRef} lineColor={drawingColor} />

      {/* The Letter Display */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span 
          className="text-[35rem] md:text-[40rem] font-black text-white/20 dark:text-black/20 select-none"
          style={{
            WebkitTextStroke: '8px hsla(0, 0%, 100%, 0.5)',
            textShadow: '10px 10px 0px rgba(0,0,0,0.1)'
          }}
        >
          {currentLetter}
        </span>
      </div>

      {/* Toolbar */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-2 rounded-2xl shadow-lg flex items-center gap-2">
        {colors.map(color => (
          <button
            key={color.name}
            onClick={() => setDrawingColor(color.value)}
            className={cn(
              "w-10 h-10 rounded-full border-2 transition-transform duration-150",
              drawingColor === color.value ? 'border-gray-900 dark:border-white scale-110' : 'border-transparent'
            )}
            style={{ backgroundColor: color.value }}
            aria-label={`Select ${color.name} color`}
          />
        ))}
        <button onClick={clearCanvas} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" aria-label="Clear drawing">
            <Eraser className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </button>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
        <Button onClick={handlePrevious} size="lg" className="rounded-full h-20 w-20 p-0 shadow-lg bg-white/50 hover:bg-white/80 text-gray-800 backdrop-blur-md">
          <ChevronLeft className="h-10 w-10" />
          <span className="sr-only">Previous Letter</span>
        </Button>
        <div className="text-4xl font-bold text-white bg-black/20 px-6 py-2 rounded-full shadow-lg select-none">
          {currentLetter}
        </div>
        <Button onClick={handleNext} size="lg" className="rounded-full h-20 w-20 p-0 shadow-lg bg-white/50 hover:bg-white/80 text-gray-800 backdrop-blur-md">
          <ChevronRight className="h-10 w-10" />
          <span className="sr-only">Next Letter</span>
        </Button>
      </div>
      
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
