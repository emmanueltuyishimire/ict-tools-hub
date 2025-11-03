
'use client';

import { useActionState, useRef, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { reverseDnsLookup, type FormState } from './actions';
import { AlertCircle, Globe } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const initialState: FormState = null;


function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} className="w-full sm:w-auto">
            <Globe className="mr-2 h-4 w-4" /> 
            {pending ? 'Looking up...' : 'Lookup Hostname'}
        </Button>
    );
}

export function ReverseDnsLookupTool() {
    const [state, formAction] = useActionState(reverseDnsLookup, initialState);
    const [ipAddress, setIpAddress] = useState('8.8.8.8');
    const resultRef = useRef<HTMLDivElement>(null);
    const { pending } = useFormStatus();

    useEffect(() => {
        if(state && resultRef.current) {
            resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [state]);

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Reverse DNS Lookup</CardTitle>
                    <CardDescription>
                        Enter an IPv4 address to find its associated hostname (PTR record).
                    </CardDescription>
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
                            <Skeleton className="h-4 w-3/4" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-10 w-full" />
                        </CardContent>
                    </Card>
                 )}
                {state && !pending && (
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
                                    <CardTitle>Result for {state.ip}</CardTitle>
                                    <CardDescription>
                                        Successfully found {state.hostnames?.length || 0} hostname(s).
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="list-disc pl-5 space-y-1 font-code bg-muted/50 p-4 rounded-md">
                                        {state.hostnames?.map((hostname, i) => (
                                            <li key={i}>{hostname}</li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
