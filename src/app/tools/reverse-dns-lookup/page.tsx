
import { PageHeader } from '@/components/page-header';
import { ReverseDnsLookupTool } from './reverse-dns-lookup-tool';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { Lightbulb, AlertTriangle, BookOpen, ChevronRight, Wand } from 'lucide-react';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const metadata = {
    title: 'Reverse DNS Lookup Tool | IP to Hostname | ICT Toolbench',
    description: 'Perform a reverse DNS lookup to find the hostname associated with an IP address. Check PTR records to troubleshoot network issues and verify email server configurations.',
    openGraph: {
        title: 'Reverse DNS Lookup Tool | IP to Hostname | ICT Toolbench',
        description: 'Instantly find the domain name for any IP address by querying its PTR record. Essential for network administrators and email deliverability analysis.',
        url: '/tools/reverse-dns-lookup',
    }
};

const faqData = [
    { question: "What is a reverse DNS lookup?", answer: "A reverse DNS lookup (rDNS) is the opposite of a forward DNS lookup. Instead of querying the DNS for an IP address associated with a domain name, a reverse lookup queries for a domain name associated with an IP address. This is done by looking up the IP's PTR (Pointer) record." },
    { question: "What is a PTR record?", answer: "A PTR record is a type of DNS record that maps an IP address to a hostname. It's the 'P' in 'PTR' and it 'points' from the IP to the name. For example, a PTR record could state that the IP address `8.8.8.8` points to the hostname `dns.google`." },
    { question: "Why is reverse DNS important?", answer: "Reverse DNS is critically important for email servers. Many mail servers will perform a reverse DNS check on the IP address of an incoming email connection. If the IP address does not have a valid PTR record, or if the PTR record's hostname does not match the sending server's name (forward-confirmed reverse DNS), the email may be marked as spam or rejected outright. It is also used in network troubleshooting to identify devices in log files by name instead of just by IP." },
    { question: "Why would a reverse DNS lookup fail?", answer: "A lookup can fail for two main reasons. The most common is that no PTR record has been configured for that IP address by the owner of the IP block (usually an ISP or cloud provider). It can also fail if the request times out or the authoritative DNS servers for that IP range are unresponsive." },
    { question: "Is a PTR record the same as an A record?", answer: "No. An A record maps a hostname to an IP address (e.g., `example.com` -> `93.184.216.34`). A PTR record maps an IP address to a hostname (e.g., `93.184.216.34` -> `example.com`). For good practice, they should match each other, a configuration known as Forward-Confirmed Reverse DNS (FCrDNS)." },
    { question: "How do I set up a PTR record for my IP address?", answer: "You cannot set up a PTR record yourself through your domain's DNS provider. PTR records must be configured by the entity that owns and manages the IP address block. This is usually your Internet Service Provider (ISP), web hosting company, or cloud provider (like AWS or Google Cloud). You typically need to contact their support or use a specific section of their control panel to request a PTR record be set for your server's IP." },
    { question: "Can an IP address have multiple PTR records?", answer: "While technically possible to configure, it is strongly discouraged by DNS standards (RFC 1033). An IP address should have exactly one PTR record pointing to its canonical hostname. Having multiple PTR records can cause unpredictable behavior, especially with email servers." },
    { question: "What is the `in-addr.arpa` domain?", answer: "This is a special top-level domain used exclusively for reverse DNS lookups. To perform a reverse lookup for an IP address like `8.8.8.8`, the IP's octets are reversed and appended to `.in-addr.arpa`. The DNS query is then made for the PTR record of `8.8.8.8.in-addr.arpa`." },
    { question: "Does this tool work for IPv6 addresses?", answer: "No, this tool is designed for IPv4 addresses only. IPv6 uses a similar reverse lookup mechanism but a different special domain (`.ip6.arpa`) and address format, which requires a different tool." },
    { question: "Is my IP's PTR record the same as my computer's hostname?", answer: "Usually not. The PTR record is for the public IP address of your server or network, and it should point to the server's official hostname. Your local computer on a home network has a local hostname that is not visible to the public internet and is not related to the public PTR record." },
];

