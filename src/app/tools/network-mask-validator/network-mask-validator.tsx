'use client';

import { useState, useMemo, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
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
        </div>
    );
}
