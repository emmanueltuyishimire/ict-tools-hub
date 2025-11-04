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
        const displayValue = typeof value === 'number' ? value.toLocaleString() : value.toString();
        
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
        </div>
    );
}
