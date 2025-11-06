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
import { Lightbulb, AlertCircle, Wand, AlertTriangle, BookOpen, ChevronRight, Copy, Check } from 'lucide-react';
import Link from 'next/link';

// --- IP Math Logic (lightweight, no external library) ---
const longToIp = (long: number): string => {
    return `${(long >>> 24)}.${(long >> 16) & 255}.${(long >> 8) & 255}.${long & 255}`;
};

const ipToLong = (ip: string): number | null => {
    const parts = ip.split('.').map(part => parseInt(part, 10));
    if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) {
        return null;
    }
    return (parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3];
};

const cidrToMask = (cidr: number): string => {
    const mask = (0xFFFFFFFF << (32 - cidr)) >>> 0;
    return longToIp(mask);
};

// --- Subnet Calculator Component ---
export function SubnetCalculator() {
    const [ipAddress, setIpAddress] = useState('192.168.1.10');
    const [cidr, setCidr] = useState('24');
    const [error, setError] = useState('');
    const [results, setResults] = useState<any>(null);
    const resultRef = useRef<HTMLDivElement>(null);
    const [copiedKey, setCopiedKey] = useState<string | null>(null);

    useEffect(() => {
        if(results && resultRef.current) {
            resultRef.current.focus();
        }
    }, [results]);

    const handleCalculate = () => {
        setError('');
        setResults(null);
        
        const ipLong = ipToLong(ipAddress);
        if (ipLong === null) {
            setError('Invalid IPv4 address format. Please enter a valid IP.');
            return;
        }

        const cidrNum = parseInt(cidr, 10);
        if (isNaN(cidrNum) || cidrNum < 0 || cidrNum > 32) {
            setError('Invalid CIDR prefix. Must be a number between 0 and 32.');
            return;
        }

        const maskLong = (0xFFFFFFFF << (32 - cidrNum)) >>> 0;
        const networkLong = (ipLong & maskLong) >>> 0;
        const broadcastLong = (networkLong | ~maskLong) >>> 0;
        
        const totalHosts = Math.pow(2, 32 - cidrNum);
        let usableHosts = totalHosts - 2;

        if (cidrNum === 31) {
            usableHosts = 2;
        } else if (cidrNum === 32) {
            usableHosts = 1;
        }
        
        const firstHostLong = usableHosts > 0 && cidrNum < 31 ? networkLong + 1 : networkLong;
        const lastHostLong = usableHosts > 0 && cidrNum < 31 ? broadcastLong - 1 : broadcastLong;

        setResults({
            ip: ipAddress,
            cidr: cidrNum,
            subnetMask: longToIp(maskLong),
            wildcardMask: longToIp(~maskLong >>> 0),
            networkId: longToIp(networkLong),
            broadcastAddress: longToIp(broadcastLong),
            hostRange: usableHosts > 0 ? `${longToIp(firstHostLong)} - ${longToIp(lastHostLong)}` : 'N/A',
            totalHosts: totalHosts,
            usableHosts: Math.max(0, usableHosts),
            ipClass: getIpClass(ipLong),
            isPrivate: isPrivateIp(ipLong)
        });
    };

    const handleCopyToClipboard = (key: string, value: string) => {
        navigator.clipboard.writeText(value).then(() => {
            setCopiedKey(key);
            setTimeout(() => setCopiedKey(null), 2000);
        });
    };

    const getIpClass = (ipLong: number) => {
        const firstOctet = (ipLong >>> 24);
        if (firstOctet >= 1 && firstOctet <= 126) return 'A';
        if (firstOctet >= 128 && firstOctet <= 191) return 'B';
        if (firstOctet >= 192 && firstOctet <= 223) return 'C';
        if (firstOctet >= 224 && firstOctet <= 239) return 'D (Multicast)';
        if (firstOctet >= 240 && firstOctet <= 255) return 'E (Experimental)';
        return 'N/A';
    };

    const isPrivateIp = (ipLong: number) => {
        const o1 = (ipLong >>> 24);
        const o2 = (ipLong >> 16) & 255;
        if (o1 === 10) return true;
        if (o1 === 172 && (o2 >= 16 && o2 <= 31)) return true;
        if (o1 === 192 && o2 === 168) return true;
        return false;
    };
    
    const subnetMaskOptions = useMemo(() => {
        return Array.from({ length: 33 }, (_, i) => {
            const cidr = 32 - i;
            const mask = cidrToMask(cidr);
            return {
                value: cidr.toString(),
                label: `/${cidr} (${mask})`,
            };
        }).reverse();
    }, []);

    const renderResultRow = (label: string, key: string, value: any) => {
        if (value === undefined || value === null) return null;
        
        const displayValue = typeof value === 'number' ? value.toLocaleString() : value.toString();
        
        return (
            <TableRow key={key}>
                <TableHead className="font-semibold w-[180px]">{label}</TableHead>
                <TableCell className="font-code">
                    <div className="flex items-center justify-between gap-2">
                        <span>{displayValue}</span>
                        <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7"
                            onClick={() => handleCopyToClipboard(key, displayValue)}
                            aria-label={`Copy ${label}`}
                        >
                            {copiedKey === key ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                        </Button>
                    </div>
                </TableCell>
            </TableRow>
        );
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Subnet Calculator</CardTitle>
                    <CardDescription>
                        Enter an IPv4 address and a subnet mask to calculate all relevant network information.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor="ip-address">IP Address</Label>
                            <Input
                                id="ip-address"
                                value={ipAddress}
                                onChange={(e) => setIpAddress(e.target.value)}
                                placeholder="e.g., 192.168.1.10"
                                className="font-code"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cidr-select">Subnet Mask (CIDR)</Label>
                             <Select value={cidr} onValueChange={setCidr}>
                                <SelectTrigger id="cidr-select">
                                    <SelectValue placeholder="Select a subnet mask" />
                                </SelectTrigger>
                                <SelectContent>
                                    {subnetMaskOptions.map(option => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <Button onClick={handleCalculate} className="w-full sm:w-auto">Calculate</Button>
                    {error && (
                        <Alert variant="destructive" role="alert">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                </CardContent>
            </Card>
            
            {results && (
                 <div ref={resultRef} tabIndex={-1} aria-live="polite">
                    <Card>
                        <CardHeader>
                            <CardTitle>Subnet Calculation Results</CardTitle>
                            <CardDescription>
                                Detailed network information for {results.ip}/{results.cidr}.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                             <Table>
                                <TableBody>
                                    {renderResultRow('Network ID', 'networkId', results.networkId)}
                                    {renderResultRow('Broadcast Address', 'broadcastAddress', results.broadcastAddress)}
                                    {renderResultRow('Usable Host Range', 'hostRange', results.hostRange)}
                                    {renderResultRow('Total Hosts', 'totalHosts', results.totalHosts)}
                                    {renderResultRow('Usable Hosts', 'usableHosts', results.usableHosts)}
                                    {renderResultRow('Subnet Mask', 'subnetMask', results.subnetMask)}
                                    {renderResultRow('Wildcard Mask', 'wildcardMask', results.wildcardMask)}
                                    {renderResultRow('IP Class', 'ipClass', results.ipClass)}
                                    {renderResultRow('Private IP?', 'isPrivate', results.isPrivate ? 'Yes (RFC1918)' : 'No')}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
