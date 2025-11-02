'use client';

import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, CheckCircle } from 'lucide-react';
import { dataTypeSizes } from './schema';

type DataType = keyof typeof dataTypeSizes;

const analyzeData = (currentType: DataType, length: number | '', sample: string) => {
    if (!currentType) return null;

    const sampleValues = sample.split('\n').map(s => s.trim()).filter(Boolean);
    if (sampleValues.length === 0) return { recommendation: currentType, reason: 'No sample data provided to analyze.' };

    const isNumeric = sampleValues.every(v => !isNaN(Number(v)) && !v.includes('.'));
    const isFloatingPoint = sampleValues.every(v => !isNaN(Number(v)));
    const maxLength = Math.max(...sampleValues.map(v => v.length));

    // Integer analysis
    if (isNumeric) {
        const numbers = sampleValues.map(v => BigInt(v));
        const maxVal = numbers.reduce((max, n) => n > max ? n : max, numbers[0]);
        const minVal = numbers.reduce((min, n) => n < min ? n : min, numbers[0]);

        if (minVal >= 0 && maxVal <= 255) return { recommendation: 'TINYINT', reason: `All values fit within the range of an unsigned TINYINT (0 to 255).` };
        if (minVal >= -32768 && maxVal <= 32767) return { recommendation: 'SMALLINT', reason: `All values fit within the range of a SMALLINT.` };
        if (minVal >= -2147483648 && maxVal <= 2147483647) return { recommendation: 'INT', reason: `All values fit within the range of an INT.` };
        return { recommendation: 'BIGINT', reason: `Values require the large range of a BIGINT.` };
    }

    // Floating point analysis
    if (isFloatingPoint) {
         if (currentType === 'DOUBLE') return { recommendation: 'DOUBLE', reason: 'DOUBLE is appropriate for floating-point numbers requiring high precision.' };
         return { recommendation: 'FLOAT', reason: 'FLOAT is suitable for standard floating-point numbers.' };
    }

    // String analysis
    if (maxLength <= 50) return { recommendation: `VARCHAR(${maxLength})`, reason: `A VARCHAR with a length of ${maxLength} is sufficient for the sample data, saving space compared to larger allocations.` };
    if (maxLength <= 255) return { recommendation: `VARCHAR(255)`, reason: `A VARCHAR(255) can hold the data. This is a common and efficient length.` };
    if (maxLength > 255 && currentType.startsWith('VARCHAR')) return { recommendation: 'TEXT', reason: `The data length (${maxLength}) exceeds 255 characters, making TEXT a more suitable type for long-form strings.` };

    return { recommendation: currentType, reason: 'The current data type is appropriate for the given sample data.' };
};

export function ColumnTypeConverter() {
    const [currentType, setCurrentType] = useState<DataType>('VARCHAR');
    const [length, setLength] = useState<number | ''>(255);
    const [sampleData, setSampleData] = useState('Apple\nBanana\nCherry');
    
    const recommendation = useMemo(() => analyzeData(currentType, length, sampleData), [currentType, length, sampleData]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Data Type Recommender</CardTitle>
                <CardDescription>
                    Enter your current column details and sample data to get a recommendation for a more optimal data type.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                    <div className="space-y-2">
                        <Label htmlFor="current-type">Current Data Type</Label>
                        <Select value={currentType} onValueChange={(v) => setCurrentType(v as DataType)}>
                            <SelectTrigger id="current-type"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {Object.keys(dataTypeSizes).map(dt => <SelectItem key={dt} value={dt}>{dt}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="length">Length (for CHAR/VARCHAR)</Label>
                        <Input
                            id="length"
                            type="number"
                            value={length}
                            onChange={(e) => setLength(e.target.value === '' ? '' : parseInt(e.target.value))}
                            disabled={!currentType.includes('CHAR')}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="sample-data">Sample Data (one value per line)</Label>
                    <Textarea
                        id="sample-data"
                        value={sampleData}
                        onChange={(e) => setSampleData(e.target.value)}
                        className="font-mono h-40"
                        placeholder="Paste sample values here..."
                    />
                </div>
                
                 {recommendation && (
                    <Alert className="border-green-500/50">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertTitle className="text-green-700">Recommendation</AlertTitle>
                        <AlertDescription>
                            <p>
                                Based on your sample data, a more optimal type is: <strong className="font-mono">{recommendation.recommendation}</strong>.
                            </p>
                             <p className="text-xs text-muted-foreground mt-2">{recommendation.reason}</p>
                        </AlertDescription>
                    </Alert>
                 )}
            </CardContent>
        </Card>
    );
}
