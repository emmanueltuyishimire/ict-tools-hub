'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { AlertCircle, Timer } from 'lucide-react';

// --- Conversion Constants ---
const bitsIn = {
    'b': 1,
    'kb': 1000,
    'Mb': 1000**2,
    'Gb': 1000**3,
    'Tb': 1000**4,
    'Kib': 1024,
    'Mib': 1024**2,
    'Gib': 1024**3,
    'Tib': 1024**4,
};
const bytesIn = {
    'B': 1,
    'KB': 1000,
    'MB': 1000**2,
    'GB': 1000**3,
    'TB': 1000**4,
    'KiB': 1024,
    'MiB': 1024**2,
    'GiB': 1024**3,
    'TiB': 1024**4,
};

export function DataTransferTimeCalculator() {
    const [fileSize, setFileSize] = useState<number | ''>(100);
    const [fileUnit, setFileUnit] = useState('GB');
    const [speed, setSpeed] = useState<number | ''>(500);
    const [speedUnit, setSpeedUnit] = useState('Mb');
    const [results, setResults] = useState<any>(null);
    const [error, setError] = useState('');
    const resultRef = useRef<HTMLDivElement>(null);

    const handleCalculate = () => {
        setError('');
        if (fileSize === '' || speed === '' || fileSize <= 0 || speed <= 0) {
            setError('Please enter valid, positive numbers for file size and speed.');
            setResults(null);
            return;
        }

        const sizeInBytes = Number(fileSize) * (bytesIn as any)[fileUnit];
        const sizeInBits = sizeInBytes * 8;
        const speedInBps = Number(speed) * (bitsIn as any)[speedUnit];
        
        if (speedInBps === 0) {
            setError('Transfer speed cannot be zero.');
            setResults(null);
            return;
        }

        const totalSeconds = sizeInBits / speedInBps;

        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = parseFloat((totalSeconds % 60).toFixed(2));

        setResults({
            days, hours, minutes, seconds,
            totalSeconds,
            totalMinutes: totalSeconds / 60,
            totalHours: totalSeconds / 3600,
        });
    };

    useEffect(() => {
        if (results && resultRef.current) {
            resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [results]);
    
    const formatTime = (time: number) => time.toLocaleString(undefined, { maximumFractionDigits: 2 });


    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <Card>
                <CardHeader>
                    <CardTitle>Data Transfer Time Calculator</CardTitle>
                    <CardDescription>
                        Estimate the time it will take to download or upload a file based on its size and your connection speed.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                             <Label htmlFor="file-size">File Size</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="file-size"
                                    type="number"
                                    value={fileSize}
                                    onChange={(e) => setFileSize(e.target.value === '' ? '' : parseFloat(e.target.value))}
                                    placeholder="e.g., 100"
                                />
                                 <Select value={fileUnit} onValueChange={setFileUnit}>
                                    <SelectTrigger className="w-[120px]"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        {Object.keys(bytesIn).map(u => <SelectItem key={u} value={u}>{u}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="space-y-2">
                             <Label htmlFor="transfer-speed">Transfer Speed</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="transfer-speed"
                                    type="number"
                                    value={speed}
                                    onChange={(e) => setSpeed(e.target.value === '' ? '' : parseFloat(e.target.value))}
                                    placeholder="e.g., 500"
                                />
                                 <Select value={speedUnit} onValueChange={setSpeedUnit}>
                                    <SelectTrigger className="w-[120px]"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                       {Object.keys(bitsIn).map(u => <SelectItem key={u} value={u}>{u}ps</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                     <Button onClick={handleCalculate} className="w-full sm:w-auto"><Timer className="mr-2 h-4 w-4" /> Calculate Transfer Time</Button>
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
                <div ref={resultRef} tabIndex={-1} aria-live="polite">
                    <Card>
                        <CardHeader>
                            <CardTitle>Estimated Transfer Time</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <div className="text-center bg-muted p-6 rounded-lg">
                                <p className="text-lg text-muted-foreground">Total Time</p>
                                <div className="text-4xl font-bold text-primary">
                                    {results.days > 0 && `${results.days}d `}
                                    {results.hours > 0 && `${results.hours}h `}
                                    {results.minutes > 0 && `${results.minutes}m `}
                                    {`${results.seconds}s`}
                                </div>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2 text-center">Time Breakdown</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                                    <div className="bg-background p-3 rounded-md">
                                        <p className="text-sm text-muted-foreground">In Hours</p>
                                        <p className="text-xl font-semibold">{formatTime(results.totalHours)}</p>
                                    </div>
                                    <div className="bg-background p-3 rounded-md">
                                        <p className="text-sm text-muted-foreground">In Minutes</p>
                                        <p className="text-xl font-semibold">{formatTime(results.totalMinutes)}</p>
                                    </div>
                                     <div className="bg-background p-3 rounded-md">
                                        <p className="text-sm text-muted-foreground">In Seconds</p>
                                        <p className="text-xl font-semibold">{formatTime(results.totalSeconds)}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
