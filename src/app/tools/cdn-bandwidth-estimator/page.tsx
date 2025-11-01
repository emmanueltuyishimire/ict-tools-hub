
import { PageHeader } from '@/components/page-header';
import { CdnBandwidthEstimator } from './cdn-bandwidth-estimator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { Lightbulb, AlertTriangle, BookOpen, ChevronRight, Wand } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
    title: 'CDN Bandwidth Estimator | ICT Toolbench',
    description: 'Estimate your monthly CDN and origin bandwidth usage. Plan your costs and understand the impact of your CDN cache hit ratio on performance and expenses.',
    openGraph: {
        title: 'CDN Bandwidth Estimator | ICT Toolbench',
        description: 'Calculate potential CDN bandwidth needs to optimize costs and server load.',
        url: '/tools/cdn-bandwidth-estimator',
    }
};

const faqData = [
    { question: "What is a CDN?", answer: "A CDN (Content Delivery Network) is a globally distributed network of proxy servers that caches content (like images, CSS, and JS files) closer to users. When a user requests your site, the content is served from a nearby CDN server instead of your origin server, resulting in dramatically faster load times." },
    { question: "What is 'bandwidth' in this context?", answer: "Bandwidth refers to the total amount of data transferred from a server to a user over a period, typically measured in Gigabytes (GB) or Terabytes (TB) per month. Both your origin server and your CDN provider will bill you based on this usage." },
    { question: "What is a 'cache hit ratio'?", answer: "The cache hit ratio is the percentage of requests that a CDN can fulfill directly from its cache without having to ask your origin server for the file. A high cache hit ratio (e.g., 95%) is desirable as it means the CDN is doing most of the work, saving you origin bandwidth costs and reducing load on your server." },
    { question: "Why is there a distinction between CDN and Origin bandwidth?", answer: "This is crucial for cost management. Origin bandwidth (data served from your main web host) is usually much more expensive than CDN bandwidth. Your goal is to maximize the cache hit ratio to shift as much data transfer as possible to the cheaper CDN network." },
    { question: "How can I improve my cache hit ratio?", answer: "To improve your hit ratio, ensure your server sends correct `Cache-Control` headers with long `max-age` values for static assets. This tells the CDN it can safely store and serve the file for a long time. Using consistent URLs and avoiding query strings for static content also helps." },
    { question: "Is this estimate accurate?", answer: "This tool provides a simplified, high-level estimate. Real-world bandwidth usage can be affected by many factors, including web crawlers, bot traffic, video streaming (which uses much more bandwidth), and file types (text compresses well, images do not). It's best used as a planning and educational tool." },
    { question: "What's a typical cache hit ratio?", answer: "For a well-configured site with mostly static content, a cache hit ratio of 90-98% is common. For sites with highly dynamic, personalized content, the ratio might be much lower, as many requests will need to be passed through to the origin server to generate a unique response." },
    { question: "How does this relate to page load time?", answer: "A higher cache hit ratio directly improves page load time. When content is served from a CDN cache, it travels a much shorter physical distance to the user, significantly reducing latency. You can see the impact of latency with our <a href='/tools/latency-estimator' class='text-primary hover:underline'>Latency Estimator</a>." },
];

const keyTerminologies = [
    { term: 'CDN (Content Delivery Network)', definition: 'A distributed network of servers that caches content close to users to accelerate delivery.' },
    { term: 'Origin Server', definition: 'Your primary web server where the original version of your website\'s files are stored.' },
    { term: 'Cache Hit Ratio', definition: 'The percentage of requests successfully served from the CDN cache without contacting the origin server.' },
    { term: 'Bandwidth', definition: 'The total amount of data transferred over a period, usually billed in GB or TB per month.' },
    { term: 'Edge Server', definition: 'An individual server within a CDN network, located at the "edge" of the internet, close to end-users.' },
];

