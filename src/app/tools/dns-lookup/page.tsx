
import { PageHeader } from '@/components/page-header';
import { DnsLookupTool } from './dns-lookup-tool';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { Lightbulb, AlertTriangle, BookOpen, ChevronRight, Wand, Server } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
    title: 'DNS Lookup Tool | Check A, AAAA, MX, TXT Records | ICT Toolbench',
    description: 'Perform a DNS lookup for any domain to check A, AAAA, MX, CNAME, TXT, NS, and SOA records. Our tool helps you diagnose DNS issues and understand domain configurations.',
    openGraph: {
        title: 'DNS Lookup Tool | Check A, AAAA, MX, TXT Records | ICT Toolbench',
        description: 'Instantly query DNS records for any domain. Essential for network administrators, developers, and for troubleshooting email delivery and website access issues.',
        url: '/tools/dns-lookup',
    }
};

const faqData = [
    { question: "What is DNS?", answer: "DNS, or the Domain Name System, is the internet's phonebook. It translates human-readable domain names (like www.google.com) into machine-readable IP addresses (like 142.250.191.78). This allows you to access websites without having to memorize complex numerical addresses." },
    { question: "What is an 'A' record?", answer: "An 'A' record, or Address record, is the most basic type of DNS record. It maps a domain name directly to a 32-bit IPv4 address." },
    { question: "What is an 'AAAA' record?", answer: "An 'AAAA' record (quad-A) is similar to an A record, but it maps a domain name to a 128-bit IPv6 address. As the internet transitions to IPv6, these records are becoming more common." },
    { question: "What is an 'MX' record?", answer: "An 'MX' record, or Mail Exchange record, directs email to a mail server. It specifies the mail servers responsible for accepting email messages on behalf of a domain name and includes a priority value to indicate the order in which servers should be tried." },
    { question: "What is a 'CNAME' record?", answer: "A 'CNAME' record, or Canonical Name record, is used to alias one domain name to another. For example, `www.example.com` might have a CNAME record that points to `example.com`. This means that when a browser requests `www.example.com`, the DNS lookup will transparently resolve to the IP address of `example.com`." },
    { question: "What is a 'TXT' record used for?", answer: "A 'TXT' record, or Text record, can hold arbitrary text-based information. It's incredibly versatile and commonly used for verifying domain ownership (e.g., for Google Search Console), email security policies like SPF (Sender Policy Framework), and DKIM (DomainKeys Identified Mail)." },
    { question: "What does 'SOA' mean?", answer: "An 'SOA' record, or Start of Authority record, contains important administrative information about the DNS zone, such as the primary nameserver, the email of the domain administrator, the domain serial number, and timers relating to refreshing the zone." },
    { question: "Why do I see multiple A or MX records for one domain?", answer: "This is a common practice for redundancy and load balancing. Multiple A records for the same domain can distribute web traffic across several servers. Multiple MX records with different priorities allow for backup mail servers to take over if the primary one is unavailable." },
    { question: "What is TTL?", answer: "TTL, or Time to Live, is a value in a DNS record that tells a DNS resolver how long it is safe to cache (store) that record's information. After the TTL expires, the resolver must query the authoritative nameserver again for updated information. This tool does not show TTL as it's not provided by the basic Node.js DNS resolver." },
    { question: "Why would a DNS lookup fail?", answer: "A lookup can fail for several reasons. The most common is 'ENOTFOUND', which means the domain does not exist. 'ENODATA' means the domain exists, but not for the specific record type you requested (e.g., a domain might have an A record but no MX records). 'ESERVFAIL' indicates a problem with the authoritative nameservers for that domain." }
];

const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Use the DNS Lookup Tool',
    description: 'A step-by-step guide to querying DNS records for a domain.',
    step: [
        { '@type': 'HowToStep', name: 'Enter a Domain', text: 'In the input field, type the domain name you wish to query (e.g., `google.com`).' },
        { '@type': 'HowToStep', name: 'Select a Record Type', text: 'Choose the type of DNS record you want to look up from the dropdown menu (e.g., A, MX, TXT).' },
        { '@type': 'HowToStep', name: 'Perform the Lookup', text: 'Click the "Lookup DNS" button. Our server will query the Domain Name System for the requested records.' },
        { '@type': 'HowToStep', name: 'Analyze the Results', text: 'The results will be displayed in a table, showing the values associated with the DNS record you queried. For example, for an A record, it will show the IP address(es).' }
    ],
    totalTime: 'PT1M'
};

