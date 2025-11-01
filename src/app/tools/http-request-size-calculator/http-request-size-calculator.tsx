
'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, FileStack } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Bar, BarChart, ResponsiveContainer } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';

const calculateSize = (str: string) => new Blob([str]).size;

export function HttpRequestSizeCalculator() {
    const [method, setMethod] = useState('GET');
    const [url, setUrl] = useState('https://example.com/api/v1/users?id=123&page=2');
    const [headers, setHeaders] = useState(
`Host: example.com
User-Agent: MyClient/1.0
Accept: application/json
Accept-Encoding: gzip, deflate, br`
    );
    const [body, setBody] = useState('{"name":"John Doe","email":"john.doe@example.com"}');

    const results = useMemo(() => {
        try {
            const urlParts = new URL(url);
            const requestLine = `${method} ${urlParts.pathname}${urlParts.search} HTTP/1.1\r\n`;
            
            const headersString = `${headers}\r\n\r\n`;
            const bodyString = method === 'POST' || method === 'PUT' ? body : '';

            const requestLineSize = calculateSize(requestLine);
            const headersSize = calculateSize(headersString);
            const bodySize = calculateSize(bodyString);
            const totalSize = requestLineSize + headersSize + bodySize;

            return {
                requestLineSize,
                headersSize,
                bodySize,
                totalSize,
                chartData: [
                    { name: 'Request Line', value: requestLineSize, fill: "hsl(var(--chart-1))" },
                    { name: 'Headers', value: headersSize, fill: "hsl(var(--chart-2))" },
                    { name: 'Body', value: bodySize, fill: "hsl(var(--chart-3))" },
                ]
            };
        } catch (e) {
            return { error: 'Invalid URL format.' };
        }
    }, [method, url, headers, body]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>HTTP Request Size Calculator</CardTitle>
                <CardDescription>
                    Estimate the size of an HTTP request by entering its components.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-1 space-y-2">
                        <Label htmlFor="method">Method</Label>
                        <Select value={method} onValueChange={setMethod}>
                            <SelectTrigger id="method"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'].map(m => (
                                    <SelectItem key={m} value={m}>{m}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="md:col-span-3 space-y-2">
                        <Label htmlFor="url">URL</Label>
                        <Input id="url" value={url} onChange={e => setUrl(e.target.value)} className="font-code"/>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="headers">Headers (one per line)</Label>
                    <Textarea
                        id="headers"
                        value={headers}
                        onChange={e => setHeaders(e.target.value)}
                        className="font-mono h-32"
                        placeholder="e.g., Host: example.com"
                    />
                </div>

                {(method === 'POST' || method === 'PUT' || method === 'PATCH') && (
                    <div className="space-y-2">
                        <Label htmlFor="body">Request Body</Label>
                        <Textarea
                            id="body"
                            value={body}
                            onChange={e => setBody(e.target.value)}
                            className="font-mono h-24"
                            placeholder='e.g., {"key":"value"}'
                        />
                    </div>
                )}
                
                {'error' in results ? (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{results.error}</AlertDescription>
                    </Alert>
                ) : (
                    <div className="space-y-4 pt-4">
                        <Card className="bg-muted/50 p-6">
                             <div className="flex flex-col items-center justify-center gap-2 text-center">
                                <FileStack className="h-8 w-8 text-primary"/>
                                <p className="text-sm font-medium text-muted-foreground">Total Request Size</p>
                                <p className="text-4xl font-bold">{results.totalSize.toLocaleString()} bytes</p>
                             </div>
                             <ChartContainer config={{}} className="h-[100px] w-full mt-4">
                                <ResponsiveContainer width="100%" height={100}>
                                    <BarChart layout="vertical" data={results.chartData} stackOffset="expand">
                                        <Bar dataKey="value" stackId="a" radius={[5,5,5,5]}/>
                                    </BarChart>
                                </ResponsiveContainer>
                             </ChartContainer>
                             <div className="mt-2 flex justify-around text-xs text-muted-foreground">
                                 <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-chart-1" />Request Line: {results.requestLineSize} B</div>
                                 <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-chart-2" />Headers: {results.headersSize} B</div>
                                 <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-chart-3" />Body: {results.bodySize} B</div>
                             </div>
                        </Card>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
