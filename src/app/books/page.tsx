import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import Image from 'next/image';
import { books } from '@/lib/data';
import { Badge } from '@/components/ui/badge';

export default function BooksPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-headline font-bold">
          Book Catalog
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Explore our extensive library of educational books.
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search by title, author, or subject..."
          className="w-full rounded-lg bg-card pl-10 h-12"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {books.map((book) => (
          <Card
            key={book.id}
            className="overflow-hidden flex flex-col group hover:shadow-lg transition-all"
          >
            <CardHeader className="p-0">
              <div className="relative w-full aspect-[3/4]">
                <Image
                  src={book.image.imageUrl}
                  alt={`Cover of ${book.title}`}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                  data-ai-hint={book.image.imageHint}
                />
              </div>
            </CardHeader>
            <CardContent className="p-4 flex flex-col flex-1">
              <Badge variant="secondary" className="w-fit mb-2">{book.subject}</Badge>
              <CardTitle className="text-base font-bold font-headline leading-tight flex-1">
                {book.title}
              </CardTitle>
              <CardDescription className="mt-1 text-sm">
                by {book.author}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
