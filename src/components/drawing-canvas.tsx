'use client';

import React, { useRef, useEffect, useState } from 'react';

export interface Brush {
  color: string;
  size: number;
  type: 'pen' | 'eraser';
}

interface DrawingCanvasProps {
  brush: Brush;
}

export const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ brush }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement!.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      const context = canvas.getContext('2d');
      if (context) {
        context.scale(dpr, dpr);
        contextRef.current = context;
        // Re-apply styles after resize
        if (contextRef.current) {
          contextRef.current.lineCap = 'round';
          contextRef.current.lineJoin = 'round';
        }
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = brush.color;
      contextRef.current.lineWidth = brush.size;
      contextRef.current.globalCompositeOperation = brush.type === 'eraser' ? 'destination-out' : 'source-over';
    }
  }, [brush]);

  const getEventCoordinates = (event: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    if ('touches' in event.nativeEvent) {
      if (event.nativeEvent.touches.length === 0) return null;
      return {
        x: event.nativeEvent.touches[0].clientX - rect.left,
        y: event.nativeEvent.touches[0].clientY - rect.top,
      };
    }
    return {
      x: (event as React.MouseEvent).nativeEvent.offsetX,
      y: (event as React.MouseEvent).nativeEvent.offsetY,
    };
  };

  const startDrawing = (event: React.MouseEvent | React.TouchEvent) => {
    const coords = getEventCoordinates(event);
    if (!coords || !contextRef.current) return;
    
    contextRef.current.beginPath();
    contextRef.current.moveTo(coords.x, coords.y);
    setIsDrawing(true);
    
    // Draw a dot for single clicks/taps
    contextRef.current.lineTo(coords.x, coords.y);
    contextRef.current.stroke();
  };

  const finishDrawing = () => {
    if (!contextRef.current) return;
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const coords = getEventCoordinates(event);
    if (!coords || !contextRef.current) return;

    contextRef.current.lineTo(coords.x, coords.y);
    contextRef.current.stroke();
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      onTouchStart={startDrawing}
      onTouchEnd={finishDrawing}
      onTouchMove={draw}
      onMouseLeave={finishDrawing}
      className="w-full h-full bg-white dark:bg-slate-900 cursor-crosshair touch-none"
    />
  );
};
