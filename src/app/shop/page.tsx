import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import Image from 'next/image';
import { books } from '@/lib/data';
import { Button } from '@/components/ui/button';

export default function ShopPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="space-y-4 mb-8">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">
          Our Book Collection
        </h1>
        <p className="text-lg text-muted-foreground">
          Find your next adventure.
        </p>
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search by title, author, or genre..."
          className="w-full rounded-lg bg-card pl-10 h-12"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {books.map((book) => (
          <Card
            key={book.id}
            className="overflow-hidden flex flex-col group transition-shadow hover:shadow-lg"
          >
            <Image
              src={book.image.imageUrl}
              alt={`Cover of ${book.title}`}
              width={400}
              height={600}
              className="w-full object-cover aspect-[2/3] transition-transform group-hover:scale-105"
              data-ai-hint={book.image.imageHint}
            />
            <CardContent className="p-4 flex flex-col flex-1">
              <h3 className="text-lg font-bold font-headline leading-tight flex-1">
                {book.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                by {book.author}
              </p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-lg font-bold">${book.price.toFixed(2)}</span>
                <Button size="sm">Add to Cart</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
