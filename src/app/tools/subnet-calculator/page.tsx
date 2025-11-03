
import { PageHeader } from '@/components/page-header';
import { SubnetCalculator } from './subnet-calculator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { Lightbulb, AlertTriangle, BookOpen, ChevronRight, Wand } from 'lucide-react';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const metadata = {
    title: 'IPv4 Subnet Calculator | ICT Toolbench',
    description: 'A comprehensive IPv4 Subnet Calculator for network administrators and students. Easily calculate network addresses, broadcast addresses, usable host ranges, and more for any CIDR prefix.',
};

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

export default function SubnetCalculatorPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <StructuredData data={faqSchema} />
            <StructuredData data={howToSchema} />
            <PageHeader
                title="IPv4 Subnet Calculator"
                description="Your go-to tool for all subnetting calculations. Enter any IP address and CIDR prefix to get a complete breakdown of the network, including the network ID, broadcast address, usable host range, and more."
            />
            <SubnetCalculator />

            <section>
                <h2 className="text-2xl font-bold mb-4">How to Use the Subnet Calculator</h2>
                <Card className="prose prose-sm max-w-none text-foreground p-6">
                    <p>Our subnet calculator is a powerful tool designed for network administrators, students, and IT professionals. It simplifies the complex task of subnetting by providing all the crucial information you need about a network segment in seconds.</p>
                    <ol>
                        <li><strong>Enter an IP Address:</strong> Start by typing any valid IPv4 address from the network you want to analyze into the "IP Address" field. This could be a server's IP, a router's IP, or any host IP within the subnet.</li>
                        <li><strong>Select the Subnet Mask:</strong> Use the dropdown menu to choose the correct subnet mask. For your convenience, we've listed them by CIDR prefix (e.g., /24) and included the corresponding dot-decimal notation (e.g., 255.255.255.0).</li>
                        <li><strong>Calculate:</strong> Click the "Calculate" button.</li>
                        <li><strong>Review the Results:</strong> The tool will instantly display a comprehensive table of results, including the network ID, broadcast address, usable host range, total and usable hosts, wildcard mask, and more.</li>
                    </ol>
                    <Alert>
                        <Lightbulb className="h-4 w-4" />
                        <AlertTitle>Example Scenario</AlertTitle>
                        <AlertDescription>
                          Imagine you're given an IP <code className="font-code bg-muted p-1 rounded-sm">172.20.100.55</code> with a subnet mask of <code className="font-code bg-muted p-1 rounded-sm">255.255.240.0</code>. Simply enter the IP, select <code className="font-code bg-muted p-1 rounded-sm">/20 (255.255.240.0)</code> from the list, and click "Calculate". You'll immediately find out that the usable IPs are from <code className="font-code bg-muted p-1 rounded-sm">172.20.96.1</code> to <code className="font-code bg-muted p-1 rounded-sm">172.20.111.254</code>.
                        </AlertDescription>
                    </Alert>
                </Card>
            </section>

            <Card className='bg-secondary/30 border-primary/20'>
                <CardHeader>
                    <div className='flex items-center gap-2 text-primary'>
                        <BookOpen className="h-6 w-6" aria-hidden="true" />
                        <CardTitle className="text-primary">Educational Deep Dive: Mastering Subnetting</CardTitle>
                    </div>
                    <CardDescription>Go beyond the numbers and understand the core principles that make networks efficient and secure.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                    <section>
                        <h3 className="font-bold text-xl">What is Subnetting and Why Does It Matter?</h3>
                        <p>In the early days of the internet, networks were assigned in large, fixed blocks called classes (Class A, B, C). A Class A network, for example, contained over 16 million IP addresses. Assigning such a massive block to a single organization was incredibly wasteful, as most would never use even a fraction of those IPs. This led to the rapid depletion of available IPv4 addresses. Subnetting was created to solve this problem. It is the process of taking a single large network and breaking it down into multiple smaller, more manageable networks called 'subnets'.</p>
                        <p>This division provides several key benefits:</p>
                        <ul className="list-disc pl-5">
                            <li><strong>Reduced Network Congestion:</strong> Network traffic is broadcast to all devices within the same broadcast domain. By creating smaller subnets, you create smaller broadcast domains. This means that a broadcast message (like an ARP request) from a device in one subnet won't flood devices in another, reducing overall network chatter and improving performance.</li>
                            <li><strong>Enhanced Security:</strong> Subnetting allows you to group devices by function or security level. You can place all your sensitive database servers in one subnet and guest Wi-Fi devices in another. Then, using a router or firewall, you can create strict Access Control Lists (ACLs) that control the traffic flowing between these subnets. This makes it much harder for a compromised device on the guest network to access critical servers.</li>
                            <li><strong>Simplified Administration:</strong> Managing a network of 10,000 devices is a nightmare. Managing 40 subnets of 250 devices is far more organized. Subnetting helps in logically grouping devices, making troubleshooting, monitoring, and applying policies much easier. If there's an issue, you can isolate it to a specific subnet instead of having to inspect the entire network.</li>
                        </ul>
                    </section>
                    <section>
                        <h3 className="font-bold text-xl">The Magic Behind the Mask: Network vs. Host Portions</h3>
                        <p>The key to understanding subnetting lies in the relationship between an IP address and its subnet mask. Both are 32-bit numbers, but the subnet mask has a special purpose: it acts as a filter to tell a device which part of the IP address is the 'network address' and which part is the 'host address'.</p>
                        <p>An IP address is always analyzed in binary. A subnet mask consists of a series of consecutive '1's followed by a series of consecutive '0's. The '1's in the mask correspond to the network portion of the IP, and the '0's correspond to the host portion. To see this clearly, you can use our <Link href="/tools/ip-to-binary" className='text-primary hover:underline'>IP to Binary converter</Link>.</p>
                        <p>Let's take a common example: <strong>IP: 192.168.1.10, Mask: 255.255.255.0</strong></p>
                        <div className="grid md:grid-cols-2 gap-4 my-4 font-code text-sm">
                            <div className="bg-muted p-2 rounded"><strong>IP in Binary:</strong><br/>11000000.10101000.00000001.00001010</div>
                            <div className="bg-muted p-2 rounded"><strong>Mask in Binary:</strong><br/>11111111.11111111.11111111.00000000</div>
                        </div>
                        <p>When a router sees this, it performs a logical AND operation between the IP and the mask to find the Network ID:</p>
                        <p>The first 24 bits (where the mask has '1's) are preserved, defining the network as <code className="font-code bg-muted p-1 rounded-sm">192.168.1.0</code>. The last 8 bits (where the mask has '0's) are available for hosts, allowing for 2<sup>8</sup> = 256 addresses within that network. By "borrowing" bits from the host portion and adding them to the network portion (e.g., changing the mask to /25), we can create two smaller subnets.</p>
                    </section>
                     <section>
                        <h3 className="font-bold text-xl">Decoding CIDR Notation</h3>
                        <p>Classless Inter-Domain Routing (CIDR) was introduced to replace the old classful system. CIDR notation is simply a shorthand for the subnet mask. It's represented by a forward slash followed by a number, like `/24`. This number indicates exactly how many consecutive '1's are at the beginning of the subnet mask. It's far more efficient and flexible than writing out `255.255.255.0`. You can use our <Link href="/tools/subnet-mask-converter" className='text-primary hover:underline'>Subnet Mask Converter</Link> to switch between formats.</p>
                        <div className="overflow-x-auto my-4">
                           <table className="w-full">
                              <thead>
                                 <tr className="border-b"><th className="p-2 text-left">CIDR</th><th className="p-2 text-left">Subnet Mask</th><th className="p-2 text-left">Total Hosts</th></tr>
                              </thead>
                              <tbody>
                                 <tr className="border-b"><td className="p-2 font-code">/8</td><td className="p-2 font-code">255.0.0.0</td><td className="p-2">16,777,216</td></tr>
                                 <tr className="border-b"><td className="p-2 font-code">/16</td><td className="p-2 font-code">255.255.0.0</td><td className="p-2">65,536</td></tr>
                                 <tr className="border-b"><td className="p-2 font-code">/24</td><td className="p-2 font-code">255.255.255.0</td><td className="p-2">256</td></tr>
                                 <tr><td className="p-2 font-code">/30</td><td className="p-2 font-code">255.255.255.252</td><td className="p-2">4</td></tr>
                              </tbody>
                           </table>
                        </div>
                        <p>A `/30` network is a common example for point-to-point links between two routers. It provides 4 total IP addresses: one for the network ID, one for the broadcast address, and two usable IPs for the routers at each end of the link. This is extremely efficient, wasting no addresses.</p>
                    </section>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <div className='flex items-center gap-2'>
                            <Wand className="h-6 w-6 text-accent" aria-hidden="true" />
                            <CardTitle>Pro Tips & Quick Hacks</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                            <li><strong>Magic Number Method:</strong> To quickly find network boundaries, subtract the last non-255 octet of your subnet mask from 256. For 255.255.240.0, the "magic number" is 256 - 240 = 16. This means your network IDs in the third octet will be multiples of 16 (0, 16, 32, 48, etc.).</li>
                            <li><strong>Memorize Powers of 2:</strong> Knowing your powers of 2 (2, 4, 8, 16, 32, 64, 128, 256...) is the fastest way to calculate the number of hosts in your head. A /27 network has 32-27=5 host bits, so 2<sup>5</sup> = 32 hosts.</li>
                            <li><strong>Use /31 for Point-to-Point:</strong> Modern networking (RFC 3021) allows using a /31 mask (255.255.255.254) for point-to-point links. This gives 2 addresses with no network or broadcast IDs, conserving even more IP space.</li>
                            <li><strong>Work Backwards:</strong> If you know you need 500 hosts, find the smallest power of 2 that is greater than 500 (which is 512, or 2<sup>9</sup>). This means you need 9 host bits, leaving you with a 32 - 9 = /23 network.</li>
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <div className='flex items-center gap-2'>
                            <AlertTriangle className="h-6 w-6 text-destructive" aria-hidden="true" />
                            <CardTitle>Common Mistakes to Avoid</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                            <li><strong>Off-by-One Errors:</strong> Forgetting that the number of usable hosts is always the total number of hosts minus two (for the network and broadcast addresses). A /26 network has 64 total addresses but only 62 are usable.</li>
                            <li><strong>Assigning Network/Broadcast IPs:</strong> Accidentally assigning the network ID or broadcast address to a device. These are reserved and will cause communication failures. Our calculator clearly defines the usable host range to prevent this.</li>
                            <li><strong>Incorrect Wildcard Mask Calculation:</strong> A common mistake is calculating wildcard masks incorrectly for ACLs. Remember, it's the inverse of the subnet mask. A /24 mask (255.255.255.0) has a wildcard of 0.0.0.255.</li>
                            <li><strong>Confusing Subnet Mask with CIDR:</strong> Using the wrong CIDR value for a given subnet mask. Our calculator shows both side-by-side to prevent confusion.</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>

            <section>
                <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">New Office Network Setup</h3>
                        <p className="text-sm text-muted-foreground">An IT administrator is setting up a new office with 120 employees. They are assigned the IP block `10.10.0.0/22`. To improve security and organization, they need separate networks for Servers (15 IPs), Staff (150 IPs), and Guest Wi-Fi (100 IPs). Using a <Link href="/tools/vlsm-calculator" className="text-primary hover:underline">VLSM calculator</Link>, they plan a scheme, creating a `/27` for servers, a `/24` for staff, and another `/24` for guests, all within their assigned block. The subnet calculator provides the exact IP ranges for each, ensuring no overlap and efficient use of addresses.</p>
                    </div>
                     <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Troubleshooting Connectivity Issues</h3>
                        <p className="text-sm text-muted-foreground">A user reports they can't access the internet from their desk at IP `192.168.2.130`. The help desk technician knows the network uses a `/25` mask (255.255.255.128). They plug the IP and mask into the subnet calculator and discover that the usable host range for that subnet is `192.168.2.1` to `192.168.2.126`. The user's IP is outside this range, instantly identifying a static IP misconfiguration as the problem.</p>
                    </div>
                     <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Configuring a Firewall Rule</h3>
                        <p className="text-sm text-muted-foreground">A security engineer needs to create a firewall rule to allow a specific server at `172.16.30.5` to access a database server. To make the rule as strict as possible, they need to specify a single IP address. They use the subnet calculator with a `/32` mask (255.255.255.255) to confirm the network ID is the IP itself, and the wildcard mask is `0.0.0.0`. This ensures their firewall rule only applies to that one server and nothing else.</p>
                    </div>
                     <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Studying for a Certification Exam</h3>
                        <p className="text-sm text-muted-foreground">A student preparing for the CCNA exam is given a complex practice question: "How many usable hosts are available in the subnet `199.45.12.64/26`?". They perform the calculation manually (32 - 26 = 6 host bits; 2^6 = 64 total hosts; 64 - 2 = 62 usable hosts). They then use the subnet calculator to quickly verify their answer is correct, building the speed and accuracy needed for the exam.</p>
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
                                        <div dangerouslySetInnerHTML={{ __html: item.answer.replace(/<a href='([^']*)' class='[^']*'>/g, "<a href='$1' class='text-primary hover:underline'>") }} />
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
                    <Link href="/tools/ip-to-binary" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">IP to Binary Converter<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">See the binary representation of any IP address to better understand subnet masks.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                    <Link href="/tools/vlsm-calculator" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">VLSM Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">Design a highly efficient network plan by creating subnets of different sizes.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                    <Link href="/tools/subnet-mask-converter" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">Subnet Mask Converter<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">Seamlessly convert between CIDR, Subnet Mask, and Wildcard Mask formats.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                </div>
            </section>
        </div>
    );
}
