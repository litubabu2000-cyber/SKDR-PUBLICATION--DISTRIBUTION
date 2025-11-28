
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FlaskConical } from "lucide-react";

export default function SciencePedagogyPage() {
    return (
        <div className="container mx-auto py-12 px-4 md:px-6">
            <div className="space-y-4 text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold font-headline">Science Pedagogy</h1>
                <p className="text-muted-foreground md:text-xl">Quiz for OTET</p>
            </div>
            
            <div className="max-w-2xl mx-auto">
                <Card className="bg-card">
                    <CardHeader className="flex flex-row items-center gap-4">
                        <FlaskConical className="size-8 text-primary"/>
                        <CardTitle className="text-2xl font-headline">Practice Quiz</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            The quiz for the topic <span className="font-semibold">Science Pedagogy</span> under the <span className="font-semibold">OTET</span> category will be displayed here.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
