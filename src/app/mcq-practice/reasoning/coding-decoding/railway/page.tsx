'use client';

import { Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight, CheckCircle, Lightbulb, XCircle } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Whiteboard } from "@/components/whiteboard";

const mcqData = [
    {
        type: "Letter/Word to Number Coding (Simple Addition/Positional)",
        questionNumber: 1,
        question: "If A is equal to 1, M is equal to 13 and R is equal 18, how would you spell MISSION?",
        options: ["129191991314", "149191991314", "139191991514", "139191991314"],
        source: "RRB NTPC – 08/01/2021 (Shift-II) Stage I",
        answer: "139191991314"
    },
    {
        type: "Letter/Word to Number Coding (Simple Addition/Positional)",
        questionNumber: 2,
        question: "If LOVE is coded as 54, then what will be the code for TEAR?",
        options: ["43", "45", "46", "44"],
        source: "RRB NTPC – 10/01/2021 (Shift-I) Stage I",
        answer: "44"
    },
    {
        type: "Letter/Word to Number Coding (Simple Addition/Positional)",
        questionNumber: 3,
        question: "If A = 26 and H = 19, then FASHION = ?",
        options: ["2126819181217", "2126819181215", "2126819181213", "2126819181214"],
        source: "RRB NTPC – 11/01/2021 (Shift-I) Stage I",
        answer: "2126819181213"
    },
    {
        type: "Letter/Word to Number Coding (Simple Addition/Positional)",
        questionNumber: 4,
        question: "If Charger = 60, then Topper = ?",
        options: ["40", "90", "26", "52"],
        source: "RRB NTPC – 30/01/2021 (Shift-I) Stage I",
        answer: "90"
    },
    {
        type: "Letter/Word to Number Coding (Simple Addition/Positional)",
        questionNumber: 5,
        question: "If J = 17 and N = 13, then JUNIOR = ?",
        options: ["1751318129", "1771318129", "1741318129", "1761318129"],
        source: "RRB NTPC – 13/01/2021 (Shift-I) Stage I",
        answer: "1761318129"
    },
    {
        type: "Letter/Word to Number Coding (Simple Addition/Positional)",
        questionNumber: 6,
        question: "If ACE = 35, AGED = 91 then CARE = ?",
        options: ["359", "323", "288", "358"],
        source: "RRB NTPC – 17/01/2021 (Shift-II) Stage I",
        answer: "358"
    },
    {
        type: "Letter/Word to Number Coding (Simple Addition/Positional)",
        questionNumber: 7,
        question: "If in a certain code language A is written as 1 and AIR is written as 28, then how will AIRCRAFT be written in that language?",
        options: ["76", "78", "82", "80"],
        source: "RRB NTPC – 23/07/2021 (Shift-II) Stage I",
        answer: "76"
    },
    {
        type: "Letter/Word to Number Coding (Simple Addition/Positional)",
        questionNumber: 8,
        question: "If AMBER = 27 and BROWN = 14, then GREEN will equal to:",
        options: ["28", "36", "39", "24"],
        source: "RRB NTPC – 28/12/2020 (Shift-II) Stage I",
        answer: "24"
    },
    {
        type: "Letter/Word to Number Coding (Simple Addition/Positional)",
        questionNumber: 9,
        question: "If A is equal to 1, S is equal to 19 and G is equal to 7, how would you spell 'MASSAGE'?",
        options: ["1311919175", "1311919277", "1311945355", "1311945375"],
        source: "RRB NTPC – 09/01/2021 (Shift-II) Stage I",
        answer: "1311919175"
    },
    {
        type: "Letter/Word to Number Coding (Simple Addition/Positional)",
        questionNumber: 10,
        question: "In a certain code language, 'JUNIOR' is written as '6', 'LABOURER' is written as '8'. What is the code for 'JOSEPHINE' in that code language?",
        options: ["9", "11", "10", "12"],
        source: "RRB NTPC – 21/01/2021 (Shift-II) Stage I",
        answer: "9"
    },
    {
        type: "Letter/Word to Number Coding (Simple Addition/Positional)",
        questionNumber: 11,
        question: "In a certain code language, 'RAHUL' is written as '60'. How will 'ARUN' be written as in that language?",
        options: ["45", "56", "52", "54"],
        source: "RRB NTPC – 11/01/2021 (Shift-II) Stage I",
        answer: "54"
    },
    {
        type: "Letter/Word to Number Coding (Simple Addition/Positional)",
        questionNumber: 12,
        question: "If BED is coded as 42516, then DIG will be coded as:",
        options: ["1625363", "253681", "168149", "161894"],
        source: "RRB NTPC – 23/01/2021 (Shift-I) Stage I",
        answer: "168149"
    },
    {
        type: "Letter/Word to Number Coding (Simple Addition/Positional)",
        questionNumber: 13,
        question: "In a certain code language 'NATION' is written as '72' and 'NATURE' is written as 78. How will 'PACKED' be written as in that code language?",
        options: ["41", "45", "39", "43"],
        source: "RRB NTPC – 12/03/2021 (Shift-I) Stage I",
        answer: "41"
    },
    {
        type: "Letter/Word to Number Coding (Simple Addition/Positional)",
        questionNumber: 14,
        question: "In a code language, if KARAN is written as 45, then how will ARUN be written as in that language?",
        options: ["54", "56", "41", "42"],
        source: "RRB NTPC – 08/01/2021 (Shift-II) Stage I",
        answer: "54"
    },
    {
        type: "Letter/Word to Number Coding (Simple Addition/Positional)",
        questionNumber: 15,
        question: "In a certain code language, SCHOOL is coded as the number 72. What number will FLOWER be coded as in that language?",
        options: ["54", "79", "71", "89"],
        source: "RRB NTPC – 15/03/2021 (Shift-I) Stage I",
        answer: "79"
    },
    {
        type: "Letter/Word to Number Coding (Simple Addition/Positional)",
        questionNumber: 16,
        question: "In a certain code language, 'QZDH' is written as '51', 'PLMQ' is written as '54'. What is the code for 'DNRB' in that code language?",
        options: ["37", "33", "34", "36"],
        source: "RRB NTPC – 15/03/2021 (Shift-I) Stage I",
        answer: "37"
    },
    {
        type: "Letter/Word to Number Coding (Simple Addition/Positional)",
        questionNumber: 17,
        question: "In a certain code language 'RQN' is coded as 53, 'DLP' is coded as 36. How will 'SRF' be written in that code language?",
        options: ["47", "51", "53", "49"],
        source: "RRB NTPC – 05/04/2021 (Shift-II) Stage I",
        answer: "43"
    },
    {
        type: "Letter/Word to Number Coding (Simple Addition/Positional)",
        questionNumber: 18,
        question: "In a certain code language, if 'CELL' is coded as '32' and 'PHONE' is coded as '58', how will 'BOLD' be coded in that language?",
        options: ["43", "54", "32", "33"],
        source: "RRB NTPC (Stage-II) – 17/06/2022 (Shift-I)",
        answer: "33"
    },
    {
        type: "Letter/Word to Number Coding (Simple Addition/Positional)",
        questionNumber: 19,
        question: "In a certain code language, TOTAL is written as 68 and PEN is written as 35. In the same language, what will OIL be written as?",
        options: ["36", "46", "56", "66"],
        source: "RRB NTPC (Stage-II) – 17/06/2022 (Shift-II)",
        answer: "36"
    },
    {
        type: "Letter/Word to Number Coding (Simple Addition/Positional)",
        questionNumber: 20,
        question: "In a certain code language, 'FRAK' is coded as '35' and 'MALT' is coded as '45'. How will 'TRIM' be coded in that language?",
        options: ["58", "61", "59", "60"],
        source: "RRB NTPC (Stage-II) – 13/06/2022 (Shift-I)",
        answer: "60"
    },
    {
        type: "Letter/Word to Number Coding (Simple Addition/Positional)",
        questionNumber: 21,
        question: "In a certain code language, PENINSULA is written as 111. How will DICHOTOMY be written as in that language?",
        options: ["222", "121", "212", "112"],
        source: "RRB NTPC – 30/12/2020 (Shift-I) Stage I",
        answer: "112"
    },
    {
        type: "Letter/Word to Number Coding (Complex Rules or Patterns)",
        questionNumber: 22,
        question: "In a certain code language, BUTTER is written as 2212020518. MINED is written as 1391454. How will OIL be written in that language?",
        options: ["17456", "12345", "15912", "18632"],
        source: "RRB NTPC (Stage-II) – 17/06/2022 (Shift-III)",
        answer: "15912"
    },
    {
        type: "Letter/Word to Number Coding (Complex Rules or Patterns)",
        questionNumber: 23,
        question: "'TABLE' is related to '726251522' and 'FORMS' is related to '21129148', in the same way as 'CHAIR' is related to '________'.",
        options: ["241926189", "241926198", "241296189", "214926189"],
        source: "RRB NTPC (Stage-II) – 16/06/2022 (Shift-I)",
        answer: "241926189"
    },
    {
        type: "Letter/Word to Number Coding (Complex Rules or Patterns)",
        questionNumber: 24,
        question: "In a certain coded language \"ARCHITECT\" has been written as 32051011227522. Then in same language \"MANAGER\" would be written as:",
        options: ["1531537918", "1311473718", "1531639720", "1311963720"],
        source: "RRB NTPC – 26/07/2021 (Shift-II) Stage I",
        answer: "1531537918"
    },
    {
        type: "Letter/Word to Number Coding (Complex Rules or Patterns)",
        questionNumber: 25,
        question: "In a certain code language, ACCESS is written as 13351919. How will EXCELLENCE be coded as in that language?",
        options: ["524351414355", "53351414123435", "52345121414335", "52345121251435"],
        source: "RRB NTPC – 28/12/2020 (Shift-II) Stage I",
        answer: "524351414355"
    },
    {
        type: "Letter/Word to Number Coding (Complex Rules or Patterns)",
        questionNumber: 26,
        question: "In a certain code language, HONEY is coded as 8-12-13-5-2. How will PATCH be coded in that code language?",
        options: ["16-1-20-3-18", "11-1-20-3-8", "11-1-7-3-8", "16-1-7-3-8"],
        source: "RRB NTPC – 18/01/2021 (Shift-II) Stage I",
        answer: "11-1-7-3-8"
    },
    {
        type: "Letter/Word to Number Coding (Complex Rules or Patterns)",
        questionNumber: 27,
        question: "In a certain code language, GOLDEN CIRCLE is written as 715124514 39183125. How will ENGLAND be written as in that language?",
        options: ["5147112114", "5174121144", "5147121144", "5174111114"],
        source: "RRB NTPC – 27/01/2021 (Shift-II) Stage I",
        answer: "5147121144"
    },
    {
        type: "Letter/Word to Number Coding (Complex Rules or Patterns)",
        questionNumber: 28,
        question: "In a certain code language, if HOUSE is coded as 10-13-23-17-7, then REHEARSE will be coded as?",
        options: ["20-7-10-7-3-20-21-7", "16-3-6-3-25-16-17-3", "20-3-10-3-3-16-21-3", "18-5-8-5-1-18-19-5"],
        source: "RPF Constable – 25/01/2019 (Shift-II)",
        answer: "16-3-6-3-25-16-17-3"
    },
    {
        type: "Letter/Word to Number Coding (Complex Rules or Patterns)",
        questionNumber: 29,
        question: "If in a certain code language, 'STARE' is written as 19201185, how will the word MOULD be written in that code language?",
        options: ["132115124", "131215214", "131521124", "131512214"],
        source: "RRB NTPC – 09/04/2016 (Shift-3)",
        answer: "131521124"
    },
    {
        type: "Letter/Word to Number Coding (Complex Rules or Patterns)",
        questionNumber: 30,
        question: "If in a certain code language, PROMOTION is written as 365458957, how will the word MONITOR be written in that code language?",
        options: ["4579856", "4578956", "4597866", "4578596"],
        source: "RRB NTPC – 12/04/2016 (Shift-3)",
        answer: "4579856"
    },
    {
        type: "Letter/Word to Number Coding (Complex Rules or Patterns)",
        questionNumber: 31,
        question: "In a certain code language, 'CHERRY' is coded as '6-16-10-36-36-50', and 'GRAPES' is coded as '14-36-2-32-10-38'. How will 'LITCHI' be coded in that language?",
        options: ["26-18-38-6-16-18", "26-18-40-6-16-18", "24-18-40-6-16-18", "24-16-40-6-18-16"],
        source: "RRB NTPC (Stage-II) – 15/06/2022 (Shift-II)",
        answer: "24-18-40-6-16-18"
    },
    {
        type: "Letter/Word to Symbol Coding",
        questionNumber: 32,
        question: "In a certain code language, CABLE is coded as 65@7# and PARKLET is coded as 85917#2. How will ELRAP be coded in that language?",
        options: ["#9587", "9#785", "#7958", "7#958"],
        source: "RRB NTPC (Stage-II) – 17/06/2022 (Shift-III)",
        answer: "7#958"
    },
    {
        type: "Letter/Word to Symbol Coding",
        questionNumber: 33,
        question: "In a certain code language 'EXTRANET' is written as 9#416394 and 'TECHNOLOGY' as 492735850#. How will the word 'TOLERANCE' be written in that code language?",
        options: ["458913629", "459813629", "458916329", "549816329"],
        source: "RRB NTPC – 12/04/2016 (Shift-1)",
        answer: "458916329"
    },
    {
        type: "Letter/Word to Symbol Coding",
        questionNumber: 34,
        question: "If ARC is coded as $@* and HIT is coded as #&%, then CHAIR will be coded as?",
        options: ["#* & $@", "#*$&%", "*#$&@", "*#$&%"],
        source: "RPF SI – 10/01/2019 (Shift-II)",
        answer: "*#$&@"
    },
    {
        type: "Number/Word to Number/Word Coding (Based on Logic/Operation)",
        questionNumber: 35,
        question: "If the sum of number-clusters 395 and 727 is represented as 101112; and by the same code, the sum of 276 and 957 is 111213, then what is the code for sum of 689 and 877?",
        options: ["141312", "131415", "121314", "141516"],
        source: "RRB NTPC – 11/01/2021 (Shift-I) Stage I",
        answer: "141516"
    },
    {
        type: "Number/Word to Number/Word Coding (Based on Logic/Operation)",
        questionNumber: 36,
        question: "If 67 = 1764 and 93 = 729, then what is 74 = ?",
        options: ["847", "784", "567", "972"],
        source: "RRB NTPC – 13/01/2021 (Shift-I) Stage I",
        answer: "784"
    },
    {
        type: "Number/Word to Number/Word Coding (Based on Logic/Operation)",
        questionNumber: 37,
        question: "If 7 + 8 + 9 = 798 and 4 + 6 + 8 = 486, then what is 5 + 2 + 4 = ?",
        options: ["524", "452", "425", "542"],
        source: "RRB NTPC – 27/03/2021 (Shift-II) Stage I",
        answer: "542"
    },
    {
        type: "Number/Word to Number/Word Coding (Based on Logic/Operation)",
        questionNumber: 38,
        question: "If 31 C 19 D 57 = 93 and 52 C 13 D 5 = 20, then 98 C 14 D 11 = ?",
        options: ["79", "75", "77", "73"],
        source: "RRB NTPC – 15/02/2021 (Shift-II) Stage I",
        answer: "77"
    },
    {
        type: "Number/Word to Number/Word Coding (Based on Logic/Operation)",
        questionNumber: 39,
        question: "Select the number that replaces (?): 199 = 18, 267 = 19, 456 = 26, then 678 = ?",
        options: ["55", "52", "50", "56"],
        source: "RRB NTPC – 02/03/2021 (Shift-II) Stage I",
        answer: "55"
    }
];

export default function CodingDecodingRailwayPage() {
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
                        <CardDescription>You have completed the Coding-Decoding (Railway) quiz.</CardDescription>
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
            <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2">
                    <Card>
                        <CardHeader>
                            <p className="text-sm font-semibold text-primary mb-2">{currentQuestion.type}</p>
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

                <div className="md:w-1/2 mt-8 md:mt-0">
                    <Whiteboard />
                </div>
            </div>
        </div>
    );
}
