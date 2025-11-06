
import { PageHeader } from '@/components/page-header';
import { UptimeCalculator } from './uptime-calculator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Lightbulb, AlertTriangle, BookOpen, ChevronRight, Wand } from 'lucide-react';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const metadata = {
    title: 'Server Uptime & SLA Calculator | 99.9% Availability | ICT Toolbench',
    description: 'Calculate server uptime percentage or see how an SLA percentage (e.g., 99.9%) translates into actual downtime. Understand the nines of availability.',
    openGraph: {
        title: 'Server Uptime & SLA Calculator | ICT Toolbench',
        description: 'Instantly calculate server uptime percentage and translate SLA promises into real-world downtime over days, months, and years.',
        url: '/tools/uptime-calculator',
    }
};

const faqData = [
    { question: "What is server uptime?", answer: "Server uptime is the percentage of time that a server is fully operational and available to users. It's a critical measure of a system's reliability. 100% uptime means the server never went down." },
    { question: "What does 'The Nines of Availability' mean?", answer: "This refers to the practice of measuring uptime as a percentage of nines. 'Three nines' is 99.9% uptime, 'four nines' is 99.99%, and 'five nines' (99.999%) is considered the gold standard for high availability, allowing for only about 5 minutes of downtime per year." },
    { question: "What is an SLA?", answer: "An SLA (Service Level Agreement) is a contract between a service provider (like a web host or cloud provider) and a customer that defines the level of service expected. It often includes a guaranteed uptime percentage, and specifies credits or penalties if that guarantee is not met." },
    { question: "Why is 100% uptime practically impossible?", answer: "Achieving true 100% uptime is nearly impossible because unforeseen events will always occur. These include hardware failures, software bugs, power outages, network provider issues, security attacks (DDoS), and human error. High availability systems are designed with redundancy and failover to get as close as possible, but there's always a non-zero risk of downtime." },
    { question: "How can I improve my website's uptime?", answer: "Improving uptime involves a multi-faceted approach: choosing a reputable hosting provider, using a Content Delivery Network (CDN) to distribute load, implementing redundant hardware (e.g., multiple servers with a load balancer), setting up automated monitoring with alerts, and having a solid backup and disaster recovery plan." },
    { question: "Does scheduled maintenance count against uptime?", answer: "This depends on the SLA. Most SLAs define 'downtime' as 'unplanned downtime' and have specific clauses that exclude pre-announced, scheduled maintenance windows from the calculation." },
    { question: "What is the difference between uptime and availability?", answer: "While often used interchangeably, 'uptime' typically refers to whether the server itself is running, whereas 'availability' refers to whether the end-users can actually access the service. A server could be 'up', but if a network failure prevents users from reaching it, the service is not 'available'." },
    { question: "How does this calculator handle leap years?", answer: "For simplicity and standardization, this calculator uses an average year length of 365.25 days and an average month length of 30.44 days to account for leap years over time, providing a consistent average for long-term calculations." },
    { question: "Is this tool suitable for official SLA reporting?", answer: "No. This tool is for educational and estimation purposes only. Official SLA compliance must be measured by a dedicated, continuous monitoring system that logs every second of downtime accurately." },
    { question: "Why is a small difference in uptime percentage so significant?", answer: "Because the percentages are so high, a small decimal change has a large impact. The difference between 99.9% and 99.99% uptime is the difference between over 8 hours of downtime per year and just 52 minutes. For a critical e-commerce site, those 7+ hours could mean thousands of dollars in lost revenue." },
];

const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Use the Server Uptime Calculator',
    description: 'Calculate uptime percentage from downtime, or calculate downtime from an SLA percentage.',
    step: [
        { '@type': 'HowToStep', name: 'Choose Calculation Mode', text: 'Select the "Uptime from Downtime" tab to calculate a percentage from a known downtime period. Select the "Downtime from SLA" tab to see how an uptime percentage translates into real-world time.' },
        { '@type': 'HowToStep', name: 'Enter Your Data', text: 'In the first mode, enter the amount of time the service was down. In the second mode, enter the uptime percentage from your SLA.' },
        { '@type': 'HowToStep', name: 'Review the Results', text: 'The tool will instantly show you the calculated uptime percentage or the equivalent downtime over a day, week, month, and year.' },
    ],
    totalTime: 'PT1M',
};

const keyTerminologies = [
    { term: 'Uptime', definition: 'The measure of time a system has been operational and available. Usually expressed as a percentage.' },
    { term: 'Downtime', definition: 'The period of time when a system is not operational or available to users.' },
    { term: 'SLA (Service Level Agreement)', definition: 'A contractual commitment between a service provider and a client that specifies the level of service, including uptime guarantees.' },
    { term: 'High Availability (HA)', definition: 'A system design approach and associated service implementation that ensures a high level of operational performance and uptime.' },
    { term: 'The Nines', definition: 'A common way of referring to uptime percentages, where each "nine" represents a higher level of reliability (e.g., 99.9% is "three nines").' },
    { term: 'Redundancy', definition: 'The duplication of critical components or functions of a system with the intention of increasing reliability, usually in the form of a backup or fail-safe.' },
];

