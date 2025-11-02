
'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DollarSign, Cpu, MemoryStick } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

const pricingData = {
    aws: {
        'us-east-1': { vcpu_hourly: 0.042, ram_gb_hourly: 0.005 }, // Approx t3/m5
        'eu-west-1': { vcpu_hourly: 0.046, ram_gb_hourly: 0.006 },
    },
    google: {
        'us-central1': { vcpu_hourly: 0.032, ram_gb_hourly: 0.004 }, // Approx e2
        'europe-west1': { vcpu_hourly: 0.035, ram_gb_hourly: 0.005 },
    },
    azure: {
        'eastus': { vcpu_hourly: 0.038, ram_gb_hourly: 0.005 }, // Approx Dsv3
        'westeurope': { vcpu_hourly: 0.042, ram_gb_hourly: 0.006 },
    },
};

type Provider = keyof typeof pricingData | 'custom';

export function CloudInstanceCostCalculator() {
    const [provider, setProvider] = useState<Provider>('aws');
    const [region, setRegion] = useState('us-east-1');
    const [vcpus, setVcpus] = useState(4);
    const [ram, setRam] = useState(8);

    // State for custom pricing
    const [customVcpuRate, setCustomVcpuRate] = useState(0.04);
    const [customRamRate, setCustomRamRate] = useState(0.005);
    
    const regionsForProvider = useMemo(() => {
        if (provider === 'custom') return [];
        return Object.keys(pricingData[provider as keyof typeof pricingData]);
    }, [provider]);
    
    useEffect(() => {
        if (provider !== 'custom') {
            const firstRegion = Object.keys(pricingData[provider as keyof typeof pricingData])[0];
            setRegion(firstRegion);
        }
    }, [provider]);

    const estimatedCost = useMemo(() => {
        const hoursInMonth = 730; // Average
        let vcpuRate, ramRate;
        
        if (provider === 'custom') {
            vcpuRate = customVcpuRate;
            ramRate = customRamRate;
        } else {
            const pData = pricingData[provider as keyof typeof pricingData] as any;
            const rData = pData[region];
            if (!rData) return 0;
            vcpuRate = rData.vcpu_hourly;
            ramRate = rData.ram_gb_hourly;
        }

        const cost = (vcpus * vcpuRate + ram * ramRate) * hoursInMonth;
        return cost.toFixed(2);

    }, [provider, region, vcpus, ram, customVcpuRate, customRamRate]);


    return (
        <Card>
            <CardHeader>
                <CardTitle>On-Demand Instance Cost Estimator</CardTitle>
                <CardDescription>
                    Estimate your monthly compute costs based on vCPU and RAM requirements.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="provider">Cloud Provider</Label>
                        <Select value={provider} onValueChange={(v) => setProvider(v as Provider)}>
                            <SelectTrigger id="provider"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="aws">AWS (General Purpose)</SelectItem>
                                <SelectItem value="google">Google Cloud (E2)</SelectItem>
                                <SelectItem value="azure">Azure (General Purpose)</SelectItem>
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
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="vcpus"><Cpu className="inline h-4 w-4 mr-1"/> vCPUs</Label>
                        <Input id="vcpus" type="number" value={vcpus} onChange={e => setVcpus(parseInt(e.target.value) || 0)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="ram"><MemoryStick className="inline h-4 w-4 mr-1"/> RAM (GB)</Label>
                        <Input id="ram" type="number" value={ram} onChange={e => setRam(parseInt(e.target.value) || 0)} />
                    </div>
                </div>

                {provider === 'custom' && (
                    <Card className="p-4 bg-muted/50">
                        <CardHeader className="p-2">
                            <CardTitle className="text-lg">Custom Pricing</CardTitle>
                        </CardHeader>
                        <CardContent className="p-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="custom-vcpu-rate">vCPU Rate ($ per hour)</Label>
                                <Input id="custom-vcpu-rate" type="number" step="0.001" value={customVcpuRate} onChange={e => setCustomVcpuRate(parseFloat(e.target.value) || 0)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="custom-ram-rate">RAM Rate ($ per GB/hour)</Label>
                                <Input id="custom-ram-rate" type="number" step="0.001" value={customRamRate} onChange={e => setCustomRamRate(parseFloat(e.target.value) || 0)} />
                            </div>
                        </CardContent>
                    </Card>
                )}

                <Card className="bg-muted/50">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2"><DollarSign/>Estimated Monthly Cost</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <div className="text-center">
                            <p className="text-5xl font-bold text-primary">${estimatedCost}</p>
                            <p className="text-sm text-muted-foreground">per month (On-Demand)</p>
                        </div>
                        <Alert variant="default" className='mt-4 border-yellow-500/50'>
                            <AlertTriangle className="h-4 w-4 text-yellow-600"/>
                            <AlertTitle className='text-yellow-700'>Disclaimer</AlertTitle>
                            <AlertDescription>
                                This is a simplified estimate and does not include storage, data transfer, taxes, or savings from reserved/spot instances.
                            </AlertDescription>
                        </Alert>
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    );
}
