import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { pyqs } from '@/lib/data';
import { Download } from 'lucide-react';
import Link from 'next/link';

export default function PYQsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-headline font-bold">
          Past Exam Papers (PYQ)
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Practice with question papers from previous years to ace your exams.
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full space-y-4">
        {pyqs.map((exam, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="bg-card rounded-lg border px-4"
          >
            <AccordionTrigger className="font-headline text-lg hover:no-underline">
              {exam.exam}
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2 pt-2">
                {exam.papers.map((paper) => (
                  <li
                    key={paper.year}
                    className="flex justify-between items-center p-3 rounded-md hover:bg-muted"
                  >
                    <span className="font-medium">{exam.exam} - {paper.year}</span>
                    <Button asChild variant="secondary" size="sm">
                      <Link href={paper.link}>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Link>
                    </Button>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
