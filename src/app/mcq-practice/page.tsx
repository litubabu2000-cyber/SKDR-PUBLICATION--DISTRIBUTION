
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Target } from 'lucide-react';

const mcqSubjects = [
    { name: 'Aptitude', color: 'bg-red-500 hover:bg-red-600' },
    { name: 'Reasoning', color: 'bg-blue-500 hover:bg-blue-600' },
    { name: 'Non Verbal Reasoning', color: 'bg-pink-500 hover:bg-pink-600' },
    { name: 'English', color: 'bg-purple-500 hover:bg-purple-600' },
    { name: 'DI (Data Interpretation)', color: 'bg-green-500 hover:bg-green-600' },
    { name: 'GK (General Knowledge)', color: 'bg-orange-500 hover:bg-orange-600' },
    { name: 'Polity', color: 'bg-purple-600 hover:bg-purple-700' },
    { name: 'History GK', color: 'bg-blue-600 hover:bg-blue-700' },
    { name: 'Geography GK', color: 'bg-teal-500 hover:bg-teal-600' },
    { name: 'Physics GK', color: 'bg-red-600 hover:bg-red-700' },
    { name: 'Chemistry GK', color: 'bg-pink-600 hover:bg-pink-700' },
    { name: 'Biology GK', color: 'bg-green-600 hover:bg-green-700' },
    { name: 'Odisha GK', color: 'bg-yellow-600 hover:bg-yellow-700' },
    { name: 'OTET MCQ', color: 'bg-indigo-500 hover:bg-indigo-600' },
    { name: 'CTET MCQ', color: 'bg-purple-700 hover:bg-purple-800' },
    { name: 'OSSTET MCQ', color: 'bg-teal-600 hover:bg-teal-700' },
    { name: 'TGT Physics', color: 'bg-teal-700 hover:bg-teal-800' },
    { name: 'TGT Chemistry', color: 'bg-orange-600 hover:bg-orange-700' },
    { name: 'TGT Biology', color: 'bg-green-700 hover:bg-green-800' },
    { name: 'TGT Mathematics', color: 'bg-red-700 hover:bg-red-800' },
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
                            <Button key={index} className={`${subject.color} text-white justify-between transition-transform duration-300 transform hover:scale-105`}>
                                {subject.name}
                                <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded-full">MCQ</span>
                            </Button>
                        ))}
                </div>
                <Button variant="secondary" className="w-full mt-6">Start MCQ Practice</Button>
                </CardContent>
            </Card>
        </div>
    </section>
  );
}
