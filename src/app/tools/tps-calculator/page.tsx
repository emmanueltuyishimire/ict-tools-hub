
import React from 'react';
import { PageHeader } from '@/components/page-header';
import { TpsCalculator } from './tps-calculator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BookOpen, AlertTriangle, Wand, ChevronRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const metadata = {
    title: 'Transaction / TPS Calculator | ICT Toolbench',
    description: 'Calculate Transactions Per Second (TPS) from a total number of transactions and a time period. A key tool for benchmarking database, API, and system performance.',
    openGraph: {
        title: 'Transaction / TPS Calculator | ICT Toolbench',
        description: 'Easily calculate system throughput by converting total transactions over a period into the standard TPS metric.',
        url: '/tools/tps-calculator',
    }
};

const TpsCalculatorPage = () => {
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
      "name": "Transaction / TPS Calculator",
      "operatingSystem": "All",
      "applicationCategory": "DeveloperApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "A free online tool to calculate Transactions Per Second (TPS) based on a total transaction count and a time period. Used for performance benchmarking.",
      "url": "https://www.icttoolbench.com/tools/tps-calculator"
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
                    title="Transaction / TPS Calculator"
                    description="Measure your system's throughput by calculating Transactions Per Second (TPS). This tool helps you benchmark the performance of databases, APIs, and other transactional systems."
                />
                
                <TpsCalculator />

                <section>
                    <h2 className="text-2xl font-bold mb-4">How to Use the Calculator</h2>
                    <Card className="prose prose-sm max-w-none text-foreground p-6">
                        <p>This tool provides a simple way to convert a total number of operations over a period into the standard TPS metric.</p>
                        <ol>
                            <li><strong>Enter Total Transactions:</strong> Input the total number of operations (e.g., database queries, API requests, sales) that occurred.</li>
                            <li><strong>Enter Time Period:</strong> Input the duration over which the transactions occurred and select the correct unit (Seconds, Minutes, or Hours).</li>
                            <li><strong>View the Result:</strong> The tool will instantly calculate the average Transactions Per Second (TPS) based on your inputs.</li>
                        </ol>
                    </Card>
                </section>
                
                <section>
                    <h2 className="text-2xl font-bold mb-4">Worked Examples</h2>
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Example 1: Benchmarking a Database Server</CardTitle>
                                <CardDescription>After running a load test, you need to find the average TPS the server was able to handle.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-muted-foreground"><strong>Scenario:</strong> You run a load test that executes <strong>1,800,000</strong> transactions over a period of <strong>10 minutes</strong>.</p>
                                <div className="prose prose-sm max-w-none">
                                    <ol>
                                        <li><strong>Inputs:</strong>
                                            <ul>
                                                <li>Total Transactions: <strong>1,800,000</strong></li>
                                                <li>Time Period: <strong>10</strong> Minutes</li>
                                            </ul>
                                        </li>
                                        <li><strong>Calculation:</strong>
                                            <ul>
                                                <li>First, convert the time period to seconds: 10 minutes × 60 seconds/minute = 600 seconds.</li>
                                                <li>Then, divide the total transactions by the total seconds: 1,800,000 / 600 = 3000.</li>
                                            </ul>
                                        </li>
                                        <li><strong>Result:</strong> The tool will show <strong>3,000 TPS</strong>. This gives you a clear performance benchmark for your database server under that specific load.</li>
                                    </ol>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Example 2: Planning for Peak Web Traffic</CardTitle>
                                <CardDescription>You are planning for a Black Friday sale and need to know the average TPS your web servers must handle during the peak hour.</CardDescription>
                            </CardHeader>
                             <CardContent className="space-y-4">
                               <p className="text-sm text-muted-foreground"><strong>Scenario:</strong> You forecast <strong>3.6 million</strong> total page views (requests) during your single busiest hour (e.g., 9 PM).</p>
                               <div className="prose prose-sm max-w-none">
                                   <ol>
                                       <li><strong>Inputs:</strong>
                                            <ul>
                                                <li>Total Transactions: <strong>3,600,000</strong></li>
                                                <li>Time Period: <strong>1</strong> Hour</li>
                                            </ul>
                                       </li>
                                       <li><strong>Calculation:</strong>
                                            <ul>
                                                <li>Convert the time period to seconds: 1 hour × 3600 seconds/hour = 3600 seconds.</li>
                                                <li>Divide total requests by total seconds: 3,600,000 / 3600 = 1000.</li>
                                            </ul>
                                       </li>
                                       <li><strong>Result:</strong> Your system needs to be able to handle an average of <strong>1,000 TPS</strong> to serve all users during the peak hour. You can use this metric to configure your server cluster and load balancers.</li>
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
                                      <dt><strong>{item.term}</strong></dt>
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
                            <CardTitle className="text-primary">Educational Deep Dive: Understanding System Throughput</CardTitle>
                        </div>
                        <CardDescription>From database benchmarks to API capacity planning, learn why TPS is a fundamental metric for measuring and designing scalable systems.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                        <section>
                            <h3>What is TPS?</h3>
                            <p>
                                <strong>Transactions Per Second (TPS)</strong> is a common performance metric that measures the number of atomic operations a system can process in one second. It's a measure of <strong>throughput</strong>—how much work a system can get done in a given amount of time. The definition of a "transaction" depends on the context:
                            </p>
                            <ul className="list-disc pl-5">
                                <li>For a <strong>database</strong>, it could be the number of SQL queries (reads and writes) executed per second.</li>
                                <li>For an <strong>API</strong>, it's the number of HTTP requests handled per second.</li>
                                <li>For an <strong>e-commerce system</strong>, it could be the number of orders processed per second.</li>
                            </ul>
                            <p>
                                By standardizing on a "per second" basis, TPS provides a consistent way to compare the performance of different systems or to measure the impact of an optimization.
                            </p>
                        </section>
                        <section>
                            <h3>TPS vs. Latency: The Two Pillars of Performance</h3>
                            <p>
                                TPS (Throughput) and Latency are the two most important pillars of system performance, and they are often in tension.
                            </p>
                             <ul className="list-disc pl-5">
                                <li><strong>Throughput (TPS):</strong> How much work can be done in total. Think of this as the number of cars that can cross a bridge in an hour.</li>
                                <li><strong>Latency:</strong> How long it takes for a single piece of work to be completed. Think of this as the time it takes for one car to cross the bridge. You can estimate network latency with our <Link href="/tools/latency-estimator" className="text-primary hover:underline">Latency Estimator</Link>.</li>
                             </ul>
                            <p>
                                A system can have high throughput but high latency (e.g., a batch processing system that handles millions of records per hour, but each batch takes 10 minutes). Conversely, a system can have low latency but low throughput (e.g., a real-time system that responds instantly but can only handle a few requests at once). The goal of a scalable system is to maintain low latency even as throughput increases.
                            </p>
                        </section>
                         <section>
                            <h3>What Limits a System's TPS?</h3>
                            <p>
                                A system's maximum achievable TPS is determined by its most constrained resource—the bottleneck. Common bottlenecks include:
                            </p>
                             <ul className="list-disc pl-5">
                               <li><strong>CPU:</strong> The server's processor can become a bottleneck if transactions involve heavy computation.</li>
                               <li><strong>Memory (RAM):</strong> If a database's "hot" data doesn't fit in RAM, it must constantly read from the much slower disk, limiting TPS.</li>
                               <li><strong>Disk I/O:</strong> The speed of the underlying storage (measured in IOPS) can be a major bottleneck for write-heavy database workloads. You can explore this with our <Link href="/tools/iops-calculator" className="text-primary hover:underline">IOPS Calculator</Link>.</li>
                               <li><strong>Network Bandwidth:</strong> The capacity of the network connection can limit how many requests can be received or responses sent per second.</li>
                               <li><strong>Concurrency and Locking:</strong> In a database, if many transactions are trying to access and modify the same row of data, they will have to wait for locks to be released, which severely limits TPS.</li>
                            </ul>
                            <p>Improving a system's TPS involves identifying and alleviating these bottlenecks, often through a combination of code optimization, vertical scaling (a bigger server), or horizontal scaling (more servers).</p>
                        </section>
                    </CardContent>
                </Card>
                
                <section>
                    <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Benchmarking a Database</h3>
                            <p className="text-sm text-muted-foreground">A DBA runs a performance test on a new PostgreSQL server. The test executes 1.8 million transactions over a 10-minute period. They plug <strong>1,800,000</strong> transactions and <strong>10</strong> minutes into the calculator to find that the server achieved an average of <strong>3,000 TPS</strong>. This provides a baseline performance metric for the new hardware.</p>
                        </div>
                         <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Capacity Planning for an API</h3>
                            <p className="text-sm text-muted-foreground">A developer is load-testing their new API. Their goal is to support 500 requests per second. The test shows the system successfully handled 27,000 requests in one minute. Using the calculator (<strong>27,000</strong> transactions in <strong>60</strong> seconds), they find the current performance is <strong>450 TPS</strong>. This tells them they are close to their goal but need to do a bit more optimization to reach 500 TPS.</p>
                        </div>
                         <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Sizing a Web Server</h3>
                            <p className="text-sm text-muted-foreground">A company is planning for a Black Friday sale and anticipates 7.2 million page views over the busiest 4-hour period. To understand the load on their web servers, they use the calculator to find the required TPS. <strong>7,200,000</strong> transactions in <strong>4</strong> hours equals an average of <strong>500 TPS</strong>. They can then ensure their server cluster is configured to handle this level of traffic.</p>
                        </div>
                         <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Evaluating a Third-Party Service</h3>
                            <p className="text-sm text-muted-foreground">A business is choosing a payment gateway provider. Provider A's documentation says they can handle "up to 60,000 transactions per minute." Provider B says they can handle "2,000 TPS." By using the calculator, the business can convert Provider A's claim (<strong>60,000</strong> transactions in <strong>1</strong> minute) to <strong>1,000 TPS</strong>, allowing for a direct, apples-to-apples comparison with Provider B.</p>
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
                                <li><strong>Distinguish Read vs. Write TPS:</strong> For databases, it's often more useful to measure read TPS and write TPS separately, as they have very different performance characteristics.</li>
                                <li><strong>Average vs. Peak TPS:</strong> Your system's average TPS over a day might be low, but what matters is its ability to handle your peak TPS during the busiest hour. Always plan for the peak.</li>
                                <li><strong>Use Realistic Benchmarks:</strong> When benchmarking, use a workload that closely mimics your real application's behavior. A simple `SELECT` query benchmark is not representative of a complex transaction involving multiple `UPDATE`s and `JOIN`s.</li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                             <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes</CardTitle></div>
                        </CardHeader>
                        <CardContent>
                             <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                                <li><strong>Ignoring Latency:</strong> A high TPS value is meaningless if the latency for each individual transaction is unacceptably high (e.g., several seconds). A good user experience requires both high throughput and low latency.</li>
                                <li><strong>Not Accounting for Concurrency:</strong> A benchmark that runs transactions one at a time will give a very different TPS result than one that runs hundreds of transactions concurrently, which better simulates real-world load and reveals contention issues.</li>
                                <li><strong>Forgetting About Caching:</strong> A well-implemented caching layer can handle a huge portion of read requests before they even hit the database, meaning the database's required TPS is often much lower than the application's overall request rate.</li>
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
            </div>
        </>
    );
};

export default TpsCalculatorPage;
