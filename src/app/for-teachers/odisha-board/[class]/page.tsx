
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book } from "lucide-react";

// Placeholder data - we can customize this later
const getSubjectsForClass = (className: string) => {
    const classNumber = parseInt(className.replace('class-', ''), 10);
    if (classNumber >= 1 && classNumber <= 5) {
        return ["Odia", "English", "Mathematics", "Environmental Science"];
    }
    if (classNumber >= 6 && classNumber <= 8) {
        return ["Odia", "English", "Mathematics", "General Science", "Social Science", "Sanskrit/Hindi"];
    }
    if (classNumber === 9 || classNumber === 10) {
        return ["Odia", "English", "Mathematics", "Science (Physics, Chemistry, Biology)", "Social Science", "IT/Computer Science"];
    }
    if (classNumber === 11 || classNumber === 12) {
        return ["Physics", "Chemistry", "Mathematics", "Biology", "English", "Odia", "IT"];
    }
    return ["No subjects found for this class."];
};


export default function OdishaBoardClassPage({ params }: { params: { class: string } }) {
  const className = decodeURIComponent(params.class);
  const classTitle = className.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  const subjects = getSubjectsForClass(className);

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">Subjects for {classTitle} (Odisha Board)</h1>
        <p className="text-muted-foreground md:text-xl">Complete study materials for {classTitle}</p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center gap-4">
            <Book className="size-8 text-primary"/>
            <CardTitle className="text-2xl font-headline">Subject List</CardTitle>
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
