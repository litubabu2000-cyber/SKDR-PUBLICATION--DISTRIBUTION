'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Eraser, Pen, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useRouter } from 'next/navigation';

const Whiteboard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Adjust for device pixel ratio for sharper drawing
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const context = canvas.getContext('2d');
    if (!context) return;
    
    context.scale(dpr, dpr);
    context.lineCap = 'round';
    context.strokeStyle = '#000000';
    context.lineWidth = 2;
    contextRef.current = context;

    const handleResize = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const savedDrawing = contextRef.current?.getImageData(0, 0, canvas.width, canvas.height);
        
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        
        const context = canvas.getContext('2d');
        if (!context) return;
        
        context.scale(dpr, dpr);
        context.lineCap = 'round';
        context.strokeStyle = '#000000';
        context.lineWidth = 2;
        contextRef.current = context;
        if(savedDrawing) {
            context.putImageData(savedDrawing, 0, 0);
        }
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);

  }, []);

  const getEventCoordinates = (event: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    if ('touches' in event.nativeEvent) {
      return {
        x: event.nativeEvent.touches[0].clientX - rect.left,
        y: event.nativeEvent.touches[0].clientY - rect.top,
      };
    }
    return {
      x: event.nativeEvent.offsetX,
      y: event.nativeEvent.offsetY,
    };
  };

  const startDrawing = (event: React.MouseEvent | React.TouchEvent) => {
    if ('touches' in event.nativeEvent) {
      event.preventDefault();
    }
    const coords = getEventCoordinates(event);
    if (!coords || !contextRef.current) return;
    
    contextRef.current.beginPath();
    contextRef.current.moveTo(coords.x, coords.y);
    setIsDrawing(true);
  };

  const finishDrawing = (event: React.MouseEvent | React.TouchEvent) => {
    if ('touches' in event.nativeEvent) {
        event.preventDefault();
    }
    if (!contextRef.current) return;
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = (event: React.MouseEvent | React.TouchEvent) => {
    if ('touches' in event.nativeEvent) {
        event.preventDefault();
    }
    if (!isDrawing) return;
    const coords = getEventCoordinates(event);
    if (!coords || !contextRef.current) return;

    contextRef.current.lineTo(coords.x, coords.y);
    contextRef.current.stroke();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (canvas && context) {
      context.clearRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1));
    }
  };

  return (
    <Card className="w-full h-full flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2"><Pen className="size-5" /> Whiteboard</CardTitle>
            <div className="flex gap-2">
                 <Button variant="outline" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="size-5" />
                    <span className="sr-only">Go Back</span>
                </Button>
                <Button variant="outline" size="icon" onClick={clearCanvas}>
                    <Eraser className="size-5" />
                    <span className="sr-only">Clear Whiteboard</span>
                </Button>
            </div>
        </CardHeader>
        <CardContent className="flex-grow">
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseUp={finishDrawing}
              onMouseMove={draw}
              onTouchStart={startDrawing}
              onTouchEnd={finishDrawing}
              onTouchMove={draw}
              onMouseLeave={finishDrawing}
              className="w-full h-full bg-white border border-border rounded-md cursor-crosshair touch-none"
            />
        </CardContent>
    </Card>
  );
};

export { Whiteboard };
