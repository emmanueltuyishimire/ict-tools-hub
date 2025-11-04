
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Lightbulb, Users, Globe } from 'lucide-react';
import Link from 'next/link';

// --- IP Math Logic ---
const cidrToMask = (cidr: number): string => {
    if (cidr < 0 || cidr > 32) return 'Invalid CIDR';
    const mask = (0xFFFFFFFF << (32 - cidr)) >>> 0;
    return `${(mask >>> 24)}.${(mask >> 16) & 255}.${(mask >> 8) & 255}.${mask & 255}`;
};

export function HostCountCalculator() {
    const [cidr, setCidr] = useState('24');

    const { totalHosts, usableHosts, subnetMask } = useMemo(() => {
        const cidrNum = parseInt(cidr, 10);
        if (isNaN(cidrNum) || cidrNum < 0 || cidrNum > 32) {
            return { totalHosts: 0, usableHosts: 0, subnetMask: 'Invalid' };
        }

        const hostBits = 32 - cidrNum;
        const total = Math.pow(2, hostBits);

        let usable;
        if (cidrNum === 32) {
            usable = 1; // Special case for a single host route
        } else if (cidrNum === 31) {
            usable = 2; // Special case for point-to-point links
        } else {
            usable = total - 2;
        }

        return {
            totalHosts: total,
            usableHosts: Math.max(0, usable),
            subnetMask: cidrToMask(cidrNum),
        };
    }, [cidr]);

    const cidrOptions = useMemo(() => {
        return Array.from({ length: 33 }, (_, i) => {
            const cidrVal = 32 - i;
            return { value: cidrVal.toString(), label: `/${cidrVal}` };
        }).reverse();
    }, []);

    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <Card>
                <CardHeader>
                    <CardTitle>Host Count Calculator</CardTitle>
                    <CardDescription>Select a CIDR prefix to instantly see the number of hosts it supports.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="cidr-select">Network CIDR Prefix</Label>
                        <Select value={cidr} onValueChange={setCidr}>
                            <SelectTrigger id="cidr-select" className="w-full sm:w-[280px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {cidrOptions.map(option => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 text-center">
                        <div className="bg-muted p-6 rounded-lg">
                            <Users className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground">Total Hosts</p>
                            <p className="text-4xl font-bold">{totalHosts.toLocaleString()}</p>
                        </div>
                        <div className="bg-muted p-6 rounded-lg border-2 border-primary/50">
                            <Globe className="mx-auto h-8 w-8 text-primary mb-2" />
                            <p className="text-sm text-muted-foreground">Usable Hosts</p>
                            <p className="text-4xl font-bold text-primary">{usableHosts.toLocaleString()}</p>
                        </div>
                    </div>
                     <Alert>
                        <Lightbulb className="h-4 w-4" />
                        <AlertTitle>Corresponding Subnet Mask</AlertTitle>
                        <AlertDescription>
                            A /<span className="font-bold">{cidr}</span> prefix corresponds to the subnet mask: <code className="font-code bg-secondary p-1 rounded-sm">{subnetMask}</code>
                        </AlertDescription>
                    </Alert>
                </CardContent>
            </Card>
        </div>
    );
}
