
'use client';

import { useState, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Check, Copy, AlertCircle } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

// Sieve of Eratosthenes algorithm
const generatePrimes = (limit: number): number[] => {
    if (limit < 2) return [];
    const sieve = new Array(limit + 1).fill(true);
    sieve[0] = sieve[1] = false;
    for (let p = 2; p * p <= limit; p++) {
        if (sieve[p]) {
            for (let i = p * p; i <= limit; i += p) {
                sieve[i] = false;
            }
        }
    }
    const primes: number[] = [];
    for (let i = 2; i <= limit; i++) {
        if (sieve[i]) {
            primes.push(i);
        }
    }
    return primes;
};

export function PrimeNumberGeneratorTool() {
    const [limit, setLimit] = useState<number | ''>(100);
    const [generatedPrimes, setGeneratedPrimes] = useState<number[]>([]);
    const [hasCopied, setHasCopied] = useState(false);
    const [error, setError] = useState('');
    const maxLimit = 100000;

    const handleGenerate = () => {
        setError('');
        setGeneratedPrimes([]);
        const numLimit = Number(limit);
        if (isNaN(numLimit) || numLimit < 2) {
            setError('Please enter a limit of 2 or greater.');
            return;
        }
        if (numLimit > maxLimit) {
            setError(`Limit cannot exceed ${maxLimit.toLocaleString()} for browser performance.`);
            return;
        }
        const primes = generatePrimes(numLimit);
        setGeneratedPrimes(primes);
    };

    const handleCopy = () => {
        if (generatedPrimes.length === 0) return;
        navigator.clipboard.writeText(generatedPrimes.join(', ')).then(() => {
            setHasCopied(true);
            setTimeout(() => setHasCopied(false), 2000);
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Prime Number Generator</CardTitle>
                <CardDescription>Generate a list of prime numbers up to a specified limit using the Sieve of Eratosthenes.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <div className="space-y-2 flex-grow">
                        <Label htmlFor="limit-input">Generate primes up to</Label>
                        <Input
                            id="limit-input"
                            type="number"
                            value={limit}
                            onChange={(e) => setLimit(e.target.value === '' ? '' : parseInt(e.target.value, 10))}
                            placeholder={`e.g., 1000 (max: ${maxLimit.toLocaleString()})`}
                            className="font-code text-lg"
                        />
                    </div>
                    <Button onClick={handleGenerate}>Generate Primes</Button>
                </div>

                {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {generatedPrimes.length > 0 && (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <Label htmlFor="primes-output">
                                Found {generatedPrimes.length.toLocaleString()} prime numbers
                            </Label>
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleCopy}>
                                {hasCopied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                        <Textarea
                            id="primes-output"
                            readOnly
                            value={generatedPrimes.join(', ')}
                            className="h-64 font-code bg-muted/50"
                            aria-label="Generated prime numbers"
                        />
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

    