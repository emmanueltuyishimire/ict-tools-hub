
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Check, RefreshCw, AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

export function RandomNumberGenerator() {
    const [min, setMin] = useState(1);
    const [max, setMax] = useState(100);
    const [count, setCount] = useState(10);
    const [allowDuplicates, setAllowDuplicates] = useState(true);
    const [generatedNumbers, setGeneratedNumbers] = useState<number[]>([]);
    const [hasCopied, setHasCopied] = useState(false);
    const [error, setError] = useState('');

    const generateNumbers = () => {
        setError('');
        const minNum = Number(min);
        const maxNum = Number(max);
        const countNum = Number(count);

        if (isNaN(minNum) || isNaN(maxNum) || isNaN(countNum)) {
            setError('Please enter valid numbers for all fields.');
            return;
        }

        if (minNum >= maxNum) {
            setError('The minimum value must be less than the maximum value.');
            return;
        }

        if (countNum <= 0) {
            setError('The count must be a positive number.');
            return;
        }
        
        const range = maxNum - minNum + 1;
        if (!allowDuplicates && countNum > range) {
             setError('Cannot generate more unique numbers than the available range.');
             return;
        }

        const numbers = new Set<number>();
        const results: number[] = [];
        
        // Use crypto.getRandomValues for cryptographically secure random numbers
        const randomValues = new Uint32Array(countNum * 2); // Get more values to be safe
        window.crypto.getRandomValues(randomValues);
        let cryptoIndex = 0;

        const getSecureRandom = () => {
             if (cryptoIndex >= randomValues.length) {
                window.crypto.getRandomValues(randomValues);
                cryptoIndex = 0;
            }
            return randomValues[cryptoIndex++] / 0x100000000;
        }

        while (results.length < countNum) {
            const randomNumber = Math.floor(getSecureRandom() * range) + minNum;
            if (allowDuplicates) {
                results.push(randomNumber);
            } else {
                if (!numbers.has(randomNumber)) {
                    numbers.add(randomNumber);
                    results.push(randomNumber);
                }
            }
             // Safety break for unique numbers in case of bad luck with random generator
             if (!allowDuplicates && results.length < countNum && cryptoIndex > randomValues.length - 10){
                  if( (maxNum-minNum) < (countNum * 1.5)) {
                    // fall back to a shuffle method for small ranges
                    const allNumbers = Array.from({length: range}, (_, i) => i + minNum);
                    for (let i = allNumbers.length - 1; i > 0; i--) {
                        const j = Math.floor(getSecureRandom() * (i + 1));
                        [allNumbers[i], allNumbers[j]] = [allNumbers[j], allNumbers[i]];
                    }
                    setGeneratedNumbers(allNumbers.slice(0, countNum));
                    return;
                  }
             }
        }
        setGeneratedNumbers(results);
    };

    const handleCopy = () => {
        if (generatedNumbers.length === 0) return;
        navigator.clipboard.writeText(generatedNumbers.join(', ')).then(() => {
            setHasCopied(true);
            setTimeout(() => setHasCopied(false), 2000);
        });
    };
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Generator Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="min-val">Minimum Value</Label>
                        <Input id="min-val" type="number" value={min} onChange={(e) => setMin(Number(e.target.value))} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="max-val">Maximum Value</Label>
                        <Input id="max-val" type="number" value={max} onChange={(e) => setMax(Number(e.target.value))} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="count">Count</Label>
                        <Input id="count" type="number" value={count} onChange={(e) => setCount(Number(e.target.value))} />
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="duplicates" checked={allowDuplicates} onCheckedChange={(checked) => setAllowDuplicates(checked as boolean)} />
                    <Label htmlFor="duplicates">Allow Duplicates</Label>
                </div>
                
                 {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <Button onClick={generateNumbers}>
                    <RefreshCw className="mr-2 h-4 w-4" /> Generate Numbers
                </Button>

                {generatedNumbers.length > 0 && (
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <Label htmlFor="output-numbers">Generated Numbers</Label>
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleCopy}>
                                {hasCopied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                        <Textarea
                            id="output-numbers"
                            readOnly
                            value={generatedNumbers.join(', ')}
                            className="h-40 font-code bg-muted/50"
                        />
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

