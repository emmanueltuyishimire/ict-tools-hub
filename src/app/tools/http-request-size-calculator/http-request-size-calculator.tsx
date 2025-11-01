
'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { BarChart, Info, Plus, Trash2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type Header = {
    id: number;
    name: string;
    value: string;
};

export function HttpRequestSizeCalculator() {
    const [method, setMethod] = useState('GET');
    const [url, setUrl] = useState('https://example.com/api/data?id=123');
    const [headers, setHeaders] = useState<Header[]>([
        { id: 1, name: 'User-Agent', value: 'Mozilla/5.0' },
        { id: 2, name: 'Accept', value: 'application/json' },
    ]);
    const [body, setBody] = useState('{"key": "value"}');

    let nextId = 3;

    const sizes = useMemo(() => {
        const encoder = new TextEncoder();
        
        const requestLine = `${method} ${new URL(url).pathname + new URL(url).search} HTTP/1.1\r\n`;
        const requestLineSize = encoder.encode(requestLine).length;

        const headersString = headers.map(h => `${h.name}: ${h.value}\r\n`).join('');
        const hostHeader = `Host: ${new URL(url).hostname}\r\n`;
        const finalHeadersString = hostHeader + headersString + '\r\n';
        const headersSize = encoder.encode(finalHeadersString).length;
        
        const bodySize = method === 'POST' || method === 'PUT' ? encoder.encode(body).length : 0;

        return {
            requestLine: requestLineSize,
            headers: headersSize,
            body: bodySize,
            total: requestLineSize + headersSize + bodySize,
        };
    }, [method, url, headers, body]);

    const handleAddHeader = () => setHeaders([...headers, { id: nextId++, name: '', value: '' }]);
    const handleRemoveHeader = (id: number) => setHeaders(headers.filter(h => h.id !== id));
    const handleHeaderChange = (id: number, field: 'name' | 'value', value: string) => {
        setHeaders(headers.map(h => (h.id === id ? { ...h, [field]: value } : h)));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>HTTP Request Size Calculator</CardTitle>
                <CardDescription>
                    Estimate the byte size of an HTTP request by providing its components.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2 md:col-span-1">
                        <Label htmlFor="method">Method</Label>
                        <Select value={method} onValueChange={setMethod}>
                            <SelectTrigger id="method"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="GET">GET</SelectItem>
                                <SelectItem value="POST">POST</SelectItem>
                                <SelectItem value="PUT">PUT</SelectItem>
                                <SelectItem value="DELETE">DELETE</SelectItem>
                                <SelectItem value="HEAD">HEAD</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2 md:col-span-3">
                        <Label htmlFor="url">URL</Label>
                        <Input id="url" value={url} onChange={e => setUrl(e.target.value)} className="font-code" />
                    </div>
                </div>

                <div className="space-y-4">
                    <Label>Headers</Label>
                    {headers.map(header => (
                        <div key={header.id} className="grid grid-cols-12 gap-2 items-center">
                            <div className="col-span-5">
                                <Input value={header.name} onChange={e => handleHeaderChange(header.id, 'name', e.target.value)} placeholder="Header Name" />
                            </div>
                            <div className="col-span-6">
                                <Input value={header.value} onChange={e => handleHeaderChange(header.id, 'value', e.target.value)} placeholder="Header Value" />
                            </div>
                            <div className="col-span-1">
                                <Button size="icon" variant="ghost" onClick={() => handleRemoveHeader(header.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                            </div>
                        </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={handleAddHeader}><Plus className="h-4 w-4 mr-2" />Add Header</Button>
                </div>
                
                {(method === 'POST' || method === 'PUT') && (
                    <div className="space-y-2">
                        <Label htmlFor="body">Request Body</Label>
                        <Textarea id="body" value={body} onChange={e => setBody(e.target.value)} className="font-code h-32" />
                    </div>
                )}
                
                <Card className="bg-muted/50">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2"><BarChart />Request Size Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="text-center">
                            <Label>Total Estimated Size</Label>
                            <p className="text-3xl font-bold">{sizes.total.toLocaleString()} bytes</p>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div><Label>Request Line</Label><p className="font-mono">{sizes.requestLine} bytes</p></div>
                            <div><Label>Headers</Label><p className="font-mono">{sizes.headers} bytes</p></div>
                            <div><Label>Body</Label><p className="font-mono">{sizes.body} bytes</p></div>
                        </div>
                         <Alert>
                            <Info className="h-4 w-4"/>
                            <AlertTitle>Note on Accuracy</AlertTitle>
                            <AlertDescription>
                                This is an estimate of the raw HTTP/1.1 request. It does not include the underlying TCP/IP packet overhead, which can add a small amount to the final size transferred over the network.
                            </AlertDescription>
                        </Alert>
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    );
}
