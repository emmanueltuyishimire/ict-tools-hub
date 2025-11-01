
import { PageHeader } from '@/components/page-header';
import { WhoisLookupTool } from './whois-lookup-tool';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { Lightbulb, AlertTriangle, BookOpen, ChevronRight, Wand } from 'lucide-react';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';


export const metadata = {
    title: 'Whois Lookup Tool | Find Domain Ownership & Registration Data | ICT Toolbench',
    description: 'Perform a real-time Whois lookup for any domain to find its registrar, registration dates, expiration, and nameserver information. Essential for domain research and administration.',
    openGraph: {
        title: 'Whois Lookup Tool | Find Domain Ownership & Registration Data | ICT Toolbench',
        description: 'Instantly query the public Whois database to retrieve domain registration details.',
        url: '/tools/whois-lookup',
    }
};

const faqData = [
    { question: "What is a Whois lookup?", answer: "A Whois lookup is a query to a public, distributed database that stores registration information about internet resources, most notably domain names. It reveals details about who owns a domain, who the registrar is, when it was registered, when it expires, and which nameservers it uses." },
    { question: "Why is Whois data public?", answer: "Whois data has historically been public to promote a stable and transparent internet. It allows network administrators, security professionals, and law enforcement to find the contact person for a domain to resolve technical issues or investigate malicious activity. However, privacy concerns have led to changes in its accessibility." },
    { question: "What is Whois privacy and how does it work?", answer: "Whois privacy (or domain privacy) is a service offered by domain registrars that replaces the registrant's personal contact information (name, address, email) in the public Whois record with the information of a proxy service. This helps protect domain owners from spam and unwanted contact, though the registrar still maintains the true ownership data." },
    { question: "Can I find out who owns a domain with privacy protection enabled?", answer: "Generally, no. The purpose of Whois privacy is to anonymize the owner. While the registrar's proxy information is public, they will not reveal the owner's details unless compelled by a legal order or a valid dispute under ICANN policies." },
    { question: "What is the difference between a Registrant, Registrar, and Registry?", answer: "The **Registrant** is the person or company who owns the domain. The **Registrar** is the accredited company (e.g., GoDaddy, Namecheap) that the registrant uses to register and manage the domain. The **Registry** is the top-level organization that manages the top-level domain (TLD), such as Verisign for `.com` or Nominet for `.uk`." },
    { question: "What does 'Domain Status: clientTransferProhibited' mean?", answer: "This is a common and recommended security status. It means that the domain is locked at the registrar level to prevent unauthorized transfers to another registrar. You would need to unlock the domain through your registrar's control panel before you can initiate a transfer." },
    { question: "Is Whois data always accurate?", answer: "Under ICANN's policies, registrants are required to provide accurate contact information. However, the data is not always up-to-date or correct. Malicious actors often use fake information. The 'Updated Date' in a Whois record can give a clue as to how recently the information was confirmed." },
    { question: "How can I use this tool for security investigations?", answer: "Security analysts use Whois to investigate phishing or malware-hosting domains. By looking at the creation date, registrar, and nameservers, they can identify newly registered malicious domains, find other domains registered by the same entity, and report abuse to the registrar." },
    { question: "Why does the tool sometimes show a 'referral' or need to query another server?", answer: "The Whois system is distributed. A query to a central server (like `whois.iana.org`) will often provide a referral to the specific Whois server for that TLD's registry (e.g., `whois.verisign-grs.com` for `.com`). This tool automatically follows these referrals to get the most detailed record." },
    { question: "Can I use this for ccTLDs (country-code domains)?", answer: "Yes, for many ccTLDs. However, some country-code TLDs have their own unique Whois policies, formats, and servers, which can sometimes result in limited or differently formatted data compared to generic TLDs like `.com` or `.net`." }
];

const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Perform a Whois Lookup',
    description: 'A step-by-step guide to finding the registration data for a domain name.',
    step: [
        { '@type': 'HowToStep', name: 'Enter Domain Name', text: 'In the input field, type the domain name you want to query (e.g., github.com).' },
        { '@type': 'HowToStep', name: 'Perform Lookup', text: 'Click the "Lookup Domain" button. Our server will query the appropriate Whois servers for the domain\'s public record.' },
        { '@type': 'HowToStep', name: 'Analyze the Raw Data', text: 'The tool will display the full, raw text response from the Whois server. This contains all the publicly available details about the domain, such as registrar, status, and important dates.' },
    ],
    totalTime: 'PT1M'
};

const keyTerminologies = [
    { term: 'Whois', definition: 'A public query protocol used to access the registration database of internet resources, like domain names.' },
    { term: 'Registrar', definition: 'An ICANN-accredited company that sells and manages domain name registrations (e.g., GoDaddy, Namecheap).' },
    { term: 'Registrant', definition: 'The individual or organization that owns a domain name.' },
    { term: 'Registry', definition: 'The organization that manages a top-level domain (TLD), such as Verisign for `.com`.' },
    { term: 'ICANN', definition: 'The Internet Corporation for Assigned Names and Numbers, a non-profit that coordinates the internet\'s naming systems.' },
    { term: 'Domain Privacy', definition: 'A service that hides a registrant\'s personal contact information from the public Whois record.' },
];

