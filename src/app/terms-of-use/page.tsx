
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsOfUsePage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold font-headline">Terms of Use</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-lg text-muted-foreground">
          <p>
            Using our website or services means you agree to our guidelines, which are designed to make your shopping and learning experience smooth, safe, and transparent.
          </p>
           <p>
            All information provided on our website and books is meant to support learning. While we make every effort to ensure accuracy, we also continuously update our content to stay aligned with educational changes.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
