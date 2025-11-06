'use client';

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TrendingUp, AlertCircle } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';

type Period = 'day' | 'week' | 'month' | 'year';

const calculateGrowth = (
    initialSize: number,
    growthRate: number,
    projectionPeriods: number
) => {
    let size = initialSize;
    const history = [{ period: 0, size }];
    
    for (let i = 1; i <= projectionPeriods; i++) {
        size *= (1 + growthRate / 100);
        history.push({ period: i, size });
    }
    
    return history;
};

const formatSize = (gb: number) => {
    if (gb < 1024) return `${gb.toFixed(2)} GB`;
    if (gb < 1024 * 1024) return `${(gb / 1024).toFixed(2)} TB`;
    return `${(gb / (1024 * 1024)).toFixed(2)} PB`;
};

export function DatabaseGrowthCalculator() {
    const [initialSize, setInitialSize] = useState(100);
    const [unit, setUnit] = useState('GB');
    const [growthRate, setGrowthRate] = useState(10);
    const [growthPeriod, setGrowthPeriod] = useState<Period>('month');
    const [projectionPeriods, setProjectionPeriods] = useState(24);
    const [results, setResults] = useState<any[] | null>(null);
    const [error, setError] = useState('');

    const handleCalculate = () => {
        setError('');
        if (initialSize <= 0 || growthRate < 0 || projectionPeriods <= 0) {
            setError('Please enter positive values for all fields.');
            setResults(null);
            return;
        }

        let initialSizeInGb = initialSize;
        if (unit === 'TB') initialSizeInGb = initialSize * 1024;
        if (unit === 'PB') initialSizeInGb = initialSize * 1024 * 1024;
        
        const growthData = calculateGrowth(initialSizeInGb, growthRate, projectionPeriods);
        setResults(growthData);
    };
    
    const chartConfig = {
      size: { label: 'Size (GB)', color: 'hsl(var(--chart-1))' },
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Database Growth Estimator</CardTitle>
                <CardDescription>
                    Forecast future database storage needs based on current size and expected growth rate.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="initial-size">Initial Database Size</Label>
                        <div className="flex gap-2">
                            <Input id="initial-size" type="number" value={initialSize} onChange={e => setInitialSize(parseFloat(e.target.value) || 0)} />
                             <Select value={unit} onValueChange={setUnit}>
                                <SelectTrigger className="w-[100px]"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="GB">GB</SelectItem>
                                    <SelectItem value="TB">TB</SelectItem>
                                    <SelectItem value="PB">PB</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                     <div className="space-y-2">
                        <Label htmlFor="growth-rate">Growth Rate (%)</Label>
                        <div className="flex items-center gap-2">
                            <Input id="growth-rate" type="number" value={growthRate} onChange={e => setGrowthRate(parseFloat(e.target.value) || 0)} />
                            <span className='text-muted-foreground'>per</span>
                            <Select value={growthPeriod} onValueChange={v => setGrowthPeriod(v as Period)}>
                                <SelectTrigger className="w-[120px]"><SelectValue/></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="day">Day</SelectItem>
                                    <SelectItem value="week">Week</SelectItem>
                                    <SelectItem value="month">Month</SelectItem>
                                    <SelectItem value="year">Year</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="projection-periods">Projection Period</Label>
                         <div className="flex items-center gap-2">
                            <Input id="projection-periods" type="number" value={projectionPeriods} onChange={e => setProjectionPeriods(parseInt(e.target.value) || 0)} />
                             <span className='pl-2 text-sm text-muted-foreground capitalize'>{growthPeriod}(s)</span>
                        </div>
                    </div>
                </div>

                <Button onClick={handleCalculate} className="w-full sm:w-auto"><TrendingUp className="mr-2 h-4 w-4" /> Estimate Growth</Button>
                
                {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {results && results.length > 0 && (
                    <Card className="bg-muted/50">
                        <CardHeader>
                            <CardTitle className="text-lg">Growth Projection</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="text-center">
                                <Label>Final Estimated Size</Label>
                                <p className="text-3xl font-bold text-primary">{formatSize(results[results.length - 1].size)}</p>
                                <p className="text-sm text-muted-foreground">after {projectionPeriods} {growthPeriod}(s)</p>
                            </div>
                             <ChartContainer config={chartConfig} className="h-64 w-full">
                                <AreaChart data={results} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                                     <defs>
                                        <linearGradient id="fillColor" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="var(--color-size)" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="var(--color-size)" stopOpacity={0.1}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="period"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        label={{ value: `Time (${growthPeriod}s)`, position: 'insideBottom', offset: -10 }}
                                    />
                                    <YAxis
                                        tickFormatter={(value) => formatSize(value as number)}
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        width={100}
                                    />
                                    <ChartTooltip cursor={false} content={<ChartTooltipContent formatter={(value) => formatSize(value as number)} />} />
                                    <Area
                                        dataKey="size"
                                        type="natural"
                                        fill="url(#fillColor)"
                                        stroke="var(--color-size)"
                                        stackId="a"
                                    />
                                </AreaChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                )}
            </CardContent>
        </Card>
    );
}
