
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { School } from "lucide-react";

const tgtBooks = [
    "TGT Odia",
    "TGT English",
    "TGT Mathematics",
    "TGT Science (Physics, Chemistry, Biology)",
    "TGT Social Studies (History, Civics, Geography, Economics)",
    "Child Development & Pedagogy",
    "TGT PYQ (All Subjects)"
];

export default function TgtBooksPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">TGT Books</h1>
        <p className="text-muted-foreground md:text-xl">Trained Graduate Teacher exam preparation guide</p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center gap-4">
            <School className="size-8 text-primary"/>
            <CardTitle className="text-2xl font-headline">TGT (Trained Graduate Teacher)</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              {tgtBooks.map((book) => (
                <li key={book}>{book}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
