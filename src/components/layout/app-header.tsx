'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PageTurnerLogo } from '@/components/icons';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ShoppingCart } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About Us' },
];

export function AppHeader() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
      <Link href="/" className="flex items-center gap-2 font-semibold">
        <PageTurnerLogo className="h-6 w-6 text-primary" />
        <span className="text-lg font-headline font-bold">Page Turner</span>
      </Link>
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
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
                <PageTurnerLogo className="h-6 w-6 text-primary" />
                <span className="text-lg font-headline font-bold">
                  Page Turner
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
            </nav>
          </SheetContent>
        </Sheet>
        <Button asChild>
          <Link href="/shop">Get Started</Link>
        </Button>
      </div>
    </header>
  );
}
