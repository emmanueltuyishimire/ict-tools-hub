
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Copy, Check, ArrowRightLeft } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

const caesarCipher = (str: string, shift: number, encode = true): string => {
  if (shift < 0 || shift > 25) shift = 0;
  
  const direction = encode ? 1 : -1;

  return str.replace(/[a-zA-Z]/g, (char) => {
    const start = char <= 'Z' ? 65 : 97;
    let charCode = char.charCodeAt(0);
    
    // The modulo operator in JS can be tricky with negative numbers, so we ensure it's positive.
    let shiftedCode = (charCode - start + (direction * shift) + 26) % 26;

    return String.fromCharCode(start + shiftedCode);
  });
};


export function CaesarCipher() {
    const [shift, setShift] = useState(3);
    const [decoded, setDecoded] = useState('Hello World!');
    const [encoded, setEncoded] = useState('');
    const [lastChanged, setLastChanged] = useState<'decoded' | 'encoded'>('decoded');
    const [copied, setCopied] = useState<'decoded' | 'encoded' | null>(null);

    useEffect(() => {
        if (lastChanged === 'decoded') {
            setEncoded(caesarCipher(decoded, shift, true));
        }
    }, [decoded, shift, lastChanged]);
    
    useEffect(() => {
        if (lastChanged === 'encoded') {
            setDecoded(caesarCipher(encoded, shift, false));
        }
    }, [encoded, shift, lastChanged]);

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
                <CardTitle>Caesar Cipher Tool</CardTitle>
                <CardDescription>
                    Select a shift value and type in either box to instantly encode or decode your text.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <div className='flex justify-between items-center'>
                        <Label htmlFor="shift-slider">Shift Value (1-25)</Label>
                        <span className='font-bold text-primary text-lg'>{shift}</span>
                    </div>
                    <Slider
                        id="shift-slider"
                        min={1}
                        max={25}
                        step={1}
                        value={[shift]}
                        onValueChange={(value) => setShift(value[0])}
                    />
                </div>
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
                            <Label htmlFor="encoded-input">Encoded (Ciphertext)</Label>
                             <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleCopy(encoded, 'encoded')}>
                                {copied === 'encoded' ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                        <Textarea
                            id="encoded-input"
                            value={encoded}
                            onChange={handleEncodedChange}
                            placeholder="Type or paste ciphertext here..."
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
