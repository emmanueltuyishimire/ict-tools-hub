
import { PageHeader } from '@/components/page-header';
import { HttpRequestSizeCalculator } from './http-request-size-calculator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { Lightbulb, AlertTriangle, BookOpen, ChevronRight, Wand } from 'lucide-react';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const metadata = {
    title: 'HTTP Request Size Calculator | ICT Toolbench',
    description: 'Estimate the total byte size of an HTTP request by breaking down its components. Essential for optimizing API calls and improving performance in low-bandwidth environments.',
};

const faqData = [
    { question: "Why does HTTP request size matter?", answer: "Request size is critical for performance, especially on mobile or low-bandwidth networks. Smaller requests transfer faster, leading to quicker API responses and a more responsive user experience. For high-traffic applications, smaller requests also reduce server load and bandwidth costs." },
    { question: "What are the main components of an HTTP request?", answer: "An HTTP request consists of three main parts: 1) The Request Line (e.g., `GET /api/user HTTP/1.1`), 2) The Headers (metadata like `Host`, `User-Agent`, `Accept`), and 3) The Body (which contains the data for POST or PUT requests, often in JSON format)." },
    { question: "How can I reduce the size of my request headers?", answer: "You can reduce header size by removing non-essential headers, using shorter cookie names, and avoiding overly verbose custom headers. Protocols like HTTP/2 and HTTP/3 use header compression (HPACK/QPACK) to significantly reduce the overhead of headers for subsequent requests to the same server." },
    { question: "Does the URL length affect the request size?", answer: "Yes, the URL's path and query string are part of the Request Line. Longer, more descriptive URLs and query parameters will increase the size of the request line, although this is usually a small part of the total size." },
    { question: "Is a GET or POST request smaller?", answer: "For the same data, a GET request is often smaller because it doesn't have a request body; data is passed in the URL's query string. A POST request includes the data in its body, which is usually larger. However, GET requests have a size limit (around 2000 characters in most browsers) and should not be used to send sensitive or large amounts of data." },
    { question: "Does this calculator account for TCP/IP overhead?", answer: "No. This tool calculates the size of the raw HTTP request message. The actual data transferred over the network will be slightly larger due to the overhead of the underlying TCP and IP protocols, which add their own headers to wrap the HTTP message in packets." },
    { question: "How can I reduce the size of the request body?", answer: "The best way is to only send the data you absolutely need. Avoid sending large, nested JSON objects if only a few fields are required. Use minification for JSON payloads to remove unnecessary whitespace. For very large payloads, consider using compression if both the client and server support it (though this is more common for responses)." },
    { question: "Is this tool safe to use with sensitive data?", answer: "Yes. All calculations are performed client-side in your browser. No data from the URL, headers, or body is ever sent to our server." },
];

const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Estimate HTTP Request Size',
    description: 'A step-by-step guide to calculating the byte size of an HTTP request.',
    step: [
        { '@type': 'HowToStep', name: 'Select HTTP Method and URL', text: 'Choose the HTTP method (GET, POST, etc.) and enter the full URL of the request endpoint.' },
        { '@type': 'HowToStep', name: 'Add HTTP Headers', text: 'Add any custom headers your request includes. The tool pre-fills common headers like User-Agent.' },
        { '@type': 'HowToStep', name: 'Provide Request Body (if applicable)', text: 'If you are using a POST or PUT method, paste the content of your request body (e.g., a JSON payload) into the body field.' },
        { '@type': 'HowToStep', name: 'Review the Size Breakdown', text: 'The tool instantly calculates and displays the total request size, with a breakdown of how much each component (request line, headers, body) contributes to the total.' },
    ],
    totalTime: 'PT2M'
};

const keyTerminologies = [
    { term: 'Request Line', definition: 'The first line of an HTTP request, containing the method, the path, and the HTTP version (e.g., `GET /index.html HTTP/1.1`).' },
    { term: 'HTTP Headers', definition: 'Key-value pairs that provide metadata about the request, such as the host, accepted content types, and client information.' },
    { term: 'Request Body (Payload)', definition: 'The part of an HTTP request that contains the data being sent to the server, used in methods like POST and PUT.' },
    { term: 'TCP/IP Overhead', definition: 'The extra bytes added by the transport and internet layers to package the HTTP message for network delivery. Not included in this tool\'s calculation.' },
    { term: 'HTTP/2 and HTTP/3', definition: 'Modern versions of the HTTP protocol that introduce features like header compression to reduce the size and overhead of requests.' },
];

