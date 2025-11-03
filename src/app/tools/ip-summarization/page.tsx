
import { PageHeader } from '@/components/page-header';
import { IpSummarizationTool } from './ip-summarization-tool';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { Lightbulb, AlertTriangle, BookOpen, ChevronRight, Wand } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const metadata = {
    title: 'IP Summarization Tool (Route Aggregator) | ICT Tools Hub',
    description: 'Calculate the optimal summary route (supernet) from a list of IP networks. Simplify your routing tables, improve network performance, and learn the principles of CIDR with our free tool.',
    openGraph: {
      title: 'IP Summarization Tool (Route Aggregator) | ICT Tools Hub',
      description: 'A powerful tool for network administrators to create efficient summary routes, reducing routing table size and improving network stability.',
      url: 'https://ict.calculation.site/tools/ip-summarization',
    }
};

export default function IpSummarizationPage() {
    const softwareAppSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "IP Summarization Tool",
      "operatingSystem": "All",
      "applicationCategory": "DeveloperApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "A free online tool to calculate the optimal summary route (supernet) from a list of contiguous IP networks in CIDR notation.",
      "url": "https://ict.calculation.site/tools/ip-summarization"
    };

    return (
        <>
            <StructuredData data={faqData.map(item => ({'@type': 'Question', name: item.question, acceptedAnswer: {'@type': 'Answer', text: item.answer.replace(/<[^>]*>?/gm, '')}}))} />
            <StructuredData data={howToSchema} />
            <StructuredData data={softwareAppSchema} />
            <div className="max-w-4xl mx-auto space-y-12">
                <PageHeader
                    title="IP Summarization Tool (Route Aggregation)"
                    description="Efficiently combine multiple IP network ranges into a single summary route. This tool helps you optimize routing tables, improve network performance, and simplify access control lists."
                />
                <IpSummarizationTool />

                <section>
                    <h2 className="text-2xl font-bold mb-4">How to Use the Summarization Tool</h2>
                    <Card className="prose prose-sm max-w-none text-foreground p-6">
                        <p>This tool automates the process of finding the most efficient summary route that encompasses a list of smaller networks.</p>
                        <ol>
                            <li><strong>Enter Your Networks:</strong> In the text area, list the network addresses you want to summarize. Each network must be on a new line and in CIDR notation (e.g., `192.168.0.0/24`).</li>
                            <li><strong>Calculate the Summary:</strong> Click the "Summarize Routes" button. The tool will analyze the list and find the shortest possible prefix that covers all the provided networks.</li>
                            <li><strong>Review the Summary Route:</strong> The results card will display the calculated "Summary Route" (or supernet). This is your single, aggregated route.</li>
                            <li><strong>Analyze the Details:</strong> The results also include the full address range of the summary route, the total number of hosts it contains, and the corresponding subnet and wildcard masks, which are useful for configuring routers and firewalls.</li>
                        </ol>
                        <Alert>
                            <Lightbulb className="h-4 w-4" />
                            <AlertTitle>Example</AlertTitle>
                            <AlertDescription>
                              Enter the two networks <code className="font-code bg-muted p-1 rounded-sm">10.10.0.0/24</code> and <code className="font-code bg-muted p-1 rounded-sm">10.10.1.0/24</code>. The tool will correctly summarize them into the single, more efficient route: <code className="font-code bg-muted p-1 rounded-sm">10.10.0.0/23</code>.
                            </AlertDescription>
                        </Alert>
                    </Card>
                </section>
                
                 <section>
                    <h2 className="text-2xl font-bold mb-4">Worked Example</h2>
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Summarizing Four Class C Networks</CardTitle>
                                <CardDescription>A common scenario where an organization wants to advertise its four public-facing networks as a single block.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                               <p className="text-sm text-muted-foreground"><strong>Scenario:</strong> A company owns four contiguous `/24` networks: `203.0.113.0/24`, `203.0.114.0/24`, `203.0.115.0/24`, and `203.0.116.0/24`. They want to advertise a single summary route to their ISP.</p>
                               <div className="prose prose-sm max-w-none">
                                   <ol>
                                       <li><strong>Input:</strong> The four networks are entered into the tool.</li>
                                       <li><strong>Binary Analysis:</strong> The tool converts the network addresses to binary and finds the longest common prefix.
                                            <ul className='text-xs font-code'>
                                                <li>203.0.113.0 → ...011100<span className="text-red-500">01</span>.0</li>
                                                <li>203.0.114.0 → ...011100<span className="text-red-500">10</span>.0</li>
                                                <li>203.0.115.0 → ...011100<span className="text-red-500">11</span>.0</li>
                                                <li>203.0.116.0 → ...011101<span className="text-red-500">00</span>.0</li>
                                            </ul>
                                            The tool finds that the first 22 bits are common to all addresses.
                                       </li>
                                       <li><strong>Result:</strong>
                                            <ul>
                                                <li>The new CIDR prefix is /22.</li>
                                                <li>The network address is the first address in the block: `203.0.112.0` (because `112` in binary is `01110000`, matching the common prefix).</li>
                                                <li>The final summary route is <strong>203.0.112.0/22</strong>.</li>
                                            </ul>
                                       </li>
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
                            <CardTitle className="text-primary">Educational Deep Dive: Taming the Internet's Routing Table</CardTitle>
                        </div>
                        <CardDescription>From CIDR to BGP, understand how route summarization is an essential technique for keeping the global internet fast and stable.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                        <section>
                            <h3>The Problem: Routing Table Bloat</h3>
                            <p>
                                The internet is a network of networks. Data travels from its source to its destination by being passed from one router to another. Each of these routers maintains a 'routing table'—a list of all known network destinations and the best path to reach them.
                            </p>
                            <p>
                                In the early days, if a company had 16 separate networks, it would advertise all 16 routes to the internet. As the internet grew exponentially, this became a massive problem. The global routing table was growing so fast that router memory and CPU power couldn't keep up. This led to a phenomenon called "routing table bloat," which threatened to slow the entire internet to a crawl.
                            </p>
                        </section>
                        <section>
                            <h3>The Solution: Supernetting</h3>
                            <p>
                                <strong>IP Summarization</strong> (also known as route aggregation or supernetting) was introduced along with <strong>CIDR (Classless Inter-Domain Routing)</strong> to solve this problem. Instead of advertising dozens of specific, small network routes, an organization can advertise a single, larger "summary route" or "supernet" that contains all of its smaller networks.
                            </p>
                            <p>
                                For example, instead of advertising `192.168.0.0/24` and `192.168.1.0/24` separately, an ISP can advertise the single summary route `192.168.0.0/23`. Any router on the internet now only needs one entry in its table to know how to reach any address in that entire block. This dramatically reduces the size of the global routing table and is a fundamental reason why the internet can scale to its current size. The same principle applies within a large corporate network to simplify routing between different sites or departments.
                            </p>
                        </section>
                         <section>
                            <h3>The Power of Contiguous Blocks</h3>
                            <p>
                                Summarization is most effective when the networks being summarized are <strong>contiguous</strong>—meaning they form a single, unbroken block of IP addresses. This requires careful upfront planning when allocating IP addresses, a process made easier by tools like our <Link href="/tools/vlsm-calculator" className='text-primary hover:underline'>VLSM Calculator</Link>. By allocating subnets sequentially from largest to smallest, you can ensure they can be efficiently summarized later.
                            </p>
                        </section>
                    </CardContent>
                </Card>
                
                <section>
                    <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">BGP Route Advertising</h3>
                            <p className="text-sm text-muted-foreground">An enterprise has been assigned a `/22` block of public IP addresses. They use VLSM to divide this block into many smaller subnets for different services. When configuring their edge router to peer with their ISP using BGP (Border Gateway Protocol), they don't advertise all the small internal routes. Instead, they advertise a single summary route for their entire `/22` block, simplifying the ISP's routing table and hiding their internal network structure.</p>
                        </div>
                        <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Simplifying Firewall ACLs</h3>
                            <p className="text-sm text-muted-foreground">A security administrator needs to write a rule to allow access from four separate but contiguous server subnets (`10.1.4.0/24` through `10.1.7.0/24`). Instead of writing four separate rules, they use the summarization tool to find the summary route (`10.1.4.0/22`). They can now write a single, more efficient ACL entry that covers all four subnets.</p>
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
                                <li><strong>Plan Ahead:</strong> Design your IP addressing scheme with summarization in mind. Allocate contiguous blocks to departments or regions to make future aggregation possible.</li>
                                <li><strong>Summarize at Boundaries:</strong> Apply summarization at logical network boundaries, such as between a corporate campus and the internet, or between different areas of a large WAN.</li>
                                <li><strong>Verify with Binary:</strong> When in doubt, convert the start and end addresses of your range to binary to visually see the common prefix. Our <Link href="/tools/ip-to-binary" className='text-primary hover:underline'>IP to Binary converter</Link> is perfect for this.</li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                             <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes</CardTitle></div>
                        </CardHeader>
                        <CardContent>
                             <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                                <li><strong>Summarizing Non-Contiguous Networks:</strong> This is a major error. Summarizing `10.1.1.0/24` and `10.1.5.0/24` will result in a summary that also includes the networks in between (`.2.0`, `.3.0`, `.4.0`), which you may not own, potentially leading to misdirected traffic.</li>
                                <li><strong>Incorrect CIDR Calculation:</strong> Manually calculating the summary prefix can be error-prone. A mistake of one bit can make the summary route too large or too small.</li>
                                <li><strong>Leaking Specific Routes:</strong> Forgetting to apply a route filter after configuring a summary route. This can lead to both the summary route and the more specific routes being advertised, defeating the purpose of summarization.</li>
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
                      <Link href="/tools/vlsm-calculator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">VLSM Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Perform the reverse of summarization: break a large network down into smaller, variable-sized subnets.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                      <Link href="/tools/subnet-calculator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Subnet Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Analyze the properties of any single network, including the ones you are summarizing.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                      <Link href="/tools/cidr-to-wildcard" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">CIDR to Wildcard Converter<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Find the correct wildcard mask for your new summary route to use in firewall ACLs.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                  </div>
              </section>
            </div>
        </>
    );
}
