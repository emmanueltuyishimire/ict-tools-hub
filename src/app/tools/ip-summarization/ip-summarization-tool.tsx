
'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { StructuredData } from '@/components/structured-data';
import { Lightbulb, AlertCircle, Wand, AlertTriangle, BookOpen, ChevronRight, Copy, Check, Binary, Network, Combine, ListRestart } from 'lucide-react';
import Link from 'next/link';
import { Textarea } from '@/components/ui/textarea';

const ipToLong = (ip: string): number | null => {
    const parts = ip.split('.').map(part => parseInt(part, 10));
    if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) return null;
    return (parts[0] << 24 | parts[1] << 16 | parts[2] << 8 | parts[3]) >>> 0;
};

const longToIp = (long: number): string => {
    return `${(long >>> 24)}.${(long >> 16) & 255}.${(long >> 8) & 255}.${long & 255}`;
};

const faqData = [
    { question: "What is IP summarization?", answer: "IP summarization, also known as route aggregation or supernetting, is the process of combining multiple smaller, contiguous IP network routes into a single, more general route. This single 'summary route' represents the entire range of the smaller networks, allowing routers to reduce the size and complexity of their routing tables." },
    { question: "Why is route summarization important?", answer: "Its primary importance is in improving router performance and network scalability. Routers have finite memory and CPU resources. A smaller routing table is faster to search, consumes less memory, and reduces CPU load. On the global internet, summarization is essential for preventing routing tables from growing to an unmanageable size. It also helps to contain routing updates, improving network stability." },
    { question: "How does this tool calculate the summary route?", answer: "The tool first converts all input network addresses into their binary form. It then finds the longest common binary prefix shared by all the addresses in the range. The length of this common prefix becomes the new CIDR for the summary route, and the common prefix itself (padded with zeros) becomes the new network address." },
    { question: "What does 'contiguous' mean in this context?", answer: "For summarization to be effective and accurate, the input networks should be contiguous, meaning they form a continuous, unbroken block of IP address space. For example, `192.168.0.0/24` and `192.168.1.0/24` are contiguous. This tool will still calculate a summary for non-contiguous networks, but it will be less efficient and cover a larger range than necessary, which might include networks you don't own." },
    { question: "What is a 'supernet'?", answer: "A supernet is the result of route summarization. It is a single network block that is larger than any of the individual networks it represents. For example, combining four `/24` networks creates one `/22` supernet." },
    { question: "Is a smaller CIDR prefix a larger or smaller network?", answer: "A smaller CIDR number represents a larger network. For example, a `/22` network is four times larger than a `/24` network because it has fewer network bits and more host bits." },
    { question: "Can I summarize any list of networks?", answer: "You can, but it's only truly efficient if the networks are contiguous and properly aligned on binary boundaries. Summarizing random, non-contiguous networks (e.g., `10.0.1.0/24` and `192.168.1.0/24`) will result in a very large summary route (like `/1` or `/0`) that covers almost the entire internet, which is not useful for practical routing." },
    { question: "How does this relate to VLSM?", answer: "VLSM (Variable Length Subnet Masking) and route summarization are two sides of the same coin. VLSM is the process of breaking a large network block down into smaller, custom-sized subnets. Summarization is the reverse process: taking those smaller subnets and aggregating them back up into a single route for advertisement to other parts of the network." },
    { question: "When should I summarize my routes?", answer: "You should summarize routes at the boundaries of your network. For example, when advertising your company's internal networks to your ISP, you should send a single summary route instead of dozens of specific internal routes. This hides your internal network complexity and simplifies the ISP's routing table." },
    { question: "Does this tool work with IPv6?", answer: "No, this calculator is designed for IPv4 only. IPv6 uses a similar concept of summarization, but the 128-bit address length and hexadecimal notation require a different set of tools and calculations." }
];


const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer.replace(/<[^>]*>?/gm, '') } })),
};

