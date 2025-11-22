
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, RefreshCw, Trophy } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const ItemTypes = {
  LABEL: 'label',
};

const PARTS_DATA = [
    { id: 'mouth', label: 'Mouth (Oral Cavity)', x: '68.6', y: '26.4' },
    { id: 'tongue', label: 'Tongue', x: '64.0', y: '29.1' },
    { id: 'esophagus', label: 'Esophagus', x: '54.8', y: '39.3' },
    { id: 'liver', label: 'Liver', x: '44.8', y: '53.3' },
    { id: 'stomach', label: 'Stomach', x: '62.8', y: '55.7' },
    { id: 'gallbladder', label: 'Gallbladder', x: '48.8', y: '57.3' },
    { id: 'spleen', label: 'Spleen', x: '65.8', y: '59.6' },
    { id: 'pancreas', label: 'Pancreas', x: '50.6', y: '63.2' },
    { id: 'large-intestine', label: 'Large Intestine', x: '43.6', y: '72.3' },
    { id: 'small-intestine', label: 'Small Intestine', x: '56.8', y: '72.2' },
    { id: 'appendix', label: 'Appendix', x: '49.4', y: '81.2' },
    { id: 'rectum', label: 'Rectum', x: '56.2', y: '81.6' },
    { id: 'anus', label: 'Anus', x: '55.0', y: '86.3' },
];


interface LabelProps {
  id: string;
  label: string;
}

const DraggableLabel: React.FC<LabelProps> = ({ id, label }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.LABEL,
    item: { id, label },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={cn(
        'p-2 border rounded-md bg-secondary text-secondary-foreground cursor-grab touch-none select-none',
        isDragging && 'opacity-50'
      )}
    >
      {label}
    </div>
  );
};

interface DropTargetProps {
  id: string;
  onDrop: (id: string, item: { id: string; label: string; }) => void;
  placedLabel: { id: string; label: string; isCorrect: boolean | null } | null;
  x: string;
  y: string;
}

const DropTarget: React.FC<DropTargetProps> = ({ id, onDrop, placedLabel, x, y }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.LABEL,
    drop: (item: { id: string; label: string; }) => onDrop(id, item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }), [onDrop]);
    
  const getBackgroundColor = () => {
    if (placedLabel) {
      if (placedLabel.isCorrect === true) return 'bg-green-500/30 border-green-500';
      if (placedLabel.isCorrect === false) return 'bg-red-500/30 border-red-500';
    }
    if (isOver) return 'bg-primary/30';
    return 'bg-transparent';
  };

  return (
    <div
      ref={drop}
      className={cn(
        'absolute w-4 h-4 rounded-full border-2 border-primary/50 transform -translate-x-1/2 -translate-y-1/2 transition-colors duration-200',
        getBackgroundColor()
      )}
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      {placedLabel && (
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs bg-card text-card-foreground rounded-md px-2 py-1 shadow-lg">
           {placedLabel.label}
        </div>
      )}
    </div>
  );
};

const AlimentaryCanalPuzzle: React.FC = () => {
  const [parts, setParts] = useState(PARTS_DATA.map(p => ({...p, placed: false, placedLabel: null as {id: string, label: string} | null, isCorrect: null as boolean | null })));
  const [unplacedLabels, setUnplacedLabels] = useState(PARTS_DATA.map(p => ({ id: p.id, label: p.label })));
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleDrop = (targetId: string, item: { id: string; label: string }) => {
    setParts(prevParts => 
        prevParts.map(p => 
            p.id === targetId 
            ? { ...p, placed: true, placedLabel: {id: item.id, label: item.label}, isCorrect: null } 
            : p
        )
    );
    setUnplacedLabels(prev => prev.filter(l => l.id !== item.id));
  };
  
  const checkAnswers = () => {
      let correctCount = 0;
      setParts(prevParts => 
        prevParts.map(p => {
            if(p.placedLabel) {
                const correct = p.id === p.placedLabel.id;
                if(correct) correctCount++;
                return {...p, isCorrect: correct};
            }
            return p;
        })
      );
      setScore(correctCount);
      setShowResults(true);
  };

  const resetGame = () => {
      setParts(PARTS_DATA.map(p => ({...p, placed: false, placedLabel: null, isCorrect: null })));
      setUnplacedLabels(PARTS_DATA.map(p => ({ id: p.id, label: p.label })));
      setShowResults(false);
      setScore(0);
  }

  const allLabelsPlaced = unplacedLabels.length === 0;

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="space-y-4 text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold font-headline">Alimentary Canal Puzzle</h1>
            <p className="text-muted-foreground md:text-xl">Drag and drop the labels to the correct parts of the digestive system.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <Card>
                    <CardContent className="p-2">
                        <div className="relative w-full aspect-[4/5]">
                             <Image 
                                src="https://picsum.photos/seed/digestive-system/800/1000"
                                alt="Digestive System Diagram"
                                layout="fill"
                                objectFit="contain"
                                data-ai-hint="digestive system diagram"
                             />
                             {parts.map(part => (
                                 <DropTarget
                                    key={part.id}
                                    id={part.id}
                                    onDrop={handleDrop}
                                    placedLabel={part.placedLabel ? {...part.placedLabel, isCorrect: part.isCorrect} : null}
                                    x={part.x}
                                    y={part.y}
                                />
                             ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
            
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Labels</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-2">
                            <AnimatePresence>
                               {unplacedLabels.map(label => (
                                    <motion.div
                                        key={label.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.5 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <DraggableLabel id={label.id} label={label.label} />
                                    </motion.div>
                               ))}
                            </AnimatePresence>
                        </div>
                         {unplacedLabels.length === 0 && !showResults && (
                            <p className="mt-4 text-center text-muted-foreground">All labels placed!</p>
                        )}
                    </CardContent>
                </Card>
                
                <Card>
                    <CardContent className="p-4 space-y-4">
                       {showResults ? (
                            <div className="text-center">
                                <Trophy className="mx-auto size-12 text-amber-500 mb-2"/>
                                <h3 className="text-2xl font-bold">Your Score: {score} / {PARTS_DATA.length}</h3>
                                <Button onClick={resetGame} className="mt-4 w-full">
                                    <RefreshCw className="mr-2 size-4" />
                                    Play Again
                                </Button>
                            </div>
                        ) : (
                             <Button onClick={checkAnswers} disabled={!allLabelsPlaced} className="w-full">
                                {allLabelsPlaced ? <CheckCircle className="mr-2 size-4" /> : null}
                                {allLabelsPlaced ? 'Check Answers' : 'Place all labels to check'}
                            </Button>
                        )}
                    </CardContent>
                </Card>

            </div>

        </div>

      </div>
    </DndProvider>
  );
};

export default AlimentaryCanalPuzzle;
