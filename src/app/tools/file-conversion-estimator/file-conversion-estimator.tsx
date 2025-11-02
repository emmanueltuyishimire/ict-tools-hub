
'use client';

import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ArrowDown, Info } from 'lucide-react';

type ConversionType = 'image' | 'document' | 'audio';
type Format = 'PNG' | 'JPG' | 'WebP' | 'DOCX' | 'PDF' | 'WAV' | 'MP3';

const conversionRatios: Record<string, number> = {
    'PNG-JPG': 0.15, // PNG to JPG (lossy)
    'PNG-WebP': 0.12, // PNG to WebP (lossy)
    'JPG-PNG': 4.0, // JPG to PNG (lossless, increases size)
    'JPG-WebP': 0.75, // JPG to WebP (better lossy)
    'DOCX-PDF': 0.85, // DOCX to PDF
    'PDF-DOCX': 1.15, // PDF to DOCX (can increase size)
    'WAV-MP3': 0.1, // WAV to MP3 (heavy lossy compression)
    'MP3-WAV': 10.0, // MP3 to WAV (uncompressing to lossless)
};

const conversionOptions: Record<ConversionType, { from: Format[], to: Format[] }> = {
    image: { from: ['PNG', 'JPG'], to: ['PNG', 'JPG', 'WebP'] },
    document: { from: ['DOCX', 'PDF'], to: ['DOCX', 'PDF'] },
    audio: { from: ['WAV', 'MP3'], to: ['WAV', 'MP3'] },
};

export function FileConversionEstimator() {
    const [originalSize, setOriginalSize] = useState(1024);
    const [unit, setUnit] = useState('KB');
    const [conversionType, setConversionType] = useState<ConversionType>('image');
    const [fromFormat, setFromFormat] = useState<Format>('PNG');
    const [toFormat, setToFormat] = useState<Format>('JPG');
    const [results, setResults] = useState<any>(null);

    const handleCalculate = () => {
        if (fromFormat === toFormat) {
            setResults({
                newSize: originalSize,
                changePercent: 0,
                info: 'No change. The "From" and "To" formats are the same.'
            });
            return;
        }

        const key = `${fromFormat}-${toFormat}`;
        const ratio = conversionRatios[key];
        
        if (ratio === undefined) {
             setResults({
                newSize: originalSize,
                changePercent: 0,
                info: 'This specific conversion path is not typical or is not supported by this estimator. Size is assumed to be similar.'
            });
            return;
        }

        const newSize = originalSize * ratio;
        const changePercent = (newSize - originalSize) / originalSize * 100;
        
        let info = '';
        if (changePercent < -10) info = 'Significant size reduction due to lossy compression.';
        else if (changePercent > 10) info = 'Size increase due to converting from a compressed lossy format to a lossless one.';
        else if (changePercent < 0) info = 'Minor size reduction due to more efficient compression.';
        else if (changePercent > 0) info = 'Minor size increase, possibly due to format overhead.';


        setResults({ newSize, changePercent, info });
    };
    
    // Reset formats when conversion type changes
    useEffect(() => {
        const options = conversionOptions[conversionType];
        setFromFormat(options.from[0]);
        setToFormat(options.to.find(f => f !== options.from[0]) || options.to[0]);
        setResults(null);
    }, [conversionType]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>File Conversion Estimator</CardTitle>
                <CardDescription>Estimate how a file's size will change when converted to another format.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="original-size">Original File Size</Label>
                        <div className="flex gap-2">
                             <Input
                                id="original-size"
                                type="number"
                                value={originalSize}
                                onChange={e => setOriginalSize(parseFloat(e.target.value) || 0)}
                            />
                             <Select value={unit} onValueChange={setUnit}>
                                <SelectTrigger className="w-[100px]"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="KB">KB</SelectItem>
                                    <SelectItem value="MB">MB</SelectItem>
                                    <SelectItem value="GB">GB</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="conversion-type">Conversion Type</Label>
                         <Select value={conversionType} onValueChange={(v) => setConversionType(v as ConversionType)}>
                            <SelectTrigger id="conversion-type"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="image">Image</SelectItem>
                                <SelectItem value="document">Document</SelectItem>
                                <SelectItem value="audio">Audio</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <Label htmlFor="from-format">From</Label>
                         <Select value={fromFormat} onValueChange={(v) => setFromFormat(v as Format)}>
                            <SelectTrigger id="from-format"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {conversionOptions[conversionType].from.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="to-format">To</Label>
                         <Select value={toFormat} onValueChange={(v) => setToFormat(v as Format)}>
                            <SelectTrigger id="to-format"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {conversionOptions[conversionType].to.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <Button onClick={handleCalculate} className="w-full sm:w-auto">Estimate New Size</Button>
                
                 {results && (
                    <div className="space-y-4 pt-4">
                         <Alert>
                            <Info className="h-4 w-4" />
                            <AlertTitle>This is an Estimate</AlertTitle>
                            <AlertDescription>
                                Actual file sizes can vary greatly based on content and compression quality settings. This tool provides a common-case estimate.
                            </AlertDescription>
                        </Alert>
                        <Card className="bg-muted/50 p-6 text-center">
                            <Label>Estimated New Size</Label>
                            <p className="text-4xl font-bold text-primary">
                                {results.newSize.toFixed(2)} {unit}
                            </p>
                            <p className={`text-lg font-semibold ${results.changePercent < 0 ? 'text-green-600' : 'text-red-500'}`}>
                                ({results.changePercent >= 0 ? '+' : ''}{results.changePercent.toFixed(0)}%)
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">{results.info}</p>
                        </Card>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
