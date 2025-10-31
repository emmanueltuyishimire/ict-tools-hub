
'use client';

import { useState, useMemo, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { StructuredData } from '@/components/structured-data';
import { Lightbulb, AlertCircle, Wand, AlertTriangle, BookOpen, ChevronRight, Copy, Check, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// --- IP Math Logic ---
const ipToLong = (ip: string): number | null => {
    const parts = ip.split('.').map(part => parseInt(part, 10));
    if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) {
        return null;
    }
    return (parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3];
};

const longToIp = (long: number): string => {
    if (long < 0) long += 4294967296; // Handle negative numbers
    return `${(long >>> 24)}.${(long >> 16) & 255}.${(long >> 8) & 255}.${long & 255}`;
};

const maskLongToCidr = (mask: number): number => {
    let cidr = 0;
    // Handle the case of 0.0.0.0
    if (mask === 0) return 0;
    let bit = (mask >>> 0).toString(2);
    for (let i = 0; i < bit.length; i++) {
        if (bit[i] === '1') {
            cidr++;
        }
    }
    return cidr;
};

const validateMask = (mask: string) => {
    if (!mask) return { isValid: false, message: 'Input is empty.', details: null };

    const maskLong = ipToLong(mask);
    if (maskLong === null) {
        return { isValid: false, message: 'Invalid IPv4 format. Mask must be four numbers between 0 and 255.', details: null };
    }

    const maskBinary = (maskLong >>> 0).toString(2).padStart(32, '0');
    // A valid mask must be a contiguous block of 1s followed by a contiguous block of 0s.
    // This regex checks if the string contains a '0' followed by a '1', which is illegal for a mask.
    if (maskBinary.indexOf('0') < maskBinary.lastIndexOf('1')) {
        return { 
            isValid: false, 
            message: `Invalid subnet mask. The binary representation (${maskBinary.match(/.{1,8}/g)!.join('.')}) is not a contiguous block of 1s followed by 0s.`,
            details: null 
        };
    }

    const cidr = maskLongToCidr(maskLong);
    const wildcardMask = longToIp(~maskLong >>> 0);
    const totalHosts = Math.pow(2, 32 - cidr);
    const usableHosts = totalHosts > 2 ? totalHosts - 2 : (totalHosts === 2 ? 2 : 0);

    return {
        isValid: true,
        message: 'Valid Subnet Mask',
        details: {
            cidr: `/${cidr}`,
            wildcardMask,
            binaryMask: maskBinary.match(/.{1,8}/g)!.join('.'),
            totalHosts,
            usableHosts,
        }
    };
};

// --- FAQ & Schema Data ---
const faqData = [
    { question: "What makes a subnet mask valid?", answer: "A subnet mask is valid if its binary representation consists of a contiguous block of '1's followed by a contiguous block of '0's. For example, `255.255.255.0` (`...11111111.00000000`) is valid, but `255.255.0.255` (`...11111111.00000000.11111111`) is invalid because the '1's are not contiguous." },
    { question: "Can a subnet mask be `0.0.0.0` or `255.255.255.255`?", answer: "Yes. A subnet mask of `0.0.0.0` (or /0) represents a network containing all possible IPv4 addresses, and is used for default routes. A mask of `255.255.255.255` (or /32) represents a network with only a single host address, often used in routing tables to specify a route to one specific machine." },
    { question: "Why can't I have a mask like `255.0.255.0`?", answer: "This mask is invalid because its binary representation is `11111111.00000000.11111111.00000000`. The '1's are not in a single, unbroken sequence from left to right. This would create an ambiguous definition of the network and host portions of an IP address, which network devices cannot interpret." },
    { question: "What is a wildcard mask and how does it relate to a subnet mask?", answer: "A wildcard mask is the inverse of a subnet mask and is used primarily in Access Control Lists (ACLs). Where a subnet mask uses '1's to mark the network portion, a wildcard mask uses '0's to mark the bits that must match. It is calculated by subtracting the subnet mask from `255.255.255.255`." },
    { question: "Is this tool checking if the mask is appropriate for my network?", answer: "No. This tool only validates the *format* and *structure* of the mask itself. It does not know about your specific network's IP addresses or requirements. For network planning, use our <a href='/tools/subnet-calculator' class='text-primary hover:underline'>Subnet Calculator</a> or <a href='/tools/vlsm-calculator' class='text-primary hover:underline'>VLSM Calculator</a>." },
    { question: "What is CIDR notation?", answer: "CIDR (Classless Inter-Domain Routing) notation is a shorthand for a subnet mask. It's a forward slash followed by a number (e.g., `/24`) that represents the number of leading '1's in the subnet mask. It's a more compact and less error-prone way to write masks." },
    { question: "Do all devices on the same network need the same subnet mask?", answer: "Yes, absolutely. For devices to communicate directly on the same local network (subnet), they must share the same network ID. This requires that they all be configured with the same subnet mask." },
    { question: "Can a host have an IP address but no subnet mask?", answer: "No. An IP address is meaningless without a subnet mask. The mask is what allows the device to determine which other IPs are on its local network and which ones require routing through a gateway." },
    { question: "How does the subnet mask relate to the number of hosts?", answer: "The number of '0's at the end of the binary mask determines the number of hosts. If there are 'n' zero bits, the subnet can contain 2^n total addresses. For example, a /24 mask has 8 zero bits, so it has 2^8 = 256 addresses." },
    { question: "Why did my input `255.255.256.0` fail?", answer: "Each of the four numbers (octets) in a subnet mask must be a value between 0 and 255. The number 256 is outside this valid range, making the entire mask invalid." },
];

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer.replace(/<[^>]*>?/gm, '') } })),
};

