
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Wifi, Copy } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';

export function IpLookup() {
    const [ipData, setIpData] = useState<{ ip: string; city?: string; region?: string; country_name?: string; } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        setLoading(true);
        setError(null);
        fetch('https://ipapi.co/json/')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                if (data.ip) {
                    setIpData(data);
                } else {
                    setError('Could not retrieve IP information.');
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("IP lookup failed:", err);
                setError('Failed to fetch IP address. Please check your connection.');
                setLoading(false);
            });
    }, []);

    const handleCopy = () => {
        if (ipData?.ip) {
            navigator.clipboard.writeText(ipData.ip);
            toast({
                title: 'IP Address Copied!',
                description: `${ipData.ip} has been copied to your clipboard.`,
            });
        }
    };

    if (loading) {
        return (
            <Card>
                 <CardHeader className="pb-2">
                    <div className="bg-primary/10 p-3 rounded-full w-fit mx-auto">
                         <Wifi className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl mt-2 text-center">Your Public IP Address</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center text-center p-6 pt-0">
                    <Skeleton className="h-8 w-40 mb-2" />
                    <Skeleton className="h-4 w-32" />
                </CardContent>
            </Card>
        );
    }
    
    if (error) {
         return (
            <Card className="border-destructive/50">
                 <CardHeader className="pb-2">
                    <div className="bg-destructive/10 p-3 rounded-full w-fit mx-auto">
                        <Wifi className="h-6 w-6 text-destructive" />
                    </div>
                    <CardTitle className="text-xl mt-2 text-center">IP Lookup Failed</CardTitle>
                </CardHeader>
                <CardContent className="text-center p-6 pt-0">
                    <p className="text-sm text-destructive">{error}</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="flex flex-col justify-center items-center text-center p-6">
            <CardHeader className="pb-2">
                 <div className="bg-primary/10 p-3 rounded-full w-fit mx-auto">
                    <Wifi className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl mt-2">Your Public IP Address</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-2 bg-muted p-2 rounded-md justify-center">
                    <p className="text-2xl font-bold font-mono tracking-wider">{ipData?.ip}</p>
                    <Button variant="ghost" size="icon" onClick={handleCopy} aria-label="Copy IP Address">
                        <Copy className="h-5 w-5" />
                    </Button>
                </div>
                {ipData?.city && ipData?.country_name && (
                    <CardDescription className="mt-2">{ipData.city}, {ipData.region}, {ipData.country_name}</CardDescription>
                )}
            </CardContent>
        </Card>
    );
}
