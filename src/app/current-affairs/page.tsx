
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Trophy, Loader2, AlertCircle, Calendar, Clock, Filter, Tag, Check, X, ArrowUp, CheckCircle, XCircle, BookOpen } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const API_URL = "https://script.google.com/macros/s/AKfycbxRx6jx4bmKcybd_uFaVWZP9Oh3bwXP-4GmAqBMSr7LmUnarozWsRjqYzbWa8J82fgrzQ/exec";

const shuffleArray = (array: any[]) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export default function CurrentAffairsPage() {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'end' | 'loading' | 'error'>('loading');
  const [masterQuestions, setMasterQuestions] = useState<any[]>([]);
  const [questions, setQuestions] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [filterType, setFilterType] = useState('month');
  const [filterOptions, setFilterOptions] = useState<{ dates: string[], months: string[], years: string[], categories: string[] }>({ dates: [], months: [], years: [], categories: [] });
  const [selectedValue, setSelectedValue] = useState('All');

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, { selection: string; isCorrect: boolean }>>({});
  const [time, setTime] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  
  const score = Object.values(answers).filter(a => a.isCorrect).length;

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (gameState === 'playing') {
      timerId = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timerId);
  }, [gameState]);

  const fetchData = async () => {
    setGameState('loading');
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch data from the server.");
      const rawData = await response.json();
      const processed = processData(rawData);
      
      if (processed.questions.length === 0) {
        throw new Error("No valid questions found in the data source.");
      }
      
      setMasterQuestions(processed.questions);
      setFilterOptions(processed.filters);
      setGameState('start');
    } catch (err: any) {
      setError(err.message);
      setGameState('error');
    }
  };

  const processData = (rawData: any) => {
    let data = Array.isArray(rawData) ? rawData : (Object.values(rawData).find((v: any) => Array.isArray(v)) || []);
    const allAnswers: string[] = [];
    const dates = new Set<string>();
    const months = new Set<string>();
    const years = new Set<string>();
    const categories = new Set<string>();

    const questions = data.map((item: any, index: number) => {
      const keys = Object.keys(item);
      const qKey = keys.find(k => /question|q\b|term|text/i.test(k)) || keys[0];
      const aKey = keys.find(k => /answer|ans|correct|back/i.test(k)) || keys[1];
      const dKey = keys.find(k => /date|timestamp|time|created/i.test(k));
      const cKey = keys.find(k => /category|topic/i.test(k));
      const descKey = keys.find(k => /description|explanation|desc/i.test(k));

      const qText = String(item[qKey] || "");
      const aText = String(item[aKey] || "");
      if (!qText || !aText) return null;

      allAnswers.push(aText);

      let dObj = dKey && item[dKey] ? new Date(item[dKey]) : null;
      let dateStr = "Unknown Date";
      let monthStr = "Unknown Month";
      let yearStr = "Unknown Year";

      if (dObj && !isNaN(dObj.getTime())) {
        dateStr = dObj.toLocaleDateString('en-GB');
        monthStr = dObj.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        yearStr = dObj.getFullYear().toString();
        
        dates.add(dateStr);
        months.add(monthStr);
        years.add(yearStr);
      }

      const categoryStr = cKey && item[cKey] ? String(item[cKey]) : "General";
      categories.add(categoryStr);

      const optKeys = keys.filter(k => /option|choice|opt/i.test(k));

      return {
        id: index,
        question: qText,
        correctAnswer: aText,
        explicitOptions: optKeys.map(k => String(item[k])).filter(v => v && v !== "undefined"),
        date: dateStr,
        month: monthStr,
        year: yearStr,
        category: categoryStr,
        description: descKey ? String(item[descKey] || "") : "",
      };
    }).filter(Boolean);

    const finalQuestions = (questions as any[]).map(q => {
      if (!q) return null;
      let options = q.explicitOptions.length > 0 ? [...new Set([q.correctAnswer, ...q.explicitOptions])] : null;
      if (!options || options.length < 2) {
        const distractors = shuffleArray(allAnswers.filter(a => a !== q.correctAnswer)).slice(0, 3);
        options = [q.correctAnswer, ...distractors];
      }
      return { ...q, options: shuffleArray(options) };
    }).filter(Boolean);

    return {
      questions: finalQuestions as any[],
      filters: {
        dates: Array.from(dates).sort((a, b) => new Date(b.split('/').reverse().join('-')).getTime() - new Date(a.split('/').reverse().join('-')).getTime()),
        months: Array.from(months).sort((a, b) => new Date(b).getTime() - new Date(a).getTime()),
        years: Array.from(years).sort((a, b) => parseInt(b) - parseInt(a)),
        categories: ["General", ...Array.from(categories).filter(c => c !== "General").sort()]
      }
    };
  };

  const handleStart = () => {
    let filtered = masterQuestions;
    if (selectedValue !== 'All') {
      filtered = masterQuestions.filter(q => q[filterType] === selectedValue);
    }
    if (filtered.length === 0) {
        alert("No questions found for this filter. Please try another.");
        return;
    };
    
    setQuestions(shuffleArray(filtered));
    setGameState('playing');
    setCurrentIndex(0);
    setAnswers({});
    setTime(0);
    setIsFlipped(false);
  };
  
  const handleAnswerSelect = (option: string) => {
    if (answers[currentIndex]) return;
    
    const isCorrect = questions[currentIndex].correctAnswer === option;
    setAnswers(prev => ({
        ...prev,
        [currentIndex]: { selection: option, isCorrect }
    }));
  };

  const handleFlip = () => {
    setIsFlipped(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
        setIsFlipped(false);
        setCurrentIndex(prev => prev + 1);
    } else {
        setGameState('end');
    }
  };
  
  const resetQuiz = () => {
      setGameState('start');
      setCurrentIndex(0);
      setAnswers({});
      setTime(0);
      setIsFlipped(false);
  }

  if (gameState === 'loading') return (
    <div className="fixed inset-x-0 top-16 bottom-16 md:bottom-0 flex flex-col items-center justify-center bg-neutral-900 text-white">
      <Loader2 className="w-12 h-12 animate-spin mb-4" />
      <p className="text-neutral-400">Loading Current Affairs...</p>
    </div>
  );

  if (gameState === 'error') return (
    <div className="fixed inset-x-0 top-16 bottom-16 md:bottom-0 flex flex-col items-center justify-center p-6 bg-neutral-900 text-white">
      <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
      <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
      <p className="text-neutral-400 text-center mb-6">{error}</p>
      <Button onClick={fetchData} variant="secondary">Try Again</Button>
    </div>
  );

  if (gameState === 'start') {
    return (
      <div className="fixed inset-x-0 top-16 bottom-16 md:bottom-0 bg-gradient-to-br from-neutral-900 to-slate-800 flex items-center justify-center p-4">
        <Card className="bg-neutral-800/50 border-neutral-700 text-white shadow-xl max-w-md w-full backdrop-blur-sm">
          <CardContent className="p-8">
            <h1 className="text-3xl font-bold text-center mb-2">Current Affairs Shorts</h1>
            <p className="text-neutral-400 text-center mb-8">Test your knowledge with quick, swipeable questions.</p>
            
            <div className="flex bg-neutral-900/70 p-1 rounded-xl mb-6">
              <button onClick={() => { setFilterType('date'); setSelectedValue('All'); }} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${filterType === 'date' ? 'bg-white text-black shadow-sm' : 'text-neutral-400'}`}><Calendar size={14}/>DATE</button>
              <button onClick={() => { setFilterType('month'); setSelectedValue('All'); }} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${filterType === 'month' ? 'bg-white text-black shadow-sm' : 'text-neutral-400'}`}><Clock size={14}/>MONTH</button>
              <button onClick={() => { setFilterType('year'); setSelectedValue('All'); }} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${filterType === 'year' ? 'bg-white text-black shadow-sm' : 'text-neutral-400'}`}><Filter size={14}/>YEAR</button>
              <button onClick={() => { setFilterType('category'); setSelectedValue('All'); }} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${filterType === 'category' ? 'bg-white text-black shadow-sm' : 'text-neutral-400'}`}><Tag size={14}/>CATEGORY</button>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-semibold text-neutral-300 mb-2">Select {filterType}</label>
              <select value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)} className="w-full p-4 bg-neutral-700 border-2 border-neutral-600 rounded-xl outline-none appearance-none text-white focus:border-blue-500">
                <option value="All">All {filterType}s ({masterQuestions.length})</option>
                {filterType === 'date' && filterOptions.dates.map(d => <option key={d} value={d}>{d}</option>)}
                {filterType === 'month' && filterOptions.months.map(m => <option key={m} value={m}>{m}</option>)}
                {filterType === 'year' && filterOptions.years.map(y => <option key={y} value={y}>{y}</option>)}
                {filterType === 'category' && filterOptions.categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            
            <Button onClick={handleStart} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2">
              <Play fill="white" size={16} /> Start Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (gameState === 'end') {
    const accuracy = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
    return (
      <div className="fixed inset-x-0 top-16 bottom-16 md:bottom-0 flex flex-col items-center justify-center p-6 bg-neutral-900 text-white">
        <Trophy className="w-20 h-20 text-yellow-400 mb-6 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
        <h2 className="text-3xl font-bold mb-2">Quiz Finished!</h2>
        <p className="text-neutral-400 mb-2">You've completed the quiz in {time} seconds.</p>
        <div className="text-6xl font-black text-white mb-2">{score} / {questions.length}</div>
        <p className="text-lg text-neutral-300 font-medium mb-8">Your Accuracy: {accuracy}%</p>
        <div className="flex gap-4">
          <Button onClick={resetQuiz} variant="secondary" className="bg-neutral-700 hover:bg-neutral-600">Play Again</Button>
          <Button onClick={() => window.location.href = '/'}>Go Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-x-0 top-16 bottom-16 md:bottom-0 w-full overflow-hidden bg-neutral-900 flex flex-col">
      <div className="p-4 z-20">
        <Progress value={((currentIndex + 1) / questions.length) * 100} className="bg-neutral-700 h-2" />
      </div>

      <div className="relative flex-1 w-full flex items-center justify-center p-2">
        <AnimatePresence initial={false}>
          {questions.slice(currentIndex, currentIndex + 1).map(q => (
            <motion.div
              key={q.id}
              className="absolute w-full max-w-md h-[580px]"
              style={{ perspective: 1000 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.1}
              onDragEnd={(event, info) => {
                if (info.offset.y < -50 && !!answers[currentIndex]) {
                  handleNext();
                }
              }}
              initial={{ y: 300, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -300, opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
              <motion.div
                  className="relative w-full h-full"
                  style={{ transformStyle: 'preserve-3d' }}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                  {/* --- FRONT OF CARD --- */}
                  <div className="absolute w-full h-full" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
                    <div className="bg-card text-foreground rounded-2xl w-full h-full shadow-2xl flex flex-col overflow-hidden border border-neutral-700">
                      <div className='relative w-full h-48'>
                        <Image src={`https://picsum.photos/seed/${q.id}/800/400`} layout="fill" objectFit="cover" alt="Question visual" priority />
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                      </div>
                      <div className="p-4 flex flex-col flex-1">
                        <div>
                          <p className="text-xs text-neutral-400 mb-1">{q.category} • {q.date}</p>
                          <h3 className="font-bold text-lg mb-4">{q.question}</h3>
                        </div>
                        <div className="space-y-2 flex-1">
                          {q.options.map((opt: string) => {
                            const isSelected = answers[currentIndex]?.selection === opt;
                            const isTheCorrectAnswer = q.correctAnswer === opt;
                            const isRevealed = !!answers[currentIndex];
                            
                            return (
                              <button
                                key={opt}
                                onClick={() => handleAnswerSelect(opt)}
                                disabled={isRevealed}
                                className={cn(
                                  "w-full text-left p-3 rounded-lg border text-sm font-medium transition-all duration-300",
                                  "border-neutral-600 bg-neutral-800 hover:bg-neutral-700",
                                  isRevealed && isTheCorrectAnswer && "bg-green-500/20 border-green-500 text-white",
                                  isRevealed && isSelected && !isTheCorrectAnswer && "bg-red-500/20 border-red-500 text-white",
                                  isRevealed && !isSelected && !isTheCorrectAnswer && "opacity-50"
                                )}
                              >
                                <span className="flex items-center justify-between">
                                  {opt}
                                  {isRevealed && isTheCorrectAnswer && <Check size={16} />}
                                  {isRevealed && isSelected && !isTheCorrectAnswer && <X size={16} />}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                         <div className="mt-4 pt-4 border-t border-neutral-700 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2 text-neutral-400">
                              <Clock size={14} />
                              <span>Time: {time}s</span>
                          </div>
                          <div className="flex items-center gap-2">
                             {!!answers[currentIndex] && !isFlipped && (
                                <Button variant="secondary" size="sm" onClick={handleFlip}>
                                    <RotateCcw className="h-3 w-3 mr-1.5" />
                                    Flip
                                </Button>
                             )}
                            <Button variant="destructive" size="sm" onClick={() => setGameState('end')}>
                                End Quiz
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* --- BACK OF CARD --- */}
                  <div
                      className="absolute w-full h-full bg-card text-foreground rounded-2xl shadow-2xl flex flex-col p-6 border border-neutral-700"
                      style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                      <div className="flex-shrink-0 flex flex-col items-center justify-center text-center mb-4">
                          {answers[currentIndex]?.isCorrect ? (
                              <>
                                  <CheckCircle className="w-12 h-12 text-green-500 mb-2" />
                                  <h3 className="text-xl font-bold text-white">Correct!</h3>
                              </>
                          ) : (
                              <>
                                  <XCircle className="w-12 h-12 text-red-500 mb-2" />
                                  <h3 className="text-xl font-bold text-white">Incorrect</h3>
                                  <p className="text-neutral-400 text-sm">The correct answer was: <span className="font-bold text-white">{q.correctAnswer}</span></p>
                              </>
                          )}
                      </div>

                      <div className="flex-1 bg-neutral-900/50 rounded-xl p-4 flex flex-col overflow-hidden">
                          <h4 className="font-bold text-white mb-2 flex items-center gap-2 flex-shrink-0">
                            <BookOpen size={16} className="text-blue-400"/> Explanation
                          </h4>
                          <div className="overflow-y-auto">
                              <p className="text-neutral-300 text-sm leading-relaxed">
                                  {q.description || "No explanation available for this question."}
                              </p>
                          </div>
                      </div>
                      
                      <div className="mt-4 z-30 text-center text-white/50 animate-pulse pointer-events-none">
                          <ArrowUp className="inline-block" />
                          <p className="text-xs font-semibold">Swipe up for next</p>
                      </div>
                  </div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
