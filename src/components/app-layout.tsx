
'use client';
import { useState, useEffect } from 'react';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarTrigger } from '@/components/ui/sidebar';
import { Logo } from '@/components/logo';
import { MainNav } from '@/components/main-nav';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const footerLinks = [
    { name: 'Central Hub', href: 'https://calculation.site' },
    { name: 'Age Calculators', href: 'https://age.calculation.site' },
    { name: 'Finance Calculators', href: 'https://finance.calculation.site' },
    { name: 'Health & Fitness Calculators', href: 'https://health.calculation.site' },
    { name: 'ICT Tools Hub', href: 'https://ict.calculation.site' },
    { name: 'Math Calculators', href: 'https://maths.calculation.site' },
    { name: 'Unit Converters', href: 'https://unit.calculation.site' },
  ];

  return (
    <SidebarProvider defaultOpen={false}>
        <Sidebar>
          <SidebarHeader>
            <Logo />
          </SidebarHeader>
          <SidebarContent>
            <MainNav />
          </SidebarContent>
        </Sidebar>
        <div className="flex flex-col flex-1 min-h-screen">
            <header className="flex h-14 items-center gap-4 border-b bg-background/95 px-4 sticky top-0 z-30 backdrop-blur-sm lg:h-[60px] lg:px-6">
                <SidebarTrigger className="lg:hidden" aria-label="Toggle navigation menu" />
                <div className="flex-1">
                <h1 className="font-semibold text-lg md:text-xl hidden sm:block">ICT Tools Hub</h1>
                </div>
            </header>
            <main id="main-content" className="flex-1 p-4 md:p-6 lg:p-8">
                {children}
            </main>
            <footer className="py-6 px-6 border-t bg-background">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <div className="text-center md:text-left">
                        © {year} {' '}
                        <a 
                            href="https://calculation.site" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="hover:text-primary transition-colors"
                        >
                            calculation.site
                        </a>. All Rights Reserved.
                    </div>
                    <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2">
                        {footerLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                target="_blank"
                                rel="nofollow noopener noreferrer"
                                className="hover:text-primary transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>
                </div>
            </footer>
        </div>
    </SidebarProvider>
  );
}
