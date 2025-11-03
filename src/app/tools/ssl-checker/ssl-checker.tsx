
'use client';

import { useActionState, useRef, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { AlertCircle, ShieldCheck, Clock, Building } from 'lucide-react';
import { checkSsl, type FormState } from './actions';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

const initialState: FormState = null;


function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} className="w-full sm:w-auto">
            <ShieldCheck className="mr-2 h-4 w-4" /> 
            {pending ? 'Checking...' : 'Check Certificate'}
        </Button>
    );
}

export function SslChecker() {
    const [state, formAction] = useActionState(checkSsl, initialState);
    const resultRef = useRef<HTMLDivElement>(null);
    const { pending } = useFormStatus();

    useEffect(() => {
        if(state && resultRef.current) {
            resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [state]);

    const renderResultRow = (label: string, value: any) => {
        if (!value) return null;
        return (
            <TableRow>
                <TableHead className="font-semibold w-1/3">{label}</TableHead>
                <TableCell className="font-code break-all">{value.toString()}</TableCell>
            </TableRow>
        );
    }
    
    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <Card>
                <CardHeader>
                    <CardTitle>SSL Certificate Checker</CardTitle>
                    <CardDescription>
                        Enter a domain to inspect its SSL/TLS certificate details.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={formAction} className="space-y-4">
                        <div className="flex flex-col sm:flex-row gap-2">
                            <div className="flex-grow space-y-2">
                                <Label htmlFor="domain-input">Domain</Label>
                                <Input
                                    id="domain-input"
                                    name="domain"
                                    type="text"
                                    placeholder="example.com"
                                    className="font-code"
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
                        <CardHeader><CardTitle>Checking Certificate...</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <Skeleton className="h-8 w-3/4" />
                            <div className="grid sm:grid-cols-3 gap-4">
                                <Skeleton className="h-24 w-full" />
                                <Skeleton className="h-24 w-full" />
                                <Skeleton className="h-24 w-full" />
                            </div>
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
                            <Card>
                                <CardHeader>
                                    <CardTitle>Certificate Details for {state.domain}</CardTitle>
                                    <CardDescription>
                                        Successfully retrieved certificate information.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                                         <Card className="p-4 bg-muted/50">
                                             <Clock className="mx-auto h-7 w-7 text-muted-foreground mb-2" />
                                             <p className="text-sm text-muted-foreground">Days Remaining</p>
                                             <p className={cn("text-2xl font-bold", state.daysRemaining && state.daysRemaining < 30 ? 'text-destructive' : 'text-green-600')}>{state.daysRemaining}</p>
                                         </Card>
                                         <Card className="p-4 bg-muted/50">
                                             <Building className="mx-auto h-7 w-7 text-muted-foreground mb-2" />
                                             <p className="text-sm text-muted-foreground">Issued By</p>
                                             <p className="text-lg font-semibold truncate">{state.issuer}</p>
                                         </Card>
                                         <Card className="p-4 bg-muted/50">
                                            <ShieldCheck className="mx-auto h-7 w-7 text-muted-foreground mb-2" />
                                             <p className="text-sm text-muted-foreground">Is Valid?</p>
                                             <p className={cn("text-2xl font-bold", state.valid ? 'text-green-600' : 'text-destructive')}>{state.valid ? 'Yes' : 'No'}</p>
                                         </Card>
                                     </div>
                                     <div className="rounded-md border">
                                        <Table>
                                            <TableBody>
                                                {renderResultRow('Common Name', state.commonName)}
                                                {renderResultRow('Subject Alternative Names', state.sans?.join(', '))}
                                                {renderResultRow('Issuer', state.issuer)}
                                                {renderResultRow('Serial Number', state.serialNumber)}
                                                {renderResultRow('Valid From (UTC)', state.validFrom)}
                                                {renderResultRow('Valid To (UTC)', state.validTo)}
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
    );
}
