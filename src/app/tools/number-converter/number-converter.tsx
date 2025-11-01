
'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { AlertCircle, ArrowRightLeft, Copy, Check, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type LastChanged = 'dec' | 'hex' | 'bin';

export function NumberConverter() {
    const [dec, setDec] = useState('255');
    const [hex, setHex] = useState('ff');
    const [bin, setBin] = useState('11111111');
    const [lastChanged, setLastChanged] = useState<LastChanged>('dec');
    const [error, setError] = useState('');
    const [copied, setCopied] = useState<LastChanged | null>(null);

    const handleCopy = (text: string, type: LastChanged) => {
        navigator.clipboard.writeText(text);
        setCopied(type);
        setTimeout(() => setCopied(null), 2000);
    };

    const handleClear = () => {
        setDec('0');
        setHex('0');
        setBin('0');
        setError('');
        setLastChanged('dec');
    }

    const handleChange = (type: LastChanged, value: string) => {
        setError('');
        setLastChanged(type);
        switch (type) {
            case 'dec':
                setDec(value);
                break;
            case 'hex':
                setHex(value);
                break;
            case 'bin':
                setBin(value);
                break;
        }
    }

    useEffect(() => {
        if (lastChanged !== 'dec') return;
        const num = BigInt(dec);
        if (dec === '' || isNaN(Number(num))) {
             if (dec !== '') setError('Invalid decimal number');
             return
        };
        setHex(num.toString(16));
        setBin(num.toString(2));
    }, [dec, lastChanged]);

    useEffect(() => {
        if (lastChanged !== 'hex') return;
        if (hex === '') {
            setDec('0');
            setBin('0');
            return;
        }
        if (!/^[0-9a-f]*$/i.test(hex)) {
            setError('Invalid hexadecimal number');
            return;
        }
        const num = BigInt(`0x${hex}`);
        setDec(num.toString(10));
        setBin(num.toString(2));
    }, [hex, lastChanged]);

    useEffect(() => {
        if (lastChanged !== 'bin') return;
        if (bin === '') {
            setDec('0');
            setHex('0');
            return;
        }
        if (!/^[01]*$/.test(bin)) {
            setError('Invalid binary number');
            return;
        }
        const num = BigInt(`0b${bin}`);
        setDec(num.toString(10));
        setHex(num.toString(16));
    }, [bin, lastChanged]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Number Base Converter</CardTitle>
                <CardDescription>Convert numbers between binary, decimal, and hexadecimal in real-time.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Invalid Input</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <Label htmlFor="decimal-input">Decimal (Base 10)</Label>
                             <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleCopy(dec, 'dec')}>
                                {copied === 'dec' ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                        <Input
                            id="decimal-input"
                            value={dec}
                            onChange={(e) => handleChange('dec', e.target.value)}
                            className="font-code"
                        />
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <Label htmlFor="hex-input">Hexadecimal (Base 16)</Label>
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleCopy(hex, 'hex')}>
                                {copied === 'hex' ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                        <Input
                            id="hex-input"
                            value={hex}
                            onChange={(e) => handleChange('hex', e.target.value)}
                            className="font-code"
                        />
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <Label htmlFor="binary-input">Binary (Base 2)</Label>
                             <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleCopy(bin, 'bin')}>
                                {copied === 'bin' ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                        <Input
                            id="binary-input"
                            value={bin}
                            onChange={(e) => handleChange('bin', e.target.value)}
                            className="font-code"
                        />
                    </div>
                </div>
                 <div className="flex justify-center">
                    <Button onClick={handleClear} variant="destructive">Clear</Button>
                 </div>
            </CardContent>
        </Card>
    );
}

