'use client';

import { Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight, CheckCircle, Lightbulb, XCircle, Timer, Edit } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { DrawingCanvas } from "@/components/drawing-canvas";


const mcqData = [
    {
        type: "Circular Seating Arrangement",
        questionNumber: "Q1",
        question: "In the SSC GD exam on 22/02/2024 (Shift-III), six boys Sumit, Gopal, Honey, Ishaan, Jatin, and Lalit are sitting around a circular table facing the centre; Ishaan is the third to the left of Sumit, Jatin and Honey are the immediate neighbours of Ishaan, and Lalit is to the immediate right of Jatin; who is sitting to the immediate left of Ishaan?",
        options: ["Honey", "Lalit", "Jatin", "Gopal"],
        answer: "Honey",
        source: "Exam: SSC GD – 22/02/2024 (Shift-III)"
    },
    {
        type: "Circular Seating Arrangement",
        questionNumber: "Q2",
        question: "In the SSC GD exam on 20/02/2024 (Shift-IV), eight athletes Sunil, Abhishek, Mohit, Cheenu, Rahul, Tanu, Koyal, and Ankit are sitting around a circular table facing opposite to the centre; Koyal is third to the left of Rahul, Tanu is third to the right of Cheenu, Mohit is second to the right of Sunil, Abhishek is second to the left of Cheenu, and Tanu is second to the left of Sunil; who is sitting second to the left of Koyal?",
        options: ["Mohit", "Rahul", "Tanu", "Sunil"],
        answer: "Mohit",
        source: "Exam: SSC GD – 20/02/2024 (Shift-IV)"
    },
    {
        type: "Circular Seating Arrangement",
        questionNumber: "Q3",
        question: "In the SSC GD exam on 27/02/2024 (Shift-II), five friends Pooja, Bhawna, Charu, Geeta, and Hema are sitting around a circular table facing towards the centre; Charu is not the immediate neighbour of Bhawna, Bhawna is second to the left of Hema, and Geeta is the immediate neighbour of Bhawna and Hema; who is sitting to the immediate right of Hema?",
        options: ["Geeta", "Pooja", "Bhawna", "Charu"],
        answer: "Charu",
        source: "Exam: SSC GD – 27/02/2024 (Shift-II)"
    },
    {
        type: "Circular Seating Arrangement",
        questionNumber: "Q4",
        question: "In the SSC JE Electrical exam on 07/06/2024 (Shift-III), A, B, C, D, E, F, and G are sitting around a circular table facing away from the centre; only 3 people sit between B and D when counted from the left of D, B sits second to the left of E, G sits to the immediate right of C, and A is not an immediate neighbor of D; who is sitting to the immediate right of E?",
        options: ["F", "D", "A", "B"],
        answer: "F",
        source: "Exam: SSC JE Electrical – 07/06/2024 (Shift-III)"
    },
    {
        type: "Circular Seating Arrangement",
        questionNumber: "Q5",
        question: "In the SSC JE Electrical exam on 07/06/2024 (Shift-III), E, F, G, H, P, Q, and R are sitting around a circular table facing the centre; only three people sit between P and G when counted from the right of P, only F sits between R and P when counted from the left of P, only two people sit between R and E when counted from the left of R, and H is NOT an immediate neighbor of G; how many people sit between F and Q when counted from the left of F?",
        options: ["Four", "Three", "Two", "One"],
        answer: "Two",
        source: "Exam: SSC JE Electrical – 07/06/2024 (Shift-III)"
    },
    {
        type: "Circular Seating Arrangement",
        questionNumber: "Q6",
        question: "In the SSC JE Mechanical exam on 05/06/2024 (Shift-II), A, B, C, D, E, and F are sitting around a circular table facing the centre; B is sitting to the immediate right of F and immediate left of C, C is sitting to the immediate left of E, and A is sitting to the immediate right of E and to the immediate left of D; who is sitting to the immediate left of F?",
        options: ["C", "A", "D", "B"],
        answer: "D",
        source: "Exam: SSC JE Mechanical – 05/06/2024 (Shift-II)"
    },
    {
        type: "Circular Seating Arrangement",
        questionNumber: "Q7",
        question: "In the SSC JE Mechanical exam on 05/06/2024 (Shift-II), A, B, C, D, E, and F are sitting at a circular table facing the centre; A is to the immediate left of B, E is third to the right of B, D is to the immediate right of C, and F is third to the right of C; who are the immediate neighbours of E?",
        options: ["A and B", "B and D", "D and F", "F and B"],
        answer: "F and B",
        source: "Exam: SSC JE Mechanical – 05/06/2024 (Shift-II)"
    },
    {
        type: "Circular Seating Arrangement",
        questionNumber: "Q8",
        question: "In the SSC JE Electrical exam on 05/06/2024 (Shift-III), L, M, N, O, P and Q are sitting around a circular table facing the centre; M is sitting to the immediate right of Q, L is sitting to the immediate left of O, Q is sitting to the immediate right of O, and P is sitting to the immediate left of L; who is sitting to the immediate right of M?",
        options: ["N", "P", "L", "O"],
        answer: "N",
        source: "Exam: SSC JE Electrical – 05/06/2024 (Shift-III)"
    },
    {
        type: "Circular Seating Arrangement",
        questionNumber: "Q9",
        question: "In the SSC JE Electrical exam on 05/06/2024 (Shift-III), L, M, N, O, P, Q and R are sitting around a circular table, facing the centre; L sits second to the right of M, N sits third to the right of L, O sits second to the left of N, P is not an immediate neighbour of N, and Q sits to the immediate right of O; how many people are sitting between L and R when counted from the left of L?",
        options: ["Two", "One", "Three", "Four"],
        answer: "Two",
        source: "Exam: SSC JE Electrical – 05/06/2024 (Shift-III)"
    },
    {
        type: "Circular Seating Arrangement",
        questionNumber: "Q10",
        question: "In the SSC JE Civil exam on 05/06/2024 (Shift-I), A, B, C, D, P, Q, and R are sitting around a circular table facing the centre; R sits fourth to the left of B, D sits second to the right of B, A is an immediate neighbour of B and D, Q sits third to the left of A, and P is an immediate neighbour of Q and R; who is sitting third to the right of R?",
        options: ["D", "A", "C", "Q"],
        answer: "C",
        source: "Exam: SSC JE Civil – 05/06/2024 (Shift-I)"
    },
    {
        type: "Circular Seating Arrangement",
        questionNumber: "Q11",
        question: "In the SSC JE Civil exam on 05/06/2024 (Shift-I), L, A, N, T, E, R, and S are sitting around a circular table, facing the centre; L sits third to the right of E, E sits second to the right of T, S sits third to the left of T, and N sits third to the left of A; who is sitting to the immediate left of A?",
        options: ["L", "T", "N", "E"],
        answer: "L",
        source: "Exam: SSC JE Civil – 05/06/2024 (Shift-I)"
    },
    {
        type: "Circular Seating Arrangement",
        questionNumber: "Q12",
        question: "In the SSC JE Electrical exam on 06/06/2024 (Shift-II), A, B, C, D, E, F, and G are sitting around a circular table, facing the centre; only 2 people sit between A and D when counted from the left of A, E sits to the immediate left of D, G sits to the immediate left of B, G is not an immediate neighbour of D, and F sits to the immediate left of C; what is the position of B with respect to C?",
        options: ["Third to the left", "Second to the left", "Third to the right", "Second to the right"],
        answer: "Third to the right",
        source: "Exam: SSC JE Electrical – 06/06/2024 (Shift-II)"
    },
    {
        type: "Circular Seating Arrangement",
        questionNumber: "Q13",
        question: "In the SSC JE Electrical exam on 06/06/2024 (Shift-II), E, F, G, H, I, J and K are sitting around a circular table with their backs facing the centre; J is sitting to the immediate left of G, K is sitting to immediate right of E, H is sitting to the immediate right of K, I is sitting to the immediate right of H and immediate left of F, and F is sitting to the immediate left of J; who is an immediate neighbour of both E and J?",
        options: ["K", "H", "F", "G"],
        answer: "G",
        source: "Exam: SSC JE Electrical – 06/06/2024 (Shift-II)"
    },
    {
        type: "Circular Seating Arrangement",
        questionNumber: "Q14",
        question: "In the SSC JE Civil exam on 07/06/2024 (Shift-I), A, B, C, D, P, Q and R are sitting around a circular table, facing the centre; only D sits between B and C, when counted from the left of B, P sits fourth to the right of D, R is an immediate neighbour of both P and C, and Q is not an immediate neighbour of P; how many persons sit between D and A when counted from the left of A?",
        options: ["One", "Three", "Two", "Four"],
        answer: "Two",
        source: "Exam: SSC JE Civil – 07/06/2024 (Shift-I)"
    },
    {
        type: "Circular Seating Arrangement",
        questionNumber: "Q15",
        question: "In the SSC JE Civil exam on 07/06/2024 (Shift-I), L, M, N, D, E, F and G are sitting around a circular table facing the center; only three people sit between F and N when counted from the left of F, only three people sit between L and E when counted from the left of L, only three people sit between G and D when counted from the left of G, D sits immediate left of N, and M is not an immediate neighbor of E; who sits third to the right of M?",
        options: ["D", "E", "G", "F"],
        answer: "F",
        source: "Exam: SSC JE Civil – 07/06/2024 (Shift-I)"
    },
    {
        type: "Circular Seating Arrangement",
        questionNumber: "Q16",
        question: "In the SSC JE Civil exam on 06/06/2024 (Shift-III), A, B, C, D, P, Q, and R are sitting around a circular table, facing the centre; only three people sit between D and R when counted from the right of R, B is an immediate neighbour of both R and Q, P sits second to the left of D, and C is not an immediate neighbour of D; who is sitting third to the right of R?",
        options: ["P", "A", "C", "Q"],
        answer: "A",
        source: "Exam: SSC JE Civil – 06/06/2024 (Shift-III)"
    },
    {
        type: "Circular Seating Arrangement",
        questionNumber: "Q17",
        question: "In the SSC JE Civil exam on 06/06/2024 (Shift-III), P, Q, R, S, T, U and V are sitting around a circular table facing the centre; P is sitting to the immediate left of V, R is sitting to the immediate right of T, U is sitting to the immediate left of P and immediate right of S, Q is sitting to the immediate left of S, and T is sitting to the immediate right of V; who is sitting to the immediate left of Q?",
        options: ["R", "U", "V", "P"],
        answer: "R",
        source: "Exam: SSC JE Civil – 06/06/2024 (Shift-III)"
    },
    {
        type: "Circular Seating Arrangement",
        questionNumber: "Q18",
        question: "In the SSC JE Mechanical exam on 07/06/2024 (Shift-II), seven people – S, O, L, D, I, E, and R – are sitting around a circular table, facing the centre; O sits fourth to the left of E and R sits third to the right of O, L sits to the immediate left of R and to the immediate right of D, and S sits second to the right of R; who are the immediate neighbours of I?",
        options: ["O and L", "S and E", "O and D", "S and O"],
        answer: "S and O",
        source: "Exam: SSC JE Mechanical – 07/06/2024 (Shift-II)"
    },
    {
        type: "Circular Seating Arrangement",
        questionNumber: "Q19",
        question: "In the SSC JE Mechanical exam on 07/06/2024 (Shift-II), Q, R, S, T, U, and V are sitting around a circular table, facing the centre; S sits second to the left of R, Q sits third to the right of S, T is not an immediate neighbour of S, and U sits to the immediate left of S; how many people are sitting between U and R when counted from the right of R?",
        options: ["One", "Two", "Three", "Zero"],
        answer: "Two",
        source: "Exam: SSC JE Mechanical – 07/06/2024 (Shift-II)"
    }
];

