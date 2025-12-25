
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToyBrick } from "lucide-react";

export default function KidsPlayPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">Kids Play</h1>
        <p className="text-muted-foreground md:text-xl">Fun and educational games for children.</p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center gap-4">
            <ToyBrick className="size-8 text-primary"/>
            <CardTitle className="text-2xl font-headline">Games for Kids</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Fun games for kids will be available here soon!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
