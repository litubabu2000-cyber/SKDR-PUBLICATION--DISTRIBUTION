
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, PlayCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const videoHub = [
  { title: 'Odisha School Guide', image: 'https://picsum.photos/seed/osg-video/600/400', hint: 'education classroom' },
  { title: 'Odisha College Books', image: 'https://picsum.photos/seed/ocb-video/600/400', hint: 'college lecture' },
  { title: 'NEET & JEE Preparation', image: 'https://picsum.photos/seed/neet-jee-video/600/400', hint: 'science lab' },
  { title: 'Competitive Exam Videos', image: 'https://picsum.photos/seed/cex-video/600/400', hint: 'exam hall' },
  { title: 'Mathematics Masterclass', image: 'https://picsum.photos/seed/math-video/600/400', hint: 'math blackboard' },
  { title: 'Science Lab Experiments', image: 'https://picsum.photos/seed/lab-video/600/400', hint: 'chemistry experiment' },
];

export default function VideoHubPage() {
  return (
    <section id="video-hub" className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl md:text-5xl">Video Learning Hub</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Interactive video content for enhanced learning experience
            </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videoHub.map((video) => (
            <Card key={video.title} className="overflow-hidden group transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2">
              <div className="relative">
                <Image
                  src={video.image}
                  width={600}
                  height={400}
                  alt={video.title}
                  className="w-full aspect-video object-cover transition-transform group-hover:scale-105"
                  data-ai-hint={video.hint}
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <PlayCircle className="size-16 text-white/80 transform transition-transform duration-300 group-hover:scale-110" />
                </div>
                 <div className="absolute top-2 left-2 bg-destructive text-destructive-foreground px-2 py-1 text-xs font-bold rounded">LIVE</div>
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-bold font-headline">{video.title}</h3>
                <Button variant="link" className="px-0">Watch Now <ArrowRight className="ml-2 size-4" /></Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
