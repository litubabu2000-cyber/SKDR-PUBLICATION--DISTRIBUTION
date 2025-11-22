
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Puzzle } from "lucide-react";

export default function AlimentaryCanalPuzzlePage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">Alimentary Canal Puzzle</h1>
        <p className="text-muted-foreground md:text-xl">Drag and drop the labels to the correct parts of the digestive system.</p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center gap-4">
            <Puzzle className="size-8 text-primary"/>
            <CardTitle className="text-2xl font-headline">Puzzle Coming Soon!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This interactive puzzle is under construction. Please check back later!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
