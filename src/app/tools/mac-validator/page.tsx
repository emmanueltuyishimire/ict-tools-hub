
import { PageHeader } from '@/components/page-header';
import { MacValidator } from './mac-validator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Lightbulb, AlertTriangle, BookOpen, ChevronRight, Wand } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const metadata = {
    title: 'MAC Address Validator | ICT Toolbench',
    description: 'Instantly validate any MAC address format. Check for correctness and identify the hardware manufacturer using our OUI lookup tool.',
};

export default function MacValidatorPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer.replace(/<[^>]*>?/gm, '') } })),
  };

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "MAC Address Validator",
    "operatingSystem": "All",
    "applicationCategory": "DeveloperApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "A free online tool to instantly validate MAC address formats and identify the hardware manufacturer via OUI lookup.",
    "url": "https://www.icttoolbench.com/tools/mac-validator"
  };
  
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
      <PageHeader
        title="MAC Address Validator"
        description="Instantly validate a MAC address, identify its format, and look up the hardware manufacturer using its OUI."
      />
      <MacValidator />
    </>
  );
}
