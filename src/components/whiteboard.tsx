'use client';

import React, { useState } from 'react';
import { DrawingCanvas, type Brush } from '@/components/drawing-canvas';
import { WhiteboardToolbar } from '@/components/whiteboard-toolbar';

export const Whiteboard: React.FC = () => {
  const [brush, setBrush] = useState<Brush>({
    color: '#000000',
    size: 5,
    type: 'pen',
  });

  return (
    <div className="relative w-full h-[500px] md:h-full rounded-lg overflow-hidden border">
      <DrawingCanvas brush={brush} />
      <WhiteboardToolbar brush={brush} setBrush={setBrush} />
    </div>
  );
};
