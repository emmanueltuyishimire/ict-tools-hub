
import { PageHeader } from '@/components/page-header';
import { IpClassFinder } from './ip-class-finder';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Lightbulb, AlertTriangle, BookOpen, ChevronRight, Wand } from 'lucide-react';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


export const metadata = {
    title: 'IPv4 Class Finder | ICT Toolbench',
    description: 'Instantly find the class (A, B, C, D, or E) of any IPv4 address. Learn about classful addressing, ranges, and default masks with our educational guide.',
};

export default function IpClassFinderPage() {
  return (
    <>
      <PageHeader
        title="IPv4 Class Finder"
        description="Determine the class of any IPv4 address and understand the principles of the historical classful addressing system."
      />
      <IpClassFinder />
    </>
  );
}
