
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X, Sparkles, PartyPopper } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// Helper function to shuffle an array
const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

export default function AdditionGamePage() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [options, setOptions] = useState<number[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);

  const generateNewQuestion = () => {
    const newNum1 = Math.floor(Math.random() * 20) + 1;
    const newNum2 = Math.floor(Math.random() * 20) + 1;
    const answer = newNum1 + newNum2;

    const incorrectOptions = new Set<number>();
    while (incorrectOptions.size < 3) {
      const offset = Math.floor(Math.random() * 10) - 5;
      const incorrect = answer + offset;
      if (incorrect !== answer && incorrect > 0) {
        incorrectOptions.add(incorrect);
      }
    }

    setNum1(newNum1);
    setNum2(newNum2);
    setCorrectAnswer(answer);
    setOptions(shuffleArray([answer, ...incorrectOptions]));
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  useEffect(() => {
    generateNewQuestion();
  }, []);

  const handleAnswerSelect = (option: number) => {
    if (selectedAnswer !== null) return; // Prevent multiple selections

    setSelectedAnswer(option);
    if (option === correctAnswer) {
      setIsCorrect(true);
      setScore(prev => prev + 10);
      setTimeout(generateNewQuestion, 1500); // Auto-advance on correct
    } else {
      setIsCorrect(false);
    }
  };

  const handleNext = () => {
    generateNewQuestion();
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6 flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-2xl">
        <Card className="bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-green-900/20 shadow-2xl border-purple-200/50 dark:border-purple-800/50 overflow-hidden">
          <CardHeader className="text-center p-8">
            <div className="flex justify-between items-center">
                 <h1 className="text-3xl md:text-4xl font-black text-gray-700 dark:text-gray-200 font-headline">Addition Fun!</h1>
                 <div className="text-xl font-bold bg-yellow-300 text-yellow-800 px-4 py-1 rounded-full shadow-md">Score: {score}</div>
            </div>
          </CardHeader>
          <CardContent className="space-y-8 p-8 pt-0">
            <motion.div
              key={correctAnswer}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', damping: 15, stiffness: 100 }}
              className="bg-white dark:bg-gray-800/50 flex items-center justify-center gap-8 p-10 md:p-16 rounded-2xl shadow-inner-lg text-6xl md:text-8xl font-bold text-center text-gray-800 dark:text-white"
            >
              <span className="text-blue-500">{num1}</span>
              <span className="text-red-500 text-5xl md:text-7xl">+</span>
              <span className="text-green-500">{num2}</span>
            </motion.div>
            
            <div className="grid grid-cols-2 gap-4">
              {options.map((option, index) => {
                const isSelected = selectedAnswer === option;
                const isTheCorrectAnswer = option === correctAnswer;

                return (
                  <motion.div key={option} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={() => handleAnswerSelect(option)}
                      disabled={selectedAnswer !== null}
                      className={cn(
                        "w-full h-24 text-4xl font-bold shadow-lg transition-all duration-300 transform",
                        "bg-white dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600",
                        selectedAnswer !== null && !isTheCorrectAnswer && "opacity-50",
                        isSelected && !isCorrect && "bg-red-500 hover:bg-red-600 text-white animate-shake",
                        selectedAnswer !== null && isTheCorrectAnswer && "bg-green-500 hover:bg-green-600 text-white animate-tada"
                      )}
                    >
                      {option}
                      <AnimatePresence>
                      {isSelected && !isCorrect && (
                         <motion.div initial={{scale:0}} animate={{scale:1}} exit={{scale:0}} className="absolute -top-3 -right-3 bg-white rounded-full p-1 shadow-lg">
                           <X className="text-red-500 size-6" />
                         </motion.div>
                      )}
                      {selectedAnswer !== null && isTheCorrectAnswer && (
                         <motion.div initial={{scale:0}} animate={{scale:1}} exit={{scale:0}} className="absolute -top-3 -right-3 bg-white rounded-full p-1 shadow-lg">
                           <Check className="text-green-500 size-6" />
                         </motion.div>
                      )}
                      </AnimatePresence>
                    </Button>
                  </motion.div>
                )
              })}
            </div>
            
            <AnimatePresence>
            {isCorrect === false && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-center"
                >
                    <Button onClick={handleNext} size="lg" className="bg-orange-500 hover:bg-orange-600 text-white shadow-xl">
                        Try Next Question
                    </Button>
                </motion.div>
            )}
            </AnimatePresence>

          </CardContent>
        </Card>
      </div>
       <style jsx>{`
        @keyframes tada {
          0% {transform: scale(1);}
          10%, 20% {transform: scale(0.9) rotate(-3deg);}
          30%, 50%, 70%, 90% {transform: scale(1.1) rotate(3deg);}
          40%, 60%, 80% {transform: scale(1.1) rotate(-3deg);}
          100% {transform: scale(1) rotate(0);}
        }
        .animate-tada {
          animation: tada 1s ease-in-out;
        }
        @keyframes shake {
          0%, 100% {transform: translateX(0);}
          10%, 30%, 50%, 70%, 90% {transform: translateX(-5px);}
          20%, 40%, 60%, 80% {transform: translateX(5px);}
        }
        .animate-shake {
            animation: shake 0.5s ease-in-out;
        }
       `}</style>
    </div>
  );
}
