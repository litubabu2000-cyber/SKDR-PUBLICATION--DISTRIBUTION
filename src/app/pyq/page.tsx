
import { Button } from '@/components/ui/button';
import { Train, Building, PenTool, Banknote, School, User } from 'lucide-react';

const pyqExams = [
    { title: 'Railway Exams', description: 'RRB NTPC, JE, Group D, ALP', items: ['RRB NTPC 2019-2023', 'Group D Previous Papers', 'ALP & Technician Papers', 'JE Previous Year Solutions'], color: 'green', icon: Train },
    { title: 'SSC Exams', description: 'CGL, CHSL, MTS, GD', items: ['SSC CGL 2018-2023', 'CHSL Previous Papers', 'MTS & GD Papers', 'Solved with Explanations'], color: 'blue', icon: Building },
    { title: 'OSSC Exams', description: 'All Odisha State Posts', items: ['OSSC CGL Previous Papers', 'Junior Clerk Papers', 'RI & Other Posts', 'Odia & English Papers'], color: 'magenta', icon: PenTool },
    { title: 'Banking Exams', description: 'IBPS, SBI, RBI', items: ['IBPS PO & Clerk Papers', 'SBI PO Previous Years', 'RBI Grade B Papers', 'Reasoning & Quant Focus'], color: 'orange', icon: Banknote },
    { title: 'TGT/PGT Exams', description: 'Teaching Posts', items: ['TGT Previous Papers', 'PGT All Subjects', 'Teaching Aptitude Papers', 'Subject-wise Solutions'], color: 'teal', icon: School },
    { title: 'UPSC/State PSC', description: 'Civil Services', items: ['UPSC Prelims Papers', 'State PSC Papers', 'Mains Previous Years', 'Essay & Optional Papers'], color: 'rose', icon: User },
];

export default function PYQPage() {
  return (
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
                            `}>Access Papers</Button>
                       </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
}
