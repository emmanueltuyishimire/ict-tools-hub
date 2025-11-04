
import React from 'react';
import { PageHeader } from '@/components/page-header';
import { BackupScheduler } from './backup-scheduler';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BookOpen, AlertTriangle, Wand, ChevronRight, CheckCircle, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const metadata = {
    title: 'Backup Schedule Calculator | ICT Toolbench',
    description: 'Plan your data backup strategy with our schedule generator. Create daily, weekly, or monthly backup schedules and understand the principles of backup rotation and retention.',
    openGraph: {
        title: 'Backup Schedule Calculator | ICT Toolbench',
        description: 'Easily generate a list of dates for your backup jobs. Plan your Grandfather-Father-Son (GFS) rotation scheme and ensure your data is always protected.',
        url: '/tools/backup-scheduler',
    }
};

const BackupSchedulerPage = () => {
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
      "name": "Snapshot / Backup Scheduler",
      "operatingSystem": "All",
      "applicationCategory": "DeveloperApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "A free online tool to generate schedules for data backups and snapshots based on daily, weekly, or monthly policies.",
      "url": "https://www.icttoolbench.com/tools/backup-scheduler"
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
                    title="Snapshot / Backup Scheduler"
                    description="Plan your data protection strategy by generating a clear schedule for your backup jobs. A simple tool to help you visualize and implement a consistent backup routine."
                />

                <BackupScheduler />

                <section>
                    <h2 className="text-2xl font-bold mb-4">How to Use the Scheduler</h2>
                    <Card className="prose prose-sm max-w-none text-foreground p-6">
                        <p>This tool helps you generate a list of dates for your backup rotation, making it easy to plan and automate your data protection strategy.</p>
                        <ol>
                            <li><strong>Set a Start Date:</strong> Choose the date from which you want your backup schedule to begin.</li>
                            <li><strong>Select Frequency:</strong> Choose how often backups should occur: 'Daily', 'Weekly', or 'Monthly'.</li>
                            <li><strong>Define Specifics (for Weekly/Monthly):</strong>
                                <ul>
                                    <li>If 'Weekly', select the specific day of the week for your backup.</li>
                                    <li>If 'Monthly', select the day of the month. You can also choose the 'Last Day of Month'.</li>
                                </ul>
                            </li>
                            <li><strong>Set the Count:</strong> Enter the total number of backup dates you want to generate.</li>
                            <li><strong>Generate Schedule:</strong> Click the "Generate Schedule" button. The tool will produce a list of all the scheduled dates, which you can use for planning or scripting.</li>
                        </ol>
                        <Alert>
                            <Lightbulb className="h-4 w-4" />
                            <AlertTitle>Example: GFS Strategy</AlertTitle>
                            <AlertDescription>
                              To plan a Grandfather-Father-Son scheme, you can run the generator three times: once for daily backups, once for weekly, and once for monthly, giving you three distinct lists for your 'Son', 'Father', and 'Grandfather' sets.
                            </AlertDescription>
                        </Alert>
                    </Card>
                </section>
                
                <section>
                    <h2 className="text-2xl font-bold mb-4">Worked Example</h2>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">Planning a Weekly Full Backup and Daily Incrementals</CardTitle>
                            <CardDescription>Generate two separate schedules to create a simple and effective backup plan.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground"><strong>Scenario:</strong> You want to perform a full backup every Friday and daily incremental backups on all other days for the next month.</p>
                            <div className="prose prose-sm max-w-none">
                                <ol>
                                    <li><strong>Generate Weekly Fulls:</strong>
                                        <ul>
                                            <li>Set Start Date to the beginning of the month.</li>
                                            <li>Frequency: <strong>Weekly</strong></li>
                                            <li>Day of the Week: <strong>Friday</strong></li>
                                            <li>Count: <strong>4</strong></li>
                                            <li>The result is a list of all 4 Fridays in the month. These are your "Father" backups.</li>
                                        </ul>
                                    </li>
                                     <li><strong>Generate Daily Incrementals:</strong>
                                        <ul>
                                            <li>Set Start Date to the beginning of the month.</li>
                                            <li>Frequency: <strong>Daily</strong></li>
                                            <li>Count: <strong>30</strong> (or the number of days in the month)</li>
                                            <li>The result is a list of every day. You would use this list and exclude the Fridays already designated for full backups. These are your "Son" backups.</li>
                                        </ul>
                                    </li>
                                    <li><strong>Result:</strong> You now have a complete, documented schedule for your backup automation script, helping you estimate storage needs with our <Link href="/tools/backup-storage-calculator" className="text-primary hover:underline">Backup Storage Calculator</Link>.</li>
                                </ol>
                            </div>
                        </CardContent>
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
                            <CardTitle className="text-primary">Educational Deep Dive: Backup Strategies and Best Practices</CardTitle>
                        </div>
                        <CardDescription>From rotation schemes to retention policies, understand the core principles of creating a robust and reliable data protection plan.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                        <section>
                            <h3>Why is a Backup Schedule Necessary?</h3>
                            <p>
                                A backup without a schedule is just a copy of your data. A true backup strategy is a disciplined, automated process designed to protect data against loss and enable swift recovery. A schedule is the heart of this strategy. It ensures that backups are performed consistently and predictably, without relying on manual intervention, which is prone to human error and forgetfulness. A well-planned schedule is essential for meeting your Recovery Point Objective (RPO) and Recovery Time Objective (RTO).
                            </p>
                        </section>
                        <section>
                            <h3>The Grandfather-Father-Son (GFS) Rotation Scheme</h3>
                            <p>The GFS rotation scheme is a classic and highly effective method for managing backup media and retention. It creates a tiered system of backups, balancing data granularity with storage efficiency. This tool is perfect for planning the different components of a GFS scheme.</p>
                            <ul className="list-disc pl-5">
                                <li><strong>Son (Daily):</strong> These are the most frequent backups, typically incremental or differential backups performed every day. They provide a very granular, short-term recovery point. For example, you might keep 7 "Son" backups at all times.</li>
                                <li><strong>Father (Weekly):</strong> This is a less frequent, full backup, typically performed once a week (e.g., every Friday). The last backup of the week is promoted to a "Father". You might keep 4 "Father" backups, giving you a recovery point for each of the last four weeks.</li>
                                <li><strong>Grandfather (Monthly):</strong> This is the long-term archival backup. The last "Father" backup of the month is promoted to a "Grandfather" and is kept for much longer—months or even years, depending on compliance needs. You might keep 12 "Grandfather" backups to have a recovery point for each month of the past year.</li>
                            </ul>
                            <p>This tiered approach allows you to quickly restore a file from yesterday (from a Son), restore an entire system from last week (from a Father), or retrieve a file from 11 months ago for a legal audit (from a Grandfather), all while managing your storage costs effectively. You can model these storage costs using our <Link href="/tools/backup-storage-calculator" className="text-primary hover:underline">Backup Storage Requirement Calculator</Link>.</p>
                        </section>
                         <section>
                            <h3>Recovery Point Objective (RPO) vs. Recovery Time Objective (RTO)</h3>
                            <p>A backup strategy is driven by two key business metrics:</p>
                             <ul className="list-disc pl-5">
                               <li><strong>RPO (Recovery Point Objective):</strong> This answers the question, "How much data can we afford to lose?" An RPO of 24 hours means the business can tolerate losing up to one day's worth of data. This dictates your backup *frequency*. To meet a 24-hour RPO, you must perform backups at least daily. A critical transactional database might have an RPO of 15 minutes, requiring much more frequent backups.</li>
                               <li><strong>RTO (Recovery Time Objective):</strong> This answers the question, "How quickly do we need to be back online after a disaster?" An RTO of 4 hours means the entire system must be restored and operational within four hours of a failure. This dictates your backup *technology and process*. A fast RTO might require having a hot standby server, while a slower RTO might be achievable with restoring from cloud backups. The time it takes to restore can be estimated with our <Link href="/tools/data-transfer-calculator" className="text-primary hover:underline">Data Transfer Time Calculator</Link>.</li>
                            </ul>
                            <p>Your backup schedule is a direct implementation of your RPO, while your overall backup and recovery infrastructure is designed to meet your RTO.</p>
                        </section>
                    </CardContent>
                </Card>
                
                <section>
                    <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Small Business File Server</h3>
                            <p className="text-sm text-muted-foreground">A small business uses this tool to plan a simple backup scheme for its file server. They decide on daily incremental backups and a full backup every Saturday. They generate two lists: one for "Weekly" on Saturday to schedule the full backup job, and one for "Daily" to schedule the incremental jobs on all other days.</p>
                        </div>
                         <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Cloud VM Snapshot Automation</h3>
                            <p className="text-sm text-muted-foreground">A cloud administrator is writing a script to automate daily snapshots of their critical virtual machines. They use the scheduler to generate a list of the next 30 days. Their script then reads this list and creates a snapshot each day, tagging it with the date. Another script uses a 30-day-old date to automatically delete old snapshots, ensuring they meet their <Link href="/tools/data-retention-calculator" className="text-primary hover:underline">Data Retention Policy</Link>.</p>
                        </div>
                    </div>
                </section>

                <div className="grid md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <div className='flex items-center gap-2'><Wand className="h-6 w-6 text-accent" /> <CardTitle>Pro Tips for Backup Strategy</CardTitle></div>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                                <li><strong>The 3-2-1 Rule:</strong> Keep at least <strong>3</strong> copies of your data, on <strong>2</strong> different types of media, with at least <strong>1</strong> copy stored off-site.</li>
                                <li><strong>Test Your Restores:</strong> A backup you haven't tested is not a real backup. Regularly perform test restores to a non-production environment to ensure your backups are valid and your recovery process works as expected.</li>
                                <li><strong>Monitor Your Backup Jobs:</strong> Don't just "set it and forget it." Set up automated alerts to notify you immediately if a scheduled backup job fails.</li>
                                <li><strong>Consider Immutability:</strong> For ultimate protection against ransomware, use a storage solution that supports immutable backups. This prevents any user—or malware—from deleting or modifying the backup files until their retention period has expired.</li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                             <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                        </CardHeader>
                        <CardContent>
                             <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                                <li><strong>No Backups At All:</strong> The single most devastating and common mistake.</li>
                                <li><strong>Storing Backups On-Site Only:</strong> Keeping your only backup drive connected to the server it's backing up provides zero protection against fire, theft, or a building-wide ransomware attack.</li>
                                <li><strong>Not Backing Up Everything:</strong> Backing up the database but forgetting the application code, configuration files, or user-uploaded media files. Your backup plan must be comprehensive.</li>
                                <li><strong>Inconsistent Scheduling:</strong> Performing backups randomly or only "when you remember" is not a strategy. It's a recipe for data loss. Automate your schedule.</li>
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
                      <Link href="/tools/backup-storage-calculator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Backup Storage Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Estimate how much storage space your backup schedule will require over time.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                      <Link href="/tools/data-retention-calculator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Data Retention Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Determine the exact end-of-life date for your long-term "Grandfather" backups.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                       <Link href="/tools/uptime-calculator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Uptime / Availability Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Understand the SLA promises that your backup and recovery plan is designed to support.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                  </div>
              </section>
            </div>
        </>
    );
};

export default BackupSchedulerPage;
