
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Laptop } from 'lucide-react';
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

            <div className="flex justify-center">
                <div className="w-full max-w-4xl">
                     
                     <Card className="transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-2 bg-blue-600 text-white">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Laptop /> Division-wise Tests</CardTitle>
                            <CardDescription className="text-blue-100">Specialized exam tests</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
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
            </div>
        </div>
    </section>
  );
}
