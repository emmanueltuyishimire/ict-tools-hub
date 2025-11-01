
import { PageHeader } from '@/components/page-header';
import { HttpRequestSizeCalculator } from './http-request-size-calculator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { Lightbulb, AlertTriangle, BookOpen, ChevronRight, Wand } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
    title: 'HTTP Request Size Calculator | ICT Toolbench',
    description: 'Estimate the total byte size of an HTTP request by breaking down its components. Essential for optimizing API calls and improving performance in low-bandwidth environments.',
    openGraph: {
        title: 'HTTP Request Size Calculator | ICT Toolbench',
        description: 'Instantly estimate the size of an HTTP request to optimize API calls, reduce bandwidth, and improve application performance.',
        url: '/tools/http-request-size-calculator',
    }
};

const faqData = [
    { question: "What is an HTTP request?", answer: "An HTTP request is a message sent by a client (like your web browser) to a server to ask for a resource, such as an HTML page, an image, or data from an API. It's the primary way clients and servers communicate on the web." },
    { question: "Why does the size of an HTTP request matter?", answer: "Request size is critical for performance, especially on mobile or low-bandwidth networks. Smaller requests transfer faster, consume less data, and can result in quicker API responses and page loads. For IoT devices on metered connections, minimizing request size is also crucial for reducing costs." },
    { question: "What are the main parts of an HTTP request?", answer: "An HTTP request consists of three main parts: 1) The Request Line (containing the HTTP method like GET or POST, the URL path, and the HTTP version), 2) The Headers (key-value pairs containing metadata like User-Agent, Accept types, and cookies), and 3) The Body (which is optional and contains the data being sent, typically used with POST or PUT requests)." },
    { question: "Does this calculator account for TCP/IP overhead?", answer: "No. This tool calculates the size of the HTTP message itself. The actual data sent over the network will be slightly larger due to the overhead of the underlying TCP/IP packets that encapsulate the HTTP message. This overhead is typically small but can be a factor for very small requests." },
    { question: "Why is the `Host` header added automatically?", answer: "The `Host` header is a mandatory header in all HTTP/1.1 requests. It specifies the domain name of the server the request is being sent to. Our calculator adds it automatically to provide a more accurate size estimate." },
    { question: "How can I reduce my request size?", answer: "To reduce request size, you can: remove unnecessary headers, use shorter URLs, send less data in the request body (e.g., by only sending changed fields in a PUT request), and use cookie-free domains for serving static assets. For GET requests, ensure your query parameters are as concise as possible." },
    { question: "Is a smaller request always better?", answer: "Generally, yes. However, making two very small requests might be less efficient than making one slightly larger request due to the overhead of establishing a new connection for the second request. Modern protocols like HTTP/2 help mitigate this by allowing multiple requests over a single connection." },
    { question: "How does this differ from HTTP Response size?", answer: "This tool calculates the size of the request sent *from* the client *to* the server. The HTTP response size, which is the data sent back *from* the server, is usually much larger as it contains the actual content (HTML, images, etc.). You can use our <a href='/tools/load-time-estimator' class='text-primary hover:underline'>Load Time Estimator</a> to analyze the impact of response size." },
];

const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Estimate HTTP Request Size',
    description: 'A step-by-step guide to calculating the byte size of an HTTP request.',
    step: [
        { '@type': 'HowToStep', name: 'Select Method and URL', text: 'Choose the HTTP method (GET, POST, etc.) and enter the full URL of the resource you are requesting.' },
        { '@type': 'HowToStep', name: 'Add Headers', text: 'Enter all the HTTP headers you plan to send. The tool includes common headers by default, and you can add or remove them as needed. The mandatory `Host` header is added automatically.' },
        { '@type': 'HowToStep', name: 'Add Request Body', text: 'If you are using a POST or PUT method, enter the content of the request body (e.g., JSON data).' },
        { '@type': 'HowToStep', name: 'Review the Size Breakdown', text: 'The tool will instantly calculate and display the size in bytes of the request line, headers, and body, along with the total estimated size of the HTTP message.' },
    ],
    totalTime: 'PT2M'
};

