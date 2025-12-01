
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
        type: "I. Language Skills (LSRW) & Their Order",
        questionNumber: "87",
        question: "Which of the following involves receptive skill?",
        options: ["(A) To spell words correctly", "(B) To use appropriate vocabulary", "(C) To pronounce English correctly", "(D) To follow verbal directions"],
        answer: "(D) To follow verbal directions",
        source: "Exam: OTET 2016-1st Paper II"
    },
    {
        type: "I. Language Skills (LSRW) & Their Order",
        questionNumber: "75",
        question: "The natural order of language skill is ________.",
        options: ["(A) listening, reading, speaking, writing", "(B) listening, speaking, reading, writing", "(C) speaking, listening, reading, writing", "(D) listening, speaking, writing, reading"],
        answer: "(B) listening, speaking, reading, writing",
        source: "Exam: OTET 2018 Paper II"
    },
    {
        type: "I. Language Skills (LSRW) & Their Order",
        questionNumber: "66",
        question: "Dictation tests the skill of ________.",
        options: ["(A) listening", "(B) listening and writing", "(C) listening and speaking", "(D) reading"],
        answer: "(B) listening and writing",
        source: "Exam: OTET 2018 Paper II"
    },
    {
        type: "I. Language Skills (LSRW) & Their Order",
        questionNumber: "64",
        question: "Dictation tests the skill of ________.",
        options: ["(A) listening", "(B) listening and speaking", "(C) listening and writing", "(D) speaking and writing"],
        answer: "(C) listening and writing",
        source: "Exam: OTET 2021 Paper II"
    },
    {
        type: "I. Language Skills (LSRW) & Their Order",
        questionNumber: "66",
        question: "Which skills are productive?",
        options: ["(A) Speaking and reading", "(B) Reading and writing", "(C) Speaking and writing", "(D) Writing and listening"],
        answer: "(C) Speaking and writing",
        source: "Exam: OTET 2022 Paper I"
    },
    {
        type: "I. Language Skills (LSRW) & Their Order",
        questionNumber: "72",
        question: "Receptive skills are also called as ________.",
        options: ["(A) Active skill", "(B) Productive skill", "(C) Passive skill", "(D) None of the above"],
        answer: "(C) Passive skill",
        source: "Exam: OTET 2022 Paper I"
    },
    {
        type: "II. Reading Skills and Sub-skills",
        questionNumber: "81",
        question: "Which of the following is a faulty habit of silent reading?",
        options: ["(A) Guessing the meaning of difficult words", "(B) Moving eyes without head wagging", "(C) Using dictionary for understanding", "(D) Understanding the use of pronouns"],
        answer: "(A) Guessing the meaning of difficult words",
        source: "Exam: OTET 2016-1st Paper II"
    },
    {
        type: "II. Reading Skills and Sub-skills",
        questionNumber: "68",
        question: "Students explore meaning and information ________.",
        options: ["(A) after silent reading", "(B) during silent reading", "(C) before silent reading", "(D) during extensive reading"],
        answer: "(B) during silent reading",
        source: "Exam: OTET 2018 Paper II"
    },
    {
        type: "II. Reading Skills and Sub-skills",
        questionNumber: "69",
        question: "Silent reading is a ________.",
        options: ["(A) Pre-reading activity", "(B) While-reading activity", "(C) Post-reading activity", "(D) Lesson-planning activity"],
        answer: "(B) While-reading activity",
        source: "Exam: OTET 2018 Paper II"
    },
    {
        type: "II. Reading Skills and Sub-skills",
        questionNumber: "71",
        question: "Reading is a process of information transfer from ________.",
        options: ["(A) text to the reader", "(B) text to text", "(C) the reader to reader", "(D) the reader to listener"],
        answer: "(A) text to the reader",
        source: "Exam: OTET 2018 Paper II"
    },
    {
        type: "II. Reading Skills and Sub-skills",
        questionNumber: "74",
        question: "Non-detailed prose develops ________ reading.",
        options: ["(A) extensive", "(B) intensive", "(C) critical", "(D) appreciative"],
        answer: "(A) extensive",
        source: "Exam: OTET 2018 Paper II"
    },
    {
        type: "II. Reading Skills and Sub-skills",
        questionNumber: "88",
        question: "Cross-word Puzzle is used during the ________ stage of a lesson.",
        options: ["(A) Pre-reading", "(B) Post-reading", "(C) Pre-preparation", "(D) While-reading"],
        answer: "(B) Post-reading",
        source: "Exam: OTET 2016-1st Paper II"
    },
    {
        type: "II. Reading Skills and Sub-skills",
        questionNumber: "65",
        question: "Which of the following activities comes first while teaching a prose text?",
        options: ["(A) Dividing the whole text into sense group paras.", "(B) Planning some activities for the learners to introduce the topic.", "(C) Silent reading by the learners.", "(D) Asking questions for helping comprehension."],
        answer: "(B) Planning some activities for the learners to introduce the topic.",
        source: "Exam: OTET 2021 Paper II"
    },
    {
        type: "II. Reading Skills and Sub-skills",
        questionNumber: "78",
        question: "Students explore the meaning and information about a lesson ________.",
        options: ["(A) during silent reading", "(B) after silent reading", "(C) before silent reading", "(D) after extensive reading"],
        answer: "(A) during silent reading",
        source: "Exam: OTET 2021 Paper II"
    },
    {
        type: "II. Reading Skills and Sub-skills",
        questionNumber: "65",
        question: "To locate a particular fact in a Text is known as ________.",
        options: ["(A) Skimming", "(B) Scanning", "(C) In-depth reading", "(D) Inference"],
        answer: "(B) Scanning",
        source: "Exam: OTET 2022 Paper I"
    },
    {
        type: "II. Reading Skills and Sub-skills",
        questionNumber: "69",
        question: "Reading aloud helps in ________.",
        options: ["(A) Pronunciation", "(B) Comprehension", "(C) Sense grouping", "(D) Pronunciation and sense grouping"],
        answer: "(D) Pronunciation and sense grouping",
        source: "Exam: OTET 2022 Paper I"
    },
    {
        type: "III. Writing Skills and Sub-skills",
        questionNumber: "83",
        question: "Which of the following is not a purpose of creative writing?",
        options: ["(A) self expression", "(B) redressal of mental fatigue", "(C) command of language", "(D) repetition"],
        answer: "(D) repetition",
        source: "Exam: OTET 2016-1st Paper II"
    },
    {
        type: "III. Writing Skills and Sub-skills",
        questionNumber: "81",
        question: "Collection and organisation of ideas, sequencing, cohesion and use of vocabulary are subskills of ________.",
        options: ["(A) listening", "(B) speaking", "(C) reading", "(D) writing"],
        answer: "(D) writing",
        source: "Exam: OTET 2017 Paper II"
    },
    {
        type: "III. Writing Skills and Sub-skills",
        questionNumber: "88",
        question: "The objective of ________ is to listen and write.",
        options: ["(A) note-taking", "(B) note-making", "(C) chorus reading", "(D) silent reading"],
        answer: "(A) note-taking",
        source: "Exam: OTET 2017 Paper II"
    },
    {
        type: "III. Writing Skills and Sub-skills",
        questionNumber: "90",
        question: "Students read a small text about 'How to Make Tea', and they draw a flow-chart using the information of the text. This activity tests learners' skill in ________.",
        options: ["(A) transfer of learning", "(B) vocabulary", "(C) grammar", "(D) usage"],
        answer: "(A) transfer of learning",
        source: "Exam: OTET 2017 Paper II"
    },
    {
        type: "III. Writing Skills and Sub-skills",
        questionNumber: "70",
        question: "In order to write more creatively one should ________.",
        options: ["(A) listen to people", "(B) read good books", "(C) keep on writing", "(D) speak to many people"],
        answer: "(B) read good books",
        source: "Exam: OTET 2018 Paper II"
    },
    {
        type: "III. Writing Skills and Sub-skills",
        questionNumber: "63",
        question: "Spacing is necessary for ________.",
        options: ["(A) reading", "(B) writing", "(C) speaking", "(D) listening"],
        answer: "(B) writing",
        source: "Exam: OTET 2021 Paper II"
    },
    {
        type: "III. Writing Skills and Sub-skills",
        questionNumber: "79",
        question: "The objective of note-taking is to develop ________.",
        options: ["(A) reading and writing", "(B) listening and writing", "(C) listening and speaking", "(D) writing and speaking"],
        answer: "(B) listening and writing",
        source: "Exam: OTET 2021 Paper II"
    },
    {
        type: "IV. Teaching Methods, Approaches, and Context",
        questionNumber: "82",
        question: "English is considered to be the second language in our state, because it is",
        options: ["(A) only available at home", "(B) only available in the school", "(C) available in the school and surroundings", "(D) available everywhere"],
        answer: "(C) available in the school and surroundings",
        source: "Exam: OTET 2016-1st Paper II"
    },
    {
        type: "IV. Teaching Methods, Approaches, and Context",
        questionNumber: "84",
        question: "Studying English as a second language will help us ________.",
        options: ["(A) to speak like the English", "(B) to read Shakespeare and other poets", "(C) to go round the world as tourists", "(D) to open the window to the knowledge of the world"],
        answer: "(D) to open the window to the knowledge of the world",
        source: "Exam: OTET 2017 Paper II"
    },
    {
        type: "IV. Teaching Methods, Approaches, and Context",
        questionNumber: "67",
        question: "Using the target language without the help of mother tongue is ________.",
        options: ["(A) Direct method of teaching", "(B) Translation method", "(C) Structural method of teaching", "(D) Bilingual method"],
        answer: "(A) Direct method of teaching",
        source: "Exam: OTET 2018 Paper II"
    },
    {
        type: "IV. Teaching Methods, Approaches, and Context",
        questionNumber: "72",
        question: "When young learners are taught to improve their spelling and pronunciation, they will ________.",
        options: ["(A) improve their accuracy", "(B) enhance their fluency", "(C) nurture their creativity", "(D) sharpen their listening skill"],
        answer: "(A) improve their accuracy",
        source: "Exam: OTET 2018 Paper II"
    },
    {
        type: "IV. Teaching Methods, Approaches, and Context",
        questionNumber: "62",
        question: "Using intonation is necessary both for ________.",
        options: ["(A) speaking and writing", "(B) speaking and listening", "(C) speaking and reading", "(D) listening and writing"],
        answer: "(B) speaking and listening",
        source: "Exam: OTET 2021 Paper II"
    },
    {
        type: "IV. Teaching Methods, Approaches, and Context",
        questionNumber: "61",
        question: "What type of questions promote thinking skills in children?",
        options: ["(A) Open-ended questions", "(B) Close-ended questions", "(C) Factual questions", "(D) Questions based purely on the reading text"],
        answer: "(A) Open-ended questions",
        source: "Exam: OTET 2021 Paper II"
    },
    {
        type: "IV. Teaching Methods, Approaches, and Context",
        questionNumber: "61",
        question: "Which is not a method of teaching English?",
        options: ["(A) Direct", "(B) Story-telling", "(C) Grammar-translation", "(D) Bi-lingual"],
        answer: "(B) Story-telling",
        source: "Exam: OTET 2022 Paper I"
    },
    {
        type: "IV. Teaching Methods, Approaches, and Context",
        questionNumber: "71",
        question: "Correct articulation is required in ________.",
        options: ["(A) Listening", "(B) Speaking", "(C) Reading", "(D) Writing"],
        answer: "(B) Speaking",
        source: "Exam: OTET 2022 Paper I"
    },
    {
        type: "V. Grammar, Vocabulary, and Literature Pedagogy",
        questionNumber: "84",
        question: "Sonam often makes mistakes in subject-verb agreement. How could this problem be solved?",
        options: ["(A) explaining rules of grammar", "(B) asking to memorise rules of grammar", "(C) asking to write the rules in the note book", "(D) lot of contextual practice in the class"],
        answer: "(D) lot of contextual practice in the class",
        source: "Exam: OTET 2016-1st Paper II"
    },
    {
        type: "V. Grammar, Vocabulary, and Literature Pedagogy",
        questionNumber: "86",
        question: "Which of the following is concerned with the real life situations?",
        options: ["(A) Functional grammar", "(B) Structural grammar", "(C) Prescriptive grammar", "(D) Formal grammar"],
        answer: "(A) Functional grammar",
        source: "Exam: OTET 2016-1st Paper II"
    },
    {
        type: "V. Grammar, Vocabulary, and Literature Pedagogy",
        questionNumber: "83",
        question: "Aesthetic sense is developed through ________.",
        options: ["(A) detailed prose", "(B) non-detailed prose", "(C) poetry", "(D) composition"],
        answer: "(C) poetry",
        source: "Exam: OTET 2017 Paper II"
    },
    {
        type: "V. Grammar, Vocabulary, and Literature Pedagogy",
        questionNumber: "85",
        question: "Grammar should be taught through ________.",
        options: ["(A) rules", "(B) structures", "(C) skills", "(D) phrases and sentences"],
        answer: "(D) phrases and sentences",
        source: "Exam: OTET 2017 Paper II"
    },
    {
        type: "V. Grammar, Vocabulary, and Literature Pedagogy",
        questionNumber: "86",
        question: "Activity: [Find a single prefix for the given letters to make meaningful words: cern, vert, fer, dense, vict, cede]. The activity in the above box can be practised for developing skills in ________.",
        options: ["(A) grammar", "(B) vocabulary", "(C) word-order", "(D) use of compound words"],
        answer: "(B) vocabulary",
        source: "Exam: OTET 2017 Paper II"
    },
    {
        type: "V. Grammar, Vocabulary, and Literature Pedagogy",
        questionNumber: "87",
        question: "The word underlined in the first line ['There was a monkey from Riger. Who rode on a tiger.'] can be taught through ________.",
        options: ["(A) gesture and action", "(B) synonyms", "(C) antonyms", "(D) guessing the meaning from the context"],
        answer: "(D) guessing the meaning from the context",
        source: "Exam: OTET 2017 Paper II"
    },
    {
        type: "V. Grammar, Vocabulary, and Literature Pedagogy",
        questionNumber: "73",
        question: "Aesthetic sense is developed through ________.",
        options: ["(A) prose", "(B) composition", "(C) grammar", "(D) poetry"],
        answer: "(D) poetry",
        source: "Exam: OTET 2018 Paper II"
    },
    {
        type: "V. Grammar, Vocabulary, and Literature Pedagogy",
        questionNumber: "62",
        question: "Which method is used while teaching grammar?",
        options: ["(A) Explanation", "(B) Comparison", "(C) Inductive", "(D) Exposition"],
        answer: "(C) Inductive",
        source: "Exam: OTET 2022 Paper I"
    },
    {
        type: "V. Grammar, Vocabulary, and Literature Pedagogy",
        questionNumber: "70",
        question: "Major focus in poetry lesson is ________.",
        options: ["(A) Comprehension", "(B) Music", "(C) Appreciation", "(D) Recitation"],
        answer: "(C) Appreciation",
        source: "Exam: OTET 2022 Paper I"
    },
    {
        type: "V. Grammar, Vocabulary, and Literature Pedagogy",
        questionNumber: "83",
        question: "What does a child enjoy at the time of reciting a poem?",
        options: ["(A) Rhyme and rhythm of the poem", "(B) Its Music", "(C) It's Idea", "(D) Both (A) and (B)"],
        answer: "(A) Rhyme and rhythm of the poem",
        source: "Exam: OTET 2022 Paper I"
    },
    {
        type: "VI. Assessment, Evaluation, and Learning Difficulties",
        questionNumber: "85",
        question: "Which is different from the other three?",
        options: ["(A) assignments", "(B) examination", "(C) test", "(D) evaluation"],
        answer: "(D) evaluation",
        source: "Exam: OTET 2016-1st Paper II"
    },
    {
        type: "VI. Assessment, Evaluation, and Learning Difficulties",
        questionNumber: "89",
        question: "'Dyslexia' is associated with ________ disorder.",
        options: ["(A) reading", "(B) writing", "(C) speaking", "(D) listening"],
        answer: "(A) reading",
        source: "Exam: OTET 2016-1st Paper II"
    },
    {
        type: "VI. Assessment, Evaluation, and Learning Difficulties",
        questionNumber: "89",
        question: "Evaluation indicates learner's learning and progress in ________.",
        options: ["(A) curricular subjects", "(B) co-curricular subjects", "(C) both curricular and co-curricular subjects", "(D) non-scholastic aspects"],
        answer: "(C) both curricular and co-curricular subjects",
        source: "Exam: OTET 2017 Paper II"
    }
];

export default function EnglishPedagogyPage() {
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
                        <CardDescription>You have completed the English Pedagogy quiz.</CardDescription>
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

