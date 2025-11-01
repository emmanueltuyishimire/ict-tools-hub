
'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { AlertCircle, Timer, BarChart, FileText, FileCode, Image, Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

export function WebpageLoadTimeEstimator() {
    const [pageDetails, setPageDetails] = useState({
        htmlSize: 50,
        cssSize: 150,
        jsSize: 500,
        imageSize: 1024,
        resourceCount: 50,
    });

    const [networkConditions, setNetworkConditions] = useState({
        bandwidth: 50, // Mbps
        latency: 40,   // ms
    });

    const [results, setResults] = useState<any>(null);
    const [error, setError] = useState('');
    const resultRef = useRef<HTMLDivElement>(null);

    const handleDetailChange = (field: keyof typeof pageDetails, value: string) => {
        setPageDetails(prev => ({ ...prev, [field]: parseInt(value) || 0 }));
    };

    const handleConditionChange = (field: keyof typeof networkConditions, value: string) => {
        setNetworkConditions(prev => ({ ...prev, [field]: parseInt(value) || 0 }));
    };

    const handleCalculate = () => {
        setError('');
        if (networkConditions.bandwidth <= 0) {
            setError('Bandwidth must be greater than zero.');
            setResults(null);
            return;
        }

        const totalSizeKB = pageDetails.htmlSize + pageDetails.cssSize + pageDetails.jsSize + pageDetails.imageSize;
        const totalSizeBits = totalSizeKB * 1024 * 8;
        const speedBps = networkConditions.bandwidth * 1000 * 1000;
        
        const downloadTimeSeconds = totalSizeBits / speedBps;
        const latencyTimeSeconds = (pageDetails.resourceCount * networkConditions.latency) / 1000;

        const totalLoadTime = downloadTimeSeconds + latencyTimeSeconds;
        
        setResults({
            totalSize: totalSizeKB,
            downloadTime: downloadTimeSeconds * 1000, // in ms
            latencyTime: latencyTimeSeconds * 1000, // in ms
            totalLoadTime: totalLoadTime * 1000, // in ms
        });
    };
    
    useEffect(() => {
        if (results && resultRef.current) {
            resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [results]);

    const getLoadTimeColor = (time: number) => {
        if (time < 2000) return 'bg-green-500';
        if (time < 4000) return 'bg-yellow-500';
        return 'bg-red-500';
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Load Time Estimator</CardTitle>
                    <CardDescription>
                        Enter your page details and network conditions to get a theoretical load time estimate.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <fieldset className="space-y-4 border p-4 rounded-lg">
                        <legend className="-ml-1 px-1 text-sm font-medium">Page Components</legend>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="html-size">HTML Size (KB)</Label>
                                <Input id="html-size" type="number" value={pageDetails.htmlSize} onChange={e => handleDetailChange('htmlSize', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="css-size">Total CSS Size (KB)</Label>
                                <Input id="css-size" type="number" value={pageDetails.cssSize} onChange={e => handleDetailChange('cssSize', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="js-size">Total JS Size (KB)</Label>
                                <Input id="js-size" type="number" value={pageDetails.jsSize} onChange={e => handleDetailChange('jsSize', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="image-size">Total Image Size (KB)</Label>
                                <Input id="image-size" type="number" value={pageDetails.imageSize} onChange={e => handleDetailChange('imageSize', e.target.value)} />
                            </div>
                        </div>
                    </fieldset>

                     <fieldset className="space-y-4 border p-4 rounded-lg">
                        <legend className="-ml-1 px-1 text-sm font-medium">Network & Resource Conditions</legend>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                             <div className="space-y-2">
                                <Label htmlFor="bandwidth">Bandwidth (Mbps)</Label>
                                <Input id="bandwidth" type="number" value={networkConditions.bandwidth} onChange={e => handleConditionChange('bandwidth', e.target.value)} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="latency">Latency (ms)</Label>
                                <Input id="latency" type="number" value={networkConditions.latency} onChange={e => handleConditionChange('latency', e.target.value)} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="resource-count">Total Requests</Label>
                                <Input id="resource-count" type="number" value={pageDetails.resourceCount} onChange={e => handleDetailChange('resourceCount', e.target.value)} />
                            </div>
                        </div>
                    </fieldset>

                    <Button onClick={handleCalculate} className="w-full sm:w-auto"><Timer className="mr-2 h-4 w-4" /> Estimate Load Time</Button>

                    {error && (
                        <Alert variant="destructive" role="alert">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Input Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                </CardContent>
            </Card>

            {results && (
                <div ref={resultRef}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Load Time Estimation</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <div className="text-center bg-muted p-6 rounded-lg">
                                <p className="text-lg text-muted-foreground">Estimated Total Load Time</p>
                                <div className={cn("text-4xl font-bold", getLoadTimeColor(results.totalLoadTime).replace('bg-','text-'))}>
                                    {(results.totalLoadTime / 1000).toFixed(2)}s
                                </div>
                            </div>
                            <div className="w-full space-y-4">
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <Label className="text-sm">Download Time ({results.totalSize} KB)</Label>
                                        <span className="text-sm font-mono">{results.downloadTime.toFixed(0)} ms</span>
                                    </div>
                                    <Progress value={(results.downloadTime / results.totalLoadTime) * 100} className="h-3" />
                                </div>
                                 <div>
                                    <div className="flex justify-between mb-1">
                                        <Label className="text-sm">Latency Impact ({pageDetails.resourceCount} requests)</Label>
                                        <span className="text-sm font-mono">{results.latencyTime.toFixed(0)} ms</span>
                                    </div>
                                    <Progress value={(results.latencyTime / results.totalLoadTime) * 100} className="h-3" />
                                </div>
                            </div>
                             <Alert variant="default" className="border-blue-500/50">
                                <AlertCircle className="h-4 w-4 text-blue-600"/>
                                <AlertTitle className="text-blue-700">Theoretical Estimate</AlertTitle>
                                <AlertDescription>
                                    This is a simplified calculation. Real-world performance is also affected by server response time (TTFB), browser rendering, and JavaScript execution.
                                </AlertDescription>
                            </Alert>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
