'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Copy, Check, ArrowRightLeft } from 'lucide-react';

export function UrlEncoderDecoder() {
    const [decoded, setDecoded] = useState('Hello World! This is a test & example?');
    const [encoded, setEncoded] = useState('');
    const [lastChanged, setLastChanged] = useState<'decoded' | 'encoded'>('decoded');
    const [copied, setCopied] = useState<'decoded' | 'encoded' | null>(null);

    useEffect(() => {
        if (lastChanged === 'decoded') {
            try {
                const newEncoded = encodeURIComponent(decoded);
                setEncoded(newEncoded);
            } catch (e) {}
        }
    }, [decoded, lastChanged]);
    
    useEffect(() => {
        if (lastChanged === 'encoded') {
            try {
                // Prevent decoding if it's an incomplete sequence
                if (!/(%[0-9a-fA-F]{0,1})$|(%)$/.test(encoded)) {
                    const newDecoded = decodeURIComponent(encoded);
                    setDecoded(newDecoded);
                }
            } catch (e) {
                // Malformed URI, do nothing to prevent crashing and allow user to fix it
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
        setDecoded(encoded);
        setEncoded(decoded);
        setLastChanged(lastChanged === 'decoded' ? 'encoded' : 'decoded');
    };
    
    const handleClear = () => {
        setDecoded('');
        setEncoded('');
    };

    const handleCopy = (text: string, type: 'decoded' | 'encoded') => {
        navigator.clipboard.writeText(text);
        setCopied(type);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <Card>
            <CardContent className="p-6 space-y-6">
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
                            <Label htmlFor="encoded-input">Encoded (URL-Safe)</Label>
                             <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleCopy(encoded, 'encoded')}>
                                {copied === 'encoded' ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                        <Textarea
                            id="encoded-input"
                            value={encoded}
                            onChange={handleEncodedChange}
                            placeholder="e.g., Hello%20World!"
                            className="h-32 font-code"
                            aria-label="Encoded text input"
                        />
                    </div>
                </div>
                 <div className="flex justify-center">
                    <Button onClick={handleClear} variant="destructive">Clear All</Button>
                 </div>
            </CardContent>
        </Card>
    );
}
