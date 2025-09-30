
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowRight, BookCopy, BookOpen, ChevronRight, FileQuestion, GraduationCap, Laptop, PlayCircle, Rocket, ShieldCheck, Star, Target, LucideIcon, Train, Building, Banknote, User, PenTool, School, Users, BarChart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Category = {
  title: string;
  description: string;
  subtext: string;
  icon: LucideIcon;
  gradient: string;
};

const categories: Category[] = [
  { title: 'ODISHA SCHOOL GUIDE', description: 'Classes 6-10', subtext: 'Complete study materials for Odisha Board', icon: BookCopy, gradient: 'from-cyan-500 to-blue-500' },
  { title: 'ODISHA COLLEGE BOOKS', description: 'Classes 11-12', subtext: 'Higher secondary education materials', icon: GraduationCap, gradient: 'from-pink-500 to-purple-500' },
  { title: 'NEET & JEE Guide', description: 'Entrance Exams', subtext: 'Medical & Engineering preparation', icon: Rocket, gradient: 'from-green-400 to-teal-500' },
  { title: 'Railway Books', description: 'RRB Exams', subtext: 'Complete railway exam preparation', icon: Train, gradient: 'from-red-500 to-orange-500' },
  { title: 'SSC Books', description: 'Staff Selection', subtext: 'SSC exam preparation materials', icon: Building, gradient: 'from-blue-500 to-indigo-500' },
  { title: 'OSSC Books', description: 'Odisha SSC', subtext: 'Odisha state service exams', icon: PenTool, gradient: 'from-orange-400 to-yellow-500' },
  { title: 'TGT Books', description: 'Trained Graduate Teacher', subtext: 'TGT exam preparation guide', icon: School, gradient: 'from-teal-400 to-green-500' },
  { title: 'PGT Books', description: 'Post Graduate Teacher', subtext: 'PGT exam preparation materials', icon: User, gradient: 'from-purple-500 to-pink-500' },
  { title: 'Previous Year Questions', description: 'Solved Papers', subtext: 'PYQ collections for major exams', icon: FileQuestion, gradient: 'from-indigo-500 to-blue-500' },
];

const videoHub = [
  { title: 'Odisha School Guide', image: 'https://picsum.photos/seed/osg-video/600/400', hint: 'education classroom' },
  { title: 'Odisha College Books', image: 'https://picsum.photos/seed/ocb-video/600/400', hint: 'college lecture' },
  { title: 'NEET & JEE Preparation', image: 'https://picsum.photos/seed/neet-jee-video/600/400', hint: 'science lab' },
  { title: 'Competitive Exam Videos', image: 'https://picsum.photos/seed/cex-video/600/400', hint: 'exam hall' },
  { title: 'Mathematics Masterclass', image: 'https://picsum.photos/seed/math-video/600/400', hint: 'math blackboard' },
  { title: 'Science Lab Experiments', image: 'https://picsum.photos/seed/lab-video/600/400', hint: 'chemistry experiment' },
];

const pyqExams = [
    { title: 'Railway Exams', description: 'RRB NTPC, JE, Group D, ALP', items: ['RRB NTPC 2019-2023', 'Group D Previous Papers', 'ALP & Technician Papers', 'JE Previous Year Solutions'], price: 299, color: 'green', icon: Train },
    { title: 'SSC Exams', description: 'CGL, CHSL, MTS, GD', items: ['SSC CGL 2018-2023', 'CHSL Previous Papers', 'MTS & GD Papers', 'Solved with Explanations'], price: 299, color: 'blue', icon: Building },
    { title: 'OSSC Exams', description: 'All Odisha State Posts', items: ['OSSC CGL Previous Papers', 'Junior Clerk Papers', 'RI & Other Posts', 'Odia & English Papers'], price: 299, color: 'magenta', icon: PenTool },
    { title: 'Banking Exams', description: 'IBPS, SBI, RBI', items: ['IBPS PO & Clerk Papers', 'SBI PO Previous Years', 'RBI Grade B Papers', 'Reasoning & Quant Focus'], price: 299, color: 'orange', icon: Banknote },
    { title: 'TGT/PGT Exams', description: 'Teaching Posts', items: ['TGT Previous Papers', 'PGT All Subjects', 'Teaching Aptitude Papers', 'Subject-wise Solutions'], price: 299, color: 'teal', icon: School },
    { title: 'UPSC/State PSC', description: 'Civil Services', items: ['UPSC Prelims Papers', 'State PSC Papers', 'Mains Previous Years', 'Essay & Optional Papers'], price: 299, color: 'rose', icon: User },
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
]

