
import React from 'react';
import { PageHeader } from '@/components/page-header';
import { CloudStorageCostEstimator } from './cloud-storage-cost-estimator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BookOpen, AlertTriangle, Wand, ChevronRight, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const metadata = {
    title: 'Cloud Storage Cost Estimator | AWS S3, Google Cloud, Azure | ICT Toolbench',
    description: 'Estimate monthly object storage costs for major cloud providers like AWS S3, Google Cloud Storage, and Azure Blob Storage. A tool for developers, and cloud architects.',
    openGraph: {
        title: 'Cloud Storage Cost Estimator | AWS S3, Google Cloud, Azure | ICT Toolbench',
        description: 'Calculate and compare object storage costs across different cloud platforms to better plan your budget and architecture.',
        url: '/tools/cloud-storage-cost-estimator',
    }
};

const CloudStorageCostEstimatorPage = () => {
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
      "name": "Cloud Storage Cost Estimator",
      "operatingSystem": "All",
      "applicationCategory": "DeveloperApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "A free online tool to estimate monthly object storage costs across AWS S3, Google Cloud Storage, and Azure Blob Storage based on storage amount and data transfer.",
      "url": "https://www.icttoolbench.com/tools/cloud-storage-cost-estimator"
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
            <div className="max-w-4xl mx-auto space-y-12">
                <PageHeader
                    title="Cloud Storage Cost Estimator"
                    description="Plan your cloud budget with confidence. This tool provides a high-level estimate of your monthly object storage costs for popular providers like AWS, Google Cloud, and Azure, helping you understand the key factors that drive your bill."
                />

                <CloudStorageCostEstimator />
                
                <section>
                    <h2 className="text-2xl font-bold mb-4">How to Use the Estimator</h2>
                    <Card className="prose prose-sm max-w-none text-foreground p-6">
                        <p>This estimator simplifies the complex pricing models of major cloud providers to give you a directional cost forecast. Follow these steps:</p>
                        <ol>
                            <li><strong>Enter Storage Amount:</strong> Input the total amount of data you plan to store in the "Total Storage" field. Be sure to select the correct unit (GB or TB).</li>
                            <li><strong>Enter Data Transfer:</strong> Input the amount of data you expect to transfer <em>out</em> of the storage service each month. This is often called "egress" and is a major cost factor. Inbound data transfer is typically free.</li>
                            <li><strong>Select Your Provider &amp; Region:</strong> Choose the cloud provider (AWS, Google, Azure) and the region where your data will be stored. Prices vary significantly between regions. You can also select "Custom" to enter your own pricing.</li>
                            <li><strong>Review the Estimated Costs:</strong> The tool will instantly calculate and display the estimated monthly cost, broken down into storage costs and data transfer costs.</li>
                        </ol>
                        <Alert>
                            <Lightbulb className="h-4 w-4" />
                            <AlertTitle>Note on Accuracy</AlertTitle>
                            <AlertDescription>
                                This is a high-level estimate based on standard storage tiers and does not include costs for operations (GET/PUT requests), infrequent access tiers, or free tier credits. Use this for planning, not for precise billing calculations.
                            </AlertDescription>
                        </Alert>
                    </Card>
                </section>
            </div>
        </>
    );
};

export default CloudStorageCostEstimatorPage;

    