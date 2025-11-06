

import { PageHeader } from '@/components/page-header';
import { DomainExpiryCountdown } from './domain-expiry-countdown';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Lightbulb, AlertTriangle, BookOpen, ChevronRight, Wand } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';


export const metadata = {
    title: 'Domain Expiration Countdown & WHOIS Checker | ICT Toolbench',
    description: 'Check your domain\'s expiration date and see a live countdown. Our tool performs a WHOIS lookup to find the registrar, creation date, and expiry to help you avoid losing your domain.',
    openGraph: {
        title: 'Domain Expiration Countdown & WHOIS Checker | ICT Toolbench',
        description: 'Never let a domain expire unexpectedly again. Check registration details and see a live countdown.',
        url: '/tools/domain-expiry-countdown',
    }
};

const DomainExpiryCountdownPage = () => {
    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqData.map(item => ({'@type': 'Question', name: item.question, acceptedAnswer: {'@type': 'Answer', text: item.answer.replace(/<[^>]*>?/gm, '')}}))
    };

    const softwareAppSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Domain Expiration Countdown & WHOIS Checker",
        "operatingSystem": "All",
        "applicationCategory": "SecurityApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "description": "A free online tool to check the expiration date of a domain name via a WHOIS lookup and provide a live countdown.",
        "url": "https://www.icttoolbench.com/tools/domain-expiry-countdown"
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
      <PageHeader
        title="Domain Expiration Countdown"
        description="Never let your domain expire by accident. This tool performs a live WHOIS lookup to find your domain's expiration date and provides a real-time countdown."
      />
      
      <div className="max-w-4xl mx-auto space-y-12">
        <DomainExpiryCountdown />

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use This Tool</h2>
          <Card className="prose prose-sm max-w-none text-foreground p-6">
              <p>This tool helps you keep track of your domain's lifecycle by fetching its public registration data.</p>
              <ol>
                  <li><strong>Enter Your Domain:</strong> Type the domain name you want to check (e.g., `example.com`) into the input field.</li>
                  <li><strong>Start the Check:</strong> Click the "Check Expiry" button. Our server will perform a WHOIS lookup to find the domain's registration information.</li>
                  <li><strong>View the Countdown:</strong> The results will show a live countdown timer, displaying the exact time remaining until the domain expires.</li>
                  <li><strong>Review WHOIS Details:</strong> Below the countdown, you'll see other key information pulled from the WHOIS record, such as the company that registered the domain (Registrar) and the date it was created.</li>
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
                  <CardTitle className="text-primary">Educational Deep Dive: The Domain Name Lifecycle</CardTitle>
              </div>
              <CardDescription>From registration to expiration and beyond, understand the journey of a domain name and why managing it is critical.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
              <section>
                  <h3 className="font-bold text-xl">What is the WHOIS System?</h3>
                  <p>
                    The WHOIS system is one of the oldest protocols on the internet. It functions as a massive, public, and distributed database containing the registration details for domain names and IP address blocks. When someone registers a domain, ICANN (the organization that governs domain names) requires that their contact information, the registrar they used, and key dates be made publicly available. This tool allows you to query that public database for any domain.
                  </p>
                  <p>
                    While privacy concerns have led to the rise of WHOIS privacy services that redact personal information, key administrative data like the expiration date usually remains public, as it's essential for the transparent operation of the domain name system.
                  </p>
              </section>
              <section>
                  <h3 className="font-bold text-xl">The Lifecycle of a Domain Name</h3>
                  <p>A domain name goes through a predictable lifecycle, and understanding it is key to never losing control of your digital identity.</p>
                  <ol className="list-decimal pl-5 space-y-2">
                     <li><strong>Available:</strong> The domain is unregistered and can be purchased by anyone.</li>
                     <li><strong>Active:</strong> The domain has been registered and is owned by an individual or organization. It can be held for a period of 1 to 10 years. This is the stage where the website and email services are active.</li>
                     <li><strong>Expired & Grace Period:</strong> Once the expiration date passes, the domain enters a 'grace period'. During this time (typically 0-45 days, depending on the registrar), the website and email will stop working, but the original owner can still renew the domain at the standard price.</li>
                     <li><strong>Redemption Period:</strong> If not renewed during the grace period, the domain enters a 'redemption period' (around 30 days). The original owner can still recover the domain, but the registrar will charge a significant penalty fee (often $100-$200 or more) on top of the renewal fee.</li>
                     <li><strong>Pending Deletion:</strong> After the redemption period, the domain is held for a short time (about 5 days) and cannot be renewed. At the end of this phase, it is dropped from the registry.</li>
                     <li><strong>Available Again:</strong> The domain is released back into the public pool, where it can be registered by anyone on a first-come, first-served basis. This is where domain squatters often acquire valuable expired domains.</li>
                  </ol>
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
                        <li><strong>Enable Auto-Renew:</strong> The single best way to prevent accidental expiration. Log in to your domain registrar and ensure auto-renew is enabled for all your critical domains.</li>
                        <li><strong>Set Multiple Calendar Reminders:</strong> For domains you manage manually, set calendar alerts for 90, 60, and 30 days before expiration. This gives you plenty of time to handle any billing or administrative issues.</li>
                        <li><strong>Lock Your Domain:</strong> In your registrar's control panel, ensure your domain is "locked." This prevents unauthorized transfers or changes to your domain's settings.</li>
                        <li><strong>Check Competitor Domains:</strong> This tool can be used for competitive intelligence. Check the expiration dates of competitor domains to see who their registrar is and how long they've held the domain.</li>
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                     <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                </CardHeader>
                <CardContent>
                     <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                        <li><strong>Using an Old Email Address:</strong> Ensure the contact email on your WHOIS record is one you check regularly. All expiration notices will go to this address.</li>
                        <li><strong>Expired Credit Card:</strong> A common reason auto-renewals fail is an expired credit card on file with the registrar. Update your payment methods regularly.</li>
                        <li><strong>Ignoring Non-`.com` Domains:</strong> Businesses often have multiple TLDs (.net, .org, .co). Don't forget to monitor all of them, not just the primary `.com` domain.</li>
                        <li><strong>Assuming Your Web Host is Your Registrar:</strong> Your website hosting company and your domain registrar can be two different companies. Know who you pay for your domain name versus who you pay for your hosting server.</li>
                    </ul>
                </CardContent>
            </Card>
        </section>

        <section>
            <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Preventing a Business Outage</h3>
                    <p className="text-sm text-muted-foreground">A small business owner uses the tool to check their company's domain and discovers it expires in 25 days. They realize their credit card on file with the registrar had expired, causing auto-renewal to fail. They update their payment info immediately, preventing a costly outage of their website and email services.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Domain Investing (Domaining)</h3>
                    <p className="text-sm text-muted-foreground">A domain investor is interested in acquiring a high-value domain name. They use the countdown tool to monitor its expiration date. By knowing exactly when it expires, they can prepare to 'backorder' the domain, placing a reservation to try and register it the moment it becomes available to the public if the current owner fails to renew it.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Client Management for a Web Agency</h3>
                    <p className="text-sm text-muted-foreground">A web design agency uses this tool as part of their client onboarding process. They check all of a new client's domains to identify expiration dates and registrars. This allows them to provide proactive advice, help the client consolidate their domains, and ensure no critical assets expire during a website redesign project.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Cybersecurity Investigation</h3>
                    <p className="text-sm text-muted-foreground">A cybersecurity analyst receives a phishing email from a suspicious domain. They use this tool to perform a WHOIS lookup. They find the domain was just registered two days ago from a registrar known for lax policies. This information, combined with other factors, strongly indicates the domain is malicious and can be added to a blocklist.</p>
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
      </div>
    </>
  );
}
