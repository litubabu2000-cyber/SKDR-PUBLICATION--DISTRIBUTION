
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const translationPairs = [
  { from: "English", to: "Odia", href: "/translator/english-to-odia" },
  { from: "Odia", to: "English", href: "/translator/odia-to-english" },
  { from: "Hindi", to: "Odia", href: "/translator/hindi-to-odia" },
  { from: "Odia", to: "Hindi", href: "/translator/odia-to-hindi" },
  { from: "English", to: "Hindi", href: "/translator/english-to-hindi" },
  { from: "Hindi", to: "English", href: "/translator/hindi-to-english" },
];

export default function TranslatorPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">Translator</h1>
        <p className="text-muted-foreground md:text-xl">Select a language pair to start translating</p>
      </div>
      
      <div className="max-w-4xl mx-auto grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {translationPairs.map((pair) => (
          <Link key={pair.href} href={pair.href}>
            <Card className="bg-card hover:bg-card/80 transition-colors h-full">
              <CardContent className="p-6 flex items-center justify-center text-center">
                <div className="flex items-center gap-4 text-lg font-semibold">
                  <span>{pair.from}</span>
                  <ArrowRight className="size-5 text-primary" />
                  <span>{pair.to}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