const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Perform a Reverse DNS Lookup',
    description: 'A step-by-step guide to finding the hostname associated with an IPv4 address.',
    step: [
        { '@type': 'HowToStep', name: 'Enter IP Address', text: 'In the input field, type the IPv4 address you want to look up (e.g., 8.8.8.8).' },
        { '@type': 'HowToStep', name: 'Perform Lookup', text: 'Click the "Lookup Hostname" button. Our server will query the DNS for a corresponding PTR record.' },
        { '@type': 'HowToStep', name: 'Analyze the Results', text: 'The tool will display the hostname(s) associated with the IP address. If no record is found, it will provide a clear message indicating that.' },
    ],
    totalTime: 'PT1M'
};

const keyTerminologies = [
    { term: 'Reverse DNS (rDNS)', definition: 'The process of resolving an IP address into its associated domain name, the opposite of a forward DNS lookup.' },
    { term: 'PTR Record (Pointer Record)', definition: 'A type of DNS record that maps an IP address to a canonical hostname.' },
    { term: 'Forward-Confirmed Reverse DNS (FCrDNS)', definition: 'A verification method where a reverse DNS lookup for an IP must return a hostname that, in turn, has a forward DNS (A record) lookup that resolves back to the original IP address. This is a strong sign of a legitimately configured mail server.' },
    { term: 'in-addr.arpa', definition: 'A special DNS top-level domain used to store PTR records for IPv4 reverse lookups.' },
    { term: 'Email Deliverability', definition: 'The ability of an email to reach the recipient\'s inbox without being marked as spam. A valid PTR record is a critical factor for good deliverability.' },
];

