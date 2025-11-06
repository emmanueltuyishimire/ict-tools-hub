'use client';

import React from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BookOpen, AlertTriangle, Wand, ChevronRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';


export default function VmScalingCalculator() {
    return (
        <>
            <PageHeader
                title="VM Scaling Planning Guide"
                description="Choosing how to grow your infrastructure is a critical decision. This guide breaks down the two core scaling strategies—Vertical and Horizontal—to help you design a resilient, performant, and cost-effective system."
            />
            
            <div className="max-w-4xl mx-auto space-y-12">
              <Card>
                  <CardHeader>
                      <CardTitle>Why a Guide, Not a Calculator?</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <Alert>
                          <AlertTriangle className="h-4 w-4" />
                          <AlertTitle>Scaling is a Strategy, Not a Formula</AlertTitle>
                          <AlertDescription>
                              Effective VM scaling depends on your application's architecture, traffic patterns, and budget. A simple calculator cannot capture this complexity. This guide provides the framework and knowledge to make the right strategic decision, using our other tools to help with specific calculations.
                          </AlertDescription>
                      </Alert>
                  </CardContent>
              </Card>

              <section>
                  <h2 className="text-2xl font-bold mb-4">How to Plan Your Scaling Strategy</h2>
                  <Card className="prose prose-sm max-w-none text-foreground p-6">
                      <p>Follow these phases to develop a robust scaling strategy for your application.</p>
                      <ol>
                          <li><strong>Phase 1: Understand Your Workload.</strong> Identify whether your application is CPU-bound, memory-bound, or I/O-bound. Is your traffic spiky and unpredictable, or stable and consistent? Use our <Link href="/tools/vm-requirement-estimator" className="text-primary hover:underline">VM Requirement Estimator</Link> to get a baseline understanding of your resource needs.</li>
                          <li><strong>Phase 2: Choose a Scaling Direction (Vertical vs. Horizontal).</strong> Based on your workload and architecture, decide on a primary scaling strategy. The "Educational Deep Dive" below provides a detailed comparison to guide this choice.</li>
                          <li><strong>Phase 3: Model Your Costs.</strong>
                              <ul>
                                  <li>For <strong>Vertical Scaling</strong>, use our <Link href="/tools/cloud-instance-cost-calculator" className="text-primary hover:underline">Cloud Instance Cost Calculator</Link> to compare the monthly costs of progressively larger VM instances.</li>
                                  <li>For <strong>Horizontal Scaling</strong>, use the same calculator to determine the cost of a single small instance, and then multiply by the number of instances you expect to run at peak load.</li>
                              </ul>
                          </li>
                          <li><strong>Phase 4: Define Autoscaling Triggers.</strong> If using horizontal scaling, define the metrics that will trigger scaling events. Common triggers include:
                              <ul>
                                  <li>CPU Utilization (e.g., scale out when average CPU > 70% for 5 minutes).</li>
                                  <li>Request Count or Network Traffic.</li>
                                  <li>Queue length in a messaging system.</li>
                              </ul>
                          </li>
                          <li><strong>Phase 5: Monitor, Test, and Iterate.</strong> Deploy your initial configuration, monitor its real-world performance, and use the data to continuously refine your instance sizes and scaling rules.</li>
                      </ol>
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
                          <CardTitle className="text-primary">Educational Deep Dive: Vertical vs. Horizontal Scaling</CardTitle>
                      </div>
                      <CardDescription>From "scaling up" a single monolith to "scaling out" with distributed microservices, understand the two fundamental approaches to handling growth.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                      <section>
                          <h3>Vertical Scaling ("Scaling Up")</h3>
                          <p>
                              Vertical scaling involves increasing the resources of a single server. You start with a small VM and, as your traffic grows, you make that single VM more powerful by adding more vCPUs, more RAM, or faster storage. It’s like trading in your sedan for a sports car—it's still one car, just a much more powerful one.
                          </p>
                          <div className="grid md:grid-cols-2 gap-4 my-4">
                              <div className="bg-muted p-4 rounded-lg">
                                  <strong>Pros:</strong>
                                  <ul className="list-disc pl-5 mt-2">
                                      <li><strong>Simplicity:</strong> It's the simplest approach. There are no changes to your application architecture. You just stop the VM, select a larger instance type, and start it again.</li>
                                      <li><strong>Good for Monoliths:</strong> Ideal for single, monolithic applications (like many traditional databases) that are not designed to run across multiple machines.</li>
                                      <li><strong>No Code Changes:</strong> Usually requires zero code modification.</li>
                                  </ul>
                              </div>
                              <div className="bg-muted p-4 rounded-lg">
                                  <strong>Cons:</strong>
                                  <ul className="list-disc pl-5 mt-2">
                                      <li><strong>Has a Hard Limit:</strong> You will eventually hit the largest VM size your cloud provider offers. There is a physical ceiling to how much you can scale up.</li>
                                      <li><strong>Expensive:</strong> The cost increases exponentially. The most powerful VMs can cost thousands of dollars per month.</li>
                                      <li><strong>Downtime Required:</strong> Resizing a VM almost always requires a reboot, resulting in a small period of downtime.</li>
                                      <li><strong>Single Point of Failure:</strong> Your entire application runs on one machine. If that VM fails, your application is completely down.</li>
                                  </ul>
                              </div>
                          </div>
                      </section>
                      <section>
                          <h3>Horizontal Scaling ("Scaling Out")</h3>
                          <p>
                              Horizontal scaling involves adding more servers (VMs) to your resource pool. Instead of making one server more powerful, you distribute the load across multiple, often smaller, identical servers. It’s like adding more cars to your fleet instead of upgrading a single one. This is the foundation of modern, cloud-native architecture.
                          </p>
                          <div className="grid md:grid-cols-2 gap-4 my-4">
                              <div className="bg-muted p-4 rounded-lg">
                                  <strong>Pros:</strong>
                                  <ul className="list-disc pl-5 mt-2">
                                      <li><strong>High Availability:</strong> If one VM fails, the others in the pool continue to handle traffic. There is no single point of failure.</li>
                                      <li><strong>Virtually Unlimited Scalability:</strong> You can theoretically add hundreds or thousands of VMs to handle massive amounts of traffic.</li>
                                      <li><strong>Cost-Effective:</strong> You can use smaller, cheaper instances and only pay for what you need at any given moment, thanks to autoscaling.</li>
                                      <li><strong>No Downtime for Scaling:</strong> Adding or removing VMs from the pool happens seamlessly with no downtime for the application.</li>
                                  </ul>
                              </div>
                              <div className="bg-muted p-4 rounded-lg">
                                  <strong>Cons:</strong>
                                  <ul className="list-disc pl-5 mt-2">
                                      <li><strong>Architectural Complexity:</strong> This is the biggest challenge. Your application must be designed to be <strong>stateless</strong>, meaning it doesn't store any user-specific data (like session information) on the local VM. State must be offloaded to a shared resource like a database or a distributed cache (e.g., Redis).</li>
                                      <li><strong>Requires a Load Balancer:</strong> You need a load balancer to intelligently distribute incoming traffic across all the VMs in the pool.</li>
                                      <li><strong>Complex Deployment & Management:</strong> Managing and deploying code to a fleet of servers is more complex than managing a single one. This requires automation and tools like container orchestration (e.g., Kubernetes).</li>
                                  </ul>
                              </div>
                          </div>
                      </section>
                       <section>
                          <h3>Which One to Choose?</h3>
                          <p>
                              The choice depends on your application. For a stateful application like a traditional relational database, vertical scaling is often the only option. You scale up the database server until it can no longer handle the load. For a stateless web or application server, horizontal scaling is almost always the superior, modern approach. The ideal cloud-native architecture often uses both: a horizontally scaled fleet of web servers connecting to a single, vertically scaled database server.
                          </p>
                      </section>
                  </CardContent>
              </Card>
              
               <section>
                  <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-card p-6 rounded-lg">
                          <h3 className="font-semibold text-lg mb-2">Scaling a Monolithic Database</h3>
                          <p className="text-sm text-muted-foreground">A company's PostgreSQL database server is struggling, with RAM usage consistently at 95%. Since a traditional relational database is stateful and hard to scale horizontally, the administrator chooses to <strong>scale vertically</strong>. They schedule a maintenance window, shut down the VM, change its instance type from one with 16GB RAM to one with 32GB RAM, and restart it. Performance immediately improves.</p>
                      </div>
                       <div className="bg-card p-6 rounded-lg">
                          <h3 className="font-semibold text-lg mb-2">Scaling an E-commerce Web Tier</h3>
                          <p className="text-sm text-muted-foreground">An e-commerce site gets a huge traffic spike during a Black Friday sale. Their web servers are stateless and behind a load balancer. The system is configured to <strong>scale horizontally</strong>. An autoscaling rule detects that average CPU usage has exceeded 70% and automatically provisions five new web server VMs, adding them to the pool. The load is distributed, performance remains stable, and once the sale is over, the extra VMs are automatically terminated to save costs.</p>
                      </div>
                  </div>
              </section>

              <div className="grid md:grid-cols-2 gap-8">
                  <Card>
                      <CardHeader>
                          <div className='flex items-center gap-2'><Wand className="h-6 w-6 text-accent" /> <CardTitle>Pro Tips</CardTitle></div>
                      </CardHeader>
                      <CardContent>
                          <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                              <li><strong>Decouple Your Application:</strong> The key to horizontal scaling is to separate your application's components. Move user sessions out of local memory and into a shared cache like Redis. Store user uploads in a separate object storage service like AWS S3, not on the VM's local disk.</li>
                              <li><strong>Automate Everything:</strong> Use infrastructure-as-code tools (like Terraform or CloudFormation) to define your VMs and autoscaling groups. This makes your setup repeatable, consistent, and easy to manage.</li>
                              <li><strong>Monitor the Right Metrics:</strong> CPU and RAM are just the start. Monitor application-level metrics like request latency, error rates, and queue depths to get a true picture of your system's health and to create more intelligent scaling triggers.</li>
                          </ul>
                      </CardContent>
                  </Card>
                  <Card>
                      <CardHeader>
                           <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                      </CardHeader>
                      <CardContent>
                           <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                              <li><strong>Scaling Vertically for Stateless Apps:</strong> Using a single, massive, and expensive VM for a web application that could easily be scaled horizontally across multiple cheap VMs. This is less resilient and more expensive.</li>
                              <li><strong>Ignoring the Database Bottleneck:</strong> Horizontally scaling your web servers to infinity is useless if they are all waiting on a single, overloaded database server. You must also address the database's performance, often through vertical scaling, read replicas, or caching.</li>
                              <li><strong>Setting Poor Autoscaling Triggers:</strong> Setting a CPU trigger too high (e.g., 95%) can mean you scale too late, after users are already experiencing slowdowns. Setting it too low can cause your system to "thrash" by constantly adding and removing instances, increasing costs.</li>
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
                                <CardDescription className="text-xs">Estimate the initial size of the VMs you plan to use in your scaling strategy.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                    <Link href="/tools/cloud-instance-cost-calculator" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">Cloud Instance Cost Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">Model the costs of your scaling plan, whether it involves bigger VMs or more of them.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                     <Link href="/tools/uptime-calculator" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">Uptime / Availability Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">Understand how horizontal scaling with redundancy improves your overall service availability.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                </div>
            </section>
          </div>
        </>
    );
}
