
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket, FileText } from "lucide-react";

const entranceExams = [
  {
    title: "NEET (Medical)",
    icon: Rocket,
    books: ["NEET Physics Guide", "NEET Chemistry Guide", "NEET Biology Guide", "NEET PYQ (Chapter-wise Solved)"]
  },
  {
    title: "JEE (Engineering)",
    icon: Rocket,
    books: ["JEE Physics Vol. 1 & 2", "JEE Chemistry (Physical, Organic, Inorganic)", "JEE Mathematics (Algebra, Calculus, Trigonometry, Coordinate Geometry)", "JEE PYQ (Chapter-wise Solved)"]
  }
];

export default function NeetJeeGuidePage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">NEET & JEE Guide</h1>
        <p className="text-muted-foreground md:text-xl">Preparation books for medical & engineering entrance exams</p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
        {entranceExams.map((exam) => (
          <Card key={exam.title} className="bg-card">
            <CardHeader className="flex flex-row items-center gap-4">
              <exam.icon className="size-8 text-primary"/>
              <CardTitle className="text-2xl font-headline">{exam.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                {exam.books.map((book) => (
                  <li key={book}>{book}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
