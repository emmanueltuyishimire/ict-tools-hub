'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Lightbulb, AlertCircle, Copy, Check, ListRestart } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// --- IP Math Logic ---
const ipToLong = (ip: string): number | null => {
    if (!/^\d{1,3}(\.\d{1,3}){3}$/.test(ip)) return null;
    const parts = ip.split('.').map(part => parseInt(part, 10));
    if (parts.some(p => isNaN(p) || p < 0 || p > 255)) return null;
    return (parts[0] * 16777216) + (parts[1] * 65536) + (parts[2] * 256) + parts[3];
};

const longToIp = (long: number): string => {
    if (long < 0) long += 4294967296;
    return `${(long >>> 24)}.${(long >> 16) & 255}.${(long >> 8) & 255}.${long & 255}`;
};

// --- Component ---
export function IpRangeGenerator() {
    const [mode, setMode] = useState<'cidr' | 'range'>('cidr');
    const [startIp, setStartIp] = useState('192.168.1.1');
    const [endIp, setEndIp] = useState('192.168.1.254');
    const [cidrIp, setCidrIp] = useState('10.10.0.0');
    const [cidr, setCidr] = useState('24');
    const [generatedIps, setGeneratedIps] = useState<string[]>([]);
    const [error, setError] = useState('');
    const [hasCopied, setHasCopied] = useState(false);
    const resultRef = useRef<HTMLDivElement>(null);
    const MAX_IPS = 65536; // Limit to a /16 network

    const handleGenerate = () => {
        setError('');
        setGeneratedIps([]);

        let startLong, endLong;
        if (mode === 'range') {
            startLong = ipToLong(startIp);
            endLong = ipToLong(endIp);
            if (startLong === null || endLong === null) {
                setError('Invalid Start or End IP address format.');
                return;
            }
            if (startLong > endLong) {
                setError('Start IP address must be lower than End IP address.');
                return;
            }
        } else { // CIDR mode
            const cidrNum = parseInt(cidr, 10);
            if (isNaN(cidrNum) || cidrNum < 0 || cidrNum > 32) {
                setError('Invalid CIDR prefix. Must be between 0 and 32.');
                return;
            }
            const baseIpLong = ipToLong(cidrIp);
            if (baseIpLong === null) {
                setError('Invalid CIDR Network IP address format.');
                return;
            }
            const mask = (0xFFFFFFFF << (32 - cidrNum)) >>> 0;
            const networkLong = baseIpLong & mask;
            
            const totalHosts = Math.pow(2, 32 - cidrNum);
            if (totalHosts > MAX_IPS) {
                 setError(`The selected CIDR prefix /${cidrNum} creates a range larger than the maximum allowed size of ${MAX_IPS.toLocaleString()} addresses. Please choose a larger CIDR prefix (e.g., /17 or higher).`);
                return;
            }
            const broadcastLong = networkLong + totalHosts - 1;
            startLong = totalHosts > 2 ? networkLong + 1 : networkLong;
            endLong = totalHosts > 2 ? broadcastLong - 1 : broadcastLong;
        }

        const count = endLong - startLong + 1;
        if (count > MAX_IPS) {
            setError(`The selected range is too large. The maximum number of IPs that can be generated is ${MAX_IPS.toLocaleString()}.`);
            return;
        }

        const ips = [];
        for (let i = startLong; i <= endLong; i++) {
            ips.push(longToIp(i));
        }
        setGeneratedIps(ips);
    };
    
     useEffect(() => {
        if (generatedIps.length > 0 && resultRef.current) {
            resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [generatedIps]);


    const handleCopyToClipboard = () => {
        if (generatedIps.length === 0) return;
        const textToCopy = generatedIps.join('\n');
        navigator.clipboard.writeText(textToCopy).then(() => {
            setHasCopied(true);
            setTimeout(() => setHasCopied(false), 2000);
        });
    };

    const cidrOptions = useMemo(() => {
        return Array.from({ length: 17 }, (_, i) => { // From /16 to /32
            const cidrVal = 32 - i;
            return { value: cidrVal.toString(), label: `/${cidrVal}` };
        }).reverse();
    }, []);

    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <Card>
                <CardHeader>
                    <CardTitle>IP Range Generator</CardTitle>
                    <CardDescription>Generate a list of IPs from a CIDR block or a specified start/end range.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs value={mode} onValueChange={(v) => setMode(v as any)} className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="cidr">From CIDR</TabsTrigger>
                            <TabsTrigger value="range">From Range</TabsTrigger>
                        </TabsList>
                        <TabsContent value="cidr" className="space-y-4 pt-4">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="space-y-2 sm:col-span-2">
                                    <Label htmlFor="cidr-ip">Network IP Address</Label>
                                    <Input id="cidr-ip" value={cidrIp} onChange={(e) => setCidrIp(e.target.value)} className="font-code" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cidr-prefix">CIDR Prefix</Label>
                                    <Select value={cidr} onValueChange={setCidr}>
                                        <SelectTrigger id="cidr-prefix"><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            {cidrOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="range" className="space-y-4 pt-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="start-ip">Start IP</Label>
                                    <Input id="start-ip" value={startIp} onChange={(e) => setStartIp(e.target.value)} className="font-code" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="end-ip">End IP</Label>
                                    <Input id="end-ip" value={endIp} onChange={(e) => setEndIp(e.target.value)} className="font-code" />
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                     <div className="flex flex-col sm:flex-row gap-2 mt-6">
                        <Button onClick={handleGenerate} className="w-full sm:w-auto">Generate IPs</Button>
                        <Button onClick={() => { setGeneratedIps([]); setError('')}} variant="outline" className="w-full sm:w-auto"><ListRestart className="mr-2 h-4 w-4" /> Reset</Button>
                     </div>
                      {error && (
                        <Alert variant="destructive" role="alert" className="mt-4">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                </CardContent>
            </Card>

            {generatedIps.length > 0 && (
                <div ref={resultRef}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Generated IP List</CardTitle>
                            <CardDescription>
                                A total of {generatedIps.length.toLocaleString()} IP addresses were generated.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                             <div className="relative">
                                <Textarea
                                    readOnly
                                    value={generatedIps.join('\n')}
                                    className="font-code h-64"
                                    aria-label="Generated IP Address List"
                                />
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="absolute right-2 top-2 h-8 w-8"
                                    onClick={handleCopyToClipboard}
                                    aria-label={hasCopied ? 'Copied' : 'Copy list'}
                                >
                                    {hasCopied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
