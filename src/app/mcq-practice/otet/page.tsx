
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookText, Calculator, FlaskConical, Languages, Lightbulb } from "lucide-react";
import Link from "next/link";

const otetTopics = [
    { name: "CDP", icon: Lightbulb, href: "/mcq-practice/otet/cdp" },
    { name: "Math Pedagogy", icon: Calculator, href: "/mcq-practice/otet/math-pedagogy" },
    { name: "Science Pedagogy", icon: FlaskConical, href: "/mcq-practice/otet/science-pedagogy" },
    { name: "English Pedagogy", icon: BookText, href: "/mcq-practice/otet/english-pedagogy" },
    { name: "Odia Pedagogy", icon: Languages, href: "/mcq-practice/otet/odia-pedagogy" },
    { name: "Math Content", icon: Calculator, href: "/mcq-practice/otet/math-content" },
    { name: "Science Content", icon: FlaskConical, href: "/mcq-practice/otet/science-content" },
];

export default function OtetPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">OTET MCQ Practice</h1>
        <p className="text-muted-foreground md:text-xl">Select a topic to start your practice.</p>
      </div>

      <div className="max-w-4xl mx-auto grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {otetTopics.map((topic) => (
          <Link key={topic.name} href={topic.href}>
            <Card className="bg-card hover:bg-primary hover:text-primary-foreground transition-colors h-full group">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-4">
                <topic.icon className="size-10 text-primary group-hover:text-primary-foreground transition-colors" />
                <span className="text-lg font-semibold">{topic.name}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
