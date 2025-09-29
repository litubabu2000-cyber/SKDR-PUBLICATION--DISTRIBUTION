import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowRight, BookCopy, BookOpen, ChevronRight, FileQuestion, GraduationCap, Laptop, Lightbulb, PlayCircle, Rocket, ShieldCheck, ShoppingCart, Star, Target, Video } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const stats = [
  { value: '10,000+', label: 'Books', icon: <BookOpen className="size-8 text-primary" /> },
  { value: '50,000+', label: 'Students', icon: <GraduationCap className="size-8 text-primary" /> },
  { value: 'Award Winning', label: 'Publications', icon: <Star className="size-8 text-primary" /> },
  { value: '10,000+', label: 'PYQ Practice', icon: <FileQuestion className="size-8 text-primary" /> },
  { value: '1,000+', label: 'Mock Tests', icon: <Target className="size-8 text-primary" /> },
];

const categories = [
  { title: 'ODISHA SCHOOL GUIDE', description: 'Classes 6-10', subtext: 'Complete study materials for Odisha Board', icon: <BookCopy className="size-10 text-blue-500" /> },
  { title: 'ODISHA COLLEGE BOOKS', description: 'Classes 11-12', subtext: 'Higher secondary education materials', icon: <BookCopy className="size-10 text-orange-500" /> },
  { title: 'NEET & JEE Guide', description: 'Entrance Exams', subtext: 'Medical & Engineering preparation', icon: <Rocket className="size-10 text-red-500" /> },
  { title: 'Railway Books', description: 'RRB Exams', subtext: 'Complete railway exam preparation', icon: <BookCopy className="size-10 text-green-500" /> },
  { title: 'SSC Books', description: 'Staff Selection', subtext: 'SSC exam preparation materials', icon: <BookCopy className="size-10 text-purple-500" /> },
  { title: 'OSSC Books', description: 'Odisha SSC', subtext: 'Odisha state service exams', icon: <BookCopy className="size-10 text-yellow-500" /> },
  { title: 'TGT Books', description: 'Trained Graduate Teacher', subtext: 'TGT exam preparation guide', icon: <BookCopy className="size-10 text-pink-500" /> },
  { title: 'PGT Books', description: 'Post Graduate Teacher', subtext: 'PGT exam preparation materials', icon: <BookCopy className="size-10 text-indigo-500" /> },
  { title: 'Previous Year Questions', description: 'Solved Papers', subtext: 'PYQ collections for major exams', icon: <FileQuestion className="size-10 text-teal-500" /> },
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
    { title: 'Railway Exams', description: 'RRB NTPC, JE, Group D, ALP', items: ['RRB NTPC 2019-2023', 'Group D Previous Papers', 'ALP & Technician Papers', 'JE Previous Year Solutions'], price: 299 },
    { title: 'SSC Exams', description: 'CGL, CHSL, MTS, GD', items: ['SSC CGL 2018-2023', 'CHSL Previous Papers', 'MTS & GD Papers', 'Solved with Explanations'], price: 299 },
    { title: 'OSSC Exams', description: 'All Odisha State Posts', items: ['OSSC CGL Previous Papers', 'Junior Clerk Papers', 'RI & Other Posts', 'Odia & English Papers'], price: 299 },
    { title: 'Banking Exams', description: 'IBPS, SBI, RBI', items: ['IBPS PO & Clerk Papers', 'SBI PO Previous Years', 'RBI Grade B Papers', 'Reasoning & Quant Focus'], price: 299 },
    { title: 'TGT/PGT Exams', description: 'Teaching Posts', items: ['TGT Previous Papers', 'PGT All Subjects', 'Teaching Aptitude Papers', 'Subject-wise Solutions'], price: 299 },
    { title: 'UPSC/State PSC', description: 'Civil Services', items: ['UPSC Prelims Papers', 'State PSC Papers', 'Mains Previous Years', 'Essay & Optional Papers'], price: 299 },
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
    { name: 'TGT Mathematics', color: 'bg-red-700 hover:bg-red-800' }
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-background">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/5">
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
              <div className="flex justify-center">
                <Image
                  src="https://picsum.photos/seed/hero-books/600/400"
                  width="600"
                  height="400"
                  alt="Hero"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
                  data-ai-hint="library books"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24">
            <div className="container px-4 md:px-6">
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                    {stats.map((stat, index) => (
                        <Card key={index} className="flex flex-col items-center justify-center p-4 text-center transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-2">
                            <CardContent className="p-0 space-y-2">
                                {stat.icon}
                                <div className="text-2xl font-bold font-headline">{stat.value}</div>
                                <p className="text-sm text-muted-foreground">{stat.label}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
        
        <section className="w-full py-12 md:py-24 bg-primary/5">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl md:text-5xl">Choose Your Category</h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Select from our comprehensive educational categories
                    </p>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category, index) => (
                        <Card key={index} className="flex items-start p-4 space-x-4 transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-2">
                           {category.icon}
                            <div>
                                <h3 className="text-lg font-bold font-headline">{category.title} <span className="text-sm text-muted-foreground">({category.description})</span></h3>
                                <p className="text-muted-foreground">{category.subtext}</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

        <section className="w-full py-12 md:py-24">
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
        
        <section className="w-full py-12 md:py-24 bg-primary/5">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl md:text-5xl">Previous Year Question Papers</h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Master your exams with comprehensive previous year question papers from all major competitive exams
                    </p>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {pyqExams.map((exam, index) => (
                        <Card key={index} className="flex flex-col transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-2">
                           <CardHeader>
                               <CardTitle>{exam.title}</CardTitle>
                               <CardDescription>{exam.description}</CardDescription>
                           </CardHeader>
                           <CardContent className="flex-1">
                               <ul className="space-y-2 text-sm text-muted-foreground">
                                   {exam.items.map((item, i) => (
                                       <li key={i} className="flex items-center">
                                           <ChevronRight className="size-4 mr-2 text-primary" />
                                           {item}
                                       </li>
                                   ))}
                               </ul>
                           </CardContent>
                           <CardFooter>
                                <Button className="w-full">Access Papers - ₹{exam.price}</Button>
                           </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
        
        <section className="w-full py-12 md:py-24">
            <div className="container px-4 md:px-6">
                 <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl md:text-5xl">Mock Test Series</h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Test your preparation with our comprehensive mock test series covering all major exams
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                         
                         <Card className="transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-2 bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Laptop /> Branch-wise Tests</CardTitle>
                                <CardDescription className="text-blue-200">Specialized subject tests</CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="bg-white/10 p-3 rounded-lg">
                                        <h4 className="font-bold mb-2">Engineering</h4>
                                        <ul className="space-y-1 text-blue-100 text-xs">
                                            <li>• Civil Engineering</li>
                                            <li>• Mechanical Engineering</li>
                                            <li>• Electrical Engineering</li>
                                            <li>• Computer Science</li>
                                        </ul>
                                    </div>
                                    <div className="bg-white/10 p-3 rounded-lg">
                                        <h4 className="font-bold mb-2">Arts & Commerce</h4>
                                        <ul className="space-y-1 text-blue-100 text-xs">
                                            <li>• General Studies</li>
                                            <li>• Economics</li>
                                            <li>• Political Science</li>
                                            <li>• English Literature</li>
                                        </ul>
                                    </div>
                                    <div className="bg-white/10 p-3 rounded-lg">
                                        <h4 className="font-bold mb-2">Science</h4>
                                        <ul className="space-y-1 text-blue-100 text-xs">
                                            <li>• Physics</li>
                                            <li>• Chemistry</li>
                                            <li>• Biology</li>
                                            <li>• Mathematics</li>
                                        </ul>
                                    </div>
                                     <div className="bg-white/10 p-3 rounded-lg">
                                        <h4 className="font-bold mb-2">Medical</h4>
                                        <ul className="space-y-1 text-blue-100 text-xs">
                                            <li>• NEET Practice</li>
                                            <li>• Medical Entrance</li>
                                            <li>• Nursing Exams</li>
                                            <li>• Pharmacy Tests</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="mt-6 text-center">
                                    <p className="text-2xl font-bold">₹499<span className="text-sm font-normal"> per branch</span></p>
                                    <p className="text-xs text-blue-200">Includes: 50+ Tests per branch</p>
                                    <Button variant="secondary" className="w-full mt-4">Start Branch Tests</Button>
                                </div>
                            </CardContent>
                         </Card>
                    </div>
                     <div className="lg:col-span-2">
                         
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
                                <CardTitle>All-Access Mock Test Package</CardTitle>
                                <CardDescription className="text-primary-foreground/80">Get unlimited access to all branch-wise and division-wise mock tests</CardDescription>
                            </Header>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                                    <div className="flex items-center gap-2"><ShieldCheck /> All Branches</div>
                                    <div className="flex items-center gap-2"><ShieldCheck /> All Divisions</div>
                                    <div className="flex items-center gap-2 col-span-2"><ShieldCheck /> Detailed analysis & performance tracking</div>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold">₹1,999 <span className="text-lg line-through opacity-80">₹2,998</span></p>
                                    <p className="font-bold text-accent">SAVE 33%</p>
                                    <p className="text-xs mt-1">One-time payment • Lifetime access • All updates included</p>
                                    <Button variant="secondary" className="w-full mt-4">Get All-Access Package</Button>
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
