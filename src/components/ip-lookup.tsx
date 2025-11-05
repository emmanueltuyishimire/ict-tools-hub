
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Wifi } from 'lucide-react';
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
            .then(res => res.json())
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
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Wifi className="h-5 w-5 text-primary" />
                        Fetching Your Public IP Address...
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <Skeleton className="h-8 w-1/2" />
                    <Skeleton className="h-4 w-3/4" />
                </CardContent>
            </Card>
        );
    }
    
    if (error) {
         return (
            <Card className="mt-6 border-destructive/50">
                <CardHeader>
                    <CardTitle className="text-lg text-destructive flex items-center gap-2">
                        <Wifi className="h-5 w-5" />
                        IP Address Lookup Failed
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-destructive">{error}</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="mt-6 bg-secondary/30 border-primary/20">
            <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-primary">
                    <Wifi className="h-5 w-5" />
                    Your Public IP Address
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-center sm:text-left">
                        <p className="text-3xl font-bold font-mono tracking-wider">{ipData?.ip}</p>
                        {ipData?.city && ipData?.country_name && (
                            <p className="text-muted-foreground">{ipData.city}, {ipData.region}, {ipData.country_name}</p>
                        )}
                    </div>
                     <Button onClick={handleCopy}>Copy IP Address</Button>
                </div>
            </CardContent>
        </Card>
    );
}
