
import { PageHeader } from '@/components/page-header';
import { IpClassFinder } from './ip-class-finder';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Lightbulb, AlertTriangle, BookOpen, ChevronRight, Wand } from 'lucide-react';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { faqData, howToSchema, keyTerminologies } from './schema';


export const metadata = {
    title: 'IPv4 Class Finder | ICT Toolbench',
    description: 'Instantly find the class (A, B, C, D, or E) of any IPv4 address. Learn about classful addressing, ranges, and default masks with our educational guide.',
};

export default function IpClassFinderPage() {
    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqData.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer.replace(/<[^>]*>?/gm, '') } })),
    };

    const softwareAppSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "IPv4 Class Finder",
        "operatingSystem": "All",
        "applicationCategory": "DeveloperApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "description": "An educational tool to determine the class (A, B, C, D, or E) of an IPv4 address and understand the obsolete classful addressing system.",
        "url": "https://www.icttoolbench.com/tools/ip-class-finder"
    };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
      <PageHeader
        title="IPv4 Class Finder"
        description="Determine the class of any IPv4 address and understand the principles of the historical classful addressing system."
      />
      <IpClassFinder />
    </>
  );
}
