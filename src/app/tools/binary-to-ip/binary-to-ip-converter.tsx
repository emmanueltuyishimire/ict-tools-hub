
'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Check, Clipboard, AlertCircle, VenetianMask, Lightbulb, HelpCircle, BookOpen, ChevronRight, Wand, AlertTriangle, BadgeHelp, CheckCircle } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CodeBlock } from '@/components/code-block';
import Link from 'next/link';
import { StructuredData } from '@/components/structured-data';

const faqData = [
    {
      question: "Why is an IPv4 address 32 bits?",
      answer: "An IPv4 address is 32 bits long because it was designed with a structure of four octets (4 x 8 = 32 bits). This structure allows for approximately 4.3 billion (2^32) unique addresses. At the time of its creation, this was considered more than enough for the foreseeable future of the internet."
    },
    {
      question: "Can a binary IP be shorter or longer than 32 bits?",
      answer: "No, a valid IPv4 address must be exactly 32 bits long. If your binary string is shorter, you likely need to pad it with leading zeros in one or more octets (e.g., `1010` becomes `00001010`). If it's longer, it's not a valid IPv4 address. This tool will show an error for any input that isn't 32 bits."
    },
    {
      question: "What's the main difference between IPv4 and IPv6?",
      answer: "The primary difference is the length and format. IPv4 is a 32-bit address represented in decimal, while IPv6 is a 128-bit address represented in hexadecimal. IPv6 was created to solve the problem of IPv4 address exhaustion, offering a vastly larger address space (2^128)."
    },
    {
      question: "What is an octet?",
      answer: "In networking, an octet is a group of 8 bits. An IPv4 address is composed of four octets, each of which can represent a decimal number from 0 (binary `00000000`) to 255 (binary `11111111`)."
    },
    {
      question: "Do I need to include the dots in the binary string?",
      answer: "No, it's optional. You can provide a continuous 32-bit string, and the tool will automatically divide it into four 8-bit octets for conversion. However, using dots can make it easier for you to read and verify your input."
    },
    {
      question: "How are binary numbers used in subnet masks?",
      answer: "A subnet mask uses a string of consecutive '1's followed by '0's to define the network and host portions of an IP address. The '1's correspond to the network ID, and the '0's correspond to the host ID. For example, the mask `255.255.255.0` is `11111111.11111111.11111111.00000000` in binary, indicating the first 24 bits are for the network. You can explore this further with our Subnet Calculator."
    },
    {
      question: "What is the highest and lowest number an octet can represent?",
      answer: "The lowest value is 0 (binary `00000000`). The highest value is 255 (binary `11111111`), which is calculated by adding all the positional values: 128 + 64 + 32 + 16 + 8 + 4 + 2 + 1."
    },
    {
      question: "Is `192.168.1.1` a public or private IP address?",
      answer: "It is a private IP address. Private IP address ranges (like 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16) are reserved for use within local networks and are not routable on the public internet."
    },
    {
      question: "Can I convert an IPv6 address with this tool?",
      answer: "No, this tool is specifically designed for IPv4 addresses. IPv6 addresses are 128 bits long and are represented in hexadecimal format, so they require a different conversion process. We will have a separate tool for IPv6 conversions."
    },
    {
      question: "Why does my conversion fail even if I have 32 bits?",
      answer: "The most likely reason is an invalid character. The input must only contain '0's and '1's (and optional dots or spaces, which are stripped). Any other character, including letters or other numbers, will result in an error. Double-check your input for typos."
    }
];

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
        },
    })),
};

const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Convert a Binary String to an IP Address',
    description: 'A step-by-step guide to converting a 32-bit binary string into its standard decimal IPv4 address representation.',
    step: [
        {
            '@type': 'HowToStep',
            name: 'Enter the Binary String',
            text: 'In the input field labeled "Binary IPv4 Address," type or paste the 32-bit binary string you want to convert.',
            subSteps: [
                "You can format the binary string with dots separating the four 8-bit octets (e.g., 11000000.10101000.00000001.00000001).",
                "You can also use a continuous 32-bit string (e.g., 11000000101010000000000100000001). The tool will automatically segment it."
            ]
        },
        {
            '@type': 'HowToStep',
            name: 'Convert',
            text: 'Click the "Convert" button. The tool will validate the input for correctness (32 bits, only 0s and 1s).',
        },
        {
            '@type': 'HowToStep',
            name: 'View and Copy the Result',
            text: 'The converted IPv4 address will appear in the read-only result field. You can click the clipboard icon to instantly copy the IP address for use elsewhere.',
        },
        {
            '@type': 'HowToStep',
            name: 'Clear',
            text: 'Click the "Clear" button to reset the input field, the result, and any error messages, preparing the tool for a new conversion.',
        }
    ],
    totalTime: 'PT1M', // Estimated time: 1 minute
};