const keyTerminologies = [
    { term: 'DNS (Domain Name System)', definition: 'The decentralized naming system for computers, services, or other resources connected to the Internet or a private network. It translates domain names to IP addresses.' },
    { term: 'A Record', definition: 'Maps a domain name to an IPv4 address.' },
    { term: 'AAAA Record', definition: 'Maps a domain name to an IPv6 address.' },
    { term: 'MX Record', definition: 'Specifies the mail servers responsible for handling email for a domain.' },
    { term: 'CNAME Record', definition: 'Creates an alias, pointing one domain name to another.' },
    { term: 'TXT Record', definition: 'Provides the ability to associate arbitrary text with a domain. Used for verification and email security policies.' },
    { term: 'Nameserver (NS)', definition: 'A server that stores the DNS records for a domain. NS records point to a domain\'s authoritative nameservers.' },
    { term: 'Resolver', definition: 'A DNS client that queries nameservers to resolve a domain name into an IP address.' },
];

export default function DnsLookupPage() {
  return (
    <>
      <StructuredData data={faqData} />
      <StructuredData data={howToSchema} />
      <PageHeader
        title="DNS Lookup Tool"
        description="Query the Domain Name System for any domain's records. Check A, AAAA, MX, CNAME, TXT, and other records to diagnose website and email configuration issues."
      />
      
      <div className="max-w-4xl mx-auto space-y-12">
        <DnsLookupTool />

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use This Tool</h2>
          <Card className="prose prose-sm max-w-none text-foreground p-6">
              <p>This DNS Lookup tool helps you query the internet's phonebook to find the records associated with any domain name.</p>
              <ol>
                  <li><strong>Enter Domain:</strong> Type the domain name you want to inspect (e.g., `github.com`).</li>
                  <li><strong>Select Record Type:</strong> Choose the specific type of DNS record you're interested in from the dropdown menu. If you're not sure, start with 'A' to find its main IP address.</li>
                  <li><strong>Lookup DNS:</strong> Click the "Lookup DNS" button to send the query.</li>
                  <li><strong>Analyze Results:</strong> The tool will display the records it finds in a clear table. If no records of that type are found, or if the domain doesn't exist, it will provide a specific error message to help you diagnose the issue.</li>
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
                  <CardTitle className="text-primary">Educational Deep Dive: How DNS Works</CardTitle>
              </div>
              <CardDescription>From your browser to the root servers, follow the journey of a DNS query and understand the hierarchy that powers the internet.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
              <section>
                  <h3 className="font-bold text-xl">The Internet's Phonebook</h3>
                  <p>
                    The Domain Name System (DNS) is one of the most critical but invisible components of the internet. Its core job is to act as a distributed, global phonebook. Humans are good at remembering names (like `google.com`), but computers communicate using numerical IP addresses (like `142.250.191.78`). DNS is the system that translates one into the other, allowing you to simply type a domain name into your browser.
                  </p>
              </section>
              <section>
                  <h3 className="font-bold text-xl">The DNS Query Journey</h3>
                  <p>When you type a domain into your browser, a multi-step query process happens in milliseconds:</p>
                  <ol className="list-decimal pl-5">
                     <li><strong>Recursive Resolver:</strong> Your request first goes to a "recursive resolver," usually operated by your ISP (like Comcast or AT&T). Its job is to find the answer for you. It first checks its own cache to see if it already knows the IP.</li>
                     <li><strong>Root Servers:</strong> If the resolver doesn't have the IP cached, it asks one of the 13 logical root server clusters in the world. The root server doesn't know the IP, but it knows where to find the nameservers for the top-level domain (TLD), like `.com` or `.org`. It directs the resolver to the TLD nameservers.</li>
                     <li><strong>TLD Nameservers:</strong> The resolver then asks the `.com` TLD nameserver, "Where can I find the DNS records for `example.com`?" The TLD nameserver responds with the "authoritative nameservers" for that specific domain (e.g., `ns1.example.com` and `ns2.example.com`).</li>
                     <li><strong>Authoritative Nameservers:</strong> Finally, the resolver asks the domain's authoritative nameserver (e.g., `ns1.example.com`), "What is the A record for `www.example.com`?" This server holds the actual DNS records and provides the definitive answer: the IP address.</li>
                     <li><strong>The Response:</strong> The resolver receives the IP address, saves it in its cache for a period (defined by the TTL), and sends it back to your browser. Your browser can now make a direct connection to the website's server.</li>
                  </ol>
                  <p>This entire hierarchical process is what makes DNS both resilient and scalable.</p>
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
                        <li><strong>Check Mail Delivery Issues:</strong> If emails are not being delivered to your domain, the first thing to check is your `MX` record. This tool can verify that it's pointing to the correct mail server.</li>
                        <li><strong>Verify Domain Ownership:</strong> Many services (like Google Search Console or Microsoft 365) ask you to verify you own a domain by adding a specific `TXT` record. You can use this tool to confirm the record has been published correctly.</li>
                        <li><strong>Troubleshoot Website Migration:</strong> After moving a website to a new server, you'll update your `A` record to point to the new IP. Use this tool to see if the change has propagated and if you're getting the new IP address.</li>
                        <li><strong>Find Nameservers:</strong> Use the `NS` record type to find the authoritative nameservers for a domain. This tells you which company is managing the domain's DNS (e.g., Cloudflare, GoDaddy DNS, AWS Route 53).</li>
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                     <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                </CardHeader>
                <CardContent>
                     <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                        <li><strong>CNAME on a Root Domain:</strong> You cannot place a `CNAME` record on a root domain (e.g., `example.com`) because it would conflict with the mandatory `SOA` and `NS` records that must also exist there. CNAMEs are for subdomains (`www.example.com`).</li>
                        <li><strong>Forgetting to Lower TTL Before Changes:</strong> Before making a critical DNS change (like changing your A record), it's best practice to lower the TTL on the existing record to a very short time (e.g., 5 minutes). This prevents resolvers from caching the old, incorrect IP for a long time.</li>
                        <li><strong>Incorrect MX Record Priority:</strong> MX records have a priority number. The lowest number is tried first. Setting the wrong priority can cause email to be routed to your backup server instead of your primary one.</li>
                        <li><strong>Pointing to a CNAME in an A record:</strong> An A record must always point to an IP address. You cannot have an A record that points to another domain name. For that, you use a CNAME.</li>
                    </ul>
                </CardContent>
            </Card>
        </div>

        <section>
            <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Troubleshooting a "Website Not Found" Error</h3>
                    <p className="text-sm text-muted-foreground">A user reports that your new website `newapp.example.com` isn't working. You use the DNS Lookup tool to check the `A` record for that subdomain. The tool returns 'ENOTFOUND'. This tells you the DNS record was never created, and you need to add it in your DNS provider's control panel.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Diagnosing Email Bounces</h3>
                    <p className="text-sm text-muted-foreground">Your company stops receiving emails. You perform an `MX` record lookup on your domain. The result shows that the MX records are pointing to an old, decommissioned mail server. You realize the records were never updated during a recent server migration, and you now know exactly what to fix.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Setting up Google Workspace / Microsoft 365</h3>
                    <p className="text-sm text-muted-foreground">To set up a new email service, the provider requires you to add several `MX` and `TXT` records to your domain to direct mail flow and prove ownership. After adding them at your domain registrar, you can use this tool to query the records and verify that they have been published correctly before finalizing your setup.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Security Investigation</h3>
                    <p className="text-sm text-muted-foreground">A security analyst is investigating a phishing email. They look up the `TXT` records for the sending domain and find it has no SPF or DMARC records. This lack of email authentication policies is a strong indicator that the domain is likely malicious or poorly configured, justifying blocking it.</p>
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
              <Link href="/tools/reverse-dns-lookup" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Reverse DNS Lookup<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Do the opposite: find the domain name associated with an IP address.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
              <Link href="/tools/ssl-checker" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">SSL Checker<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Once you have the IP, check the SSL certificate installed on that server.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
              <Link href="/tools/whois-lookup" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Whois Lookup<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Find the registration and ownership details for a domain name.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
          </div>
      </section>
      </div>
    </>
  );
}

    