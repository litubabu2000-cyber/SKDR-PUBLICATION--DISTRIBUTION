'use client';
import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { mcqTopics } from '@/lib/data';
import { Label } from '@/components/ui/label';

export default function PracticePage() {
  const [subject, setSubject] = React.useState<string>('');
  const [topic, setTopic] = React.useState<string>('');
  const subjects = Object.keys(mcqTopics);
  const topics = subject ? mcqTopics[subject as keyof typeof mcqTopics] : [];

  const handleSubjectChange = (value: string) => {
    setSubject(value);
    setTopic('');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-headline font-bold">
          Topic-wise MCQ Practice
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Select a subject and topic to start your practice session.
        </p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline">
            Create Your Practice Session
          </CardTitle>
          <CardDescription>
            Focus your learning on specific areas to improve your skills.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="subject-select">Subject</Label>
            <Select value={subject} onValueChange={handleSubjectChange}>
              <SelectTrigger id="subject-select">
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="topic-select">Topic</Label>
            <Select
              value={topic}
              onValueChange={setTopic}
              disabled={!subject}
            >
              <SelectTrigger id="topic-select">
                <SelectValue placeholder="Select a topic" />
              </SelectTrigger>
              <SelectContent>
                {topics.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            className="w-full"
            disabled={!subject || !topic}
          >
            Start Practice Session
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
