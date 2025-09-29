import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  FileText,
  PlaySquare,
  ClipboardCheck,
  Target,
  Bell,
} from 'lucide-react';
import { examUpdates, weeklyTests } from '@/lib/data';
import { Badge } from '@/components/ui/badge';

const featureCards = [
  {
    title: 'Book Catalog',
    description: 'Find books by title, author, or subject.',
    href: '/books',
    icon: <BookOpen className="size-8 text-primary" />,
  },
  {
    title: 'Past Papers (PYQ)',
    description: 'Access previous years\' question papers.',
    href: '/pyqs',
    icon: <FileText className="size-8 text-primary" />,
  },
  {
    title: 'Video Lectures',
    description: 'Learn from expert-led video lectures.',
    href: '/lectures',
    icon: <PlaySquare className="size-8 text-primary" />,
  },
  {
    title: 'Mock Tests',
    description: 'Assess your knowledge with chapter-wise tests.',
    href: '/tests',
    icon: <ClipboardCheck className="size-8 text-primary" />,
  },
  {
    title: 'MCQ Practice',
    description: 'Sharpen your skills with topic-wise MCQs.',
    href: '/practice',
    icon: <Target className="size-8 text-primary" />,
  },
  {
    title: 'Exam Updates',
    description: 'Stay informed about the latest exam news.',
    href: '/updates',
    icon: <Bell className="size-8 text-primary" />,
  },
];

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="bg-card p-8 rounded-lg shadow-sm">
        <h1 className="font-headline text-4xl font-bold text-primary">
          Welcome to LearnScape
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Your comprehensive platform for academic excellence. Let's start
          learning!
        </p>
      </section>

      <section>
        <h2 className="font-headline text-3xl font-semibold mb-6">
          Explore Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureCards.map((feature) => (
            <Card
              key={feature.title}
              className="hover:shadow-md transition-shadow"
            >
              <CardHeader className="flex flex-row items-center gap-4">
                {feature.icon}
                <div>
                  <CardTitle className="font-headline">
                    {feature.title}
                  </CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Button asChild variant="secondary" className="w-full">
                  <Link href={feature.href}>
                    Go to {feature.title} <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section>
          <h2 className="font-headline text-3xl font-semibold mb-6">
            Latest Exam Updates
          </h2>
          <Card>
            <CardContent className="p-0">
              <ul className="divide-y">
                {examUpdates.slice(0, 4).map((update, index) => (
                  <li
                    key={index}
                    className="p-4 flex justify-between items-start hover:bg-muted/50"
                  >
                    <div>
                      <h3 className="font-semibold">{update.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {update.date}
                      </p>
                    </div>
                    <Button asChild variant="ghost" size="sm">
                      <Link href="/updates">
                        <ArrowRight className="size-4" />
                      </Link>
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="font-headline text-3xl font-semibold mb-6">
            Upcoming Weekly Tests
          </h2>
          <Card>
            <CardContent className="p-0">
              <ul className="divide-y">
                {weeklyTests.slice(0, 4).map((test) => (
                  <li
                    key={test.id}
                    className="p-4 flex justify-between items-start hover:bg-muted/50"
                  >
                    <div>
                      <h3 className="font-semibold">{test.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {test.date}
                      </p>
                    </div>
                    <Badge
                      variant={
                        test.type === 'All-India' ? 'default' : 'secondary'
                      }
                      className="capitalize"
                    >
                      {test.type}
                    </Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
