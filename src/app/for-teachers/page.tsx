
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Building, Train, PenTool, School, Users, LucideIcon } from "lucide-react";
import Link from "next/link";

type Board = {
  name: string;
  icon: LucideIcon;
  classes: { name: string, href: string }[];
};

const boards: Board[] = [
  {
    name: "Odisha Board",
    icon: Book,
    classes: [
      { name: "Class 1", href: "/for-teachers/odisha-board/class-1" },
      { name: "Class 2", href: "/for-teachers/odisha-board/class-2" },
      { name: "Class 3", href: "/for-teachers/odisha-board/class-3" },
      { name: "Class 4", href: "/for-teachers/odisha-board/class-4" },
      { name: "Class 5", href: "/for-teachers/odisha-board/class-5" },
      { name: "Class 6", href: "/for-teachers/odisha-board/class-6" },
      { name: "Class 7", href: "/for-teachers/odisha-board/class-7" },
      { name: "Class 8", href: "/for-teachers/odisha-board/class-8" },
      { name: "Class 9", href: "/for-teachers/odisha-board/class-9" },
      { name: "Class 10", href: "/for-teachers/odisha-board/class-10" },
      { name: "Class 11", href: "/for-teachers/odisha-board/class-11" },
      { name: "Class 12", href: "/for-teachers/odisha-board/class-12" },
    ],
  },
  {
    name: "KVS (Kendriya Vidyalaya Sangathan)",
    icon: School,
    classes: [
        { name: "Class 1", href: "/for-teachers/kvs/class-1" },
        { name: "Class 2", href: "/for-teachers/kvs/class-2" },
        { name: "Class 3", href: "/for-teachers/kvs/class-3" },
        { name: "Class 4", href: "/for-teachers/kvs/class-4" },
        { name: "Class 5", href: "/for-teachers/kvs/class-5" },
        { name: "Class 6", href: "/for-teachers/kvs/class-6" },
        { name: "Class 7", href: "/for-teachers/kvs/class-7" },
        { name: "Class 8", href: "/for-teachers/kvs/class-8" },
        { name: "Class 9", href: "/for-teachers/kvs/class-9" },
        { name: "Class 10", href: "/for-teachers/kvs/class-10" },
        { name: "Class 11", href: "/for-teachers/kvs/class-11" },
        { name: "Class 12", href: "/for-teachers/kvs/class-12" },
    ],
  },
];

const competitiveExams = [
  { name: "SSC", href: "/categories/ssc-books" },
  { name: "Railway", href: "/categories/railway-books" },
  { name: "OSSC", href: "/categories/ossc-books" },
  { name: "TGT", href: "/categories/tgt-books" },
  { name: "PGT", href: "/categories/pgt-books" },
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
        {boards.map((board) => (
            <Card key={board.name} className="bg-card shadow-lg">
                <CardHeader className="flex flex-row items-center gap-4">
                    <board.icon className="size-8 text-primary" />
                    <CardTitle className="text-2xl font-headline">{board.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {board.classes.map((item) => (
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
        
        <Card className="bg-card shadow-lg">
            <CardHeader className="flex flex-row items-center gap-4">
                <Users className="size-8 text-primary" />
                <CardTitle className="text-2xl font-headline">Competitive Exams</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {competitiveExams.map((item) => (
                        <Link key={item.href} href={item.href} className="group">
                            <div className="p-4 bg-background border rounded-lg text-center font-medium text-muted-foreground transition-all duration-300 ease-in-out hover:bg-primary hover:text-primary-foreground hover:shadow-md h-full flex items-center justify-center">
                                {item.name}
                            </div>
                        </Link>
                    ))}
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
