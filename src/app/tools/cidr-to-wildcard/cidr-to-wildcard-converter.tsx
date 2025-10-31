
'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { StructuredData } from '@/components/structured-data';
import { Lightbulb, AlertCircle, Wand, AlertTriangle, BookOpen, ChevronRight, Copy, Check, Binary, Network, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// --- IP Math Logic ---
const longToIp = (long: number): string => {
    if (long < 0) long += 4294967296; // Handle negative numbers from bitwise NOT
    return `${(long >>> 24)}.${(long >> 16) & 255}.${(long >> 8) & 255}.${long & 255}`;
};

const cidrToMaskLong = (cidr: number): number => {
    if (cidr === 0) return 0;
    return (0xFFFFFFFF << (32 - cidr)) >>> 0;
};

// --- FAQ & Schema Data ---
const faqData = [
    { question: "What is a wildcard mask?", answer: "A wildcard mask is a 32-bit quantity used in networking, primarily in Access Control Lists (ACLs), to specify a range of IP addresses. It is essentially an inverted subnet mask. Where a subnet mask has a '1' to represent the network portion, a wildcard mask has a '0' to indicate the bits that must match." },
    { question: "How is a wildcard mask different from a subnet mask?", answer: "A subnet mask divides an IP address into network and host portions (1s for network, 0s for host). A wildcard mask tells a router which bits of an IP address to check. A '0' in the wildcard mask means 'this bit must match,' and a '1' means 'I don't care about this bit.'" },
    { question: "Where are wildcard masks used?", answer: "Their most common use is in defining rules on routers and firewalls, especially in Cisco's IOS. Access Control Lists (ACLs) and some routing protocols like OSPF use wildcard masks to identify which networks the rule or protocol should apply to." },
    { question: "How do you calculate a wildcard mask from a CIDR prefix?", answer: "First, convert the CIDR to its subnet mask (e.g., /24 is 255.255.255.0). Then, subtract the subnet mask from 255.255.255.255. For example, 255.255.255.255 - 255.255.255.0 = 0.0.0.255. This is the wildcard mask." },
    { question: "Why do I need a special tool for this?", answer: "While the calculation is simple for common masks like /24, it becomes more tedious and error-prone for non-standard masks like /22 (255.255.252.0) or /29 (255.255.255.248). This tool eliminates manual calculation errors and provides instant, accurate results." },
    { question: "What does a wildcard mask of `0.0.0.0` mean?", answer: "A wildcard mask of `0.0.0.0` means that every single bit of the IP address must match exactly. This is used to specify a single host. The ACL rule `permit ip host 1.2.3.4` is often a shortcut for `permit ip 1.2.3.4 0.0.0.0`." },
    { question: "What does a wildcard mask of `255.255.255.255` mean?", answer: "This wildcard mask means that no bits need to match; it effectively means 'any' IP address. The ACL rule `permit ip any` is often a shortcut for `permit ip 0.0.0.0 255.255.255.255`." },
    { question: "Can a wildcard mask be something other than an inverted subnet mask?", answer: "Yes, in advanced ACL configurations, you can use non-contiguous wildcard masks to match complex patterns (e.g., only even or odd numbered hosts in a subnet), but this is rare and complex. For most networking tasks, the wildcard mask is always the direct inverse of the subnet mask." },
    { question: "Is this tool for IPv4 or IPv6?", answer: "This tool is for IPv4 only. IPv6 uses prefix lengths in its ACLs and does not use the concept of a 32-bit wildcard mask." },
    { question: "How does the wildcard mask `0.0.0.255` match an entire `/24` subnet?", answer: "Let's say your ACL rule is for `192.168.1.0 0.0.0.255`. The `0.0.0` part means the first three octets must match `192.168.1`. The `.255` part means the last octet can be any value (0-255). This perfectly matches all addresses from `192.168.1.0` to `192.168.1.255`, which is the entire /24 subnet." }
];

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer.replace(/<[^>]*>?/gm, '') } })),
};

