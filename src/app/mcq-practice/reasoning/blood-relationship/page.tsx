'use client';

import { Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight, CheckCircle, Lightbulb, XCircle, Timer, Edit, Sparkles, Wand2, HelpCircle, Loader2 } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { DrawingCanvas } from "@/components/drawing-canvas";


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
        questionNumber: 22,
        question: "P and Q are brothers, R and S are sister P’s son is S’s brother. How is Q related to R ?",
        options: ["Uncle", "Brother", "Father", "Grandfather"],
        source: "SSC Combined Matric Level (PRE) Exam. 24.10.1999 (Ist Sitting)",
        answer: "Uncle"
    },
    {
        type: "TYPE–I",
        questionNumber: 23,
        question: "X is the husband of Y. W is the daughter of X. Z is husband of W. N is the daughter of Z. What is the relationship of N to Y ?",
        options: ["Cousin", "Niece", "Daughter", "Granddaughter"],
        source: "SSC Combined Matric Level (PRE) Exam. 24.10.1999 (IInd Sitting)",
        answer: "Granddaughter"
    },
    {
        type: "TYPE–I",
        questionNumber: 24,
        question: "‘A’ reads a book and find the name of the author familiar. The author ‘B’ is the paternal uncle of ‘C’. ‘C’ is the daughter of ‘A’. How is ‘B’ related to ‘A’?",
        options: ["Brother", "Sister", "Father", "Uncle"],
        source: "SSC Combined Matric Level (PRE) Exam. 21.05.2000 (Ist Sitting)(East Zone)",
        answer: "Brother"
    },
    {
        type: "TYPE–I",
        questionNumber: 25,
        question: "A’s mother is sister of B and she has a daughter C who is 21 years old. How is B related to C?",
        options: ["Uncle", "Maternal Uncle", "Niece", "Daughter"],
        source: "SSC Combined Matric Level (PRE) Exam. 21.05.2000 (Ist Sitting) (Raipur, Madhya Pradesh)",
        answer: "Maternal Uncle"
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
        questionNumber: 26,
        question: "A is B’s brother, C is A’s mother, D is C’s father, F is A’s son. How is F related to D ?",
        options: ["Son", "Grandson", "Great grandson", "Grand–daughter"],
        source: "SSC Combined Matric Level (PRE) Exam. 05.05.2002 (Ist Sitting) (Eastern Zone, Guwahati)",
        answer: "Great grandson"
    },
    {
        type: "TYPE–I",
        questionNumber: 27,
        question: "A is B’s brother, C is A’s mother, D is C’s father, E is B’s son, How is B related to D?",
        options: ["Son", "Granddaughter", "Grandfather", "Great grandfather"],
        source: "SSC Combined Matric Level (PRE) Exam. 05.05.2002 (IInd Sitting) (Eastern Zone, Guwahati)",
        answer: "Granddaughter"
    },
    {
        type: "TYPE–I",
        questionNumber: 28,
        question: "A is B’s brother, C is A’s mother, D is C’s father, F is A’s son. How is B related to F’s child?",
        options: ["Aunt", "Cousin", "Nephew", "Grandfather"],
        source: "SSC Combined Matric Level (PRE) Exam. 05.05.2002 (Ist Sitting) (North Zone, Delhi)",
        answer: "Grandfather"
    },
    {
        type: "TYPE–I",
        questionNumber: 29,
        question: "A is B’s daughter. B is C’s mother. D is C’s brother. How is D related to A?",
        options: ["Father", "Grandfather", "Brother", "Son"],
        source: "SSC Combined Matric Level (PRE) Exam. 05.05.2002 (Ist Sitting) (North Zone, Delhi)",
        answer: "Brother"
    },
    {
        type: "TYPE–I",
        questionNumber: 30,
        question: "A is D’s brother. D is B’s father. B and C are Sisters. How is C related to A ?",
        options: ["Cousin", "Niece", "Aunt", "Nephew"],
        source: "SSC Combined Matric Level (Pre) Exam. 05.05.2002 (IInd Sitting) (North Zone Delhi)",
        answer: "Niece"
    },
    {
        type: "TYPE–I",
        questionNumber: 31,
        question: "A is B’s brother, C is A’s mother, D is C’s father, E is B’s son. How is D related to E?",
        options: ["Grandson", "Great Grandson", "Great Grandfather", "Grandfather"],
        source: "SSC Combined Matric Level (Pre) Exam. 12.05.2002 (Ist Sitting)",
        answer: "Great Grandfather"
    },
    {
        type: "TYPE–I",
        questionNumber: 32,
        question: "X and Y are the children of A. A is the father of X but Y is not his son. How is Y related to A?",
        options: ["Sister", "Brother", "Son", "Daughter"],
        source: "SSC Combined Matric Level (Pre) Exam. 12.05.2002 (Ist Sitting)",
        answer: "Daughter"
    },
    {
        type: "TYPE–I",
        questionNumber: 33,
        question: "A is B’s brother, C is A’s mother, D is C’s father, E is B’s son. How is E related to A?",
        options: ["Cousin", "Nephew", "Uncle", "Grandson"],
        source: "SSC Combined Matric Level (Pre) Exam. 12.05.2022 (IInd Sitting)",
        answer: "Nephew"
    },
    {
        type: "TYPE–I",
        questionNumber: 34,
        question: "Based on the statements, given below, find out who is the uncle of ‘P’? K is the brother of J. M is the sister of K. P is the brother of N. N is the daughter of J.",
        options: ["K", "J", "N", "M"],
        source: "SSC Combined Matric Level (Pre) Exam. 16.06.2002 (Re-Exam)",
        answer: "K"
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
    },
    {
        type: "TYPE–I",
        questionNumber: 11,
        question: "A is B’s sister, C is B’s mother, D is C’s father, E is D’s mother, then how A is related to D ?",
        options: ["Grandfather", "Daughter", "Grandmother", "Grand daughter"],
        source: "SSC CPO Sub-Inspector Exam.26.05.2005)",
        answer: "Grand daughter"
    },
    {
        type: "TYPE–I",
        questionNumber: 12,
        question: "(I) F is the brother of A, (II) C is the daughter of A, (III) K is the sister of F, (IV) G is the brother of C. Who is the uncle of G ?",
        options: ["A", "C", "K", "F"],
        source: "SSC Combined Graduate Level Prelim Exam.13.11.2005 (Ist Sitting)",
        answer: "F"
    },
    {
        type: "TYPE–I",
        questionNumber: 35,
        question: "A and B are sisters. A is mother of D. B has a daughter C who is married to F. G is the husband of A. How is C related to D?",
        options: ["Cousin", "Niece", "Aunt", "Sister-in-law"],
        source: "SSC Combined Matric Level (Pre) Exam. 30.07.2006 (Ist Sitting) (East Zone)",
        answer: "Cousin"
    },
    {
        type: "TYPE–I",
        questionNumber: 36,
        question: "R and S are brothers, X is the sister of Y and X is the mother of R. What is Y to S?",
        options: ["Uncle", "Brother", "Father", "Mother"],
        source: "SSC Combined Matric Level (Pre) Exam. 30.07.2006 (IInd Sitting) (Central Zone)",
        answer: "Uncle"
    },
    {
        type: "TYPE–I",
        questionNumber: 13,
        question: "A is B’s brother. C is A’s father. D is C’s sister and E is D’s mother. How is B related to E ?",
        options: ["Granddaughter", "Great-granddaughter", "Grandaunt", "Daughter"],
        source: "SSC CPO Sub-Inspector Exam.16.12.2007)",
        answer: "Granddaughter"
    },
    {
        type: "TYPE–I",
        questionNumber: 37,
        question: "A is B’s brother, C is A’s mother, D is C’s father, B is D’s granddaughter. How is B related to F who is A’s son ?",
        options: ["Aunt", "Cousin", "Niece", "Grandaunt"],
        source: "SSC Combined Matric Level (Pre) Exam. 30.03.2008 (Ist Sitting)",
        answer: "Aunt"
    },
    {
        type: "TYPE–I",
        questionNumber: 38,
        question: "A is the son of B, while B and C are sisters to one another. E is the mother of C. If D is the son of E, which of the following statements is correct?",
        options: ["D is the maternal uncle of A", "E is the brother of B", "D is the cousin of A", "B and D are brothers"],
        source: "(SSC DEO Exam. 31.08.2008)",
        answer: "D is the maternal uncle of A"
    },
    {
        type: "TYPE–I",
        questionNumber: 14,
        question: "A is father of C and D is son of B. E is brother of A. If C is sister of D how is B related to E ?",
        options: ["Sister – in – law", "Sister", "Brother", "Brother – in – law"],
        source: "SSC Combined Graduate Level Prelim Exam. 27.07.2008 (Ist Sitting)",
        answer: "Sister – in – law"
    },
    {
        type: "TYPE–I",
        questionNumber: 15,
        question: "C is wife of B, E is the son of C, A is the brother of B and father of D. What is the relationship of E to D ?",
        options: ["Mother", "Sister", "Brother", "Cousin"],
        source: "SSC Combined Graduate Level Prelim Exam. 27.07.2008 (IInd Sitting)",
        answer: "Cousin"
    },
    {
        type: "TYPE–I",
        questionNumber: 39,
        question: "P is the father of T. T is the daughter of M. M is the daughter of K. What is P to K ?",
        options: ["Father", "Father-in-law", "Brother", "Son-in-law"],
        source: "SSC Stenographer (Grade'C & D') Exam. 26.09.2010",
        answer: "Son-in-law"
    },
    {
        type: "TYPE–I",
        questionNumber: 40,
        question: "A and B are brothers. E is the daugther of F. F is the wife of B. What is the relation of E to A ?",
        options: ["sister", "daugther", "niece", "sister-in-law"],
        source: "SSC Higher Secondary Level Data Entry Operator & LDC Exam. 28.11.2010 (Ist sitting)",
        answer: "niece"
    },
    {
        type: "TYPE–I",
        questionNumber: 41,
        question: "M and F are a married couple. A and B are sisters. A is the sister of F. Who is B to M ?",
        options: ["Sister", "Sister-in-law", "Niece", "Daughter"],
        source: "SSC Higher Secondary Level Data Entry Operator & LDC Exam. 28.11.2010 (IInd sitting)",
        answer: "Sister-in-law"
    },
    {
        type: "TYPE–I",
        questionNumber: 16,
        question: "M is the son of P. Q is the granddaughter of O who is the husband of P. How is M related to O ?",
        options: ["Son", "Daughter", "Mother", "Father"],
        source: "SSC Combined Graduate Level Tier-1 Exam.16.05.2010 (Ist Sitting)",
        answer: "Son"
    },
    {
        type: "TYPE–I",
        questionNumber: 17,
        question: "X and Y are brothers. R is the father of Y. S is the brother of T and maternal uncle of X. What is T to R?",
        options: ["Mother", "Wife", "Sister", "Brother"],
        source: "SSC Combined Graduate Level Tier-1 Exam.16.05.2010 (IInd Sitting)",
        answer: "Wife"
    },
    {
        type: "TYPE–I",
        questionNumber: 18,
        question: "A is B’s Sister. C is B’s Mother. D is C’s Father. E is D’s Mother. Then how is A related to D ?",
        options: ["Grandmother", "Grandfather", "Daughter", "Granddaughter"],
        source: "SSC SAS Exam. 26.06.2010 (Paper-I)",
        answer: "Granddaughter"
    },
    {
        type: "TYPE–I",
        questionNumber: 19,
        question: "A is father of B and C. B is the son of A. But C is not the son of A. How is C related to A ?",
        options: ["Niece", "Son-in-law", "Daughter", "Grandson"],
        source: "SSC CISF ASI Exam. 29.08.2010 (Paper-I)",
        answer: "Daughter"
    },
    {
        type: "TYPE–I",
        questionNumber: 20,
        question: "A is the father of B, C is the daughter of B, D is the brother of B, E is the son of A. What is the relationship between C and E ?",
        options: ["Brother and sister", "Cousins", "Niece and uncle", "Uncle and aunt"],
        source: "SSC CPO Sub-Inspector Exam. 12.12.2010 (Paper-I)",
        answer: "Niece and uncle"
    },
    {
        type: "TYPE–I",
        questionNumber: 42,
        question: "If A is the mother of D, B is not the son of C, C is the father of D, D is the sister of B, then how is A related to B ?",
        options: ["Mother", "Brother", "Step son", "Sister"],
        source: "SSC Stenographer Grade 'C' & 'D' Exam. 09.01.2011)",
        answer: "Mother"
    },
    {
        type: "TYPE–I",
        questionNumber: 43,
        question: "A and B are brother and sister respectively. C is A’s father, D is C’s sister and E is D’s mother. How is B related to E ?",
        options: ["Grand-daughter", "Great-grand-daughter", "Aunt", "Daughter"],
        source: "SSC Multi-Tasking (Non-Technical) Staff Exam. 20.02.2011)",
        answer: "Grand-daughter"
    },
    {
        type: "TYPE–I",
        questionNumber: 44,
        question: "Q is the son of P, X is the daughter of Q, R is the aunty (Bua) of X and L is the son of R, then what is L to P ?",
        options: ["Grandson", "Granddaughter", "Daughter", "Nephew"],
        source: "SSC Multi-Tasking (Non-Technical) Staff Exam. 27.02.2011)",
        answer: "Grandson"
    },
    {
        type: "TYPE–I",
        questionNumber: 21,
        question: "If P is the husband of Q and R is the mother of S and Q, what is R to P ?",
        options: ["Mother", "Sister", "Aunt", "Mother-in-law"],
        source: "SSC CPO (SI, ASI & Intelligence Officer) Exam. 28.08.2011 (Paper-I)",
        answer: "Mother-in-law"
    },
    {
        type: "TYPE–I",
        questionNumber: 45,
        question: "P and Q are brothers. R and S are sisters. P’s son is S’s brother. How is Q related to R ?",
        options: ["Uncle", "Brother", "Father", "Grandfather"],
        source: "SSC (10+2) Level Data Entry Operator & LDC Exam. 04.12.2011 (IInd Sitting (North Zone)",
        answer: "Uncle"
    },
    {
        type: "TYPE–I",
        questionNumber: 46,
        question: "A and B are the young ones of C. If C is the mother of B, but A is not the daughter of C, then what is the relationship between C and A ?",
        options: ["Nephew and Aunty", "Brother and Sister", "Mother and Son", "Niece and Aunty"],
        source: "SSC (10+2) Level Data Entry Operator & LDC Exam. 11.12.2011 (Ist Sitting (East Zone)",
        answer: "Mother and Son"
    },
    {
        type: "TYPE–I",
        questionNumber: 47,
        question: "A is the mother of D and sister of B. B has a daughter C who is married to F. G is the husband of A. How is G related to D ?",
        options: ["uncle", "husband", "son", "father"],
        source: "SSC Level Data Entry Operator & LDC Exam. 21.10.2012 (IInd Sitting)",
        answer: "father"
    },
    {
        type: "TYPE–I",
        questionNumber: 48,
        question: "Pointing towards A, B said “your mother is the younger sister of my mother”. How is A related to B ?",
        options: ["Uncle", "Cousin", "Nephew", "Father"],
        source: "SSC Level Data Entry Operator & LDC Exam. 28.10.2012 (Ist Sitting)",
        answer: "Cousin"
    },
    {
        type: "TYPE–I",
        questionNumber: 49,
        question: "A is B’s wife’s husband’s brother. C and D are sisters of B. How is A related to C ?",
        options: ["Brother", "Sister-in-law", "Wife", "Sister"],
        source: "SSC CGL Tier-I Re-Exam–2013, 27.04.2014)",
        answer: "Brother"
    },
    {
        type: "TYPE–I",
        questionNumber: 50,
        question: "A and B are brothers. C and D are sisters. A’s son is D’s brother. How is B related to C?",
        options: ["Father", "Brother", "Uncle", "Son"],
        source: "SSC CAPFs SI, CISF ASI & Delhi Police SI Exam. 22.06.2014)",
        answer: "Uncle"
    },
    {
        type: "TYPE–I",
        questionNumber: 51,
        question: "A is B’s sister. C is B’s mother. D is C’s father. E is D’s mother. Then how is A related to D ?",
        options: ["Grandmother", "Grandfather", "Daughter", "Granddaughter"],
        source: "SSC CHSL (10+2) DEO & LDC Exam. 16.11.2014, Patna Region : Ist Sitting",
        answer: "Granddaughter"
    },
    {
        type: "TYPE–I",
        questionNumber: 52,
        question: "P, Q, R, S, T, U are 6 members of a family in which there are two married couples. T, a teacher is married to a doctor who is mother of R and U. Q, the lawyer is married to P - P has one son and one grandson. Of the two married ladies one is a house wife. There is also one student and one male engineer in the family. Which of the following is true about the grand-daughter of the family ?",
        options: ["She is a lawyer", "She is an engineer", "She is a student", "She is a doctor"],
        source: "SSC CGL Tier-I Exam, 09.08.2015 (IInd Sitting) TF No. 4239378)",
        answer: "She is a student"
    },
    {
        type: "TYPE–I",
        questionNumber: 53,
        question: "Six members of a family namely A, B, C, D, E and F are travelling together. ‘B’ is the son of C but C is not the mother of B. A and C are married couple. E is the brother of C. D is the daughter of A. F is the brother of B. How many male members are there in the family?",
        options: ["3", "2", "4", "1"],
        source: "SSC CGL Tier-I Exam, 16.08.2015 (IInd Sitting) TF No. 2176783)",
        answer: "4"
    },
    {
        type: "TYPE–I",
        questionNumber: 54,
        question: "A’s mother is sister of B and has a daughter C. How can A be related to B from among the following?",
        options: ["Niece", "Uncle", "Daughter", "Father"],
        source: "SSC (10+2) Stenographer Grade ‘C’ & ‘D’ Exam. 31.01.2016 TF No. 3513283)",
        answer: "Niece"
    },
    {
        questionNumber: 36,
        question: "Rishi's mother is the only daughter of Maria's father. What is the relation between Maria's husband and Rishi?",
        options: ["Uncle", "Father", "Grandfather", "Brother"],
        source: "RRB NTPC – 30.04.2016 Shift-I",
        answer: "Father",
        type: "TYPE–I"
    },
    {
        questionNumber: 56,
        question: "Joshi said to Chitra, \"Your daughter's father is the son of my brother.\" How is Joshi's brother related to Chitra's daughter?",
        options: ["Son", "Uncle", "Grandfather", "Grandson"],
        source: "RRB NTPC – 28.03.2016 Shift-II",
        answer: "Grandfather",
        type: "TYPE–I"
    },
    {
        questionNumber: 57,
        question: "A man introduces a lady as the daughter of the father of his uncle. His uncle has only one brother. The lady is the man's ______.",
        options: ["Mother", "Paternal Aunt", "Sister", "Daughter"],
        source: "RRB NTPC – 30.03.2016 Shift-I",
        answer: "Paternal Aunt",
        type: "TYPE–I"
    },
    {
        questionNumber: 95,
        question: "Looking at a picture, Pushpa said, \"This man's wife Lakshmi is the mother of my daughter's Aunt.\" How is Pushpa related to Lakshmi?",
        options: ["Mother-in-law", "Grandmother", "Mother", "Daughter-in-law"],
        source: "RRB NTPC – 31.03.2016 Shift-III",
        answer: "Daughter-in-law",
        type: "Type-2"
    },
    {
        questionNumber: 58,
        question: "Rita introduced Seema as daughter of only son of her mother. How is Rita related to Seema?",
        options: ["Cousin", "Paternal Aunt", "Niece", "Maternal Aunt"],
        source: "RRB NTPC – 02.04.2016 Shift-III",
        answer: "Cousin",
        type: "TYPE–I"
    },
    {
        questionNumber: 59,
        question: "Anita is the only daughter of the father of Arjun's maternal uncle. How is Anita related to Arjun?",
        options: ["Sister", "Mother", "Aunt", "Grandmother"],
        source: "RRB NTPC – 02.04.2016 Shift-I",
        answer: "Mother",
        type: "TYPE–I"
    },
    {
        questionNumber: 60,
        question: "Ankit introduced Shila as only sister of his son's grandfather. How is Shila related to Ankit?",
        options: ["Mother", "Aunt", "Sister", "Daughter"],
        source: "RRB NTPC – 03.04.2016 Shift-III",
        answer: "Aunt",
        type: "TYPE–I"
    },
    {
        questionNumber: 61,
        question: "Kapil is the brother of son of the only granddaughter of the father of Mita's mother. How is Kapil related to Mita?",
        options: ["Son", "Uncle", "Nephew", "Grandson"],
        source: "RRB NTPC – 03.04.2016 Shift-III",
        answer: "Nephew",
        type: "TYPE–I"
    },
    {
        questionNumber: 62,
        question: "Kitty said, \"Uttara is one of the two daughters of my mother's brother's wife.\" How is Uttara's sister related to Kitty's mother?",
        options: ["Aunt", "Mother", "Granddaughter", "Sister"],
        source: "RRB NTPC – 03.04.2016 Shift-I",
        answer: "Aunt",
        type: "TYPE–I"
    },
    {
        questionNumber: 63,
        question: "Adil said, \"That woman is the only daughter-in-law of my nephew's father's mother.\" If Adil has only one brother, then how is the woman related to Adil?",
        options: ["Sister", "Mother", "Niece", "Sister-in-law"],
        source: "RRB NTPC – 04.04.2016 Shift-III",
        answer: "Sister-in-law",
        type: "TYPE–I"
    },
    {
        questionNumber: 96,
        question: "Akbar pointed to a picture and said, \"She is the only niece of my brother-in-law's father's brother.\" How is she related to Akbar?",
        options: ["Daughter", "Sister", "Sister-in-law", "Wife"],
        source: "RRB NTPC – 04.04.2016 Shift-III",
        answer: "Wife",
        type: "Type-2"
    },
    {
        questionNumber: 64,
        question: "Guru's mother is the only daughter of Sachin's mother. How is Guru related to Sachin?",
        options: ["Maternal Uncle", "Nephew", "Brother", "Father"],
        source: "RRB NTPC – 04.04.2016 Shift-I",
        answer: "Nephew",
        type: "TYPE–I"
    },
    {
        questionNumber: 45,
        question: "Hardy said, \"Lorel's aunt is the first daughter of my father's father-in-law. My maternal grandmother had only two daughters.\" How is Lorel related to Hardy's mother?",
        options: ["Niece", "Son", "Sister", "Aunt"],
        source: "RRB NTPC – 07.04.2016 Shift-II",
        answer: "Son",
        type: "TYPE–I"
    },
    {
        questionNumber: 89,
        question: "Pointing to the man receiving the award, Sunny said, \"He is the brother of my uncle's daughter.\" How is the man related to Sunny?",
        options: ["Cousin", "Brother-in-law", "Nephew", "Uncle"],
        source: "RRB NTPC – 07.04.2016 Shift-III",
        answer: "Cousin",
        type: "Type-2"
    },
    {
        questionNumber: 90,
        question: "Rani said pointing to a man in a photo, \"His mother's only daughter is my mother.\" How is Rani related to the man?",
        options: ["Wife", "Sister", "Niece", "Nephew"],
        source: "RRB NTPC – 07.04.2016 Shift-III",
        answer: "Niece",
        type: "Type-2"
    },
    {
        questionNumber: 46,
        question: "Gopal's mother is the wife of the son of Mohit's father's son. Mohit has no brother or sister. How are Gopal and Mohit related?",
        options: ["Father-Son", "Uncle-Nephew", "Son-Father", "Grandson-Grandfather"],
        source: "RRB NTPC – 09.04.2016 Shift-III",
        answer: "Son-Father",
        type: "TYPE–I"
    },
    {
        questionNumber: 47,
        question: "Introducing Nitin to her husband, a woman said, \"His brother's father is the only child of my grandfather.\" How is this woman related to Nitin?",
        options: ["Mother", "Aunt", "Sister", "Daughter"],
        source: "RRB NTPC – 11.04.2016 Shift-III",
        answer: "Sister",
        type: "TYPE–I"
    },
    {
        questionNumber: 91,
        question: "Pointing to a woman, Urmi said, \"She is the daughter-in-law of the grandmother of my father's only son.\" How is this woman related to Urmi?",
        options: ["Sister-in-law", "Mother", "Sister", "Mother-in-law"],
        source: "RRB NTPC – 11.04.2016 Shift-III",
        answer: "Mother",
        type: "Type-2"
    },
    {
        questionNumber: 48,
        question: "Anand's mother is the sister of the son of Chandra's father. How is Anand related to Chandra's father?",
        options: ["Grandfather", "Father", "Uncle", "Grandson"],
        source: "RRB NTPC – 11.04.2016 Shift-II",
        answer: "Grandson",
        type: "TYPE–I"
    },
    {
        questionNumber: 49,
        question: "Ram said, \"This girl is the wife of the grandson of my mother.\" How is Ram related to the girl?",
        options: ["Husband", "Father", "Father-in-law", "Grandfather"],
        source: "RRB NTPC – 11.04.2016 Shift-I",
        answer: "Father-in-law",
        type: "TYPE–I"
    },
    {
        questionNumber: 92,
        question: "Pointing to a boy in a picture, Rani said, \"His mother's only daughter is my mother.\" How is Rani related to that boy?",
        options: ["Wife", "Sister", "Niece", "Nephew"],
        source: "RRB NTPC – 11.04.2016 Shift-I",
        answer: "Niece",
        type: "Type-2"
    },
    {
        questionNumber: 50,
        question: "How is Shweta related to Kamala? (Based on given diagram in original paper)",
        options: ["Niece", "Granddaughter", "Daughter", "Sister"],
        source: "RRB NTPC – 12.04.2016 Shift-II",
        answer: "Granddaughter",
        type: "TYPE–I"
    },
    {
        questionNumber: 82,
        question: "Pointing to a person, Nayan says, \"His only brother is the father of my daughter's father.\" How is the person related to Nayan?",
        options: ["Father", "Grandfather", "Uncle", "Brother-in-law"],
        source: "RRB NTPC – 29.04.2016 Shift-III",
        answer: "Uncle",
        type: "Type-2"
    },
    {
        questionNumber: 83,
        question: "Pointing to a picture, Amisha says, \"He is the son of my grandfather's only son.\" How is the person in the picture related to Amisha?",
        options: ["Brother", "Uncle", "Son", "Father"],
        source: "RRB NTPC – 29.04.2016 Shift-III",
        answer: "Brother",
        type: "Type-2"
    },
    {
        questionNumber: 84,
        question: "Pointing to a person, Nitish says, \"His only brother is the father of my daughter's father.\" How is the person related to Nitish?",
        options: ["Father", "Grandfather", "Uncle", "Brother-in-law"],
        source: "RRB NTPC – 30.04.2016 Shift-III",
        answer: "Uncle",
        type: "Type-2"
    },
    {
        questionNumber: 85,
        question: "Pointing to an old man, Kamal said, \"His son is my son's uncle.\" How is the old man related to Kamal?",
        options: ["Brother", "Uncle", "Father", "Grandfather"],
        source: "RRB NTPC – 30.04.2016 Shift-I",
        answer: "Father",
        type: "Type-2"
    },
    {
        questionNumber: 86,
        question: "Pointing to the lady in the metro, Twinkle said, \"She is the sister of the father of my mother's son.\" How is that lady related to Twinkle?",
        options: ["Mother", "Sister", "Aunt", "Niece"],
        source: "RRB NTPC – 29.04.2016 Shift-II",
        answer: "Aunt",
        type: "Type-2"
    },
    {
        questionNumber: 37,
        question: "Hemant said to Naitik, \"That boy who is playing football is the younger of the two brothers of the daughter of my father's wife.\" How is the boy who is playing football related to Hemant?",
        options: ["Son", "Brother", "Cousin", "Nephew"],
        source: "RRB NTPC – 29.04.2016 Shift-II",
        answer: "Brother",
        type: "TYPE–I"
    },
    {
        questionNumber: 87,
        question: "Pointing towards a picture of a person, Ritu says, \"He is the grandfather of the only nephew of only unmarried brother of my son's wife.\" How is the person related to Ritu?",
        options: ["Husband", "Father", "Father-in-law", "Grandfather"],
        source: "RRB NTPC – 28.04.2016 Shift-III",
        answer: "Husband",
        type: "Type-2"
    },
    {
        questionNumber: 38,
        question: "Ajay says, \"That woman is the grandmother of the son of my mother's only sister-in-law.\" If Ajay's father has only one brother and Ajay's mother has no brother, then how is the woman related to Ajay?",
        options: ["Grandmother", "Wife", "Maternal Grandmother", "Mother"],
        source: "RRB NTPC – 28.04.2016 Shift-III",
        answer: "Grandmother",
        type: "TYPE–I"
    },
    {
        questionNumber: 39,
        question: "Divya says, \"That lady is the grandmother of the son of only brother of my husband's sister.\" How is that lady related to Divya?",
        options: ["Mother", "Mother-in-law", "Maternal Aunt", "Maternal Grandmother"],
        source: "RRB NTPC – 28.04.2016 Shift-II",
        answer: "Mother-in-law",
        type: "TYPE–I"
    },
    {
        questionNumber: 40,
        question: "Hiten introduced Mita as mother-in-law of the only sister of the only son of his son's maternal grandfather. How is Mita related to Hiten?",
        options: ["Mother", "Mother-in-law", "Wife", "Maternal Aunt"],
        source: "RRB NTPC – 28.04.2016 Shift-II",
        answer: "Mother",
        type: "TYPE–I"
    },
    {
        questionNumber: 41,
        question: "Mark says, \"Linda is the wife of my mother's grandson.\" How is Mark related to Linda?",
        options: ["Father", "Grandfather", "Father-in-law", "Husband"],
        source: "RRB NTPC – 26.04.2016 Shift-III",
        answer: "Father-in-law",
        type: "TYPE–I"
    },
    {
        questionNumber: 42,
        question: "Vijay says, \"This person is the son-in-law of the maternal grandmother of my sister's son.\" If Vijay has only one brother or sister, then how is that person related to Vijay?",
        options: ["Brother", "Brother-in-law", "Maternal Uncle", "Cousin Brother"],
        source: "RRB NTPC – 22.04.2016 Shift-III",
        answer: "Brother-in-law",
        type: "TYPE–I"
    },
    {
        questionNumber: 68,
        question: "A family has six members. Chitra is the sister of Rakesh. Badri is Aniya's husband's brother. Dileep is father of Arun and grandfather of Rakesh. The family consists of two fathers, three brothers and one mother. How many men are there in the family?",
        options: ["Three", "One", "Four", "Two"],
        source: "RRB NTPC – 16.04.2016 Shift-I",
        answer: "Four",
        type: "TYPE–I"
    },
    {
        questionNumber: 69,
        question: "(Same family as Q68) Which of the following is the group of brothers?",
        options: ["Arun, Badri, Dileep", "Arun, Badri, Rakesh", "Badri, Rakesh, Chitra", "Badri, Dileep, Rakesh"],
        source: "RRB NTPC – 16.04.2016 Shift-I",
        answer: "Arun, Badri, Rakesh",
        type: "TYPE–I"
    },
    {
        questionNumber: 51,
        question: "Ajit is the son of Kumar. Kumar's sister Sushmita has a son Deepak and a daughter Harishma. Babu is Deepak's maternal uncle. How is Harishma related to Babu?",
        options: ["Daughter", "Niece", "Sister", "Wife"],
        source: "RRB NTPC – 16.04.2016 Shift-II",
        answer: "Niece",
        type: "TYPE–I"
    },
    {
        questionNumber: 52,
        question: "(Same family as Q51) How many nephews does Babu have?",
        options: ["One", "Two", "Three", "Zero"],
        source: "RRB NTPC – 16.04.2016 Shift-II",
        answer: "Three",
        type: "TYPE–I"
    },
    {
        questionNumber: 53,
        question: "(Same family as Q51) How is Ajit related to Deepak?",
        options: ["Nephew", "Brother", "Uncle", "Cousin"],
        source: "RRB NTPC – 16.04.2016 Shift-II",
        answer: "Cousin",
        type: "TYPE–I"
    },
    {
        type: "TYPE–I",
        questionNumber: 55,
        question: "A and B are a married couple. C and D are brothers. C is the brother of A. How is D related to B ?",
        options: ["Brother", "Son–in–law", "Cousin", "Brother–in–law"],
        source: "SSC (10+2) Stenographer Grade ‘C’ & ‘D’ Exam. 31.07.2016)",
        answer: "Brother–in–law"
    },
    {
        type: "TYPE–I",
        questionNumber: 56,
        question: "A and B are married couple. X and Y are brothers. X is the brother of A. How is Y related to B ?",
        options: ["Brother-in-law", "Brother", "Son-in-law", "Cousin"],
        source: "SSC CGL Tier-I (CBE) Exam.11.09.2016) (Ist Sitting)",
        answer: "Brother-in-law"
    },
    {
        type: "TYPE–I",
        questionNumber: 57,
        question: "A man ‘P’ goes to a party hosted by his brother ‘Q’ who has a daughter M. M is dancing with her brother ‘N’. How is ‘P’ related to ‘N’ ?",
        options: ["Nephew", "Father", "Uncle", "Cousin"],
        source: "SSC CPO Exam. 06.06.2016)(Ist Sitting)",
        answer: "Uncle"
    },
    {
        type: "TYPE–I",
        questionNumber: 58,
        question: "There is a family of six persons P, Q, R, S, T and U. They are Lawyer, Doctor, Teacher, Salesman, Engineer and Manager. There are two married couples in the family. S, the Salesman is married to the Lady Teacher. The Doctor is married to the Lawyer. U, the Manager, is the son of Q and brother of T. R, the Lawyer, is the daughter- in-law of P. T is the unmarried Engineer. P is the grandmother of U. Which of the following is one of the married couples ?",
        options: ["T and R", "P and S", "S and Q", "T and P"],
        source: "SSC CPO Exam. 06.06.2016) (Ist Sitting)",
        answer: "P and S"
    },
    {
        type: "TYPE–I",
        questionNumber: 59,
        question: "There is a family of six persons P, Q, R, S, T and U. They are Lawyer, Doctor, Teacher, Salesman, Engineer and Manager. There are two married couples in the family. S, the Salesman is married to the Lady Teacher. The Doctor is married to the Lawyer. U, the Manager, is the son of Q and brother of T. R, the Lawyer, is the daughter- in-law of P. T is the unmarried Engineer. P is the grandmother of U. What is the profession of P ?",
        options: ["Lawyer", "Engineer", "Doctor", "Teacher"],
        source: "SSC CPO Exam. 06.06.2016) (Ist Sitting)",
        answer: "Teacher"
    },
    {
        type: "TYPE–I",
        questionNumber: 60,
        question: "A family consists of six members A, B, C, D, E and F. There are two married couples. B is a doctor and the father of E. F is the grandfather of C and is a contractor, D is grandmother of E and is a housewife. There is one doctor, one contractor, one nurse, one housewife and two students in the family. What is the profession of A ?",
        options: ["Doctor", "Contractor", "Nurse", "Housewife"],
        source: "SSC CPO Exam. 06.06.2016) (Ist Sitting)",
        answer: "Nurse"
    },
    {
        type: "TYPE–I",
        questionNumber: 61,
        question: "A family consists of six members A, B, C, D, E and F. There are two married couples. B is a doctor and the father of E. F is the grandfather of C and is a contractor, D is grandmother of E and is a housewife. There is one doctor, one contractor, one nurse, one housewife and two students in the family. Who is the husband of A ?",
        options: ["C", "B", "F", "D"],
        source: "SSC CPO Exam. 06.06.2016) (Ist Sitting)",
        answer: "B"
    },
    {
        type: "TYPE–I",
        questionNumber: 62,
        question: "If A is the mother of B and K, D is the husband of A. E is the son of D’s brother, what is the relation of A with E ?",
        options: ["Mother – in – law", "Sister – in – law", "Aunt", "Sister"],
        source: "SSC CHSL (10+2) Tier-I (CBE) Exam. 08.09.2016) (Ist Sitting)",
        answer: "Aunt"
    },
    {
        type: "TYPE–I",
        questionNumber: 63,
        question: "A is D’s brother. D is B’s father. B and C are sisters. How is C related to A?",
        options: ["Cousin", "Niece", "Aunt", "Nephew"],
        source: "SSC CGL Tier-I (CBE) Exam. 09.09.2016) (Ist Sitting)",
        answer: "Niece"
    },
    {
        type: "TYPE–I",
        questionNumber: 64,
        question: "X and Y are brothers. R is the father of Y. T is the sister of S who is maternal uncle of X. How is T related to R ?",
        options: ["Mother", "Wife", "Sister", "Brother"],
        source: "SSC CGL Tier-I (CBE) Exam. 27.08.2016) (Ist Sitting)",
        answer: "Wife"
    },
    {
        type: "TYPE–I",
        questionNumber: 65,
        question: "P and Q are sisters. R and S are brothers. P’s daughter is R’s sister. What is Q’s relation to S ?",
        options: ["Mother", "Grandmother", "Sister", "Aunt"],
        source: "SSC CGL Tier-I (CBE) Exam. 28.08.2016) (IInd Sitting)",
        answer: "Aunt"
    },
    {
        type: "TYPE–I",
        questionNumber: 66,
        question: "X is the husband of Y. W is the daughter of X. Z is the husband of W. N is the daughter of Z. What is the relationship of N to Y ?",
        options: ["Cousin", "Niece", "Daughter", "Granddaughter"],
        source: "SSC CGL Tier-I (CBE) Exam. 30.08.2016) (Ist Sitting)",
        answer: "Granddaughter"
    },
    {
        type: "TYPE–I",
        questionNumber: 67,
        question: "‘A’ is the sister of ‘B’. ‘B’ is married to ‘D’. ‘B’ and ‘D’ have a daughter ‘G’. How is ‘G’ related to ‘A’ ?",
        options: ["Sister", "Daughter", "Niece", "Cousin"],
        source: "SSC CGL Tier-I (CBE) Exam. 01.09.2016) (Ist Sitting)",
        answer: "Niece"
    },
    {
        type: "TYPE–I",
        questionNumber: 68,
        question: "F is the brother of A. C is the daughter of A. K is the sister of F, G is the brother of C. Who is the uncle of G?",
        options: ["A", "C", "K", "F"],
        source: "SSC CGL Tier-I (CBE) Exam. 03.09.2016) (IInd Sitting)",
        answer: "F"
    },
    {
        type: "TYPE–I",
        questionNumber: 69,
        question: "If M is the sister of Z , Z is the wife of P and P is the son of A, how is Z related to A?",
        options: ["Daughter-in-law", "Daughter", "Wife", "Mother"],
        source: "SSC CGL Tier-I (CBE) Exam. 07.09.2016) (Ist Sitting)",
        answer: "Daughter-in-law"
    },
    {
        type: "TYPE–I",
        questionNumber: 70,
        question: "M is son of P, Q is the granddaughter of O, who is the husband of P. How is M related to O ?",
        options: ["Son", "Daughter", "Mother", "Father"],
        source: "SSC CGL Tier-I (CBE) Exam. 01.09.2016) (IInd Sitting)",
        answer: "Son"
    },
    {
        type: "TYPE–I",
        questionNumber: 71,
        question: "A is mother of B , C is son of A, D is brother of E, E is daughter of B. Who is the grandmother of E?",
        options: ["A", "B", "C", "D"],
        source: "SSC CGL Tier-I (CBE) Exam. 06.09.2016) (IIIrd Sitting)",
        answer: "A"
    },
    {
        type: "TYPE–I",
        questionNumber: 72,
        question: "A is B’s brother, C is A’s mother, D is C’s father, F is A’s son. How is A related to F’s child?",
        options: ["Aunt", "Cousin", "Nephew", "Grandfather"],
        source: "SSC CGL Tier-I (CBE) Exam. 08.09.2016) (IIIrd Sitting)",
        answer: "Grandfather"
    },
    {
        type: "TYPE–I",
        questionNumber: 73,
        question: "‘A’ and ‘B’ are brothers. ‘C’ and ‘D’ are sisters. A’s son is D’s brother. How is B related to C?",
        options: ["Father", "Brother", "Grandfather", "Uncle"],
        source: "SSC CGL Tier-I (CBE) Exam. 03.09.2016) (IInd Sitting)",
        answer: "Uncle"
    },
    {
        type: "TYPE–I",
        questionNumber: 74,
        question: "M is brother of N. B is brother of N. M is brother of D. But N is not brother of D. How is N related to D ?",
        options: ["Nephew", "Cousin", "Sister", "Brother"],
        source: "SSC CGL Tier-I (CBE) Exam. 04.09.2016) (IInd Sitting)",
        answer: "Sister"
    },
    {
        questionNumber: 54,
        question: "Pointing to a woman, I said that her brother's only son is my wife's brother. How is the woman related to me?",
        options: ["Sister of Father-in-law", "Mother-in-law", "Sister-in-law", "Sister"],
        source: "RRB NTPC – 19.04.2016 Shift-II",
        answer: "Sister of Father-in-law",
        type: "TYPE–I"
    },
    {
        questionNumber: 93,
        question: "Pointing to a man, a woman said, \"He is the brother of the daughter of my husband's wife.\" How is the woman related to that man?",
        options: ["Son", "Mother", "Father", "Sister"],
        source: "RRB NTPC – 19.04.2016 Shift-I",
        answer: "Mother",
        type: "Type-2"
    },
    {
        questionNumber: 65,
        question: "Dharun has a brother Anand. Dharun is the son of Kumar. Krishnan is Kumar's father. How is Anand related to Krishnan?",
        options: ["Grandfather", "Father", "Grandson", "Son"],
        source: "RRB NTPC – 17.01.2017 Shift-I",
        answer: "Grandson",
        type: "TYPE–I"
    },
    {
        questionNumber: 55,
        question: "Sam is Rozi's husband. Jenny is the mother of Rita and Rozi. Vaj is Rita's father. How is Vaj related to Sam?",
        options: ["Brother", "Father-in-law", "Father", "Son"],
        source: "RRB NTPC – 18.01.2017 Shift-I",
        answer: "Father-in-law",
        type: "TYPE–I"
    },
    {
        questionNumber: 94,
        question: "Moyage pointed to a picture saying that this person is the only son of the maternal grandfather of the son of her mother's only daughter-in-law. If Moyage does not have a brother (except just one sister), then how is the person mentioned in that picture related to Moyage?",
        options: ["Maternal Uncle", "Grandfather", "Paternal Uncle", "Brother-in-law"],
        source: "RRB NTPC – 18.01.2017 Shift-III",
        answer: "Brother-in-law",
        type: "Type-2"
    },
    {
        questionNumber: 44,
        question: "Mira is the wife of Sachin. Sachin's sister is Sharada and she is Arjun's wife. Arun is the son of Sharada. Arjun is Mira's brother. Sonali is the daughter of Arjun. What is the relationship between Arun and Sonali?",
        options: ["Father", "Brother", "It cannot be decided", "Uncle"],
        source: "RRB NTPC – 19.01.2017 Shift-II",
        answer: "Brother",
        type: "TYPE–I"
    },
    {
        questionNumber: 43,
        question: "Arun is the father of Chitra and Dinesh is the son of Bawana. Manish is Arun's brother. If Chitra is Dinesh's sister, then how is Bawana related to Manish?",
        options: ["Daughter", "Sister", "Mother-in-law", "Sister-in-law"],
        source: "RRB NTPC – 19.01.2017 Shift-III",
        answer: "Sister-in-law",
        type: "TYPE–I"
    },
    {
        questionNumber: 88,
        question: "Pointing towards an old man, Malini said, \"His son is the maternal uncle of my son.\" How is the old man related to Malini?",
        options: ["Father", "Niece", "Grandfather", "Brother"],
        source: "RRB NTPC – 19.01.2017 Shift-III",
        answer: "Father",
        type: "Type-2"
    },
    {
        questionNumber: 70,
        question: "Ranjeet is the son of Amit's father's sister. Sunil is the son of Divya who is mother of Gautam and grandmother of Amit. Arora is father of Dhanya and grandfather of Ranjeet. Divya is the wife of Arora. How is Sunil related to Dhanya?",
        options: ["Son", "Brother", "Nephew", "Uncle"],
        source: "RRB NTPC – 18.04.2016 Shift-III",
        answer: "Brother",
        type: "TYPE–I"
    },
    {
        questionNumber: 71,
        question: "(Same family as Q70) How is Ranjeet related to Divya?",
        options: ["Brother", "Nephew", "Son", "Grandson"],
        source: "RRB NTPC – 18.04.2016 Shift-III",
        answer: "Grandson",
        type: "TYPE–I"
    },
    {
        questionNumber: 72,
        question: "(Same family as Q70) How is Gautam's wife related to Dhanya?",
        options: ["Sister-in-law", "Sister", "Niece", "Mother"],
        source: "RRB NTPC – 18.04.2016 Shift-III",
        answer: "Sister-in-law",
        type: "TYPE–I"
    },
    {
        questionNumber: 102,
        question: "P is the brother of Q and R. S is R's mother. T is P's father. Which statement cannot be definitely true?",
        options: ["T is S's husband", "T is Q's father", "S is P's mother", "T is Q's husband"],
        source: "RRB NTPC – 28.12.2020 (Shift-I) Stage-I",
        answer: "T is Q's husband",
        type: "TYPE–I"
    },
    {
        questionNumber: 74,
        question: "Pointing to a photograph, Rohit said, \"She is the daughter of the only son of my father.\" How is Rohit related to the girl in the photograph?",
        options: ["Cousin", "Brother", "Father", "Uncle"],
        source: "RRB NTPC – 07.01.2021 (Shift-I) Stage-I",
        answer: "Father",
        type: "Type-2"
    },
    {
        questionNumber: 80,
        question: "Pointing towards a man, Vivek said, “His only brother is the father of my daughter’s father.” How could the man be related to Vivek?",
        options: ["Father-in-law", "Brother", "Uncle", "Father"],
        source: "RRB NTPC – 10.01.2021 (Shift-II) Stage-I",
        answer: "Uncle",
        type: "Type-2"
    },
    {
        questionNumber: 97,
        question: "Pointing to a boy, Suresh said, \"His mother's brother is the only son of my mother's father.\" How is the boy's mother related to Suresh?",
        options: ["Maternal Aunt", "Sister", "Grandmother", "Mother"],
        source: "RRB NTPC – 10.02.2021",
        answer: "Maternal Aunt",
        type: "Type-2"
    },
    {
        questionNumber: 77,
        question: "Pointing to a lady, Ajay said, \"She is the only daughter of my mother's father. She has two children. Her only son's wife is Reeta.\" Ajay is the lady's _________.",
        options: ["Son", "Brother", "Nephew", "Husband"],
        source: "RRB NTPC – 17.01.2021 (Shift-II) Stage-I",
        answer: "Son",
        type: "Type-2"
    },
    {
        questionNumber: 81,
        question: "Pointing to a photograph, John said, \"She is the only granddaughter of the husband of my mother's sister.\" How is the person in the photograph related to John?",
        options: ["Granddaughter", "Daughter", "Sister", "Niece"],
        source: "RRB NTPC – 22.01.2021 (Shift-II) Stage-I",
        answer: "Niece",
        type: "Type-2"
    },
    {
        questionNumber: 28,
        question: "Radha told Sita, \"My mother's only brother's son is your brother.\" How is Radha related to Sita?",
        options: ["Father's sister's daughter", "Sister", "Father's sister", "Mother's brother's daughter"],
        source: "RRB NTPC – 23.01.2021 (Shift-II) Stage-I",
        answer: "Father's sister's daughter",
        type: "TYPE–I"
    },
    {
        questionNumber: 29,
        question: "Harsh is the son of Ajit. Vinita is the wife of Ajit. Ajay is the brother of Harsh. Neha is the only daughter of Ajay and Kavita. How is Vinita related to Neha?",
        options: ["Father's Sister", "Mother", "Sister", "Father's mother"],
        source: "RRB NTPC – 27.01.2021 (Shift-II) Stage-I",
        answer: "Father's mother",
        type: "TYPE–I"
    },
    {
        questionNumber: 78,
        question: "Pointing to Jayant, Gita said, 'He is the only son of Rajbir, who has two sisters and one of them is Anshika'. Dhruv is the brother of Geetam. Rajbir is the paternal grandfather of Geetam, who is the daughter of Gita. Then how is Jayant related to Gita?",
        options: ["Brother", "Husband", "Sister's Husband", "Father"],
        source: "RRB NTPC – 29.01.2021 (Shift-I) Stage-I",
        answer: "Husband",
        type: "Type-2"
    },
    {
        questionNumber: 158,
        question: "A × B = A is brother of B, A/B = A is mother of B, A + B = A is daughter of B. In L/M × N + O, who is the father?",
        options: ["L", "N", "M", "O"],
        source: "RRB NTPC – 31.01.2021 (Shift-I) Stage-I",
        answer: "O",
        type: "Type-4"
    },
    {
        questionNumber: 75,
        question: "Shubham said, \"I have no brother or sister. This man in the photograph is the husband of my mother's daughter-in-law.\" Whose photograph is Shubham referring to?",
        options: ["Son-in-law", "Cousin", "Son", "Self"],
        source: "RRB NTPC – 04.02.2021 (Shift-I) Stage-I",
        answer: "Self",
        type: "Type-2"
    },
    {
        questionNumber: 76,
        question: "Pointing to a lady, Raman said, \"The son of her only brother is the brother of my wife.\" How is the lady related to Raman?",
        options: ["Wife's father's sister", "Father's sister", "Wife's mother", "Wife's brother's wife"],
        source: "RRB NTPC – 04.02.2021 (Shift-I) Stage-I",
        answer: "Wife's father's sister",
        type: "Type-2"
    },
    {
        questionNumber: 30,
        question: "Fatima has only one sibling. She also has only one daughter Rushna. Rushna and Rameez are married to each other. Their maternal aunts are Mariyam and Khadija, respectively. How is Khadija's mother related to Mariyam's niece?",
        options: ["Husband's mother", "Husband's mother's mother", "Mother's sister", "Mother's mother"],
        source: "RRB NTPC – 08.02.2021 (Shift-II) Stage-I",
        answer: "Husband's mother's mother",
        type: "TYPE–I"
    },
    {
        questionNumber: 31,
        question: "Abie and Jack are father and son, respectively. Jack is the grandson of Paulino. Sabrina and Martha are daughter and mother, respectively. Sabrina is the granddaughter of Agatha. If Agatha and Paulino are married and have a single child. How is Jack related to Sabrina?",
        options: ["Father", "Brother", "Uncle", "Husband"],
        source: "RRB NTPC – 08.02.2021 (Shift-II) Stage-I",
        answer: "Brother",
        type: "TYPE–I"
    },
    {
        questionNumber: 32,
        question: "Hawkins is Raman's sister's husband. Raman is Curie's brother. Einstein is Curie's father and Martha's husband. Martha has two children and two nephews. How is Martha related to Hawkins's wife?",
        options: ["Mother", "Sister", "Maternal Aunt", "Mother-in-law"],
        source: "RRB NTPC – 22.02.2021 (Shift-II) Stage-I",
        answer: "Mother",
        type: "TYPE–I"
    },
    {
        questionNumber: 159,
        question: "‘A#B’ = A is brother of B, ‘A^B’ = A is daughter of B, ‘A*B’ = A is aunt of B, ‘A%B’ = A is mother of B. In P*G%U#V^T#Z*V, how is Z related to G?",
        options: ["Brother's Wife", "Husband's Sister", "Brother's Daughter", "Sister's Husband"],
        source: "RRB NTPC – 01.03.2021 (Shift-I) Stage-I",
        answer: "Husband's Sister",
        type: "Type-4"
    },
    {
        questionNumber: 33,
        question: "Sitesh and Suresh are maternal cousins. The mother of Suresh, Gita, has a daughter Samiksha. Anjali is Samiksha's paternal aunt. How is Anjali related to Gita?",
        options: ["Husband's sister", "Mother's sister", "Brother's wife", "Paternal Aunt"],
        source: "RRB NTPC – 08.03.2021 (Shift-I) Stage-I",
        answer: "Husband's sister",
        type: "TYPE–I"
    },
    {
        questionNumber: 155,
        question: "‘A + B’ = A is brother of B, ‘A – B’ = A is sister of B, ‘A × B’ = A is father of B. Which shows L is father of K?",
        options: ["N + K – F × L", "F – L + N × K", "K – N × L + F", "L × W – K + F"],
        source: "RRB NTPC – 08.03.2021 (Shift-II) Stage-I",
        answer: "L × W – K + F",
        type: "Type-4"
    },
    {
        questionNumber: 26,
        question: "Abhishek is the brother of Ashu who is the son of Jai. Swati is the daughter of Jyoti. Malti is the mother of Ashu and Jyoti. How is Abhishek related to Swati?",
        options: ["Mother's Brother", "Brother", "Father", "Brother's Son"],
        source: "RRB NTPC – 14.03.2021 (Shift-II) Stage-I",
        answer: "Mother's Brother",
        type: "TYPE–I"
    },
    {
        questionNumber: 34,
        question: "Misa is married to Light. Light's elder brother Yagami has two daughters and no son. Sheena is the younger of the two. Mikasa is Sheena's grandmother. Oshio is Mikasa's grandson. Yagami's mother-in-law has only one child. Mikasa has only two children and Misa is Mikasa's daughter-in-law. What is the relation of Light with Oshio?",
        options: ["Father's Brother", "Son", "Father's Father", "Father"],
        source: "RRB NTPC – 19.03.2021 (Shift-I) Stage-I",
        answer: "Father",
        type: "TYPE–I"
    },
    {
        questionNumber: 66,
        question: "Sujal is the only son of X’s mother-in-law’s husband Veer. Kashish is the wife of Sujal. Sujal has only one sister named Wimra. How is X related to Wimra?",
        options: ["Husband", "Wife", "Maternal Uncle", "Paternal Uncle"],
        source: "RRB NTPC – 31.07.2021 (Shift-II) Stage-I",
        answer: "Husband",
        type: "TYPE–I"
    },
    {
        questionNumber: 67,
        question: "A man said to a woman, \"Your husband's daughter is the daughter of my brother.\" How is the man related to the woman's daughter?",
        options: ["Brother", "Father's Brother", "Father", "Mother's brother"],
        source: "RRB NTPC – 01.04.2021 (Shift-I) Stage-I",
        answer: "Father's Brother",
        type: "TYPE–I"
    },
    {
        questionNumber: 79,
        question: "Pointing to a photograph, Sumit said, \"The man in the picture is the father-in-law of my mother-in-law.\" How is the man in the picture related to Sumit's wife?",
        options: ["Father", "Grandfather", "Husband's Father", "Grandfather"],
        source: "RRB NTPC – 05.04.2021 (Shift-II) Stage-I",
        answer: "Grandfather",
        type: "Type-2"
    },
    {
        questionNumber: 27,
        question: "Gujjo is Umra's mother. Munni is Summo's mother. Shahid is Hifzan's father. Munni is Hifzan's paternal aunt and Umra's maternal aunt. How is Gujjo related to Shahid?",
        options: ["Sister", "Brother's Wife", "Brother's Daughter", "Sister's Daughter"],
        source: "RRB NTPC – 08.04.2021 (Shift-II) Stage-I",
        answer: "Sister",
        type: "TYPE–I"
    },
    {
        questionNumber: 156,
        question: "‘A% B’ = A is son of B, ‘A # B’ = A is father of B, ‘A @ B’ = A is sister of B, ‘A $ B’ = A is wife of B. In A% B # C @ D $ E, how is D related to B?",
        options: ["Daughter-in-law", "Daughter", "Wife", "Sister"],
        source: "RRB NTPC – 23.07.2021 (Shift-I) Stage-I",
        answer: "Daughter",
        type: "Type-4"
    },
    {
        questionNumber: 157,
        question: "‘P + Q’ = P is brother of Q, ‘P – Q’ = P is sister of Q, ‘P * Q’ = P is husband of Q, ‘P / Q’ = P is son of Q. Which shows K is daughter of M?",
        options: ["L * K – N + M", "K + L / N – M", "K – L / N * M", "K – L / N + M"],
        source: "RRB NTPC – 26.07.2021 (Shift-I) Stage-I",
        answer: "K – L / N * M",
        type: "Type-4"
    },
    {
        questionNumber: 35,
        question: "Aman and Varun are brothers. Eva is the daughter of Diwa. Diwa is the sister of Fiza's husband Varun. How is Eva related to Aman?",
        options: ["Brother's daughter", "Brother's wife's sister", "Sister's daughter", "Daughter"],
        source: "RRB NTPC – 31.07.2021 (Shift-I) Stage-I",
        answer: "Sister's daughter",
        type: "TYPE–I"
    },
    {
        questionNumber: 99,
        question: "There are seven members: H, I, J, K, L, M, and N. H is K's mother's mother. J and L are the only two children of H and M. J is the only daughter of M. N is the son of L and I. How is M related to N?",
        options: ["Father's father", "Father's sister", "Mother's brother", "Mother's father"],
        source: "RRB NTPC (Stage-II) – 12/06/2022 (Shift-II)",
        answer: "Father's father",
        type: "TYPE–I"
    },
    {
        questionNumber: 100,
        question: "C is the mother of K. K is the wife of H. R is the brother of K. P is the father of R. How is C related to P?",
        options: ["Daughter", "Wife", "Brother's wife", "Sister"],
        source: "RRB NTPC (Stage-II) – 13/06/2022 (Shift-I)",
        answer: "Wife",
        type: "TYPE–I"
    },
    {
        questionNumber: 101,
        question: "A is the sister of B and C. D is the father of C. E is the mother of A. Which statement CANNOT be verified?",
        options: ["D is the father of A.", "E is the mother of B.", "D is E's husband.", "B is E's son."],
        source: "RRB NTPC (Stage-II) – 13/06/2022 (Shift-II)",
        answer: "B is E's son.",
        type: "TYPE–I"
    },
    {
        questionNumber: 150,
        question: "If ‘A # B’ = A is father of B, ‘A $ B’ = A is mother of B, ‘A @ B’ = A is husband of B, ‘A % B’ = A is wife of B, ‘A = B’ = A is brother of B, then how is P related to V in: P @ Q $ U = R % S # V?",
        options: ["Paternal grandfather", "Maternal grandfather", "Father's brother", "Mother's brother"],
        source: "RRB NTPC (Stage-II) – 14/06/2022 (Shift-I)",
        answer: "Maternal grandfather",
        type: "Type-4"
    },
    {
        questionNumber: 153,
        question: "‘X &lt; Y’ = X is mother of Y, ‘X &gt; Y’ = X is husband of Y, ‘X @ Y’ = X is sister of Y, ‘X $ Y’ = X is son of Y. Which shows R is daughter of Q?",
        options: ["Q > K @ R $ H", "R @ H > K < Q", "Q < K @ H $ R", "R @ H $ K > Q"],
        source: "RRB NTPC (Stage-II) – 14/06/2022 (Shift-II)",
        answer: "R @ H $ K > Q",
        type: "Type-4"
    },
    {
        questionNumber: 98,
        question: "B's mother is the daughter of F. C is the son of F and D. G is the son of C and E. D is the mother of R. How is F related to G?",
        options: ["Father's mother", "Brother", "Father's father", "Mother's father"],
        source: "RRB NTPC (Stage-II) – 15/06/2022 (Shift-I)",
        answer: "Father's father",
        type: "TYPE–I"
    },
    {
        questionNumber: 154,
        question: "Symbols: ‘+’ = father, ‘–’ = mother, ‘/’ = sister, ‘∪’ = son, ‘∩’ = daughter. Which means A is E’s daughter’s son?",
        options: ["A/B + C – D ∪ E", "A ∩ B ∩ C / D + E", "A/B ∪ C ∪ D / E", "A ∪ B / C / D ∪ E"],
        source: "RRB NTPC (Stage-II) – 15/06/2022 (Shift-II)",
        answer: "A ∪ B / C / D ∪ E",
    },
    {
        questionNumber: 151,
        question: "If ‘S#T’ = S is father of T, ‘S$T’ = S is mother of T, ‘S@T’ = S is husband of T, ‘S = T’ = S is son of T, then in L $ Q = B # D @ E $ O, how is E related to L?",
        options: ["Mother", "Daughter", "Daughter-in-law", "Mother-in-law"],
        source: "RRB NTPC (Stage-II) – 17/06/2022 (Shift-I)",
        answer: "Daughter-in-law",
        type: "Type-4"
    },
    {
        questionNumber: 152,
        question: "‘P + Q’ = P is daughter of Q, ‘P × Q’ = P is son of Q, ‘P – Q’ = P is wife of Q. What does A + B – C × D imply?",
        options: ["C is wife of D", "B is son of D", "B is daughter of D", "A is daughter of D's son"],
        source: "RRB NTPC (Stage-II) – 17/06/2022 (Shift-III)",
        answer: "A is daughter of D's son",
        type: "Type-4"
    },
    {
        questionNumber: 73,
        question: "Pointing at a picture, Yuvika said that the boy in the picture is the son of her father’s mother’s daughter. How is that boy related to Yuvika?",
        options: ["Mother’s brother’s son", "Father’s brother", "Father’s sister’s son", "Brother"],
        source: "RRB NTPC (Stage-II) – 17/06/2022 (Shift-II)",
        answer: "Father’s sister’s son",
        type: "Type-2"
    }
]

export default function SeatingArrangementPage() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const [quizEnded, setQuizEnded] = useState(false);
    const [time, setTime] = useState(0);
    const [isWhiteboardOpen, setIsWhiteboardOpen] = useState(false);

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
                 {isWhiteboardOpen && <DrawingCanvas onClose={() => setIsWhiteboardOpen(false)} />}
                <Card className="w-full max-w-xl text-center">
                    <CardHeader>
                        <CardTitle>Quiz Completed!</CardTitle>
                        <CardDescription>You have completed the Seating Arrangement quiz in {formatTime(time)}.</CardDescription>
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
            {isWhiteboardOpen && <DrawingCanvas onClose={() => setIsWhiteboardOpen(false)} />}
            <div className="md:w-1/2 mx-auto">
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <p className="text-sm font-semibold text-primary mb-2">{currentQuestion.type}</p>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="icon" onClick={() => setIsWhiteboardOpen(true)}>
                                    <Edit className="h-4 w-4" />
                                </Button>
                                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                    <Timer className="size-4" />
                                    <span>{formatTime(time)}</span>
                                </div>
                            </div>
                        </div>
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
        </div>
    );
}