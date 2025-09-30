
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building } from "lucide-react";

const sscExams = {
  title: "SSC (CGL / CHSL / MTS / GD)",
  subjects: ["Quantitative Aptitude", "Reasoning", "General Awareness (GK + Current Affairs)", "English Language", "SSC PYQ (Solved Papers)"]
};

export default function SscBooksPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">SSC Books</h1>
        <p className="text-muted-foreground md:text-xl">Staff Selection exam preparation materials</p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center gap-4">
            <Building className="size-8 text-primary"/>
            <CardTitle className="text-2xl font-headline">{sscExams.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              {sscExams.subjects.map((subject) => (
                <li key={subject}>{subject}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
