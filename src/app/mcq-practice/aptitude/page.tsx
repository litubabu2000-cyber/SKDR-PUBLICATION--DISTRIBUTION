
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain } from "lucide-react";
import Link from "next/link";

const aptitudeTopics = [
    { name: "Number System" },
    { name: "Decimal Fractions" },
    { name: "Indices and Surds" },
    { name: "Simplification" },
    { name: "Lowest Common Multiple & Highest Common Factor" },
    { name: "Percentage" },
    { name: "Profit & Loss" },
    { name: "Discount" },
    { name: "Ratio & Proportion" },
    { name: "Partnership" },
    { name: "Work & Time" },
    { name: "Alligation" },
    { name: "Pipe & Cistern" },
    { name: "Simple Interest" },
    { name: "Compound Interest" },
    { name: "Problems Based on Age" },
    { name: "Average" },
    { name: "Speed, Time & Distance" },
    { name: "Train" },
    { name: "Boat & Stream" },
    { name: "Mensuration" },
    { name: "Algebra" },
    { name: "Trigonometry" },
    { name: "Co-ordinate Geometry" },
    { name: "Geometry" },
    { name: "Elementary Statistics / Probability" },
    { name: "Data Interpretation" },
    { name: "Miscellaneous" },
];

const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export default function AptitudePage() {
    return (
        <div className="container mx-auto py-12 px-4 md:px-6">
            <div className="space-y-4 text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold font-headline">Aptitude Topics</h1>
                <p className="text-muted-foreground md:text-xl">Practice MCQs for various aptitude topics.</p>
            </div>
            <div className="max-w-4xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                           <Brain className="size-6 text-primary" />
                           <span>Aptitude Topic Breakdown</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                         {aptitudeTopics.map((topic) => (
                           <Link key={topic.name} href={`/mcq-practice/aptitude/${slugify(topic.name)}`}>
                            <div className="p-4 bg-card border rounded-lg text-center text-muted-foreground transition-all duration-300 ease-in-out hover:shadow-md hover:border-primary h-full flex items-center justify-center">
                                {topic.name}
                            </div>
                           </Link>
                         ))}
                       </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
