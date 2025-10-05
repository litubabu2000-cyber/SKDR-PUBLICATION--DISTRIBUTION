
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ListChecks } from "lucide-react";

const reasoningTopics = [
  "Analogy or Similarity",
  "Blood Relationship",
  "Symbols & Notations",
  "Classification",
  "Direction & Distance Test",
  "Scheduled Day/Date/Time",
  "Series",
  "Coding-Decoding",
  "Word Formation",
  "Syllogism, Statement & Conclusions",
  "Ranking/Arrangement",
  "Finding the Missing Number",
  "Arithmetical Problems",
  "Arrangement of Words in a Logical Order",
  "Cubes and Dices",
  "Logical Venn-Diagram",
  "Miscellaneous",
  "Verbal Series",
  "Verbal Analogy",
  "Verbal Classification",
  "Mirror Image and Water Image",
  "Paper Cutting, Folding & Punching",
  "Completion of Figural Pattern",
  "Embedded Figure",
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
                            <div key={topic} className="p-4 bg-card border rounded-lg text-center text-muted-foreground transition-all duration-300 ease-in-out hover:shadow-md hover:border-primary">
                                {topic}
                            </div>
                         ))}
                       </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
