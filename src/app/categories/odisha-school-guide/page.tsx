
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const schoolLevels = [
  { 
    title: "Class 6", 
    value: "class-6",
    subjects: ["Odia Language & Literature", "English Grammar & Literature", "Mathematics", "General Science", "Social Science (History, Civics, Geography, Economics)", "Sanskrit / Computer (where applicable)"]
  },
  { 
    title: "Class 7", 
    value: "class-7",
    subjects: ["(Same subjects as Class 6, higher level content)"]
  },
  { 
    title: "Class 8", 
    value: "class-8",
    subjects: ["Odia", "English", "Mathematics", "Science", "Social Science", "Sanskrit / Computer"]
  },
  { 
    title: "Class 9", 
    value: "class-9",
    subjects: ["Odia", "English", "Mathematics", "Science (Physics, Chemistry, Biology basics)", "Social Science (History, Civics, Geography, Economics)", "IT/Computer Science"]
  },
  { 
    title: "Class 10 (BSE Odisha Board – HSC)", 
    value: "class-10",
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
      
      <div className="max-w-4xl mx-auto">
        <Accordion type="single" collapsible className="w-full space-y-4">
          {schoolLevels.map((level) => (
            <AccordionItem value={level.value} key={level.value} className="bg-card border-none rounded-xl shadow">
              <AccordionTrigger className="p-6 text-2xl font-headline hover:no-underline">
                <div className="flex items-center gap-4">
                  <Book className="size-8 text-primary"/>
                  <span>{level.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-6 pt-0">
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  {level.subjects.map((subject) => (
                    <li key={subject}>{subject}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
