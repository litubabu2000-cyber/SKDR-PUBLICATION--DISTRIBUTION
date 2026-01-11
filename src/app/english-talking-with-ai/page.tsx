
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic } from "lucide-react";

export default function EnglishTalkingWithAiPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">English Talking with AI</h1>
        <p className="text-muted-foreground md:text-xl">Practice your English speaking skills with our AI tutor.</p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <Card className="bg-card">
            <CardHeader className="flex flex-row items-center gap-4">
                <Mic className="size-8 text-primary"/>
                <CardTitle className="text-2xl font-headline">Start Conversation</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    The AI English speaking feature will be available here soon.
                </p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
