
'use client';

import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { AlertCircle, Copy, Check } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

// --- Conversion Logic ---
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        }
        : null;
};

const rgbToHex = (r: number, g: number, b: number): string => {
    const componentToHex = (c: number): string => {
        const hex = c.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
};


export function ColorConverter() {
    const [hex, setHex] = useState('#ffffff');
    const [rgb, setRgb] = useState({ r: '255', g: '255', b: '255' });
    const [lastChanged, setLastChanged] = useState<'hex' | 'rgb'>('rgb');
    const [error, setError] = useState('');
    const [copied, setCopied] = useState<'hex' | 'rgb' | null>(null);

    useEffect(() => {
        if (lastChanged === 'rgb') {
            const rNum = parseInt(rgb.r);
            const gNum = parseInt(rgb.g);
            const bNum = parseInt(rgb.b);

            if (!isNaN(rNum) && !isNaN(gNum) && !isNaN(bNum) &&
                rNum >= 0 && rNum <= 255 &&
                gNum >= 0 && gNum <= 255 &&
                bNum >= 0 && bNum <= 255) {
                setHex(rgbToHex(rNum, gNum, bNum));
                setError('');
            } else {
                setError('RGB values must be between 0 and 255.');
            }
        }
    }, [rgb, lastChanged]);
    
     useEffect(() => {
        if (lastChanged === 'hex') {
            const newRgb = hexToRgb(hex);
            if (newRgb) {
                setRgb({ r: newRgb.r.toString(), g: newRgb.g.toString(), b: newRgb.b.toString() });
                setError('');
            } else {
                setError('Invalid Hex color code. Use #RRGGBB or #RGB format.');
            }
        }
    }, [hex, lastChanged]);

    const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastChanged('hex');
        setHex(e.target.value);
    };

    const handleRgbChange = (channel: 'r' | 'g' | 'b', value: string) => {
        setLastChanged('rgb');
        setRgb(prev => ({ ...prev, [channel]: value }));
    };

    const handleCopy = (text: string, type: 'hex' | 'rgb') => {
        navigator.clipboard.writeText(text);
        setCopied(type);
        setTimeout(() => setCopied(null), 2000);
    };
    
    const validColor = useMemo(() => {
        return error === '' ? hex : '#FFFFFF';
    }, [error, hex]);


    return (
        <Card>
            <CardHeader>
                <CardTitle>Hex ↔ RGB Color Converter</CardTitle>
                <CardDescription>
                    Convert colors between hexadecimal and RGB formats in real-time.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                 <div className="h-24 w-full rounded-lg border" style={{ backgroundColor: validColor }} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                             <Label htmlFor="hex-input">Hexadecimal</Label>
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleCopy(hex, 'hex')}>
                                {copied === 'hex' ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                        <Input
                            id="hex-input"
                            value={hex}
                            onChange={handleHexChange}
                            placeholder="#RRGGBB"
                            className="font-code"
                        />
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <Label>RGB (Red, Green, Blue)</Label>
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleCopy(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, 'rgb')}>
                                {copied === 'rgb' ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            <Input
                                id="rgb-r"
                                type="number"
                                min="0" max="255"
                                value={rgb.r}
                                onChange={e => handleRgbChange('r', e.target.value)}
                                placeholder="R"
                                className="font-code"
                            />
                            <Input
                                id="rgb-g"
                                type="number"
                                min="0" max="255"
                                value={rgb.g}
                                onChange={e => handleRgbChange('g', e.target.value)}
                                placeholder="G"
                                className="font-code"
                            />
                            <Input
                                id="rgb-b"
                                type="number"
                                min="0" max="255"
                                value={rgb.b}
                                onChange={e => handleRgbChange('b', e.target.value)}
                                placeholder="B"
                                className="font-code"
                            />
                        </div>
                    </div>
                </div>

                {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Invalid Format</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
            </CardContent>
        </Card>
    );
}
