'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, Archive } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function BackupStorageCalculator() {
    const [initialSize, setInitialSize] = useState(100);
    const [initialUnit, setInitialUnit] = useState('GB');
    const [changeRate, setChangeRate] = useState(5);
    const [frequency, setFrequency] = useState<'daily' | 'weekly'>('daily');
    const [backupType, setBackupType] = useState<'full' | 'incremental' | 'differential'>('full');
    const [retention, setRetention] = useState(14);
    const [results, setResults] = useState<{ totalStorage: number } | null>(null);
    const [error, setError] = useState('');

    const handleCalculate = () => {
        setError('');
        let totalStorage = 0;
        const initialSizeGb = initialUnit === 'TB' ? initialSize * 1024 : initialSize;

        if (initialSizeGb <= 0 || changeRate < 0 || retention <= 0) {
            setError('Please enter positive values for all fields.');
            return;
        }

        switch (backupType) {
            case 'full':
                totalStorage = initialSizeGb * retention;
                break;
            case 'incremental':
                totalStorage = initialSizeGb; // First full backup
                for (let i = 1; i < retention; i++) {
                    totalStorage += initialSizeGb * (changeRate / 100);
                }
                break;
            case 'differential':
                totalStorage = initialSizeGb; // First full backup
                for (let i = 1; i < retention; i++) {
                    totalStorage += initialSizeGb * (changeRate / 100) * i;
                }
                break;
        }

        setResults({ totalStorage });
    };

    const formatSize = (gb: number) => {
        if (gb > 1024) {
            return `${(gb / 1024).toFixed(2)} TB`;
        }
        return `${gb.toFixed(2)} GB`;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Backup Storage Calculator</CardTitle>
                <CardDescription>
                    Estimate the total storage required based on your backup strategy.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="initial-size">Initial Data Size</Label>
                        <div className="flex gap-2">
                            <Input id="initial-size" type="number" value={initialSize} onChange={e => setInitialSize(parseFloat(e.target.value) || 0)} />
                             <Select value={initialUnit} onValueChange={setInitialUnit}>
                                <SelectTrigger className="w-[100px]"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="GB">GB</SelectItem>
                                    <SelectItem value="TB">TB</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     <div className="space-y-2">
                        <Label htmlFor="backup-type">Backup Type</Label>
                        <Select value={backupType} onValueChange={(v) => setBackupType(v as any)}>
                            <SelectTrigger id="backup-type"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="full">Full</SelectItem>
                                <SelectItem value="incremental">Incremental</SelectItem>
                                <SelectItem value="differential">Differential</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="change-rate">Change Rate (%)</Label>
                        <Input id="change-rate" type="number" value={changeRate} onChange={e => setChangeRate(parseFloat(e.target.value) || 0)} disabled={backupType === 'full'} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="retention">Retention (# of backups)</Label>
                        <Input id="retention" type="number" value={retention} onChange={e => setRetention(parseInt(e.target.value) || 0)} />
                    </div>
                </div>

                <Button onClick={handleCalculate} className="w-full sm:w-auto"><Archive className="mr-2 h-4 w-4" /> Calculate Total Storage</Button>
                
                {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {results && (
                    <div className="space-y-4 pt-4">
                        <Card className="bg-muted/50 p-6 text-center">
                            <CardTitle>Total Estimated Storage</CardTitle>
                            <p className="text-4xl font-bold text-primary mt-2">{formatSize(results.totalStorage)}</p>
                            <p className="text-sm text-muted-foreground">Needed to store {retention} {backupType} backups.</p>
                        </Card>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
