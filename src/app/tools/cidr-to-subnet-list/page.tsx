
import { PageHeader } from '@/components/page-header';
import { CidrToSubnetListGenerator } from './cidr-to-subnet-list-generator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BookOpen, Lightbulb, Wand, AlertTriangle, ChevronRight } from 'lucide-react';


export const metadata = {
    title: 'CIDR to Subnet List Generator | ICT Toolbench',
    description: 'Easily divide a large network block into multiple, equal-sized subnets using fixed-length subnet masking (FLSM). Generate a complete list of subnets from a given CIDR.',
};

export default function CidrToSubnetListPage() {
  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "CIDR to Subnet List Generator (FLSM)",
    "operatingSystem": "All",
    "applicationCategory": "DeveloperApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "A free online tool to divide a large network block into a list of smaller, equal-sized subnets using Fixed-Length Subnet Masking.",
    "url": "https://ict.calculation.site/tools/cidr-to-subnet-list"
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
        title="CIDR to Subnet List Generator"
        description="Divide a large network CIDR block into a list of smaller, equal-sized subnets. Ideal for fixed-length subnet mask (FLSM) planning and documentation."
      />
      <CidrToSubnetListGenerator />
    </>
  );
}
