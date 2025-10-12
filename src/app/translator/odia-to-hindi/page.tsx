
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function OdiaToHindiPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">Odia to Hindi Translator</h1>
        <p className="text-muted-foreground md:text-xl">Translate your text from Odia to Hindi</p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Enter Odia Text</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea placeholder="Type or paste your text here..." className="min-h-[150px]" />
            <Button className="w-full">
              Translate <ArrowRight className="ml-2 size-4" />
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card mt-8">
          <CardHeader>
            <CardTitle>Hindi Translation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 border rounded-md min-h-[150px] bg-muted/50 text-muted-foreground">
                Translation will appear here...
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
