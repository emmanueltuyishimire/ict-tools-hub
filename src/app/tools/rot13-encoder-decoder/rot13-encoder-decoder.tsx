'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Copy, Check, ArrowRightLeft, RefreshCw } from 'lucide-react';

const rot13 = (str: string): string => {
  return str.replace(/[a-zA-Z]/g, (char) => {
    const start = char <= 'Z' ? 65 : 97;
    return String.fromCharCode(start + (char.charCodeAt(0) - start + 13) % 26);
  });
};

export function Rot13EncoderDecoder() {
    const [decoded, setDecoded] = useState('Why did the chicken cross the road?');
    const [encoded, setEncoded] = useState('Jul qvq gur puvpxra pebff gur ebnq?');
    const [lastChanged, setLastChanged] = useState<'decoded' | 'encoded'>('decoded');
    const [copied, setCopied] = useState<'decoded' | 'encoded' | null>(null);

    useEffect(() => {
        if (lastChanged === 'decoded') {
            setEncoded(rot13(decoded));
        }
    }, [decoded, lastChanged]);
    
    useEffect(() => {
        if (lastChanged === 'encoded') {
            setDecoded(rot13(encoded));
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
            <CardHeader>
                <CardTitle>ROT13 Cipher Tool</CardTitle>
                <CardDescription>
                    Encode and decode text using the ROT13 substitution cipher. Type in one box and see the result instantly in the other.
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
                            className="h-32 font-mono"
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
                            <Label htmlFor="encoded-input">Encoded (ROT13)</Label>
                             <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleCopy(encoded, 'encoded')}>
                                {copied === 'encoded' ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                        <Textarea
                            id="encoded-input"
                            value={encoded}
                            onChange={handleEncodedChange}
                            placeholder="Type or paste ROT13 text here..."
                            className="h-32 font-mono"
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
