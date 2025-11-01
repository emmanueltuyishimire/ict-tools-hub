
import { PageHeader } from '@/components/page-header';
import { WebpageLoadTimeEstimator } from './load-time-estimator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { Lightbulb, AlertTriangle, BookOpen, ChevronRight, Wand } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
    title: 'Webpage Load Time Estimator | ICT Toolbench',
    description: 'Estimate your webpage\'s load time based on page size, number of requests, and network conditions. A crucial tool for web performance optimization (WPO) and SEO.',
    openGraph: {
        title: 'Webpage Load Time Estimator | ICT Toolbench',
        description: 'Understand how page size, assets, and network speed impact your website\'s load time. A key tool for improving user experience and search rankings.',
        url: '/tools/load-time-estimator',
    }
};

const faqData = [
    { question: "What is webpage load time?", answer: "Webpage load time is the total time it takes from when you click a link or type a URL to when the entire page is fully loaded and interactive in your browser. It includes network time (DNS, connection, download) and browser time (parsing, rendering)." },
    { question: "Why is load time important?", answer: "Load time is a critical factor for user experience and SEO. A slow-loading site frustrates users, leading to higher bounce rates and lower conversions. Search engines like Google use page speed as a significant ranking factor, penalizing slow websites." },
    { question: "What is the difference between this estimator and a real speed test tool (like PageSpeed Insights)?", answer: "This tool provides a *theoretical estimate* based on the raw numbers you provide (size, requests, speed). It's great for understanding the impact of changes, like 'What if I reduce my image size by 500KB?'. Real speed test tools actually load your site in a real browser, measuring the actual performance and considering complex factors like browser rendering, JavaScript execution, and server-side processing." },
    { question: "Why does the number of requests matter?", answer: "Every single file on your page (CSS, JS, images, fonts) requires a separate HTTP request. Each request adds overhead and is affected by network latency. Even if the files are small, a large number of requests can significantly slow down your page load time, especially on mobile networks where latency is higher. Modern protocols like HTTP/2 and HTTP/3 mitigate this but don't eliminate it." },
    { question: "What is a 'good' load time?", answer: "Generally, aiming for a load time under 2-3 seconds is a good goal. For e-commerce, under 2 seconds is often cited as ideal. Anything over 5 seconds is considered slow and likely to have a negative impact on user engagement." },
    { question: "How does latency affect load time?", answer: "Latency (or ping) is the delay for a data packet to travel to the server and back. This delay occurs for every single request. On a high-latency connection (like mobile or satellite), a page with many small requests will be very slow, even if the connection has high bandwidth. You can learn more with our <a href='/tools/latency-estimator' class='text-primary hover:underline'>Latency Estimator</a>." },
    { question: "How can I reduce my page size?", answer: "The most effective ways are: compressing images (using formats like WebP), minifying HTML, CSS, and JavaScript (removing unnecessary characters), and enabling Gzip or Brotli compression on your web server. Our <a href='/tools/code-minifier' class='text-primary hover:underline'>Code Minifier</a> can help with this." },
    { question: "How can I reduce the number of requests?", answer: "You can reduce requests by combining CSS and JavaScript files into single bundles (a standard practice in modern web development), using CSS sprites for images, and inlining critical CSS directly into your HTML." },
    { question: "Does this tool account for caching?", answer: "No. This calculator assumes a 'first-time' or 'empty cache' visit. On subsequent visits, a browser will have many resources (like CSS, JS, and logos) cached locally, making the load time much faster as it doesn't need to re-download those files." },
    { question: "Why is there a separate field for the HTML document?", answer: "The HTML document is the first file downloaded and is critical because it contains the instructions for what other resources (CSS, JS, images) the browser needs to fetch. Its download time is a key part of the 'Time to First Byte' (TTFB) and initial render process." }
];

const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Estimate Webpage Load Time',
    description: 'A step-by-step guide to estimating your website\'s theoretical load time.',
    step: [
        { '@type': 'HowToStep', name: 'Enter Page Details', text: 'Input the size of your page components: HTML document, total size of all CSS files, total size of all JavaScript files, and total size of all images.' },
        { '@type': 'HowToStep', name: 'Enter Network Conditions', text: 'Specify the user\'s network connection speed (in Mbps) and the round-trip latency (ping) to the server (in ms).' },
        { '@type': 'HowToStep', name: 'Enter Resource Count', text: 'Input the total number of individual resources the page needs to load (HTML + CSS files + JS files + images + fonts, etc.).' },
        { '@type': 'HowToStep', name: 'Estimate Load Time', text: 'Click the "Estimate Load Time" button to see the calculated theoretical load time based on your inputs.' },
    ],
    totalTime: 'PT2M'
};

const keyTerminologies = [
    { term: 'Page Load Time', definition: 'The total time it takes for a web page to download all its resources and become fully interactive for the user.' },
    { term: 'Page Size', definition: 'The total file size of all resources on a web page, including HTML, CSS, JavaScript, images, and fonts.' },
    { term: 'HTTP Requests', definition: 'Each file a browser needs to load (HTML, CSS, JS, image) requires a separate HTTP request to the server.' },
    { term: 'Latency (Ping)', definition: 'The round-trip time it takes for a data packet to travel from the client to the server and back. High latency significantly slows down pages with many requests.' },
    { term: 'Bandwidth', definition: 'The maximum data transfer rate of a network connection, typically measured in megabits per second (Mbps).' },
    { term: 'Rendering', definition: 'The process by which a web browser takes the downloaded HTML, CSS, and JavaScript and turns it into a visible, interactive webpage.' },
];

