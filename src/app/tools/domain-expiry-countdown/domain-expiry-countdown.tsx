
'use client';

import { useActionState, useRef, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { checkDomainExpiry, type FormState } from './actions';
import { AlertCircle, CalendarClock, Building, CalendarCheck2, History } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';


const initialState: FormState = null;

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} className="w-full sm:w-auto">
            <CalendarClock className="mr-2 h-4 w-4" /> 
            {pending ? 'Checking...' : 'Check Expiry'}
        </Button>
    );
}

function CountdownTimer({ expiryDate }: { expiryDate: string }) {
    const [timeLeft, setTimeLeft] = useState({
        days: 0, hours: 0, minutes: 0, seconds: 0
    });
    
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = new Date(expiryDate).getTime() - now;

            if (distance < 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                clearInterval(interval);
                return;
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [expiryDate]);
    
    const isExpired = new Date(expiryDate).getTime() < new Date().getTime();

    return (
        <div className={cn("grid grid-cols-2 sm:grid-cols-4 gap-4 text-center", isExpired ? 'filter grayscale' : '')}>
            <div className="bg-background p-3 rounded-lg">
                <p className="text-4xl font-bold">{timeLeft.days}</p>
                <p className="text-sm text-muted-foreground">Days</p>
            </div>
             <div className="bg-background p-3 rounded-lg">
                <p className="text-4xl font-bold">{timeLeft.hours}</p>
                <p className="text-sm text-muted-foreground">Hours</p>
            </div>
             <div className="bg-background p-3 rounded-lg">
                <p className="text-4xl font-bold">{timeLeft.minutes}</p>
                <p className="text-sm text-muted-foreground">Minutes</p>
            </div>
             <div className="bg-background p-3 rounded-lg">
                <p className="text-4xl font-bold">{timeLeft.seconds}</p>
                <p className="text-sm text-muted-foreground">Seconds</p>
            </div>
        </div>
    );
}


export function DomainExpiryCountdown() {
    const [state, formAction] = useActionState(checkDomainExpiry, initialState);
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
                    <CardTitle>Check Domain Expiry</CardTitle>
                    <CardDescription>
                        Enter a domain name to look up its expiration date.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={formAction} className="space-y-4">
                        <div className="flex flex-col sm:flex-row gap-2">
                            <div className="flex-grow space-y-2">
                                <Label htmlFor="domain-input" className="sr-only">Domain</Label>
                                <Input
                                    id="domain-input"
                                    name="domain"
                                    type="text"
                                    placeholder="example.com"
                                    className="font-code"
                                    aria-label="Domain to check"
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
                        <CardHeader><CardTitle>Looking up WHOIS data...</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <Skeleton className="h-28 w-full" />
                            <Skeleton className="h-40 w-full" />
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
                            <Card className="bg-muted/30">
                                <CardHeader>
                                    <CardTitle>Countdown for {state.domain}</CardTitle>
                                    <CardDescription>
                                        Time remaining until {new Date(state.expiryDate!).toLocaleString()}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                     <CountdownTimer expiryDate={state.expiryDate!} />
                                     <div>
                                        <h3 className='font-semibold mb-2'>Registration Details</h3>
                                        <div className="rounded-md border bg-background">
                                            <Table>
                                                <TableBody>
                                                   {state.registrar && <TableRow><TableHead className="w-1/3"><Building className="inline h-4 w-4 mr-2"/>Registrar</TableHead><TableCell>{state.registrar}</TableCell></TableRow>}
                                                   {state.creationDate && <TableRow><TableHead className="w-1/3"><CalendarCheck2 className="inline h-4 w-4 mr-2"/>Created On</TableHead><TableCell>{new Date(state.creationDate).toUTCString()}</TableCell></TableRow>}
                                                   {state.updatedDate && <TableRow><TableHead className="w-1/3"><History className="inline h-4 w-4 mr-2"/>Last Updated</TableHead><TableCell>{new Date(state.updatedDate).toUTCString()}</TableCell></TableRow>}
                                                </TableBody>
                                            </Table>
                                        </div>
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

    