
import React from 'react';
import { PageHeader } from '@/components/page-header';
import { DiskUsageEstimator } from './disk-usage-estimator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { BookOpen, AlertTriangle, Wand, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';

export const metadata = {
    title: 'Disk Usage / Partition Estimator | ICT Toolbench',
    description: 'Plan your server disk partitions for Linux and other operating systems. Estimate space for root, /home, /var, and swap to ensure a balanced and stable setup.',
    openGraph: {
        title: 'Disk Usage / Partition Estimator | ICT Toolbench',
        description: 'Visually plan your disk partitioning scheme. Allocate space effectively for different system directories and avoid running out of space on critical partitions.',
        url: '/tools/disk-usage-estimator',
    }
};

const DiskUsageEstimatorPage = () => {
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
      "name": "Disk Usage / Partition Estimator",
      "operatingSystem": "All",
      "applicationCategory": "DeveloperApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "A free online tool to help system administrators and developers plan their server disk partitions by estimating space for root, home, var, and swap.",
      "url": "https://www.icttoolbench.com/tools/disk-usage-estimator"
    };

    return (
        <>
            <StructuredData data={faqSchema} />
            <StructuredData data={howToSchema} />
            <StructuredData data={softwareAppSchema} />
            <div className="max-w-4xl mx-auto space-y-12">
                <PageHeader
                    title="Disk Usage / Partition Estimator"
                    description="Plan your server's disk layout with confidence. This tool helps you visualize and allocate space for different partitions like root, home, and swap, preventing common storage issues before they happen."
                />
                
                <DiskUsageEstimator />

                <section>
                    <h2 className="text-2xl font-bold mb-4">How to Use the Estimator</h2>
                    <Card className="prose prose-sm max-w-none text-foreground p-6">
                        <p>This tool helps you model a disk partitioning scheme, a crucial step when setting up a new server.</p>
                        <ol>
                            <li><strong>Set Total Disk Size:</strong> Enter the total capacity of the physical or virtual disk you are partitioning.</li>
                            <li><strong>Define Partitions:</strong> The tool starts with a common Linux partition scheme (`/`, `/home`, `/var`, `swap`). Adjust the size of each partition based on your expected needs. You can add more partitions (e.g., for `/opt` or `/srv`) or remove ones you don't need.</li>
                            <li><strong>Visualize Allocation:</strong> The bar chart at the top provides a live visualization of how your disk space is being allocated, showing used, allocated, and free space.</li>
                            <li><strong>Analyze the Breakdown:</strong> The summary card shows you the total allocated space and how much is still unallocated, helping you ensure you've used the disk efficiently.</li>
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
                          <CardTitle className="text-primary">Educational Deep Dive: The Art of Server Partitioning</CardTitle>
                      </div>
                      <CardDescription>From the root filesystem to swap space, understand the 'why' behind a standard Linux partitioning scheme and how to plan for a stable, scalable server.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                      <section>
                          <h3>Why Partition a Disk?</h3>
                          <p>
                            When you set up a new server, you could just create one single, large partition that holds everything. So why go through the trouble of creating multiple partitions? The practice of partitioning a disk into separate logical sections offers several critical advantages:
                          </p>
                          <ul className="list-disc pl-5">
                            <li><strong>Stability:</strong> The most important reason. If a runaway process or a log file fills up a partition, it only affects that partition. For example, if your `/var/log` directory fills up the `/var` partition, your core operating system on the `/` (root) partition remains unaffected and the server continues to run. If everything were on one partition, a full disk would crash the entire system.</li>
                            <li><strong>Security:</strong> You can apply different security options to different partitions. For example, you can mount the `/tmp` partition with a `noexec` flag, which prevents any executable files from being run from that directory, a common security hardening step.</li>
                            <li><strong>Performance:</strong> Different partitions can use different filesystems optimized for different tasks. While less common today, you could have one partition formatted for large media files and another for small text files.</li>
                            <li><strong>Data Integrity:</strong> Separating user data (in `/home`) from operating system data (in `/`) makes backups and OS re-installations much safer and easier. You can wipe and reinstall the OS on the `/` partition without touching the user data in `/home`.</li>
                          </ul>
                      </section>
                      <section>
                          <h3>Understanding the Standard Linux Partitions</h3>
                          <p>This estimator starts with a common and recommended partitioning scheme for a Linux server. Here's what each part is for:</p>
                          <ul className="list-disc pl-5">
                             <li><strong>`/` (root):</strong> This is the top-level directory of the entire filesystem. It contains the core operating system, installed applications, and system libraries. If any other partition is not explicitly created, its contents will reside here. It's crucial that this partition never fills up.</li>
                             <li><strong>`/home`:</strong> This partition is dedicated to user data. Each user gets their own directory inside `/home` (e.g., `/home/username`). Separating `/home` allows you to back up or resize user data independently of the OS.</li>
                             <li><strong>`/var`:</strong> This directory holds variable data. Its most important content is log files (in `/var/log`), which can grow very quickly on a busy server. Other variable data like mail spools and databases (like MySQL's default data directory) also live here. Giving `/var` its own partition prevents runaway logs from crashing the server.</li>
                             <li><strong>`/tmp`:</strong> This directory is for temporary files created by users and applications. It is usually cleared on reboot. Isolating it prevents temporary files from filling up a more critical partition.</li>
                             <li><strong>`swap`:</strong> Swap space is a portion of the disk used as virtual memory. When the server runs out of physical RAM, the operating system will move inactive pages of memory to the swap space to free up RAM. While not a substitute for adequate RAM, having a dedicated swap partition is essential for system stability under heavy load.</li>
                          </ul>
                      </section>
                  </CardContent>
                </Card>

                <section>
                    <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">New Web Server Setup</h3>
                            <p className="text-sm text-muted-foreground">A sysadmin is provisioning a new Linux web server with a 100 GB disk. Using the estimator, they plan a layout: 20 GB for `/` (OS and Apache), 8 GB for swap, 20 GB for `/var` (to contain web logs), and the remaining ~52 GB for `/home` where the website content will live. This ensures that a sudden spike in log files won't crash the root filesystem.</p>
                        </div>
                         <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Developer Workstation</h3>
                            <p className="text-sm text-muted-foreground">A developer is setting up a new Linux desktop with a 500 GB SSD. They want a large home directory for their projects and personal files. They allocate 50 GB for `/` and a generous 430 GB for `/home`. This separation allows them to easily back up their entire `/home` directory or even reinstall the OS without losing their critical work.</p>
                        </div>
                         <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Database Server Planning</h3>
                            <p className="text-sm text-muted-foreground">For a dedicated PostgreSQL server, the database administrator knows that the data files (in `/var/lib/postgresql`) and transaction logs will grow significantly. They use the estimator on a 1 TB disk to allocate a massive 800 GB partition specifically for `/var`, ensuring the database has ample room to grow without impacting the core operating system on the `/` partition.</p>
                        </div>
                         <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Cloud VM Provisioning</h3>
                            <p className="text-sm text-muted-foreground">An engineer is creating a VM in the cloud. Instead of using one single virtual disk, they provision multiple: a small 30 GB disk for the OS (`/`), and a larger 200 GB high-speed disk which they mount at `/data` for their application's primary storage. This allows them to scale or snapshot the data disk independently of the OS disk.</p>
                        </div>
                    </div>
                </section>

                <div className="grid md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <div className='flex items-center gap-2'><Wand className="h-6 w-6 text-accent" /> <CardTitle>Pro Tips for Partitioning</CardTitle></div>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                                <li><strong>Swap Size Rule of Thumb:</strong> A common guideline for swap space is: equal to RAM for up to 2GB of RAM, half of RAM for 2-8GB of RAM, and a flat 4-8GB for systems with more than 8GB of RAM.</li>
                                <li><strong>Use LVM:</strong> For maximum flexibility, use Logical Volume Management (LVM) during your Linux installation. LVM adds a layer of abstraction that makes it much easier to resize, add, or remove partitions on the fly without having to reformat the entire disk.</li>
                                <li><strong>Monitor Disk Usage:</strong> After setting up your server, use monitoring tools (like `df -h` or dedicated software like Prometheus) to keep an eye on partition usage. Set up alerts to warn you when a partition is nearing capacity.</li>
                                <li><strong>Consider XFS vs. ext4:</strong> For very large filesystems (multiple terabytes) or files (e.g., video storage), the XFS filesystem often offers better performance than the more common ext4.</li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                             <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                        </CardHeader>
                        <CardContent>
                             <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                                <li><strong>An Undersized Root Partition:</strong> Allocating too little space for `/`. As you install more software and updates, the root partition can fill up, leading to system failure. 20-30 GB is a safe minimum for most modern Linux servers.</li>
                                <li><strong>No Separate `/var` Partition:</strong> On a server that generates a lot of logs (like a web server), failing to give `/var` its own partition is a ticking time bomb. A single runaway log file can fill the entire disk and crash the server.</li>
                                <li><strong>No Swap Space:</strong> While modern systems have a lot of RAM, swap space is still crucial. It acts as a safety net that can prevent the system from crashing completely if it runs out of physical memory.</li>
                                <li><strong>Forgetting About Inodes:</strong> Every file on a filesystem uses an "inode." It is possible to run out of inodes on a partition even if there is still free disk space, especially if you have millions of very small files. This is an advanced consideration but can be a problem on mail servers or certain types of caching servers.</li>
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

export default DiskUsageEstimatorPage;
