
'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { StructuredData } from '@/components/structured-data';
import { Lightbulb, AlertCircle, Wand, AlertTriangle, BookOpen, ChevronRight, Copy, Check, CheckCircle, XCircle, Fingerprint } from 'lucide-react';
import Link from 'next/link';

// --- MAC Address Logic & OUI Data ---
const ouiData: Record<string, string> = {
    '000C29': 'VMware, Inc.', '005056': 'VMware, Inc.', '020056': 'VMware, Inc.',
    '080027': 'Oracle Corporation (VirtualBox)',
    '000569': 'IBM Corporation',
    '3C5AB4': 'Google, Inc.', '001A11': 'Google, Inc.',
    'F8E43B': 'Apple, Inc.', 'A8A159': 'Apple, Inc.', 'D83062': 'Apple, Inc.', '0010FA': 'Apple, Inc.',
    'B827EB': 'Raspberry Pi Foundation', 'DCA632': 'Raspberry Pi Foundation', 'E45F01': 'Raspberry Pi Trading Ltd',
    '00E04C': 'Realtek Semiconductor Corp.',
    'E848B8': 'TP-LINK TECHNOLOGIES CO.,LTD.', '90F652': 'TP-LINK TECHNOLOGIES CO.,LTD.',
    'B03956': 'Intel Corporate', 'D481D7': 'Intel Corporate', '00A0C9': 'Intel Corporation',
    '9C5C8E': 'Dell Inc.', '180373': 'Dell Inc.', '001422': 'Dell Inc.',

    'B42E99': 'Hewlett Packard', '3CD92B': 'Hewlett Packard', '000B0D': 'Hewlett Packard',
    '00000C': 'Cisco Systems, Inc', '28940F': 'Cisco Systems, Inc', 'F87A41': 'Cisco Systems, Inc',
    '3413E8': 'Microsoft Corporation', 'C84B79': 'Microsoft Corporation',
    '00155D': 'Microsoft Corporation (Hyper-V)',
    'E0D55E': 'Amazon Technologies Inc.', '90B8D0': 'Amazon Technologies Inc.',
    '1C69A5': 'ASUSTek COMPUTER INC.',
    '001A70': 'ASRock Incorporation',
    '149182': 'NETGEAR',
};

const validateMac = (mac: string) => {
    if (!mac) return { isValid: false, message: 'Input is empty.', format: 'None', oui: 'N/A' };
    
    const originalMac = mac;
    const strippedMac = mac.replace(/[\s:.-]/g, '').toUpperCase();

    if (!/^[0-9A-F]*$/.test(strippedMac)) {
        return { isValid: false, message: 'Contains invalid hexadecimal characters.', format: 'None', oui: 'N/A' };
    }
    
    if (strippedMac.length !== 12) {
        return { isValid: false, message: `MAC address must be 12 hexadecimal characters long. You entered ${strippedMac.length}.`, format: 'None', oui: 'N/A' };
    }

    let format = 'Unknown';
    if (/^([0-9A-Fa-f]{2}:){5}([0-9A-Fa-f]{2})$/.test(originalMac)) {
        format = 'Colon-Separated (XX:XX:XX:XX:XX:XX)';
    } else if (/^([0-9A-Fa-f]{2}-){5}([0-9A-Fa-f]{2})$/.test(originalMac)) {
        format = 'Hyphen-Separated (XX-XX-XX-XX-XX-XX)';
    } else if (/^([0-9A-Fa-f]{4}\.){2}([0-9A-Fa-f]{4})$/.test(originalMac)) {
        format = 'Dot-Separated (Cisco-style)';
    } else if (/^[0-9A-Fa-f]{12}$/.test(originalMac)) {
        format = 'No Separator (XXXXXXXXXXXX)';
    }

    const oui = strippedMac.substring(0, 6);
    const vendor = ouiData[oui] || 'Unknown Vendor';
    const normalized = strippedMac.match(/.{1,2}/g)?.join(':') || '';

    return { isValid: true, message: 'Valid MAC Address', format, oui, vendor, normalized };
};


