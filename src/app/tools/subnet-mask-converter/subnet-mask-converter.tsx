
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
import { Lightbulb, AlertCircle, Wand, AlertTriangle, BookOpen, ChevronRight, Copy, Check, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';

// --- IP Math Logic ---
const longToIp = (long: number): string => {
    if (long < 0) long += 4294967296; // Handle negative numbers from bitwise operations
    return `${(long >>> 24)}.${(long >> 16) & 255}.${(long >> 8) & 255}.${long & 255}`;
};

const ipToLong = (ip: string): number | null => {
    const parts = ip.split('.').map(part => parseInt(part, 10));
    if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) {
        return null;
    }
    return (parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3];
};

const cidrToMaskLong = (cidr: number): number => {
    return (0xFFFFFFFF << (32 - cidr)) >>> 0;
};

const maskLongToCidr = (mask: number): number => {
    let cidr = 0;
    let bit = (mask >>> 0).toString(2);
    for (let i = 0; i < bit.length; i++) {
        if (bit[i] === '1') {
            cidr++;
        }
    }
    return cidr;
};

const isValidMask = (mask: string): boolean => {
    const maskLong = ipToLong(mask);
    if (maskLong === null) return false;
    const maskBinary = (maskLong >>> 0).toString(2).padStart(32, '0');
    // Check if it's a contiguous block of 1s followed by 0s
    return /^1*0*$/.test(maskBinary);
}

// --- FAQ & Schema Data ---
const faqData = [
    { question: "What's the difference between a subnet mask and a wildcard mask?", answer: "A subnet mask and a wildcard mask are inverses of each other. In a subnet mask, binary '1's represent the network portion and '0's represent the host portion. In a wildcard mask, '0's represent the network portion (the bits that must match) and '1's are 'don't care' bits (the host portion)." },
    { question: "Why is CIDR notation preferred over subnet masks?", answer: "CIDR notation (e.g., /24) is more concise and less prone to typos than writing out a full subnet mask (e.g., 255.255.255.0). It clearly states the number of network bits, which is often the most important piece of information for network planning." },
    { question: "When would I use a wildcard mask?", answer: "Wildcard masks are primarily used in Access Control Lists (ACLs) on routers and firewalls (like Cisco IOS). They provide a flexible way to specify a range of IP addresses to permit or deny. For example, a wildcard mask can match all IPs in a specific subnet or even match only the odd-numbered hosts." },
    { question: "How is a wildcard mask calculated?", answer: "The easiest way to calculate a wildcard mask is to subtract the subnet mask from 255.255.255.255. For example, for a subnet mask of 255.255.255.0, the wildcard mask would be 0.0.0.255." },
    { question: "Can a subnet mask have a CIDR of /31 or /32?", answer: "Yes. A /32 mask (255.255.255.255) represents a single host address. It's often used in routing tables to specify a route to one specific device. A /31 mask (255.255.255.254) is a special case used for point-to-point links between two devices, conserving IP addresses (as defined in RFC 3021)." },
    { question: "Is `255.255.0.255` a valid subnet mask?", answer: "No, it is not. A valid subnet mask must consist of a continuous block of '1's followed by a continuous block of '0's in its binary representation. The binary for `255.255.0.255` would be `11111111.11111111.00000000.11111111`, which breaks this rule. Our tool will flag such inputs as invalid." },
    { question: "What does the number of hosts mean?", answer: "The number of hosts is the total number of IP addresses available within a given subnet mask. For example, a /24 mask leaves 8 bits for hosts (32-24 = 8), which allows for 2^8 = 256 total addresses. The number of *usable* hosts is typically 2 less, as the first and last IPs are reserved for the network and broadcast addresses, respectively." },
    { question: "Does this converter work for IPv6?", answer: "No, this tool is specifically for IPv4. IPv6 uses a 128-bit address and a different prefix length notation. It does not use dot-decimal subnet masks or wildcard masks in the same way as IPv4." },
    { question: "What is a Class A, B, or C network?", answer: "This refers to the old 'classful' system of IP addressing. Class A used a /8 mask, Class B used a /16 mask, and Class C used a /24 mask. This system was inefficient and has been replaced by Classless Inter-Domain Routing (CIDR), which allows for flexible mask sizes." },
    { question: "Why can't I just type any number in the CIDR field?", answer: "The CIDR prefix must be a number between 0 and 32, as an IPv4 address has a total of 32 bits. A /0 represents all addresses, and a /32 represents a single address. Any other value is not valid in the context of IPv4." }
];

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })),
};

