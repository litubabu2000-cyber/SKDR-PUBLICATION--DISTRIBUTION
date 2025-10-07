
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Target } from 'lucide-react';
import Link from 'next/link';

const mcqSubjects = [
    { name: 'Aptitude', href: '#' },
    { name: 'Reasoning', href: '/mcq-practice/reasoning' },
    { name: 'Non Verbal Reasoning', href: '#' },
    { name: 'English', href: '#' },
    { name: 'DI (Data Interpretation)', href: '#' },
    { name: 'GK (General Knowledge)', href: '#' },
    { name: 'Polity', href: '#' },
    { name: 'History GK', href: '#' },
    { name: 'Geography GK', href: '#' },
    { name: 'Physics GK', href: '#' },
    { name: 'Chemistry GK', href: '#' },
    { name: 'Biology GK', href: '#' },
    { name: 'Odisha GK', href: '#' },
    { name: 'OTET MCQ', href: '#' },
    { name: 'CTET MCQ', href: '#' },
    { name: 'OSSTET MCQ', href: '#' },
    { name: 'TGT Physics', href: '#' },
    { name: 'TGT Chemistry', href: '#' },
    { name: 'TGT Biology', href: '#' },
    { name: 'TGT Mathematics', href: '#' },
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
                            className="group flex flex-col justify-between rounded-lg border bg-background p-4 text-center transition-all duration-300 hover:bg-primary/10 hover:shadow-md hover:-translate-y-1"
                           >
                                <span className="font-semibold text-foreground group-hover:text-primary">{subject.name}</span>
                                 <span className="text-xs mt-2 bg-primary/20 text-primary px-2 py-1 rounded-full">MCQ</span>
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
