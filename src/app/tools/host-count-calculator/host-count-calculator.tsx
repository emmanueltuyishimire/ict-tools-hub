
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { StructuredData } from '@/components/structured-data';
import { Lightbulb, AlertTriangle, BookOpen, ChevronRight, Wand, Users, Globe } from 'lucide-react';
import Link from 'next/link';

// --- IP Math Logic ---
const cidrToMask = (cidr: number): string => {
    if (cidr < 0 || cidr > 32) return 'Invalid CIDR';
    const mask = (0xFFFFFFFF << (32 - cidr)) >>> 0;
    return `${(mask >>> 24)}.${(mask >> 16) & 255}.${(mask >> 8) & 255}.${mask & 255}`;
};

// --- FAQ & Schema Data ---
const faqData = [
    { question: "What is a 'host' in networking?", answer: "A host is any device on a network that is assigned an IP address. This can be a computer, smartphone, printer, server, or any other network-connected device." },
    { question: "Why are the 'usable' hosts different from the 'total' hosts?", answer: "In any subnet, two addresses are reserved and cannot be assigned to hosts. The first address is the Network ID (which identifies the subnet itself), and the last address is the Broadcast Address (used to send messages to all hosts on the subnet). Therefore, the number of usable hosts is always the total number of hosts minus two (except for the special cases of /31 and /32)." },
    { question: "How is the number of hosts calculated from a CIDR prefix?", answer: "The CIDR prefix (e.g., /24) tells you how many bits are used for the network portion of an IPv4 address. Since an IPv4 address has 32 bits total, the remaining bits are for the host portion. If the CIDR is 'n', then the number of host bits is '32 - n'. The total number of hosts is 2 raised to the power of the number of host bits (2^(32-n))." },
    { question: "What are the special cases for /31 and /32 networks?", answer: "A /32 network has only one IP address. It has 0 host bits, so it can't have traditional hosts; it's used to identify a single device, typically in routing. A /31 network has two IP addresses. It was originally considered unusable but is now standard practice (RFC 3021) for point-to-point links between two routers, where both addresses are assigned, resulting in 2 usable 'hosts' and no wasted network/broadcast IPs." },
    { question: "How do I choose the right CIDR prefix for my network?", answer: "You should choose the smallest possible subnet (largest CIDR number) that can accommodate your required number of hosts, plus a reasonable buffer for future growth. For example, if you need 50 hosts, you should choose a /26 (62 usable hosts), not a /27 (30 usable hosts). Our <a href='/tools/vlsm-calculator' class='text-primary hover:underline'>VLSM Calculator</a> is designed for this kind of planning." },
    { question: "Does a larger CIDR number mean more or fewer hosts?", answer: "A larger CIDR number (e.g., /29) means more network bits and fewer host bits, resulting in *fewer* hosts. A smaller CIDR number (e.g., /22) means fewer network bits and more host bits, resulting in *more* hosts." },
    { question: "Is this calculator for IPv4 or IPv6?", answer: "This calculator is for IPv4 only. IPv6 uses a 128-bit address space and a similar prefix length concept, but the number of hosts is so astronomically large that calculating it is not typically a practical concern in the same way." },
    { question: "What CIDR prefix does a typical home network use?", answer: "Most home networks use a /24 prefix, which corresponds to a subnet mask of 255.255.255.0. This provides 254 usable host addresses (e.g., from 192.168.1.1 to 192.168.1.254), which is more than enough for most households." },
    { question: "Can I determine the number of hosts from a subnet mask?", answer: "Yes. The number of hosts is determined by the number of '0' bits in the binary representation of the subnet mask. This tool simplifies the process by starting with the CIDR prefix. You can use our <a href='/tools/subnet-mask-converter' class='text-primary hover:underline'>Subnet Mask Converter</a> to find the CIDR for any valid mask." },
    { question: "What's the relationship between this and subnetting?", answer: "This calculator is a core part of subnetting. When you perform subnetting, you are deciding how to divide a large network into smaller ones. The primary consideration is how many hosts each smaller subnet needs to support, which in turn determines the CIDR prefix you will assign to it. Our <a href='/tools/subnet-calculator' class='text-primary hover:underline'>Subnet Calculator</a> provides a more complete view of a single subnet." },
];

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer.replace(/<[^>]*>?/gm, '') } })),
};

