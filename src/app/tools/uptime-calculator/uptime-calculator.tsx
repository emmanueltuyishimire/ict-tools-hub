
'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';

const secondsIn = {
    day: 86400,
    week: 604800,
    month: 2629800, // Avg 30.44 days
    year: 31557600, // Avg 365.25 days
};

const formatDowntime = (totalSeconds: number) => {
    if (totalSeconds < 0) return '0s';
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    let result = '';
    if (days > 0) result += `${days}d `;
    if (hours > 0) result += `${hours}h `;
    if (minutes > 0) result += `${minutes}m `;
    if (seconds > 0 || result === '') result += `${seconds}s`;
    
    return result.trim();
};

export function UptimeCalculator() {
    const [mode, setMode] = useState<'fromDowntime' | 'fromSLA'>('fromDowntime');
    
    // State for Uptime from Downtime
    const [downtimeDays, setDowntimeDays] = useState(0);
    const [downtimeHours, setDowntimeHours] = useState(0);
    const [downtimeMinutes, setDowntimeMinutes] = useState(5);
    const [downtimeSeconds, setDowntimeSeconds] = useState(0);
    const [period, setPeriod] = useState('month');
    
    // State for Downtime from SLA
    const [slaPercentage, setSlaPercentage] = useState('99.9');

    const uptimeResult = useMemo(() => {
        const totalDowntimeSeconds = 
            (downtimeDays * secondsIn.day) +
            (downtimeHours * 3600) +
            (downtimeMinutes * 60) +
            downtimeSeconds;
        
        const totalPeriodSeconds = (secondsIn as any)[period];

        if(totalDowntimeSeconds > totalPeriodSeconds) return { uptime: 0, downtime: 100 };
        
        const uptime = ((totalPeriodSeconds - totalDowntimeSeconds) / totalPeriodSeconds) * 100;
        const downtime = (totalDowntimeSeconds / totalPeriodSeconds) * 100;

        return {
            uptime: parseFloat(uptime.toFixed(6)),
            downtime: parseFloat(downtime.toFixed(6)),
        };
    }, [downtimeDays, downtimeHours, downtimeMinutes, downtimeSeconds, period]);

    const downtimeResult = useMemo(() => {
        const sla = parseFloat(slaPercentage);
        if (isNaN(sla) || sla < 0 || sla > 100) {
            return null;
        }

        const downtimePercentage = 100 - sla;
        return {
            daily: formatDowntime(secondsIn.day * (downtimePercentage / 100)),
            weekly: formatDowntime(secondsIn.week * (downtimePercentage / 100)),
            monthly: formatDowntime(secondsIn.month * (downtimePercentage / 100)),
            yearly: formatDowntime(secondsIn.year * (downtimePercentage / 100)),
        }
    }, [slaPercentage]);

    const getUptimeColor = (uptime: number) => {
        if (uptime >= 99.99) return 'text-green-600';
        if (uptime >= 99.9) return 'text-yellow-600';
        return 'text-red-600';
    }


    return (
        <Card>
            <CardHeader>
                <CardTitle>Uptime & SLA Calculator</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs value={mode} onValueChange={(v) => setMode(v as any)} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="fromDowntime">Uptime from Downtime</TabsTrigger>
                        <TabsTrigger value="fromSLA">Downtime from SLA</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="fromDowntime" className="space-y-6 pt-6">
                        <CardDescription>Enter the amount of time a service was down to calculate the uptime percentage.</CardDescription>
                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="d-days">Days</Label>
                                <Input id="d-days" type="number" value={downtimeDays} onChange={e => setDowntimeDays(parseInt(e.target.value) || 0)} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="d-hours">Hours</Label>
                                <Input id="d-hours" type="number" value={downtimeHours} onChange={e => setDowntimeHours(parseInt(e.target.value) || 0)} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="d-minutes">Minutes</Label>
                                <Input id="d-minutes" type="number" value={downtimeMinutes} onChange={e => setDowntimeMinutes(parseInt(e.target.value) || 0)} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="d-seconds">Seconds</Label>
                                <Input id="d-seconds" type="number" value={downtimeSeconds} onChange={e => setDowntimeSeconds(parseInt(e.target.value) || 0)} />
                            </div>
                        </div>
                        <div className="space-y-2">
                             <Label htmlFor="period">Over a Period Of</Label>
                             <Select value={period} onValueChange={setPeriod}>
                                <SelectTrigger id="period"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="day">Day</SelectItem>
                                    <SelectItem value="week">Week</SelectItem>
                                    <SelectItem value="month">Month</SelectItem>
                                    <SelectItem value="year">Year</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Card className="bg-muted/50 p-6 text-center">
                            <p className="text-sm text-muted-foreground">Uptime Percentage</p>
                            <p className={cn("text-4xl font-bold", getUptimeColor(uptimeResult.uptime))}>{uptimeResult.uptime}%</p>
                            <p className="text-sm text-muted-foreground mt-2">Downtime: {uptimeResult.downtime}%</p>
                        </Card>
                    </TabsContent>
                    
                    <TabsContent value="fromSLA" className="space-y-6 pt-6">
                        <CardDescription>Enter an uptime percentage from an SLA to see how much downtime it allows over different periods.</CardDescription>
                         <div className="space-y-2">
                            <Label htmlFor="sla-percent">Uptime Percentage (%)</Label>
                            <Input
                                id="sla-percent"
                                type="number"
                                value={slaPercentage}
                                onChange={(e) => setSlaPercentage(e.target.value)}
                                placeholder="e.g., 99.9"
                            />
                        </div>
                        {downtimeResult && (
                            <Card className="bg-muted/50">
                                <CardHeader>
                                    <CardTitle className="text-lg">Allowed Downtime for {slaPercentage}% Uptime</CardTitle>
                                </CardHeader>
                                <CardContent>
                                     <Table>
                                        <TableBody>
                                            <TableRow><TableHead>Per Day</TableHead><TableCell className="text-right font-code">{downtimeResult.daily}</TableCell></TableRow>
                                            <TableRow><TableHead>Per Week</TableHead><TableCell className="text-right font-code">{downtimeResult.weekly}</TableCell></TableRow>
                                            <TableRow><TableHead>Per Month</TableHead><TableCell className="text-right font-code">{downtimeResult.monthly}</TableCell></TableRow>
                                            <TableRow><TableHead>Per Year</TableHead><TableCell className="text-right font-code">{downtimeResult.yearly}</TableCell></TableRow>
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
