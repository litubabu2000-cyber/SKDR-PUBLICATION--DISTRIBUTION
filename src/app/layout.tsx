
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AppHeader } from '@/components/layout/app-header';
import { Poppins, PT_Sans } from 'next/font/google';
import { PageTransition } from '@/components/page-transition';
import { BottomNavbar } from '@/components/layout/bottom-navbar';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',
});

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-sans',
});

export const metadata: Metadata = {
  title: 'SKDR Publication',
  description: 'Your Gateway to Academic Excellence & Knowledge Distribution',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${ptSans.variable} font-body antialiased`}
        suppressHydrationWarning
      >
        <AppHeader />
        <PageTransition>
            {children}
        </PageTransition>
        <Toaster />
        <BottomNavbar />
        <div className="h-16 md:hidden"></div> {/* Spacer for bottom nav */}
      </body>
    </html>
  );
}
