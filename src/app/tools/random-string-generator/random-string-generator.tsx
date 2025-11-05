'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Copy, Check, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

export function RandomStringGenerator() {
    const [length, setLength] = useState(16);
    const [charSets, setCharSets] = useState({
        lowercase: true,
        uppercase: true,
        numbers: true,
        symbols: false,
    });
    const [exclude, setExclude] = useState('Il1O0');
    const [generatedString, setGeneratedString] = useState('');
    const [hasCopied, setHasCopied] = useState(false);

    const characterPool = useMemo(() => {
        let pool = '';
        if (charSets.lowercase) pool += 'abcdefghijklmnopqrstuvwxyz';
        if (charSets.uppercase) pool += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (charSets.numbers) pool += '0123456789';
        if (charSets.symbols) pool += '!@#$%^&*()_+-=[]{};\':"\\|,.<>/?';

        const excludeChars = new Set(exclude.split(''));
        return pool.split('').filter(char => !excludeChars.has(char)).join('');
    }, [charSets, exclude]);

    const generateString = () => {
        if (!characterPool) {
            setGeneratedString('');
            return;
        }
        const cryptoArray = new Uint32Array(length);
        window.crypto.getRandomValues(cryptoArray);
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characterPool[cryptoArray[i] % characterPool.length];
        }
        setGeneratedString(result);
    };

    const handleCopy = () => {
        if (!generatedString) return;
        navigator.clipboard.writeText(generatedString).then(() => {
            setHasCopied(true);
            setTimeout(() => setHasCopied(false), 2000);
        });
    };

    const handleCheckboxChange = (key: keyof typeof charSets) => {
        setCharSets(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Generator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <Label htmlFor="length-slider">String Length</Label>
                        <span className="font-bold text-primary text-lg">{length}</span>
                    </div>
                    <Slider
                        id="length-slider"
                        min={1}
                        max={128}
                        step={1}
                        value={[length]}
                        onValueChange={(value) => setLength(value[0])}
                    />
                </div>

                <div className="space-y-4">
                    <Label>Character Sets</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="lowercase" checked={charSets.lowercase} onCheckedChange={() => handleCheckboxChange('lowercase')} />
                            <Label htmlFor="lowercase" className="cursor-pointer">a-z</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="uppercase" checked={charSets.uppercase} onCheckedChange={() => handleCheckboxChange('uppercase')} />
                            <Label htmlFor="uppercase" className="cursor-pointer">A-Z</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="numbers" checked={charSets.numbers} onCheckedChange={() => handleCheckboxChange('numbers')} />
                            <Label htmlFor="numbers" className="cursor-pointer">0-9</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="symbols" checked={charSets.symbols} onCheckedChange={() => handleCheckboxChange('symbols')} />
                            <Label htmlFor="symbols" className="cursor-pointer">!@#$...</Label>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="exclude-chars">Exclude Characters</Label>
                    <Input
                        id="exclude-chars"
                        value={exclude}
                        onChange={(e) => setExclude(e.target.value)}
                        placeholder="e.g., Il1O0"
                        className="font-code"
                    />
                </div>

                <Button onClick={generateString} disabled={!characterPool} className="w-full sm:w-auto">
                    <RefreshCw className="mr-2 h-4 w-4" /> Generate String
                </Button>

                {generatedString && (
                    <div className="space-y-2">
                        <Label htmlFor="output-string">Generated String</Label>
                        <div className="relative">
                            <Input
                                id="output-string"
                                readOnly
                                value={generatedString}
                                className="font-mono text-lg pr-10 h-12 bg-muted/50"
                            />
                             <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" onClick={handleCopy}>
                                {hasCopied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
