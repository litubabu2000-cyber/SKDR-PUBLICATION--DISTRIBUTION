
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book } from "lucide-react";

const subjects = ["Odia", "English", "Mathematics", "General Science (Physics, Chemistry, Biology)", "Social Science", "Sanskrit / Hindi / Additional Subject"];

export default function Class10Page() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">Class 10 Subjects (HSC)</h1>
        <p className="text-muted-foreground md:text-xl">Complete study materials for BSE Odisha Board</p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center gap-4">
            <Book className="size-8 text-primary"/>
            <CardTitle className="text-2xl font-headline">Subjects for Class 10</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              {subjects.map((subject) => (
                <li key={subject}>{subject}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