const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Calculate the Number of Hosts in a Subnet',
    description: 'Determine the number of total and usable IP addresses available in a network based on its CIDR prefix.',
    step: [
        { '@type': 'HowToStep', name: 'Select CIDR Prefix', text: 'Choose the CIDR prefix of your network from the dropdown list (e.g., /24).' },
        { '@type': 'HowToStep', name: 'View Instant Results', text: 'The tool will automatically calculate and display the Total Hosts and Usable Hosts for the selected prefix.' },
        { '@type': 'HowToStep', name: 'Analyze Associated Data', text: 'The results card will also show the corresponding subnet mask for the chosen CIDR prefix.' },
    ],
    totalTime: 'PT1M',
};

export function HostCountCalculator() {
    const [cidr, setCidr] = useState('24');

    const { totalHosts, usableHosts, subnetMask } = useMemo(() => {
        const cidrNum = parseInt(cidr, 10);
        if (isNaN(cidrNum) || cidrNum < 0 || cidrNum > 32) {
            return { totalHosts: 0, usableHosts: 0, subnetMask: 'Invalid' };
        }

        const hostBits = 32 - cidrNum;
        const total = Math.pow(2, hostBits);

        let usable;
        if (cidrNum === 32) {
            usable = 1; // Special case for a single host route
        } else if (cidrNum === 31) {
            usable = 2; // Special case for point-to-point links
        } else {
            usable = total - 2;
        }

        return {
            totalHosts: total,
            usableHosts: Math.max(0, usable),
            subnetMask: cidrToMask(cidrNum),
        };
    }, [cidr]);

    const cidrOptions = useMemo(() => {
        return Array.from({ length: 33 }, (_, i) => {
            const cidrVal = 32 - i;
            return { value: cidrVal.toString(), label: `/${cidrVal}` };
        }).reverse();
    }, []);

    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <StructuredData data={faqSchema} />
            <StructuredData data={howToSchema} />
            <Card>
                <CardHeader>
                    <CardTitle>Host Count Calculator</CardTitle>
                    <CardDescription>Select a CIDR prefix to instantly see the number of hosts it supports.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="cidr-select">Network CIDR Prefix</Label>
                        <Select value={cidr} onValueChange={setCidr}>
                            <SelectTrigger id="cidr-select" className="w-full sm:w-[280px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {cidrOptions.map(option => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 text-center">
                        <div className="bg-muted p-6 rounded-lg">
                            <Users className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground">Total Hosts</p>
                            <p className="text-4xl font-bold">{totalHosts.toLocaleString()}</p>
                        </div>
                        <div className="bg-muted p-6 rounded-lg border-2 border-primary/50">
                            <Globe className="mx-auto h-8 w-8 text-primary mb-2" />
                            <p className="text-sm text-muted-foreground">Usable Hosts</p>
                            <p className="text-4xl font-bold text-primary">{usableHosts.toLocaleString()}</p>
                        </div>
                    </div>
                     <Alert>
                        <Lightbulb className="h-4 w-4" />
                        <AlertTitle>Corresponding Subnet Mask</AlertTitle>
                        <AlertDescription>
                            A /<span className="font-bold">{cidr}</span> prefix corresponds to the subnet mask: <code className="font-code bg-secondary p-1 rounded-sm">{subnetMask}</code>
                        </AlertDescription>
                    </Alert>
                </CardContent>
            </Card>

            <section>
                <h2 className="text-2xl font-bold mb-4">How to Use the Host Count Calculator</h2>
                <Card className="prose prose-sm max-w-none text-foreground p-6">
                    <p>This tool provides a quick and direct way to answer one of the most common questions in network planning: "How many devices can I put on this network?"</p>
                    <ol>
                        <li><strong>Select the CIDR Prefix:</strong> Use the dropdown menu to choose the CIDR prefix of the network you want to analyze (e.g., /24, /26, /16).</li>
                        <li><strong>Review the Results Instantly:</strong> As soon as you make a selection, the results are calculated and displayed.
                            <ul>
                                <li><strong>Total Hosts:</strong> This is the theoretical total number of addresses in the subnet, including the reserved network and broadcast addresses.</li>
                                <li><strong>Usable Hosts:</strong> This is the practical number of addresses you can assign to your devices (computers, printers, phones, etc.).</li>
                            </ul>
                        </li>
                        <li><strong>Note the Subnet Mask:</strong> For reference, the tool also shows you the full dot-decimal subnet mask that corresponds to your chosen CIDR prefix.</li>
                    </ol>
                </Card>
            </section>

             <Card className='bg-secondary/30 border-primary/20'>
                <CardHeader>
                    <div className='flex items-center gap-2 text-primary'>
                        <BookOpen className="h-6 w-6" aria-hidden="true" />
                        <CardTitle className="text-primary">Educational Deep Dive: Where Do the Hosts Come From?</CardTitle>
                    </div>
                    <CardDescription>Understand the fundamental binary math that dictates the size of your network.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                    <section>
                        <h3 className="font-bold text-xl">The 32-Bit Pie: Network vs. Host Portions</h3>
                        <p>Every IPv4 address is a 32-bit number. The subnet mask's job is to slice this 32-bit "pie" into two pieces: the **network portion** and the **host portion**. The CIDR prefix tells you exactly where that slice happens.</p>
                        <p>A CIDR of <strong>/24</strong> means the first 24 bits are for the network, and the remaining bits are for the hosts. The calculation is simple: 32 total bits - 24 network bits = <strong>8 host bits</strong>.</p>
                        <p>The number of possible hosts is determined by how many unique combinations you can make with the available host bits. Since each bit can be either a 0 or a 1, the formula is <strong>2<sup>(number of host bits)</sup></strong>.</p>
                        <p>For a /24 network with 8 host bits, this gives us 2<sup>8</sup> = 256 total addresses. This is the 'Total Hosts' number you see in the calculator.</p>
                    </section>
                    <section>
                        <h3 className="font-bold text-xl">Why "Usable" is Different from "Total"</h3>
                        <p>If a /24 network has 256 addresses, why can you only use 254? This is because two addresses in every standard subnet are reserved for special functions:</p>
                        <ul className="list-disc pl-5">
                           <li><strong>The Network ID:</strong> The very first address in a subnet, where all the host bits are '0', is used to identify the network itself. It cannot be assigned to a device. You can find this using our <a href='/tools/network-address-calculator' class='text-primary hover:underline'>Network Address Calculator</a>.</li>
                           <li><strong>The Broadcast Address:</strong> The very last address, where all the host bits are '1', is used to send messages to every device on that subnet simultaneously. This also cannot be assigned to a single device. You can find this using our <a href='/tools/broadcast-address-calculator' class='text-primary hover:underline'>Broadcast Address Calculator</a>.</li>
                        </ul>
                        <p>Therefore, the formula for usable hosts is <strong>2<sup>(number of host bits)</sup> - 2</strong>. This rule holds true for all subnets except for the special cases below.</p>
                    </section>
                    <section>
                        <h3 className="font-bold text-xl">Special Cases: /31 and /32</h3>
                        <p>The "minus two" rule has exceptions for very small subnets:</p>
                         <ul className="list-disc pl-5">
                           <li><strong>/32 Subnet:</strong> This has 0 host bits (32-32=0). 2<sup>0</sup> = 1 total address. Since there's no room for a separate network and broadcast ID, the single address serves to identify a specific host, often used in routing tables. Usable Hosts: 1.</li>
                           <li><strong>/31 Subnet:</strong> This has 1 host bit (32-31=1). 2<sup>1</sup> = 2 total addresses. Originally deemed unusable, RFC 3021 updated networking standards to allow /31 subnets for point-to-point links (like connecting two routers). In this context, there's no need for network and broadcast IDs, so both addresses are assigned to the two devices. Usable Hosts: 2.</li>
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
                            <li><strong>The Rule of 8:</strong> Each jump of 8 in the CIDR prefix (/8 → /16 → /24 → /32) corresponds to one full octet. A /24 has 256 total hosts. A /16 has 256 * 256 = 65,536 hosts.</li>
                            <li><strong>Doubling and Halving:</strong> Each time you decrease the CIDR prefix by 1 (e.g., from /25 to /24), you double the number of hosts. Each time you increase it by 1 (e.g., from /24 to /25), you halve the number of hosts.</li>
                            <li><strong>Plan for Growth:</strong> A common rule of thumb is to choose a subnet size that accommodates your current needs plus at least 25-50% extra capacity for future growth. Running out of IP addresses is a major administrative headache.</li>
                            <li><strong>CIDR for Planning:</strong> When planning a new network, always think in terms of required hosts first, then use that to determine the necessary CIDR prefix. Our <a href='/tools/vlsm-calculator' class='text-primary hover:underline'>VLSM Calculator</a> automates this process for complex networks.</li>
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                         <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                    </CardHeader>
                    <CardContent>
                         <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                            <li><strong>Confusing Total and Usable Hosts:</strong> A classic beginner's mistake. If you need 64 hosts, a /26 (which has 64 total hosts) is too small because it only provides 62 usable addresses. You would need to step down to a /25.</li>
                            <li><strong>Ignoring the "-2" Rule:</strong> Forgetting to subtract the network and broadcast addresses when calculating available IPs for devices.</li>
                            <li><strong>Applying the "-2" Rule to /31:</strong> Incorrectly stating that a /31 subnet has 0 usable hosts. While true in the old way of thinking, modern networking standards make it the most efficient choice for point-to-point links with 2 usable IPs.</li>
                            <li><strong>Inefficient Allocation:</strong> Using a /24 subnet for a WAN link that only needs 2 hosts. This wastes 252 addresses. Proper planning with tools like the <a href='/tools/vlsm-calculator' class='text-primary hover:underline'>VLSM Calculator</a> prevents this.</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
            
            <section>
                <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Planning a Small Office Network</h3>
                        <p className="text-sm text-muted-foreground">An administrator is setting up a new office for 25 employees. Each employee has a computer and a phone, and there are 5 network printers. Total required hosts: 25*2 + 5 = 55. Using the calculator, they see that a /27 (30 usable hosts) is too small, but a /26 (62 usable hosts) is perfect, providing room for growth.</p>
                    </div>
                     <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Configuring a Guest Wi-Fi Network</h3>
                        <p className="text-sm text-muted-foreground">A coffee shop wants to provide Wi-Fi for up to 100 concurrent guests. The owner uses the host count calculator to determine they need a subnet that supports at least 100 hosts. They find that a /25 prefix, which provides 126 usable host addresses, is the ideal choice for their DHCP server's address pool.</p>
                    </div>
                     <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Designing a Virtual Private Cloud (VPC)</h3>
                        <p className="text-sm text-muted-foreground">A cloud engineer is designing a VPC in AWS. They need to create a private subnet for a cluster of 8 application servers. To conserve IP space, they check the host count calculator and see that a /28 prefix provides 14 usable hosts, which is a perfect fit for their 8 servers plus room for scaling, without wasting hundreds of addresses.</p>
                    </div>
                     <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Justifying a Network Upgrade</h3>
                        <p className="text-sm text-muted-foreground">A network is running out of IP addresses on its /24 subnet. An admin needs to justify an expansion to management. Using the calculator, they can clearly show that a /24 provides only 254 usable IPs, and then demonstrate that moving to a /23 would double their capacity to 510 usable IPs, providing a clear, data-driven reason for the change.</p>
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
                                <CardDescription className="text-xs">Get a complete analysis of a subnet, including host range, network ID, and broadcast address.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                    <Link href="/tools/vlsm-calculator" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">VLSM Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">Plan an entire network scheme by starting with your host requirements.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                    <Link href="/tools/subnet-mask-converter" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">Subnet Mask Converter<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">Convert between CIDR notation and dot-decimal subnet masks.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                </div>
            </section>
        </div>
    );
}
