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
        type: "Profession / Role – Tool / Workplace / Output",
        questionNumber: 28,
        question: "Mason : Builds :: Mechanic : ?",
        options: ["Cars", "Tools", "Factory", "Repairs"],
        answer: "Repairs",
        source: "RRB NTPC – 23.07.2021 (Shift-II), Stage I"
    },
    {
        type: "Profession / Role – Tool / Workplace / Output",
        questionNumber: 34,
        question: "Author : Pen :: Surgeon : ?",
        options: ["Cut", "Scalpel", "Stitch", "Operation"],
        answer: "Scalpel",
        source: "RRB NTPC – 14.03.2021 (Shift-II), Stage I"
    },
    {
        type: "Profession / Role – Tool / Workplace / Output",
        questionNumber: 14,
        question: "Writer : Pen :: ?",
        options: ["Swimmer : Float", "Chef : Pan", "Dancer : Program", "Tailor : Dress"],
        answer: "Chef : Pan",
        source: "RRB NTPC – 08.02.2021 (Shift-I), Stage I"
    },
    {
        type: "Profession / Role – Tool / Workplace / Output",
        questionNumber: 3,
        question: "Writer : Pen :: Tailor : ?",
        options: ["Axe", "Needle", "Saw", "Scalpel"],
        answer: "Needle",
        source: "RRB NTPC – 28.12.2020 (Shift-I), Stage I"
    },
    {
        type: "Profession / Role – Tool / Workplace / Output",
        questionNumber: 57,
        question: "Book : Author :: Furniture : ?",
        options: ["Machine", "Woodcutter", "Wood", "Carpenter"],
        answer: "Carpenter",
        source: "RRB NTPC – 18.01.2017 (Shift-II)"
    },
    {
        type: "Profession / Role – Tool / Workplace / Output",
        questionNumber: 114,
        question: "Waiter : Restaurant :: Worker : ?",
        options: ["School", "Factory", "House", "Shop"],
        answer: "Factory",
        source: "RRB NTPC – 17.02.2021 (Shift-II), Stage I"
    },
    {
        type: "Profession / Role – Tool / Workplace / Output",
        questionNumber: 98,
        question: "Garden : Gardener :: Museum : ?",
        options: ["Museology", "Curator", "Artist", "Guide"],
        answer: "Curator",
        source: "RRB NTPC – 30.12.2020 (Shift-I), Stage I"
    },
    {
        type: "Profession / Role – Tool / Workplace / Output",
        questionNumber: 27,
        question: "Chef : Restaurant :: ?",
        options: ["Physician : Patient", "Librarian : Catalogue", "Carpenter : Wood", "Druggist : Pharmacy"],
        answer: "Druggist : Pharmacy",
        source: "RRB NTPC – 08.04.2021 (Shift-I), Stage I"
    },
    {
        type: "Geography & National Symbols",
        questionNumber: 100,
        question: "Church : Christians :: Synagogue : ?",
        options: ["Muslims", "Jews", "Parsis", "Jains"],
        answer: "Jews",
        source: "RRB NTPC – 09.01.2021 (Shift-I), Stage I"
    },
    {
        type: "Geography & National Symbols",
        questionNumber: 99,
        question: "Manipur : Imphal :: Nagaland : ?",
        options: ["Gangtok", "Aizawl", "Shillong", "Kohima"],
        answer: "Kohima",
        source: "RRB NTPC – 09.01.2021 (Shift-I), Stage I"
    },
    {
        type: "Geography & National Symbols",
        questionNumber: 97,
        question: "India : New Delhi :: China : ?",
        options: ["Pyongyang", "Seoul", "Beijing", "Tokyo"],
        answer: "Beijing",
        source: "RRB NTPC – 29.12.2020 (Shift-II), Stage I"
    },
    {
        type: "Geography & National Symbols",
        questionNumber: 87,
        question: "West Bengal : Kolkata :: Meghalaya : ?",
        options: ["Shillong", "Dispur", "Kohima", "Trivandrum"],
        answer: "Shillong",
        source: "RRB NTPC – 03.04.2016 (Shift-III)"
    },
    {
        type: "Geography & National Symbols",
        questionNumber: 71,
        question: "Bharatanatyam : Tamil Nadu :: Kuchipudi : ?",
        options: ["Arunachal Pradesh", "Odisha", "Andhra Pradesh", "Kerala"],
        answer: "Andhra Pradesh",
        source: "RRB NTPC – 28.04.2016 (Shift-II)"
    },
    {
        type: "Geography & National Symbols",
        questionNumber: 70,
        question: "The Colosseum : Italy :: Petra : ?",
        options: ["Mexico", "Jordan", "Germany", "Brazil"],
        answer: "Jordan",
        source: "RRB NTPC – 28.04.2016 (Shift-II)"
    },
    {
        type: "Geography & National Symbols",
        questionNumber: 61,
        question: "India : Tiger :: America : ?",
        options: ["Unicorn", "Bald Eagle", "Turul", "Druk"],
        answer: "Bald Eagle",
        source: "RRB NTPC – 02.04.2016 (Shift-III)"
    },
    {
        type: "Geography & National Symbols",
        questionNumber: 10,
        question: "India : Tiger :: Nepal : ?",
        options: ["Lion", "Cow", "Rhinoceros", "Leopard"],
        answer: "Cow",
        source: "RRB NTPC – 11.01.2021 (Shift-I), Stage I"
    },
    {
        type: "Geography & National Symbols",
        questionNumber: 32,
        question: "Ranthambore : Rajasthan :: Kaziranga : ?",
        options: ["Assam", "Nagaland", "Meghalaya", "Manipur"],
        answer: "Assam",
        source: "RRB NTPC – 19.01.2021 (Shift-II), Stage I"
    },
    {
        type: "Geography & National Symbols",
        questionNumber: 20,
        question: "Daman and Diu : Daman :: Andaman and Nicobar : ?",
        options: ["Nicobar", "Indira Point", "Garacharma", "Port Blair"],
        answer: "Port Blair",
        source: "RRB NTPC – 30.01.2021 (Shift-I), Stage I"
    },
    {
        type: "Geography & National Symbols",
        questionNumber: 19,
        question: "Assam : Tezpur :: Kerala : ?",
        options: ["Jaipur", "Midnapore", "Thenzawl", "Kochi"],
        answer: "Kochi",
        source: "RRB NTPC – 16.01.2021 (Shift-II), Stage I"
    },
    {
        type: "Geography & National Symbols",
        questionNumber: 18,
        question: "Himalayas : Ganga :: Satpura : ?",
        options: ["Kaveri", "Narmada", "Godavari", "Yamuna"],
        answer: "Narmada",
        source: "RRB NTPC – 13.01.2021 (Shift-I), Stage I"
    },
    {
        type: "Geography & National Symbols",
        questionNumber: 5,
        question: "Bihar : Jharkhand :: Chhattisgarh : ?",
        options: ["Maharashtra", "Ranchi", "Raipur", "Madhya Pradesh"],
        answer: "Madhya Pradesh",
        source: "RRB NTPC – 05.01.2021 (Shift-I), Stage I"
    },
    {
        type: "Antonyms / Opposites",
        questionNumber: 101,
        question: "Light : Darkness :: Transparent : ?",
        options: ["Glass", "Translucent", "Paper", "Opaque"],
        answer: "Opaque",
        source: "RRB NTPC – 17.01.2021 (Shift-II), Stage I"
    },
    {
        type: "Antonyms / Opposites",
        questionNumber: 112,
        question: "Day : Night :: Cold : ?",
        options: ["Fire", "Winter", "Wet", "Hot"],
        answer: "Hot",
        source: "RRB NTPC – 09.02.2021 (Shift-II), Stage I"
    },
    {
        type: "Antonyms / Opposites",
        questionNumber: 119,
        question: "Quarantine : Isolation :: Freedom : ?",
        options: ["Separation", "Detention", "Liberation", "Constitution"],
        answer: "Liberation",
        source: "RRB NTPC – 30.03.2016 (Shift-I)"
    },
    {
        type: "Antonyms / Opposites",
        questionNumber: 67,
        question: "Grief : Happiness :: Diffidence : ?",
        options: ["Ignorance", "Sorrow", "Confidence", "Funky"],
        answer: "Confidence",
        source: "RRB NTPC – 17.01.2017 (Shift-II)"
    },
    {
        type: "Antonyms / Opposites",
        questionNumber: 60,
        question: "Minimum : Maximum :: ?",
        options: ["Worst : Best", "Happy : Gay", "First : Second", "Sad : Angry"],
        answer: "Worst : Best",
        source: "RRB NTPC – 30.03.2016 (Shift-I)"
    },
    {
        type: "Antonyms / Opposites",
        questionNumber: 52,
        question: "Uncouth : Civilized :: ?",
        options: ["Ruthless : Brave", "Wild : Animal", "Dark : Light", "Illiterate : Book"],
        answer: "Dark : Light",
        source: "RRB NTPC – 12.04.2016 (Shift-III)"
    },
    {
        type: "Antonyms / Opposites",
        questionNumber: 7,
        question: "Happiness : Sorrow :: Conflict : ?",
        options: ["Competition", "Harmony", "War", "Anger"],
        answer: "Harmony",
        source: "RRB NTPC – 07.01.2021 (Shift-I), Stage I"
    },
    {
        type: "Science / Biology / Body Parts / Fields of Study",
        questionNumber: 94,
        question: "Heart : Cardiology :: Kidney : ?",
        options: ["Nuclear Medicine", "Nephrology", "Neurology", "Rheumatology"],
        answer: "Nephrology",
        source: "RRB NTPC – 10.01.2021 (Shift-I), Stage I"
    },
    {
        type: "Science / Biology / Body Parts / Fields of Study",
        questionNumber: 115,
        question: "Animal : Zoology :: Disease : ?",
        options: ["Cardiology", "Botany", "Pathology", "Astrology"],
        answer: "Pathology",
        source: "RRB NTPC – 27.02.2021 (Shift-II), Stage I"
    },
    {
        type: "Science / Biology / Body Parts / Fields of Study",
        questionNumber: 68,
        question: "Entomology : Insects :: Etymology : ?",
        options: ["Plants", "Words", "Books", "Satellites"],
        answer: "Words",
        source: "RRB NTPC – 30.12.2020 (Shift-II), Stage I"
    },
    {
        type: "Science / Biology / Body Parts / Fields of Study",
        questionNumber: 45,
        question: "Tongue : Taste :: Lungs : ?",
        options: ["Respiration", "Perspiration", "Cognition", "Circulation"],
        answer: "Respiration",
        source: "RRB NTPC – 03.02.2021 (Shift-II), Stage I"
    },
    {
        type: "Science / Biology / Body Parts / Fields of Study",
        questionNumber: 26,
        question: "Fracture : Bone :: Sprain : ?",
        options: ["Ankle", "Skin", "Ligament", "Tissue"],
        answer: "Ligament",
        source: "RRB NTPC – 08.04.2021 (Shift-I), Stage I"
    },
    {
        type: "Science / Biology / Body Parts / Fields of Study",
        questionNumber: 2,
        question: "Pediatrics : Children :: Neurology : ?",
        options: ["Veins", "Eyes", "Brain", "Heart"],
        answer: "Brain",
        source: "RRB NTPC – 28.12.2020 (Shift-I), Stage I"
    },
    {
        type: "Number-Based Analogy",
        questionNumber: 169,
        question: "36 : 216 :: 81 : ?",
        options: ["46656", "729", "46656 or 729", "None of these"],
        answer: "729",
        source: "RRB NTPC – 21.03.2021 (Shift-II), Stage I"
    },
    {
        type: "Number-Based Analogy",
        questionNumber: 166,
        question: "18 : 324 : 5832 :: 36 : 1296 : ?",
        options: ["46656", "46566", "45656", "45566"],
        answer: "46656",
        source: "RRB NTPC – 29.01.2021 (Shift-II), Stage I"
    },
    {
        type: "Number-Based Analogy",
        questionNumber: 165,
        question: "7 : 42 :: 9 : 72 :: 11 : ?",
        options: ["110", "121", "132", "144"],
        answer: "110",
        source: "RRB NTPC – 29.01.2021 (Shift-II), Stage I"
    },
    {
        type: "Number-Based Analogy",
        questionNumber: 164,
        question: "56 : 15 :: 76 : 21 :: 81 : ?",
        options: ["11", "12", "13", "14"],
        answer: "13",
        source: "RRB NTPC – 29.01.2021 (Shift-II), Stage I"
    },
    {
        type: "Number-Based Analogy",
        questionNumber: 163,
        question: "2 : 7 :: 11 : ? :: 23 : 37",
        options: ["13", "17", "19", "21"],
        answer: "17",
        source: "RRB NTPC – 23.01.2021 (Shift-I), Stage I"
    },
    {
        type: "Number-Based Analogy",
        questionNumber: 162,
        question: "15 : 8 :: 25 : ?",
        options: ["12", "13", "14", "15"],
        answer: "13",
        source: "RRB NTPC – 14.03.2021 (Shift-II), Stage I"
    },
    {
        type: "Letter / Alphabet / Code-Based Analogy",
        questionNumber: 120,
        question: "HUDK : KWGM :: ?",
        options: ["GDKS : JDNP", "GDKS : JDMP", "GDKS : JDOP", "GDKS : JDLP"],
        answer: "GDKS : JDNP",
        source: "RRB NTPC Stage-II – 12/06/2022 (Shift-I)"
    },
    {
        type: "Object – Function / Purpose",
        questionNumber: 30,
        question: "Almirah : Storage :: Chair : ?",
        options: ["Sitting", "Table", "Resting", "Furniture"],
        answer: "Sitting",
        source: "RRB NTPC – 09.01.2021 (Shift-II), Stage I"
    },
    {
        type: "Object – Function / Purpose",
        questionNumber: 44,
        question: "Clock : Time :: Thermometer : ?",
        options: ["Heat", "Energy", "Radiation", "Temperature"],
        answer: "Temperature",
        source: "RRB NTPC – 03.02.2021 (Shift-II), Stage I"
    },
    {
        type: "Object – Function / Purpose",
        questionNumber: 17,
        question: "Virus : Disease :: Exercise : ?",
        options: ["Health", "Body", "Gym", "Stamina"],
        answer: "Health",
        source: "RRB NTPC – 04.01.2021 (Shift-II), Stage I"
    },
    {
        type: "Object – Function / Purpose",
        questionNumber: 108,
        question: "Cold : Refrigerator :: Hot : ?",
        options: ["AC", "Heater", "Cooler", "Oven"],
        answer: "Oven",
        source: "RRB NTPC – 14.03.2021 (Shift-II), Stage I"
    },
    {
        type: "Art, Performance, & Media",
        questionNumber: 23,
        question: "Music : Concert :: Acting : ?",
        options: ["Play", "Actor", "Dialogue", "Theater"],
        answer: "Theater",
        source: "RRB NTPC – 15.03.2021 (Shift-I), Stage I"
    },
    {
        type: "Art, Performance, & Media",
        questionNumber: 15,
        question: "RK Narayan : Novel :: RK Laxman : ?",
        options: ["Journalism", "Cartoon", "Short story", "Movie"],
        answer: "Cartoon",
        source: "RRB NTPC – 09.02.2021 (Shift-I), Stage I"
    },
    {
        type: "Art, Performance, & Media",
        questionNumber: 113,
        question: "Story : Reader :: _____ : Listener",
        options: ["Drama", "Song", "Poem", "Prose"],
        answer: "Song",
        source: "RRB NTPC – 17.02.2021 (Shift-II), Stage I"
    },
    {
        type: "Part – Whole / Container – Content",
        questionNumber: 50,
        question: "Wallet : Money :: Pen drive : ?",
        options: ["CPU", "Songs", "Data", "Files"],
        answer: "Data",
        source: "RRB NTPC – 15.03.2021 (Shift-II), Stage I"
    },
    {
        type: "Part – Whole / Container – Content",
        questionNumber: 88,
        question: "Artifacts : Museum :: Books : ?",
        options: ["Library", "Librarian", "Author", "Catalogue"],
        answer: "Library",
        source: "RRB NTPC – 04.04.2016 (Shift-II)"
    },
    {
        type: "Part – Whole / Container – Content",
        questionNumber: 74,
        question: "Whisky : Distillery :: Bread : ?",
        options: ["Bakery", "Oven", "Flour", "Confectionery"],
        answer: "Bakery",
        source: "RRB NTPC – 22.04.2016 (Shift-III)"
    }
];


export default function AnalogyRailwayPage() {
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
                        <CardDescription>You have completed the Analogy (Railway) quiz.</CardDescription>
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
