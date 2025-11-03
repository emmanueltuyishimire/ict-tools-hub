
'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { StructuredData } from '@/components/structured-data';
import { Lightbulb, AlertCircle, Wand, AlertTriangle, BookOpen, ChevronRight, Copy, Check, Binary, Network, Combine, ListRestart, Trash2, Plus } from 'lucide-react';
import Link from 'next/link';
import { Textarea } from '@/components/ui/textarea';

const ipToLong = (ip: string): number | null => {
    const parts = ip.split('.').map(part => parseInt(part, 10));
    if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) return null;
    return (parts[0] * 16777216) + (parts[1] * 65536) + (parts[2] * 256) + parts[3];
};

const longToIp = (long: number): string => {
    if (long < 0) long += 4294967296;
    return `${(long >>> 24)}.${(long >> 16) & 255}.${(long >> 8) & 255}.${long & 255}`;
};

const findNeededCidr = (hosts: number): number => {
    const requiredBits = Math.ceil(Math.log2(hosts + 2));
    return 32 - requiredBits;
};

type SubnetRequest = { id: number; name: string; hosts: number | '' };
type CalculatedSubnet = {
    name: string;
    hosts_needed: number;
    hosts_found: number;
    cidr: number;
    network_id: string;
    host_range: string;
    broadcast_id: string;
    subnet_mask: string;
};

