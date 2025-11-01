
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Copy, Check, ArrowRightLeft } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function Base64EncoderDecoder() {
    const [decoded, setDecoded] = useState('Hello World!');
    const [encoded, setEncoded] = useState('SGVsbG8gV29ybGQh');
    const [lastChanged, setLastChanged] = useState<'decoded' | 'encoded'>('decoded');
    const [copied, setCopied] = useState<'decoded' | 'encoded' | null>(null);
    const [error, setError] = useState('');

    useEffect(() => {
        if (lastChanged === 'decoded') {
            try {
                const newEncoded = btoa(unescape(encodeURIComponent(decoded)));
                setEncoded(newEncoded);
                setError('');
            } catch (e) {
                // Ignore errors from incomplete typing
            }
        }
    }, [decoded, lastChanged]);
    
    useEffect(() => {
        if (lastChanged === 'encoded') {
            try {
                const newDecoded = decodeURIComponent(escape(atob(encoded)));
                setDecoded(newDecoded);
                setError('');
            } catch (e) {
                setError('Invalid Base64 string. Please check your input.');
            }
        }
    }, [encoded, lastChanged]);

    const handleDecodedChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setLastChanged('decoded');
        setDecoded(e.target.value);
    };

    const handleEncodedChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setLastChanged('encoded');
        setEncoded(e.target.value);
    };

    const handleSwap = () => {
        const temp = decoded;
        setDecoded(encoded);
        setEncoded(temp);
    };
    
    const handleClear = () => {
        setDecoded('');
        setEncoded('');
        setError('');
    };

    const handleCopy = (text: string, type: 'decoded' | 'encoded') => {
        navigator.clipboard.writeText(text);
        setCopied(type);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Base64 Encoder / Decoder</CardTitle>
                <CardDescription>
                    Instantly encode plain text to Base64 or decode Base64 back to its original form. This tool fully supports UTF-8 characters.
                    <span className="block mt-2 font-semibold text-destructive">All operations are done client-side. Your data is never sent to a server.</span>
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <Label htmlFor="decoded-input">Decoded (Plain Text)</Label>
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleCopy(decoded, 'decoded')}>
                                {copied === 'decoded' ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                        <Textarea
                            id="decoded-input"
                            value={decoded}
                            onChange={handleDecodedChange}
                            placeholder="Type or paste plain text here..."
                            className="h-32 font-code"
                            aria-label="Decoded text input"
                        />
                    </div>

                     <div className="flex justify-center items-center">
                        <Button variant="outline" size="icon" onClick={handleSwap} aria-label="Swap encoded and decoded text">
                            <ArrowRightLeft className="h-4 w-4" />
                        </Button>
                    </div>
                    
                    <div className="space-y-2">
                         <div className="flex justify-between items-center">
                            <Label htmlFor="encoded-input">Encoded (Base64)</Label>
                             <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleCopy(encoded, 'encoded')}>
                                {copied === 'encoded' ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                        <Textarea
                            id="encoded-input"
                            value={encoded}
                            onChange={handleEncodedChange}
                            placeholder="Type or paste your Base64 string here..."
                            className="h-32 font-code"
                            aria-label="Encoded text input"
                        />
                    </div>
                </div>
                {error && (
                     <Alert variant="destructive">
                        <AlertTitle>Decoding Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                 <div className="flex justify-center">
                    <Button onClick={handleClear} variant="destructive">Clear All</Button>
                 </div>
            </CardContent>
        </Card>
    );
}
