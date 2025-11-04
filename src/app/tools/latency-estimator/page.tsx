
import { PageHeader } from '@/components/page-header';
import { LatencyEstimator } from './latency-estimator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BookOpen, AlertTriangle, Wand, ChevronRight, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const metadata = {
    title: 'Ping / Latency Estimator | Calculate Network Latency | ICT Toolbench',
    description: 'Estimate the theoretical best-case network latency (ping) between two points on Earth based on the speed of light in fiber optic cables. Learn how distance impacts response time.',
    openGraph: {
        title: 'Ping / Latency Estimator | Calculate Network Latency | ICT Toolbench',
        description: 'Understand the physical limits of network speed by calculating the theoretical minimum latency between major cities worldwide. An essential tool for network planning.',
        url: '/tools/latency-estimator',
    }
};

const LatencyEstimatorPage = () => {
    const softwareAppSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Ping / Latency Estimator",
      "operatingSystem": "All",
      "applicationCategory": "DeveloperApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "An educational tool to estimate the theoretical minimum network latency (ping) between two geographic locations based on the speed of light in fiber optic cables.",
      "url": "https://www.icttoolbench.com/tools/latency-estimator"
    };
    
    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqData.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer.replace(/<[^>]*>?/gm, '') } })),
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
            <PageHeader
                title="Ping / Latency Estimator"
                description="Calculate the theoretical minimum round-trip time (RTT) between any two locations based on the speed of light. This tool helps you understand the physical limits of network speed, a critical factor in application performance."
            />
            
            <div className="max-w-4xl mx-auto space-y-12">
                <LatencyEstimator />

                <section>
                  <h2 className="text-2xl font-bold mb-4">How to Use This Tool</h2>
                  <Card className="prose prose-sm max-w-none text-foreground p-6">
                      <p>This latency estimator provides a best-case calculation for network ping, governed by the laws of physics.</p>
                      <ol>
                          <li><strong>Select Locations:</strong> Choose a starting point ("Location A") and a destination ("Location B") from the dropdown lists. You can also use the presets for common routes.</li>
                          <li><strong>Estimate Latency:</strong> Click the "Estimate Latency" button.</li>
                          <li><strong>Analyze the Results:</strong> The tool calculates two key figures:
                              <ul>
                                <li><strong>Great-Circle Distance:</strong> The shortest possible distance between the two points on the Earth's surface.</li>
                                <li><strong>Theoretical Best RTT (Ping):</strong> The minimum time, in milliseconds, for a data packet to make a round trip, assuming it travels through fiber optic cable at about 2/3 the speed of light.</li>
                              </ul>
                          </li>
                      </ol>
                       <Alert>
                          <AlertTriangle className="h-4 w-4" />
                          <AlertTitle>This is a Theoretical Minimum</AlertTitle>
                          <AlertDescription>
                            Your actual, real-world ping will always be higher than this estimate due to router hops, network congestion, and server processing delays. This tool shows the hard limit imposed by physics.
                          </AlertDescription>
                      </Alert>
                  </Card>
                </section>
                
                <section>
                    <h2 className="text-2xl font-bold mb-4">Worked Examples</h2>
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Example 1: US Coast-to-Coast Gaming</CardTitle>
                                <CardDescription>A gamer in New York wants to play on a server hosted in Los Angeles.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-muted-foreground"><strong>Scenario:</strong> You need to understand the best possible ping between New York and Los Angeles to see if a competitive gaming experience is feasible.</p>
                                <div className="prose prose-sm max-w-none">
                                    <ol>
                                        <li><strong>Inputs:</strong> Location A: `New York, USA`, Location B: `Los Angeles, USA`.</li>
                                        <li><strong>Calculation:</strong> The tool calculates the great-circle distance (approx. 3,940 km) and the round-trip travel time through fiber.</li>
                                        <li><strong>Result:</strong> The theoretical best RTT is ~<strong>39 ms</strong>. The gamer's actual ping will likely be in the 60-80ms range after factoring in network routing. This is acceptable for most online games, but they may still be at a slight disadvantage compared to players on the West Coast.</li>
                                    </ol>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Example 2: Deploying a Global Application</CardTitle>
                                <CardDescription>A developer in London is building an app for users in Sydney, Australia, and needs to understand the latency impact.</CardDescription>
                            </CardHeader>
                             <CardContent className="space-y-4">
                               <p className="text-sm text-muted-foreground"><strong>Scenario:</strong> A developer hosts their server in London and wants to estimate the best-case response time for a user in Sydney.</p>
                               <div className="prose prose-sm max-w-none">
                                   <ol>
                                       <li><strong>Inputs:</strong> Location A: `London, UK`, Location B: `Sydney, Australia`.</li>
                                       <li><strong>Calculation:</strong> The tool calculates the massive distance (approx. 17,000 km).</li>
                                       <li><strong>Result:</strong> The theoretical best RTT is ~<strong>170 ms</strong>. This tells the developer that even before any server processing, a user in Sydney will experience at least 170ms of delay on every single request. This provides a powerful data point to justify using a Content Delivery Network (CDN) or deploying a second server in the Asia-Pacific region to better serve those users. You can use our <Link href="/tools/response-time-calculator" className="text-primary hover:underline">Response Time Calculator</Link> to see how this latency contributes to total response time.</li>
                                   </ol>
                               </div>
                            </CardContent>
                        </Card>
                    </div>
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
                            <CardTitle className="text-primary">Educational Deep Dive: Latency vs. Bandwidth</CardTitle>
                        </div>
                        <CardDescription>From a garden hose to a fire hose, understand the critical difference between the speed of your connection and its capacity.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                        <section>
                            <h3>The Two Pillars of Network Speed</h3>
                            <p>
                                When we talk about how "fast" an internet connection is, we are often confusing two separate but equally important metrics: <strong>Latency</strong> and <strong>Bandwidth</strong>.
                            </p>
                             <ul className="list-disc pl-5">
                                <li><strong>Latency (or Ping):</strong> This is the time it takes for a single bit of data to travel from its source to its destination and back. It's a measure of <strong>delay</strong>, often dictated by physical distance.</li>
                                <li><strong>Bandwidth (or Throughput):</strong> This is the maximum amount of data that can be transferred over the connection in a given amount of time. It's a measure of <strong>capacity</strong>.</li>
                             </ul>
                            <p>The best analogy is water pipes. Latency is how long it takes for the first drop of water to travel from the reservoir to your tap. Bandwidth is the width of the pipe—how much water can flow through it per second. A very thin pipe (low bandwidth) means it will take a long time to fill a bucket, even if the water starts flowing instantly (low latency). A very wide pipe (high bandwidth) can fill a bucket quickly, but if the reservoir is miles away (high latency), you'll still have to wait a while for the water to start flowing at all.</p>
                        </section>
                        <section>
                            <h3>Why Latency is Ruled by Physics</h3>
                            <p>
                                This tool calculates the theoretical minimum latency. Why theoretical? Because it is governed by the speed of light. Data on the internet travels as light pulses through fiber optic cables. The speed of light in a vacuum is the universe's ultimate speed limit, approximately 299,792 km/s. When light travels through glass fiber, it slows down to about two-thirds of this speed, roughly 200,000 km/s.
                            </p>
                             <p>
                                The round-trip time (RTT) is the time for a packet to go from A to B and back to A. Therefore, the absolute minimum latency between any two points on Earth is `(Distance / Speed of Light in Fiber) * 2`. This physical limit cannot be broken.
                            </p>
                             <p>
                                Your real-world latency is always higher because data doesn't travel in a perfectly straight line. It zig-zags across the globe through dozens of routers and switches. Each of these "hops" adds a tiny processing delay, and any congestion along the path adds more. The value from this calculator is the 'speed limit' that reality can only approach.
                            </p>
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
                                <li><strong>Choose Your Servers Wisely:</strong> When playing online games or connecting to a remote desktop, always choose a server that is geographically closest to you to minimize latency.</li>
                                <li><strong>Use a CDN:</strong> A Content Delivery Network (CDN) is the most effective way to reduce latency for a global audience. It caches your website's content on servers around the world, so a user in Japan gets data from a server in Tokyo, not New York.</li>
                                <li><strong>Wired is Better Than Wireless:</strong> A wired Ethernet connection will almost always have lower latency and less jitter than a Wi-Fi connection, which is susceptible to interference.</li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                             <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Misconceptions</CardTitle></div>
                        </CardHeader>
                        <CardContent>
                             <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                                <li><strong>"High bandwidth means low latency":</strong> False. You can have a 1 Gbps fiber connection (very high bandwidth) but still have high latency if you are connecting to a server on the other side of the world.</li>
                                <li><strong>"Ping is the only thing that matters":</strong> While critical for gaming, for downloading large files, bandwidth is more important. Our <Link href="/tools/data-transfer-calculator" className="text-primary hover:underline">Data Transfer Time Calculator</Link> can illustrate this.</li>
                                <li><strong>"All fiber is low latency":</strong> While fiber optic technology provides the lowest possible latency, the final ping is still determined by the physical distance and the efficiency of the provider's network routing.</li>
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
            </div>
        </>
    );
};
