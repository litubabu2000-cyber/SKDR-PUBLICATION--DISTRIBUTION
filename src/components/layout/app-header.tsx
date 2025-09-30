
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SkdrLogo } from '@/components/icons';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ShoppingCart, ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/books', label: 'Class Books' },
  { href: '/pyq', label: 'Previous Year Papers' },
  { href: '/mock-tests', label: 'Mock Tests' },
  { href: '/videos', label: 'Video Lectures' },
];

const categoryLinks = [
    { href: '/categories/odisha-school-guide', label: 'Odisha School Guide' },
    { href: '/categories/odisha-college-books', label: 'Odisha College Books' },
    { href: '/categories/neet-jee-guide', label: 'NEET & JEE Guide' },
    { href: '/categories/railway-books', label: 'Railway Books' },
    { href: '/categories/ssc-books', label: 'SSC Books' },
    { href: '/categories/ossc-books', label: 'OSSC Books' },
    { href: '/categories/tgt-books', label: 'TGT Books' },
    { href: '/categories/pgt-books', label: 'PGT Books' },
    { href: '/categories/pyq', label: 'Previous Year Questions' },
];

export function AppHeader() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
      <Link href="/" className="flex items-center gap-2 font-semibold">
        <SkdrLogo className="h-8 w-8 text-primary" />
        <span className="text-lg font-headline font-bold">SKDR Publication</span>
      </Link>
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'transition-colors hover:text-foreground',
              pathname === link.href
                ? 'text-foreground font-bold'
                : 'text-muted-foreground'
            )}
          >
            {link.label}
          </Link>
        ))}
         <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground">
                Categories <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {categoryLinks.map(link => (
                    <DropdownMenuItem key={link.href} asChild>
                        <Link href={link.href}>{link.label}</Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
      </nav>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <ShoppingCart className="h-5 w-5" />
          <span className="sr-only">Shopping Cart</span>
        </Button>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <SkdrLogo className="h-8 w-8 text-primary" />
                <span className="text-lg font-headline font-bold">
                  SKDR Publication
                </span>
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'transition-colors hover:text-foreground',
                    pathname === link.href
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  {link.label}
                </Link>
              ))}
               <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground">
                        Categories <ChevronDown className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {categoryLinks.map(link => (
                            <DropdownMenuItem key={link.href} asChild>
                                <Link href={link.href}>{link.label}</Link>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
