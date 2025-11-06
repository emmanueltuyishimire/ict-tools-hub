'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Lightbulb, AlertCircle, Wand, AlertTriangle, BookOpen, ChevronRight, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

// --- IP Class Logic ---
const getIpClassDetails = (ip: string) => {
    if (!ip) {
        return {
            class: 'N/A',
            message: 'Enter an IP address to see its class.',
            details: null,
            isValid: false
        };
    }
    const parts = ip.split('.').map(part => parseInt(part, 10));
    if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) {
        return {
            class: 'Invalid',
            message: 'Invalid IPv4 address format. Please enter four numbers between 0 and 255, separated by dots.',
            details: null,
            isValid: false,
        };
    }

    const firstOctet = parts[0];
    let details;

    if (firstOctet >= 1 && firstOctet <= 126) {
        details = { class: 'A', range: '1.0.0.0 to 126.255.255.255', defaultMask: '255.0.0.0 (/8)', purpose: 'Very Large Networks' };
    } else if (firstOctet === 127) {
        details = { class: 'Loopback', range: '127.0.0.0 to 127.255.255.255', defaultMask: '255.0.0.0 (/8)', purpose: 'Host Self-Reference (e.g., localhost)' };
    } else if (firstOctet >= 128 && firstOctet <= 191) {
        details = { class: 'B', range: '128.0.0.0 to 191.255.255.255', defaultMask: '255.255.0.0 (/16)', purpose: 'Medium to Large Networks' };
    } else if (firstOctet >= 192 && firstOctet <= 223) {
        details = { class: 'C', range: '192.0.0.0 to 223.255.255.255', defaultMask: '255.255.255.0 (/24)', purpose: 'Small Local Area Networks (LANs)' };
    } else if (firstOctet >= 224 && firstOctet <= 239) {
        details = { class: 'D', range: '224.0.0.0 to 239.255.255.255', defaultMask: 'N/A', purpose: 'Multicast Traffic (e.g., streaming video to a group)' };
    } else if (firstOctet >= 240 && firstOctet <= 255) {
        details = { class: 'E', range: '240.0.0.0 to 255.255.255.255', defaultMask: 'N/A', purpose: 'Experimental and Reserved for Future Use' };
    } else { // Catches 0.x.x.x
        details = { class: 'Reserved', range: '0.0.0.0 to 0.255.255.255', defaultMask: 'N/A', purpose: 'Reserved for special use (e.g., default route)' };
    }
    
    return { ...details, isValid: true, message: `This is a Class ${details.class} address.` };
};

export function IpClassFinder() {
    const [ipAddress, setIpAddress] = useState('172.16.10.5');
    const result = useMemo(() => getIpClassDetails(ipAddress), [ipAddress]);

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>IP Class Finder</CardTitle>
                    <CardDescription>Enter any IPv4 address to instantly determine its class and default properties.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="ip-input">IP Address</Label>
                        <Input
                            id="ip-input"
                            type="text"
                            value={ipAddress}
                            onChange={(e) => setIpAddress(e.target.value)}
                            placeholder="e.g., 10.1.2.3"
                            className="font-code"
                            aria-label="IP Address Input"
                        />
                    </div>
                     {ipAddress.length > 0 && result && (
                         <Alert variant={result.isValid ? 'default' : 'destructive'} className={result.isValid ? 'border-blue-500/50' : ''}>
                             {result.isValid ? <CheckCircle className="h-4 w-4 text-blue-600" /> : <XCircle className="h-4 w-4" />}
                             <AlertTitle className={`font-bold ${result.isValid ? 'text-blue-700' : ''}`}>{result.class} Address</AlertTitle>
                             <AlertDescription>{result.message}</AlertDescription>
                         </Alert>
                     )}
                     
                     {result.isValid && result.details && (
                        <Card className="bg-muted/50">
                            <CardHeader>
                                <CardTitle className="text-lg">Class Properties</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableBody>
                                        <TableRow><TableHead className="font-semibold">Default Mask</TableHead><TableCell className="font-code">{result.details.defaultMask}</TableCell></TableRow>
                                        <TableRow><TableHead className="font-semibold">Address Range</TableHead><TableCell className="font-code">{result.details.range}</TableCell></TableRow>
                                        <TableRow><TableHead className="font-semibold">Primary Use</TableHead><TableCell>{result.details.purpose}</TableCell></TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                     )}
                </CardContent>
            </Card>
        </>
    );
}
