'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { SlidersHorizontal, Cpu, MemoryStick, AlertCircle } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

const workloadPresets = {
    'web-server': { baseRam: 1, baseCpu: 1, ramPer100Users: 0.5, cpuPer100Users: 0.25, name: 'Web Server (e.g., Apache, Nginx)' },
    'database': { baseRam: 2, baseCpu: 2, ramPer100Users: 1, cpuPer100Users: 0.5, name: 'Database Server (e.g., MySQL, PostgreSQL)' },
    'app-backend': { baseRam: 1.5, baseCpu: 1, ramPer100Users: 0.75, cpuPer100Users: 0.4, name: 'Application Backend (e.g., Node.js, Python API)' },
    'dev-environment': { baseRam: 2, baseCpu: 2, ramPer100Users: 0, cpuPer100Users: 0, name: 'General Development/Testing' },
    'cache-server': { baseRam: 1, baseCpu: 0.5, ramPer100Users: 1.5, cpuPer100Users: 0.1, name: 'Caching Server (e.g., Redis, Memcached)' },
};

const osOverhead = {
    'linux': { ram: 0.5, cpu: 0.1 },
    'windows': { ram: 2, cpu: 0.5 },
};

type Workload = keyof typeof workloadPresets;
type OS = keyof typeof osOverhead;

export function VmRequirementEstimator() {
    const [os, setOs] = useState<OS>('linux');
    const [workload, setWorkload] = useState<Workload>('web-server');
    const [users, setUsers] = useState(100);
    const [buffer, setBuffer] = useState(25); // 25% buffer
    const [results, setResults] = useState<any>(null);

    const handleCalculate = () => {
        const preset = workloadPresets[workload];
        const overhead = osOverhead[os];
        
        // Calculate base needs
        let calculatedRam = overhead.ram + preset.baseRam;
        let calculatedCpu = overhead.cpu + preset.baseCpu;
        
        // Add user load
        calculatedRam += (users / 100) * preset.ramPer100Users;
        calculatedCpu += (users / 100) * preset.cpuPer100Users;

        // Apply buffer
        const finalRam = calculatedRam * (1 + buffer / 100);
        const finalCpu = calculatedCpu * (1 + buffer / 100);

        setResults({
            ram: Math.round(finalRam * 2) / 2, // Round to nearest 0.5 GB
            cpu: Math.ceil(finalCpu), // Round up to nearest whole vCPU
        });
    };
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>VM Resource Estimator</CardTitle>
                <CardDescription>
                    Estimate the vCPU and RAM requirements for your virtual machine based on its workload.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="os-select">Operating System</Label>
                        <Select value={os} onValueChange={(v) => setOs(v as OS)}>
                            <SelectTrigger id="os-select"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="linux">Linux (e.g., Ubuntu, CentOS)</SelectItem>
                                <SelectItem value="windows">Windows Server</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="workload-select">Primary Workload</Label>
                        <Select value={workload} onValueChange={(v) => setWorkload(v as Workload)}>
                            <SelectTrigger id="workload-select"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {Object.entries(workloadPresets).map(([key, data]) => (
                                    <SelectItem key={key} value={key}>{data.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="users-input">Concurrent Users / Connections</Label>
                    <Input id="users-input" type="number" value={users} onChange={e => setUsers(parseInt(e.target.value) || 0)} disabled={workload === 'dev-environment'} />
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <Label htmlFor="buffer-slider">Performance Buffer</Label>
                        <span className="font-bold text-primary">{buffer}%</span>
                    </div>
                    <Slider
                        id="buffer-slider"
                        min={0} max={100} step={5}
                        value={[buffer]}
                        onValueChange={(value) => setBuffer(value[0])}
                    />
                     <p className="text-xs text-muted-foreground">
                        A buffer is recommended to handle traffic spikes and unexpected load. 25-50% is a common starting point.
                    </p>
                </div>
                <Button onClick={handleCalculate} className="w-full sm:w-auto"><SlidersHorizontal className="mr-2 h-4 w-4" /> Estimate Resources</Button>
                
                 {results && (
                    <div className="space-y-4 pt-4">
                        <Card className="bg-muted/50">
                            <CardHeader>
                                <CardTitle className="text-lg">Resource Recommendation</CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                                <div className="p-4 bg-background rounded-lg border-2 border-primary/50">
                                    <Cpu className="mx-auto h-8 w-8 text-primary mb-2" />
                                    <p className="text-sm text-muted-foreground">Recommended vCPUs</p>
                                    <p className="text-4xl font-bold">{results.cpu}</p>
                                </div>
                                <div className="p-4 bg-background rounded-lg border-2 border-primary/50">
                                    <MemoryStick className="mx-auto h-8 w-8 text-primary mb-2" />
                                    <p className="text-sm text-muted-foreground">Recommended RAM</p>
                                    <p className="text-4xl font-bold">{results.ram} GB</p>
                                </div>
                            </CardContent>
                            <CardContent>
                                <Alert>
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>This is a starting point!</AlertTitle>
                                    <AlertDescription>
                                        This is a baseline estimate. Always monitor your actual CPU and RAM usage under real load and adjust your VM size accordingly.
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
