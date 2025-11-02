
'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CalendarClock, AlertCircle } from 'lucide-react';
import { add, format } from 'date-fns';

export function DataRetentionCalculator() {
    const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
    const [retentionValue, setRetentionValue] = useState(7);
    const [retentionUnit, setRetentionUnit] = useState<'days' | 'weeks' | 'months' | 'years'>('years');
    const [error, setError] = useState('');

    const endDate = useMemo(() => {
        try {
            setError('');
            if (!startDate || isNaN(retentionValue)) return null;

            const start = new Date(startDate);
            if (isNaN(start.getTime())) {
                 setError('Invalid start date format.');
                 return null;
            }
            
            // Adjust for timezone offset to prevent date shifting
            const timezoneOffset = start.getTimezoneOffset() * 60000;
            const correctedStart = new Date(start.getTime() + timezoneOffset);

            const duration = { [retentionUnit]: retentionValue };
            const end = add(correctedStart, duration);
            
            return {
                endDate: format(end, 'PPPP'),
                deletionDate: format(add(end, { days: 1 }), 'PPPP')
            };

        } catch (e) {
            setError('Could not calculate the end date. Please check your inputs.');
            return null;
        }
    }, [startDate, retentionValue, retentionUnit]);

    const handlePresetClick = (value: number, unit: typeof retentionUnit) => {
        setRetentionValue(value);
        setRetentionUnit(unit);
    };

    const presets = [
        { label: '30 Days', value: 30, unit: 'days' },
        { label: '90 Days', value: 90, unit: 'days' },
        { label: '6 Months', value: 6, unit: 'months' },
        { label: '1 Year', value: 1, unit: 'years' },
        { label: '7 Years', value: 7, unit: 'years' },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Retention Calculator</CardTitle>
                <CardDescription>Calculate the end of a data retention period.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     <div className="space-y-2 md:col-span-1">
                        <Label htmlFor="start-date">Start Date</Label>
                        <Input
                            id="start-date"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="retention-value">Retention Period</Label>
                        <Input
                            id="retention-value"
                            type="number"
                            value={retentionValue}
                            onChange={(e) => setRetentionValue(parseInt(e.target.value) || 0)}
                        />
                    </div>
                     <div className="space-y-2 self-end">
                         <Select value={retentionUnit} onValueChange={(v) => setRetentionUnit(v as any)}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="days">Days</SelectItem>
                                <SelectItem value="weeks">Weeks</SelectItem>
                                <SelectItem value="months">Months</SelectItem>
                                <SelectItem value="years">Years</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                 <div className="space-y-2">
                    <Label>Common Retention Policies</Label>
                    <div className="flex flex-wrap gap-2">
                         {presets.map(p => (
                            <Button key={p.label} variant="outline" size="sm" onClick={() => handlePresetClick(p.value, p.unit as any)}>{p.label}</Button>
                        ))}
                    </div>
                </div>
                
                {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {endDate && !error && (
                    <div className="space-y-4 pt-4">
                        <h3 className="font-semibold text-lg">Result</h3>
                        <Card className="bg-muted/50 p-6 text-center">
                            <CalendarClock className="mx-auto h-10 w-10 text-primary mb-2" />
                             <p className="text-sm text-muted-foreground">End of Retention / Deletion Date</p>
                            <p className="text-2xl font-bold font-mono">
                                {endDate.endDate}
                            </p>
                             <p className="text-xs text-muted-foreground mt-1">
                                (Data can be deleted on or after {endDate.deletionDate})
                            </p>
                        </Card>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
