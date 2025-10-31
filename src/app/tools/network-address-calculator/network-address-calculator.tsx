
'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { StructuredData } from '@/components/structured-data';
import { Lightbulb, AlertCircle, Wand, AlertTriangle, BookOpen, ChevronRight, Copy, Check, Binary, Network } from 'lucide-react';
import Link from 'next/link';

// --- IP Math Logic ---
const longToIp = (long: number): string => {
    return `${(long >>> 24)}.${(long >> 16) & 255}.${(long >> 8) & 255}.${long & 255}`;
};

const ipToLong = (ip: string): number | null => {
    const parts = ip.split('.').map(part => parseInt(part, 10));
    if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) {
        return null;
    }
    return (parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3];
};

const cidrToMask = (cidr: number): string => {
    const mask = (0xFFFFFFFF << (32 - cidr)) >>> 0;
    return longToIp(mask);
};

// --- FAQ & Schema Data ---
const faqData = [
    { question: "What is a network address (or Network ID)?", answer: "The network address, also known as the Network ID, is the very first IP address in a subnet. It is used to identify the subnet itself within a larger network. It cannot be assigned to any individual device (host)." },
    { question: "How is the network address calculated?", answer: "The network address is calculated by performing a bitwise AND operation between any IP address in the subnet and the subnet mask. This operation effectively zeroes out all the 'host' bits of the IP address, leaving only the 'network' portion, which results in the first address of that subnet." },
    { question: "Why can't I assign the network address to a computer?", answer: "The network address is reserved for routing purposes. Routers use the network address in their routing tables to determine how to forward packets to the correct subnet. If it were assigned to a host, it would create ambiguity and break routing." },
    { question: "What is the difference between the network address and the broadcast address?", answer: "The network address is the *first* address in a subnet (all host bits are 0) and identifies the network. The broadcast address is the *last* address (all host bits are 1) and is used to send messages to all hosts on the network. Neither can be assigned to a device. You can find the latter using our <a href='/tools/broadcast-address-calculator' class='text-primary hover:underline'>Broadcast Address Calculator</a>." },
    { question: "Does every IP address have a network address?", answer: "Yes. Every IP address, when combined with a subnet mask, belongs to a specific subnet that is identified by a unique network address. This is a fundamental concept of IP networking." },
    { question: "If I have an IP and a mask, how does this tool find the network address?", answer: "This tool takes your IP address and subnet mask, converts both to their 32-bit binary forms, performs a logical AND operation between them, and then converts the resulting binary number back into a human-readable IP address format. This result is the network address." },
    { question: "What is the network address for a typical home network?", answer: "A typical home network uses the `192.168.1.0/24` range. The network address for this setup is `192.168.1.0`. The usable IPs for your devices would then start at `192.168.1.1`." },
    { question: "Can the network address be the same as the IP address I enter?", answer: "Yes, this can happen in two scenarios: 1) if the IP address you enter happens to be the network address itself (e.g., entering `192.168.1.0` with a `/24` mask), or 2) in a `/32` network, where there is only one IP address which acts as both the network address and the host address." },
    { question: "How does this relate to a router's routing table?", answer: "A routing table is a list of network addresses and instructions on how to reach them. When a router receives a packet, it looks at the destination IP, determines its network address using the routing table's subnet masks, and forwards the packet to the interface that leads to that network. The network address is the key piece of information in this process." },
    { question: "Does IPv6 have network addresses?", answer: "Yes, IPv6 also uses prefixes to define networks, similar to IPv4's CIDR notation. However, the concept of a specific reserved 'network address' with all host bits set to zero is not a strict requirement in the same way. The principles are similar, but the implementation details differ." },
];

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer.replace(/<[^>]*>?/gm, '') } })),
};

const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Calculate a Network Address (Network ID)',
    description: 'Find the network address for any IPv4 subnet using an IP address and its subnet mask.',
    step: [
        { '@type': 'HowToStep', name: 'Enter an IP Address', text: 'Input any IP address that belongs to the network you are analyzing (e.g., 172.16.50.100).' },
        { '@type': 'HowToStep', name: 'Select the Subnet Mask', text: 'Choose the correct subnet mask for the network from the CIDR dropdown list (e.g., /22).' },
        { '@type': 'HowToStep', name: 'Calculate', text: 'Click the "Calculate" button.' },
        { '@type': 'HowToStep', name: 'Review the Result', text: 'The tool will display the calculated Network Address (or Network ID) for that subnet. Use the copy button to save the result.' }
    ],
    totalTime: 'PT1M',
};

