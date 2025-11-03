
'use client';

import { useActionState, useRef, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { checkHeaders, type FormState } from './actions';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, Search } from 'lucide-react';


const initialState: FormState = null;

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} className="w-full sm:w-auto"><Search className="mr-2 h-4 w-4" />{pending ? 'Checking...' : 'Check Headers'}</Button>
    );
}

export function HttpHeaderChecker() {
    const [state, formAction] = useActionState(checkHeaders, initialState);
    const formRef = useRef<HTMLFormElement>(null);
    const resultRef = useRef<HTMLDivElement>(null);
    const { pending } = useFormStatus();
    
    useEffect(() => {
        if(state && resultRef.current) {
            resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [state]);

    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <Card>
                <CardHeader>
                    <CardTitle>HTTP Header Checker</CardTitle>
                    <CardDescription>
                        Enter a URL to inspect the HTTP response headers returned by the server.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form ref={formRef} action={formAction} className="space-y-4">
                        <div className="flex flex-col sm:flex-row gap-2">
                            <div className="flex-grow space-y-2">
                                <Label htmlFor="url-input" className="sr-only">URL</Label>
                                <Input
                                    id="url-input"
                                    name="url"
                                    type="text"
                                    placeholder="example.com"
                                    className="font-code"
                                    aria-label="URL to check"
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
                             <Skeleton className="h-10 w-full" />
                             <Skeleton className="h-40 w-full" />
                        </CardContent>
                    </Card>
                 )}
                {state && !pending && (
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
                                    <CardTitle>Results for {state.url}</CardTitle>
                                    <CardDescription>
                                        The server responded with the following status and headers.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                     <div className="bg-muted p-3 rounded-md font-code text-sm">
                                        <p>HTTP/1.1 <span className={cn(state.status && state.status >= 400 ? 'text-red-500' : state.status && state.status >= 300 ? 'text-yellow-500' : 'text-green-500', 'font-bold')}>{state.status} {state.statusText}</span></p>
                                     </div>
                                     <div className="rounded-md border">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="w-1/3">Header Name</TableHead>
                                                    <TableHead>Value</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {state.headers && Object.entries(state.headers).map(([key, value]) => (
                                                    <TableRow key={key}>
                                                        <TableCell className="font-semibold break-all">{key}</TableCell>
                                                        <TableCell className="font-code break-all">{value}</TableCell>
                                                    </TableRow>
                                                ))}
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
