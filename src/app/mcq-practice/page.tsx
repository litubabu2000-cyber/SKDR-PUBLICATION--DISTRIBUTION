
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Target } from 'lucide-react';
import Link from 'next/link';

const mcqSubjects = [
    { name: 'Aptitude', href: '#', color: 'bg-red-500 hover:bg-red-600' },
    { name: 'Reasoning', href: '/mcq-practice/reasoning', color: 'bg-blue-500 hover:bg-blue-600' },
    { name: 'Non Verbal Reasoning', href: '#', color: 'bg-pink-500 hover:bg-pink-600' },
    { name: 'English', href: '#', color: 'bg-purple-500 hover:bg-purple-600' },
    { name: 'DI (Data Interpretation)', href: '#', color: 'bg-green-500 hover:bg-green-600' },
    { name: 'GK (General Knowledge)', href: '#', color: 'bg-orange-500 hover:bg-orange-600' },
    { name: 'Polity', href: '#', color: 'bg-purple-600 hover:bg-purple-700' },
    { name: 'History GK', href: '#', color: 'bg-blue-600 hover:bg-blue-700' },
    { name: 'Geography GK', href: '#', color: 'bg-teal-500 hover:bg-teal-600' },
    { name: 'Physics GK', href: '#', color: 'bg-red-600 hover:bg-red-700' },
    { name: 'Chemistry GK', href: '#', color: 'bg-pink-600 hover:bg-pink-700' },
    { name: 'Biology GK', href: '#', color: 'bg-green-600 hover:bg-green-700' },
    { name: 'Odisha GK', href: '#', color: 'bg-yellow-600 hover:bg-yellow-700' },
    { name: 'OTET MCQ', href: '#', color: 'bg-indigo-500 hover:bg-indigo-600' },
    { name: 'CTET MCQ', href: '#', color: 'bg-purple-700 hover:bg-purple-800' },
    { name: 'OSSTET MCQ', href: '#', color: 'bg-teal-600 hover:bg-teal-700' },
    { name: 'TGT Physics', href: '#', color: 'bg-teal-700 hover:bg-teal-800' },
    { name: 'TGT Chemistry', href: '#', color: 'bg-orange-600 hover:bg-orange-700' },
    { name: 'TGT Biology', href: '#', color: 'bg-green-700 hover:bg-green-800' },
    { name: 'TGT Mathematics', href: '#', color: 'bg-red-700 hover:bg-red-800' },
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
                                <span className="font-semibold">{subject.name}</span>
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
