
'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, XCircle } from 'lucide-react';

const isPrime = (num: number): { result: boolean; factor: number | null } => {
    if (num <= 1) return { result: false, factor: null };
    if (num <= 3) return { result: true, factor: null };
    if (num % 2 === 0) return { result: false, factor: 2 };
    if (num % 3 === 0) return { result: false, factor: 3 };

    for (let i = 5; i * i <= num; i = i + 6) {
        if (num % i === 0) return { result: false, factor: i };
        if (num % (i + 2) === 0) return { result: false, factor: i + 2 };
    }

    return { result: true, factor: null };
};

export function PrimeChecker() {
    const [numberInput, setNumberInput] = useState<string>('29');

    const { result, factor, isValid } = useMemo(() => {
        const num = parseInt(numberInput, 10);
        if (isNaN(num) || numberInput === '') {
            return { result: false, factor: null, isValid: false };
        }
        const { result: isPrimeResult, factor: primeFactor } = isPrime(num);
        return { result: isPrimeResult, factor: primeFactor, isValid: true };
    }, [numberInput]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Check for Primality</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="number-input">Enter a Number</Label>
                    <Input
                        id="number-input"
                        type="number"
                        value={numberInput}
                        onChange={(e) => setNumberInput(e.target.value)}
                        placeholder="e.g., 29"
                        className="font-code text-lg"
                    />
                </div>

                {isValid && (
                    <Alert variant={result ? 'default' : 'destructive'} className={result ? 'border-green-500/50' : ''}>
                        {result ? <CheckCircle className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4" />}
                        <AlertTitle className={result ? 'text-green-700' : ''}>
                            {numberInput} is {result ? 'a Prime Number' : 'Not a Prime Number'}
                        </AlertTitle>
                        <AlertDescription>
                            {result
                                ? 'It is only divisible by 1 and itself.'
                                : factor
                                    ? `It is divisible by ${factor} (e.g., ${numberInput} / ${factor} = ${parseInt(numberInput, 10) / factor}).`
                                    : 'Prime numbers must be greater than 1.'
                            }
                        </AlertDescription>
                    </Alert>
                )}
            </CardContent>
        </Card>
    );
}

    