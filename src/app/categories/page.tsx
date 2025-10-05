
import { Card } from '@/components/ui/card';
import { BookCopy, GraduationCap, Rocket, Train, Building, PenTool, School, User, FileQuestion, LucideIcon } from 'lucide-react';
import Link from 'next/link';

type Category = {
  title: string;
  description: string;
  subtext: string;
  icon: LucideIcon;
  gradient: string;
  href: string;
};

const categories: Category[] = [
  { title: 'ODISHA SCHOOL GUIDE', description: 'Classes 6-10', subtext: 'Complete study materials for Odisha Board', icon: BookCopy, gradient: 'from-cyan-500 to-blue-500', href: '/categories/odisha-school-guide' },
  { title: 'ODISHA COLLEGE BOOKS', description: 'Classes 11-12', subtext: 'Higher secondary education materials', icon: GraduationCap, gradient: 'from-pink-500 to-purple-500', href: '/categories/odisha-college-books' },
  { title: 'NEET & JEE Guide', description: 'Entrance Exams', subtext: 'Medical & Engineering preparation', icon: Rocket, gradient: 'from-green-400 to-teal-500', href: '/categories/neet-jee-guide' },
  { title: 'Railway Books', description: 'RRB Exams', subtext: 'Complete railway exam preparation', icon: Train, gradient: 'from-red-500 to-orange-500', href: '/categories/railway-books' },
  { title: 'SSC Books', description: 'Staff Selection', subtext: 'SSC exam preparation materials', icon: Building, gradient: 'from-blue-500 to-indigo-500', href: '/categories/ssc-books' },
  { title: 'OSSC Books', description: 'Odisha SSC', subtext: 'Odisha state service exams', icon: PenTool, gradient: 'from-orange-400 to-yellow-500', href: '/categories/ossc-books' },
  { title: 'TGT Books', description: 'Trained Graduate Teacher', subtext: 'TGT exam preparation guide', icon: School, gradient: 'from-teal-400 to-green-500', href: '/categories/tgt-books' },
  { title: 'PGT Books', description: 'Post Graduate Teacher', subtext: 'PGT exam preparation materials', icon: User, gradient: 'from-purple-500 to-pink-500', href: '/categories/pgt-books' },
  { title: 'Previous Year Questions', description: 'Solved Papers', subtext: 'PYQ collections for major exams', icon: FileQuestion, gradient: 'from-indigo-500 to-blue-500', href: '/pyq' },
];

export default function CategoriesPage() {
  return (
    <section id="categories" className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl md:text-5xl">Choose Your Category</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Select from our comprehensive educational categories
                </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {categories.map((category, index) => (
                    <Link key={index} href={category.href} className="group">
                      <div className={`bg-gradient-to-br ${category.gradient} rounded-xl p-6 flex flex-col justify-between text-white transition-all duration-300 ease-in-out group-hover:shadow-2xl group-hover:-translate-y-2 h-full`}>
                          <div className="flex items-start space-x-4">
                             <category.icon className="size-10 transition-transform duration-300 group-hover:scale-110" />
                             <div>
                                  <h3 className="text-lg font-bold font-headline">{category.title}</h3>
                                  <p className="text-sm opacity-80">{category.description}</p>
                              </div>
                          </div>
                          <p className="text-sm opacity-80 mt-4">{category.subtext}</p>
                      </div>
                    </Link>
                ))}
            </div>
        </div>
    </section>
  );
}
