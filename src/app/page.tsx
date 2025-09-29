import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  ArrowRight,
  Book,
  Search,
  Star,
  ThumbsUp,
  Award,
} from 'lucide-react';
import { books } from '@/lib/data';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const featureCards = [
  {
    title: 'Wide Selection',
    description: 'Thousands of books across all genres.',
    icon: <Book className="size-8 text-primary" />,
  },
  {
    title: 'Best Prices',
    description: 'Competitive pricing on all our books.',
    icon: <ThumbsUp className="size-8 text-primary" />,
  },
  {
    title: 'Award Winners',
    description: 'Explore critically acclaimed and award-winning titles.',
    icon: <Award className="size-8 text-primary" />,
  },
];

const testimonials = [
  {
    name: 'Sarah J.',
    avatar: 'https://picsum.photos/seed/sarah/100/100',
    text: "Page Turner has an incredible selection! I found a rare book I've been looking for for ages. The checkout process was seamless and the book arrived in perfect condition.",
    rating: 5,
  },
  {
    name: 'Mike D.',
    avatar: 'https://picsum.photos/seed/mike/100/100',
    text: 'I love the featured books section. It helps me discover new authors and genres I might not have found otherwise. Highly recommended for all book lovers!',
    rating: 5,
  },
  {
    name: 'Chen L.',
    avatar: 'https://picsum.photos/seed/chen/100/100',
    text: 'A fantastic online bookstore with fair prices and quick shipping. The website is easy to navigate. I will definitely be a returning customer.',
    rating: 4,
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-muted/20">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Find Your Next Favorite Book
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Explore our vast collection of books, from bestsellers to
                    hidden gems. Your next reading adventure starts here.
                  </p>
                </div>
                <div className="w-full max-w-sm space-y-2">
                  <form className="flex space-x-2">
                    <Input
                      type="search"
                      placeholder="Search by title, author, or genre..."
                      className="max-w-lg flex-1"
                    />
                    <Button type="submit">
                      <Search className="mr-2 h-4 w-4" />
                      Search
                    </Button>
                  </form>
                </div>
              </div>
              <Image
                src="https://images.unsplash.com/photo-1524995767963-a78c9d494294?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxib29rc3RvcmV8ZW58MHx8fHwxNzU5MjU5MzYyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                data-ai-hint="bookstore interior"
              />
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">
                  Featured Books
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Handpicked selection of our most popular and highly-rated
                  books.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-6xl px-4 py-12">
              <Carousel
                opts={{
                  align: 'start',
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent>
                  {books.map((book) => (
                    <CarouselItem
                      key={book.id}
                      className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                    >
                      <div className="p-1 h-full">
                        <Card className="h-full flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
                          <Image
                            src={book.image.imageUrl}
                            alt={`Cover of ${book.title}`}
                            width={400}
                            height={600}
                            className="w-full object-cover aspect-[2/3]"
                            data-ai-hint={book.image.imageHint}
                          />
                          <CardContent className="p-4 flex-1 flex flex-col">
                            <h3 className="text-lg font-bold font-headline">
                              {book.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {book.author}
                            </p>
                            <div className="flex-1" />
                            <div className="flex items-center justify-between mt-4">
                              <span className="text-lg font-bold">
                                ${book.price.toFixed(2)}
                              </span>
                              <Button size="sm">Add to Cart</Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
            <div className="flex justify-center">
              <Button asChild>
                <Link href="/shop">
                  Explore All Books <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-muted/20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">
                  Why Choose Page Turner?
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We are more than just a bookstore. We are a community of
                  readers.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-3 mt-12">
              {featureCards.map((feature) => (
                <Card
                  key={feature.title}
                  className="hover:shadow-md transition-shadow text-center"
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="inline-block rounded-lg bg-primary/10 p-3">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold font-headline">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div className="space-y-4">
                <Badge>About Us</Badge>
                <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl md:text-5xl">
                  For the Love of Reading
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Page Turner was founded by a group of passionate readers who
                  wanted to create a space where book lovers could discover
                  new stories and connect with fellow enthusiasts. We believe in
                  the power of books to inspire, educate, and transform lives.
                </p>
                 <Button asChild variant="outline">
                    <Link href="/about">
                        Learn More <ArrowRight className="ml-2 size-4" />
                    </Link>
                 </Button>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="https://images.unsplash.com/photo-1532012197267-da84d127e765?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxib29rc3xlbnwwfHx8fDE3NTkyNTkzOTF8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  width="550"
                  height="550"
                  alt="About Us"
                  className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-full"
                  data-ai-hint="books stack"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-muted/20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">
                  What Our Readers Say
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We are proud to have a community of happy readers. Here's what
                  they have to say.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-3 mt-12">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.name} className="flex flex-col">
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-12 h-12 border">
                        <AvatarImage
                          src={testimonial.avatar}
                          alt={testimonial.name}
                        />
                        <AvatarFallback>
                          {testimonial.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold">
                          {testimonial.name}
                        </p>
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < testimonial.rating
                                  ? 'text-primary fill-primary'
                                  : 'text-muted-foreground'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="mt-4 text-muted-foreground flex-1">
                      "{testimonial.text}"
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-foreground text-background">
        <div className="container px-4 md:px-6 py-8 md:py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="space-y-2">
              <h3 className="text-lg font-bold font-headline">Page Turner</h3>
              <p className="text-sm text-background/70">
                Your next reading adventure.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Quick Links</h4>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/"
                    className="text-sm text-background/70 hover:text-background"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop"
                    className="text-sm text-background/70 hover:text-background"
                  >
                    Shop
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-sm text-background/70 hover:text-background"
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Customer Service</h4>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-background/70 hover:text-background"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-background/70 hover:text-background"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-background/70 hover:text-background"
                  >
                    Shipping & Returns
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Follow Us</h4>
              <div className="flex space-x-4">
                {/* Social links here */}
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-background/20 pt-4 text-center text-sm text-background/70">
            © {new Date().getFullYear()} Page Turner. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
