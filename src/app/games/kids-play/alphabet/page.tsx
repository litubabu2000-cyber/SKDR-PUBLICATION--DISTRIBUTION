
'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { DrawingCanvas } from '@/components/drawing-canvas';
import { ChevronLeft, ChevronRight, Eraser } from 'lucide-react';

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

export default function AlphabetPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [key, setKey] = useState(0); // Used to force re-render of DrawingCanvas

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % alphabet.length);
    clearAndToggleDrawing();
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + alphabet.length) % alphabet.length);
    clearAndToggleDrawing();
  };
  
  const clearAndToggleDrawing = () => {
      setIsDrawing(false); // Turn off drawing
      setTimeout(() => setIsDrawing(true), 50); // Turn it back on after a short delay
  }

  // A simple way to force the canvas to clear is to unmount and remount it.
  // We can do this by changing its key.
  const forceClearCanvas = () => {
      setKey(prevKey => prevKey + 1);
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6 h-screen flex flex-col">
      <div className="space-y-4 text-center mb-8">
        <h1 className="text-3xl md:text-5xl font-bold font-headline text-primary">Alphabet Practice</h1>
        <p className="text-muted-foreground md:text-xl">Trace the letter!</p>
      </div>

      <div className="relative flex-1 w-full max-w-4xl mx-auto flex items-center justify-center border-2 border-dashed rounded-xl bg-card/50">
        {/* The giant letter in the background */}
        <span className="absolute text-foreground/5 text-[60vh] font-bold select-none z-0 font-headline">
          {alphabet[currentIndex]}
        </span>
        
        {/* Drawing Canvas */}
        <DrawingCanvas key={key} onClose={() => {}} />

        {/* Drawing Controls */}
        <div className="absolute top-4 right-4 z-50">
             <Button onClick={forceClearCanvas} variant="destructive" size="icon" className="shadow-lg">
                <Eraser className="h-5 w-5" />
                <span className="sr-only">Clear Drawing</span>
            </Button>
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-8 max-w-4xl mx-auto w-full">
        <Button onClick={handlePrevious}>
          <ChevronLeft className="mr-2" /> Previous Letter
        </Button>
        <div className="text-2xl font-bold font-headline">
            {currentIndex + 1} / {alphabet.length}
        </div>
        <Button onClick={handleNext}>
          Next Letter <ChevronRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
}
