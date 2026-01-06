
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ListChecks } from "lucide-react";

const exams = [
    { name: "UPSC Civil Services", details: "Prelims & Mains Syllabus" },
    { name: "SSC CGL", details: "Tier I & Tier II Detailed Syllabus" },
    { name: "IBPS PO", details: "Prelims & Mains Syllabus" },
    { name: "RRB NTPC", details: "CBT 1 & CBT 2 Syllabus" },
    { name: "NEET", details: "Physics, Chemistry, Biology Syllabus" },
    { name: "JEE Main & Advanced", details: "Physics, Chemistry, Maths Syllabus" },
    { name: "UGC NET", details: "Paper 1 & Subject-wise Syllabus" },
    { name: "CTET/TET", details: "Paper 1 & Paper 2 Syllabus" },
    { name: "Odisha State Exams", details: "OSSC, OPSC, etc. Syllabus" },
]

export default function SyllabusPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">Exam Syllabus</h1>
        <p className="text-muted-foreground md:text-xl">Find detailed syllabus for all major competitive exams.</p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <ListChecks className="size-6 text-primary" />
                <span>Select an Exam to View Syllabus</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {exams.map((exam) => (
                    <div key={exam.name} className="p-4 bg-card border rounded-lg transition-all duration-300 ease-in-out hover:shadow-md hover:border-primary cursor-pointer">
                        <h3 className="font-bold text-foreground">{exam.name}</h3>
                        <p className="text-sm text-muted-foreground">{exam.details}</p>
                    </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
