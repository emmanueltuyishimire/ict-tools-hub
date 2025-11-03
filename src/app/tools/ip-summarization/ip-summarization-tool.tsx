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

const keyTerminologies = [
    { term: 'Summarization (Aggregation)', definition: 'The process of combining multiple smaller, contiguous network routes into a single, larger summary route.' },
    { term: 'Supernet', definition: 'The single, larger network block that results from route summarization.' },
    { term: 'Contiguous Networks', definition: 'A set of networks that form a continuous, unbroken block of IP address space, making them ideal for summarization.' },
    { term: 'Routing Table', definition: 'A data table stored in a router that lists the routes to particular network destinations.' },
    { term: 'Route Flapping', definition: 'A situation where a route repeatedly appears and disappears in a routing table, which can cause network instability. Summarization helps contain this.' },
    { term: 'VLSM (Variable Length Subnet Masking)', definition: 'The technique of dividing a network into subnets of different sizes. Summarization is the reverse process.' },
];

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
        </div>
    );
}
