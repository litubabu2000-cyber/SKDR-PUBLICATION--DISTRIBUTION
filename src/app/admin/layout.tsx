
'use client';

import { AppHeader } from "@/components/layout/app-header";
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarContent, SidebarInset, SidebarHeader, SidebarFooter } from "@/components/ui/sidebar";
import { SkdrLogo } from "@/components/icons";
import Link from "next/link";
import { Book, Home, Users, LogOut } from "lucide-react";
import withAuth from "@/components/auth/with-auth";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";


function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/admin/login');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <SidebarProvider>
        <Sidebar>
            <SidebarHeader>
                <div className="flex items-center gap-2">
                    <SkdrLogo className="size-8 text-primary" />
                    <span className="text-lg font-headline font-bold">Admin Panel</span>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/admin/dashboard"><Home />Dashboard</Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/admin/books"><Book />Books</Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/admin/users"><Users />Users</Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton onClick={handleSignOut}>
                            <LogOut />Sign Out
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
        <SidebarInset>
            <AppHeader />
            {children}
        </SidebarInset>
    </SidebarProvider>
  );
}

export default withAuth(AdminLayout);
    