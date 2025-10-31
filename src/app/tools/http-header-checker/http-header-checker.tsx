
'use client';

import { useActionState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { StructuredData } from '@/components/structured-data';
import { Lightbulb, AlertCircle, Wand, AlertTriangle, BookOpen, ChevronRight, Copy, Check, Search, Globe, Code, Key, Cookie, Calendar, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { checkHeaders, type FormState } from './actions';
import { cn } from '@/lib/utils';


const initialState: FormState = null;

const faqData = [
    { question: "What are HTTP headers?", answer: "HTTP headers are key-value pairs that are sent along with every HTTP request and response. They provide essential metadata about the request or the response, such as the content type, character encoding, caching instructions, and server information." },
    { question: "Why is this tool useful?", answer: "This tool allows developers, SEOs, and system administrators to inspect the HTTP headers returned by a server for a specific URL. This is crucial for debugging redirect issues, analyzing caching policies, verifying security headers, and understanding how a server is configured." },
    { question: "What is a '301 Moved Permanently' redirect?", answer: "A 301 status code indicates that a resource has been permanently moved to a new URL. The server's response will include a `Location` header with the new address. Browsers and search engines will update their records and automatically go to the new URL in the future. This is the recommended method for permanent redirects for SEO purposes." },
    { question: "What does the 'Cache-Control' header do?", answer: "The `Cache-Control` header dictates how a resource should be cached by the browser and intermediate proxies. Directives like `max-age` specify how long the resource can be cached, while `no-cache` or `no-store` can prevent caching altogether. Proper caching is vital for website performance." },
    { question: "What are important security headers?", answer: "Several headers are critical for web security. `Content-Security-Policy` (CSP) helps prevent cross-site scripting (XSS), `Strict-Transport-Security` (HSTS) enforces the use of HTTPS, and `X-Frame-Options` prevents clickjacking attacks. This tool can help you verify if they are implemented correctly." },
    { question: "Why does this tool not follow redirects?", answer: "This tool is designed to show you the headers of the exact URL you enter. By not following redirects, it allows you to see the *initial* server response, such as a 301 or 302 status code and the `Location` header, which is often the primary goal of debugging redirect chains." },
    { question: "What does the 'User-Agent' header do?", answer: "The `User-Agent` header is sent by the client (your browser) to the server to identify itself. It typically includes the browser name, version, and operating system. Servers can use this information to serve different content to different devices (e.g., a mobile version of a site for a mobile browser)." },
    { question: "What is CORS?", answer: "CORS (Cross-Origin Resource Sharing) is a security mechanism that controls how resources on a web page can be requested from another domain. Headers like `Access-Control-Allow-Origin` are used to manage these permissions. This tool makes the request from the server-side, bypassing browser-based CORS restrictions to get the direct headers from the target server." },
    { question: "What is the difference between a 'GET' and a 'POST' request?", answer: "A 'GET' request is used to retrieve data from a server. The request parameters are typically included in the URL. A 'POST' request is used to send data to a server to create or update a resource. The data is included in the body of the request. This tool sends a GET request to fetch the headers." },
    { question: "What is a 'cookie' and how does it relate to headers?", answer: "Cookies are small pieces of data that a server sends to a user's browser. The server sends a cookie using the `Set-Cookie` response header. On subsequent requests to the same server, the browser sends the cookie back using the `Cookie` request header. This is used to maintain state, like keeping a user logged in." },
];

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })),
};

const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Check HTTP Headers of a URL',
    description: 'A step-by-step guide to inspecting the HTTP response headers for any given URL.',
    step: [
        { '@type': 'HowToStep', name: 'Enter the URL', text: 'Type or paste the full URL you want to inspect into the input field. You can include or omit "http://" or "https://".' },
        { '@type': 'HowToStep', name: 'Fetch Headers', text: 'Click the "Check Headers" button. The request will be made from our server to avoid browser cross-origin issues.' },
        { '@type': 'HowToStep', name: 'Review the Status Line', text: 'The first thing you will see is the HTTP status line, showing the protocol version, status code (e.g., 200 OK, 301 Moved Permanently), and status message.' },
        { '@type': 'HowToStep', name: 'Analyze the Header Table', text: 'The table below lists all the response headers returned by the server, with the header name on the left and its value on the right. You can use this to check for caching policies, security headers, server information, and more.' },
    ],
    totalTime: 'PT1M',
};

