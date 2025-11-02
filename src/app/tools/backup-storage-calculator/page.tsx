
import React from 'react';
import { PageHeader } from '@/components/page-header';
import { BackupStorageCalculator } from './backup-storage-calculator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { BookOpen, AlertTriangle, Wand, ChevronRight, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const metadata = {
    title: 'Backup Storage Requirement Calculator | ICT Toolbench',
    description: 'Calculate your total backup storage needs based on backup size, frequency, and retention policy. An essential tool for planning your data protection and disaster recovery strategy.',
    openGraph: {
        title: 'Backup Storage Requirement Calculator | ICT Toolbench',
        description: 'Estimate total backup storage requirements for full, incremental, and differential backup strategies. Plan your storage costs and capacity.',
        url: '/tools/backup-storage-calculator',
    }
};

const BackupStorageCalculatorPage = () => {
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
      "name": "Backup Storage Requirement Calculator",
      "operatingSystem": "All",
      "applicationCategory": "DeveloperApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "A free online tool to estimate total backup storage needs based on backup type, size, frequency, and data retention policies.",
      "url": "https://www.icttoolbench.com/tools/backup-storage-calculator"
    };

    return (
        <>
            <StructuredData data={faqSchema} />
            <StructuredData data={howToSchema} />
            <StructuredData data={softwareAppSchema} />
            <div className="max-w-4xl mx-auto space-y-12">
                <PageHeader
                    title="Backup Storage Requirement Calculator"
                    description="Plan your data protection strategy by estimating the total storage space required for your backups. Model different backup types, frequencies, and retention policies to understand your capacity needs over time."
                />

                <BackupStorageCalculator />
                
                <section>
                    <h2 className="text-2xl font-bold mb-4">How to Use the Calculator</h2>
                    <Card className="prose prose-sm max-w-none text-foreground p-6">
                        <p>This tool helps you forecast the storage consumption of your backup strategy. Follow these steps:</p>
                        <ol>
                            <li><strong>Enter Initial Data Size:</strong> Input the total size of the data you are backing up for the first time.</li>
                            <li><strong>Define Your Strategy:</strong>
                                <ul>
                                    <li><strong>Backup Type:</strong> Choose between "Full", "Incremental", or "Differential" backups.</li>
                                    <li><strong>Change Rate (%):</strong> For incremental or differential backups, estimate the percentage of data that changes between each backup.</li>
                                    <li><strong>Retention (# of backups):</strong> Enter the number of backup versions you plan to keep.</li>
                                </ul>
                            </li>
                            <li><strong>Calculate:</strong> Click "Calculate Total Storage". The tool will simulate the storage usage over the full retention period.</li>
                        </ol>
                         <Alert>
                            <Lightbulb className="h-4 w-4" />
                            <AlertTitle>Example</AlertTitle>
                            <AlertDescription>
                                To model a common strategy, you might calculate the needs for a weekly full backup with a 4-week retention, and then separately calculate daily incremental backups with a 7-day retention to understand the total combined storage.
                            </AlertDescription>
                        </Alert>
                    </Card>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4">Worked Examples</h2>
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Example 1: Full Backup Strategy</CardTitle>
                                <CardDescription>The simplest but most storage-intensive strategy.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-muted-foreground"><strong>Scenario:</strong> A small business has a 500 GB file server. They want to perform a full backup every night and keep the backups for 7 days.</p>
                                <div className="prose prose-sm max-w-none">
                                    <ol>
                                        <li><strong>Inputs:</strong>
                                            <ul>
                                                <li>Initial Data Size: <strong>500</strong> GB</li>
                                                <li>Backup Type: <strong>Full</strong></li>
                                                <li>Retention: <strong>7</strong></li>
                                            </ul>
                                        </li>
                                        <li><strong>Calculation:</strong> <strong>7 backups × 500 GB/backup = 3500 GB</strong></li>
                                        <li><strong>Result:</strong> They will need <strong>3.5 TB</strong> of storage space. This shows how quickly full backups can consume storage.</li>
                                    </ol>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Example 2: Incremental Backup Strategy</CardTitle>
                                <CardDescription>A space-efficient strategy suitable for daily backups.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-muted-foreground"><strong>Scenario:</strong> The same 500 GB server, but now using an incremental strategy. They perform one full backup, followed by 6 daily incremental backups. The daily change rate is 5%.</p>
                                 <div className="prose prose-sm max-w-none">
                                    <ol>
                                        <li><strong>Inputs:</strong>
                                            <ul>
                                                <li>Initial Data Size: <strong>500</strong> GB</li>
                                                <li>Backup Type: <strong>Incremental</strong></li>
                                                <li>Change Rate: <strong>5</strong> %</li>
                                                <li>Retention: <strong>7</strong> (1 full + 6 incremental)</li>
                                            </ul>
                                        </li>
                                        <li><strong>Calculation:</strong>
                                             <ul>
                                                <li>Day 1 (Full): <strong>500 GB</strong></li>
                                                <li>Day 2-7 (Incremental): <strong>6 backups × (500 GB × 5%) = 6 × 25 GB = 150 GB</strong></li>
                                                <li>Total: <strong>500 GB + 150 GB = 650 GB</strong></li>
                                             </ul>
                                        </li>
                                        <li><strong>Result:</strong> They now only need <strong>650 GB</strong> of storage for a week's worth of backups, a massive saving compared to the full backup strategy.</li>
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
                            <CardTitle className="text-primary">Educational Deep Dive: A Guide to Backup Strategies</CardTitle>
                        </div>
                        <CardDescription>From full and incremental to differential, understand the pros and cons of each backup method to design a robust and cost-effective data protection plan.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                        <section>
                            <h3>Why Backups are Non-Negotiable</h3>
                            <p>
                                Data is the lifeblood of modern business and personal life. A single hardware failure, ransomware attack, accidental deletion, or natural disaster can lead to catastrophic data loss. A backup is a copy of your data stored in a separate location, allowing you to restore it in case of such an event. Having a well-planned and regularly tested backup strategy is not just a best practice; it's a fundamental requirement for business continuity and peace of mind.
                            </p>
                        </section>
                        <section>
                            <h3>The Three Core Backup Types</h3>
                            <p>This calculator helps you model the three primary types of backups, each with its own trade-offs in terms of storage space, backup speed, and restoration complexity.</p>
                            <ul className="list-disc pl-5">
                                <li>
                                    <strong>Full Backup:</strong>
                                    <p>This is the simplest type. A full backup copies <strong>all</strong> of your data, every single time. <br/><strong>Pros:</strong> Very simple to manage. Restoring data is fast and easy because you only need one backup set (the latest one).<br/><strong>Cons:</strong> Consumes the most storage space and takes the longest to complete. Not practical for daily backups of large datasets.</p>
                                </li>
                                <li>
                                    <strong>Incremental Backup:</strong>
                                    <p>An incremental backup only copies the data that has changed <strong>since the last backup was made</strong> (whether it was a full or another incremental). <br/><strong>Pros:</strong> Extremely fast to create and uses the least amount of storage space for daily backups.<br/><strong>Cons:</strong> Restoration is the most complex. To fully restore your data, you need the last full backup <strong>and every single incremental backup</strong> made since then. If any one of the incremental backups is missing or corrupt, the restore will be incomplete.</p>
                                </li>
                                <li>
                                    <strong>Differential Backup:</strong>
                                    <p>A differential backup copies all the data that has changed <strong>since the last full backup</strong>. <br/><strong>Pros:</strong> A good balance between full and incremental. Backups are faster than a full backup. Restoration is simpler than incremental, as you only need the last full backup and the latest differential backup.<br/><strong>Cons:</strong> The size of the differential backup grows each day until the next full backup is made, consuming more space over time than an incremental strategy.</p>
                                </li>
                            </ul>
                        </section>
                         <section>
                            <h3>Building a Strategy: The Grandfather-Father-Son (GFS) Model</h3>
                            <p>A common and effective strategy is the Grandfather-Father-Son (GFS) rotation scheme. It combines all three backup types:</p>
                             <ul className="list-disc pl-5">
                               <li><strong>Son (Daily):</strong> Incremental or differential backups are performed each day.</li>
                               <li><strong>Father (Weekly):</strong> A full backup is performed once a week (e.g., every Friday night).</li>
                               <li><strong>Grandfather (Monthly):</strong> The last full backup of each month is archived for long-term retention.</li>
                            </ul>
                            <p>This tiered approach provides fast daily backups, a simple weekly restore point, and long-term archival without consuming excessive storage. You can use this calculator to model the storage needs for each component of a GFS strategy separately to determine your total requirement.</p>
                        </section>
                    </CardContent>
                </Card>

                <section>
                    <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Small Business Server Backup</h3>
                            <p className="text-sm text-muted-foreground">A small business has a 500 GB file server with a daily change rate of about 5%. They want to keep 14 days of backups. Using the calculator, they compare a 'full' strategy (14 × 500GB = 7 TB) versus an 'incremental' strategy (500GB + 13 × 25GB ≈ 825 GB). The massive storage savings make the incremental strategy the clear choice.</p>
                        </div>
                         <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Database Backup Planning</h3>
                            <p className="text-sm text-muted-foreground">A database administrator manages a 2 TB database. Their policy is a full backup every Sunday and differential backups on weekdays. They use the calculator to model the differential needs for one week (1 full + 6 differentials), helping them provision enough storage on their backup server for the week's cycle.</p>
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
                                <li><strong>The 3-2-1 Rule:</strong> A golden rule of data protection. Keep at least <strong>3</strong> copies of your data, on <strong>2</strong> different types of media, with <strong>1</strong> copy stored off-site (e.g., in the cloud).</li>
                                <li><strong>Test Your Backups:</strong> A backup you haven't tested is not a real backup. Regularly perform test restores to a non-production environment to ensure your backups are valid and your restoration process works.</li>
                                <li><strong>Factor in Compression and Deduplication:</strong> Modern backup software often includes compression and deduplication, which can significantly reduce storage needs. Our <Link href="/tools/compression-estimator" className="text-primary hover:underline">Compression Savings Estimator</Link> can give you a rough idea of the impact.</li>
                                <li><strong>Consider RPO and RTO:</strong> Define your Recovery Point Objective (RPO - how much data you can afford to lose) and Recovery Time Objective (RTO - how quickly you need to be back online). These will dictate your backup frequency and strategy.</li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                             <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                        </CardHeader>
                        <CardContent>
                             <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                                <li><strong>No Backups at All:</strong> The most common and most devastating mistake.</li>
                                <li><strong>Backups Stored On-Site Only:</strong> Storing your backup drive right next to the server it's backing up provides no protection against fire, theft, or natural disaster.</li>
                                <li><strong>Not Monitoring Backup Jobs:</strong> Assuming your backups are running successfully without ever checking the logs. Backup jobs can fail silently for weeks or months.</li>
                                <li><strong>Forgetting to Back Up Everything:</strong> Backing up your database but forgetting configuration files, application code, or user-uploaded content. Ensure your backup plan is comprehensive.</li>
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
                      <Link href="/tools/cloud-storage-cost-estimator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Cloud Storage Cost Estimator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Once you know your storage requirement, estimate the monthly cost on AWS, Google Cloud, or Azure.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                      <Link href="/tools/data-transfer-calculator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Data Transfer Time Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Estimate how long it will take to upload your backups or perform a full restore over your internet connection.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                       <Link href="/tools/compression-estimator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Compression Savings Estimator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Estimate how much storage space you can save by compressing your backup files.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                  </div>
              </section>
            </div>
        </>
    );
};

export default BackupStorageCalculatorPage;
