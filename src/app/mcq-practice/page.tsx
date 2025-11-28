
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
    Target,
    Brain,
    BrainCircuit,
    Shapes,
    BookOpen,
    BarChart,
    Globe,
    Landmark,
    Scroll,
    Map,
    Atom,
    FlaskConical,
    Dna,
    MapPin,
    School,
    GraduationCap,
    Calculator,
    LucideIcon
} from 'lucide-react';
import Link from 'next/link';

const mcqSubjects: { name: string, href: string, color: string, icon: LucideIcon }[] = [
    { name: 'Aptitude', href: '/mcq-practice/aptitude', color: 'bg-red-500 hover:bg-red-600', icon: Brain },
    { name: 'Reasoning', href: '/mcq-practice/reasoning', color: 'bg-blue-500 hover:bg-blue-600', icon: BrainCircuit },
    { name: 'Non Verbal Reasoning', href: '#', color: 'bg-pink-500 hover:bg-pink-600', icon: Shapes },
    { name: 'English', href: '#', color: 'bg-purple-500 hover:bg-purple-600', icon: BookOpen },
    { name: 'DI (Data Interpretation)', href: '#', color: 'bg-green-500 hover:bg-green-600', icon: BarChart },
    { name: 'GK (General Knowledge)', href: '#', color: 'bg-orange-500 hover:bg-orange-600', icon: Globe },
    { name: 'Polity', href: '#', color: 'bg-purple-600 hover:bg-purple-700', icon: Landmark },
    { name: 'History GK', href: '#', color: 'bg-blue-600 hover:bg-blue-700', icon: Scroll },
    { name: 'Geography GK', href: '#', color: 'bg-teal-500 hover:bg-teal-600', icon: Map },
    { name: 'Physics GK', href: '#', color: 'bg-red-600 hover:bg-red-700', icon: Atom },
    { name: 'Chemistry GK', href: '#', color: 'bg-pink-600 hover:bg-pink-700', icon: FlaskConical },
    { name: 'Biology GK', href: '#', color: 'bg-green-600 hover:bg-green-700', icon: Dna },
    { name: 'Odisha GK', href: '#', color: 'bg-yellow-600 hover:bg-yellow-700', icon: MapPin },
    { name: 'OTET MCQ', href: '/mcq-practice/otet', color: 'bg-indigo-500 hover:bg-indigo-600', icon: School },
    { name: 'CTET MCQ', href: '#', color: 'bg-purple-700 hover:bg-purple-800', icon: School },
    { name: 'OSSTET MCQ', href: '#', color: 'bg-teal-600 hover:bg-teal-700', icon: GraduationCap },
    { name: 'TGT Physics', href: '#', color: 'bg-teal-700 hover:bg-teal-800', icon: Atom },
    { name: 'TGT Chemistry', href: '#', color: 'bg-orange-600 hover:bg-orange-700', icon: FlaskConical },
    { name: 'TGT Biology', href: '#', color: 'bg-green-700 hover:bg-green-800', icon: Dna },
    { name: 'TGT Mathematics', href: '#', color: 'bg-red-700 hover:bg-red-800', icon: Calculator },
];

export default function McqPracticePage() {
  return (
    <section id="mcq-practice" className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
            <Card className="transition-all duration-300 ease-in-out hover:shadow-lg bg-card">
                <CardHeader>
                <CardTitle className="flex items-center gap-2"><Target className="text-primary"/> Subject-wise MCQ Practice</CardTitle>

                <CardDescription>Topic-specific practice tests</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {mcqSubjects.map((subject, index) => (
                           <Link
                            key={index}
                            href={subject.href}
                            className={`group flex flex-col justify-between rounded-lg p-4 text-center text-primary-foreground transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${subject.color}`}
                           >
                                <div className="flex flex-col items-center gap-2">
                                  <subject.icon className="size-8" />
                                  <span className="font-semibold">{subject.name}</span>
                                </div>
                                <span className="text-xs mt-2 bg-primary-foreground/20 text-primary-foreground px-2 py-1 rounded-full">MCQ</span>
                           </Link>
                        ))}
                </div>
                <Button variant="secondary" className="w-full mt-6">Start MCQ Practice</Button>
                </CardContent>
            </Card>
        </div>
    </section>
  );
}
