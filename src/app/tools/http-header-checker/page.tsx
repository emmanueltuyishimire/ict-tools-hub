
import React from 'react';
import { PageHeader } from '@/components/page-header';
import { HttpHeaderChecker } from './http-header-checker';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { Lightbulb, AlertTriangle, BookOpen, ChevronRight, Wand } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';

export const metadata = {
    title: 'Live HTTP Header Checker | Check & Analyze Response Headers | ICT Toolbench',
    description: 'Instantly inspect the HTTP response headers of any URL in real-time. Analyze status codes, cache-control, redirects, and security headers (CSP, HSTS) with our free tool. Essential for developers, SEOs, and sysadmins.',
    openGraph: {
        title: 'Live HTTP Header Checker | ICT Toolbench',
        description: 'Analyze response headers to debug caching, redirects, and security policies. A real-time tool for developers and SEO professionals.',
        url: '/tools/http-header-checker',
    }
};

export default function HttpHeaderCheckerPage() {
    const softwareAppSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "HTTP Header Checker",
      "operatingSystem": "All",
      "applicationCategory": "DeveloperApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "A free online tool to fetch and inspect the live HTTP response headers and status code for any URL.",
      "url": "https://www.icttoolbench.com/tools/http-header-checker"
    };

    return (
        <>
            <StructuredData data={faqData.map(item => ({'@type': 'Question', name: item.question, acceptedAnswer: {'@type': 'Answer', text: item.answer.replace(/<[^>]*>?/gm, '')}}))} />
            <StructuredData data={howToSchema} />
            <StructuredData data={softwareAppSchema} />
            <div className="max-w-4xl mx-auto space-y-12">
                <PageHeader
                    title="Live HTTP Header Checker"
                    description="Enter any URL to inspect the raw HTTP response headers returned by the server. This tool is essential for debugging caching policies, redirects, security headers, and server configurations."
                />
                
                <HttpHeaderChecker />

                <section>
                    <h2 className="text-2xl font-bold mb-4">How to Use the Header Checker</h2>
                    <Card className="prose prose-sm max-w-none text-foreground p-6">
                        <p>This tool allows you to see the "under-the-hood" metadata that a server sends back to your browser before it even shows a webpage.</p>
                        <ol>
                            <li><strong>Enter a URL:</strong> Type the full URL of the page you want to inspect (e.g., `https://google.com`).</li>
                            <li><strong>Check Headers:</strong> Click the "Check Headers" button. Our server will make a request to that URL.</li>
                            <li><strong>Analyze the Results:</strong> The tool will display the HTTP status code (e.g., `200 OK`, `301 Moved Permanently`) and a complete table of all the response headers sent by the server, such as `Content-Type`, `Cache-Control`, and `Content-Security-Policy`.</li>
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
                            <CardTitle className="text-primary">Educational Deep Dive: The Language of Web Servers</CardTitle>
                        </div>
                        <CardDescription>From status codes to caching directives, understand how HTTP headers govern the communication between your browser and a web server.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                        <section>
                            <h3>What Are HTTP Headers?</h3>
                            <p>
                                When your browser requests a webpage, it's not just the HTML content that gets sent back. Before that content arrives, the server sends a set of 'headers' which contain critical metadata about the response. These headers are key-value pairs (e.g., `Content-Type: text/html`) that give the browser instructions on how to handle the content. They are the invisible language of the web, controlling everything from caching to security.
                            </p>
                        </section>
                        <section>
                            <h3>Common and Important Headers</h3>
                             <p>While there are dozens of possible headers, some are fundamental to how the web works:</p>
                             <ul className="list-disc pl-5">
                                <li><strong>Status Code:</strong> Not technically a header, but the first line of the response. It tells the client the result of the request (e.g., `200 OK` - Success, `404 Not Found` - Error, `301 Moved Permanently` - Redirect).</li>
                                <li><strong>Content-Type:</strong> Tells the browser what kind of content it's receiving (e.g., `text/html`, `image/jpeg`, `application/json`).</li>
                                <li><strong>Cache-Control:</strong> Gives caching instructions. A header like `Cache-Control: max-age=3600` tells the browser it can reuse this response from its local cache for the next hour without re-downloading it. Explore this with our <Link href="/tools/cache-expiry-calculator" className='text-primary hover:underline'>Cache Expiration Calculator</Link>.</li>
                                <li><strong>Location:</strong> Used with a `301` or `302` status code to tell the browser the new URL it should redirect to.</li>
                                <li><strong>Set-Cookie:</strong> Instructs the browser to set a cookie for the domain.</li>
                                <li><strong>Content-Security-Policy (CSP):</strong> A powerful security header that tells the browser which sources of content (scripts, images, etc.) are allowed to be loaded on the page, helping to prevent Cross-Site Scripting (XSS) attacks.</li>
                                <li><strong>Strict-Transport-Security (HSTS):</strong> A security header that tells browsers they should only ever communicate with the site using HTTPS, never insecure HTTP.</li>
                            </ul>
                        </section>
                    </CardContent>
                </Card>

                <section>
                    <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Debugging Caching Issues</h3>
                            <p className="text-sm text-muted-foreground">A developer pushes an update to a CSS file, but users are still seeing the old styles. They use this tool to check the headers for the CSS file and find a `Cache-Control: max-age=31536000` header (one year). This tells them a CDN or browser is aggressively caching the old file, and they need to implement a "cache-busting" strategy (like renaming the file) to force users to download the new version.</p>
                        </div>
                         <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Analyzing a Redirect Chain</h3>
                            <p className="text-sm text-muted-foreground">An SEO specialist is analyzing why a page is performing poorly. They enter the URL into the header checker and see it returns a `301` status code with a `Location` header pointing to a second URL. They then check that second URL and find it redirects to a third. This "redirect chain" adds unnecessary latency, and the specialist now knows to fix the server configuration to point the original URL directly to the final destination.</p>
                        </div>
                         <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Verifying Security Header Implementation</h3>
                            <p className="text-sm text-muted-foreground">After deploying a new Content Security Policy (CSP), a security engineer uses this tool to check the live site. They inspect the `content-security-policy` header in the response to ensure it contains the correct directives and that there are no syntax errors, confirming their security enhancement is active.</p>
                        </div>
                         <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Troubleshooting API Calls</h3>
                            <p className="text-sm text-muted-foreground">A developer's frontend application is failing to get data from an API, citing a CORS error. The developer uses this tool to check the API endpoint's headers and sees that the `Access-Control-Allow-Origin` header is missing. This instantly identifies the server-side misconfiguration that needs to be fixed.</p>
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
                                <li><strong>Check Your CDN Headers:</strong> Pay close attention to headers starting with `X-`, like `X-Cache` or `X-Cache-Status`. These are often added by CDNs like Cloudflare or Fastly and tell you if the response was a `HIT` (served from cache) or `MISS` (fetched from your origin server).</li>
                                <li><strong>Use `curl` for Command-Line Checks:</strong> For quick checks from your terminal, use `curl -I https://example.com`. The `-I` flag tells curl to fetch only the headers.</li>
                                <li><strong>Inspect Browser DevTools:</strong> Your browser's Developer Tools (F12) has a "Network" tab that shows the full request and response headers for every resource loaded on a page, providing a comprehensive view.</li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                             <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes</CardTitle></div>
                        </CardHeader>
                        <CardContent>
                             <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                                <li><strong>Aggressive Caching on Dynamic Content:</strong> Setting a long `max-age` on an HTML page that contains user-specific information can result in one user seeing another user's content if it's cached by a shared proxy.</li>
                                <li><strong>Missing Security Headers:</strong> Forgetting to implement headers like `Strict-Transport-Security`, `Content-Security-Policy`, and `X-Frame-Options` leaves a site vulnerable to common attacks.</li>
                                <li><strong>Incorrect Redirect Codes:</strong> Using a `302` (Temporary) redirect for a permanent URL change. This can confuse search engines and harm SEO. Use `301` (Permanent) for permanent moves.</li>
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
                                        <div dangerouslySetInnerHTML={{ __html: item.answer.replace(/<a href='([^']*)' class='[^']*'>/g, "<a href='$1' class='text-primary hover:underline'>") }} />
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
                      <Link href="/tools/response-time-calculator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Response Time Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Measure your server's Time to First Byte (TTFB), a key performance metric related to headers.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                      <Link href="/tools/ssl-checker" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">SSL Checker<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Inspect the SSL certificate that enables the secure connection for these headers.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                      <Link href="/tools/dns-lookup" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">DNS Lookup Tool<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Check the DNS records for a domain before you inspect its HTTP headers.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                  </div>
              </section>
            </div>
        </>
    );
}
