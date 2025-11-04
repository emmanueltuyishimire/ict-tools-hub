
'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Lightbulb, AlertCircle, Wand, AlertTriangle, BookOpen, ChevronRight, Copy, Check, Binary, Network, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// --- IP Math Logic ---
const longToIp = (long: number): string => {
    if (long < 0) long += 4294967296; // Handle negative numbers from bitwise NOT
    return `${(long >>> 24)}.${(long >> 16) & 255}.${(long >> 8) & 255}.${long & 255}`;
};

const cidrToMaskLong = (cidr: number): number => {
    if (cidr === 0) return 0;
    return (0xFFFFFFFF << (32 - cidr)) >>> 0;
};

// --- Component ---
export function CidrToWildcardConverter() {
    const [cidr, setCidr] = useState('24');
    const [copiedKey, setCopiedKey] = useState<string | null>(null);

    const results = useMemo(() => {
        const cidrNum = parseInt(cidr, 10);
        if (isNaN(cidrNum) || cidrNum < 0 || cidrNum > 32) {
            return null;
        }
        
        const maskLong = cidrToMaskLong(cidrNum);
        const wildcardLong = ~maskLong;

        return {
            cidr: cidrNum,
            subnetMask: longToIp(maskLong),
            wildcardMask: longToIp(wildcardLong),
            binarySubnet: (maskLong >>> 0).toString(2).padStart(32, '0').match(/.{1,8}/g)!.join('.'),
            binaryWildcard: (wildcardLong >>> 0).toString(2).padStart(32, '0').match(/.{1,8}/g)!.join('.'),
        }
    }, [cidr]);

    const handleCopyToClipboard = (key: string, value: string) => {
        if (!value) return;
        navigator.clipboard.writeText(value).then(() => {
            setCopiedKey(key);
            setTimeout(() => setCopiedKey(null), 2000);
        });
    };

    const cidrOptions = useMemo(() => {
        return Array.from({ length: 33 }, (_, i) => {
            const cidrVal = 32 - i;
            return { value: cidrVal.toString(), label: `/${cidrVal}` };
        }).reverse();
    }, []);

    const renderResultRow = (label: string, key: string, value: any) => {
        if (value === undefined || value === null) return null;
        const displayValue = value.toString();
        return (
            <TableRow key={key}>
                <TableHead className="font-semibold w-[150px]">{label}</TableHead>
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
                    <CardTitle>CIDR to Wildcard Mask Converter</CardTitle>
                    <CardDescription>Instantly convert a CIDR prefix to its corresponding subnet mask and wildcard mask formats.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="cidr-select">CIDR Prefix</Label>
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

                    {results && (
                        <Card className="bg-muted/50">
                            <CardHeader>
                                <CardTitle className="text-lg">Conversion Results</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableBody>
                                        {renderResultRow('Subnet Mask', 'subnetMask', results.subnetMask)}
                                        {renderResultRow('Wildcard Mask', 'wildcardMask', results.wildcardMask)}
                                        {renderResultRow('Binary Subnet', 'binarySubnet', results.binarySubnet)}
                                        {renderResultRow('Binary Wildcard', 'binaryWildcard', results.binaryWildcard)}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

    