
import { PageHeader } from '@/components/page-header';
import { IpToBinaryConverter } from './ip-to-binary-converter';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { Lightbulb, AlertTriangle, BookOpen, ChevronRight, Wand } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const metadata = {
    title: 'IP Address to Binary Converter | Convert IPv4 to Binary | ICT Toolbench',
    description: 'Instantly convert any IPv4 address from its standard dot-decimal notation to its 32-bit binary equivalent. An essential tool for network engineers, students, and IT professionals.',
    openGraph: {
        title: 'IP Address to Binary Converter | Convert IPv4 to Binary | ICT Toolbench',
        description: 'A free, real-time tool to convert IPv4 addresses to binary format. Includes an in-depth guide on binary conversion, subnetting, and IP address structure.',
        url: '/tools/ip-to-binary',
    }
};

const IpToBinaryPage = () => {
    const softwareAppSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "IP Address to Binary Converter",
      "operatingSystem": "All",
      "applicationCategory": "DeveloperApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "A free online tool to convert standard dot-decimal IPv4 addresses into their 32-bit binary representation.",
      "url": "https://www.icttoolbench.com/tools/ip-to-binary"
    };

    return (
        <>
            <StructuredData data={faqData.map(item => ({'@type': 'Question', name: item.question, acceptedAnswer: {'@type': 'Answer', text: item.answer.replace(/<[^>]*>?/gm, '')}}))} />
            <StructuredData data={howToSchema} />
            <StructuredData data={softwareAppSchema} />
            <div className="max-w-4xl mx-auto space-y-12">
                <PageHeader
                    title="IP to Binary Converter"
                    description="An essential utility for network engineers, students, and IT professionals. This tool provides a quick and accurate way to convert any IPv4 address from its human-readable dot-decimal format into its 32-bit binary equivalent, which is fundamental for understanding subnetting and network masks."
                />
                
                <IpToBinaryConverter />

                <section>
                  <h2 className="text-2xl font-bold mb-4">How to Use This Tool</h2>
                  <Card className="prose prose-sm max-w-none text-foreground p-6">
                      <p>Converting a decimal IP address to binary is a foundational networking skill. This tool makes it instant and accurate.</p>
                      <ol>
                          <li><strong>Enter the IP Address:</strong> Type or paste a standard IPv4 address (e.g., <code className="font-code bg-muted p-1 rounded-sm">172.16.254.1</code>) into the input field. Before you begin, you can ensure your IP is valid with our <Link href="/tools/ip-privacy-checker" className="text-primary hover:underline">IP Address Checker</Link>.</li>
                          <li><strong>Convert:</strong> Click the "Convert" button. The tool validates that the address is in the correct format (four numbers between 0 and 255).</li>
                          <li><strong>View the Binary Result:</strong> The equivalent 32-bit binary string will appear below, with each 8-bit octet separated by a dot for clarity.</li>
                          <li><strong>Copy:</strong> Click the clipboard icon to copy the full binary string for use in your studies, configurations, or documentation.</li>
                      </ol>
                      <Alert>
                          <Lightbulb className="h-4 w-4" />
                          <AlertTitle>Example</AlertTitle>
                          <AlertDescription>
                              Try pasting <code className="font-code bg-muted p-1 rounded-sm">10.0.0.1</code> and hitting "Convert". You should see the result <code className="font-code bg-muted p-1 rounded-sm">00001010.00000000.00000000.00000001</code>. To see the reverse, use our <Link href="/tools/binary-to-ip" className="text-primary hover:underline">Binary to IP Converter</Link>.
                          </AlertDescription>
                      </Alert>
                  </Card>
                </section>
                
                <section>
                    <h2 className="text-2xl font-bold mb-4">Worked Examples</h2>
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Example 1: A Standard Class C Address</CardTitle>
                                <CardDescription>Converting a common private IP address, `192.168.1.1`.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="prose prose-sm max-w-none">
                                    <p><strong>Goal:</strong> Convert `192.168.1.1` to binary.</p>
                                    <ol>
                                        <li><strong>Octet 1 (192):</strong> 192 = 128 + 64 → `11000000`</li>
                                        <li><strong>Octet 2 (168):</strong> 168 = 128 + 32 + 8 → `10101000`</li>
                                        <li><strong>Octet 3 (1):</strong> 1 = 1 → `00000001` (Note the padding)</li>
                                        <li><strong>Octet 4 (1):</strong> 1 = 1 → `00000001` (Note the padding)</li>
                                    </ol>
                                    <p><strong>Final Result:</strong> <code className="font-code bg-muted p-1 rounded-sm">11000000.10101000.00000001.00000001</code>. The binary form makes it clear how a subnet mask from our <Link href="/tools/subnet-mask-converter" className="text-primary hover:underline">Subnet Mask Converter</Link> would interact with the address.</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Example 2: A Public IP Address</CardTitle>
                                <CardDescription>Converting Google's public DNS server address, `8.8.8.8`.</CardDescription>
                            </CardHeader>
                             <CardContent className="space-y-4">
                                <div className="prose prose-sm max-w-none">
                                    <p><strong>Goal:</strong> Convert `8.8.8.8` to binary.</p>
                                    <ol>
                                        <li><strong>All Octets (8):</strong> The number 8 is simple. It is just the '8' bit turned on. So, for each octet, the binary is `00001000`.</li>
                                    </ol>
                                    <p><strong>Final Result:</strong> <code className="font-code bg-muted p-1 rounded-sm">00001000.00001000.00001000.00001000</code>. This shows how even simple decimal numbers have a full 8-bit representation. You can find this IP address for `dns.google` by using our <Link href="/tools/dns-lookup" className="text-primary hover:underline">DNS Lookup Tool</Link>.</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>
                
                <Card className='bg-secondary/30 border-primary/20'>
                    <CardHeader>
                        <div className='flex items-center gap-2 text-primary'>
                            <BookOpen className="h-6 w-6" aria-hidden="true" />
                            <CardTitle className="text-primary">Educational Deep Dive: Decoding the Digital Address</CardTitle>
                        </div>
                        <CardDescription>From human-readable numbers to the 1s and 0s that power the internet, here’s how it works.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                        <section>
                            <h3>The Dual Identity of an IP Address</h3>
                            <p>Every device on the internet has an IP address, which acts like a digital home address for sending and receiving data. For convenience, we see them as four decimal numbers separated by dots, like <code className="font-code bg-muted p-1 rounded-sm">172.16.254.1</code>. This is called "dot-decimal notation." However, computers, routers, and switches don't understand decimal numbers. They communicate in binary—the language of "on" and "off" signals, represented by 1s and 0s. The <Link href="/tools/number-converter" className='text-primary hover:underline'>Number Base Converter</Link> can help explore these systems.</p>
                            <p>Therefore, every IPv4 address has a dual identity: a human-friendly decimal version and a machine-readable 32-bit binary version. The dot-decimal format is merely a convenient abstraction. To perform critical networking tasks like <Link href="/tools/subnet-calculator" className='text-primary hover:underline'>subnetting</Link> or configuring security rules, you must be able to translate between these two identities. This tool automates the translation, but understanding the manual process is key to mastering networking concepts.</p>
                        </section>
                        
                        <section>
                            <h3>Step-by-Step Manual Conversion: Decimal to Binary</h3>
                            <p>Let's manually convert the IP address <code className="font-code bg-muted p-1 rounded-sm">192.168.1.1</code> into its binary form. This reveals the logic behind the tool.</p>
                            <ol className="list-decimal pl-5 space-y-2">
                                <li>
                                    <strong>Break Down the IP:</strong> Separate the IP address into its four octets.
                                    <ul className='list-disc pl-5 mt-2'>
                                        <li>Octet 1: <strong>192</strong></li>
                                        <li>Octet 2: <strong>168</strong></li>
                                        <li>Octet 3: <strong>1</strong></li>
                                        <li>Octet 4: <strong>1</strong></li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Understand 8-Bit Positional Values:</strong> Each octet is an 8-bit number. To convert it, you need to know the decimal value of each bit position. From left to right, the values are powers of 2, starting from 2<sup>7</sup>.
                                    <div className="overflow-x-auto my-4">
                                        <table className="w-full">
                                            <thead>
                                                <tr className='border-b'><th className="p-2 text-left font-semibold">Decimal Value</th><td className="p-2 font-code">128</td><td className="p-2 font-code">64</td><td className="p-2 font-code">32</td><td className="p-2 font-code">16</td><td className="p-2 font-code">8</td><td className="p-2 font-code">4</td><td className="p-2 font-code">2</td><td className="p-2 font-code">1</td></tr>
                                            </thead>
                                        </table>
                                    </div>
                                </li>
                                <li>
                                    <strong>Convert Each Octet:</strong> For each decimal number, find which positional values add up to it.
                                    <ul>
                                        <li><strong>192:</strong> Is 192 >= 128? Yes. (<strong>1</strong>). Remainder: 192 - 128 = 64. Is 64 >= 64? Yes. (<strong>1</strong>). Remainder: 0. The rest of the bits are 0. <br/>Binary: <code className="font-code bg-muted p-1 rounded-sm">11000000</code>.</li>
                                        <li><strong>168:</strong> Is 168 >= 128? Yes. (<strong>1</strong>). Remainder: 40. Is 40 >= 64? No. (<strong>0</strong>). Is 40 >= 32? Yes. (<strong>1</strong>). Remainder: 8. Is 8 >= 16? No. (<strong>0</strong>). Is 8 >= 8? Yes. (<strong>1</strong>). Remainder: 0. The rest are 0. <br/>Binary: <code className="font-code bg-muted p-1 rounded-sm">10101000</code>.</li>
                                        <li><strong>1:</strong> The only value that fits is 1. All other positions are 0. <br/>Binary: <code className="font-code bg-muted p-1 rounded-sm">00000001</code>. (Note the leading zeros to make it 8 bits).</li>
                                        <li><strong>1:</strong> Same as above. <br/>Binary: <code className="font-code bg-muted p-1 rounded-sm">00000001</code>.</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Combine the Binary Octets:</strong> Join the 8-bit strings, usually with a dot for readability.
                                    <p>Final Binary: <code className="font-code bg-muted p-1 rounded-sm">11000000.10101000.00000001.00000001</code>.</p>
                                </li>
                            </ol>
                        </section>
                    </CardContent>
                </Card>

                <section>
                    <h2 className="text-2xl font-bold mb-4">Real-Life Applications</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Designing a Subnetting Scheme</h3>
                            <p className="text-sm text-muted-foreground">A network architect is tasked with dividing a large `/22` network block into smaller subnets. To determine the network and broadcast addresses for a new `/26` subnet, they first convert the base IP address to binary. This allows them to visually see where the network bits end and the host bits begin, making it easy to calculate the new subnet ranges accurately.
                            </p>
                        </div>
                         <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Configuring a Firewall ACL</h3>
                            <p className="text-sm text-muted-foreground">A security admin needs to write a firewall rule (Access Control List) to block a specific range of IP addresses. To create the most efficient rule, they convert both the start and end IPs to binary. This helps them calculate the correct <Link href="/tools/cidr-to-wildcard" className='text-primary hover:underline'>wildcard mask</Link> needed for the ACL entry, ensuring only the intended addresses are blocked.</p>
                        </div>
                    </div>
                </section>
                
                <div className="grid md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <div className='flex items-center gap-2'><Wand className="h-6 w-6 text-accent" aria-hidden="true" /> <CardTitle>Pro Tips</CardTitle></div>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                                <li><strong>Master the Powers of 2:</strong> Memorizing the 8-bit values (128, 64, 32, 16, 8, 4, 2, 1) is the single most important hack. It makes mental conversions incredibly fast.</li>
                                <li><strong>Start from Left to Right:</strong> When converting, always start with the largest value (128) and work your way down. This subtraction method is faster and less error-prone than division.</li>
                                <li><strong>Recognize Common Numbers:</strong> You'll see certain numbers often. 255 is always `11111111`. 254 is `11111110`. 0 is `00000000`. Knowing these saves time.</li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                             <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" aria-hidden="true" /> <CardTitle>Common Mistakes</CardTitle></div>
                        </CardHeader>
                        <CardContent>
                             <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                                <li><strong>Forgetting to Pad with Zeros:</strong> The number 12 is `1100` in binary, but as an octet it MUST be `00001100`. Each octet needs to be a full 8 bits. This is the most common mistake for beginners.</li>
                                <li><strong>Math Errors Under Pressure:</strong> It's easy to make a simple subtraction mistake. Double-check your math, especially during exams.</li>
                                <li><strong>Invalid IP Address Input:</strong> Entering a number greater than 255 in any octet.</li>
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
                      <Link href="/tools/binary-to-ip" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">
                                      Binary to IP Converter
                                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                  </CardTitle>
                                  <CardDescription className="text-xs">The reverse process: convert binary strings back to their decimal IP form.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                      <Link href="/tools/subnet-calculator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">
                                      Subnet Calculator
                                       <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                  </CardTitle>
                                  <CardDescription className="text-xs">The essential tool for all subnetting calculations, which rely on binary math.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                       <Link href="/tools/number-converter" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">
                                      Number Base Converter
                                       <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                  </CardTitle>
                                  <CardDescription className="text-xs">A general-purpose tool to convert numbers between binary, decimal, and hexadecimal.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                  </div>
              </section>
            </div>
        </>
    );
};

export default IpToBinaryPage;