export default function UptimeCalculatorPage() {
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
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <PageHeader
        title="Server Uptime & SLA Calculator"
        description="Quickly calculate server uptime percentage from a known downtime period, or see how an SLA percentage (e.g., 99.9%) translates into actual hours of downtime."
      />
      
      <div className="max-w-4xl mx-auto space-y-12">
        <UptimeCalculator />

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use This Tool</h2>
          <Card className="prose prose-sm max-w-none text-foreground p-6">
              <p>This calculator provides a two-way function to help you understand system reliability, whether you're measuring past performance or evaluating a hosting provider's promise.</p>
              <h4>To Calculate Uptime Percentage:</h4>
              <ol>
                  <li><strong>Select the "Uptime from Downtime" Tab:</strong> This mode is for when you know how long a system was down.</li>
                  <li><strong>Enter Downtime:</strong> Input the total downtime in days, hours, minutes, and/or seconds.</li>
                  <li><strong>Select Time Period:</strong> Choose the total period over which the downtime occurred (e.g., a month, a year).</li>
                  <li><strong>Review the Result:</strong> The tool will instantly calculate the uptime and downtime percentages for that period.</li>
              </ol>
              <h4>To Calculate Downtime from an SLA:</h4>
              <ol>
                <li><strong>Select the "Downtime from SLA" Tab.</strong></li>
                <li><strong>Enter Uptime Percentage:</strong> Input the uptime percentage guaranteed by your Service Level Agreement (SLA), for example, `99.9` or `99.95`.</li>
                <li><strong>Analyze the Breakdown:</strong> The tool will immediately show you what that percentage means in terms of actual downtime over a day, week, month, and year.</li>
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
                  <CardTitle className="text-primary">Educational Deep Dive: The Meaning of the "Nines"</CardTitle>
              </div>
              <CardDescription>From "three nines" to "five nines," understand what uptime percentages really mean and why every decimal point matters.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
              <section>
                  <h3 className="font-bold text-xl">What is Uptime and Why is it Critical?</h3>
                  <p>
                    Server uptime is the measure of a system's reliability, expressed as the percentage of time that a server or service is operational and available to users. In today's digital world, uptime is not just a technical metric; it's a direct indicator of a business's health and credibility. For an e-commerce site, downtime means lost sales. For a SaaS application, it means broken workflows and frustrated customers. For any business, it means a loss of trust. This is why hosting providers and cloud platforms place such a heavy emphasis on their uptime guarantees, often laid out in a formal Service Level Agreement (SLA).
                  </p>
              </section>
              <section>
                  <h3 className="font-bold text-xl">Decoding "The Nines": What an SLA Percentage Really Means</h3>
                  <p>When a provider guarantees "99.9% uptime," it sounds impressive. But what does that percentage translate to in actual time? The impact of that 0.1% of downtime can be surprising. The "nines of availability" is a common industry shorthand for discussing these levels of reliability.</p>
                  <div className="overflow-x-auto my-4">
                      <table className="w-full">
                          <thead><tr className="border-b"><th className="p-2 text-left">Availability</th><th className="p-2 text-left">"The Nines"</th><th className="p-2 text-left">Downtime per Year</th></tr></thead>
                          <tbody>
                              <tr className="border-b"><td className="p-2 font-code">99%</td><td className="p-2">Two Nines</td><td className="p-2">3.65 days</td></tr>
                              <tr className="border-b"><td className="p-2 font-code">99.9%</td><td className="p-2">Three Nines</td><td className="p-2">8.77 hours</td></tr>
                              <tr className="border-b"><td className="p-2 font-code">99.99%</td><td className="p-2">Four Nines</td><td className="p-2">52.6 minutes</td></tr>
                              <tr className="border-b"><td className="p-2 font-code">99.999%</td><td className="p-2">Five Nines</td><td className="p-2">5.26 minutes</td></tr>
                              <tr><td className="p-2 font-code">99.9999%</td><td className="p-2">Six Nines</td><td className="p-2">31.56 seconds</td></tr>
                          </tbody>
                      </table>
                  </div>
                  <p>As you can see, the difference between 99.9% and 99.99% uptime is the difference between nearly 9 hours of downtime and less than an hour of downtime per year. For a mission-critical e-commerce site, those 7+ hours could mean thousands of dollars in lost revenue.</p>
              </section>
               <section>
                    <h3 className="font-bold text-xl">The Path to High Availability</h3>
                    <p>
                        Achieving "five nines" or higher is not a matter of simply buying a good server; it requires a comprehensive strategy of redundancy and fault tolerance. This includes:
                    </p>
                    <ul className="list-disc pl-5">
                       <li><strong>Hardware Redundancy:</strong> Using redundant power supplies, <Link href="/tools/raid-calculator" className="text-primary hover:underline">RAID storage arrays</Link>, and network cards so that the failure of a single component doesn't take down the whole server.</li>
                       <li><strong>Server Clustering:</strong> Running multiple servers in a cluster with a load balancer. If one server fails, the load balancer automatically redirects traffic to the healthy servers. This is a form of <Link href="/tools/vm-scaling-calculator" className="text-primary hover:underline">horizontal scaling</Link>.</li>
                       <li><strong>Geographic Redundancy:</strong> Hosting your application in multiple data centers in different geographic regions. If a natural disaster or power outage takes out one data center, traffic can be failed over to another region.</li>
                       <li><strong>Automated Monitoring and Failover:</strong> Using software to constantly monitor the health of all components and automatically trigger failover procedures the instant a problem is detected.</li>
                    </ul>
              </section>
          </CardContent>
      </Card>
      
        <section>
            <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Choosing a Web Hosting Plan</h3>
                    <p className="text-sm text-muted-foreground">A small business owner is comparing two web hosting plans. Plan A offers a 99.9% uptime SLA, while Plan B offers 99.99%. Using the calculator, they see that Plan A allows for over 8 hours of downtime per year, while Plan B allows for only 52 minutes. For their e-commerce store, minimizing downtime is critical, so they decide the higher cost of Plan B is a worthwhile investment.</p>
                </div>
                <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Setting Internal Service Level Objectives (SLOs)</h3>
                    <p className="text-sm text-muted-foreground">A DevOps team is setting an internal goal (an SLO) for a new microservice. They commit to "four nines" (99.99%) availability. Using this tool, they can clearly communicate to management that this translates to a maximum of 52.6 minutes of unplanned downtime per year, setting clear and measurable expectations for the service's reliability.</p>
                </div>
                <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Claiming an SLA Credit</h3>
                    <p className="text-sm text-muted-foreground">A company's critical application, hosted on a cloud provider with a 99.95% uptime SLA, was down for 4 hours last month. They use the calculator's "Uptime from Downtime" tab to find that 4 hours of downtime in a month equates to only 99.45% uptime. Since this is below the guaranteed 99.95%, they have clear evidence to file a claim for a service credit from their provider.</p>
                </div>
                <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Justifying a High-Availability Architecture</h3>
                    <p className="text-sm text-muted-foreground">An IT manager needs to get budget approval to migrate a single-server application to a redundant, high-availability cluster. The current server has about 2 hours of downtime per quarter (8 hours/year). By showing that this equals ~99.9% uptime and that a new architecture could achieve 99.99% (under 1 hour/year), they can quantify the improvement and justify the project's cost versus the cost of lost revenue from downtime.</p>
                </div>
            </div>
        </section>

      <div className="grid md:grid-cols-2 gap-8">
          <Card>
              <CardHeader>
                  <div className='flex items-center gap-2'><Wand className="h-6 w-6 text-accent" /> <CardTitle>Pro Tips & Quick Hacks</CardTitle></div>
              </CardHeader>
              <CardContent>
                  <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                      <li><strong>Think in Minutes:</strong> When evaluating an SLA, immediately convert the percentage to minutes of downtime per month. "99.95% uptime" is easier to understand as "about 22 minutes of allowed downtime per month."</li>
                      <li><strong>Monitor Your Own Uptime:</strong> Don't just trust your provider's dashboard. Use a third-party uptime monitoring service (like UptimeRobot, Pingdom, or Better Uptime) to get an objective measure of your availability.</li>
                      <li><strong>Read the Fine Print:</strong> Scrutinize the SLA document. Look for exclusions, such as scheduled maintenance, and understand exactly how credits are calculated and claimed if the guarantee is breached.</li>
                      <li><strong>Uptime vs. Performance:</strong> A server can be "up" but still be incredibly slow. Uptime is just one part of the picture. Use our <Link href="/tools/response-time-calculator" className="text-primary hover:underline">Response Time Calculator</Link> to measure performance as well.</li>
                  </ul>
              </CardContent>
          </Card>
          <Card>
              <CardHeader>
                   <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
              </CardHeader>
              <CardContent>
                   <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                      <li><strong>Ignoring the SLA:</strong> Choosing a hosting provider based on price alone without understanding their uptime guarantee and compensation policy.</li>
                      <li><strong>Forgetting About Dependencies:</strong> Your application's uptime is dependent on the uptime of all its critical services (e.g., your database provider, payment gateway, third-party APIs). A chain is only as strong as its weakest link.</li>
                      <li><strong>No Disaster Recovery Plan:</strong> Assuming your server will never fail completely. You must have a regularly tested plan for restoring your service from backups in a worst-case scenario. Our <Link href="/tools/backup-scheduler" className="text-primary hover:underline">Backup Scheduler</Link> can help with planning.</li>
                      <li><strong>Confusing Uptime with Data Durability:</strong> Uptime guarantees do not protect you from data loss. You are still responsible for your own backups, even with a high-availability hosting plan.</li>
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
              <Link href="/tools/response-time-calculator" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Response Time Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Uptime is good, but is your server fast? Measure your Time to First Byte (TTFB).</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
              <Link href="/tools/data-transfer-calculator" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Data Transfer Time Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Calculate how long it will take to upload backups or restore data based on connection speed.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
              <Link href="/tools/ssl-checker" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">SSL Checker<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">An expired SSL certificate is a common cause of perceived downtime. Check your certificate's validity.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
          </div>
      </section>
      </div>
    </>
  );
}
