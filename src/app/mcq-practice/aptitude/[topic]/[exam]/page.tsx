'use client';

import { Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight, CheckCircle, Lightbulb, XCircle, Timer, Edit, Loader2 } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { DrawingCanvas } from "@/components/drawing-canvas";

interface McqQuestion {
    type: string;
    questionNumber: number | string;
    question: string;
    options: string[];
    answer: string;
    source: string;
    topic: string;
    exam: string;
}

export default function AptitudeQuizPage({ params }: { params: { topic: string, exam: string } }) {
    const [mcqData, setMcqData] = useState<McqQuestion[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const [quizEnded, setQuizEnded] = useState(false);
    const [time, setTime] = useState(0);
    const [isWhiteboardOpen, setIsWhiteboardOpen] = useState(false);

    const activeQuestionRef = useRef<HTMLButtonElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    
    const topicName = useMemo(() => decodeURIComponent(params.topic), [params.topic]);
    const examName = useMemo(() => params.exam.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), [params.exam]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://script.google.com/macros/s/AKfycbyVN4EWtJcfw9YFhcHv4C9z1uC4uQ_5pqrkvOKNK1iHFCVZyvX9f5NyJoqpNs4BGkCopg/exec`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                
                const questions = (data.data || data) as McqQuestion[];

                const filteredQuestions = questions.filter(q => {
                    const questionTopic = (q.topic || '').trim().toLowerCase();
                    const targetTopic = topicName.trim().toLowerCase();
                    const questionExam = (q.exam || '').trim().toLowerCase();
                    const targetExam = params.exam.toLowerCase();

                    return questionTopic === targetTopic &&
                           (targetExam === 'mix' || questionExam.includes(targetExam));
                });


                if (!Array.isArray(filteredQuestions) || filteredQuestions.length === 0) {
                    throw new Error(`No questions found for topic "${topicName}" and exam "${examName}".`);
                }
                setMcqData(filteredQuestions);
            } catch (e: any) {
                setError(e.message || 'Failed to fetch quiz data.');
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [params.topic, params.exam, topicName, examName]);
    
    const questionTypes = useMemo(() => mcqData.length > 0 ? [...new Set(mcqData.map(q => q.type))] : [], [mcqData]);

    useEffect(() => {
        const timer = setInterval(() => {
            if (!quizEnded) {
                setTime(prevTime => prevTime + 1);
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [quizEnded]);


    useEffect(() => {
        if (activeQuestionRef.current && scrollContainerRef.current) {
            const scrollContainer = scrollContainerRef.current;
            const activeQuestion = activeQuestionRef.current;
            const containerWidth = scrollContainer.offsetWidth;
            const activeQuestionLeft = activeQuestion.offsetLeft;
            const activeQuestionWidth = activeQuestion.offsetWidth;
            const scrollLeft = activeQuestionLeft - (containerWidth / 2) + (activeQuestionWidth / 2);
            scrollContainer.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        }
    }, [currentQuestionIndex]);
    
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const handleNext = () => {
        if (currentQuestionIndex < mcqData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            resetQuestionState();
        } else {
            setQuizEnded(true);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            resetQuestionState();
        }
    };

    const handleQuestionSelect = (index: number) => {
        setCurrentQuestionIndex(index);
        resetQuestionState();
    }

    const resetQuestionState = () => {
        setSelectedAnswer(null);
        setShowAnswer(false);
    }

    const handleEndQuiz = () => {
        setQuizEnded(true);
    };

    const handleRestartQuiz = () => {
        setCurrentQuestionIndex(0);
        resetQuestionState();
        setQuizEnded(false);
        setTime(0);
    };
    
    const handleNextType = () => {
        if (!mcqData.length) return;
        const currentType = mcqData[currentQuestionIndex].type;
        const currentTypeIndex = questionTypes.indexOf(currentType);
        if (currentTypeIndex < questionTypes.length - 1) {
            const nextType = questionTypes[currentTypeIndex + 1];
            const nextQuestionIndex = mcqData.findIndex(q => q.type === nextType);
            if (nextQuestionIndex !== -1) {
                setCurrentQuestionIndex(nextQuestionIndex);
                resetQuestionState();
            }
        }
    };
    
    if (loading) {
        return (
            <div className="container mx-auto py-12 px-4 md:px-6 flex justify-center items-center h-[50vh]">
                <div className="flex items-center gap-4 text-muted-foreground">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <p>Loading {topicName} questions for {examName}...</p>
                </div>
            </div>
        );
    }

    if (error) {
         return (
            <div className="container mx-auto py-12 px-4 md:px-6 flex justify-center items-center h-full">
                <Card className="w-full max-w-xl text-center">
                    <CardHeader>
                        <CardTitle className="text-destructive">Error</CardTitle>
                        <CardDescription>Could not load quiz data.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>{error}</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (mcqData.length === 0) {
        return (
             <div className="container mx-auto py-12 px-4 md:px-6 flex justify-center items-center h-full">
                <Card className="w-full max-w-xl text-center">
                    <CardHeader>
                        <CardTitle>No Questions</CardTitle>
                        <CardDescription>No questions found for this topic and exam combination.</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        )
    }
    
    const currentQuestion = mcqData[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.answer;
    
    const currentType = mcqData.length > 0 ? mcqData[currentQuestionIndex].type : '';
    const currentTypeIndex = questionTypes.indexOf(currentType);
    const hasNextType = currentTypeIndex < questionTypes.length - 1;


    if (quizEnded) {
        return (
            <div className="container mx-auto py-12 px-4 md:px-6 flex justify-center items-center h-full">
                {isWhiteboardOpen && <DrawingCanvas onClose={() => setIsWhiteboardOpen(false)} />}
                <Card className="w-full max-w-xl text-center">
                    <CardHeader>
                        <CardTitle>Quiz Completed!</CardTitle>
                        <CardDescription>You have completed the {topicName} ({examName}) quiz in {formatTime(time)}.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg">Thank you for participating.</p>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={handleRestartQuiz} className="w-full">
                            Restart Quiz
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-12 px-4 md:px-6">
            {isWhiteboardOpen && <DrawingCanvas onClose={() => setIsWhiteboardOpen(false)} />}
            <div className="md:w-1/2 mx-auto">
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <p className="text-sm font-semibold text-primary mb-2">{currentQuestion.type}</p>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="icon" onClick={() => setIsWhiteboardOpen(true)}>
                                    <Edit className="h-4 w-4" />
                                </Button>
                                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                    <Timer className="size-4" />
                                    <span>{formatTime(time)}</span>
                                </div>
                            </div>
                        </div>
                        <CardDescription>{currentQuestion.source}</CardDescription>
                        <CardTitle className="font-body text-xl leading-relaxed">
                            {mcqData.length > 0 && `Q${currentQuestion.questionNumber}. ${currentQuestion.question}`}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RadioGroup
                            value={selectedAnswer ?? undefined}
                            onValueChange={setSelectedAnswer}
                            disabled={showAnswer}
                        >
                            {mcqData.length > 0 && currentQuestion.options.map((option, index) => (
                                <div key={index} className={cn(
                                    "flex items-center space-x-2 p-3 rounded-md border",
                                    showAnswer && option === currentQuestion.answer && "bg-green-100 border-green-400 dark:bg-green-900/30 dark:border-green-700",
                                    showAnswer && selectedAnswer === option && option !== currentQuestion.answer && "bg-red-100 border-red-400 dark:bg-red-900/30 dark:border-red-700"
                                )}>
                                    <RadioGroupItem value={option} id={`option-${index}`} />
                                    <Label htmlFor={`option-${index}`} className="flex-1">
                                        {option}
                                    </Label>
                                    {showAnswer && option === currentQuestion.answer && <CheckCircle className="text-green-600 dark:text-green-500" />}
                                    {showAnswer && selectedAnswer === option && option !== currentQuestion.answer && <XCircle className="text-red-600 dark:text-red-500" />}
                                </div>
                            ))}
                        </RadioGroup>
                    </CardContent>
                    <CardFooter className="flex-col items-start space-y-4">
                        <div className="flex justify-between w-full gap-2">
                            <Button
                                onClick={handlePrevious}
                                disabled={currentQuestionIndex === 0}
                                variant="outline"
                            >
                                <ChevronLeft className="mr-2 h-4 w-4" />
                                Previous
                            </Button>
                            <Button
                                onClick={handleNextType}
                                disabled={!hasNextType}
                                variant="outline"
                            >
                                Next Type
                            </Button>
                            <Button
                                onClick={handleNext}
                            >
                                {currentQuestionIndex === mcqData.length - 1 ? 'Finish' : 'Next'}
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>

                        <ScrollArea className="w-full" ref={scrollContainerRef}>
                            <div className="flex w-max space-x-2 p-2">
                                {mcqData.map((question, index) => (
                                    <Button
                                        key={index}
                                        ref={index === currentQuestionIndex ? activeQuestionRef : null}
                                        variant={index === currentQuestionIndex ? 'default' : 'outline'}
                                        size="icon"
                                        onClick={() => handleQuestionSelect(index)}
                                        className="h-10 w-10 flex-shrink-0"
                                    >
                                        {question.questionNumber}
                                    </Button>
                                ))}
                            </div>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>

                        <div className="flex gap-2 w-full">
                            <Button onClick={() => setShowAnswer(!showAnswer)} variant="secondary" className="w-1/2">
                                <Lightbulb className="mr-2 h-4 w-4" /> {showAnswer ? 'Hide' : 'Show'} Answer
                            </Button>
                            <Button onClick={handleEndQuiz} variant="destructive" className="w-1/2">
                                End
                            </Button>
                        </div>

                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
