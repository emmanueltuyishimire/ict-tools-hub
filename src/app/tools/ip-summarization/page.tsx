
import { PageHeader } from '@/components/page-header';
import { IpSummarizationTool } from './ip-summarization-tool';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BookOpen, Lightbulb, Wand, AlertTriangle, ChevronRight } from 'lucide-react';


export const metadata = {
    title: 'IP Summarization Tool (Route Aggregator) | ICT Tools Hub',
    description: 'Calculate the optimal summary route (supernet) from a list of IP networks. Simplify your routing tables, improve network performance, and learn the principles of CIDR with our free tool.',
    openGraph: {
      title: 'IP Summarization Tool (Route Aggregator) | ICT Tools Hub',
      description: 'A powerful tool for network administrators to create efficient summary routes, reducing routing table size and improving network stability.',
      url: 'https://ict.calculation.site/tools/ip-summarization',
    }
};

export default function IpSummarizationPage() {
    const softwareAppSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "IP Summarization Tool",
      "operatingSystem": "All",
      "applicationCategory": "DeveloperApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "A free online tool to calculate the optimal summary route (supernet) from a list of contiguous IP networks in CIDR notation.",
      "url": "https://ict.calculation.site/tools/ip-summarization"
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
                title="IP Summarization Tool (Route Aggregation)"
                description="Efficiently combine multiple IP network ranges into a single summary route. This tool helps you optimize routing tables, improve network performance, and simplify access control lists."
            />
            <IpSummarizationTool />
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
        </>
    );
}
