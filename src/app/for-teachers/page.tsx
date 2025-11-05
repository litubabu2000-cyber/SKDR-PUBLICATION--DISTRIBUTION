
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Building, Train, PenTool, School, Users, LucideIcon, BookOpen, FlaskConical, BarChart } from "lucide-react";
import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type Subject = string;
type Stream = {
  title: string;
  icon: React.ElementType;
  subjects: Subject[];
};

const odishaBoardSubjects: Record<string, Subject[] | Stream[]> = {
    'class-1': ["Odia", "English", "Mathematics", "Environmental Studies (EVS)", "Moral Science / Value Education", "Art & Craft", "Health & Physical Education"],
    'class-2': ["Odia", "English", "Mathematics", "EVS", "Moral Science", "Art & Craft", "Physical Education"],
    'class-3': ["Odia", "English", "Mathematics", "EVS", "Moral Science", "GK", "Art & Craft", "Health Education"],
    'class-4': ["Odia", "English", "Mathematics", "EVS", "Moral Science", "GK", "Computer", "Art & Physical Education"],
    'class-5': ["Odia", "English", "Mathematics", "EVS", "Moral Science", "Computer", "Art / Health & Physical Education"],
    'class-6': ["Odia", "English", "Mathematics", "General Science", "Social Studies", "Hindi / Sanskrit", "Computer Science", "Health & Physical Education", "Value Education"],
    'class-7': ["Odia", "English", "Mathematics", "Science", "Social Studies", "Hindi / Sanskrit", "Computer", "Health & Physical Education", "Art Education"],
    'class-8': ["Odia", "English", "Mathematics", "Science", "Social Studies", "Hindi / Sanskrit", "Computer Science", "Art & Physical Education"],
    'class-9': ["Odia", "English", "Mathematics", "Science (Physics, Chemistry, Biology)", "Social Science (History, Geography, Civics, Economics)", "Hindi / Sanskrit", "Computer / IT", "Health & Physical Education"],
    'class-10': ["Odia", "English", "Mathematics", "Science", "Social Science", "Hindi / Sanskrit", "IT / Computer", "Health & Physical Education"],
    'class-11': [
        { title: "Arts Stream", icon: BookOpen, subjects: ["English", "Odia / MIL", "Political Science", "History", "Education / Sociology / Economics", "Logic / Psychology / Geography"] },
        { title: "Science Stream", icon: FlaskConical, subjects: ["English", "Physics", "Chemistry", "Mathematics", "Biology / Computer Science / Electronics"] },
        { title: "Commerce Stream", icon: BarChart, subjects: ["English", "Business Studies", "Accountancy", "Economics", "Business Mathematics / IT"] }
    ],
    'class-12': [
        { title: "Arts Stream", icon: BookOpen, subjects: ["English", "Odia / MIL", "Political Science", "History", "Education / Sociology / Logic / Geography"] },
        { title: "Science Stream", icon: FlaskConical, subjects: ["English", "Physics", "Chemistry", "Mathematics", "Biology / Computer Science / Electronics"] },
        { title: "Commerce Stream", icon: BarChart, subjects: ["English", "Business Studies", "Accountancy", "Economics", "Business Mathematics / IT"] }
    ]
};

const kvsSubjects: Record<string, Subject[] | Stream[]> = {
    'class-1': ["English", "Hindi", "Mathematics", "EVS", "Art & Craft", "Music / Physical Education"],
    'class-2': ["English", "Hindi", "Mathematics", "EVS", "Art & Craft", "Physical Education"],
    'class-3': ["English", "Hindi", "Mathematics", "EVS", "Computer (optional)", "GK", "Art / Physical Education"],
    'class-4': ["English", "Hindi", "Mathematics", "EVS", "Computer", "GK", "Art / Physical Education"],
    'class-5': ["English", "Hindi", "Mathematics", "EVS", "Computer", "Art / Physical Education"],
    'class-6': ["English", "Hindi", "Mathematics", "Science", "Social Science", "Sanskrit / Third Language", "Computer", "Art / Work Education", "Physical Education"],
    'class-7': ["English", "Hindi", "Mathematics", "Science", "Social Science", "Sanskrit / Third Language", "Computer", "Work & Art Education", "Physical Education"],
    'class-8': ["English", "Hindi", "Mathematics", "Science", "Social Science", "Sanskrit / Third Language", "Computer", "Work & Art Education", "Physical Education"],
    'class-9': ["English (Language & Literature)", "Hindi / Sanskrit", "Mathematics", "Science (Physics, Chemistry, Biology)", "Social Science (History, Civics, Geography, Economics)", "IT / Computer", "Health & Physical Education", "Art Integration"],
    'class-10': ["English (Language & Literature)", "Hindi / Sanskrit / Third Language", "Mathematics", "Science", "Social Science", "IT / Computer Applications", "Health & Physical Education"],
    'class-11': [
        { title: "Science Stream", icon: FlaskConical, subjects: ["English Core", "Physics", "Chemistry", "Mathematics / Biology", "Computer Science / Physical Education / Psychology"] },
        { title: "Commerce Stream", icon: BarChart, subjects: ["English Core", "Accountancy", "Business Studies", "Economics", "Mathematics / Informatics Practices"] },
        { title: "Arts / Humanities Stream", icon: BookOpen, subjects: ["English Core", "History", "Political Science", "Geography / Sociology / Psychology / Economics", "Physical Education / Fine Arts / Computer"] }
    ],
    'class-12': [
        { title: "Science Stream", icon: FlaskConical, subjects: ["English Core", "Physics", "Chemistry", "Mathematics / Biology", "Computer Science / Physical Education"] },
        { title: "Commerce Stream", icon: BarChart, subjects: ["English Core", "Accountancy", "Business Studies", "Economics", "Mathematics / Informatics Practices"] },
        { title: "Arts / Humanities Stream", icon: BookOpen, subjects: ["English Core", "History", "Political Science", "Geography / Sociology / Psychology / Education", "Physical Education / Fine Arts / Computer"] }
    ]
};