export default function WebpageLoadTimeEstimatorPage() {
  return (
    <>
      <StructuredData data={faqData.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer.replace(/<[^>]*>?/gm, '') } }))} />
      <StructuredData data={howToSchema} />
      <PageHeader
        title="Webpage Load Time Estimator"
        description="Estimate a webpage's theoretical load time based on its size, number of requests, and network conditions. A crucial tool for understanding and improving web performance."
      />
      
      <div className="max-w-4xl mx-auto space-y-12">
        <WebpageLoadTimeEstimator />

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use This Tool</h2>
          <Card className="prose prose-sm max-w-none text-foreground p-6">
              <p>This tool provides a theoretical estimate of your page load time, helping you understand how different components contribute to the total. It simulates a simplified loading process.</p>
              <ol>
                  <li><strong>Enter Page Size Details:</strong> Break down your page's total weight into its core components: HTML, CSS, JavaScript, and Images. You can use your browser's developer tools (Network tab) to get these numbers for an existing page.</li>
                  <li><strong>Define Network Conditions:</strong> Set the user's internet connection speed (Bandwidth) and the network delay (Latency or Ping). Common values for a good broadband connection are 100 Mbps and 20 ms. For mobile, try 20 Mbps and 80 ms.</li>
                  <li><strong>Count Your Resources:</strong> Enter the total number of individual files the browser needs to fetch (the HTML document itself, plus all CSS files, JS files, images, fonts, etc.).</li>
                  <li><strong>Estimate Your Load Time:</strong> Click the "Estimate Load Time" button. The result is a theoretical best-case load time based on the data you provided.</li>
              </ol>
               <Alert>
                  <Lightbulb className="h-4 w-4" />
                  <AlertTitle>Example Scenario</AlertTitle>
                  <AlertDescription>
                    Imagine you have a 2MB page with 50 resources. This tool can instantly show you how that page might perform on a fast broadband connection (e.g., ~1.2 seconds) versus a slower 3G mobile connection (e.g., ~5-6 seconds), highlighting the importance of mobile optimization.
                  </AlertDescription>
              </Alert>
          </Card>
        </section>

        <section>
           <h2 className="text-2xl font-bold mb-4">Key Terminologies</h2>
           <Card>
              <CardContent className="p-6">
                  <dl className="space-y-4">
                      {keyTerminologies.map((item) => (
                          <div key={item.term}>
                              <strong>{item.term}</strong>
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
                  <CardTitle className="text-primary">Educational Deep Dive: The Anatomy of Page Load</CardTitle>
              </div>
              <CardDescription>From the first byte to a fully interactive page, understand the critical path that determines how fast your website feels to users.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
              <section>
                  <h3 className="font-bold text-xl">It's Not Just About Download Speed</h3>
                  <p>
                    A common misconception is that page load time is simply the total page size divided by the connection speed. The reality is far more complex. A website's loading process is a sequence of steps, and many things can create a bottleneck. Our estimator models a simplified version of this, factoring in the two most important components: **Bandwidth** (speed) and **Latency** (delay).
                  </p>
                  <ul className="list-disc pl-5">
                    <li><strong>Bandwidth:</strong> This is your connection's capacity, determining how quickly you can download the file data itself. A 5MB page will naturally download faster on a 100 Mbps connection than on a 10 Mbps connection. You can explore this with our <Link href="/tools/data-transfer-calculator" className="text-primary hover:underline">Data Transfer Time Calculator</Link>.</li>
                    <li><strong>Latency:</strong> This is the round-trip delay for every request. Before your browser can download a single file, it must send a request to the server and wait for a response. This delay, often called 'ping', happens for *every single resource* on your page. A page with 100 small images will feel very slow on a high-latency satellite connection, even if the bandwidth is high.</li>
                  </ul>
              </section>
              <section>
                  <h3 className="font-bold text-xl">The Critical Rendering Path</h3>
                  <p>Browsers don't just download everything at once. They follow a sequence called the Critical Rendering Path to display the page as fast as possible.</p>
                  <ol className="list-decimal pl-5">
                     <li><strong>Fetch HTML:</strong> The browser first downloads the main HTML document.</li>
                     <li><strong>Build the DOM:</strong> It parses the HTML to build the Document Object Model (DOM), a tree-like structure of the page's content.</li>
                     <li><strong>Fetch CSS and JS:</strong> As it parses the HTML, it discovers references to CSS and JavaScript files and begins downloading them.</li>
                     <li><strong>Build the CSSOM:</strong> The browser parses the CSS to build the CSS Object Model (CSSOM), a tree of styles.</li>
                     <li><strong>Execute JavaScript:</strong> JavaScript can modify both the DOM and CSSOM, so the browser often has to pause rendering to execute scripts. This is why render-blocking JavaScript is a major performance killer.</li>
                     <li><strong>Render the Page:</strong> Finally, the browser combines the DOM and CSSOM to create the Render Tree, which it then uses to paint the pixels on the screen.</li>
                  </ol>
                  <p>
                    This tool simplifies this process into two main parts: the initial download time and the added latency for each subsequent request. By providing a theoretical baseline, it helps you appreciate how optimizing each part of this chain can lead to significant improvements in real-world performance.
                  </p>
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
                                    <div dangerouslySetInnerHTML={{ __html: item.answer.replace(/<a href='([^']*)' class='[^']*'>/g, "<a href='$1' class='text-primary hover:underline'>") }} />
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
