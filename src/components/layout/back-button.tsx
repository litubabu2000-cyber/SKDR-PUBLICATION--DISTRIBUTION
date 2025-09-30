
'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

  // Don't show on admin or home page
  if (pathname.startsWith('/admin') || pathname === '/') {
    return null;
  }

  return (
    <Button
      variant="outline"
      size="icon"
      className="fixed top-20 left-4 z-50 hidden md:flex"
      onClick={() => router.back()}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Go back</span>
    </Button>
  );
}
