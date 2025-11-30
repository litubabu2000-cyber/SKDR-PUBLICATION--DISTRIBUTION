
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CustomerSupportPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold font-headline">❤️ Customer Support That Cares</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-lg text-muted-foreground">
          <p>
            If you ever feel confused, stuck, or unsure — just reach out. We are here to help you with your orders, questions, or book requests.
          </p>
          <ul className="space-y-2">
            <li><strong>Email:</strong> <a href="mailto:support@skdrpublication.com" className="text-primary hover:underline">support@skdrpublication.com</a></li>
            <li><strong>Phone:</strong> +91-XXXXXXXXXX</li>
            <li><strong>WhatsApp:</strong> +91-XXXXXXXXXX</li>
            <li><strong>Working Hours:</strong> Mon – Sat, 10:00 AM – 6:00 PM (IST)</li>
          </ul>
          <p>
            We respond with patience and warmth — the same way we expect others to support us.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
