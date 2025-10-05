import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const reasoningData = [
    { topic: "Analogy or Similarity", data: [7, 8, 9, 8, 9, 8, 9, 4, 6, 6, 6, 6, 7, 3] },
    { topic: "Blood Relationship", data: [1, 1, 1, 1, 1, 1, 2, 2, 1, 1, "—", "—", 1, 1] },
    { topic: "Symbols & Notations", data: [2, 3, 1, 1, 2, 1, 1, 2, 1, 2, 4, 1, 2, 2] },
    { topic: "Classification", data: [7, 6, 8, 7, 10, 6, 6, 7, 8, 6, 8, 6, 6, 3] },
    { topic: "Direction & Distance Test", data: [2, 2, 2, 2, 2, 2, 4, 3, 1, 2, 2, 2, 2, 1] },
    { topic: "Scheduled Day/Date/Time", data: ["—", 1, "—", "—", 1, "—", 1, 1, 1, "—", "—", "—", "—", "—"] },
    { topic: "Series", data: [6, 8, 7, 6, 6, 7, 5, 9, 5, 4, 2, 4, 4, 2] },
    { topic: "Coding-Decoding", data: [3, 2, 2, 2, 1, 2, 2, 4, 7, 2, 3, 2, 4, 1] },
    { topic: "Word Formation", data: [2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 3, 2, 3, 1] },
    { topic: "Syllogism, Statement & Conclusions", data: [2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 1] },
    { topic: "Ranking/Arrangement", data: [1, 2, 2, 1, 2, 1, 2, 1, 1, 2, "—", "—", "—", 1] },
    { topic: "Finding the Missing Number", data: [2, 2, 1, 1, 2, 1, 1, "—", 3, 4, 3, 3, 5, 1] },
    { topic: "Arithmetical Problems", data: [2, 1, 1, 1, 2, 1, 5, 4, 1, 1, 3, 5, "—", "—"] },
    { topic: "Arrangement of Words in a Logical Order", data: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1] },
    { topic: "Cubes and Dices", data: [1, 1, "—", 2, "—", 2, "—", "—", 3, 1, "—", "—", 1, "—"] },
    { topic: "Logical Venn-Diagram", data: [2, 2, 1, 2, 2, 2, 1, 1, 1, 3, 3, 3, 3, 1] },
    { topic: "Miscellaneous", data: [2, 2, 2, 2, 1, 2, 2, "—", 2, 2, 1, 4, 2, 2] },
    { topic: "Series (Non-verbal)", data: [1, "—", 1, 2, "—", 2, "—", 1, "—", "—", "—", "—", 1, "—"] },
    { topic: "Analogy (Non-verbal)", data: [1, "—", 1, 2, "—", 2, "—", 2, "—", "—", "—", "—", "—", "—"] },
    { topic: "Classification (Non-verbal)", data: ["—", "—", 1, 2, "—", 2, "—", 1, "—", "—", "—", "—", "—", "—"] },
    { topic: "Mirror Image and Water Image", data: [1, 1, 1, "—", 1, "—", 1, "—", 1, 2, 1, 2, 1, 1] },
    { topic: "Paper Cutting, Folding & Punching", data: [1, 1, 1, "—", 1, "—", 1, 1, 1, 2, 4, 2, 1, 1] },
    { topic: "Completion of Figural Pattern", data: [1, "—", 1, 1, "—", 1, 1, 1, 1, 2, 2, 2, 2, 1] },
    { topic: "Embedded Figure", data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1] },
    { topic: "Deviation of Figure", data: [] },
];

const examHeaders = ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10", "E11", "E12", "E13", "E14"];


export default function ReasoningPage() {
    return (
        <div className="container mx-auto py-12 px-4 md:px-6">
            <div className="space-y-4 text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold font-headline">Reasoning Topic Analysis</h1>
                <p className="text-muted-foreground md:text-xl">Breakdown of topics in various exams</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Reasoning Topics</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="font-bold">Sr. No.</TableHead>
                                <TableHead className="font-bold">Topic</TableHead>
                                {examHeaders.map(header => <TableHead key={header} className="text-center">{header}</TableHead>)}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {reasoningData.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{item.topic}</TableCell>
                                    {item.data.map((d, i) => <TableCell key={i} className="text-center">{d}</TableCell>)}
                                    {/* Fill remaining cells if data is not complete for a row */}
                                    {Array.from({ length: examHeaders.length - item.data.length }).map((_, i) => <TableCell key={i} className="text-center">—</TableCell>)}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

        </div>
    )
}
