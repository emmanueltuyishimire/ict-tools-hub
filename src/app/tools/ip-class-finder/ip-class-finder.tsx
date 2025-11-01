
'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { StructuredData } from '@/components/structured-data';
import { Lightbulb, AlertCircle, Wand, AlertTriangle, BookOpen, ChevronRight, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

// --- IP Class Logic ---
const getIpClassDetails = (ip: string) => {
    if (!ip) {
        return {
            class: 'N/A',
            message: 'Enter an IP address to see its class.',
            details: null,
            isValid: false
        };
    }
    const parts = ip.split('.').map(part => parseInt(part, 10));
    if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) {
        return {
            class: 'Invalid',
            message: 'Invalid IPv4 address format. Please enter four numbers between 0 and 255, separated by dots.',
            details: null,
            isValid: false,
        };
    }

    const firstOctet = parts[0];
    let details;

    if (firstOctet >= 1 && firstOctet <= 126) {
        details = { class: 'A', range: '1.0.0.0 to 126.255.255.255', defaultMask: '255.0.0.0 (/8)', purpose: 'Very Large Networks' };
    } else if (firstOctet === 127) {
        details = { class: 'Loopback', range: '127.0.0.0 to 127.255.255.255', defaultMask: '255.0.0.0 (/8)', purpose: 'Host Self-Reference (e.g., localhost)' };
    } else if (firstOctet >= 128 && firstOctet <= 191) {
        details = { class: 'B', range: '128.0.0.0 to 191.255.255.255', defaultMask: '255.255.0.0 (/16)', purpose: 'Medium to Large Networks' };
    } else if (firstOctet >= 192 && firstOctet <= 223) {
        details = { class: 'C', range: '192.0.0.0 to 223.255.255.255', defaultMask: '255.255.255.0 (/24)', purpose: 'Small Local Area Networks (LANs)' };
    } else if (firstOctet >= 224 && firstOctet <= 239) {
        details = { class: 'D', range: '224.0.0.0 to 239.255.255.255', defaultMask: 'N/A', purpose: 'Multicast Traffic (e.g., streaming video to a group)' };
    } else if (firstOctet >= 240 && firstOctet <= 255) {
        details = { class: 'E', range: '240.0.0.0 to 255.255.255.255', defaultMask: 'N/A', purpose: 'Experimental and Reserved for Future Use' };
    } else { // Catches 0.x.x.x
        details = { class: 'Reserved', range: '0.0.0.0 to 0.255.255.255', defaultMask: 'N/A', purpose: 'Reserved for special use (e.g., default route)' };
    }
    
    return { ...details, isValid: true, message: `This is a Class ${details.class} address.` };
};

const classData = [
    { class: 'A', range: '1.x.x.x - 126.x.x.x', defaultMask: '/8', networks: 126, hosts: '16,777,214' },
    { class: 'B', range: '128.x.x.x - 191.x.x.x', defaultMask: '/16', networks: '16,384', hosts: '65,534' },
    { class: 'C', range: '192.x.x.x - 223.x.x.x', defaultMask: '/24', networks: '2,097,152', hosts: '254' },
    { class: 'D', range: '224.x.x.x - 239.x.x.x', defaultMask: 'N/A', networks: 'N/A', hosts: 'Multicast Group' },
    { class: 'E', range: '240.x.x.x - 255.x.x.x', defaultMask: 'N/A', networks: 'N/A', hosts: 'Reserved' },
];


