import React from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BookOpen, AlertTriangle, Wand, ChevronRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function DataMigrationEstimator() {
    return (
        <>
            <PageHeader
                title="Data Migration Estimator & Planning Guide"
                description="Successfully moving data requires careful planning. This guide provides a framework to help you estimate migration timelines, costs, and choose the right strategy for your project."
            />
            
            <div className="max-w-4xl mx-auto space-y-12">
              <Card>
                  <CardHeader>
                      <CardTitle>Why This Isn't a Simple Calculator</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <Alert>
                          <AlertTriangle className="h-4 w-4" />
                          <AlertTitle>Migration is a Complex Project</AlertTitle>
                          <AlertDescription>
                              A true data migration estimate depends on many factors: network speed, storage I/O, data transformation logic, and validation requirements. A simple calculator would be misleading. Instead, this guide provides a step-by-step framework and points you to specialized tools to build a realistic plan.
                          </AlertDescription>
                      </Alert>
                  </CardContent>
              </Card>

              <section>
                  <h2 className="text-2xl font-bold mb-4">How to Estimate Your Data Migration</h2>
                  <Card className="prose prose-sm max-w-none text-foreground p-6">
                      <p>Follow these phases to build a structured and realistic data migration plan and timeline.</p>
                      <ol>
                          <li><span className="font-bold">Phase 1: Scope & Profile Data.</span> Determine the total size and nature of the data you need to move.</li>
                          <li><span className="font-bold">Phase 2: Estimate Transfer Time.</span> Use our <Link href="/tools/data-transfer-calculator" className="text-primary hover:underline">Data Transfer Time Calculator</Link> with your available upload bandwidth to get a baseline time estimate. This determines the feasibility of a network transfer.</li>
                          <li><span className="font-bold">Phase 3: Choose Migration Strategy.</span> Based on the time estimate and your downtime tolerance, choose a strategy like "Big Bang" (with downtime) or "Trickle" (with replication).</li>
                          <li><span className="font-bold">Phase 4: Plan for Transformation & Validation.</span> Allocate time for any data cleaning, transformation, and the final validation process to ensure all data was migrated correctly.</li>
                          <li><span className="font-bold">Phase 5: Plan the Cutover.</span> Define the exact steps for the final cutover, including DNS changes, application configuration updates, and a rollback plan.</li>
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
                              <p className="text-sm text-muted-foreground"><span className="font-bold">Scenario:</span> A monolithic PHP application runs on a single on-premises server with 4 vCPUs, 16 GB RAM, and a 500 GB disk. It serves 100 internal users and has low data transfer.</p>
                              <div className="prose prose-sm max-w-none">
                                  <ol>
                                      <li><span className="font-bold">Discovery:</span> The resources are known: 4 CPU, 16 GB RAM, 500 GB storage. The application is self-contained.</li>
                                      <li><span className="font-bold">Strategy:</span> The team chooses <strong>Rehost (Lift-and-Shift)</strong> for maximum speed and minimum code changes.</li>
                                      <li><span className="font-bold">Cloud Resource Estimation:</span>
                                          <ul>
                                              <li>They use the <Link href="/tools/cloud-instance-cost-calculator" className="text-primary hover:underline">Cloud Instance Cost Calculator</Link> to compare the monthly costs of a 4-CPU, 16-GB RAM general-purpose VM on AWS, Azure, and Google Cloud.</li>
                                              <li>They use the <Link href="/tools/cloud-storage-cost-estimator" className="text-primary hover:underline">Cloud Storage Cost Estimator</Link> to calculate the cost of a 500 GB SSD block storage volume.</li>
                                              <li>Egress is negligible, so they skip the <Link href="/tools/bandwidth-cost-calculator" className="text-primary hover:underline">Bandwidth Cost Calculator</Link>.</li>
                                          </ul>
                                      </li>
                                      <li><span className="font-bold">Result:</span> They have a clear monthly cost estimate for running the application in the cloud, which they can compare to their current data center costs.</li>
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
                             <p className="text-sm text-muted-foreground"><span className="font-bold">Scenario:</span> A company runs a busy e-commerce site with a self-managed MySQL database on a dedicated server. The IT team spends hours each week on patching, backups, and maintenance.</p>
                             <div className="prose prose-sm max-w-none">
                                 <ol>
                                     <li><span className="font-bold">Discovery:</span> The current database server is consistently using 80% of its 8 vCPUs and 32 GB of RAM. The database size is 250 GB.</li>
                                     <li><span className="font-bold">Strategy:</span> They choose <strong>Replatform ("Lift-and-Tinker")</strong>. They will keep their web application servers as-is but migrate the database from their VM to a managed service like Amazon RDS or Azure Database for MySQL.</li>
                                     <li><span className="font-bold">Cloud Resource Estimation:</span>
                                          <ul>
                                              <li>Instead of a full VM, they look up the pricing for a managed database instance with similar CPU and RAM specs.</li>
                                              <li>They use the <Link href="/tools/backup-storage-calculator" className="text-primary hover:underline">Backup Storage Calculator</Link> to estimate the cost of the automated backups included with the managed service.</li>
                                          </ul>
                                     </li>
                                     <li><span className="font-bold">Result:</span> While the direct monthly cost of the managed database might be slightly higher than a raw VM, they can present a TCO argument to management showing significant savings in labor costs for patching, backups, and maintenance, justifying the move.</li>
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
}
