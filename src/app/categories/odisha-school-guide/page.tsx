
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book } from "lucide-react";
import Link from "next/link";

const schoolLevels = [
  { 
    title: "Class 6", 
    href: "/categories/odisha-school-guide/class-6",
    description: "Study materials for Class 6"
  },
  { 
    title: "Class 7", 
    href: "/categories/odisha-school-guide/class-7",
    description: "Study materials for Class 7"
  },
  { 
    title: "Class 8", 
    href: "/categories/odisha-school-guide/class-8",
    description: "Study materials for Class 8"
  },
  { 
    title: "Class 9", 
    href: "/categories/odisha-school-guide/class-9",
    description: "Study materials for Class 9"
  },
  { 
    title: "Class 10 (HSC)", 
    href: "/categories/odisha-school-guide/class-10",
    description: "BSE Odisha Board Exam"
  },
];

export default function OdishaSchoolGuidePage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">Odisha School Guide</h1>
        <p className="text-muted-foreground md:text-xl">Complete study materials for Odisha Board – Classes 6–10</p>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
        {schoolLevels.map((level) => (
          <Link key={level.title} href={level.href}>
            <Card className="bg-card h-full transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
              <CardHeader className="flex-row items-center gap-4">
                <Book className="size-8 text-primary"/>
                <CardTitle>{level.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{level.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
