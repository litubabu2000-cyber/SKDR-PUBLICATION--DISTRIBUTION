'use client';

import { Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight, CheckCircle, Lightbulb, XCircle, Timer } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const mcqData = [
    {
        type: "2024",
        questionNumber: 1,
        question: "Arrange the following words in the order in which they appear in an English dictionary: 1. Clamp 2. Clan 3. Clank 4. Clang 5. Clap",
        options: ["1,2,4,5,3", "1,2,4,3,5", "1,2,3,5,4", "1,2,3,4,5"],
        answer: "1,2,4,5,3",
        source: "Exam: SSC GD – 05/03/2024 (Shift-I)"
    },
    {
        type: "2024",
        questionNumber: 2,
        question: "Arrange the following words in the order in which they would appear in an English dictionary: 1. Dire 2. Dirt 3. Dirk 4. Direct 5. Dirge",
        options: ["3,2,5,1,4", "1,4,5,2,3", "1,4,5,3,2", "3,2,5,4,1"],
        answer: "3,2,5,1,4",
        source: "Exam: SSC GD – 07/03/2024 (Shift-IV)"
    },
    {
        type: "2024",
        questionNumber: 3,
        question: "Arrange the following words in the order in which they appear in an English dictionary: 1. Helical 2. Helium 3. Heighten 4. Hellenic 5. Heiress",
        options: ["41352", "35124", "53412", "43152"],
        answer: "35124",
        source: "Exam: SSC JE Electrical – 07/06/2024 (Shift-III)"
    },
    {
        type: "2024",
        questionNumber: 4,
        question: "Arrange the following words in the sequence in which they would appear in an English dictionary: 1. Painter 2. Pace 3. Pair 4. Package 5. Paragraph",
        options: ["2,4,1,3,5", "2,1,5,4,3", "1,5,4,3,2", "1,2,3,4,5"],
        answer: "2,4,1,3,5",
        source: "Exam: SSC Selection Posts XII – 24/06/2024 (Shift-III)"
    },
    {
        type: "2024",
        questionNumber: 5,
        question: "Arrange the following words as they would appear in an English dictionary: 1. Expert 2. Exotic 3. Explicit 4. Expense 5. Expanse",
        options: ["3,4,5,1,2", "4,2,5,1,3", "2,5,4,1,3", "3,5,2,1,4"],
        answer: "3,5,2,1,4",
        source: "Exam: SSC Selection Posts XII – 20/06/2024 (Shift-I)"
    },
    {
        type: "2024",
        questionNumber: 6,
        question: "Arrange the following words as they would appear in an English dictionary: 1. Neural 2. Newspaper 3. Neglect 4. Newfound 5. Neutron 6. Nephew",
        options: ["3,6,1,4,5,2", "3,6,5,1,4,2", "3,1,6,5,4,2", "3,6,1,5,4,2"],
        answer: "3,6,1,5,4,2",
        source: "Exam: SSC Selection Posts XII – 20/06/2024 (Shift-I)"
    },
    {
        type: "2024",
        questionNumber: 7,
        question: "Arrange the following words in the sequence in which they appear in an English dictionary. 1. Masterstroke 2. Malnutrition 3. Marigold 4. Magical 5. Magnify",
        options: ["3,4,5,2,1", "2,4,5,3,1", "5,4,2,3,1", "4,5,2,3,1"],
        answer: "4,5,2,3,1",
        source: "Exam: SSC Selection Posts XII – 25/06/2024 (Shift-III)"
    },
    {
        type: "2023",
        questionNumber: 8,
        question: "Which of the following options represents the correct order of the given words as they would appear in an English dictionary? 1. Labial 2. Labefaction 3. Laboratory 4. Label 5. Labile",
        options: ["2,4,5,1,3", "4,2,1,5,3", "2,4,1,5,3", "4,2,5,1,3"],
        answer: "2,4,1,5,3",
        source: "Exam: SSC Selection Post Phase-XI – 30/06/2023 (Shift-I)"
    },
    {
        type: "2023",
        questionNumber: 9,
        question: "Which of the following options represents the correct order of the given words as they would appear in an English dictionary? 1. Refine 2. Reflect 3. Referendum 4. Refill 5. Refinery",
        options: ["4,2,1,3,5", "4,3,5,1,2", "3,4,1,5,2", "4,1,2,5,3"],
        answer: "4,3,5,1,2",
        source: "Exam: SSC Selection Post Phase-XI – 30/06/2023 (Shift-I)"
    },
    {
        type: "2023",
        questionNumber: 10,
        question: "Arrange the following words in the order in which they appear in the English dictionary. 1. Emigrant 2. Emissary 3. Embolden 4. Embezzle 5. Eminence 6. Empathize 7. Emphatic",
        options: ["4,3,2,1,6,7,5", "4,2,3,1,5,6,7", "4,3,1,5,2,6,7", "4,3,2,5,1,7,6"],
        answer: "4,3,2,5,1,7,6",
        source: "Exam: SSC Selection Posts XI – 28/06/2023 (Shift-III)"
    },
    {
        type: "2023",
        questionNumber: 11,
        question: "Arrange the following words in the order in which they appear in the English dictionary. 1. Dash 2. Damage 3. Darkness 4. Damp 5. Danger 6. Dancer",
        options: ["2,4,6,5,3,1", "2,4,5,6,3,1", "4,2,6,5,3,1", "2,4,1,5,3,6"],
        answer: "2,4,5,6,3,1",
        source: "Exam: SSC Selection Posts XI – 28/06/2023 (Shift-III)"
    },
    {
        type: "2023",
        questionNumber: 12,
        question: "Which of the following options represents the correct order of the given words as they would appear in an English dictionary? 1. Bunion 2. Bureau 3. Bundle 4. Bunting 5. Bungle",
        options: ["4,5,1,3,2", "4,5,3,1,2", "3,5,1,4,2", "5,3,4,2,1"],
        answer: "3,5,1,4,2",
        source: "Exam: SSC Selection Posts XI – 27/06/2023 (Shift-I)"
    },
    {
        type: "2023",
        questionNumber: 13,
        question: "Arrange the following words in the order in which they appear in an English dictionary: 1. Devoted 2. Determine 3. Devastating 4. Diaphragm 5. Diagnose 6. Different",
        options: ["2,3,1,5,4,6", "2,1,5,4,6,3", "2,3,1,5,6,4", "2,3,1,4,6,5"],
        answer: "2,3,1,5,6,4",
        source: "Exam: SSC Selection Posts XI – 27/06/2023 (Shift-I)"
    },
    {
        type: "2023",
        questionNumber: 14,
        question: "Arrange the following words in the order in which they would appear in an English dictionary. 1. Demography 2. Denial 3. Demonstrate 4. Dense 5. Demolish",
        options: ["1,3,5,2,4", "1,5,3,4,2", "1,5,3,2,4", "1,5,2,3,4"],
        answer: "1,5,3,2,4",
        source: "Exam: SSC JE Mechanical – 11/10/2023 (Shift-II)"
    },
    {
        type: "2023",
        questionNumber: 15,
        question: "Select the option that represents the correct order of the given words as they would appear in an English dictionary. 1. Manager 2. Maintain 3. Malice 4. Match 5. Mark",
        options: ["2,3,1,4,5", "1,5,3,4,2", "2,3,1,5,4", "1,2,3,4,5"],
        answer: "2,3,1,5,4",
        source: "Exam: SSC JE Mechanical – 11/10/2023 (Shift-II)"
    },
    {
        type: "2023",
        questionNumber: 16,
        question: "Arrange the following words in the order in which they would appear in an English dictionary. 1. Recession 2. Rebuke 3. Recognize 4. Receive 5. Recover",
        options: ["3,2,1,5,4", "3,4,1,5,2", "2,4,1,3,5", "5,4,1,3,2"],
        answer: "2,4,1,3,5",
        source: "Exam: SSC JE Mechanical – 09/10/2023 (Shift-II)"
    },
    {
        type: "2023",
        questionNumber: 17,
        question: "Select the option that represents the correct order of the given words as they would appear in an English dictionary. 1. Ostracise 2. Ossification 3. Otherwise 4. Ostensible 5. Ostrich",
        options: ["2,4,5,1,3", "2,1,4,5,3", "2,4,1,5,3", "2,1,5,4,3"],
        answer: "2,4,1,5,3",
        source: "Exam: SSC JE Mechanical – 09/10/2023 (Shift-II)"
    },
    {
        type: "2023",
        questionNumber: 18,
        question: "Arrange the following words in the order in which they would appear in an English dictionary. 1. Justice 2. Journal 3. Jurisdiction 4. Judgement 5. Journey",
        options: ["1,2,3,4,5", "2,4,5,3,1", "2,5,4,3,1", "1,3,2,4,5"],
        answer: "2,5,4,3,1",
        source: "Exam: SSC JE Civil – 10/10/2023 (Shift-I)"
    },
    {
        type: "2023",
        questionNumber: 19,
        question: "Arrange the following words in the order in which they would appear in an English dictionary. 1. Immature 2. Immune 3. Immeasurable 4. Immerse 5. Immediate",
        options: ["1,3,4,5,2", "1,5,3,4,2", "1,3,5,4,2", "1,3,5,2,4"],
        answer: "5,3,4,1,2",
        source: "Exam: SSC JE Civil – 10/10/2023 (Shift-I)"
    },
    {
        type: "2023",
        questionNumber: 20,
        question: "Arrange the following words in the order in which they would appear in an English dictionary. 1. Adequate 2. Aphorism 3. Amplify 4. Aphrodite 5. Amorphous 6. Adamant",
        options: ["6,3,1,5,4,2", "6,1,3,2,5,4", "6,1,3,5,2,4", "6,1,5,3,2,4"],
        answer: "6,1,5,3,2,4",
        source: "Exam: SSC JE Civil – 09/10/2023 (Shift-I)"
    },
    {
        type: "2023",
        questionNumber: 21,
        question: "Arrange the following words in the order in which they would appear in an English dictionary. 1. Crumble 2. Character 3. Crevice 4. Crunchy 5. Cushion 6. Charlatan",
        options: ["2,6,1,3,4,5", "6,3,2,1,4,5", "2,6,3,1,4,5", "6,2,3,4,1,5"],
        answer: "2,6,3,1,4,5",
        source: "Exam: SSC JE Civil – 11/10/2023 (Shift-I)"
    },
    {
        type: "2023",
        questionNumber: 22,
        question: "Arrange the following words in the order in which they would appear in an English dictionary. 1. Frighten 2. Filigree 3. Festive 4. Familiar 5. Filibuster 6. Freight",
        options: ["4,3,2,5,6,1", "4,3,5,2,6,1", "4,3,5,2,1,6", "4,5,3,2,1,6"],
        answer: "4,3,2,5,1,6",
        source: "Exam: SSC JE Civil – 11/10/2023 (Shift-I)"
    },
    {
        type: "2023",
        questionNumber: 23,
        question: "Arrange the following words in the sequence in which they would appear in an English dictionary. 1. Forty 2. Fortify 3. Forum 4. Forte 5. Fortitude",
        options: ["34521", "35421", "45231", "42513"],
        answer: "42513",
        source: "Exam: SSC JE Civil – 11/10/2023 (Shift-I)"
    },
    {
        type: "2023",
        questionNumber: 24,
        question: "Arrange the following words in the order in which they would appear in an English dictionary. 1. Unaware 2. Unable 3. Unavoidable 4. Unacceptable 5. Unanimous 6. Unaffected",
        options: ["2,4,6,5,3,1", "2,4,6,5,1,3", "2,4,5,6,3,1", "4,2,6,5,3,1"],
        answer: "2,4,6,5,3,1",
        source: "Exam: SSC JE Civil – 09/10/2023 (Shift-I)"
    },
    {
        type: "2023",
        questionNumber: 25,
        question: "Select the correct option that indicates the arrangement of the given words in the order in which they appear in an English dictionary. 1. Maternity 2. Mundane 3. Maternal 4. Motor 5. Mother",
        options: ["3,2,4,5,1", "3,1,4,2,5", "3,1,5,4,2", "1,4,5,2,3"],
        answer: "3,1,5,4,2",
        source: "Exam: SSC CHSL – 16/03/2023 (Shift-I)"
    },
    {
        type: "2023",
        questionNumber: 26,
        question: "How will the given words appear in an English dictionary? 1. Wage 2. Waist 3. Waste 4. West 5. Wave",
        options: ["12354", "42135", "35241", "24351"],
        answer: "12354",
        source: "Exam: SSC CHSL – 09/03/2023 (Shift-I)"
    },
    {
        type: "2023",
        questionNumber: 27,
        question: "Which of the following words will come at the 4th position if all the words are arranged as per their order in an English dictionary? 1. Activity 2. Activist 3. Activismal 4. Activisticy 5. Activize",
        options: ["Activismal", "Activist", "Activity", "Activize"],
        answer: "Activist",
        source: "Exam: SSC CHSL – 10/03/2023 (Shift-II)"
    },
    {
        type: "2023",
        questionNumber: 28,
        question: "Arrange the following words in a logical and meaningful order. 1. Manger 2. Mango 3. Mangrove 4. Manage 5. Manager",
        options: ["4,5,3,2,1", "4,5,1,2,3", "4,5,3,1,2", "4,5,1,3,2"],
        answer: "4,5,1,3,2",
        source: "Exam: SSC CHSL – 21/03/2023 (Shift-IV)"
    },
    {
        type: "2023",
        questionNumber: 29,
        question: "Which of the following words will come at the third position if all the words are arranged as per their order in an English dictionary? 1. Periwing 2. Perilad 3. Perimeter 4. Periodic 5. Perish",
        options: ["Perilad", "Perimeter", "Periodic", "Perish"],
        answer: "Perish",
        source: "Exam: SSC CHSL – 20/03/2023 (Shift-III)"
    },
    {
        type: "2023",
        questionNumber: 30,
        question: "Arrange the following words in the order in which they appear in the English dictionary. 1. Irreparable 2. Irreplaceable 3. Irrigated 4. Irritable 5. Irradiation",
        options: ["5,1,2,3,4", "5,1,2,4,3", "5,2,1,4,3", "5,2,1,3,4"],
        answer: "5,1,2,4,3",
        source: "Exam: SSC CHSL – 17/03/2023 (Shift-IV)"
    },
    {
        type: "2023",
        questionNumber: 31,
        question: "Which of the given words will come third when arranged in the order of an English dictionary? 1. Special 2. Speck 3. Species 4. Speckle 5. Spectable",
        options: ["Special", "Speckle", "Speck", "Species"],
        answer: "Speckle",
        source: "Exam: SSC CHSL – 17/03/2023 (Shift-II)"
    },
    {
        type: "2023",
        questionNumber: 32,
        question: "Select the option that represents the correct order of the given words as they would appear in an English dictionary. 1. universe 2. unicorn 3. understand 4. unhappy 5. uniform",
        options: ["3,2,1,4,5", "3,2,1,5,4", "3,4,2,5,1", "3,4,5,1,2"],
        answer: "3,4,2,5,1",
        source: "Exam: SSC GD – 01/02/2023 (Shift-II)"
    },
    {
        type: "2023",
        questionNumber: 33,
        question: "Select the correct option that indicates the arrangement of the given words in the order in which they appear in an English dictionary. 1. heated 2. healed 3. heaped 4. hedge 5. helmet",
        options: ["2,1,3,4,5", "3,4,1,2,5", "3,2,1,4,5", "2,3,1,4,5"],
        answer: "2,3,1,4,5",
        source: "Exam: SSC GD – 06/02/2023 (Shift-III)"
    },
    {
        type: "2023",
        questionNumber: 34,
        question: "Arrange the following words in the order in which they appear in an English dictionary. 1. Nothing 2. Notebook 3. Notable 4. Notary 5. Nominal",
        options: ["5,4,3,2,1", "5,1,2,3,4", "5,3,4,2,1", "5,2,3,1,4"],
        answer: "5,3,4,2,1",
        source: "Exam: SSC GD – 08/02/2023 (Shift-IV)"
    },
    {
        type: "2023",
        questionNumber: 35,
        question: "Select the option that represents the correct order of the given words as they would appear in an English dictionary. 1. Manner 2. manage 3. Masculine 4. magic 5. matter",
        options: ["1,2,4,3,5", "1,4,3,2,5", "4,2,1,3,5", "4,1,2,5,3"],
        answer: "4,2,1,3,5",
        source: "Exam: SSC GD – 10/01/2023 (Shift-I)"
    },
    {
        type: "2023",
        questionNumber: 36,
        question: "Select the option that represents the correct order of the given words as they would appear in an English dictionary. 1. Peanut 2. Peasant 3. Peacock 4. Peach 5. Pencil",
        options: ["4,3,5,1,2", "3,4,5,1,2", "4,3,1,2,5", "3,4,1,2,5"],
        answer: "4,3,1,2,5",
        source: "Exam: SSC GD – 12/01/2023 (Shift-II)"
    },
    {
        type: "2023",
        questionNumber: 37,
        question: "Arrange the following words in a logical and meaningful order. 1. inside 2. insert 3. insist 4. inert 5. investigate",
        options: ["4,2,1,3,5", "1,2,3,4,5", "4,3,1,2,5", "4,1,2,3,5"],
        answer: "4,1,2,3,5",
        source: "Exam: SSC GD – 13/02/2023 (Shift-I)"
    },
    {
        type: "2023",
        questionNumber: 38,
        question: "Select the correct option that indicates the arrangement of the given words in the order in which they appear in an English dictionary. 1. Jumping 2. Juice 3. Jumble 4. Jupiter 5. Junior",
        options: ["2,3,4,1,5", "2,3,1,5,4", "3,4,2,1,5", "3,2,1,5,4"],
        answer: "2,3,1,5,4",
        source: "Exam: SSC GD – 16/01/2023 (Shift-III)"
    },
    {
        type: "2023",
        questionNumber: 39,
        question: "Select the option that represents the correct order of the given words as they would appear in an English dictionary. 1. Book 2. Bowl 3. Board 4. Boundary 5. Botanical",
        options: ["3,1,4,2,5", "3,1,5,4,2", "3,5,1,4,2", "3,4,5,1,2"],
        answer: "3,1,5,4,2",
        source: "Exam: SSC GD – 23/01/2023 (Shift-IV)"
    },
    {
        type: "2023",
        questionNumber: 40,
        question: "Select the option that represents the correct order of the given words as they would appear in an English dictionary. 1. Difficult 2. Differentiate 3. Dissolve 4. Dilute 5. Distance",
        options: ["1,4,2,3,5", "2,1,4,3,5", "1,3,2,5,4", "2,3,1,4,5"],
        answer: "1,2,4,5,3",
        source: "Exam: SSC GD – 27/01/2023 (Shift-I)"
    }
];

export default function DictionaryOrderSscPage() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const [quizEnded, setQuizEnded] = useState(false);
    const [time, setTime] = useState(0);

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
                <Card className="w-full max-w-xl text-center">
                    <CardHeader>
                        <CardTitle>Quiz Completed!</CardTitle>
                        <CardDescription>You have completed the Dictionary Order (SSC) quiz in {formatTime(time)}.</CardDescription>
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
                        <div className="flex justify-between items-center">
                            <p className="text-sm font-semibold text-primary mb-2">{currentQuestion.type}</p>
                            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                <Timer className="size-4" />
                                <span>{formatTime(time)}</span>
                            </div>
                        </div>
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
