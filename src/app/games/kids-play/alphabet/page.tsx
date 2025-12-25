
import { Card, CardContent } from "@/components/ui/card";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

export default function AlphabetPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-bold font-headline text-primary">Alphabet Fun</h1>
        <p className="text-muted-foreground md:text-xl">Click on a letter to learn!</p>
      </div>
      
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 max-w-4xl mx-auto">
        {alphabet.map((letter) => (
          <Card 
            key={letter}
            className="aspect-square flex items-center justify-center bg-card hover:bg-primary hover:text-primary-foreground transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 cursor-pointer group"
          >
            <CardContent className="p-0">
              <span className="text-5xl md:text-7xl font-bold font-headline transition-transform group-hover:scale-110">
                {letter}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
