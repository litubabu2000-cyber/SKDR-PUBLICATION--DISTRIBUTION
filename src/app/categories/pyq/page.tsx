
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileQuestion } from "lucide-react";

const pyqBooks = [
    "CTET & OTET PYQs (Pedagogy + Subjects)",
    "Odisha TGT PYQs",
    "Odisha PGT PYQs",
    "NEET & JEE PYQs (Chapter-wise)",
    "RRB NTPC & Group D PYQs",
    "SSC PYQs (CGL/CHSL/MTS)",
    "OSSC PYQs"
];

export default function PyqPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">Previous Year Questions</h1>
        <p className="text-muted-foreground md:text-xl">Solved papers for major exams</p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center gap-4">
            <FileQuestion className="size-8 text-primary"/>
            <CardTitle className="text-2xl font-headline">PYQ (Previous Year Questions – Solved Papers)</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              {pyqBooks.map((book) => (
                <li key={book}>{book}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
