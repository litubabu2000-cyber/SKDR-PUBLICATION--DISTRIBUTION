
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, FlaskConical, Brain, LucideIcon } from "lucide-react";
import Link from "next/link";

type GameCategory = {
  title: string;
  icon: LucideIcon;
  href: string;
};

const gameCategories: GameCategory[] = [
  {
    title: "Math Games",
    icon: Calculator,
    href: "/games/kids-play/game/math",
  },
  {
    title: "Science Games",
    icon: FlaskConical,
    href: "/games/kids-play/game/science",
  },
  {
    title: "Logic Games",
    icon: Brain,
    href: "/games/kids-play/game/logic",
  },
];

export default function GameZonePage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">Game Zone</h1>
        <p className="text-muted-foreground md:text-xl">Play and learn with fun games.</p>
      </div>
      
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
        {gameCategories.map((game) => (
          <Link href={game.href} key={game.title}>
            <Card className="bg-card hover:bg-primary hover:text-primary-foreground transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 h-full group">
                <CardHeader className="flex flex-col items-center justify-center text-center gap-4 p-6">
                    <game.icon className="size-12 text-primary group-hover:text-primary-foreground transition-colors" />
                    <CardTitle className="text-xl font-headline">{game.title}</CardTitle>
                </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
