import React from 'react';
import { PageHeader } from '@/components/page-header';
import { CloudInstanceCostCalculator } from './cloud-instance-cost-calculator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BookOpen, AlertTriangle, Wand, ChevronRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const metadata = {
    title: 'Cloud Instance Cost Calculator | ICT Toolbench',
    description: 'Estimate your monthly costs for cloud VMs (Virtual Machines) on AWS, Google Cloud, and Azure. A simple tool for developers and cloud architects to budget for compute resources.',
    openGraph: {
        title: 'Cloud Instance Cost Calculator | ICT Toolbench',
        description: 'Compare and estimate the monthly cost of virtual machine instances from major cloud providers based on vCPU and RAM requirements.',
        url: '/tools/cloud-instance-cost-calculator',
    }
};

const CloudInstanceCostCalculatorPage = () => {
    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqData.map(item => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer.replace(/<[^>]*>?/gm, ''),
            },
        })),
    };

    const softwareAppSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Cloud Instance Cost Calculator",
      "operatingSystem": "All",
      "applicationCategory": "DeveloperApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "A free online tool to estimate the monthly cost of cloud virtual machine instances based on vCPU and RAM across AWS, Google Cloud, and Azure.",
      "url": "https://www.icttoolbench.com/tools/cloud-instance-cost-calculator"
    };

    return (
        <div className="max-w-4xl mx-auto space-y-12">
             <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
            <PageHeader
                title="Cloud Instance Cost Calculator"
                description="Estimate your monthly on-demand costs for virtual machines on AWS, Google Cloud, and Azure. This tool helps you budget for compute resources by providing a high-level cost comparison based on vCPU and RAM."
            />

            <CloudInstanceCostCalculator />
            
            <section>
                <h2 className="text-2xl font-bold mb-4">How to Use the Calculator</h2>
                <Card className="prose prose-sm max-w-none text-foreground p-6">
                    <p>This tool gives you a quick, high-level estimate for cloud compute costs to help with initial planning and comparison.</p>
                    <ol>
                        <li><strong>Select Cloud Provider &amp; Region:</strong> Choose your preferred cloud provider and the region where you plan to deploy your VM. Pricing varies significantly by region.</li>
                        <li><strong>Enter VM Resources:</strong> Input the number of virtual CPUs (vCPUs) and the amount of RAM (in GB) that you require for your instance. You can get a baseline for this using our <Link href="/tools/vm-requirement-estimator" className="text-primary hover:underline">VM Requirement Estimator</Link>.</li>
                        <li><strong>Calculate Cost:</strong> The tool will automatically calculate the estimated monthly cost based on the On-Demand pricing for the selected provider's general-purpose instance family in that region.</li>
                        <li><strong>Use Custom Pricing (Optional):</strong> Select "Custom" as the provider to enter your own hourly rates for vCPU and RAM, allowing you to model costs for any provider or specific instance type.</li>
                    </ol>
                    <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Estimate Only</AlertTitle>
                        <AlertDescription>
                           This is a simplified estimate based on On-Demand pricing for general-purpose instances. It does not include costs for storage, data transfer, or taxes, nor does it account for savings from Reserved Instances or Spot pricing. For precise billing, always use the provider's official pricing calculator.
                        </AlertDescription>
                    </Alert>
                </CardContent>
            </Card>
        </>
    );
};

export default CloudInstanceCostCalculatorPage;
