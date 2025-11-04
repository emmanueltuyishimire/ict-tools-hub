
import React from 'react';
import { PageHeader } from '@/components/page-header';
import { RaidCalculator } from '../raid-calculator/raid-calculator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BookOpen, AlertTriangle, Wand, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from '../raid-calculator/schema'; // Re-using schema from RAID as it's the core topic
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const metadata = {
    title: 'Storage Redundancy & RAID Calculator | ICT Toolbench',
    description: 'Learn about storage redundancy and use our calculator to model RAID 0, 1, 5, 6, and 10 arrays. Understand fault tolerance, capacity, and efficiency to protect your data.',
    openGraph: {
        title: 'Storage Redundancy & RAID Calculator | ICT Toolbench',
        description: 'Explore the trade-offs between different RAID levels to build a resilient and efficient storage array. Protect your data against disk failure.',
        url: '/tools/storage-redundancy-calculator',
    }
};

const StorageRedundancyCalculatorPage = () => {
    const softwareAppSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Storage Redundancy & RAID Calculator",
      "operatingSystem": "All",
      "applicationCategory": "DeveloperApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "A free online guide and calculator to understanding storage redundancy and calculating the usable capacity, fault tolerance, and efficiency of various RAID levels.",
      "url": "https://www.icttoolbench.com/tools/storage-redundancy-calculator"
    };
    
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


    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
            <div className="max-w-4xl mx-auto space-y-12">
                <PageHeader
                    title="Storage Redundancy & RAID Calculator"
                    description="Protect your critical data by understanding and implementing storage redundancy. This guide explains the core concepts, and the embedded RAID calculator helps you model different configurations to find the right balance of performance, capacity, and safety."
                />
                
                <Alert>
                    <BookOpen className="h-4 w-4" />
                    <AlertTitle>Guide & Calculator</AlertTitle>
                    <AlertDescription>
                       This guide explains the concept of storage redundancy. The primary method for achieving this is with a <strong>RAID array</strong>. Use the calculator below to explore different RAID levels and their trade-offs.
                    </AlertDescription>
                </Alert>

                <RaidCalculator />

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
                            <CardTitle className="text-primary">Educational Deep Dive: The Principle of Redundancy</CardTitle>
                        </div>
                        <CardDescription>From backups to RAID arrays, understand why having more than one copy of your data is the most fundamental rule of data safety.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                        <section>
                            <h3>What is Redundancy?</h3>
                            <p>
                                In IT and engineering, redundancy is the practice of duplicating critical components or functions of a system with the intention of increasing reliability. The goal is to eliminate single points of failure. If one component fails, a redundant component can take over its function, ensuring the system continues to operate without interruption or data loss.
                            </p>
                            <p>
                                When it comes to data storage, all hard drives will eventually fail. It's not a question of <strong>if</strong>, but <strong>when</strong>. Storage redundancy is the strategy of storing your data in a way that it can survive the failure of one or more physical drives. The most common and foundational technology for achieving this on a server is <strong>RAID (Redundant Array of Independent Disks)</strong>.
                            </p>
                        </section>
                         <section>
                            <h3>RAID is NOT a Backup!</h3>
                            <p>
                                This is the most important concept to understand. <strong>RAID protects against hardware failure. A backup protects against data loss.</strong> They are not the same thing.
                            </p>
                            <ul className="list-disc pl-5">
                                <li>A <strong>RAID 1 array</strong> can protect you if one of your hard drives dies.</li>
                                <li>It <strong>cannot</strong> protect you if you accidentally delete a critical file, if a software bug corrupts your data, if your server is destroyed in a fire, or if your data is encrypted by ransomware.</li>
                            </ul>
                            <p>
                                A true backup is a separate, independent copy of your data, preferably stored in a different physical location. Redundancy and backups are two essential, complementary parts of a complete data protection strategy. You can use our <Link href="/tools/backup-scheduler" className="text-primary hover:underline">Backup Scheduler</Link> and <Link href="/tools/backup-storage-calculator" className="text-primary hover:underline">Backup Storage Calculator</Link> to plan your backup strategy.
                            </p>
                        </section>
                        <section>
                            <h3>Choosing the Right Level of Redundancy</h3>
                            <p>
                                As the RAID calculator above demonstrates, there is a direct trade-off between capacity, performance, and redundancy.
                            </p>
                            <ul className="list-disc pl-5">
                               <li><strong>Maximum Performance (No Redundancy):</strong> RAID 0 (striping) offers the best performance but has zero fault tolerance. It is not redundant. The failure of a single disk destroys all data.</li>
                               <li><strong>Maximum Redundancy (Low Efficiency):</strong> RAID 1 (mirroring) offers excellent redundancy, often able to survive all but the last disk failing. However, its storage efficiency is only 50%, making it expensive.</li>
                               <li><strong>Balanced Approach (Parity):</strong> RAID 5 and RAID 6 offer a compromise. They provide good storage efficiency while still protecting against one (RAID 5) or two (RAID 6) disk failures. They achieve this using a clever mathematical calculation called 'parity'.</li>
                            </ul>
                            <p>
                                The right choice depends on your specific needs. For an operating system drive, the simple redundancy of RAID 1 is often best. For a high-performance database, the speed and redundancy of RAID 10 are ideal. For a large archive server where capacity and safety are key, RAID 6 is the modern standard. Explore these options in the calculator to see the numerical trade-offs.
                            </p>
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
                                <li><strong>RAID is NOT a Backup:</strong> This is the most critical rule. RAID protects against hardware failure; it does not protect against accidental file deletion, file corruption, malware, or catastrophic events like fire or theft. You must still have a comprehensive backup strategy. Use our <Link href="/tools/backup-scheduler" className="text-primary hover:underline">Backup Scheduler</Link> to plan it.</li>
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

export default StorageRedundancyCalculatorPage;
