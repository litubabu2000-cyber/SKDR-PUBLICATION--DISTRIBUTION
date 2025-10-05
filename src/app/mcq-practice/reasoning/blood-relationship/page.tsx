
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";

const mcqData = [
    {
        type: "TYPE–I",
        questionNumber: 1,
        question: "A is B’s daughter. B is C’s mother. D is C’s brother. How is D related to A ?",
        options: ["Father", "Grandfather", "Brother", "Son"],
        source: "SSC Combined Graduate Level Prelim Exam. 04.07.1999 (Ist Sitting)",
        answer: "Brother"
    },
    {
        type: "TYPE–I",
        questionNumber: 2,
        question: "P is Q’s brother. R is Q’s mother. S is R’s father. T is S’s mother. How is P related to T ?",
        options: ["Granddaughter", "Great grandson", "Grandson", "Grandmother"],
        source: "SSC Combined Graduate Level Prelim Exam. 04.07.1999 (IInd Sitting)",
        answer: "Great grandson"
    },
    {
        type: "TYPE–I",
        questionNumber: 3,
        question: "A is B’s brother. C is D’s father. E is B’s mother. A and D are brothers. How is E related to C?",
        options: ["Sister", "Sister-in-law", "Niece", "Wife"],
        source: "SSC Combined Graduate Level Prelim Exam. 24.02.2002 (Ist Sitting)",
        answer: "Wife"
    },
    {
        type: "TYPE–I",
        questionNumber: 4,
        question: "A is the sister of B. B is the brother of C, C is the son of D. How is D related to A?",
        options: ["Mother", "Daughter", "Son", "Uncle"],
        source: "SSC Combined Graduate Level Prelim Exam. 24.02.2002 (IInd Sitting)",
        answer: "Mother"
    },
    {
        type: "TYPE–I",
        questionNumber: 5,
        question: "B is is the brother of A, whose only sister is mother of C. D is maternal grandmother of C. How is A related to D ?",
        options: ["Daughter-in-law", "Daughter", "Aunt", "Nephew"],
        source: "SSC Combined Graduate Level Prelim Exam. 24.02.2002 (Middle Zone)",
        answer: "Daughter"
    },
    {
        type: "TYPE–I",
        questionNumber: 6,
        question: "A and B are sisters. R and S are brothers. A’s daughter is R’s sister. What is B’s relation to S ?",
        options: ["Mother", "Grandmother", "Sister", "Aunt"],
        source: "SSC Combined Graduate Level Prelim Exam.11.05.2003 (Ist Sitting)",
        answer: "Aunt"
    },
    {
        type: "TYPE–I",
        questionNumber: 7,
        question: "E is the sister of B. A is the father of C. B is the son of C. How is A related to E ?",
        options: ["Grandfather", "Granddaughter", "Father", "Great-grandfather"],
        source: "SSC Combined Graduate Level Prelim Exam.11.05.2003 (Ist Sitting)",
        answer: "Grandfather"
    },
    {
        type: "TYPE–I",
        questionNumber: 8,
        question: "A is B’s brother, C is A’s mother, D is C’s father, E is B’s son. How is D related to A ?",
        options: ["Son", "Grandson", "Grandfather", "Great Grandfather"],
        source: "SSC CPO Sub-Inspector Exam. 07.09.2003)",
        answer: "Grandfather"
    },
    {
        type: "TYPE–I",
        questionNumber: 9,
        question: "Given that A is the mother of B, C is the son of A, D is the brother of E, E is the daughter of B. Who is the grandmother of D ?",
        options: ["A", "B", "C", "D"],
        source: "SSC Combined Graduate Level Prelim Exam. 08.02.2004 (IInd Sitting)",
        answer: "A"
    },
    {
        type: "TYPE–I",
        questionNumber: 10,
        question: "A is D’s brother. D is B’s father. B and C are sisters. How is A related to C ?",
        options: ["Son", "Grandson", "Father", "Uncle"],
        source: "SSC CPO Sub-Inspector Exam. 05.09.2004)",
        answer: "Uncle"
    }
];

export default function BloodRelationshipPage() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>(Array(mcqData.length).fill(''));
    const [showScore, setShowScore] = useState(false);

    const currentQuestion = mcqData[currentQuestionIndex];

    const handleNext = () => {
        if (currentQuestionIndex < mcqData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setShowScore(true);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };
    
    const handleAnswerSelect = (answer: string) => {
        const newAnswers = [...selectedAnswers];
        newAnswers[currentQuestionIndex] = answer;
        setSelectedAnswers(newAnswers);
    };

    const calculateScore = () => {
        return selectedAnswers.reduce((score, selectedAnswer, index) => {
            if (selectedAnswer === mcqData[index].answer) {
                return score + 1;
            }
            return score;
        }, 0);
    };

    const restartQuiz = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswers(Array(mcqData.length).fill(''));
        setShowScore(false);
    };

    return (
        <div className="container mx-auto py-12 px-4 md:px-6">
            <div className="space-y-4 text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold font-headline">Blood Relationship MCQs</h1>
                <p className="text-muted-foreground md:text-xl">Practice questions for competitive exams.</p>
            </div>
            
            <div className="max-w-2xl mx-auto">
                {showScore ? (
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-center text-2xl">Quiz Completed!</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                            <CheckCircle className="mx-auto size-16 text-green-500 mb-4" />
                            <p className="text-4xl font-bold">
                                Your score: {calculateScore()} / {mcqData.length}
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={restartQuiz} className="w-full">
                                Try Again
                            </Button>
                        </CardFooter>
                    </Card>
                ) : (
                    <Card>
                        <CardHeader>
                            <CardTitle>Question {currentQuestion.questionNumber}</CardTitle>
                            <CardDescription>{currentQuestion.source}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="font-semibold mb-4 text-lg">{currentQuestion.question}</p>
                            <RadioGroup 
                                value={selectedAnswers[currentQuestionIndex]}
                                onValueChange={handleAnswerSelect}
                            >
                                {currentQuestion.options.map((option, index) => (
                                    <div key={index} className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted/50 transition-colors">
                                        <RadioGroupItem value={option} id={`q${currentQuestion.questionNumber}-op${index}`} />
                                        <Label htmlFor={`q${currentQuestion.questionNumber}-op${index}`} className="flex-1 cursor-pointer">{option}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
                                <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                            </Button>
                            <p className="text-sm text-muted-foreground">{currentQuestionIndex + 1} / {mcqData.length}</p>
                            <Button onClick={handleNext}>
                                {currentQuestionIndex === mcqData.length - 1 ? 'Finish' : 'Next'}
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </Card>
                )}
            </div>
        </div>
    );
}
