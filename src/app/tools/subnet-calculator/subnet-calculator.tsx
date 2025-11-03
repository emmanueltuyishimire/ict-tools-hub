
'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { StructuredData } from '@/components/structured-data';
import { Lightbulb, AlertCircle, Wand, AlertTriangle, BookOpen, ChevronRight, Copy, Check } from 'lucide-react';
import Link from 'next/link';

// --- IP Math Logic (lightweight, no external library) ---
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
    { question: "What is subnetting?", answer: "Subnetting is the process of dividing a single, large computer network into smaller, more manageable sub-networks, or subnets. It's done to improve performance, enhance security, and simplify network management." },
    { question: "What is a CIDR notation?", answer: "CIDR (Classless Inter-Domain Routing) notation is a compact way to represent an IP address and its associated network mask. For example, `192.168.1.0/24` means the IP address is `192.168.1.0` and the first 24 bits are used as the network mask." },
    { question: "What's the difference between a Network ID and a Broadcast Address?", answer: "The Network ID is the very first address in a subnet and is used to identify the network itself; it cannot be assigned to a host. The Broadcast Address is the very last address and is used to send messages to all hosts on that specific subnet." },
    { question: "Why are there only 254 usable hosts in a /24 network?", answer: "A /24 network has 2^(32-24) = 2^8 = 256 total addresses. However, two addresses are reserved: the first one for the Network ID and the last one for the Broadcast Address. This leaves 256 - 2 = 254 addresses available for hosts (computers, printers, etc.)." },
    { question: "Can I use this calculator for IPv6?", answer: "No, this calculator is specifically designed for IPv4 subnetting. IPv6 uses a completely different addressing scheme (128-bit, hexadecimal) and requires a different set of tools and calculations." },
    { question: "What is a subnet mask?", answer: "A subnet mask is a 32-bit number that separates the network portion of an IP address from the host portion. The '1's in the mask represent the network bits, and the '0's represent the host bits. You can visualize this using our <a href='/tools/ip-to-binary' class='text-primary hover:underline'>IP to Binary Converter</a>." },
    { question: "What is a Wildcard Mask?", answer: "A wildcard mask is an inverted subnet mask, often used in firewall and router Access Control Lists (ACLs). It tells the device which bits of an IP address to pay attention to. You can calculate it by subtracting the subnet mask from `255.255.255.255`." },
    { question: "What does 'Usable Host Range' mean?", answer: "This is the range of IP addresses within a subnet that can be assigned to devices. It starts from the IP address immediately after the Network ID and ends just before the Broadcast Address." },
    { question: "How do I choose the right subnet size?", answer: "Choose a subnet size based on the number of devices you need to support. Always plan for growth. For example, if you need 50 hosts, a /26 network (62 usable hosts) is a good fit, whereas a /27 (30 usable hosts) would be too small." },
    { question: "What are private IP address ranges?", answer: "Private IP ranges (like 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16) are reserved for use within internal networks. They are not routable on the public internet and can be reused by anyone in their private network." }
];

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer.replace(/<a href='([^']*)' class='[^']*'>/g, "<a href='$1'>") } })),
};

const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Use the Subnet Calculator',
    description: 'Calculate network details like IP range, broadcast address, and host count from an IP address and CIDR prefix.',
    step: [
        { '@type': 'HowToStep', name: 'Enter IP Address', text: 'Type a valid IPv4 address into the "IP Address" field (e.g., 192.168.1.10).' },
        { '@type': 'HowToStep', name: 'Select Subnet Mask/CIDR', text: 'Choose a subnet mask from the dropdown list. You can select by CIDR prefix (e.g., /24) or the full mask (e.g., 255.255.255.0).' },
        { '@type': 'HowToStep', name: 'Calculate', text: 'Click the "Calculate" button to process the input.' },
        { '@type': 'HowToStep', name: 'Review Results', text: 'The results will appear below, showing the Network ID, Broadcast Address, Host Range, Total Hosts, and other relevant information in a clear table format.' },
        { '@type': 'HowToStep', name: 'Copy Information', text: 'Use the copy buttons next to each piece of information to quickly copy it to your clipboard.' }
    ],
    totalTime: 'PT1M',
};

