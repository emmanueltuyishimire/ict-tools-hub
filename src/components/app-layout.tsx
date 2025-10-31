'use client';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarTrigger } from '@/components/ui/sidebar';
import { Logo } from '@/components/logo';
import { MainNav } from '@/components/main-nav';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-screen lg:grid lg:grid-cols-[auto_1fr]">
        <Sidebar className="hidden border-r lg:flex lg:flex-col">
          <SidebarHeader className="p-4">
            <Logo />
          </SidebarHeader>
          <SidebarContent>
            <MainNav />
          </SidebarContent>
        </Sidebar>

        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-background/95 px-4 sticky top-0 z-30 backdrop-blur-sm lg:h-[60px] lg:px-6">
            <SidebarTrigger className="lg:hidden" />
            <div className="flex-1">
              <h1 className="font-semibold text-lg md:text-xl hidden sm:block">ICT Toolbench</h1>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
