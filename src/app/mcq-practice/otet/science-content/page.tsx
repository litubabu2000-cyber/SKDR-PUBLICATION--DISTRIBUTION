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
        type: "I. Metal, Nonmetal, Metalloid, Elements, and Compounds, Symbol, Valency, and Chemical Equation",
        questionNumber: "121",
        question: "Each letter of which letter-trio is a symbol of an element?",
        options: ["(A) V, X, Z", "(B) W, X, Y", "(C) V, W, Y", "(D) V, Y, Z"],
        answer: "(C) V, W, Y",
        source: "Exam: OTET 2016 Paper II"
    },
    {
        type: "I. Metal, Nonmetal, Metalloid, Elements, and Compounds, Symbol, Valency, and Chemical Equation",
        questionNumber: "122",
        question: "Which is not an alloy?",
        options: ["(A) 22 carat gold", "(B) Steel", "(C) Silver amalgam", "(D) Galvanized iron"],
        answer: "(D) Galvanized iron",
        source: "Exam: OTET 2016 Paper II"
    },
    {
        type: "I. Metal, Nonmetal, Metalloid, Elements, and Compounds, Symbol, Valency, and Chemical Equation",
        questionNumber: "124",
        question: "Basing on science content which one is different from the other three?",
        options: ["(A) Isotope", "(B) Allotrope", "(C) Isobar", "(D) Isomar"],
        answer: "(B) Allotrope",
        source: "Exam: OTET 2016 Paper II"
    },
    {
        type: "I. Metal, Nonmetal, Metalloid, Elements, and Compounds, Symbol, Valency, and Chemical Equation",
        questionNumber: "140",
        question: "Which of the following metals does not react with aqueous copper sulphate solution under normal conditions?",
        options: ["(A) Mg", "(B) Fe", "(C) Ag", "(D) Pb"],
        answer: "(C) Ag",
        source: "Exam: OTET 2017 Paper II"
    },
    {
        type: "I. Metal, Nonmetal, Metalloid, Elements, and Compounds, Symbol, Valency, and Chemical Equation",
        questionNumber: "141",
        question: "Aluminium nitrate (i), Calcium phosphate (ii), Ferric carbonate (iii), Ammonium sulphate (iv). Out of the above compounds which two are with same number of atoms in each of their molecule?",
        options: ["(A) (i), (ii)", "(B) (ii), (iii)", "(C) (iii), (iv)", "(D) (iv), (i)"],
        answer: "(D) (iv), (i)",
        source: "Exam: OTET 2017 Paper II"
    },
    {
        type: "I. Metal, Nonmetal, Metalloid, Elements, and Compounds, Symbol, Valency, and Chemical Equation",
        questionNumber: "143",
        question: "Which of the following processes is not associated with metallurgy?",
        options: ["(A) Froth floatation", "(B) Catenation", "(C) Calcination", "(D) Magnetic separation"],
        answer: "(B) Catenation",
        source: "Exam: OTET 2017 Paper II"
    },
    {
        type: "I. Metal, Nonmetal, Metalloid, Elements, and Compounds, Symbol, Valency, and Chemical Equation",
        questionNumber: "105",
        question: "Out of the alloys given below which one contains a non-metal?",
        options: ["(A) Brass", "(B) Bronze", "(C) Stainless steel", "(D) Solder"],
        answer: "(C) Stainless steel",
        source: "Exam: OTET 2018 Paper II"
    },
    {
        type: "I. Metal, Nonmetal, Metalloid, Elements, and Compounds, Symbol, Valency, and Chemical Equation",
        questionNumber: "103",
        question: "Out of the allotropes of which element one is an insulator, second one is a poor conductor and third one is a super conductor of electricity?",
        options: ["(A) C", "(B) P", "(C) As", "(D) Sb"],
        answer: "(A) C",
        source: "Exam: OTET 2018 Paper II"
    },
    {
        type: "I. Metal, Nonmetal, Metalloid, Elements, and Compounds, Symbol, Valency, and Chemical Equation",
        questionNumber: "104",
        question: "In which one of the following the number of electron, proton and neutron are different?",
        options: ["(A) Isotopes", "(B) Isobars", "(C) Isotones", "(D) Allotropes"],
        answer: "(B) Isobars",
        source: "Exam: OTET 2018 Paper II"
    },
    {
        type: "I. Metal, Nonmetal, Metalloid, Elements, and Compounds, Symbol, Valency, and Chemical Equation",
        questionNumber: "131",
        question: "Out of the following which is an alloy of Mercury?",
        options: ["(A) Brass", "(B) Bronze", "(C) Solder", "(D) Zinc amalgam"],
        answer: "(D) Zinc amalgam",
        source: "Exam: OTET 2021 Paper II"
    },
    {
        type: "I. Metal, Nonmetal, Metalloid, Elements, and Compounds, Symbol, Valency, and Chemical Equation",
        questionNumber: "130",
        question: "Which electronic configuration indicates a cation?",
        options: ["(A) 17p, 17e, 18n", "(B) 15e, 16p, 17n", "(C) 19e, 20n, 17p", "(D) 9p, 10n, 10e"],
        answer: "(B) 15e, 16p, 17n",
        source: "Exam: OTET 2021 Paper II"
    },
    {
        type: "I. Metal, Nonmetal, Metalloid, Elements, and Compounds, Symbol, Valency, and Chemical Equation",
        questionNumber: "141",
        question: "In thermochemical welding aluminium is used because:",
        options: ["(A) Aluminium is a light metal.", "(B) Aluminium has more affinity for oxygen.", "(C) Aluminium is a stronger oxidising agent than others.", "(D) Aluminium is a reactive metal.."],
        answer: "(B) Aluminium has more affinity for oxygen.",
        source: "Exam: OTET 2021 Paper II"
    },
    {
        type: "I. Metal, Nonmetal, Metalloid, Elements, and Compounds, Symbol, Valency, and Chemical Equation",
        questionNumber: "136",
        question: "Which of the following processes is not associated with metallurgy?",
        options: ["(A) Froth floatation", "(B) Catenation", "(C) Calcination", "(D) Magnetic separation"],
        answer: "(B) Catenation",
        source: "Exam: OTET 2021 Paper II"
    },
    {
        type: "I. Metal, Nonmetal, Metalloid, Elements, and Compounds, Symbol, Valency, and Chemical Equation",
        questionNumber: "150",
        question: "Which of the following does not react with acid?",
        options: ["(A) Copper", "(B) Nickel", "(C) Chromium", "(D) Oxygen"],
        answer: "(A) Copper",
        source: "Exam: OTET 2021 Paper II"
    },
    {
        type: "II. Acid, Base, and Salt",
        questionNumber: "123",
        question: "Which one contains two acids?",
        options: ["(A) Lemon", "(B) Tamarind", "(C) Tomato", "(D) Apple"],
        answer: "(C) Tomato",
        source: "Exam: OTET 2016 Paper II"
    },
    {
        type: "II. Acid, Base, and Salt",
        questionNumber: "125",
        question: "The pH of a solution is 12. What changes in colour would occur with the following substances by it. Choose the correct answer.",
        options: ["(A) Litmus would turn red", "(B) Methyl orange would turn pink", "(C) Phenolphthalcin would turn pink", "(D) The colour of turmeric water will not change"],
        answer: "(C) Phenolphthalcin would turn pink",
        source: "Exam: OTET 2016 Paper II"
    },
    {
        type: "II. Acid, Base, and Salt",
        questionNumber: "139",
        question: "Which one of the following salts belongs to the class of potassium acetate?",
        options: ["(A) Potassium carbonate", "(B) Potassium chloride", "(C) Potassium nitrate", "(D) Potassium sulphate"],
        answer: "(A) Potassium carbonate",
        source: "Exam: OTET 2017 Paper II"
    },
    {
        type: "II. Acid, Base, and Salt",
        questionNumber: "134",
        question: "(a) A concentrated acid is also called as a strong acid (b) A dilute acid is also called as a weak acid (c) A strong acid can be made weak acid by adding water in it (d) A weak acid can be made strong acid by heating it. Out of the above",
        options: ["(A) (a) and (b) are correct and (c) and (d) are wrong", "(B) (c) and (d) are correct and (a) and (b) are wrong", "(C) (a), (b), (c) and (d) are correct", "(D) (a), (b), (c) and (d) are wrong"],
        answer: "(D) (a), (b), (c) and (d) are wrong",
        source: "Exam: OTET 2018 Paper II"
    },
    {
        type: "II. Acid, Base, and Salt",
        questionNumber: "96",
        question: "Which acid does cause cramping?",
        options: ["(A) Citric", "(B) Lactic", "(C) Pyruvic", "(D) Oxalic"],
        answer: "(B) Lactic",
        source: "Exam: OTET 2018 Paper II"
    },
    {
        type: "II. Acid, Base, and Salt",
        questionNumber: "133",
        question: "In maximum how many litres of aquaregia can be prepared from 4.5 litres of concentrated hydrochloric acid?",
        options: ["(A) 4.5 litre", "(B) 6.0 litre", "(C) 7.5 litre", "(D) 9.0 litre"],
        answer: "(B) 6.0 litre",
        source: "Exam: OTET 2021 Paper II"
    },
    {
        type: "III. Physical and Chemical Change in Matter",
        questionNumber: "135",
        question: "Which among the following processes is an example of physical change?",
        options: ["(A) Burning of fuel", "(B) Electrolysis of water", "(C) Dissolving common sugar in water", "(D) Ripening of fruit"],
        answer: "(C) Dissolving common sugar in water",
        source: "Exam: OTET 2022 Paper I"
    },
    {
        type: "IV. Force, Motion, and Pressure",
        questionNumber: "131",
        question: "Which formula belongs to a different class from the other three where the symbols carry their usual meanings?",
        options: ["(A) m x a", "(B) m x v", "(C) m x g", "(D) 1/2 mv^2"],
        answer: "(D) 1/2 mv^2",
        source: "Exam: OTET 2016 Paper II"
    },
    {
        type: "IV. Force, Motion, and Pressure",
        questionNumber: "135",
        question: "A figure of a bus in motion with four passengers sitting in it is given below: [Figure shown]. Passengers A and B are sitting face to face and similarly passengers C and D are sitting face to face. If sudden brake is applied to the bus in motion, what science based event will occur from the following?",
        options: ["(A) Passenger A will lean to his left and D will lean forward", "(B) Passenger C will lean forward and B will lean to his left", "(C) Passenger A will lean to his right and B will lean to his right", "(D) Passenger C will lean backward and D will lean backward"],
        answer: "(A) Passenger A will lean to his left and D will lean forward",
        source: "Exam: OTET 2016 Paper II"
    },
    {
        type: "IV. Force, Motion, and Pressure",
        questionNumber: "144",
        question: "A train starting from rest and moving with a uniform acceleration attains a speed of 108 km per hour in 2.5 minutes. What will be the acceleration of the train and how much distance would it travel in this time? To solve this question, out of the equations of this type of motion, minimum how many of them are to be used?",
        options: ["(A) Only one", "(B) Only two", "(C) Any two", "(D) All"],
        answer: "(B) Only two",
        source: "Exam: OTET 2017 Paper II"
    },
    {
        type: "IV. Force, Motion, and Pressure",
        questionNumber: "146",
        question: "How much pressure would be exerted by a solid cube of height 50 cm and weight 25 N when it is placed on a table?",
        options: ["(A) 100 Pa", "(B) 250 Pa", "(C) 500 Pa", "(D) 1000 Pa"],
        answer: "(A) 100 Pa",
        source: "Exam: OTET 2017 Paper II"
    },
    {
        type: "IV. Force, Motion, and Pressure",
        questionNumber: "131",
        question: "The characteristics of pressure of which one is different from that of the other three?",
        options: ["(A) Air", "(B) Water", "(C) Steam", "(D) Ice block"],
        answer: "(D) Ice block",
        source: "Exam: OTET 2018 Paper II"
    },
    {
        type: "IV. Force, Motion, and Pressure",
        questionNumber: "102",
        question: "A 50 kg block of stone rests at the uppermost part of a smooth inclined plane whose length is 2.0 m and height is 0.5 m. Approximately how long will it take for the block to slide to the bottom of the plane when released?",
        options: ["(A) 1.3 s", "(B) 2.3 s", "(C) 3.3 s", "(D) 4.3 s"],
        answer: "(A) 1.3 s",
        source: "Exam: OTET 2018 Paper II"
    },
    {
        type: "IV. Force, Motion, and Pressure",
        questionNumber: "137",
        question: "A pressure of 15 Pa acts on a plane of area 2.5 m^2. The force normal to the plane is:",
        options: ["(A) 37.5 N", "(B) 6 N", "(C) 17.5 N", "(D) 12.5 N"],
        answer: "(A) 37.5 N",
        source: "Exam: OTET 2021 Paper II"
    },
    {
        type: "IV. Force, Motion, and Pressure",
        questionNumber: "149",
        question: "If three forces equal in magnitude acting on a body produce no result, then the angle between any two forces is:",
        options: ["(A) 0°", "(B) 30°", "(C) 60°", "(D) 120°"],
        answer: "(D) 120°",
        source: "Exam: OTET 2021 Paper II"
    },
    {
        type: "IV. Force, Motion, and Pressure",
        questionNumber: "134",
        question: "When an object falls freely towards the earth, its total energy is ______.",
        options: ["(A) Decreases", "(B) First increases then decreases", "(C) Remains constant", "(D) Increases"],
        answer: "(C) Remains constant",
        source: "Exam: OTET 2022 Paper I"
    },
    {
        type: "IV. Force, Motion, and Pressure",
        questionNumber: "136",
        question: "A force increases the speed of a 1 kg object from 4 m/s to 8 m/s. The work done by the force will be ______.",
        options: ["(A) 8 J", "(B) 32 J", "(C) 24 J", "(D) 16 J"],
        answer: "(C) 24 J",
        source: "Exam: OTET 2022 Paper I"
    },
    {
        type: "V. Electricity, Current, and Chemical Effects of Electric Current",
        questionNumber: "134",
        question: "Which statement relating to the characteristics of the electric fuse wire is correct?",
        options: ["(A) High resistance and low melting point", "(B) High resistance and high melting point", "(C) Low resistance and low melting point", "(D) Low resistance and high melting point"],
        answer: "(A) High resistance and low melting point",
        source: "Exam: OTET 2016 Paper II"
    },
    {
        type: "V. Electricity, Current, and Chemical Effects of Electric Current",
        questionNumber: "132",
        question: "How many electrons would flow in one second through a conductor of resistance 1000 Ω, which is maintained at a potential difference of 20 V across its two ends?",
        options: ["(A) 1.25 x 10^19", "(B) 1.25 x 10^18", "(C) 1.25 x 10^17", "(D) 1.25 x 10^16"],
        answer: "(C) 1.25 x 10^17",
        source: "Exam: OTET 2018 Paper II"
    },
    {
        type: "VI. Reflection and Refraction of Light",
        questionNumber: "133",
        question: "At which place in front of a concave mirror when the object is kept, its image is not seen?",
        options: ["(A) Between P and F", "(B) At F", "(C) Between F and C", "(D) At C"],
        answer: "(B) At F",
        source: "Exam: OTET 2016 Paper II"
    },
    {
        type: "VI. Reflection and Refraction of Light",
        questionNumber: "147",
        question: "The image of a candle is formed at a distance of 10 cm behind a convex mirror of focal length 20 cm. What is the magnification of the image?",
        options: ["(A) 1/4", "(B) 1/2", "(C) 2", "(D) 4"],
        answer: "(B) 1/2",
        source: "Exam: OTET 2017 Paper II"
    },
    {
        type: "VI. Reflection and Refraction of Light",
        questionNumber: "133",
        question: "A real image of height twice that of the object was formed at a distance of 20 cm from the pole of a concave mirror. What is the focal length of the mirror?",
        options: ["(A) 5.56 cm", "(B) 6.67 cm", "(C) 7.78 cm", "(D) 8.89 cm"],
        answer: "(B) 6.67 cm",
        source: "Exam: OTET 2018 Paper II"
    },
    {
        type: "VI. Reflection and Refraction of Light",
        questionNumber: "135",
        question: "A convex lens (Fig. a) has a focal length 50 cm. It is cut into two symmetrical halves by a plane containing the principal axis (Fig. b). The two pieces are re-combined as shown in Fig. c. The power of the new combination is:",
        options: ["(A) 0.5 D", "(B) 0.25 D", "(C) 1 D", "(D) Zero D"],
        answer: "(D) Zero D",
        source: "Exam: OTET 2021 Paper II"
    },
    {
        type: "VII. Solar System and Planets",
        questionNumber: "132",
        question: "In which planet the sun rises in the west sets in the east?",
        options: ["(A) Mercury", "(B) Venus", "(C) Saturn", "(D) Neptune"],
        answer: "(B) Venus",
        source: "Exam: OTET 2016 Paper II"
    },
    {
        type: "VII. Solar System and Planets",
        questionNumber: "148",
        question: "Which celestial body belongs to a different class from the other three?",
        options: ["(A) Phobos", "(B) Demos", "(C) Ceres", "(D) Titan"],
        answer: "(C) Ceres",
        source: "Exam: OTET 2017 Paper II"
    },
    {
        type: "VII. Solar System and Planets",
        questionNumber: "101",
        question: "Which planet rotates from east to west like Venus?",
        options: ["(A) Jupiter", "(B) Saturn", "(C) Uranus", "(D) Mercury"],
        answer: "(C) Uranus",
        source: "Exam: OTET 2018 Paper II"
    },
    {
        type: "VII. Solar System and Planets",
        questionNumber: "121",
        question: "Asteroids between Mars and Jupiter:",
        options: ["(A) revolve round Mars", "(B) revolve round Jupiter", "(C) revolve round both Mars and Jupiter", "(D) revolve round the Sun"],
        answer: "(D) revolve round the Sun",
        source: "Exam: OTET 2021 Paper II"
    }
];

export default function ScienceContentPage() {
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
                        <CardDescription>You have completed the Science Content quiz.</CardDescription>
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
                        <CardTitle className="font-body text-lg leading-relaxed">
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