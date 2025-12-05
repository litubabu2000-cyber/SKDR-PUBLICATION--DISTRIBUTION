
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
        type: "I. Teaching Methods and Instructional Strategies",
        questionNumber: "126",
        question: "Four teachers taught different parts of the flowers to students. The first teacher taught showing the diagrams of different parts of the flowers. Second teacher taught separating the different parts of flowers. The third teacher told students to collect different flowers. The fourth teacher taught the different parts of the collected flowers dissected by them with discussion. From teaching point of view, which teaching method of the teacher is more useful?",
        options: ["(A) First", "(B) Second", "(C) Third", "(D) Fourth"],
        answer: "(D) Fourth",
        source: "Exam: OTET 2016 – Paper II (Set D)"
    },
    {
        type: "I. Teaching Methods and Instructional Strategies",
        questionNumber: "127",
        question: "Which teaching method is not time consuming and expensive?",
        options: ["(A) Demonstration", "(B) Problem solving", "(C) Project based", "(D) Discovering based"],
        answer: "(A) Demonstration",
        source: "Exam: OTET 2016 – Paper II (Set D)"
    },
    {
        type: "I. Teaching Methods and Instructional Strategies",
        questionNumber: "149",
        question: "In which method of teaching science at school level emphasis is given on 'seeing' and 'doing'?",
        options: ["(A) Demonstration", "(B) Observation", "(C) Excursion", "(D) Experimentation"],
        answer: "(D) Experimentation",
        source: "Exam: OTET 2017 – Paper II (Set C)"
    },
    {
        type: "I. Teaching Methods and Instructional Strategies",
        questionNumber: "91",
        question: "Teacher explained the functions of green leaf in the class by drawing diagrams. He explained how photosynthesis takes place by showing the chart of chlorophyll, light reaction and dark reaction. Then, he showed CD relating to it. What type of teaching method is it?",
        options: ["(A) Observation", "(B) Demonstration", "(C) Project", "(D) Problem solving"],
        answer: "(B) Demonstration",
        source: "Exam: OTET 2018 – Paper II (Set D)"
    },
    {
        type: "I. Teaching Methods and Instructional Strategies",
        questionNumber: "138",
        question: "On teaching photosynthesis, the teacher gave its definition. He wrote it on the blackboard. Discussed the light reaction and dark reaction involved in it. He wrote the related main ideas of it on the blackboard. At last, he gave the homework to the students. Which type of education is based on it?",
        options: ["(A) Observation", "(B) Descriptive", "(C) Exhibition based", "(D) Project based"],
        answer: "(B) Descriptive",
        source: "Exam: OTET 2021 – Paper II (Set D)"
    },
    {
        type: "I. Teaching Methods and Instructional Strategies",
        questionNumber: "140",
        question: "Teachers adopt various means while teaching Science subjects and it is accepted by students. Then which of the following does not develop scientific temperament?",
        options: ["(A) Through experiment of the topic in Laboratory", "(B) Observation of the topic in the outside class environment.", "(C) Vivid description of the topic.", "(D) Observation of the phenomenon through project."],
        answer: "(C) Vivid description of the topic.",
        source: "Exam: OTET 2021 – Paper II (Set D)"
    },
    {
        type: "I. Teaching Methods and Instructional Strategies",
        questionNumber: "125",
        question: "Which is teacher based in the observation method of Science teaching?",
        options: ["(A) Description of objectives", "(B) Group discussion", "(C) Conclusion", "(D) Experimentation"],
        answer: "(A) Description of objectives",
        source: "Exam: OTET 2022 – Paper II (Set D)"
    },
    {
        type: "I. Teaching Methods and Instructional Strategies",
        questionNumber: "138",
        question: "What should be the nature of science teaching in upper primary level?",
        options: ["(A) To repeat the concepts by asking questions", "(B) Remember by rote learning", "(C) Give emphasis on the mental process of learner", "(D) Give more and more emphasis on the concepts"],
        answer: "(C) Give emphasis on the mental process of learner",
        source: "Exam: OTET 2022 – Paper II (Set D)"
    },
    {
        type: "I. Teaching Methods and Instructional Strategies",
        questionNumber: "107",
        question: "Which of the following is not an example of Constructivist approach?",
        options: ["(A) Student actively construct his/her knowledge.", "(B) Learning through social interaction and exchange of ideas and values.", "(C) It does not develop skills like critical thinking, evaluation and creativity.", "(D) Construction of knowledge is possible by addition of new experience with student's own experience."],
        answer: "(C) It does not develop skills like critical thinking, evaluation and creativity.",
        source: "Exam: OTET 2022 – Paper II (Set D)"
    },
    {
        type: "II. Objectives and Nature of Science",
        questionNumber: "129",
        question: "What is not the objective of the science oriented field study?",
        options: ["(A) Collection of facts", "(B) Analysis of facts", "(C) Visit of a new place", "(D) Observation of facts"],
        answer: "(C) Visit of a new place",
        source: "Exam: OTET 2016 – Paper II (Set D)"
    },
    {
        type: "II. Objectives and Nature of Science",
        questionNumber: "143",
        question: "(i) A student drew a neat and error-free graph on a graph paper basing on the given data relating to physics. (ii) The student answered the questions based on the graph correctly. (iii) The student predicted the trend of the graph correctly by studying its nature. Out of the knowledge, understanding, application and skill based educational objectives, the above mentioned facts are based altogether on how many objectives?",
        options: ["(A) One", "(B) Two", "(C) Three", "(D) Four"],
        answer: "(C) Three",
        source: "Exam: OTET 2016 – Paper II (Set D)"
    },
    {
        type: "II. Objectives and Nature of Science",
        questionNumber: "145",
        question: "Considering the affective educational objectives which two of the above belong to one category? (i) A student was deeply shocked seeing in the television the heart rending scenes of the atom bomb explosion in Herosima of Japan. (ii) The student was thrilled with joy seeing in the television the scenes of launching of the 'Mangalayana' to the space by India. (iii) The student started collecting the photographs and biographies of personalitites like Homi Bhabha, Bikram Sarabhai, Abdul Kalam, Samant Chandrasekhar and such other persons. (iv) The student is a supporter of rationalism.",
        options: ["(A) (i) and (iii)", "(B) (ii) and (iv)", "(C) (iii) and (iv)", "(D) (i) and (ii)"],
        answer: "(D) (i) and (ii)",
        source: "Exam: OTET 2016 – Paper II (Set D)"
    },
    {
        type: "II. Objectives and Nature of Science",
        questionNumber: "134",
        question: "Which is to be used to investigate truth in the science?",
        options: ["(A) Guess", "(B) Tradition", "(C) Analysis", "(D) Hearsay"],
        answer: "(C) Analysis",
        source: "Exam: OTET 2017 – Paper II (Set C)"
    },
    {
        type: "II. Objectives and Nature of Science",
        questionNumber: "129",
        question: "(a) The learner collects science related writings, preserves them with care and read them during leisure hours. (b) The learner never takes hasty decisions in any type of circumstances. (c) The learner takes part in science exhibitions sincerely and regularly. Out of the above...",
        options: ["(A) (a) and (b) belong to one category and (c) belongs to another category of objectives of science education", "(B) (b) and (c) belong to one category and (a) belongs to another category of objectives of science education", "(C) (c) and (a) belong to one category and (b) belongs to another category of objectives of science education", "(D) (a), (b) and (c) belong to one category of objectives of science education"],
        answer: "(C) (c) and (a) belong to one category and (b) belongs to another category of objectives of science education",
        source: "Exam: OTET 2018 – Paper II (Set D)"
    },
    {
        type: "II. Objectives and Nature of Science",
        questionNumber: "130",
        question: "(a) The learner is able to detect the error in science related subject matters. (b) The learner is able to identify the relationship between science related subject matters. (c) The learner is able to establish the relationship between the cause and result of science related subject matters. Out of the above...",
        options: ["(A) (a) and (b) belong to one category of objectives and (c) belongs to another category of objectives of science education", "(B) (b) and (c) belong to one category of objectives and (a) belongs to another category of objectives of science education", "(C) (c) and (a) belong to one category of objectives and (b) belongs to another category of objectives of science education", "(D) (a), (b) and (c) belong to one category of objectives of science education"],
        answer: "(D) (a), (b) and (c) belong to one category of objectives of science education",
        source: "Exam: OTET 2018 – Paper II (Set D)"
    },
    {
        type: "II. Objectives and Nature of Science",
        questionNumber: "141",
        question: "Which of the following is not an objective of teaching science?",
        options: ["(A) To read the biography of scientists and to appreciate their nature and work", "(B) To describe the graphs, charts and pictures", "(C) To solve the problems by applying the laws and formulas", "(D) To give importance to the teacher"],
        answer: "(D) To give importance to the teacher",
        source: "Exam: OTET 2022 – Paper II (Set D)"
    },
    {
        type: "II. Objectives and Nature of Science",
        questionNumber: "2",
        question: "Which is not a component of core curriculum?",
        options: ["(A) Duty towards constitution", "(B) Study of foreign culture and tradition", "(C) Protection of environment", "(D) Scientific temper"],
        answer: "(B) Study of foreign culture and tradition",
        source: "Exam: OTET 2021 – Paper II (Set D)"
    },
    {
        type: "III. Scientific Process and Skills",
        questionNumber: "144",
        question: "Considering the above mentioned facts maximum how many hypotheses are possible relating to the causes of non-collection of the gas in the gas jar? (i) A student fitted the required apparatus to collect carbon-dioxide in the gas jars. (ii) The student took out some substance from the bottle labelled calcium carbonate and put it in the woulfe's bottle. (iii) Then the student poured some from the bottle labelled dilute hydrochloric acid on the calcium carbonate contained in the woulfe's bottle. (iv) The student observed that the gas was not being collected in the gas jar.",
        options: ["(A) One", "(B) Two", "(C) Three", "(D) Four"],
        answer: "(C) Three",
        source: "Exam: OTET 2016 – Paper II (Set D)"
    },
    {
        type: "III. Scientific Process and Skills",
        questionNumber: "150",
        question: "Which one is not a step in science experimentation?",
        options: ["(A) Formulation of hypothesis", "(B) Analysis of data", "(C) Generalisation", "(D) Active participation"],
        answer: "(D) Active participation",
        source: "Exam: OTET 2017 – Paper II (Set C)"
    },
    {
        type: "III. Scientific Process and Skills",
        questionNumber: "126",
        question: "Indicate the correct order of steps in experiment process education.",
        options: ["(A) Problem presentation → Understanding the problem → Assumption → Experimentation → Inference.", "(B) Inference → Presentation of problem → Understanding the problem → Assumption → Experimentation.", "(C) Problem presentation → Assumption → Inference → Experimentation → Understanding the problem.", "(D) Understanding the problem → Presentation → Experimentation → Assumption → Inference."],
        answer: "(A) Problem presentation → Understanding the problem → Assumption → Experimentation → Inference.",
        source: "Exam: OTET 2022 – Paper II (Set D)"
    },
    {
        type: "IV. Assessment and Evaluation",
        questionNumber: "128",
        question: "In which type of testing is the chance of guessing maximum?",
        options: ["(A) Two alternatives", "(B) Short answer type", "(C) Labelled diagram", "(D) Four alternatives"],
        answer: "(A) Two alternatives",
        source: "Exam: OTET 2016 – Paper II (Set D)"
    },
    {
        type: "IV. Assessment and Evaluation",
        questionNumber: "130",
        question: "Which is not an free response type question?",
        options: ["(A) Describe the aerobic respiration.", "(B) What is formed in aerobic respiration?", "(C) Explain fermentation.", "(D) Show Krebs cycle."],
        answer: "(B) What is formed in aerobic respiration?",
        source: "Exam: OTET 2016 – Paper II (Set D)"
    },
    {
        type: "IV. Assessment and Evaluation",
        questionNumber: "141",
        question: "Which information is not available from the blue print table of a question paper?",
        options: ["(A) Types of questions", "(B) Difficulty level of questions", "(C) Educational objectives of questions", "(D) Content matter"],
        answer: "(B) Difficulty level of questions",
        source: "Exam: OTET 2016 – Paper II (Set D)"
    },
    {
        type: "IV. Assessment and Evaluation",
        questionNumber: "142",
        question: "Comprehensive evaluation is:",
        options: ["(A) Theory and practical tests", "(B) Verbal and non-verbal tests", "(C) Evaluation of scholastic and non-scholastic areas", "(D) Formative and summative evaluation"],
        answer: "(C) Evaluation of scholastic and non-scholastic areas",
        source: "Exam: OTET 2016 – Paper II (Set D)"
    },
    {
        type: "IV. Assessment and Evaluation",
        questionNumber: "98",
        question: "Teacher’s question and student’s answers in a classroom are given below: (i) Question: What units of measurement...",
        options: ["(A) Achievement", "(B) Diagnostic", "(C) Predictive", "(D) Placement"],
        answer: "(B) Diagnostic",
        source: "Exam: OTET 2018 – Paper II (Set D)"
    }
];

export default function SciencePedagogyPage() {
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
                        <CardDescription>You have completed the Science Pedagogy quiz.</CardDescription>
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

    