export default function ReverseDnsLookupPage() {
  return (
    <>
      <StructuredData data={faqData} />
      <StructuredData data={howToSchema} />
      <PageHeader
        title="Reverse DNS Lookup Tool"
        description="Find the hostname associated with an IP address by querying its PTR record. Essential for troubleshooting email delivery and network configuration issues."
      />
      
      <div className="max-w-4xl mx-auto space-y-12">
        <ReverseDnsLookupTool />

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use This Tool</h2>
          <Card className="prose prose-sm max-w-none text-foreground p-6">
              <p>This tool helps you perform a reverse lookup to find out what hostname is associated with a given IP address.</p>
              <ol>
                  <li><strong>Enter IP Address:</strong> Type the public IPv4 address you want to investigate into the input box.</li>
                  <li><strong>Lookup Hostname:</strong> Click the "Lookup Hostname" button to initiate the reverse DNS query.</li>
                  <li><strong>Review the Result:</strong> The tool will display the hostname(s) found in the PTR record for that IP. If no record exists, it will clearly state that a result could not be found.</li>
              </ol>
               <Alert>
                  <Lightbulb className="h-4 w-4" />
                  <AlertTitle>Example</AlertTitle>
                  <AlertDescription>
                    Try looking up the IP address <code className="font-code bg-muted p-1 rounded-sm">8.8.8.8</code>. The result should be `dns.google`, showing the hostname for Google's public DNS server.
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
                  <CardTitle className="text-primary">Educational Deep Dive: Reverse DNS and Email Trust</CardTitle>
              </div>
              <CardDescription>From PTR records to FCrDNS, understand why reverse DNS is a cornerstone of email deliverability and network identity.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
              <section>
                  <h3 className="font-bold text-xl">The Other Side of DNS: From Number to Name</h3>
                  <p>
                    We are all familiar with forward DNS: you type `google.com` into your browser, and the DNS system translates it to an IP address like `142.250.184.238`. Reverse DNS (rDNS) does the exact opposite. It takes an IP address and asks the DNS, "What is the canonical hostname for this IP?" This is accomplished by querying for a special type of DNS record called a **PTR (Pointer) record**.
                  </p>
                  <p>
                    Unlike A records, which are stored in your domain's DNS zone, PTR records are managed in a special domain space called `.in-addr.arpa`. The IP address is reversed and used as a prefix. For the IP `142.250.184.238`, the query is sent for the PTR record of `238.184.250.142.in-addr.arpa`. The authority to create this record belongs to whoever owns the IP address block—typically your ISP or cloud provider.
                  </p>
              </section>
              <section>
                  <h3 className="font-bold text-xl">The Gatekeeper of Email: Why PTR Records are Critical</h3>
                  <p>The single most important application of reverse DNS is in email delivery. When a mail server receives an incoming email, it almost always performs a series of checks to verify that the sender is legitimate and not a spammer. One of the first and most basic checks is a reverse DNS lookup on the sending server's IP address.</p>
                  <p>Imagine an email arrives from the IP `10.20.30.40`. The receiving server will perform the following checks:</p>
                  <ol className="list-decimal pl-5">
                     <li><strong>Reverse DNS Lookup (PTR Check):</strong> The server queries for the PTR record of `10.20.30.40`. If no PTR record is found, the server might immediately reject the email or flag it as highly suspicious. Let's say the PTR record returns the hostname `mail.example.com`.</li>
                     <li><strong>Forward DNS Lookup (A Record Check):</strong> The server then performs a forward DNS lookup on the hostname it just received (`mail.example.com`). It checks if the A record for `mail.example.com` resolves back to the original IP address, `10.20.30.40`.</li>
                     <li><strong>FCrDNS Validation:</strong> If the forward lookup matches the original IP, the connection passes a **Forward-Confirmed Reverse DNS (FCrDNS)** check. This creates a strong chain of trust, confirming that the owner of the IP address and the owner of the domain name are likely the same entity and have configured their systems correctly.</li>
                  </ol>
                  <p>
                    A failed PTR lookup or a mismatched FCrDNS check is a huge red flag for spam filters. It suggests the sending server might be a compromised machine on a residential network or a misconfigured server—both common sources of spam. Ensuring your mail server has a correct and matching PTR record is one of the most fundamental steps for good email deliverability.
                  </p>
              </section>
          </CardContent>
      </Card>
      
      <div className="grid md:grid-cols-2 gap-8">
          <Card>
              <CardHeader>
                  <div className='flex items-center gap-2'><Wand className="h-6 w-6 text-accent" /> <CardTitle>Pro Tips & Quick Hacks</CardTitle></div>
              </CardHeader>
              <CardContent>
                  <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                      <li><strong>Verify Your Mail Server:</strong> If you run your own email server, use this tool on its public IP address. The result should be the official hostname of your mail server (e.g., `mail.yourdomain.com`).</li>
                      <li><strong>Troubleshoot Log Files:</strong> When you see an unfamiliar IP address in a server or firewall log, a reverse DNS lookup can give you valuable context. An IP that resolves to `dsl-customer-123.some-isp.com` tells a different story than one that resolves to `server.malicious-botnet.net`.</li>
                      <li><strong>Use `dig` or `nslookup` on the command line:</strong> For quick command-line checks, you can use `dig -x IP_ADDRESS` or `nslookup IP_ADDRESS`.</li>
                      <li><strong>Check Both Forward and Reverse:</strong> For a full FCrDNS check, first use this tool to get the hostname from the IP. Then, use our <Link href="/tools/dns-lookup" className="text-primary hover:underline">DNS Lookup Tool</Link> to check the A record for that hostname and ensure it matches the original IP.</li>
                  </ul>
              </CardContent>
          </Card>
          <Card>
              <CardHeader>
                   <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
              </CardHeader>
              <CardContent>
                   <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                      <li><strong>Forgetting to Request a PTR Record:</strong> A common oversight when setting up a new server. You must proactively contact your hosting provider to have a PTR record set for your IP; it is not automatic.</li>
                      <li><strong>Generic PTR Records:</strong> Many ISPs assign generic PTR records (e.g., `1-2-3-4.static.some-isp.com`). While this is better than nothing, a mail server sending as `yourdomain.com` will have a mismatch, which can still look suspicious. Always request a custom PTR that matches your server's hostname.</li>
                      <li><strong>Pointing PTR to the Wrong Hostname:</strong> The PTR should point to the server's canonical hostname, not necessarily the main website domain. For example, if your mail server identifies itself as `mail.example.com`, the PTR record for its IP should point to `mail.example.com`, not `www.example.com`.</li>
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
              <Link href="/tools/dns-lookup" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">DNS Lookup Tool<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Perform a forward lookup (name to IP) to complete an FCrDNS check.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
              <Link href="/tools/ip-privacy-checker" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Public vs. Private IP Checker<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Reverse DNS lookups are only relevant for public IP addresses.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
              <Link href="/tools/whois-lookup" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Whois Lookup<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Find the ownership and administrative details for a domain name.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
          </div>
      </section>
      </div>
    </>
  );
}
