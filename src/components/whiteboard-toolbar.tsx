'use client';
import React from 'react';
import { Pen, Eraser, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { type Brush } from './drawing-canvas';

const colors = ['#000000', '#EF4444', '#3B82F6', '#22C55E', '#F97316', '#A855F7'];

interface WhiteboardToolbarProps {
  brush: Brush;
  setBrush: React.Dispatch<React.SetStateAction<Brush>>;
}

export const WhiteboardToolbar: React.FC<WhiteboardToolbarProps> = ({ brush, setBrush }) => {

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-card text-card-foreground p-2 rounded-lg shadow-2xl border flex items-center gap-2">
      <Button
        variant={brush.type === 'pen' ? 'secondary' : 'ghost'}
        size="icon"
        onClick={() => setBrush(b => ({ ...b, type: 'pen' }))}
      >
        <Pen className="size-5" />
      </Button>
      <Button
        variant={brush.type === 'eraser' ? 'secondary' : 'ghost'}
        size="icon"
        onClick={() => setBrush(b => ({ ...b, type: 'eraser' }))}
      >
        <Eraser className="size-5" />
      </Button>

      <div className="w-px h-8 bg-border mx-2"></div>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon">
            <div className="w-5 h-5 rounded-full border border-muted-foreground" style={{ backgroundColor: brush.color }}></div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2">
          <div className="grid grid-cols-3 gap-2">
            {colors.map(color => (
              <button
                key={color}
                onClick={() => setBrush(b => ({ ...b, color }))}
                className={cn(
                    "w-8 h-8 rounded-full border-2 transition-transform transform hover:scale-110",
                    brush.color === color ? 'border-primary' : 'border-transparent'
                )}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </PopoverContent>
      </Popover>

      <div className="w-px h-8 bg-border mx-2"></div>

       <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon">
            <Circle className="size-5" style={{ transform: `scale(${brush.size / 10})` }}/>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-40 p-4">
            <Slider
              min={1}
              max={20}
              step={1}
              value={[brush.size]}
              onValueChange={(value) => setBrush(b => ({ ...b, size: value[0] }))}
            />
        </PopoverContent>
      </Popover>

    </div>
  );
};
