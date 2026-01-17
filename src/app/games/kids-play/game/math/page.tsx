
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";
import Link from 'next/link';

const mathGames = [
    {
        title: "Addition Challenge",
        href: "/games/kids-play/game/math/addition",
        description: "Practice adding numbers."
    }
]

export default function MathGamesPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">Math Games</h1>
        <p className="text-muted-foreground md:text-xl">Fun games to improve your math skills.</p>
      </div>
      
      <div className="max-w-2xl mx-auto grid gap-6">
        {mathGames.map((game) => (
            <Link href={game.href} key={game.title}>
                 <Card className="bg-card hover:bg-primary/10 transition-colors">
                    <CardHeader className="flex flex-row items-center gap-4">
                        <Calculator className="size-8 text-primary"/>
                        <div>
                            <CardTitle className="text-2xl font-headline">{game.title}</CardTitle>
                            <p className="text-muted-foreground text-sm">{game.description}</p>
                        </div>
                    </CardHeader>
                </Card>
            </Link>
        ))}

        <Card className="border-dashed text-center">
            <CardContent className="p-6">
                <p className="text-muted-foreground">More math games coming soon!</p>
            </CardContent>
        </Card>

      </div>
    </div>
  );
}