const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Convert Subnet Masks',
    description: 'Convert seamlessly between CIDR prefix, dot-decimal subnet mask, and wildcard mask formats.',
    step: [
        { '@type': 'HowToStep', name: 'Select Input Type', text: 'Choose the format you are starting with: CIDR, Subnet Mask, or Wildcard Mask.' },
        { '@type': 'HowToStep', name: 'Enter the Value', text: 'Input your value in the text field. For CIDR, use the dropdown selector.' },
        { '@type': 'HowToStep', name: 'View Results', text: 'The tool instantly converts your input into all other formats and displays additional information like the number of hosts.' },
        { '@type': 'HowToStep', name: 'Copy Information', text: 'Use the copy buttons next to each result to quickly copy the value to your clipboard.' }
    ],
    totalTime: 'PT1M',
};

// --- Component ---
export function SubnetMaskConverter() {
    const [inputType, setInputType] = useState<'cidr' | 'subnet' | 'wildcard'>('cidr');
    const [inputValue, setInputValue] = useState('24');
    const [results, setResults] = useState<any>(null);
    const [error, setError] = useState('');
    const [copiedKey, setCopiedKey] = useState<string | null>(null);
    const resultRef = useRef<HTMLDivElement>(null);

    const cidrOptions = useMemo(() => {
        return Array.from({ length: 33 }, (_, i) => {
            const cidr = 32 - i;
            return { value: cidr.toString(), label: `/${cidr}` };
        }).reverse();
    }, []);

    const handleConversion = (type: string, value: string) => {
        setError('');
        setResults(null);
        let maskLong: number | null;

        try {
            if (type === 'cidr') {
                const cidr = parseInt(value, 10);
                if (isNaN(cidr) || cidr < 0 || cidr > 32) {
                    setError('Invalid CIDR. Must be between 0 and 32.');
                    return;
                }
                maskLong = cidrToMaskLong(cidr);
            } else if (type === 'subnet') {
                if (!isValidMask(value)) {
                    setError('Invalid Subnet Mask. Bits must be contiguous.');
                    return;
                }
                maskLong = ipToLong(value);
            } else if (type === 'wildcard') {
                const longVal = ipToLong(value);
                 if (longVal === null || !isValidMask(longToIp(~longVal >>> 0))) {
                     setError('Invalid Wildcard Mask. Bits must form a valid inverse mask.');
                    return;
                }
                maskLong = ~longVal;
            } else {
                return;
            }

            if (maskLong === null) {
                setError('Invalid input value.');
                return;
            }
            
            const currentCidr = maskLongToCidr(maskLong);
            const totalHosts = Math.pow(2, 32 - currentCidr);
            const usableHosts = totalHosts > 2 ? totalHosts - 2 : 0;
            
            setResults({
                cidr: currentCidr,
                subnetMask: longToIp(maskLong),
                wildcardMask: longToIp(~maskLong >>> 0),
                binaryMask: (maskLong >>> 0).toString(2).padStart(32, '0').match(/.{1,8}/g)!.join('.'),
                totalHosts: totalHosts,
                usableHosts: usableHosts,
            });

        } catch (e) {
            setError('An unexpected error occurred during conversion.');
        }
    };
    
    // Auto-update on change
    useEffect(() => {
        handleConversion(inputType, inputValue);
        if (results && resultRef.current) {
            resultRef.current.focus();
        }
    }, [inputType, inputValue]);

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
                    <CardTitle>Subnet Mask Converter</CardTitle>
                    <CardDescription>Instantly convert between CIDR, Subnet Mask, and Wildcard Mask formats.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                        <div className="space-y-2">
                            <Label htmlFor="input-type">Input Type</Label>
                            <Select value={inputType} onValueChange={(v) => setInputType(v as any)}>
                                <SelectTrigger id="input-type"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="cidr">CIDR Prefix</SelectItem>
                                    <SelectItem value="subnet">Subnet Mask</SelectItem>
                                    <SelectItem value="wildcard">Wildcard Mask</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor="input-value">Value</Label>
                            {inputType === 'cidr' ? (
                                <Select value={inputValue} onValueChange={setInputValue}>
                                    <SelectTrigger id="input-value"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        {cidrOptions.map(option => (
                                            <SelectItem key={option.value} value={option.value}>{option.label} ({longToIp(cidrToMaskLong(parseInt(option.value)))})</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            ) : (
                                <Input
                                    id="input-value"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder={inputType === 'subnet' ? 'e.g., 255.255.255.0' : 'e.g., 0.0.0.255'}
                                    className="font-code"
                                />
                            )}
                        </div>
                    </div>
                     {error && (
                        <Alert variant="destructive" role="alert">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                </CardContent>
            </Card>

            {results && !error && (
                <div ref={resultRef} tabIndex={-1} aria-live="polite">
                    <Card>
                        <CardHeader>
                            <CardTitle>Conversion Results</CardTitle>
                            <CardDescription>All formats and information related to your input.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableBody>
                                    {renderResultRow('CIDR Prefix', 'cidr', `/${results.cidr}`)}
                                    {renderResultRow('Subnet Mask', 'subnetMask', results.subnetMask)}
                                    {renderResultRow('Wildcard Mask', 'wildcardMask', results.wildcardMask)}
                                    {renderResultRow('Binary Mask', 'binaryMask', results.binaryMask)}
                                    {renderResultRow('Total Hosts', 'totalHosts', results.totalHosts)}
                                    {renderResultRow('Usable Hosts', 'usableHosts', results.usableHosts)}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            )}
            
            <section>
                <h2 className="text-2xl font-bold mb-4">How to Use the Converter</h2>
                <Card className="prose prose-sm max-w-none text-foreground p-6">
                    <p>This tool eliminates the guesswork in network calculations by allowing you to convert between the three most common mask formats instantly. Here’s how to get started:</p>
                    <ol>
                        <li><strong>Select Your Input Type:</strong> Use the "Input Type" dropdown to choose the format you already have. Your options are:
                            <ul>
                                <li><strong>CIDR Prefix:</strong> The modern, slash notation (e.g., /24).</li>
                                <li><strong>Subnet Mask:</strong> The traditional dot-decimal notation (e.g., 255.255.255.0).</li>
                                <li><strong>Wildcard Mask:</strong> The inverted mask used in ACLs (e.g., 0.0.0.255).</li>
                            </ul>
                        </li>
                        <li><strong>Provide the Value:</strong>
                            <ul>
                                <li>If you chose <strong>CIDR</strong>, simply select the desired prefix from the value dropdown.</li>
                                <li>If you chose <strong>Subnet Mask</strong> or <strong>Wildcard Mask</strong>, type the dot-decimal value into the text field.</li>
                            </ul>
                        </li>
                        <li><strong>Review Instant Results:</strong> The tool automatically calculates and displays the equivalent values in all other formats as you type. You will also see the binary representation of the mask, and the total/usable number of hosts for that network size.</li>
                        <li><strong>Copy What You Need:</strong> Click the copy icon next to any result to instantly save it to your clipboard.</li>
                    </ol>
                     <Alert>
                        <Lightbulb className="h-4 w-4" />
                        <AlertTitle>Example Scenario</AlertTitle>
                        <AlertDescription>
                          A colleague asks you to configure a firewall rule for the `192.168.50.0/24` network. You need the wildcard mask for the ACL. Select "CIDR Prefix" as the input, choose "/24" from the list, and instantly see the wildcard mask is `0.0.0.255`. No manual calculation needed!
                        </AlertDescription>
                    </Alert>
                </Card>
            </section>

             <Card className='bg-secondary/30 border-primary/20'>
                <CardHeader>
                    <div className='flex items-center gap-2 text-primary'>
                        <BookOpen className="h-6 w-6" aria-hidden="true" />
                        <CardTitle className="text-primary">Educational Deep Dive: The Three Faces of a Network Mask</CardTitle>
                    </div>
                    <CardDescription>Understand the what, why, and how of CIDR, Subnet Masks, and Wildcard Masks.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                    <section>
                        <h3 className="font-bold text-xl">1. The Subnet Mask: The Original Divider</h3>
                        <p>A subnet mask is a 32-bit number that serves one crucial purpose: to divide an IPv4 address into its two main components: the **network portion** and the **host portion**. Think of it as a stencil laid over an IP address. The parts of the IP address that are visible through the 'solid' parts of the stencil (represented by binary 1s) belong to the network. The parts visible through the 'holes' (represented by binary 0s) belong to the host.</p>
                        <p>For example, with the mask `255.255.255.0`, its binary form is `11111111.11111111.11111111.00000000`. The first 24 bits are 1s, and the last 8 bits are 0s. This tells any network device (like a router) that for an IP like `192.168.1.100`, the `192.168.1` part identifies the network, and the `.100` part identifies the specific device on that network.</p>
                        <p>The rule for a valid subnet mask is strict: it must be a contiguous block of 1s followed by a contiguous block of 0s. A mask like `255.255.0.255` is invalid because its binary form (`...1111.0000...1111`) violates this rule. Understanding this binary structure is key, and you can explore it with our <Link href="/tools/ip-to-binary" className='text-primary hover:underline'>IP to Binary Converter</Link>.</p>
                    </section>
                    <section>
                        <h3 className="font-bold text-xl">2. CIDR Notation: The Modern Shorthand</h3>
                        <p>Writing out `255.255.255.0` is tedious and prone to error. Classless Inter-Domain Routing (CIDR) notation was introduced to simplify this. CIDR simply appends a forward slash and a number to an IP address, like `/24`. **This number represents the count of leading 1s in the subnet mask.**</p>
                        <p>It's a far more efficient and intuitive system:</p>
                        <ul className="list-disc pl-5">
                            <li>`/8` means 8 ones, or `255.0.0.0`.</li>
                            <li>`/16` means 16 ones, or `255.255.0.0`.</li>
                            <li>`/24` means 24 ones, or `255.255.255.0`.</li>
                        </ul>
                        <p>This "classless" system broke the rigid rules of old Class A, B, and C networks, allowing network administrators to create subnets of any size, a technique known as <Link href="/tools/vlsm-calculator" className="text-primary hover:underline">Variable Length Subnet Masking (VLSM)</Link>. This flexibility is essential for efficient IP address allocation. Our <Link href="/tools/subnet-calculator" className='text-primary hover:underline'>Subnet Calculator</Link> is perfect for exploring how different CIDR values affect network sizes.</p>
                    </section>
                     <section>
                        <h3 className="font-bold text-xl">3. The Wildcard Mask: The Rule-Maker's Tool</h3>
                        <p>A wildcard mask is the inverse of a subnet mask and is used almost exclusively for creating rules, most notably in Access Control Lists (ACLs) on Cisco equipment. While a subnet mask uses 1s to identify the network, a wildcard mask uses 0s to identify the bits that **must match**.</p>
                        <p>The logic is simple: </p>
                        <ul className="list-disc pl-5">
                           <li>A **0** in a wildcard mask bit position means: "The corresponding bit in the IP address must match the bit in my rule's IP address."</li>
                           <li>A **1** in a wildcard mask bit position means: "I don't care what the corresponding bit in the IP address is."</li>
                        </ul>
                        <p>To get a wildcard mask, you subtract the subnet mask from `255.255.255.255`. </p>
                        <div className="overflow-x-auto my-4">
                           <table className="w-full">
                              <thead><tr className="border-b"><th className="p-2 text-left">Subnet Mask</th><th className="p-2 text-left">Wildcard Mask</th><th className="p-2 text-left">ACL Meaning</th></tr></thead>
                              <tbody>
                                 <tr className="border-b"><td className="p-2 font-code">255.255.255.0 (/24)</td><td className="p-2 font-code">0.0.0.255</td><td className="p-2">Match the first three octets exactly, the last octet can be anything.</td></tr>
                                 <tr className="border-b"><td className="p-2 font-code">255.255.255.255 (/32)</td><td className="p-2 font-code">0.0.0.0</td><td className="p-2">Match all 32 bits exactly (a single host).</td></tr>
                                 <tr><td className="p-2 font-code">0.0.0.0 (/0)</td><td className="p-2 font-code">255.255.255.255</td><td className="p-2">Match anything (any host).</td></tr>
                              </tbody>
                           </table>
                        </div>
                        <p>This allows for highly specific rules. For example, a wildcard mask of `0.0.0.254` could be used to match only hosts with an odd-numbered IP address in the last octet.</p>
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
                            <li><strong>Inverse Thinking:</strong> Always remember that Subnet and Wildcard masks are opposites. If a Subnet Mask has a 255, the Wildcard has a 0, and vice-versa.</li>
                            <li><strong>CIDR to Hosts:</strong> To quickly estimate usable hosts from a CIDR, calculate 2^(32 - CIDR) - 2. For /26, that's 2^(32-26) = 2^6 = 64, so 62 usable hosts.</li>
                            <li><strong>Binary Check:</strong> When in doubt about a mask's validity, convert it to binary. If you see a '0' followed by a '1', it's an invalid mask.</li>
                            <li><strong>ACL 'host' Keyword:</strong> In many systems like Cisco IOS, you can use the keyword `host 1.2.3.4` as a shortcut for `1.2.3.4 0.0.0.0`. Similarly, `any` is a shortcut for `0.0.0.0 255.255.255.255`.</li>
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                         <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                    </CardHeader>
                    <CardContent>
                         <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                            <li><strong>Using Subnet Mask in ACLs:</strong> A frequent error for beginners is using a subnet mask in a command that requires a wildcard mask. This will lead to incorrect rule matching.</li>
                            <li><strong>Typing Errors:</strong> A single wrong digit in a dot-decimal mask (e.g., `255.225.255.0` instead of `255.255.255.0`) can drastically change the network configuration. This is why CIDR is generally safer.</li>
                            <li><strong>Invalid Mask Creation:</strong> Manually creating a mask like `255.255.254.1`. A mask's binary representation must be all 1s followed by all 0s.</li>
                            <li><strong>Confusing Total vs. Usable Hosts:</strong> Forgetting to subtract 2 from the total host count for the network and broadcast addresses, leading to IP allocation errors.</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
            
            <section>
                <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Writing a Firewall Access Rule</h3>
                        <p className="text-sm text-muted-foreground">A network security admin needs to write an ACL (Access Control List) on a Cisco router to permit traffic from the entire `192.168.50.0/24` subnet. The command requires a wildcard mask, not a subnet mask. The admin inputs `255.255.255.0` into the converter, instantly gets the correct wildcard mask `0.0.0.255`, and confidently writes the rule: `access-list 101 permit ip 192.168.50.0 0.0.0.255 any`.</p>
                    </div>
                     <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Migrating from Classful to Classless</h3>
                        <p className="text-sm text-muted-foreground">An engineer is updating legacy network documentation that uses old "Class C" terminology. To modernize the documentation and make it compatible with modern systems, they need to convert all instances of "Class C" to CIDR notation. They use the converter to confirm that a Class C network's default mask `255.255.255.0` is equivalent to `/24`, ensuring the new documentation is accurate.</p>
                    </div>
                     <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Validating a Configuration Script</h3>
                        <p className="text-sm text-muted-foreground">Before deploying a new network configuration script, a sysadmin does a final review. They notice a subnet mask written as `255.255.252.0`. To double-check its CIDR equivalent and the number of hosts it supports, they paste it into the converter. It confirms the mask is `/22` and supports 1024 hosts, verifying the script's intent and preventing a potential misconfiguration.</p>
                    </div>
                     <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Quickly Understanding Network Size</h3>
                        <p className="text-sm text-muted-foreground">During a team meeting, a colleague mentions they are working on the `/27` subnet. To quickly understand the scale of that network, another team member selects `/27` in the CIDR dropdown. They immediately see that it corresponds to `255.255.255.224` and provides 30 usable hosts, giving them instant context for the discussion without interrupting the flow.</p>
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
                    <Link href="/tools/subnet-calculator" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">Subnet Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">Apply these masks to an IP address to find the network range, broadcast address, and more.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                    <Link href="/tools/ip-to-binary" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">IP to Binary Converter<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">Visualize any IP address or mask in its raw binary form to better understand the underlying structure.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                    <Link href="/tools/vlsm-calculator" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">VLSM Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">Use Variable Length Subnet Masks to design highly efficient network address schemes.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                </div>
            </section>
        </div>
    );
}
