
'use client';

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { DrawingCanvas } from '@/components/drawing-canvas';
import { Button } from '@/components/ui/button';
import { X, Eraser } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const numbers = Array.from({ length: 101 }, (_, i) => i);

export default function NumberPage() {
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [canvasKey, setCanvasKey] = useState(0);

  const handleNumberClick = (num: number) => {
    setSelectedNumber(num);
    setIsDrawing(true);
    setCanvasKey(prev => prev + 1); // Reset canvas
  };

  const closeDrawing = () => {
    setIsDrawing(false);
    setSelectedNumber(null);
  };
  
  const forceClearCanvas = () => {
      setCanvasKey(prevKey => prevKey + 1);
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      {isDrawing && selectedNumber !== null && (
        <div className="fixed inset-0 z-50 bg-background/95 flex flex-col items-center justify-center p-4 animate-in fade-in-0 duration-500">
          <div className="relative w-full h-full max-w-4xl max-h-[80vh] flex items-center justify-center">
            <span className="absolute text-foreground/5 text-[60vh] font-bold select-none z-0 font-headline">
              {selectedNumber}
            </span>
            <DrawingCanvas key={canvasKey} onClose={closeDrawing} />
             <div className="absolute top-4 right-14 z-[60]">
                <Button onClick={forceClearCanvas} variant="secondary" size="icon" className="shadow-lg">
                    <Eraser className="h-5 w-5" />
                    <span className="sr-only">Clear Drawing</span>
                </Button>
            </div>
          </div>
        </div>
      )}
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-bold font-headline text-primary">Number Fun</h1>
        <p className="text-muted-foreground md:text-xl">Click on a number to practice drawing it!</p>
      </div>
      
      <ScrollArea className="h-[60vh] max-w-4xl mx-auto border rounded-lg p-4">
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
          {numbers.map((num) => (
            <Card 
              key={num}
              onClick={() => handleNumberClick(num)}
              className="aspect-square flex items-center justify-center bg-card hover:bg-primary hover:text-primary-foreground transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 cursor-pointer group"
            >
              <CardContent className="p-0">
                <span className="text-4xl md:text-5xl font-bold font-headline transition-transform group-hover:scale-110">
                  {num}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
