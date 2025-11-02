
import React from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { BookOpen, AlertTriangle, Wand, ChevronRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const metadata = {
    title: 'Cloud Migration Planning Guide | ICT Toolbench',
    description: 'A comprehensive guide to planning your cloud migration. Learn how to estimate costs, choose a strategy (rehost, refactor, etc.), and avoid common pitfalls.',
    openGraph: {
        title: 'Cloud Migration Planning Guide | ICT Toolbench',
        description: 'Your step-by-step guide to successfully planning and executing a cloud migration. From cost estimation to choosing the right strategy.',
        url: '/tools/cloud-migration-estimator',
    }
};

const CloudMigrationPlanningGuidePage = () => {
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
      "name": "Cloud Migration Planning Guide",
      "operatingSystem": "All",
      "applicationCategory": "DeveloperApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "An educational guide and framework for planning and estimating a cloud migration project, from assessing on-premises infrastructure to calculating cloud costs.",
      "url": "https://www.icttoolbench.com/tools/cloud-migration-estimator"
    };

    return (
        <>
            <StructuredData data={faqSchema} />
            <StructuredData data={howToSchema} />
            <StructuredData data={softwareAppSchema} />
            <div className="max-w-4xl mx-auto space-y-12">
                <PageHeader
                    title="Cloud Migration Planning Guide"
                    description="Successfully migrating to the cloud requires careful planning and estimation. This guide provides a framework to help you assess your current infrastructure, choose the right strategy, and forecast your costs."
                />
                
                <Card>
                    <CardHeader>
                        <CardTitle>Why This Isn't a Simple Calculator</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Alert>
                            <AlertTriangle className="h-4 w-4" />
                            <AlertTitle>Complexity of Cloud Migration</AlertTitle>
                            <AlertDescription>
                                A true cloud migration estimate is a complex project involving dozens of variables including server specs, storage performance, network traffic, software licensing, and labor costs. A simple calculator would be misleading. Instead, this guide provides a step-by-step framework and points you to specialized tools to build a comprehensive estimate.
                            </AlertDescription>
                        </Alert>
                    </CardContent>
                </Card>

                <section>
                    <h2 className="text-2xl font-bold mb-4">How to Estimate Your Cloud Migration</h2>
                    <Card className="prose prose-sm max-w-none text-foreground p-6">
                        <p>Follow these five phases to build a structured and realistic cloud migration plan and cost estimate.</p>
                        <ol>
                            <li><strong>Phase 1: Discovery & Assessment.</strong> Inventory your current on-premises servers, applications, and databases. Document CPU, RAM, storage size, and performance (IOPS). Use our <Link href="/tools/vm-requirement-estimator" className="text-primary hover:underline">VM Requirement Estimator</Link> to get a baseline for each server.</li>
                            <li><strong>Phase 2: Choose a Migration Strategy (The "6 R's").</strong> For each application, decide on a strategy: Rehost (lift-and-shift), Replatform, Repurchase, Refactor/Rearchitect, Retire, or Retain. See the "Educational Deep Dive" below for details on each.</li>
                            <li><strong>Phase 3: Estimate Cloud Resource Costs.</strong> Based on your chosen strategy, map your on-premises resources to cloud services.
                                <ul>
                                    <li>For servers (Rehost/Replatform), use our <Link href="/tools/cloud-instance-cost-calculator" className="text-primary hover:underline">Cloud Instance Cost Calculator</Link> to estimate monthly compute costs.</li>
                                    <li>For data, use the <Link href="/tools/cloud-storage-cost-estimator" className="text-primary hover:underline">Cloud Storage Cost Estimator</Link>.</li>
                                    <li>For network egress, use the <Link href="/tools/bandwidth-cost-calculator" className="text-primary hover:underline">Cloud Bandwidth Cost Calculator</Link>.</li>
                                </ul>
                            </li>
                            <li><strong>Phase 4: Estimate Migration & Labor Costs.</strong> Factor in the one-time costs: data transfer time (use our <Link href="/tools/data-transfer-calculator" className="text-primary hover:underline">Data Transfer Time Calculator</Link>), labor hours for refactoring, training costs for your team, and any parallel run costs (running both on-prem and cloud environments simultaneously during the transition).</li>
                            <li><strong>Phase 5: Calculate Total Cost of Ownership (TCO).</strong> Combine your estimated monthly cloud costs with your one-time migration costs. Compare this to your current on-premises TCO, including hardware, power, cooling, and IT staff time.</li>
                        </ol>
                    </Card>
                </section>

                 <section>
                    <h2 className="text-2xl font-bold mb-4">Worked Examples</h2>
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Example 1: Lift-and-Shift a Legacy Web App</CardTitle>
                                <CardDescription>A company needs to quickly move a legacy internal application out of a closing data center.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-muted-foreground"><strong>Scenario:</strong> A monolithic PHP application runs on a single on-premises server with 4 vCPUs, 16 GB RAM, and a 500 GB disk. It serves 100 internal users and has low data transfer.</p>
                                <div className="prose prose-sm max-w-none">
                                    <ol>
                                        <li><strong>Discovery:</strong> The resources are known: 4 CPU, 16 GB RAM, 500 GB storage. The application is self-contained.</li>
                                        <li><strong>Strategy:</strong> The team chooses **Rehost (Lift-and-Shift)** for maximum speed and minimum code changes.</li>
                                        <li><strong>Cloud Resource Estimation:</strong>
                                            <ul>
                                                <li>They use the <Link href="/tools/cloud-instance-cost-calculator" className="text-primary hover:underline">Cloud Instance Cost Calculator</Link> to compare the monthly cost of a 4-CPU, 16-GB RAM general-purpose VM on AWS, Azure, and Google Cloud.</li>
                                                <li>They use the <Link href="/tools/cloud-storage-cost-estimator" className="text-primary hover:underline">Cloud Storage Cost Estimator</Link> to calculate the cost of a 500 GB SSD block storage volume.</li>
                                                <li>Egress is negligible, so they skip the <Link href="/tools/bandwidth-cost-calculator" className="text-primary hover:underline">Bandwidth Cost Calculator</Link>.</li>
                                            </ul>
                                        </li>
                                        <li><strong>Result:</strong> They have a clear monthly cost estimate for running the application in the cloud, which they can compare to their current data center costs.</li>
                                    </ol>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Example 2: Replatforming a Database</CardTitle>
                                <CardDescription>A growing company wants to reduce the administrative burden of managing its own database server.</CardDescription>
                            </CardHeader>
                             <CardContent className="space-y-4">
                               <p className="text-sm text-muted-foreground"><strong>Scenario:</strong> A company runs a busy e-commerce site with a self-managed MySQL database on a dedicated server. The IT team spends hours each week on patching, backups, and maintenance.</p>
                               <div className="prose prose-sm max-w-none">
                                   <ol>
                                       <li><strong>Discovery:</strong> The current database server is consistently using 80% of its 8 vCPUs and 32 GB of RAM. The database size is 250 GB.</li>
                                       <li><strong>Strategy:</strong> They choose **Replatform ("Lift-and-Tinker")**. They will keep their web application servers as-is but migrate the database from their VM to a managed service like Amazon RDS or Azure Database for MySQL.</li>
                                       <li><strong>Cloud Resource Estimation:</strong>
                                            <ul>
                                                <li>Instead of a full VM, they look up the pricing for a managed database instance with similar CPU and RAM specs.</li>
                                                <li>They use the <Link href="/tools/backup-storage-calculator" className="text-primary hover:underline">Backup Storage Calculator</Link> to estimate the cost of the automated backups included with the managed service.</li>
                                            </ul>
                                       </li>
                                       <li><strong>Result:</strong> While the direct monthly cost of the managed database might be slightly higher than a raw VM, they can present a TCO argument to management showing significant savings in labor costs for patching, backups, and maintenance, justifying the move.</li>
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
                            <CardTitle className="text-primary">Educational Deep Dive: The 6 R's of Cloud Migration</CardTitle>
                        </div>
                        <CardDescription>From a simple "lift-and-shift" to a full re-architecture, understand the common strategies for moving applications to the cloud.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                        <section>
                            <h3>1. Rehosting ("Lift-and-Shift")</h3>
                            <p>This is the most straightforward strategy. You move your existing physical or virtual servers directly to a cloud provider's infrastructure (IaaS - Infrastructure as a Service) with minimal changes. You're essentially renting VMs that match your on-premises server specs.</p>
                            <ul className="list-disc pl-5">
                                <li><strong>Pros:</strong> Fastest migration path, lowest initial complexity.</li>
                                <li><strong>Cons:</strong> Doesn't take advantage of cloud-native features, can be cost-inefficient if applications are not optimized for the cloud. Often, you're just moving your old problems to a new location.</li>
                                <li><strong>Use Case:</strong> Ideal for large-scale legacy migrations where you need to exit a data center quickly. You can estimate the VM costs with our <Link href="/tools/cloud-instance-cost-calculator" className="text-primary hover:underline">Cloud Instance Cost Calculator</Link>.</li>
                            </ul>
                        </section>
                        <section>
                            <h3>2. Replatforming ("Lift-and-Tinker")</h3>
                            <p>This is a modification of rehosting. You still move the application largely as-is, but you make a few cloud-specific optimizations to get a tangible benefit. A common example is migrating an on-premises database to a managed database service in the cloud, like Amazon RDS or Azure SQL Database. This reduces administrative overhead.</p>
                            <ul className="list-disc pl-5">
                                <li><strong>Pros:</strong> A good balance of speed and cloud benefits. Reduces management burden for components like databases.</li>
                                <li><strong>Cons:</strong> Requires some code changes or configuration updates.</li>
                                <li><strong>Use Case:</strong> Migrating a standard web application and switching its self-hosted MySQL database to a managed cloud database service.</li>
                            </ul>
                        </section>
                         <section>
                            <h3>3. Repurchasing ("Drop-and-Shop")</h3>
                            <p>This strategy involves moving to a different product, typically a SaaS (Software as a Service) solution. You're dropping your old application and purchasing a new one that is already cloud-native.</p>
                             <ul className="list-disc pl-5">
                                <li><strong>Pros:</strong> Eliminates all infrastructure management. Moves you to a modern, fully managed platform.</li>
                                <li><strong>Cons:</strong> Can involve significant licensing costs, data migration challenges, and the need to retrain users.</li>
                                <li><strong>Use Case:</strong> Moving from a self-hosted CRM system to Salesforce, or from an on-premises Microsoft Exchange server to Microsoft 365.</li>
                            </ul>
                        </section>
                        <section>
                            <h3>4. Refactoring / Rearchitecting</h3>
                            <p>This is the most intensive strategy, involving a significant rewrite or re-architecture of the application to take full advantage of cloud-native features. This might mean breaking a monolithic application into microservices, using serverless functions, or leveraging cloud-specific storage and messaging queues.</p>
                             <ul className="list-disc pl-5">
                                <li><strong>Pros:</strong> Achieves the highest levels of performance, scalability, and cost-efficiency in the long run.</li>
                                <li><strong>Cons:</strong> Highest upfront cost, risk, and time commitment. Requires specialized cloud development skills.</li>
                                <li><strong>Use Case:</strong> A legacy monolithic e-commerce application is rewritten as a series of serverless functions and containerized microservices to handle spiky traffic and reduce idle costs.</li>
                            </ul>
                        </section>
                        <section>
                            <h3>5. Retiring</h3>
                            <p>During the discovery phase, you may find that some applications are no longer needed. The business value they provide is no longer worth the cost of maintaining them. In this case, the best strategy is to simply turn them off and decommission them.</p>
                             <ul className="list-disc pl-5">
                                <li><strong>Pros:</strong> Immediate cost savings from hardware, software, and maintenance.</li>
                                <li><strong>Cons:</strong> Requires careful analysis to ensure the application is truly redundant and has no hidden dependencies.</li>
                                <li><strong>Use Case:</strong> An old, unused internal reporting tool that has been replaced by a modern BI platform.</li>
                            </ul>
                        </section>
                        <section>
                            <h3>6. Retaining</h3>
                            <p>Sometimes, the right decision is to do nothing. Some applications may not be suitable for the cloud due to regulatory constraints, specialized hardware requirements, or costs that would be prohibitive in a cloud environment. These applications are left on-premises.</p>
                             <ul className="list-disc pl-5">
                                <li><strong>Pros:</strong> No migration cost or risk for that application.</li>
                                <li><strong>Cons:</strong> Requires maintaining a hybrid on-premises/cloud environment, which can add complexity.</li>
                                <li><strong>Use Case:</strong> A factory control system that requires ultra-low latency communication with on-site machinery and cannot tolerate the potential delays of the public internet.</li>
                            </ul>
                        </section>
                    </CardContent>
                </Card>
                
                <section>
                    <h2 className="text-2xl font-bold mb-4">Practical Tips</h2>
                     <Card>
                        <CardContent className="p-6">
                            <ul className="space-y-4">
                                <li className="flex items-start gap-4">
                                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold">Start with a Pilot Project</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Don't try to migrate everything at once. Choose a single, low-risk, but meaningful application as a pilot project. This allows your team to learn the process, understand the true costs, and build confidence before tackling mission-critical workloads.
                                        </p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold">Don't Forget Hidden Costs</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Your estimate must include more than just server costs. Factor in data egress fees (use our <Link href="/tools/bandwidth-cost-calculator" className="text-primary hover:underline">Bandwidth Cost Calculator</Link>), storage for backups (use our <Link href="/tools/backup-storage-calculator" className="text-primary hover:underline">Backup Storage Calculator</Link>), software licensing, team training, and the cost of running parallel environments during the transition.
                                        </p>
                                    </div>
                                </li>
                                 <li className="flex items-start gap-4">
                                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold">Optimize Before You Lift-and-Shift</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Before you rehost a server, analyze its performance. If an on-premises server is only using 10% of its CPU, don't provision an identical, expensive VM in the cloud. Right-size it from the start. Use our <Link href="/tools/vm-requirement-estimator" className="text-primary hover:underline">VM Requirement Estimator</Link> to get a better baseline.
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </CardContent>
                     </Card>
                </section>

                <div className="grid md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <div className='flex items-center gap-2'><Wand className="h-6 w-6 text-accent" /> <CardTitle>Pro Tips</CardTitle></div>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                                <li><strong>Leverage Cloud Provider Tools:</strong> All major cloud providers (AWS, Azure, Google) offer their own detailed migration assessment and TCO calculator tools. Use them for the most accurate financial modeling.</li>
                                <li><strong>Involve Stakeholders Early:</strong> A cloud migration is not just an IT project. Involve finance, security, and business unit leaders from the beginning to ensure alignment on goals, budget, and timelines.</li>
                                <li><strong>Focus on a Hybrid Model:</strong> For most established organizations, the end state is not 100% cloud, but a hybrid model where some workloads remain on-premises. Plan for secure and efficient connectivity between the two environments.</li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                             <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                        </CardHeader>
                        <CardContent>
                             <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                                <li><strong>Underestimating Network Costs:</strong> The number one cause of cloud "bill shock" is unexpected data egress fees. Carefully analyze your application's traffic patterns and model these costs.</li>
                                <li><strong>Ignoring Application Dependencies:</strong> Moving one application without understanding its dependencies on other on-premises systems can lead to high-latency, "chatty" communication across the internet, degrading performance.</li>
                                <li><strong>Lack of Cloud Skills:</strong> Assuming your on-premises IT team can immediately manage a cloud environment without proper training. Cloud security, networking, and cost management are specialized skills.</li>
                                <li><strong>"Lifting and Shifting" Inefficiency:</strong> Moving a poorly architected, inefficient on-premises application to the cloud often results in a more expensive, equally inefficient cloud application.</li>
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
                                      <AccordionContent>
                                        <div dangerouslySetInnerHTML={{ __html: item.answer.replace(/href="\/tools\/([^"]*)"/g, 'href="/tools/$1" class="text-primary hover:underline"') }} />
                                      </AccordionContent>
                                  </AccordionItem>
                              ))}
                          </Accordion>
                      </CardContent>
                  </Card>
              </section>

              <section>
                  <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <Link href="/tools/cloud-instance-cost-calculator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Cloud Instance Cost Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Estimate the monthly cost of your target VMs on AWS, Google Cloud, and Azure.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                      <Link href="/tools/bandwidth-cost-calculator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Bandwidth Cost Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Model your expected data egress fees, a critical and often-overlooked cost.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                       <Link href="/tools/data-transfer-calculator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Data Transfer Time Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Estimate how long your initial data migration will take based on your internet connection speed.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                  </div>
              </section>
            </div>
        </>
    );
};

export default CloudMigrationPlanningGuidePage;
