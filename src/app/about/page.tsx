import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="grid gap-10 lg:grid-cols-2 items-center">
        <div className="space-y-4">
          <Badge>About Us</Badge>
          <h1 className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl md:text-6xl">
            For the Love of Reading
          </h1>
          <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Page Turner was founded by a group of passionate readers who
            wanted to create a space where book lovers could discover
            new stories and connect with fellow enthusiasts. We believe in
            the power of books to inspire, educate, and transform lives. Our mission is to make literature accessible to everyone, everywhere.
          </p>
           <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            We curate our collection with care, ensuring a diverse range of genres and authors. From timeless classics to contemporary bestsellers, there's something for every reader at Page Turner.
          </p>
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
  )
}
