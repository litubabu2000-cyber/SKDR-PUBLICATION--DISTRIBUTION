
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";

const pgtBooks = [
    "PGT Physics",
    "PGT Chemistry",
    "PGT Mathematics",
    "PGT Biology",
    "PGT English",
    "PGT Odia",
    "PGT History, Geography, Political Science",
    "PGT Commerce (Accountancy, Business Studies, Economics)",
    "Education & Pedagogy",
    "PGT PYQ"
];

export default function PgtBooksPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">PGT Books</h1>
        <p className="text-muted-foreground md:text-xl">Post Graduate Teacher exam preparation materials</p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center gap-4">
            <User className="size-8 text-primary"/>
            <CardTitle className="text-2xl font-headline">PGT (Post Graduate Teacher)</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              {pgtBooks.map((book) => (
                <li key={book}>{book}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
