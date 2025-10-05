
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Target } from 'lucide-react';
import Link from 'next/link';

const mcqSubjects = [
    { name: 'Aptitude', color: 'bg-red-500 hover:bg-red-600', href: '#' },
    { name: 'Reasoning', color: 'bg-blue-500 hover:bg-blue-600', href: '/mcq-practice/reasoning' },
    { name: 'Non Verbal Reasoning', color: 'bg-pink-500 hover:bg-pink-600', href: '#' },
    { name: 'English', color: 'bg-purple-500 hover:bg-purple-600', href: '#' },
    { name: 'DI (Data Interpretation)', color: 'bg-green-500 hover:bg-green-600', href: '#' },
    { name: 'GK (General Knowledge)', color: 'bg-orange-500 hover:bg-orange-600', href: '#' },
    { name: 'Polity', color: 'bg-purple-600 hover:bg-purple-700', href: '#' },
    { name: 'History GK', color: 'bg-blue-600 hover:bg-blue-700', href: '#' },
    { name: 'Geography GK', color: 'bg-teal-500 hover:bg-teal-600', href: '#' },
    { name: 'Physics GK', color: 'bg-red-600 hover:bg-red-700', href: '#' },
    { name: 'Chemistry GK', color: 'bg-pink-600 hover:bg-pink-700', href: '#' },
    { name: 'Biology GK', color: 'bg-green-600 hover:bg-green-700', href: '#' },
    { name: 'Odisha GK', color: 'bg-yellow-600 hover:bg-yellow-700', href: '#' },
    { name: 'OTET MCQ', color: 'bg-indigo-500 hover:bg-indigo-600', href: '#' },
    { name: 'CTET MCQ', color: 'bg-purple-700 hover:bg-purple-800', href: '#' },
    { name: 'OSSTET MCQ', color: 'bg-teal-600 hover:bg-teal-700', href: '#' },
    { name: 'TGT Physics', color: 'bg-teal-700 hover:bg-teal-800', href: '#' },
    { name: 'TGT Chemistry', color: 'bg-orange-600 hover:bg-orange-700', href: '#' },
    { name: 'TGT Biology', color: 'bg-green-700 hover:bg-green-800', href: '#' },
    { name: 'TGT Mathematics', color: 'bg-red-700 hover:bg-red-800', href: '#' },
];

export default function McqPracticePage() {
  return (
    <section id="mcq-practice" className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
            <Card className="transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-2 bg-teal-600 text-white">
                <CardHeader>
                <CardTitle className="flex items-center gap-2"><Target/> Subject-wise MCQ Practice</CardTitle>

                <CardDescription className="text-teal-100">Topic-specific practice tests</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {mcqSubjects.map((subject, index) => (
                           <Link key={index} href={subject.href} passHref>
                             <Button asChild className={`${subject.color} text-white justify-between w-full transition-transform duration-300 transform hover:scale-105`}>
                               <a>
                                 {subject.name}
                                 <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded-full">MCQ</span>
                                </a>
                             </Button>
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
