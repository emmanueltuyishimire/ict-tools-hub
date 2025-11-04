
import { PageHeader } from '@/components/page-header';
import { CidrToWildcardConverter } from './cidr-to-wildcard-converter';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BookOpen, Lightbulb, Wand, AlertTriangle, ChevronRight } from 'lucide-react';

export const metadata = {
    title: 'CIDR to Wildcard Mask Converter | ICT Toolbench',
    description: 'Instantly convert any CIDR prefix (e.g., /24) to its corresponding wildcard mask for use in ACLs and routing protocols. Includes binary views and explanations.',
};

export default function CidrToWildcardPage() {
  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "CIDR to Wildcard Mask Converter",
    "operatingSystem": "All",
    "applicationCategory": "DeveloperApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "A free online tool to convert a CIDR prefix into its wildcard mask equivalent for firewall ACLs and router configurations.",
    "url": "https://ict.calculation.site/tools/cidr-to-wildcard"
  };

  const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqData.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer.replace(/<[^>]*>?/gm, '') } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
      <PageHeader
        title="CIDR to Wildcard Mask Converter"
        description="Quickly convert a CIDR prefix into its wildcard mask equivalent for firewall ACLs and router configurations."
      />
      <CidrToWildcardConverter />
    </>
  );
}
