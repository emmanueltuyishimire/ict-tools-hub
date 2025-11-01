
'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { CalendarClock, Clock, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function CacheExpirationCalculator() {
    const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 16));
    const [maxAge, setMaxAge] = useState(3600); // 1 hour
    const [error, setError] = useState('');

    const expirationDate = useMemo(() => {
        try {
            setError('');
            if (!startDate || isNaN(maxAge)) return null;

            const start = new Date(startDate);
            if (isNaN(start.getTime())) {
                setError('Invalid start date format.');
                return null;
            }

            const expiry = new Date(start.getTime() + maxAge * 1000);
            return expiry;
        } catch (e) {
            setError('Could not calculate expiration date.');
            return null;
        }
    }, [startDate, maxAge]);

    const handlePresetClick = (seconds: number) => {
        setMaxAge(seconds);
    };

    const presets = [
        { label: '1 Hour', seconds: 3600 },
        { label: '1 Day', seconds: 86400 },
        { label: '1 Week', seconds: 604800 },
        { label: '1 Month', seconds: 2629800 },
        { label: '1 Year', seconds: 31536000 },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Cache Expiration Calculator</CardTitle>
                <CardDescription>Calculate the expiration date based on a `Cache-Control: max-age` value.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="start-date">Start Date & Time (Local)</Label>
                        <Input
                            id="start-date"
                            type="datetime-local"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="max-age">Cache-Control `max-age` (seconds)</Label>
                        <Input
                            id="max-age"
                            type="number"
                            value={maxAge}
                            onChange={(e) => setMaxAge(parseInt(e.target.value, 10) || 0)}
                        />
                    </div>
                </div>
                 <div className="space-y-2">
                    <Label>Quick Presets</Label>
                    <div className="flex flex-wrap gap-2">
                         {presets.map(p => (
                            <Button key={p.label} variant="outline" size="sm" onClick={() => handlePresetClick(p.seconds)}>{p.label}</Button>
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

                {expirationDate && !error && (
                    <div className="space-y-4 pt-4">
                        <h3 className="font-semibold text-lg">Expiration Date</h3>
                        <Card className="bg-muted/50 p-6 text-center">
                            <CalendarClock className="mx-auto h-10 w-10 text-primary mb-2" />
                            <p className="text-2xl font-bold font-mono">
                                {expirationDate.toLocaleString()}
                            </p>
                            <p className="text-sm text-muted-foreground">
                               (Your Local Time)
                            </p>
                        </Card>
                         <Alert>
                            <Clock className="h-4 w-4" />
                            <AlertTitle>How it Works</AlertTitle>
                            <AlertDescription>
                                This tool adds the `max-age` in seconds to your selected start date to calculate the exact moment a cached resource becomes stale.
                            </AlertDescription>
                        </Alert>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
