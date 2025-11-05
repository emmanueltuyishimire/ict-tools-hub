
import { PageHeader } from '@/components/page-header';
import { IpLookupTool } from './ip-lookup-tool';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BookOpen, AlertTriangle, Wand, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const metadata = {
    title: 'IP Address Lookup | Geolocation & ISP Finder | ICT Toolbench',
    description: 'Find the geolocation, ISP, and other details for any IPv4 address. Our IP lookup tool provides instant results for network diagnostics and security research.',
    openGraph: {
        title: 'IP Address Lookup | ICT Toolbench',
        description: 'Instantly find the location, ISP, and network details for any IP address. An essential tool for network administrators and cybersecurity professionals.',
        url: '/tools/ip-lookup',
    }
};

export default function IpLookupPage() {
    const softwareAppSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "IP Address Lookup",
      "operatingSystem": "All",
      "applicationCategory": "DeveloperApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "A free online tool to look up geolocation, ISP, and other details for any IPv4 address.",
      "url": "https://www.icttoolbench.com/tools/ip-lookup"
    };

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqData.map(item => ({'@type': 'Question', name: item.question, acceptedAnswer: {'@type': 'Answer', text: item.answer.replace(/<[^>]*>?/gm, '')}}))
    };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
      <PageHeader
        title="IP Address Lookup"
        description="Instantly retrieve geolocation, ISP, and other network details for any IPv4 address. An essential tool for network diagnostics, security analysis, and troubleshooting."
      />
       <div className="max-w-4xl mx-auto space-y-12">
        <IpLookupTool />

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use the IP Lookup Tool</h2>
          <Card className="prose prose-sm max-w-none text-foreground p-6">
              <p>This tool queries a geolocation database to provide details about any public IP address.</p>
              <ol>
                  <li><strong>Enter an IP Address:</strong> Type the IPv4 address you want to investigate into the input field.</li>
                  <li><strong>Perform Lookup:</strong> Click the "Lookup IP" button. Our server will query for the IP's details.</li>
                  <li><strong>Analyze Results:</strong> The tool will display the results in a table, showing information like the country, city, ISP (Internet Service Provider), and ASN (Autonomous System Number).</li>
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
                  <CardTitle className="text-primary">Educational Deep Dive: Tracing a Digital Footprint</CardTitle>
              </div>
              <CardDescription>From ISPs to Autonomous Systems, understand how an IP address reveals the structure and ownership of network blocks on the internet.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
              <section>
                  <h3 className="font-bold text-xl">What is an IP Lookup?</h3>
                  <p>
                    An IP lookup, or IP geolocation, is the process of mapping an IP address to the real-world geographic location of a device connected to the internet. This is possible because IP address blocks are allocated by regional internet registries to Internet Service Providers (ISPs) and other organizations in specific countries and regions. By querying databases that track these allocations, a tool can determine the approximate location of an IP.
                  </p>
              </section>
              <section>
                  <h3 className="font-bold text-xl">Understanding the Results</h3>
                  <p>Our IP lookup tool provides several key pieces of information:</p>
                  <ul className="list-disc pl-5">
                     <li><strong>Location (City, Region, Country):</strong> This is an estimate of the IP's geographic location. For fixed-line broadband, it's often accurate down to the city level. For mobile networks, it can be much less precise.</li>
                     <li><strong>ISP (Internet Service Provider):</strong> This is the company that owns the IP address block and provides internet access to the user. Examples include Comcast, AT&T, or a cloud provider like Amazon Web Services.</li>
                     <li><strong>ASN (Autonomous System Number):</strong> An ASN is a globally unique number assigned to an Autonomous System (AS)—a large network or group of networks with a single routing policy. The ASN and its description tell you the name of the larger network entity that owns the IP block (e.g., AS15169 for Google LLC).</li>
                  </ul>
              </section>
          </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
          <Card>
              <CardHeader>
                  <div className='flex items-center gap-2'><Wand className="h-6 w-6 text-accent" /> <CardTitle>Pro Tips</CardTitle></div>
              </CardHeader>
              <CardContent>
                  <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                      <li><strong>Look Up Your Own IP:</strong> Your public IP address is displayed on our homepage. Looking it up here can tell you who your ISP is and how your location appears to the rest of the internet.</li>
                      <li><strong>Trace an Email:</strong> In the full headers of an email, you can find the IP address of the originating mail server. An IP lookup on that address can help verify if the email came from a legitimate source or a suspicious network.</li>
                      <li><strong>Check for VPNs/Proxies:</strong> The tool may indicate if an IP address is associated with a known VPN, proxy, or hosting provider. An IP resolving to a data center is less likely to be a typical home user.</li>
                  </ul>
              </CardContent>
          </Card>
          <Card>
              <CardHeader>
                   <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
              </CardHeader>
              <CardContent>
                   <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                      <li><strong>Assuming Pinpoint Accuracy:</strong> IP geolocation is not perfectly accurate. It can usually identify the country and city correctly, but it cannot pinpoint a specific street address.</li>
                      <li><strong>Ignoring Mobile Networks:</strong> Geolocation for mobile IPs is often very inaccurate, as the IP may be assigned from a central point hundreds of miles away from the user's actual location.</li>
                      <li><strong>Looking Up Private IPs:</strong> This tool only works for public IP addresses. Entering a private IP (like 192.168.1.100) will result in an error, as these addresses are not unique and cannot be geolocated. Use our <Link href="/tools/ip-privacy-checker" className="text-primary hover:underline">Public vs. Private IP Checker</Link> to verify.</li>
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
              <Link href="/tools/whois-lookup" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Whois Lookup<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Find the registration details for the domain name associated with an IP address.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
              <Link href="/tools/reverse-dns-lookup" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Reverse DNS Lookup<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Find the hostname (PTR record) assigned to the IP address.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
              <Link href="/tools/ip-privacy-checker" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Public vs. Private IP Checker<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">First, check if an IP is public and can be looked up, or if it's a private address.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
          </div>
      </section>
      </div>
    </>
  );
}