const quickLinks = [
  { href: '#categories', label: 'Choose Your Category' },
  { href: '#video-hub', label: 'Video Learning Hub' },
  { href: '#pyq', label: 'Previous Year Question Papers' },
  { href: '#mock-tests', label: 'Mock Test Series' },
  { href: '#mcq-practice', label: 'Subject-wise MCQ Practice' },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-background">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    THE SKDR PUBLICATION AND DISTRIBUTION
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Your Gateway to Academic Excellence & Knowledge Distribution
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {quickLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="bg-card p-4 rounded-lg text-center font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="categories" className="w-full py-12 md:py-24">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl md:text-5xl">Choose Your Category</h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Select from our comprehensive educational categories
                    </p>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category, index) => (
                        <div key={index} className={`bg-gradient-to-br ${category.gradient} rounded-xl p-6 flex flex-col justify-between text-white transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2`}>
                            <div className="flex items-start space-x-4">
                               <category.icon className="size-10" />
                                <div>
                                    <h3 className="text-lg font-bold font-headline">{category.title}</h3>
                                    <p className="text-sm opacity-80">{category.description}</p>
                                </div>
                            </div>
                            <p className="text-sm opacity-80 mt-4">{category.subtext}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section id="video-hub" className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl md:text-5xl">Video Learning Hub</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Interactive video content for enhanced learning experience
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {videoHub.map((video) => (
                <Card key={video.title} className="overflow-hidden group transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-2">
                  <div className="relative">
                    <Image
                      src={video.image}
                      width={600}
                      height={400}
                      alt={video.title}
                      className="w-full aspect-video object-cover transition-transform group-hover:scale-105"
                      data-ai-hint={video.hint}
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <PlayCircle className="size-16 text-white/80" />
                    </div>
                     <div className="absolute top-2 left-2 bg-destructive text-destructive-foreground px-2 py-1 text-xs font-bold rounded">LIVE</div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-bold font-headline">{video.title}</h3>
                    <Button variant="link" className="px-0">Watch Now <ArrowRight className="ml-2 size-4" /></Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        <section id="pyq" className="w-full py-12 md:py-24 bg-card/5">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-semibold">EXAM PREPARATION</div>
                    <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl md:text-5xl">Previous Year Question Papers</h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Master your exams with comprehensive previous year question papers from all major competitive exams
                    </p>
                </div>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {pyqExams.map((exam, index) => (
                        <div key={index} className="rounded-xl shadow-md overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 group">
                            <div className={`
                                p-6 flex items-center gap-4 text-white
                                ${exam.color === 'green' && 'bg-green-500'}
                                ${exam.color === 'blue' && 'bg-blue-600'}
                                ${exam.color === 'magenta' && 'bg-pink-500'}
                                ${exam.color === 'orange' && 'bg-orange-500'}
                                ${exam.color === 'teal' && 'bg-teal-500'}
                                ${exam.color === 'rose' && 'bg-rose-500'}
                            `}>
                               <exam.icon className="size-8 shrink-0" />
                               <div>
                                   <h3 className="text-lg font-bold font-headline">{exam.title}</h3>
                                   <p className="text-sm opacity-90">{exam.description}</p>
                               </div>
                            </div>
                           <div className="bg-card p-6">
                               <ul className="space-y-3 text-sm text-muted-foreground mb-6">
                                   {exam.items.map((item, i) => (
                                       <li key={i} className="flex items-center">
                                            <div className={`
                                                w-2 h-2 rounded-full mr-3 shrink-0
                                                ${exam.color === 'green' && 'bg-green-500'}
                                                ${exam.color === 'blue' && 'bg-blue-600'}
                                                ${exam.color === 'magenta' && 'bg-pink-500'}
                                                ${exam.color === 'orange' && 'bg-orange-500'}
                                                ${exam.color === 'teal' && 'bg-teal-500'}
                                                ${exam.color === 'rose' && 'bg-rose-500'}
                                            `}/>
                                           <span>{item}</span>
                                       </li>
                                   ))}
                               </ul>
                                <Button className={`w-full text-white
                                    ${exam.color === 'green' && 'bg-green-500 hover:bg-green-600'}
                                    ${exam.color === 'blue' && 'bg-blue-600 hover:bg-blue-700'}
                                    ${exam.color === 'magenta' && 'bg-pink-500 hover:bg-pink-600'}
                                    ${exam.color === 'orange' && 'bg-orange-500 hover:bg-orange-600'}
                                    ${exam.color === 'teal' && 'bg-teal-500 hover:bg-teal-600'}
                                    ${exam.color === 'rose' && 'bg-rose-500 hover:bg-rose-600'}
                                `}>Access Papers - ₹{exam.price}</Button>
                           </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
        
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
                                      className={`${test.color} text-white justify-center flex items-center p-2 rounded-md text-sm text-center`}
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
                                         <Button key={index} className={`${subject.color} text-white justify-between`}>
                                             {subject.name}
                                             <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded-full">MCQ</span>
                                         </Button>
                                     ))}
                                </div>
                                <Button variant="secondary" className="w-full mt-6">Start MCQ Practice</Button>
                             </CardContent>
                         </Card>
                         
                        <Card className="mt-8 bg-primary/90 text-primary-foreground relative overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2">
                             <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                            <div className="relative">
                            <CardHeader>
                                <CardTitle>All India & State Level Test Series</CardTitle>
                                <CardDescription className="text-primary-foreground/80">Get unlimited access to All India and All State Level mock tests simultaneously.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                                    <div className="flex items-center gap-2"><ShieldCheck /> All India Level Tests</div>
                                    <div className="flex items-center gap-2"><ShieldCheck /> All State Level Tests</div>
                                    <div className="flex items-center gap-2 col-span-2"><ShieldCheck /> Detailed analysis & performance tracking</div>
                                </div>
                                <div>
                                    
                                    <p className="font-bold text-accent">SAVE 33%</p>
                                    <p className="text-xs mt-1">One-time payment • Lifetime access • All updates included</p>
                                    <Button variant="secondary" className="w-full mt-4">Get National Access</Button>
                                </div>
                            </CardContent>
                            </div>
                        </Card>

                     </div>
                </div>
            </div>
        </section>
      </main>

      <footer className="bg-foreground text-background">
        <div className="container px-4 md:px-6 py-12">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2 col-span-full lg:col-span-1">
                    <h3 className="text-2xl font-bold font-headline">SKDR Publication</h3>
                    <p className="text-sm text-background/70">
                        Your trusted partner for competitive exam preparation. We provide comprehensive study materials and practice tests for various government exams.
                    </p>
                </div>
                 <div className="space-y-2">
                    <h4 className="font-semibold">Quick Links</h4>
                    <ul className="space-y-1 text-sm text-background/70">
                        <li><Link href="#" className="hover:text-background">Home</Link></li>
                        <li><Link href="#" className="hover:text-background">Class Books</Link></li>
                        <li><Link href="#" className="hover:text-background">Railway Exams</Link></li>
                        <li><Link href="#" className="hover:text-background">SSC Exams</Link></li>
                        <li><Link href="#" className="hover:text-background">OSSC Exams</Link></li>
                        <li><Link href="#" className="hover:text-background">TGT/PGT Exams</Link></li>
                    </ul>
                </div>
                 <div className="space-y-2">
                    <h4 className="font-semibold">Study Materials</h4>
                    <ul className="space-y-1 text-sm text-background/70">
                        <li><Link href="#" className="hover:text-background">Previous Year Papers</Link></li>
                        <li><Link href="#" className="hover:text-background">Mock Tests</Link></li>
                        <li><Link href="#" className="hover:text-background">Video Lectures</Link></li>
                        <li><Link href="#" className="hovertext-background">Practice Books</Link></li>
                        <li><Link href="#" className="hover:text-background">Online Courses</Link></li>
                    </ul>
                </div>
                 <div className="space-y-2">
                    <h4 className="font-semibold">Stay Updated</h4>
                     <p className="text-sm text-background/70">Subscribe to our newsletter for book recommendations and exclusive offers.</p>
                     <div className="flex">
                        <Input type="email" placeholder="Enter your email" className="bg-background/20 border-0 rounded-r-none" />
                        <Button type="submit" className="rounded-l-none">Subscribe</Button>
                     </div>
                </div>
            </div>
             <div className="mt-12 border-t border-background/20 pt-8 text-sm text-background/70">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                     <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-center sm:text-left">
                        <span>123 Book Street, Reading City, RC 12345</span>
                        <span>(555) 123-BOOK</span>
                        <span>theskdrpublication@gmail.com</span>
                    </div>
                    <p className="text-center sm:text-right">© {new Date().getFullYear()} SKDR Publication. All rights reserved.</p>
                </div>
             </div>
        </div>
      </footer>
    </div>
  );
}

    

    

    
