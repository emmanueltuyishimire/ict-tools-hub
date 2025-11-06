
'use client';

import { useActionState, useRef, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { ipLookup, type FormState } from './actions';
import { AlertCircle, Search, MapPin, Building, Wifi, Globe, Briefcase, ShieldCheck } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table';

const initialState: FormState = null;

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} className="w-full sm:w-auto">
            <Search className="mr-2 h-4 w-4" aria-hidden="true" />
            {pending ? 'Looking up...' : 'Lookup IP'}
        </Button>
    );
}

export function IpLookupTool() {
    const [state, formAction] = useActionState(ipLookup, initialState);
    const [ipAddress, setIpAddress] = useState('8.8.8.8');
    const resultRef = useRef<HTMLDivElement>(null);
    const { pending } = useFormStatus();

    useEffect(() => {
        if(state && resultRef.current) {
            resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [state]);

    const renderResultRow = (label: string, value: any, icon: React.ReactNode) => {
        if (!value) return null;
        return (
            <TableRow>
                <TableHead className="font-semibold w-1/3 flex items-center gap-2">
                    {icon} {label}
                </TableHead>
                <TableCell className="font-code break-all">{value.toString()}</TableCell>
            </TableRow>
        );
    }
    
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>IP Address Lookup</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={formAction} className="space-y-4">
                        <div className="flex flex-col sm:flex-row gap-2">
                             <div className="flex-grow space-y-2">
                                <Label htmlFor="ip-input">IP Address</Label>
                                <Input
                                    id="ip-input"
                                    name="ip"
                                    type="text"
                                    placeholder="e.g., 8.8.8.8"
                                    className="font-code"
                                    value={ipAddress}
                                    onChange={(e) => setIpAddress(e.target.value)}
                                />
                            </div>
                            <div className="self-end w-full sm:w-auto">
                                <SubmitButton />
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
            
             <div ref={resultRef}>
                {pending && (
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-8 w-1/2" />
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                             <Skeleton className="h-10 w-full" />
                        </CardContent>
                    </Card>
                 )}
                {state && !pending &&(
                    <div aria-live="polite">
                        {!state.success ? (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Lookup Failed</AlertTitle>
                                <AlertDescription>{state.message}</AlertDescription>
                            </Alert>
                        ) : (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Lookup Results for {state.data?.ip}</CardTitle>
                                    <CardDescription>
                                        Geolocation and network information for the requested IP address.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="rounded-md border">
                                        <Table>
                                            <TableBody>
                                                {renderResultRow('Location', `${state.data?.city}, ${state.data?.region}, ${state.data?.country_name}`, <MapPin/>)}
                                                {renderResultRow('ISP', state.data?.org, <Building/>)}
                                                {renderResultRow('ASN', `${state.data?.asn} (${state.data?.as})`, <Briefcase/>)}
                                                {renderResultRow('VPN/Proxy', state.data?.security?.vpn || state.data?.security?.proxy ? 'Yes' : 'No', <ShieldCheck/>)}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
