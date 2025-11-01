
'use client';

import { useActionState, useRef, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { checkResponseTime, type FormState } from './actions';
import { AlertCircle, Timer, BarChart, CheckCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

const initialState: FormState = null;

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} className="w-full sm:w-auto">
            <Timer className="mr-2 h-4 w-4" /> 
            {pending ? 'Measuring...' : 'Measure Response Time'}
        </Button>
    );
}

export function ResponseTimeCalculator() {
    const [state, formAction] = useActionState(checkResponseTime, initialState);
    const resultRef = useRef<HTMLDivElement>(null);
    const { pending } = useFormStatus();

    useEffect(() => {
        if(state && resultRef.current) {
            resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [state]);

    const getBarColor = (time: number) => {
        if (time < 200) return 'bg-green-500';
        if (time < 600) return 'bg-yellow-500';
        return 'bg-red-500';
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Test Server Response Time</CardTitle>
                    <CardDescription>
                        Enter a URL to measure its response time from our server.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={formAction} className="space-y-4">
                        <div className="flex flex-col sm:flex-row gap-2">
                            <div className="flex-grow space-y-2">
                                <Label htmlFor="url-input" className="sr-only">URL</Label>
                                <Input
                                    id="url-input"
                                    name="url"
                                    type="text"
                                    defaultValue="https://google.com"
                                    placeholder="e.g., https://example.com"
                                    className="font-code"
                                    aria-label="URL to test"
                                />
                            </div>
                            <SubmitButton />
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
                        <CardContent className="space-y-4">
                            <Skeleton className="h-24 w-full" />
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
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{state.message}</AlertDescription>
                            </Alert>
                        ) : (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Response Time for {state.url}</CardTitle>
                                    <CardDescription>
                                        Server responded with status <strong className={cn(state.status && state.status >= 400 ? 'text-red-500' : 'text-green-500')}>{state.status}</strong>.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                     <div className="flex items-center gap-4 text-center">
                                        <div className='flex-1'>
                                            <p className='text-sm text-muted-foreground'>TTFB</p>
                                            <p className={cn("text-3xl font-bold", getBarColor(state.timings?.ttfb ?? 0).replace('bg-','text-'))}>{state.timings?.ttfb.toFixed(0)}ms</p>
                                        </div>
                                         <div className='flex-1'>
                                            <p className='text-sm text-muted-foreground'>Total Time</p>
                                            <p className='text-3xl font-bold'>{state.timings?.total.toFixed(0)}ms</p>
                                        </div>
                                     </div>
                                    <div className="w-full space-y-4">
                                        <div>
                                            <div className="flex justify-between mb-1">
                                                <Label className="text-xs">DNS Lookup</Label>
                                                <span className="text-xs font-mono">{state.timings?.dnsLookup.toFixed(0)}ms</span>
                                            </div>
                                            <Progress value={(state.timings?.dnsLookup ?? 0) / (state.timings?.total ?? 1) * 100} className="h-2" />
                                        </div>
                                         <div>
                                            <div className="flex justify-between mb-1">
                                                <Label className="text-xs">TCP Connection</Label>
                                                <span className="text-xs font-mono">{state.timings?.tcpConnection.toFixed(0)}ms</span>
                                            </div>
                                             <Progress value={(state.timings?.tcpConnection ?? 0) / (state.timings?.total ?? 1) * 100} className="h-2" />
                                        </div>
                                         <div>
                                            <div className="flex justify-between mb-1">
                                                <Label className="text-xs">TLS Handshake</Label>
                                                <span className="text-xs font-mono">{state.timings?.tlsHandshake.toFixed(0)}ms</span>
                                            </div>
                                             <Progress value={(state.timings?.tlsHandshake ?? 0) / (state.timings?.total ?? 1) * 100} className="h-2" />
                                        </div>
                                        <div>
                                            <div className="flex justify-between mb-1">
                                                <Label className="text-xs">Time to First Byte (TTFB)</Label>
                                                <span className="text-xs font-mono">{state.timings?.ttfb.toFixed(0)}ms</span>
                                            </div>
                                             <Progress value={(state.timings?.ttfb ?? 0) / (state.timings?.total ?? 1) * 100} className={cn("h-2", getBarColor(state.timings?.ttfb ?? 0))} />
                                        </div>
                                    </div>
                                    <Alert>
                                        <CheckCircle className="h-4 w-4"/>
                                        <AlertTitle>What is TTFB?</AlertTitle>
                                        <AlertDescription>
                                            Time to First Byte (TTFB) is the time from the start of the request until the first byte of the response is received. Google recommends a TTFB of under 200ms for a good user experience.
                                        </AlertDescription>
                                    </Alert>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