const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Summarize IP Networks',
    description: 'A step-by-step guide to calculating the optimal summary route for a list of IP networks.',
    step: [
        { '@type': 'HowToStep', name: 'Enter Network List', text: 'In the text area, enter the list of IP networks you want to summarize, one per line, using CIDR notation (e.g., 192.168.0.0/24).' },
        { '@type': 'HowToStep', name: 'Calculate Summary', text: 'Click the "Summarize Routes" button.' },
        { '@type': 'HowToStep', name: 'Review the Optimal Route', text: 'The tool will display the calculated summary route, including its network address and CIDR prefix, which represents the smallest possible network that contains all your input networks.' },
        { '@type': 'HowToStep', name: 'Analyze Details', text: 'The results will also show the full address range of the summary route, the total number of hosts it contains, and its subnet and wildcard masks for use in configurations.' }
    ],
    totalTime: 'PT1M',
};

export function IpSummarizationTool() {
    const [networkList, setNetworkList] = useState('192.168.0.0/24\n192.168.1.0/24\n192.168.2.0/24\n192.168.3.0/24');
    const [results, setResults] = useState<any>(null);
    const [error, setError] = useState('');
    const resultRef = useRef<HTMLDivElement>(null);
    const [copiedKey, setCopiedKey] = useState<string | null>(null);

    const handleCalculate = () => {
        setError('');
        setResults(null);

        const lines = networkList.trim().split('\n').filter(line => line.trim() !== '');
        if (lines.length < 2) {
            setError('Please enter at least two networks to summarize.');
            return;
        }

        const networks = lines.map(line => {
            const [ip, cidrStr] = line.split('/');
            if (!ip || !cidrStr) return null;
            const cidr = parseInt(cidrStr, 10);
            const ipLong = ipToLong(ip);
            if (ipLong === null || isNaN(cidr) || cidr < 0 || cidr > 32) return null;

            const mask = (0xFFFFFFFF << (32 - cidr)) >>> 0;
            const networkAddress = ipLong & mask;
            const broadcastAddress = networkAddress | ~mask;

            return { networkAddress, broadcastAddress };
        });

        if (networks.some(n => n === null)) {
            setError('One or more networks are in an invalid CIDR format. Please check your input.');
            return;
        }

        const validNetworks = networks as { networkAddress: number, broadcastAddress: number }[];
        
        const minIp = Math.min(...validNetworks.map(n => n.networkAddress));
        const maxIp = Math.max(...validNetworks.map(n => n.broadcastAddress));

        if (minIp === maxIp) { // This case shouldn't happen with CIDR < 32 but as a safeguard.
            setResults({
                summaryRoute: `${longToIp(minIp)}/32`,
                networkAddress: longToIp(minIp),
                cidr: 32,
                firstIp: longToIp(minIp),
                lastIp: longToIp(minIp),
                totalHosts: 1,
                subnetMask: '255.255.255.255',
                wildcardMask: '0.0.0.0'
            });
            return;
        }

        let summaryCidr = 32;
        while (summaryCidr > 0) {
            const mask = (0xFFFFFFFF << (32 - (summaryCidr - 1))) >>> 0;
            const networkStart = minIp & mask;
            const broadcastEnd = networkStart | ~mask;

            if (minIp >= networkStart && maxIp <= broadcastEnd) {
                summaryCidr--;
            } else {
                break;
            }
        }
        
        const finalMask = (0xFFFFFFFF << (32 - summaryCidr)) >>> 0;
        const finalNetworkAddress = minIp & finalMask;
        
        const totalHosts = Math.pow(2, 32 - summaryCidr);

        setResults({
            summaryRoute: `${longToIp(finalNetworkAddress)}/${summaryCidr}`,
            networkAddress: longToIp(finalNetworkAddress),
            cidr: summaryCidr,
            firstIp: longToIp(finalNetworkAddress),
            lastIp: longToIp(finalNetworkAddress + totalHosts - 1),
            totalHosts: totalHosts,
            subnetMask: longToIp(finalMask),
            wildcardMask: longToIp(~finalMask >>> 0),
        });
    };

    useEffect(() => {
        if(results && resultRef.current) {
            resultRef.current.focus();
        }
    }, [results]);

    const handleCopyToClipboard = (key: string, value: string) => {
        navigator.clipboard.writeText(value).then(() => {
            setCopiedKey(key);
            setTimeout(() => setCopiedKey(null), 2000);
        });
    };

    const renderResultRow = (label: string, key: string, value: any) => {
        if (value === undefined || value === null) return null;
        const displayValue = typeof value === 'number' ? value.toLocaleString() : value.toString();
        return (
            <TableRow key={key}>
                <TableHead className="font-semibold w-[180px]">{label}</TableHead>
                <TableCell className="font-code">
                    <div className="flex items-center justify-between gap-2">
                        <span>{displayValue}</span>
                        <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => handleCopyToClipboard(key, displayValue)} aria-label={`Copy ${label}`}>
                            {copiedKey === key ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                        </Button>
                    </div>
                </TableCell>
            </TableRow>
        );
    };

    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <StructuredData data={faqSchema} />
            <StructuredData data={howToSchema} />
            <Card>
                <CardHeader>
                    <CardTitle>IP Summarization Tool</CardTitle>
                    <CardDescription>Enter a list of IP networks (one per line) to calculate the summary route.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="network-list">Networks (one per line in CIDR format)</Label>
                        <Textarea
                            id="network-list"
                            value={networkList}
                            onChange={(e) => setNetworkList(e.target.value)}
                            className="font-code h-40"
                            placeholder="e.g.,&#10;192.168.0.0/24&#10;192.168.1.0/24"
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <Button onClick={handleCalculate} className="w-full sm:w-auto"><Combine className="mr-2 h-4 w-4" /> Summarize Routes</Button>
                        <Button onClick={() => { setNetworkList(''); setResults(null); setError(''); }} variant="outline" className="w-full sm:w-auto"><ListRestart className="mr-2 h-4 w-4" /> Clear</Button>
                    </div>
                     {error && (
                        <Alert variant="destructive" role="alert">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Calculation Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                </CardContent>
            </Card>

            {results && (
                 <div ref={resultRef} tabIndex={-1} aria-live="polite">
                    <Card>
                        <CardHeader>
                            <CardTitle>Summarization Results</CardTitle>
                            <CardDescription>The optimal summary route for the provided networks.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableBody>
                                    {renderResultRow('Summary Route', 'summaryRoute', results.summaryRoute)}
                                    {renderResultRow('Network Address', 'networkAddress', results.networkAddress)}
                                    {renderResultRow('Address Range', 'range', `${results.firstIp} - ${results.lastIp}`)}
                                    {renderResultRow('Total Hosts', 'totalHosts', results.totalHosts)}
                                    {renderResultRow('Subnet Mask', 'subnetMask', results.subnetMask)}
                                    {renderResultRow('Wildcard Mask', 'wildcardMask', results.wildcardMask)}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            )}
            
            <section>
                <h2 className="text-2xl font-bold mb-4">How to Use the IP Summarization Tool</h2>
                <Card className="prose prose-sm max-w-none text-foreground p-6">
                    <p>This tool simplifies the process of route aggregation by calculating the most efficient summary route that covers a list of individual IP networks.</p>
                    <ol>
                        <li><strong>Enter Your Networks:</strong> In the text area, type or paste the list of IP networks you want to summarize. Each network must be on a new line and in CIDR notation (e.g., <strong>10.1.0.0/24</strong>).</li>
                        <li><strong>Summarize Routes:</strong> Click the "Summarize Routes" button.</li>
                        <li><strong>Analyze the Results:</strong> The tool will display a results card with the optimal summary route. This includes:
                            <ul>
                                <li><strong>Summary Route:</strong> The final aggregated route in CIDR notation. This is the value you would use in a routing table.</li>
                                <li><strong>Network Address:</strong> The first IP address of the summary block.</li>
                                <li><strong>Address Range:</strong> The full range of IPs covered by the summary route.</li>
                                <li><strong>Total Hosts:</strong> The total number of IP addresses contained within the summary route.</li>
                                <li><strong>Subnet & Wildcard Masks:</strong> The corresponding masks for the summary route, useful for various configurations.</li>
                            </ul>
                        </li>
                    </ol>
                    <Alert>
                        <Lightbulb className="h-4 w-4" />
                        <strong>Example:</strong>
                        <AlertDescription>
                            If you enter the four contiguous networks `192.168.0.0/24`, `192.168.1.0/24`, `192.168.2.0/24`, and `192.168.3.0/24`, the tool will correctly summarize them into a single, more efficient route: `192.168.0.0/22`.
                        </AlertDescription>
                    </Alert>
                </Card>
            </section>
            
            <Card className='bg-secondary/30 border-primary/20'>
                <CardHeader>
                    <div className='flex items-center gap-2 text-primary'>
                        <BookOpen className="h-6 w-6" aria-hidden="true" />
                        <CardTitle className="text-primary">Educational Deep Dive: Mastering Route Summarization</CardTitle>
                    </div>
                    <CardDescription>From shrinking routing tables to improving network stability, understand the power of route aggregation.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                    <section>
                        <h3 className="font-bold text-xl">What is Route Summarization (Supernetting)?</h3>
                        <p>Route summarization, also known as route aggregation or supernetting, is a core networking technique used to reduce the number of routes in a routing table. It works by combining multiple, contiguous smaller network blocks into a single, larger network advertisement. This single summary route (or "supernet") represents the entire collection of smaller networks, allowing routers to make forwarding decisions with less information.</p>
                        <p>Imagine a postal service. Instead of having a separate mailbag for every single street in a city, a post office might have one large bag labeled with just the city's ZIP code. Route summarization is the networking equivalent of this. Instead of a router knowing about every single small subnet within a large organization, it only needs to know about one summary route that points to the main gateway for that organization.</p>
                    </section>
                    <section>
                        <h3 className="font-bold text-xl">The Binary Math Behind Summarization</h3>
                        <p>Summarization works by finding the longest common binary prefix among a set of network addresses. The length of this common prefix determines the new, smaller CIDR prefix for the summary route.</p>
                        <p>Let's summarize two networks: <strong>192.168.0.0/24</strong> and <strong>192.168.1.0/24</strong>.</p>
                        <ol className="list-decimal pl-5 space-y-2">
                           <li><strong>Convert to Binary:</strong> We only need to focus on the octets that are different. The first two (`192.168`) are the same. The third octet is different.
                                <ul>
                                    <li>`0` in binary is <strong>00000000</strong></li>
                                    <li>`1` in binary is <strong>00000001</strong></li>
                                </ul>
                           </li>
                           <li>
                                <strong>Find the Common Prefix:</strong> Compare the binary strings to see how many bits from the left match before they differ.
                                <div className="overflow-x-auto my-4 text-sm font-code">
                                    <pre className='p-4 bg-muted rounded-md'>
192.168.0.x = ...<span className="text-blue-500">0000000</span>0...
192.168.1.x = ...<span className="text-blue-500">0000000</span>1...
                                    </pre>
                                </div>
                               The first 7 bits of the third octet are identical.
                           </li>
                           <li><strong>Calculate the New CIDR:</strong> The first two octets were already common, giving us 16 bits. We add the 7 common bits we just found from the third octet. 16 + 7 = <strong>23 bits</strong>. So, the new summary CIDR is /23.</li>
                           <li><strong>Determine the Network Address:</strong> The new network address is the common binary prefix, padded with zeros for the remaining host bits. The common prefix for the third octet is `0000000`, so the new third octet is `00000000`, which is 0.
                           <p>The resulting summary route is <strong>192.168.0.0/23</strong>. This single route covers all addresses from 192.168.0.0 to 192.168.1.255, perfectly encompassing both original networks.</p>
                           </li>
                        </ol>
                    </section>
                    <section>
                        <h3 className="font-bold text-xl">Why Summarization is Crucial</h3>
                         <ul className="list-disc pl-5">
                            <li><strong>Smaller Routing Tables:</strong> This is the primary benefit. A router with 10 routes in its table is faster and uses less memory than a router with 10,000 routes. On the internet's backbone, where routers handle hundreds of thousands of routes, this is absolutely critical.</li>
                            <li><strong>Improved Router Performance:</strong> Searching a smaller table takes less CPU time, making the router more efficient and reducing latency.</li>
                            <li><strong>Increased Network Stability:</strong> Summarization helps to "hide" network instability. If a small internal subnet (e.g., `10.1.5.0/24`) is flapping (going up and down), only the local router needs to know. Routers in other parts of the network, which only have a summary route (e.g., `10.1.0.0/16`), are unaffected. This containment of routing updates prevents instability from propagating across the entire network.</li>
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
                            <li><strong>Summarize at Boundaries:</strong> Only summarize routes at logical network boundaries, such as between a corporate network and an ISP, or between major departments in a large enterprise. Don't summarize within a small local network, as you need specific routes to get to each subnet.</li>
                            <li><strong>Contiguous Blocks are Key:</strong> For summarization to be efficient, your IP addressing plan must be hierarchical and use contiguous blocks. This requires careful planning with a tool like our <Link href="/tools/vlsm-calculator" className="text-primary hover:underline">VLSM Calculator</Link>.</li>
                            <li><strong>Check for Inefficiency:</strong> If the calculator gives you a very large summary route (e.g., a /8 for a few /24s), it's a sign that your input networks are not contiguous and cannot be efficiently summarized.</li>
                            <li><strong>Avoid Summarizing into `0.0.0.0/0`:</strong> Summarizing non-contiguous networks from different parts of the internet will likely result in the default route `0.0.0.0/0`, which is not a useful summary. The goal is to create the *smallest possible* supernet.</li>
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                         <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                    </CardHeader>
                    <CardContent>
                         <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                            <li><strong>Incorrect Binary Calculation:</strong> A single mistake in converting to binary or finding the common prefix will lead to a completely wrong summary route. Always use a tool to verify.</li>
                            <li><strong>Summarizing Too Aggressively:</strong> Creating a summary route that is too broad can lead to routing loops or black holes, where traffic is sent to the wrong place because the summary route overlaps with networks that exist elsewhere.</li>
                            <li><strong>Breaking Contiguity:</strong> If you have `192.168.0.0/24` and `192.168.2.0/24`, you cannot summarize them into `192.168.0.0/23`, because that summary would also include `192.168.1.0/24`, which you may not own or control.</li>
                            <li><strong>Forgetting Host Bits:</strong> Confusing the network prefix with the host bits can lead to incorrect CIDR calculations. Remember, the CIDR prefix is the number of common network bits, not the host bits.</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>

            <section>
                <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Enterprise to ISP Routing</h3>
                        <p className="text-sm text-muted-foreground">A large company uses the entire `10.20.0.0/16` block for its internal network, divided into hundreds of smaller subnets. When configuring its connection to the internet, instead of advertising all 500 internal routes to its ISP, the network engineer advertises a single summary route: `10.20.0.0/16`. This vastly simplifies the ISP's routing table and hides the company's internal network topology.</p>
                    </div>
                     <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Simplifying Router Configuration</h3>
                        <p className="text-sm text-muted-foreground">A campus network has four buildings, using the contiguous blocks `172.16.4.0/24`, `172.16.5.0/24`, `172.16.6.0/24`, and `172.16.7.0/24`. To direct traffic to these buildings from the core router, instead of adding four separate static routes, the administrator uses this tool to find the summary route (`172.16.4.0/22`) and adds only one static route, making the configuration cleaner and more efficient.</p>
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
                <h2 className="text-2xl font-bold mb-4">Related Tools & Articles</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Link href="/tools/vlsm-calculator" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">VLSM Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">Plan the subnets that you will later summarize. The perfect companion tool for hierarchical network design.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                    <Link href="/tools/subnet-calculator" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">Subnet Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">Analyze any of the individual subnets before or after summarization.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                    <Link href="/tools/ip-to-binary" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">IP to Binary Converter<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">Visualize the binary comparison that is at the heart of the summarization algorithm.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                </div>
            </section>
        </div>
    );
}

    