
import React from 'react';
import { PageHeader } from '@/components/page-header';
import { DataRetentionCalculator } from './data-retention-calculator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { BookOpen, AlertTriangle, Wand, ChevronRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const metadata = {
    title: 'Data Retention Period Calculator | ICT Toolbench',
    description: 'Calculate the end date for your data retention policies. Ensure compliance with GDPR, HIPAA, and other regulations by accurately determining when data should be archived or deleted.',
    openGraph: {
        title: 'Data Retention Period Calculator | ICT Toolbench',
        description: 'A tool for compliance officers, DBAs, and sysadmins to calculate and plan data lifecycle management based on retention requirements.',
        url: '/tools/data-retention-calculator',
    }
};

const DataRetentionCalculatorPage = () => {
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
      "name": "Data Retention Period Calculator",
      "operatingSystem": "All",
      "applicationCategory": "BusinessApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "A free online tool to calculate the exact end date for a data retention period based on a start date and a specified duration.",
      "url": "https://www.icttoolbench.com/tools/data-retention-calculator"
    };

    return (
        <>
            <StructuredData data={faqSchema} />
            <StructuredData data={howToSchema} />
            <StructuredData data={softwareAppSchema} />
            <div className="max-w-4xl mx-auto space-y-12">
                <PageHeader
                    title="Data Retention Period Calculator"
                    description="Accurately calculate the end date of a data retention period to ensure compliance and manage your data lifecycle effectively. Enter a start date and a retention duration to determine the exact deletion or archival date."
                />
                
                <DataRetentionCalculator />

                <section>
                    <h2 className="text-2xl font-bold mb-4">How to Use the Calculator</h2>
                    <Card className="prose prose-sm max-w-none text-foreground p-6">
                        <p>This tool helps you determine the precise end-of-life date for your data based on your retention policies.</p>
                        <ol>
                            <li><strong>Set a Start Date:</strong> Enter the date when the data was created or when the retention period begins. This defaults to the current date.</li>
                            <li><strong>Define the Retention Period:</strong> Input the length of time you are required to keep the data.</li>
                            <li><strong>Choose the Unit:</strong> Select the appropriate unit for the retention period (Days, Weeks, Months, or Years).</li>
                            <li><strong>Review the Deletion Date:</strong> The tool will instantly calculate and display the exact date when the retention period ends and the data is eligible for deletion or archival.</li>
                        </ol>
                        <Alert>
                            <Lightbulb className="h-4 w-4" />
                            <AlertTitle>Example</AlertTitle>
                            <AlertDescription>
                              If your company policy is to retain customer support tickets for <strong>18 months</strong> after they are closed, you can enter the ticket's closing date, set the retention to 18 months, and find the exact date the ticket can be purged from your system.
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
                            <CardTitle className="text-primary">Educational Deep Dive: Data Lifecycle Management</CardTitle>
                        </div>
                        <CardDescription>From creation to deletion, understand the principles of data retention and why it's a critical component of modern governance, risk, and compliance (GRC).</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                        <section>
                            <h3>What is a Data Retention Policy?</h3>
                            <p>
                                A data retention policy is a set of formal guidelines that an organization establishes to determine how long it should keep specific types of data and when it should dispose of it. It is a cornerstone of effective data governance. Having a clear policy is not just a best practice; in many industries, it's a legal and regulatory requirement.
                            </p>
                            <p>
                                A good policy balances two competing needs: the need to retain data for business, legal, and operational reasons, and the need to dispose of data that is no longer required to reduce storage costs and minimize legal risk or liability.
                            </p>
                        </section>
                        <section>
                            <h3>Key Drivers for Data Retention</h3>
                            <p>Organizations retain data for several reasons, often mandated by external regulations or internal needs:</p>
                            <ul className="list-disc pl-5">
                                <li><strong>Legal & Regulatory Compliance:</strong> This is the most significant driver. Regulations like GDPR (General Data Protection Regulation) in Europe, HIPAA (Health Insurance Portability and Accountability Act) for healthcare in the US, and Sarbanes-Oxley (SOX) for financial records all have specific rules about how long personal, medical, or financial data must be kept—and when it must be deleted.</li>
                                <li><strong>Business Operations:</strong> Companies need to retain transactional data, customer records, and employee information for day-to-day operations, financial reporting, and trend analysis.</li>
                                <li><strong>Litigation & E-Discovery:</strong> In the event of a lawsuit, organizations may be legally required to produce relevant documents and communications. A data retention policy ensures this data is available during a 'legal hold' but is also defensibly deleted after its required lifespan.</li>
                                <li><strong>Knowledge Management:</strong> Retaining project files, research data, and internal communications helps preserve institutional knowledge and supports future decision-making.</li>
                            </ul>
                        </section>
                         <section>
                            <h3>The Risks of NOT Having a Policy</h3>
                            <p>
                                Failing to manage data retention introduces significant risks:
                            </p>
                             <ul className="list-disc pl-5">
                               <li><strong>Increased Storage Costs:</strong> Indefinitely storing all data leads to ballooning storage costs, especially in the cloud. You can estimate these costs using our <Link href="/tools/cloud-storage-cost-estimator" className="text-primary hover:underline">Cloud Storage Cost Estimator</Link>.</li>
                               <li><strong>Higher Legal Risk:</strong> Keeping data longer than necessary increases your 'surface area' for legal discovery. If old, irrelevant, and potentially damaging data exists during a lawsuit, you may be forced to produce it.</li>
                               <li><strong>Compliance Penalties:</strong> Violating data protection regulations like GDPR by holding onto personal data for too long can result in massive fines.</li>
                               <li><strong>Reduced Performance:</strong> Bloated databases and file systems can become slow and difficult to manage, impacting application performance. The size of your backups also increases, extending restore times. Our <Link href="/tools/backup-storage-calculator" className="text-primary hover:underline">Backup Storage Calculator</Link> can help model this.</li>
                            </ul>
                            <p>
                                A data retention policy, supported by tools like this calculator, allows organizations to automate the process of data archival and deletion, ensuring they are compliant, secure, and cost-efficient.
                            </p>
                        </section>
                    </CardContent>
                </Card>
                
                <section>
                    <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">GDPR Compliance</h3>
                            <p className="text-sm text-muted-foreground">A European e-commerce company's privacy policy states that it will delete inactive customer accounts after 2 years. A compliance officer uses this tool to create a script. For each inactive account, they take the 'last login date', add 2 years, and schedule an automated deletion job for the calculated date, ensuring compliance with GDPR's 'storage limitation' principle.</p>
                        </div>
                         <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Financial Record Archiving</h3>
                            <p className="text-sm text-muted-foreground">A financial firm is required by law to keep all transaction records for 7 years. A database administrator sets up a monthly job. On the first of each month, they use the calculator to find the date 7 years ago. They then archive all records older than that date from the production database to cheaper, long-term archival storage, keeping the main database fast and lean.</p>
                        </div>
                         <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Log File Management</h3>
                            <p className="text-sm text-muted-foreground">A system administrator has a policy to keep server log files for 90 days for troubleshooting purposes. They write a daily script that uses the current date and the retention calculator to determine the cutoff date. The script then deletes any log files older than that date, preventing logs from filling up the server's disk space. They might use our <Link href="/tools/disk-usage-estimator" className="text-primary hover:underline">Disk Usage Estimator</Link> to initially provision enough space for this.</p>
                        </div>
                         <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Backup Rotation Schedules</h3>
                            <p className="text-sm text-muted-foreground">An IT manager implements a backup strategy where daily backups are kept for 14 days, weekly backups for 2 months, and monthly backups for 1 year. They use the data retention calculator to create the logic for their backup script, which automatically prunes old backup files as they exceed their respective retention periods, managing storage costs effectively.</p>
                        </div>
                    </div>
                </section>

                <div className="grid md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <div className='flex items-center gap-2'><Wand className="h-6 w-6 text-accent" /> <CardTitle>Pro Tips for Data Retention</CardTitle></div>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                                <li><strong>Classify Your Data:</strong> Not all data is equal. Classify your data into categories (e.g., Financial, Customer PII, Marketing, Logs) and assign a different retention period to each based on its value and legal requirements.</li>
                                <li><strong>Automate Everything:</strong> Do not rely on manual processes for data deletion. Implement automated scripts and database jobs to enforce your retention policy consistently and avoid human error.</li>
                                <li><strong>Distinguish Deletion from Archival:</strong> For some data, you may need to 'archive' it to cheaper, long-term storage instead of deleting it permanently. Your policy should define this distinction clearly.</li>
                                <li><strong>Document Your Policy:</strong> Maintain a clear, accessible document that outlines your data retention schedule. This is essential for compliance audits and legal discovery.</li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                             <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                        </CardHeader>
                        <CardContent>
                             <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                                <li><strong>"Keep Everything Forever":</strong> The most common mistake. This "digital hoarding" vastly increases storage costs and legal risk without providing proportional business value.</li>
                                <li><strong>No Policy At All:</strong> Having no formal policy leads to inconsistent data management, higher costs, and a reactive, chaotic approach when a legal or compliance issue arises.</li>
                                <li><strong>Forgetting About Backups:</strong> Your retention policy must also apply to your backups. There's no point deleting data from your live database if it still exists in unmanaged backups from three years ago. Use a tool like our <Link href="/tools/backup-scheduler" className="text-primary hover:underline">Backup Scheduler</Link> to plan this.</li>
                                <li><strong>Ignoring Legal Counsel:</strong> Data retention rules are complex and vary by jurisdiction and industry. Always consult with legal counsel when creating or updating your retention policy to ensure you are compliant.</li>
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
                                  <CardDescription className="text-xs">Estimate the storage space needed for your backups based on your retention policy.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                      <Link href="/tools/cloud-storage-cost-estimator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Cloud Storage Cost Estimator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Calculate the monthly cost of storing your retained and archived data.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                       <Link href="/tools/uptime-calculator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Uptime / Availability Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Understand the SLA and availability promises that protect your stored data.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                  </div>
              </section>
            </div>
        </>
    );
};

export default DataRetentionCalculatorPage;
