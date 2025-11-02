
import React from 'react';
import { PageHeader } from '@/components/page-header';
import { RaidCalculator } from './raid-calculator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { BookOpen, AlertTriangle, Wand, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const metadata = {
    title: 'RAID Storage Calculator | ICT Toolbench',
    description: 'Calculate usable capacity, fault tolerance, and efficiency for RAID 0, 1, 5, 6, and 10 arrays. An essential tool for server administrators and storage enthusiasts.',
    openGraph: {
        title: 'RAID Storage Calculator | ICT Toolbench',
        description: 'Easily compare different RAID levels to plan your server storage. Our calculator helps you understand the trade-offs between performance, capacity, and redundancy.',
        url: '/tools/raid-calculator',
    }
};

const RaidCalculatorPage = () => {
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
      "name": "RAID Storage Calculator",
      "operatingSystem": "All",
      "applicationCategory": "DeveloperApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "A free online tool to calculate and compare the usable capacity, fault tolerance, and efficiency of various RAID levels (RAID 0, 1, 5, 6, 10).",
      "url": "https://www.icttoolbench.com/tools/raid-calculator"
    };

    return (
        <>
            <StructuredData data={faqSchema} />
            <StructuredData data={howToSchema} />
            <StructuredData data={softwareAppSchema} />
            <div className="max-w-4xl mx-auto space-y-12">
                <PageHeader
                    title="RAID Storage Calculator"
                    description="Plan your storage array with confidence. This tool helps you calculate the usable capacity, fault tolerance, and efficiency for common RAID levels, empowering you to make informed decisions about your data storage strategy."
                />
                
                <RaidCalculator />

                <section>
                    <h2 className="text-2xl font-bold mb-4">How to Use the RAID Calculator</h2>
                    <Card className="prose prose-sm max-w-none text-foreground p-6">
                        <p>This calculator simplifies the complex task of determining the characteristics of a RAID array. Follow these steps to model your configuration:</p>
                        <ol>
                            <li><strong>Select the RAID Level:</strong> Choose the RAID configuration you want to analyze from the dropdown menu (e.g., RAID 5, RAID 10).</li>
                            <li><strong>Set the Number of Disks:</strong> Use the slider or input field to specify the total number of physical disks in your array. The tool will enforce the minimum disk requirements for each RAID level.</li>
                            <li><strong>Enter Disk Size:</strong> Input the capacity of a single disk in the array. This calculator assumes all disks are the same size, which is a requirement for most RAID setups.</li>
                            <li><strong>Analyze the Results:</strong> The tool instantly calculates and displays the key metrics for your chosen configuration:
                                <ul>
                                    <li><strong>Total Raw Capacity:</strong> The sum of all individual disk capacities.</li>
                                    <li><strong>Usable Capacity:</strong> The actual storage space available to you after accounting for data used for parity or mirroring.</li>
                                    <li><strong>Storage Efficiency:</strong> The percentage of raw capacity that is usable.</li>
                                    <li><strong>Fault Tolerance:</strong> The number of disk failures the array can withstand before data is lost.</li>
                                </ul>
                            </li>
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
                            <CardTitle className="text-primary">Educational Deep Dive: A Guide to RAID Levels</CardTitle>
                        </div>
                        <CardDescription>From simple stripping to complex parity, understand the fundamental trade-offs between performance, capacity, and redundancy that define each RAID level.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                        <section>
                            <h3>What is RAID?</h3>
                            <p>
                                <strong>RAID (Redundant Array of Independent Disks)</strong> is a data storage virtualization technology that combines multiple physical disk drives into one or more logical units for the purposes of data redundancy, performance improvement, or both. It's a foundational technology for servers, network-attached storage (NAS), and high-performance workstations.
                            </p>
                            <p>
                                The core idea of RAID is to manage the trade-offs between three competing goals: <strong>Capacity</strong> (how much data you can store), <strong>Performance</strong> (how fast you can read/write data), and <strong>Redundancy</strong> (how well your data is protected from a disk failure). Different RAID levels prioritize these goals differently.
                            </p>
                        </section>
                        <section>
                            <h3>The Most Common RAID Levels Explained</h3>
                            <p>This calculator helps you model the most common RAID configurations:</p>
                            <ul className="list-disc pl-5">
                                <li>
                                    <strong>RAID 0 (Striping):</strong> Data is "striped" across multiple disks. When a file is written, it's broken into chunks, and each chunk is written to a different disk simultaneously.
                                    <ul>
                                        <li><strong>Pros:</strong> Excellent performance (both read and write speeds are multiplied by the number of disks). 100% storage efficiency.</li>
                                        <li><strong>Cons:</strong> Zero fault tolerance. If <strong>any single disk fails, all data in the array is lost.</strong> It is only suitable for temporary data or scratch disks where performance is paramount and data loss is acceptable.</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>RAID 1 (Mirroring):</strong> Data is duplicated across two or more disks. An exact copy of every piece of data is written to each disk in the array.
                                    <ul>
                                        <li><strong>Pros:</strong> Excellent read performance and high fault tolerance. The array can survive the failure of all but one disk.</li>
                                        <li><strong>Cons:</strong> Poor storage efficiency (always 50% or less). Write performance is slightly slower as data must be written to all disks. Ideal for operating system drives and critical, small-capacity data.</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>RAID 5 (Striping with Distributed Parity):</strong> Data is striped across all disks, but it also calculates "parity" information and writes that parity block on one of the disks. The parity block rotates between disks for each stripe. This parity data can be used to mathematically reconstruct the data from a single failed disk.
                                    <ul>
                                        <li><strong>Pros:</strong> A good balance of performance, storage capacity, and redundancy. Good read performance. Can survive one disk failure.</li>
                                        <li><strong>Cons:</strong> Write performance suffers a penalty due to the parity calculation. During a disk failure, the array is in a "degraded" state with reduced performance until the failed disk is replaced and rebuilt, a process that can be long and stressful on the remaining disks.</li>
                                    </ul>
                                </li>
                                 <li>
                                    <strong>RAID 6 (Striping with Dual Parity):</strong> Similar to RAID 5, but it calculates and writes two independent parity blocks for each stripe of data.
                                    <ul>
                                        <li><strong>Pros:</strong> Excellent fault tolerance. It can withstand the failure of up to <strong>two</strong> disks simultaneously, making it much safer than RAID 5 for large arrays.</li>
                                        <li><strong>Cons:</strong> Suffers a higher write penalty than RAID 5 due to the two parity calculations. Usable capacity is lower as two disks' worth of space is used for parity. It is recommended over RAID 5 for arrays with many large-capacity drives.</li>
                                    </ul>
                                </li>
                                 <li>
                                    <strong>RAID 10 (or 1+0, A Stripe of Mirrors):</strong> This is a "nested" or "hybrid" RAID level. It combines the performance of RAID 0 with the redundancy of RAID 1. It requires creating at least two mirrored sets (RAID 1) and then striping the data across them (RAID 0).
                                    <ul>
                                        <li><strong>Pros:</strong> Excellent read and write performance and good fault tolerance. It can survive at least one disk failure, and potentially more depending on which disk fails. Rebuild times are very fast.</li>
                                        <li><strong>Cons:</strong> It has the same 50% storage efficiency as RAID 1, making it expensive in terms of capacity. It is often considered the best all-around choice for high-performance, high-availability databases and applications.</li>
                                    </ul>
                                </li>
                            </ul>
                        </section>
                    </CardContent>
                </Card>
                
                <div className="grid md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <div className='flex items-center gap-2'><Wand className="h-6 w-6 text-accent" /> <CardTitle>Pro Tips</CardTitle></div>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                                <li><strong>Never Use RAID 5 with Large Drives:</strong> For modern, high-capacity drives (e.g., > 2TB), RAID 5 is considered unsafe. The long rebuild time after a single disk failure puts immense stress on the remaining drives, significantly increasing the probability of a second disk failing during the rebuild, which would result in total data loss. Use RAID 6 or RAID 10 for large arrays.</li>
                                <li><strong>Use Identical Drives:</strong> For best performance and reliability, always use identical drives (same manufacturer, model, size, and speed) in your RAID array.</li>
                                <li><strong>RAID is NOT a Backup:</strong> This is the most critical rule. RAID protects against hardware failure; it does not protect against accidental deletion, file corruption, malware, or catastrophic events like fire or theft. You must still have a comprehensive backup strategy. Use our <Link href="/tools/backup-scheduler" className="text-primary hover:underline">Backup Scheduler</Link> to plan it.</li>
                                <li><strong>Hot Spares:</strong> For critical systems, configure a "hot spare." This is an unused disk in the array that can automatically take the place of a failed disk and start the rebuild process immediately, without waiting for manual intervention.</li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                             <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                        </CardHeader>
                        <CardContent>
                             <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                                <li><strong>Using RAID 0 for Important Data:</strong> The performance gain is tempting, but using RAID 0 for anything other than temporary, non-critical data is a recipe for disaster. The risk of data loss is multiplied by the number of disks.</li>
                                <li><strong>Ignoring Failed Disk Alerts:</strong> A RAID array with a failed disk is in a vulnerable, degraded state. Ignoring the warning signs and not replacing the failed drive promptly is a major risk.</li>
                                <li><strong>Mixing Drive Sizes:</strong> While some RAID controllers allow this, the array will treat all drives as if they are the size of the smallest disk in the set, wasting capacity on the larger drives.</li>
                                <li><strong>Software vs. Hardware RAID:</strong> Be aware of the difference. Software RAID is managed by the OS and uses system CPU/RAM, which can impact performance. Hardware RAID uses a dedicated controller card, which is faster and more robust but also more expensive.</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
                
                <section>
                    <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Home NAS (Network Attached Storage)</h3>
                            <p className="text-sm text-muted-foreground">A home user setting up a 4-bay NAS for storing family photos and media files wants a balance of capacity and protection. Using the calculator, they compare RAID 5 (good capacity, 1 disk failure) and RAID 10 (less capacity, better performance/rebuilds). They decide RAID 5 is a cost-effective choice for their needs.</p>
                        </div>
                         <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">High-Performance Database Server</h3>
                            <p className="text-sm text-muted-foreground">A database administrator needs to build a storage array for a high-transaction SQL database. Performance and uptime are critical. They use the calculator with 8 disks and determine that RAID 10, despite its 50% efficiency, is the best choice because it offers excellent read/write speeds and robust fault tolerance with fast rebuild times.</p>
                        </div>
                         <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Video Editing Workstation</h3>
                            <p className="text-sm text-muted-foreground">A video editor needs a large, fast "scratch disk" for editing 4K video files. The final project is backed up elsewhere. They use the calculator to model a RAID 0 array with four 2TB SSDs, giving them a massive 8TB of ultra-fast storage, prioritizing speed over data safety for this specific, temporary workflow.</p>
                        </div>
                         <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Large-Scale Archive Server</h3>
                            <p className="text-sm text-muted-foreground">An organization is building a 12-disk archive server for long-term storage. Data integrity is crucial. They use the calculator to compare RAID 5 and RAID 6. They see that RAID 6 can survive two disk failures, which is a much safer option for an array of this size, and they accept the capacity trade-off for the increased peace of mind.</p>
                        </div>
                    </div>
                </section>
                
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
                      <Link href="/tools/backup-storage-calculator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Backup Storage Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Once you know your usable RAID capacity, plan how much space your backups will need.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                      <Link href="/tools/data-transfer-calculator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Data Transfer Time Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Estimate how long it will take to fill your new RAID array or restore data to it.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                       <Link href="/tools/disk-usage-estimator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Disk Usage / Partition Estimator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">After determining your usable capacity, plan how you will partition that space for your OS.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                  </div>
              </section>
            </div>
        </>
    );
};

export default RaidCalculatorPage;