// --- FAQ & Schema Data ---
const faqData = [
    { question: "What is a MAC address?", answer: "A MAC (Media Access Control) address is a unique 48-bit hardware identifier assigned to a network interface controller (NIC) for use as a network address in communications within a network segment. It's like a physical serial number for your network hardware." },
    { question: "Is a MAC address the same as an IP address?", answer: "No. A MAC address is a permanent, hardware-level address, while an IP address is a logical, network-level address that can change. A MAC address is used for communication on the local network (Layer 2), while an IP address is used for routing data across different networks and the internet (Layer 3)." },
    { question: "Can two devices have the same MAC address?", answer: "Theoretically, no. MAC addresses are assigned by the manufacturer and are designed to be globally unique. However, it's possible for duplicate MAC addresses to exist due to manufacturing errors or through 'MAC spoofing,' where a user intentionally changes a device's MAC address." },
    { question: "What is an OUI?", answer: "An OUI (Organizationally Unique Identifier) is the first 24 bits (or 6 hexadecimal digits) of a MAC address. The IEEE assigns these prefixes to hardware manufacturers. By looking at the OUI, you can identify the company that made the network device, which is what this tool does." },
    { question: "What are the common formats for writing a MAC address?", answer: "The most common format uses colons as separators (e.g., 00:1A:2B:3C:4D:5E). Hyphens are also common, especially in Windows (e.g., 00-1A-2B-3C-4D-5E). Cisco devices often use a dot-separated format (e.g., 001a.2b3c.4d5e). This tool validates all these common formats." },
    { question: "Is it safe to enter my device's MAC address here?", answer: "Yes. This tool runs entirely in your web browser using JavaScript. The MAC address you enter is not sent to any server, stored, or logged. All validation happens on your local machine." },
    { question: "What is MAC spoofing?", answer: "MAC spoofing is the act of changing the MAC address reported by a network interface. It can be used for legitimate reasons, such as to bypass a network access control list on a router, or for malicious purposes, like impersonating another device on a network." },
    { question: "What is a broadcast MAC address?", answer: "The broadcast MAC address is FF:FF:FF:FF:FF:FF. A data frame sent to this address is received and processed by all devices on the local network segment. It's used for services like ARP to discover the MAC address of a device with a known IP address." },
    { question: "Does my Wi-Fi and Ethernet have the same MAC address?", answer: "No. Each network interface in a device has its own unique MAC address. Your laptop's Wi-Fi card has one MAC address, and its wired Ethernet port has another. Similarly, your phone's Wi-Fi and Bluetooth interfaces have different MAC addresses." },
    { question: "How can I find my device's MAC address?", answer: "On Windows, open Command Prompt and type `ipconfig /all`. On macOS or Linux, open the Terminal and type `ifconfig` or `ip addr`. On a mobile device, this information is usually found in the Wi-Fi or 'About Phone' settings." },
];

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })),
};

const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Validate a MAC Address',
    description: 'A step-by-step guide to check if a MAC address is valid and identify its manufacturer.',
    step: [
        { '@type': 'HowToStep', name: 'Enter the MAC Address', text: 'Type or paste the MAC address you want to validate into the input field. The tool accepts common formats like colon-separated (XX:XX:XX:XX:XX:XX), hyphen-separated (XX-XX-XX-XX-XX-XX), and no separator (XXXXXXXXXXXX).' },
        { '@type': 'HowToStep', name: 'Review Real-Time Results', text: 'The tool validates the address as you type. A status message will immediately indicate whether the format is valid.' },
        { '@type': 'HowToStep', name: 'Analyze the Details', text: 'If the address is valid, the results card will show the detected format, the normalized colon-separated format, the OUI (the first 6 characters), and the manufacturer associated with that OUI.' },
        { '@type': 'HowToStep', name: 'Clear or Copy', text: 'Use the "Clear" button to reset the tool or the copy button to copy the normalized MAC address.' }
    ],
    totalTime: 'PT1M',
};

