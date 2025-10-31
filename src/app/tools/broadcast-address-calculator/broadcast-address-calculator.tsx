
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
            <StructuredData data={faqSchema} />
            <StructuredData data={howToSchema} />
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

            <section>
                <h2 className="text-2xl font-bold mb-4">How to Use the Broadcast Address Calculator</h2>
                <Card className="prose prose-sm max-w-none text-foreground p-6">
                    <p>This tool quickly finds the broadcast address for any given IPv4 subnet.</p>
                    <ol>
                        <li><strong>Enter an IP Address:</strong> Type any IP address that belongs to the subnet you are analyzing.</li>
                        <li><strong>Select the Subnet Mask:</strong> Choose the correct network mask from the dropdown list. The list includes both CIDR notation and the full dot-decimal format for easy selection.</li>
                        <li><strong>Calculate:</strong> Click the "Calculate" button.</li>
                        <li><strong>Get the Result:</strong> The tool will instantly display the subnet's broadcast address. For context, it will also show the Network ID and the subnet mask you used. You can copy any of these values with a single click.</li>
                    </ol>
                     <Alert>
                        <Lightbulb className="h-4 w-4" />
                        <AlertTitle>Example</AlertTitle>
                        <AlertDescription>
                          If your network IP is `10.20.30.40` and your mask is `/28` (or `255.255.255.240`), the calculator will determine that the broadcast address for this specific subnet is `10.20.30.47`.
                        </AlertDescription>
                    </Alert>
                </Card>
            </section>

            <Card className='bg-secondary/30 border-primary/20'>
                <CardHeader>
                    <div className='flex items-center gap-2 text-primary'>
                        <BookOpen className="h-6 w-6" aria-hidden="true" />
                        <CardTitle className="text-primary">Educational Deep Dive: Understanding Network Broadcasts</CardTitle>
                    </div>
                    <CardDescription>Explore what a broadcast address is, how it's calculated, and the critical role it plays in network communication.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                    <section>
                        <h3 className="font-bold text-xl">What is a Broadcast Address? The Network's Megaphone</h3>
                        <p>In any given IP subnet, three types of addresses exist: the Network ID (which identifies the network itself), the host addresses (which are assigned to individual devices), and the <strong>Broadcast Address</strong>. The broadcast address is a special, reserved IP that acts as a megaphone for the subnet. Any packet sent to this address is not delivered to a single device but is instead processed by <strong>every single host</strong> on that local network segment.</p>
                        <p>It is always the very last IP address in a subnet range. For example, in the common home network of `192.168.1.0/24`, the range is `192.168.1.0` to `192.168.1.255`. Here, `192.168.1.0` is the Network ID, and `192.168.1.255` is the broadcast address. Neither can be assigned to your computer or phone. Our <Link href="/tools/subnet-calculator" className="text-primary hover:underline">Subnet Calculator</Link> can show you this full range for any network.</p>
                    </section>
                    <section>
                        <h3 className="font-bold text-xl">How the Broadcast Address is Calculated</h3>
                        <p>The calculation is a straightforward binary operation. It involves taking the <strong>Network ID</strong> of the subnet and flipping all the host bits from '0' to '1'.</p>
                        <p>Let's use an example: IP `172.16.10.100` with a `/22` mask (`255.255.252.0`).</p>
                        <ol className="list-decimal pl-5 space-y-2">
                           <li><strong>Find the Network ID:</strong> A logical AND operation between the IP and the mask gives us the Network ID. (Our tool does this for you, but the result is `172.16.8.0`).</li>
                           <li><strong>Invert the Subnet Mask:</strong> This gives you the wildcard mask, which identifies the host portion. The inverse of `/22` is `0.0.3.255`. In binary, this is 10 '1's at the end.</li>
                           <li><strong>Apply the Wildcard:</strong> A logical OR operation between the Network ID (`172.16.8.0`) and the wildcard mask (`0.0.3.255`) gives the Broadcast Address.</li>
                           <li><strong>Result:</strong> `172.16.11.255` is the broadcast address for the `172.16.8.0/22` network.</li>
                        </ol>
                        <p>Essentially, the broadcast address is found by taking the network address and setting all the host bits to '1'. This ensures it's the highest possible address within the subnet. You can visualize the binary operations using our <Link href="/tools/ip-to-binary" className="text-primary hover:underline">IP to Binary Converter</Link>.</p>
                    </section>
                     <section>
                        <h3 className="font-bold text-xl">Why Are Broadcasts Necessary?</h3>
                        <p>If broadcasts create so much traffic, why are they used? Because they solve fundamental "chicken-and-egg" problems in networking, where a device needs to communicate without knowing a specific destination address.</p>
                         <ul className="list-disc pl-5">
                            <li><strong>DHCP (Dynamic Host Configuration Protocol):</strong> When a new device joins a network, it doesn't have an IP address yet. To get one, it sends a "DHCP Discover" message to the broadcast address `255.255.255.255`. Any DHCP server on the local network will hear this "shout" and can offer an IP address.</li>
                            <li><strong>ARP (Address Resolution Protocol):</strong> When your computer wants to send a packet to another device on the same local network (e.g., your printer at `192.168.1.50`), it knows the IP but needs the physical MAC address for the Layer 2 frame. It sends an ARP request to the broadcast address, effectively asking, "Who has IP 192.168.1.50? Tell me your MAC address." Only the printer responds, allowing direct communication to begin.</li>
                             <li><strong>Routing Protocols:</strong> Some older routing protocols like RIP used broadcasts to advertise their routes to other routers on the same network. Modern protocols have largely shifted to more efficient multicast addresses.</li>
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
                            <li><strong>Quick Mental Math:</strong> For a simple `/24` network, the broadcast address is always the network ID with `.255` at the end (e.g., for `10.20.30.0/24`, the broadcast is `10.20.30.255`).</li>
                            <li><strong>Security Implications:</strong> Firewalls are often configured to block broadcast traffic from entering or leaving a network to prevent attacks like the "Smurf attack," where an attacker sends packets to a broadcast address using a spoofed source IP, causing all hosts to reply to and flood the victim.</li>
                            <li><strong>Directed vs. Limited Broadcasts:</strong> Know the difference. A packet to `192.168.1.255` is a *directed* broadcast for that subnet. A packet to `255.255.255.255` is a *limited* broadcast for the sender's immediate physical segment only. Most routers will not forward directed broadcasts by default for security reasons.</li>
                            <li><strong>Check Your ARP Table:</strong> On your computer, run the command `arp -a` (Windows/macOS/Linux) to see your device's ARP cache, which lists the IP-to-MAC address pairings it has learned through broadcasts.</li>
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                         <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                    </CardHeader>
                    <CardContent>
                         <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                            <li><strong>Assigning the Broadcast Address:</strong> A frequent beginner error is trying to assign the broadcast address as a static IP to a device. Operating systems will reject this as an invalid configuration.</li>
                            <li><strong>Using it as a Gateway:</strong> The gateway address must be a usable host IP within the subnet, not the broadcast address.</li>
                            <li><strong>Miscalculating the Range:</strong> Incorrectly calculating the subnet range and believing the broadcast address is a usable host IP. Always remember the usable range ends *one address before* the broadcast address.</li>
                             <li><strong>Creating Broadcast Storms:</strong> A network loop (e.g., connecting two ports on the same switch) can cause broadcast packets to circle and multiply endlessly, consuming all available bandwidth and crashing the network.</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
            
            <section>
                <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Troubleshooting a New Device</h3>
                        <p className="text-sm text-muted-foreground">A technician plugs in a new computer, but it can't get an IP address. They run a packet capture and see no DHCP offers. By confirming the subnet's broadcast address with this tool, they can configure a test machine to send a packet to that address. If the new computer responds, they know its hardware is working, and the problem likely lies with the DHCP server not hearing the initial broadcast request.</p>
                    </div>
                     <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Network Monitoring Setup</h3>
                        <p className="text-sm text-muted-foreground">A network administrator is configuring a monitoring tool to listen for "Wake-on-LAN" magic packets. These packets are sent to the subnet's broadcast address to wake up sleeping computers. The admin uses this calculator to find the correct broadcast address for the engineering subnet (`10.1.50.255/24`) to ensure the wake-up signals are sent correctly.</p>
                    </div>
                     <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Understanding Game Lobbies</h3>
                        <p className="text-sm text-muted-foreground">Some older LAN games discover other players on the network by sending a broadcast packet. A student setting up a retro LAN party uses this tool to find their network's broadcast address. This helps them understand why the game can find players on their local subnet but not on their friend's network across the internet, illustrating the non-routable nature of local broadcasts.</p>
                    </div>
                     <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Validating Firewall Configuration</h3>
                        <p className="text-sm text-muted-foreground">A security analyst is auditing a firewall ruleset. They see a rule that explicitly denies traffic to `172.16.31.255`. Using the calculator with the network's `/20` mask, they determine that this is the broadcast address for a specific subnet. This confirms the rule is correctly configured to block directed broadcast traffic, preventing potential amplification attacks.</p>
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
                                <CardDescription className="text-xs">The perfect companion tool. Calculate the Network ID, Host Range, and Broadcast Address all in one place.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                    <Link href="/tools/network-address-calculator" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">Network Address Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">Focus on finding the first address in a subnet, the counterpart to the broadcast address.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                    <Link href="/tools/ip-to-binary" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">IP to Binary Converter<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">Visualize the binary operations that determine the broadcast address.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                </div>
            </section>
        </div>
    );
}
