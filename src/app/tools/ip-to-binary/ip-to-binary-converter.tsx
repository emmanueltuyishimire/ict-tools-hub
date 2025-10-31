'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Check, Clipboard, AlertCircle, Wand, Lightbulb, BookOpen, ChevronRight, AlertTriangle } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Link from 'next/link';
import { StructuredData } from '@/components/structured-data';

const faqData = [
    {
        question: "How does the IP to Binary conversion work?",
        answer: "The conversion works by taking each of the four decimal numbers (octets) of an IPv4 address and converting each one into its 8-bit binary equivalent. For example, the number 192 becomes '11000000'. The tool does this for all four octets and then joins them together, usually with dots, to show the full 32-bit address."
    },
    {
        question: "Why does each octet need to be 8 bits long in binary?",
        answer: "An IPv4 address is a 32-bit number, and its structure is defined as four 8-bit segments (4 x 8 = 32). Even if a decimal number is small (like 10, which is '1010' in binary), it must be padded with leading zeros to fill the 8-bit space (e.g., '00001010'). This ensures the total length is always exactly 32 bits, which is required for network hardware to correctly interpret the address."
    },
    {
        question: "What is the valid range for an IPv4 address octet?",
        answer: "Each decimal number in an IPv4 address must be between 0 and 255, inclusive. This is because an 8-bit binary number can represent 256 different values (from 00000000 for 0, to 11111111 for 255)."
    },
    {
        question: "Can I input an IP address with fewer than four octets?",
        answer: "No, a valid IPv4 address must contain exactly four octets separated by three dots (e.g., 192.168.1.1). Any other format will be considered invalid. The tool will show an error if the format is incorrect."
    },
    {
        question: "Does this tool work for IPv6 addresses?",
        answer: "This tool is specifically for IPv4 addresses. IPv6 addresses are 128 bits long and use a hexadecimal format, so they require a completely different conversion method. We will have a separate tool for IPv6 conversions."
    },
    {
        question: "What is the purpose of converting an IP to binary?",
        answer: "Converting an IP to binary is fundamental for many networking tasks. It's essential for understanding and calculating subnets, configuring firewall rules with wildcard masks, and for low-level network troubleshooting. While humans use decimal notation, network devices operate purely in binary. Our Subnet Calculator is a great place to see this in action."
    },
    {
        question: "What is 'dot-decimal notation'?",
        answer: "Dot-decimal notation is the human-readable format of an IPv4 address, such as `172.16.254.1`. It represents the 32-bit binary address as four decimal numbers (octets), each separated by a dot."
    },
    {
        question: "How do I manually convert a decimal number to 8-bit binary?",
        answer: "To convert a number like 168 to binary, you find the largest power of 2 that fits into it (128), subtract it, and repeat for the remainder. For 168: it's 1*128 (remainder 40) + 0*64 + 1*32 (remainder 8) + 0*16 + 1*8 (remainder 0) + 0*4 + 0*2 + 0*1. This gives you the binary string '10101000'."
    },
    {
        question: "Is there a quick way to check if an IP is public or private?",
        answer: "Yes, you can check which range it falls into. Private ranges are 10.0.0.0 to 10.255.255.255, 172.16.0.0 to 172.31.255.255, and 192.168.0.0 to 192.168.255.255. Any IP address outside these ranges is generally a public IP."
    },
    {
        question: "Why did my IP address conversion fail?",
        answer: "A conversion can fail for a few reasons: one of the numbers is greater than 255, the address doesn't have exactly four parts, or it contains non-numeric characters. Our tool will provide a specific error message to help you identify the problem."
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
    name: 'How to Convert an IPv4 Address to Binary',
    description: 'A step-by-step guide to converting a standard dot-decimal IPv4 address into its 32-bit binary string representation.',
    step: [
        {
            '@type': 'HowToStep',
            name: 'Enter the IP Address',
            text: 'In the input field labeled "IPv4 Address," type or paste the dot-decimal IP address you want to convert (e.g., 192.168.1.1).',
        },
        {
            '@type': 'HowToStep',
            name: 'Convert',
            text: 'Click the "Convert" button. The tool will validate the IP address format.',
        },
        {
            '@type': 'HowToStep',
            name: 'View and Copy the Result',
            text: 'The 32-bit binary representation will appear in the read-only result field, formatted with dots for readability. Click the clipboard icon to copy the binary string.',
        },
        {
            '@type': 'HowToStep',
            name: 'Clear',
            text: 'Click the "Clear" button to reset the input and output fields, readying the tool for a new conversion.',
        }
    ],
    totalTime: 'PT1M', // Estimated time: 1 minute
};


export function IpToBinaryConverter() {
    const [ip, setIp] = useState('192.168.1.1');
    const [binary, setBinary] = useState('');
    const [error, setError] = useState('');
    const [hasCopied, setHasCopied] = useState(false);
    const resultRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (binary && resultRef.current) {
            resultRef.current.focus();
        }
    }, [binary]);

    const validateAndConvert = () => {
        setError('');
        setBinary('');

        const parts = ip.split('.');

        if (parts.length !== 4) {
            setError('Invalid IPv4 format: Address must contain four octets separated by dots.');
            return;
        }

        const arePartsValid = parts.every(part => {
            const num = Number(part);
            return !isNaN(num) && num >= 0 && num <= 255 && part === num.toString();
        });

        if (!arePartsValid) {
            setError('Invalid IPv4 format: Each octet must be a number between 0 and 255.');
            return;
        }

        try {
            const binaryOctets = parts.map(part => {
                const num = Number(part);
                return num.toString(2).padStart(8, '0');
            });
            const convertedBinary = binaryOctets.join('.');
            setBinary(convertedBinary);
        } catch (e) {
            setError('Conversion failed. Please check the IP address format.');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIp(e.target.value);
    };

    const handleConvert = () => {
        validateAndConvert();
    };

    const handleClear = () => {
        setIp('');
        setBinary('');
        setError('');
        setHasCopied(false);
    };

    const handleCopyToClipboard = () => {
        if (!binary) return;
        navigator.clipboard.writeText(binary).then(() => {
            setHasCopied(true);
            setTimeout(() => setHasCopied(false), 2000);
        });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <StructuredData data={faqSchema} />
            <StructuredData data={howToSchema} />
            <Card>
                <CardHeader>
                    <CardTitle>IP Address to Binary Converter</CardTitle>
                    <CardDescription>
                        Input a standard IPv4 address to instantly get its 32-bit binary representation.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="ip-input">IPv4 Address</Label>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <Input
                                id="ip-input"
                                type="text"
                                value={ip}
                                onChange={handleInputChange}
                                placeholder="e.g., 192.168.1.1"
                                className="font-code flex-grow"
                                aria-invalid={!!error}
                                aria-describedby="ip-error"
                            />
                            <div className='flex gap-2'>
                                <Button onClick={handleConvert} className="w-full sm:w-auto">Convert</Button>
                                <Button onClick={handleClear} variant="outline" className="w-full sm:w-auto">Clear</Button>
                            </div>
                        </div>
                    </div>

                    {error && (
                        <Alert variant="destructive" id="ip-error" role="alert">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {binary && (
                        <div className="space-y-2" aria-live="polite">
                            <Label htmlFor="converted-binary">Converted Binary String</Label>
                            <div className="relative">
                                <Input
                                    id="converted-binary"
                                    ref={resultRef}
                                    type="text"
                                    value={binary}
                                    readOnly
                                    className="pr-10 font-code bg-secondary"
                                    aria-label="Converted Binary String"
                                />
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                                    onClick={handleCopyToClipboard}
                                    aria-label={hasCopied ? 'Copied Binary String' : 'Copy Binary String to clipboard'}
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
                    <p>Converting a decimal IP address to binary is a foundational networking skill. This tool makes it instant and accurate.</p>
                    <ol>
                        <li><strong>Enter the IP Address:</strong> Type or paste a standard IPv4 address (e.g., <code className="font-code bg-muted p-1 rounded-sm">172.16.254.1</code>) into the input field.</li>
                        <li><strong>Convert:</strong> Click the "Convert" button. The tool validates that the address is in the correct format (four numbers between 0 and 255).</li>
                        <li><strong>View the Binary Result:</strong> The equivalent 32-bit binary string will appear below, with each 8-bit octet separated by a dot for clarity.</li>
                        <li><strong>Copy:</strong> Click the clipboard icon to copy the full binary string for use in your studies, configurations, or documentation.</li>
                        <li><strong>Clear:</strong> Use the "Clear" button to reset the tool for a new conversion.</li>
                    </ol>
                    <Alert>
                        <Lightbulb className="h-4 w-4" />
                        <AlertTitle>Example</AlertTitle>
                        <AlertDescription>
                            Try pasting <code className="font-code bg-muted p-1 rounded-sm">10.0.0.1</code> and hitting "Convert". You should see the result <code className="font-code bg-muted p-1 rounded-sm">00001010.00000000.00000000.00000001</code>.
                        </AlertDescription>
                    </Alert>
                </Card>
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
                        <h3 className="font-bold text-xl">The Dual Identity of an IP Address</h3>
                        <p>Every device on the internet has an IP address, which acts like a digital home address for sending and receiving data. For convenience, we see them as four decimal numbers separated by dots, like <code className="font-code bg-muted p-1 rounded-sm">172.16.254.1</code>. This is called "dot-decimal notation." However, computers, routers, and switches don't understand decimal numbers. They communicate in binary—the language of "on" and "off" signals, represented by 1s and 0s.</p>
                        <p>Therefore, every IPv4 address has a dual identity: a human-friendly decimal version and a machine-readable 32-bit binary version. The dot-decimal format is merely a convenient abstraction. To perform critical networking tasks like subnetting or configuring security rules, you must be able to translate between these two identities. Our <Link href="/tools/binary-to-ip" className='text-primary hover:underline'>Binary to IP Converter</Link> automates the reverse translation, but understanding the manual process is key to mastering networking concepts.</p>
                    </section>
                    
                    <section>
                        <h3 className="font-bold text-xl">Step-by-Step Manual Conversion: Decimal to Binary</h3>
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
                            <li><strong>Master the Powers of 2:</strong> Memorizing the 8-bit values (128, 64, 32, 16, 8, 4, 2, 1) is the single most important hack. It makes mental conversions incredibly fast.</li>
                            <li><strong>Start from Left to Right:</strong> When converting, always start with the largest value (128) and work your way down. This subtraction method is faster and less error-prone than division.</li>
                            <li><strong>Recognize Common Numbers:</strong> You'll see certain numbers often. 255 is always <code className="font-code bg-muted p-1 rounded-sm">11111111</code>. 254 is <code className="font-code bg-muted p-1 rounded-sm">11111110</code>. 0 is <code className="font-code bg-muted p-1 rounded-sm">00000000</code>. Knowing these saves time.</li>
                            <li><strong>Use a "Checklist":</strong> Write down the 8 positional values and put a "1" or "0" under each as you do the subtraction. This prevents you from losing your place with larger numbers.</li>
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
                            <li><strong>Forgetting to Pad with Zeros:</strong> The number 12 is `1100` in binary, but as an octet it MUST be <code className="font-code bg-muted p-1 rounded-sm">00001100</code>. Each octet needs to be a full 8 bits. This is the most common mistake for beginners.</li>
                            <li><strong>Math Errors Under Pressure:</strong> It's easy to make a simple subtraction mistake (e.g., 40 - 32 = 6). Double-check your math, especially during exams.</li>
                            <li><strong>Invalid IP Address Input:</strong> Entering a number greater than 255 in any octet (e.g., <code className="font-code bg-muted p-1 rounded-sm">192.168.256.1</code>). An 8-bit number cannot be larger than 255.</li>
                             <li><strong>Mixing up IPv4 and IPv6:</strong> Trying to convert a hexadecimal IPv6 address with this tool. They are fundamentally different systems.</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>

            <section>
                <h2 className="text-2xl font-bold mb-4">Practical Use Cases</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Designing a Subnetting Scheme</h3>
                        <p className="text-sm text-muted-foreground">A network architect needs to divide a large `/16` network into smaller `/24` subnets. They convert the base network address to binary to visually identify the network and host portions, then manipulate the bits to define the new, smaller subnet ranges.
                        </p>
                    </div>
                     <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Configuring a Firewall ACL</h3>
                        <p className="text-sm text-muted-foreground">A security admin needs to block a specific range of IP addresses. Instead of writing dozens of rules, they convert the start and end IPs of the range to binary to calculate a single wildcard mask that covers the entire range, creating a more efficient and readable Access Control List (ACL).</p>
                    </div>
                     <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Passing Certification Exams</h3>
                        <p className="text-sm text-muted-foreground">A student studying for their CCNA exam uses this tool to quickly verify their manual IP-to-binary calculations. Repeatedly checking their work builds the speed and accuracy needed to solve complex subnetting problems under time pressure during the exam.</p>
                    </div>
                     <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Verifying Network Calculations</h3>
                        <p className="text-sm text-muted-foreground">A junior network engineer is troubleshooting why a device at `192.168.1.192` can't communicate on a network with a `255.255.255.224` mask. By converting both to binary using our <Link href="/tools/subnet-calculator" className='text-primary hover:underline'>Subnet Calculator</Link>, they can clearly see that the IP address is the broadcast address for that subnet, not a usable host address, instantly identifying the configuration error.</p>
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
                                <CardDescription className="text-xs">The essential tool for all subnetting calculations, including network ranges and host counts.</CardDescription>
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
                                <CardDescription className="text-xs">A general-purpose converter for binary, decimal, hexadecimal, and other number systems.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                </div>
            </section>
        </div>
    );
}