export function VlsmCalculator() {
    const [majorNetwork, setMajorNetwork] = useState('192.168.0.0');
    const [majorCidr, setMajorCidr] = useState('24');
    const [subnetRequests, setSubnetRequests] = useState<SubnetRequest[]>([
        { id: 1, name: 'LAN A (Staff)', hosts: 55 },
        { id: 2, name: 'LAN B (Servers)', hosts: 20 },
        { id: 3, name: 'LAN C (Guests)', hosts: 12 },
        { id: 4, name: 'WAN Link 1', hosts: 2 },
    ]);
    const [results, setResults] = useState<{ allocated: CalculatedSubnet[], unallocated: any[] } | null>(null);
    const [error, setError] = useState('');
    const resultRef = useRef<HTMLDivElement>(null);
    const [copiedKey, setCopiedKey] = useState<string | null>(null);
    let nextId = 5;

    const handleCalculate = () => {
        setError('');
        setResults(null);

        const baseIpLong = ipToLong(majorNetwork);
        if (baseIpLong === null) {
            setError('Invalid Major Network IP address format.');
            return;
        }

        const cidrNum = parseInt(majorCidr, 10);
        if (isNaN(cidrNum) || cidrNum < 0 || cidrNum > 32) {
            setError('Invalid Major Network CIDR prefix.');
            return;
        }
        
        const mask = (0xFFFFFFFF << (32 - cidrNum)) >>> 0;
        if ((baseIpLong & mask) !== baseIpLong) {
            setError(`The IP ${majorNetwork} is not the network address for a /${cidrNum} network. Use ${longToIp(baseIpLong & mask)} instead.`);
            return;
        }

        const sortedRequests = [...subnetRequests]
            .filter(req => req.hosts && req.hosts > 0)
            .sort((a, b) => (b.hosts as number) - (a.hosts as number));
        
        if (sortedRequests.length === 0) {
            setError('Please define at least one subnet with required hosts.');
            return;
        }

        const allocated: CalculatedSubnet[] = [];
        let currentIp = baseIpLong;
        const endIp = currentIp + Math.pow(2, 32 - cidrNum);
        
        for (const req of sortedRequests) {
            const hostsNeeded = req.hosts as number;
            const requiredCidr = findNeededCidr(hostsNeeded);
            const subnetSize = Math.pow(2, 32 - requiredCidr);

            if (currentIp + subnetSize > endIp) {
                setError(`Address space exhausted. Cannot allocate a /${requiredCidr} subnet for "${req.name}".`);
                setResults({ allocated, unallocated: [] });
                return;
            }

            const networkId = currentIp;
            const broadcastId = currentIp + subnetSize - 1;
            
            allocated.push({
                name: req.name,
                hosts_needed: hostsNeeded,
                hosts_found: subnetSize > 2 ? subnetSize - 2 : (subnetSize === 2 ? 2 : 0),
                cidr: requiredCidr,
                network_id: longToIp(networkId),
                host_range: subnetSize > 1 ? `${longToIp(networkId + 1)} - ${longToIp(broadcastId - 1)}` : (subnetSize === 1 ? longToIp(networkId) : 'N/A'),
                broadcast_id: longToIp(broadcastId),
                subnet_mask: longToIp((0xFFFFFFFF << (32 - requiredCidr)) >>> 0),
            });

            currentIp += subnetSize;
        }
        
        const unallocated = [];
        if (currentIp < endIp) {
            unallocated.push({
                start: longToIp(currentIp),
                end: longToIp(endIp - 1),
                size: endIp - currentIp,
            })
        }

        setResults({ allocated, unallocated });
    };
    
    useEffect(() => {
        if(results && resultRef.current) {
            resultRef.current.focus();
        }
    }, [results]);

    const handleAddSubnet = () => {
        setSubnetRequests([...subnetRequests, { id: nextId++, name: '', hosts: '' }]);
    };
    
    const handleRemoveSubnet = (id: number) => {
        setSubnetRequests(subnetRequests.filter(req => req.id !== id));
    };

    const handleSubnetChange = (id: number, field: 'name' | 'hosts', value: string) => {
        const newRequests = subnetRequests.map(req => {
            if (req.id === id) {
                return { ...req, [field]: field === 'hosts' ? (value === '' ? '' : parseInt(value, 10)) : value };
            }
            return req;
        });
        setSubnetRequests(newRequests);
    };

    const handleCopyToClipboard = (key: string, value: string) => {
        navigator.clipboard.writeText(value).then(() => {
            setCopiedKey(key);
            setTimeout(() => setCopiedKey(null), 2000);
        });
    };

    const cidrOptions = Array.from({ length: 31 }, (_, i) => ({ value: (i).toString(), label: `/${i}` })).reverse();


    return (
        <div className="max-w-5xl mx-auto space-y-12">
             <Card>
                <CardHeader>
                    <CardTitle>VLSM Calculator</CardTitle>
                    <CardDescription>
                        Define your major network and subnet requirements to generate an efficient IP addressing plan.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border p-4 rounded-lg">
                         <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor="major-network">Major Network Address</Label>
                            <Input
                                id="major-network"
                                value={majorNetwork}
                                onChange={(e) => setMajorNetwork(e.target.value)}
                                placeholder="e.g., 10.0.0.0"
                                className="font-code"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="major-cidr">Major Network CIDR</Label>
                             <Select value={majorCidr} onValueChange={setMajorCidr}>
                                <SelectTrigger id="major-cidr"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    {cidrOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className='space-y-4'>
                        <Label>Subnet Requirements</Label>
                        {subnetRequests.map((req, index) => (
                            <div key={req.id} className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                                <div className="sm:col-span-6">
                                     <Input
                                        value={req.name}
                                        onChange={(e) => handleSubnetChange(req.id, 'name', e.target.value)}
                                        placeholder={`Subnet ${index + 1} Name (e.g., Finance Dept)`}
                                    />
                                </div>
                                <div className="sm:col-span-5">
                                    <Input
                                        type="number"
                                        value={req.hosts}
                                        onChange={(e) => handleSubnetChange(req.id, 'hosts', e.target.value)}
                                        placeholder="Required Hosts (e.g., 25)"
                                    />
                                </div>
                                 <div className="sm:col-span-1">
                                    <Button size="icon" variant="ghost" onClick={() => handleRemoveSubnet(req.id)} aria-label="Remove Subnet">
                                        <Trash2 className="h-4 w-4 text-destructive"/>
                                    </Button>
                                </div>
                            </div>
                        ))}
                         <Button variant="outline" size="sm" onClick={handleAddSubnet}><Plus className="mr-2 h-4 w-4" /> Add Subnet</Button>
                    </div>

                    <Button onClick={handleCalculate} className="w-full sm:w-auto"><Network className="mr-2 h-4 w-4" /> Design Network</Button>
                    
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
                            <CardTitle>VLSM Allocation Plan</CardTitle>
                            <CardDescription>
                                The following IP address plan has been generated based on your requirements.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                             <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Subnet Name</TableHead>
                                            <TableHead className='text-right'>Hosts Needed</TableHead>
                                            <TableHead className='text-right'>Hosts Found</TableHead>
                                            <TableHead>Network ID</TableHead>
                                            <TableHead>Usable Range</TableHead>
                                            <TableHead>Broadcast ID</TableHead>
                                            <TableHead>Mask</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {results.allocated.map((subnet, i) => (
                                            <TableRow key={i}>
                                                <TableCell className="font-medium">{subnet.name}</TableCell>
                                                <TableCell className='text-right'>{subnet.hosts_needed}</TableCell>
                                                <TableCell className='text-right'>{subnet.hosts_found}</TableCell>
                                                <TableCell className="font-code">{subnet.network_id}/{subnet.cidr}</TableCell>
                                                <TableCell className="font-code">{subnet.host_range}</TableCell>
                                                <TableCell className="font-code">{subnet.broadcast_id}</TableCell>
                                                <TableCell className="font-code">{subnet.subnet_mask}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                             </div>
                              {results.unallocated.length > 0 && (
                                <div className="mt-6">
                                    <h4 className="font-bold mb-2">Unallocated Address Space</h4>
                                    {results.unallocated.map((block, i) => (
                                        <Alert key={i}>
                                            <Lightbulb className="h-4 w-4" />
                                            <AlertTitle>Available for Future Use</AlertTitle>
                                            <AlertDescription>
                                                The range <code className="font-code bg-muted p-1 rounded-sm">{block.start} - {block.end}</code> ({block.size} addresses) remains unallocated.
                                            </AlertDescription>
                                        </Alert>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
