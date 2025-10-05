
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ExamEnrollmentCard } from '@/components/exam-enrollment-card';

export default function StateLevelTestsPage() {
  return (
    <section id="state-level-tests" className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl md:text-5xl">State Level Test Series</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Prepare for state-specific exams with our targeted weekly test series. Enroll to improve your chances of success.
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