const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Estimate CDN Bandwidth',
    description: 'A step-by-step guide to forecasting your website\'s bandwidth usage.',
    step: [
        { '@type': 'HowToStep', name: 'Enter Traffic Metrics', text: 'Input your average monthly visitors and the typical number of pages each visitor views per session.' },
        { '@type': 'HowToStep', name: 'Define Page Size', text: 'Enter the average size of a single page load on your site in kilobytes (KB). You can find this in your browser\'s developer tools on the "Network" tab.' },
        { '@type': 'HowToStep', name: 'Set Cache Hit Ratio', text: 'Adjust the slider to your expected cache hit ratio. This is the percentage of requests the CDN can handle without asking your main server. A well-optimized site often has a ratio of 90% or higher.' },
        { '@type': 'HowToStep', name: 'Estimate Bandwidth', text: 'Click the "Estimate Bandwidth" button to see the breakdown between CDN and origin usage.' },
    ],
    totalTime: 'PT1M'
};

export default function CdnBandwidthEstimatorPage() {
  return (
    <>
      <StructuredData data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqData.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer.replace(/<[^>]*>?/gm, '') } }))
      }} />
      <StructuredData data={howToSchema} />
      <PageHeader
        title="CDN Bandwidth Estimator"
        description="Estimate the monthly data transfer for your website to better forecast CDN and hosting costs. Understand the financial impact of your cache hit ratio."
      />
      
      <div className="max-w-4xl mx-auto space-y-12">
        <CdnBandwidthEstimator />

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use This Tool</h2>
          <Card className="prose prose-sm max-w-none text-foreground p-6">
              <p>This estimator helps you forecast your monthly bandwidth consumption, a key factor in web hosting and CDN costs.</p>
              <ol>
                  <li><strong>Enter Traffic Metrics:</strong> Input your average monthly visitors and the typical number of pages each visitor views per session.</li>
                  <li><strong>Define Page Size:</strong> Enter the average size of a single page load on your site in kilobytes (KB). You can find this in your browser's developer tools on the "Network" tab.</li>
                  <li><strong>Set Cache Hit Ratio:</strong> Adjust the slider to your expected cache hit ratio. This is the percentage of requests the CDN can handle without asking your main server. A well-optimized site often has a ratio of 90% or higher.</li>
                  <li><strong>Estimate Bandwidth:</strong> Click the "Estimate Bandwidth" button.</li>
                  <li><strong>Analyze the Results:</strong> The tool will show your total monthly data transfer, broken down into the portion served by the CDN and the more expensive portion served by your origin server.</li>
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
                    <CardTitle className="text-primary">Educational Deep Dive: The Economics of Content Delivery</CardTitle>
                </div>
                <CardDescription>Understand how a CDN works and why optimizing your cache hit ratio is one of the best things you can do for your budget and your users.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                <section>
                    <h3 className="font-bold text-xl">What is a CDN and Why Use One?</h3>
                    <p>
                        A Content Delivery Network (CDN) is a network of servers distributed across the globe. Its primary job is to store copies (a 'cache') of your website's static assets—like images, CSS, and JavaScript files—in locations that are physically closer to your users. When a user in Japan visits your website hosted in New York, a CDN allows them to download these assets from a server in Tokyo instead of from the origin server across the ocean. This drastically reduces latency and makes your site load much faster.
                    </p>
                </section>
                <section>
                    <h3 className="font-bold text-xl">The All-Important Cache Hit Ratio</h3>
                    <p>The "cache hit ratio" is the single most important metric for a CDN's effectiveness.
                        <ul className="list-disc pl-5">
                            <li>A **Cache HIT** means the CDN had the file in its local cache and served it directly to the user. This is fast and cheap.</li>
                            <li>A **Cache MISS** means the CDN did not have the file, so it had to forward the request to your origin server, wait for the file, and then send it to the user. This is slow and incurs costs on your primary web host.</li>
                        </ul>
                    The goal is to maximize the hit ratio. A 95% hit ratio means that for every 100 requests, 95 are handled by the fast, inexpensive CDN, and only 5 have to make the slow, expensive trip to your origin server. This tool helps you visualize the financial impact of improving that ratio.
                    </p>
                </section>
            </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <div className='flex items-center gap-2'><Wand className="h-6 w-6 text-accent" /> <CardTitle>Pro Tips for High Hit Ratios</CardTitle></div>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                        <li><strong>Use Long Cache-Control Headers:</strong> For static assets that rarely change (like logos, fonts), set a `Cache-Control: max-age` header of several months or even a year. This tells the CDN it's safe to cache the file for a long time.</li>
                        <li><strong>Avoid Query Strings for Static Assets:</strong> Many CDNs treat URLs with different query strings as unique files (e.g., `style.css?v=1` and `style.css?v=2` are cached separately). Use filename-based cache busting (`style.1.css`, `style.2.css`) instead.</li>
                        <li><strong>Serve the Right Headers:</strong> Ensure your server sends a `Vary: Accept-Encoding` header so the CDN caches Gzip and Brotli compressed assets separately.</li>
                        <li><strong>Pre-warm Your Cache:</strong> Some CDNs allow you to "pre-warm" the cache by providing a list of popular assets to load before any user requests them, ensuring a higher hit rate from the start.</li>
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                     <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes</CardTitle></div>
                </CardHeader>
                <CardContent>
                     <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                        <li><strong>Forgetting to Set Cache-Control:</strong> If you don't send caching headers, a CDN may refuse to cache your content at all, resulting in a 0% hit ratio and no performance benefit.</li>
                        <li><strong>Using a `*` Origin Policy:</strong> Setting a cross-origin `Access-Control-Allow-Origin: *` header can prevent some CDNs from caching your content for security reasons. Be specific where possible.</li>
                        <li><strong>Caching Dynamic Content:</strong> Accidentally caching personalized or dynamic HTML pages can lead to users seeing other users' information. Dynamic content should almost always be a cache MISS.</li>
                        <li><strong>Ignoring Analytics:</strong> Not monitoring your CDN's analytics panel. Your CDN provider gives you detailed reports on your cache hit ratio and bandwidth usage. Use this data to find and fix issues.</li>
                    </ul>
                </CardContent>
            </Card>
        </div>
        
        <section>
            <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Budgeting for a New Website Launch</h3>
                    <p className="text-sm text-muted-foreground">A startup expects 50,000 visitors in their first month, with each visiting about 3 pages. Their average page size is 2MB (2048 KB). By plugging these numbers in, they estimate their total data transfer will be about 300 GB. With an 85% cache hit ratio, they can forecast ~255 GB of cheap CDN bandwidth and ~45 GB of more expensive origin bandwidth, allowing them to choose the right hosting and CDN plans without overspending.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Justifying a Performance Audit</h3>
                    <p className="text-sm text-muted-foreground">A developer notices their hosting bill is unexpectedly high. They use the estimator with their site's traffic data and see that with their current 60% cache hit ratio, they are serving 400 GB from their origin server. They then adjust the slider to a target of 95%, showing that proper caching could reduce origin bandwidth to just 50 GB. This provides a clear, data-driven case to management to approve time for a performance and caching audit.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Planning for a Traffic Spike</h3>
                    <p className="text-sm text-muted-foreground">A news blog is about to publish a major story and expects traffic to increase 10x, from 100,000 visitors to 1,000,000. By using the estimator, they can see that even with a high 98% cache hit ratio, their origin bandwidth will increase from 2 GB to 20 GB. This allows them to proactively contact their host to ensure their plan can handle the temporary spike without the site going down.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Choosing a CDN Provider</h3>
                    <p className="text-sm text-muted-foreground">A developer is comparing two CDN providers. Provider A is slightly cheaper per GB but has fewer global locations. Provider B is more expensive but has more locations. The developer uses the estimator to calculate their total monthly CDN bandwidth (e.g., 500 GB). They can then model a lower cache hit ratio for Provider A (due to fewer locations) and a higher one for Provider B, helping them calculate the total cost for both scenarios and make an informed financial decision.</p>
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
                                <div dangerouslySetInnerHTML={{ __html: item.answer.replace(/<[^>]*>?/gm, '') }} />
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