const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Convert CIDR to a Wildcard Mask',
    description: 'A step-by-step guide to finding the wildcard mask equivalent of a CIDR prefix.',
    step: [
        { '@type': 'HowToStep', name: 'Select CIDR Prefix', text: 'Choose the CIDR prefix (e.g., /24) you want to convert from the dropdown menu.' },
        { '@type': 'HowToStep', name: 'Review Instant Results', text: 'The tool automatically calculates and displays the corresponding Subnet Mask and Wildcard Mask.' },
        { '@type': 'HowToStep', name: 'Analyze Binary Details', text: 'For a deeper understanding, the tool also shows the full 32-bit binary representation of both the subnet mask and the wildcard mask, illustrating their inverse relationship.' },
        { '@type': 'HowToStep', name: 'Copy Information', text: 'Use the copy buttons to easily copy the wildcard mask or other details for use in your configurations.' }
    ],
    totalTime: 'PT1M',
};

// --- Component ---
export function CidrToWildcardConverter() {
    const [cidr, setCidr] = useState('24');
    const [copiedKey, setCopiedKey] = useState<string | null>(null);

    const results = useMemo(() => {
        const cidrNum = parseInt(cidr, 10);
        if (isNaN(cidrNum) || cidrNum < 0 || cidrNum > 32) {
            return null;
        }
        
        const maskLong = cidrToMaskLong(cidrNum);
        const wildcardLong = ~maskLong;

        return {
            cidr: cidrNum,
            subnetMask: longToIp(maskLong),
            wildcardMask: longToIp(wildcardLong),
            binarySubnet: (maskLong >>> 0).toString(2).padStart(32, '0').match(/.{1,8}/g)!.join('.'),
            binaryWildcard: (wildcardLong >>> 0).toString(2).padStart(32, '0').match(/.{1,8}/g)!.join('.'),
        }
    }, [cidr]);

    const handleCopyToClipboard = (key: string, value: string) => {
        if (!value) return;
        navigator.clipboard.writeText(value).then(() => {
            setCopiedKey(key);
            setTimeout(() => setCopiedKey(null), 2000);
        });
    };

    const cidrOptions = useMemo(() => {
        return Array.from({ length: 33 }, (_, i) => {
            const cidrVal = 32 - i;
            return { value: cidrVal.toString(), label: `/${cidrVal}` };
        }).reverse();
    }, []);

    const renderResultRow = (label: string, key: string, value: any) => {
        if (value === undefined || value === null) return null;
        const displayValue = value.toString();
        return (
            <TableRow key={key}>
                <TableHead className="font-semibold w-[150px]">{label}</TableHead>
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
                    <CardTitle>CIDR to Wildcard Mask Converter</CardTitle>
                    <CardDescription>Instantly convert a CIDR prefix to its corresponding subnet mask and wildcard mask formats.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="cidr-select">CIDR Prefix</Label>
                        <Select value={cidr} onValueChange={setCidr}>
                            <SelectTrigger id="cidr-select" className="w-full sm:w-[280px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {cidrOptions.map(option => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {results && (
                        <Card className="bg-muted/50">
                            <CardHeader>
                                <CardTitle className="text-lg">Conversion Results</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableBody>
                                        {renderResultRow('Subnet Mask', 'subnetMask', results.subnetMask)}
                                        {renderResultRow('Wildcard Mask', 'wildcardMask', results.wildcardMask)}
                                        {renderResultRow('Binary Subnet', 'binarySubnet', results.binarySubnet)}
                                        {renderResultRow('Binary Wildcard', 'binaryWildcard', results.binaryWildcard)}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    )}
                </CardContent>
            </Card>

            <section>
                <h2 className="text-2xl font-bold mb-4">How to Use the Converter</h2>
                <Card className="prose prose-sm max-w-none text-foreground p-6">
                    <p>This tool is designed for network professionals who need to quickly translate between CIDR prefixes and the wildcard masks used in router or firewall configurations.</p>
                    <ol>
                        <li><strong>Select a CIDR Prefix:</strong> Use the dropdown menu to choose the CIDR prefix you need to convert (e.g., /24, /29, /22).</li>
                        <li><strong>Review the Instant Results:</strong> As soon as you make a selection, the results are calculated and displayed in the "Conversion Results" card.</li>
                        <li><strong>Find the Wildcard Mask:</strong> The primary result, the "Wildcard Mask", is shown clearly. This is the value you'll typically use in an Access Control List (ACL).</li>
                        <li><strong>Understand the Relationship:</strong> The tool also shows the standard "Subnet Mask" and the binary representations of both masks, allowing you to see their inverse relationship at a glance.</li>
                        <li><strong>Copy for Use:</strong> Click the copy icon next to any result to copy it to your clipboard, ready for pasting into a configuration file or terminal.</li>
                    </ol>
                    <Alert>
                        <Lightbulb className="h-4 w-4" />
                        <AlertTitle>Example</AlertTitle>
                        <AlertDescription>
                          You need to write a firewall rule for the subnet `10.1.2.0/27`. Select `/27` from the dropdown. The tool instantly shows you the wildcard mask is `0.0.0.31`. Your ACL rule would then be something like: `permit ip 10.1.2.0 0.0.0.31 any`.
                        </AlertDescription>
                    </Alert>
                </Card>
            </section>
            
            <Card className='bg-secondary/30 border-primary/20'>
                <CardHeader>
                    <div className='flex items-center gap-2 text-primary'>
                        <BookOpen className="h-6 w-6" aria-hidden="true" />
                        <CardTitle className="text-primary">Educational Deep Dive: The Role of the Wildcard Mask</CardTitle>
                    </div>
                    <CardDescription>From ACLs to routing protocols, understand why this "inverted mask" is a critical tool in a network engineer's arsenal.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                    <section>
                        <h3 className="font-bold text-xl">What is a Wildcard Mask?</h3>
                        <p>A wildcard mask is a 32-bit number used to tell a network device which bits of an IP address it should pay attention to and which bits it should ignore. It is most famously used in Access Control Lists (ACLs) on Cisco routers and firewalls, as well as in some routing protocols like OSPF.</p>
                        <p>The logic of a wildcard mask is the exact opposite of a subnet mask. In its binary form:</p>
                        <ul>
                            <li>A `0` bit means: "The corresponding bit in the IP address being checked <strong>must match</strong> the bit in the IP address in my rule."</li>
                            <li>A `1` bit means: "I <strong>do not care</strong> about the corresponding bit in the IP address being checked. It can be a 0 or a 1."</li>
                        </ul>
                        <p>Because of this inverse logic, a wildcard mask is often called an "inverse mask."</p>
                    </section>
                    <section>
                        <h3 className="font-bold text-xl">Wildcard Mask vs. Subnet Mask</h3>
                        <p>Let's compare how a subnet mask and a wildcard mask for a /24 network (`255.255.255.0`) are used to interpret the IP address `192.168.1.50`.</p>
                        <div className="grid md:grid-cols-2 gap-4 my-4 text-sm">
                            <div className="bg-muted p-4 rounded-lg">
                                <strong>Subnet Mask: 255.255.255.0</strong>
                                <p className='font-code'>11111111.11111111.11111111.00000000</p>
                                <p><strong>Interpretation:</strong> The first 24 bits (`192.168.1`) identify the network. The last 8 bits (`.50`) identify the host on that network.</p>
                            </div>
                            <div className="bg-muted p-4 rounded-lg">
                                <strong>Wildcard Mask: 0.0.0.255</strong>
                                <p className='font-code'>00000000.00000000.00000000.11111111</p>
                                <p><strong>Interpretation in an ACL rule for `192.168.1.0`:</strong > The first 24 bits must match `192.168.1` exactly. The last 8 bits can be anything. This rule will match any IP from `192.168.1.0` to `192.168.1.255`.</p>
                            </div>
                        </div>
                        <p>The subnet mask is used for addressing and routing, while the wildcard mask is used for matching and filtering. This tool helps you quickly find the wildcard mask needed for a given CIDR prefix, which you can then use in our <Link href="/tools/firewall-simulator" className="text-primary hover:underline">Firewall Rule Simulator</Link> to test your ACL logic.</p>
                    </section>
                     <section>
                        <h3 className="font-bold text-xl">The Calculation</h3>
                        <p>The simplest way to calculate a standard wildcard mask is to subtract the subnet mask from `255.255.255.255`. This works because it flips every bit: a 1 becomes a 0, and a 0 becomes a 1.</p>
                        <p><strong>Example for /29 (Subnet Mask: 255.255.255.248)</strong></p>
                        <div className="overflow-x-auto my-4 text-sm font-code">
                            <pre className='p-4 bg-muted rounded-md'>
  255.  255.  255.  255
- 255.  255.  255.  248
--------------------
    0 .   0 .   0 .   7
                            </pre>
                        </div>
                        <p>So, the wildcard mask for a /29 network is `0.0.0.7`. An ACL rule like `permit ip 10.10.10.8 0.0.0.7` would match the IP range 10.10.10.8 to 10.10.10.15. You can verify this range with our <Link href="/tools/subnet-calculator" className="text-primary hover:underline">Subnet Calculator</Link>.</p>
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
                            <li><strong>Shortcut for Host Masks:</strong> To match a single host, the wildcard mask is always `0.0.0.0`. In Cisco IOS, you can use the `host` keyword as a shortcut, e.g., `permit ip host 1.2.3.4`.</li>
                            <li><strong>Shortcut for 'Any' IP:</strong> To match any IP address, the wildcard mask is `255.255.255.255`. The shortcut in Cisco IOS is the `any` keyword, e.g., `permit ip any any`.</li>
                            <li><strong>Mental Math:</strong> The wildcard mask's last non-zero octet is always one less than the block size of the subnet. A /29 subnet has a block size of 8 (2^(32-29)), so its wildcard mask is 7 (0-7). A /26 has a block size of 64, so its wildcard mask is 63.</li>
                            <li><strong>Non-Standard Wildcards:</strong> You can create complex rules with non-contiguous wildcard masks. For example, a wildcard of `0.0.0.254` could match only odd-numbered hosts in a /24 subnet. This is an advanced technique and should be used with extreme caution.</li>
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                         <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                    </CardHeader>
                    <CardContent>
                         <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                            <li><strong>Using a Subnet Mask in an ACL:</strong> The most common error. If an ACL asks for a wildcard mask and you provide a subnet mask, the rule will not work as intended and may block or permit the wrong traffic.</li>
                            <li><strong>Incorrect Inverse Calculation:</strong> A manual calculation error when subtracting from 255 can lead to an incorrect wildcard mask, causing hours of troubleshooting. Always use a tool to verify.</li>
                            <li><strong>Forgetting the "Match 0" Rule:</strong> Remembering that '0' means 'match' and '1' means 'ignore' is counter-intuitive at first. This is the opposite of how a subnet mask works and requires a mental shift.</li>
                            <li><strong>Mismatched IP and Wildcard:</strong> The IP address in an ACL rule must be the network address of the range you intend to match. Using a random host IP from the middle of the range with a wildcard mask can lead to unexpected behavior.</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
            
            <section>
                <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Securing a Server Subnet</h3>
                        <p className="text-sm text-muted-foreground">An administrator wants to create a firewall rule that allows the monitoring server at `10.0.1.100` to access the entire server subnet, which is `10.0.50.0/24`. They use this converter to find that the wildcard for `/24` is `0.0.0.255`. The final ACL entry is: `access-list 101 permit tcp host 10.0.1.100 10.0.50.0 0.0.0.255 eq 443`.</p>
                    </div>
                     <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Configuring an OSPF Routing Process</h3>
                        <p className="text-sm text-muted-foreground">A network engineer is configuring the OSPF routing protocol on a router. They need to specify which of the router's interfaces should participate in OSPF. To enable OSPF on all interfaces within the `172.16.0.0/16` range, they use the `network` command. They convert `/16` to its wildcard mask, `0.0.255.255`, and configure the command: `network 172.16.0.0 0.0.255.255 area 0`.</p>
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
                                    <AccordionContent>{item.answer}</AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>
            </section>

             <section>
                <h2 className="text-2xl font-bold mb-4">Related Tools & Articles</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Link href="/tools/subnet-mask-converter" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">Subnet Mask Converter<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">The parent tool for this converter. Convert between all three mask formats seamlessly.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                    <Link href="/tools/subnet-calculator" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">Subnet Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">Analyze the subnet that your wildcard mask will be matching against.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                    <Link href="/tools/firewall-simulator" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">Firewall Rule Simulator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">Practice using wildcard masks to build and test firewall ACLs in a safe environment.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                </div>
            </section>
        </div>
    );
}

