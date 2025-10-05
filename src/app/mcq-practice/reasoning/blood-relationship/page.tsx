
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChevronLeft, ChevronRight, CheckCircle, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

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
        questionNumber: 13,
        question: "Az is B’s brother. C is A’s father. D is C’s sister and E is D’s mother. How is B related to E ?",
        options: ["Granddaughter", "Great-granddaughter", "Grandaunt", "Daughter"],
        source: "SSC CPO Sub-Inspector Exam.16.12.2007)",
        answer: "Granddaughter"
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
        questionNumber: 21,
        question: "If P is the husband of Q and R is the mother of S and Q, what is R to P ?",
        options: ["Mother", "Sister", "Aunt", "Mother-in-law"],
        source: "SSC CPO (SI, ASI & Intelligence Officer) Exam. 28.08.2011 (Paper-I)",
        answer: "Mother-in-law"
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
        questionNumber: 26,
        question: "A is B’s brother, C is A’s mother, D is C’s father, F is A’s son. How is F related to D ?",
        options: ["Son", "Grandson", "Great grandson", "Grand–daughter"],
        source: "SSC Combined Matric Level (PRE) Exam. 05.05.2002 (Ist Sitting) (Eastern Zone, Guwahati)",
        answer: "Great grandson"
    },
    {
        type: "TYPE–I",
        questionNumber: 27,
        question: "A is B’s bother, C is A’s mother, D is C’s father, E is B’s son, How is B related to D?",
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
        source: "SSC Combined Matric Level (Pre) Exam. 12.05.2002 (IInd Sitting)",
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
        source: "SSC CHSL (10+2) DEO & LDC Exam. 16.11.2014, Patna Region : Ist Sitting & Bihar SSC CGL Main Exam–27.01.2013)",
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
    }
] and a answere ko correct karo
in ssc cgl tier 1 exam 16.08.2015 2176783
How many male members are
there in the family?
(1) 3 (2) 2
(3) 4 (4) 1
iska answere 4 ha ma 3 kardia tha