export default function SeatingArrangementPage() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const [quizEnded, setQuizEnded] = useState(false);
    const [time, setTime] = useState(0);
    const [isWhiteboardOpen, setIsWhiteboardOpen] = useState(false);

    const activeQuestionRef = useRef<HTMLButtonElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const questionTypes = useMemo(() => [...new Set(mcqData.map(q => q.type))], []);

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

            scrollContainer.scrollTo({
                left: scrollLeft,
                behavior: 'smooth',
            });
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

    const currentQuestion = mcqData[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.answer;
    
    const currentType = mcqData[currentQuestionIndex].type;
    const currentTypeIndex = questionTypes.indexOf(currentType);
    const hasNextType = currentTypeIndex < questionTypes.length - 1;


    if (quizEnded) {
        return (
            <div className="container mx-auto py-12 px-4 md:px-6 flex justify-center items-center h-full">
                 {isWhiteboardOpen && <DrawingCanvas onClose={() => setIsWhiteboardOpen(false)} />}
                <Card className="w-full max-w-xl text-center">
                    <CardHeader>
                        <CardTitle>Quiz Completed!</CardTitle>
                        <CardDescription>You have completed the Seating Arrangement quiz in {formatTime(time)}.</CardDescription>
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
                            {currentQuestion.questionNumber}. {currentQuestion.question}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RadioGroup
                            value={selectedAnswer ?? undefined}
                            onValueChange={setSelectedAnswer}
                            disabled={showAnswer}
                        >
                            {currentQuestion.options.map((option, index) => (
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
                                        {index + 1}
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