const competitiveExams = [
  { name: "SSC", href: "/categories/ssc-books" },
  { name: "Railway", href: "/categories/railway-books" },
  { name: "OSSC", href: "/categories/ossc-books" },
  { name: "TGT", href: "/categories/tgt-books" },
  { name: "PGT", href: "/categories/pgt-books" },
];

const isStreamArray = (data: any[]): data is Stream[] => {
    return data.length > 0 && typeof data[0] === 'object' && 'subjects' in data[0];
};

const renderSubjects = (subjectsOrStreams: Subject[] | Stream[]) => {
    if (isStreamArray(subjectsOrStreams)) {
        return (
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
                {(subjectsOrStreams as Stream[]).map((stream) => (
                    <Card key={stream.title} className="bg-background">
                        <CardHeader className="flex flex-row items-center gap-4 py-4">
                            <stream.icon className="size-6 text-primary"/>
                            <CardTitle className="text-lg font-headline">{stream.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                                {stream.subjects.map((subject) => (
                                    <li key={subject}>{subject}</li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }
    return (
        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground columns-2">
            {(subjectsOrStreams as Subject[]).map((subject) => (
                <li key={subject}>{subject}</li>
            ))}
        </ul>
    );
};

export default function ForTeachersPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">For Teachers</h1>
        <p className="text-muted-foreground md:text-xl">
          Browse resources, guides, and materials tailored for educators.
        </p>
      </div>

      <div className="space-y-12">
        {/* Odisha Board */}
        <Card className="bg-card shadow-lg">
            <CardHeader className="flex flex-row items-center gap-4">
                <Book className="size-8 text-primary" />
                <CardTitle className="text-2xl font-headline">Odisha Board</CardTitle>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    {Object.entries(odishaBoardSubjects).map(([className, subjects]) => (
                        <AccordionItem key={className} value={className}>
                            <AccordionTrigger className="font-semibold text-lg">
                                {className.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </AccordionTrigger>
                            <AccordionContent className="p-4 bg-background/50 rounded-md">
                                {renderSubjects(subjects)}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
        </Card>

        {/* KVS Board */}
        <Card className="bg-card shadow-lg">
            <CardHeader className="flex flex-row items-center gap-4">
                <School className="size-8 text-primary" />
                <CardTitle className="text-2xl font-headline">KVS (Kendriya Vidyalaya Sangathan)</CardTitle>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    {Object.entries(kvsSubjects).map(([className, subjects]) => (
                        <AccordionItem key={className} value={className}>
                            <AccordionTrigger className="font-semibold text-lg">
                                {className.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </AccordionTrigger>
                            <AccordionContent className="p-4 bg-background/50 rounded-md">
                                {renderSubjects(subjects)}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
        </Card>

        {/* Competitive Exams */}
        <Card className="bg-card shadow-lg">
            <CardHeader className="flex flex-row items-center gap-4">
                <Users className="size-8 text-primary" />
                <CardTitle className="text-2xl font-headline">Competitive Exams</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {competitiveExams.map((item) => (
                        <Link key={item.href} href={item.href} className="group">
                            <div className="p-4 bg-background border rounded-lg text-center font-medium text-muted-foreground transition-all duration-300 ease-in-out hover:bg-primary hover:text-primary-foreground hover:shadow-md h-full flex items-center justify-center">
                                {item.name}
                            </div>
                        </Link>
                    ))}
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
