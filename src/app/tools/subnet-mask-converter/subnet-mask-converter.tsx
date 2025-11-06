
'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { AlertCircle, Copy, Check } from 'lucide-react';

// --- IP Math Logic ---
const longToIp = (long: number): string => {
    if (long < 0) long += 4294967296; // Handle negative numbers from bitwise operations
    return `${(long >>> 24)}.${(long >> 16) & 255}.${(long >> 8) & 255}.${long & 255}`;
};

const ipToLong = (ip: string): number | null => {
    const parts = ip.split('.').map(part => parseInt(part, 10));
    if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) {
        return null;
    }
    return (parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3];
};

const cidrToMaskLong = (cidr: number): number => {
    return (0xFFFFFFFF << (32 - cidr)) >>> 0;
};

const maskLongToCidr = (mask: number): number => {
    let cidr = 0;
    // Handle the case of 0.0.0.0
    if (mask === 0) return 0;
    let bit = (mask >>> 0).toString(2);
    for (let i = 0; i < bit.length; i++) {
        if (bit[i] === '1') {
            cidr++;
        }
    }
    return cidr;
};

const isValidMask = (mask: string): boolean => {
    const maskLong = ipToLong(mask);
    if (maskLong === null) return false;
    const maskBinary = (maskLong >>> 0).toString(2).padStart(32, '0');
    // Check if it's a contiguous block of 1s followed by 0s
    return /^1*0*$/.test(maskBinary);
}

// --- Component ---
export function SubnetMaskConverter() {
    const [inputType, setInputType] = useState<'cidr' | 'subnet' | 'wildcard'>('cidr');
    const [inputValue, setInputValue] = useState('24');
    const [results, setResults] = useState<any>(null);
    const [error, setError] = useState('');
    const [copiedKey, setCopiedKey] = useState<string | null>(null);
    const resultRef = useRef<HTMLDivElement>(null);

    const cidrOptions = useMemo(() => {
        return Array.from({ length: 33 }, (_, i) => {
            const cidr = 32 - i;
            return { value: cidr.toString(), label: `/${cidr}` };
        }).reverse();
    }, []);

    const handleConversion = useCallback((type: string, value: string) => {
        setError('');
        setResults(null);
        let maskLong: number | null;

        try {
            if (type === 'cidr') {
                const cidr = parseInt(value, 10);
                if (isNaN(cidr) || cidr < 0 || cidr > 32) {
                    setError('Invalid CIDR. Must be between 0 and 32.');
                    return;
                }
                maskLong = cidrToMaskLong(cidr);
            } else if (type === 'subnet') {
                if (!isValidMask(value)) {
                    setError('Invalid Subnet Mask. Bits must be contiguous.');
                    return;
                }
                maskLong = ipToLong(value);
            } else if (type === 'wildcard') {
                const longVal = ipToLong(value);
                 if (longVal === null || !isValidMask(longToIp(~longVal >>> 0))) {
                     setError('Invalid Wildcard Mask. Bits must form a valid inverse mask.');
                    return;
                }
                maskLong = ~longVal;
            } else {
                return;
            }

            if (maskLong === null) {
                setError('Invalid input value.');
                return;
            }
            
            const currentCidr = maskLongToCidr(maskLong);
            const totalHosts = Math.pow(2, 32 - currentCidr);
            let usableHosts = totalHosts - 2;
            if (currentCidr === 31) usableHosts = 2;
            if (currentCidr === 32) usableHosts = 1;
            
            setResults({
                cidr: currentCidr,
                subnetMask: longToIp(maskLong),
                wildcardMask: longToIp(~maskLong >>> 0),
                binaryMask: (maskLong >>> 0).toString(2).padStart(32, '0').match(/.{1,8}/g)!.join('.'),
                totalHosts: totalHosts,
                usableHosts: Math.max(0, usableHosts),
            });

        } catch (e) {
            setError('An unexpected error occurred during conversion.');
        }
    }, []);
    
    // Auto-update on change
    useEffect(() => {
        handleConversion(inputType, inputValue);
        if (results && resultRef.current) {
            resultRef.current.focus();
        }
    }, [inputType, inputValue, results, handleConversion]);

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
                    <CardTitle>Subnet Mask Converter</CardTitle>
                    <CardDescription>Instantly convert between CIDR, Subnet Mask, and Wildcard Mask formats.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                        <div className="space-y-2">
                            <Label htmlFor="input-type">Input Type</Label>
                            <Select value={inputType} onValueChange={(v) => { setInputType(v as any); setInputValue(v === 'cidr' ? '24' : v === 'subnet' ? '255.255.255.0' : '0.0.0.255') }}>
                                <SelectTrigger id="input-type"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="cidr">CIDR Prefix</SelectItem>
                                    <SelectItem value="subnet">Subnet Mask</SelectItem>
                                    <SelectItem value="wildcard">Wildcard Mask</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor="input-value">Value</Label>
                            {inputType === 'cidr' ? (
                                <Select value={inputValue} onValueChange={setInputValue}>
                                    <SelectTrigger id="input-value"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        {cidrOptions.map(option => (
                                            <SelectItem key={option.value} value={option.value}>{option.label} ({longToIp(cidrToMaskLong(parseInt(option.value)))})</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            ) : (
                                <Input
                                    id="input-value"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder={inputType === 'subnet' ? 'e.g., 255.255.255.0' : 'e.g., 0.0.0.255'}
                                    className="font-code"
                                />
                            )}
                        </div>
                    </div>
                     {error && (
                        <Alert variant="destructive" role="alert">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                </CardContent>
            </Card>

            {results && !error && (
                <div ref={resultRef} tabIndex={-1} aria-live="polite">
                    <Card>
                        <CardHeader>
                            <CardTitle>Conversion Results</CardTitle>
                            <CardDescription>All formats and information related to your input.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableBody>
                                    {renderResultRow('CIDR Prefix', 'cidr', `/${results.cidr}`)}
                                    {renderResultRow('Subnet Mask', 'subnetMask', results.subnetMask)}
                                    {renderResultRow('Wildcard Mask', 'wildcardMask', results.wildcardMask)}
                                    {renderResultRow('Binary Mask', 'binaryMask', results.binaryMask)}
                                    {renderResultRow('Total Hosts', 'totalHosts', results.totalHosts)}
                                    {renderResultRow('Usable Hosts', 'usableHosts', results.usableHosts)}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
