
import React from 'react';
import { PageHeader } from '@/components/page-header';
import { IpPrivacyChecker } from './ip-privacy-checker';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Lightbulb, AlertTriangle, BookOpen, ChevronRight, Wand, Globe } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';


export const metadata = {
    title: 'Public vs. Private IP Address Checker | ICT Toolbench',
    description: 'Instantly determine if an IPv4 address is public or private (RFC 1918). Learn about NAT, loopback, and link-local addresses with our tool.',
};

export default function IpPrivacyCheckerPage() {
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
      <PageHeader
        title="Public vs. Private IP Checker"
        description="Determine if an IPv4 address is public, private, loopback, or reserved with this instant checker and educational guide."
      />
      <IpPrivacyChecker />
    </>
  );
}
