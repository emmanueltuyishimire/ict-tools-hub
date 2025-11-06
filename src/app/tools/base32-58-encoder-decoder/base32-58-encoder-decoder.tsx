'use client';

import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Copy, Check, ArrowRightLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

// --- Base32 Encoding/Decoding ---
const base32Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
const base32DecodeMap = Object.fromEntries(Array.from(base32Chars).map((c, i) => [c, i]));

const encodeBase32 = (buffer: Uint8Array): string => {
    let bits = 0;
    let bitLength = 0;
    let base32 = '';

    for (let i = 0; i < buffer.length; i++) {
        bits = (bits << 8) | buffer[i];
        bitLength += 8;

        while (bitLength >= 5) {
            const index = (bits >>> (bitLength - 5)) & 31;
            base32 += base32Chars[index];
            bitLength -= 5;
        }
    }

    if (bitLength > 0) {
        const index = (bits << (5 - bitLength)) & 31;
        base32 += base32Chars[index];
    }

    const padding = 8 - (base32.length % 8);
    if (padding !== 8) {
        base32 += '='.repeat(padding);
    }
    
    return base32;
};

const decodeBase32 = (base32: string): Uint8Array => {
    base32 = base32.toUpperCase().replace(/=/g, '');
    let bits = 0;
    let bitLength = 0;
    const bytes = [];

    for (let i = 0; i < base32.length; i++) {
        const value = base32DecodeMap[base32[i]];
        if (value === undefined) {
            throw new Error(`Invalid Base32 character: ${base32[i]}`);
        }
        bits = (bits << 5) | value;
        bitLength += 5;

        if (bitLength >= 8) {
            bytes.push((bits >>> (bitLength - 8)) & 255);
            bitLength -= 8;
        }
    }

    return new Uint8Array(bytes);
};

// --- Base58 Encoding/Decoding ---
const base58Chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const base58DecodeMap = Object.fromEntries(Array.from(base58Chars).map((c, i) => [c, BigInt(i)]));
const bigInt58 = BigInt(58);

const encodeBase58 = (buffer: Uint8Array): string => {
    if (buffer.length === 0) return '';
    let num = BigInt('0x' + Buffer.from(buffer).toString('hex'));
    let base58 = '';
    while (num > 0) {
        const remainder = num % bigInt58;
        num = num / bigInt58;
        base58 = base58Chars[Number(remainder)] + base58;
    }

    let leadingZeros = 0;
    for (const byte of buffer) {
        if (byte === 0) leadingZeros++;
        else break;
    }
    return '1'.repeat(leadingZeros) + base58;
};

const decodeBase58 = (base58: string): Uint8Array => {
    if (base58.length === 0) return new Uint8Array();
    let num = BigInt(0);
    for (let i = 0; i < base58.length; i++) {
        const char = base58[i];
        const value = base58DecodeMap[char];
        if (value === undefined) {
            throw new Error(`Invalid Base58 character: ${char}`);
        }
        num = num * bigInt58 + value;
    }

    let hex = num.toString(16);
    if (hex.length % 2) hex = '0' + hex;

    let leadingZeros = 0;
    for (const char of base58) {
        if (char === '1') leadingZeros++;
        else break;
    }
    
    const bytes = new Uint8Array(leadingZeros + hex.length / 2);
    for (let i = 0, j = leadingZeros; i < hex.length; i += 2, j++) {
        bytes[j] = parseInt(hex.substring(i, i + 2), 16);
    }
    return bytes;
};

// --- The Component ---

type EncodingMode = 'base32' | 'base58';

interface EncoderDecoderProps {
    mode: EncodingMode;
}

const EncoderDecoder = ({ mode }: EncoderDecoderProps) => {
    const [decoded, setDecoded] = useState('Hello World!');
    const [encoded, setEncoded] = useState('');
    const [lastChanged, setLastChanged] = useState<'decoded' | 'encoded'>('decoded');
    const [error, setError] = useState('');

    const textEncoder = new TextEncoder();
    const textDecoder = new TextDecoder();
    
    const encoder = mode === 'base32' ? encodeBase32 : encodeBase58;
    const decoder = mode === 'base32' ? decodeBase32 : decodeBase58;

    useEffect(() => {
        if (lastChanged === 'decoded') {
            try {
                const buffer = textEncoder.encode(decoded);
                setEncoded(encoder(buffer));
                setError('');
            } catch (e: any) {
                setError(`Encoding failed: ${e.message}`);
            }
        }
    }, [decoded, lastChanged, encoder, textEncoder]);

    useEffect(() => {
        if (lastChanged === 'encoded') {
            if (encoded.trim() === '') {
                setDecoded('');
                setError('');
                return;
            }
            try {
                const buffer = decoder(encoded);
                setDecoded(textDecoder.decode(buffer));
                setError('');
            } catch (e: any) {
                setError(e.message || `Invalid ${mode.toUpperCase()} string.`);
            }
        }
    }, [encoded, lastChanged, decoder, textDecoder, mode]);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="space-y-6">
             {error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Invalid Input</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <Label htmlFor={`${mode}-decoded`}>Decoded (Plain Text)</Label>
                        <CopyButton text={decoded} />
                    </div>
                    <Textarea
                        id={`${mode}-decoded`}
                        value={decoded}
                        onChange={e => { setDecoded(e.target.value); setLastChanged('decoded'); }}
                        placeholder="Type or paste plain text here..."
                        className="h-32 font-code"
                    />
                </div>
                <div className="flex justify-center items-center">
                    <Button variant="outline" size="icon" onClick={() => { setDecoded(encoded); setEncoded(decoded); }} aria-label="Swap">
                        <ArrowRightLeft className="h-4 w-4" />
                    </Button>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <Label htmlFor={`${mode}-encoded`}>Encoded ({mode.toUpperCase()})</Label>
                        <CopyButton text={encoded} />
                    </div>
                    <Textarea
                        id={`${mode}-encoded`}
                        value={encoded}
                        onChange={e => { setEncoded(e.target.value); setLastChanged('encoded'); }}
                        placeholder={`Paste your ${mode.toUpperCase()} string here...`}
                        className="h-32 font-code"
                    />
                </div>
            </div>
        </div>
    );
};

const CopyButton = ({ text }: { text: string }) => {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleCopy}>
            {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
        </Button>
    );
};

export function Base32_58EncoderDecoder() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Base32 / Base58 Encoder & Decoder</CardTitle>
                <CardDescription>
                    Convert text to and from Base32 and Base58 formats. All operations are done securely in your browser.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="base32" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="base32">Base32</TabsTrigger>
                        <TabsTrigger value="base58">Base58</TabsTrigger>
                    </TabsList>
                    <TabsContent value="base32" className="pt-6">
                        <EncoderDecoder mode="base32" />
                    </TabsContent>
                    <TabsContent value="base58" className="pt-6">
                        <EncoderDecoder mode="base58" />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
