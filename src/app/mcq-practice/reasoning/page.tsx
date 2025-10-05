import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReasoningPage() {
    return (
        <div className="container mx-auto py-12 px-4 md:px-6">
            <div className="space-y-4 text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold font-headline">Reasoning Topic Analysis</h1>
                <p className="text-muted-foreground md:text-xl">Breakdown of topics in various exams</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Reasoning Topics</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Reasoning topic data will be displayed here soon.</p>
                </CardContent>
            </Card>

        </div>
    )
}
