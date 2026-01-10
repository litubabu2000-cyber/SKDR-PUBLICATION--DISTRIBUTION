
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Newspaper } from "lucide-react";

export default function CurrentAffairsPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">Current Affairs Shorts</h1>
        <p className="text-muted-foreground md:text-xl">Stay updated with the latest news and events.</p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <Card className="bg-card">
            <CardHeader className="flex flex-row items-center gap-4">
                <Newspaper className="size-8 text-primary"/>
                <CardTitle className="text-2xl font-headline">Latest Updates</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    Content for Current Affairs Shorts will be displayed here.
                </p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
