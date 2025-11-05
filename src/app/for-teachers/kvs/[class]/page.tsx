
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


const isStreamArray = (data: any[]): data is Stream[] => {
    return data.length > 0 && typeof data[0] === 'object' && 'subjects' in data[0];
};

const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');


export default function KVSClassPage({ params }: { params: { class: string } }) {
    const className = params.class;
    const subjects = kvsSubjects[className];

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
                                        <Link key={subject} href={`/for-teachers/kvs/${className}/${slugify(subject)}`} className="block p-3 border rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
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
                               <Link key={subject} href={`/for-teachers/kvs/${className}/${slugify(subject)}`} className="block p-4 border rounded-md text-center hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
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
                <h1 className="text-3xl md:text-4xl font-bold font-headline">KVS {formattedClassName} Subjects</h1>
                <p className="text-muted-foreground md:text-xl">Complete study materials for Kendriya Vidyalaya Sangathan Board</p>
            </div>
            {renderSubjects()}
        </div>
    );
}
