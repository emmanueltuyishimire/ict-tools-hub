'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Check, Copy, AlertCircle } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

const calculateFactorial = (n: number): bigint | null => {
    if (n < 0) return null;
    if (n === 0) return 1n;
    
    let result = 1n;
    for (let i = 2; i <= n; i++) {
        result *= BigInt(i);
    }
    return result;
};

export function FactorialCalculator() {
    const [numberInput, setNumberInput] = useState<number | ''>(15);
    const [result, setResult] = useState<bigint | null>(null);
    const [hasCopied, setHasCopied] = useState(false);
    const [error, setError] = useState('');
    const maxLimit = 2000;

    const handleCalculate = () => {
        setError('');
        setResult(null);
        const num = Number(numberInput);

        if (isNaN(num) || num < 0 || !Number.isInteger(num)) {
            setError('Please enter a non-negative integer.');
            return;
        }
        if (num > maxLimit) {
            setError(`Input cannot exceed ${maxLimit.toLocaleString()} for browser performance.`);
            return;
        }
        
        const factorialResult = calculateFactorial(num);
        setResult(factorialResult);
    };

    const handleCopy = () => {
        if (!result) return;
        navigator.clipboard.writeText(result.toString()).then(() => {
            setHasCopied(true);
            setTimeout(() => setHasCopied(false), 2000);
        });
    };
    
    const formattedResult = useMemo(() => {
        if (!result) return { full: '', scientific: '' };
        const fullString = result.toString();
        if (fullString.length > 30) {
            return {
                full: fullString,
                scientific: result.toExponential(5)
            }
        }
        return { full: fullString, scientific: '' };
    }, [result]);


    return (
        <Card>
            <CardHeader>
                <CardTitle>Factorial Calculator (n!)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <div className="space-y-2 flex-grow">
                        <Label htmlFor="number-input">Enter a non-negative integer</Label>
                        <Input
                            id="number-input"
                            type="number"
                            value={numberInput}
                            onChange={(e) => setNumberInput(e.target.value === '' ? '' : parseInt(e.target.value, 10))}
                            placeholder={`e.g., 15 (max: ${maxLimit.toLocaleString()})`}
                            className="font-code text-lg"
                        />
                    </div>
                    <Button onClick={handleCalculate}>Calculate</Button>
                </div>

                {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {result !== null && (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <Label htmlFor="result-output">Result</Label>
                             <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleCopy}>
                                {hasCopied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                        {formattedResult.scientific && (
                             <p className="text-sm text-muted-foreground font-code">
                               Approximation: {formattedResult.scientific}
                            </p>
                        )}
                        <Textarea
                            id="result-output"
                            readOnly
                            value={formattedResult.full}
                            className="h-32 font-code bg-muted/50"
                            aria-label="Factorial result"
                        />
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