// --- FAQ & Schema Data ---
const faqData = [
    { question: "What is classful IP addressing?", answer: "Classful addressing is the original IPv4 allocation method that divides the IP address space into five classes (A, B, C, D, E). Each class has a predefined size and default subnet mask, which determines the number of networks and hosts it can support. It was largely superseded by CIDR because it was inefficient and wasted many IP addresses." },
    { question: "Is classful addressing still used today?", answer: "No, not for internet-wide routing. The internet now uses Classless Inter-Domain Routing (CIDR), which allows for flexible subnet mask sizes (e.g., /22, /27) and more efficient allocation of IP addresses. However, the concepts of Class A, B, and C are still widely taught as a foundation for understanding IP addressing, and their default masks (/8, /16, /24) remain common choices for private networks." },
    { question: "Why is the 127.x.x.x range not listed as Class A?", answer: "Although the first octet '127' falls within the Class A range (1-127), the entire 127.0.0.0/8 block is reserved for loopback addresses. A loopback address (like 127.0.0.1 or 'localhost') is a special IP that a device uses to send traffic to itself, which is essential for testing network software without needing a physical network." },
    { question: "Why does Class A have so few networks but so many hosts?", answer: "In a Class A address, only the first octet is used to define the network, and the remaining three octets define the hosts. This design results in a small number of possible networks (126 of them) but allows each of those networks to have a massive number of hosts (over 16 million). This was intended for huge organizations but proved to be extremely wasteful." },
    { question: "What are Class D and E addresses used for?", answer: "Class D addresses are reserved for multicasting. A multicast packet is sent to a specific multicast group address, and only devices that have subscribed to that group will process the packet. It's used for things like streaming video to multiple subscribers or online gaming. Class E addresses were reserved by the IETF for future or experimental use and are not used on the public internet." },
    { question: "What is CIDR and why did it replace classful addressing?", answer: "CIDR (Classless Inter-Domain Routing) eliminated the rigid boundaries of Class A, B, and C. With CIDR, a network is defined by an IP address and a prefix length (e.g., 192.168.1.0/24). This allows network administrators to create subnets of any size, a process called Variable Length Subnet Masking (VLSM), which dramatically improves IP address allocation efficiency." },
    { question: "What is the 'default subnet mask' for each class?", answer: "The default mask is the subnet mask that was automatically assumed for a classful address. Class A used 255.0.0.0 (/8), Class B used 255.255.0.0 (/16), and Class C used 255.255.255.0 (/24). You can explore these masks further with our Subnet Mask Converter tool." },
    { question: "Are private IP addresses (like 192.168.1.1) still considered Class C?", answer: "Yes and no. The address 192.168.1.1 falls within the numerical range of Class C. However, in modern networking, its behavior is defined by its subnet mask (usually /24), not its class. The term 'Class C' is often used informally to refer to any /24 network, but technically all modern routing is 'classless'. Our Public vs. Private IP Checker can tell you if an address falls within a private range." },
    { question: "Why does the Class A range start at 1, not 0?", answer: "The 0.0.0.0/8 block is reserved for special use cases. The most common is `0.0.0.0`, which is used to specify a default route in a routing table, essentially meaning 'any network'." },
    { question: "What is a 'supernet'?", answer: "Supernetting is the opposite of subnetting. It's the process of combining multiple smaller, contiguous networks into one larger network. For example, you could combine four /24 networks (like 192.168.0.0/24 through 192.168.3.0/24) into a single /22 supernet. This is a core concept of CIDR." },
];

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer.replace(/<[^>]*>?/gm, '') } })),
};

const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Find the Class of an IP Address',
    description: 'A step-by-step guide to determine the class of an IPv4 address based on its first octet.',
    step: [
        { '@type': 'HowToStep', name: 'Enter the IP Address', text: 'Type or paste the IPv4 address you want to analyze into the input field.' },
        { '@type': 'HowToStep', name: 'Examine the First Octet', text: 'Look at the first number in the IP address (the first octet).' },
        { '@type': 'HowToStep', name: 'Match to Class Range', text: 'The tool instantly compares the first octet to the defined ranges for each class (e.g., 1-126 for Class A, 192-223 for Class C).' },
        { '@type': 'HowToStep', name: 'Review the Results', text: 'The result card will display the determined class, its purpose, its default address range, and the default subnet mask associated with it.' },
    ],
    totalTime: 'PT1M',
};

const keyTerminologies = [
    { term: 'Classful Addressing', definition: 'The original IPv4 allocation method dividing the address space into five fixed classes (A, B, C, D, E).' },
    { term: 'First Octet', definition: 'The first of the four decimal numbers in an IPv4 address, which determines its class in classful addressing.' },
    { term: 'Default Subnet Mask', definition: 'A predefined subnet mask automatically associated with a classful address (/8 for Class A, /16 for B, /24 for C).' },
    { term: 'CIDR (Classless Inter-Domain Routing)', definition: 'The modern system that replaced classful addressing, allowing for flexible network sizes using prefix notation (e.g., /22).' },
    { term: 'Loopback Address', definition: 'A special address (127.0.0.1) that a device uses to send traffic to itself, used for testing.' },
    { term: 'Multicast', definition: 'A communication method where a message is sent to a group of interested destinations simultaneously (Class D).' },
];

