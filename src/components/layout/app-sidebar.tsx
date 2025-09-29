'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen,
  FileText,
  Home,
  PlaySquare,
  ClipboardCheck,
  Target,
  Bell,
  Settings,
  LifeBuoy,
} from 'lucide-react';
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { LearnScapeLogo } from '@/components/icons';
import { Button } from '../ui/button';

const navItems = [
  { href: '/', icon: Home, label: 'Dashboard' },
  { href: '/books', icon: BookOpen, label: 'Book Catalog' },
  { href: '/pyqs', icon: FileText, label: 'Past Papers' },
  { href: '/lectures', icon: PlaySquare, label: 'Video Lectures' },
  { href: '/tests', icon: ClipboardCheck, label: 'Tests' },
  { href: '/practice', icon: Target, label: 'Practice' },
  { href: '/updates', icon: Bell, label: 'Exam Updates' },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  const handleLinkClick = () => {
    setOpenMobile(false);
  };

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="shrink-0" asChild>
            <Link href="/">
              <LearnScapeLogo className="size-6 text-primary" />
            </Link>
          </Button>
          <h2 className="text-lg font-semibold font-headline text-primary truncate">
            LearnScape
          </h2>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2 flex-1">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref legacyBehavior>
                <SidebarMenuButton
                  as="a"
                  isActive={pathname === item.href}
                  tooltip={{ children: item.label, side: 'right' }}
                  onClick={handleLinkClick}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
             <Link href="#" passHref legacyBehavior>
                <SidebarMenuButton tooltip={{ children: 'Support', side: 'right' }}>
                    <LifeBuoy />
                    <span>Support</span>
                </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
             <Link href="#" passHref legacyBehavior>
                <SidebarMenuButton tooltip={{ children: 'Settings', side: 'right' }}>
                    <Settings />
                    <span>Settings</span>
                </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
