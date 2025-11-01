
'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BarChart, Info, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export function CdnBandwidthEstimator() {
    const [inputs, setInputs] = useState({
        monthlyVisitors: 100000,
        pageViews: 5,
        avgPageSize: 1500, // in KB
        cacheHitRatio: 90, // in %
    });
    const [results, setResults] = useState<any>(null);

    const handleInputChange = (field: keyof typeof inputs, value: string) => {
        setInputs(prev => ({ ...prev, [field]: parseInt(value, 10) || 0 }));
    };
    
    const handleSliderChange = (value: number[]) => {
        setInputs(prev => ({ ...prev, cacheHitRatio: value[0] }));
    };

    const handleCalculate = () => {
        const totalPageViews = inputs.monthlyVisitors * inputs.pageViews;
        const totalBandwidthGB = (totalPageViews * inputs.avgPageSize) / (1024 * 1024);
        
        const cdnBandwidth = totalBandwidthGB * (inputs.cacheHitRatio / 100);
        const originBandwidth = totalBandwidthGB * (1 - (inputs.cacheHitRatio / 100));

        setResults({
            totalBandwidth: totalBandwidthGB,
            cdnBandwidth,
            originBandwidth,
            cacheHitRatio: inputs.cacheHitRatio,
        });
    };

    const formatSize = (gb: number) => {
        if (gb > 1024) {
            return `${(gb / 1024).toFixed(2)} TB`;
        }
        return `${gb.toFixed(2)} GB`;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>CDN Bandwidth Estimator</CardTitle>
                <CardDescription>
                    Estimate your monthly CDN and origin bandwidth usage based on your website's traffic.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="monthly-visitors">Monthly Visitors</Label>
                        <Input id="monthly-visitors" type="number" value={inputs.monthlyVisitors} onChange={e => handleInputChange('monthlyVisitors', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="page-views">Page Views per Visitor</Label>
                        <Input id="page-views" type="number" value={inputs.pageViews} onChange={e => handleInputChange('pageViews', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="page-size">Average Page Size (KB)</Label>
                        <Input id="page-size" type="number" value={inputs.avgPageSize} onChange={e => handleInputChange('avgPageSize', e.target.value)} />
                    </div>
                </div>

                <div className="space-y-4">
                    <div className='flex justify-between items-center'>
                        <Label htmlFor="cache-hit-ratio">Cache Hit Ratio</Label>
                        <span className='font-bold text-primary'>{inputs.cacheHitRatio}%</span>
                    </div>
                    <Slider
                        id="cache-hit-ratio"
                        min={0}
                        max={100}
                        step={1}
                        value={[inputs.cacheHitRatio]}
                        onValueChange={handleSliderChange}
                    />
                    <p className="text-sm text-muted-foreground">
                        The percentage of requests served directly from the CDN cache without contacting your origin server. Higher is better.
                    </p>
                </div>

                <Button onClick={handleCalculate} className="w-full sm:w-auto"><BarChart className="mr-2 h-4 w-4" /> Estimate Bandwidth</Button>
                
                {results && (
                    <div className="space-y-4 pt-4">
                        <Card className="bg-muted/50">
                            <CardHeader>
                                <CardTitle className="text-lg">Monthly Bandwidth Estimation</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="text-center">
                                    <Label>Total Data Transferred</Label>
                                    <p className="text-3xl font-bold">{formatSize(results.totalBandwidth)}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <div className="p-4 bg-background rounded-lg">
                                        <Label className="flex items-center justify-center gap-1 text-green-600"><TrendingUp/>CDN Bandwidth</Label>
                                        <p className="text-2xl font-semibold">{formatSize(results.cdnBandwidth)}</p>
                                        <p className="text-xs text-muted-foreground">({results.cacheHitRatio}% of total)</p>
                                    </div>
                                    <div className="p-4 bg-background rounded-lg">
                                        <Label className="flex items-center justify-center gap-1 text-red-600"><TrendingDown/>Origin Bandwidth</Label>
                                        <p className="text-2xl font-semibold">{formatSize(results.originBandwidth)}</p>
                                        <p className="text-xs text-muted-foreground">({100 - results.cacheHitRatio}% of total)</p>
                                    </div>
                                </div>
                                <Alert>
                                    <Info className="h-4 w-4"/>
                                    <AlertTitle>Why this matters</AlertTitle>
                                    <AlertDescription>
                                        Most hosting plans include limited origin bandwidth but CDNs often offer much cheaper bandwidth. A high cache hit ratio means lower costs and a faster site.
                                    </AlertDescription>
                                </Alert>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
