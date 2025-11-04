
import { PageHeader } from '@/components/page-header';
import { PortLookupTool } from './port-lookup-tool';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Lightbulb, AlertTriangle, BookOpen, ChevronRight, Wand, Server } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';

export const metadata = {
    title: 'Port Number Lookup – Find Service, Protocol, and Port Info Instantly | ICT Toolbench',
    description: 'Instantly identify which service or protocol a port number uses, or find the port for any service name. Educational guide + lookup tool.',
};

export default function PortLookupPage() {
    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqData.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer.replace(/<[^>]*>?/gm, '') } })),
    };

    const softwareAppSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Port Number Lookup",
      "operatingSystem": "All",
      "applicationCategory": "DeveloperApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "A free online tool to look up common network port numbers and their associated services.",
      "url": "https://www.icttoolbench.com/tools/port-lookup"
    };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
      <PageHeader
        title="Port Number Lookup"
        description="Find common TCP and UDP port numbers and their associated services. Search by port, protocol, or service name."
      />
      <PortLookupTool />
    </>
  );
}
