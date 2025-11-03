
'use client';

import { useActionState, useRef, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { StructuredData } from '@/components/structured-data';
import { Lightbulb, AlertCircle, Wand, AlertTriangle, BookOpen, ChevronRight, Copy, Check, Search, Globe, Code, Key, Cookie, Calendar, RefreshCw, FileIcon, Info } from 'lucide-react';
import Link from 'next/link';
// import { checkHeaders, type FormState } from './actions';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

// Mock types and functions for static build
type FormState = {
  success: boolean;
  message: string;
  url?: string;
  headers?: Record<string, string>;
  status?: number;
  statusText?: string;
} | null;

const initialState: FormState = null;

async function checkHeaders(prevState: FormState, formData: FormData): Promise<FormState> {
    return {
        success: false,
        message: "This tool is disabled in the current static deployment environment."
    }
}


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

const keyTerminologies = [
    { term: 'HTTP', definition: 'Hypertext Transfer Protocol. The underlying protocol used by the World Wide Web for transferring data between clients and servers.' },
    { term: 'Header Field', definition: 'A key-value pair of metadata sent in an HTTP request or response, such as `Content-Type: text/html`.' },
    { term: 'Status Code', definition: 'A three-digit code in an HTTP response indicating the outcome of a request (e.g., `200` for success, `404` for not found).' },
    { term: 'Request/Response', definition: 'The two halves of an HTTP transaction. A client sends a request to a server, and the server returns a response.' },
    { term: 'User-Agent', definition: 'A request header that contains a string identifying the client software (e.g., browser, version, OS) making the request.' },
    { term: 'Cache-Control', definition: 'A response header that provides directives for caching, such as how long a resource can be stored by the browser.' },
    { term: 'CORS', definition: 'Cross-Origin Resource Sharing. A security mechanism controlled by headers (like `Access-Control-Allow-Origin`) that dictates whether a browser permits a web page to access resources from a different domain.' },
    { term: 'Redirect', definition: 'A server response (with a 3xx status code) that instructs the client to go to a different URL. The new URL is specified in the `Location` header.' },
];


export function HttpHeaderChecker() {
    const [state, formAction] = useActionState(checkHeaders, initialState);
    const formRef = useRef<HTMLFormElement>(null);
    const resultRef = useRef<HTMLDivElement>(null);
    const { pending } = useFormStatus();
    
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
                                    placeholder="example.com"
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
                {pending && (
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-8 w-1/2" />
                            <Skeleton className="h-4 w-3/4" />
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <Skeleton className="h-10 w-full" />
                             <Skeleton className="h-40 w-full" />
                        </CardContent>
                    </Card>
                )}
                {state && !pending && (
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
        </div>
    );
}
