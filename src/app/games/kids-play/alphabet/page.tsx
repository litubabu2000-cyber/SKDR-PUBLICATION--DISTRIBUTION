
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CaseUpper } from "lucide-react";

export default function AlphabetPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">Alphabet Practice</h1>
        <p className="text-muted-foreground md:text-xl">Practice writing the letters of the alphabet.</p>
      </div>

      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><CaseUpper /> Alphabet</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">This page is under construction.</p>
        </CardContent>
      </Card>
    </div>
  );
}
