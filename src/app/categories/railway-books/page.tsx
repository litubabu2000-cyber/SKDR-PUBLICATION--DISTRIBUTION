
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Train } from "lucide-react";

const rrbExams = [
  {
    title: "RRB NTPC",
    subjects: ["General Awareness", "Quantitative Aptitude", "Reasoning & General Intelligence", "RRB NTPC PYQ"]
  },
  {
    title: "RRB Group D",
    subjects: ["General Science (Physics, Chemistry, Biology)", "Mathematics", "Reasoning", "GK & Current Affairs", "Group D PYQ"]
  },
  {
    title: "RRB ALP / Technician",
    subjects: ["Mechanical Engineering", "Electrical Engineering", "Electronics & Communication", "Science, Math, Reasoning", "ALP PYQ"]
  }
];

export default function RailwayBooksPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">Railway Books (RRB)</h1>
        <p className="text-muted-foreground md:text-xl">Complete railway exam preparation materials</p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
        {rrbExams.map((exam) => (
          <Card key={exam.title} className="bg-card">
            <CardHeader className="flex flex-row items-center gap-4">
              <Train className="size-8 text-primary"/>
              <CardTitle className="text-2xl font-headline">{exam.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                {exam.subjects.map((subject) => (
                  <li key={subject}>{subject}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