export default function WhoisLookupPage() {
  return (
    <>
      <StructuredData data={faqData} />
      <StructuredData data={howToSchema} />
      <PageHeader
        title="Whois Lookup Tool"
        description="Query the public Whois database to find the registration details of any domain name, including registrar, creation date, and expiration information."
      />
      
      <div className="max-w-4xl mx-auto space-y-12">
        <WhoisLookupTool />

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use This Tool</h2>
          <Card className="prose prose-sm max-w-none text-foreground p-6">
              <p>
                Our Whois Lookup tool allows you to query the public database that stores information about domain name registrations.
              </p>
              <ol>
                  <li>
                    <strong>Enter Domain:</strong> Type the domain name you wish to investigate (e.g., <strong>google.com</strong>) into the input field.
                  </li>
                  <li>
                    <strong>Perform Lookup:</strong> Click the "Lookup Domain" button. Our server will then query the appropriate Whois registry for that domain.
                  </li>
                  <li>
                    <strong>Review Results:</strong> The raw text output from the Whois server will be displayed in the results box. This includes details like the registrar, domain status, creation and expiration dates, and nameservers.
                  </li>
              </ol>
               <Alert>
                  <Lightbulb className="h-4 w-4" />
                  <AlertTitle>Example</AlertTitle>
                  <AlertDescription>
                    Try looking up a well-known domain like <strong>github.com</strong> to see its registrar (MarkMonitor Inc.), status, and registration dates. Then, try a domain with privacy protection to see how the data differs.
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
                  <CardTitle className="text-primary">Educational Deep Dive: The Internet's Public Ledger</CardTitle>
              </div>
              <CardDescription>From domain squatters to cybersecurity, understand the critical role the Whois database plays in the internet ecosystem.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
              <section>
                  <h3 className="font-bold text-xl">What is the Whois System?</h3>
                  <p>
                    The Whois system is one of the oldest protocols on the internet. It functions as a massive, public, and distributed database containing the registration details for domain names and IP address blocks. When someone registers a domain, ICANN (the organization that governs domain names) requires that their contact information, the registrar they used, and key dates be made publicly available. This tool allows you to query that public database for any domain.
                  </p>
              </section>
              <section>
                  <h3 className="font-bold text-xl">The Purpose of Public Whois Data</h3>
                  <p>The original intent behind making this data public was to create a transparent and accountable internet. It allows:</p>
                  <ul className="list-disc pl-5">
                     <li><strong>Network Administrators</strong> to contact the owners of a domain to resolve technical issues like email routing problems.</li>
                     <li><strong>Security Researchers and Law Enforcement</strong> to identify the owners of malicious websites used for phishing, malware distribution, or other cybercrimes.</li>
                     <li><strong>Trademark Holders</strong> to identify and combat cybersquatting and trademark infringement.</li>
                     <li><strong>Journalists and Individuals</strong> to investigate the ownership and background of an online entity.</li>
                  </ul>
                  <p>
                    However, the public nature of this data has also led to its abuse for spam and targeted marketing. This gave rise to domain privacy services and new regulations like the GDPR, which have significantly changed how much personal information is displayed. You can use our <Link href="/tools/domain-expiry-countdown" className="text-primary hover:underline">Domain Expiration Countdown</Link> tool for a more focused look at one of the key pieces of Whois data.
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
                      <li><strong>Check Domain Availability:</strong> If a Whois lookup returns "No match for domain" or a similar message, it often means the domain is available for registration.</li>
                      <li><strong>Identify the Registrar:</strong> If you've forgotten which company you registered a domain with, a Whois lookup will show you the current registrar, helping you know where to go to manage or renew it.</li>
                      <li><strong>Find Nameservers:</strong> The "Name Server" entries in a Whois record tell you which DNS servers are authoritative for the domain. This is useful for diagnosing DNS issues. You can then use our <Link href="/tools/dns-lookup" className="text-primary hover:underline">DNS Lookup</Link> tool to query those servers directly.</li>
                      <li><strong>Look for Red Flags:</strong> When investigating a suspicious domain, look for a very recent `Creation Date` and a registrar known for being lenient. This combination can be an indicator of a domain registered for short-term malicious activity.</li>
                  </ul>
              </CardContent>
          </Card>
          <Card>
              <CardHeader>
                   <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
              </CardHeader>
              <CardContent>
                   <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                      <li><strong>Relying on Outdated Data:</strong> Whois data can sometimes be cached. A real-time lookup tool like this one is better than relying on potentially old data from other sources.</li>
                      <li><strong>Assuming Public Data is the Owner:</strong> With domain privacy, the listed registrant is a proxy service, not the actual owner. Don't mistake the privacy service for the real person behind the domain.</li>
                      <li><strong>Misinterpreting Domain Status:</strong> Codes like `clientTransferProhibited` are normal security measures, not an indication of a problem. Codes like `redemptionPeriod` or `pendingDelete`, however, are urgent and mean the domain is at risk of being lost.</li>
                      <li><strong>Ignoring ccTLD Differences:</strong> Country-code domains (like .de, .cn, .uk) often have different Whois servers and may provide different levels of detail than generic TLDs like .com.</li>
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
              <Link href="/tools/domain-expiry-countdown" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Domain Expiration Countdown<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Focus specifically on the expiration date with a live countdown.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
              <Link href="/tools/dns-lookup" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">DNS Lookup Tool<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Check the DNS records pointed to by the nameservers found in the Whois record.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
              <Link href="/tools/ssl-checker" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">SSL Checker<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">After finding the domain, check its SSL certificate for validity and security.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
          </div>
      </section>
      </div>
    </>
  );
}

    