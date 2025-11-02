
import React from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { BookOpen, AlertTriangle, Wand, ChevronRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { DatabaseHealthChecker } from './db-health-checker';

export const metadata = {
    title: 'Database Health Checker | Performance & Monitoring Guide | ICT Toolbench',
    description: 'Use our interactive checklist and guide to perform a database health check. Learn to monitor key metrics like CPU, memory, query performance, and indexing to ensure a stable and performant database.',
    openGraph: {
        title: 'Database Health Checker | ICT Toolbench',
        description: 'An educational guide for DBAs and developers to assess and improve the health and performance of their relational databases.',
        url: '/tools/db-health-checker',
    }
};

const DatabaseHealthCheckerPage = () => {
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
      "name": "Database Health Checker (Educational Guide)",
      "operatingSystem": "All",
      "applicationCategory": "DeveloperApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "An interactive checklist and educational guide to help developers and DBAs perform a comprehensive health check on their database systems.",
      "url": "https://www.icttoolbench.com/tools/db-health-checker"
    };

    return (
        <>
            <StructuredData data={faqSchema} />
            <StructuredData data={howToSchema} />
            <StructuredData data={softwareAppSchema} />
            <div className="max-w-4xl mx-auto space-y-12">
                <PageHeader
                    title="Database Health Checker"
                    description="A proactive database is a healthy database. This interactive guide and checklist will walk you through the key areas to monitor to ensure your database is performant, stable, and secure."
                />
                
                <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Educational Tool Only</AlertTitle>
                    <AlertDescription>
                        This is an interactive checklist, not an automated scanner. It cannot connect to your database. Use this guide to learn what to look for using your database's own monitoring and diagnostic tools.
                    </AlertDescription>
                </Alert>

                <DatabaseHealthChecker />

                <section>
                    <h2 className="text-2xl font-bold mb-4">How to Use This Checklist</h2>
                    <Card className="prose prose-sm max-w-none text-foreground p-6">
                        <p>This checklist is designed to guide you through a manual health check of your database system. For each item, investigate your own database environment using your monitoring tools and check the box if the condition is healthy.</p>
                        <ol>
                            <li><strong>Review Each Category:</strong> Go through the checklist categories: Performance, Storage, Security, and Backups.</li>
                            <li><strong>Investigate the Metric:</strong> For each checklist item, read the description and understand what you need to look for. For example, for "CPU Usage," you would check your cloud provider's monitoring dashboard or your server's `top` command.</li>
                            <li><strong>Check the Box:</strong> If the metric is within a healthy range (as described in the "Deep Dive" section below), check the box.</li>
                            <li><strong>Identify Areas for Improvement:</strong> Any unchecked boxes at the end of your review are clear action items for you to investigate and optimize to improve your database's health.</li>
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
                            <CardTitle className="text-primary">Educational Deep Dive: A DBA's Guide to Database Health</CardTitle>
                        </div>
                        <CardDescription>From CPU utilization to index bloat, learn about the key performance indicators (KPIs) that signal a healthy or ailing database.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                        <section>
                            <h3>Core Performance Metrics</h3>
                            <p>These metrics give you a real-time pulse on your server's workload and are the first place to look when performance issues arise.</p>
                            <ul className="list-disc pl-5">
                                <li><strong>CPU Utilization:</strong> Consistently high CPU usage (e.g., >80-90%) is a sign that your server is struggling. This can be caused by inefficient queries, a high volume of connections, or insufficient processing power. It may be time to optimize queries or <Link href="/tools/vm-scaling-calculator" className="text-primary hover:underline">scale up</Link> your instance.</li>
                                <li><strong>Memory Usage & Cache Hit Ratio:</strong> Databases love RAM. They use it to cache frequently accessed data and avoid slow disk reads. A high cache hit ratio (99%+) is a sign of a healthy, well-provisioned database. If memory usage is constantly maxed out and the cache hit ratio is low, it means your database doesn't have enough RAM for its workload, a major performance bottleneck. You can analyze the cost of adding more RAM with our <Link href="/tools/storage-memory-cost-analyzer" className="text-primary hover:underline">Storage vs. Memory Analyzer</Link>.</li>
                                <li><strong>Active Connections:</strong> A sudden, large spike in active connections can indicate a connection leak in your application or a denial-of-service attack. A steadily increasing number of idle connections can also exhaust server resources.</li>
                                <li><strong>Query Performance (TPS & Latency):</strong> Monitor your database's Transactions Per Second (TPS) and average query latency. A sudden drop in TPS or a spike in latency points to a performance problem. You can use our <Link href="/tools/tps-calculator" className="text-primary hover:underline">TPS Calculator</Link> to understand your throughput. Use your database's slow query log to identify and optimize the specific queries that are taking too long.</li>
                            </ul>
                        </section>
                        <section>
                            <h3>Storage Health</h3>
                            <p>Storage is where your data lives. Keeping it healthy is non-negotiable.</p>
                             <ul className="list-disc pl-5">
                                <li><strong>Disk Space Usage:</strong> The most basic check. Running out of disk space is a catastrophic failure. Monitor disk usage and set up alerts to warn you when it exceeds a threshold (e.g., 85%). Use our <Link href="/tools/storage-growth-estimator" className="text-primary hover:underline">Storage Growth Estimator</Link> for capacity planning.</li>
                                <li><strong>Disk I/O (IOPS):</strong> If your CPU and RAM are fine but queries are still slow, your bottleneck might be disk speed. Monitor your disk's read/write IOPS (Input/Output Operations Per Second). If it's constantly hitting its maximum limit, you need to upgrade to faster storage (like moving from GP2 to GP3/io1 on AWS) or optimize your queries to read less data. Our <Link href="/tools/iops-calculator" className="text-primary hover:underline">IOPS Calculator</Link> can help model your disk array performance.</li>
                                <li><strong>Index Bloat & Fragmentation:</strong> Over time, as data is inserted, updated, and deleted, indexes can become "bloated" or "fragmented," containing empty space or being stored non-sequentially on disk. This makes them less efficient. Regularly running maintenance commands (like `REINDEX` in PostgreSQL) is necessary to keep indexes lean and fast.</li>
                            </ul>
                        </section>
                        <section>
                            <h3>Backup and Security</h3>
                             <ul className="list-disc pl-5">
                                <li><strong>Successful Backups:</strong> A backup that didn't complete successfully is not a backup. Your number one health check is to verify that your automated backup jobs are completing without errors every single day.</li>
                                <li><strong>Point-in-Time Recovery (PITR):</strong> For critical databases, having a daily backup isn't enough. PITR, usually achieved through continuous archiving of transaction logs, allows you to restore a database to any specific second, minimizing data loss in case of a disaster.</li>
                                <li><strong>Least-Privilege Access:</strong> Regularly audit the user accounts and permissions on your database. Your application user should have the minimum permissions necessary to function, not administrative rights. This limits the damage an attacker can do if your application is compromised by an attack like <Link href="/tools/sql-injection-tester" className="text-primary hover:underline">SQL Injection</Link>.</li>
                            </ul>
                        </section>
                    </CardContent>
                </Card>
                
                <section>
                    <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">The Slowing E-commerce Site</h3>
                            <p className="text-sm text-muted-foreground">An online store becomes sluggish during peak hours. A DBA goes through the health checklist. They see CPU and Memory usage are high but acceptable. However, using the database's slow query log, they identify several queries that are performing full table scans. By adding the appropriate indexes, query performance improves dramatically and the site becomes responsive again.</p>
                        </div>
                         <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">The "Disk Full" Emergency</h3>
                            <p className="text-sm text-muted-foreground">A sysadmin receives an alert that a server's disk is 99% full. After firefighting the immediate issue by clearing some old logs, they use the checklist to perform a post-mortem. They realize the database's `audit_log` table was growing without a <Link href="/tools/data-retention-calculator" className="text-primary hover:underline">data retention policy</Link>. They implement a new policy to archive logs older than 90 days, preventing the issue from reoccurring.</p>
                        </div>
                    </div>
                </section>
                
                 <section>
                    <h2 className="text-2xl font-bold mb-4">Practical Tips</h2>
                     <Card>
                        <CardContent className="p-6">
                            <ul className="space-y-4">
                                <li className="flex items-start gap-4">
                                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold">Automate Monitoring and Alerting</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Don't perform health checks manually. Set up a monitoring dashboard using tools like Prometheus, Grafana, or your cloud provider's service (AWS CloudWatch, Google Cloud Monitoring). Configure automated alerts for key thresholds (e.g., CPU > 80%, Disk > 85%, high query latency) to be notified of problems before your users are impacted.
                                        </p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold">Use the `EXPLAIN` Command</h4>
                                        <p className="text-sm text-muted-foreground">
                                            The `EXPLAIN` (or `EXPLAIN ANALYZE`) command is your best friend for query optimization. Prepend it to any slow SQL query to get the database's execution plan. This will tell you definitively if it's using an efficient index scan or a slow full table scan. You can experiment with this concept using our <Link href="/tools/query-time-estimator" className="text-primary hover:underline">Query Execution Time Estimator</Link>.
                                        </p>
                                    </div>
                                </li>
                                 <li className="flex items-start gap-4">
                                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold">Regularly Test Your Backups</h4>
                                        <p className="text-sm text-muted-foreground">
                                           A backup you haven't tested is not a real backup. It's an assumption. On a regular schedule (e.g., quarterly), you must practice restoring a backup to a separate staging environment to ensure your backup files are valid and your entire recovery procedure works as expected.
                                        </p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold">Separate Your Workloads</h4>
                                        <p className="text-sm text-muted-foreground">
                                            If you have long-running, intensive analytical queries (e.g., for business intelligence dashboards), they can lock tables and consume resources, slowing down your main application. The best practice is to set up a dedicated read replica for these analytical workloads, completely isolating them from your production traffic. This is a core part of building a scalable architecture with <Link href="/tools/replication-estimator" className="text-primary hover:underline">Replication</Link>.
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </CardContent>
                     </Card>
                </section>

                <div className="grid md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <div className='flex items-center gap-2'><Wand className="h-6 w-6 text-accent" /> <CardTitle>Pro Tips</CardTitle></div>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                                <li><strong>Automate Monitoring:</strong> Don't perform health checks manually. Set up a monitoring dashboard (using tools like Prometheus, Grafana, or your cloud provider's service) with automated alerts for key thresholds (e.g., CPU > 80%, Disk > 85%).</li>
                                <li><strong>Use `EXPLAIN`:</strong> The `EXPLAIN` (or `EXPLAIN ANALYZE`) command is your best friend. Prepend it to any slow SQL query to get the database's execution plan, which will tell you exactly if and how it's using indexes.</li>
                                <li><strong>Regularly Test Backups:</strong> A backup you haven't tested is not a backup. Regularly practice restoring a backup to a staging environment to ensure your backup files are valid and your recovery process works as expected.</li>
                                <li><strong>Separate Your Workloads:</strong> If possible, use a dedicated read replica for long-running, intensive analytical queries to prevent them from impacting the performance of your primary application database.</li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                             <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes</CardTitle></div>
                        </CardHeader>
                        <CardContent>
                             <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                                <li><strong>Ignoring Slow Queries:</strong> Assuming a query that runs in 2 seconds is "good enough." On a busy site, that one slow query, when run hundreds of times per minute, can bring the entire server to its knees.</li>
                                <li><strong>Over-indexing:</strong> In a panic to fix slow queries, adding indexes to every column. Too many indexes slow down write performance and consume excessive disk space. Only add indexes that are demonstrably useful.</li>
                                <li><strong>Neglecting Maintenance:</strong> Forgetting to run routine database maintenance tasks like `VACUUM` and `REINDEX` (in PostgreSQL) to clean up dead rows and optimize indexes.</li>
                                <li><strong>Not Having a Baseline:</strong> Without knowing what your database's "normal" performance looks like, it's impossible to spot when something is going wrong. Establish a baseline by monitoring your key metrics over time.</li>
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
                                      <AccordionContent>
                                        <div dangerouslySetInnerHTML={{ __html: item.answer }} />
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
                      <Link href="/tools/query-time-estimator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Query Execution Time Estimator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Understand the conceptual difference between a fast indexed query and a slow table scan.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                      <Link href="/tools/index-size-calculator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Index Size Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Estimate the storage cost of adding the new indexes your health check identified as necessary.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                       <Link href="/tools/uptime-calculator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Uptime / Availability Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Quantify the impact of downtime and understand the availability goals your health checks support.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                  </div>
              </section>
            </div>
        </>
    );
};

export default DatabaseHealthCheckerPage;
