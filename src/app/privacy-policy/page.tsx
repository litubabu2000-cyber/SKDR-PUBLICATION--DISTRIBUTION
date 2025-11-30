
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold font-headline">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-lg text-muted-foreground">
          <p>
            Your privacy matters. We only collect information necessary to provide our services, and we never share or sell your personal data to any third party. Your details remain safe with us — always.
          </p>
          <p>
            SKDR Publication is committed to maintaining secure and professional operational standards. We follow data-protection guidelines to ensure that your personal information, payment details, and order records are kept safe. Your trust is important to us, and we work hard every day to protect it.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
