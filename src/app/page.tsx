
'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowRight, BookCopy, BookOpen, ChevronDown, ChevronRight, FileQuestion, GraduationCap, Laptop, PlayCircle, ShieldCheck, Star, Target, LucideIcon, Train, Building, Banknote, User, PenTool, School, Users, BarChart, LayoutGrid, Globe, Landmark, Languages, Eraser, Bell, Gamepad2, ToyBrick, ListChecks, Newspaper, Speech } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const quickLinks = [
  { href: '/games/kids-play', label: 'KIDS PLAY', icon: ToyBrick },
  { href: '/categories', label: 'BUY SKDR BOOKS', icon: LayoutGrid },
  { href: '/current-affairs', label: 'CURRENT AFFAIRS SHORTS', icon: Newspaper },
  { href: '/english-talking-with-ai', label: 'ENGLISH TALKING WITH AI', icon: Speech },
  { href: '/video-hub', label: 'VIDEO LEARNING HUB', icon: PlayCircle },
  { href: '/pyq', label: 'PREVIOUS YEAR QUESTION PAPERS', icon: FileQuestion },
  { href: '/syllabus', label: 'SYLLABUS', icon: ListChecks },
  { href: '/mock-tests', label: 'MOCK TEST SERIES', icon: Laptop },
  { href: '/mcq-practice', label: 'SUBJECT-WISE MCQ PRACTICE', icon: Target },
  { href: '/all-india-tests', label: 'ALL INDIA TESTS', icon: Globe },
  { href: '/state-level-tests', label: 'STATE LEVEL TESTS', icon: Landmark },
  { href: '/translator', label: 'TRANSLATOR', icon: Languages },
  { href: '/for-teachers', label: 'FOR TEACHER', icon: Users },
  { href: '/exam-notification', label: 'EXAM NOTIFICATION', icon: Bell },
  { href: '/games', label: 'GAMES', icon: Gamepad2 },
];

const impactStats = [
  { value: "100K+", label: "Free Videos", color: "bg-indigo-500" },
  { value: "2B+", label: "Views", color: "bg-yellow-600" },
  { value: "10M+", label: "Application Downloaded", color: "bg-green-500" },
  { value: "5M+", label: "Registered Users", color: "bg-orange-500" },
  { value: "250+", label: "Active Courses", color: "bg-rose-500" },
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

        <section className="w-full py-12 md:py-24 bg-card/5">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl md:text-5xl">
                Our Impact
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Reaching millions of students across the nation.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-center">
              {impactStats.map((stat) => (
                <div key={stat.label} className="relative flex h-32 w-full max-w-xs mx-auto sm:w-36 items-center justify-center text-center text-white">
                  <svg
                    className={`absolute inset-0 h-full w-full ${stat.color} fill-current`}
                    viewBox="0 0 140 160"
                  >
                    <path d="M70 0 L140 40 L140 120 L70 160 L0 120 L0 40 Z" />
                  </svg>
                  <div className="relative z-10 flex flex-col p-2">
                    <span className="text-2xl font-bold">{stat.value}</span>
                    <span className="text-xs">{stat.label}</span>
                  </div>
                </div>
              ))}
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
                        <li><Link href="/pyq" className="hover:text-background">Previous Year Papers</Link></li>
                        <li><Link href="/mock-tests" className="hover:text-background">Mock Tests</Link></li>
                        <li><Link href="/admin/login" className="hover:text-background">Admin Login</Link></li>
                    </ul>
                </div>
                 <div className="space-y-2">
                    <h4 className="font-semibold">Company</h4>
                    <ul className="space-y-1 text-sm text-background/70">
                        <li><Link href="/about-us" className="hover:text-background">About Us</Link></li>
                        <li><Link href="/customer-support" className="hover:text-background">Customer Support</Link></li>
                        <li><Link href="/shipping-options" className="hover:text-background">Shipping Options</Link></li>
                        <li><Link href="/returns-cancellation" className="hover:text-background">Returns & Cancellation</Link></li>
                        <li><Link href="/privacy-policy" className="hover:text-background">Privacy Policy</Link></li>
                        <li><Link href="/terms-of-use" className="hover:text-background">Terms of Use</Link></li>
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
