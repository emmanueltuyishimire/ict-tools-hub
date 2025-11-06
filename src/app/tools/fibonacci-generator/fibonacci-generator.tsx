'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Check, Copy, AlertCircle } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

const generateFibonacci = (limit: number): string[] => {
    if (limit <= 0) return [];
    if (limit === 1) return ['0'];

    const sequence: bigint[] = [0n, 1n];
    
    // Use BigInt for calculations to handle large numbers
    for (let i = 2; i < limit; i++) {
        const nextFib = sequence[i - 1] + sequence[i - 2];
        sequence.push(nextFib);
    }

    return sequence.map(n => n.toString());
};

export function FibonacciGeneratorTool() {
    const [limit, setLimit] = useState<number | ''>(20);
    const [generatedSequence, setGeneratedSequence] = useState<string[]>([]);
    const [hasCopied, setHasCopied] = useState(false);
    const [error, setError] = useState('');
    const maxLimit = 2000; // Cap for browser performance

    const handleGenerate = () => {
        setError('');
        setGeneratedSequence([]);
        const numLimit = Number(limit);

        if (isNaN(numLimit) || numLimit < 1) {
            setError('Please enter a limit of 1 or greater.');
            return;
        }
        if (numLimit > maxLimit) {
            setError(`Limit cannot exceed ${maxLimit.toLocaleString()} for browser performance.`);
            return;
        }
        
        const sequence = generateFibonacci(numLimit);
        setGeneratedSequence(sequence);
    };

    const handleCopy = () => {
        if (generatedSequence.length === 0) return;
        navigator.clipboard.writeText(generatedSequence.join(', ')).then(() => {
            setHasCopied(true);
            setTimeout(() => setHasCopied(false), 2000);
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Fibonacci Sequence Generator</CardTitle>
                <CardDescription>Generate a list of Fibonacci numbers up to a specified length.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <div className="space-y-2 flex-grow">
                        <Label htmlFor="limit-input">Generate the first</Label>
                        <Input
                            id="limit-input"
                            type="number"
                            value={limit}
                            onChange={(e) => setLimit(e.target.value === '' ? '' : parseInt(e.target.value, 10))}
                            placeholder={`e.g., 20 (max: ${maxLimit.toLocaleString()})`}
                            className="font-code text-lg"
                        />
                    </div>
                    <Button onClick={handleGenerate}>Generate Sequence</Button>
                </div>

                {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {generatedSequence.length > 0 && (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <Label htmlFor="sequence-output">
                                Found {generatedPrimes.length.toLocaleString()} prime numbers
                            </Label>
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleCopy}>
                                {hasCopied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                        <Textarea
                            id="sequence-output"
                            readOnly
                            value={generatedSequence.join(', ')}
                            className="h-64 font-code bg-muted/50"
                            aria-label="Generated Fibonacci sequence"
                        />
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
