'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { HardDrive, Server, Shield, TrendingDown, TrendingUp } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type DiskType = 'hdd_7200' | 'hdd_10000' | 'hdd_15000' | 'ssd_enterprise' | 'custom';
type RaidLevel = '0' | '1' | '5' | '6' | '10';

const diskIops: Record<DiskType, number> = {
    hdd_7200: 80,
    hdd_10000: 120,
    hdd_15000: 180,
    ssd_enterprise: 10000,
    custom: 500,
};

const raidPenalties: Record<RaidLevel, number> = {
    '0': 1, // No penalty, but not redundant
    '1': 2,
    '5': 4,
    '6': 6,
    '10': 2,
};

export function IopsCalculator() {
    const [diskType, setDiskType] = useState<DiskType>('hdd_7200');
    const [customIops, setCustomIops] = useState(500);
    const [numDisks, setNumDisks] = useState(8);
    const [raidLevel, setRaidLevel] = useState<RaidLevel>('10');
    const [workload, setWorkload] = useState(70); // 70% read

    const results = useMemo(() => {
        const singleDiskIops = diskType === 'custom' ? customIops : diskIops[diskType];
        const totalRawIops = numDisks * singleDiskIops;
        
        const readPercent = workload / 100;
        const writePercent = 1 - readPercent;
        
        const writePenalty = raidPenalties[raidLevel];
        
        // This formula calculates the total usable IOPS based on the workload and RAID write penalty
        const totalUsableIops = Math.floor((totalRawIops * readPercent) + (totalRawIops * writePercent / writePenalty));
        
        const usableReadIops = Math.floor(totalUsableIops * readPercent);
        const usableWriteIops = Math.floor(totalUsableIops * writePercent);

        return {
            totalRawIops,
            totalUsableIops,
            usableReadIops,
            usableWriteIops,
            writePenalty
        };
    }, [diskType, customIops, numDisks, raidLevel, workload]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Storage Performance Calculator</CardTitle>
                <CardDescription>
                    Estimate the total IOPS of your storage array.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="disk-type">Disk Type</Label>
                        <Select value={diskType} onValueChange={v => setDiskType(v as DiskType)}>
                            <SelectTrigger id="disk-type"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="hdd_7200">HDD 7,200 RPM</SelectItem>
                                <SelectItem value="hdd_10000">HDD 10,000 RPM</SelectItem>
                                <SelectItem value="hdd_15000">HDD 15,000 RPM</SelectItem>
                                <SelectItem value="ssd_enterprise">Enterprise SSD</SelectItem>
                                <SelectItem value="custom">Custom IOPS</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {diskType === 'custom' && (
                        <div className="space-y-2">
                            <Label htmlFor="custom-iops">IOPS per Disk</Label>
                            <Input id="custom-iops" type="number" value={customIops} onChange={e => setCustomIops(parseInt(e.target.value) || 0)} />
                        </div>
                    )}
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <Label htmlFor="num-disks">Number of Disks</Label>
                        <Input id="num-disks" type="number" value={numDisks} onChange={e => setNumDisks(parseInt(e.target.value) || 0)} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="raid-level">RAID Level</Label>
                        <Select value={raidLevel} onValueChange={v => setRaidLevel(v as RaidLevel)}>
                            <SelectTrigger id="raid-level"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="0">RAID 0</SelectItem>
                                <SelectItem value="1">RAID 1</SelectItem>
                                <SelectItem value="5">RAID 5</SelectItem>
                                <SelectItem value="6">RAID 6</SelectItem>
                                <SelectItem value="10">RAID 10</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                 <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <Label htmlFor="workload-slider">Workload (Read/Write Ratio)</Label>
                        <span className="font-bold text-primary">{workload}% Read / {100-workload}% Write</span>
                    </div>
                    <Slider
                        id="workload-slider"
                        min={0} max={100} step={5}
                        value={[workload]}
                        onValueChange={v => setWorkload(v[0])}
                    />
                </div>

                <Card className="bg-muted/50">
                     <CardHeader>
                        <CardTitle className="text-lg">Estimated Performance</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="text-center">
                            <Label>Total Usable IOPS</Label>
                            <p className="text-4xl font-bold text-primary">{results.totalUsableIops.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">(Raw Array IOPS: {results.totalRawIops.toLocaleString()})</p>
                        </div>
                         <div className="grid grid-cols-2 gap-4 text-center">
                            <div className="p-4 bg-background rounded-lg">
                                <Label className="flex items-center justify-center gap-1 text-green-600"><TrendingUp/>Read IOPS</Label>
                                <p className="text-2xl font-semibold">{results.usableReadIops.toLocaleString()}</p>
                            </div>
                            <div className="p-4 bg-background rounded-lg">
                                <Label className="flex items-center justify-center gap-1 text-orange-500"><TrendingDown/>Write IOPS</Label>
                                <p className="text-2xl font-semibold">{results.usableWriteIops.toLocaleString()}</p>
                            </div>
                        </div>
                        <Alert variant="default" className="text-center">
                            <AlertDescription>
                                Based on a RAID {raidLevel} write penalty of <strong className="font-bold">{results.writePenalty}</strong>.
                            </AlertDescription>
                        </Alert>
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    );
}
