
import { Book } from "lucide-react";
import Link from "next/link";

const schoolLevels = [
  { 
    title: "Class 6", 
    href: "/categories/odisha-school-guide/class-6",
    description: "Study materials for Class 6",
    gradient: "from-cyan-500 to-blue-500",
  },
  { 
    title: "Class 7", 
    href: "/categories/odisha-school-guide/class-7",
    description: "Study materials for Class 7",
    gradient: "from-pink-500 to-purple-500",
  },
  { 
    title: "Class 8", 
    href: "/categories/odisha-school-guide/class-8",
    description: "Study materials for Class 8",
    gradient: "from-green-400 to-teal-500",
  },
  { 
    title: "Class 9", 
    href: "/categories/odisha-school-guide/class-9",
    description: "Study materials for Class 9",
    gradient: "from-red-500 to-orange-500",
  },
  { 
    title: "Class 10 (HSC)", 
    href: "/categories/odisha-school-guide/class-10",
    description: "BSE Odisha Board Exam",
    gradient: "from-blue-500 to-indigo-500",
  },
];

export default function OdishaSchoolGuidePage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">Odisha School Guide</h1>
        <p className="text-muted-foreground md:text-xl">Complete study materials for Odisha Board – Classes 6–10</p>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
        {schoolLevels.map((level) => (
          <Link key={level.title} href={level.href} className="group">
            <div className={`bg-gradient-to-br ${level.gradient} rounded-xl p-6 flex flex-col justify-between text-white transition-all duration-300 ease-in-out group-hover:shadow-2xl group-hover:-translate-y-2 h-full`}>
                <div className="flex items-start space-x-4">
                    <Book className="size-10 transition-transform duration-300 group-hover:scale-110" />
                    <div>
                        <h3 className="text-lg font-bold font-headline">{level.title}</h3>
                        <p className="text-sm opacity-80">{level.description}</p>
                    </div>
                </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
