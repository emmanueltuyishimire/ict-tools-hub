'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { Lightbulb, AlertTriangle, BookOpen, Globe, CheckCircle, XCircle } from 'lucide-react';

// --- IP Logic ---
const ipToLong = (ip: string): number | null => {
    if (!/^\d{1,3}(\.\d{1,3}){3}$/.test(ip)) return null;
    const parts = ip.split('.').map(part => parseInt(part, 10));
    if (parts.some(p => isNaN(p) || p < 0 || p > 255)) return null;
    return (parts[0] * 16777216) + (parts[1] * 65536) + (parts[2] * 256) + parts[3];
};

const checkIpPrivacy = (ip: string) => {
    const ipLong = ipToLong(ip);
    if (ipLong === null) {
        return { type: 'Invalid', message: 'Invalid IPv4 address format.' };
    }

    // RFC 1918 private ranges
    const isClassA = ipLong >= 167772160 && ipLong <= 184549375; // 10.0.0.0 - 10.255.255.255
    const isClassB = ipLong >= 2886729728 && ipLong <= 2887778303; // 172.16.0.0 - 172.31.255.255
    const isClassC = ipLong >= 3232235520 && ipLong <= 3232301055; // 192.168.0.0 - 192.168.255.255
    
    // RFC 3927 link-local range
    const isLinkLocal = ipLong >= 2851995648 && ipLong <= 2852061183; // 169.254.0.0 - 169.254.255.255
    
    // RFC 5737 documentation ranges
    const isTestNet1 = ipLong >= 3232235776 && ipLong <= 3232236031; // 192.0.2.0/24
    const isTestNet2 = ipLong >= 3325256704 && ipLong <= 3325256959; // 198.51.100.0/24
    const isTestNet3 = ipLong >= 3405803776 && ipLong <= 3405804031; // 203.0.113.0/24
    
    const isLoopback = ipLong >= 2130706432 && ipLong <= 2130706687; // 127.0.0.0/8

    if (isClassA || isClassB || isClassC) {
        return { type: 'Private', message: 'This is a private IP address, commonly used within a local network (LAN). It is not routable on the public internet.', icon: CheckCircle };
    }
    if (isLinkLocal) {
        return { type: 'Link-Local', message: 'This is a link-local address (APIPA), automatically assigned when a device cannot reach a DHCP server.', icon: AlertTriangle };
    }
    if(isLoopback) {
        return { type: 'Loopback', message: 'This is a loopback address, used by a device to refer to itself (localhost).', icon: AlertTriangle };
    }
     if(isTestNet1 || isTestNet2 || isTestNet3) {
        return { type: 'Documentation/Test', message: 'This IP address is reserved for use in documentation and examples (TEST-NET).', icon: BookOpen };
    }

    return { type: 'Public', message: 'This is a public IP address, reachable from anywhere on the internet.', icon: Globe };
};

// --- Component ---
export function IpPrivacyChecker() {
    const [ipAddress, setIpAddress] = useState('172.16.10.30');
    const result = useMemo(() => checkIpPrivacy(ipAddress), [ipAddress]);

    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <Card>
                <CardHeader>
                    <CardTitle>Public vs. Private IP Checker</CardTitle>
                    <CardDescription>Enter any IPv4 address to instantly determine if it is public, private, or reserved.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="ip-input">IP Address</Label>
                        <Input
                            id="ip-input"
                            type="text"
                            value={ipAddress}
                            onChange={(e) => setIpAddress(e.target.value)}
                            placeholder="e.g., 10.0.0.1"
                            className="font-code"
                            aria-label="IP Address Input"
                        />
                    </div>
                     {ipAddress.length > 0 && result && (
                         <Alert className={
                             result.type === 'Public' ? 'border-blue-500/50' : 
                             result.type === 'Private' ? 'border-green-500/50' : 
                             result.type === 'Invalid' ? 'border-destructive/50' :
                             'border-yellow-500/50'
                            }>
                            {result.icon && <result.icon className={`h-4 w-4 ${
                                result.type === 'Public' ? 'text-blue-600' : 
                                result.type === 'Private' ? 'text-green-600' :
                                result.type === 'Invalid' ? 'text-destructive' :
                                'text-yellow-600'
                            }`} />}
                             <AlertTitle className={`font-bold ${
                                result.type === 'Public' ? 'text-blue-700' : 
                                result.type === 'Private' ? 'text-green-700' :
                                result.type === 'Invalid' ? 'text-destructive' :
                                'text-yellow-700'
                             }`}>{result.type} IP Address</AlertTitle>
                             <AlertDescription>
                                {result.message}
                             </AlertDescription>
                         </Alert>
                     )}
                </CardContent>
            </Card>
        </div>
    );
}