// --- Subnet Calculator Component ---
export function SubnetCalculator() {
    const [ipAddress, setIpAddress] = useState('192.168.1.10');
    const [cidr, setCidr] = useState('24');
    const [error, setError] = useState('');
    const [results, setResults] = useState<any>(null);
    const resultRef = useRef<HTMLDivElement>(null);
    const [copiedKey, setCopiedKey] = useState<string | null>(null);

    useEffect(() => {
        if(results && resultRef.current) {
            resultRef.current.focus();
        }
    }, [results]);

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
        const broadcastLong = (networkLong | ~maskLong) >>> 0;
        
        const totalHosts = Math.pow(2, 32 - cidrNum);
        const usableHosts = totalHosts > 2 ? totalHosts - 2 : 0;
        
        const firstHostLong = usableHosts > 0 ? networkLong + 1 : networkLong;
        const lastHostLong = usableHosts > 0 ? broadcastLong - 1 : broadcastLong;

        setResults({
            ip: ipAddress,
            cidr: cidrNum,
            subnetMask: longToIp(maskLong),
            wildcardMask: longToIp(~maskLong >>> 0),
            networkId: longToIp(networkLong),
            broadcastAddress: longToIp(broadcastLong),
            hostRange: usableHosts > 0 ? `${longToIp(firstHostLong)} - ${longToIp(lastHostLong)}` : 'N/A',
            totalHosts: totalHosts,
            usableHosts: usableHosts,
            ipClass: getIpClass(ipLong),
            isPrivate: isPrivateIp(ipLong)
        });
    };

    const handleCopyToClipboard = (key: string, value: string) => {
        navigator.clipboard.writeText(value).then(() => {
            setCopiedKey(key);
            setTimeout(() => setCopiedKey(null), 2000);
        });
    };

    const getIpClass = (ipLong: number) => {
        const firstOctet = (ipLong >>> 24);
        if (firstOctet >= 1 && firstOctet <= 126) return 'A';
        if (firstOctet >= 128 && firstOctet <= 191) return 'B';
        if (firstOctet >= 192 && firstOctet <= 223) return 'C';
        if (firstOctet >= 224 && firstOctet <= 239) return 'D (Multicast)';
        if (firstOctet >= 240 && firstOctet <= 255) return 'E (Experimental)';
        return 'N/A';
    };

    const isPrivateIp = (ipLong: number) => {
        const o1 = (ipLong >>> 24);
        const o2 = (ipLong >> 16) & 255;
        if (o1 === 10) return true;
        if (o1 === 172 && (o2 >= 16 && o2 <= 31)) return true;
        if (o1 === 192 && o2 === 168) return true;
        return false;
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

    const renderResultRow = (label: string, key: string, value: any) => {
        if (value === undefined || value === null) return null;
        
        const displayValue = typeof value === 'number' ? value.toLocaleString() : value.toString();
        
        return (
            <TableRow key={key}>
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
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Subnet Calculator</CardTitle>
                    <CardDescription>
                        Enter an IPv4 address and a subnet mask to calculate all relevant network information.
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
                            <CardTitle>Subnet Calculation Results</CardTitle>
                            <CardDescription>
                                Detailed network information for {results.ip}/{results.cidr}.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                             <Table>
                                <TableBody>
                                    {renderResultRow('Network ID', 'networkId', results.networkId)}
                                    {renderResultRow('Broadcast Address', 'broadcastAddress', results.broadcastAddress)}
                                    {renderResultRow('Usable Host Range', 'hostRange', results.hostRange)}
                                    {renderResultRow('Total Hosts', 'totalHosts', results.totalHosts)}
                                    {renderResultRow('Usable Hosts', 'usableHosts', results.usableHosts)}
                                    {renderResultRow('Subnet Mask', 'subnetMask', results.subnetMask)}
                                    {renderResultRow('Wildcard Mask', 'wildcardMask', results.wildcardMask)}
                                    {renderResultRow('IP Class', 'ipClass', results.ipClass)}
                                    {renderResultRow('Private IP?', 'isPrivate', results.isPrivate ? 'Yes (RFC1918)' : 'No')}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
