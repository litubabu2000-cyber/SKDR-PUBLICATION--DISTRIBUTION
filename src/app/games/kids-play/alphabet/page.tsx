
'use client';

import { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { DrawingCanvas } from "@/components/drawing-canvas";
import { ChevronLeft, ChevronRight } from 'lucide-react';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function AlphabetPracticePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canvasKey, setCanvasKey] = useState(0); // Key to force remount

  const currentLetter = useMemo(() => alphabet[currentIndex], [currentIndex]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : alphabet.length - 1));
    setCanvasKey(prevKey => prevKey + 1); // Change key to remount canvas
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < alphabet.length - 1 ? prevIndex + 1 : 0));
    setCanvasKey(prevKey => prevKey + 1); // Change key to remount canvas
  };

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 overflow-hidden">
      
      {/* The Drawing Canvas - it's on top but transparent */}
      <DrawingCanvas key={canvasKey} onClose={() => {}} />

      {/* The Letter Display (behind the canvas) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-9xl md:text-[30rem] font-bold text-gray-200 dark:text-gray-700 select-none">
          {currentLetter}
        </span>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 z-10">
        <Button onClick={handlePrevious} size="lg" className="rounded-full h-16 w-16 p-0 shadow-lg">
          <ChevronLeft className="h-8 w-8" />
          <span className="sr-only">Previous Letter</span>
        </Button>
        <div className="text-2xl font-bold text-gray-500 dark:text-gray-400 w-24 text-center">
          Letter {currentLetter}
        </div>
        <Button onClick={handleNext} size="lg" className="rounded-full h-16 w-16 p-0 shadow-lg">
          <ChevronRight className="h-8 w-8" />
          <span className="sr-only">Next Letter</span>
        </Button>
      </div>
    </div>
  );
}
