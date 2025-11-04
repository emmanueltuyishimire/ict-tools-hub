
import { PageHeader } from '@/components/page-header';
import { NetworkMaskValidator } from './network-mask-validator';
import { faqData, howToSchema } from './schema';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
    title: 'Network Mask Validator | ICT Toolbench',
    description: 'Instantly validate any IPv4 network mask. Check for valid formats (dot-decimal, CIDR), see the wildcard and binary equivalents, and learn the rules of subnet masking.',
};

export default function NetworkMaskValidatorPage() {
    const softwareAppSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Network Mask Validator",
      "operatingSystem": "All",
      "applicationCategory": "DeveloperApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "A free online tool to validate the format and structure of an IPv4 subnet mask and see its properties.",
      "url": "https://ict.calculation.site/tools/network-mask-validator"
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
        title="Network Mask Validator"
        description="Check if a subnet mask is valid, see its properties, and learn the rules that govern network masks in IPv4."
      />
      <NetworkMaskValidator />
      <Card className="mt-12">
        <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
            <Accordion type="single" collapsible className="w-full">
                {faqData.map((faq, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </CardContent>
      </Card>
    </>
  );
}
