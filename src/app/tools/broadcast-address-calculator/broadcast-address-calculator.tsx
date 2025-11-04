
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
import { Lightbulb, AlertCircle, Wand, AlertTriangle, BookOpen, ChevronRight, Copy, Check, Rss } from 'lucide-react';
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
    { question: "What is a broadcast address?", answer: "A broadcast address is a special IP address for a subnet that allows information to be sent to all devices on that subnet simultaneously. Any packet sent to the broadcast address is automatically delivered to every host within that network segment." },
    { question: "How is the broadcast address calculated?", answer: "The broadcast address is calculated by taking the Network ID of the subnet and setting all the host bits to '1'. This results in the highest possible IP address within that subnet's range. It is the address immediately following the last usable host IP." },
    { question: "Can I assign a broadcast address to a device?", answer: "No. The broadcast address is reserved for its special function and cannot be assigned to an individual device (host) on the network. The same is true for the Network ID, which is the first address in the range." },
    { question: "What is the difference between a directed broadcast and a limited broadcast?", answer: "A directed broadcast is sent to a specific subnet's broadcast address (e.g., 192.168.1.255) and is intended for all hosts on that *specific* network. A limited broadcast uses the destination address 255.255.255.255 and is only delivered to hosts on the *local* physical network segment of the sender." },
    { question: "Why do I need a broadcast address?", answer: "Broadcasts are essential for several core networking protocols. The most common is the Address Resolution Protocol (ARP), which sends a broadcast to discover the MAC address of a device with a known IP address. DHCP also uses broadcasts for devices to request an IP address from a DHCP server." },
    { question: "Does my home network have a broadcast address?", answer: "Yes. A typical home network using the IP range 192.168.1.0 with a subnet mask of 255.255.255.0 (/24) will have a broadcast address of 192.168.1.255." },
    { question: "What is a 'broadcast storm'?", answer: "A broadcast storm is a network-crippling event where a large number of broadcast packets are sent out simultaneously, either due to a misconfiguration or a malfunctioning device. This flood of traffic consumes bandwidth and CPU resources on every host, as each device must process every broadcast packet, potentially bringing the network to a halt." },
    { question: "How does the subnet mask affect the broadcast address?", answer: "The subnet mask is what defines the size of the network, and therefore where the network ends. The broadcast address is always the last IP in the range defined by the mask. A smaller CIDR prefix (like /23) creates a larger network with a higher broadcast address than a larger CIDR prefix (like /24). You can explore this using our <a href='/tools/subnet-calculator' class='text-primary hover:underline'>Subnet Calculator</a>." },
    { question: "Is broadcasting used in IPv6?", answer: "No. IPv6, the successor to IPv4, completely eliminates the concept of broadcasting to reduce unnecessary network traffic. Instead, IPv6 uses multicast addresses for one-to-many communication. A multicast packet is only processed by devices that have explicitly subscribed to that multicast group." },
    { question: "Why does a /32 network have the same broadcast and network ID?", answer: "A /32 network contains only a single IP address. Since there are no host bits, there's no room for a separate network ID, broadcast address, and host IPs. The single address represents all three. This is typically used to define a route to a single specific host." }
];

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer.replace(/<[^>]*>?/gm, '') } })),
};

const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Calculate a Broadcast Address',
    description: 'Find the broadcast address for any IPv4 network using an IP address and a subnet mask.',
    step: [
        { '@type': 'HowToStep', name: 'Enter an IP Address', text: 'Input any IP address that belongs to the network you want to analyze.' },
        { '@type': 'HowToStep', name: 'Select the Subnet Mask', text: 'Choose the correct subnet mask for the network from the CIDR dropdown list.' },
        { '@type': 'HowToStep', name: 'Calculate', text: 'Click the "Calculate" button.' },
        { '@type': 'HowToStep', name: 'Review the Result', text: 'The tool will display the calculated broadcast address for that subnet, along with its Network ID, for context. Use the copy button to save the result.' }
    ],
    totalTime: 'PT1M',
};

export function BroadcastAddressCalculator() {
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
        const broadcastLong = (networkLong | ~maskLong) >>> 0;

        setResults({
            ip: ipAddress,
            cidr: cidrNum,
            subnetMask: longToIp(maskLong),
            networkId: longToIp(networkLong),
            broadcastAddress: longToIp(broadcastLong),
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
            />
            <Card>
                <CardHeader>
                    <CardTitle>Broadcast Address Calculator</CardTitle>
                    <CardDescription>
                        Enter an IPv4 address and subnet mask to determine the broadcast address for the network.
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
                                Network details for {results.ip}/{results.cidr}.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                             <Table>
                                <TableBody>
                                    {renderResultRow('Broadcast Address', 'broadcastAddress', results.broadcastAddress, true)}
                                    {renderResultRow('Network ID', 'networkId', results.networkId)}
                                    {renderResultRow('Subnet Mask', 'subnetMask', results.subnetMask)}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}

    