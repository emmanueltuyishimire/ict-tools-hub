
'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { StructuredData } from '@/components/structured-data';
import { Lightbulb, AlertTriangle, BookOpen, ChevronRight, Wand, Search, Copy, Check } from 'lucide-react';
import Link from 'next/link';
import { checkHeaders } from './actions';
import { Skeleton } from '@/components/ui/skeleton';
import { useState, useRef, useEffect } from 'react';


const faqData = [
    { question: "What are HTTP headers?", answer: "HTTP headers are key-value pairs that are sent between a client (like your web browser) and a server with every HTTP request and response. They carry essential metadata about the request, the response, and the content being transferred, such as the content type, caching policies, and authentication tokens." },
    { question: "What is the difference between a request header and a response header?", answer: "Request headers are sent by the client to the server. They contain information about the client, what resource it's requesting, and what kind of content it can accept (e.g., User-Agent, Accept-Language). Response headers are sent by the server back to the client. They provide information about the server's response, such as the status of the request (e.g., 200 OK), the content type of the response body, and caching instructions." },
    { question: "Why would I need to check HTTP headers?", answer: "Developers check headers for debugging API responses and webhooks. SEO specialists check headers to ensure correct redirect chains (301 vs. 302), canonical tags, and caching policies. Security professionals check headers to verify security policies like Content-Security-Policy (CSP) and HSTS are correctly implemented." },
    { question: "What is a `User-Agent` header?", answer: "The `User-Agent` request header is a string that identifies the client software making the request. It typically includes the browser name, version, and operating system. Servers can use this information to serve different content to different browsers or devices, though this practice is less common now." },
    { question: "What is the `Content-Type` header?", answer: "The `Content-Type` response header is crucial. It tells the client what kind of data is in the response body, such as `text/html`, `application/json`, `image/jpeg`, or `application/pdf`. The browser uses this to determine how to render or handle the content." },
    { question: "How do caching headers like `Cache-Control` work?", answer: "Caching headers instruct the browser or intermediary caches (like CDNs) on how to store a copy of the response. A `Cache-Control: max-age=3600` header tells the browser it can use its local copy for 3600 seconds (1 hour) without re-requesting it from the server. This dramatically improves performance and reduces server load." },
    { question: "What is the difference between a 301 and a 302 redirect?", answer: "A `301 Moved Permanently` redirect tells browsers and search engines that a page has moved to a new URL forever. Search engines will transfer the old page's ranking authority to the new one. A `302 Found` (or `307 Temporary Redirect`) indicates that the move is temporary, and search engines should not update their index to the new URL." },
    { question: "What are some important security headers?", answer: "Important security headers include: `Content-Security-Policy` (CSP) to prevent XSS attacks, `Strict-Transport-Security` (HSTS) to enforce HTTPS, `X-Frame-Options` to prevent clickjacking, and `X-Content-Type-Options` to prevent MIME-sniffing attacks." },
    { question: "What are CORS headers?", answer: "Cross-Origin Resource Sharing (CORS) headers, like `Access-Control-Allow-Origin`, are sent by a server to indicate that a web page from a different origin is allowed to access its resources. Without these headers, browsers enforce a 'Same-Origin Policy' that blocks such cross-origin requests for security reasons." },
    { question: "Why does this tool use a server-side check?", answer: "This tool fetches headers from the server-side to bypass browser-based CORS restrictions. If a browser were to make a direct request to a different domain to get its headers, that request would likely be blocked by the browser's security policies unless the target server explicitly allowed it with CORS headers." }
];

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer.replace(/<[^>]*>?/gm, '') } })),
};

