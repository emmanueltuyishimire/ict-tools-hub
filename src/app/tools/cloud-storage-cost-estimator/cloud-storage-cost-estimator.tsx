'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, DollarSign, Plus, Trash2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

const pricing = {
    aws: {
        'us-east-1': { storage: 0.023, transfer: 0.09 },
        'eu-west-1': { storage: 0.023, transfer: 0.09 },
    },
    google: {
        'us-east1': { storage: 0.020, transfer: 0.12 },
        'europe-west1': { storage: 0.020, transfer: 0.12 },
    },
    azure: {
        'eastus': { storage: 0.0184, transfer: 0.087 },
        'westeurope': { storage: 0.0184, transfer: 0.087 },
    },
};

type Provider = keyof typeof pricing | 'custom';
type Region<P extends Provider> = P extends keyof typeof pricing[P] : string;

export function CloudStorageCostEstimator() {
    const [storage, setStorage] = useState(1024);
    const [storageUnit, setStorageUnit] = useState('GB');
    const [transfer, setTransfer] = useState(512);
    const [transferUnit, setTransferUnit] = useState('GB');
    const [provider, setProvider] = useState<Provider>('aws');
    const [region, setRegion] = useState<string>('us-east-1');
    const [results, setResults] = useState<{ storageCost: number; transferCost: number; totalCost: number } | null>(null);
    
    // State for custom pricing
    const [customStorageRate, setCustomStorageRate] = useState(0.02);
    const [customTransferRate, setCustomTransferRate] = useState(0.10);

    const regionsForProvider = useMemo(() => {
        if (provider === 'custom') return [];
        return Object.keys(pricing[provider as keyof typeof pricing]);
    }, [provider]);

    const handleProviderChange = (value: Provider) => {
        setProvider(value);
        if (value !== 'custom') {
            setRegion(Object.keys(pricing[value as keyof typeof pricing])[0]);
        }
        setResults(null);
    };

    const handleCalculate = () => {
        const storageInGb = storageUnit === 'TB' ? storage * 1024 : storage;
        const transferInGb = transferUnit === 'TB' ? transfer * 1024 : transfer;

        let storageRate, transferRate;
        
        if (provider === 'custom') {
            storageRate = customStorageRate;
            transferRate = customTransferRate;
        } else {
            const providerPricing = pricing[provider as keyof typeof pricing] as any;
            const regionPricing = providerPricing[region];

            if (!regionPricing) {
                return;
            }
            storageRate = regionPricing.storage;
            transferRate = regionPricing.transfer;
        }


        const storageCost = storageInGb * storageRate;
        const transferCost = transferInGb * transferRate;

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
                    Estimate your monthly object storage costs for popular cloud providers or your own custom pricing.
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
                                <SelectItem value="custom">Custom/Manual</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {provider !== 'custom' && (
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
                            <CardTitle className="text-lg">Custom Pricing</CardTitle>
                        </CardHeader>
                        <CardContent className="p-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="custom-storage-rate">Storage Rate ($ per GB/month)</Label>
                                <Input id="custom-storage-rate" type="number" step="0.001" value={customStorageRate} onChange={e => setCustomStorageRate(parseFloat(e.target.value) || 0)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="custom-transfer-rate">Egress Rate ($ per GB)</Label>
                                <Input id="custom-transfer-rate" type="number" step="0.001" value={customTransferRate} onChange={e => setCustomTransferRate(parseFloat(e.target.value) || 0)} />
                            </div>
                        </CardContent>
                    </Card>
                )}

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