export function IpClassFinder() {
    const [ipAddress, setIpAddress] = useState('172.16.10.5');
    const result = useMemo(() => getIpClassDetails(ipAddress), [ipAddress]);

    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <StructuredData data={faqSchema} />
            <StructuredData data={howToSchema} />
            <Card>
                <CardHeader>
                    <CardTitle>IP Class Finder</CardTitle>
                    <CardDescription>Enter any IPv4 address to instantly determine its class and default properties.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="ip-input">IP Address</Label>
                        <Input
                            id="ip-input"
                            type="text"
                            value={ipAddress}
                            onChange={(e) => setIpAddress(e.target.value)}
                            placeholder="e.g., 10.1.2.3"
                            className="font-code"
                            aria-label="IP Address Input"
                        />
                    </div>
                     {ipAddress.length > 0 && result && (
                         <Alert variant={result.isValid ? 'default' : 'destructive'} className={result.isValid ? 'border-blue-500/50' : ''}>
                             {result.isValid ? <CheckCircle className="h-4 w-4 text-blue-600" /> : <XCircle className="h-4 w-4" />}
                             <AlertTitle className={`font-bold ${result.isValid ? 'text-blue-700' : ''}`}>{result.class} Address</AlertTitle>
                             <AlertDescription>{result.message}</AlertDescription>
                         </Alert>
                     )}
                     
                     {result.isValid && result.details && (
                        <Card className="bg-muted/50">
                            <CardHeader>
                                <CardTitle className="text-lg">Class Properties</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableBody>
                                        <TableRow><TableHead className="font-semibold">Default Mask</TableHead><TableCell className="font-code">{result.details.defaultMask}</TableCell></TableRow>
                                        <TableRow><TableHead className="font-semibold">Address Range</TableHead><TableCell className="font-code">{result.details.range}</TableCell></TableRow>
                                        <TableRow><TableHead className="font-semibold">Primary Use</TableHead><TableCell>{result.details.purpose}</TableCell></TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                     )}
                </CardContent>
            </Card>

            <section>
                <h2 className="text-2xl font-bold mb-4">How to Use the IP Class Finder</h2>
                <Card className="prose prose-sm max-w-none text-foreground p-6">
                    <p>Understanding the historical system of IP classes is a key part of networking education. This tool makes it easy to identify the class of any IP address.</p>
                    <ol>
                        <li><strong>Enter an IP Address:</strong> Type any valid IPv4 address into the input field.</li>
                        <li><strong>Get an Instant Result:</strong> The tool automatically analyzes the first octet (the first number) of the IP address as you type.</li>
                        <li><strong>Review the Classification:</strong> A result card will immediately appear, labeling the IP address with its class (A, B, C, D, E, or special cases like Loopback).</li>
                        <li><strong>Analyze the Properties:</strong> If the IP belongs to a standard class, a "Class Properties" table will show you its default subnet mask, the full numerical range for that class, and its intended purpose.</li>
                    </ol>
                     <Alert>
                        <Lightbulb className="h-4 w-4" />
                        <AlertTitle>Example</AlertTitle>
                        <AlertDescription>
                          Try entering <code className="font-code bg-muted p-1 rounded-sm">192.168.0.1</code>. The tool will identify it as a Class C address. Then, enter <code className="font-code bg-muted p-1 rounded-sm">10.50.30.1</code> to see a Class A address and notice how the default mask and range change.
                        </AlertDescription>
                    </Alert>
                </Card>
            </section>
            
            <section>
                 <h2 className="text-2xl font-bold mb-4">Key Terminologies</h2>
                 <Card>
                    <CardContent className="p-6">
                        <dl className="space-y-4">
                            {keyTerminologies.map((item) => (
                                <div key={item.term}>
                                    <dt className="font-semibold">{item.term}</dt>
                                    <dd className="text-muted-foreground text-sm">{item.definition}</dd>
                                </div>
                            ))}
                        </dl>
                    </CardContent>
                 </Card>
            </section>

            <Card className='bg-secondary/30 border-primary/20'>
                <CardHeader>
                    <div className='flex items-center gap-2 text-primary'>
                        <BookOpen className="h-6 w-6" aria-hidden="true" />
                        <CardTitle className="text-primary">Educational Deep Dive: The Rise and Fall of Classful Networking</CardTitle>
                    </div>
                    <CardDescription>Explore the historical IP addressing system that shaped the early internet and understand why it was replaced.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                    <section>
                        <h3 className="font-bold text-xl">What is Classful IP Addressing?</h3>
                        <p>In the early days of the internet, a system was needed to distribute IPv4 addresses to organizations. The solution was a "classful" system, which divided the entire IPv4 address space into five distinct classes: A, B, C, D, and E. The class of an address was determined solely by the value of its first octet (the first of the four numbers in the address). Each class had a fixed, non-negotiable size and a default subnet mask.</p>
                        <p>This rigid structure was simple to understand and implement, which was perfect for the nascent internet. Routers of that era could determine the network size just by looking at the first few bits of any address, without needing to be told the subnet mask explicitly.</p>
                    </section>
                    <section>
                        <h3 className="font-bold text-xl">The Five Classes at a Glance</h3>
                        <p>The classful system defined the IP landscape with strict boundaries. Here is a summary of how it was structured:</p>
                        <div className="overflow-x-auto my-4">
                           <Table>
                              <TableHeader><TableRow><TableHead>Class</TableHead><TableHead>First Octet Range</TableHead><TableHead>Default Mask</TableHead><TableHead># of Networks</TableHead><TableHead>Hosts per Network</TableHead></TableRow></TableHeader>
                              <TableBody>
                                {classData.map(c => (
                                    <TableRow key={c.class}>
                                        <TableCell className="font-bold text-center">{c.class}</TableCell>
                                        <TableCell className="font-code">{c.range}</TableCell>
                                        <TableCell className="font-code">{c.defaultMask}</TableCell>
                                        <TableCell>{c.networks}</TableCell>
                                        <TableCell>{c.hosts}</TableCell>
                                    </TableRow>
                                ))}
                              </TableBody>
                           </Table>
                        </div>
                        <ul className="list-disc pl-5">
                            <li><strong>Class A:</strong> Intended for massive organizations. Only 126 such networks could exist, but each one could support over 16 million hosts.</li>
                            <li><strong>Class B:</strong> For medium-to-large organizations, providing over 16,000 networks, each with 65,534 hosts.</li>
                            <li><strong>Class C:</strong> The most common class, for small networks. It allowed for over 2 million networks, but each could only have 254 hosts.</li>
                            <li><strong>Class D:</strong> Reserved for multicast, where a single packet is sent to a "group" of interested hosts simultaneously.</li>
                            <li><strong>Class E:</strong> Reserved for experimental purposes and never deployed for general use.</li>
                        </ul>
                    </section>
                     <section>
                        <h3 className="font-bold text-xl">The Inefficiency Problem and the Birth of CIDR</h3>
                        <p>The classful system had a fatal flaw: it was incredibly wasteful. Imagine a company with 300 employees. A Class C network (254 hosts) was too small. The only option was to give them a Class B network (65,534 hosts). This meant that over 65,000 IP addresses were allocated to that company but would never be used, becoming "wasted space." As the internet grew in the early 1990s, experts realized that the entire IPv4 address space would be depleted in a matter of years if this continued.</p>
                        <p>The solution was <strong>CIDR (Classless Inter-Domain Routing)</strong>, introduced in 1993. CIDR completely abolished the rigid Class A, B, and C boundaries. Instead of a default mask, CIDR allows a network to be defined by a prefix of any length from /0 to /32. This enabled the creation of subnets (and supernets) of any size, a practice known as <Link href="/tools/vlsm-calculator" className="text-primary hover:underline">Variable Length Subnet Masking (VLSM)</Link>. Now, a company needing 300 hosts could be assigned a /23 network (512 addresses), which was a much more efficient fit. CIDR is the system that powers the internet today, but the legacy of classful addressing still influences network design and education.</p>
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
                            <li><strong>First Octet is Key:</strong> To quickly identify a class manually, just memorize the first octet ranges: 1-126 (A), 128-191 (B), 192-223 (C).</li>
                            <li><strong>"Class C" as Slang:</strong> In modern networking, you'll often hear people refer to any /24 network as a "Class C," regardless of its first octet. This is technically incorrect but is common industry slang for a network with 254 usable hosts.</li>
                            <li><strong>Private Address Classes:</strong> Note how the private IP ranges fall into the classful system: the 10.0.0.0/8 range is a single Class A network, the 172.16.0.0/12 range is 16 contiguous Class B networks, and the 192.168.0.0/16 range is 256 contiguous Class C networks.</li>
                            <li><strong>Subnetting a Classful Network:</strong> The original purpose of subnetting was to take a large classful network (like a Class B) and break it into smaller, manageable pieces for internal use, long before CIDR was invented.</li>
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                         <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Misconceptions</CardTitle></div>
                    </CardHeader>
                    <CardContent>
                         <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                            <li><strong>"My IP is a Class C":</strong> A common mistake is to say an IP like `25.10.20.30` is a "Class C" because it's used for a small network. This is incorrect; based on its first octet (25), it's a Class A address. Its small size is due to modern subnetting (CIDR), not its class.</li>
                            <li><strong>"Class D has a subnet mask":</strong> Class D addresses are for multicast groups, not host networks. Therefore, they do not have subnet masks, network IDs, or broadcast addresses in the traditional sense.</li>
                            <li><strong>Assuming Default Masks:</strong> In a modern, classless network, you can never assume the subnet mask based on the first octet. An address starting with 10 (Class A range) could be part of a /24 subnet. You must always have the mask or CIDR prefix to understand the network.</li>
                            <li><strong>Trying to use Class E addresses:</strong> Class E addresses are not usable on any public or private network. They are rejected by virtually all network hardware as invalid.</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
            
            <section>
                <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Networking Student's Homework</h3>
                        <p className="text-sm text-muted-foreground">A student is given a list of IP addresses and asked to identify their class and default mask for a networking 101 course. They can use this tool to quickly verify their manual calculations and solidify their understanding of the first-octet rules, building a strong foundation before moving on to CIDR and subnetting.</p>
                    </div>
                     <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Analyzing Old Network Documentation</h3>
                        <p className="text-sm text-muted-foreground">A network administrator takes over a legacy network with documentation from the 1990s. The documents refer to networks only by their class (e.g., "The sales department is on a Class C network"). The admin can use the IP Class Finder to understand the original intent and default boundaries of these networks before planning a migration to a modern, classless architecture.</p>
                    </div>
                     <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Troubleshooting a Misconfigured Router</h3>
                        <p className="text-sm text-muted-foreground">An old router is malfunctioning. A technician looks at its configuration and sees an IP address of `224.0.0.5` assigned to an interface. By using the tool, they instantly identify this as a Class D multicast address. This tells them the router is likely misconfigured for a multicast protocol, rather than standard host traffic, pointing them in the right direction to fix the issue.</p>
                    </div>
                     <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Setting Up a Home Lab</h3>
                        <p className="text-sm text-muted-foreground">Someone setting up a home lab for learning decides to use a Class A private IP range (10.0.0.0/8) to get a feel for a large address space. They use the IP Class Finder to confirm the ranges and default mask, helping them understand the historical context of the address block they are about to use for their modern, classless subnetting experiments.</p>
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
                                        <div dangerouslySetInnerHTML={{ __html: item.answer.replace(/<a href='([^']*)' class='[^']*'>/g, "<a href='$1' class='text-primary hover:underline'>").replace(/<a href="([^"]*)" class="[^"]*">/g, '<a href="$1" class="text-primary hover:underline">') }} />
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
                                <CardDescription className="text-xs">Explore how modern, classless subnetting works beyond the default class boundaries.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                    <Link href="/tools/ip-privacy-checker" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">Public vs Private IP Checker<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">Check if an IP address belongs to the special private ranges (A, B, or C).</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                    <Link href="/tools/ip-to-binary" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">IP to Binary Converter<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">See the underlying binary structure that determines an IP's class.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                </div>
            </section>
        </div>
    );
}
