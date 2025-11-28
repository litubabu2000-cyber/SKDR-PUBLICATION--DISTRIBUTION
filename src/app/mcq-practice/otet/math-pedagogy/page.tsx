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
        type: "Nature of Mathematics",
        questionNumber: 1,
        question: "22. Which of the following would NOT qualify as a higher aim of teaching mathematics?",
        options: [
            "(a) To help students understand the basic structure of mathematics",
            "(b) To enable students to identify relationships",
            "(c) To train students in mechanical calculations",
            "(d) To enable students to handle abstractions"
        ],
        answer: "(c) To train students in mechanical calculations",
        source: "CTET 2021, Junior Level (Class VI-VIII) - 21.01.2022"
    },
    {
        type: "Nature of Mathematics",
        questionNumber: 2,
        question: "23. “School curriculum should teach important mathematics\". What does this statement mean?",
        options: [
            "(a) Mathematics should be taught to only those students who plan to pursue it in higher classes.",
            "(b) Difficult concepts should be omitted for disinterested students.",
            "(c) Students should be provided with context which highlights the need for mathematical concepts.",
            "(d) The concepts which are tested in year-end examination must be taught in detail."
        ],
        answer: "(c) Students should be provided with context which highlights the need for mathematical concepts.",
        source: "CTET 2021, Junior Level (Class VI-VIII) - 21.01.2022"
    },
    {
        type: "Nature of Mathematics",
        questionNumber: 3,
        question: "24. Identify the correct statement from among the following.",
        options: [
            "(a) Formal proofs are obtained only by inductive reasoning.",
            "(b) Hypotheses are always formulated only through deductive logic.",
            "(c) Conjectures have no role in construction of mathematical knowledge",
            "(d) Counter-examples are helpful in assessing the validity of generalisations"
        ],
        answer: "(d) Counter-examples are helpful in assessing the validity of generalisations",
        source: "CTET 2021, Junior Level (Class VI-VIII) - 21.01.2022"
    },
    {
        type: "Nature of Mathematics",
        questionNumber: 4,
        question: "22. According to contemporary pedagogical thinking about students errors in mathematics, which of the following is no longer valid",
        options: [
            "(a) They tell about student low IQ",
            "(b) They are a part of learning",
            "(c) They are rich source of information for improving mathematics teaching",
            "(d) They can guide the teacher in planning her class lesson."
        ],
        answer: "(a) They tell about student low IQ",
        source: "CTET 2021, Junior Level (Class VI-VIII) - 11.01.2022"
    },
    {
        type: "Nature of Mathematics",
        questionNumber: 5,
        question: "22. Which of the following is the BEST example of a precise mathematical statements?",
        options: [
            "(a) Median is a line from the topmost point of a triangle to the opposite side.",
            "(b) Number of factors of a given number is always countable.",
            "(c) Congruent triangles can be formed with two sides.",
            "(d) A square is symmetrical but a pentagon is not."
        ],
        answer: "(b) Number of factors of a given number is always countable.",
        source: "CTET 2021, Junior Level (Class VI-VIII) - 10.01.2022"
    },
    {
        type: "Nature of Mathematics",
        questionNumber: 6,
        question: "21. Match the following – I. Conjecture a. A statement that is assumed to be true, which cannot be proved II. Proof b. An assertion, the truth of which has not yet been established III. Axiom c. A complete argument, which proceeds logically from the assumptions to the conclusion to support the truth of an assertion.",
        options: [
            "(a) I-b, II-c, III-a",
            "(b) I-a, II-c, III-b",
            "(c) I-c, II-a, III-b",
            "(d) I-a, II-b, III-c"
        ],
        answer: "(a) I-b, II-c, III-a",
        source: "CTET 2021, Junior Level (Class VI-VIII) - 08.01.2022"
    },
    {
        type: "Nature of Mathematics",
        questionNumber: 7,
        question: "22. Which of the following is the BEST example of precise mathematical statement?",
        options: [
            "(a) Altitude is the perpendicular line only from the topmost point of a triangle to its base.",
            "(b) The LCM of two numbers can be calculated by multiplying the numbers.",
            "(c) Similar triangles can be formed if two angles are known.",
            "(d) A square is symmetrical but a pentagon is not."
        ],
        answer: "(c) Similar triangles can be formed if two angles are known.",
        source: "CTET 2021, Junior Level (Class VI-VIII) - 07.01.2022"
    },
    {
        type: "Nature of Mathematics",
        questionNumber: 8,
        question: "27. Which of the following statement is NOT true regarding mathematical concepts?",
        options: [
            "(a) The concept of a rectangle includes both spatial and length relationship.",
            "(b) The concept of chance is a relationship between the frequency of an event happening compared with all possible outcomes.",
            "(c) The concept of a “negative integer” is based only on the “magnitude” of the number.",
            "(d) The concept of multiplication includes the concept of area of rectangle."
        ],
        answer: "(c) The concept of a “negative integer” is based only on the “magnitude” of the number.",
        source: "CTET 2021, Junior Level (Class VI-VIII) - 06.01.2022"
    },
    {
        type: "Nature of Mathematics",
        questionNumber: 9,
        question: "22. Which of the following is the most appropriate description of an axiom?",
        options: [
            "(a) These are statements about algebraic identities",
            "(b) These are mathematical truths which cannot be proved or disproved",
            "(c) Axioms are propositions similar to theorem",
            "(d) Axioms are only definitions."
        ],
        answer: "(b) These are mathematical truths which cannot be proved or disproved",
        source: "CTET 2021, Junior Level (Class VI-VIII) - 05.01.2022"
    },
    {
        type: "Nature of Mathematics",
        questionNumber: 10,
        question: "21. While teaching mathematics, a teacher arrives at a statement: ‘A implies B’ This means",
        options: [
            "(a) A is a necessary condition for B",
            "(b) B is a necessary condition for A",
            "(c) A is the sufficient condition for B",
            "(d) A is both necessary and sufficient condition for B."
        ],
        answer: "(c) A is the sufficient condition for B",
        source: "CTET 2021, Junior Level (Class VI-VIII) - 03.01.2022"
    },
    {
        type: "Nature of Mathematics",
        questionNumber: 11,
        question: "29. While teaching in a mathematics class, a teacher gives the statement \"Common Divisor of two integers is a number which divides both the given integers\". The statement is a",
        options: [
            "(a) Proposition",
            "(b) Definition",
            "(c) Axiom",
            "(d) Open sentence."
        ],
        answer: "(b) Definition",
        source: "CTET 2021, Junior Level (Class VI-VIII) - 01.01.2022"
    },
    {
        type: "Nature of Mathematics",
        questionNumber: 12,
        question: "25. Which of the following cannot be considered as one of the reasons of mathematics anxiety in students?",
        options: [
            "(a) Low achievement in mathematics examination",
            "(b) Teaching – learning experiences in classroom",
            "(c) Abstract nature of mathematics",
            "(d) Gender differences."
        ],
        answer: "(d) Gender differences.",
        source: "CTET 2021, Junior Level (Class VI-VIII) - 31.12.2021"
    },
    {
        type: "Nature of Mathematics",
        questionNumber: 13,
        question: "21. Which of the following is most appropriate for the \"Hierarchical Nature\" of Mathematics.",
        options: [
            "(a) Mathematics is considered as one of the most difficult subjects at middle school level",
            "(b) Concepts in mathematics follow a linear pattern",
            "(c) Division cannot be introduced if the subtraction and multiplication operations are not strengthened",
            "(d) Fractions can be introduced before introducing whole numbers."
        ],
        answer: "(c) Division cannot be introduced if the subtraction and multiplication operations are not strengthened",
        source: "CTET 2021, Junior Level (Class VI-VIII) - 28.12.2021"
    },
    {
        type: "Nature of Mathematics",
        questionNumber: 14,
        question: "29. The fact that there is a fraction between any two fractions is called the ____.",
        options: [
            "(a) density property of numbers",
            "(b) divisible property of fractions",
            "(c) infinite property of fractions",
            "(d) density property of fractions."
        ],
        answer: "(d) density property of fractions.",
        source: "CTET 2021, Junior Level (Class VI-VIII) - 21.12.2021"
    },
    {
        type: "Nature of Mathematics",
        questionNumber: 15,
        question: "27. Which among the following statements is/are correct : i. Every mathematical concept gives rise to more mathematical concepts. ii. Mathematical ideas grows from abstract to concrete iii. Mathematical ideas grows from particular to general",
        options: [
            "(a) i and ii",
            "(b) i and iii",
            "(c) ii and iii",
            "(d) Only i."
        ],
        answer: "(b) i and iii",
        source: "CTET 2021, Junior Level (Class VI-VIII) - 20.12.2021"
    },
    {
        type: "Mathematical Methods",
        questionNumber: 16,
        question: "23. Which of the following methods/approaches is NOT regarding mathematics teaching?",
        options: [
            "(a) Analysis-Synthesis",
            "(b) Rote Memorization",
            "(c) Problem solving",
            "(d) Deductive-Inductive"
        ],
        answer: "(b) Rote Memorization",
        source: "CTET 2021, Junior Level (Class VI-VIII) - 17.01.2022"
    },
    {
        type: "Mathematical Methods",
        questionNumber: 17,
        question: "101. \"Each primary number has two factors.\" What method should be followed to prove it at the primary level?",
        options: [
            "(A) Inductive",
            "(B) Deductive",
            "(C) Analysis",
            "(D) Synthesis"
        ],
        answer: "(B) Deductive",
        source: "OTET 2016 (1st) Paper II"
    },
    {
        type: "Mathematical Methods",
        questionNumber: 18,
        question: "103. Geometry theorems are taught by experimental method at upper primary classes. In which direction the learning experiences proceed during teaching?",
        options: [
            "(A) from simple to complex",
            "(B) from complex to simple",
            "(C) from general to specific",
            "(D) from specific to general"
        ],
        answer: "(D) from specific to general",
        source: "OTET 2016 (1st) Paper II"
    },
    {
        type: "Mathematical Methods",
        questionNumber: 19,
        question: "115. Read the following statements and choose the correct option: (i) In the synthetic method the teacher begins from what is required to be proved and arrives at what is given. (ii) In the analytic method the teacher starts from the given data and arrives at what is required to be proved.",
        options: [
            "(A) (i) correct and (ii) wrong",
            "(B) (ii) correct and (i) wrong",
            "(C) Both (i) and (ii) are correct",
            "(D) Both (i) and (ii) are wrong"
        ],
        answer: "(D) Both (i) and (ii) are wrong",
        source: "OTET 2016 (1st) Paper II"
    },
    {
        type: "Mathematical Methods",
        questionNumber: 20,
        question: "96. In which method of teaching Mathematics, one proceeds from particular to general?",
        options: [
            "(A) Analysis",
            "(B) Synthesis",
            "(C) Inductive",
            "(D) Deductive"
        ],
        answer: "(C) Inductive",
        source: "OTET 2017 (1st) Paper II"
    },
    {
        type: "Mathematical Methods",
        questionNumber: 21,
        question: "108. Which method of teaching Mathematics is activity-based?",
        options: [
            "(A) Inductive",
            "(B) Deductive",
            "(C) Project",
            "(D) Analytic"
        ],
        answer: "(C) Project",
        source: "OTET 2017 (1st) Paper II"
    },
    {
        type: "NCF 2005 views on mathematics",
        questionNumber: 22,
        question: "21. According to National Curriculum Framework 2005 the place of mathematics education in the curricular framework is positional on twin concerns. These are:",
        options: [
            "(a) What mathematics education can do to engage the mind of every student and how it can strengthen the student's resources.",
            "(b) What mathematics education can do to improve communication skills of every child and how it can make them employable.",
            "(c) What mathematics education can do to control the dropout rate of children and how it can improve their scores.",
            "(d) What mathematics education can do to prepare students for Olympiads and how it can help to choose right subject stream in higher classes."
        ],
        answer: "(a) What mathematics education can do to engage the mind of every student and how it can strengthen the student's resources.",
        source: "CTET 2021, Junior Level (Class VI-VIII) - 12.01.2022"
    },
    {
        type: "NCF 2005 views on mathematics",
        questionNumber: 23,
        question: "26. Which of the following is NOT an objective of mathematics Curriculum as per National Curriculum Framework 2005?",
        options: [
            "(a) Relate mathematics with daily experiences of students.",
            "(b) Mathematisation of child’s thinking process.",
            "(c) Develop rigour in algorithms.",
            "(d) Engage students in meaningful problem solving."
        ],
        answer: "(c) Develop rigour in algorithms.",
        source: "CTET 2021, Junior Level (Class VI-VIII) - 08.01.2022"
    },
    {
        type: "NCF 2005 views on mathematics",
        questionNumber: 24,
        question: "26. Which of the following statements resonate the vision of National Curriculum Framework 2005 for mathematics and its pedagogy?",
        options: [
            "(a) Mathematics is a way of thinking",
            "(b) Computation is the essence of all mathematics",
            "(c) Creating competition amongst learners in mathematics",
            "(d) Regular tests in mathematics lead to developing problem solving skills."
        ],
        answer: "(a) Mathematics is a way of thinking",
        source: "CTET 2021, Junior Level (Class VI-VIII) - 07.01.2022"
    },
    {
        type: "NCF 2005 views on mathematics",
        questionNumber: 25,
        question: "29. According to National Curriculum Framework 2005, The goal of mathematics teaching in school curriculum is that children learn “Important Mathematics”. Important Mathematics implies:",
        options: [
            "(a) Important formulae in mathematics must be focused upon",
            "(b) Algorithms in mathematics form an important part hence should be included as a part of important mathematics",
            "(c) Mathematics must include such meaningful problems, which teacher and students consider worth solving and as part of their experiences",
            "(d) Mathematics must include a collection of important theorems, postulates and definitions."
        ],
        answer: "(c) Mathematics must include such meaningful problems, which teacher and students consider worth solving and as part of their experiences",
        source: "CTET 2021, Junior Level (Class VI-VIII) - 04.01.2022"
    },
    {
        "type": "Mathematical Methods",
        "questionNumber": 26,
        "question": "106. Which method is most suitable to establish mathematical formula and its application?",
        "options": [
            "(A) Analytic and synthetic method",
            "(B) Inductive and deductive method",
            "(C) Project method",
            "(D) Lecture method"
        ],
        "answer": "(B) Inductive and deductive method",
        "source": "OTET 2018 Paper II"
    },
    {
        "type": "Mathematical Methods",
        "questionNumber": 27,
        "question": "118. In which method a Mathematical Problem is divided into meaningful parts to derive at solutions?",
        "options": [
            "(A) Inductive",
            "(B) Deductive",
            "(C) Analysis",
            "(D) Synthesis"
        ],
        "answer": "(C) Analysis",
        "source": "OTET 2021 Paper II"
    },
    {
        "type": "Mathematical Methods",
        "questionNumber": 28,
        "question": "115. Which method starts from unknown to reach at a known fact?",
        "options": [
            "(A) Inductive",
            "(B) Deductive",
            "(C) Analysis",
            "(D) Synthesis"
        ],
        "answer": "(C) Analysis",
        "source": "OTET 2022 Paper I"
    },
    {
        "type": "Mathematical Methods",
        "questionNumber": 29,
        "question": "116. It becomes difficult for the learners to understand a general rule without any specific example. In teaching mathematics, it is a limitation of which method?",
        "options": [
            "(A) Inductive",
            "(B) Deductive",
            "(C) Analysis",
            "(D) Synthesis"
        ],
        "answer": "(B) Deductive",
        "source": "OTET 2022 Paper I"
    },
    {
        "type": "Mathematical Methods",
        "questionNumber": 30,
        "question": "28. To find the value of exponential number operation like a^x * a^y etc, the teacher first writes all the formulae on the black board and then instructs the students to solve many examples based on the formulae. This is an example of",
        "options": [
            "(a) Inductive method of teaching",
            "(b) Deductive method of teaching",
            "(c) Scientific method of teaching",
            "(d) Child centered method of teaching"
        ],
        "answer": "(b) Deductive method of teaching",
        "source": "CTET 2021, Junior Level (Class VI-VIII) - 12.01.2022"
    },
    {
        "type": "Mathematical Methods",
        "questionNumber": 31,
        "question": "30. The statement Learning experiences of students involve looking at specific examples and seeking patterns in order to devise and write generalisations is most appropriate to",
        "options": [
            "(a) Project method",
            "(b) Inductive method",
            "(c) Deductive method",
            "(d) Analytical method"
        ],
        "answer": "(b) Inductive method",
        "source": "CTET 2021, Junior Level (Class VI-VIII) - 28.12.2021"
    },
    {
        "type": "Mathematical Methods",
        "questionNumber": 32,
        "question": "59. While explaining Evaporationl a teacher made the following statement : water evaporates, milk evaporates, oil evaporate, Therefore all liquids evaporates. This is an example of:–",
        "options": [
            "(a) Induction",
            "(b) Deduction",
            "(c) Explanation",
            "(d) Justification"
        ],
        "answer": "(a) Induction",
        "source": "CTET 2021, Junior Level (Class VI-VIII) - 24.12.2021"
    },
    {
        "type": "Mathematical Methods",
        "questionNumber": 33,
        "question": "30. In class 8th mathematics classroom, Rashmi solved the problem in following way. To prove 2ac... if a/b = c/d is given, she starts from 2ac... and gets the answer a/b = c/d Which method is Rashmi applying in her class?",
        "options": [
            "(a) Inductive method",
            "(b) Proof by contradiction",
            "(c) Deductive method",
            "(d) Analytical method"
        ],
        "answer": "(d) Analytical method",
        "source": "CTET 2021, Junior Level (Class VI-VIII) - 21.12.2021"
    },
    {
        "type": "Mathematical Methods",
        "questionNumber": 34,
        "question": "51. Out of the following, in which lesson is a general rule explained first and after that examples are illustrated?",
        "options": [
            "(a) Deductive lesson",
            "(b) Inductive lesson",
            "(c) Cognitive lesson",
            "(d) Skill lesson"
        ],
        "answer": "(a) Deductive lesson",
        "source": "CTET 2012, Junior Level (Class VI-VIII) - Nov.- 2012"
    },
    {
        "type": "Mathematical Methods",
        "questionNumber": 35,
        "question": "27. A student observed the following examples... and concluded that (a + b)^2 = a^2 + 2(a)(b) + b^2 The above method of drawing conclusions is",
        "options": [
            "(a) Deductive",
            "(b) Inductive",
            "(c) Analytical",
            "(d) Activity"
        ],
        "answer": "(b) Inductive",
        "source": "CTET 2012, Junior Level (Class VI-VIII) - Jan.- 2012"
    },
    {
        "type": "Mathematical Methods",
        "questionNumber": 36,
        "question": "22. Which of the following methods is used most commonly in mathematics classrooms for geometrical proofs.",
        "options": [
            "(a) Deductive method",
            "(b) Inductive method",
            "(c) Proof by contradiction",
            "(d) Proof by counter example"
        ],
        "answer": "(a) Deductive method",
        "source": "CTET 2021, Junior Level (Class VI-VIII) - 03.01.2022"
    },
    {
        "type": "Mathematical Methods",
        "questionNumber": 37,
        "question": "23. A teacher tells her students to draw a few triangles... find the sum of their angles by measuring each angle... The students realize that the sum of angles is close to 180º... This is an example of which approach of teaching?",
        "options": [
            "(a) Generalization",
            "(b) Teacher-centric approach",
            "(c) Deductive approach",
            "(d) Inductive approach"
        ],
        "answer": "(d) Inductive approach",
        "source": "CTET 2021, Junior Level (Class VI-VIII) - 05.01.2022"
    },
    {
        "type": "Mathematical Methods",
        "questionNumber": 38,
        "question": "21. A middle school mathematics teacher distributes different type of triangles to the students... Asked to measure angles and consolidate data to find sum is 180. The method used by the teacher is :",
        "options": [
            "(a) Analytical Method",
            "(b) Deductive Method",
            "(c) Synthesis Method",
            "(d) Inductive Method"
        ],
        "answer": "(d) Inductive Method",
        "source": "CTET 2021, Junior Level (Class VI-VIII) - 27.12.2021"
    }
];

export default function MathPedagogyPage() {
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
                        <CardDescription>You have completed the Math Pedagogy quiz.</CardDescription>
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

                <div className="md:w-1/2 mt-8 md:mt-0">
                    <Whiteboard />
                </div>
            </div>
        </div>
    );
}
