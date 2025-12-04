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
        type: "Unit I: Child Development (Focus on Upper Primary School Children)",
        questionNumber: "1",
        question: "From which stage does the development of the child begin?",
        options: ["(A) Pre-natal", "(B) Post-natal", "(C) Infancy", "(D) Childhood"],
        answer: "(A) Pre-natal",
        source: "Exam: OTET 2016 (Set D)"
    },
    {
        type: "Unit I: Child Development (Focus on Upper Primary School Children)",
        questionNumber: "2",
        question: "Which one is correct?",
        options: ["(A) Growth is a mental process", "(B) Development is a physical process", "(C) Growth is a qualitative process", "(D) Development is a psycho-logical process"],
        answer: "(D) Development is a psycho-logical process",
        source: "Exam: OTET 2017 (Set C)"
    },
    {
        type: "Unit I: Child Development (Focus on Upper Primary School Children)",
        questionNumber: "3",
        question: "“Growth is the multiplication of cells, as growth in height and weight, while development refers to the change in organism as a whole.” Who said this?",
        options: ["(A) E.B. Hurlock", "(B) Frank", "(C) Crow and Crow", "(D) Allport"],
        answer: "(C) Crow and Crow",
        source: "Exam: OTET 2021 (Set D)"
    },
    {
        type: "Unit I: Child Development (Focus on Upper Primary School Children)",
        questionNumber: "4",
        question: "At adolescence, the head of the child is about:",
        options: ["(A) 1/4 th of the body", "(B) 1/8 th of the body", "(C) 1/5 th of the body", "(D) 1/6 th of the body"],
        answer: "(B) 1/8 th of the body",
        source: "Exam: OTET 2021 (Set D)"
    },
    {
        type: "Unit I: Child Development (Focus on Upper Primary School Children)",
        questionNumber: "5",
        question: "Which of the following the radial (cognitive) constructivism does not depend on?",
        options: ["(A) Experience of the child", "(B) inquisitiveness of the child", "(C) environment of the child", "(D) Concept (idea) of the child"],
        answer: "(C) environment of the child",
        source: "Exam: OTET 2016 (Set D)"
    },
    {
        type: "Unit I: Child Development (Focus on Upper Primary School Children)",
        questionNumber: "6",
        question: "At what stage of intellectual development of the child does ego-centric thinking develop?",
        options: ["(A) sensory motor", "(B) pre operational", "(C) concrete operational", "(D) formal operational"],
        answer: "(B) pre operational",
        source: "Exam: OTET 2016 (Set D)"
    },
    {
        type: "Unit I: Child Development (Focus on Upper Primary School Children)",
        questionNumber: "7",
        question: "At what stage of intellectual development does ego-centric thinking of the child develop?",
        options: ["(A) Sensory motor", "(B) Pre-operational", "(C) Concrete operational", "(D) Formal operational"],
        answer: "(B) Pre-operational",
        source: "Exam: OTET 2017 (Set C)"
    },
    {
        type: "Unit I: Child Development (Focus on Upper Primary School Children)",
        questionNumber: "8",
        question: "According to Piaget what is the average age limit of the child during concrete operational period of cognitive development?",
        options: ["(A) 2 to 7 years", "(B) 7 to 12 years", "(C) 12 to 17 years", "(D) 18 years and above"],
        answer: "(B) 7 to 12 years",
        source: "Exam: OTET 2017 (Set C)"
    },
    {
        type: "Unit I: Child Development (Focus on Upper Primary School Children)",
        questionNumber: "9",
        question: "Which is true in case of 'Semantic Memory'?",
        options: ["(A) Memory necessary for the use of mathematical formula", "(B) Memory necessary for the use of language", "(C) Memory necessary for the use of space relation", "(D) None of these"],
        answer: "(B) Memory necessary for the use of language",
        source: "Exam: OTET 2018 (Set D)"
    },
    {
        type: "Unit I: Child Development (Focus on Upper Primary School Children)",
        questionNumber: "10",
        question: "The activities that people perform on objects are known as:",
        options: ["(A) Schemas", "(B) Assimilation", "(C) Accommodation", "(D) Equilibrium"],
        answer: "(A) Schemas",
        source: "Exam: OTET 2018 (Set D)"
    },
    {
        type: "Unit I: Child Development (Focus on Upper Primary School Children)",
        questionNumber: "11",
        question: "Which of the following stages is called as 'Concrete Operational Stage' according to Piaget?",
        options: ["(A) Infancy", "(B) Childhood", "(C) Late childhood", "(D) Adolescence"],
        answer: "(C) Late childhood",
        source: "Exam: OTET 2018 (Set D)"
    },
    {
        type: "Unit I: Child Development (Focus on Upper Primary School Children)",
        questionNumber: "12",
        question: "What will be the shape of a graph between intellectual development and chronological age from birth to adolescence?",
        options: ["(A) J - shaped", "(B) S - shaped", "(C) Zigzag", "(D) Hyperbola shaped"],
        answer: "(B) S - shaped",
        source: "Exam: OTET 2021 (Set D)"
    },
    {
        type: "Unit I: Child Development (Focus on Upper Primary School Children)",
        questionNumber: "13",
        question: "Which one is not an element of intellectual development?",
        options: ["(A) Creativity", "(B) Tolerance", "(C) Thinking", "(D) Imagination"],
        answer: "(B) Tolerance",
        source: "Exam: OTET 2017 (Set C)"
    },
    {
        type: "Unit I: Child Development (Focus on Upper Primary School Children)",
        questionNumber: "14",
        question: "Who is the founding father of cognitive constructivist approach?",
        options: ["(A) Piaget", "(B) Vygotsky", "(C) Bruner", "(D) Dewey"],
        answer: "(A) Piaget",
        source: "Exam: OTET 2018 (Set D)"
    },
    {
        type: "Unit I: Child Development (Focus on Upper Primary School Children)",
        questionNumber: "15",
        question: "At what stage of development, team-spirit of children changes?",
        options: ["(A) Childhood", "(B) Pre-adolescence", "(C) Adolescence", "(D) Pre-adulthood"],
        answer: "(B) Pre-adolescence",
        source: "Exam: OTET 2017 (Set C)"
    },
    {
        type: "Unit I: Child Development (Focus on Upper Primary School Children)",
        questionNumber: "16",
        question: "Which of the following is a social change during adolescence?",
        options: ["(A) Fear and Shame", "(B) Adult-like-behaviour", "(C) Restlessness", "(D) Imagination"],
        answer: "(B) Adult-like-behaviour",
        source: "Exam: OTET 2021 (Set D)"
    },
    {
        type: "Unit I: Child Development (Focus on Upper Primary School Children)",
        questionNumber: "17",
        question: "At which age does a child begin to be an active member of a peer group and tries to be independent of his parents?",
        options: ["(A) 4 - 5 yrs. of age", "(B) 5 - 8 yrs. of age", "(C) 11 - 12 yrs. of age", "(D) 15 - 16 yrs. of age"],
        answer: "(C) 11 - 12 yrs. of age",
        source: "Exam: OTET 2021 (Set D)"
    },
    {
        type: "Unit I: Child Development (Focus on Upper Primary School Children)",
        questionNumber: "18",
        question: "Which basic emotions do develop during infancy?",
        options: ["(A) fear, apathy, joy", "(B) fear, anger, jealousy", "(C) fear, anger, irritation", "(D) fear, anger, affection"],
        answer: "(D) fear, anger, affection",
        source: "Exam: OTET 2016 (Set D)"
    },
    {
        type: "Unit I: Child Development (Focus on Upper Primary School Children)",
        questionNumber: "19",
        question: "Which is not found in the symptoms of emotional disturbances of adolescents?",
        options: ["(A) Nail-biting", "(B) Thumb-sucking", "(C) Wearing well-fitted dress", "(D) Pulling the hair"],
        answer: "(C) Wearing well-fitted dress",
        source: "Exam: OTET 2018 (Set D)"
    },
    {
        type: "Unit I: Child Development (Focus on Upper Primary School Children)",
        questionNumber: "20",
        question: "Emotion is originated through ______________",
        options: ["(A) Habits", "(B) Instincts", "(C) Physical development", "(D) Formation of concepts"],
        answer: "(B) Instincts",
        source: "Exam: OTET 2021 (Set D)"
    },
    {
        type: "Unit I: Child Development (Focus on Upper Primary School Children)",
        questionNumber: "21",
        question: "“Stealing would be judged wrong because it is considered wrong by the society.” — To which level of moral development does it belong?",
        options: ["(A) Pre-moral", "(B) Conventional morality", "(C) Self-accepted moral principle", "(D) All of these"],
        answer: "(B) Conventional morality",
        source: "Exam: OTET 2018 (Set D)"
    },
    {
        type: "Unit I: Child Development (Focus on Upper Primary School Children)",
        questionNumber: "22",
        question: "W. Kay (1970) asserted that moral maturity involves:",
        options: ["(A) Altruism and rationality", "(B) Autonomy and heteronomy", "(C) Punishment and obedience", "(D) Social and interpersonal"],
        answer: "(A) Altruism and rationality",
        source: "Exam: OTET 2021 (Set D)"
    },
    {
        type: "Unit I: Child Development (Focus on Upper Primary School Children)",
        questionNumber: "23",
        question: "Which pair is not correctly matched?",
        options: ["(A) Environment → Physical development", "(B) Maturation → Cognitive development", "(C) Surroundings → Social development", "(D) Maturation → Emotional development"],
        answer: "(B) Maturation → Cognitive development",
        source: "Exam: OTET 2016 (Set D)"
    },
    {
        type: "Unit I: Child Development (Focus on Upper Primary School Children)",
        questionNumber: "24",
        question: "Maturation is a:",
        options: ["(A) Psychological process", "(B) Mental process", "(C) Learning process", "(D) Biological process"],
        answer: "(D) Biological process",
        source: "Exam: OTET 2017 (Set C)"
    },
    {
        type: "Unit I: Child Development (Focus on Upper Primary School Children)",
        questionNumber: "25",
        question: "Which statement is correct?",
        options: ["(A) Development is not based on the influence of heredity and environment", "(B) Development does not proceed in specific direction", "(C) Development of each individual is unique", "(D) Development of each individual is not continuous"],
        answer: "(C) Development of each individual is unique",
        source: "Exam: OTET 2017 (Set C)"
    },
    {
        type: "Unit I: Child Development (Focus on Upper Primary School Children)",
        questionNumber: "26",
        question: "Which is not a characteristic of pre-adolescence?",
        options: ["(A) moodiness", "(B) instant cry", "(C) tolerance", "(D) instant anger"],
        answer: "(C) tolerance",
        source: "Exam: OTET 2016 (Set D)"
    },
    {
        type: "Unit I: Child Development (Focus on Upper Primary School Children)",
        questionNumber: "27",
        question: "At which stage of development the child becomes imaginative?",
        options: ["(A) Infancy", "(B) Pre-childhood", "(C) Adolescence", "(D) Late childhood"],
        answer: "(C) Adolescence",
        source: "Exam: OTET 2017 (Set C)"
    },
    {
        type: "Unit I: Child Development (Focus on Upper Primary School Children)",
        questionNumber: "28",
        question: "Which is the social need of adolescents?",
        options: ["(A) Oxygen", "(B) Sex", "(C) Hunger", "(D) Security"],
        answer: "(B) Sex",
        source: "Exam: OTET 2018 (Set D)"
    },
    {
        type: "Unit I: Child Development (Focus on Upper Primary School Children)",
        questionNumber: "29",
        question: "Which one of the following groups is not a problem of the adolescents?",
        options: ["(A) Cheating, stealing, truancy", "(B) Truancy, excessive day dreaming, excessive thoughtful", "(C) Cheating, jealousy, stealing", "(D) Excessive carelessness, cheating, getting disappointed over silly matters"],
        answer: "(A) Cheating, stealing, truancy",
        source: "Exam: OTET 2018 (Set D)"
    },
    {
        type: "Unit I: Child Development (Focus on Upper Primary School Children)",
        questionNumber: "30",
        question: "Which of the following is not a developmental task of adolescents according to Havighurst?",
        options: ["(A) Accepting one's physique", "(B) Developing socially acceptable behaviour", "(C) Preparing for marriage and family life", "(D) Learning sex differences"],
        answer: "(D) Learning sex differences",
        source: "Exam: OTET 2021 (Set D)"
    },
    {
        type: "Unit I: Child Development (Focus on Upper Primary School Children)",
        questionNumber: "31",
        question: "From which Latin word the term 'Personality' has been derived?",
        options: ["(A) Person", "(B) Personal", "(C) Persona", "(D) Personnel"],
        answer: "(C) Persona",
        source: "Exam: OTET 2017 (Set C)"
    },
    {
        type: "Unit I: Child Development (Focus on Upper Primary School Children)",
        questionNumber: "32",
        question: "If the mental age is less than the chronological age of an individual, then to what category does he belong?",
        options: ["(A) Below average intelligence", "(B) Exceptional intelligence", "(C) High intelligence", "(D) Superior intelligence"],
        answer: "(A) Below average intelligence",
        source: "Exam: OTET 2017 (Set C)"
    },
    {
        type: "Unit I: Child Development (Focus on Upper Primary School Children)",
        questionNumber: "33",
        question: "Knowledge in which subject helps the teacher to identify the individual differences among the learners?",
        options: ["(A) Educational Sociology", "(B) Educational Psychology", "(C) Educational Philosophy", "(D) Pedagogy"],
        answer: "(B) Educational Psychology",
        source: "Exam: OTET 2017 (Set C)"
    },
    {
        type: "Unit I: Child Development (Focus on Upper Primary School Children)",
        questionNumber: "34",
        question: "“Whose attitude is conservative, his personality is conservative and whose attitude is positive, his personality is also positive.” Who stated it?",
        options: ["(A) Morton prince", "(B) Met Feasal", "(C) Eysenik", "(D) Mac Clasky"],
        answer: "(A) Morton prince",
        source: "Exam: OTET 2017 (Set C)"
    },
    {
        type: "Unit I: Child Development (Focus on Upper Primary School Children)",
        questionNumber: "35",
        question: "The difference that exists between two or more abilities within the individual is known as:",
        options: ["(A) Inter-individual differences", "(B) Intra-individual differences", "(C) Multi-area individual differences", "(D) None of these"],
        answer: "(B) Intra-individual differences",
        source: "Exam: OTET 2018 (Set D)"
    },
    {
        type: "Unit I: Child Development (Focus on Upper Primary School Children)",
        questionNumber: "36",
        question: "Backward, dull and retarded children are generally to have an IQ between",
        options: ["(A) 60 - 70", "(B) 70 - 90", "(C) 90 - 100", "(D) 100 - 120"],
        answer: "(B) 70 - 90",
        source: "Exam: OTET 2021 (Set D)"
    },
    {
        type: "Unit II: Learning",
        questionNumber: "37",
        question: "Which of the following is not true for a constructivist teacher?",
        options: ["(A) Sets up problems and monitors students' exploration", "(B) Does not discourage students to develop understanding", "(C) Hardly creates a context for learning", "(D) Allows multiple interpretations of learning"],
        answer: "(C) Hardly creates a context for learning",
        source: "Exam: OTET 2018 (Set D)"
    },
    {
        type: "Unit II: Learning",
        questionNumber: "38",
        question: "\"Words are structured with sense, inner speech and language.” Who stated it?",
        options: ["(A) Vygotsky", "(B) Piaget", "(C) Novak", "(D) Glaserfled"],
        answer: "(A) Vygotsky",
        source: "Exam: OTET 2018 (Set D)"
    },
    {
        type: "Unit II: Learning",
        questionNumber: "39",
        question: "Which of the following is not a principle of constructivist learning?",
        options: ["(A) learners construct knowledge for themselves", "(B) learning is a constructivist process", "(C) learning is a social activity", "(D) the teacher tries to arrive at a solution of the problem in a classroom"],
        answer: "(D) the teacher tries to arrive at a solution of the problem in a classroom",
        source: "Exam: OTET 2021 (Set D)"
    },
    {
        type: "Unit II: Learning",
        questionNumber: "40",
        question: "What learning principle is referred to when learning takes place proceeding from whole to part?",
        options: ["(A) Trial-error", "(B) Instrumental conditioning", "(C) Classical conditioning", "(D) Insightful"],
        answer: "(D) Insightful",
        source: "Exam: OTET 2016 (Set D)"
    },
    {
        type: "Unit II: Learning",
        questionNumber: "41",
        question: "In which of the following the mental operation is the least?",
        options: ["(A) observation", "(B) imitation", "(C) inquiry", "(D) classification"],
        answer: "(B) imitation",
        source: "Exam: OTET 2016 (Set D)"
    },
    {
        type: "Unit II: Learning",
        questionNumber: "42",
        question: "Repetition strengthens the connection between the stimulus and response. What laws of learning is it based upon?",
        options: ["(A) Readiness", "(B) Practice", "(C) Effect", "(D) Use"],
        answer: "(B) Practice",
        source: "Exam: OTET 2016 (Set D)"
    },
    {
        type: "Unit II: Learning",
        questionNumber: "43",
        question: "Which animal was taken by Thorndike for his second experiment of Trial and Error theory of learning?",
        options: ["(A) Dog", "(B) Cat", "(C) Rat", "(D) Simpanzee"],
        answer: "(C) Rat",
        source: "Exam: OTET 2017 (Set C)"
    },
    {
        type: "Unit II: Learning",
        questionNumber: "44",
        question: "Which learning theory is associated with transfer of training?",
        options: ["(A) Trial and Error", "(B) Conditioning", "(C) Insightful learning", "(D) None of the above"],
        answer: "(A) Trial and Error",
        source: "Exam: OTET 2017 (Set C)"
    },
    {
        type: "Unit II: Learning",
        questionNumber: "45",
        question: "Where did Pavlov experiment his conditioning learning theory?",
        options: ["(A) Lelingrad", "(B) Johannesburg", "(C) Cape town", "(D) Mexico"],
        answer: "(A) Lelingrad",
        source: "Exam: OTET 2017 (Set C)"
    },
    {
        type: "Unit II: Learning",
        questionNumber: "46",
        question: "“Learning is a process of progressive reinforcement of behaviour.” Who stated it?",
        options: ["(A) Gates", "(B) Kimble", "(C) Cavlin", "(D) Skinner"],
        answer: "(D) Skinner",
        source: "Exam: OTET 2017 (Set C)"
    },
    {
        type: "Unit II: Learning",
        questionNumber: "47",
        question: "“At the primary level while teaching alphabets emphasis is given on writing and speaking.” What learning theory is based upon?",
        options: ["(A) Trial and error theory of learning", "(B) Observation learning theory", "(C) Conditioning theory of learning", "(D) All of the above"],
        answer: "(C) Conditioning theory of learning",
        source: "Exam: OTET 2017 (Set C)"
    },
    {
        type: "Unit II: Learning",
        questionNumber: "48",
        question: "For what is the Trial and Error method more effective?",
        options: ["(A) Collection of data", "(B) Memorisation of lessons", "(C) Arriving at conclusion", "(D) Achievement of skill"],
        answer: "(D) Achievement of skill",
        source: "Exam: OTET 2017 (Set C)"
    },
    {
        type: "Unit II: Learning",
        questionNumber: "49",
        question: "Which one of the following is not a psychological process of modelling?",
        options: ["(A) Attention, recognition, identification", "(B) Reproduction, retention, internalisation", "(C) Reinforcement, recognition, attention", "(D) Retention, verification, internalisation"],
        answer: "(C) Reinforcement, recognition, attention",
        source: "Exam: OTET 2018 (Set D)"
    },
    {
        type: "Unit II: Learning",
        questionNumber: "50",
        question: "Which learning theory emphasises learning from whole to part?",
        options: ["(A) Classical conditioning", "(B) Insightful learning", "(C) Operant conditioning", "(D) Trial and Error"],
        answer: "(B) Insightful learning",
        source: "Exam: OTET 2018 (Set D)"
    },
    {
        type: "Unit II: Learning",
        questionNumber: "51",
        question: "Signal learning is commonly termed as:",
        options: ["(A) Operant conditioning", "(B) Classical conditioning", "(C) Chain learning", "(D) Verbal associate learning"],
        answer: "(B) Classical conditioning",
        source: "Exam: OTET 2021 (Set D)"
    },
    {
        type: "Unit II: Learning",
        questionNumber: "52",
        question: "In which the child is not active?",
        options: ["(A) Teacher’s classroom demonstration", "(B) Hometask done given by the teacher", "(C) Practicing the exercises of the text books", "(D) Extensive study of text-book and workbook"],
        answer: "(A) Teacher’s classroom demonstration",
        source: "Exam: OTET 2016 (Set D)"
    },
    {
        type: "Unit II: Learning",
        questionNumber: "53",
        question: "Which steps could be taken to give emphasis from teaching to learning?",
        options: ["(A) Focusing on examination results", "(B) Adopting child centered pedagogy", "(C) Encouraging rote learning", "(D) Adopting teacher centered teaching"],
        answer: "(B) Adopting child centered pedagogy",
        source: "Exam: OTET 2021 (Set D)"
    },
    {
        type: "Unit II: Learning",
        questionNumber: "54",
        question: "Which of the following statements is not a feature of the process of learning?",
        options: ["(A) Educational institutions are the only place where learning takes place", "(B) Learning is a comprehensive process", "(C) Learning is goal oriented", "(D) Unlearning is also a learning process"],
        answer: "(A) Educational institutions are the only place where learning takes place",
        source: "Exam: OTET 2021 (Set D)"
    },
    {
        type: "Unit II: Learning",
        questionNumber: "55",
        question: "Which one does influence the learning process?",
        options: ["(A) Previous knowledge", "(B) Practice", "(C) Experiences", "(D) All of these"],
        answer: "(D) All of these",
        source: "Exam: OTET 2016 (Set D)"
    },
    {
        type: "Unit II: Learning",
        questionNumber: "56",
        question: "A candidate works hard to come out successful in any competitive examination. What kind of motivation does it indicate?",
        options: ["(A) Intrinsical", "(B) Extrinsical", "(C) Emotional", "(D) Experiential"],
        answer: "(A) Intrinsical",
        source: "Exam: OTET 2016 (Set D)"
    },
    {
        type: "Unit II: Learning",
        questionNumber: "57",
        question: "Which is not related with the objectives of motives?",
        options: ["(A) to energise the behaviour", "(B) to stabilise the behaviour", "(C) to stimulate the behaviour", "(D) to activate the behaviour"],
        answer: "(B) to stabilise the behaviour",
        source: "Exam: OTET 2016 (Set D)"
    },
    {
        type: "Unit II: Learning",
        questionNumber: "58",
        question: "Which of the following is not a function of motivation in the field of learning?",
        options: ["(A) To secure more marks in the examination", "(B) To make the behaviour goal-oriented", "(C) To make the child active for learning", "(D) To make the behaviour disciplined"],
        answer: "(A) To secure more marks in the examination",
        source: "Exam: OTET 2018 (Set D)"
    },
    {
        type: "Unit II: Learning",
        questionNumber: "59",
        question: "Learning generally refers to any changes in behaviour that result due to:",
        options: ["(A) Maturation", "(B) Experience", "(C) Growth", "(D) Development"],
        answer: "(B) Experience",
        source: "Exam: OTET 2018 (Set D)"
    },
    {
        type: "Unit II: Learning",
        questionNumber: "60",
        question: "Which education system is useful to attain the defined level of learning?",
        options: ["(A) formal education", "(B) mastery education", "(C) inclusive education", "(D) integrated education"],
        answer: "(B) mastery education",
        source: "Exam: OTET 2016 (Set D)"
    },
    {
        type: "Unit II: Learning",
        questionNumber: "61",
        question: "Which is correct from mastery learning point of view?",
        options: ["(A) Equal learning objectives for all the learners", "(B) Method of teaching is equal for all the learners", "(C) Rate of learning is equal for all the learners", "(D) Learning time is equal for all the learners"],
        answer: "(A) Equal learning objectives for all the learners",
        source: "Exam: OTET 2017 (Set C)"
    },
    {
        type: "Unit II: Learning",
        questionNumber: "62",
        question: "Which one comes under activity based learning?",
        options: ["(A) Discussion method", "(B) Project method", "(C) Practice method", "(D) Narration method"],
        answer: "(B) Project method",
        source: "Exam: OTET 2017 (Set C)"
    },
    {
        type: "Unit II: Learning",
        questionNumber: "63",
        question: "Teacher will emphasise on which one to remove the weakness in learning of primary students?",
        options: ["(A) Activity based programme", "(B) Memorisation", "(C) Discussion and description", "(D) Text books"],
        answer: "(A) Activity based programme",
        source: "Exam: OTET 2017 (Set C)"
    },
    {
        type: "Unit II: Learning",
        questionNumber: "64",
        question: "Why was mid-day meal introduced in primary education?",
        options: ["(A) To give nutritional support to primary education", "(B) To bring institutional reforms", "(C) To emphasize on accountability to the community", "(D) To strengthen community participation"],
        answer: "(A) To give nutritional support to primary education",
        source: "Exam: OTET 2021 (Set D)"
    },
    {
        type: "Unit II: Learning",
        questionNumber: "65",
        question: "What education system should be made for the hearing impaired children?",
        options: ["(A) Special education", "(B) Non formal education", "(C) Integrated education", "(D) Inclusive education"],
        answer: "(D) Inclusive education",
        source: "Exam: OTET 2016 (Set D)"
    },
    {
        type: "Unit II: Learning",
        questionNumber: "66",
        question: "For which group of learners, sign language method is most appropriate?",
        options: ["(A) Visually impaired", "(B) Hearing impaired", "(C) Mentally retarded", "(D) Physically disabled"],
        answer: "(B) Hearing impaired",
        source: "Exam: OTET 2017 (Set C)"
    },
    {
        type: "Unit II: Learning",
        questionNumber: "67",
        question: "What type of teacher is appointed to teach the disabled learners?",
        options: ["(A) Resource teacher", "(B) Efficient teacher", "(C) Experienced teacher", "(D) Subject teacher"],
        answer: "(A) Resource teacher",
        source: "Exam: OTET 2017 (Set C)"
    },
    {
        type: "Unit II: Learning",
        questionNumber: "68",
        question: "Visually impaired learners belong to which category of disability group?",
        options: ["(A) Mentally disordered", "(B) Economically backward", "(C) Socially disadvantaged", "(D) None of the above"],
        answer: "(D) None of the above",
        source: "Exam: OTET 2017 (Set C)"
    },
    {
        type: "Unit II: Learning",
        questionNumber: "69",
        question: "Which characteristics is seen among backward learners?",
        options: ["(A) Ability to analyse", "(B) Objective based behaviour", "(C) Desire for vocation of repute", "(D) Inability to express concepts"],
        answer: "(D) Inability to express concepts",
        source: "Exam: OTET 2017 (Set C)"
    },
    {
        type: "Unit II: Learning",
        questionNumber: "70",
        question: "What is inclusive education?",
        options: ["(A) More emphasis on gifted learners", "(B) More emphasis on slow learners", "(C) Learning opportunity with rights for all category of learners", "(D) Learning opportunity for the disabled learners"],
        answer: "(C) Learning opportunity with rights for all category of learners",
        source: "Exam: OTET 2017 (Set C)"
    },
    {
        type: "Unit II: Learning",
        questionNumber: "71",
        question: "'Dyspedagogia' is related to:",
        options: ["(A) lack of good teaching", "(B) lack of good environment", "(C) lack of curriculum for the child", "(D) None of these"],
        answer: "(A) lack of good teaching",
        source: "Exam: OTET 2018 (Set D)"
    },
    {
        type: "Unit II: Learning",
        questionNumber: "72",
        question: "Which of the following is a characteristics of a learning disabled child?",
        options: ["(A) Misreads number ('6' as '9', '3' as '8')", "(B) Reverses letter ('b' as 'd', 'p' as 'q')", "(C) Add letters ('want' as 'what', 'what' as 'whart')", "(D) All of the above"],
        answer: "(D) All of the above",
        source: "Exam: OTET 2021 (Set D)"
    },
    {
        type: "Unit II: Learning",
        questionNumber: "73",
        question: "According to RTE - 2009, how should children with special needs study?",
        options: ["(A) In special school established exclusively for them", "(B) At home with their parents and caretakers providing necessary support", "(C) In inclusive education setups with provisions to cater to their individual needs", "(D) In vocational training centers which would prepare them for life skills"],
        answer: "(C) In inclusive education setups with provisions to cater to their individual needs",
        source: "Exam: OTET 2021 (Set D)"
    },
    {
        type: "Unit II: Learning",
        questionNumber: "74",
        question: "What type of thinking do the gifted learners have?",
        options: ["(A) Convergent", "(B) Divergent", "(C) Introvert", "(D) Objective"],
        answer: "(B) Divergent",
        source: "Exam: OTET 2016 (Set D)"
    },
    {
        type: "Unit II: Learning",
        questionNumber: "75",
        question: "Which test is used to identify the gifted learners?",
        options: ["(A) intelligence test", "(B) achievement test", "(C) teacher-made test", "(D) All of these"],
        answer: "(D) All of these",
        source: "Exam: OTET 2016 (Set D)"
    },
    {
        type: "Unit II: Learning",
        questionNumber: "76",
        question: "What type of question should the teacher ask to identify creative children?",
        options: ["(A) Activity-based", "(B) Diagnostic", "(C) Convergent thinking", "(D) Divergent thinking"],
        answer: "(D) Divergent thinking",
        source: "Exam: OTET 2017 (Set C)"
    },
    {
        type: "Unit II: Learning",
        questionNumber: "77",
        question: "What characteristic is not found in creative students?",
        options: ["(A) Curious", "(B) Visionary", "(C) Intuitive", "(D) Unwilling to take risk"],
        answer: "(D) Unwilling to take risk",
        source: "Exam: OTET 2018 (Set D)"
    },
    {
        type: "Unit II: Learning",
        questionNumber: "78",
        question: "What characteristic is found in creative children?",
        options: ["(A) Divergent thinking", "(B) Originality", "(C) Independent thinking", "(D) All of these"],
        answer: "(D) All of these",
        source: "Exam: OTET 2018 (Set D)"
    },
    {
        type: "Unit II: Learning",
        questionNumber: "79",
        question: "Teachers of gifted children need some particular qualities. They must:",
        options: ["(A) Be intellectually curious", "(B) Do not have variety of interests", "(C) Not willing to accept unusual and diverse questions", "(D) Not to be systematic"],
        answer: "(A) Be intellectually curious",
        source: "Exam: OTET 2021 (Set D)"
    },
    {
        type: "Unit III: Curriculum Teaching – Learning Approaches and Evaluation",
        questionNumber: "80",
        question: "Which of the following is the most important in learner centred curriculum?",
        options: ["(A) Teacher", "(B) Child", "(C) Content", "(D) Environment"],
        answer: "(B) Child",
        source: "Exam: OTET 2017 (Set C)"
    },
    {
        type: "Unit III: Curriculum Teaching – Learning Approaches and Evaluation",
        questionNumber: "81",
        question: "Which one is not related with learner centric education?",
        options: ["(A) Emphasis given in child’s learning experience", "(B) Teacher acts as a facilitator of learning", "(C) Teaching through question answer method", "(D) Learner as the central point of learning process"],
        answer: "(C) Teaching through question answer method",
        source: "Exam: OTET 2017 (Set C)"
    },
    {
        type: "Unit III: Curriculum Teaching – Learning Approaches and Evaluation",
        questionNumber: "82",
        question: "A progressive school curriculum should be done in a way that:",
        options: ["(A) Boys and Girls have different curricula", "(B) Intelligent child should not be allowed to mix with normal children", "(C) Children should be given a free hand to choose subjects from a very young age", "(D) It is a flexible and rich curriculum including various co-curricular activities"],
        answer: "(D) It is a flexible and rich curriculum including various co-curricular activities",
        source: "Exam: OTET 2021 (Set D)"
    },
    {
        type: "Unit III: Curriculum Teaching – Learning Approaches and Evaluation",
        questionNumber: "83",
        question: "An empowering school will promote which of the following qualities the most in its teachers?",
        options: ["(A) Competitive aptitude", "(B) Tendency to experiment", "(C) Memory", "(D) Disciplined nature"],
        answer: "(B) Tendency to experiment",
        source: "Exam: OTET 2021 (Set D)"
    },
    {
        type: "Unit III: Curriculum Teaching – Learning Approaches and Evaluation",
        questionNumber: "84",
        question: "Which one does not find place in the curriculum?",
        options: ["(A) objectives", "(B) content", "(C) evaluation", "(D) Teaching method"],
        answer: "(D) Teaching method",
        source: "Exam: OTET 2016 (Set D)"
    },
    {
        type: "Unit III: Curriculum Teaching – Learning Approaches and Evaluation",
        questionNumber: "85",
        question: "Which term is used to express the totality of the learning experiences that the pupil receives through manifold activities in the school?",
        options: ["(A) Curriculum", "(B) Content", "(C) Lesson plan", "(D) Syllabus"],
        answer: "(A) Curriculum",
        source: "Exam: OTET 2017 (Set C)"
    },
    {
        type: "Unit III: Curriculum Teaching – Learning Approaches and Evaluation",
        questionNumber: "86",
        question: "Which of the following is not a 'principle' of curriculum organisation?",
        options: ["(A) Correlation", "(B) Activity", "(C) Manipulation", "(D) Utility"],
        answer: "(C) Manipulation",
        source: "Exam: OTET 2018 (Set D)"
    },
    {
        type: "Unit III: Curriculum Teaching – Learning Approaches and Evaluation",
        questionNumber: "87",
        question: "Which is not a component of core curriculum?",
        options: ["(A) Duty towards constitution", "(B) Study of foreign culture and tradition", "(C) Protection of environment", "(D) Scientific temper"],
        answer: "(B) Study of foreign culture and tradition",
        source: "Exam: OTET 2021 (Set D)"
    },
    {
        type: "Unit III: Curriculum Teaching – Learning Approaches and Evaluation",
        questionNumber: "88",
        question: "Which is not a type of curriculum?",
        options: ["(A) Child centered", "(B) Experience", "(C) Regional", "(D) Activity centered"],
        answer: "(C) Regional",
        source: "Exam: OTET 2021 (Set D)"
    },
    {
        type: "Unit III: Curriculum Teaching – Learning Approaches and Evaluation",
        questionNumber: "89",
        question: "Which is not a projected teaching aid?",
        options: ["(A) Slide projector", "(B) Blackboard", "(C) Overhead projector", "(D) Epidoscope"],
        answer: "(B) Blackboard",
        source: "Exam: OTET 2021 (Set D)"
    },
    {
        type: "Unit III: Curriculum Teaching – Learning Approaches and Evaluation",
        questionNumber: "90",
        question: "After teaching the process of addition and substraction in a period, the teacher asked the following question to test the learning achievements. What type of evaluation is it?",
        options: ["(A) Achievement", "(B) Activity based", "(C) Placement", "(D) Diagnostic"],
        answer: "(D) Diagnostic",
        source: "Exam: OTET 2016 (Set D)"
    },
    {
        type: "Unit III: Curriculum Teaching – Learning Approaches and Evaluation",
        questionNumber: "91",
        question: "By which method of evaluation is the weakness of a student identified?",
        options: ["(A) Diagnostic", "(B) Situation", "(C) Conclusive", "(D) Continuous"],
        answer: "(A) Diagnostic",
        source: "Exam: OTET 2017 (Set C)"
    },
    {
        type: "Unit III: Curriculum Teaching – Learning Approaches and Evaluation",
        questionNumber: "92",
        question: "If a question measures the learning objective it intends to measure, then what quality of the test does it indicate?",
        options: ["(A) Reliability", "(B) objectivity", "(C) utility", "(D) Validity"],
        answer: "(D) Validity",
        source: "Exam: OTET 2016 (Set D)"
    },
    {
        type: "Unit III: Curriculum Teaching – Learning Approaches and Evaluation",
        questionNumber: "93",
        question: "India : New Delhi :: Pakistan : __________ What type of tests is it?",
        options: ["(A) Analogy", "(B) Completion", "(C) Multiple choice", "(D) Recognition"],
        answer: "(A) Analogy",
        source: "Exam: OTET 2016 (Set D)"
    },
    {
        type: "Unit III: Curriculum Teaching – Learning Approaches and Evaluation",
        questionNumber: "94",
        question: "Who did make hierarchical classification of the instructional objectives?",
        options: ["(A) Piaget", "(B) Guilford", "(C) Galton", "(D) Bloom"],
        answer: "(D) Bloom",
        source: "Exam: OTET 2016 (Set D)"
    },
    {
        type: "Unit III: Curriculum Teaching – Learning Approaches and Evaluation",
        questionNumber: "95",
        question: "Which is not reflected in a three dimensional blueprint?",
        options: ["(A) Content", "(B) Difficulty level", "(C) Learning objectives", "(D) Form of questions"],
        answer: "(B) Difficulty level",
        source: "Exam: OTET 2016 (Set D)"
    },
    {
        type: "Unit III: Curriculum Teaching – Learning Approaches and Evaluation",
        questionNumber: "96",
        question: "Which is not a quality of a standard text book?",
        options: ["(A) flexibility", "(B) need based", "(C) utility", "(D) individual based"],
        answer: "(D) individual based",
        source: "Exam: OTET 2016 (Set D)"
    },
    {
        type: "Unit III: Curriculum Teaching – Learning Approaches and Evaluation",
        questionNumber: "97",
        question: "How many rectangles are there in the given figure? What type of instructional objective this question measures?",
        options: ["(A) The pupil indentifies the rectangles", "(B) The pupil counts the rectangles correctly", "(C) The pupil both identifies and counts the rectangles", "(D) None of these"],
        answer: "(C) The pupil both identifies and counts the rectangles",
        source: "Exam: OTET 2016 (Set D)"
    },
    {
        type: "Unit III: Curriculum Teaching – Learning Approaches and Evaluation",
        questionNumber: "98",
        question: "Which is not a component of a three dimensional Blueprint?",
        options: ["(A) Question forms", "(B) Learning objectives", "(C) Learning contents", "(D) Learning level"],
        answer: "(D) Learning level",
        source: "Exam: OTET 2016 (Set D)"
    },
    {
        type: "Unit III: Curriculum Teaching – Learning Approaches and Evaluation",
        questionNumber: "99",
        question: "A teacher prepared a test in Mathematics and administered it to a group of students. He then administered a standardised test to the same group. The co-efficient of correlation (r) of two sets of marks so obtained was +0.90. What does it indicate about the teacher-made test?",
        options: ["(A) The test is valid", "(B) The test is reliable", "(C) The test is objective", "(D) The test is objective based"],
        answer: "(A) The test is valid",
        source: "Exam: OTET 2017 (Set C)"
    },
    {
        type: "Unit III: Curriculum Teaching – Learning Approaches and Evaluation",
        questionNumber: "100",
        question: "What does the acronym LATS stand for?",
        options: ["(A) Learning Assessment Transferring Scheme", "(B) Learners' Achievement Testing System", "(C) Learning Achievement Tracking System", "(D) Learning Activity Testing System"],
        answer: "(C) Learning Achievement Tracking System",
        source: "Exam: OTET 2018 (Set D)"
    },
    {
        type: "Unit III: Curriculum Teaching – Learning Approaches and Evaluation",
        questionNumber: "101",
        question: "Which of the following is an objective of evaluation?",
        options: ["(A) Know about learning difficulties", "(B) Measure the achievement of learning", "(C) Know that learning has actually taken place", "(D) All of the above"],
        answer: "(D) All of the above",
        source: "Exam: OTET 2021 (Set D)"
    },
    {
        type: "Unit III: Curriculum Teaching – Learning Approaches and Evaluation",
        questionNumber: "102",
        question: "Mita wants to know whether she will perform well in a particular job or not. Which of the following tool will predict this?",
        options: ["(A) Achievement test", "(B) Attitude test", "(C) Aptitude test", "(D) Intelligence test"],
        answer: "(C) Aptitude test",
        source: "Exam: OTET 2021 (Set D)"
    },
    {
        type: "Unit III: Curriculum Teaching – Learning Approaches and Evaluation",
        questionNumber: "103",
        question: "Which one is not a tool for learning assessment?",
        options: ["(A) Assessment", "(B) Rating scale", "(C) Check List", "(D) Questionnaire"],
        answer: "(A) Assessment",
        source: "Exam: OTET 2016 (Set D)"
    },
    {
        type: "Unit III: Curriculum Teaching – Learning Approaches and Evaluation",
        questionNumber: "104",
        question: "Which one of the following scales is used to record the progress of the learners in curricular areas?",
        options: ["(A) 4-point scale", "(B) 5-point scale", "(C) 3-point scale", "(D) 6-point scale"],
        answer: "(B) 5-point scale",
        source: "Exam: OTET 2018 (Set D)"
    },
    {
        type: "Unit III: Curriculum Teaching – Learning Approaches and Evaluation",
        questionNumber: "105",
        question: "Which of the following tools could be used as a scoring guide?",
        options: ["(A) Portfolio", "(B) Observation", "(C) Checklist", "(D) Rubric"],
        answer: "(D) Rubric",
        source: "Exam: OTET 2018 (Set D)"
    },
    {
        type: "Unit III: Curriculum Teaching – Learning Approaches and Evaluation",
        questionNumber: "106",
        question: "In which of the following rating scale, a sequence of definite numbers is supplied to the rater or to the observer and the observer awards an appropriate number?",
        options: ["(A) Standard scale", "(B) Rating by cumulative point", "(C) Graphic scale", "(D) Numerical scale"],
        answer: "(D) Numerical scale",
        source: "Exam: OTET 2021 (Set D)"
    },
    {
        type: "Unit III: Curriculum Teaching – Learning Approaches and Evaluation",
        questionNumber: "107",
        question: "A test was administered thrice on a group of students at different intervals. The co-efficient of co-relation (r) of the scores was + 0.72. What quality of the test does it indicate?",
        options: ["(A) validity", "(B) reliability", "(C) utility", "(D) usability"],
        answer: "(B) reliability",
        source: "Exam: OTET 2016 (Set D)"
    },
    {
        type: "Unit III: Curriculum Teaching – Learning Approaches and Evaluation",
        questionNumber: "108",
        question: "Study the statements and choose the correct answer: (I) Evaluation is based on measurement (II) Evaluation is quantitative, but measurement is qualitative.",
        options: ["(A) (I) correct, (II) wrong", "(B) (I) wrong", "(C) (I) and (II) correct", "(D) (I) and (II) wrong"],
        answer: "(A) (I) correct, (II) wrong",
        source: "Exam: OTET 2016 (Set D)"
    },
    {
        type: "Unit III: Curriculum Teaching – Learning Approaches and Evaluation",
        questionNumber: "109",
        question: "What qualities do a standardized test have?",
        options: ["(A) validity, reliability, usability", "(B) reliability, flexibility, validity", "(C) usability, objectivity, reliability", "(D) validity, flexibility, usability"],
        answer: "(A) validity, reliability, usability",
        source: "Exam: OTET 2016 (Set D)"
    },
    {
        type: "Unit III: Curriculum Teaching – Learning Approaches and Evaluation",
        questionNumber: "110",
        question: "Which characteristic does a good test have?",
        options: ["(A) Usability", "(B) Reliability", "(C) Validity", "(D) All of the above"],
        answer: "(D) All of the above",
        source: "Exam: OTET 2017 (Set C)"
    },
    {
        type: "Unit III: Curriculum Teaching – Learning Approaches and Evaluation",
        questionNumber: "111",
        question: "The most common method of estimating internal consistency of a test reliability is the:",
        options: ["(A) Split-half method", "(B) Test-retest method", "(C) Both split-half and test-retest method", "(D) None of these"],
        answer: "(A) Split-half method",
        source: "Exam: OTET 2018 (Set D)"
    },
    {
        type: "Unit III: Curriculum Teaching – Learning Approaches and Evaluation",
        questionNumber: "112",
        question: "What qualities do a standardised test have?",
        options: ["(A) Validity, Reliability and Usability", "(B) Reliability, Flexibility and Validity", "(C) Usability, Subjectivity and Reliability", "(D) Validity, Flexibility and Usability"],
        answer: "(A) Validity, Reliability and Usability",
        source: "Exam: OTET 2018 (Set D)"
    },
    {
        type: "Unit III: Curriculum Teaching – Learning Approaches and Evaluation",
        questionNumber: "113",
        question: "When the scores on a newly constructed test are correlated with scores on a standardised test, then which type of validity needs to be calculated?",
        options: ["(A) Concurrent", "(B) Construct", "(C) Face", "(D) Content"],
        answer: "(A) Concurrent",
        source: "Exam: OTET 2018 (Set D)"
    },
    {
        type: "Unit III: Curriculum Teaching – Learning Approaches and Evaluation",
        questionNumber: "114",
        question: "When a test measures an individual's ability consistently and accurately, then that quality of test is known as ____________________",
        options: ["(A) Validity", "(B) Reliability", "(C) Objectivity", "(D) Focus centered"],
        answer: "(B) Reliability",
        source: "Exam: OTET 2021 (Set D)"
    },
    {
        type: "Unit III: Curriculum Teaching – Learning Approaches and Evaluation",
        questionNumber: "115",
        question: "How can the internal consistency be measured?",
        options: ["(A) Anecdotal Record method", "(B) Test - retest method", "(C) Split - half method", "(D) None of the above"],
        answer: "(C) Split - half method",
        source: "Exam: OTET 2021 (Set D)"
    },
    {
        type: "Unit III: Curriculum Teaching – Learning Approaches and Evaluation",
        questionNumber: "116",
        question: "Which of the following is not a method of estimating reliability of a test?",
        options: ["(A) Test - retest method", "(B) Alternate/parallel form method", "(C) Split - Half method", "(D) Testing condition method"],
        answer: "(D) Testing condition method",
        source: "Exam: OTET 2021 (Set D)"
    },
    {
        type: "Unit III: Curriculum Teaching – Learning Approaches and Evaluation",
        questionNumber: "117",
        question: "Which of the central tendencies is comparatively stable?",
        options: ["(A) Median", "(B) Mean", "(C) Mode", "(D) Distribution"],
        answer: "(B) Mean",
        source: "Exam: OTET 2016 (Set D)"
    },
    {
        type: "Unit III: Curriculum Teaching – Learning Approaches and Evaluation",
        questionNumber: "118",
        question: "What does the lowest and the highest scores of a distribution indicate?",
        options: ["(A) length", "(B) distance", "(C) height", "(D) range"],
        answer: "(D) range",
        source: "Exam: OTET 2016 (Set D)"
    },
    {
        type: "Unit III: Curriculum Teaching – Learning Approaches and Evaluation",
        questionNumber: "119",
        question: "Which of the following measures of variability is used when the statistics having the greatest stability is sought?",
        options: ["(A) Mean Deviation", "(B) Standard Deviation", "(C) Quartile Deviation", "(D) Range"],
        answer: "(B) Standard Deviation",
        source: "Exam: OTET 2018 (Set D)"
    },
    {
        type: "Unit III: Curriculum Teaching – Learning Approaches and Evaluation",
        questionNumber: "120",
        question: "When a constant figure is added to each individual score, what will be the effect on mean value?",
        options: ["(A) Mean value will be added by the same figure", "(B) Mean value will be subtracted by the same figure", "(C) Mean value will be multiplied by the same figure", "(D) Mean value will be divided by the same figure"],
        answer: "(A) Mean value will be added by the same figure",
        source: "Exam: OTET 2018 (Set D)"
    }
]
