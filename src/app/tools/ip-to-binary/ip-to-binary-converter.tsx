
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

const keyTerminologies = [
    { term: 'IPv4 Address', definition: 'A 32-bit numerical label assigned to each device on a network, written as four decimal numbers separated by dots (e.g., 192.168.1.1).' },
    { term: 'Binary', definition: 'A base-2 number system that uses only two digits, 0 and 1. This is the fundamental language of computers.' },
    { term: 'Bit', definition: 'A single binary digit (a 0 or a 1), which is the smallest unit of data in computing.' },
    { term: 'Octet', definition: 'A group of 8 bits. An IPv4 address is composed of four octets, each representing a decimal number from 0 to 255.' },
    { term: 'Dot-Decimal Notation', definition: 'The human-readable format for IPv4 addresses, where the 32-bit address is written as four decimal numbers separated by dots.' },
    { term: 'Padding', definition: 'The process of adding leading zeros to a binary number to ensure it fills an 8-bit octet (e.g., converting `1100` to `00001100`).' },
];


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
        </div>
    );
}
