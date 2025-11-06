'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DollarSign, Plus, Trash2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Expanded pricing data with more providers
const pricing = {
    aws: {
        'us-east-1': [
            { upTo: 100, rate: 0.00 },
            { upTo: 10 * 1024, rate: 0.09 },
            { upTo: 50 * 1024, rate: 0.085 },
            { upTo: 150 * 1024, rate: 0.07 },
            { upTo: Infinity, rate: 0.05 }
        ],
    },
    google: {
        'us-east1': [
            { upTo: 1024, rate: 0.08 },
            { upTo: 10 * 1024, rate: 0.07 },
            { upTo: Infinity, rate: 0.05 }
        ],
    },
    azure: {
        'eastus': [
            { upTo: 100, rate: 0.00 },
            { upTo: 10 * 1024, rate: 0.087 },
            { upTo: 50 * 1024, rate: 0.083 },
            { upTo: 150 * 1024, rate: 0.07 },
            { upTo: Infinity, rate: 0.05 }
        ],
    },
    cloudflare: {
        'global': [{ upTo: Infinity, rate: 0.00 }]
    },
    digitalocean: {
        'global': [
            { upTo: 1 * 1024, rate: 0.00 }, // Varies by Droplet plan, assuming 1TB free pool
            { upTo: Infinity, rate: 0.01 }
        ]
    },
    vultr: {
        'global': [
            { upTo: 2 * 1024, rate: 0.00 }, // Varies by plan
            { upTo: Infinity, rate: 0.01 }
        ]
    }
};

type Provider = keyof typeof pricing | 'custom';
type PricingTier = { id: number; upTo: number | ''; rate: number | '' };

const calculateTieredCost = (transferGb: number, tiers: Omit<PricingTier, 'id'>[]) => {
    let cost = 0;
    let remainingGb = transferGb;
    let lastTierLimit = 0;

    for (const tier of tiers) {
        if (remainingGb <= 0) break;
        const tierLimit = tier.upTo === Infinity || tier.upTo === '' ? Infinity : Number(tier.upTo);
        const tierRate = Number(tier.rate);

        if (isNaN(tierLimit) || isNaN(tierRate)) continue;

        const tierRange = tierLimit - lastTierLimit;
        const gbInTier = Math.min(remainingGb, tierRange);
        
        cost += gbInTier * tierRate;
        remainingGb -= gbInTier;
        lastTierLimit = tierLimit;
    }

    return cost;
};

export function BandwidthCostCalculator() {
    const [transfer, setTransfer] = useState(1024);
    const [transferUnit, setTransferUnit] = useState('GB');
    const [provider, setProvider] = useState<Provider>('aws');
    const [region, setRegion] = useState<string>('us-east-1');
    const [customTiers, setCustomTiers] = useState<PricingTier[]>([
        { id: 1, upTo: 100, rate: 0.00 },
        { id: 2, upTo: 10240, rate: 0.08 },
        { id: 3, upTo: '', rate: 0.05 }
    ]);
    const [results, setResults] = useState<{ totalCost: number; tiers: any[] } | null>(null);

    const regionsForProvider = useMemo(() => {
        if (provider === 'custom' || !pricing[provider as keyof typeof pricing]) return [];
        return Object.keys(pricing[provider as keyof typeof pricing]);
    }, [provider]);

    const handleProviderChange = (value: Provider) => {
        setProvider(value);
        if (value !== 'custom') {
            setRegion(Object.keys(pricing[value as keyof typeof pricing])[0]);
        }
        setResults(null);
    };

    const handleCustomTierChange = (id: number, field: 'upTo' | 'rate', value: string) => {
        setCustomTiers(tiers => tiers.map(tier => 
            tier.id === id ? { ...tier, [field]: value === '' ? '' : parseFloat(value) } : tier
        ));
    };

    const addCustomTier = () => setCustomTiers([...customTiers, { id: Date.now(), upTo: '', rate: '' }]);
    const removeCustomTier = (id: number) => setCustomTiers(customTiers.filter(tier => tier.id !== id));

    const handleCalculate = () => {
        const transferInGb = transferUnit === 'TB' ? transfer * 1024 : transfer;
        
        let providerTiers;
        if (provider === 'custom') {
            providerTiers = customTiers.map(t => ({
                upTo: t.upTo === '' ? Infinity : t.upTo,
                rate: t.rate === '' ? 0 : t.rate
            })).sort((a, b) => (a.upTo === Infinity ? 1 : b.upTo === Infinity ? -1 : a.upTo - b.upTo));
        } else {
            providerTiers = (pricing[provider as keyof typeof pricing] as any)[region];
        }

        const totalCost = calculateTieredCost(transferInGb, providerTiers);
        
        setResults({
            totalCost,
            tiers: providerTiers.map(t => ({...t, upTo: t.upTo === '' ? Infinity : t.upTo})),
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Cloud Bandwidth Cost Calculator</CardTitle>
                <CardDescription>
                    Estimate your monthly data egress costs from major cloud providers or enter your own pricing.
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
                                <SelectItem value="cloudflare">Cloudflare</SelectItem>
                                <SelectItem value="digitalocean">DigitalOcean</SelectItem>
                                <SelectItem value="vultr">Vultr</SelectItem>
                                <SelectItem value="custom">Custom/Manual</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {provider !== 'custom' && regionsForProvider.length > 1 && (
                         <div className="space-y-2">
                            <Label htmlFor="region">Region</Label>
                            <Select value={region} onValueChange={setRegion}>
                                <SelectTrigger id="region"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    {regionsForProvider.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                </div>

                {provider === 'custom' && (
                    <Card className="p-4 bg-muted/50">
                        <CardHeader className="p-2">
                            <CardTitle className="text-lg">Custom Pricing Tiers</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 p-2">
                            {customTiers.map((tier, index) => (
                                <div key={tier.id} className="grid grid-cols-12 gap-2 items-center">
                                    <div className="col-span-5 space-y-1">
                                         <Label htmlFor={`tier-upto-${tier.id}`} className="text-xs">Up to (GB)</Label>
                                         <Input id={`tier-upto-${tier.id}`} type="number" value={tier.upTo} onChange={e => handleCustomTierChange(tier.id, 'upTo', e.target.value)} placeholder={index === customTiers.length - 1 ? "Infinity (leave blank)" : "e.g., 10240"} />
                                    </div>
                                    <div className="col-span-5 space-y-1">
                                        <Label htmlFor={`tier-rate-${tier.id}`} className="text-xs">Rate per GB ($)</Label>
                                        <Input id={`tier-rate-${tier.id}`} type="number" step="0.001" value={tier.rate} onChange={e => handleCustomTierChange(tier.id, 'rate', e.target.value)} placeholder="e.g., 0.08" />
                                    </div>
                                     <div className="col-span-2 flex items-end h-full">
                                        <Button size="icon" variant="ghost" onClick={() => removeCustomTier(tier.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                                    </div>
                                </div>
                            ))}
                             <Button variant="outline" size="sm" onClick={addCustomTier}><Plus className="h-4 w-4 mr-2" />Add Tier</Button>
                        </CardContent>
                    </Card>
                )}

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
                                <h4 className="font-semibold">Pricing Tiers ({provider === 'custom' ? 'Custom' : `${provider.toUpperCase()} - ${region}`})</h4>
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
                                                <TableCell className="text-right">${tier.rate.toFixed(4)}</TableCell>
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