const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Check HTTP Headers of a Website',
    description: 'A step-by-step guide to inspecting the HTTP response headers for any given URL.',
    step: [
        { '@type': 'HowToStep', name: 'Enter a URL', text: 'Input the full URL of the website or endpoint you want to inspect (e.g., https://www.google.com).' },
        { '@type': 'HowToStep', name: 'Initiate the Check', text: 'Click the "Check Headers" button.' },
        { '@type': 'HowToStep', name: 'Review the Results', text: 'The tool will display the HTTP status code and a table of all response headers sent by the server. You can copy individual header values for analysis.' }
    ],
    totalTime: 'PT1M',
};

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} className="w-full sm:w-auto">
            {pending ? 'Checking...' : 'Check Headers'}
        </Button>
    );
}

export function HttpHeaderChecker() {
    const [state, formAction] = useFormState(checkHeaders, { success: false });
    const [copiedKey, setCopiedKey] = useState<string | null>(null);
    const resultsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if ((state.success || state.message) && resultsRef.current) {
            resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [state]);

    const handleCopyToClipboard = (key: string, value: string) => {
        navigator.clipboard.writeText(value).then(() => {
            setCopiedKey(key);
            setTimeout(() => setCopiedKey(null), 2000);
        });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <StructuredData data={faqSchema} />
            <StructuredData data={howToSchema} />
            <Card>
                <CardHeader>
                    <CardTitle>HTTP Header Checker</CardTitle>
                    <CardDescription>
                        Enter a URL to inspect the HTTP response headers sent by the server.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={formAction} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="url-input">URL</Label>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <Input
                                    id="url-input"
                                    name="url"
                                    type="url"
                                    placeholder="https://example.com"
                                    defaultValue="https://google.com"
                                    className="font-code flex-grow"
                                />
                                <SubmitButton />
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <div ref={resultsRef}>
                {useFormStatus().pending && (
                     <Card>
                        <CardHeader>
                            <Skeleton className="h-6 w-48" />
                            <Skeleton className="h-4 w-64 mt-1" />
                        </CardHeader>
                        <CardContent>
                             <div className="space-y-2">
                                <div className="flex justify-between border-b pb-2">
                                    <Skeleton className="h-5 w-1/4" />
                                    <Skeleton className="h-5 w-1/2" />
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <Skeleton className="h-5 w-1/3" />
                                    <Skeleton className="h-5 w-2/5" />
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <Skeleton className="h-5 w-1/4" />
                                    <Skeleton className="h-5 w-1/2" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
                {!useFormStatus().pending && state.message && (
                    <Alert variant="destructive" role="alert">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{state.message}</AlertDescription>
                    </Alert>
                )}

                {!useFormStatus().pending && state.success && state.headers && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Headers for <code className='font-code bg-muted p-1 rounded-sm break-all'>{state.url}</code></CardTitle>
                            <CardDescription>
                                Received status: <strong className={state.status && state.status >= 400 ? 'text-destructive' : 'text-green-600'}>{state.status} {state.statusText}</strong>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                             <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[200px]">Header</TableHead>
                                            <TableHead>Value</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {Object.entries(state.headers).map(([key, value]) => (
                                             <TableRow key={key}>
                                                <TableCell className="font-semibold">{key}</TableCell>
                                                <TableCell className="font-code break-all">
                                                    <div className="flex items-center justify-between gap-2">
                                                        <span>{value}</span>
                                                         <Button
                                                            size="icon"
                                                            variant="ghost"
                                                            className="h-7 w-7 flex-shrink-0"
                                                            onClick={() => handleCopyToClipboard(key, value)}
                                                            aria-label={`Copy ${key} value`}
                                                        >
                                                            {copiedKey === key ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                             </div>
                        </CardContent>
                    </Card>
                )}
            </div>

            <section>
                <h2 className="text-2xl font-bold mb-4">How to Use the HTTP Header Checker</h2>
                <Card className="prose prose-sm max-w-none dark:prose-invert p-6">
                   <p>This tool allows you to inspect the raw HTTP response headers that a web server sends back to your browser. It's an essential utility for developers, SEO specialists, and security analysts.</p>
                    <ol>
                        <li><strong>Enter a URL:</strong> Type or paste the full URL of the page or API endpoint you want to examine into the input field. Make sure to include <strong>https://</strong>.</li>
                        <li><strong>Check Headers:</strong> Click the "Check Headers" button. Our server will make a request to the URL on your behalf to avoid browser CORS issues.</li>
                        <li><strong>Analyze the Results:</strong> The tool will display the HTTP status code (e.g., 200 OK, 301 Moved Permanently, 404 Not Found) and a detailed table of all response headers.</li>
                        <li><strong>Copy Values:</strong> You can click the copy icon next to any header value to copy it to your clipboard for further analysis or documentation.</li>
                    </ol>
                     <Alert>
                        <Lightbulb className="h-4 w-4" />
                        <AlertTitle>Example Use Case</AlertTitle>
                        <AlertDescription>
                         Enter a shortened URL (like a <strong>bit.ly</strong> link) to see the <strong>301 redirect</strong> status code and the full destination URL in the <strong>location</strong> header. This is a great way to check where a short link goes without actually visiting it.
                        </AlertDescription>
                    </Alert>
                </Card>
            </section>

             <Card className='bg-secondary/30 border-primary/20'>
                <CardHeader>
                    <div className='flex items-center gap-2 text-primary'>
                        <BookOpen className="h-6 w-6" aria-hidden="true" />
                        <CardTitle className="text-primary">Educational Deep Dive: The Invisible Conversation of the Web</CardTitle>
                    </div>
                    <CardDescription>HTTP headers are the silent, vital metadata that powers every interaction on the web. Understand what they are and why they matter.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 prose prose-lg max-w-none dark:prose-invert">
                    <section>
                        <h3>What are HTTP Headers?</h3>
                        <p>HTTP headers are a series of key-value pairs sent at the beginning of every HTTP request (from the client) and response (from the server). They are the "metadata" of the web, providing crucial context and instructions that allow browsers and servers to communicate effectively. While the body of a response contains the visible content—like the text and images of a webpage—the headers contain information about that content, how to handle it, and details about the connection itself.</p>
                        <p>Think of it like a letter. The body of the letter is the main message, but the envelope contains critical headers: the return address, the destination address, the postage stamp (authentication), and handling instructions ("Fragile," "First Class Mail"). HTTP headers serve a similar purpose for web traffic.</p>
                    </section>
                    <section>
                        <h3>Key Header Categories and Examples</h3>
                        <p>Headers can be grouped into several categories based on their function. Here are some of the most common and important ones you'll encounter:</p>
                        <h4>1. General Headers</h4>
                        <p>These apply to both requests and responses but don't relate to the content itself.</p>
                        <ul>
                            <li><strong>Connection:</strong> Controls whether the network connection stays open after the current transaction finishes. `Connection: keep-alive` improves performance by reusing the same connection for multiple requests.</li>
                            <li><strong>Date:</strong> The date and time the message was originated.</li>
                        </ul>
                        <h4>2. Request Headers</h4>
                        <p>Sent by the client (your browser) to the server.</p>
                        <ul>
                            <li><strong>User-Agent:</strong> A string that identifies the client browser and OS, e.g., `Mozilla/5.0 (Windows NT 10.0; Win64; x64) ...`. Servers can use this to send browser-specific content.</li>
                            <li><strong>Accept:</strong> Tells the server what kind of content the client can understand, e.g., `Accept: text/html, application/json`.</li>
                            <li><strong>Cookie:</strong> Contains previously stored cookies that the server can use to identify the user or their session.</li>
                        </ul>
                        <h4>3. Response Headers</h4>
                        <p>Sent by the server back to the client.</p>
                        <ul>
                            <li><strong>Content-Type:</strong> One of the most important headers. It specifies the media type of the resource, e.g., `Content-Type: text/html; charset=utf-8` or `Content-Type: image/jpeg`. The browser relies on this to correctly render the page.</li>
                            <li><strong>Content-Length:</strong> The size of the response body in bytes.</li>
                            <li><strong>Server:</strong> A string that identifies the server software, e.g., `Server: nginx` or `Server: Apache`.</li>
                            <li><strong>Location:</strong> Used in redirects (3xx status codes). It contains the URL that the browser should redirect to.</li>
                        </ul>
                         <h4>4. Caching Headers</h4>
                        <p>These are critical for web performance. They tell the browser how long it can store a local copy of a resource before it needs to ask the server for a new one.</p>
                        <ul>
                            <li><strong>Cache-Control:</strong> The modern, primary header for caching. `Cache-Control: public, max-age=31536000` tells the browser that the file can be cached by anyone for one year.</li>
                            <li><strong>ETag:</strong> An identifier for a specific version of a resource. When the browser re-requests a resource, it can send the ETag it has. If the server's version is the same, it can respond with a `304 Not Modified`, saving bandwidth.</li>
                        </ul>
                        <h4>5. Security Headers</h4>
                        <p>These headers are configured by a server to instruct the browser to enable security features to protect users.</p>
                        <ul>
                            <li><strong>Strict-Transport-Security (HSTS):</strong> Tells the browser to only communicate with the server using HTTPS, never HTTP.</li>
                            <li><strong>Content-Security-Policy (CSP):</strong> A powerful header that defines which resources (scripts, images, etc.) the browser is allowed to load, mitigating Cross-Site Scripting (XSS) attacks.</li>
                            <li><strong>X-Frame-Options:</strong> Prevents the site from being embedded in an `<iframe>` on another site, preventing "clickjacking" attacks.</li>
                        </ul>
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
                            <li><strong>Check Redirect Chains:</strong> Use this tool with a URL shortener (like `t.co` or `bit.ly`) to see the redirect chain in action. You'll see a `301` or `302` status and the destination in the `location` header.</li>
                            <li><strong>Debug API Responses:</strong> When working with APIs, headers are essential. Check the `Content-Type` header to ensure the API is returning the format you expect (e.g., `application/json`).</li>
                            <li><strong>Inspect Caching Behavior:</strong> Check the `Cache-Control`, `Expires`, and `ETag` headers on your static assets (CSS, JS, images) to ensure your web server is configured for optimal performance.</li>
                            <li><strong>Verify Security Implementation:</strong> After deploying a new security policy, use this tool to verify that the `Content-Security-Policy` and other security headers are present and correctly configured.</li>
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                         <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                    </CardHeader>
                    <CardContent>
                         <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                            <li><strong>Forgetting Redirects after a URL Change:</strong> Failing to implement a `301 Moved Permanently` redirect when you move a page can destroy its SEO ranking. Check your old URLs to ensure they are correctly redirecting.</li>
                            <li><strong>Incorrect Caching Headers:</strong> Setting a very long `max-age` on a file that changes frequently (like an HTML page) can cause users to see stale content. Conversely, not caching static assets (like logos) at all hurts performance.</li>
                             <li><strong>Leaking Version Information:</strong> Headers like `Server` or `X-Powered-By` can reveal the specific software and version you are running (e.g., `PHP/8.1.2`). This gives attackers valuable information. It's a common practice to obscure or remove these headers.</li>
                            <li><strong>Missing Security Headers:</strong> Many websites fail to implement crucial security headers like CSP or HSTS, leaving them more vulnerable to common attacks.</li>
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
                                        <p className="prose-sm dark:prose-invert">{item.answer}</p>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>
            </section>

             <section>
                <h2 className="text-2xl font-bold mb-4">Related Tools & Articles</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Link href="/tools/http-status-checker" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">HTTP Status Code Checker<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">Focus specifically on the status code of a URL and what it means.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                    <Link href="/tools/ssl-checker" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">SSL Checker<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">Inspect the SSL/TLS certificate that enables HTTPS and secure headers.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                    <Link href="/tools/dns-lookup" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">DNS Lookup Tool<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">See the DNS records that point a domain name to the server's IP address.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                </div>
            </section>
        </div>
    );
}
