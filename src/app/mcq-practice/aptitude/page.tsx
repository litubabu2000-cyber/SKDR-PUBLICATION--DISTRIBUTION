
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain } from "lucide-react";
import Link from "next/link";

const aptitudeTopics = [
    { name: "Number System", href: "#" },
    { name: "Decimal Fractions", href: "#" },
    { name: "Indices and Surds", href: "#" },
    { name: "Simplification", href: "#" },
    { name: "Lowest Common Multiple & Highest Common Factor", href: "#" },
    { name: "Percentage", href: "#" },
    { name: "Profit & Loss", href: "#" },
    { name: "Discount", href: "#" },
    { name: "Ratio & Proportion", href: "#" },
    { name: "Partnership", href: "#" },
    { name: "Work & Time", href: "#" },
    { name: "Alligation", href: "#" },
    { name: "Pipe & Cistern", href: "#" },
    { name: "Simple Interest", href: "#" },
    { name: "Compound Interest", href: "#" },
    { name: "Problems Based on Age", href: "#" },
    { name: "Average", href: "#" },
    { name: "Speed, Time & Distance", href: "#" },
    { name: "Train", href: "#" },
    { name: "Boat & Stream", href: "#" },
    { name: "Mensuration", href: "#" },
    { name: "Algebra", href: "#" },
    { name: "Trigonometry", href: "#" },
    { name: "Co-ordinate Geometry", href: "#" },
    { name: "Geometry", href: "#" },
    { name: "Elementary Statistics / Probability", href: "#" },
    { name: "Data Interpretation", href: "#" },
    { name: "Miscellaneous", href: "#" },
];

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
                           <Link key={topic.name} href={topic.href}>
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
