
'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Lightbulb, AlertCircle, Wand, AlertTriangle, BookOpen, ChevronRight, Copy, Check, Binary, Network, ListTree } from 'lucide-react';
import Link from 'next/link';

const ipToLong = (ip: string): number | null => {
    const parts = ip.split('.').map(part => parseInt(part, 10));
    if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) return null;
    return (parts[0] * 16777216) + (parts[1] * 65536) + (parts[2] * 256) + parts[3];
};

const longToIp = (long: number): string => {
    if (long < 0) long += 4294967296;
    return `${(long >>> 24)}.${(long >> 16) & 255}.${(long >> 8) & 255}.${long & 255}`;
};

type SubnetResult = {
    networkId: string;
    hostRange: string;
    broadcastId: string;
};

export function CidrToSubnetListGenerator() {
    const [majorNetwork, setMajorNetwork] = useState('192.168.0.0');
    const [originalCidr, setOriginalCidr] = useState('24');
    const [newCidr, setNewCidr] = useState('27');
    const [results, setResults<{ summary: any, subnets: SubnetResult[] } | null>(null);
    const [error, setError] = useState('');
    const resultRef = useRef<HTMLDivElement>(null);
    const [copiedKey, setCopiedKey] = useState<string | null>(null);

    const handleCalculate = () => {
        setError('');
        setResults(null);

        const baseIpLong = ipToLong(majorNetwork);
        if (baseIpLong === null) {
            setError('Invalid Major Network IP address format.');
            return;
        }

        const originalCidrNum = parseInt(originalCidr, 10);
        const newCidrNum = parseInt(newCidr, 10);

        if (isNaN(originalCidrNum) || originalCidrNum < 0 || originalCidrNum > 32 || isNaN(newCidrNum) || newCidrNum < 0 || newCidrNum > 32) {
            setError('Invalid CIDR prefix. Both must be between 0 and 32.');
            return;
        }
        
        if (newCidrNum <= originalCidrNum) {
            setError('New Subnet CIDR must be larger than the Original Network CIDR to create smaller subnets.');
            return;
        }

        const originalMask = (0xFFFFFFFF << (32 - originalCidrNum)) >>> 0;
        const networkStart = baseIpLong & originalMask;

        const bitsBorrowed = newCidrNum - originalCidrNum;
        const numberOfSubnets = Math.pow(2, bitsBorrowed);
        
        if (numberOfSubnets > 4096) {
             setError(`This operation would create ${numberOfSubnets.toLocaleString()} subnets, which is more than the tool's limit of 4,096. Please choose a smaller New Subnet CIDR.`);
            return;
        }
        
        const newSubnetSize = Math.pow(2, 32 - newCidrNum);
        const usableHosts = newSubnetSize > 2 ? newSubnetSize - 2 : (newSubnetSize === 2 ? 2 : 0);

        const subnets: SubnetResult[] = [];
        for (let i = 0; i < numberOfSubnets; i++) {
            const currentNetworkId = networkStart + (i * newSubnetSize);
            const currentBroadcastId = currentNetworkId + newSubnetSize - 1;
            
            subnets.push({
                networkId: longToIp(currentNetworkId),
                hostRange: usableHosts > 0 ? `${longToIp(currentNetworkId + 1)} - ${longToIp(currentBroadcastId - 1)}` : 'N/A',
                broadcastId: longToIp(currentBroadcastId),
            });
        }
        
        setResults({
            summary: {
                numberOfSubnets,
                usableHosts,
                newSubnetCidr: newCidrNum
            },
            subnets,
        });
    };
    
    useEffect(() => {
        if(results && resultRef.current) {
            resultRef.current.focus();
        }
    }, [results]);

    const cidrOptions = (min: number) => Array.from({ length: 33-min }, (_, i) => ({ value: (i + min).toString(), label: `/${i + min}` }));

    return (
        <div className="max-w-5xl mx-auto space-y-12">
            <Card>
                <CardHeader>
                    <CardTitle>CIDR to Subnet List Generator</CardTitle>
                    <CardDescription>Divide a large network into multiple smaller, equal-sized subnets (FLSM).</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border p-4 rounded-lg">
                        <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor="major-network">Original Network Address</Label>
                            <Input id="major-network" value={majorNetwork} onChange={(e) => setMajorNetwork(e.target.value)} className="font-code" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="original-cidr">Original CIDR</Label>
                            <Select value={originalCidr} onValueChange={setOriginalCidr}>
                                <SelectTrigger id="original-cidr"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    {cidrOptions(0).map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-2 sm:col-span-1">
                            <Label htmlFor="new-cidr">New Subnet CIDR</Label>
                            <Select value={newCidr} onValueChange={setNewCidr}>
                                <SelectTrigger id="new-cidr"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                     {cidrOptions(parseInt(originalCidr,10)+1).map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <Button onClick={handleCalculate} className="w-full sm:w-auto"><ListTree className="mr-2 h-4 w-4" /> Generate Subnet List</Button>
                    {error && (
                        <Alert variant="destructive" role="alert">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Calculation Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                </CardContent>
            </Card>

             {results && (
                 <div ref={resultRef} tabIndex={-1} aria-live="polite">
                    <Card>
                        <CardHeader>
                            <CardTitle>Generated Subnet List</CardTitle>
                            <CardDescription>
                                Your <strong>{majorNetwork}/{originalCidr}</strong> network has been divided into <strong>{results.summary.numberOfSubnets.toLocaleString()}</strong> subnets of size <strong>/{results.summary.newSubnetCidr}</strong>, each with <strong>{results.summary.usableHosts.toLocaleString()}</strong> usable host addresses.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>#</TableHead>
                                            <TableHead>Network ID</TableHead>
                                            <TableHead>Usable Host Range</TableHead>
                                            <TableHead>Broadcast Address</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {results.subnets.map((subnet, i) => (
                                            <TableRow key={i}>
                                                <TableCell className="font-medium">{i + 1}</TableCell>
                                                <TableCell className="font-code">{subnet.networkId}</TableCell>
                                                <TableCell className="font-code">{subnet.hostRange}</TableCell>
                                                <TableCell className="font-code">{subnet.broadcastId}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}

    