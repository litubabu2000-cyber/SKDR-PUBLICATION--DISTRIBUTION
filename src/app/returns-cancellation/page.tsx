
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReturnsCancellationPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold font-headline">Returns & Cancellation Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-lg text-muted-foreground">
          <p>
            We understand that sometimes mistakes happen — and we are always ready to help.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>If a book arrives damaged, we replace it.</li>
            <li>If the wrong book is delivered, we fix it immediately.</li>
            <li>You can cancel an order before it is dispatched.</li>
            <li>Refunds and replacements are handled in a smooth, friendly process.</li>
          </ul>
          <p>
            We treat our customers the way we would want to be treated.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
