
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Building, Train, PenTool, School, Users, LucideIcon } from "lucide-react";
import Link from "next/link";

type ResourceItem = {
  name: string;
  href: string;
};

type ResourceCategory = {
  title: string;
  icon: LucideIcon;
  items: ResourceItem[];
};

const teacherResources: ResourceCategory[] = [
  {
    title: "Odisha Board",
    icon: Book,
    items: Array.from({ length: 12 }, (_, i) => ({
      name: `Class ${i + 1}`,
      href: `/for-teachers/odisha-board/class-${i + 1}`,
    })),
  },
  {
    title: "KVS (Kendriya Vidyalaya Sangathan)",
    icon: School,
    items: Array.from({ length: 12 }, (_, i) => ({
      name: `Class ${i + 1}`,
      href: `/for-teachers/kvs/class-${i + 1}`,
    })),
  },
  {
    title: "Competitive Exams",
    icon: Users,
    items: [
      { name: "SSC", href: "/categories/ssc-books" },
      { name: "Railway", href: "/categories/railway-books" },
      { name: "OSSC", href: "/categories/ossc-books" },
      { name: "TGT", href: "/categories/tgt-books" },
      { name: "PGT", href: "/categories/pgt-books" },
    ],
  },
];

export default function ForTeachersPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">For Teachers</h1>
        <p className="text-muted-foreground md:text-xl">
          Browse resources, guides, and materials tailored for educators.
        </p>
      </div>

      <div className="space-y-12">
        {teacherResources.map((category) => (
          <Card key={category.title} className="bg-card shadow-lg">
            <CardHeader className="flex flex-row items-center gap-4">
              <category.icon className="size-8 text-primary" />
              <CardTitle className="text-2xl font-headline">{category.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {category.items.map((item) => (
                  <Link key={item.href} href={item.href} className="group">
                    <div className="p-4 bg-background border rounded-lg text-center font-medium text-muted-foreground transition-all duration-300 ease-in-out hover:bg-primary hover:text-primary-foreground hover:shadow-md h-full flex items-center justify-center">
                      {item.name}
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
