
'use client';

import { useActionState, useRef, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
// import { getWhoisInfo, type FormState } from './actions';
import { AlertCircle, Search } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { CodeBlock } from '@/components/code-block';

// Mock types and functions for static build
type FormState = {
  success: boolean;
  message: string;
  domain?: string;
  data?: string;
} | null;

const initialState: FormState = null;

async function getWhoisInfo(prevState: FormState, formData: FormData): Promise<FormState> {
    return {
        success: false,
        message: "This tool is disabled in the current static deployment environment."
    }
}


function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} className="w-full sm:w-auto">
            <Search className="mr-2 h-4 w-4" /> 
            {pending ? 'Looking up...' : 'Lookup Domain'}
        </Button>
    );
}

export function WhoisLookupTool() {
    const [state, formAction] = useActionState(getWhoisInfo, initialState);
    const [domain, setDomain] = useState('google.com');
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
                    <CardTitle>Whois Lookup</CardTitle>
                    <CardDescription>
                        Enter a domain name to retrieve its public registration data.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={formAction} className="space-y-4">
                        <div className="flex flex-col sm:flex-row gap-2">
                             <div className="flex-grow space-y-2">
                                <Label htmlFor="domain-input" className="sr-only">Domain Name</Label>
                                <Input
                                    id="domain-input"
                                    name="domain"
                                    type="text"
                                    placeholder="example.com"
                                    className="font-code"
                                    aria-label="Domain name to look up"
                                    value={domain}
                                    onChange={(e) => setDomain(e.target.value)}
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
                        <CardContent>
                            <Skeleton className="h-64 w-full" />
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
                                    <CardTitle>Whois Record for {state.domain}</CardTitle>
                                    <CardDescription>
                                        The raw data returned by the Whois server.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <CodeBlock code={state.data || 'No data received.'} language="text" />
                                </CardContent>
                            </Card>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
