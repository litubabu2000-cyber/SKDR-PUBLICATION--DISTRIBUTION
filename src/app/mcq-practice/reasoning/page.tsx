
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ListChecks } from "lucide-react";
import Link from "next/link";

const reasoningTopics = [
  { name: "Analogy or Similarity", href: "/mcq-practice/reasoning/analogy" },
  { name: "Blood Relationship", href: "/mcq-practice/reasoning/blood-relationship" },
  { name: "Symbols & Notations", href: "#" },
  { name: "Classification", href: "#" },
  { name: "Direction & Distance Test", href: "#" },
  { name: "Scheduled Day/Date/Time", href: "#" },
  { name: "Series", href: "#" },
  { name: "Coding-Decoding", href: "/mcq-practice/reasoning/coding-decoding" },
  { name: "Word Formation", href: "#" },
  { name: "Syllogism, Statement & Conclusions", href: "#" },
  { name: "Seating Arrangement", href: "/mcq-practice/reasoning/seating-arrangement" },
  { name: "Finding the Missing Number", href: "#" },
  { name: "Arithmetical Problems", href: "#" },
  { name: "Arrangement of Words in a Logical Order", href: "/mcq-practice/reasoning/dictionary-order" },
  { name: "Cubes and Dices", href: "#" },
  { name: "Logical Venn-Diagram", href: "#" },
  { name: "Miscellaneous", href: "#" },
  { name: "Verbal Series", href: "#" },
  { name: "Verbal Analogy", href: "#" },
  { name: "Verbal Classification", href: "#" },
  { name: "Mirror Image and Water Image", href: "#" },
  { name: "Paper Cutting, Folding & Punching", href: "#" },
  { name: "Completion of Figural Pattern", href: "#" },
  { name: "Embedded Figure", href: "#" },
];

export default function ReasoningPage() {
    return (
        <div className="container mx-auto py-12 px-4 md:px-6">
            <div className="space-y-4 text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold font-headline">Reasoning Topics</h1>
                <p className="text-muted-foreground md:text-xl">Common topics covered in various competitive exams</p>
            </div>
            <div className="max-w-4xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                           <ListChecks className="size-6 text-primary" />
                           <span>Reasoning Topic Breakdown</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                         {reasoningTopics.map((topic) => (
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
