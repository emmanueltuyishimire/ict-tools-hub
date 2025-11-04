
import React from 'react';
import { PageHeader } from '@/components/page-header';
import { SubnetMaskConverter } from './subnet-mask-converter';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BookOpen, AlertTriangle, Wand, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const metadata = {
    title: 'Subnet Mask Converter | CIDR & Wildcard Conversion | ICT Toolbench',
    description: 'Instantly convert between CIDR notation, dot-decimal subnet masks, and wildcard masks. An essential tool for network engineers configuring routers and firewalls.',
    openGraph: {
        title: 'Subnet Mask Converter | CIDR & Wildcard Conversion | ICT Toolbench',
        description: 'A free online tool to seamlessly convert between all IPv4 mask formats, with detailed explanations and examples for CIDR, subnet masks, and wildcard masks.',
        url: '/tools/subnet-mask-converter',
    }
};

const SubnetMaskConverterPage = () => {
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
      "name": "Subnet Mask Converter",
      "operatingSystem": "All",
      "applicationCategory": "DeveloperApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "A free online tool to convert between CIDR notation, dot-decimal subnet masks, and wildcard masks.",
      "url": "https://www.icttoolbench.com/tools/subnet-mask-converter"
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
                    title="Subnet Mask Converter"
                    description="An essential utility for network professionals. This tool provides instant and accurate two-way conversion between CIDR notation, standard dot-decimal subnet masks, and wildcard masks used in router configurations."
                />
                
                <SubnetMaskConverter />

                <section>
                  <h2 className="text-2xl font-bold mb-4">How to Use the Converter</h2>
                  <Card className="prose prose-sm max-w-none text-foreground p-6">
                      <p>This tool allows you to seamlessly convert between the three main formats for representing a network mask. The conversions update in real-time as you make changes.</p>
                      <ol>
                          <li><strong>Select Your Input Type:</strong> Choose the format you are starting with: `CIDR`, `Subnet Mask`, or `Wildcard Mask`.</li>
                          <li><strong>Enter Your Value:</strong> Based on your selection, either pick a CIDR prefix from the dropdown or type the mask into the text field. The tool will instantly validate your input.</li>
                          <li><strong>Review the Conversions:</strong> The results card will immediately populate with the equivalent values in all three formats, along with additional useful information like the number of supported hosts and the mask's binary representation.</li>
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
                            <CardTitle className="text-primary">Educational Deep Dive: The Three Faces of a Network Mask</CardTitle>
                        </div>
                        <CardDescription>From human-readable masks to router-specific wildcards, understand the different ways we represent the boundaries of a network.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                        <section>
                            <h3>1. The Subnet Mask (Dot-Decimal)</h3>
                            <p>
                                The <strong>Subnet Mask</strong> is the most fundamental representation. It's a 32-bit number that, like an IP address, is written in dot-decimal notation (e.g., `255.255.255.0`). Its sole purpose is to divide an IP address into two parts: the network portion and the host portion.
                            </p>
                            <p>
                                In binary, a subnet mask is a continuous string of '1's followed by a continuous string of '0's. The '1's correspond to the network bits, and the '0's correspond to the host bits. When a computer performs a bitwise AND operation between its IP address and its subnet mask, the result is the Network ID. Our <Link href="/tools/network-address-calculator" className='text-primary hover:underline'>Network Address Calculator</Link> demonstrates this exact process.
                            </p>
                        </section>
                        <section>
                            <h3>2. CIDR Notation (Prefix Length)</h3>
                            <p>
                                <strong>CIDR (Classless Inter-Domain Routing)</strong> notation is a modern, compact shorthand for a subnet mask. It's represented by a forward slash followed by a number, like `/24`. This number simply counts the number of leading '1's in the subnet mask's binary representation.
                            </p>
                             <ul className="list-disc pl-5">
                                <li>`255.255.255.0` has 24 leading '1's, so it is a `/24`.</li>
                                <li>`255.255.255.192` has 26 leading '1's, so it is a `/26`.</li>
                             </ul>
                            <p>CIDR is the standard way to represent network prefixes in modern routing protocols, cloud networking (VPCs), and firewall configurations because it is concise and unambiguous.</p>
                        </section>
                         <section>
                            <h3>3. The Wildcard Mask (Inverse Mask)</h3>
                            <p>
                                The <strong>Wildcard Mask</strong> is an inverted subnet mask. Where a subnet mask has a '1', a wildcard mask has a '0', and vice-versa. It is primarily used in networking hardware, especially Cisco routers and firewalls, to define ranges of IP addresses in Access Control Lists (ACLs).
                            </p>
                             <p>The logic is flipped:</p>
                             <ul className="list-disc pl-5">
                                <li>A `0` bit in the wildcard mask means: "The corresponding bit in the IP address being checked MUST match."</li>
                                <li>A `1` bit means: "I don't care about this bit; it can be a 0 or a 1."</li>
                             </ul>
                            <p>To calculate a wildcard mask, you subtract the subnet mask from `255.255.255.255`. For a subnet mask of `255.255.255.0`, the wildcard is `0.0.0.255`. This tells an ACL to match any IP where the first three octets are identical, effectively matching the entire /24 subnet. Our <Link href="/tools/cidr-to-wildcard" className='text-primary hover:underline'>CIDR to Wildcard Converter</Link> specializes in this conversion.</p>
                        </section>
                    </CardContent>
                </Card>
                
                <div className="grid md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <div className='flex items-center gap-2'><Wand className="h-6 w-6 text-accent" /> <CardTitle>Pro Tips</CardTitle></div>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                                <li><strong>Use CIDR Notation:</strong> In all your documentation and discussions, default to using CIDR notation. It's the industry standard and less prone to typos than writing out a full dot-decimal mask.</li>
                                <li><strong>The "-2" Rule:</strong> Remember that the number of usable hosts for a given mask is always 2<sup>(number of host bits)</sup> - 2, to account for the reserved network and broadcast addresses.</li>
                                <li><strong>Validate Before Use:</strong> Before configuring a device, always use a validator to ensure the mask you're using is valid and corresponds to the CIDR prefix you intend.</li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                             <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                        </CardHeader>
                        <CardContent>
                             <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                                <li><strong>Using Subnet Mask in ACLs:</strong> A classic error is to use a subnet mask (e.g., `255.255.255.0`) in a Cisco ACL that requires a wildcard mask (`0.0.0.255`). This will cause the rule to not match the intended traffic.</li>
                                <li><strong>Incorrect Binary Structure:</strong> Using an invalid mask like `255.255.0.255`. A valid mask must be a continuous block of 1s followed by 0s in binary. Our <Link href="/tools/network-mask-validator" className="text-primary hover:underline">Network Mask Validator</Link> can check this for you.</li>
                                <li><strong>Typographical Errors:</strong> A typo like `255.255.225.0` instead of `255.255.255.0` can completely change the size and scope of your network, leading to major connectivity issues.</li>
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
                                  <CardDescription className="text-xs">Apply your converted mask to an IP address to see the full subnet details.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                      <Link href="/tools/network-mask-validator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Network Mask Validator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">A focused tool to check if a given mask is structurally valid according to binary rules.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                       <Link href="/tools/cidr-to-wildcard" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">CIDR to Wildcard Converter<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">A quick, direct tool for converting CIDR prefixes to the wildcard masks needed for ACLs.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                  </div>
              </section>
            </div>
        </>
    );
};

export default SubnetMaskConverterPage;

    