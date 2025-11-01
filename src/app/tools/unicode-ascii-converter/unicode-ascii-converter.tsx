
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Copy, Check, ArrowRightLeft } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

type LastChanged = 'text' | 'codes';

export function UnicodeAsciiConverter() {
    const [text, setText] = useState('Hello 😊');
    const [codes, setCodes] = useState('U+0048 U+0065 U+006C U+006C U+006F U+0020 U+1F60A');
    const [lastChanged, setLastChanged] = useState<LastChanged>('text');
    const [copied, setCopied] = useState<LastChanged | null>(null);
    const [error, setError] = useState('');

    useEffect(() => {
        if (lastChanged === 'text') {
            try {
                const codePoints = [...text].map(char => {
                    const code = char.codePointAt(0)!.toString(16).toUpperCase();
                    return `U+${'0000'.substring(code.length)}${code}`;
                }).join(' ');
                setCodes(codePoints);
                setError('');
            } catch (e) {
                 setError('Error converting text to code points.');
            }
        }
    }, [text, lastChanged]);
    
    useEffect(() => {
        if (lastChanged === 'codes') {
            setError('');
            if (codes.trim() === '') {
                setText('');
                return;
            }
            try {
                const newText = codes.trim().split(/\s+/)
                    .map(code => {
                        const cleanedCode = code.toUpperCase().replace('U+', '');
                        if (!/^[0-9A-F]+$/.test(cleanedCode)) {
                            throw new Error(`Invalid code point format: ${code}`);
                        }
                        const codePoint = parseInt(cleanedCode, 16);
                        if (isNaN(codePoint)) {
                            throw new Error(`Invalid code point: ${code}`);
                        }
                        return String.fromCodePoint(codePoint);
                    })
                    .join('');
                setText(newText);
            } catch (e: any) {
                setError(e.message || 'Invalid code point sequence.');
            }
        }
    }, [codes, lastChanged]);

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setLastChanged('text');
        setText(e.target.value);
    };

    const handleCodesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setLastChanged('codes');
        setCodes(e.target.value);
    };

    const handleCopy = (value: string, type: LastChanged) => {
        navigator.clipboard.writeText(value);
        setCopied(type);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Unicode and ASCII Converter</CardTitle>
                <CardDescription>Convert text to Unicode/ASCII code points and back in real-time.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <Label htmlFor="text-input">Text (Characters)</Label>
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleCopy(text, 'text')}>
                                {copied === 'text' ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                        <Textarea
                            id="text-input"
                            value={text}
                            onChange={handleTextChange}
                            placeholder="Type or paste text here..."
                            className="h-32 font-mono"
                        />
                    </div>

                     <div className="flex justify-center items-center">
                        <Button variant="outline" size="icon" onClick={() => { setText(codes); setCodes(text); }} aria-label="Swap text and codes">
                            <ArrowRightLeft className="h-4 w-4" />
                        </Button>
                    </div>
                    
                    <div className="space-y-2">
                         <div className="flex justify-between items-center">
                            <Label htmlFor="codes-input">Code Points (e.g., U+0041 or 65)</Label>
                             <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleCopy(codes, 'codes')}>
                                {copied === 'codes' ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                        <Textarea
                            id="codes-input"
                            value={codes}
                            onChange={handleCodesChange}
                            placeholder="e.g., U+0048 U+0065 U+006C U+006C U+006F"
                            className="h-32 font-mono"
                        />
                    </div>
                </div>
                 {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Invalid Input</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
            </CardContent>
        </Card>
    );
}
