
'use client';

import { useActionState, useRef, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { lookupDns, type FormState } from './actions';
import { AlertCircle, Search, Dna } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const initialState: FormState = null;

const recordTypes = ['A', 'AAAA', 'MX', 'CNAME', 'NS', 'TXT', 'SOA'];

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} className="w-full sm:w-auto">
            <Dna className="mr-2 h-4 w-4" /> 
            {pending ? 'Looking up...' : 'Lookup DNS'}
        </Button>
    );
}

export function DnsLookupTool() {
    const [state, formAction] = useActionState(lookupDns, initialState);
    const resultRef = useRef<HTMLDivElement>(null);
    const [domain, setDomain] = useState('example.com');
    const [recordType, setRecordType] = useState('A');

    useEffect(() => {
        if(state && resultRef.current) {
            resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [state]);

    const renderRecords = () => {
        if (!state?.records || state.records.length === 0) return null;

        const recordType = state.recordType;

        if (recordType === 'MX') {
             return (
                <Table>
                    <TableHeader><TableRow><TableHead>Priority</TableHead><TableHead>Exchange</TableHead></TableRow></TableHeader>
                    <TableBody>
                        {state.records.map((rec, i) => <TableRow key={i}><TableCell>{rec.priority}</TableCell><TableCell className="font-code">{rec.exchange}</TableCell></TableRow>)}
                    </TableBody>
                </Table>
            );
        }
        
        if (recordType === 'SOA') {
            const rec = state.records[0];
            return (
                 <Table>
                    <TableBody>
                        <TableRow><TableHead className="w-1/3">Primary NS</TableHead><TableCell className="font-code">{rec.nsname}</TableCell></TableRow>
                        <TableRow><TableHead>Admin Email</TableHead><TableCell className="font-code">{rec.hostmaster}</TableCell></TableRow>
                        <TableRow><TableHead>Serial</TableHead><TableCell className="font-code">{rec.serial}</TableCell></TableRow>
                        <TableRow><TableHead>Refresh</TableHead><TableCell className="font-code">{rec.refresh} seconds</TableCell></TableRow>
                        <TableRow><TableHead>Retry</TableHead><TableCell className="font-code">{rec.retry} seconds</TableCell></TableRow>
                        <TableRow><TableHead>Expire</TableHead><TableCell className="font-code">{rec.expire} seconds</TableCell></TableRow>
                        <TableRow><TableHead>Minimum TTL</TableHead><TableCell className="font-code">{rec.minttl} seconds</TableCell></TableRow>
                    </TableBody>
                </Table>
            )
        }

        return (
            <ul className="list-disc pl-5 space-y-1 font-code">
                {state.records.map((rec, i) => (
                    <li key={i}>{typeof rec.value === 'string' ? rec.value : JSON.stringify(rec)}</li>
                ))}
            </ul>
        );
    }
    
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>DNS Lookup</CardTitle>
                    <CardDescription>
                        Enter a domain and select a record type to perform a DNS lookup.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={formAction} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-6 gap-2">
                             <div className="sm:col-span-4 space-y-2">
                                <Label htmlFor="domain-input" className="sr-only">Domain</Label>
                                <Input
                                    id="domain-input"
                                    name="domain"
                                    type="text"
                                    placeholder="example.com"
                                    className="font-code"
                                    aria-label="Domain to lookup"
                                    value={domain}
                                    onChange={(e) => setDomain(e.target.value)}
                                />
                            </div>
                            <div className="sm:col-span-2 space-y-2">
                                 <Label htmlFor="record-type" className="sr-only">Record Type</Label>
                                 <Select name="recordType" value={recordType} onValueChange={setRecordType}>
                                    <SelectTrigger id="record-type"><SelectValue/></SelectTrigger>
                                    <SelectContent>
                                        {recordTypes.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <SubmitButton />
                    </form>
                </CardContent>
            </Card>
            
             <div ref={resultRef}>
                {state?.message && state?.success === false && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Lookup Failed</AlertTitle>
                        <AlertDescription>{state.message}</AlertDescription>
                    </Alert>
                )}
                {state?.success === true && state.records && (
                    <div aria-live="polite">
                        <Card>
                            <CardHeader>
                                <CardTitle>{state.recordType} Records for {state.domain}</CardTitle>
                                <CardDescription>
                                    Successfully retrieved {state.records?.length || 0} record(s).
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="rounded-md border bg-muted/50 p-4">
                                    {renderRecords()}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    )
}