export default function HttpRequestSizeCalculatorPage() {
  return (
    <>
      <StructuredData data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqData.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer.replace(/<[^>]*>?/gm, '') } }))
      }} />
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
              <p>
                This estimator helps you understand the size of your HTTP requests, which is crucial for optimizing API calls and improving performance on slow networks.
              </p>
              <ol>
                  <li>
                    <strong>Set the Method and URL:</strong> Choose the appropriate HTTP method (GET, POST, etc.) and enter the full request URL.
                  </li>
                  <li>
                    <strong>Add Headers:</strong> The tool includes common headers by default. Add or remove headers to match your specific request. The `Host` header is added automatically based on the URL.
                  </li>
                   <li>
                    <strong>Enter Request Body:</strong> If you are using POST or PUT, a field for the request body will appear. Paste your payload (e.g., JSON) here.
                  </li>
                  <li>
                    <strong>Analyze the Breakdown:</strong> The tool instantly calculates the total size in bytes and shows you how much each part—the request line, the headers, and the body—contributes to the total.
                  </li>
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
                  <CardTitle className="text-primary">Educational Deep Dive: Optimizing HTTP Requests</CardTitle>
              </div>
              <CardDescription>From mobile apps to IoT devices, learn why minimizing request size is a critical performance optimization.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
              <section>
                  <h3 className="font-bold text-xl">The Cost of a Request</h3>
                  <p>
                    Every time an application needs to communicate with a server, it sends an HTTP request. While we often focus on the size of the <strong>response</strong> (e.g., a large image or JSON payload), the size of the initial request also matters, especially in certain contexts. For devices on slow or metered mobile networks (like IoT devices or users in developing countries), every byte counts. Large requests consume more bandwidth, use more battery power, and take longer to transmit, making the application feel sluggish.
                  </p>
              </section>
              <section>
                  <h3 className="font-bold text-xl">Where Does the Size Come From?</h3>
                  <p>This tool breaks down the request into its three core parts:</p>
                  <ul className="list-disc pl-5">
                     <li><strong>Request Line:</strong> A single line containing the HTTP method, the path, and the protocol version. Its size is directly affected by the length of your URL and query parameters.</li>
                     <li><strong>Headers:</strong> A collection of key-value pairs. Modern requests often contain many headers for caching, authentication (cookies, tokens), and client information. Long cookie strings or JWTs can significantly increase header size.</li>
                     <li><strong>Body:</strong> For POST and PUT requests, this is where the actual data payload resides. The size is determined entirely by the data you send. A large JSON object or file upload will make this the biggest part of the request.</li>
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
                        <li><strong>Use Shorter URLs:</strong> Where possible, use concise URL paths and query parameter names.</li>
                        <li><strong>Minimize Cookie Size:</strong> Only store essential data in cookies. Offload session data to server-side storage if possible.</li>
                        <li><strong>Remove Unnecessary Headers:</strong> Inspect your application's requests and remove any custom headers that are not strictly necessary.</li>
                        <li><strong>Send Only What's Needed:</strong> When sending JSON in a request body, strip out any fields that the server does not need to process the request.</li>
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                     <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes</CardTitle></div>
                </CardHeader>
                <CardContent>
                     <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                        <li><strong>Sending Large Payloads in GET Requests:</strong> While technically possible by encoding data into the URL, it's bad practice. GET requests have length limits and are often logged. Use POST for sending data.</li>
                        <li><strong>Bloated JWTs or Cookies:</strong> Storing too much user data (like full profiles or extensive permissions) directly in a JWT or cookie can make every single authenticated request very large.</li>
                        <li><strong>Ignoring Header Overhead:</strong> For small, frequent API calls, the size of the headers can easily exceed the size of the request body, making header optimization important.</li>
                    </ul>
                </CardContent>
            </Card>
        </div>

       <section>
          <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
          <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Optimizing an IoT Device</h3>
                  <p className="text-sm text-muted-foreground">An engineer is designing a battery-powered IoT sensor that sends data every minute over a cellular network. To conserve power and data usage, they use this tool to design the smallest possible HTTP request. They choose a concise URL, minimize headers, and use a compact binary format for the request body instead of verbose JSON.</p>
              </div>
               <div className="bg-card p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Debugging an API Gateway Limit</h3>
                  <p className="text-sm text-muted-foreground">A developer's POST requests to an API are being rejected with a "413 Payload Too Large" error. They paste their URL, headers, and JSON body into the calculator and discover the total request size is 1.2 MB. They check the API gateway's documentation and find it has a 1 MB request size limit, instantly identifying the problem.</p>
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
