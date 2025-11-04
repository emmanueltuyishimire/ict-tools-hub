
import { PageHeader } from '@/components/page-header';
import { NetworkAddressCalculator } from './network-address-calculator';
import { faqData, howToSchema } from './schema';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';


export const metadata = {
    title: 'Network Address Calculator (Network ID) | ICT Toolbench',
    description: 'Quickly find the network address (Network ID) for any IPv4 subnet. Enter an IP and mask to calculate the correct starting address for your network segment.',
};

export default function NetworkAddressCalculatorPage() {
    const softwareAppSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Network Address Calculator",
      "operatingSystem": "All",
      "applicationCategory": "DeveloperApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "A free online tool to calculate the network address (Network ID) for any IPv4 subnet based on an IP address and its subnet mask.",
      "url": "https://ict.calculation.site/tools/network-address-calculator"
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
        title="Network Address Calculator"
        description="Easily determine the network address (Network ID) for any IPv4 subnet by providing an IP address and its corresponding subnet mask."
      />
      <NetworkAddressCalculator />
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
