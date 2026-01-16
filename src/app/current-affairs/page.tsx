'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Play, 
  RotateCcw, 
  CheckCircle, 
  XCircle, 
  Loader2, 
  AlertCircle, 
  BookOpen, 
  Trophy, 
  Calendar, 
  Filter, 
  Clock, 
  Tag,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
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

export default function DailyQuizPage() {
  const [gameState, setGameState] = useState('start'); 
  const [masterQuestions, setMasterQuestions] = useState<any[]>([]);
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter States
  const [filterType, setFilterType] = useState('month'); // 'date', 'month', 'year', 'category'
  const [filterOptions, setFilterOptions] = useState<{ dates: string[], months: string[], years: string[], categories: string[] }>({ dates: [], months: [], years: [], categories: [] });
  const [selectedValue, setSelectedValue] = useState('All');

  // Quiz play state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
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
    const categories = new Set<string>();

    const questions = data.map((item: any) => {
      const keys = Object.keys(item);
      const qKey = keys.find(k => /question|q\b|term|text/i.test(k)) || keys[0];
      const aKey = keys.find(k => /answer|ans|correct|back/i.test(k)) || keys[1];
      const dKey = keys.find(k => /date|timestamp|time|created/i.test(k));
      const cKey = keys.find(k => /category|topic/i.test(k));

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

      const categoryStr = cKey && item[cKey] ? String(item[cKey]) : "Uncategorized";
      if(categoryStr) categories.add(categoryStr);


      const optKeys = keys.filter(k => /option|choice|opt/i.test(k));

      return {
        question: qText,
        correctAnswer: aText,
        explicitOptions: optKeys.map(k => String(item[k])).filter(v => v && v !== "undefined"),
        date: dateStr,
        month: monthStr,
        year: yearStr,
        category: categoryStr
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
        years: Array.from(years).sort((a, b) => parseInt(b) - parseInt(a)),
        categories: Array.from(categories).sort()
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
    resetQuestionState();
  };

  const resetQuestionState = () => {
    setSelectedOption(null);
    setIsAnswerRevealed(false);
  };

  const handleRetry = () => {
    setQuestions(shuffleArray(questions));
    setCurrentQuestionIndex(0);
    setScore(0);
    resetQuestionState();
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
      resetQuestionState();
    } else {
      setGameState('end');
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      resetQuestionState();
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
            <button 
              onClick={() => { setFilterType('category'); setSelectedValue('All'); }}
              className={`flex-1 flex flex-col items-center py-2 rounded-lg text-xs font-bold transition-all ${filterType === 'category' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
            >
              <Tag size={16} className="mb-1" /> CATEGORY
            </button>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-semibold text-slate-600 mb-2">Select {filterType.toUpperCase()}</label>
            <select 
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
              className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-blue-500 outline-none appearance-none text-slate-800"
            >
              <option value="All">All {filterType}s ({masterQuestions.length})</option>
              {filterType === 'date' && filterOptions.dates.map(d => <option key={d} value={d}>{d}</option>)}
              {filterType === 'month' && filterOptions.months.map(m => <option key={m} value={m}>{m}</option>)}
              {filterType === 'year' && filterOptions.years.map(y => <option key={y} value={y}>{y}</option>)}
              {filterType === 'category' && filterOptions.categories.map(c => <option key={c} value={c}>{c}</option>)}
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
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="flex justify-between items-center mb-2 text-sm text-slate-500">
          <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
          <span>Score: {score}</span>
        </div>
        <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} className="mb-4" />
        
        <Card>
          <CardHeader>
            <CardDescription className="text-xs">{q.date} • {q.category}</CardDescription>
            <CardTitle className="text-xl leading-relaxed">{q.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {q.options.map((opt: string, i: number) => {
                const isCorrect = opt === q.correctAnswer;
                const isSelected = selectedOption === opt;
                let stateStyles = "";
                
                if (isAnswerRevealed) {
                  if (isCorrect) stateStyles = "bg-green-100 border-green-400 text-green-800 dark:bg-green-900/30 dark:border-green-700 dark:text-white";
                  else if (isSelected) stateStyles = "bg-red-100 border-red-400 text-red-800 dark:bg-red-900/30 dark:border-red-700 dark:text-white";
                  else stateStyles = "opacity-60";
                }

                return (
                  <Button 
                    key={i} 
                    variant="outline"
                    onClick={() => handleOptionClick(opt)}
                    disabled={isAnswerRevealed}
                    className={cn(
                        "w-full justify-start h-auto py-3 px-4 text-left font-normal whitespace-normal transition-all duration-300",
                        stateStyles
                    )}
                  >
                    <span className="flex-1 text-base">{opt}</span>
                    {isAnswerRevealed && isCorrect && <CheckCircle size={20} className="text-green-500" />}
                    {isAnswerRevealed && isSelected && !isCorrect && <XCircle size={20} className="text-red-500" />}
                  </Button>
                );
              })}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between mt-4">
            <Button onClick={handlePrevious} disabled={currentQuestionIndex === 0} variant="outline">
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button onClick={() => setGameState('start')} variant="destructive">
              End Quiz
            </Button>
            <Button onClick={handleNext} disabled={!isAnswerRevealed}>
               {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
