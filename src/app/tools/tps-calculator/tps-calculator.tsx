
'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Zap } from 'lucide-react';

type TimeUnit = 'seconds' | 'minutes' | 'hours';

export function TpsCalculator() {
    const [transactions, setTransactions] = useState<number | ''>(1000000);
    const [time, setTime] = useState<number | ''>(10);
    const [unit, setUnit] = useState<TimeUnit>('minutes');
    const [error, setError] = useState('');

    const tps = useMemo(() => {
        const numTransactions = Number(transactions);
        const numTime = Number(time);
        
        if (numTransactions <= 0 || numTime <= 0) {
            return null;
        }

        let timeInSeconds = numTime;
        if (unit === 'minutes') {
            timeInSeconds = numTime * 60;
        } else if (unit === 'hours') {
            timeInSeconds = numTime * 3600;
        }
        
        if (timeInSeconds === 0) return null;

        const result = numTransactions / timeInSeconds;
        return parseFloat(result.toFixed(2));
    }, [transactions, time, unit]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>TPS Calculator</CardTitle>
                <CardDescription>
                    Calculate Transactions Per Second based on total transactions and a time period.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="transactions">Total Transactions</Label>
                        <Input
                            id="transactions"
                            type="number"
                            value={transactions}
                            onChange={(e) => setTransactions(e.target.value === '' ? '' : parseInt(e.target.value))}
                            placeholder="e.g., 1,800,000"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="time">Time Period</Label>
                        <div className="flex gap-2">
                            <Input
                                id="time"
                                type="number"
                                value={time}
                                onChange={(e) => setTime(e.target.value === '' ? '' : parseInt(e.target.value))}
                                placeholder="e.g., 10"
                            />
                            <Select value={unit} onValueChange={(v) => setUnit(v as TimeUnit)}>
                                <SelectTrigger className="w-[120px]"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="seconds">Seconds</SelectItem>
                                    <SelectItem value="minutes">Minutes</SelectItem>
                                    <SelectItem value="hours">Hours</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {tps !== null && (
                    <div className="space-y-4 pt-4">
                        <Card className="bg-muted/50 p-6 text-center">
                            <Zap className="mx-auto h-10 w-10 text-primary mb-2" />
                            <Label>Average Transactions Per Second (TPS)</Label>
                            <p className="text-5xl font-bold text-primary">
                                {tps.toLocaleString()}
                            </p>
                        </Card>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
