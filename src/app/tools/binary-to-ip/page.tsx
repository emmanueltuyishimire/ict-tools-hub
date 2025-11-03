
import { PageHeader } from '@/components/page-header';
import { BinaryToIpConverter } from './binary-to-ip-converter';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { Lightbulb, AlertTriangle, BookOpen, ChevronRight, Wand } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const metadata = {
    title: 'Binary to IP Address Converter | Convert Binary to IPv4 | ICT Tools Hub',
    description: 'Instantly convert a 32-bit binary string into its human-readable dot-decimal IPv4 address. An essential tool for networking students and IT professionals working with binary data.',
    openGraph: {
        title: 'Binary to IP Address Converter | Convert Binary to IPv4 | ICT Tools Hub',
        description: 'A free, real-time tool to convert 32-bit binary strings to IPv4 addresses. Includes an in-depth guide on binary conversion, IP structure, and practical networking applications.',
        url: 'https://ict.calculation.site/tools/binary-to-ip',
    }
};

const BinaryToIpPage = () => {
    const softwareAppSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Binary to IP Address Converter",
      "operatingSystem": "All",
      "applicationCategory": "DeveloperApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "A free online tool to convert 32-bit binary strings into their standard dot-decimal IPv4 address representation.",
      "url": "https://ict.calculation.site/tools/binary-to-ip"
    };

    return (
        <>
            <StructuredData data={faqData.map(item => ({'@type': 'Question', name: item.question, acceptedAnswer: {'@type': 'Answer', text: item.answer.replace(/<[^>]*>?/gm, '')}}))} />
            <StructuredData data={howToSchema} />
            <StructuredData data={softwareAppSchema} />
            <div className="max-w-4xl mx-auto space-y-12">
                <PageHeader
                    title="Binary to IP Converter"
                    description="An essential utility for network engineers and students. This tool provides a quick and accurate way to convert any 32-bit binary string into its human-readable dot-decimal IPv4 address format, which is crucial for understanding low-level network data and subnetting."
                />
                
                <BinaryToIpConverter />

                <section>
                  <h2 className="text-2xl font-bold mb-4">How to Use This Tool</h2>
                  <Card className="prose prose-sm max-w-none text-foreground p-6">
                      <p>This tool is designed for simplicity and accuracy, providing instant conversion from binary to decimal IP format.</p>
                      <ol>
                          <li><strong>Enter the Binary String:</strong> In the input field, type or paste the 32-bit binary string you want to convert.</li>
                          <li><strong>Formatting:</strong> You can format the binary string in two ways:
                              <ul>
                                  <li><strong>With dots:</strong> Separate the four 8-bit octets with periods (e.g., <code className="font-code bg-muted p-1 rounded-sm">11000000.10101000.00000001.00000001</code>).</li>
                                  <li><strong>Without dots:</strong> A continuous 32-bit string (e.g., <code className="font-code bg-muted p-1 rounded-sm">11000000101010000000000100000001</code>). The tool will automatically segment it.</li>
                              </ul>
                          </li>
                          <li><strong>Convert:</strong> Click the "Convert" button. The tool validates that the input is exactly 32 bits long and contains only 0s and 1s.</li>
                          <li><strong>View and Copy:</strong> The converted decimal IP address will appear in a read-only field. Click the clipboard icon to instantly copy the result for use elsewhere.</li>
                      </ol>
                      <Alert>
                          <Lightbulb className="h-4 w-4" />
                          <AlertTitle>Example</AlertTitle>
                          <AlertDescription>
                              Try pasting <code className="font-code bg-muted p-1 rounded-sm">00001010000000000000000000000001</code> and hitting "Convert". You should see the result <code className="font-code bg-muted p-1 rounded-sm">10.0.0.1</code>. To see the reverse, use our <Link href="/tools/ip-to-binary" className="text-primary hover:underline">IP to Binary Converter</Link>.
                          </AlertDescription>
                      </Alert>
                  </Card>
                </section>
                
                <section>
                    <h2 className="text-2xl font-bold mb-4">Worked Examples</h2>
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Example 1: A Standard Private Address</CardTitle>
                                <CardDescription>Converting the binary string for a common private IP, `192.168.1.1`.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="prose prose-sm max-w-none">
                                    <p><strong>Goal:</strong> Convert `11000000.10101000.00000001.00000001` to decimal.</p>
                                    <ol>
                                        <li><strong>Octet 1 (`11000000`):</strong> The '1's are in the 128 and 64 positions. 128 + 64 = <strong>192</strong>.</li>
                                        <li><strong>Octet 2 (`10101000`):</strong> The '1's are in the 128, 32, and 8 positions. 128 + 32 + 8 = <strong>168</strong>.</li>
                                        <li><strong>Octet 3 (`00000001`):</strong> The '1' is in the 1 position. Value = <strong>1</strong>.</li>
                                        <li><strong>Octet 4 (`00000001`):</strong> The '1' is in the 1 position. Value = <strong>1</strong>.</li>
                                    </ol>
                                    <p><strong>Final Result:</strong> <code className="font-code bg-muted p-1 rounded-sm">192.168.1.1</code>. This address falls into the private IP range, which you can verify with the <Link href="/tools/ip-privacy-checker" className="text-primary hover:underline">IP Privacy Checker</Link>.</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Example 2: A Public Web Server Address</CardTitle>
                                <CardDescription>Converting a more complex binary string.</CardDescription>
                            </CardHeader>
                             <CardContent className="space-y-4">
                                <div className="prose prose-sm max-w-none">
                                    <p><strong>Goal:</strong> Convert `01011101.10111000.11011000.00010001` to decimal.</p>
                                    <ol>
                                        <li><strong>Octet 1 (`01011101`):</strong> 64 + 16 + 8 + 4 + 1 = <strong>93</strong>.</li>
                                        <li><strong>Octet 2 (`10111000`):</strong> 128 + 32 + 16 + 8 = <strong>184</strong>.</li>
                                        <li><strong>Octet 3 (`11011000`):</strong> 128 + 64 + 16 + 8 = <strong>216</strong>.</li>
                                        <li><strong>Octet 4 (`00010001`):</strong> 16 + 1 = <strong>17</strong>.</li>
                                    </ol>
                                    <p><strong>Final Result:</strong> <code className="font-code bg-muted p-1 rounded-sm">93.184.216.17</code>. A quick check with our <Link href="/tools/whois-lookup" className="text-primary hover:underline">Whois Tool</Link> would show this IP belongs to a range allocated for documentation examples.</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>
                
                <Card className='bg-secondary/30 border-primary/20'>
                    <CardHeader>
                        <div className='flex items-center gap-2 text-primary'>
                            <BookOpen className="h-6 w-6" aria-hidden="true" />
                            <CardTitle className="text-primary">Educational Deep Dive: From Bits to Packets</CardTitle>
                        </div>
                        <CardDescription>Understand the fundamental concepts that make binary to IP conversion possible and essential.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                        <section>
                            <h3>How Binary Relates to IP Addresses: The Language of Computers</h3>
                            <p>Computers operate in binary, a base-2 number system that uses only two digits: 0 and 1. Each digit is called a bit. While humans find it easier to work with decimal (base-10) numbers, all digital data is ultimately stored and processed as binary. To bridge this gap, we must be able to convert between these systems. The <Link href="/tools/number-converter" className='text-primary hover:underline'>Number Base Converter</Link> helps explore these different systems.</p>
                            <p>An IPv4 address is fundamentally a 32-bit binary number. The dot-decimal notation is just a convenient abstraction. Understanding this binary foundation is not just academic; it's essential for advanced networking tasks like <Link href="/tools/subnet-calculator" className='text-primary hover:underline'>subnetting</Link>, access control list (ACL) configuration, and network troubleshooting. When you use a <Link href="/tools/subnet-calculator" className='text-primary hover:underline'>Subnet Calculator</Link> to configure a mask like <code className="font-code bg-muted p-1 rounded-sm">255.255.255.0</code>, you're actually telling the network hardware to look at the first 24 bits of an IP address to identify its network portion. In binary, that mask is <code className="font-code bg-muted p-1 rounded-sm">11111111.11111111.11111111.00000000</code>.</p>
                        </section>
                        <section>
                            <h3 className="font-bold text-xl">Step-by-Step Manual Conversion: Binary to Decimal</h3>
                            <p>Let's manually convert the binary string `11000000.10101000.00000001.00000001` to a decimal IP address. This process demystifies what our tool does automatically.</p>
                            <ol className="list-decimal pl-5 space-y-2">
                                <li>
                                    <strong>Segment into Octets:</strong> First, ensure the 32-bit string is divided into four 8-bit octets.
                                    <ul className='list-disc pl-5 mt-2'>
                                        <li>Octet 1: <code className="font-code bg-muted p-1 rounded-sm">11000000</code></li>
                                        <li>Octet 2: <code className="font-code bg-muted p-1 rounded-sm">10101000</code></li>
                                        <li>Octet 3: <code className="font-code bg-muted p-1 rounded-sm">00000001</code></li>
                                        <li>Octet 4: <code className="font-code bg-muted p-1 rounded-sm">00000001</code></li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Assign Positional Values:</strong> Each position in an 8-bit octet corresponds to a power of 2, starting from 2<sup>0</sup> on the far right.
                                    <div className="overflow-x-auto my-4">
                                        <table className="w-full">
                                            <thead><tr className='border-b'><th className="p-2 text-left font-semibold">Decimal Value</th><td className="p-2 font-code">128</td><td className="p-2 font-code">64</td><td className="p-2 font-code">32</td><td className="p-2 font-code">16</td><td className="p-2 font-code">8</td><td className="p-2 font-code">4</td><td className="p-2 font-code">2</td><td className="p-2 font-code">1</td></tr></thead>
                                        </table>
                                    </div>
                                </li>
                                <li>
                                    <strong>Calculate Each Octet:</strong> For each octet, add the decimal values for every position that has a '1'.
                                    <ul>
                                        <li><strong>Octet 1 (`11000000`):</strong> The '1's are in the 128 and 64 positions. So, 128 + 64 = <strong>192</strong>.</li>
                                        <li><strong>Octet 2 (`10101000`):</strong> The '1's are in the 128, 32, and 8 positions. So, 128 + 32 + 8 = <strong>168</strong>.</li>
                                        <li><strong>Octet 3 (`00000001`):</strong> The '1' is in the 1 position. So, the value is <strong>1</strong>.</li>
                                        <li><strong>Octet 4 (`00000001`):</strong> The '1' is in the 1 position. So, the value is <strong>1</strong>.</li>
                                    </ul>
                                </li>
                                <li><strong>Combine the Octets:</strong> Join the decimal values with dots to form the final IP address: <code className="font-code bg-muted p-1 rounded-sm">192.168.1.1</code>.</li>
                            </ol>
                        </section>
                    </CardContent>
                </Card>

                <section>
                    <h2 className="text-2xl font-bold mb-4">Real-Life Applications</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Analyzing Firewall Logs</h3>
                            <p className="text-sm text-muted-foreground">A security analyst is reviewing low-level firewall logs which record IP addresses in raw binary format. They find a suspicious entry: `01100101111000010000101001010101`. Pasting this into the converter quickly reveals the source IP as `101.225.10.85`, allowing them to proceed with their investigation.</p>
                        </div>
                         <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Debugging Custom Network Protocols</h3>
                            <p className="text-sm text-muted-foreground">A developer is creating a custom protocol for an embedded device. The device sends its IP in a binary header. By capturing the packet and pasting the binary string into this tool, they can verify the device is sending the correct IP, helping them isolate bugs in their parsing logic.</p>
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
                                <li><strong>Memorize Key Patterns:</strong> Learn common binary patterns. For example, `11111111` is always 255, and `10000000` is always 128. This speeds up mental conversions.</li>
                                <li><strong>Use Spaces for Readability:</strong> The tool strips them for conversion, but formatting your input with spaces or dots makes it easier for you to proofread.</li>
                                <li><strong>Work Backwards:</strong> If you're unsure about a conversion, use our <Link href="/tools/ip-to-binary" className='text-primary hover:underline'>IP to Binary Converter</Link> to check your work.</li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                             <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" aria-hidden="true" /> <CardTitle>Common Mistakes</CardTitle></div>
                        </CardHeader>
                        <CardContent>
                             <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                                <li><strong>Incorrect Bit Count:</strong> An IPv4 address must have exactly 32 bits. A common error is having too few or too many. Always double-check the length.</li>
                                <li><strong>Invalid Characters:</strong> The input must only contain '0's and '1's. Any other character will result in an error.</li>
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
                                  <CardTitle className="text-base flex items-center justify-between">
                                      IP to Binary Converter
                                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                  </CardTitle>
                                  <CardDescription className="text-xs">The reverse process: convert decimal IP addresses back to their binary form.</CardDescription>
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
                                  <CardDescription className="text-xs">See how binary IP addresses and subnet masks are used to define network ranges.</CardDescription>
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

export default BinaryToIpPage;
