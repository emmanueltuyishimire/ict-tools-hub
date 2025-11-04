'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { AlertCircle, Copy, Check, Combine, ListRestart } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

const ipToLong = (ip: string): number | null => {
    const parts = ip.split('.').map(part => parseInt(part, 10));
    if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) return null;
    return (parts[0] << 24 | parts[1] << 16 | parts[2] << 8 | parts[3]) >>> 0;
};

const longToIp = (long: number): string => {
    return `${(long >>> 24)}.${(long >> 16) & 255}.${(long >> 8) & 255}.${long & 255}`;
};

export function IpSummarizationTool() {
    const [networkList, setNetworkList] = useState('192.168.0.0/24\n192.168.1.0/24\n192.168.2.0/24\n192.168.3.0/24');
    const [results, setResults] = useState<any>(null);
    const [error, setError] = useState('');
    const resultRef = useRef<HTMLDivElement>(null);
    const [copiedKey, setCopiedKey] = useState<string | null>(null);

    const handleCalculate = () => {
        setError('');
        setResults(null);

        const lines = networkList.trim().split('\n').filter(line => line.trim() !== '');
        if (lines.length < 2) {
            setError('Please enter at least two networks to summarize.');
            return;
        }

        const networks = lines.map(line => {
            const [ip, cidrStr] = line.split('/');
            if (!ip || !cidrStr) return null;
            const cidr = parseInt(cidrStr, 10);
            const ipLong = ipToLong(ip);
            if (ipLong === null || isNaN(cidr) || cidr < 0 || cidr > 32) return null;

            const mask = (0xFFFFFFFF << (32 - cidr)) >>> 0;
            const networkAddress = ipLong & mask;
            const broadcastAddress = networkAddress | ~mask;

            return { networkAddress, broadcastAddress };
        });

        if (networks.some(n => n === null)) {
            setError('One or more networks are in an invalid CIDR format. Please check your input.');
            return;
        }

        const validNetworks = networks as { networkAddress: number, broadcastAddress: number }[];
        
        const minIp = Math.min(...validNetworks.map(n => n.networkAddress));
        const maxIp = Math.max(...validNetworks.map(n => n.broadcastAddress));

        if (minIp === maxIp) { // This case shouldn't happen with CIDR < 32 but as a safeguard.
            setResults({
                summaryRoute: `${longToIp(minIp)}/32`,
                networkAddress: longToIp(minIp),
                cidr: 32,
                firstIp: longToIp(minIp),
                lastIp: longToIp(minIp),
                totalHosts: 1,
                subnetMask: '255.255.255.255',
                wildcardMask: '0.0.0.0'
            });
            return;
        }

        let summaryCidr = 32;
        while (summaryCidr > 0) {
            const mask = (0xFFFFFFFF << (32 - (summaryCidr - 1))) >>> 0;
            const networkStart = minIp & mask;
            const broadcastEnd = networkStart | ~mask;

            if (minIp >= networkStart && maxIp <= broadcastEnd) {
                summaryCidr--;
            } else {
                break;
            }
        }
        
        const finalMask = (0xFFFFFFFF << (32 - summaryCidr)) >>> 0;
        const finalNetworkAddress = minIp & finalMask;
        
        const totalHosts = Math.pow(2, 32 - summaryCidr);

        setResults({
            summaryRoute: `${longToIp(finalNetworkAddress)}/${summaryCidr}`,
            networkAddress: longToIp(finalNetworkAddress),
            cidr: summaryCidr,
            firstIp: longToIp(finalNetworkAddress),
            lastIp: longToIp(finalNetworkAddress + totalHosts - 1),
            totalHosts: totalHosts,
            subnetMask: longToIp(finalMask),
            wildcardMask: longToIp(~finalMask >>> 0),
        });
    };

    useEffect(() => {
        if(results && resultRef.current) {
            resultRef.current.focus();
        }
    }, [results]);

    const handleCopyToClipboard = (key: string, value: string) => {
        navigator.clipboard.writeText(value).then(() => {
            setCopiedKey(key);
            setTimeout(() => setCopiedKey(null), 2000);
        });
    };

    const renderResultRow = (label: string, key: string, value: any) => {
        if (value === undefined || value === null) return null;
        const displayValue = typeof value === 'number' ? value.toLocaleString() : value.toString();
        return (
            <TableRow key={key}>
                <TableHead className="font-semibold w-[180px]">{label}</TableHead>
                <TableCell className="font-code">
                    <div className="flex items-center justify-between gap-2">
                        <span>{displayValue}</span>
                        <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => handleCopyToClipboard(key, displayValue)} aria-label={`Copy ${label}`}>
                            {copiedKey === key ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                        </Button>
                    </div>
                </TableCell>
            </TableRow>
        );
    };

    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <Card>
                <CardHeader>
                    <CardTitle>IP Summarization Tool</CardTitle>
                    <CardDescription>Enter a list of IP networks (one per line) to calculate the summary route.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="network-list">Networks (one per line in CIDR format)</Label>
                        <Textarea
                            id="network-list"
                            value={networkList}
                            onChange={(e) => setNetworkList(e.target.value)}
                            className="font-code h-40"
                            placeholder="e.g.,&#10;192.168.0.0/24&#10;192.168.1.0/24"
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <Button onClick={handleCalculate} className="w-full sm:w-auto"><Combine className="mr-2 h-4 w-4" /> Summarize Routes</Button>
                        <Button onClick={() => { setNetworkList(''); setResults(null); setError(''); }} variant="outline" className="w-full sm:w-auto"><ListRestart className="mr-2 h-4 w-4" /> Clear</Button>
                    </div>
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
                            <CardTitle>Summarization Results</CardTitle>
                            <CardDescription>The optimal summary route for the provided networks.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableBody>
                                    {renderResultRow('Summary Route', 'summaryRoute', results.summaryRoute)}
                                    {renderResultRow('Network Address', 'networkAddress', results.networkAddress)}
                                    {renderResultRow('Address Range', 'range', `${results.firstIp} - ${results.lastIp}`)}
                                    {renderResultRow('Total Hosts', 'totalHosts', results.totalHosts)}
                                    {renderResultRow('Subnet Mask', 'subnetMask', results.subnetMask)}
                                    {renderResultRow('Wildcard Mask', 'wildcardMask', results.wildcardMask)}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
