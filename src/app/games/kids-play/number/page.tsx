
'use client';

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { DrawingCanvas } from '@/components/drawing-canvas';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const numbers = Array.from({ length: 101 }, (_, i) => i);

export default function NumberPage() {
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const handleNumberClick = (num: number) => {
    setSelectedNumber(num);
    setIsDrawing(true);
  };

  const closeDrawing = () => {
    setIsDrawing(false);
    setSelectedNumber(null);
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      {isDrawing && selectedNumber !== null && (
        <div className="fixed inset-0 z-50 bg-black/80 flex flex-col items-center justify-center p-4">
          <div className="relative w-full h-full max-w-4xl max-h-[80vh] flex items-center justify-center">
            <span className="absolute text-background/10 text-[60vh] font-bold select-none z-0">
              {selectedNumber}
            </span>
            <DrawingCanvas onClose={closeDrawing} />
          </div>
           <Button onClick={closeDrawing} className="mt-4" variant="secondary">
              <X className="mr-2" /> Close
            </Button>
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
