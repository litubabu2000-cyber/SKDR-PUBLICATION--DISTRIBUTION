
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ShippingOptionsPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold font-headline">Shipping Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-lg text-muted-foreground">
          <p>
            We deliver books all across India with reliable and timely services. Every order is packed neatly and dispatched with care.
          </p>
          <p>You can choose:</p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Standard Delivery:</strong> Safe and economical.</li>
            <li><strong>Express / Fast Delivery:</strong> For urgent orders, available in select cities.</li>
            <li><strong>Cash on Delivery:</strong> Available for certain locations.</li>
          </ul>
          <p>
            We know how important every book is — especially for a student preparing for an exam — so we make sure your package reaches you safely.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
