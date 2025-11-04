
import { PageHeader } from '@/components/page-header';
import { SubnetCalculator } from './subnet-calculator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Lightbulb, AlertTriangle, BookOpen, ChevronRight, Wand } from 'lucide-react';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { faqData, howToSchema, keyTerminologies, softwareAppSchema } from './schema';

export const metadata = {
    title: 'IPv4 Subnet Calculator | ICT Tools Hub',
    description: 'A comprehensive IPv4 Subnet Calculator for network administrators and students. Easily calculate network addresses, broadcast addresses, usable host ranges, and more for any CIDR prefix.',
    openGraph: {
      title: 'IPv4 Subnet Calculator | ICT Tools Hub',
      description: 'The ultimate tool for subnetting calculations. Get network ID, broadcast, host range, subnet mask, and wildcard mask for any IPv4 address and CIDR prefix.',
      url: 'https://ict.calculation.site/tools/subnet-calculator',
    }
};

export default function SubnetCalculatorPage() {
    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqData.map(item => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer.replace(/<[^>]*>?/gm, ''),
            },
        })),
    };

    return (
        <>
             <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
            />
            <div className="max-w-4xl mx-auto space-y-12">
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
                            <li><strong>Review the Results:</strong> The tool will instantly display a comprehensive table of results, including the network ID, broadcast address, usable host range, total and usable hosts, wildcard mask, and other relevant information.</li>
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
                
                <section>
                    <h2 className="text-2xl font-bold mb-4">Worked Examples</h2>
                    <div className="space-y-6">
                         <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Example 1: A Standard Class C Network</CardTitle>
                                <CardDescription>Analyzing a typical home or small office network.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-muted-foreground"><strong>Scenario:</strong> You have the IP address `192.168.1.150` with a subnet mask of `/24`.</p>
                                <div className="prose prose-sm max-w-none">
                                    <ol>
                                        <li><strong>Input:</strong> IP: `192.168.1.150`, Mask: `/24 (255.255.255.0)`</li>
                                        <li><strong>Calculation:</strong> The `/24` mask means the first 24 bits are for the network, leaving 8 bits for hosts. The network portion is `192.168.1`.</li>
                                        <li><strong>Results:</strong>
                                            <ul>
                                                <li>Network ID: `192.168.1.0` (all host bits are 0)</li>
                                                <li>Broadcast Address: `192.168.1.255` (all host bits are 1)</li>
                                                <li>Usable Host Range: `192.168.1.1` to `192.168.1.254`</li>
                                                <li>Usable Hosts: 254</li>
                                            </ul>
                                        </li>
                                    </ol>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Example 2: A Point-to-Point WAN Link</CardTitle>
                                <CardDescription>Calculating the addresses for a link between two routers.</CardDescription>
                            </CardHeader>
                             <CardContent className="space-y-4">
                               <p className="text-sm text-muted-foreground"><strong>Scenario:</strong> You need to configure a link between two routers and want to conserve IP addresses. You use a `/30` mask on the address `10.100.5.21`.</p>
                               <div className="prose prose-sm max-w-none">
                                   <ol>
                                       <li><strong>Input:</strong> IP: `10.100.5.21`, Mask: `/30 (255.255.255.252)`</li>
                                       <li><strong>Calculation:</strong> A `/30` mask leaves only 2 bits for hosts (2² = 4 total addresses). The network block size is 4. The networks are `.0, .4, .8, .12, .16, .20, .24...` The IP `.21` falls into the `.20` network.</li>
                                       <li><strong>Results:</strong>
                                            <ul>
                                                <li>Network ID: `10.100.5.20`</li>
                                                <li>Broadcast Address: `10.100.5.23`</li>
                                                <li>Usable Host Range: `10.100.5.21` to `10.100.5.22`</li>
                                                <li>Usable Hosts: 2. This is a highly efficient allocation for a two-device link.</li>
                                            </ul>
                                       </li>
                                   </ol>
                               </div>
                            </CardContent>
                        </Card>
                    </div>
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
                            <p>In the early days of the internet, networks were assigned in large, fixed blocks called classes (Class A, B, C). A Class A network, for example, contained over 16 million IP addresses. Assigning such a massive block to a single organization was incredibly wasteful. Subnetting was created to solve this problem. It is the process of taking a single large network and breaking it down into multiple smaller, more manageable networks called 'subnets'.</p>
                            <p>This division provides several key benefits:</p>
                            <ul className="list-disc pl-5">
                                <li><strong>Reduced Network Congestion:</strong> By creating smaller subnets, you create smaller broadcast domains. This means that a broadcast message (like an ARP request) from a device in one subnet won't flood devices in another, reducing overall network chatter and improving performance.</li>
                                <li><strong>Enhanced Security:</strong> Subnetting allows you to group devices by function or security level. You can place all your sensitive database servers in one subnet and guest Wi-Fi devices in another. Then, using a router or firewall, you can create strict Access Control Lists (ACLs) that control the traffic flowing between these subnets.</li>
                                <li><strong>Simplified Administration:</strong> Managing a network of 10,000 devices is a nightmare. Managing 40 subnets of 250 devices is far more organized. Subnetting helps in logically grouping devices, making troubleshooting, monitoring, and applying policies much easier.</li>
                            </ul>
                        </section>
                        <section>
                            <h3 className="font-bold text-xl">The Magic Behind the Mask: Network vs. Host Portions</h3>
                            <p>The key to understanding subnetting lies in the relationship between an IP address and its subnet mask. The subnet mask's job is to slice the 32-bit IP address into two pieces: the <strong>network portion</strong> and the <strong>host portion</strong>. The '1's in the mask correspond to the network portion, and the '0's correspond to the host portion. To see this clearly, you can use our <Link href="/tools/ip-to-binary" className='text-primary hover:underline'>IP to Binary converter</Link>.</p>
                            <p>Let's take a common example: <strong>IP: 192.168.1.10, Mask: 255.255.255.0 (/24)</strong></p>
                            <div className="grid md:grid-cols-2 gap-4 my-4 font-code text-sm">
                                <div className="bg-muted p-2 rounded"><strong>IP in Binary:</strong><br/>11000000.10101000.00000001.00001010</div>
                                <div className="bg-muted p-2 rounded"><strong>Mask in Binary:</strong><br/>11111111.11111111.11111111.00000000</div>
                            </div>
                            <p>The first 24 bits (where the mask has '1's) define the network as <code className="font-code bg-muted p-1 rounded-sm">192.168.1.0</code>. The last 8 bits (where the mask has '0's) are available for hosts, allowing for 2<sup>8</sup> = 256 addresses within that network. By "borrowing" bits from the host portion and adding them to the network portion (e.g., changing the mask to /25), we can create two smaller subnets.</p>
                        </section>
                         <section>
                            <h3>Decoding CIDR Notation</h3>
                            <p>Classless Inter-Domain Routing (CIDR) notation is a shorthand for the subnet mask, like `/24`. This number indicates exactly how many consecutive '1's are at the beginning of the subnet mask. It's far more efficient and flexible than writing out `255.255.255.0`. You can use our <Link href="/tools/subnet-mask-converter" className='text-primary hover:underline'>Subnet Mask Converter</Link> to switch between formats.</p>
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
                                <li><strong>Off-by-One Errors:</strong> Forgetting that the number of usable hosts is always the total number of hosts minus two (for the network and broadcast addresses). A /26 network has 64 total hosts but only 62 are usable.</li>
                                <li><strong>Assigning Network/Broadcast IPs:</strong> Accidentally assigning the network ID or broadcast address to a device. These are reserved and will cause communication failures. Our calculator clearly defines the usable host range to prevent this.</li>
                                <li><strong>Incorrect Wildcard Mask Calculation:</strong> A common mistake is calculating wildcard masks incorrectly for ACLs. Remember, it's the inverse of the subnet mask. A /24 mask (255.255.255.0) has a wildcard of 0.0.0.255.</li>
                                <li><strong>Confusing Subnet Mask with CIDR:</strong> Using the wrong CIDR value for a given subnet mask. Our calculator shows both side-by-side to prevent confusion.</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>

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
                    <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
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
        </>
    );
}

    