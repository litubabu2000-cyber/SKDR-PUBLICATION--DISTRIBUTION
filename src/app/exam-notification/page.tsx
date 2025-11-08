
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";

export default function ExamNotificationPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">Exam Notifications</h1>
        <p className="text-muted-foreground md:text-xl">Stay updated with the latest exam announcements.</p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center gap-4">
            <Bell className="size-8 text-primary"/>
            <CardTitle className="text-2xl font-headline">Latest Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">No new notifications at the moment. Please check back later.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
