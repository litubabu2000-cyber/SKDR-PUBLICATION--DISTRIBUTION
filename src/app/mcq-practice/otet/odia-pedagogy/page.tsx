'use client';

import { Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight, CheckCircle, Lightbulb, XCircle, Timer, Edit } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { DrawingCanvas } from "@/components/drawing-canvas";

const mcqData = [
    {
        type: "I. Aims, Objectives, and Role of Language (L1)",
        questionNumber: "44",
        question: "ମାତୃଭାଷା ଶିକ୍ଷା ଦ୍ୱାରା ଶିକ୍ଷାର୍ଥୀର କି ଉପକାର ହୋଇଥାଏ ?",
        options: ["(A) ଭାଷା କଳା ସମ୍ବନ୍ଧରେ ସଂଜ୍ଞାଗତ ଜ୍ଞାନ ମିଳିଥାଏ ।", "(B) ଭାଷା ଶିକ୍ଷା ଦ୍ଵାରା, ଜ୍ଞାନ ଅର୍ଜନ ଏବଂ ପ୍ରଗତି ନିର୍ଣ୍ଣୟ କରିବାରେ ସାହାଯ୍ୟ ହେବେ ।", "(C) ଶବ୍ଦଭଣ୍ଡାର ବୃଦ୍ଧି ହୁଏ ।", "(D) ଭାଷାର ତତ୍ତ୍ୱ, ଜ୍ଞାନ ଓ ବ୍ୟବହାର ଦକ୍ଷତା ପ୍ରକାଶ କରେ ।"],
        answer: "(D) ଭାଷାର ତତ୍ତ୍ୱ, ଜ୍ଞାନ ଓ ବ୍ୟବହାର ଦକ୍ଷତା ପ୍ରକାଶ କରେ ।",
        source: "Exam: OTET 2016-1st Paper II"
    },
    {
        type: "I. Aims, Objectives, and Role of Language (L1)",
        questionNumber: "45",
        question: "ପ୍ରାଥମିକ ସ୍ତରରେ ମାତୃଭାଷା ଶିକ୍ଷଣର ମୁଖ୍ୟ ଉଦ୍ଦେଶ୍ୟ କ’ଣ ?",
        options: ["(A) କେବଳ ମୌଖିକ ଅଭିବ୍ୟକ୍ତି ଶିକ୍ଷା ଦିଆଯିବ ।", "(B) ପାରିପାର୍ଶ୍ୱିକ ଜଗତର ଜ୍ଞାନ ଓ ଅନୁଭୂତିକୁ ଭାଷା, ଯୁକ୍ତି ଓ ପ୍ରତୀକରେ ପ୍ରକାଶ, ଗ୍ରହଣ ଓ ବ୍ୟବହାର କରିବେ ।", "(C) ଶବ୍ଦଭଣ୍ଡାରେ ବୃଦ୍ଧି ହେବେ ।", "(D) ଶ୍ରବଣ ଓ ପଠନ ଦକ୍ଷତାର ଅଭିବୃଦ୍ଧି ଘଟିବ ।"],
        answer: "(B) ପାରିପାର୍ଶ୍ୱିକ ଜଗତର ଜ୍ଞାନ ଓ ଅନୁଭୂତିକୁ ଭାଷା, ଯୁକ୍ତି ଓ ପ୍ରତୀକରେ ପ୍ରକାଶ, ଗ୍ରହଣ ଓ ବ୍ୟବହାର କରିବେ ।",
        source: "Exam: OTET 2016-1st Paper II"
    },
    {
        type: "I. Aims, Objectives, and Role of Language (L1)",
        questionNumber: "60",
        question: "ଉଚ୍ଚ ପ୍ରାଥମିକ ସ୍ତରରେ ମାତୃଭାଷା ପାଠ୍ୟ ପୁସ୍ତକର ମୂଖ୍ୟ ଉଦ୍ଦେଶ୍ୟ କ’ଣ ?",
        options: ["(A) ଜ୍ଞାନର ସଞ୍ଚାରକୁ ପ୍ରତିଫଳନ", "(B) ସର୍ବଭାରତୀୟ ସ୍ତରରେ ପରିଚିତ ହେବାର ପ୍ରତିଫଳନ", "(C) ସୃଜନାତ୍ମକ ବିକାଶର ପ୍ରତିଫଳନ", "(D) ଭାଷାର ପରିଚ୍ଛନତାର ପ୍ରତିଫଳନ"],
        answer: "(C) ସୃଜନାତ୍ମକ ବିକାଶର ପ୍ରତିଫଳନ",
        source: "Exam: OTET 2016-1st Paper II"
    },
    {
        type: "I. Aims, Objectives, and Role of Language (L1)",
        questionNumber: "44",
        question: "ମାତୃଭାଷା ଶିକ୍ଷଣର ଚୂଡ଼ାନ୍ତ ଲକ୍ଷ୍ୟ କ’ଣ ?",
        options: ["(A) ମାତୃଭାଷାରେ ଭାବକୁ ଅଭିବ୍ୟକ୍ତ କରିବା ।", "(B) ମାତୃଭାଷାରେ ଶୁଣିଥିବା ବିଷୟର ସାରାଂଶ ଲେଖିବା ।", "(C) ନିଜର ଭାବନାକୁ ଲିଖିତ ଓ ମୌଖିକ ଭାବରେ ପ୍ରକାଶ କରିବା ।", "(D) ମାତୃଭାଷା ମାଧ୍ୟମରେ ସବୁ ବିଷୟରେ ଜ୍ଞାନ ଅର୍ଜନ କରିବା ।"],
        answer: "(D) ମାତୃଭାଷା ମାଧ୍ୟମରେ ସବୁ ବିଷୟରେ ଜ୍ଞାନ ଅର୍ଜନ କରିବା ।",
        source: "Exam: OTET 2017 Paper II"
    },
    {
        type: "I. Aims, Objectives, and Role of Language (L1)",
        questionNumber: "38",
        question: "ଗଦ୍ୟ ଶିକ୍ଷାର ଲକ୍ଷ୍ୟ କି ?",
        options: ["(A) ସାଧାରଣ ଜ୍ଞାନ", "(B) ଜ୍ଞାନ ଅର୍ଜନ", "(C) ଭାବପ୍ରବଣତା", "(D) ଋଢ଼ି ପ୍ରୟୋଗ ଜ୍ଞାନ"],
        answer: "(B) ଜ୍ଞାନ ଅର୍ଜନ",
        source: "Exam: OTET 2017 Paper II"
    },
    {
        type: "I. Aims, Objectives, and Role of Language (L1)",
        questionNumber: "53",
        question: "ଉଚ୍ଚ ପ୍ରାଥମିକ ସ୍ତରରେ ଓଡ଼ିଆ ଶିକ୍ଷାଦାନର ଉଦ୍ଦେଶ୍ୟ କ’ଣ?",
        options: ["(A) ଶବ୍ଦଭଣ୍ଡାରର ବୃଦ୍ଧି ହେବା", "(B) ପଠନ ଦକ୍ଷତା ବୃଦ୍ଧି", "(C) ମାତୃଭାଷାର ବିଭିନ୍ନ କ୍ଷେତ୍ରରେ ପ୍ରୟୋଗ ଦକ୍ଷତା ଅର୍ଜନ କରିବା", "(D) ଲିଖନ କ୍ଷମତା ବୃଦ୍ଧି"],
        answer: "(C) ମାତୃଭାଷାର ବିଭିନ୍ନ କ୍ଷେତ୍ରରେ ପ୍ରୟୋଗ ଦକ୍ଷତା ଅର୍ଜନ କରିବା",
        source: "Exam: OTET 2018 Paper II"
    },
    {
        type: "I. Aims, Objectives, and Role of Language (L1)",
        questionNumber: "31",
        question: "ପ୍ରାଥମିକ ସ୍ତରରେ ଓଡ଼ିଆ ଭାଷା ଶିକ୍ଷାର ଲକ୍ଷ୍ୟ ________ ଅଟେ ।",
        options: ["(A) ଭାବନାକୁ ଭାଷା ମାଧ୍ୟମରେ ସୂଚାଇବା", "(B) ଲିଖନ କ୍ଷେତ୍ରରେ କୁଶଳତା", "(C) ସୁସ୍ପଷ୍ଟ ଧ୍ୱନିରେ ପଠନ କରିବା", "(D) ପ୍ରବନ୍ଧ ଲେଖିବାରେ ଦକ୍ଷତା"],
        answer: "(A) ଭାବନାକୁ ଭାଷା ମାଧ୍ୟମରେ ସୂଚାଇବା",
        source: "Exam: OTET 2021 Paper II"
    },
    {
        type: "I. Aims, Objectives, and Role of Language (L1)",
        questionNumber: "32",
        question: "ମାତୃଭାଷାକୁ ଶିକ୍ଷାର ମାଧ୍ୟମ ରୂପେ ଗ୍ରହଣ କରିବାର କାରଣ କ’ଣ ?",
        options: ["(A) ମାତୃଭାଷା ଶିକ୍ଷା ଉନ୍ନତ ଭାବେ ଶିକ୍ଷା ଦେଇଥାଏ", "(B) ଶିକ୍ଷାର୍ଥୀମାନଙ୍କୁ ସହଜରେ ଶିକ୍ଷାଦାନ", "(C) ପିଲା ମାତୃଭାଷାକୁ ସହଜରେ ଗ୍ରହଣ କରିଥାଏ", "(D) ସମାଜର ଉନ୍ନତି ହେତୁ ଏହା ଦାୟିତ୍ୱ ଗ୍ରହଣ କରେ"],
        answer: "(C) ପିଲା ମାତୃଭାଷାକୁ ସହଜରେ ଗ୍ରହଣ କରିଥାଏ",
        source: "Exam: OTET 2021 Paper II"
    },
    {
        type: "I. Aims, Objectives, and Role of Language (L1)",
        questionNumber: "35",
        question: "ପଦ୍ୟ ଶିକ୍ଷାଦାନର ଉଦ୍ଦେଶ୍ୟ କ’ଣ?",
        options: ["(A) ବ୍ୟାକରଣ ସିଦ୍ଧ ଜ୍ଞାନାର୍ଜନ", "(B) ଭାଷାର ଶୁଦ୍ଧ ବ୍ୟବହାର", "(C) କଳ୍ପନାଶକ୍ତିର ବିକାଶ", "(D) ରସାସ୍ଵାଦନ ଓ ଉପଭୋଗ"],
        answer: "(D) ରସାସ୍ଵାଦନ ଓ ଉପଭୋଗ",
        source: "Exam: OTET 2021 Paper II"
    },
    {
        type: "II. Language Skills (LSRW) and Their Function",
        questionNumber: "52",
        question: "ଉତ୍ତମ ବ୍ୟାକରଣ ଜ୍ଞାନ ଅଭିବ୍ୟକ୍ତିକୁ କେଉଁ କ୍ଷେତ୍ରରେ ସହାୟକ ହୋଇଥାଏ ?",
        options: ["(A) ବ୍ୟବହାର", "(B) ଆବେଗାତ୍ମକ", "(C) ବିଶ୍ଲେଷଣାତ୍ମକ", "(D) ସୃଜନଶୀଳ"],
        answer: "(D) ସୃଜନଶୀଳ",
        source: "Exam: OTET 2016-1st Paper II"
    },
    {
        type: "II. Language Skills (LSRW) and Their Function",
        questionNumber: "42",
        question: "ଉତ୍ତମ ଲିଖନର ଅଭ୍ୟାସ କଲେ କେଉଁ ଦକ୍ଷତା ବୃଦ୍ଧିପାଏ?",
        options: ["(A) ଭାଷାଗତ ଜ୍ଞାନ", "(B) ଭାଷାଗତ ଶୁଦ୍ଧତା", "(C) ଶବ୍ଦଭଣ୍ଡାର ଜ୍ଞାନ", "(D) ଭାଷାଗତ ସଂଯମତାକୁ"],
        answer: "(B) ଭାଷାଗତ ଶୁଦ୍ଧତା",
        source: "Exam: OTET 2016-1st Paper II"
    },
    {
        type: "II. Language Skills (LSRW) and Their Function",
        questionNumber: "58",
        question: "ଭାଷା ଶିକ୍ଷାର ଦକ୍ଷତା ଶିକ୍ଷାକ୍ରମର ସଠିକ୍ ପଦ୍ଧତି କେଉଁଟି?",
        options: ["(A) ଶୁଣିବା - କହିବା - ପଢ଼ିବା - ଲେଖିବା", "(B) କହିବା - ଶୁଣିବା - ଲେଖିବା - ପଢ଼ିବା", "(C) ଲେଖିବା - କହିବା - ପଢ଼ିବା - ଶୁଣିବା", "(D) ପଢ଼ିବା - ଶୁଣିବା - କହିବା - ଲେଖିବା"],
        answer: "(A) ଶୁଣିବା - କହିବା - ପଢ଼ିବା - ଲେଖିବା",
        source: "Exam: OTET 2016-1st Paper II"
    },
    {
        type: "II. Language Skills (LSRW) and Their Function",
        questionNumber: "32",
        question: "ଭାଷା ଶିକ୍ଷାର କେଉଁଟି ଉତ୍ତମ ପଦ୍ଧତି ଅଟେ ?",
        options: ["(A) ଧ୍ୱନି ଶିକ୍ଷଣ", "(B) ଶବ୍ଦଗଠନ", "(C) ବ୍ୟାକରଣ ସମ୍ବନ୍ଧୀୟ ଜ୍ଞାନ", "(D) ବାସ୍ତବିକ ଭାଷା ଓ ବ୍ୟାକରଣ ପ୍ରୟୋଗ"],
        answer: "(D) ବାସ୍ତବିକ ଭାଷା ଓ ବ୍ୟାକରଣ ପ୍ରୟୋଗ",
        source: "Exam: OTET 2017 Paper II"
    },
    {
        type: "II. Language Skills (LSRW) and Their Function",
        questionNumber: "59",
        question: "ଭାଷା ଶିକ୍ଷାର ସଠିକ୍ କ୍ରମ କେଉଁଟି ?",
        options: ["(A) କହିବା - ଶୁଣିବା - ଲେଖିବା - ପଢ଼ିବା", "(B) ଶୁଣିବା - କହିବା - ପଢ଼ିବା - ଲେଖିବା", "(C) ଲେଖିବା - ପଢ଼ିବା - ଶୁଣିବା - କହିବା", "(D) ପଢ଼ିବା - ଶୁଣିବା - କହିବା - ଲେଖିବା"],
        answer: "(B) ଶୁଣିବା - କହିବା - ପଢ଼ିବା - ଲେଖିବା",
        source: "Exam: OTET 2017 Paper II"
    },
    {
        type: "II. Language Skills (LSRW) and Their Function",
        questionNumber: "43",
        question: "ଭାଷାର ଦକ୍ଷତା ବୃଦ୍ଧି ପାଇଁ ଶିକ୍ଷାର୍ଥୀର କେଉଁଟି ପ୍ରଥମେ ଆବଶ୍ୟକ ?",
        options: ["(A) ପଢ଼ିବା ଅଭ୍ୟାସକୁ ନିୟମିତ କରିବାକୁ ଶିକ୍ଷାଦିଆଯିବ ।", "(B) କହିବା ଅଭ୍ୟାସକୁ ପ୍ରତିଦିନ କରିବାକୁ ଶିକ୍ଷାଦିଆଯିବ ।", "(C) ଲେଖିବା କ୍ଷମତାକୁ ବୃଦ୍ଧି କରିବାକୁ ଶିକ୍ଷା ଦିଆଯିବ ।", "(D) ଅଧିକରୁ ଅଧିକ ଭାଷାଗତ ଜ୍ଞାନ ଶିକ୍ଷଣ ଦ୍ଵାରା ପ୍ରଗତି ହେବାକୁ ଶିକ୍ଷାଦିଆଯିବ ।"],
        answer: "(B) କହିବା ଅଭ୍ୟାସକୁ ପ୍ରତିଦିନ କରିବାକୁ ଶିକ୍ଷାଦିଆଯିବ ।",
        source: "Exam: OTET 2021 Paper II"
    },
    {
        type: "II. Language Skills (LSRW) and Their Function",
        questionNumber: "42",
        question: "କେଉଁଟି କଥନ ଦକ୍ଷତାର ଉପକୌଶଳ ଅଟେ?",
        options: ["(A) ସୁର ଓ ଶବ୍ଦର ଉଚ୍ଚାରଣ", "(B) ମାତ୍ରାଗତ ଶୁଦ୍ଧ ଶବ୍ଦର ବ୍ୟବହାର", "(C) ସ୍ୱର ଲହରୀ", "(D) ମାତ୍ରାଗତ ଶୁଦ୍ଧତା"],
        answer: "(A) ସୁର ଓ ଶବ୍ଦର ଉଚ୍ଚାରଣ",
        source: "Exam: OTET 2021 Paper II"
    },
    {
        type: "II. Language Skills (LSRW) and Their Function",
        questionNumber: "54",
        question: "କେଉଁ ସ୍ତରରେ ପଢ଼ିବା ଓ ଲେଖିବା ଉଦ୍ଦେଶ୍ୟ ସିଦ୍ଧ ହୁଏ ?",
        options: ["(A) ପ୍ରାଥମିକ", "(B) ମାଧ୍ୟମିକ", "(C) ଉଚ୍ଚ", "(D) ଉପରୋକ୍ତ ସବୁ"],
        answer: "(D) ଉପରୋକ୍ତ ସବୁ",
        source: "Exam: OTET 2021 Paper II"
    },
    {
        type: "III. Reading Pedagogy",
        questionNumber: "50",
        question: "ନିମ୍ନୋକ୍ତ ମଧ୍ୟରୁ କେଉଁଟି “ବିଷୟବସ୍ତୁ ସହ ଭାବଗତ ସଂଯୋଗ” ସହିତ ସମ୍ବନ୍ଧିତ ହୋଇନାହିଁ ?",
        options: ["(A) ପଢ଼ିବାରେ ପ୍ରବେଶ କରିବା ପୂର୍ବରୁ ଆଗରୁ ଜାଣିଥିବା ଜ୍ଞାନ ସହ ଯୋଡ଼ିବା ଆବଶ୍ୟକ ।", "(B) ପଢ଼ିବାରେ ଭାବ-ବୋଧ ଭାବକୁ ନିଷ୍କର୍ଷ କରାଇବା ବିଷୟକୁ ଗ୍ରହଣ କରିବା ।", "(C) ପଢ଼ିବାରେ ପ୍ରଶ୍ନର ଉତ୍ତର ଜାଣିବାକୁ ଚେଷ୍ଟା କରିବା ।", "(D) ପଢ଼ିବାରେ ପ୍ରଶ୍ନୋତ୍ତର କେବଳ ଉପଯୋଗ କରାଇବା ସହ ଭାବନାକୁ ଅପେକ୍ଷା କରାଯାଏ ।"],
        answer: "(D) ପଢ଼ିବାରେ ପ୍ରଶ୍ନୋତ୍ତର କେବଳ ଉପଯୋଗ କରାଇବା ସହ ଭାବନାକୁ ଅପେକ୍ଷା କରାଯାଏ ।",
        source: "Exam: OTET 2016-1st Paper II"
    },
    {
        type: "III. Reading Pedagogy",
        questionNumber: "47",
        question: "ନିମ୍ନ ମଧ୍ୟରୁ କେଉଁଟି ଗଦ୍ୟ ଶିକ୍ଷାଦାନରେ ଚିତ୍ର ବ୍ୟବହାର କରାଯାଏ ନାହିଁ ବୋଲି ବୁଝାଯିବ?",
        options: ["(A) ଶିକ୍ଷାର୍ଥୀଙ୍କର କଳ୍ପନା ଶକ୍ତିର ଅଭିବୃଦ୍ଧି", "(B) ବିଷୟ-ବସ୍ତୁକୁ ସରଳୀକରଣ ଓ ସ୍ପଷ୍ଟିକରଣ", "(C) ଦୁର୍ବୋଧ ଶବ୍ଦରୁ ମୁକ୍ତି", "(D) ଅନୁସନ୍ଧାନ କରିବାରେ ଆଗ୍ରହ ବଢ଼ାଇବା"],
        answer: "(D) ଅନୁସନ୍ଧାନ କରିବାରେ ଆଗ୍ରହ ବଢ଼ାଇବା",
        source: "Exam: OTET 2016-1st Paper II"
    },
    {
        type: "III. Reading Pedagogy",
        questionNumber: "41",
        question: "ନିମ୍ନୋକ୍ତ ପଦ୍ୟାଂଶର କ’ଣ ନାମ ଦେଲେ ଯୁକ୍ତିଯୁକ୍ତ ହେବ?",
        options: ["(A) ସମାଜରେ ସୁଖୀ ହେବାକୁ କେବଳ ଭୋଗ", "(B) ସୁଖୀ ଲୋକେ ଭାଗ୍ୟରେ ଭଲ ପରିବାର ପାଇଥାନ୍ତି", "(C) ସାମାଜିକ ପ୍ରଗତିକୁ ପୂର୍ଣ୍ଣ ରୂପେ ଦୂରକରିବା", "(D) ଶାନ୍ତିର ଅଭାବରେ ସୁଖୀ ହେବା ଅସମ୍ଭବ ।"],
        answer: "(D) ଶାନ୍ତିର ଅଭାବରେ ସୁଖୀ ହେବା ଅସମ୍ଭବ ।",
        source: "Exam: OTET 2016-1st Paper II"
    },
    {
        type: "III. Reading Pedagogy",
        questionNumber: "46",
        question: "ପଠନର ସ୍ଵର ପ୍ରକାଶ ଦୃଷ୍ଟିରୁ କେଉଁଟି ଭିନ୍ନ?",
        options: ["(A) ସ୍ୱାଭାବିକ କଥାବାର୍ତ୍ତା", "(B) ଉଚ୍ଚାରଣ ସ୍ପଷ୍ଟତା", "(C) କ୍ଷେଦ ବ୍ୟଞ୍ଜକ ଭାବ", "(D) ସୁସ୍ପଷ୍ଟ ଭାବନା ପ୍ରକାଶ"],
        answer: "(C) କ୍ଷେଦ ବ୍ୟଞ୍ଜକ ଭାବ",
        source: "Exam: OTET 2016-1st Paper II"
    },
    {
        type: "III. Reading Pedagogy",
        questionNumber: "39",
        question: "କେଉଁ ପଠନ ଦ୍ୱାରା ଅଳ୍ପ ସମୟରେ ଅଧିକ ବିଷୟବସ୍ତୁ ପଢ଼ାଯାଏ ?",
        options: ["(A) ଦ୍ରୁତ", "(B) ଶବ୍ଦ ପଠନ", "(C) ନୀରବ ପଠନ", "(D) ଉଚ୍ଚ ପଠନ"],
        answer: "(A) ଦ୍ରୁତ",
        source: "Exam: OTET 2017 Paper II"
    },
    {
        type: "III. Reading Pedagogy",
        questionNumber: "37",
        question: "ଗଭୀରତାର ସହ ପାଠ୍ୟ ବସ୍ତୁ ପଢିବା କେଉଁ ପ୍ରକାର ପଠନ?",
        options: ["(A) ଅନ୍ତର୍ବୃତ୍ତି ପଠନ", "(B) ବହିର୍ଭୁତ ପଠନ", "(C) ଶବ୍ଦ ପଠନ", "(D) ଦ୍ରୁତ ପଠନ"],
        answer: "(A) ଅନ୍ତର୍ବୃତ୍ତି ପଠନ",
        source: "Exam: OTET 2017 Paper II"
    },
    {
        type: "III. Reading Pedagogy",
        questionNumber: "39",
        question: "ଅନ୍ତର୍ବୃତ୍ତି ପଠନର ଚୂଡ଼ାନ୍ତ ଉଦ୍ଦେଶ୍ୟ କ’ଣ?",
        options: ["(A) ଶବ୍ଦଗୁଡ଼ିକ ଉଚ୍ଚାରଣ ଶୁଦ୍ଧରେ ପଢ଼ିବା", "(B) ବିଷୟବସ୍ତୁର ମୂଖ୍ୟ ଅଂଶ ବୁଝିବା", "(C) ବିଷୟବସ୍ତୁକୁ ପୁଙ୍ଖାନୁପୁଙ୍ଖ ଭାବରେ ବୁଝିବା", "(D) କୌଣସି ଭାବରେ ଜଡ଼ିତ ନୁହେଁ"],
        answer: "(C) ବିଷୟବସ୍ତୁକୁ ପୁଙ୍ଖାନୁପୁଙ୍ଖ ଭାବରେ ବୁଝିବା",
        source: "Exam: OTET 2018 Paper II"
    },
    {
        type: "III. Reading Pedagogy",
        questionNumber: "57",
        question: "ନୀରବ ਪଠନର ମୁଖ୍ୟ ଉଦ୍ଦେଶ୍ୟ କ’ଣ?",
        options: ["(A) ବ୍ୟାକରଣ ଜ୍ଞାନ", "(B) ଶବ୍ଦଭଣ୍ଡାର ବୃଦ୍ଧି", "(C) ନିରବତାରେ ପଢ଼ିବା", "(D) ବିଷୟ ବସ୍ତୁ ବୁଝିବା"],
        answer: "(D) ବିଷୟ ବସ୍ତୁ ବୁଝିବା",
        source: "Exam: OTET 2018 Paper II"
    },
    {
        type: "III. Reading Pedagogy",
        questionNumber: "41",
        question: "ପାଠ୍ୟବସ୍ତୁର ବିଷୟରେ ଜ୍ଞାନ ଅର୍ଜନ କରିବା ନିମନ୍ତେ ଶିକ୍ଷାର୍ଥୀମାନେ କେଉଁ ପଠନ ଦ୍ୱାରା ସଫଳତା ଲାଭ କରିଥାନ୍ତି?",
        options: ["(A) ପୁନରାବୃତ୍ତି ପଠନ", "(B) ବିଷୟବସ୍ତୁର ମୂଖ୍ୟ ବିଷୟବସ୍ତୁର ଅଧ୍ୟୟନ", "(C) ଟିପ୍ପଣୀ ପ୍ରସ୍ତୁତି", "(D) ସାଂଗଠନିକ ବାକ୍ୟ ବିଶ୍ଳେଷଣ"],
        answer: "(B) ବିଷୟବସ୍ତୁର ମୂଖ୍ୟ ବିଷୟବସ୍ତୁର ଅଧ୍ୟୟନ",
        source: "Exam: OTET 2018 Paper II"
    },
    {
        type: "III. Reading Pedagogy",
        questionNumber: "46",
        question: "ପ୍ରାଥମିକ ସ୍ତରରେ ସସ୍ୱର ପଠନର ମୁଖ୍ୟ ଉଦ୍ଦେଶ୍ୟ କ’ଣ?",
        options: ["(A) ସଠିକ୍ ଓ ଦ୍ରୁତ ଗତିରେ ପଢ଼ିବା", "(B) ଭାବପୂର୍ଣ୍ଣ ଉଚ୍ଚାରଣ ସହ ପଠନ", "(C) କଳ୍ପନାଶକ୍ତିର ବିକାଶ", "(D) ଉଚ୍ଚାରଣର ଶୁଦ୍ଧତା"],
        answer: "(B) ଭାବପୂର୍ଣ୍ଣ ଉଚ୍ଚାରଣ ସହ ପଠନ",
        source: "Exam: OTET 2018 Paper II"
    },
    {
        type: "III. Reading Pedagogy",
        questionNumber: "41",
        question: "ନୀରବ ପଠନର ମୁଖ୍ୟ ଉଦ୍ଦେଶ୍ୟ କ’ଣ ?",
        options: ["(A) ଶବ୍ଦଗୁଡ଼ିକ ଶୁଦ୍ଧ ଭାବରେ ଉଚ୍ଚାରଣ କରିବା", "(B) ନିରବତାରେ ଅଭ୍ୟାସ କରିବା", "(C) ଭାବ ବୋଧକୁ ଠିକ୍ ଭାବରେ ଗ୍ରହଣ କରିବା", "(D) ଶବ୍ଦଗୁଡ଼ିକୁ ଶୁଦ୍ଧ ଉଚ୍ଚାରଣ ସହ ବ୍ୟାକରଣ ଜ୍ଞାନ ଲାଭ କରିବା"],
        answer: "(C) ଭାବ ବୋଧକୁ ଠିକ୍ ଭାବରେ ଗ୍ରହଣ କରିବା",
        source: "Exam: OTET 2021 Paper II"
    },
    {
        type: "III. Reading Pedagogy",
        questionNumber: "60",
        question: "ସସ୍ୱର ਪଠନର ମୁଖ୍ୟ ଉଦ୍ଦେଶ୍ୟ କ’ଣ ?",
        options: ["(A) ଶିକ୍ଷାର୍ଥୀର ଭାବବୋଧର ବିକାଶ", "(B) ଶିକ୍ଷାର୍ଥୀର ନିରବତାରେ ପଠନ", "(C) ଶିକ୍ଷାର୍ଥୀର ସୁସ୍ପଷ୍ଟ ଧ୍ୱନିରେ ପଠନ", "(D) ଶିକ୍ଷାର୍ଥୀର ଶବ୍ଦଜ୍ଞାନ"],
        answer: "(C) ଶିକ୍ଷାର୍ଥୀର ସୁସ୍ପଷ୍ଟ ଧ୍ୱନିରେ ପଠନ",
        source: "Exam: OTET 2021 Paper II"
    },
    {
        type: "IV. Writing Pedagogy",
        questionNumber: "49",
        question: "'ରଚନା ଲେଖା' ଶିକ୍ଷା ଦ୍ଵାରା କେଉଁ ଉଦ୍ଦେଶ୍ୟ ସାଧିତ ହୁଏ ?",
        options: ["(A) ଶୈକ୍ଷିକ କ୍ଷମତାକୁ ବୃଦ୍ଧି କରିବା", "(B) ଶିକ୍ଷାର୍ଥୀର ଅନୁଭବକୁ ମୂଲ୍ୟାୟନ", "(C) ଶିକ୍ଷାର୍ଥୀର ନିଜ ଭାବନାକୁ ସୃଜନାତ୍ମକ ଭାବେ ଓ ସଂଗଠିତ କରିବା", "(D) ଶ୍ରବଣାତ୍ମକ ଦକ୍ଷତାକୁ ବୃଦ୍ଧି କରିବା"],
        answer: "(C) ଶିକ୍ଷାର୍ଥୀର ନିଜ ଭାବନାକୁ ସୃଜନାତ୍ମକ ଭାବେ ଓ ସଂଗଠିତ କରିବା",
        source: "Exam: OTET 2016-1st Paper II"
    },
    {
        type: "IV. Writing Pedagogy",
        questionNumber: "54",
        question: "ଉଚ୍ଚ ପ୍ରାଥମିକ ସ୍ତରରେ ସାଧାରଣତଃ କେଉଁ ଲିଖନର ମୂଲ୍ୟାୟନ କରାଯାଏ ?",
        options: ["(A) ଭାଷାରେ ଭୁଲ୍ ହେଲେ", "(B) ଅକ୍ଷର ଶୁଦ୍ଧତାରେ କମି ହେଲେ", "(C) ବ୍ୟାକରଣଗତ ଦୋଷ ଥିଲେ", "(D) ଭାବନା ଅଭିବ୍ୟକ୍ତିର ଉତ୍ତମତା ଥିଲେ"],
        answer: "(D) ଭାବନା ଅଭିବ୍ୟକ୍ତିର ଉତ୍ତମତା ଥିଲେ",
        source: "Exam: OTET 2018 Paper II"
    },
    {
        type: "IV. Writing Pedagogy",
        questionNumber: "42",
        question: "ଉତ୍ତମ ଲିଖନର ଗୁଣ କ’ଣ ?",
        options: ["(A) ଭାଷାର ଶୁଦ୍ଧ ବ୍ୟବହାର", "(B) ଶବ୍ଦର ସରଳତା", "(C) ସ୍ପଷ୍ଟତା", "(D) ଉପରୋକ୍ତ ସବୁ"],
        answer: "(D) ଉପରୋକ୍ତ ସବୁ",
        source: "Exam: OTET 2018 Paper II"
    },
    {
        type: "IV. Writing Pedagogy",
        questionNumber: "56",
        question: "ପ୍ରାଥମିକ ଶ୍ରେଣୀରେ ରଚନା ଶିକ୍ଷାଦାନର ମୂଖ୍ୟ ଉଦ୍ଦେଶ୍ୟ କ’ଣ?",
        options: ["(A) ସୁସ୍ପଷ୍ଟ ଲେଖିବାର ଅଭ୍ୟାସ", "(B) ବ୍ୟାକରଣର ଶୁଦ୍ଧ ବ୍ୟବହାର", "(C) ଭାବ ପ୍ରକାଶ କରିବାକୁ ସାହାଯ୍ୟ", "(D) ଶବ୍ଦଭଣ୍ଡାରର ବୃଦ୍ଧି"],
        answer: "(C) ଭାବ ପ୍ରକାଶ କରିବାକୁ ସାହାଯ୍ୟ",
        source: "Exam: OTET 2016-1st Paper II"
    },
    {
        type: "IV. Writing Pedagogy",
        questionNumber: "38",
        question: "କେଉଁଟି ଉତ୍ତମ ଲିଖନ ପାଇଁ ସର୍ବାଧିକ ଆବଶ୍ୟକ ?",
        options: ["(A) ଶବ୍ଦର ଚୟନ", "(B) ବ୍ୟାକରଣ ଜ୍ଞାନ", "(C) ପରିଛନ୍ନତା", "(D) ବାକ୍ୟର ସଠିକ୍ ସଜ୍ଜା"],
        answer: "(D) ବାକ୍ୟର ସଠିକ୍ ସଜ୍ଜା",
        source: "Exam: OTET 2021 Paper II"
    },
    {
        type: "IV. Writing Pedagogy",
        questionNumber: "37",
        question: "ସୃଜନାତ୍ମକ ଲେଖାର ମୁଖ୍ୟ ଉଦ୍ଦେଶ୍ୟ କ’ଣ ?",
        options: ["(A) ନିଜକୁ ପ୍ରକାଶ କରିବାର କ୍ଷମତା", "(B) ଅନ୍ୟର ଲିଖନକୁ ନକଲ", "(C) ଶୁଦ୍ଧ ଲିଖନକୁ ପ୍ରୋତ୍ସାହନ", "(D) ବ୍ୟାକରଣର ଜ୍ଞାନ"],
        answer: "(A) ନିଜକୁ ପ୍ରକାଶ କରିବାର କ୍ଷମତା",
        source: "Exam: OTET 2021 Paper II"
    },
    {
        type: "IV. Writing Pedagogy",
        questionNumber: "49",
        question: "ଲେଖିବାରେ ବନାନ ଶୁଦ୍ଧତା ଆଣିବା ପାଇଁ କେଉଁଟି ଆବଶ୍ୟକ ?",
        options: ["(A) ଶବ୍ଦ ଉଚ୍ଚାରଣରେ ଦକ୍ଷତା", "(B) ଅନୁକରଣ ମୂଳକ ଲେଖନର ଅଭ୍ୟାସ", "(C) ଶବ୍ଦର ଶୁଦ୍ଧ ବନାନକୁ ଦେଖି ଲେଖିବା", "(D) ବ୍ୟାକରଣରେ ଜ୍ଞାନର ଆବଶ୍ୟକତା"],
        answer: "(A) ଶବ୍ଦ ଉଚ୍ଚାରଣରେ ଦକ୍ଷତା",
        source: "Exam: OTET 2021 Paper II"
    },
    {
        type: "V. Grammar and Vocabulary Pedagogy",
        questionNumber: "57",
        question: "ବ୍ୟାକରଣ ଶିକ୍ଷାଦାନର ଉପଯୁକ୍ତ ସମୟ କେଉଁଟି?",
        options: ["(A) ଶବ୍ଦ ଶିକ୍ଷା ପରେ", "(B) ବାକ୍ୟ ଶିକ୍ଷା ପରେ", "(C) ଲେଖିବା ଶିକ୍ଷା ପରେ", "(D) କୌଣସି ସ୍ଥାନ ନାହିଁ"],
        answer: "(B) ବାକ୍ୟ ଶିକ୍ଷା ପରେ",
        source: "Exam: OTET 2016-1st Paper II"
    },
    {
        type: "V. Grammar and Vocabulary Pedagogy",
        questionNumber: "35",
        question: "ଶବ୍ଦର ଅର୍ଥକୁ ପରିଚୟ କରାଇବା ପାଇଁ କେଉଁଟି ଉପଯୁକ୍ତ ପଦ୍ଧତି?",
        options: ["(A) ବ୍ୟାକରଣର ନିୟମ ଦ୍ୱାରା", "(B) ପ୍ରତିଶବ୍ଦ ଦ୍ୱାରା", "(C) ଅର୍ଥ ଅନୁମାନ ଦ୍ୱାରା", "(D) ଶବ୍ଦକୋଷରୁ ଅର୍ଥ ଜାଣିବା ଦ୍ୱାରା"],
        answer: "(C) ଅର୍ଥ ଅନୁମାନ ଦ୍ୱାରା",
        source: "Exam: OTET 2018 Paper II"
    },
    {
        type: "V. Grammar and Vocabulary Pedagogy",
        questionNumber: "52",
        question: "ଶବ୍ଦଭଣ୍ଡାର ବୃଦ୍ଧି ପାଇଁ କେଉଁ ପଦ୍ଧତି ଅନୁସରଣ କରିବା ଉଚିତ?",
        options: ["(A) କଳ୍ପନାତ୍ମକ ଶୈଳୀ", "(B) ପ୍ରତିଶବ୍ଦ ଅଭ୍ୟାସ", "(C) ଭାଷାରେ ଅନୁବାଦ", "(D) ଶ୍ରବଣ ଶକ୍ତିର ବିକାଶ"],
        answer: "(B) ପ୍ରତିଶବ୍ଦ ଅଭ୍ୟାସ",
        source: "Exam: OTET 2018 Paper II"
    },
    {
        type: "V. Grammar and Vocabulary Pedagogy",
        questionNumber: "36",
        question: "ପ୍ରାଥମିକ ସ୍ତରରେ ବନାନ ଶିକ୍ଷାଦାନର ସଠିକ୍ ପଦ୍ଧତି କେଉଁଟି?",
        options: ["(A) ଅନୁକରଣ କରି ଲେଖିବା", "(B) ସ୍ପଷ୍ଟ ଉଚ୍ଚାରଣର ଅଭ୍ୟାସ", "(C) ବନାନର ନିୟମଗୁଡ଼ିକ ଶିକ୍ଷଣ", "(D) କୌଣସିଟି ନୁହେଁ"],
        answer: "(B) ସ୍ପଷ୍ଟ ଉଚ୍ଚାରଣର ଅଭ୍ୟାସ",
        source: "Exam: OTET 2018 Paper II"
    },
    {
        type: "V. Grammar and Vocabulary Pedagogy",
        questionNumber: "33",
        question: "ଶବ୍ଦର ଉତ୍ପତି ଓ ଅବୟବକୁ କେଉଁ ପ୍ରକାରର ଶିକ୍ଷାଦାନରେ ପଢାଯାଏ ?",
        options: ["(A) ନିୟମ ଶିକ୍ଷା", "(B) ଅର୍ଥ ଶିକ୍ଷା", "(C) ବ୍ୟାକରଣ ଶିକ୍ଷା", "(D) ଶବ୍ଦ ଶିକ୍ଷା"],
        answer: "(D) ଶବ୍ଦ ଶିକ୍ଷା",
        source: "Exam: OTET 2017 Paper II"
    },
    {
        type: "V. Grammar and Vocabulary Pedagogy",
        questionNumber: "40",
        question: "ଶବ୍ଦର ଅର୍ଥକୁ କଳ୍ପନା କରି ବାହାର କରିବା କେଉଁ ପଦ୍ଧତି ଅଟେ ?",
        options: ["(A) କେବଳ ନାମ ଓ ବସ୍ତୁ", "(B) ଅନୁମାନ", "(C) ଛାପା ଶବ୍ଦ", "(D) ପର୍ଯ୍ୟାୟବାଚୀ"],
        answer: "(B) ଅନୁମାନ",
        source: "Exam: OTET 2017 Paper II"
    },
    {
        type: "V. Grammar and Vocabulary Pedagogy",
        questionNumber: "33",
        question: "ବ୍ୟାକରଣ ଶିକ୍ଷାଦାନର ମୁଖ୍ୟ ଉଦ୍ଦେଶ୍ୟ କ’ଣ ?",
        options: ["(A) ଭାଷା ଶିକ୍ଷାରେ ଶୁଦ୍ଧ ବ୍ୟବହାରକୁ ପ୍ରୋତ୍ସାହନ", "(B) ନୂଆ ନୂଆ ଶବ୍ଦର ଜ୍ଞାନାର୍ଜନ", "(C) ଶବ୍ଦ ବ୍ୟବହାରର ସ୍ଥାନ ଓ ସମୟ ଜାଣିବା", "(D) ବାକ୍ୟର ଗଠନ ପ୍ରଣାଳୀ"],
        answer: "(A) ଭାଷା ଶିକ୍ଷାରେ ଶୁଦ୍ଧ ବ୍ୟବହାରକୁ ପ୍ରୋତ୍ସାହନ",
        source: "Exam: OTET 2021 Paper II"
    },
    {
        type: "V. Grammar and Vocabulary Pedagogy",
        questionNumber: "39",
        question: "ନିମ୍ନ ମଧ୍ୟରୁ କେଉଁ ਪଦ୍ଧତି ପ୍ରାଥମିକ ଶ୍ରେଣୀରେ ବ୍ୟାକରଣ ଶିକ୍ଷା ଦେବା ପାଇଁ ଉପଯୁକ୍ତ?",
        options: ["(A) ନିୟମ ଶିକ୍ଷଣ ਪଦ୍ଧତି", "(B) ଅନୁକରଣ ଶିକ୍ଷଣ ਪଦ୍ଧତି", "(C) ପ୍ରୟୋଗାତ୍ମକ ਪଦ୍ଧତି", "(D) ସହଜ ਪଦ୍ଧତି"],
        answer: "(C) ପ୍ରୟୋଗାତ୍ମକ ਪଦ୍ଧତି",
        source: "Exam: OTET 2021 Paper II"
    },
    {
        type: "VI. Methods, Aids, Planning, and Assessment",
        questionNumber: "48",
        question: "ଶିକ୍ଷାଦାନ କ୍ଷେତ୍ରରେ କଳାପଟାର କାର୍ଯ୍ୟ କ’ଣ?",
        options: ["(A) ସୁସ୍ପଷ୍ଟ ଲେଖିବାରେ ସାହାଯ୍ୟ", "(B) ଅନୁଶାସନ ରକ୍ଷା କରିବା", "(C) କଳାକୃତିର ସୃଜନଶୀଳତା", "(D) ଆବଶ୍ୟକୀୟ ଉଦାହରଣ ପ୍ରଦାନ"],
        answer: "(D) ଆବଶ୍ୟକୀୟ ଉଦାହରଣ ପ୍ରଦାନ",
        source: "Exam: OTET 2016-1st Paper II"
    },
    {
        type: "VI. Methods, Aids, Planning, and Assessment",
        questionNumber: "51",
        question: "କେଉଁଟି ଶୈକ୍ଷିକ ଉଦ୍ଦେଶ୍ୟର ଏକ ଉପକରଣ ଅଟେ?",
        options: ["(A) ମୂଲ୍ୟାୟନ", "(B) ଆବେଗାତ୍ମକ", "(C) ବିଶ୍ଳେଷଣାତ୍ମକ", "(D) ସୃଜନଶୀଳ"],
        answer: "(A) ମୂଲ୍ୟାୟନ",
        source: "Exam: OTET 2016-1st Paper II"
    },
    {
        type: "VI. Methods, Aids, Planning, and Assessment",
        questionNumber: "59",
        question: "ପଦ୍ୟାବଳୀର ଶିକ୍ଷାଦାନ ପଦ୍ଧତିର ସଠିକ କ୍ରମ କେଉଁଟି?",
        options: ["(A) ଆବୃତ୍ତି - ସମୀକ୍ଷା - ଭାବାର୍ଥ - ବ୍ୟାଖ୍ୟା", "(B) ଆବୃତ୍ତି - ସମୀକ୍ଷା - ବ୍ୟାଖ୍ୟା - ଭାବାର୍ଥ", "(C) ସମୀକ୍ଷା - ଆବୃତ୍ତି - ବ୍ୟାଖ୍ୟା - ଭାବାର୍ଥ", "(D) ବ୍ୟାଖ୍ୟା - ଆବୃତ୍ତି - ସମୀକ୍ଷା - ଭାବାର୍ଥ"],
        answer: "(A) ଆବୃତ୍ତି - ସମୀକ୍ଷା - ଭାବାର୍ଥ - ବ୍ୟାଖ୍ୟା",
        source: "Exam: OTET 2016-1st Paper II"
    },
    {
        type: "VI. Methods, Aids, Planning, and Assessment",
        questionNumber: "55",
        question: "ମୂଲ୍ୟାୟନ ପାଇଁ କେଉଁ ଉପକରଣ ଉପଯୋଗୀ?",
        options: ["(A) ସ୍ୱତନ୍ତ୍ର ପରୀକ୍ଷା", "(B) ମାନକୀକୃତ ପରୀକ୍ଷା", "(C) ଧାରାବାହିକ ମୂଲ୍ୟାୟନ", "(D) ଉପରୋକ୍ତ ସବୁ ପଦ୍ଧତି"],
        answer: "(D) ଉପରୋକ୍ତ ସବୁ ପଦ୍ଧତି",
        source: "Exam: OTET 2016-1st Paper II"
    },
    {
        type: "VI. Methods, Aids, Planning, and Assessment",
        questionNumber: "51",
        question: "କେଉଁଟି ନିରସତା ଦୂର କରିବାରେ ସହାୟକ ହୁଏ?",
        options: ["(A) ପୁସ୍ତକାଳୟର ବ୍ୟବହାର", "(B) ଶ୍ରବଣ ଦକ୍ଷତାର ବୃଦ୍ଧି", "(C) ଶିକ୍ଷଣରେ ନୂଆ ਪଦ୍ଧତି ଓ ଉପକରଣର ବ୍ୟବହାର", "(D) ଅଧିକ ସମୟ ପର୍ଯ୍ୟନ୍ତ ଶିକ୍ଷଣ"],
        answer: "(C) ଶିକ୍ଷଣରେ ନୂଆ ਪଦ୍ଧତି ଓ ଉପକରଣର ବ୍ୟବହାର",
        source: "Exam: OTET 2018 Paper II"
    },
    {
        type: "VI. Methods, Aids, Planning, and Assessment",
        questionNumber: "58",
        question: "ଉତ୍ତମ ଶିକ୍ଷା ଯୋଜନାର ଗୁଣ କ’ଣ?",
        options: ["(A) ସମସ୍ତ ବିଷୟବସ୍ତୁକୁ ସାମିଲ କରିବା", "(B) ଶିକ୍ଷାର୍ଥୀଙ୍କୁ ମୂଲ୍ୟାୟନ କରିବା", "(C) ଶିକ୍ଷାଦାନର ଉଦ୍ଦେଶ୍ୟ ସ୍ପଷ୍ଟ ହେବା", "(D) ଉପରୋକ୍ତ ସମସ୍ତ"],
        answer: "(C) ଶିକ୍ଷାଦାନର ଉଦ୍ଦେଶ୍ୟ ସ୍ପଷ୍ଟ ହେବା",
        source: "Exam: OTET 2018 Paper II"
    },
    {
        type: "VI. Methods, Aids, Planning, and Assessment",
        questionNumber: "40",
        question: "ଗଦ୍ୟ ਪਾଠ୍ୟବସ୍ତୁ ଶିକ୍ଷାଦାନର ପ୍ରସ୍ତୁତି କ୍ରମରେ କେଉଁଟି ପ୍ରଥମେ କରାଯିବା ଉଚିତ?",
        options: ["(A) ସସ୍ୱର ପଠନ", "(B) ଆଲୋଚନା", "(C) ପ୍ରଶ୍ନ ପଚାରିବା", "(D) ପ୍ରାକ ପ୍ରସ୍ତୁତି"],
        answer: "(D) ପ୍ରାକ ପ୍ରସ୍ତୁତି",
        source: "Exam: OTET 2018 Paper II"
    },
    {
        type: "VI. Methods, Aids, Planning, and Assessment",
        questionNumber: "45",
        question: "କେଉଁଟି ଗଦ୍ୟ ଶିକ୍ଷାଦାନର ମୁଖ୍ୟ ପଦକ୍ଷେପ ଅଟେ?",
        options: ["(A) 'ପୂର୍ବକଥନ' ସହ ଜଡ଼ିତ ସମ୍ବନ୍ଧକୁ ସ୍ପଷ୍ଟ କରିବା", "(B) 'ପାଠ' ଫଢିବା ସହ ପଢ଼ିଥିବା ବିଷୟକୁ ଚିତ୍ର ଦେଖାଇବା", "(C) କେଉଁ ବିଷୟବସ୍ତୁ ଜଡ଼ିତ ସମସ୍ୟା ହେଲେ ତାହା ପୁଙ୍ଖାନୁପୁଙ୍ଖ ବୁଝିବା", "(D) ବ୍ୟାକରଣର ନିୟମଗୁଡ଼ିକ ଶିକ୍ଷଣ"],
        answer: "(A) 'ପୂର୍ବକଥନ' ସହ ଜଡ଼ିତ ସମ୍ବନ୍ଧକୁ ସ୍ପଷ୍ଟ କରିବା",
        source: "Exam: OTET 2018 Paper II"
    },
    {
        type: "VI. Methods, Aids, Planning, and Assessment",
        questionNumber: "55",
        question: "ବ୍ୟାକରଣ ଶିକ୍ଷାଦାନର ଉପଯୁକ୍ତ ਪଦ୍ଧତି କେଉଁଟି?",
        options: ["(A) ସମସ୍ୟା ସମାଧାନ ਪଦ୍ଧତି", "(B) ବ୍ୟାଖ୍ୟାନ ਪଦ୍ଧତି", "(C) ଆରୋହୀ ਪଦ୍ଧତି", "(D) ଅନୁବାଦ ਪଦ୍ଧତି"],
        answer: "(C) ଆରୋହୀ ਪଦ୍ଧତି",
        source: "Exam: OTET 2021 Paper II"
    },
    {
        type: "VI. Methods, Aids, Planning, and Assessment",
        questionNumber: "34",
        question: "ବ୍ୟାକରଣକୁ କେଉଁ ନିୟମକୁ ଅନୁସରଣ କରି ଶିକ୍ଷା ଦିଆଯାଏ?",
        options: ["(A) ନିୟମରୁ ଉଦାହରଣ", "(B) ଉଦାହରଣରୁ ନିୟମ", "(C) ସରଳରୁ କଠିନ", "(D) ଜଣାଶୁଣା ଜିନିଷରୁ ଅଜଣା ଜିନିଷ"],
        answer: "(B) ଉଦାହରଣରୁ ନିୟମ",
        source: "Exam: OTET 2021 Paper II"
    },
    {
        type: "VI. Methods, Aids, Planning, and Assessment",
        questionNumber: "45",
        question: "ନିଦାନକାରୀ ପରୀକ୍ଷଣର ମୁଖ୍ୟ ଉଦ୍ଦେଶ୍ୟ କ’ଣ?",
        options: ["(A) ପିଲା କେଉଁ ଶିକ୍ଷାରେ ଭଲ କରୁଛି ତାହା ଜାଣିବା", "(B) ପିଲା କେଉଁ ଶିକ୍ଷାରେ ଦୁର୍ବଳ ଅଛି ତାହା ଜାଣିବା", "(C) ପିଲା ଶିକ୍ଷା କ୍ଷେତ୍ରରେ କ’ଣ କରିବାକୁ ଚାହୁଁଛି ତାହା ଜାଣିବା", "(D) ପିଲା ସମାଜରେ ଭଲ ମଣିଷ ହେବାରେ ସାହାଯ୍ୟ କରିବା"],
        answer: "(B) ପିଲା କେଉଁ ଶିକ୍ଷାରେ ଦୁର୍ବଳ ଅଛି ତାହା ଜାଣିବା",
        source: "Exam: OTET 2021 Paper II"
    },
    {
        type: "VI. Methods, Aids, Planning, and Assessment",
        questionNumber: "44",
        question: "କେଉଁ ଶିକ୍ଷଣ ଉପକରଣକୁ 'ଭି.ଏମ୍. କ୍ୱାଇ' ପ୍ରାଧାନ୍ୟ ଦେଇଛନ୍ତି?",
        options: ["(A) ଶ୍ରବଣ ଉପକରଣ", "(B) ଦୃଶ୍ୟ ଉପକରଣ", "(C) ଶ୍ରବଣ ଓ ଦୃଶ୍ୟ ଉପକରଣ", "(D) ପ୍ରୟୋଗିକ କ୍ଷମତାକୁ ବୃଦ୍ଧି କରିବା"],
        answer: "(C) ଶ୍ରବଣ ଓ ଦୃଶ୍ୟ ଉପକରଣ",
        source: "Exam: OTET 2021 Paper II"
    },
    {
        type: "VI. Methods, Aids, Planning, and Assessment",
        questionNumber: "58",
        question: "କେଉଁଟି ਪାଠ ଯୋଜନାର ଅଂଶ ନୁହେଁ ?",
        options: ["(A) ଆରମ୍ଭ କାର୍ଯ୍ୟ", "(B) ଉଦ୍ଦେଶ୍ୟ", "(C) ବିଷୟବସ୍ତୁର ମାଧ୍ୟମ", "(D) ପ୍ରଶ୍ନର ପ୍ରକାର"],
        answer: "(D) ପ୍ରଶ୍ନର ପ୍ରକାର",
        source: "Exam: OTET 2021 Paper II"
    },
    {
        type: "VI. Methods, Aids, Planning, and Assessment",
        questionNumber: "51",
        question: "କେଉଁଟି ଉତ୍ତମ ପରୀକ୍ଷଣର ଗୁଣ ନୁହେଁ ?",
        options: ["(A) ବୈଧତା", "(B) ବିଶ୍ୱସନୀୟତା", "(C) ସୁଗମତା", "(D) ନିରୀକ୍ଷଣ"],
        answer: "(D) ନିରୀକ୍ଷଣ",
        source: "Exam: OTET 2021 Paper II"
    },
    {
        type: "VI. Methods, Aids, Planning, and Assessment",
        questionNumber: "48",
        question: "କେଉଁଟି ଲିଖନର ମୂଲ୍ୟାୟନ ପଦ୍ଧତି ଅଟେ ?",
        options: ["(A) ପ୍ରଶ୍ନ ପଚାରିବା", "(B) କୋରିଓଗ୍ରାଫି", "(C) ଅନୁକରଣ", "(D) ଶ୍ରୁତିଲିଖନ"],
        answer: "(D) ଶ୍ରୁତିଲିଖନ",
        source: "Exam: OTET 2021 Paper II"
    },
    {
        type: "VI. Methods, Aids, Planning, and Assessment",
        questionNumber: "57",
        question: "ବ୍ୟାକରଣ ଶିକ୍ଷାଦାନର ଉଦ୍ଦେଶ୍ୟ କ’ଣ?",
        options: ["(A) ନିୟମରୁ ଉଦାହରଣ", "(B) ଉଦାହରଣରୁ ନିୟମ", "(C) ନିୟମ ଦ୍ଵାରା", "(D) ଶବ୍ଦର ବ୍ୟବହାର"],
        answer: "(B) ଉଦାହରଣରୁ ନିୟମ",
        source: "Exam: OTET 2017 Paper II"
    },
    {
        type: "VI. Methods, Aids, Planning, and Assessment",
        questionNumber: "31",
        question: "ଗଳ୍ପ କହିବା ਪଦ୍ଧତିର ଉଦ୍ଦେଶ୍ୟ କ’ଣ ?",
        options: ["(A) କଳ୍ପନାଶକ୍ତିର ବିକାଶ", "(B) ଶବ୍ଦଭଣ୍ଡାରର ବୃଦ୍ଧି", "(C) ଶ୍ରବଣ କ୍ଷମତାର ବୃଦ୍ଧି", "(D) ରସାସ୍ୱାଦନର ବୃଦ୍ଧି"],
        answer: "(A) କଳ୍ପନାଶକ୍ତିର ବିକାଶ",
        source: "Exam: OTET 2017 Paper II"
    },
    {
        type: "VI. Methods, Aids, Planning, and Assessment",
        questionNumber: "51",
        question: "କଥନରେ କେଉଁଟି ବାଧକ ନୁହେଁ?",
        options: ["(A) ଭାଷଣରେ ଭାବର ଅଭାବ", "(B) ଭାଷଣରେ ଶବ୍ଦର ବ୍ୟବହାରର ଅଭାବ", "(C) ଭାଷଣରେ ଅସ୍ପଷ୍ଟ ଧ୍ୱନି", "(D) ଭାଷଣ ଶବ୍ଦର ସମୟ ଅବଧି"],
        answer: "(D) ଭାଷଣ ଶବ୍ਦର ସମୟ ଅବଧି",
        source: "Exam: OTET 2017 Paper II"
    },
    {
        type: "VI. Methods, Aids, Planning, and Assessment",
        questionNumber: "55",
        question: "କେଉଁ ପ୍ରକାରର ପରୀକ୍ଷଣ ଦ୍ୱାରା ଭାଷା ଶିକ୍ଷଣ ପରିମାପନ କରାଯାଏ?",
        options: ["(A) ମୌଖିକ ପରୀକ୍ଷଣ", "(B) ଲିଖିତ ପରୀକ୍ଷଣ", "(C) ବ୍ୟବହାରିକ ପରୀକ୍ଷଣ", "(D) କୌଣସିଟି ନୁହେଁ"],
        answer: "(B) ଲିଖିତ ପରୀକ୍ଷଣ",
        source: "Exam: OTET 2017 Paper II"
    },
    {
        type: "VI. Methods, Aids, Planning, and Assessment",
        questionNumber: "60",
        question: "‘ନାଟକ ଶିକ୍ଷା’ର ଉଦ୍ଦେଶ୍ୟ କ’ଣ?",
        options: ["(A) ଶ୍ରବଣ ଦକ୍ଷତା", "(B) କଥନ ଦକ୍ଷତା", "(C) ଅଭିନୟ", "(D) ଶ୍ରବଣ ଓ କଥନ ଦକ୍ଷତା"],
        answer: "(D) ଶ୍ରବଣ ଓ କଥନ ଦକ୍ଷତା",
        source: "Exam: OTET 2017 Paper II"
    },
    {
        type: "VI. Methods, Aids, Planning, and Assessment",
        questionNumber: "60",
        question: "କେଉଁଟି ଶ୍ରୁତିଲିଖନର ଉଦ୍ଦେଶ୍ୟ ନୁହେଁ?",
        options: ["(A) ଶୁଦ୍ଧ ବନାନର ଅଭ୍ୟାସ", "(B) ଶ୍ରବଣ ଦକ୍ଷତାର ବୃଦ୍ଧି", "(C) ଦ୍ରୁତ ଲେଖିବାର ଅଭ୍ୟାସ", "(D) ଉଚ୍ଚାରଣର ଶୁଦ୍ଧତା"],
        answer: "(D) ଉଚ୍ଚାରଣର ଶୁଦ୍ଧତା",
        source: "Exam: OTET 2018 Paper II"
    }
];

export default function OdiaPedagogyPage() {
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
                        <CardDescription>You have completed the Odia Pedagogy quiz in {formatTime(time)}.</CardDescription>
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
