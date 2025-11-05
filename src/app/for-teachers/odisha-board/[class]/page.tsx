
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, FlaskConical, BarChart } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

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


const isStreamArray = (data: any[]): data is Stream[] => {
    return data.length > 0 && typeof data[0] === 'object' && 'subjects' in data[0];
};

const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export default function OdishaBoardClassPage({ params }: { params: { class: string } }) {
    const className = params.class;
    const subjects = odishaBoardSubjects[className];

    if (!subjects) {
        notFound();
    }
    
    const formattedClassName = className.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());

    const renderSubjects = () => {
        if (isStreamArray(subjects)) {
            return (
                <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
                    {(subjects as Stream[]).map((stream) => (
                        <Card key={stream.title} className="bg-card">
                            <CardHeader className="flex flex-row items-center gap-4">
                                <stream.icon className="size-8 text-primary"/>
                                <CardTitle className="text-2xl font-headline">{stream.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 gap-3">
                                    {stream.subjects.map((subject) => (
                                        <Link key={subject} href={`/for-teachers/odisha-board/${className}/${slugify(subject)}`} className="block p-3 border rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                                            {subject}
                                        </Link>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            );
        }

        return (
            <div className="max-w-4xl mx-auto">
                <Card className="bg-card">
                    <CardHeader>
                        <CardTitle className="text-2xl font-headline">Subjects</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {(subjects as Subject[]).map((subject) => (
                                <Link key={subject} href={`/for-teachers/odisha-board/${className}/${slugify(subject)}`} className="block p-4 border rounded-md text-center hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                                    {subject}
                                </Link>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    };

    return (
        <div className="container mx-auto py-12 px-4 md:px-6">
            <div className="space-y-4 text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold font-headline">Odisha Board {formattedClassName} Subjects</h1>
                <p className="text-muted-foreground md:text-xl">Complete study materials for Odisha Board</p>
            </div>
            {renderSubjects()}
        </div>
    );
}
