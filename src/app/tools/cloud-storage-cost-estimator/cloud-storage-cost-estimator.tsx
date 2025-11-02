
'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, DollarSign } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Simplified pricing data (example values, should be updated periodically)
const pricing = {
    aws: {
        'us-east-1': { storage: 0.023, transfer: 0.09 }, // N. Virginia
        'eu-west-1': { storage: 0.023, transfer: 0.09 }, // Ireland
    },
    google: {
        'us-east1': { storage: 0.020, transfer: 0.12 }, // South Carolina
        'europe-west1': { storage: 0.020, transfer: 0.12 }, // Belgium
    },
    azure: {
        'eastus': { storage: 0.0184, transfer: 0.087 }, // Virginia
        'westeurope': { storage: 0.0184, transfer: 0.087 }, // Netherlands
    },
};

type Provider = keyof typeof pricing;
type Region<P extends Provider> = keyof typeof pricing[P];

export function CloudStorageCostEstimator() {
    const [storage, setStorage] = useState(1024);
    const [storageUnit, setStorageUnit] = useState('GB');
    const [transfer, setTransfer] = useState(512);
    const [transferUnit, setTransferUnit] = useState('GB');
    const [provider, setProvider] = useState<Provider>('aws');
    const [region, setRegion] = useState<string>('us-east-1');
    const [results, setResults] = useState<{ storageCost: number; transferCost: number; totalCost: number } | null>(null);

    const regionsForProvider = useMemo(() => Object.keys(pricing[provider]), [provider]);

    const handleProviderChange = (value: Provider) => {
        setProvider(value);
        setRegion(Object.keys(pricing[value])[0]); // Default to first region of new provider
    };

    const handleCalculate = () => {
        const storageInGb = storageUnit === 'TB' ? storage * 1024 : storage;
        const transferInGb = transferUnit === 'TB' ? transfer * 1024 : transfer;

        const providerPricing = pricing[provider] as any;
        const regionPricing = providerPricing[region];

        if (!regionPricing) {
            // Handle error, though this shouldn't happen with the select logic
            return;
        }

        const storageCost = storageInGb * regionPricing.storage;
        // Simplified tiered pricing: assume first 10TB is at this rate
        const transferCost = transferInGb * regionPricing.transfer;

        setResults({
            storageCost,
            transferCost,
            totalCost: storageCost + transferCost,
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Cloud Storage Cost Estimator</CardTitle>
                <CardDescription>
                    Estimate your monthly object storage costs for popular cloud providers.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="storage">Total Storage</Label>
                        <div className="flex gap-2">
                            <Input id="storage" type="number" value={storage} onChange={e => setStorage(parseFloat(e.target.value) || 0)} />
                             <Select value={storageUnit} onValueChange={setStorageUnit}>
                                <SelectTrigger className="w-[100px]"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="GB">GB</SelectItem>
                                    <SelectItem value="TB">TB</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="transfer">Monthly Data Transfer Out (Egress)</Label>
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="provider">Cloud Provider</Label>
                        <Select value={provider} onValueChange={handleProviderChange as any}>
                            <SelectTrigger id="provider"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="aws">AWS (S3 Standard)</SelectItem>
                                <SelectItem value="google">Google Cloud (Standard)</SelectItem>
                                <SelectItem value="azure">Azure (Hot LRS)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="region">Region</Label>
                        <Select value={region} onValueChange={setRegion}>
                            <SelectTrigger id="region"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {regionsForProvider.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <Button onClick={handleCalculate} className="w-full sm:w-auto"><DollarSign className="mr-2 h-4 w-4" /> Calculate Cost</Button>

                {results && (
                    <div className="space-y-4 pt-4">
                        <Card className="bg-muted/50">
                            <CardHeader>
                                <CardTitle className="text-lg">Estimated Monthly Cost</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="text-center">
                                    <p className="text-4xl font-bold text-primary">${results.totalCost.toFixed(2)}</p>
                                    <p className="text-sm text-muted-foreground">per month</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <div className="p-4 bg-background rounded-lg">
                                        <Label>Storage Cost</Label>
                                        <p className="text-xl font-semibold">${results.storageCost.toFixed(2)}</p>
                                    </div>
                                    <div className="p-4 bg-background rounded-lg">
                                        <Label className="flex items-center justify-center gap-1"><TrendingUp/>Egress Cost</Label>
                                        <p className="text-xl font-semibold">${results.transferCost.toFixed(2)}</p>
                                    </div>
                                </div>
                                <Alert variant="default" className='border-yellow-500/50'>
                                    <AlertTriangle className="h-4 w-4 text-yellow-600"/>
                                    <AlertTitle className='text-yellow-700'>Disclaimer</AlertTitle>
                                    <AlertDescription>
                                        This is a simplified estimate. Actual costs may vary based on storage tiers, request pricing, free tier usage, and specific provider pricing changes.
                                    </AlertDescription>
                                </Alert>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
