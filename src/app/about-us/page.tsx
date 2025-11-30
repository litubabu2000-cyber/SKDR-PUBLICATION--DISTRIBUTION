
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutUsPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold font-headline">🌟 About SKDR Publication</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8 text-lg">
          <section>
            <h2 className="text-2xl font-semibold font-headline mb-4">Our Dream</h2>
            <p className="text-muted-foreground">
              SKDR Publication was created with one simple dream — to make learning easier for every student, no matter where they come from. We understand that students often struggle not because they lack ability, but because they lack the right guidance, the right explanation, and the right kind of support.
            </p>
            <p className="text-muted-foreground mt-4">
              That is why every book we publish carries three promises: <strong>clarity</strong>, <strong>accuracy</strong>, and <strong>care</strong>. Our content is written by educators who have spent years teaching in classrooms and coaching centres. We know what confuses students, where they get stuck, and what helps them understand instantly. Our aim is to stand beside the learner, like a trusted teacher in book form.
            </p>
            <p className="text-muted-foreground mt-4">
              At SKDR Publication, every chapter, example, diagram, and solution is prepared with the belief that good education is not about showing difficulty — it is about removing fear.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold font-headline mb-4">Why Choose SKDR Publication?</h2>
            <p className="text-muted-foreground mb-4">
              Students choose us because they feel the difference in our books. We work hard to ensure that our material is not just informative but also supportive and student-friendly. Here’s what makes us different:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li><strong>Simple Language:</strong> Our books speak to students in a natural, easy-to-understand voice.</li>
              <li><strong>Updated Content:</strong> We regularly revise our books to match the latest syllabus and exam patterns.</li>
              <li><strong>Concept Clarity:</strong> We explain ideas step-by-step so that even tough topics feel manageable.</li>
              <li><strong>Affordable Pricing:</strong> Quality should not be expensive — our books are accessible to all.</li>
              <li><strong>Trusted by Teachers:</strong> Many schools and coaching centres rely on our material for daily teaching.</li>
              <li><strong>Dedicated Support:</strong> If a student is confused, we help. If a parent asks, we respond. Education is not a business for us. It is a responsibility.</li>
            </ul>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
