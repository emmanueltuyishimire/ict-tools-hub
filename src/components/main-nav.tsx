'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { toolCategories, mainNavLinks } from '@/lib/tools';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col h-full">
      <div className="p-4">
        <ul className="space-y-1">
          {mainNavLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                  pathname === link.href
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                    : 'text-sidebar-foreground'
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Separator className="mx-4 w-auto" />
      <div className="p-4 text-sm font-medium text-sidebar-foreground/70">Tool Categories</div>
      <ScrollArea className="flex-1 px-4">
        <Accordion type="multiple" className="w-full">
          {toolCategories.map((category, index) => (
            <AccordionItem value={`item-${index}`} key={category.name}>
              <AccordionTrigger className="text-sidebar-foreground hover:no-underline hover:bg-sidebar-accent/50 rounded-md px-3">
                <div className="flex items-center gap-3">
                  <category.icon className="h-4 w-4" />
                  <span className="text-sm">{category.name}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="pt-2 space-y-1">
                  {category.tools.map((tool) => (
                    <li key={tool.slug}>
                      <Link
                        href={`/tools/${tool.slug}`}
                        className={cn(
                          'block rounded-md py-2 px-3 text-sm transition-colors',
                           pathname === `/tools/${tool.slug}`
                             ? 'bg-sidebar-accent/80 text-sidebar-accent-foreground'
                             : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                        )}
                      >
                        {tool.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollArea>
    </nav>
  );
}
