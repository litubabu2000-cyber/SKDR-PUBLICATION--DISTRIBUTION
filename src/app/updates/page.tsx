import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { examUpdates } from '@/lib/data';

export default function UpdatesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-headline font-bold">
          Exam Updates
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          All the latest news and announcements about your exams.
        </p>
      </div>

      <div className="space-y-4">
        {examUpdates.map((update, index) => (
          <Card key={index} className="hover:bg-muted/50 transition-colors">
            <CardHeader>
              <CardTitle className="font-headline">{update.title}</CardTitle>
              <CardDescription>{update.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
