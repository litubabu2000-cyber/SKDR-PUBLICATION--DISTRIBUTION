
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gamepad2, Puzzle, Atom, Beaker, Heart, Activity, Droplet, Filter, Utensils, Lightbulb } from "lucide-react";
import Link from "next/link";

const games = [
  {
    title: "Digestive System Puzzle",
    description: "Learn the parts of the digestive system.",
    href: "/games/anatomy-puzzle?system=digestive",
    icon: Utensils
  },
  {
    title: "Respiratory System Puzzle",
    description: "Explore the human respiratory system.",
    href: "/games/anatomy-puzzle?system=respiratory",
    icon: Activity
  },
    {
    title: "Human Heart Puzzle",
    description: "Identify the chambers and vessels of the heart.",
    href: "/games/anatomy-puzzle?system=heart",
    icon: Heart
  },
    {
    title: "Excretory System Puzzle",
    description: "Discover the organs of the excretory system.",
    href: "/games/anatomy-puzzle?system=excretory",
    icon: Droplet
  },
    {
    title: "Kidney Anatomy Puzzle",
    description: "Learn the detailed structure of the kidney.",
    href: "/games/anatomy-puzzle?system=kidney",
    icon: Filter
  },
  {
    title: "Atom Visualizer",
    description: "An interactive 3D model of an atom.",
    href: "/games/atom-visualizer",
    icon: Atom
  },
  {
    title: "Ray Optics Lab",
    description: "Interactive mirror simulation.",
    href: "/games/ray-optics",
    icon: Lightbulb
  }
];

export default function GamesPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">Educational Games</h1>
        <p className="text-muted-foreground md:text-xl">Play and learn with our interactive games.</p>
      </div>
      
      <div className="max-w-4xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <Link key={game.href} href={game.href}>
            <Card className="bg-card hover:bg-card/80 transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 h-full">
                <CardHeader className="flex flex-row items-center gap-4">
                    <game.icon className="size-8 text-primary"/>
                    <CardTitle className="text-xl font-headline">{game.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground text-sm">
                        {game.description}
                    </p>
                </CardContent>
            </Card>
          </Link>
        ))}
         <Card className="bg-card border-dashed border-2">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                <Gamepad2 className="size-8 text-muted-foreground mb-2"/>
                <h3 className="text-xl font-headline text-muted-foreground">More Games Coming Soon!</h3>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}
