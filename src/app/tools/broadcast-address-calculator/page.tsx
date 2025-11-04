
import { PageHeader } from '@/components/page-header';
import { BroadcastAddressCalculator } from './broadcast-address-calculator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Lightbulb, AlertTriangle, BookOpen, ChevronRight, Wand } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema'; // Import from schema
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


export const metadata = {
    title: 'Broadcast Address Calculator | ICT Toolbench',
    description: 'Quickly find the broadcast address for any IPv4 network subnet. Enter an IP and mask to calculate the correct broadcast IP for your network segment.',
};

export default function BroadcastAddressCalculatorPage() {
    const softwareAppSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Broadcast Address Calculator",
      "operatingSystem": "All",
      "applicationCategory": "DeveloperApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "A free online tool to calculate the broadcast address for any IPv4 network subnet based on an IP address and its subnet mask.",
      "url": "https://ict.calculation.site/tools/broadcast-address-calculator"
    };
    
    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqData.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer.replace(/<[^>]*>?/gm, '') } })),
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
        title="Broadcast Address Calculator"
        description="Easily determine the broadcast address for any IPv4 subnet by providing an IP address and its corresponding subnet mask."
      />
      <BroadcastAddressCalculator />
    </>
  );
}