// --- Component ---
export function MacValidator() {
    const [macAddress, setMacAddress] = useState('00:1A:2B:3C:4D:5E');
    const [hasCopied, setHasCopied] = useState(false);
    
    const validationResult = useMemo(() => validateMac(macAddress), [macAddress]);

    const handleCopyToClipboard = (value: string) => {
        if (!value) return;
        navigator.clipboard.writeText(value).then(() => {
            setHasCopied(true);
            setTimeout(() => setHasCopied(false), 2000);
        });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <StructuredData data={faqSchema} />
            <StructuredData data={howToSchema} />
            <Card>
                <CardHeader>
                    <CardTitle>MAC Address Validator</CardTitle>
                    <CardDescription>
                       Validate any MAC address format instantly and learn how MAC addressing works in networking.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="mac-input">MAC Address</Label>
                        <div className="flex flex-col sm:flex-row gap-2">
                           <Input
                                id="mac-input"
                                type="text"
                                value={macAddress}
                                onChange={(e) => setMacAddress(e.target.value)}
                                placeholder="e.g., 00:1A:2B:3C:4D:5E"
                                className="font-code flex-grow"
                                aria-label="MAC Address Input"
                            />
                            <div className='flex gap-2'>
                                <Button onClick={() => setMacAddress('')} variant="outline" className="w-full sm:w-auto">Clear</Button>
                            </div>
                        </div>
                    </div>
                     {macAddress.length > 0 && (
                         <Alert variant={validationResult.isValid ? 'default' : 'destructive'} className={validationResult.isValid ? 'border-green-500/50' : ''}>
                             {validationResult.isValid ? <CheckCircle className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4" />}
                             <AlertTitle>{validationResult.isValid ? 'Valid MAC Address' : 'Invalid MAC Address'}</AlertTitle>
                             <AlertDescription>{validationResult.message}</AlertDescription>
                         </Alert>
                     )}
                     
                     {validationResult.isValid && macAddress.length > 0 && (
                        <Card className="bg-muted/50">
                            <CardHeader>
                                <CardTitle className="text-lg">Validation Details</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableHead className="font-semibold">Normalized</TableHead>
                                            <TableCell className="font-code">
                                                 <div className="flex items-center justify-between">
                                                    <span>{validationResult.normalized}</span>
                                                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => handleCopyToClipboard(validationResult.normalized!)} aria-label={hasCopied ? 'Copied' : 'Copy'}>
                                                        {hasCopied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableHead className="font-semibold">OUI (Vendor ID)</TableHead>
                                            <TableCell className="font-code">{validationResult.oui}</TableCell>
                                        </TableRow>
                                         <TableRow>
                                            <TableHead className="font-semibold">Vendor</TableHead>
                                            <TableCell>{validationResult.vendor}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableHead className="font-semibold">Detected Format</TableHead>
                                            <TableCell>{validationResult.format}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                     )}
                </CardContent>
            </Card>

            <section>
                <h2 className="text-2xl font-bold mb-4">How to Use the Tool</h2>
                <Card className="prose prose-sm max-w-none text-foreground p-6">
                    <p>This MAC Address Validator provides a quick and easy way to check a MAC address and find its manufacturer. The validation happens instantly as you type.</p>
                    <ol>
                        <li><strong>Enter the MAC Address:</strong> Type or paste the MAC address into the input field. The tool is flexible and accepts several common formats:
                            <ul>
                                <li><strong>Colon-Separated:</strong> <code className="font-code bg-muted p-1 rounded-sm">00:1A:2B:3C:4D:5E</code></li>
                                <li><strong>Hyphen-Separated:</strong> <code className="font-code bg-muted p-1 rounded-sm">00-1A-2B-3C-4D-5E</code></li>
                                <li><strong>Dot-Separated (Cisco-style):</strong> <code className="font-code bg-muted p-1 rounded-sm">001a.2b3c.4d5e</code></li>
                                <li><strong>No Separators:</strong> <code className="font-code bg-muted p-1 rounded-sm">001A2B3C4D5E</code></li>
                            </ul>
                        </li>
                        <li><strong>Review Instant Feedback:</strong> A status box will appear immediately, showing whether the address is valid or invalid and explaining why.</li>
                        <li><strong>Check the Details:</strong> If the address is valid, a "Validation Details" card will display the standard colon-separated format, the OUI (the first six digits that identify the manufacturer), and the name of the manufacturer.</li>
                        <li><strong>Clear or Copy:</strong> Use the "Clear" button to empty the input field or the copy icon in the results table to copy the standardized MAC address.</li>
                    </ol>
                    <Alert>
                        <Lightbulb className="h-4 w-4" />
                        <AlertTitle>Client-Side Security</AlertTitle>
                        <AlertDescription>
                          This entire process happens securely in your browser. Your MAC address is never transmitted to our servers, ensuring your privacy.
                        </AlertDescription>
                    </Alert>
                </Card>
            </section>
            
            <Card className='bg-secondary/30 border-primary/20'>
                <CardHeader>
                    <div className='flex items-center gap-2 text-primary'>
                        <BookOpen className="h-6 w-6" aria-hidden="true" />
                        <CardTitle className="text-primary">Educational Deep Dive: The Digital Fingerprint</CardTitle>
                    </div>
                    <CardDescription>From hardware addresses to network identity, understand the critical role of the MAC address in modern networking.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                    <section>
                        <h3 className="font-bold text-xl">What is a MAC Address? The Unsung Hero of Local Networking</h3>
                        <p>Every device capable of connecting to a network—your computer, smartphone, router, smart TV—has a built-in hardware component called a Network Interface Controller (NIC). The MAC (Media Access Control) address is a unique 48-bit number burned into this hardware by the manufacturer. Think of it as the device's permanent, physical "serial number" for networking.</p>
                        <p>While an <Link href="/tools/ip-to-binary" className="text-primary hover:underline">IP address</Link> acts as a routable, logical address (like a home address that can change when you move), the MAC address is a non-routable, physical address used for communication within the same local network segment. It operates at Layer 2 (the Data Link Layer) of the OSI model, which is responsible for node-to-node data transfer between two directly connected devices.</p>
                    </section>
                    <section>
                        <h3 className="font-bold text-xl">The Structure of a MAC Address: Vendor and Device ID</h3>
                        <p>A 48-bit MAC address is typically written as twelve hexadecimal characters, grouped in pairs. These twelve characters are divided into two distinct parts:</p>
                        <div className="grid md:grid-cols-2 gap-4 my-4 font-code text-sm text-center">
                            <div className="bg-muted p-4 rounded">
                                <div className="text-lg">00:1A:2B:3C:4D:5E</div>
                                <div className="flex">
                                    <div className="flex-1 text-blue-500">↑↑:↑↑:↑↑</div>
                                    <div className="flex-1 text-red-500">↑↑:↑↑:↑↑</div>
                                </div>
                                <div className="flex">
                                    <div className="flex-1 text-blue-500 font-sans">OUI (Vendor)</div>
                                    <div className="flex-1 text-red-500 font-sans">NIC Specific (Device)</div>
                                </div>
                            </div>
                            <div className="bg-background p-4 rounded text-left font-sans">
                                <ul>
                                    <li className="flex items-start"><span className="text-blue-500 font-bold mr-2 w-28">OUI:</span> The first 6 hexadecimal digits (24 bits) form the <strong>Organizationally Unique Identifier</strong>. The IEEE assigns these blocks to manufacturers. This is how we can tell that `00:1A:2B` belongs to a specific vendor.</li>
                                    <li className="flex items-start"><span className="text-red-500 font-bold mr-2 w-28">NIC Specific:</span> The last 6 hexadecimal digits (24 bits) are assigned by the manufacturer and are unique to that specific piece of hardware.</li>
                                </ul>
                            </div>
                        </div>
                        <p>This structure ensures that, in theory, no two network devices in the world are manufactured with the same MAC address.</p>
                    </section>
                    <section>
                        <h3 className="font-bold text-xl">How MAC and IP Addresses Work Together (ARP)</h3>
                        <p>If MAC addresses are only for local communication, how does data get to the right device? This is where the Address Resolution Protocol (ARP) comes in. Let's say your computer (IP `192.168.1.100`) wants to send data to your printer (IP `192.168.1.150`) on the same Wi-Fi network.</p>
                        <ol className="list-decimal pl-5 space-y-2">
                           <li>Your computer knows the printer's IP address but needs its MAC address to create the data frame.</li>
                           <li>Your computer sends an ARP request to the broadcast MAC address (`FF:FF:FF:FF:FF:FF`). This message essentially shouts to the entire local network, "Who has the IP address `192.168.1.150`?"</li>
                           <li>Every device on the local network receives this message, but only the printer recognizes its own IP address.</li>
                           <li>The printer sends an ARP reply directly back to your computer's MAC address, saying, "I have that IP, and my MAC address is `E4:B9:7A:F1:2C:3D`."</li>
                           <li>Your computer stores this pairing in its ARP table (a temporary cache) and can now send data directly to the printer's MAC address. For a look at how IP addresses function in this flow, you can use our <Link href="/tools/subnet-calculator" className='text-primary hover:underline'>Subnet Calculator</Link>.</li>
                        </ol>
                         <p>When you want to connect to a website on the internet, this process happens between your computer and your router. Your computer sends the data to your router's MAC address, and the router then forwards the packet onto the internet using IP addresses.</p>
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
                            <li><strong>Quick Vendor Lookup:</strong> The first three octets (e.g., `00:1A:2B`) are often enough to identify a device's manufacturer at a glance in network logs.</li>
                            <li><strong>Filtering on Routers:</strong> You can increase your home network's security by setting up MAC address filtering on your router. This creates a whitelist of allowed devices, blocking any unknown device from connecting to your Wi-Fi, even if they have the password.</li>
                            <li><strong>Troubleshooting DHCP:</strong> If a device isn't receiving an IP address from your DHCP server, checking the server's logs for the device's MAC address can tell you if the device is even reaching the server.</li>
                             <li><strong>Identifying Rogue Devices:</strong> If you see an unknown MAC address with high traffic on your network, it could be an unauthorized device. Using an OUI lookup can help identify it (e.g., "Oh, that's just a new Amazon Echo device someone connected").</li>
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                         <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                    </CardHeader>
                    <CardContent>
                         <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                            <li><strong>Confusing O and 0:</strong> MAC addresses use hexadecimal, so they only contain digits 0-9 and letters A-F. The letter 'O' is never used. Many validation errors are simply typos between '0' (zero) and 'O' (the letter).</li>
                            <li><strong>Mixing Formats:</strong> Using inconsistent separators in the same address (e.g., `00:1A-2B...`). While some systems might parse this, it's invalid and bad practice.</li>
                            <li><strong>Using MAC for Internet Routing:</strong> Trying to ping or connect to a MAC address across the internet. MAC addresses are strictly for the local network link; only IP addresses are routable.</li>
                            <li><strong>Assuming MAC is a Security Feature:</strong> While MAC filtering can deter casual intruders, it's not foolproof. An attacker can easily sniff network traffic to find an allowed MAC address and then "spoof" it to gain access.</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
            
            <section>
                <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Corporate Network Security</h3>
                        <p className="text-sm text-muted-foreground">A network administrator uses a Network Access Control (NAC) system that logs the MAC address of every device attempting to connect. When an unfamiliar MAC `E8:48:B8:XX:XX:XX` appears, they use a validator to identify it as a TP-Link device. This helps them quickly determine it's likely an unauthorized personal router an employee plugged in, violating company policy.</p>
                    </div>
                     <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">DHCP Reservation</h3>
                        <p className="text-sm text-muted-foreground">A home user wants their network printer to always have the same IP address (`192.168.1.50`) so their print jobs don't fail. They find the printer's MAC address in its settings, validate its format using this tool, and then create a "DHCP Reservation" or "Static Lease" in their router's admin panel, tying the printer's MAC address to that specific IP.</p>
                    </div>
                     <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Event Ticketing Systems</h3>
                        <p className="text-sm text-muted-foreground">To prevent scalpers from using bots to buy large quantities of tickets, some online ticketing systems use device fingerprinting. One of the data points they might (with user permission and proper privacy considerations) look at is the device's MAC address to identify unique physical machines, making it harder for a single person to impersonate multiple buyers.</p>
                    </div>
                     <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Troubleshooting a Bridge or Switch</h3>
                        <p className="text-sm text-muted-foreground">A network technician is diagnosing issues with a Layer 2 switch. They can look at the switch's CAM (Content Addressable Memory) table, which is a list of all the MAC addresses it has seen and which physical port they are connected to. Validating these MAC addresses and looking up their vendors can help identify which devices are on which port and spot any anomalies.</p>
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
                    <Link href="/tools/ip-to-binary" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">IP to Binary Converter<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">Understand the IP address, the Layer 3 counterpart to the MAC address.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                    <Link href="/tools/subnet-calculator" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">Subnet Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">Learn how local networks are defined and how MAC and IP addresses interact within them.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                    <Link href="/tools/random-mac-generator" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">Random MAC Generator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">Generate random MAC addresses for testing or privacy purposes.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                </div>
            </section>
        </div>
    );
}
