
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ExamEnrollmentCard } from '@/components/exam-enrollment-card';

export default function AllIndiaTestsPage() {
  return (
    <section id="all-india-tests" className="w-full py-12 md:py-24 bg-card/5">
        <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl md:text-5xl">All India Level Test Series</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Join our weekly All-India test series for various competitive exams. Enroll now to benchmark your performance against peers nationwide.
                </p>
            </div>
            <div className="max-w-2xl mx-auto">
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-6 py-4 text-lg font-semibold">
                            Take This Week's Test
                        </AccordionTrigger>
                        <AccordionContent className="pt-6">
                            <ExamEnrollmentCard />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    </section>
  );
}
