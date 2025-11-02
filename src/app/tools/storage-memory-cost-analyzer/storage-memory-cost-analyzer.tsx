
'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { MemoryStick, HardDrive, DollarSign, Zap, Info } from 'lucide-react';

const defaultPrices = {
    ram_gb_month: 8.00,
    ssd_gb_month: 0.10,
};

export function StorageMemoryCostAnalyzer() {
    const [dataSize, setDataSize] = useState(128); // in GB
    const [pricing, setPricing] = useState(defaultPrices);

    const handlePricingChange = (type: keyof typeof pricing, value: string) => {
        setPricing(prev => ({ ...prev, [type]: parseFloat(value) || 0 }));
    };

    const costs = useMemo(() => {
        const ramCost = dataSize * pricing.ram_gb_month;
        const ssdCost = dataSize * pricing.ssd_gb_month;
        const multiplier = ssdCost > 0 ? (ramCost / ssdCost) : 0;
        return { ramCost, ssdCost, multiplier };
    }, [dataSize, pricing]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Cost Analyzer</CardTitle>
                <CardDescription>
                    Compare the monthly cost of keeping a dataset in RAM vs. on an SSD.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div className="space-y-2 md:col-span-1">
                        <Label htmlFor="data-size">Dataset Size (GB)</Label>
                        <Input
                            id="data-size"
                            type="number"
                            value={dataSize}
                            onChange={e => setDataSize(parseInt(e.target.value) || 0)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="ram-cost">RAM Cost ($ per GB/month)</Label>
                        <Input
                            id="ram-cost"
                            type="number"
                            step="0.01"
                            value={pricing.ram_gb_month}
                            onChange={e => handlePricingChange('ram_gb_month', e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="ssd-cost">SSD Cost ($ per GB/month)</Label>
                        <Input
                            id="ssd-cost"
                            type="number"
                            step="0.01"
                            value={pricing.ssd_gb_month}
                            onChange={e => handlePricingChange('ssd_gb_month', e.target.value)}
                        />
                    </div>
                </div>

                <Card className="bg-muted/50">
                     <CardHeader>
                        <CardTitle className="text-lg">Monthly Cost & Performance Comparison</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 bg-background rounded-lg border flex flex-col items-center text-center">
                            <MemoryStick className="h-10 w-10 text-blue-500 mb-2" />
                            <h3 className="text-xl font-semibold">In-Memory (RAM)</h3>
                            <p className="text-3xl font-bold text-blue-500 my-2">${costs.ramCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Zap className="h-4 w-4 text-yellow-500" />
                                <span>~50-100 ns access time</span>
                            </div>
                        </div>
                        <div className="p-6 bg-background rounded-lg border flex flex-col items-center text-center">
                            <HardDrive className="h-10 w-10 text-green-500 mb-2" />
                             <h3 className="text-xl font-semibold">On-Disk (SSD)</h3>
                            <p className="text-3xl font-bold text-green-500 my-2">${costs.ssdCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Zap className="h-4 w-4 text-yellow-500 opacity-50" />
                                <span>~50-150 µs access time</span>
                            </div>
                        </div>
                    </CardContent>
                    <CardContent>
                        <Alert>
                            <Info className="h-4 w-4" />
                            <AlertTitle>The Trade-Off</AlertTitle>
                            <AlertDescription>
                                For this {dataSize} GB dataset, storing it in RAM is approximately <strong>{costs.multiplier.toFixed(0)} times more expensive</strong> than storing it on an SSD, but offers access speeds that are thousands of times faster.
                            </AlertDescription>
                        </Alert>
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    );
}
