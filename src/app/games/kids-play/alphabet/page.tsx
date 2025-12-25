
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
    setCurrentIndex((prevIndex) => (prevIndex < alphabet.length - 1 ? prevIndex + 1 : 0));
    clearCanvas();
  };

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 to-purple-200 dark:from-blue-900 dark:to-purple-900 overflow-hidden">
      
      <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-20 right-20 w-48 h-48 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-10 left-20 w-24 h-24 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <span 
          className="text-[40rem] md:text-[45rem] font-black text-transparent select-none"
          style={{
            fontSize: 'min(90vw, 45rem)',
            WebkitTextStroke: '8px hsla(0, 0%, 100%, 0.5)',
            textStroke: '8px hsla(0, 0%, 100%, 0.5)',
            textShadow: '10px 10px 0px rgba(0,0,0,0.1)',
            paintOrder: 'stroke fill',
            strokeDasharray: '40, 20',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
          }}
        >
          {currentLetter}
        </span>
      </div>

      <DrawingCanvas ref={canvasRef} lineColor={drawingColor} />

      {/* Toolbar top-right */}
      <div className="absolute top-5 right-5 z-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-2 rounded-2xl shadow-lg flex flex-col items-center gap-2">
        {colors.map(color => (
          <button
            key={color.name}
            onClick={() => setDrawingColor(color.value)}
            className={cn(
              "w-8 h-8 md:w-10 md:h-10 rounded-full border-2 transition-transform duration-150",
              drawingColor === color.value ? 'border-gray-900 dark:border-white scale-110' : 'border-transparent'
            )}
            style={{ backgroundColor: color.value }}
            aria-label={`Select ${color.name} color`}
          />
        ))}
        <button onClick={clearCanvas} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" aria-label="Clear drawing">
            <Eraser className="w-5 h-5 md:w-6 md:h-6 text-gray-700 dark:text-gray-300" />
        </button>
      </div>

      {/* Letter Indicator top-left */}
       <div className="absolute top-5 left-5 z-20 text-4xl font-bold text-white bg-black/20 px-6 py-2 rounded-full shadow-lg select-none">
          {currentLetter}
        </div>

      {/* Navigation Controls left and right */}
      <Button onClick={handlePrevious} size="lg" className="absolute left-5 top-1/2 -translate-y-1/2 z-20 rounded-full h-16 w-16 md:h-20 md:w-20 p-0 shadow-lg bg-white/50 hover:bg-white/80 text-gray-800 backdrop-blur-md">
        <ChevronLeft className="h-8 w-8 md:h-10 md:w-10" />
        <span className="sr-only">Previous Letter</span>
      </Button>
      <Button onClick={handleNext} size="lg" className="absolute right-5 top-1/2 -translate-y-1/2 z-20 rounded-full h-16 w-16 md:h-20 md:w-20 p-0 shadow-lg bg-white/50 hover:bg-white/80 text-gray-800 backdrop-blur-md">
        <ChevronRight className="h-8 w-8 md:h-10 md:w-10" />
        <span className="sr-only">Next Letter</span>
      </Button>
      
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