const headerExamples = [
    { header: 'Content-Type', description: 'Indicates the media type of the resource (e.g., `text/html`, `application/json`).', icon: File },
    { header: 'Cache-Control', description: 'Directives for caching in both requests and responses (e.g., `max-age=3600`, `no-cache`).', icon: RefreshCw },
    { header: 'Location', description: 'Used in 3xx redirects to specify the new URL the client should go to.', icon: Globe },
    { header: 'Server', description: 'Information about the software used by the origin server.', icon: Code },
    { header: 'Set-Cookie', description: 'Sends a cookie from the server to the user agent.', icon: Cookie },
    { header: 'Strict-Transport-Security', description: '(HSTS) A security header that tells browsers to only interact with it using HTTPS.', icon: Key },
    { header: 'Expires', description: 'The date/time after which the response is considered stale (an older way of caching).', icon: Calendar },
];

export function HttpHeaderChecker() {
    const [state, formAction] = useActionState(checkHeaders, initialState);
    const formRef = useRef<HTMLFormElement>(null);
    const resultRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        if(state && resultRef.current) {
            resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [state]);

    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <StructuredData data={faqSchema} />
            <StructuredData data={howToSchema} />
            <Card>
                <CardHeader>
                    <CardTitle>HTTP Header Checker</CardTitle>
                    <CardDescription>
                        Enter a URL to inspect the HTTP response headers returned by the server.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form ref={formRef} action={formAction} className="space-y-4">
                        <div className="flex flex-col sm:flex-row gap-2">
                            <div className="flex-grow space-y-2">
                                <Label htmlFor="url-input" className="sr-only">URL</Label>
                                <Input
                                    id="url-input"
                                    name="url"
                                    type="text"
                                    defaultValue="https://google.com"
                                    placeholder="e.g., https://example.com"
                                    className="font-code"
                                    aria-label="URL to check"
                                />
                            </div>
                            <Button type="submit" className="w-full sm:w-auto"><Search className="mr-2 h-4 w-4" /> Check Headers</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <div ref={resultRef}>
                {state && (
                    <div aria-live="polite">
                        {!state.success ? (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{state.message}</AlertDescription>
                            </Alert>
                        ) : (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Results for {state.url}</CardTitle>
                                    <CardDescription>
                                        The server responded with the following status and headers.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                     <div className="bg-muted p-3 rounded-md font-code text-sm">
                                        <p>HTTP/1.1 <span className={cn(state.status && state.status >= 400 ? 'text-red-500' : state.status && state.status >= 300 ? 'text-yellow-500' : 'text-green-500', 'font-bold')}>{state.status} {state.statusText}</span></p>
                                     </div>
                                     <div className="rounded-md border">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="w-1/3">Header Name</TableHead>
                                                    <TableHead>Value</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {state.headers && Object.entries(state.headers).map(([key, value]) => (
                                                    <TableRow key={key}>
                                                        <TableCell className="font-semibold break-all">{key}</TableCell>
                                                        <TableCell className="font-code break-all">{value}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                )}
            </div>

            <section>
                <h2 className="text-2xl font-bold mb-4">How to Use the HTTP Header Checker</h2>
                <Card className="prose prose-sm max-w-none text-foreground p-6">
                    <p>This tool allows you to peek behind the curtain of a web request and see the metadata that the server sends back with a web page.</p>
                    <ol>
                        <li><strong>Enter the URL:</strong> Type or paste the full web address you want to inspect. The tool will automatically add `https://` if you forget it.</li>
                        <li><strong>Check Headers:</strong> Click the "Check Headers" button. Our server makes a request to the URL you provided. We do this from our server to avoid browser security issues (CORS) that can block such requests.</li>
                        <li><strong>Analyze the Status Line:</strong> The first result is the most important. It tells you the outcome of the request. A `200 OK` means success. A `301 Moved Permanently` means the page has moved. A `404 Not Found` means the page does't exist, and a `500 Internal Server Error` indicates a problem on the server side.</li>
                        <li><strong>Inspect the Header Table:</strong> Below the status, you'll find a detailed table of all the headers the server sent back. This is where you can debug caching issues (`Cache-Control`), check redirect locations (`Location`), verify security policies (`Content-Security-Policy`), and see what web server software is being used (`Server`).</li>
                    </ol>
                </Card>
            </section>
            
            <Card className='bg-secondary/30 border-primary/20'>
                <CardHeader>
                    <div className='flex items-center gap-2 text-primary'>
                        <BookOpen className="h-6 w-6" aria-hidden="true" />
                        <CardTitle className="text-primary">Educational Deep Dive: The Invisible Conversation of the Web</CardTitle>
                    </div>
                    <CardDescription>Understand the vital role of HTTP headers in every single web interaction, from performance and security to SEO.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                    <section>
                        <h3 className="font-bold text-xl">What Are HTTP Headers?</h3>
                        <p>When your browser requests a web page, it's not just asking "give me the file." It initiates a detailed conversation with the web server. This conversation, defined by the Hypertext Transfer Protocol (HTTP), consists of requests and responses. HTTP headers are key-value pairs of metadata that accompany every one of these requests and responses, providing crucial instructions and context for both the client and the server.</p>
                        <p>Think of it like sending a formal business letter. The content of the letter is the HTML, CSS, and JavaScript of the web page. The headers are everything written on the envelope: the return address, the destination address, the date sent, special handling instructions ("fragile," "air mail"), and information about the letter carrier. These headers ensure the letter gets delivered correctly, securely, and efficiently.</p>
                    </section>
                    <section>
                        <h3 className="font-bold text-xl">Key Headers and Their Meanings</h3>
                        <div className="space-y-4">
                           {headerExamples.map(header => (
                            <div key={header.header} className="flex items-start gap-4">
                                <header.icon className="h-5 w-5 mt-1 text-accent flex-shrink-0" />
                                <div>
                                    <strong className="font-code">{header.header}</strong>
                                    <p className="mt-0 text-sm text-muted-foreground">{header.description}</p>
                                </div>
                            </div>
                           ))}
                        </div>
                    </section>
                     <section>
                        <h3 className="font-bold text-xl">Why Headers are Critical for SEO and Performance</h3>
                        <p>Properly configured HTTP headers are not just a technical detail; they have a direct impact on your website's performance and search engine ranking.</p>
                         <ul className="list-disc pl-5">
                            <li><strong>Redirects and Canonical URLs:</strong> Using the correct `301` redirect headers when moving content is essential to transfer "link equity" (SEO value) from the old URL to the new one. Headers like `Link` with `rel="canonical"` also help tell search engines which version of a page is the definitive one, avoiding duplicate content penalties.</li>
                            <li><strong>Caching:</strong> The `Cache-Control` and `Expires` headers tell browsers how long they can store a local copy of a resource. Effective caching means returning visitors don't have to re-download images, scripts, and stylesheets, making the site load dramatically faster. Page speed is a significant ranking factor for Google.</li>
                             <li><strong>Security:</strong> Search engines favor secure websites. Implementing headers like `Strict-Transport-Security` (which enforces HTTPS) is a positive signal. A secure site also builds user trust, which indirectly impacts engagement metrics that search engines value.</li>
                        </ul>
                    </section>
                </CardContent>
            </Card>

            <section>
                <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
                <Card>
                    <CardContent className="p-6">
                        <Accordion type="single" collapsible className="w-full">
                            {faqData.map((item, index) => (
                                <AccordionItem value={`item-${index}`} key={index}>
                                    <AccordionTrigger>{item.question}</AccordionTrigger>
                                    <AccordionContent>
                                        <div dangerouslySetInnerHTML={{ __html: item.answer.replace(/`([^`]+)`/g, "<code className='font-code bg-muted p-1 rounded-sm'>$1</code>") }} />
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>
            </section>
        </div>
    );
}
