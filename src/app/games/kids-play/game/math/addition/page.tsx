
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, X } from 'lucide-react';

export default function AdditionGamePage() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState<'correct' | 'incorrect' | null>(null);

  const generateNewQuestion = () => {
    setNum1(Math.floor(Math.random() * 10) + 1);
    setNum2(Math.floor(Math.random() * 10) + 1);
    setAnswer('');
    setResult(null);
  };

  useEffect(() => {
    generateNewQuestion();
  }, []);

  const handleCheck = () => {
    if (parseInt(answer, 10) === num1 + num2) {
      setResult('correct');
    } else {
      setResult('incorrect');
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">Addition Game</h1>
        <p className="text-muted-foreground md:text-xl">Practice your addition skills!</p>
      </div>

      <div className="max-w-md mx-auto">
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-mono flex items-center justify-center gap-4">
              <span>{num1}</span>
              <span className="text-primary">+</span>
              <span>{num2}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="number"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Your answer"
              className="text-center text-2xl h-16"
              onKeyPress={(e) => { if(e.key === 'Enter') handleCheck() }}
            />
            {result === null ? (
              <Button onClick={handleCheck} className="w-full">
                Check Answer
              </Button>
            ) : (
              <Button onClick={generateNewQuestion} className="w-full">
                Next Question
              </Button>
            )}
            {result === 'correct' && (
              <div className="flex items-center justify-center gap-2 p-4 bg-green-500/10 text-green-500 rounded-md">
                <Check className="size-6" />
                <p className="font-bold text-lg">Correct! Great job!</p>
              </div>
            )}
            {result === 'incorrect' && (
              <div className="flex items-center justify-center gap-2 p-4 bg-red-500/10 text-red-500 rounded-md">
                <X className="size-6" />
                <p className="font-bold text-lg">Not quite. The answer is {num1 + num2}.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
