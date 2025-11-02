
import React from 'react';
import { PageHeader } from '@/components/page-header';
import { BandwidthCostCalculator } from './bandwidth-cost-calculator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { BookOpen, AlertTriangle, Wand, ChevronRight, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const metadata = {
    title: 'Cloud Bandwidth Cost Calculator (Egress) | ICT Toolbench',
    description: 'Estimate your monthly cloud bandwidth (egress) costs for AWS, Google Cloud, and Azure. Understand how data transfer fees impact your cloud bill and how to optimize them.',
    openGraph: {
        title: 'Cloud Bandwidth Cost Calculator (Egress) | ICT Toolbench',
        description: 'Calculate your expected monthly data transfer costs from major cloud providers to avoid bill shock and plan your budget effectively.',
        url: '/tools/bandwidth-cost-calculator',
    }
};

const BandwidthCostCalculatorPage = () => {
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
      "name": "Cloud Bandwidth Cost Calculator",
      "operatingSystem": "All",
      "applicationCategory": "DeveloperApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "A free online tool to estimate monthly cloud data transfer (egress) costs for AWS, Google Cloud, and Azure.",
      "url": "https://www.icttoolbench.com/tools/bandwidth-cost-calculator"
    };

    return (
        <>
            <StructuredData data={faqSchema} />
            <StructuredData data={howToSchema} />
            <StructuredData data={softwareAppSchema} />
            <div className="max-w-4xl mx-auto space-y-12">
                <PageHeader
                    title="Cloud Bandwidth Cost Calculator"
                    description="Estimate your monthly data transfer (egress) costs from major cloud providers like AWS, Google Cloud, and Azure. Avoid bill shock by understanding one of the most significant and often overlooked cloud expenses."
                />

                <BandwidthCostCalculator />
                
                <section>
                    <h2 className="text-2xl font-bold mb-4">How to Use the Calculator</h2>
                    <Card className="prose prose-sm max-w-none text-foreground p-6">
                        <p>This tool provides a high-level estimate for your monthly data transfer costs, helping you budget for your cloud services.</p>
                        <ol>
                            <li><strong>Enter Data Transfer Amount:</strong> Input the total amount of data you expect to transfer <em>out</em> to the internet from your cloud provider each month. Select the appropriate unit (GB or TB).</li>
                            <li><strong>Select Provider and Region:</strong> Choose your cloud provider and the region from which the data will originate. Egress pricing varies significantly between providers and regions. You can also select "Custom" to enter your own pricing tiers.</li>
                            <li><strong>Calculate Cost:</strong> Click the "Calculate Cost" button.</li>
                            <li><strong>Review the Estimate:</strong> The tool will display the estimated monthly cost for data transfer. It will also show the tiered pricing structure that the provider uses.</li>
                        </ol>
                         <Alert>
                            <Lightbulb className="h-4 w-4" />
                            <AlertTitle>Important Considerations</AlertTitle>
                            <AlertDescription>
                               This estimate does not include free tier allowances, which can cover a significant amount of egress for small applications (e.g., the first 100GB/month on AWS). It also simplifies complex tiered pricing. For precise billing, always consult the provider's official pricing page.
                            </AlertDescription>
                        </Alert>
                    </Card>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4">Worked Examples</h2>
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Example 1: A Popular Blog</CardTitle>
                                <CardDescription>Estimating egress costs for a content-heavy blog with significant traffic.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-muted-foreground"><strong>Scenario:</strong> A successful blog serves 5 TB of data per month (images, CSS, JS) from an AWS S3 bucket in <code>us-east-1</code>.</p>
                                <div className="prose prose-sm max-w-none">
                                    <ol>
                                        <li><strong>Inputs:</strong>
                                            <ul>
                                                <li>Monthly Egress: <strong>5</strong> TB</li>
                                                <li>Provider: <strong>AWS</strong></li>
                                                <li>Region: <strong>us-east-1</strong></li>
                                            </ul>
                                        </li>
                                        <li><strong>Calculation:</strong> The tool applies AWS's tiered pricing. The first 100 GB might be free, the next ~9.9 TB at $0.09/GB, and so on.</li>
                                        <li><strong>Result:</strong> The calculator shows a significant monthly cost (e.g., ~$450). This result immediately tells the blog owner that they are paying too much for egress and should implement a CDN, which has much cheaper bandwidth rates.</li>
                                    </ol>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Example 2: Comparing Providers for a New App</CardTitle>
                                <CardDescription>Using the tool to make a budget-conscious decision for a new API service.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-muted-foreground"><strong>Scenario:</strong> A developer is launching a new API service and expects to serve 500 GB of data per month. They want to compare costs between DigitalOcean and Vultr.</p>
                                 <div className="prose prose-sm max-w-none">
                                    <ol>
                                        <li><strong>DigitalOcean Calculation:</strong> They select <strong>DigitalOcean</strong>, enter <strong>500</strong> GB. The tool knows DigitalOcean often includes a free bandwidth pool (e.g., 1 TB) with its Droplets. The cost is calculated as <strong>$0.00</strong>.</li>
                                        <li><strong>Vultr Calculation:</strong> They select <strong>Vultr</strong>, enter <strong>500</strong> GB. The tool uses Vultr's pricing, which might also have a free pool. The cost is also <strong>$0.00</strong>.</li>
                                        <li><strong>Result:</strong> For their expected usage, both providers are cost-effective. They then use the tool to model 1500 GB of usage. At this level, DigitalOcean (with a 1TB free pool) would charge for 500GB (~$5.00), while Vultr (with a 2TB free pool) would still be free. This helps them make a more informed decision based on future growth.</li>
                                    </ol>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>
                
                <section>
                    <h2 className="text-2xl font-bold mb-4">Key Terminologies</h2>
                    <Card>
                        <CardContent className="p-6">
                            <dl className="space-y-4">
                                {keyTerminologies.map((item) => (
                                    <div key={item.term}>
                                        <dt className="font-semibold">{item.term}</dt>
                                        <dd className="text-muted-foreground text-sm">{item.definition}</dd>
                                    </div>
                                ))}
                            </dl>
                        </CardContent>
                    </Card>
                </section>

                <Card className='bg-secondary/30 border-primary/20'>
                    <CardHeader>
                        <div className='flex items-center gap-2 text-primary'>
                            <BookOpen className="h-6 w-6" aria-hidden="true" />
                            <CardTitle className="text-primary">Educational Deep Dive: The Hidden Cost of the Cloud</CardTitle>
                        </div>
                        <CardDescription>Understand why data transfer (egress) is a critical cost component and how to architect your applications to minimize it.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                        <section>
                            <h3>What is Egress and Why Is It So Expensive?</h3>
                            <p>
                                In the world of cloud computing, "egress" refers to any network traffic that leaves the cloud provider's network and goes out to the public internet. While providers make it free and easy to get your data <em>into</em> their cloud (ingress), they charge a fee for every gigabyte that leaves.
                            </p>
                            <p>
                                This is often the most surprising and significant cost for new cloud users. Why? Because providers have to pay for the massive, high-speed, and redundant internet connectivity required to deliver content globally. These costs are passed on to the customer. A simple web application serving images and videos can easily generate terabytes of egress traffic, potentially resulting in a bill that is far higher than the cost of the servers themselves. You can estimate how long this will take with our <Link href="/tools/data-transfer-calculator" className="text-primary hover:underline">Data Transfer Time Calculator</Link>.
                            </p>
                        </section>
                        <section>
                            <h3>Understanding Tiered Pricing</h3>
                            <p>Most cloud providers use a tiered pricing model for data transfer. This means the cost per gigabyte goes down as your usage goes up. For example, a provider might charge:</p>
                            <ul className="list-disc pl-5">
                                <li>$0.09 per GB for the first 10 TB</li>
                                <li>$0.07 per GB for the next 40 TB</li>
                                <li>$0.05 per GB for anything over 50 TB</li>
                            </ul>
                            <p>This model benefits high-volume customers. Our calculator simplifies this by showing you the pricing tiers for your selected provider, giving you insight into how your costs scale. Many providers, like AWS and Google Cloud, also offer a generous free tier (e.g., the first 100 GB/month of egress is free), which is great for small applications but quickly exhausted by larger ones. You can model your total costs with our <Link href="/tools/cloud-instance-cost-calculator" className='text-primary hover:underline'>Cloud Instance Cost Calculator</Link>.</p>
                        </section>
                         <section>
                            <h3>Intra-Region vs. Inter-Region vs. Internet Egress</h3>
                            <p>Not all data transfer is created equal. It's crucial to understand the different types:</p>
                             <ul className="list-disc pl-5">
                               <li><strong>Egress to Internet (This Tool's Focus):</strong> Data leaving the cloud to a user on the public internet. This is the most expensive type.</li>
                               <li><strong>Inter-Region Transfer:</strong> Data moving between two different cloud regions (e.g., from a server in <code>us-east-1</code> to a database in <code>eu-west-1</code>). This is cheaper than internet egress but is still a significant cost. You may need to do this for <Link href="/tools/storage-redundancy-calculator" className="text-primary hover:underline">Storage Redundancy</Link>.</li>
                               <li><strong>Intra-Region Transfer:</strong> Data moving between services within the same cloud region (e.g., from an EC2 instance to an S3 bucket in the same region). This is often free or very cheap, making it a key architectural consideration for cost optimization.</li>
                            </ul>
                        </section>
                    </CardContent>
                </Card>
                
                <section>
                    <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Video Streaming Service Budgeting</h3>
                            <p className="text-sm text-muted-foreground">A startup is launching a video streaming service. They estimate they will stream 100 TB of video data per month. Using the calculator, they can compare the tiered egress pricing between AWS, Google, and Azure to see which provider offers the most cost-effective solution at that high volume, helping them model their core business costs.</p>
                        </div>
                         <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Choosing a CDN Provider</h3>
                            <p className="text-sm text-muted-foreground">A company's website serves 20 TB of assets per month. They realize their origin egress costs are too high. They use the calculator to see the cost of this egress directly from their cloud provider. They then compare this to the pricing of a CDN like Cloudflare, which may offer significantly cheaper (or even unmetered) bandwidth, making a clear financial case for adopting a CDN.</p>
                        </div>
                    </div>
                </section>

                <div className="grid md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <div className='flex items-center gap-2'><Wand className="h-6 w-6 text-accent" /> <CardTitle>Pro Tips for Reducing Egress Costs</CardTitle></div>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                                <li><strong>Use a CDN (Content Delivery Network):</strong> This is the #1 strategy. CDNs cache your content globally and often have much cheaper egress rates than cloud providers, or even include it for free. Use our <Link href="/tools/cdn-bandwidth-estimator" className="text-primary hover:underline">CDN Bandwidth Estimator</Link> to see the impact.</li>
                                <li><strong>Compress Everything:</strong> Use Gzip or Brotli to compress text-based assets (HTML, CSS, JS) and use optimized image formats like WebP. Smaller files mean less data to transfer. Use our <Link href="/tools/compression-estimator" className="text-primary hover:underline">Compression Savings Estimator</Link>.</li>
                                <li><strong>Keep Traffic Within the Same Region:</strong> Architect your application so that services communicate with each other within the same cloud region to take advantage of free or low-cost intra-region data transfer.</li>
                                <li><strong>Use Provider-Specific Solutions:</strong> Some providers offer direct connections or private endpoints (like AWS PrivateLink) that can reduce costs for specific use cases.</li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                             <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                        </CardHeader>
                        <CardContent>
                             <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                                <li><strong>Ignoring Egress During Development:</strong> Assuming cloud costs are just about servers and storage, and getting a massive "bill shock" when the first month's data transfer fees arrive.</li>
                                <li><strong>Serving Large, Un-cached Assets:</strong> Serving large video files or high-resolution images directly from cloud storage without a CDN is a recipe for an enormous bill.</li>
                                <li><strong>Cross-Region Communication:</strong> Unnecessarily transferring large amounts of data between different cloud regions (e.g., cross-region database replication) when it could be handled within a single region.</li>
                                <li><strong>Not Monitoring Your Bill:</strong> Failing to set up billing alerts. All major cloud providers allow you to set alerts that notify you when your spending on data transfer exceeds a certain threshold, helping you catch unexpected egress spikes early.</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
                
               <section>
                  <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
                  <Card>
                      <CardContent className="p-6">
                          <Accordion type="single" collapsible className="w-full">
                              {faqData.map((item, index) => (
                                  <AccordionItem value={`item-${index}`} key={index}>
                                      <AccordionTrigger>{item.question}</AccordionTrigger>
                                      <AccordionContent><div dangerouslySetInnerHTML={{ __html: item.answer.replace(/href="\/tools\/([^"]*)"/g, 'href="/tools/$1" class="text-primary hover:underline"') }} /></AccordionContent>
                                  </AccordionItem>
                              ))}
                          </Accordion>
                      </CardContent>
                  </Card>
              </section>

              <section>
                  <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <Link href="/tools/cloud-storage-cost-estimator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Cloud Storage Cost Estimator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Get a complete picture by combining storage and egress cost estimates.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                      <Link href="/tools/data-transfer-calculator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Data Transfer Time Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Understand how bandwidth affects the time it takes to transfer your data.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                       <Link href="/tools/compression-estimator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Compression Savings Estimator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Estimate how much you can reduce your egress costs by compressing your assets.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                  </div>
              </section>
            </div>
        </>
    );
};

export default BandwidthCostCalculatorPage;
