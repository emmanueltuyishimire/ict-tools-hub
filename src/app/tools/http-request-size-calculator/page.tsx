
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
    description: 'Estimate the size of an HTTP request, including headers and body. A useful tool for API development, IoT, and mobile performance optimization.',
    openGraph: {
        title: 'HTTP Request Size Calculator | ICT Toolbench',
        description: 'Analyze and estimate the byte size of your HTTP requests to optimize for performance and low-bandwidth environments.',
        url: '/tools/http-request-size-calculator',
    }
};

const faqData = [
    { question: "What is an HTTP request?", answer: "An HTTP request is a message sent by a client (like your web browser) to a server to ask for a resource, such as a web page, an image, or data from an API. It consists of a request line, headers, and an optional body." },
    { question: "Why does the size of an HTTP request matter?", answer: "Request size is especially important in mobile and IoT applications where bandwidth is limited and latency is high. Smaller requests use less data, consume less battery, and result in faster responses. Even in standard web development, large request headers (e.g., from too many cookies) can slow down API calls." },
    { question: "How does this tool calculate the size?", answer: "This tool calculates the size by adding up the byte length of each part of the raw HTTP request: the request line (e.g., 'GET /path HTTP/1.1'), all the headers (including the carriage return/line feed characters), and the request body. It provides a close approximation of the data sent over the network before any lower-level TCP/IP overhead." },
    { question: "When does a request have a 'body'?", answer: "A request typically includes a body when it needs to send data to the server, not just request it. The most common methods that use a body are `POST` (for creating a new resource) and `PUT` or `PATCH` (for updating an existing resource). `GET` requests do not have a body." },
    { question: "What are HTTP headers?", answer: "HTTP headers are key-value pairs that provide metadata about the request, such as the `Host`, the `User-Agent` (client software), and what type of content the client `Accept`s in return. You can inspect them in detail with our <a href='/tools/http-header-checker' class='text-primary hover:underline'>HTTP Header Checker</a>." },
    { question: "Does this include the size of uploaded files?", answer: "No. This tool is for estimating the size of text-based requests, such as standard form submissions or JSON API calls. For file uploads, which use `multipart/form-data`, the calculation is much more complex and includes the raw file size plus boundary overhead." },
    { question: "What is the request line?", answer: "The request line is the very first line of an HTTP request. It contains three parts: the HTTP method (e.g., `GET`), the requested path (e.g., `/index.html`), and the HTTP protocol version (e.g., `HTTP/1.1`)." },
    { question: "Is this calculation exact?", answer: "It's a very close estimate of the HTTP-level data. The actual amount of data sent over the wire will be slightly larger due to the overhead of the underlying TCP/IP protocols, which add their own headers to each packet." },
    { question: "How can I reduce my request size?", answer: "The most effective ways are to reduce the size of the request body (e.g., by sending only necessary JSON fields) and to minimize the number and size of cookies sent with each request, as cookies are included in the headers. Using more efficient data formats like Protocol Buffers instead of JSON can also make a big difference for APIs." },
    { question: "Why is the body empty for GET requests?", answer: "The HTTP specification defines the `GET` method for retrieving data from a server. Any data needed to specify the resource should be included in the URL's path or query string. A `GET` request should not have a message body, and any body sent with it may be ignored by the server." },
];

const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Estimate HTTP Request Size',
    description: 'A step-by-step guide to calculating the size of an HTTP request.',
    step: [
        { '@type': 'HowToStep', name: 'Enter Request Details', text: 'Fill in the components of your HTTP request: select the method (GET, POST, etc.) and enter the full URL.' },
        { '@type': 'HowToStep', name: 'Add Headers', text: 'In the headers text area, enter the HTTP headers for your request, one per line, in `Key: Value` format.' },
        { '@type': 'HowToStep', name: 'Provide a Body (if applicable)', text: 'If you are using a method like POST or PUT, a text area will appear for the request body. Paste your content (e.g., a JSON payload) here.' },
        { '@type': 'HowToStep', name: 'Review the Size Analysis', text: 'The tool will instantly calculate and display the total size of the request in bytes, along with a chart breaking down the size of the request line, headers, and body.' },
    ],
    totalTime: 'PT2M'
};

