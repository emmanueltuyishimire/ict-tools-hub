
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
