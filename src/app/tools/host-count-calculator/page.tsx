
import { PageHeader } from '@/components/page-header';
import { HostCountCalculator } from './host-count-calculator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Lightbulb, AlertTriangle, BookOpen, ChevronRight, Wand, Users, Globe } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


export const metadata = {
    title: 'Host Count Calculator | ICT Toolbench',
    description: 'Quickly calculate the total and usable number of hosts for any given IPv4 CIDR prefix. Essential for network planning and subnetting.',
};

export default function HostCountCalculatorPage() {
    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqData.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer.replace(/<[^>]*>?/gm, '') } })),
    };

    const softwareAppSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Host Count Calculator",
      "operatingSystem": "All",
      "applicationCategory": "DeveloperApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "A free online tool to calculate the total and usable number of hosts for any given IPv4 CIDR prefix.",
      "url": "https://www.icttoolbench.com/tools/host-count-calculator"
    };

  return (
    <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
      <PageHeader
        title="Host Count Calculator"
        description="Instantly determine the number of available host addresses for any network size based on its CIDR prefix."
      />
      <div className="max-w-4xl mx-auto space-y-12">
            <HostCountCalculator />

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
                        <CardTitle className="text-primary">Educational Deep Dive: Where Do the Hosts Come From?</CardTitle>
                    </div>
                    <CardDescription>Understand the fundamental binary math that dictates the size of your network.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                    <section>
                        <h3 className="font-bold text-xl">The 32-Bit Pie: Network vs. Host Portions</h3>
                        <p>Every IPv4 address is a 32-bit number. The subnet mask's job is to slice this 32-bit "pie" into two pieces: the <strong>network portion</strong> and the <strong>host portion</strong>. The CIDR prefix tells you exactly where that slice happens.</p>
                        <p>A CIDR of <strong>/24</strong> means the first 24 bits are for the network, and the remaining bits are for the hosts. The calculation is simple: 32 total bits - 24 network bits = <strong>8 host bits</strong>.</p>
                        <p>The number of possible hosts is determined by how many unique combinations you can make with the available host bits. Since each bit can be either a 0 or a 1, the formula is <strong>2<sup>(number of host bits)</sup></strong>.</p>
                        <p>For a /24 network with 8 host bits, this gives us 2<sup>8</sup> = 256 total addresses. This is the 'Total Hosts' number you see in the calculator.</p>
                    </section>
                    <section>
                        <h3 className="font-bold text-xl">Why "Usable" is Different from "Total"</h3>
                        <p>If a /24 network has 256 addresses, why can you only use 254? This is because two addresses in every standard subnet are reserved for special functions:</p>
                        <ul className="list-disc pl-5">
                           <li><strong>The Network ID:</strong> The very first address in a subnet, where all the host bits are '0', is used to identify the network itself. It cannot be assigned to a device. You can find this using our <a href='/tools/network-address-calculator' className='text-primary hover:underline'>Network Address Calculator</a>.</li>
                           <li><strong>The Broadcast Address:</strong> The very last address, where all the host bits are '1', is used to send messages to every device on that subnet simultaneously. This also cannot be assigned to a single device. You can find this using our <a href='/tools/broadcast-address-calculator' className='text-primary hover:underline'>Broadcast Address Calculator</a>.</li>
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
                            <li><strong>CIDR for Planning:</strong> When planning a new network, always think in terms of required hosts first, then use that to determine the necessary CIDR prefix. Our <a href='/tools/vlsm-calculator' className='text-primary hover:underline'>VLSM Calculator</a> automates this process for complex networks.</li>
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
                            <li><strong>Inefficient Allocation:</strong> Using a /24 subnet for a WAN link that only needs 2 hosts. This wastes 252 addresses. Proper planning with tools like the <a href='/tools/vlsm-calculator' className='text-primary hover:underline'>VLSM Calculator</a> prevents this.</li>
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
                        <p className="text-sm text-muted-foreground">A network is running out of IP addresses on its /24 subnet. An admin needs to justify an expansion to management. Using the calculator, they can clearly show that a /24 provides only 254 usable IPs, and then demonstrate that moving to a /23 would double their capacity to 510 usable IPs, providing a data-driven reason for the change.</p>
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
    </>
  );
}
