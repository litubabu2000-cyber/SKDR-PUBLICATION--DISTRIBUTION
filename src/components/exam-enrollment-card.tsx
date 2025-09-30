
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useState, useTransition, useEffect } from 'react';
import { Progress } from './ui/progress';
import { CheckCircle, Award, BarChart2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
});

type ExamState = 'selecting-exam' | 'idle' | 'enrolled' | 'in-progress' | 'completed';

const availableExams = [
    'Banking (PO, Clerk)',
    'SSC (CGL, CHSL)',
    'Railways (NTPC, Gr-D)',
    'UPSC & State PSC',
    'Class 10 (Odisha Board)',
    'Class 12 (CHSE)',
    'NEET (Medical)',
    'JEE (Engineering)',
];

export function ExamEnrollmentCard() {
  const [examState, setExamState] = useState<ExamState>('selecting-exam');
  const [selectedExam, setSelectedExam] = useState<string>('');
  const [isPending, startTransition] = useTransition();
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (examState === 'in-progress') {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            startTransition(() => {
              setScore(Math.floor(Math.random() * 41) + 60);
              setExamState('completed');
              setProgress(100);
            });
            return 90;
          }
          return prev + 10;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [examState, startTransition]);

  function handleExamSelect() {
      if(selectedExam) {
          setExamState('idle');
      }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setExamState('enrolled');
  }

  function startExam() {
    setExamState('in-progress');
    setProgress(0);
  }

  function resetExam() {
    setExamState('selecting-exam');
    setSelectedExam('');
    setProgress(0);
    setScore(0);
    form.reset();
  }

  return (
    <Card className="max-w-2xl mx-auto">
      {examState === 'selecting-exam' && (
        <>
            <CardHeader>
                <CardTitle>Select Your Exam</CardTitle>
                <CardDescription>
                Choose the exam you want to take this week.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Select onValueChange={setSelectedExam} value={selectedExam}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select an exam..." />
                    </SelectTrigger>
                    <SelectContent>
                        {availableExams.map((exam) => (
                            <SelectItem key={exam} value={exam}>
                                {exam}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Button onClick={handleExamSelect} className="w-full" disabled={!selectedExam}>
                    Select Exam
                </Button>
            </CardContent>
        </>
      )}

      {examState === 'idle' && (
        <>
          <CardHeader>
            <CardTitle>Enroll for {selectedExam}</CardTitle>
            <CardDescription>
              Enter your details below to begin your exam.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john.doe@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <div className="flex gap-2">
                    <Button onClick={() => setExamState('selecting-exam')} variant="outline" className="w-1/3">Back</Button>
                    <Button type="submit" className="w-2/3">
                    Enroll Now
                    </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </>
      )}

      {examState === 'enrolled' && (
        <CardContent className="p-6 text-center">
          <CheckCircle className="mx-auto size-12 text-green-500 mb-4" />
          <h3 className="text-2xl font-bold">You are Enrolled!</h3>
          <p className="text-muted-foreground mb-6">
            You are ready to start the {selectedExam} exam. Good luck!
          </p>
          <Button onClick={startExam} className="w-full">
            Start Exam
          </Button>
        </CardContent>
      )}

      {examState === 'in-progress' && (
        <CardContent className="p-6 text-center">
          <h3 className="text-2xl font-bold mb-4">Exam in Progress...</h3>
          <p className="text-muted-foreground mb-6">
            Please wait while we calculate your results for the {selectedExam} exam.
          </p>
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-muted-foreground mt-2">{progress}%</p>
        </CardContent>
      )}

      {examState === 'completed' && (
        <CardContent className="p-6">
          <CardHeader className="text-center p-0 mb-6">
            <Award className="mx-auto size-12 text-primary mb-4" />
            <CardTitle>Exam Completed!</CardTitle>
            <CardDescription>Here is your result for the {selectedExam} exam.</CardDescription>
          </CardHeader>
          <div className="bg-primary/10 rounded-lg p-6 text-center mb-6">
            <p className="text-sm text-primary font-semibold">YOUR SCORE</p>
            <p className="text-6xl font-bold text-primary">{score}%</p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm mb-6">
            <div className="flex items-center gap-2">
                <BarChart2 className="size-5 text-muted-foreground" />
                <div>
                    <p className="font-semibold">Percentile</p>
                    <p className="text-muted-foreground">85th</p>
                </div>
            </div>
             <div className="flex items-center gap-2">
                <CheckCircle className="size-5 text-muted-foreground" />
                <div>
                    <p className="font-semibold">Accuracy</p>
                    <p className="text-muted-foreground">92%</p>
                </div>
            </div>
          </div>
          <Button onClick={resetExam} className="w-full" variant="outline">
            Take Another Test
          </Button>
        </CardContent>
      )}
    </Card>
  );
}