const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Validate a Network Mask',
    description: 'Check if an IPv4 subnet mask is valid and see its properties.',
    step: [
        { '@type': 'HowToStep', name: 'Enter the Subnet Mask', text: 'Type or paste the dot-decimal subnet mask you want to check into the input field (e.g., 255.255.240.0).' },
        { '@type': 'HowToStep', name: 'Review Instant Results', text: 'The tool provides real-time feedback, indicating if the mask is valid or invalid and explaining why.' },
        { '@type': 'HowToStep', name: 'Analyze Properties', text: 'If the mask is valid, the results table will display its equivalent CIDR prefix, wildcard mask, and full 32-bit binary representation.' },
    ],
    totalTime: 'PT1M',
};

// --- Component ---
export function NetworkMaskValidator() {
    const [mask, setMask] = useState('255.255.255.0');
    const [copiedKey, setCopiedKey] = useState<string | null>(null);

    const validationResult = useMemo(() => validateMask(mask), [mask]);

    const handleCopyToClipboard = (key: string, value: string) => {
        if (!value) return;
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
                    <CardTitle>Network Mask Validator</CardTitle>
                    <CardDescription>Enter a subnet mask to instantly verify its format and properties.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="mask-input">Subnet Mask</Label>
                        <div className="flex flex-col sm:flex-row gap-2">
                           <Input
                                id="mask-input"
                                type="text"
                                value={mask}
                                onChange={(e) => setMask(e.target.value)}
                                placeholder="e.g., 255.255.255.0"
                                className="font-code flex-grow"
                                aria-label="Subnet Mask Input"
                            />
                            <Button onClick={() => setMask('')} variant="outline" className="w-full sm:w-auto">Clear</Button>
                        </div>
                    </div>
                     {mask.length > 0 && (
                         <Alert variant={validationResult.isValid ? 'default' : 'destructive'} className={validationResult.isValid ? 'border-green-500/50' : ''}>
                             {validationResult.isValid ? <CheckCircle className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4" />}
                             <AlertTitle>{validationResult.isValid ? 'Valid Network Mask' : 'Invalid Network Mask'}</AlertTitle>
                             <AlertDescription>{validationResult.message}</AlertDescription>
                         </Alert>
                     )}
                     
                     {validationResult.isValid && validationResult.details && (
                        <Card className="bg-muted/50">
                            <CardHeader>
                                <CardTitle className="text-lg">Mask Properties</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableBody>
                                        {renderResultRow('CIDR Prefix', 'cidr', validationResult.details.cidr)}
                                        {renderResultRow('Wildcard Mask', 'wildcardMask', validationResult.details.wildcardMask)}
                                        {renderResultRow('Binary Mask', 'binaryMask', validationResult.details.binaryMask)}
                                        {renderResultRow('Total Hosts', 'totalHosts', validationResult.details.totalHosts)}
                                        {renderResultRow('Usable Hosts', 'usableHosts', validationResult.details.usableHosts)}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                     )}
                </CardContent>
            </Card>

            <section>
                <h2 className="text-2xl font-bold mb-4">How to Use the Validator</h2>
                <Card className="prose prose-sm max-w-none text-foreground p-6">
                    <p>This tool helps you quickly verify if an IPv4 subnet mask is correctly formatted and structured.</p>
                    <ol>
                        <li><strong>Enter the Subnet Mask:</strong> Type or paste the mask you want to check into the input field. The tool expects the standard dot-decimal format (e.g., `255.255.240.0`).</li>
                        <li><strong>Get Instant Feedback:</strong> The tool validates the mask in real-time. A status box will immediately appear, telling you if the mask is valid or invalid.</li>
                        <li><strong>Understand the Error:</strong> If the mask is invalid, the message will explain why—for example, if it contains a number over 255 or if its binary structure is incorrect.</li>
                        <li><strong>Review the Properties:</strong> For a valid mask, a "Mask Properties" table will show you its equivalent CIDR prefix, the corresponding wildcard mask used in ACLs, the full 32-bit binary representation, and the number of hosts it supports.</li>
                    </ol>
                     <Alert>
                        <Lightbulb className="h-4 w-4" />
                        <AlertTitle>Example</AlertTitle>
                        <AlertDescription>
                          Try entering <code className="font-code bg-muted p-1 rounded-sm">255.255.0.255</code>. The tool will immediately flag it as invalid and explain that the binary '1's are not contiguous. Then, try a valid mask like <code className="font-code bg-muted p-1 rounded-sm">255.255.255.240</code> to see its properties.
                        </AlertDescription>
                    </Alert>
                </Card>
            </section>
            
            <Card className='bg-secondary/30 border-primary/20'>
                <CardHeader>
                    <div className='flex items-center gap-2 text-primary'>
                        <BookOpen className="h-6 w-6" aria-hidden="true" />
                        <CardTitle className="text-primary">Educational Deep Dive: The Role of the Network Mask</CardTitle>
                    </div>
                    <CardDescription>From simple formats to the strict binary rules, understand what makes a network mask work.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                    <section>
                        <h3 className="font-bold text-xl">What is a Subnet Mask? The Network's Divider</h3>
                        <p>An IP address on its own is just a number; it doesn't provide enough information for a device to function on a network. The subnet mask is the crucial second piece of the puzzle. It's a 32-bit number that serves a single, vital purpose: to divide an IP address into its two fundamental parts: the **Network ID** and the **Host ID**.</p>
                        <p>Think of an IP address as a full street address, like "123 Main Street". The subnet mask is what tells you that "Main Street" is the name of the street (the network) and "123" is the specific house number on that street (the host). Without the mask, a device has no way of knowing which other devices are on its local street and which ones are on a different street somewhere else, requiring a router to reach them. You can see this division in action with our <Link href="/tools/subnet-calculator" className="text-primary hover:underline">Subnet Calculator</Link>.</p>
                    </section>
                    <section>
                        <h3 className="font-bold text-xl">The Cardinal Rule: Contiguous Binary '1's</h3>
                        <p>While we write subnet masks in dot-decimal notation for convenience, their true form is binary. A subnet mask's validity is determined by one strict rule: **its binary representation must be an unbroken sequence of '1's from left to right, followed by an unbroken sequence of '0's.** The '1's mark the network portion, and the '0's mark the host portion.</p>
                        <div className="grid md:grid-cols-2 gap-4 my-4 font-code text-sm">
                            <div className="bg-muted p-2 rounded"><strong>Valid Mask: 255.255.255.0</strong><br/>11111111.11111111.11111111.00000000<br/><span className="text-green-600">✓ Correct: All 1s followed by all 0s.</span></div>
                            <div className="bg-muted p-2 rounded"><strong>Invalid Mask: 255.255.0.255</strong><br/>11111111.11111111.00000000.11111111<br/><span className="text-red-600">✗ Incorrect: 0s appear before the final 1s.</span></div>
                        </div>
                        <p>This rule is non-negotiable because it creates a clear and unambiguous boundary between the network and host parts of an address. An invalid mask with interspersed 0s and 1s would create confusion that network protocols are not designed to handle. Our <Link href="/tools/ip-to-binary" className='text-primary hover:underline'>IP to Binary Converter</Link> can help you visualize this for any mask.</p>
                    </section>
                     <section>
                        <h3 className="font-bold text-xl">CIDR, Subnet Mask, and Wildcard Mask: Three Sides of the Same Coin</h3>
                        <p>Network masks can be represented in three different ways, each used in different contexts. Our <Link href="/tools/subnet-mask-converter" className="text-primary hover:underline">Subnet Mask Converter</Link> allows you to switch between them seamlessly.</p>
                        <ul className="list-disc pl-5">
                            <li><strong>Subnet Mask:</strong> The standard dot-decimal format (e.g., `255.255.255.0`). Used for configuring host IP addresses.</li>
                            <li><strong>CIDR Notation:</strong> A shorthand with a forward slash (e.g., `/24`). Modern, concise, and widely used in routing and cloud environments.</li>
                            <li><strong>Wildcard Mask:</strong> The inverse of the subnet mask (e.g., `0.0.0.255`). Used primarily in Access Control Lists (ACLs) to specify ranges of IP addresses.</li>
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
                            <li><strong>The "256 Rule":</strong> To quickly find the block size of a subnet, find the "interesting" octet (the one that isn't 255 or 0) and subtract it from 256. For a mask of `255.255.255.224`, the interesting octet is 224. The block size is 256 - 224 = 32. This means your network IDs will be multiples of 32 (0, 32, 64, etc.).</li>
                            <li><strong>CIDR to Wildcard:</strong> A `/24` mask has 8 host bits (32-24=8). The wildcard mask will have 8 corresponding '1's at the end, making it `0.0.0.255`. A `/27` has 5 host bits, so its wildcard is `0.0.0.31` (2^5 - 1).</li>
                            <li><strong>Binary Check in Your Head:</strong> Valid subnet mask octets can only be certain numbers: 255, 254, 252, 248, 240, 224, 192, 128, or 0. If you see an octet like `253` or `191` in a subnet mask, it's almost certainly invalid.</li>
                            <li><strong>Use `/31` on WAN Links:</strong> When connecting two routers, use a `/31` mask (255.255.255.254) to conserve IP addresses. This provides two usable IPs with no wasted network or broadcast addresses, a modern best practice defined in RFC 3021.</li>
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                         <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                    </CardHeader>
                    <CardContent>
                         <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                            <li><strong>Non-Contiguous Bits:</strong> The number one error is creating a mask like `255.255.0.255`. This is invalid because the binary `1`s are not in a single block. This validator will always catch this fundamental error.</li>
                            <li><strong>Octet Value Out of Range:</strong> Entering a number greater than 255 in any octet (e.g., `255.255.256.0`). This is a common typo but makes the mask completely invalid.</li>
                            <li><strong>Confusing Mask and IP:</strong> Applying the validation rules for a mask to a regular IP address. An IP address can have any octet value from 0-255, while a mask is restricted to specific values that maintain binary continuity.</li>
                            <li><strong>Using Subnet Mask in ACLs:</strong> Many beginners use a subnet mask in a router's Access Control List, which almost always requires a wildcard mask. This tool helps you find the correct wildcard for any given subnet mask.</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
            
            <section>
                <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Validating Legacy Configurations</h3>
                        <p className="text-sm text-muted-foreground">A network engineer inherits an old network's documentation which specifies a subnet mask of `255.255.254.0`. Before planning a migration, they use this validator to confirm it is a valid `/23` mask and to find its properties, including the wildcard mask `0.0.1.255`, which they'll need for new firewall rules.</p>
                    </div>
                     <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Troubleshooting a Network Script</h3>
                        <p className="text-sm text-muted-foreground">A sysadmin's automated network provisioning script is failing. They check the script's variables and find it's trying to apply a mask of `255.240.255.0`. By pasting this into the validator, they get an immediate "Invalid" result because the binary is non-contiguous, instantly identifying the typo in their script (`255.255.240.0` was intended).</p>
                    </div>
                     <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Studying for a Certification Exam</h3>
                        <p className="text-sm text-muted-foreground">A student is practicing for their Network+ exam and encounters a question asking if `255.255.191.0` is a valid mask. They manually convert `191` to binary (`10111111`) and see that it breaks the contiguous '1's rule. They then use this tool to instantly verify their conclusion is correct, reinforcing their learning process.</p>
                    </div>
                     <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Sanity-Checking Network Plans</h3>
                        <p className="text-sm text-muted-foreground">During a network design review meeting, a junior admin suggests using a `/21` mask. A senior admin, as a quick sanity check, uses a validator or converter to confirm that a `/21` corresponds to `255.255.248.0` and provides 2046 usable hosts, ensuring everyone in the meeting is on the same page about the scale of the proposed network.</p>
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
                                <CardDescription className="text-xs">Apply a valid mask to an IP address to calculate network ranges, broadcast addresses, and more.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                    <Link href="/tools/subnet-mask-converter" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">Subnet Mask Converter<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">Seamlessly convert between CIDR, Subnet Mask, and Wildcard Mask formats.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                    <Link href="/tools/ip-to-binary" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">IP to Binary Converter<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">Visualize any mask in its raw binary form to understand the core validation rule.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                </div>
            </section>
        </div>
    );
}
