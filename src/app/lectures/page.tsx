import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { lectures } from '@/lib/data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function LecturesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-headline font-bold">
          Video Lectures
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Learn from the best with our curated collection of video lectures.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lectures.map((lecture) => (
          <Card key={lecture.id} className="overflow-hidden group flex flex-col">
            <CardHeader className="p-0">
              <div className="relative w-full aspect-video">
                <Image
                  src={lecture.image.imageUrl}
                  alt={`Thumbnail for ${lecture.subject}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  data-ai-hint={lecture.image.imageHint}
                />
              </div>
            </CardHeader>
            <div className="p-6 flex-1 flex flex-col">
              <CardTitle className="font-headline text-2xl">{lecture.subject}</CardTitle>
              <CardDescription className="mt-2 flex-1">{lecture.description}</CardDescription>
            </div>
            <CardFooter className="p-6 pt-0">
              <Button asChild className="w-full">
                <Link href="#">
                  Explore Lectures <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
