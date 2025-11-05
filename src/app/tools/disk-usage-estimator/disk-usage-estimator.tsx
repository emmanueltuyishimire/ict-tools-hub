'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Plus, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';

type Partition = {
    id: number;
    name: string;
    size: number | '';
};

let nextId = 5;

const partitionColors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
    'bg-orange-500',
];

export function DiskUsageEstimator() {
    const [totalSize, setTotalSize] = useState<number | ''>(256);
    const [partitions, setPartitions] = useState<Partition[]>([
        { id: 1, name: '/', size: 30 },
        { id: 2, name: '/home', size: 100 },
        { id: 3, name: '/var', size: 20 },
        { id: 4, name: 'swap', size: 8 },
    ]);
    const [error, setError] = useState('');

    const allocation = useMemo(() => {
        const total = totalSize || 0;
        const allocated = partitions.reduce((sum, p) => sum + (p.size || 0), 0);
        const unallocated = total - allocated;
        
        if (allocated > total) {
            setError(`Total allocated space (${allocated} GB) exceeds total disk size (${total} GB).`);
        } else {
            setError('');
        }

        return { total, allocated, unallocated };
    }, [totalSize, partitions]);

    const handleAddPartition = () => {
        setPartitions([...partitions, { id: nextId++, name: '', size: '' }]);
    };
    
    const handleRemovePartition = (id: number) => {
        setPartitions(partitions.filter(p => p.id !== id));
    };

    const handlePartitionChange = (id: number, field: 'name' | 'size', value: string) => {
        setPartitions(partitions.map(p => {
            if (p.id === id) {
                return { ...p, [field]: field === 'size' ? (value === '' ? '' : parseInt(value)) : value };
            }
            return p;
        }));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Disk Partition Estimator</CardTitle>
                <CardDescription>
                    Plan your disk layout by allocating space to different partitions.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                 <div className="space-y-2">
                    <Label htmlFor="total-disk-size">Total Disk Size (GB)</Label>
                    <Input
                        id="total-disk-size"
                        type="number"
                        value={totalSize}
                        onChange={e => setTotalSize(e.target.value === '' ? '' : parseInt(e.target.value))}
                        placeholder="e.g., 512"
                    />
                </div>

                <div className="space-y-4">
                    <Label>Partitions</Label>
                    {partitions.map((part) => (
                        <div key={part.id} className="grid grid-cols-12 gap-2 items-center">
                            <div className="col-span-6">
                                <Input
                                    value={part.name}
                                    onChange={(e) => handlePartitionChange(part.id, 'name', e.target.value)}
                                    placeholder="Partition Name (e.g., /opt)"
                                />
                            </div>
                            <div className="col-span-5">
                                <div className="relative">
                                    <Input
                                        type="number"
                                        value={part.size}
                                        onChange={(e) => handlePartitionChange(part.id, 'size', e.target.value)}
                                        placeholder="Size"
                                        className="pr-10"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">GB</span>
                                </div>
                            </div>
                            <div className="col-span-1">
                                <Button size="icon" variant="ghost" onClick={() => handleRemovePartition(part.id)} aria-label="Remove partition">
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                            </div>
                        </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={handleAddPartition}><Plus className="mr-2 h-4 w-4" />Add Partition</Button>
                </div>
                
                {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Allocation Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <Card className="bg-muted/50">
                    <CardHeader>
                        <CardTitle className="text-lg">Allocation Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex rounded-md overflow-hidden h-6">
                            {partitions.map((part, index) => {
                                if (!part.size || allocation.total === 0) return null;
                                const width = (part.size / allocation.total) * 100;
                                return (
                                    <div
                                        key={part.id}
                                        className={`h-full ${partitionColors[index % partitionColors.length]}`}
                                        style={{ width: `${width}%` }}
                                        title={`${part.name}: ${part.size} GB`}
                                    />
                                );
                            })}
                            {allocation.unallocated > 0 && (
                                <div
                                    className="h-full bg-slate-300 dark:bg-slate-700"
                                    style={{ width: `${(allocation.unallocated / allocation.total) * 100}%` }}
                                    title={`Unallocated: ${allocation.unallocated} GB`}
                                />
                            )}
                        </div>
                         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                            <div className="p-2">
                                <p className="text-sm text-muted-foreground">Total Size</p>
                                <p className="text-xl font-bold">{allocation.total.toLocaleString()} GB</p>
                            </div>
                             <div className="p-2">
                                <p className="text-sm text-muted-foreground">Allocated</p>
                                <p className="text-xl font-bold">{allocation.allocated.toLocaleString()} GB</p>
                            </div>
                            <div className="p-2">
                                <p className="text-sm text-muted-foreground">Unallocated</p>
                                <p className={`text-xl font-bold ${allocation.unallocated < 0 ? 'text-destructive' : 'text-primary'}`}>
                                    {allocation.unallocated.toLocaleString()} GB
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    );
}
