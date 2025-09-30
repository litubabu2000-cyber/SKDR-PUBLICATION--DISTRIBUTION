
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, FlaskConical, BarChart, BookOpen } from "lucide-react";

const collegeStreams = [
  {
    title: "Science Stream",
    icon: FlaskConical,
    subjects: ["Physics (Part I & II)", "Chemistry (Part I & II)", "Mathematics (Part I & II)", "Biology (Botany + Zoology)", "Computer Science / IT"]
  },
  {
    title: "Commerce Stream",
    icon: BarChart,
    subjects: ["Accountancy", "Business Studies", "Economics", "Statistics", "English / Odia"]
  },
  {
    title: "Arts Stream",
    icon: BookOpen,
    subjects: ["Political Science", "History", "Geography", "Sociology", "Psychology", "Education"]
  }
];

export default function OdishaCollegeBooksPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">Odisha College Books</h1>
        <p className="text-muted-foreground md:text-xl">Higher secondary education materials for CHSE Odisha – Classes 11–12</p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
        {collegeStreams.map((stream) => (
          <Card key={stream.title} className="bg-card">
            <CardHeader className="flex flex-row items-center gap-4">
              <stream.icon className="size-8 text-primary"/>
              <CardTitle className="text-2xl font-headline">{stream.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                {stream.subjects.map((subject) => (
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
