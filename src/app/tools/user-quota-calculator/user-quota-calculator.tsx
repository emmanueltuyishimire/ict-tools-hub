'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Users, HardDrive, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export function UserQuotaCalculator() {
    const [totalResource, setTotalResource] = useState(1000);
    const [resourceUnit, setResourceUnit] = useState('GB');
    const [numUsers, setNumUsers] = useState(50);
    const [quotaPerUser, setQuotaPerUser] = useState(10);
    const [quotaUnit, setQuotaUnit] = useState('GB');

    const conversionFactors: Record<string, number> = { 'MB': 1, 'GB': 1024, 'TB': 1024 * 1024 };

    const results = useMemo(() => {
        if (totalResource <= 0 || numUsers <= 0 || quotaPerUser <= 0) {
            return null;
        }

        const totalResourceInMb = totalResource * conversionFactors[resourceUnit];
        const quotaPerUserInMb = quotaPerUser * conversionFactors[quotaUnit];

        const totalAllocatedMb = numUsers * quotaPerUserInMb;
        const remainingMb = totalResourceInMb - totalAllocatedMb;
        const allocationPercentage = (totalAllocatedMb / totalResourceInMb) * 100;
        
        const formatMb = (mb: number) => {
            if (mb > 1024 * 1024) return `${(mb / (1024*1024)).toFixed(2)} TB`;
            if (mb > 1024) return `${(mb / 1024).toFixed(2)} GB`;
            return `${mb.toFixed(2)} MB`;
        }

        return {
            totalAllocated: formatMb(totalAllocatedMb),
            remaining: formatMb(remainingMb),
            allocationPercentage: Math.min(100, allocationPercentage),
            isOverallocated: remainingMb < 0,
        };
    }, [totalResource, resourceUnit, numUsers, quotaPerUser, quotaUnit]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>User Quota Calculator</CardTitle>
                <CardDescription>
                    Plan resource allocation for your users to ensure fair usage and system stability.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="total-resource">Total Available Resource</Label>
                        <div className="flex gap-2">
                            <Input
                                id="total-resource"
                                type="number"
                                value={totalResource}
                                onChange={e => setTotalResource(parseFloat(e.target.value) || 0)}
                            />
                            <Select value={resourceUnit} onValueChange={setResourceUnit}>
                                <SelectTrigger className="w-[100px]"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="MB">MB</SelectItem>
                                    <SelectItem value="GB">GB</SelectItem>
                                    <SelectItem value="TB">TB</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="num-users">Number of Users</Label>
                        <Input
                            id="num-users"
                            type="number"
                            value={numUsers}
                            onChange={e => setNumUsers(parseInt(e.target.value) || 0)}
                        />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="quota-per-user">Quota per User</Label>
                        <div className="flex gap-2">
                            <Input
                                id="quota-per-user"
                                type="number"
                                value={quotaPerUser}
                                onChange={e => setQuotaPerUser(parseFloat(e.target.value) || 0)}
                            />
                            <Select value={quotaUnit} onValueChange={setQuotaUnit}>
                                <SelectTrigger className="w-[100px]"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="MB">MB</SelectItem>
                                    <SelectItem value="GB">GB</SelectItem>
                                    <SelectItem value="TB">TB</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                
                {results && (
                    <Card className="bg-muted/50">
                        <CardHeader>
                            <CardTitle className="text-lg">Allocation Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Progress value={results.allocationPercentage} className="h-4" />
                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                                <div className="p-4 bg-background rounded-lg">
                                    <Label className="flex items-center justify-center gap-1"><Users className="h-4 w-4"/> Allocated to Users</Label>
                                    <p className="text-2xl font-semibold">{results.totalAllocated}</p>
                                </div>
                                <div className="p-4 bg-background rounded-lg">
                                    <Label className="flex items-center justify-center gap-1"><HardDrive className="h-4 w-4"/> Remaining / Available</Label>
                                    <p className={`text-2xl font-semibold ${results.isOverallocated ? 'text-destructive' : 'text-primary'}`}>{results.remaining}</p>
                                </div>
                            </div>
                            {results.isOverallocated && (
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>Over-allocation Warning</AlertTitle>
                                    <AlertDescription>
                                        The total allocated quota exceeds your available resources. You need to either increase the total resource or decrease the quota per user.
                                    </AlertDescription>
                                </Alert>
                            )}
                        </CardContent>
                    </Card>
                )}
            </CardContent>
        </Card>
    );
}
