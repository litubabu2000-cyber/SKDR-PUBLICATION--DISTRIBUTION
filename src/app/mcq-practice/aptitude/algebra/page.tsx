'use client';

import { Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight, CheckCircle, Lightbulb, XCircle } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const mcqData = [
    {
        type: "Type 1",
        questionNumber: 1,
        question: "If 5x+3y=15 and 2xy=6 then the value of 5x–3y will be :",
        options: ["3√5", "3√4", "3√3", "3√2"],
        answer: "3√5",
        source: "SSC CHSL (Tier-I) 02/08/2023 (Shift-I)"
    },
    {
        type: "Type 1",
        questionNumber: 2,
        question: "If 4x² + y² = 40 and xy=6 then find the value of 2x+y",
        options: ["4", "8", "6", "5"],
        answer: "8",
        source: "SSC CGL (Mains) 06/03/2023"
    },
    {
        type: "Type 1",
        questionNumber: 3,
        question: "For what value of m will the system of equation 18x–72y+13=0 and 7x–my–17=0 have no solutions?",
        options: ["24", "12", "9", "28"],
        answer: "28",
        source: "SSC CGL (Mains) 06/03/2023"
    },
    {
        type: "Type 1",
        questionNumber: 4,
        question: "Simplify the problem (3x+2y)² –(3x–2y)².",
        options: ["9x²–4y²", "12xy", "18x²–8y²", "24xy"],
        answer: "24xy",
        source: "SSC CHSL (Tier-I) 10/08/2023 (Shift-I)"
    },
    {
        type: "Type 1",
        questionNumber: 5,
        question: "For what value of m will the system of equation 17x+my+102=0 and 23x+299y+138=0 have infinite number of solutions?",
        options: ["221", "223", "220", "219"],
        answer: "221",
        source: "SSC CGL (Mains) 02/03/2023"
    },
    {
        type: "Type 1",
        questionNumber: 6,
        question: "If x+y+3=0 then find the value of x³+y³–9xy+9",
        options: ["18", "–36", "36", "–18"],
        answer: "–18",
        source: "SSC MTS 01/09/2023 (Shift Ist)"
    },
    {
        type: "Type 1",
        questionNumber: 8,
        question: "What will be the solution of following system of linear equations? 3x−9y+4z=5; 2x+7y+z=12; 3x−z=0",
        options: ["x= 150/143, y= 30/31, z= 51/143", "x= 150/143, y= 37/31, z= 50/143", "x= 150/143, y= 30/31, z= 50/143", "x= 150/137, y= 30/31, z= 50/143"],
        answer: "x= 150/143, y= 30/31, z= 50/143",
        source: "SSC Selection Posts XI-28/06/2023 (Shift-III)"
    },
    {
        type: "Type 1",
        questionNumber: 9,
        question: "If 2a+b=10 and 2ab=9 then, the value of (2a–b) will be:",
        options: ["10", "4", "8", "6"],
        answer: "8",
        source: "SSC Selection Posts XI-28/06/2023 (Shift-III)"
    },
    {
        type: "Type 1",
        questionNumber: 7,
        question: "If (√2 + √5 - √3) × k = -12, then what is the value of k?",
        options: ["√2 + √5 + √3", " (√2 + √5 + √3)(2 - √10)", "(√2 + √5 - √3)(2 + √10)", " (√2 + √5 + √3)(2 + √10)"],
        answer: " (√2 + √5 + √3)(2 - √10)",
        source: "SSC CGL (Tier-II) 29/01/2022 (Shift-I)"
    },
    {
        type: "Type 1",
        questionNumber: 11,
        question: "If a–b=3 and a³–b³=999, then find the value of a²–b².",
        options: ["60", "62", "64", "63"],
        answer: "63",
        source: "SSC CHSL 03/06/2022 (Shift- II)"
    },
    {
        type: "Type 1",
        questionNumber: 12,
        question: "If x,y,z are three integers such that x+y=8,y+z=13 and z+x=17, then the value of x²/yz is:",
        options: ["1", "18/11", "0", "7/5"],
        answer: "18/11",
        source: "SSC CGL (Tier-I)-2019–03/03/2020 (Shift-I)"
    },
    {
        type: "Type 1",
        questionNumber: 20,
        question: "A man buys 2 apples and 3 kiwi fruits for ₹37. If he buys 4 apples and 5 kiwi fruits for ₹67, then what will be the total cost of 1 apple and 1 kiwi fruit?",
        options: ["₹20", "₹18", "₹15", "₹28"],
        answer: "₹18",
        source: "SSC CHSL –17/03/2020 (Shift-II)"
    },
    {
        type: "Type 1",
        questionNumber: 21,
        question: "If u+v=84 and u–v=4, then u:v is equal to?",
        options: ["11 : 10", "10 : 11", "10 : 9", "9 : 10"],
        answer: "11 : 10",
        source: "SSC MTS 19/08/2019 (Shift-II)"
    },
    {
        type: "Type 1",
        questionNumber: 22,
        question: "The sum and difference of two numbers is 27 and 3 respectively. What is the ratio of two numbers?",
        options: ["5 : 3", "2 : 1", "4 : 7", "5 : 4"],
        answer: "5 : 4",
        source: "SSC MTS 16/08/2019 (Shift-III)"
    },
    {
        type: "Type 1",
        questionNumber: 10,
        question: "If 2x+3y–5z=18, 3x+2y+z=29 and x+y+3z=17, then what is the value of xy+yz+zx?",
        options: ["32", "52", "64", "46"],
        answer: "46",
        source: "SSC CGL (Tier-II) 21-02-2018"
    },
    {
        type: "Type 1",
        questionNumber: 13,
        question: "If 3x+6y+9z= 20/3 , 6x+9y+3z= 17/3 and 18x+27y–z= 113/9 , then what is the value of 75x+113y?",
        options: ["163/3", "143/6", "218/9", "311/3"],
        answer: "163/3",
        source: "SSC CGL (Tier-II) 9-3-2018"
    },
    {
        type: "Type 1",
        questionNumber: 14,
        question: "If 3x+4y–2z+9=17, 7x+2y+11z+8=23 and 5x+9y+6z–4=18, then what is the value of x+y+z–34?",
        options: ["–28", "–14", "–31", "–45"],
        answer: "–31",
        source: "SSC CGL (Tier-II) 20-02-2018"
    },
    {
        type: "Type 1",
        questionNumber: 15,
        question: "If (x+y)/z=2, (y+z)/x=3/2 and (z+x)/y=3, then what is the value of 46x+131y?",
        options: ["414", "364", "384", "464"],
        answer: "414",
        source: "SSC CGL (Tier-II) 20-02-2018"
    },
    {
        type: "Type 1",
        questionNumber: 16,
        question: "If 3x+4y–11=18 and 8x–6y+12=6, then what is the value of 5x–3y–9?",
        options: ["18", "–9", "–27", "–18"],
        answer: "–9",
        source: "SSC CGL (Tier-II) 19-02-2018"
    },
    {
        type: "Type 1",
        questionNumber: 17,
        question: "If a+b+c= 7/12, 3a–4b+5c= 3/4 and 7a–11b–13c=– 7/12, then what is the value of a+c?",
        options: ["1/2", "5/12", "3/4", "1/4"],
        answer: "1/2",
        source: "SSC CGL (Tier-II) 19-02-2018"
    },
    {
        type: "Type 1",
        questionNumber: 18,
        question: "If x–4y=0 and x+2y=24, then what is the value of (2x+3y)/(2x–3y)?",
        options: ["9/5", "11/5", "13/7", "9/7"],
        answer: "11/5",
        source: "SSC CGL (Tier-II) 18-02-2018"
    },
    {
        type: "Type 1",
        questionNumber: 19,
        question: "If 3x+5y+7z=49 and 9x+8y+21z=126, then what is the value of y?",
        options: ["4", "2", "3", "5"],
        answer: "3",
        source: "SSC CGL (Tier-II) 17-2-2018"
    },
    {
        type: "Type 1",
        questionNumber: 23,
        question: "If the difference of two numbers is 7 and the difference of their squares is 203, then what is the smaller number?",
        options: ["10", "9", "12", "11"],
        answer: "11",
        source: "SSC MTS 9-10-2017 (Shift-II)"
    }
];

export default function AlgebraPage() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const [quizEnded, setQuizEnded] = useState(false);

    const activeQuestionRef = useRef<HTMLButtonElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const questionTypes = useMemo(() => [...new Set(mcqData.map(q => q.type))], []);


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
                <Card className="w-full max-w-xl text-center">
                    <CardHeader>
                        <CardTitle>Quiz Completed!</CardTitle>
                        <CardDescription>You have completed the Algebra (SSC) quiz.</CardDescription>
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
            <div className="md:w-1/2 mx-auto">
                <Card>
                    <CardHeader>
                        <p className="text-sm font-semibold text-primary mb-2">{currentQuestion.type}</p>
                        <CardDescription>{currentQuestion.source}</CardDescription>
                        <CardTitle className="font-body text-xl leading-relaxed">
                            Q{currentQuestion.questionNumber}. {currentQuestion.question}
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
                            {hasNextType && (
                                <Button
                                    onClick={handleNextType}
                                    variant="outline"
                                >
                                    Next Type
                                </Button>
                            )}
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
