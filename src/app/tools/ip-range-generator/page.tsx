
import { PageHeader } from '@/components/page-header';
import { IpRangeGenerator } from './ip-range-generator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { faqData, howToSchema, keyTerminologies } from './schema';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const metadata = {
    title: 'IP Address Range Generator | ICT Toolbench',
    description: 'Generate a complete list of IP addresses from a start/end range or a CIDR block. Ideal for creating configuration lists, scripting, and network documentation.',
};

export default function IpRangeGeneratorPage() {
    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqData.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer.replace(/<[^>]*>?/gm, '') } })),
    };
    
    const softwareAppSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "IP Address Range Generator",
      "operatingSystem": "All",
      "applicationCategory": "DeveloperApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "A free online tool to generate a list of IP addresses from a CIDR block or a start/end range.",
      "url": "https://ict.calculation.site/tools/ip-range-generator"
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
      <div className="max-w-4xl mx-auto space-y-12">
        <PageHeader
            title="IP Address Range Generator"
            description="Quickly generate a list of IPv4 addresses from a start and end IP, or from a CIDR network block. Perfect for scripting, configuration, and documentation."
        />
        <IpRangeGenerator />
        <Card>
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
      </div>
    </>
  );
}
