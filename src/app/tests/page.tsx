import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockTests, weeklyTests } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy } from 'lucide-react';

export default function TestsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-headline font-bold">Tests</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Challenge yourself and track your progress.
        </p>
      </div>
      <Tabs defaultValue="mock-tests">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="mock-tests" className="font-headline">
            Chapter-wise Mock Tests
          </TabsTrigger>
          <TabsTrigger value="weekly-tests" className="font-headline">
            Weekly Tests
          </TabsTrigger>
        </TabsList>
        <TabsContent value="mock-tests" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Mock Tests</CardTitle>
              <CardDescription>
                Test your understanding of each chapter.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {mockTests.map((test) => (
                  <li
                    key={test.id}
                    className="flex justify-between items-center p-4 rounded-lg border bg-background hover:bg-muted"
                  >
                    <div>
                      <h3 className="font-semibold">{test.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {test.questions} Questions
                      </p>
                    </div>
                    <Button>Start Test</Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="weekly-tests" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Weekly Tests</CardTitle>
              <CardDescription>
                Compete with students across India and your state.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {weeklyTests.map((test) => (
                  <li
                    key={test.id}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 rounded-lg border bg-background hover:bg-muted"
                  >
                    <div>
                      <h3 className="font-semibold">{test.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Scheduled for: {test.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          test.type === 'All-India' ? 'default' : 'secondary'
                        }
                      >
                        {test.type}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Trophy className="mr-2 h-4 w-4" />
                        Leaderboard
                      </Button>
                      <Button>Take Test</Button>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