export function NetworkAddressCalculator() {
    const [ipAddress, setIpAddress] = useState('192.168.1.100');
    const [cidr, setCidr] = useState('24');
    const [error, setError] = useState('');
    const [results, setResults] = useState<any>(null);
    const resultRef = useRef<HTMLDivElement>(null);
    const [copiedKey, setCopiedKey] = useState<string | null>(null);

    const handleCalculate = () => {
        setError('');
        setResults(null);
        
        const ipLong = ipToLong(ipAddress);
        if (ipLong === null) {
            setError('Invalid IPv4 address format. Please enter a valid IP.');
            return;
        }

        const cidrNum = parseInt(cidr, 10);
        if (isNaN(cidrNum) || cidrNum < 0 || cidrNum > 32) {
            setError('Invalid CIDR prefix. Must be a number between 0 and 32.');
            return;
        }

        const maskLong = (0xFFFFFFFF << (32 - cidrNum)) >>> 0;
        const networkLong = (ipLong & maskLong) >>> 0;

        setResults({
            ip: ipAddress,
            cidr: cidrNum,
            subnetMask: longToIp(maskLong),
            networkId: longToIp(networkLong),
            binaryIp: (ipLong >>> 0).toString(2).padStart(32, '0').match(/.{1,8}/g)!.join('.'),
            binaryMask: (maskLong >>> 0).toString(2).padStart(32, '0').match(/.{1,8}/g)!.join('.'),
            binaryResult: (networkLong >>> 0).toString(2).padStart(32, '0').match(/.{1,8}/g)!.join('.')
        });
    };
    
    useEffect(() => {
        if(results && resultRef.current) {
            resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            resultRef.current.focus();
        }
    }, [results]);

    const handleCopyToClipboard = (key: string, value: string) => {
        navigator.clipboard.writeText(value).then(() => {
            setCopiedKey(key);
            setTimeout(() => setCopiedKey(null), 2000);
        });
    };

    const subnetMaskOptions = useMemo(() => {
        return Array.from({ length: 33 }, (_, i) => {
            const cidr = 32 - i;
            const mask = cidrToMask(cidr);
            return {
                value: cidr.toString(),
                label: `/${cidr} (${mask})`,
            };
        }).reverse();
    }, []);

    const renderResultRow = (label: string, key: string, value: any, isPrimary = false) => {
        if (value === undefined || value === null) return null;
        const displayValue = value.toString();
        
        return (
            <TableRow key={key} className={isPrimary ? 'bg-primary/10' : ''}>
                <TableHead className="font-semibold w-[180px]">{label}</TableHead>
                <TableCell className="font-code">
                    <div className="flex items-center justify-between gap-2">
                        <span>{displayValue}</span>
                        <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7"
                            onClick={() => handleCopyToClipboard(key, displayValue)}
                            aria-label={`Copy ${label}`}
                        >
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
                    <CardTitle>Network Address Calculator</CardTitle>
                    <CardDescription>
                        Enter an IPv4 address and a subnet mask to determine the network address (Network ID) for the subnet.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor="ip-address">IP Address</Label>
                            <Input
                                id="ip-address"
                                value={ipAddress}
                                onChange={(e) => setIpAddress(e.target.value)}
                                placeholder="e.g., 192.168.1.10"
                                className="font-code"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cidr-select">Subnet Mask (CIDR)</Label>
                             <Select value={cidr} onValueChange={setCidr}>
                                <SelectTrigger id="cidr-select">
                                    <SelectValue placeholder="Select a subnet mask" />
                                </SelectTrigger>
                                <SelectContent>
                                    {subnetMaskOptions.map(option => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <Button onClick={handleCalculate} className="w-full sm:w-auto">Calculate</Button>
                    {error && (
                        <Alert variant="destructive" role="alert">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                </CardContent>
            </Card>
            
            {results && (
                 <div ref={resultRef} tabIndex={-1} aria-live="polite">
                    <Card>
                        <CardHeader>
                            <CardTitle>Calculation Results</CardTitle>
                            <CardDescription>
                                Network ID details for {results.ip}/{results.cidr}.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                             <Table>
                                <TableBody>
                                    {renderResultRow('Network Address', 'networkId', results.networkId, true)}
                                    {renderResultRow('Input IP', 'ip', results.ip)}
                                    {renderResultRow('Subnet Mask', 'subnetMask', results.subnetMask)}
                                </TableBody>
                            </Table>
                            <Accordion type="single" collapsible className="w-full mt-4">
                                <AccordionItem value="binary">
                                    <AccordionTrigger>Show Binary Calculation</AccordionTrigger>
                                    <AccordionContent>
                                        <p className="text-sm text-muted-foreground mb-2">The network address is found by performing a bitwise AND operation between the IP address and the subnet mask.</p>
                                        <Table>
                                            <TableBody>
                                                {renderResultRow('IP Address', 'binaryIp', results.binaryIp)}
                                                {renderResultRow('Subnet Mask', 'binaryMask', results.binaryMask)}
                                                <TableRow className="border-t-2">
                                                    <TableHead className="font-semibold">Result (Network ID)</TableHead>
                                                    <TableCell className="font-code">{results.binaryResult}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardContent>
                    </Card>
                </div>
            )}

            <section>
                <h2 className="text-2xl font-bold mb-4">How to Use the Network Address Calculator</h2>
                <Card className="prose prose-sm max-w-none text-foreground p-6">
                    <p>This tool pinpoints the exact starting address of any IPv4 subnet, a critical piece of information for network routing and administration.</p>
                    <ol>
                        <li><strong>Enter an IP Address:</strong> Type any IP address that exists within the subnet you wish to analyze.</li>
                        <li><strong>Select the Subnet Mask:</strong> Choose the correct network mask for that subnet from the dropdown menu. The menu includes both the CIDR prefix (e.g., /24) and the full dot-decimal mask for clarity.</li>
                        <li><strong>Calculate:</strong> Click the "Calculate" button.</li>
                        <li><strong>Get the Result:</strong> The tool will instantly display the calculated Network Address (also known as the Network ID).</li>
                        <li><strong>View Binary Details (Optional):</strong> For a deeper understanding, you can expand the "Show Binary Calculation" section to see the bitwise AND operation that produces the result.</li>
                    </ol>
                     <Alert>
                        <Lightbulb className="h-4 w-4" />
                        <AlertTitle>Example</AlertTitle>
                        <AlertDescription>
                          If you enter the IP `10.20.30.40` with a `/28` mask, the calculator will perform the AND operation and determine that the network address for this specific subnet is `10.20.30.32`.
                        </AlertDescription>
                    </Alert>
                </Card>
            </section>

            <Card className='bg-secondary/30 border-primary/20'>
                <CardHeader>
                    <div className='flex items-center gap-2 text-primary'>
                        <BookOpen className="h-6 w-6" aria-hidden="true" />
                        <CardTitle className="text-primary">Educational Deep Dive: The Foundation of Routing</CardTitle>
                    </div>
                    <CardDescription>Explore what a network address is, how it's calculated, and its fundamental role in how data traverses networks.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                    <section>
                        <h3 className="font-bold text-xl">What is a Network Address? The Subnet's Unique Identifier</h3>
                        <p>In IPv4 networking, a <strong>network address</strong> (or Network ID) is the very first IP address in a subnet range. Its purpose is to serve as a unique identifier for the entire subnet. Think of it like a ZIP code. A ZIP code doesn't point to a single house, but to an entire neighborhood. Similarly, a network address doesn't identify a single computer, but the entire "digital neighborhood" or subnet where a group of devices resides.</p>
                        <p>This address is reserved and <strong>cannot be assigned to any individual host</strong> (like a computer, server, or printer). Its primary role is to be listed in routing tables. When a router needs to send a packet to an IP address, it uses its routing table to find which network that IP belongs to and then sends the packet in the right direction. The network address is the key that makes this entire system work.</p>
                    </section>
                    <section>
                        <h3 className="font-bold text-xl">The Bitwise AND: How the Calculation Works</h3>
                        <p>The magic behind finding the network address is a simple but powerful binary operation called a <strong>bitwise AND</strong>. To find the network ID, a device performs this operation on its own IP address and its subnet mask.</p>
                        <p>The rules for a bitwise AND are:</p>
                        <ul className="list-disc pl-5">
                           <li>1 AND 1 = 1</li>
                           <li>1 AND 0 = 0</li>
                           <li>0 AND 1 = 0</li>
                           <li>0 AND 0 = 0</li>
                        </ul>
                        <p>Essentially, the result is 1 only if <strong>both</strong> input bits are 1. Since a subnet mask is a continuous block of 1s followed by 0s, this operation has a specific effect: it preserves the network portion of the IP address (where the mask has 1s) and zeroes out the host portion (where the mask has 0s). The result is always the first address in the subnet. You can visualize this with our <Link href="/tools/ip-to-binary" className="text-primary hover:underline">IP to Binary Converter</Link>.</p>
                        <p><strong>Example: IP `192.168.1.174` with Mask `255.255.255.192` (/26)</strong></p>
                         <div className="overflow-x-auto my-4 text-sm font-code">
                            <pre className='p-4 bg-muted rounded-md'>
IP Address: 11000000.10101000.00000001.<span className="text-blue-500">10101110</span><br/>
Subnet Mask: 11111111.11111111.11111111.<span className="text-red-500">11000000</span><br/>
------------------------------------------------<br/>
Network ID:  11000000.10101000.00000001.<span className="text-green-500">10000000</span>  = 192.168.1.128
                            </pre>
                        </div>
                        <p>As you can see, where the mask's bits are `1` (the first 26 bits), the IP address's bits are copied down. Where the mask's bits are `0` (the last 6 bits), the resulting bits are forced to `0`. This gives us the network address `192.168.1.128`.</p>
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
                            <li><strong>"Magic Number" Trick:</strong> For masks that don't fall on an octet boundary (like /26), find the "interesting" octet (the one that isn't 255 or 0). Subtract its value from 256 to find the block size. For /26 (255.255.255.192), the block size is 256 - 192 = 64. This means network IDs will be multiples of 64: 0, 64, 128, 192. Find which block your IP falls into, and that's your network address.</li>
                            <li><strong>Route Summarization:</strong> Understanding network addresses is key to route summarization, where you can represent multiple smaller networks with a single larger network address, simplifying routing tables.</li>
                            <li><strong>Troubleshooting Tool:</strong> If two devices can't communicate, use this tool to check if they resolve to the same network address with the given subnet mask. If they don't, they are on different subnets and need a router to communicate.</li>
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                         <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                    </CardHeader>
                    <CardContent>
                         <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                            <li><strong>Confusing Network ID with Gateway:</strong> The network address identifies the network; it is not the gateway. The gateway is a specific, usable IP address within the subnet (often the first or last usable one) that devices use to send traffic to other networks.</li>
                            <li><strong>Incorrect Manual Calculation:</strong> Manually performing the bitwise AND operation is prone to error. Always use a reliable tool to verify your calculations when configuring production systems.</li>
                            <li><strong>Assuming the Network ID is Always `.0`:</strong> This is only true for `/8`, `/16`, and `/24` networks. For any other subnet size, the network ID can be a different number, as shown in the example above where it was `.128`.</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
            
            <section>
                <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Configuring a Router Interface</h3>
                        <p className="text-sm text-muted-foreground">An administrator is adding a new route to a router. The command requires the destination network address and its mask, not just any IP in that network. They are told the network contains the IP `172.25.84.99` and is a `/22`. They use the calculator to find the correct Network ID is `172.25.84.0`, which they then use to correctly configure the static route.</p>
                    </div>
                     <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Designing a Firewall Rule</h3>
                        <p className="text-sm text-muted-foreground">A security team needs to create a firewall rule to block all traffic from a known malicious subnet, `104.18.32.0/20`. The firewall requires the rule to be written using the network address. The team uses this tool to confirm `104.18.32.0` is indeed the correct network address for a /20 block, ensuring their rule will be effective.</p>
                    </div>
                     <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Troubleshooting DHCP Scopes</h3>
                        <p className="text-sm text-muted-foreground">A device is getting an IP address of `192.168.2.10` from a DHCP server. The technician suspects it's on the wrong VLAN. They use the Network Address Calculator with the device's IP and mask (`/24`) to find its network ID is `192.168.2.0`. This confirms the device is on the 'Sales' VLAN (`192.168.2.0/24`) instead of the intended 'Engineering' VLAN (`192.168.1.0/24`), allowing them to fix the switch port configuration.</p>
                    </div>
                     <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Network Documentation</h3>
                        <p className="text-sm text-muted-foreground">When creating network diagrams and documentation, it is standard practice to label each subnet with its network address and CIDR prefix (e.g., `10.1.10.0/24`). This tool is essential for accurately identifying and labeling these subnets, creating clear and professional documentation.</p>
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
                    <Link href="/tools/subnet-calculator" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">Subnet Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">Get the full picture, including the Network ID, Broadcast Address, and full host range.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                    <Link href="/tools/broadcast-address-calculator" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">Broadcast Address Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">Find the last address in a subnet, the counterpart to the Network Address.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                    <Link href="/tools/ip-to-binary" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">IP to Binary Converter<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">Visualize the bitwise AND operation that is used to calculate the network address.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                </div>
            </section>
        </div>
    );
}