const keyTerminologies = [
    { term: 'HTTP Method', definition: 'The action to be performed on a resource, such as GET (retrieve), POST (create/submit), PUT (update), or DELETE (remove).' },
    { term: 'Request Line', definition: 'The first line of an HTTP request, containing the method, the path of the resource, and the HTTP version.' },
    { term: 'HTTP Headers', definition: 'Key-value pairs that provide metadata about the request, such as the User-Agent, accepted content types, and cookies.' },
    { term: 'Request Body', definition: 'The payload of the request, containing data sent to the server. Primarily used with POST and PUT methods.' },
    { term: 'TCP/IP Overhead', definition: 'The extra bytes added by the underlying transport and internet protocols to package and route the HTTP message across the network.' },
];

export default function HttpRequestSizeCalculatorPage() {
    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqData.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer.replace(/<[^>]*>?/gm, '') } }))
    };

    return (
        <>
            <StructuredData data={faqSchema} />
            <StructuredData data={howToSchema} />
            <PageHeader
                title="HTTP Request Size Calculator"
                description="Estimate the total byte size of an HTTP request by breaking down its components. Essential for optimizing API calls and improving performance in low-bandwidth environments."
            />
            
            <div className="max-w-4xl mx-auto space-y-12">
                <HttpRequestSizeCalculator />

                <section>
                    <h2 className="text-2xl font-bold mb-4">How to Use This Tool</h2>
                    <Card className="prose prose-sm max-w-none text-foreground p-6">
                        <p>This calculator helps you understand the size of your HTTP requests, a key factor in API and mobile performance.</p>
                        <ol>
                            <li><strong>Set the Method and URL:</strong> Choose the HTTP verb (GET, POST, etc.) and enter the full request URL.</li>
                            <li><strong>Define Headers:</strong> Add, edit, or remove HTTP headers. The tool includes common headers by default to provide a realistic starting point. The mandatory `Host` header is calculated automatically from the URL.</li>
                            <li><strong>Provide a Body (if applicable):</strong> If you select POST or PUT, a text area will appear for you to enter the request payload (e.g., a JSON object).</li>
                            <li><strong>Analyze the Breakdown:</strong> The results are calculated in real-time, showing the byte size of the request line, the headers, the body, and the total estimated size of the HTTP message.</li>
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
                            <CardTitle className="text-primary">Educational Deep Dive: The Anatomy of an HTTP Request</CardTitle>
                        </div>
                        <CardDescription>From the request line to the body, understand the components that make up every client-to-server communication on the web.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                        <section>
                            <h3 className="font-bold text-xl">The Three Parts of a Request</h3>
                            <p>Every time your browser asks a server for something, it constructs a message according to the rules of the Hypertext Transfer Protocol (HTTP). This message is made of plain text and has up to three parts:</p>
                            <ol>
                                <li><strong>The Request Line:</strong> This is the very first line and is mandatory. It contains three things: the HTTP method (e.g., `GET`), the path of the requested resource (e.g., `/index.html`), and the HTTP version (e.g., `HTTP/1.1`). Its size is small but essential.</li>
                                <li><strong>The Headers:</strong> Following the request line are a series of key-value pairs called headers. These provide the server with important metadata about the request. Common headers include `Host` (the domain being contacted), `User-Agent` (identifying the browser), `Accept` (what content types the browser can handle), and `Cookie` (sending back data from previous visits). Header size can grow significantly, especially with long cookies or many custom headers.</li>
                                <li><strong>The Body:</strong> This is an optional part that contains the data being sent to the server. It is typically empty for `GET` requests but is the main component of `POST` and `PUT` requests, often containing JSON or form data. The body can be the largest part of the request.</li>
                            </ol>
                        </section>
                        <section>
                            <h3 className="font-bold text-xl">Why Size Matters: Performance in the Real World</h3>
                            <p>While modern desktop connections are fast, request size becomes a major bottleneck in two key areas: mobile networks and the Internet of Things (IoT).</p>
                             <ul className="list-disc pl-5">
                                <li><strong>Mobile Performance:</strong> Mobile networks often have higher latency and lower bandwidth. The time it takes to upload the request (the "request transfer time") can be a noticeable part of the total wait time for a user. A bloated request with huge headers or unnecessary body data can make an app feel sluggish on a cellular connection.</li>
                                <li><strong>IoT and API Calls:</strong> IoT devices often operate on low-power, low-bandwidth networks (like LoRaWAN or NB-IoT) and may have metered data plans. For a device that sends thousands of updates per day, reducing the request size by even a few hundred bytes can result in significant data and battery life savings over time. Optimizing headers and using efficient data formats in the body is critical.</li>
                            </ul>
                        </section>
                    </CardContent>
                </Card>
                 <div className="grid md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <div className='flex items-center gap-2'><Wand className="h-6 w-6 text-accent" /> <CardTitle>Pro Tips for Optimization</CardTitle></div>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                                <li><strong>Audit Your Headers:</strong> Remove any non-standard or unnecessary custom headers from your API calls.</li>
                                <li><strong>Use Cookie-Free Domains:</strong> For serving static assets like images and CSS, use a separate subdomain or CDN that does not set cookies. This prevents the browser from sending unnecessary cookie data with every image request.</li>
                                <li><strong>Use `GET` for Retrieval:</strong> When only fetching data, always use a GET request, which has no body. Don't send data in the body of a GET request, as this is non-standard.</li>
                                <li><strong>Be Concise in the Body:</strong> When sending JSON in a POST/PUT request, use shorter key names (e.g., `"ts"` instead of `"timestamp"`) to reduce the body size, especially for high-frequency API calls.</li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes</CardTitle></div>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                                <li><strong>Sending Large Cookies:</strong> Storing too much data in client-side cookies can bloat every single request to your domain. Use `localStorage` for non-essential client-side data.</li>
                                <li><strong>Ignoring Header Overhead:</strong> Developers often focus only on the body size, but on an API with many headers and a small body, the headers can make up over 50% of the request size.</li>
                                <li><strong>Using POST for Simple Actions:</strong> Using a POST request with a body where a simple GET request with a query parameter would suffice. This adds unnecessary overhead.</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                <section>
                    <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Optimizing an IoT Sensor Network</h3>
                            <p className="text-sm text-muted-foreground">An engineer is designing a system where thousands of sensors report temperature data every minute. By using this tool, they can model the request size. They decide to use a `PUT` request with a very small body (`{"t":21.5}`) and minimal headers to keep each request under 200 bytes. This minimizes data costs and extends the battery life of the remote sensors.</p>
                        </div>
                        <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Analyzing a Sluggish Mobile App</h3>
                            <p className="text-sm text-muted-foreground">A mobile app feels slow when saving user preferences. A developer uses a proxy to inspect the app's API calls and plugs the components into this calculator. They discover that the app is re-sending the user's entire profile picture (as a Base64 string in a header) with every small update, creating a massive 2MB request. They fix this by only sending the changed data, drastically improving the app's responsiveness.</p>
                        </div>
                        <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Debugging a Third-Party API</h3>
                            <p className="text-sm text-muted-foreground">A developer is getting a "413 Payload Too Large" error from a third-party API. They use this calculator to estimate the size of their POST request body and headers. They find their JSON payload is 1.5MB. After checking the API's documentation, they discover the maximum allowed request size is 1MB, instantly identifying the cause of the error.</p>
                        </div>
                        <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Reducing Cookie Overhead</h3>
                            <p className="text-sm text-muted-foreground">A web performance consultant analyzes a slow website. Using the browser's developer tools, they find that a 4KB cookie is being sent with every request, including requests for dozens of small images. They use the calculator to show the client that this adds up to hundreds of kilobytes of unnecessary upload data per page load. They recommend moving the static assets to a cookie-free domain, improving performance.</p>
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
                                        <AccordionContent>
                                            <div dangerouslySetInnerHTML={{ __html: item.answer }} />
                                        </AccordionContent>
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
