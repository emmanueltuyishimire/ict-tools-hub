
import React from 'react';
import { PageHeader } from '@/components/page-header';
import { IopsCalculator } from './iops-calculator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BookOpen, AlertTriangle, Wand, ChevronRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const metadata = {
    title: 'IOPS Calculator | Storage Performance Estimator | ICT Toolbench',
    description: 'Estimate the total Input/Output Operations Per Second (IOPS) for your storage array. A tool for system administrators and cloud engineers to plan for database and application performance.',
    openGraph: {
        title: 'IOPS Calculator | Storage Performance Estimator | ICT Toolbench',
        description: 'Calculate the IOPS of your storage array based on drive type, count, and RAID level to ensure your storage can handle your workload.',
        url: '/tools/iops-calculator',
    }
};

const IopsCalculatorPage = () => {
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
      "name": "IOPS Calculator",
      "operatingSystem": "All",
      "applicationCategory": "DeveloperApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "A free online tool for estimating the total IOPS of a storage array based on disk type, count, RAID level, and read/write workload.",
      "url": "https://www.icttoolbench.com/tools/iops-calculator"
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
            <div className="max-w-4xl mx-auto space-y-12">
                <PageHeader
                    title="IOPS Calculator"
                    description="Estimate your storage array's performance in Input/Output Operations Per Second (IOPS). This tool helps you plan storage configurations to meet the demands of your database, virtualization, or high-traffic application workloads."
                />
                
                <IopsCalculator />

                <section>
                    <h2 className="text-2xl font-bold mb-4">How to Use the IOPS Calculator</h2>
                    <Card className="prose prose-sm max-w-none text-foreground p-6">
                        <p>This tool helps you estimate the performance of a disk array based on its configuration. Here's how to use it:</p>
                        <ol>
                            <li><strong>Select Your Disk Type:</strong> Choose the type of drive you are using in your array (e.g., 7.2K RPM HDD, Enterprise SSD). This sets a baseline IOPS value for a single disk. You can also select "Custom" to enter your own single-disk IOPS value.</li>
                            <li><strong>Enter Disk Count:</strong> Specify the total number of physical disks in the array.</li>
                            <li><strong>Choose a RAID Level:</strong> Select the RAID configuration you plan to use (e.g., RAID 5, RAID 10).</li>
                            <li><strong>Define Your Workload:</strong> Use the slider to specify the read/write ratio of your application. A database might be 70% reads and 30% writes, while a video surveillance system might be 10% reads and 90% writes.</li>
                            <li><strong>Analyze the Results:</strong> The tool will instantly calculate the estimated total IOPS your array can deliver for reads and writes, factoring in the performance penalties associated with certain RAID levels.</li>
                        </ol>
                        <Alert>
                            <AlertTriangle className="h-4 w-4" />
                            <AlertTitle>This is a Theoretical Estimate</AlertTitle>
                            <AlertDescription>
                               Real-world IOPS can be affected by many factors, including the RAID controller, cache, block size, and queue depth. This tool provides a valuable baseline for planning but should not be used as a substitute for actual benchmarking.
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
                            <CardTitle className="text-primary">Educational Deep Dive: IOPS and Storage Performance</CardTitle>
                        </div>
                        <CardDescription>From disk mechanics to RAID penalties, understand the factors that determine how quickly your storage system can serve data.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                        <section>
                            <h3>What is IOPS?</h3>
                            <p>
                                <strong>IOPS (Input/Output Operations Per Second)</strong> is a standard performance metric used to benchmark computer storage devices. It measures the number of read and write operations a device can perform in one second. While throughput (measured in MB/s) tells you how fast you can transfer a single large file, IOPS tells you how well the device handles a large number of small, random requests.
                            </p>
                            <p>
                                This makes IOPS a critical metric for "transactional" workloads. A busy database server, a virtualization host running many VMs, or a web server handling thousands of simultaneous user sessions all rely on high IOPS. For these applications, the ability to quickly access many small chunks of data scattered across the disk is more important than raw sequential throughput.
                            </p>
                        </section>
                        <section>
                            <h3>How RAID Levels Impact IOPS</h3>
                            <p>
                                When you combine multiple disks into a RAID array, the total IOPS is not just the sum of the individual disks. The RAID level chosen has a profound impact, especially on write performance, due to the "RAID penalty." Our <Link href="/tools/raid-calculator" className="text-primary hover:underline">RAID Storage Calculator</Link> provides a general overview of these levels.
                            </p>
                            <ul className="list-disc pl-5">
                                <li><strong>RAID 0 (Striping):</strong> Offers the best performance. Total IOPS is simply the sum of the IOPS of all disks, for both reads and writes. (Total IOPS = N × Disk IOPS).</li>
                                <li><strong>RAID 1 (Mirroring):</strong> Read IOPS are the sum of all disks, as a read can be served from any disk in the mirror. However, every write must be duplicated to all disks, so the total write IOPS is just the IOPS of a single disk.</li>
                                <li><strong>RAID 5 (Striping with Distributed Parity):</strong> For every one write operation from the application, the RAID controller has to perform four actions: read old data, read old parity, write new data, write new parity. This "read-modify-write" sequence incurs a <strong>write penalty of 4</strong>. This means the effective write IOPS of a RAID 5 array is only one-quarter of the total IOPS of its member disks (excluding the parity disk). Read performance is excellent.</li>
                                 <li><strong>RAID 6 (Striping with Dual Parity):</strong> This is even more severe. To write two parity blocks, a RAID 6 controller must perform six actions for every one application write (read old data, read old parity 1, read old parity 2, write new data, write new parity 1, write new parity 2). This incurs a <strong>write penalty of 6</strong>, making it very slow for write-intensive workloads.</li>
                                 <li><strong>RAID 10 (Stripe of Mirrors):</strong> Every write is mirrored to its pair, just like in RAID 1. This incurs a <strong>write penalty of 2</strong>. Because there is no complex parity calculation, RAID 10 offers excellent random write performance, second only to RAID 0, while still providing redundancy.</li>
                            </ul>
                        </section>
                    </CardContent>
                </Card>
                
                <section>
                    <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Sizing a Database Server</h3>
                            <p className="text-sm text-muted-foreground">A database administrator (DBA) knows their application is heavily transactional and requires 5,000 IOPS with a 70/30 read/write split. They use the IOPS calculator to model different arrays. They find that a 6-disk RAID 10 array using Enterprise SSDs can easily meet this requirement, while a RAID 5 array with the same disks would fail to meet the write IOPS demand due to the heavy write penalty.</p>
                        </div>
                         <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Choosing Cloud Storage</h3>
                            <p className="text-sm text-muted-foreground">A cloud engineer is provisioning a disk volume (like AWS EBS) for a high-traffic application. The provider offers different tiers: "General Purpose" (e.g., 3,000 IOPS) and "Provisioned IOPS" (e.g., 16,000 IOPS). By using this tool to estimate their workload's IOPS needs, the engineer can make a data-driven decision, choosing the more expensive Provisioned IOPS volume because they can demonstrate the application requires it, avoiding performance bottlenecks.</p>
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
                                <li><strong>Match RAID to Workload:</strong> For write-heavy transactional databases, RAID 10 is almost always the best choice. For read-heavy workloads like a web server or a data warehouse, the cost-effectiveness and good read performance of RAID 5 or RAID 6 can be a good fit.</li>
                                <li><strong>Don't Forget Cache:</strong> A RAID controller with a large, battery-backed write cache can significantly improve write performance by absorbing bursts of write activity and de-staging them to the disks later.</li>
                                <li><strong>SSD vs. HDD:</strong> As the calculator shows, even a single SSD can outperform an entire array of spinning disks for random I/O. For any IOPS-sensitive workload, SSDs are the standard.</li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                             <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes</CardTitle></div>
                        </CardHeader>
                        <CardContent>
                             <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                                <li><strong>Using RAID 5/6 for Write-Intensive Workloads:</strong> A frequent mistake is to choose RAID 5 for a transactional database because of its good storage efficiency. The high write penalty will inevitably lead to poor performance under load.</li>
                                <li><strong>Focusing Only on Throughput:</strong> Choosing a disk array based on its high MB/s throughput for a workload that is actually IOPS-bound. This is like buying a truck to compete in a Formula 1 race.</li>
                                <li><strong>Ignoring the RAID Penalty:</strong> Assuming that an 8-disk array will have 8 times the performance of a single disk. This is only true for RAID 0. For all other levels, the RAID penalty, especially for writes, must be factored in.</li>
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
                      <Link href="/tools/raid-calculator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">RAID Storage Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Analyze the capacity and fault tolerance trade-offs of different RAID levels.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                      <Link href="/tools/vm-requirement-estimator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">VM Requirement Estimator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Estimate the CPU and RAM needs for your database or application workload.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                       <Link href="/tools/data-transfer-calculator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Data Transfer Time Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Understand the difference between IOPS (operations/sec) and throughput (MB/sec).</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                  </div>
              </section>
            </div>
        </>
    );
};

export default IopsCalculatorPage;
