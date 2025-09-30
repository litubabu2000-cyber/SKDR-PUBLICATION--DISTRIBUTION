
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PenTool } from "lucide-react";

const osscExams = {
  title: "OSSC (Odisha SSC)",
  subjects: ["Odia Grammar & Literature", "General Awareness (India + Odisha GK)", "Quantitative Aptitude", "Reasoning", "Computer Knowledge", "OSSC PYQ"]
};

export default function OsscBooksPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">OSSC Books</h1>
        <p className="text-muted-foreground md:text-xl">Odisha state service exam preparation</p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center gap-4">
            <PenTool className="size-8 text-primary"/>
            <CardTitle className="text-2xl font-headline">{osscExams.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              {osscExams.subjects.map((subject) => (
                <li key={subject}>{subject}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
