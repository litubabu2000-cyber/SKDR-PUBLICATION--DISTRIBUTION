
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Landmark, School, Building, User, Shield, HeartPulse, FlaskConical, Train, Scale, GraduationCap, Briefcase } from 'lucide-react';

const nationalExams = [
    {
        category: "Civil Services / Administrative",
        icon: Landmark,
        exams: ["UPSC Civil Services (IAS, IPS, IFS)", "UPSC CAPF (AC)", "UPSC IES / ESE", "UPSC CMS", "UPSC NDA", "UPSC CDS", "UPSC SO / EPFO", "Indian Forest Service (IFS)", "Indian Statistical Service (ISS)", "Indian Economic Service (IES)"]
    },
    {
        category: "Teaching / Education Exams",
        icon: School,
        exams: ["CTET (Central Teacher Eligibility Test)", "KVS TGT / PGT / PRT", "NVS TGT / PGT", "UGC NET", "CSIR NET", "EMRS Teacher Recruitment", "Army Public School (APS)", "DSSSB (Delhi)"]
    },
    {
        category: "Banking & Insurance",
        icon: Building,
        exams: ["SBI PO", "SBI Clerk", "SBI SO", "IBPS PO", "IBPS Clerk", "IBPS SO", "IBPS RRB (PO / Clerk)", "RBI Grade B", "RBI Assistant", "NABARD Grade A/B", "SEBI Grade A", "LIC AAO / ADO", "NIACL AO", "AIC MT"]
    },
    {
        category: "SSC (Staff Selection Commission)",
        icon: User,
        exams: ["SSC CGL", "SSC CHSL", "SSC CPO", "SSC GD Constable", "SSC JE", "SSC MTS", "SSC Stenographer", "SSC Selection Post"]
    },
    {
        category: "Defence / Paramilitary",
        icon: Shield,
        exams: ["Indian Army (Agniveer)", "Indian Navy (SSR / AA)", "Indian Air Force (Agniveer Vayu)", "Coast Guard", "CRPF", "BSF", "CISF", "ITBP", "Assam Rifles"]
    },
    {
        category: "Medical / Health",
        icon: HeartPulse,
        exams: ["NEET UG", "NEET PG", "AIIMS Entrance", "JIPMER", "NORCET (AIIMS Nursing)", "ESIC Recruitment"]
    },
    {
        category: "Engineering / Science",
        icon: FlaskConical,
        exams: ["JEE Main", "JEE Advanced", "GATE", "ISRO Scientist", "DRDO CEPTAM", "BARC", "CSIR Scientist", "ICMR", "TIFR"]
    },
    {
        category: "Railway Exams (RRB)",
        icon: Train,
        exams: ["RRB NTPC", "RRB Group D", "RRB JE", "RRB ALP", "RRB SSE"]
    },
    {
        category: "Law / Judiciary",
        icon: Scale,
        exams: ["CLAT", "AILET", "Judicial Services Exam (PCS-J)"]
    }
];

const stateExams = [
    {
        category: "Teaching (State TET / TGT / PGT)",
        icon: GraduationCap,
        exams: ["OTET – Odisha", "CTET-linked State Recruitments", "UP TET", "Bihar TET / STET", "MP TET", "Rajasthan REET", "AP TET", "TS TET", "KTET (Kerala)", "TNTET (Tamil Nadu)", "KARTET (Karnataka)", "HTET (Haryana)", "MAHATET (Maharashtra)"]
    },
    {
        category: "State Public Service Commissions (PSC)",
        icon: Landmark,
        exams: ["OPSC – Odisha", "UPPSC – Uttar Pradesh", "BPSC – Bihar", "MPPSC – Madhya Pradesh", "RPSC – Rajasthan", "WBPSC – West Bengal", "TNPSC – Tamil Nadu", "KPSC – Karnataka", "MPSC – Maharashtra", "APPSC – Andhra Pradesh", "TSPSC – Telangana", "GPSC – Gujarat", "HPPSC – Himachal Pradesh", "JKPSC – J&K"]
    },
    {
        category: "Police / Home Guard",
        icon: Shield,
        exams: ["State Police SI", "Constable Exams", "Excise Constable", "Home Guard"]
    },
    {
        category: "State Government Jobs",
        icon: Briefcase,
        exams: ["Revenue Inspector", "Junior Assistant", "Forest Guard", "Village Level Worker (VLW)", "Panchayat Secretary", "State SSC Exams"]
    }
];


export default function SyllabusPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">Exam Syllabus</h1>
        <p className="text-muted-foreground md:text-xl">A complete list of major competitive exams in India.</p>
      </div>
      
      <div className="max-w-4xl mx-auto space-y-8">
        <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
            <AccordionItem value="item-1">
                <AccordionTrigger className="text-2xl font-bold font-headline bg-card p-6 rounded-t-lg">
                    <span className="flex items-center gap-3">🇮🇳 National-Level Exams</span>
                </AccordionTrigger>
                <AccordionContent className="bg-card p-6 rounded-b-lg grid gap-6 grid-cols-2">
                    {nationalExams.map((category) => (
                        <Card key={category.category} className="bg-background/50">
                            <CardHeader className="flex-row gap-4 items-center">
                                <category.icon className="size-8 text-primary" />
                                <CardTitle className="text-lg">{category.category}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                                    {category.exams.map(exam => <li key={exam}>{exam}</li>)}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </AccordionContent>
            </AccordionItem>
             <AccordionItem value="item-2">
                <AccordionTrigger className="text-2xl font-bold font-headline bg-card p-6 rounded-t-lg mt-8">
                     <span className="flex items-center gap-3">🏫 State-Level Exams</span>
                </AccordionTrigger>
                <AccordionContent className="bg-card p-6 rounded-b-lg grid gap-6 grid-cols-2">
                     {stateExams.map((category) => (
                        <Card key={category.category} className="bg-background/50">
                            <CardHeader className="flex-row gap-4 items-center">
                                <category.icon className="size-8 text-primary" />
                                <CardTitle className="text-lg">{category.category}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                                    {category.exams.map(exam => <li key={exam}>{exam}</li>)}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
