
'use client';

import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { HardDrive, BarChart, Server, Shield, TrendingUp, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

type RaidLevel = '0' | '1' | '5' | '6' | '10';

const raidInfo = {
    '0': { minDisks: 2, faultTolerance: 0, name: "RAID 0 (Striping)" },
    '1': { minDisks: 2, faultTolerance: (n: number) => n - 1, name: "RAID 1 (Mirroring)" },
    '5': { minDisks: 3, faultTolerance: 1, name: "RAID 5 (Striping with Parity)" },
    '6': { minDisks: 4, faultTolerance: 2, name: "RAID 6 (Striping with Dual Parity)" },
    '10': { minDisks: 4, faultTolerance: (n: number) => n / 2, name: "RAID 10 (Stripe of Mirrors)" },
};

export function RaidCalculator() {
    const [raidLevel, setRaidLevel] = useState<RaidLevel>('5');
    const [numDisks, setNumDisks] = useState(4);
    const [diskSize, setDiskSize] = useState(1024);
    const [unit, setUnit] = useState('GB');
    const [error, setError] = useState('');

    const currentRaidInfo = raidInfo[raidLevel];

    useEffect(() => {
        if (numDisks < currentRaidInfo.minDisks) {
            setNumDisks(currentRaidInfo.minDisks);
        }
        if (raidLevel === '10' && numDisks % 2 !== 0) {
            setNumDisks(Math.max(currentRaidInfo.minDisks, Math.floor(numDisks / 2) * 2));
        }
    }, [raidLevel, numDisks, currentRaidInfo.minDisks]);

    const results = useMemo(() => {
        if (numDisks < currentRaidInfo.minDisks) {
            setError(`RAID ${raidLevel} requires at least ${currentRaidInfo.minDisks} disks.`);
            return null;
        }
        if (raidLevel === '10' && numDisks % 2 !== 0) {
            setError('RAID 10 requires an even number of disks.');
            return null;
        }
        setError('');

        const rawCapacity = numDisks * diskSize;
        let usableCapacity = 0;
        
        switch(raidLevel) {
            case '0':
                usableCapacity = rawCapacity;
                break;
            case '1':
                usableCapacity = diskSize;
                break;
            case '5':
                usableCapacity = (numDisks - 1) * diskSize;
                break;
            case '6':
                usableCapacity = (numDisks - 2) * diskSize;
                break;
            case '10':
                usableCapacity = (numDisks / 2) * diskSize;
                break;
        }

        const efficiency = rawCapacity > 0 ? (usableCapacity / rawCapacity) * 100 : 0;
        const faultTolerance = typeof currentRaidInfo.faultTolerance === 'function' 
            ? currentRaidInfo.faultTolerance(numDisks)
            : currentRaidInfo.faultTolerance;

        const formatSize = (size: number) => {
            if (unit === 'GB' && size >= 1024) return `${(size / 1024).toFixed(2)} TB`;
            if (unit === 'TB' && size >= 1024) return `${(size / 1024).toFixed(2)} PB`;
            return `${size.toFixed(0)} ${unit}`;
        }

        return {
            rawCapacity: formatSize(rawCapacity),
            usableCapacity: formatSize(usableCapacity),
            efficiency,
            faultTolerance
        };

    }, [raidLevel, numDisks, diskSize, unit, currentRaidInfo]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>RAID Calculator</CardTitle>
                <CardDescription>
                    Select a RAID level, the number of disks, and their size to see the resulting capacity and fault tolerance.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="raid-level">RAID Level</Label>
                        <Select value={raidLevel} onValueChange={(v) => setRaidLevel(v as RaidLevel)}>
                            <SelectTrigger id="raid-level"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {Object.entries(raidInfo).map(([key, info]) => (
                                    <SelectItem key={key} value={key}>{info.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <Label htmlFor="num-disks">Number of Disks</Label>
                        <span className="font-bold text-primary text-lg">{numDisks}</span>
                    </div>
                    <Slider
                        id="num-disks"
                        min={currentRaidInfo.minDisks}
                        max={24}
                        step={raidLevel === '10' ? 2 : 1}
                        value={[numDisks]}
                        onValueChange={(v) => setNumDisks(v[0])}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="disk-size">Size per Disk</Label>
                        <Input id="disk-size" type="number" value={diskSize} onChange={e => setDiskSize(parseInt(e.target.value) || 0)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="unit">Unit</Label>
                        <Select value={unit} onValueChange={setUnit}>
                             <SelectTrigger id="unit"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="GB">GB</SelectItem>
                                <SelectItem value="TB">TB</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Configuration Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                
                {results && !error && (
                    <Card className="bg-muted/50">
                        <CardHeader>
                            <CardTitle className="text-lg">Array Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                                <div className="p-4 bg-background rounded-lg">
                                    <Label className="flex items-center justify-center gap-1"><Server className="h-4 w-4" /> Raw Capacity</Label>
                                    <p className="text-2xl font-semibold">{results.rawCapacity}</p>
                                </div>
                                <div className="p-4 bg-background rounded-lg border-2 border-primary/50">
                                    <Label className="flex items-center justify-center gap-1 text-primary"><HardDrive className="h-4 w-4"/> Usable Capacity</Label>
                                    <p className="text-2xl font-bold text-primary">{results.usableCapacity}</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <Label className="text-sm">Storage Efficiency</Label>
                                        <span className="text-sm font-bold">{results.efficiency.toFixed(0)}%</span>
                                    </div>
                                    <Progress value={results.efficiency} className="h-3" />
                                </div>
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <Label className="text-sm">Fault Tolerance</Label>
                                        <span className="text-sm font-bold">{results.faultTolerance} disk(s)</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground">The number of drives that can fail before the array loses data.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </CardContent>
        </Card>
    );
}
