'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Check, Clipboard, AlertCircle, VenetianMask, Lightbulb, HelpCircle, BookOpen, ChevronRight } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CodeBlock } from '@/components/code-block';
import Link from 'next/link';

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
        octets = inputWithDots;
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
    // Allow binary digits, dots, and spaces
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

  return (
    <div className="max-w-4xl mx-auto space-y-8">
        <Card>
            <CardHeader>
                <CardTitle>Enter Binary String</CardTitle>
                <CardDescription>
                    Input a 32-bit binary string, with or without dots between octets.
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

        <Card className='bg-secondary/30 border-primary/20'>
            <CardHeader>
                <div className='flex items-center gap-2 text-primary'>
                    <BookOpen className="h-6 w-6" aria-hidden="true" />
                    <CardTitle className="text-primary">Educational Deep Dive</CardTitle>
                </div>
                <CardDescription>Learn the concepts behind binary to IP conversion.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 prose prose-sm max-w-none text-foreground">
                <section>
                    <h3 className="font-semibold text-lg">What is an IP Address?</h3>
                    <p>An IP (Internet Protocol) address is a unique numerical label assigned to each device connected to a computer network that uses the Internet Protocol for communication. An IPv4 address, the most common type, is a 32-bit number, typically expressed in a "dot-decimal" notation like <code className="font-code bg-muted p-1 rounded-sm">192.168.1.1</code>.</p>
                </section>
                
                <section>
                    <h3 className="font-semibold text-lg">How Binary Relates to IP Addresses</h3>
                    <p>Computers don't understand decimal numbers directly. They work in binary, a base-2 system using only 0s and 1s. An IPv4 address is made of four 8-bit sections called "octets." Each octet can represent a decimal number from 0 to 255. To convert, you translate each octet from binary to its decimal equivalent.</p>
                    <div className="overflow-x-auto">
                        <table className="w-full my-4">
                            <thead>
                                <tr className='border-b'>
                                    <th className="p-2 text-left font-semibold">Decimal</th>
                                    <th className="p-2 text-left font-semibold">Binary</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='border-b'><td className="p-2 font-code">192</td><td className="p-2 font-code">11000000</td></tr>
                                <tr className='border-b'><td className="p-2 font-code">168</td><td className="p-2 font-code">10101000</td></tr>
                                <tr className='border-b'><td className="p-2 font-code">1</td><td className="p-2 font-code">00000001</td></tr>
                                <tr><td className="p-2 font-code">1</td><td className="p-2 font-code">00000001</td></tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <section>
                    <h3 className="font-semibold text-lg">Step-by-Step Conversion Tutorial</h3>
                    <ol className="list-decimal pl-5 space-y-2">
                        <li><strong>Take the 32-bit binary string.</strong> If not already separated, divide it into four 8-bit octets.</li>
                        <li><strong>Focus on one octet at a time.</strong> For example, <code className="font-code bg-muted p-1 rounded-sm">11000000</code>.</li>
                        <li><strong>Assign positional values</strong> to each bit, from right to left, starting with 2<sup>0</sup> (which is 1), 2<sup>1</sup> (2), 2<sup>2</sup> (4), up to 2<sup>7</sup> (128).</li>
                        <li><strong>Add up the values for the '1's.</strong> For <code className="font-code bg-muted p-1 rounded-sm">11000000</code>, you add 128 + 64, which equals 192.</li>
                        <li><strong>Repeat for all four octets</strong> and join them with dots to get the final IP address.</li>
                    </ol>
                </section>
            </CardContent>
        </Card>
        
        <div className="grid md:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <div className='flex items-center gap-2'>
                        <Lightbulb className="h-6 w-6 text-accent" aria-hidden="true" />
                        <CardTitle>Practical Use Cases</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                        <li><strong>Networking Labs:</strong> Students and professionals use this conversion to understand and complete networking exercises.</li>
                        <li><strong>Subnetting:</strong> Binary is essential for calculating subnet masks, network addresses, and broadcast addresses.</li>
                        <li><strong>Troubleshooting:</strong> Understanding the binary representation can help diagnose certain IP configuration and routing issues.</li>
                        <li><strong>Cybersecurity:</strong> Analysts may examine network traffic at the bit level to identify anomalies or malicious patterns.</li>
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                     <div className='flex items-center gap-2'>
                        <HelpCircle className="h-6 w-6" aria-hidden="true" />
                        <CardTitle>Frequently Asked Questions</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                     <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Why is an IPv4 address 32 bits?</AccordionTrigger>
                            <AccordionContent>
                            It consists of four 8-bit octets (4 x 8 = 32). This structure allows for approximately 4.3 billion unique addresses, which seemed like more than enough when it was designed.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Can a binary IP be shorter than 32 bits?</AccordionTrigger>
                            <AccordionContent>
                            No, a valid IPv4 address must be exactly 32 bits long. This tool will show an error if the input is not 32 bits. You may need to pad octets with leading zeros (e.g., `1010` becomes `00001010`).
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>What's the difference between IPv4 and IPv6?</AccordionTrigger>
                            <AccordionContent>
                            IPv4 is 32-bit, while IPv6 is a newer, 128-bit address format designed to solve the problem of IPv4 address exhaustion. IPv6 addresses are much longer and are represented in hexadecimal.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
        </div>

        <div>
            <h3 className="text-xl font-semibold mb-4">Related Tools & Articles</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link href="/tools/ip-to-binary" className="block">
                    <Card className="hover:border-primary transition-colors h-full">
                        <CardHeader>
                            <CardTitle className="text-base flex items-center justify-between">
                                IP to Binary Converter
                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            </CardTitle>
                            <CardDescription className="text-xs">Convert decimal IP addresses back to binary.</CardDescription>
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
                            <CardDescription className="text-xs">Calculate network ranges, broadcast addresses, and more.</CardDescription>
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
                            <CardDescription className="text-xs">Convert between binary, decimal, and hexadecimal.</CardDescription>
                        </CardHeader>
                    </Card>
                </Link>
            </div>
        </div>
    </div>
  );
}
