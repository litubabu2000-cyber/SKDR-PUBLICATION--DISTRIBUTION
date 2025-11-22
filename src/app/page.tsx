
'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowRight, BookCopy, BookOpen, ChevronDown, ChevronRight, FileQuestion, GraduationCap, Laptop, PlayCircle, ShieldCheck, Star, Target, LucideIcon, Train, Building, Banknote, User, PenTool, School, Users, BarChart, LayoutGrid, Globe, Landmark, Languages, Eraser, Bell, Gamepad2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";


const quickLinks = [
  { href: '/categories', label: 'CHOOSE YOUR BOOK CATEGORY', icon: LayoutGrid },
  { href: '/video-hub', label: 'VIDEO LEARNING HUB', icon: PlayCircle },
  { href: '/pyq', label: 'PREVIOUS YEAR QUESTION PAPERS', icon: FileQuestion },
  { href: '/mock-tests', label: 'MOCK TEST SERIES', icon: Laptop },
  { href: '/mcq-practice', label: 'SUBJECT-WISE MCQ PRACTICE', icon: Target },
  { href: '/all-india-tests', label: 'ALL INDIA TESTS', icon: Globe },
  { href: '/state-level-tests', label: 'STATE LEVEL TESTS', icon: Landmark },
  { href: '/translator', label: 'TRANSLATOR', icon: Languages },
  { href: '/pdf-watermark-remover', label: 'PDF WATERMARK REMOVER', icon: Eraser },
  { href: '/for-teachers', label: 'FOR TEACHER', icon: Users },
  { href: '/exam-notification', label: 'EXAM NOTIFICATION', icon: Bell },
  { href: '/games', label: 'GAMES', icon: Gamepad2 },
];

export default function Home() {

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  )

  const galleryImages = PlaceHolderImages.filter(img => img.id.startsWith('gallery-'));


  return (
    <div className="flex flex-col min-h-[100dvh] bg-background">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                 <Carousel
                  plugins={[plugin.current]}
                  className="w-full"
                  onMouseEnter={plugin.current.stop}
                  onMouseLeave={plugin.current.reset}
                >
                  <CarouselContent>
                    {galleryImages.map((image) => (
                      <CarouselItem key={image.id}>
                        <div className="overflow-hidden rounded-xl">
                          <Image
                            src={image.imageUrl}
                            alt={image.description}
                            width={1280}
                            height={720}
                            className="aspect-[16/9] w-full object-cover"
                            data-ai-hint={image.imageHint}
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
                {quickLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="bg-card p-4 rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center text-center"
                  >
                    <link.icon className="size-8 mb-2" />
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="bg-foreground text-background">
        <div className="container px-4 md:px-6 py-12">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2 col-span-full lg:col-span-1">
                    <h3 className="text-2xl font-bold font-headline">SKDR Publication</h3>
                    <p className="text-sm text-background/70">
                        Your trusted partner for competitive exam preparation. We provide comprehensive study materials and practice tests for various government exams.
                    </p>
                </div>
                 <div className="space-y-2">
                    <h4 className="font-semibold">Quick Links</h4>
                    <ul className="space-y-1 text-sm text-background/70">
                        <li><Link href="/" className="hover:text-background">Home</Link></li>
                        <li><Link href="/categories" className="hover:text-background">Class Books</Link></li>
                        <li><Link href="/categories/railway-books" className="hover:text-background">Railway Exams</Link></li>
                        <li><Link href="/categories/ssc-books" className="hover:text-background">SSC Exams</Link></li>
                        <li><Link href="/categories/ossc-books" className="hover:text-background">OSSC Exams</Link></li>
                        <li><Link href="/categories/tgt-books" className="hover:text-background">TGT/PGT Exams</Link></li>
                        <li><Link href="/admin/login" className="hover:text-background">Admin Login</Link></li>
                    </ul>
                </div>
                 <div className="space-y-2">
                    <h4 className="font-semibold">Study Materials</h4>
                    <ul className="space-y-1 text-sm text-background/70">
                        <li><Link href="/pyq" className="hover:text-background">Previous Year Papers</Link></li>
                        <li><Link href="/mock-tests" className="hover:text-background">Mock Tests</Link></li>
                        <li><Link href="/video-hub" className="hover:text-background">Video Lectures</Link></li>
                        <li><Link href="#" className="hovertext-background">Practice Books</Link></li>
                        <li><Link href="#" className="hover:text-background">Online Courses</Link></li>
                    </ul>
                </div>
                 <div className="space-y-2">
                    <h4 className="font-semibold">Stay Updated</h4>
                     <p className="text-sm text-background/70">Subscribe to our newsletter for book recommendations and exclusive offers.</p>
                     <div className="flex">
                        <Input type="email" placeholder="Enter your email" className="bg-background/20 border-0 rounded-r-none" />
                        <Button type="submit" className="rounded-l-none">Subscribe</Button>
                     </div>
                </div>
            </div>
             <div className="mt-12 border-t border-background/20 pt-8 text-sm text-background/70">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                     <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-center sm:text-left">
                        <span>123 Book Street, Reading City, RC 12345</span>
                        <span>(555) 123-BOOK</span>
                        <span>theskdrpublication@gmail.com</span>
                    </div>
                    <p className="text-center sm:text-right">© {new Date().getFullYear()} SKDR Publication. All rights reserved.</p>
                </div>
             </div>
        </div>
      </footer>
    </div>
  );
}
