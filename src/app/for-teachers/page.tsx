
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ForTeachersPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">For Teachers</h1>
        <p className="text-muted-foreground md:text-xl">Resources and tools for educators.</p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Teacher Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Welcome to the teacher's section. More content and tools will be available here soon.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
