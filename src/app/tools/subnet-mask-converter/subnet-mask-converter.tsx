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
        </div>
    );
}