const keyTerminologies = [
    { term: 'HTTP Request', definition: 'A message sent by a client to a server to initiate an action on a resource.' },
    { term: 'Request Line', definition: 'The first line of a request, containing the HTTP method, the path of the resource, and the HTTP version.' },
    { term: 'HTTP Headers', definition: 'Key-value pairs that transmit metadata about the request, such as the host, user-agent, and accepted content types.' },
    { term: 'Request Body', definition: 'An optional part of the request that contains data being sent to the server, typically used with POST and PUT methods.' },
    { term: 'Byte', definition: 'The standard unit of digital information, consisting of 8 bits. The size of all request components is measured in bytes.' },
];

export default function HttpRequestSizeCalculatorPage() {
  const faqSchemaData = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqData.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer.replace(/<[^>]*>?/gm, '') } }))
  };

  return (
    <>
      <StructuredData data={faqSchemaData} />
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
                This estimator helps you forecast your monthly bandwidth consumption, a key factor in web hosting and CDN costs.
              </p>
              <ol>
                  <li>
                    <strong>Set the Method and URL:</strong> Choose the HTTP method (like GET or POST) and enter the full URL of the resource you are requesting.
                  </li>
                  <li>
                    <strong>Enter Headers:</strong> Provide the request headers, one per line, in the format `Header-Name: Value`. Common headers are pre-filled as an example.
                  </li>
                  <li>
                    <strong>Add a Request Body (if needed):</strong> If you select a method like POST or PUT, an input for the request body will appear. Paste your payload (e.g., JSON) here.
                  </li>
                   <li>
                    <strong>Analyze the Breakdown:</strong> The tool instantly calculates the total request size in bytes and displays a chart showing the contribution of each part: the request line, the headers, and the body.
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
                              <dt className='font-semibold'>{item.term}</dt>
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
                  <CardTitle className="text-primary">Educational Deep Dive: Why Request Size Matters</CardTitle>
              </div>
              <CardDescription>From mobile apps to IoT, learn why minimizing the size of every request is a key performance optimization.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
              <section>
                  <h3 className="font-bold text-xl">Anatomy of an HTTP Request</h3>
                  <p>
                    When we talk about web performance, we often focus on the server's response: the size of the page, images, and scripts. However, every transaction starts with a request from the client, and the size of this request also has an impact, especially in aggregate or on slow networks. A raw HTTP request is a simple text message with three parts:
                  </p>
                  <ol>
                     <li><strong>The Request Line:</strong> A single line that defines the request's method (e.g., `GET`), path (e.g., `/users/123`), and HTTP version (e.g., `HTTP/1.1`).</li>
                     <li><strong>The Headers:</strong> A series of key-value pairs that provide metadata. This includes the `Host` domain, the `User-Agent` identifying the client, and `Accept` headers telling the server what kind of response format is expected. Crucially, it also includes all cookies for that domain.</li>
                     <li><strong>The Body:</strong> An optional block of data sent to the server. This is used for `POST` and `PUT` requests to send data, such as a JSON payload for an API or the contents of a form submission.</li>
                  </ol>
                  <p>This tool calculates the byte size of each of these text components to give you a total request size.</p>
              </section>
              <section>
                  <h3 className="font-bold text-xl">When Does Request Size Become a Bottleneck?</h3>
                  <p>While a few extra bytes in a single request on a fast broadband connection is negligible, request size becomes a critical factor in several scenarios:</p>
                  <ul className="list-disc pl-5">
                     <li><strong>Mobile Applications:</strong> On cellular networks, upload bandwidth is often limited and latency is high. Smaller requests lead to a snappier user experience and consume less of the user's data plan.</li>
                     <li><strong>IoT Devices:</strong> Internet of Things devices often operate on low-power, low-bandwidth networks (like LoRaWAN or NB-IoT). Every single byte counts, and minimizing request overhead is essential for battery life and data costs.</li>
                     <li><strong>High-Frequency APIs:</strong> For an application making thousands of API calls per minute, even a small reduction of 100 bytes per request can add up to significant bandwidth savings over time.</li>
                     <li><strong>Cookie Bloat:</strong> The most common cause of oversized requests is "cookie bloat," where too many or too large cookies are sent with every single request to a domain, including requests for images and CSS. This adds unnecessary overhead to every asset download.</li>
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
                        <li><strong>Audit Your Cookies:</strong> Use your browser's developer tools (Network tab) to inspect the headers of a request. Check the `Cookie` header. Are you sending unnecessary cookies with requests for static assets like images? Configure your server to set cookies only on specific paths.</li>
                        <li><strong>Minimize API Payloads:</strong> When designing a `POST` or `PUT` request, only send the data that has actually changed. Avoid sending the entire object back to the server if you only need to update a single field.</li>
                        <li><strong>Use Shorter URLs:</strong> While less impactful, using shorter, more concise URL paths and query parameter keys can shave off a few bytes from every request.</li>
                        <li><strong>Consider GET vs. POST:</strong> If you are only retrieving data, always use a `GET` request, which has no body and is more cacheable by intermediaries.</li>
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                     <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                </CardHeader>
                <CardContent>
                     <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                        <li><strong>Ignoring Header Size:</strong> Developers often focus only on the body (e.g., JSON payload) and forget that large headers, bloated with cookies or custom metadata, can sometimes be larger than the body itself.</li>
                        <li><strong>Using POST for GET Operations:</strong> Using a `POST` request to retrieve data just because it's easier to send a complex JSON query in the body. This is semantically incorrect and breaks caching mechanisms.</li>
                        <li><strong>Forgetting About URL Encoding:</strong> The URL length contributes to the request size. If your URL contains special characters, they will be percent-encoded, which can significantly increase the size (e.g., a space becomes `%20`).</li>
                        <li><strong>Not Using Compression:</strong> While this tool calculates uncompressed size, always ensure your server accepts compressed requests (e.g., `Content-Encoding: gzip`) and your client sends the `Accept-Encoding` header to receive compressed responses.</li>
                    </ul>
                </CardContent>
            </Card>
        </div>

        <section>
          <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
          <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Optimizing an IoT Device</h3>
                  <p className="text-sm text-muted-foreground">An engineer for an IoT device that reports sensor data over a cellular network uses this tool. They find their verbose JSON payload (`{"sensor_id": "temp-1", "value": 23.5}`) creates a 450-byte request. By switching to a compact binary format, they reduce the body size and total request to under 100 bytes, quadrupling battery life and cutting data costs.</p>
              </div>
               <div className="bg-card p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Debugging a "413 Payload Too Large" Error</h3>
                  <p className="text-sm text-muted-foreground">A developer is frustrated by a `413 Payload Too Large` error from their Nginx server when submitting a large form. By pasting the URL, headers, and form body into the calculator, they see the total request size is 1.1MB. This confirms the request is exceeding the server's default 1MB `client_max_body_size` limit, telling them exactly which setting to adjust.</p>
              </div>
               <div className="bg-card p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Improving Mobile App Performance</h3>
                  <p className="text-sm text-muted-foreground">A mobile app feels sluggish on cellular data. The developers analyze their API requests with this tool and discover that every request includes over 1.5KB of data in the `Cookie` header, carrying unnecessary marketing and analytics data. By optimizing their cookie scope, they cut the header size by 90%, making API calls feel noticeably faster for users on slow networks.</p>
              </div>
               <div className="bg-card p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Choosing a GraphQL vs. REST Approach</h3>
                  <p className="text-sm text-muted-foreground">A team is debating between a traditional REST API and GraphQL. They use the calculator to model a typical request. For REST, fetching user data requires a simple GET request of ~300 bytes. For GraphQL, the same request requires a POST with a JSON body, resulting in a ~650-byte request. While GraphQL offers flexibility, this calculation helps them understand the baseline overhead for every single query.</p>
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

        <section>
            <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link href="/tools/http-header-checker" className="block">
                    <Card className="hover:border-primary transition-colors h-full">
                        <CardHeader>
                            <CardTitle className="text-base flex items-center justify-between">HTTP Header Checker<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                            <CardDescription className="text-xs">Inspect the headers of a real HTTP request and response.</CardDescription>
                        </CardHeader>
                    </Card>
                </Link>
                <Link href="/tools/data-transfer-calculator" className="block">
                    <Card className="hover:border-primary transition-colors h-full">
                        <CardHeader>
                            <CardTitle className="text-base flex items-center justify-between">Data Transfer Time Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                            <CardDescription className="text-xs">Calculate how long it takes to send a request of this size over different network speeds.</CardDescription>
                        </CardHeader>
                    </Card>
                </Link>
                <Link href="/tools/url-encoder-decoder" className="block">
                    <Card className="hover:border-primary transition-colors h-full">
                        <CardHeader>
                            <CardTitle className="text-base flex items-center justify-between">URL Encoder/Decoder<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                            <CardDescription className="text-xs">See how special characters in your URL path affect its final size.</CardDescription>
                        </CardHeader>
                    </Card>
                </Link>
            </div>
        </section>
      </div>
    </>
  );
}
