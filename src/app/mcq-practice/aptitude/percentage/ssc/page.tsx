
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Book } from "lucide-react";

export default function PercentageSscPage() {
    return (
        <div className="container mx-auto py-12 px-4 md:px-6">
            <div className="space-y-4 text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold font-headline">Percentage</h1>
                <p className="text-muted-foreground md:text-xl">Quiz for SSC</p>
            </div>
            
            <div className="max-w-2xl mx-auto">
                <Card className="bg-card">
                    <CardHeader className="flex flex-row items-center gap-4">
                        <Book className="size-8 text-primary"/>
                        <CardTitle className="text-2xl font-headline">Practice Quiz</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            The quiz for the topic <span className="font-semibold">Percentage</span> under the <span className="font-semibold">SSC</span> category will be displayed here.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
