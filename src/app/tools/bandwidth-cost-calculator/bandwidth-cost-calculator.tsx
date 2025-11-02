
'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DollarSign } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Simplified pricing data with tiers (example values)
const pricing = {
    aws: {
        'us-east-1': [
            { upTo: 1, rate: 0.00 }, // First 1 GB free (simplified, usually 100GB)
            { upTo: 10 * 1024, rate: 0.09 }, // Next 10 TB
            { upTo: 50 * 1024, rate: 0.085 }, // Next 40 TB
            { upTo: Infinity, rate: 0.05 } // Over 50 TB
        ],
    },
    google: {
        'us-east1': [
            { upTo: 1, rate: 0.00 }, // First GB free
            { upTo: 1 * 1024, rate: 0.12 }, // First TB
            { upTo: 10 * 1024, rate: 0.11 }, // Next 9 TB
            { upTo: Infinity, rate: 0.08 } // Over 10 TB
        ],
    },
    azure: {
        'eastus': [
            { upTo: 5, rate: 0.00 }, // First 5 GB free
            { upTo: 10 * 1024, rate: 0.087 }, // Next 10 TB
            { upTo: 50 * 1024, rate: 0.083 }, // Next 40 TB
            { upTo: Infinity, rate: 0.05 } // Over 50TB
        ],
    },
};

type Provider = keyof typeof pricing;

const calculateTieredCost = (transferGb: number, tiers: { upTo: number, rate: number }[]) => {
    let cost = 0;
    let remainingGb = transferGb;
    let lastTierLimit = 0;

    for (const tier of tiers) {
        if (remainingGb <= 0) break;

        const tierRange = tier.upTo - lastTierLimit;
        const gbInTier = Math.min(remainingGb, tierRange);
        
        cost += gbInTier * tier.rate;
        remainingGb -= gbInTier;
        lastTierLimit = tier.upTo;
    }

    return cost;
};

export function BandwidthCostCalculator() {
    const [transfer, setTransfer] = useState(1024);
    const [transferUnit, setTransferUnit] = useState('GB');
    const [provider, setProvider] = useState<Provider>('aws');
    const [region, setRegion] = useState<string>('us-east-1');
    const [results, setResults] = useState<{ totalCost: number; tiers: any[] } | null>(null);

    const regionsForProvider = {
        aws: ['us-east-1'],
        google: ['us-east1'],
        azure: ['eastus'],
    };

    const handleProviderChange = (value: Provider) => {
        setProvider(value);
        setRegion(regionsForProvider[value][0]);
    };

    const handleCalculate = () => {
        const transferInGb = transferUnit === 'TB' ? transfer * 1024 : transfer;
        const providerTiers = (pricing[provider] as any)[region];
        const totalCost = calculateTieredCost(transferInGb, providerTiers);
        
        setResults({
            totalCost,
            tiers: providerTiers,
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Bandwidth Cost Calculator</CardTitle>
                <CardDescription>
                    Estimate your monthly data egress costs from major cloud providers.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="transfer">Monthly Data Egress</Label>
                        <div className="flex gap-2">
                            <Input id="transfer" type="number" value={transfer} onChange={e => setTransfer(parseFloat(e.target.value) || 0)} />
                            <Select value={transferUnit} onValueChange={setTransferUnit}>
                                <SelectTrigger className="w-[100px]"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="GB">GB</SelectItem>
                                    <SelectItem value="TB">TB</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="provider">Cloud Provider</Label>
                        <Select value={provider} onValueChange={handleProviderChange as any}>
                            <SelectTrigger id="provider"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="aws">AWS</SelectItem>
                                <SelectItem value="google">Google Cloud</SelectItem>
                                <SelectItem value="azure">Azure</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <Button onClick={handleCalculate} className="w-full sm:w-auto"><DollarSign className="mr-2 h-4 w-4" /> Calculate Cost</Button>

                {results && (
                    <div className="space-y-4 pt-4">
                        <Card className="bg-muted/50">
                            <CardHeader>
                                <CardTitle className="text-lg">Estimated Monthly Egress Cost</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="text-center">
                                    <p className="text-4xl font-bold text-primary">${results.totalCost.toFixed(2)}</p>
                                    <p className="text-sm text-muted-foreground">per month</p>
                                </div>
                                <h4 className="font-semibold">Pricing Tiers ({provider.toUpperCase()} - {region})</h4>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Usage</TableHead>
                                            <TableHead className="text-right">Rate per GB</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {results.tiers.map((tier, i) => (
                                            <TableRow key={i}>
                                                <TableCell>{`Up to ${tier.upTo === Infinity ? '∞' : tier.upTo.toLocaleString() + ' GB'}`}</TableCell>
                                                <TableCell className="text-right">${tier.rate.toFixed(3)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
