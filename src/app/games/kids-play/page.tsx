
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToyBrick, SpellCheck, CaseUpper, Hash, HelpCircle, Puzzle, Gamepad2, LucideIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type KidGame = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

const kidsGames: KidGame[] = [
    {
        title: "Word Power",
        description: "Learn new words!",
        href: "/games/kids-play/word-power",
        icon: SpellCheck
    },
    {
        title: "Alphabet",
        description: "Master the ABCs",
        href: "/games/kids-play/alphabet",
        icon: CaseUpper
    },
    {
        title: "Number Fun",
        description: "Count and play",
        href: "/games/kids-play/number",
        icon: Hash
    },
    {
        title: "Quiz Time",
        description: "Test your knowledge",
        href: "/games/kids-play/quiz",
        icon: HelpCircle
    },
    {
        title: "Puzzles",
        description: "Solve fun puzzles",
        href: "/games/kids-play/puzzle",
        icon: Puzzle
    },
    {
        title: "Games",
        description: "Play and learn",
        href: "/games/kids-play/game",
        icon: Gamepad2
    },
]

export default function KidsPlayPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">Kids Play Zone</h1>
        <p className="text-muted-foreground md:text-xl">Fun and educational games for children.</p>
      </div>
      
      <Card className="max-w-4xl mx-auto overflow-hidden">
        <CardContent className="p-0">
          <Image
            src="https://storage.googleapis.com/app-prototyper.appspot.com/a7c067a9-83a3-455b-80a5-f8601620a229.png"
            alt="Kids playing with cartoon characters"
            width={1024}
            height={400}
            className="w-full h-auto object-cover"
            data-ai-hint="cartoon kids"
          />
        </CardContent>
        <CardHeader className="p-6">
           <div className="grid grid-cols-3 gap-4">
            {kidsGames.map((game) => (
                <Link href={game.href} key={game.title}>
                    <Card className="bg-card hover:bg-card/80 transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 h-full">
                        <CardHeader className="flex flex-col items-center justify-center text-center gap-2 p-4">
                            <game.icon className="size-6 text-primary"/>
                            <CardTitle className="text-xs font-headline">{game.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0 text-center">
                            <p className="text-muted-foreground text-[10px]">
                                {game.description}
                            </p>
                        </CardContent>
                    </Card>
                </Link>
            ))}
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
