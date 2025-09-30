
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book } from "lucide-react";

const schoolLevels = [
  { 
    title: "Class 6", 
    icon: Book,
    subjects: ["Odia Language & Literature", "English Grammar & Literature", "Mathematics", "General Science", "Social Science (History, Civics, Geography, Economics)", "Sanskrit / Computer (where applicable)"]
  },
  { 
    title: "Class 7", 
    icon: Book,
    subjects: ["(Same subjects as Class 6, higher level content)"]
  },
  { 
    title: "Class 8", 
    icon: Book,
    subjects: ["Odia", "English", "Mathematics", "Science", "Social Science", "Sanskrit / Computer"]
  },
  { 
    title: "Class 9", 
    icon: Book,
    subjects: ["Odia", "English", "Mathematics", "Science (Physics, Chemistry, Biology basics)", "Social Science (History, Civics, Geography, Economics)", "IT/Computer Science"]
  },
  { 
    title: "Class 10 (BSE Odisha Board – HSC)", 
    icon: Book,
    subjects: ["Odia", "English", "Mathematics", "General Science (Physics, Chemistry, Biology)", "Social Science", "Sanskrit / Hindi / Additional Subject"]
  },
];

export default function OdishaSchoolGuidePage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">Odisha School Guide</h1>
        <p className="text-muted-foreground md:text-xl">Complete study materials for Odisha Board – Classes 6–10</p>
      </div>
      
      <div className="grid gap-8">
        {schoolLevels.map((level) => (
          <Card key={level.title} className="bg-card">
            <CardHeader className="flex flex-row items-center gap-4">
              <level.icon className="size-8 text-primary"/>
              <CardTitle className="text-2xl font-headline">{level.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                {level.subjects.map((subject) => (
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
