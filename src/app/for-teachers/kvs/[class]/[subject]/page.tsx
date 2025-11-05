
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Book } from "lucide-react";

const unslugify = (slug: string) => slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

export default function SubjectPage({ params }: { params: { class: string, subject: string } }) {
    const className = unslugify(params.class);
    const subjectName = unslugify(params.subject);

    return (
        <div className="container mx-auto py-12 px-4 md:px-6">
            <div className="space-y-4 text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold font-headline">KVS Board - {className}</h1>
                <p className="text-muted-foreground md:text-xl">Subject Details</p>
            </div>
            
            <div className="max-w-2xl mx-auto">
                <Card className="bg-card">
                    <CardHeader className="flex flex-row items-center gap-4">
                        <Book className="size-8 text-primary"/>
                        <CardTitle className="text-2xl font-headline">{subjectName}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Content for the subject <span className="font-semibold">{subjectName}</span> for <span className="font-semibold">{className}</span> will be displayed here.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
