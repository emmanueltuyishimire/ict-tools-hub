
import { PageHeader } from '@/components/page-header';
import { SslExpiryChecker } from './ssl-expiry-checker';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Lightbulb, AlertTriangle, BookOpen, ChevronRight, Wand } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from '../ssl-checker/schema';


export const metadata = {
    title: 'SSL Certificate Expiration Checker | ICT Toolbench',
    description: 'Check the expiration date and validity of any SSL/TLS certificate in real-time. Verify issuer details, days remaining, and learn why SSL is critical for web security.',
};

export default function SslExpiryCheckerPage() {
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
      <div className="max-w-4xl mx-auto space-y-12">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
        <PageHeader
            title="SSL Certificate Expiration Checker"
            description="Enter a domain name to check the validity and expiration date of its SSL/TLS certificate, ensuring your connection is secure and trusted."
        />
        <SslExpiryChecker />
        <section>
            <h2 className="text-2xl font-bold mb-4">How to Use the SSL Checker</h2>
            <Card className="prose prose-sm max-w-none text-foreground p-6">
                <p>This tool lets you instantly inspect the public SSL/TLS certificate of any website, providing critical information for security and maintenance.</p>
                <ol>
                    <li><strong>Enter a Domain Name:</strong> In the input box, type the domain you want to check (e.g., `google.com`). You don't need `https://` or `www`. To check a service on a non-standard port, append it with a colon, like `my-service.com:8443`.</li>
                    <li><strong>Check Certificate:</strong> Click the "Check Certificate" button. Our server will then initiate a secure handshake with the domain's server to fetch its public certificate data.</li>
                    <li><strong>Review the Summary:</strong> The most important information is displayed at the top in summary cards: the number of days until expiration, the Certificate Authority (CA) that issued it, and its current validity status.</li>
                    <li><strong>Analyze the Details:</strong> For a deeper dive, the table below provides more granular data, including the common name, subject alternative names (SANS), the certificate's serial number, and the full "valid from" and "valid to" timestamps.</li>
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
                    <CardTitle className="text-primary">Educational Deep Dive: The Chain of Trust</CardTitle>
                </div>
                <CardDescription>From encryption to identity verification, understand the technology that underpins the secure web and keeps your data safe.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                <section>
                    <h3 className="font-bold text-xl">What is an SSL/TLS Certificate?</h3>
                    <p>At its core, an SSL/TLS certificate is a small data file hosted on a web server that enables two fundamental security features: <strong>encryption</strong> and <strong>authentication</strong>. When you visit a website with a valid SSL certificate (indicated by `https://` in the URL), your browser and the server perform a "TLS handshake." This process establishes an encrypted channel, scrambling all data passed between them. This prevents eavesdroppers or "man-in-the-middle" attackers from reading your sensitive information, such as passwords, credit card numbers, or personal messages.</p>
                    <p>Just as importantly, the certificate also serves as a digital passport for the website. It proves that the domain you are visiting is owned and operated by a legitimate entity, not an imposter. This authentication is based on a concept called the "chain of trust."</p>
                </section>
                <section>
                    <h3 className="font-bold text-xl">The Chain of Trust: From Root to Leaf</h3>
                    <p>Your browser doesn't inherently trust every website's SSL certificate. Instead, it trusts a small, curated list of highly secure organizations known as <strong>Certificate Authorities (CAs)</strong>. These include well-known names like DigiCert, Let's Encrypt, and GlobalSign. The public certificates of these CAs, called <strong>Root Certificates</strong>, are pre-installed in your browser and operating system.</p>
                    <p>The chain of trust works as follows:</p>
                    <ol className="list-decimal pl-5 space-y-2">
                       <li>A Root CA issues an <strong>Intermediate Certificate</strong> to another organization, effectively delegating its trust.</li>
                       <li>This Intermediate CA then issues an <strong>End-Entity Certificate</strong> (or "leaf" certificate) to a website owner (e.g., `google.com`) after verifying their identity.</li>
                       <li>When you visit `google.com`, the server presents its End-Entity certificate along with the Intermediate certificate. Your browser checks if the End-Entity certificate was signed by the Intermediate. It then checks if the Intermediate certificate was signed by a Root CA that it already trusts.</li>
                       <li>If this chain is complete and unbroken all the way back to a trusted root, the browser accepts the certificate as valid and displays the padlock icon. If any link in the chain is broken, expired, or untrusted, you will see a security warning.</li>
                    </ol>
                </section>
                 <section>
                    <h3 className="font-bold text-xl">Why Do Certificates Expire?</h3>
                    <p>Certificate expiration is a crucial security feature, not an inconvenience. It ensures that authentication information is periodically re-validated. If certificates lasted forever, a compromised or outdated certificate could be misused indefinitely. The industry standard for certificate lifespan has been steadily decreasing to improve security. What was once five years became three, then two, and now the maximum validity period for public SSL certificates is just over one year (398 days).</p>
                    <p>This regular renewal process ensures that:</p>
                     <ul className="list-disc pl-5">
                        <li>The domain ownership is re-verified, preventing old certificates from being used after a domain changes hands.</li>
                        <li>Encryption standards are kept up-to-date, encouraging the adoption of stronger cryptographic algorithms.</li>
                        <li>Revocation lists don't grow to unmanageable sizes.</li>
                    </ul>
                     <p>An expired certificate breaks the chain of trust and triggers browser warnings, making proactive monitoring and renewal essential for any website owner. Using a tool like this one to check your expiration dates is a key step in responsible website management.</p>
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
                        <li><strong>Automate Renewals:</strong> Use services like Let's Encrypt with Certbot to automate the renewal process. This is the most effective way to prevent expiration-related outages.</li>
                        <li><strong>Check SANs:</strong> The Subject Alternative Name (SAN) field is crucial. It lists all the hostnames a single certificate is valid for (e.g., `example.com`, `www.example.com`, `api.example.com`). Always check that all your required subdomains are listed.</li>
                        <li><strong>Set Calendar Reminders:</strong> For manually renewed certificates, set multiple calendar reminders starting 60-90 days before expiration to give yourself ample time to purchase and deploy the new certificate.</li>
                        <li><strong>Command-Line Check:</strong> For a quick check from your terminal, you can use OpenSSL: `openssl s_client -connect example.com:443 -servername example.com | openssl x509 -noout -dates`.</li>
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                     <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes</CardTitle></div>
                </CardHeader>
                <CardContent>
                     <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                        <li><strong>Ignoring Renewal Emails:</strong> Certificate Authorities send multiple warning emails before a certificate expires. Make sure these emails go to a distribution list or an actively monitored inbox, not just one person who might be on vacation.</li>
                        <li><strong>Forgetting Intermediate Certificates:</strong> When installing a new certificate, you must also install the Intermediate CA certificate provided by your vendor. Forgetting this step will cause a "broken chain" error in some browsers.</li>
                         <li><strong>Mismatching Common Name:</strong> A certificate is only valid for the domains listed in its Common Name (CN) or Subject Alternative Names (SAN). If you visit `www.example.com` but the certificate is only for `example.com`, you will get a security warning.</li>
                        <li><strong>Mixed Content Errors:</strong> Even with a valid SSL certificate, if your page loads resources like images or scripts over insecure HTTP, browsers will flag it as a "mixed content" warning, which diminishes user trust.</li>
                    </ul>
                </CardContent>
            </Card>
        </div>

        <section>
            <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">E-commerce Store Outage</h3>
                    <p className="text-sm text-muted-foreground">An online store suddenly sees its sales drop to zero. Panicked customers report seeing a "Your connection is not private" error. The store owner uses this tool, enters their domain, and discovers their SSL certificate expired yesterday. They immediately contact their hosting provider to renew it, restoring trust and bringing the store back online.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">API Integration Debugging</h3>
                    <p className="text-sm text-muted-foreground">A developer's application is failing to connect to a third-party API, receiving a "certificate validation failed" error. They use the SSL checker on the API's endpoint and find that the certificate was issued by a new, untrusted Certificate Authority. This tells them they need to update the trust store on their application server to include the new CA's root certificate.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Routine Security Audit</h3>
                    <p className="text-sm text-muted-foreground">As part of a quarterly security audit, a system administrator uses this tool to check the certificates on all of the company's public-facing websites. They discover that one marketing microsite has a certificate with only 15 days remaining. This allows them to proactively renew the certificate long before it becomes an emergency.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Verifying a New Site's Security</h3>
                    <p className="text-sm text-muted-foreground">Before entering payment information on an unfamiliar e-commerce site, a savvy user decides to check its legitimacy. They use this tool to see who issued the certificate. Seeing it was issued by a well-known authority like DigiCert to the correct company name gives them the confidence to proceed with their purchase.</p>
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
                <Link href="/tools/http-header-checker" className="block">
                    <Card className="hover:border-primary transition-colors h-full">
                        <CardHeader>
                            <CardTitle className="text-base flex items-center justify-between">HTTP Header Checker<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                            <CardDescription className="text-xs">Check for security headers like HSTS, which works with SSL.</CardDescription>
                        </CardHeader>
                    </Card>
                </Link>
                <Link href="/tools/dns-lookup" className="block">
                    <Card className="hover:border-primary transition-colors h-full">
                        <CardHeader>
                            <CardTitle className="text-base flex items-center justify-between">DNS Lookup Tool<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                            <CardDescription className="text-xs">Verify that your domain is pointing to the correct server IP before checking its SSL.</CardDescription>
                        </CardHeader>
                    </Card>
                </Link>
                <Link href="/tools/password-strength-checker" className="block">
                    <Card className="hover:border-primary transition-colors h-full">
                        <CardHeader>
                            <CardTitle className="text-base flex items-center justify-between">Password Strength Checker<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                            <CardDescription className="text-xs">While SSL protects data in transit, a strong password protects it at rest.</CardDescription>
                        </CardHeader>
                    </Card>
                </Link>
            </div>
        </section>
      </div>
    </>
  );
}
