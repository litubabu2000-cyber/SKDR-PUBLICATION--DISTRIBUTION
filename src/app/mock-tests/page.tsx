
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Laptop, Target } from 'lucide-react';
import Link from 'next/link';

const divisionTests = [
  { name: 'Banking (PO, Clerk)', href: '/tests/banking', color: 'bg-blue-500 hover:bg-blue-600' },
  { name: 'SSC (CGL, CHSL)', href: '/tests/ssc', color: 'bg-blue-500 hover:bg-blue-600' },
  { name: 'Railways (NTPC, Gr-D)', href: '/tests/railways', color: 'bg-blue-500 hover:bg-blue-600' },
  { name: 'UPSC & State PSC', href: '/tests/upsc', color: 'bg-blue-500 hover:bg-blue-600' },
  { name: 'Class 10 (Odisha Board)', href: '/tests/class-10', color: 'bg-green-500 hover:bg-green-600' },
  { name: 'Class 12 (CHSE)', href: '/tests/class-12', color: 'bg-green-500 hover:bg-green-600' },
  { name: 'CBSE & ICSE Boards', href: '/tests/cbse-icse', color: 'bg-green-500 hover:bg-green-600' },
  { name: 'Scholarship Tests', href: '/tests/scholarship', color: 'bg-green-500 hover:bg-green-600' },
  { name: 'NEET (Medical)', href: '/tests/neet', color: 'bg-red-500 hover:bg-red-600' },
  { name: 'JEE (Engineering)', href: '/tests/jee', color: 'bg-red-500 hover:bg-red-600' },
  { name: 'Common PG Entrance', href: '/tests/common-pg', color: 'bg-red-500 hover:bg-red-600' },
  { name: 'Law (CLAT)', href: '/tests/clat', color: 'bg-red-500 hover:bg-red-600' },
  { name: 'TGT & PGT', href: '/tests/tgt-pgt', color: 'bg-purple-500 hover:bg-purple-600' },
  { name: 'CTET & OTET', href: '/tests/ctet-otet', color: 'bg-purple-500 hover:bg-purple-600' },
  { name: 'OAVS & NVS', href: '/tests/oavs-nvs', color: 'bg-purple-500 hover:bg-purple-600' },
  { name: 'Lecturer Posts', href: '/tests/lecturer', color: 'bg-purple-500 hover:bg-purple-600' },
];

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

export default function MockTestsPage() {
  return (
    <section id="mock-tests" className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
             <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl md:text-5xl">Mock Test Series</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Test your preparation with our comprehensive mock test series covering all major exams
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                     
                     <Card className="transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-2 bg-blue-600 text-white">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Laptop /> Division-wise Tests</CardTitle>
                            <CardDescription className="text-blue-100">Specialized exam tests</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                              {divisionTests.map((test, index) => (
                                <Link
                                  key={index}
                                  href={test.href}
                                  className={`${test.color} text-white justify-center flex items-center p-2 rounded-md text-sm text-center transition-transform duration-300 transform hover:scale-105`}
                                >
                                  {test.name}
                                </Link>
                              ))}
                            </div>
                        </CardContent>
                     </Card>

                </div>
                 <div id="mcq-practice" className="lg:col-span-2">
                     
                     <Card className="transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-2 bg-teal-600 text-white">
                         <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Target/> Subject-wise MCQ Practice</CardTitle>

                            <CardDescription className="text-teal-100">Topic-specific practice tests</CardDescription>
                         </CardHeader>
                         <CardContent className="p-6">
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
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
            </div>
        </div>
    </section>
  );
}
