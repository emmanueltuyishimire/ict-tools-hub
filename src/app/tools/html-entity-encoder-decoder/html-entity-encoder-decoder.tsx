
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Copy, Check, ArrowRightLeft } from 'lucide-react';

const entities: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
};

const encodeEntities = (str: string) => {
    return str.replace(/[&<>"']/g, (char) => entities[char]);
};

const decodeEntities = (str: string) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = str;
    return textarea.value;
};

export function HtmlEntityEncoderDecoder() {
    const [decoded, setDecoded] = useState('<p class="text-red">Hello & welcome!</p>');
    const [encoded, setEncoded] = useState('');
    const [lastChanged, setLastChanged] = useState<'decoded' | 'encoded'>('decoded');
    const [copied, setCopied] = useState<'decoded' | 'encoded' | null>(null);

    useEffect(() => {
        if (lastChanged === 'decoded') {
            setEncoded(encodeEntities(decoded));
        }
    }, [decoded, lastChanged]);

    useEffect(() => {
        if (lastChanged === 'encoded') {
            setDecoded(decodeEntities(encoded));
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
                            <Label htmlFor="decoded-input">Decoded (Plain Text / HTML)</Label>
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleCopy(decoded, 'decoded')}>
                                {copied === 'decoded' ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                        <Textarea
                            id="decoded-input"
                            value={decoded}
                            onChange={handleDecodedChange}
                            placeholder="<p>Enter your HTML here</p>"
                            className="h-32 font-code"
                        />
                    </div>
                    <div className="flex justify-center items-center">
                        <Button variant="outline" size="icon" onClick={handleSwap} aria-label="Swap encoded and decoded text">
                            <ArrowRightLeft className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="space-y-2">
                         <div className="flex justify-between items-center">
                            <Label htmlFor="encoded-input">Encoded (HTML Entities)</Label>
                             <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleCopy(encoded, 'encoded')}>
                                {copied === 'encoded' ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                        <Textarea
                            id="encoded-input"
                            value={encoded}
                            onChange={handleEncodedChange}
                            placeholder="&lt;p&gt;Encoded text will appear here&lt;/p&gt;"
                            className="h-32 font-code"
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