const keyTerminologies = [
    { term: 'Binary', definition: 'A base-2 number system that uses only two digits, 0 and 1. This is the fundamental language of computers.' },
    { term: 'Bit', definition: 'A single binary digit (a 0 or a 1), which is the smallest unit of data in computing.' },
    { term: 'Octet', definition: 'A group of 8 bits. An IPv4 address is composed of four octets.' },
    { term: 'IPv4 Address', definition: 'A 32-bit numerical label assigned to each device connected to a computer network that uses the Internet Protocol for communication.' },
    { term: 'Dot-Decimal Notation', definition: 'The human-readable format for IPv4 addresses, where the 32-bit address is written as four decimal numbers separated by dots (e.g., 192.168.1.1).' },
];

export function BinaryToIpConverter() {
  const [binary, setBinary] = useState('11000000.10101000.00000001.00000001');
  const [ip, setIp] = useState('');
  const [error, setError] = useState('');
  const [hasCopied, setHasCopied] = useState(false);
  const resultRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ip && resultRef.current) {
        resultRef.current.focus();
    }
  }, [ip])

  const validateAndConvert = () => {
    setError('');
    setIp('');

    const binaryInput = binary.replace(/\s/g, ''); // Remove all whitespace
    const sanitizedBinary = binaryInput.replace(/\./g, ''); // Remove dots for validation

    if (!/^[01]+$/.test(sanitizedBinary) && sanitizedBinary.length > 0) {
      setError('Invalid input: Only 0s and 1s are allowed.');
      return;
    }

    if (sanitizedBinary.length !== 32) {
      setError(`Invalid input: Binary string must be 32 bits long. You entered ${sanitizedBinary.length} bits.`);
      return;
    }

    try {
      let octets: string[] | null;
      if (binaryInput.includes('.')) {
        const inputWithDots = binaryInput.split('.');
        if (inputWithDots.length !== 4 || inputWithDots.some(o => o.length > 8 || !/^[01]+$/.test(o))) {
            setError('Invalid format. Please use four 8-bit octets separated by dots.');
            return;
        }
        octets = inputWithDots.map(o => o.padStart(8, '0'));
      } else {
         octets = binaryInput.match(/.{1,8}/g);
      }
      
      if (!octets || octets.length !== 4) {
        setError('Invalid format. Please ensure the binary string can be split into four 8-bit octets.');
        return;
      }
      
      const decimalOctets = octets.map(octet => {
          if(octet.length !== 8) throw new Error("Each octet must be 8 bits long.");
          return parseInt(octet, 2);
      });

      const convertedIp = decimalOctets.join('.');
      setIp(convertedIp);
    } catch (e) {
      setError('Conversion failed. Please check the binary format.');
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[01.\s]*$/.test(value)) {
        setBinary(value);
    }
  };

  const handleConvert = () => {
    validateAndConvert();
  };

  const handleClear = () => {
    setBinary('');
    setIp('');
    setError('');
    setHasCopied(false);
  };

  const handleCopyToClipboard = () => {
    if (!ip) return;
    navigator.clipboard.writeText(ip).then(() => {
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    });
  };

  const example1 = "01100101.11100001.00001010.01010101";
  const example2 = "11000000101010000000000100000001";
  const example3 = "10.0.0.1"; // This is an IP, to show error

  return (
    <div className="max-w-4xl mx-auto space-y-12">
        <StructuredData data={faqSchema} />
        <StructuredData data={howToSchema} />
        <Card>
            <CardHeader>
                <CardTitle>Binary to IP Address Converter</CardTitle>
                <CardDescription>
                    Input a 32-bit binary string to instantly get its decimal IPv4 representation.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="binary-input">Binary IPv4 Address</Label>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <Input
                        id="binary-input"
                        type="text"
                        value={binary}
                        onChange={handleInputChange}
                        placeholder="e.g., 11000000.10101000.00000001.00000001"
                        className="font-code flex-grow"
                        aria-invalid={!!error}
                        aria-describedby="binary-error"
                        />
                        <div className='flex gap-2'>
                            <Button onClick={handleConvert} className="w-full sm:w-auto">Convert</Button>
                            <Button onClick={handleClear} variant="outline" className="w-full sm:w-auto">Clear</Button>
                        </div>
                    </div>
                </div>

                {error && (
                    <Alert variant="destructive" id="binary-error" role="alert">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {ip && (
                <div className="space-y-2" aria-live="polite">
                    <Label htmlFor="converted-ip">Converted IP Address</Label>
                    <div className="relative">
                    <Input
                        id="converted-ip"
                        ref={resultRef}
                        type="text"
                        value={ip}
                        readOnly
                        className="pr-10 font-code bg-secondary"
                        aria-label="Converted IP Address"
                    />
                    <Button
                        size="icon"
                        variant="ghost"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                        onClick={handleCopyToClipboard}
                        aria-label={hasCopied ? 'Copied IP Address' : 'Copy IP Address to clipboard'}
                    >
                        {hasCopied ? <Check className="h-4 w-4 text-primary" /> : <Clipboard className="h-4 w-4" />}
                    </Button>
                    </div>
                </div>
                )}
            </CardContent>
        </Card>

        <section>
            <h2 className="text-2xl font-bold mb-4">How to Use This Tool</h2>
            <Card className="prose prose-sm max-w-none text-foreground p-6">
                <p>This tool is designed for simplicity and accuracy. Here’s a quick guide:</p>
                <ol>
                    <li><strong>Enter the Binary String:</strong> In the input field, type or paste the 32-bit binary string you want to convert.</li>
                    <li><strong>Formatting:</strong> You can format the binary string in two ways:
                        <ul>
                            <li><strong>With dots:</strong> Separate the four 8-bit octets with periods (e.g., <code className="font-code bg-muted p-1 rounded-sm">11000000.10101000.00000001.00000001</code>).</li>
                            <li><strong>Without dots:</strong> A continuous 32-bit string (e.g., <code className="font-code bg-muted p-1 rounded-sm">11000000101010000000000100000001</code>). The tool will automatically segment it.</li>
                        </ul>
                    </li>
                    <li><strong>Convert:</strong> Click the "Convert" button. The tool will validate the input and, if valid, display the corresponding decimal IP address.</li>
                    <li><strong>View and Copy:</strong> The converted IP address will appear in a read-only field. Click the clipboard icon to instantly copy the result.</li>
                </ol>
                <Alert>
                    <Lightbulb className="h-4 w-4" />
                    <AlertTitle>Example</AlertTitle>
                    <AlertDescription>
                        Try pasting <code className="font-code bg-muted p-1 rounded-sm">00001010.00000000.00000000.00000001</code> and hitting "Convert". You should see the result <code className="font-code bg-muted p-1 rounded-sm">10.0.0.1</code>.
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
                    <CardTitle className="text-primary">Educational Deep Dive: From Bits to Packets</CardTitle>
                </div>
                <CardDescription>Understand the fundamental concepts that make binary to IP conversion possible and essential.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                <section>
                    <h3 className="font-bold text-xl">What is an IP Address? The Internet's Postal System</h3>
                    <p>An IP (Internet Protocol) address is a unique numerical label assigned to every device connected to a computer network. Think of it as a mailing address for your computer, phone, or any other smart device. Just as the postal service needs a specific address to deliver a letter, network devices need IP addresses to send and receive data packets across the internet. Without IP addresses, there would be no way to stream videos, browse websites, or send emails.</p>
                    <p>The most common version you'll encounter is IPv4 (Internet Protocol version 4). It's a 32-bit number, which means there are 2<sup>32</sup> (about 4.3 billion) possible unique addresses. While this seemed like an enormous number in the early days of the internet, the explosion of devices has led to IPv4 address exhaustion. This is why IPv6, a 128-bit address system, was introduced, offering a virtually limitless number of addresses. However, IPv4 remains the backbone of the internet for now, and understanding it is crucial for anyone in IT.</p>
                    <p>For human readability, we don't write out all 32 bits. Instead, we use "dot-decimal notation." The 32 bits are divided into four groups of 8 bits, called octets. Each octet is converted to its decimal equivalent (a number from 0 to 255) and separated by a dot. For example, the IP address <code className="font-code bg-muted p-1 rounded-sm">172.16.254.1</code> is the human-friendly version of a long 32-bit binary string.</p>
                </section>
                
                <section>
                    <h3 className="font-bold text-xl">How Binary Relates to IP Addresses: The Language of Computers</h3>
                    <p>Computers operate in binary, a base-2 number system that uses only two digits: 0 and 1. Each digit is called a bit. While humans find it easier to work with decimal (base-10) numbers, all digital data is ultimately stored and processed as binary. To bridge this gap, we must be able to convert between these systems.</p>
                    <p>An IPv4 address is fundamentally a 32-bit binary number. The dot-decimal notation is just a convenient abstraction. Understanding this binary foundation is not just academic; it's essential for advanced networking tasks like <Link href="/tools/subnet-calculator" className='text-primary hover:underline'>subnetting</Link>, access control list (ACL) configuration, and network troubleshooting. When you use a <Link href="/tools/subnet-calculator" className='text-primary hover:underline'>Subnet Calculator</Link> to configure a mask like <code className="font-code bg-muted p-1 rounded-sm">255.255.255.0</code>, you're actually telling the network hardware to look at the first 24 bits of an IP address to identify its network portion. In binary, that mask is <code className="font-code bg-muted p-1 rounded-sm">11111111.11111111.11111111.00000000</code>.</p>
                    
                    <h4 className='font-semibold text-lg'>Step-by-Step Manual Conversion: A Practical Tutorial</h4>
                    <p>Let's manually convert the binary string <code className="font-code bg-muted p-1 rounded-sm">11000000.10101000.00000001.00000001</code> to a decimal IP address. This process demystifies what our tool does automatically.</p>
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
                                    <thead>
                                        <tr className='border-b'><th className="p-2 text-left font-semibold">Position</th><td className="p-2 font-code">7</td><td className="p-2 font-code">6</td><td className="p-2 font-code">5</td><td className="p-2 font-code">4</td><td className="p-2 font-code">3</td><td className="p-2 font-code">2</td><td className="p-2 font-code">1</td><td className="p-2 font-code">0</td></tr>
                                    </thead>
                                    <tbody>
                                        <tr className='border-b'><th className="p-2 text-left font-semibold">Power of 2</th><td className="p-2 font-code">2<sup>7</sup></td><td className="p-2 font-code">2<sup>6</sup></td><td className="p-2 font-code">2<sup>5</sup></td><td className="p-2 font-code">2<sup>4</sup></td><td className="p-2 font-code">2<sup>3</sup></td><td className="p-2 font-code">2<sup>2</sup></td><td className="p-2 font-code">2<sup>1</sup></td><td className="p-2 font-code">2<sup>0</sup></td></tr>
                                        <tr><th className="p-2 text-left font-semibold">Decimal Value</th><td className="p-2 font-code">128</td><td className="p-2 font-code">64</td><td className="p-2 font-code">32</td><td className="p-2 font-code">16</td><td className="p-2 font-code">8</td><td className="p-2 font-code">4</td><td className="p-2 font-code">2</td><td className="p-2 font-code">1</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </li>
                        <li>
                            <strong>Calculate Each Octet:</strong> For each octet, add the decimal values for every position that has a '1'.
                            <ul>
                                <li><strong>Octet 1 (<code className="font-code bg-muted p-1 rounded-sm">11000000</code>):</strong> The '1's are in the 128 and 64 positions. So, 128 + 64 = <strong>192</strong>.</li>
                                <li><strong>Octet 2 (<code className="font-code bg-muted p-1 rounded-sm">10101000</code>):</strong> The '1's are in the 128, 32, and 8 positions. So, 128 + 32 + 8 = <strong>168</strong>.</li>
                                <li><strong>Octet 3 (<code className="font-code bg-muted p-1 rounded-sm">00000001</code>):</strong> The '1' is in the 1 position. So, the value is <strong>1</strong>.</li>
                                <li><strong>Octet 4 (<code className="font-code bg-muted p-1 rounded-sm">00000001</code>):</strong> The '1' is in the 1 position. So, the value is <strong>1</strong>.</li>
                            </ul>
                        </li>
                        <li><strong>Combine the Octets:</strong> Join the decimal values with dots to form the final IP address: <code className="font-code bg-muted p-1 rounded-sm">192.168.1.1</code>.</li>
                    </ol>
                </section>
            </CardContent>
        </Card>
        
        <div className="grid md:grid-cols-2 gap-8">
             {/* Pro Tips */}
            <Card>
                <CardHeader>
                    <div className='flex items-center gap-2'>
                        <Wand className="h-6 w-6 text-accent" aria-hidden="true" />
                        <CardTitle>Pro Tips & Quick Hacks</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                        <li><strong>Memorize Key Patterns:</strong> Learn common binary patterns. For example, <code className="font-code bg-muted p-1 rounded-sm">11111111</code> is always 255, and <code className="font-code bg-muted p-1 rounded-sm">10000000</code> is always 128. This speeds up mental conversions.</li>
                        <li><strong>The "Split and Conquer" Hack:</strong> When converting from decimal to binary, you don't always need complex math. For 192, ask: "Is it >= 128?" Yes (1). Remainder: 64. "Is 64 >= 64?" Yes (1). Remainder: 0. The rest are zeros. Result: <code className="font-code bg-muted p-1 rounded-sm">11000000</code>.</li>
                        <li><strong>Use Spaces for Readability:</strong> When writing binary, use spaces or dots. The tool strips them for conversion, but they make it easier for you to proofread your input.</li>
                        <li><strong>Work Backwards:</strong> If you're unsure about a conversion, use our <Link href="/tools/ip-to-binary" className='text-primary hover:underline'>IP to Binary Converter</Link> to check your work. Reversing the process is a great way to solidify your understanding.</li>
                    </ul>
                </CardContent>
            </Card>

             {/* Common Mistakes */}
            <Card>
                <CardHeader>
                     <div className='flex items-center gap-2'>
                        <AlertTriangle className="h-6 w-6 text-destructive" aria-hidden="true" />
                        <CardTitle>Common Mistakes to Avoid</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                     <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                        <li><strong>Incorrect Bit Count:</strong> An IPv4 address must have exactly 32 bits. A common error is having too few (e.g., 31) or too many. Always double-check the length.</li>
                        <li><strong>Octet Padding Errors:</strong> Forgetting leading zeros is frequent. The binary for 12 is <code className="font-code bg-muted p-1 rounded-sm">1100</code>, but as an octet, it must be <code className="font-code bg-muted p-1 rounded-sm">00001100</code>.</li>
                        <li><strong>Miscalculating Positional Values:</strong> A simple math error, like thinking 2<sup>2</sup> is 6 instead of 4, can throw off the entire octet. Write down the positional values (128, 64, 32, 16, 8, 4, 2, 1) when starting out.</li>
                        <li><strong>Mixing up Binary and Decimal:</strong> Accidentally typing a digit other than 0 or 1. Our tool will catch this, but it's a frequent manual error.</li>
                    </ul>
                </CardContent>
            </Card>
        </div>

        <section>
            <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Analyzing Firewall Logs</h3>
                    <p className="text-sm text-muted-foreground">A security analyst is reviewing firewall logs after a potential security incident. Some low-level logging systems record IP addresses in their raw binary format to save space. The analyst finds a suspicious entry: `01100101.11100001.00001010.01010101`. Instead of manually converting it, they paste it into this tool to quickly identify the source IP address as `101.225.10.85`, allowing them to proceed with their investigation.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Debugging Custom Network Protocols</h3>
                    <p className="text-sm text-muted-foreground">A software developer is creating a custom communication protocol for an embedded device. The device sends its IP address as part of a binary header in a data packet. During testing, the server is failing to parse the address. The developer captures the binary packet data (`11000000101010000000000100000001`) and uses the converter to verify that the device is correctly sending `192.168.1.1`, helping them isolate the bug in their server-side parsing logic.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Networking Student Homework and Exams</h3>
                    <p className="text-sm text-muted-foreground">A student studying for their CompTIA Network+ certification is given a practice problem: "What is the decimal equivalent of the binary IP address 10101100.00010000.11111110.00000001?". They perform the manual calculation and then use this tool to instantly verify their answer (`172.16.254.1`), building confidence and reinforcing their learning for the exam.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Understanding Subnetting Examples</h3>
                    <p className="text-sm text-muted-foreground">An IT professional is reading a technical article about subnetting that explains how a wildcard mask works using binary. The article uses the binary mask `00000000.00000000.00000011.11111111`. To fully grasp what range this represents, they convert it to its decimal form (`0.0.3.255`), making it easier to understand its application in a firewall Access Control List (ACL).</p>
                </div>
            </div>
        </section>

        {/* FAQs */}
        <section>
             <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <Card>
                <CardContent className="p-6">
                     <Accordion type="single" collapsible className="w-full">
                        {faqData.map((item, index) => (
                            <AccordionItem value={`item-${index}`} key={index}>
                                <AccordionTrigger>{item.question}</AccordionTrigger>
                                <AccordionContent>
                                    {item.answer}
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
                            <CardDescription className="text-xs">Calculate network ranges, broadcast addresses, and available hosts for any subnet.</CardDescription>
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
                            <CardDescription className="text-xs">A universal tool to convert numbers between binary, decimal, and hexadecimal.</CardDescription>
                        </CardHeader>
                    </Card>
                </Link>
            </div>
        </section>
    </div>
  );
}
