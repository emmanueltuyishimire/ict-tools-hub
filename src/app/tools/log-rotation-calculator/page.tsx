
import React from 'react';
import { PageHeader } from '@/components/page-header';
import { LogRotationCalculator } from './log-rotation-calculator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BookOpen, AlertTriangle, Wand, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const metadata = {
    title: 'Log Rotation Calculator | ICT Toolbench',
    description: 'Plan your log rotation strategy by calculating total storage usage and maximum log age. An essential tool for system administrators to prevent disk space issues.',
    openGraph: {
        title: 'Log Rotation Calculator | ICT Toolbench',
        description: 'Estimate storage needs and retention periods for your server logs to ensure system stability and efficient resource management.',
        url: '/tools/log-rotation-calculator',
    }
};

const LogRotationCalculatorPage = () => {
    return (
        <>
            <div className="max-w-4xl mx-auto space-y-12">
                <PageHeader
                    title="Log Rotation Calculator"
                    description="Plan your log file management strategy. This tool helps you calculate the total storage consumed and the maximum age of your logs based on your rotation schedule, helping you prevent full disks and manage data retention."
                />
                
                <LogRotationCalculator />

                <section>
                    <h2 className="text-2xl font-bold mb-4">How to Use the Calculator</h2>
                    <Card className="prose prose-sm max-w-none text-foreground p-6">
                        <p>This calculator helps you forecast the impact of your log rotation policy on your server's storage.</p>
                        <ol>
                            <li><strong>Enter Log File Size:</strong> Input the average size of a single log file before it gets rotated.</li>
                            <li><strong>Set Retention Count:</strong> In the "Number of Rotated Logs to Keep" field, enter how many old log files you want to retain (e.g., 14 for two weeks of daily logs).</li>
                            <li><strong>Define Rotation Frequency:</strong> Specify how often a new log file is created (e.g., every 1 day, every 1 week).</li>
                            <li><strong>Analyze the Summary:</strong> The tool will instantly calculate two key metrics:
                                <ul>
                                    <li><strong>Total Storage Needed:</strong> The maximum disk space your log files will consume.</li>
                                    <li><strong>Max Log Age:</strong> The age of the oldest log file in your system before it gets deleted.</li>
                                </ul>
                            </li>
                        </ol>
                    </Card>
                </section>
                
                <section>
                    <h2 className="text-2xl font-bold mb-4">Worked Example</h2>
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Example: A Busy Web Server</CardTitle>
                                <CardDescription>An administrator needs to configure log rotation for an Nginx web server to keep two weeks of daily logs.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                               <p className="text-sm text-muted-foreground"><strong>Scenario:</strong> The web server generates about <strong>250 MB</strong> of access logs per day. The policy is to rotate logs daily and keep <strong>14</strong> old log files.</p>
                               <div className="prose prose-sm max-w-none">
                                   <ol>
                                       <li><strong>Inputs:</strong>
                                            <ul>
                                                <li>Average Size per Log File: <strong>250</strong> MB</li>
                                                <li>Number of Rotated Logs to Keep: <strong>14</strong></li>
                                                <li>Rotation Frequency: Every <strong>1</strong> Day(s)</li>
                                            </ul>
                                       </li>
                                       <li><strong>Calculation:</strong>
                                            <ul>
                                                <li>Total Storage: 250 MB/log × 14 logs = 3500 MB.</li>
                                                <li>Max Age: 14 logs × 1 day/log = 14 days.</li>
                                            </ul>
                                       </li>
                                       <li><strong>Result:</strong> The tool shows a total storage requirement of <strong>3.5 GB</strong> and a maximum log age of <strong>14 days</strong>. This allows the administrator to confidently allocate space on their `/var/log` partition and know exactly how far back their troubleshooting data goes.</li>
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
                            <CardTitle className="text-primary">Educational Deep Dive: Why Log Rotation is Not Optional</CardTitle>
                        </div>
                        <CardDescription>From preventing server crashes to complying with data policies, understand why managing log files is a critical task for any system administrator.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                        <section>
                            <h3>What is Log Rotation?</h3>
                            <p>
                                Almost every application, service, and operating system generates logs—records of events, errors, and transactions. These logs are invaluable for debugging, security auditing, and performance monitoring. However, on a busy server, these text files can grow incredibly quickly, consuming vast amounts of disk space.
                            </p>
                            <p>
                                <strong>Log rotation</strong> is an automated process that manages these files to prevent them from consuming all available disk space. It works by periodically renaming the current log file (e.g., `app.log` becomes `app.log.1`), creating a new empty `app.log`, and deleting the oldest log files to make room. This ensures that you always have a manageable, recent history of logs without the risk of a disk filling up, which can crash the entire server.
                            </p>
                        </section>
                        <section>
                            <h3>The `logrotate` Utility</h3>
                            <p>
                                On virtually all Linux systems, log rotation is handled by a standard utility called <strong>`logrotate`</strong>. It runs on a schedule (usually daily) and reads configuration files (typically in `/etc/logrotate.d/`) that define the rules for different logs. A typical configuration might look like this:
                            </p>
                             <div className="bg-muted p-4 rounded-md font-code text-sm">
                                <pre>
{`/var/log/nginx/*.log {
    daily
    rotate 14
    compress
    missingok
    notifempty
    create 0640 nginx adm
    sharedscripts
    postrotate
        if [ -f /var/run/nginx.pid ]; then
            kill -USR1 \`cat /var/run/nginx.pid\`
        fi
    endscript
}`}
                                </pre>
                            </div>
                            <p>This configuration tells `logrotate` to handle all `.log` files in the Nginx directory, rotate them daily, keep 14 old copies, and compress the rotated files to save space. This calculator helps you plan for the key parameters in such a configuration: `rotate` (the number to keep) and `daily`/`weekly`/`monthly` (the frequency).</p>
                        </section>
                    </CardContent>
                </Card>
                
                <section>
                    <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Web Server Log Management</h3>
                            <p className="text-sm text-muted-foreground">A sysadmin for a high-traffic e-commerce site notices their `/var/log` partition is filling up quickly. They use this tool to model a new policy. By estimating their daily log size and deciding they only need to keep 7 days of logs for troubleshooting, they can calculate the exact total storage required and configure `logrotate` accordingly, preventing future disk space alerts.</p>
                        </div>
                         <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Compliance and Auditing</h3>
                            <p className="text-sm text-muted-foreground">A financial services company is required by a compliance standard (like PCI-DSS) to retain audit logs for at least one year. An administrator uses the calculator to confirm that their current policy of rotating logs weekly and keeping 52 archives (`rotate 52`, `weekly`) meets this 1-year retention requirement, providing clear evidence for an audit.</p>
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
                                <li><strong>Compress Old Logs:</strong> Most log rotation tools support compression (`compress` directive in `logrotate`). This can reduce the storage footprint of rotated logs by 90% or more. Your total storage need will be much lower if you enable this.</li>
                                <li><strong>Centralize Your Logs:</strong> For a fleet of servers, managing logs locally on each one is inefficient. Use a log shipping agent (like Filebeat or Fluentd) to send all logs to a centralized logging platform (like Elasticsearch/ELK Stack, Splunk, or Graylog) where they can be searched, analyzed, and archived more effectively.</li>
                                <li><strong>Separate Your Log Partition:</strong> Always place your `/var/log` directory on its own dedicated disk partition. This is the single most important step to prevent runaway log files from crashing your entire server by filling up the root filesystem. Use our <Link href="/tools/disk-usage-estimator" className="text-primary hover:underline">Disk Partition Estimator</Link> to plan this.</li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                             <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes</CardTitle></div>
                        </CardHeader>
                        <CardContent>
                             <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                                <li><strong>No Rotation at All:</strong> The most common mistake on unmanaged servers. A log file grows indefinitely until it consumes 100% of the disk space, causing a system-wide crash.</li>
                                <li><strong>Incorrect Permissions:</strong> After a log is rotated, the new file must be created with the correct permissions so the application can write to it. The `create` directive in `logrotate` handles this.</li>
                                <li><strong>Not Reloading Services:</strong> Some applications keep a file handle open to their log file. If you just rename the file, the application will continue writing to the old, renamed file. The `postrotate` script is used to signal the service (e.g., by sending a `SIGHUP`) to close its file handle and open the new one.</li>
                                <li><strong>Ignoring Application-Level Logging:</strong> `logrotate` is great for system logs, but many applications handle their own logging internally. Make sure your application's logging framework also has a size or time-based rotation policy configured.</li>
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
                      <Link href="/tools/disk-usage-estimator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Disk Usage / Partition Estimator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Plan the size of your `/var/log` partition using the output from this calculator.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                      <Link href="/tools/storage-growth-estimator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Storage Growth Estimator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Forecast how your total log storage needs will grow over time.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                       <Link href="/tools/data-retention-calculator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Data Retention Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Determine if your log rotation policy meets your company's data retention requirements.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                  </div>
              </section>
            </div>
        </>
    );
};

export default LogRotationCalculatorPage;
