'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingDown, Gauge } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const GZIP_RATIO = 0.25; // ~75% savings
const BROTLI_RATIO = 0.20; // ~80% savings

export function CompressionEstimator() {
    const [originalSize, setOriginalSize] = useState<number | ''>(1024);
    const [unit, setUnit] = useState('KB');

    const results = useMemo(() => {
        if (originalSize === '' || originalSize <= 0) return null;

        let sizeInKb;
        switch (unit) {
            case 'TB':
                sizeInKb = originalSize * 1024 * 1024 * 1024;
                break;
            case 'GB':
                sizeInKb = originalSize * 1024 * 1024;
                break;
            case 'MB':
                sizeInKb = originalSize * 1024;
                break;
            case 'KB':
            default:
                sizeInKb = originalSize;
                break;
        }
        
        const gzipSize = sizeInKb * GZIP_RATIO;
        const brotliSize = sizeInKb * BROTLI_RATIO;

        const formatSize = (kb: number) => {
            if (kb < 1024) return `${kb.toFixed(2)} KB`;
            if (kb < 1024 * 1024) return `${(kb / 1024).toFixed(2)} MB`;
            if (kb < 1024 * 1024 * 1024) return `${(kb / (1024 * 1024)).toFixed(2)} GB`;
            return `${(kb / (1024 * 1024 * 1024)).toFixed(2)} TB`;
        }

        return {
            original: sizeInKb,
            gzip: {
                size: formatSize(gzipSize),
                savings: ((sizeInKb - gzipSize) / sizeInKb) * 100,
            },
            brotli: {
                size: formatSize(brotliSize),
                savings: ((sizeInKb - brotliSize) / sizeInKb) * 100,
            }
        };
    }, [originalSize, unit]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Compression Savings Estimator</CardTitle>
                <CardDescription>
                    Estimate the potential file size reduction from using Gzip or Brotli compression.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <div className="flex-grow space-y-2">
                        <Label htmlFor="original-size">Original File Size</Label>
                        <Input
                            id="original-size"
                            type="number"
                            value={originalSize}
                            onChange={(e) => setOriginalSize(e.target.value === '' ? '' : parseFloat(e.target.value))}
                            placeholder="e.g., 1024"
                        />
                    </div>
                     <Select value={unit} onValueChange={setUnit}>
                        <SelectTrigger className="w-full sm:w-[100px]"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="KB">KB</SelectItem>
                            <SelectItem value="MB">MB</SelectItem>
                            <SelectItem value="GB">GB</SelectItem>
                            <SelectItem value="TB">TB</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                
                {results && (
                    <div className="space-y-4 pt-4">
                        <Alert>
                           <Gauge className="h-4 w-4"/>
                           <AlertTitle>Based on Averages</AlertTitle>
                           <AlertDescription>
                                These estimates are based on typical compression ratios for text-based files (HTML, CSS, JS). Actual savings will vary based on content. Pre-compressed files like JPGs or ZIPs will see little to no benefit.
                           </AlertDescription>
                        </Alert>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card className="p-4">
                                <CardHeader className="p-2 pt-0">
                                    <CardTitle className="text-lg">Gzip Compression</CardTitle>
                                </CardHeader>
                                <CardContent className="p-2 text-center">
                                    <p className="text-3xl font-bold text-primary">{results.gzip.size}</p>
                                    <p className="text-sm font-semibold text-green-600 flex items-center justify-center gap-1">
                                        <TrendingDown />
                                        {results.gzip.savings.toFixed(0)}% Savings
                                    </p>
                                </CardContent>
                            </Card>
                             <Card className="p-4">
                                <CardHeader className="p-2 pt-0">
                                    <CardTitle className="text-lg">Brotli Compression</CardTitle>
                                </CardHeader>
                                <CardContent className="p-2 text-center">
                                    <p className="text-3xl font-bold text-primary">{results.brotli.size}</p>
                                     <p className="text-sm font-semibold text-green-600 flex items-center justify-center gap-1">
                                        <TrendingDown />
                                        {results.brotli.savings.toFixed(0)}% Savings
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
