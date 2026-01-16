
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, CheckCircle, XCircle, Loader2, AlertCircle, BookOpen, Trophy, Calendar, Filter, Clock, LogOut } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';

/**
 * Flashcard MCQ App - Current Affairs Edition
 * Features:
 * 1. Multi-tier filtering: Specific Date, Month, or Year.
 * 2. Smart column detection for Questions, Answers, and Dates.
 * 3. Automatic distractor generation for MCQs.
 * 4. Swipe up for next question, swipe down for previous.
 */

const API_URL = "https://script.google.com/macros/s/AKfycbxRx6jx4bmKcybd_uFaVWZP9Oh3bwXP-4GmAqBMSr7LmUnarozWsRjqYzbWa8J82fgrzQ/exec";

const shuffleArray = (array: any[]) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export default function FlashcardApp() {
  const [gameState, setGameState] = useState('start'); 
  const [masterQuestions, setMasterQuestions] = useState<any[]>([]);
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filter States
  const [filterType, setFilterType] = useState('month'); // 'date', 'month', 'year'
  const [filterOptions, setFilterOptions] = useState<{ dates: string[], months: string[], years: string[] }>({ dates: [], months: [], years: [] });
  const [selectedValue, setSelectedValue] = useState('All');

  // Quiz play state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);

  // 3D card effect
  const motionY = useMotionValue(0);
  const rotateX = useTransform(motionY, [-150, 150], [10, -10]);
  const cardOpacity = useTransform(motionY, [0, -100], [1, 0]);

  // Sound effect ref
  const swipeSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetchData();
    // Initialize audio on the client side
    if (typeof window !== 'undefined') {
        swipeSoundRef.current = new Audio('https://cdn.jsdelivr.net/gh/k-next/sounds@main/sounds/swipe.mp3');
        swipeSoundRef.current.volume = 0.5; // Adjust volume
    }
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch data");
      const rawData = await response.json();
      const processed = processData(rawData);
      
      if (processed.questions.length === 0) {
        throw new Error("No valid data found in spreadsheet.");
      }
      
      setMasterQuestions(processed.questions);
      setFilterOptions(processed.filters);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const processData = (rawData: any) => {
    let data = Array.isArray(rawData) ? rawData : (Object.values(rawData).find(v => Array.isArray(v)) || []);
    const allAnswers: string[] = [];
    const dates = new Set<string>();
    const months = new Set<string>();
    const years = new Set<string>();

    const questions = data.map((item: any) => {
      const keys = Object.keys(item);
      const qKey = keys.find(k => /question|q\b|term|text/i.test(k)) || keys[0];
      const aKey = keys.find(k => /answer|ans|correct|back/i.test(k)) || keys[1];
      const dKey = keys.find(k => /date|timestamp|time|created/i.test(k));

      const qText = String(item[qKey] || "");
      const aText = String(item[aKey] || "");
      if (!qText || !aText) return null;

      allAnswers.push(aText);

      // Date Processing
      let dObj = dKey ? new Date(item[dKey]) : null;
      let dateStr = "Unknown";
      let monthStr = "Unknown";
      let yearStr = "Unknown";

      if (dObj && !isNaN(dObj.getTime())) {
        dateStr = dObj.toLocaleDateString('en-GB'); // DD/MM/YYYY
        monthStr = dObj.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        yearStr = dObj.getFullYear().toString();
        
        dates.add(dateStr);
        months.add(monthStr);
        years.add(yearStr);
      }

      const optKeys = keys.filter(k => /option|choice|opt/i.test(k));

      return {
        question: qText,
        correctAnswer: aText,
        explicitOptions: optKeys.map(k => String(item[k])).filter(v => v && v !== "undefined"),
        date: dateStr,
        month: monthStr,
        year: yearStr
      };
    }).filter(Boolean);

    // Finalize MCQ options
    const finalQuestions = (questions as any[]).map(q => {
      if (!q) return null;
      let options = q.explicitOptions.length > 0 ? [...new Set([...q.explicitOptions, q.correctAnswer])] : null;
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
        years: Array.from(years).sort((a, b) => parseInt(b) - parseInt(a))
      }
    };
  };

  const handleStart = () => {
    let filtered = masterQuestions;
    if (selectedValue !== 'All') {
      filtered = masterQuestions.filter(q => q[filterType] === selectedValue);
    }
    
    if (filtered.length === 0) return;
    
    setQuestions(shuffleArray(filtered));
    setGameState('playing');
    setCurrentQuestionIndex(0);
    setScore(0);
    resetCard();
  };

  const resetCard = () => {
    setSelectedOption(null);
    setIsAnswerRevealed(false);
  };

  const handleRetry = () => {
    setQuestions(shuffleArray(questions));
    setCurrentQuestionIndex(0);
    setScore(0);
    resetCard();
    setGameState('playing');
  };

  const handleOptionClick = (option: string) => {
    if (isAnswerRevealed) return;
    setSelectedOption(option);
    setIsAnswerRevealed(true);
    if (option === questions[currentQuestionIndex].correctAnswer) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      resetCard();
    } else {
      setGameState('end');
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      resetCard();
    }
  };
  
  const handleSwipe = (offset: { y: number }, velocity: { y: number }) => {
    if (offset.y < -50 && velocity.y < -500) {
        if (isAnswerRevealed) {
            swipeSoundRef.current?.play();
            handleNext();
        }
    } else if (offset.y > 50 && velocity.y > 500) {
        swipeSoundRef.current?.play();
        handlePrevious();
    }
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
      <p className="text-slate-600 font-medium">Syncing with Database...</p>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50">
      <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
      <h2 className="text-xl font-bold mb-2">Error</h2>
      <p className="text-slate-600 text-center mb-6">{error}</p>
      <button onClick={fetchData} className="px-6 py-2 bg-blue-600 text-white rounded-lg">Retry</button>
    </div>
  );

  if (gameState === 'start') {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-100 rounded-2xl text-blue-600">
              <BookOpen size={40} />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-center text-slate-800 mb-2">Daily Quiz</h1>
          <p className="text-slate-500 text-center mb-8">Choose how you want to filter the current affairs</p>

          <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
            <button 
              onClick={() => { setFilterType('date'); setSelectedValue('All'); }}
              className={`flex-1 flex flex-col items-center py-2 rounded-lg text-xs font-bold transition-all ${filterType === 'date' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
            >
              <Calendar size={16} className="mb-1" /> DATE
            </button>
            <button 
              onClick={() => { setFilterType('month'); setSelectedValue('All'); }}
              className={`flex-1 flex flex-col items-center py-2 rounded-lg text-xs font-bold transition-all ${filterType === 'month' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
            >
              <Clock size={16} className="mb-1" /> MONTH
            </button>
            <button 
              onClick={() => { setFilterType('year'); setSelectedValue('All'); }}
              className={`flex-1 flex flex-col items-center py-2 rounded-lg text-xs font-bold transition-all ${filterType === 'year' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
            >
              <Filter size={16} className="mb-1" /> YEAR
            </button>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-semibold text-slate-600 mb-2">Select {filterType.toUpperCase()}</label>
            <select 
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
              className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-blue-500 outline-none appearance-none"
            >
              <option value="All">All {filterType}s ({masterQuestions.length})</option>
              {filterType === 'date' && filterOptions.dates.map(d => <option key={d} value={d}>{d}</option>)}
              {filterType === 'month' && filterOptions.months.map(m => <option key={m} value={m}>{m}</option>)}
              {filterType === 'year' && filterOptions.years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>

          <button 
            onClick={handleStart}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <Play fill="white" size={20} /> Start Practice
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'end') {
    const pct = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="bg-white p-10 rounded-3xl shadow-xl max-w-md w-full text-center">
          <Trophy size={80} className="mx-auto text-yellow-500 mb-6" />
          <h2 className="text-3xl font-bold mb-2">Quiz Finished!</h2>
          <div className="text-5xl font-black text-blue-600 mb-4">{score} / {questions.length}</div>
          <p className="text-slate-500 mb-8 font-medium">Accuracy: {pct}%</p>
          <div className="flex gap-4">
            <button onClick={() => setGameState('start')} className="flex-1 py-4 border-2 border-slate-100 font-bold rounded-2xl hover:bg-slate-50">Home</button>
            <button onClick={handleRetry} className="flex-1 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 shadow-md">Retry Set</button>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[currentQuestionIndex];
  
  if (!q) {
      return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
            <p className="text-slate-600 font-medium">Loading question...</p>
          </div>
      )
  }

  return (
    <div className="h-screen bg-slate-50 flex flex-col items-center p-4 md:p-8 overflow-hidden" style={{ perspective: '1000px' }}>
      <div className="w-full max-w-2xl flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
           <button onClick={() => setGameState('start')} className="p-2 hover:bg-white rounded-lg"><RotateCcw size={20}/></button>
           <span className="font-bold text-slate-400">Question {currentQuestionIndex + 1} of {questions.length}</span>
        </div>
        <div className="flex items-center gap-4">
           <button onClick={() => setGameState('end')} className="p-2 hover:bg-white rounded-lg text-red-500 flex items-center gap-1 text-sm font-bold">
               <LogOut size={16}/> End Quiz
            </button>
           <div className="font-bold text-blue-600 px-4 py-1 bg-blue-100 rounded-full">Score: {score}</div>
        </div>
      </div>
        
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          className="w-full max-w-2xl"
          style={{ y: motionY, rotateX, transformStyle: 'preserve-3d' }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.2}
          onDragEnd={(e, { offset, velocity }) => handleSwipe(offset, velocity)}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -150, opacity: 0, transition: { duration: 0.2 } }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col min-h-[500px]" style={{ transform: 'translateZ(0)' }}>
            <div className="p-8 md:p-12 bg-blue-600 text-white text-center min-h-[200px] flex flex-col justify-center items-center">
              <span className="text-xs font-bold uppercase tracking-widest opacity-60 mb-4">{q.date} • {q.month}</span>
              <h2 className="text-2xl md:text-3xl font-bold leading-snug">{q.question}</h2>
            </div>

            <div className="p-6 md:p-10 space-y-4 flex-grow">
              {q.options.map((opt: string, i: number) => {
                const isCorrect = opt === q.correctAnswer;
                const isSelected = selectedOption === opt;
                let styles = "border-2 border-slate-100 hover:border-blue-200 hover:bg-blue-50 text-slate-700";
                
                if (isAnswerRevealed) {
                  if (isCorrect) styles = "bg-green-100 border-green-500 text-green-800";
                  else if (isSelected) styles = "bg-red-100 border-red-500 text-red-800";
                  else styles = "opacity-40 border-slate-50";
                } else if (isSelected) {
                  styles = "border-blue-500 bg-blue-50 text-blue-700";
                }

                return (
                  <button 
                    key={i} 
                    onClick={() => handleOptionClick(opt)}
                    disabled={isAnswerRevealed}
                    className={`w-full p-4 rounded-xl text-left font-semibold transition-all flex justify-between items-center ${styles}`}
                  >
                    <span>{opt}</span>
                    {isAnswerRevealed && isCorrect && <CheckCircle size={20} className="text-green-600 flex-shrink-0" />}
                    {isAnswerRevealed && isSelected && !isCorrect && <XCircle size={20} className="text-red-600 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>

            {isAnswerRevealed && !questions[currentQuestionIndex + 1] && (
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end items-center gap-4">
                 <button 
                  onClick={handleNext}
                  className="bg-slate-900 text-white font-bold py-3 px-6 rounded-xl hover:bg-black transition-all flex items-center gap-2"
                >
                  Show Results
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 w-full max-w-2xl h-1 bg-slate-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-600 transition-all duration-300" 
          style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
