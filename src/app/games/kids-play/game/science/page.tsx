
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FlaskConical } from "lucide-react";

export default function ScienceGamesPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">Science Games</h1>
        <p className="text-muted-foreground md:text-xl">Explore the world of science with these games.</p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center gap-4">
            <FlaskConical className="size-8 text-primary"/>
            <CardTitle className="text-2xl font-headline">Coming Soon!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Science games are under construction. Check back soon!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
