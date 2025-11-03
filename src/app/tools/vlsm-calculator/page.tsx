
import React from 'react';
import { PageHeader } from '@/components/page-header';
import { VlsmCalculator } from './vlsm-calculator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { BookOpen, AlertTriangle, Wand, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const metadata = {
    title: 'VLSM Calculator | Variable Length Subnet Masking | ICT Toolbench',
    description: 'Design efficient IP addressing schemes using our Variable Length Subnet Mask (VLSM) calculator. Optimize your network by allocating IP addresses precisely based on host requirements.',
    openGraph: {
        title: 'VLSM Calculator | Variable Length Subnet Masking | ICT Toolbench',
        description: 'A powerful tool for network administrators to design and calculate subnets of various sizes, minimizing IP address waste and simplifying network design.',
        url: 'https://ict.calculation.site/tools/vlsm-calculator',
    }
};

const VlsmCalculatorPage = () => {
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
    
    const softwareAppSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "VLSM Calculator",
      "operatingSystem": "All",
      "applicationCategory": "DeveloperApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "A free online tool for designing efficient IP addressing schemes using Variable Length Subnet Masking by allocating subnets based on specific host requirements.",
      "url": "https://ict.calculation.site/tools/vlsm-calculator"
    };

    return (
        <div className="max-w-5xl mx-auto space-y-12">
            <StructuredData data={faqSchema} />
            <StructuredData data={howToSchema} />
            <StructuredData data={softwareAppSchema} />
            <PageHeader
                title="VLSM Calculator"
                description="Design efficient network schemes with Variable Length Subnet Masking. Allocate IP address space precisely according to the needs of each subnet, minimizing waste and maximizing scalability."
            />
            
            <VlsmCalculator />

            <section>
                <h2 className="text-2xl font-bold mb-4">How to Use the VLSM Calculator</h2>
                <Card className="prose prose-sm max-w-none text-foreground p-6">
                    <p>This VLSM calculator automates the complex task of designing an efficient IP allocation plan based on variable subnet sizes.</p>
                    <ol>
                        <li><strong>Enter the Major Network:</strong> Input the starting IP address and CIDR prefix of the large network block you wish to divide (e.g., `172.16.0.0` and `/22`).</li>
                        <li><strong>Define Subnet Requirements:</strong> For each required subnet, add a row and specify a descriptive name (e.g., "Engineering LAN") and the number of hosts it needs to support. The tool will automatically sort these from largest to smallest for optimal allocation.</li>
                        <li><strong>Design the Network:</strong> Click the "Design Network" button. The calculator will allocate the most appropriately sized subnet for each requirement from the major network block.</li>
                        <li><strong>Review the Allocation Plan:</strong> The results table will show the allocated details for each subnet, including its assigned network ID, usable host range, broadcast address, and the correct subnet mask. Any unallocated "leftover" space will also be shown.</li>
                    </ol>
                    <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Start with the Network Address</AlertTitle>
                        <AlertDescription>
                           For best results, ensure the "Major Network Address" you enter is the actual network ID for the given CIDR prefix. If you enter a host IP, the tool will show an error and suggest the correct network address to use.
                        </AlertDescription>
                    </Alert>
                </Card>
            </section>
            
             <section>
                <h2 className="text-2xl font-bold mb-4">Worked Example</h2>
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">Designing a Small Office Network</CardTitle>
                            <CardDescription>Allocating IP space for different departments and network links from a single `/24` block.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <p className="text-sm text-muted-foreground"><strong>Scenario:</strong> You've been given the network `192.168.10.0/24` to use for a new office. You need to create subnets for three departments and a link to another building.</p>
                           <div className="prose prose-sm max-w-none">
                               <ol>
                                   <li><strong>Gather Requirements:</strong>
                                        <ul>
                                            <li>Sales Department: Needs 50 hosts.</li>
                                            <li>Engineering Department: Needs 25 hosts.</li>
                                            <li>Management Department: Needs 10 hosts.</li>
                                            <li>WAN Link to HQ: Needs 2 hosts (for the two routers).</li>
                                        </ul>
                                   </li>
                                   <li><strong>Enter into Calculator:</strong> Input `192.168.10.0/24` as the major network and add the four subnet requirements. The calculator will sort them largest to smallest.</li>
                                   <li><strong>Analyze Results:</strong> The tool will produce the following plan:
                                        <ul className='text-sm'>
                                            <li><strong>Sales (50 hosts):</strong> Needs a `/26` subnet (62 usable hosts). Allocated: `192.168.10.0/26`.</li>
                                            <li><strong>Engineering (25 hosts):</strong> Needs a `/27` subnet (30 usable hosts). Allocated: `192.168.10.64/27`.</li>
                                            <li><strong>Management (10 hosts):</strong> Needs a `/28` subnet (14 usable hosts). Allocated: `192.168.10.96/28`.</li>
                                            <li><strong>WAN Link (2 hosts):</strong> Needs a `/30` subnet (2 usable hosts). Allocated: `192.168.10.112/30`.</li>
                                            <li><strong>Unallocated Space:</strong> The rest of the `/24` block, from `192.168.10.116` to `192.168.10.255`, is available for future use.</li>
                                        </ul>
                                   </li>
                                    <li><strong>Result:</strong> You now have a complete, efficient IP addressing scheme that meets all requirements while minimizing wasted addresses.</li>
                               </ol>
                           </div>
                        </CardContent>
                    </Card>
                </div>
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
                        <CardTitle className="text-primary">Educational Deep Dive: Mastering IP Address Efficiency</CardTitle>
                    </div>
                    <CardDescription>From FLSM to VLSM, understand the evolution of subnetting and why variable-length masks are the key to modern network design.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                    <section>
                        <h3>The Problem with Fixed-Length Subnetting (FLSM)</h3>
                        <p>
                            Before VLSM, networks were subnetted using <strong>Fixed-Length Subnet Masking (FLSM)</strong>. In an FLSM world, if you decided to divide a major network into, say, eight smaller subnets, all eight of those subnets had to be the exact same size.
                        </p>
                        <p>
                            This created massive inefficiency. Consider an office with a 100-person Sales department and a 2-person server link. With FLSM, you'd have to choose a subnet size that could accommodate the largest requirement (100 hosts). This would mean creating subnets that each have 126 usable IPs (a /25). While perfect for the Sales department, giving a /25 to the 2-person server link would waste 124 IP addresses. Multiply this waste across many subnets, and you can see how quickly a large IP block could be depleted.
                        </p>
                    </section>
                    <section>
                        <h3>The Solution: Variable-Length Subnet Masking (VLSM)</h3>
                        <p>
                            VLSM, made possible by the introduction of Classless Inter-Domain Routing (CIDR), solves this problem by allowing you to use different subnet masks for different subnets within the same major network. This lets you "right-size" each subnet to its specific need.
                        </p>
                        <p>The process, which this calculator automates, follows one critical rule: <strong>always allocate the largest subnets first.</strong></p>
                        <ol className="list-decimal pl-5">
                            <li>You start with a list of all your subnet requirements (e.g., number of hosts needed).</li>
                            <li>You sort this list from largest to smallest.</li>
                            <li>You take the largest requirement and find the smallest possible subnet (the largest CIDR prefix) that can accommodate it. You allocate this subnet from the start of your major network block.</li>
                            <li>You then take the next-largest requirement and allocate the next available IP block that is large enough for it.</li>
                            <li>You repeat this process until all requirements are met.</li>
                        </ol>
                        <p>By allocating the largest blocks first, you ensure that you don't fragment your address space, leaving you with only small, unusable "holes" later on. This results in a highly efficient IP addressing plan that minimizes waste and leaves the largest possible contiguous block of addresses for future growth.</p>
                    </section>
                </CardContent>
            </Card>
            
             <section>
                <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Corporate Network Design</h3>
                        <p className="text-sm text-muted-foreground">A network architect for a growing company is redesigning their internal IP scheme. They have departments of various sizes: Engineering (100 hosts), Sales (50 hosts), Marketing (20 hosts), and several point-to-point WAN links (2 hosts each). VLSM is the perfect tool to allocate a /25 for Engineering, a /26 for Sales, a /27 for Marketing, and multiple /30s or /31s for the WAN links, all from a single larger block like a /22.</p>
                    </div>
                     <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Cloud VPC Subnetting</h3>
                        <p className="text-sm text-muted-foreground">A cloud engineer is designing a Virtual Private Cloud (VPC) on AWS. They need a public subnet for web servers (10 hosts), a private application subnet (50 hosts), and a private database subnet (5 hosts). Using VLSM, they can efficiently carve these subnets out of their VPC's main CIDR block, ensuring proper network segmentation and security while conserving IP addresses.</p>
                    </div>
                </div>
            </section>

            <div className="grid md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <div className='flex items-center gap-2'><Wand className="h-6 w-6 text-accent" /> <CardTitle>Pro Tips</CardTitle></div>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                            <li><strong>Plan for Growth:</strong> When entering your host requirements, don't just use the exact number you need today. Add a buffer of 25-50% to each subnet to accommodate future growth without needing to re-IP your network.</li>
                            <li><strong>Document Everything:</strong> A VLSM scheme can become complex. Once you've used the calculator to design your network, document the plan thoroughly. Note what each subnet is for, its size, and its address range.</li>
                            <li><strong>Summarize for Routing:</strong> The beauty of a good VLSM design is that it can be easily summarized. If you've carved up a `/22` block, you can advertise a single `/22` route to the rest of your network, hiding the complexity of the smaller subnets within.</li>
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                         <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                    </CardHeader>
                    <CardContent>
                         <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                            <li><strong>Forgetting to Sort:</strong> Not allocating the largest subnets first. This can lead to a fragmented address space where you have enough total IPs left but no single block large enough for your next requirement.</li>
                            <li><strong>Off-by-One Errors:</strong> Manually calculating the start and end of subnets is prone to errors. A mistake of one bit can cause overlapping subnets, leading to major network conflicts.</li>
                            <li><strong>Not Starting with a Network Address:</strong> If you start your major network with a host address (e.g., `192.168.0.100/24`), all your calculations will be based on a false premise. Always start with the correct network ID (e.g., `192.168.0.0/24`).</li>
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
                                  <AccordionContent>{item.answer}</AccordionContent>
                              </AccordionItem>
                          ))}
                      </Accordion>
                  </CardContent>
              </Card>
          </section>

          <section>
              <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Link href="/tools/subnet-calculator" className="block">
                      <Card className="hover:border-primary transition-colors h-full">
                          <CardHeader>
                              <CardTitle className="text-base flex items-center justify-between">Subnet Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                              <CardDescription className="text-xs">Analyze any single subnet generated by the VLSM plan in greater detail.</CardDescription>
                          </CardHeader>
                      </Card>
                  </Link>
                  <Link href="/tools/cidr-to-subnet-list" className="block">
                      <Card className="hover:border-primary transition-colors h-full">
                          <CardHeader>
                              <CardTitle className="text-base flex items-center justify-between">CIDR to Subnet List (FLSM)<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                              <CardDescription className="text-xs">Compare VLSM with traditional fixed-length subnetting where all subnets are the same size.</CardDescription>
                          </CardHeader>
                      </Card>
                  </Link>
                   <Link href="/tools/ip-summarization" className="block">
                      <Card className="hover:border-primary transition-colors h-full">
                          <CardHeader>
                              <CardTitle className="text-base flex items-center justify-between">IP Summarization Tool<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                              <CardDescription className="text-xs">Perform the reverse of VLSM: aggregate multiple smaller networks back into a single summary route.</CardDescription>
                          </CardHeader>
                      </Card>
                  </Link>
              </div>
          </section>
        </div>
    );
};

export default VlsmCalculatorPage;
