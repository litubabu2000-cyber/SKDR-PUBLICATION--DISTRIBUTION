'use client';

import React, { useState } from 'react';
import { DrawingCanvas } from '@/components/drawing-canvas';
import { WhiteboardToolbar } from '@/components/whiteboard-toolbar';
import { type Brush } from '@/components/drawing-canvas';

export default function GeminiBoardPage() {
  const [brush, setBrush] = useState<Brush>({
    color: '#000000',
    size: 5,
    type: 'pen',
  });

  return (
    <div className="w-full h-screen bg-slate-100 dark:bg-slate-800 flex items-center justify-center relative overflow-hidden">
      <DrawingCanvas brush={brush} />
      <WhiteboardToolbar brush={brush} setBrush={setBrush} />
    </div>
  );
}
