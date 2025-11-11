'use client';

import { Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, CheckCircle, Lightbulb, XCircle } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Whiteboard } from "@/components/whiteboard";

const mcqData = [
    {
        type: "Type 1: Problems based on finding the Principal",
        questionNumber: 1,
        question: "Geeta deposited a certain sum of money in her bank account, which amount to ₹27,783 at 5% per annum in 3 years, the interest being compounded annually. How much money did she deposit?",
        options: ["₹26,000", "₹25,000", "₹24,000", "₹25,500"],
        source: "Exam: SSC MTS – 01/09/2023 (Shift-I)",
        answer: "₹24,000"
    },
    {
        type: "Type 1: Problems based on finding the Principal",
        questionNumber: 2,
        question: "A certain sum of money was lent for a period of 1 year 9 months at a rate of 10% per annum compounded annually. If the compound interest is ₹1460, find the amount of money lent.",
        options: ["₹8,000", "₹6,000", "₹7,500", "₹8,200"],
        source: "Exam: SSC CHSL (Tier-I) – 02/08/2023 (Shift-I)",
        answer: "₹8,000"
    },
    {
        type: "Type 1: Problems based on finding the Principal",
        questionNumber: 3,
        question: "A sum of money was borrowed and paid back in two equal annual installments of ₹980, allowing 4% compound interest. What was the sum borrowed (in ₹ rounded to the nearest decimal)?",
        options: ["2,050", "1,960", "1,850", "1,760"],
        source: "Exam: SSC CGL – 11/04/2022 (Shift-III)",
        answer: "1,850"
    },
    {
        type: "Type 1: Problems based on finding the Principal",
        questionNumber: 4,
        question: "A sum amounts to ₹18,600 after 3 years and to ₹27,900 after 6 years, at a certain rate percent p.a., when the interest is compounded annually. The sum is:",
        options: ["₹14,600", "₹11,800", "₹14,400", "₹12,400"],
        source: "Exam: SSC CGL (Tier-I) – 07/06/2019 (Shift-I)",
        answer: "₹12,400"
    },
    {
        type: "Type 1: Problems based on finding the Principal",
        questionNumber: 5,
        question: "A sum amounts to ₹8,028 in 3 years and to ₹12,042 in 6 years at a certain rate percent per annum, when the interest is compounded yearly. The sum is:",
        options: ["₹5,352", "₹5,325", "₹5,235", "₹5,253"],
        source: "Exam: SSC CGL (Tier-I) – 04/06/2019 (Shift-I)",
        answer: "₹5,352"
    },
    {
        type: "Type 1: Problems based on finding the Principal",
        questionNumber: 6,
        question: "A certain sum amounts to ₹280,900 in 2 years at 6% per annum, interest compounded annually. The sum is:",
        options: ["₹350,000", "₹250,000", "₹200,000", "₹550,000"],
        source: "Exam: SSC CGL (Tier-I) – 09/03/2020 (Shift-II)",
        answer: "₹250,000"
    },
    {
        type: "Type 1: Problems based on finding the Principal",
        questionNumber: 7,
        question: "The amount received at 10% per annum compound interest after 3 years is ₹10,648. What was the principal (in ₹)?",
        options: ["₹8,000", "₹9,000", "₹8,500", "₹7,500"],
        source: "Exam: SSC CGL (Tier-II) – 19/02/2018",
        answer: "₹8,000"
    },
    {
        type: "Type 1: Problems based on finding the Principal",
        questionNumber: 8,
        question: "The amount received at 8% per annum compound interest after 2 years is ₹72,900. What was the principal (in ₹)?",
        options: ["₹65,000", "₹67,500", "₹60,000", "₹62,500"],
        source: "Exam: SSC CGL (Tier-II) – 09/03/2018",
        answer: "₹62,500"
    },
    {
        type: "Type 1: Problems based on finding the Principal",
        questionNumber: 9,
        question: "The amount (in ₹) received at 10% per annum compound interest after 3 years is ₹1,19,790. What was the principal?",
        options: ["₹90,000", "₹1,00,000", "₹80,000", "₹75,000"],
        source: "Exam: SSC CGL (Tier-II) – 17/02/2018",
        answer: "₹90,000"
    },
    {
        type: "Type 1: Problems based on finding the Principal",
        questionNumber: 10,
        question: "A certain sum amounts to ₹4,205.55 at 15% p.a. in (2 2/5) years, interest compounded yearly. The sum is:",
        options: ["₹2,700", "₹3,200", "₹3,500", "₹3,000"],
        source: "Exam: SSC CGL (Tier-II) – 13/09/2019",
        answer: "₹3,000"
    },
    {
        type: "Type 1: Problems based on finding the Principal",
        questionNumber: 11,
        question: "The compound interest on a certain sum invested for 2 years at 10% per annum is ₹1,522.50, the interest being compounded yearly. The sum is:",
        options: ["₹7,250", "₹7,200", "₹7,500", "₹7,000"],
        source: "Exam: SSC CPO-SI – 13/12/2019 (Shift-I)",
        answer: "₹7,250"
    },
    {
        type: "Type 1: Problems based on finding the Principal",
        questionNumber: 12,
        question: "If the compound interest on a certain sum of money for 2 years at 5% p.a. is ₹328, then the sum is equal to:",
        options: ["₹3,600", "₹3,500", "₹3,000", "₹3,200"],
        source: "Exam: SSC CHSL – 26/10/2020 (Shift-I)",
        answer: "₹3,200"
    },
    {
        type: "Type 1: Problems based on finding the Principal",
        questionNumber: 13,
        question: "A sum invested at compound interest (compounded annually) amounts to ₹750 at the end of first year and ₹900 at the end of second year. What is the sum?",
        options: ["₹700", "₹625", "₹600", "₹650"],
        source: "Exam: SSC MTS – 05/08/2019 (Shift-I)",
        answer: "₹625"
    },
    {
        type: "Type 2: Problems based on finding the Amount",
        questionNumber: 14,
        question: "If the interest is compounded quarterly, what will be a sum of ₹75000 amount in one year at 16% per annum (rounded to two decimal places)?",
        options: ["₹87379.40", "₹87739.40", "₹89773.40", "₹87937.40"],
        source: "Exam: SSC MTS – 05/09/2023 (Shift-II)",
        answer: "₹87379.40"
    },
    {
        type: "Type 2: Problems based on finding the Amount",
        questionNumber: 15,
        question: "Ashok invested ₹18000 in a post office for 3 years at 5% compound interest. If the interest is compounded once a year, what amount will he get after 3 years?",
        options: ["₹22,961.50", "₹21,926.00", "₹22,6291.75", "₹20,837.25"],
        source: "Exam: SSC CHSL (Tier-I) – 04/08/2023 (Shift-III)",
        answer: "₹20,837.25"
    },
    {
        type: "Type 2: Problems based on finding the Amount",
        questionNumber: 16,
        question: "Find the amount received by P by investing a sum of ₹5000 at an annual rate of 5% on the maturity period of one year. If the interest is calculated on the basis of quarterly compounding. (Round your answer to the nearest integer)",
        options: ["₹5,200", "₹5,945", "₹5,330", "₹5,255"],
        source: "Exam: SSC MTS – 18/07/2022 (Shift-III)",
        answer: "₹5,255"
    },
    {
        type: "Type 2: Problems based on finding the Amount",
        questionNumber: 17,
        question: "A invested a sum of ₹12000 in a fixed deposit scheme at an annual interest rate of 5% for 2 years, compounded annually. How much amount will A get on maturity of the fixed deposit?",
        options: ["₹11,280", "₹12,450", "₹13,230", "₹14,560"],
        source: "Exam: SSC MTS – 18/07/2022 (Shift-I)",
        answer: "₹13,230"
    },
    {
        type: "Type 2: Problems based on finding the Amount",
        questionNumber: 18,
        question: "If a sum of ₹6500 is being borrowed for 2 years at 10% compound interest compounded half-yearly. Find the amount (in integers only).",
        options: ["₹7,900", "₹7,650", "₹8,150", "₹8,250"],
        source: "Exam: SSC CGL (Mains) – 06/03/2023",
        answer: "₹7,900"
    },
    {
        type: "Type 2: Problems based on finding the Amount",
        questionNumber: 19,
        question: "The compound interest on a certain sum of money at 21% per annum compounded for 2 years is ₹11138.40 (interest is compounded annually). What will be the amount (in ₹) received after 2 years?",
        options: ["35,138.40", "31,538.040", "24,000.50", "28,315.40"],
        source: "Exam: SSC CGL – 19/04/2022 (Shift-II)",
        answer: "35,138.40"
    },
    {
        type: "Type 2: Problems based on finding the Amount",
        questionNumber: 20,
        question: "What is the amount (in ₹) of a sum ₹32,000 at 20% per annum for 9 months, compounded quarterly?",
        options: ["37,044", "35,087", "32,000", "30,876"],
        source: "Exam: SSC CGL (Tier-I) – 18/04/2022 (Shift-I)",
        answer: "37,044"
    },
    {
        type: "Type 2: Problems based on finding the Amount",
        questionNumber: 21,
        question: "Ram deposited an amount of ₹8,000 in a bank's savings account with interest 6.5% compounded monthly. What amount will he get at the end of 18 months?",
        options: ["₹8,790.54", "₹8,907.56", "₹8,788.98", "₹8,816.97"],
        source: "Exam: SSC CHSL – 17/03/2020 (Shift-III)",
        answer: "₹8,790.54"
    },
    {
        type: "Type 2: Problems based on finding the Amount",
        questionNumber: 22,
        question: "A sum of ₹900 is invested at compound interest (compounded annually) for 2 years. If the rate of interest is 10% per annum, then what will be the amount?",
        options: ["₹1,071", "₹1,089", "₹1,289", "₹1,121"],
        source: "Exam: SSC MTS – 07/08/2019 (Shift-II)",
        answer: "₹1,089"
    },
    {
        type: "Type 2: Problems based on finding the Amount",
        questionNumber: 23,
        question: "An amount of ₹2,000 is invested at compound interest (compounded annually). If the rate of interest is 10% per year, then what will be the amount after 30 months?",
        options: ["₹2,538", "₹2,524", "₹2,541", "₹2,532"],
        source: "Exam: SSC MTS – 05/08/2019 (Shift-III)",
        answer: "₹2,541"
    },
    {
        type: "Type 3: Problems based on finding the Compound Interest",
        questionNumber: 24,
        question: "What will be the compound interest on ₹30000 at 10% per annum for (1 1/2) years, when the interest is compounded half-yearly?",
        options: ["₹4,732.50", "₹4,630.50", "₹4,831.50", "₹4,531.50"],
        source: "Exam: (Not specified due to incomplete data)",
        answer: "₹4,732.50"
    },
    {
        type: "Type 3: Problems based on finding the Compound Interest",
        questionNumber: 25,
        question: "What will be the compound interest on ₹24000 if the interest is compounded annually, at 10% per annum for 2 years?",
        options: ["₹5,280", "₹4,820", "₹5,040", "₹6,080"],
        source: "Exam: SSC MTS – 05/07/2022 (Shift-I)",
        answer: "₹5,040"
    },
    {
        type: "Type 3: Problems based on finding the Compound Interest",
        questionNumber: 26,
        question: "What will be the compound interest received on an amount of ₹450000 at the rate of 10% per annum in 2 years, if the interest is compounded annually?",
        options: ["₹85,450", "₹50,500", "₹94,500", "₹94,500"],
        source: "Exam: SSC MTS – 14/07/2022 (Shift-II)",
        answer: "₹94,500"
    },
    {
        type: "Type 3: Problems based on finding the Compound Interest",
        questionNumber: 27,
        question: "If a sum of ₹1000 with interest compounded half-yearly is invested for 1 year at the rate of 10% annual interest, then find the compound interest?",
        options: ["₹1,302", "₹124", "₹102.50", "₹105.20"],
        source: "Exam: SSC MTS – 01/09/2023 (Shift-I)",
        answer: "₹102.50"
    },
    {
        type: "Type 3: Problems based on finding the Compound Interest",
        questionNumber: 28,
        question: "Find the compound interest on a sum of ₹8000 at the rate of 20% per annum for 1 year. If the interest is compounded half-yearly.",
        options: ["₹1,675", "₹1,690", "₹1,685", "₹1,680"],
        source: "Exam: SSC CGL (Mains) – 02/03/2023",
        answer: "₹1,680"
    },
    {
        type: "Type 3: Problems based on finding the Compound Interest",
        questionNumber: 29,
        question: "What will be the compound interest on an amount of ₹25000 at the rate of 12% per annum after three years. If the interest is compounded annually?",
        options: ["₹9,824.00", "₹10,520.00", "₹10,123.20", "₹9,956.86"],
        source: "Exam: SSC MTS – 04/05/2023 (Shift-I)",
        answer: "₹10,123.20"
    },
    {
        type: "Type 3: Problems based on finding the Compound Interest",
        questionNumber: 30,
        question: "If the rate of interest is 4% for the first year, 5% for the second year and 6% for the third year, then compound interest on ₹10000 for 3 years, if interest is compounded annually?",
        options: ["₹1,570.50", "₹1,575.20", "₹1,580.25", "₹1,500.00"],
        source: "Exam: SSC MTS – 13/07/2022 (Shift-I)",
        answer: "₹1,575.20"
    },
    {
        type: "Type 3: Problems based on finding the Compound Interest",
        questionNumber: 31,
        question: "What will be the compound interest (in ₹) received on a sum of ₹62500 in two years at 12% annual interest compounded every 8 months?",
        options: ["16,548", "16,232", "13,428", "18,342"],
        source: "Exam: SSC CGL – 21/04/2022 (Shift-II)",
        answer: "16,232"
    },
    {
        type: "Type 3: Problems based on finding the Compound Interest",
        questionNumber: 32,
        question: "A person borrows a sum of ₹8000 at an annual interest rate of 10%, with the interest compounded half-yearly. What will be the compound interest for a period of 1 year?",
        options: ["₹820", "₹1,600", "₹800", "₹1,680"],
        source: "Exam: SSC CHSL – 06/06/2022 (Shift-III)",
        answer: "₹820"
    },
    {
        type: "Type 3: Problems based on finding the Compound Interest",
        questionNumber: 33,
        question: "If interest is calculated compounded half-yearly (rounded off to the nearest integer), what will be the compound interest (in ₹) on an amount of ₹7200 at 20% per annum for 18 months?",
        options: ["2,338", "3,238", "2,833", "2,383"],
        source: "Exam: SSC GD Constable – 08/02/2023 (Shift-I)",
        answer: "2,383"
    },
    {
        type: "Type 3: Problems based on finding the Compound Interest",
        questionNumber: 34,
        question: "What will be the compound interest (in ₹, rounded off to the nearest ₹) received on a sum of ₹7500 at 24% per annum in 3 months if the interest is compounded monthly?",
        options: ["303", "459", "439", "465"],
        source: "Exam: SSC GD Constable – 08/02/2023 (Shift-III)",
        answer: "459"
    },
    {
        type: "Type 3: Problems based on finding the Compound Interest",
        questionNumber: 35,
        question: "What is the compound interest on ₹20,000 for 9 months at the rate of 4% per annum, when interest is compounded quarterly?",
        options: ["₹610", "₹606.02", "₹609.05", "₹605"],
        source: "Exam: SSC CHSL – 30/05/2022 (Shift-III)",
        answer: "₹606.02"
    },
    {
        type: "Type 3: Problems based on finding the Compound Interest",
        questionNumber: 36,
        question: "What is the compound interest (in ₹) on a sum of ₹46,000 for (2 2/5) years at 15% per annum, interest being compounded annually (nearest to ₹1)?",
        options: ["18458", "19458", "19485", "18485"],
        source: "Exam: SSC CHSL – 12/08/2021 (Shift-I)",
        answer: "18458"
    },
    {
        type: "Type 3: Problems based on finding the Compound Interest",
        questionNumber: 37,
        question: "What will be the compound interest (in ₹) on a sum of ₹7,200 for 18 months at rate of 20% per annum, if the interest is compounded half-yearly (nearest to an integer)?",
        options: ["2,338", "3,238", "2,833", "2,383"],
        source: "Exam: SSC CHSL – 05/08/2021 (Shift-II)",
        answer: "2,383"
    },
    {
        type: "Type 3: Problems based on finding the Compound Interest",
        questionNumber: 38,
        question: "What is the compound interest on a sum of ₹10,000 at 14% p.a. for (2 5/7) years where the interest is compounded yearly? (nearest to ₹1)",
        options: ["₹4,394", "₹4,259", "₹4,296", "₹4,439"],
        source: "Exam: SSC CGL (Tier-I) – 06/06/2019 (Shift-II)",
        answer: "₹4,296"
    },
    {
        type: "Type 3: Problems based on finding the Compound Interest",
        questionNumber: 39,
        question: "What is the compound interest earned on ₹80,000 at 40% per annum in 1 year compounded quarterly?",
        options: ["₹28,317", "₹37,128", "₹18,732", "₹21,387"],
        source: "Exam: SSC CGL (Tier-II) – 20/02/2018",
        answer: "₹37,128"
    },
    {
        type: "Type 3: Problems based on finding the Compound Interest",
        questionNumber: 40,
        question: "What is the compound interest on a sum of ₹7,200 for (2 2/5) years at 20% p.a., interest compounded yearly (nearest to an integer)?",
        options: ["₹3,997", "₹4,290", "₹4,205", "₹3,960"],
        source: "Exam: SSC CGL (Tier-II) – 12/09/2019",
        answer: "₹3,997"
    },
    {
        type: "Type 3: Problems based on finding the Compound Interest",
        questionNumber: 41,
        question: "What is the compound interest on a sum of ₹37,500 for (1 1/3) years at a rate of 12% p.a. if the interest is compounded 8-monthly?",
        options: ["₹6,448", "₹6,420", "₹6,440", "₹6,240"],
        source: "Exam: SSC CPO-SI – 11/12/2019 (Shift-I)",
        answer: "₹6,240"
    },
    {
        type: "Type 3: Problems based on finding the Compound Interest",
        questionNumber: 42,
        question: "₹4,000 is given at 5% per annum for one year and interest is compounded half-yearly. ₹2,000 is given at 40% per annum compounded quarterly for 1 year. The total interest received is nearest to:",
        options: ["₹1,333.30", "₹1,130.70", "₹1,888.80", "₹1,444.40"],
        source: "Exam: SSC CHSL – 13/10/2020 (Shift-II)",
        answer: "₹1,130.70"
    },
    {
        type: "Type 3: Problems based on finding the Compound Interest",
        questionNumber: 43,
        question: "A sum of ₹1,000 is invested on compound interest (compounding annually) for 3 years. If the rate of interest is 10% per annum for the first two years and 50% per annum for the third year, then what will be the interest?",
        options: ["₹612", "₹655", "₹815", "₹756"],
        source: "Exam: SSC MTS – 08/08/2019 (Shift-I)",
        answer: "₹815"
    },
    {
        type: "Type 3: Problems based on finding the Compound Interest",
        questionNumber: 44,
        question: "If the compound interest rate is 20% per year, what is the interest on an amount of ₹1,00,000 for two years compounded half-yearly?",
        options: ["₹46,410", "₹44,000", "₹21,000", "₹33,100"],
        source: "Exam: SSC MTS – 14/08/2019 (Shift-I)",
        answer: "₹46,410"
    },
    {
        type: "Type 3: Problems based on finding the Compound Interest",
        questionNumber: 45,
        question: "An amount of ₹3,000 at the rate of 20% compound interest (compounded annually) is invested for 2 years. What is the compound interest?",
        options: ["₹1,360", "₹1,200", "₹1,320", "₹1,440"],
        source: "Exam: SSC MTS – 06/08/2019 (Shift-I)",
        answer: "₹1,320"
    },
    {
        type: "Type 3: Problems based on finding the Compound Interest",
        questionNumber: 46,
        question: "The compound interest on an amount of ₹5,120 at the rate of 12.5% (compounded annually) for 3 years is:",
        options: ["₹2,280", "₹1,960", "₹2,120", "₹2,170"],
        source: "Exam: SSC MTS – 13/08/2019 (Shift-I)",
        answer: "₹2,170"
    },
    {
        type: "Type 3: Problems based on finding the Compound Interest",
        questionNumber: 47,
        question: "₹20,000 is invested on compound interest (compounded half-yearly) at the rate of 20% per annum. What will be the interest after two years?",
        options: ["₹8,800", "₹8,824", "₹9,282", "₹9,428"],
        source: "Exam: SSC MTS – 08/08/2019 (Shift-II)",
        answer: "₹9,282"
    },
    {
        type: "Type 3: Problems based on finding the Compound Interest",
        questionNumber: 48,
        question: "What will be the compound interest on a sum of ₹1,200 for 2 years at the rate of 20% per annum when the interest is compounded yearly?",
        options: ["₹624", "₹504", "₹576", "₹528"],
        source: "Exam: SSC MTS – 02/08/2019 (Shift-I)",
        answer: "₹528"
    },
    {
        type: "Type 3: Problems based on finding the Compound Interest",
        questionNumber: 49,
        question: "What is the compound interest on ₹5,000 in 2 years at the rate of 20% per annum? (interest compounded half-yearly)",
        options: ["₹2,340.50", "₹2,275.50", "₹2,290.50", "₹2,320.50"],
        source: "Exam: SSC MTS – 19/08/2019 (Shift-I)",
        answer: "₹2,320.50"
    },
    {
        type: "Type 3: Problems based on finding the Compound Interest",
        questionNumber: 50,
        question: "What is the compound interest for a sum of ₹20,000 in 2 years, if the interest is 18% per annum?",
        options: ["₹7,748", "₹7,848", "₹7,648", "₹7,948"],
        source: "Exam: SSC MTS – 07/10/2017 (Shift-I)",
        answer: "₹7,648"
    },
    {
        type: "Type 4: Combined problems of Simple and Compound Interest",
        questionNumber: 51,
        question: "A man invested a total of ₹12,050 in two parts: one at 10% p.a. simple interest for 2 years and the other at the same rate at compound interest (compounded annually) for the same time. The amounts he received from both parts are equal. The sum (in ₹) invested at compound interest is:",
        options: ["₹5,850", "₹6,000", "₹5,780", "₹5,800"],
        source: "Exam: SSC CHSL – 15/04/2021 (Shift-I)",
        answer: "₹6,000"
    },
    {
        type: "Type 4: Combined problems of Simple and Compound Interest",
        questionNumber: 52,
        question: "A borrowed a sum of ₹1,60,000 from B at 10% per annum simple interest. At the same time, he lent the same sum to C at the same rate on compound interest, compounded semi-annually for 2 years. Find the amount (in ₹) earned by A in the whole transaction.",
        options: ["₹4,281", "₹4,280", "₹2,481", "₹2,840"],
        source: "Exam: SSC CGL (Tier-I) – 17/08/2021 (Shift-II)",
        answer: "₹2,481"
    },
    {
        type: "Type 4: Combined problems of Simple and Compound Interest",
        questionNumber: 53,
        question: "The simple interest on a sum of ₹12,000 at the end of 5 years is ₹6,000. What would have been the compound interest on the same sum at the same rate for 3 years when compounded annually?",
        options: ["₹3,970", "₹3,972", "₹3,600", "₹2,520"],
        source: "Exam: SSC CHSL – 10/08/2021 (Shift-I)",
        answer: "₹3,972"
    },
    {
        type: "Type 4: Combined problems of Simple and Compound Interest",
        questionNumber: 54,
        question: "Anamika paid ₹4,965 as compound interest on a loan of ₹15,000 after 3 years when compounded annually. Suman took a loan of ₹10,000 at the same rate on simple interest. How much interest did Suman pay after 3 years?",
        options: ["₹4,000", "₹3,500", "₹3,000", "₹4,500"],
        source: "Exam: SSC CHSL – 12/04/2021 (Shift-I)",
        answer: "₹3,000"
    },
    {
        type: "Type 4: Combined problems of Simple and Compound Interest",
        questionNumber: 55,
        question: "A man invests ₹7,000 at 8% per annum simple interest for 2 years and ₹10,000 at compound interest at the same rate for the same period, compounded annually. What will be the total interest and the total amount (in ₹) respectively, on maturity?",
        options: ["₹19,748 and ₹2,874", "₹2,748 and ₹19,784", "₹19,784 and ₹2,784", "₹2,784 and ₹19,784"],
        source: "Exam: SSC CHSL – 04/08/2021 (Shift-I)",
        answer: "₹2,784 and ₹19,784"
    },
    {
        type: "Type 4: Combined problems of Simple and Compound Interest",
        questionNumber: 56,
        question: "Varun and Madhur invested ₹25,000 each in different schemes. Varun earned simple interest at 11% per annum, whereas Madhur earned compound interest at 10% per annum compounded annually. Who received more interest after 2 years and how much?",
        options: ["Madhur, ₹250", "Madhur, ₹302.50", "Varun, ₹250", "Varun, ₹500"],
        source: "Exam: SSC CHSL – 04/08/2021 (Shift-II)",
        answer: "Varun, ₹500"
    },
    {
        type: "Type 4: Combined problems of Simple and Compound Interest",
        questionNumber: 57,
        question: "The simple interest on a certain sum for 3 years at 12% p.a. is ₹6,750. What is the compound interest (in ₹) on the same sum for 2 years at 20% p.a., if interest is compounded half-yearly? (rounded off to the nearest ₹)",
        options: ["₹7,729", "₹8,702", "₹8,000", "₹6,750"],
        source: "Exam: SSC CHSL – 12/04/2021 (Shift-III)",
        answer: "₹8,702"
    },
    {
        type: "Type 5: Problems based on the difference between Simple and Compound Interest",
        questionNumber: 58,
        question: "The difference between compound interest (compounded annually) and simple interest on a sum of ₹85,000 in 2 years is ₹850. Find the annual interest rate.",
        options: ["10%", "12%", "5%", "8%"],
        source: "Exam: SSC MTS – 04/09/2023 (Shift-III)",
        answer: "10%"
    },
    {
        type: "Type 5: Problems based on the difference between Simple and Compound Interest",
        questionNumber: 59,
        question: "If the difference between simple interest and compound interest on a certain sum of money at 10% per annum for 3 years is ₹310, then what is the sum (in ₹)?",
        options: ["₹10,000", "₹9,500", "₹12,000", "₹8,000"],
        source: "Exam: SSC CHSL (Tier-I) – 10/08/2023 (Shift-I)",
        answer: "₹10,000"
    },
    {
        type: "Type 5: Problems based on the difference between Simple and Compound Interest",
        questionNumber: 60,
        question: "The difference between compound interest and simple interest on ₹x for 2 years at 15% per annum is ₹9. What is the value of x?",
        options: ["₹600", "₹450", "₹400", "₹500"],
        source: "Exam: SSC CPO SI – 11/11/2022 (Shift-III)",
        answer: "₹400"
    },
    {
        type: "Type 5: Problems based on the difference between Simple and Compound Interest",
        questionNumber: 61,
        question: "The difference between compound interest and simple interest on ₹8,000 for 2 years at the rate of 5% is:",
        options: ["₹10", "₹30", "₹40", "₹20"],
        source: "Exam: SSC GD Constable – 06/02/2023 (Shift-III)",
        answer: "₹20"
    },
    {
        type: "Type 5: Problems based on the difference between Simple and Compound Interest",
        questionNumber: 62,
        question: "The difference between compound interest and simple interest on a sum of money at 20% per annum for 2 years is ₹200. The principal amount is:",
        options: ["₹3,000", "₹4,500", "₹4,000", "₹5,000"],
        source: "Exam: SSC MTS – 21/08/2019 (Shift-II) & SSC CHSL (Tier-I) – 14/03/2023 (Shift-IV)",
        answer: "₹5,000"
    },
    {
        type: "Type 5: Problems based on the difference between Simple and Compound Interest",
        questionNumber: 63,
        question: "The difference between compound interest and simple interest on ₹x at 12% per annum for 2 years is ₹43.20. What is the value of x?",
        options: ["₹2,800", "₹2,400", "₹3,000", "₹2,500"],
        source: "Exam: SSC CPO SI – 10/11/2022 (Shift-II)",
        answer: "₹3,000"
    },
    {
        type: "Type 5: Problems based on the difference between Simple and Compound Interest",
        questionNumber: 64,
        question: "For a certain sum of money at 5% annual interest rate, the difference between the simple interest and the compound interest (compounded annually) for 2 years is ₹25.00. Find the sum.",
        options: ["₹7,500", "₹12,000", "₹8,000", "₹10,000"],
        source: "Exam: SSC GD – 25/11/2021 (Shift-III) & SSC CHSL (Tier-I) – 13/03/2023 (Shift-III)",
        answer: "₹10,000"
    },
    {
        type: "Type 6: Problems based on finding the Rate",
        questionNumber: 65,
        question: "The compound interest on ₹10000 at 20% per annum is ₹4641. If compounding is done half-yearly, for how many years was the principal invested?",
        options: ["4", "6", "2", "3"],
        source: "Exam: SSC CGL Mains – 26/10/2023",
        answer: "2"
    },
    {
        type: "Type 6: Problems based on finding the Rate",
        questionNumber: 66,
        question: "If a sum increases by 21% after 2 years, then the rate of compound interest per annum, when compounded annually, must be:",
        options: ["10.5%", "11.5%", "10%", "11%"],
        source: "Exam: SSC MTS – 02/11/2021 (Shift-I)",
        answer: "10%"
    },
    {
        type: "Type 6: Problems based on finding the Rate",
        questionNumber: 67,
        question: "At what rate percent per annum will a sum of ₹15,625 amount to ₹21,952 in three years, if the interest is compounded annually?",
        options: ["8%", "10%", "12%", "9%"],
        source: "Exam: SSC CGL (Tier-II) – 18/11/2020",
        answer: "12%"
    },
    {
        type: "Type 6: Problems based on finding the Rate",
        questionNumber: 68,
        question: "A certain amount of money at compound interest grows to ₹66,550 in 3 years and ₹73,205 in 4 years. The rate percent per annum is:",
        options: ["5%", "10%", "9%", "11%"],
        source: "Exam: SSC CGL (Tier-I) – 05/03/2020 (Shift-III)",
        answer: "10%"
    },
    {
        type: "Type 6: Problems based on finding the Rate",
        questionNumber: 69,
        question: "At what percentage rate, compound interest compounded annually for a sum of ₹40,000, will amount to ₹44,100 in two years?",
        options: ["5%", "4%", "7.5%", "2%"],
        source: "Exam: SSC CPO-SI – 09/12/2019 (Shift-I)",
        answer: "5%"
    },
    {
        type: "Type 6: Problems based on finding the Rate",
        questionNumber: 70,
        question: "The compound interest on ₹4,000 after 3 years is ₹630.50. Then the rate of interest compounded yearly is:",
        options: ["6%", "7%", "8%", "5%"],
        source: "Exam: SSC CHSL – 15/10/2020 (Shift-I)",
        answer: "5%"
    },
    {
        type: "Type 6: Problems based on finding the Rate",
        questionNumber: 71,
        question: "The compound interest and the amount obtained on a certain sum of money are ₹820 and ₹8,820 respectively after 2 years. If the rate of interest is compounded yearly, then the rate of interest is:",
        options: ["8%", "7%", "5%", "6%"],
        source: "Exam: SSC CHSL – 13/10/2020 (Shift-III)",
        answer: "5%"
    },
    {
        type: "Type 6: Problems based on finding the Rate",
        questionNumber: 72,
        question: "₹3,600 becomes ₹4,900 in 2 years when kept at compound interest (compounded annually). What is the rate of interest per annum?",
        options: ["(18 1/3)%", "(17 1/3)%", "(15 2/3)%", "(16 2/3)%"],
        source: "Exam: SSC MTS – 19/08/2019 (Shift-II)",
        answer: "(16 2/3)%"
    },
    {
        type: "Type 6: Problems based on finding the Rate",
        questionNumber: 73,
        question: "A man invested a sum of money at compound interest. It amounted to ₹12,100 in two years and to ₹13,310 in three years. The rate of interest per annum is:",
        options: ["11%", "9.5%", "12.5%", "10%"],
        source: "Exam: SSC MTS – 13/08/2019 (Shift-III)",
        answer: "10%"
    },
    {
        type: "Type 6: Problems based on finding the Rate",
        questionNumber: 74,
        question: "A sum of ₹10,500 becomes ₹17,745 in 2 years at the rate of compound interest. If the interest is compounded annually, then what will be the rate of interest?",
        options: ["40%", "30%", "25%", "20%"],
        source: "Exam: SSC GD Constable – 13/02/2019 (Shift-I)",
        answer: "30%"
    },
    {
        type: "Type 6: Problems based on finding the Rate",
        questionNumber: 75,
        question: "A sum of ₹11,700 becomes ₹16,848 in 2 years at the rate of compound interest. If the interest is compounded annually, then what will be the rate of interest?",
        options: ["20%", "15%", "17.5%", "25%"],
        source: "Exam: SSC GD Constable – 14/02/2019 (Shift-II)",
        answer: "20%"
    },
    {
        type: "Type 7: Problems based on finding the Time",
        questionNumber: 76,
        question: "When the interest is compounded annually, the compound interest received on an amount of ₹18000 at the rate of 7% per annum is ₹1260. Find the time period.",
        options: ["4 Years", "1 Year", "3 Years", "2 Years"],
        source: "Exam: SSC MTS – 04/05/2023 (Shift-I)",
        answer: "1 Year"
    },
    {
        type: "Type 7: Problems based on finding the Time",
        questionNumber: 77,
        question: "The compound interest on ₹20000 at 5% per annum compounded annually is ₹2050. Find the time period.",
        options: ["2 Years", "4 Years", "2.5 Years", "3 Years"],
        source: "Exam: SSC MTS – 13/07/2022 (Shift-I)",
        answer: "2 Years"
    },
    {
        type: "Type 7: Problems based on finding the Time",
        questionNumber: 78,
        question: "If the interest is compounded half-yearly, find the number of years taken for a sum of ₹5000 to become ₹5832 at 16% annual interest rate.",
        options: ["1.5 Years", "1 Year", "( 1/2 ) Year", "2 Years"],
        source: "Exam: SSC GD Constable – 09/02/2023 (Shift-III)",
        answer: "1 Year"
    },
    {
        type: "Type 7: Problems based on finding the Time",
        questionNumber: 79,
        question: "In what time will ₹3,90,625 amount to ₹4,56,976 at 8% per annum, interest being compounded half-yearly?",
        options: ["2 years", "(1 1/2) years", "(2 1/2) years", "1 year"],
        source: "Exam: SSC CHSL – 08/06/2022 (Shift-II)",
        answer: "2 years"
    },
    {
        type: "Type 7: Problems based on finding the Time",
        questionNumber: 80,
        question: "In what time will a sum of ₹1,25,000 amount to ₹1,48,877 at 12% per annum, if interest is being compounded half-yearly?",
        options: ["(1 1/2) years", "(2 1/2) years", "1 year", "3 years"],
        source: "Exam: SSC CHSL – 09/08/2021 (Shift-III)",
        answer: "(1 1/2) years"
    },
    {
        type: "Type 7: Problems based on finding the Time",
        questionNumber: 81,
        question: "In how many years will ₹2,000 yield ₹662 as compound interest at 10% per annum compounded annually?",
        options: ["3 years", "2 years", "4 years", "5 years"],
        source: "Exam: SSC CGL (Tier-II) – 20/02/2018",
        answer: "3 years"
    },
    {
        type: "Type 7: Problems based on finding the Time",
        questionNumber: 82,
        question: "In how many years will ₹25,000 yield ₹8,275 as compound interest at 10% per annum compounded annually?",
        options: ["2 years", "4 years", "3 years", "5 years"],
        source: "Exam: SSC CGL (Tier-II) – 19/02/2018",
        answer: "3 years"
    },
    {
        type: "Type 7: Problems based on finding the Time",
        questionNumber: 83,
        question: "In how many months will ₹8,000 yield ₹2,648 as compound interest at 20% per annum compounded semi-annually?",
        options: ["18 months", "24 months", "12 months", "30 months"],
        source: "Exam: SSC CGL (Tier-II) – 17/02/2018",
        answer: "18 months"
    },
    {
        type: "Type 7: Problems based on finding the Time",
        questionNumber: 84,
        question: "In how many years will a sum of ₹320 amount to ₹405 if interest is compounded at 12.5% per annum?",
        options: ["(2 1/2) years", "2 years", "(1 1/2) years", "1 year"],
        source: "Exam: SSC CHSL – 16/10/2020 (Shift-II)",
        answer: "2 years"
    },
    {
        type: "Type 7: Problems based on finding the Time",
        questionNumber: 85,
        question: "The compound interest on ₹4,000 at the rate of 5% p.a. is ₹630.50, then the time period is:",
        options: ["3 years", "(3 1/2) years", "(1 1/2) years", "2 years"],
        source: "Exam: SSC CHSL – 14/10/2020 (Shift-I)",
        answer: "3 years"
    },
    {
        type: "Type 7: Problems based on finding the Time",
        questionNumber: 86,
        question: "A sum borrowed under compound interest doubles itself in 10 years. When will it become fourfold of itself at the same rate of interest?",
        options: ["24 years", "15 years", "20 years", "40 years"],
        source: "Exam: SSC GD Constable – 05/03/2019 (Shift-II)",
        answer: "20 years"
    },
    {
        type: "Type 7: Problems based on finding the Time",
        questionNumber: 87,
        question: "When interest is compounded annually, the amount of money in a bank account doubles in 7 years. How many years will it take to multiply this amount in the bank 8 times?",
        options: ["21", "35", "28", "14"],
        source: "Exam: SSC MTS – 14/09/2023 (Shift-II)",
        answer: "21"
    },
    {
        type: "Type 7: Problems based on finding the Time",
        questionNumber: 88,
        question: "With interest compounded annually, a sum becomes 3 times itself in 13 years at a certain rate of annual interest. In how many years will the same amount become 9 times itself if the interest is compounded annually at the same annual interest rate?",
        options: ["32 Years", "20 Years", "30 Years", "26 Years"],
        source: "Exam: SSC MTS – 26/07/2022 (Shift-I)",
        answer: "26 Years"
    },
    {
        type: "Type 7: Problems based on finding the Time",
        questionNumber: 89,
        question: "A sum of money doubles itself in 15 years at a certain rate of compound interest. In how many years will it 4 times itself?",
        options: ["45", "30", "25", "15"],
        source: "Exam: SSC MTS – 26/10/2021 (Shift-I) & SSC CHSL (Tier-I) – 10/03/2023 (Shift-II)",
        answer: "30"
    },
    {
        type: "Type 7: Problems based on finding the Time",
        questionNumber: 90,
        question: "A certain sum of money becomes double in 2 years at a certain annual rate of compound interest. In how many years will it become 4 times at the same compound interest rate?",
        options: ["6", "5", "4", "3"],
        source: "Exam: SSC GD – 01/12/2021 (Shift-II) & SSC CHSL (Tier-I) – 09/03/2023 (Shift-I)",
        answer: "4"
    },
    {
        type: "Type 7: Problems based on finding the Time",
        questionNumber: 91,
        question: "If a certain sum at compound interest becomes 3 times in 4 years, then in how many years will it become 9 times, at the same rate of interest?",
        options: ["6 years", "9 years", "10 years", "8 years"],
        source: "Exam: SSC MTS – 06/10/2021 (Shift-I)",
        answer: "8 years"
    },
    {
        type: "Type 7: Problems based on finding the Time",
        questionNumber: 92,
        question: "A sum doubles in 4 years at a certain rate of compound interest. In how many years will that amount become 8 times itself at the same rate?",
        options: ["9", "12", "15", "6"],
        source: "Exam: SSC MTS – 13/08/2019 (Shift-II)",
        answer: "12"
    },
    {
        type: "Type 7: Problems based on finding the Time",
        questionNumber: 93,
        question: "If a sum of money triples in four years at compound interest, then in how many years will that amount become 27 times at the same interest rate?",
        options: ["10 years", "16 years", "12 years", "15 years"],
        source: "Exam: SSC CGL (Tier-I) – 19/06/2019 (Shift-III)",
        answer: "12 years"
    },
    {
        type: "Type 8: Miscellaneous",
        questionNumber: 94,
        question: "If the simple interest on ₹2800 at 10% per annum for 3 years is x and the simple interest on ₹6200 at 14% per annum for y years is ₹1736, then what will be the value of x/y?",
        options: ["140", "420", "550", "380"],
        source: "Exam: SSC CGL Mains – 26/10/2023 (Note: This is a Simple Interest problem, not Compound Interest)",
        answer: "420"
    },
    {
        type: "Type 8: Miscellaneous",
        questionNumber: 95,
        question: "The compound interest on a certain sum of money invested for 1.5 years at 10% per annum compounded half-yearly is ₹5044. How much is that amount?",
        options: ["₹33,000", "₹22,000", "₹32,000", "₹37,044"],
        source: "Exam: SSC CHSL (Tier-I) – 17/08/2023 (Shift-II) (Note: This finds the principal, but the calculation is non-standard due to half-yearly compounding over 1.5 years)",
        answer: "₹32,000"
    },
    {
        type: "Type 8: Miscellaneous",
        questionNumber: 96,
        question: "Rajneesh borrowed a sum of ₹1500 from a bank and repaid the entire amount including interest in two equal annual installments where Rajneesh paid the first installment after one year of borrowing from the bank. If the rate of interest was 40% per annum and the interest was compounded annually, find the value (in ₹) of each installment paid by Rajneesh.",
        options: ["1125", "1225", "1470", "1350"],
        source: "Exam: SSC CGL Mains (Tier-II) – 07/03/2022",
        answer: "1125"
    },
    {
        type: "Type 8: Miscellaneous",
        questionNumber: 97,
        question: "A sum is deposited for 4 years at a rate of 10% per annum compounded annually. The difference between the interest received at the end of 2 years and the received at the end of 4 years is ₹5082. Find the sum (in ₹).",
        options: ["20,000", "50,820", "25,500", "10,164"],
        source: "Exam: SSC CGL – 11/04/2022 (Shift-I)",
        answer: "20,000"
    },
    {
        type: "Type 8: Miscellaneous",
        questionNumber: 98,
        question: "What is the difference (in ₹) between the interests on ₹50,000 for one year at 8% per annum compounded half-yearly and yearly?",
        options: ["100", "80", "70", "50"],
        source: "Exam: SSC CGL (Tier-II) – 29/01/2022 (Shift-I)",
        answer: "80"
    },
    {
        type: "Type 8: Miscellaneous",
        questionNumber: 99,
        question: "A sum of money becomes ₹11880 after 4 years and ₹17820 after 6 years on compound interest, if the interest is compounded annually. What will be half of the sum (in ₹)?",
        options: ["2,410", "2,530", "2,640", "2,750"],
        source: "Exam: SSC CGL (Tier-II) – 29/01/2022 (Shift-I)",
        answer: "2,640"
    },
    {
        type: "Type 8: Miscellaneous",
        questionNumber: 100,
        question: "Divide ₹66300 between A and B such that the amount received by A after 8 years is equal to the amount received by B after 10 years. Whereas the rate of interest is 10% per annum compounded annually.",
        options: ["A = ₹35,520, B = ₹30,810", "A = ₹37,000, B = ₹29,300", "A = ₹35,200, B = ₹31,000", "A = ₹36,300, B = ₹30,000"],
        source: "Exam: SSC GD Constable – 07/02/2023 (Shift-I)",
        answer: "A = ₹36,300, B = ₹30,000"
    },
    {
        type: "Type 8: Miscellaneous",
        questionNumber: 101,
        question: "A man borrows money for 2 years at the rate of 10% compound interest per annum and pays back in twice yearly installments of ₹1089. If the interest is calculated annually, then find the amount borrowed (in ₹).",
        options: ["2,178", "2,090", "1,890", "1,800"],
        source: "Exam: SSC MTS – 08/09/2023 (Shift-II)",
        answer: "1,890"
    },
    {
        type: "Type 8: Miscellaneous",
        questionNumber: 102,
        question: "When interest is compounded every 8 months, the compound interest received on a sum of money in (1 1/3) year at 12% annual interest rate is ₹2496. At the same rate of interest, if the interest is compounded annually, what will be the same amount of money in four years (in ₹ to the nearest)?",
        options: ["23603", "20336", "26033", "30632"],
        source: "Exam: SSC CPO SI – 10/11/2022 (Shift-II)",
        answer: "30632"
    },
    {
        type: "Type 8: Miscellaneous",
        questionNumber: 103,
        question: "Gagan borrowed a sum of ₹2500 at 8% compound interest per annum. He paid ₹1000 at the end of the first year and four ₹500 at the end of the second year. How much will he have to pay (to the nearest rupees) to clear his dues at the end of 4 years?",
        options: ["₹1,443", "₹1,628", "₹1,800", "₹1,558"],
        source: "Exam: SSC CPO SI – 10/11/2022 (Shift-II)",
        answer: "₹1,558"
    },
    {
        type: "Type 8: Miscellaneous",
        questionNumber: 104,
        question: "A person borrowed a sum of ₹30,800 at 10% per annum for 3 years. Interest compounded annually. At the end of the second year, he paid a sum of ₹13268. At the end of the IIIrd year he paid ₹x to clear the debt. Find the value of x.",
        options: ["26,400", "26,200", "26,510", "26,620"],
        source: "Exam: SSC CPO SI – 11/11/2022 (Shift-III)",
        answer: "26,620"
    },
    {
        type: "Type 8: Miscellaneous",
        questionNumber: 105,
        question: "₹15000 is lent at 16% per annum compound interest. What is the difference between the compound interest for the second year and the third year?",
        options: ["₹548", "₹544", "₹445.44", "₹454.88"],
        source: "Exam: SSC CPO SI – 10/11/2022 (Shift-II) & SSC CHSL (Tier-I) – 21/03/2023 (Shift-I)",
        answer: "₹454.88"
    },
    {
        type: "Type 8: Miscellaneous",
        questionNumber: 106,
        question: "What will be the difference (in rupees) between half-yearly compound interest and annual compound interest on ₹25000 at the rate of 20% for 1 year?",
        options: ["₹125", "₹250", "₹500", "₹375"],
        source: "Exam: SSC CGL (Tier-II) – 21/02/2018 & SSC CHSL (Tier-I) – 20/03/2023 (Shift-I)",
        answer: "₹250"
    },
    {
        type: "Type 8: Miscellaneous",
        questionNumber: 107,
        question: "A sum of ₹18,000 becomes ₹21,780 after 2 years on compound interest compounded annually. What will be the compound interest (in ₹) on the same sum for the same period if the rate of interest increases by 5%?",
        options: ["1,845", "4,670", "5,805", "5,500"],
        source: "Exam: SSC CGL (Tier-I) – 19/04/2022 (Shift-I)",
        answer: "5,805"
    },
    {
        type: "Type 8: Miscellaneous",
        questionNumber: 108,
        question: "For a fixed period an amount of ₹60,000 invested at a fixed rate. The amount, whose interest is compounded annually, has increased to ₹63,654. If at the same rate, the amount would have been invested for half of the duration, how much would it have increased?",
        options: ["₹61800", "₹61675", "₹61827", "₹61809"],
        source: "Exam: SSC CHSL – 04/07/2019 (Shift-II)",
        answer: "₹61809"
    },
    {
        type: "Type 8: Miscellaneous",
        questionNumber: 109,
        question: "A sum of ₹8,000 invested at 10% p.a. amounts to ₹9,261 in a certain time, interest compounded half-yearly. What will be the compound interest (in ₹) on the same sum for the same time at double the earlier rate of interest, when interest is compounded annually?",
        options: ["₹2,520", "₹2,480", "₹2,500", "₹2,560"],
        source: "Exam: SSC CGL (Tier-I) – 04/03/2020 (Shift-III)",
        answer: "₹2,560"
    },
    {
        type: "Type 8: Miscellaneous",
        questionNumber: 110,
        question: "What is the compound interest on a sum of ₹12,000 for (2 5/8) years at 8% p.a., when the interest is compounded annually?",
        options: ["₹2,697", "₹2,654", "₹2,642", "₹2,712"],
        source: "Exam: SSC CGL (Tier-I) – 04/03/2020 (Shift-I)",
        answer: "₹2,697"
    },
    {
        type: "Type 8: Miscellaneous",
        questionNumber: 111,
        question: "A and B together borrowed a sum of ₹51,750 at an interest rate of 7% p.a. compound interest in such a way that to settle the loan, A paid as much amount after three years as paid by B after 4 years from the day of borrowing. The sum (in ₹) borrowed by A was:",
        options: ["₹24,860", "₹25,000", "₹26,750", "₹25,650"],
        source: "Exam: SSC CGL (Tier-I) – 05/03/2020 (Shift-II)",
        answer: "₹26,750"
    },
    {
        type: "Type 8: Miscellaneous",
        questionNumber: 112,
        question: "If compound interest received on a certain amount in the 3 years is ₹12,100, what will be the compound interest (in ₹) for the 4th year on the same amount if rate of interest is 9%?",
        options: ["₹17,080", "₹15,669", "₹13,189", "₹14,376"],
        source: "Exam: SSC CGL (Tier-II) – 19/02/2018",
        answer: "₹13,189"
    },
    {
        type: "Type 8: Miscellaneous",
        questionNumber: 113,
        question: "If the amount on a certain principal in 3 years at 12% rate of interest compounded annually is ₹12,000, what will be the amount (in ₹) after the 4th year?",
        options: ["₹14,330", "₹15,440", "₹13,440", "₹14,550"],
        source: "Exam: SSC CGL (Tier-II) – 17/02/2018",
        answer: "₹13,440"
    },
    {
        type: "Type 8: Miscellaneous",
        questionNumber: 114,
        question: "A sum of ₹18,000 is lent at 10% p.a. compound interest, compounded annually. What is the difference between the compound interest for the 3rd year and 4th year?",
        options: ["₹215.40", "₹217.80", "₹220.60", "₹221.80"],
        source: "Exam: SSC CGL (Tier-II) – 11/09/2019",
        answer: "₹217.80"
    },
    {
        type: "Type 8: Miscellaneous",
        questionNumber: 115,
        question: "A sum of ₹x amounts to ₹12,777.60 in 2 years at 15% p.a., when the interest is compounded eight-monthly. The value of x is:",
        options: ["₹10,200", "₹10,400", "₹9,800", "₹9,600"],
        source: "Exam: SSC CPO-SI – 13/12/2019 (Shift-II)",
        answer: "₹9,600"
    },
    {
        type: "Type 8: Miscellaneous",
        questionNumber: 116,
        question: "The compound interest (in ₹) on a sum of ₹12,000 at 10% per annum for 1.5 years, interest compounded half-yearly, is:",
        options: ["₹1,821.50", "₹1,750", "₹1,891.50", "₹1,900"],
        source: "Exam: SSC Selection Post Phase VIII (H.L.) – 09/11/2020 (Shift-I)",
        answer: "₹1,891.50"
    },
    {
        type: "Type 8: Miscellaneous",
        questionNumber: 117,
        question: "The difference between the compound interest on a sum of ₹8,000 for 1 year at the rate of 10% per annum, interest compounded yearly and half-yearly is:",
        options: ["₹10", "₹40", "₹20", "₹30"],
        source: "Exam: SSC CHSL – 19/03/2020 (Shift-III)",
        answer: "₹20"
    },
    {
        type: "Type 8: Miscellaneous",
        questionNumber: 118,
        question: "There is a 60% increase in an amount in 5 years at simple interest. What will be the compound interest on ₹6,250 for two years at the same rate of interest, when the interest is compounded yearly?",
        options: ["₹1,480", "₹1,560", "₹1,500", "₹1,590"],
        source: "Exam: SSC CHSL – 20/10/2020 (Shift-II)",
        answer: "₹1,560"
    },
    {
        type: "Type 8: Miscellaneous",
        questionNumber: 119,
        question: "At 6.25% annual compound interest, amount of ₹14,739 in 3 years will become?",
        options: ["₹12,184", "₹12,288", "₹12,473", "₹12,148"],
        source: "Exam: SSC MTS – 21/08/2019 (Shift-III)",
        answer: "₹12,288"
    },
    {
        type: "Type 8: Miscellaneous",
        questionNumber: 120,
        question: "If compound interest is charged annually, then what amount will become ₹24,494.40 in 2 years at the rate of 8% compound interest annually?",
        options: ["₹21,200", "₹22,400", "₹21,000", "₹22,000"],
        source: "Exam: SSC MTS – 21/08/2019 (Shift-I)",
        answer: "₹21,000"
    },
    {
        type: "Type 8: Miscellaneous",
        questionNumber: 121,
        question: "A sum of ₹1,200 is invested at compound interest (compounded half-yearly). If the rate of interest is 10% per annum, then what will be the amount after 18 months?",
        options: ["₹1,389.15", "₹1,185.45", "₹1,563.25", "₹1,295.35"],
        source: "Exam: SSC MTS – 08/08/2019 (Shift-III)",
        answer: "₹1,389.15"
    },
    {
        type: "Type 8: Miscellaneous",
        questionNumber: 122,
        question: "What is the effective annual rate of interest corresponding to a rate of 10% per annum compounded half-yearly?",
        options: ["10.75%", "10.5%", "10%", "10.25%"],
        source: "Exam: SSC MTS – 14/08/2019 (Shift-II)",
        answer: "10.25%"
    },
    {
        type: "Type 8: Miscellaneous",
        questionNumber: 123,
        question: "What is the compound interest on a sum of ₹10,000 for (3 2/4) years at 12% p.a., the interest compounded annually? (nearest to integer)",
        options: ["₹4,049", "₹3,637", "₹3,673", "₹3,649"],
        source: "Exam: SSC Selection Post Phase VII (M.L.) – 15/10/2019 (Shift-I)",
        answer: "₹4,049"
    },
    {
        type: "Type 8: Miscellaneous",
        questionNumber: 124,
        question: "A certain amount was invested at a certain compound interest rate. The compound amount after five years is 1.1881 times the amount obtained in three years. What is the percentage rate of interest?",
        options: ["9.2%", "8%", "8.1%", "9%"],
        source: "Exam: SSC CHSL – 04/07/2019 (Shift-III)",
        answer: "9%"
    }
]

export default function CompoundInterestSscPage() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const [quizEnded, setQuizEnded] = useState(false);

    const activeQuestionRef = useRef<HTMLButtonElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);


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

    const currentQuestion = mcqData[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.answer;

    if (quizEnded) {
        return (
            <div className="container mx-auto py-12 px-4 md:px-6 flex justify-center items-center h-full">
                <Card className="w-full max-w-xl text-center">
                    <CardHeader>
                        <CardTitle>Quiz Completed!</CardTitle>
                        <CardDescription>You have completed the Compound Interest (SSC) quiz.</CardDescription>
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
