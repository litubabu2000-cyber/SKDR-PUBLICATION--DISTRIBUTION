
'use client';

import React, { useRef, useEffect, useState, useImperativeHandle, forwardRef } from 'react';

type DrawingCanvasProps = {
  lineColor?: string;
  lineWidth?: number;
};

export type DrawingCanvasRef = {
  clear: () => void;
};

export const DrawingCanvas = forwardRef<DrawingCanvasRef, DrawingCanvasProps>(
  ({ lineColor = '#ffffff', lineWidth = 8 }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);

    // Expose a 'clear' function via the ref
    useImperativeHandle(ref, () => ({
      clear() {
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
          }
        }
      },
    }));

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const parent = document.body;
      if (!parent) return;

      const resizeCanvas = () => {
        const tempCtx = canvas.getContext('2d');
        const imageData = tempCtx?.getImageData(0, 0, canvas.width, canvas.height);
        
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        
        const newCtx = canvas.getContext('2d');
        if (newCtx) {
          if (imageData) {
            newCtx.putImageData(imageData, 0, 0);
          }
          newCtx.lineCap = 'round';
          newCtx.lineJoin = 'round';
          newCtx.strokeStyle = lineColor;
          newCtx.lineWidth = lineWidth;
        }
      };

      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
      return () => window.removeEventListener('resize', resizeCanvas);
    }, []);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth;
      }
    }, [lineColor, lineWidth]);

    const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return { x: 0, y: 0 };
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? (e as React.TouchEvent).touches[0].clientX : (e as React.MouseEvent).clientX;
      const clientY = 'touches' in e ? (e as React.TouchEvent).touches[0].clientY : (e as React.MouseEvent).clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };

    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const { x, y } = getCoordinates(e);
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
      const { x, y } = getCoordinates(e);
      ctx.lineTo(x, y);
      ctx.stroke();
    };

    const endDrawing = () => {
      setIsDrawing(false);
    };

    return (
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
        onMouseLeave={endDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={endDrawing}
        className="absolute inset-0 w-full h-full cursor-crosshair touch-none z-10"
      />
    );
  }
);

DrawingCanvas.displayName = 'DrawingCanvas';
