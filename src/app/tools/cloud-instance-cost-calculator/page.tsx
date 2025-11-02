
import React from 'react';
import { PageHeader } from '@/components/page-header';
import { CloudInstanceCostCalculator } from './cloud-instance-cost-calculator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
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
        <>
            <StructuredData data={faqSchema} />
            <StructuredData data={howToSchema} />
            <StructuredData data={softwareAppSchema} />
            <div className="max-w-4xl mx-auto space-y-12">
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
                            <li><strong>Enter VM Resources:</strong> Input the number of virtual CPUs (vCPUs) and the amount of RAM (in GB) that you require for your instance. You can get a baseline for this using our <Link href="/tools/vm-requirement-estimator">VM Requirement Estimator</Link>.</li>
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
                    </Card>
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
                            <CardTitle className="text-primary">Educational Deep Dive: Navigating Cloud Pricing Models</CardTitle>
                        </div>
                        <CardDescription>From On-Demand flexibility to Reserved Instance savings, understand the different ways cloud providers bill for compute resources.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                        <section>
                            <h3>What Am I Paying For? The Core Components</h3>
                            <p>
                                When you rent a Virtual Machine (VM) from a cloud provider, your bill is primarily determined by the resources you consume over time. While this tool focuses on the main drivers—CPU and RAM—it's important to understand the full picture.
                            </p>
                            <ul className="list-disc pl-5">
                                <li><strong>Compute (vCPU and RAM):</strong> This is the core of your instance cost, billed per hour or per second. It's the processing power and memory you reserve. This tool estimates this component.</li>
                                <li><strong>Storage (Disk):</strong> You pay for the virtual hard disk attached to your VM. This is usually priced per GB-month. Faster storage (like Provisioned IOPS SSDs) costs more than standard storage. Use our <Link href="/tools/cloud-storage-cost-estimator">Cloud Storage Cost Estimator</Link> to model this.</li>
                                <li><strong>Data Transfer (Egress):</strong> You are charged for data that leaves the cloud provider's network. This can be a significant and often overlooked cost. Use our <Link href="/tools/bandwidth-cost-calculator">Bandwidth Cost Calculator</Link> to estimate this.</li>
                            </ul>
                        </section>
                        <section>
                            <h3>The Three Main Pricing Models</h3>
                            <p>Cloud providers offer different pricing models to suit different needs. This tool uses On-Demand pricing for its estimates, but you should be aware of the others for cost optimization.</p>
                            <ol className="list-decimal pl-5">
                               <li><strong>On-Demand:</strong> This is the pay-as-you-go model. You pay a fixed rate per hour or per second for the compute capacity you use, with no long-term commitment. It's flexible and perfect for applications with unpredictable workloads or for short-term development and testing. It is, however, the most expensive model.</li>
                               <li><strong>Reserved Instances (RIs) / Committed Use Discounts (CUDs):</strong> If you have a stable, predictable workload (like a production database that runs 24/7), you can commit to using a specific instance type for a 1-year or 3-year term. In exchange for this commitment, you receive a significant discount (often 40-75%) compared to On-Demand prices.</li>
                               <li><strong>Spot Instances:</strong> This model allows you to bid on spare, unused compute capacity in a provider's data center. You can get massive discounts (up to 90%), but the provider can terminate your instance with very short notice if they need the capacity back. Spot instances are ideal for fault-tolerant, stateless, or batch-processing workloads that can be interrupted and resumed later.</li>
                            </ol>
                        </section>
                    </CardContent>
                </Card>
                
                <section>
                    <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Budgeting for a New Project</h3>
                            <p className="text-sm text-muted-foreground">A developer is planning to deploy a new web application and has estimated they need a VM with 4 vCPUs and 8 GB of RAM. They use the calculator to quickly compare the estimated monthly On-Demand costs between AWS (us-east-1), Google Cloud (us-central1), and Azure (East US), helping them make a preliminary budget and platform decision.</p>
                        </div>
                         <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Justifying a Migration to Reserved Instances</h3>
                            <p className="text-sm text-muted-foreground">An operations team has been running a production database on a large On-Demand instance (e.g., 8 vCPU, 32 GB RAM) for over a year. They use the calculator to show management the current estimated monthly cost. They then use the "Custom" pricing feature to input the 1-year Reserved Instance pricing, demonstrating that by making a commitment, they could save over 40% on their compute costs each month.</p>
                        </div>
                    </div>
                </section>

                <div className="grid md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <div className='flex items-center gap-2'><Wand className="h-6 w-6 text-accent" /> <CardTitle>Pro Tips for Cost Optimization</CardTitle></div>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                                <li><strong>Right-Size Your Instances:</strong> Don't guess. Use your cloud provider's monitoring tools to find VMs that are consistently underutilized (e.g., CPU average below 20%) and resize them to a smaller, cheaper instance type.</li>
                                <li><strong>Leverage Autoscaling:</strong> For web servers with fluctuating traffic, use autoscaling groups. This allows you to run a minimal number of instances during off-peak hours and automatically add more as traffic increases, so you only pay for what you need.</li>
                                <li><strong>Shut Down Dev/Test Environments:</strong> Don't leave development and staging servers running 24/7. Automate scripts to shut them down outside of business hours and on weekends to save up to 70% on their costs.</li>
                                <li><strong>Choose the Right Region:</strong> Cloud pricing varies by region. If your application's latency requirements allow, deploying in a cheaper region can lead to significant savings.</li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                             <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                        </CardHeader>
                        <CardContent>
                             <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                                <li><strong>Forgetting About Associated Costs:</strong> This calculator only estimates compute costs. Forgetting to budget for storage, data egress, load balancers, and monitoring can lead to major bill shock.</li>
                                <li><strong>Choosing the Wrong Instance Family:</strong> Running a memory-hungry database on a compute-optimized instance is inefficient. Match your workload to the instance family (General Purpose, Compute Optimized, Memory Optimized) for the best price-to-performance ratio.</li>
                                <li><strong>Ignoring Reserved Instances:</strong> For any server that runs 24/7 with a predictable load, failing to use Reserved Instances is like turning down free money. It's the single biggest cost-saving measure for stable workloads.</li>
                                <li><strong>Neglecting Monitoring:</strong> Provisioning a VM and never checking its usage is a recipe for wasted money. Regularly review your monitoring dashboards to identify opportunities for rightsizing.</li>
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
                                      <AccordionContent>{item.answer}</AccordionContent>
                                  </AccordionItem>
                              ))}
                          </Accordion>
                      </CardContent>
                  </Card>
              </section>

              <section>
                  <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <Link href="/tools/vm-requirement-estimator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">VM Requirement Estimator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Don't know how much CPU or RAM you need? Start with this tool to get a baseline estimate.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                      <Link href="/tools/cloud-storage-cost-estimator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Cloud Storage Cost Estimator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Estimate the cost of object storage (like S3 or GCS), another key part of your cloud bill.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                       <Link href="/tools/bandwidth-cost-calculator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Bandwidth Cost Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Estimate your data transfer (egress) costs, which are often a surprising part of the total cost.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                  </div>
              </section>
            </div>
        </>
    );
};

export default CloudInstanceCostCalculatorPage;
