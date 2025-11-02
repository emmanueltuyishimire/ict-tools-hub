
'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { RotateCcw, AlertCircle, HardDrive, CalendarDays } from 'lucide-react';
import { formatDistanceStrict } from 'date-fns';

type TimeUnit = 'days' | 'weeks' | 'months';

export function LogRotationCalculator() {
    const [logSize, setLogSize] = useState<number | ''>(100);
    const [logUnit, setLogUnit] = useState('MB');
    const [frequency, setFrequency] = useState<number | ''>(1);
    const [frequencyUnit, setFrequencyUnit] = useState<TimeUnit>('days');
    const [keepCount, setKeepCount] = useState<number | ''>(14);

    const results = useMemo(() => {
        const size = Number(logSize);
        const count = Number(keepCount);
        const freq = Number(frequency);

        if (size <= 0 || count <= 0 || freq <= 0) {
            return null;
        }

        const sizeInMb = logUnit === 'GB' ? size * 1024 : size;
        const totalStorageMb = sizeInMb * count;

        let totalDays = 0;
        switch (frequencyUnit) {
            case 'days':
                totalDays = freq * count;
                break;
            case 'weeks':
                totalDays = freq * 7 * count;
                break;
            case 'months':
                totalDays = freq * 30.44 * count; // Average month
                break;
        }
        
        const retentionPeriod = formatDistanceStrict(new Date(), new Date(Date.now() + totalDays * 24 * 60 * 60 * 1000));
        
        const formatMb = (mb: number) => {
            if (mb < 1024) return `${mb.toFixed(2)} MB`;
            if (mb < 1024 * 1024) return `${(mb / 1024).toFixed(2)} GB`;
            return `${(mb / (1024 * 1024)).toFixed(2)} TB`;
        }

        return {
            totalStorage: formatMb(totalStorageMb),
            retentionPeriod,
        };
    }, [logSize, logUnit, frequency, frequencyUnit, keepCount]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Log Rotation Calculator</CardTitle>
                <CardDescription>
                    Estimate total storage usage and maximum log age based on your rotation policy.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="log-size">Average Size per Log File</Label>
                        <div className="flex gap-2">
                            <Input
                                id="log-size"
                                type="number"
                                value={logSize}
                                onChange={e => setLogSize(e.target.value === '' ? '' : parseFloat(e.target.value))}
                            />
                            <Select value={logUnit} onValueChange={setLogUnit}>
                                <SelectTrigger className="w-[100px]"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="MB">MB</SelectItem>
                                    <SelectItem value="GB">GB</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="keep-count">Number of Rotated Logs to Keep</Label>
                        <Input
                            id="keep-count"
                            type="number"
                            value={keepCount}
                            onChange={e => setKeepCount(e.target.value === '' ? '' : parseInt(e.target.value))}
                        />
                    </div>
                </div>

                 <div className="space-y-2">
                    <Label htmlFor="frequency">Rotation Frequency</Label>
                     <div className="flex items-center gap-2">
                        <span className='text-sm text-muted-foreground'>Every</span>
                        <Input
                            id="frequency"
                            type="number"
                            value={frequency}
                             onChange={e => setFrequency(e.target.value === '' ? '' : parseInt(e.target.value))}
                             className="w-24"
                        />
                        <Select value={frequencyUnit} onValueChange={(v) => setFrequencyUnit(v as TimeUnit)}>
                            <SelectTrigger className="w-[120px]"><SelectValue/></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="days">Day(s)</SelectItem>
                                <SelectItem value="weeks">Week(s)</SelectItem>
                                <SelectItem value="months">Month(s)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {results && (
                    <div className="space-y-4 pt-4">
                        <Card className="bg-muted/50">
                            <CardHeader>
                                <CardTitle className="text-lg">Rotation Policy Summary</CardTitle>
                            </CardHeader>
                             <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                                <div className="p-4 bg-background rounded-lg">
                                    <Label className="flex items-center justify-center gap-1"><HardDrive className="h-4 w-4"/> Total Storage Needed</Label>
                                    <p className="text-2xl font-semibold text-primary">{results.totalStorage}</p>
                                </div>
                                <div className="p-4 bg-background rounded-lg">
                                    <Label className="flex items-center justify-center gap-1"><CalendarDays className="h-4 w-4"/> Max Log Age</Label>
                                    <p className="text-2xl font-semibold text-primary">{results.retentionPeriod}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
