
'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Copy, Check, Trash2, ListTree, CheckCircle, AlertCircle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

type DuplicateResult = {
    row: string;
    count: number;
    lines: number[];
};

export function DuplicateRowFinder() {
    const [inputText, setInputText] = useState('apple\nbanana\norange\napple\ngrape\nbanana\napple');
    const [results, setResults] = useState<{ duplicates: DuplicateResult[], uniqueCount: number, duplicateRowCount: number, totalRows: number } | null>(null);
    const [hasCopied, setHasCopied] = useState(false);

    const findDuplicates = () => {
        const lines = inputText.split('\n').map(line => line.trim());
        const lineCounts: { [key: string]: { count: number, lines: number[] } } = {};

        lines.forEach((line, index) => {
            if (line === '') return;
            if (lineCounts[line]) {
                lineCounts[line].count++;
                lineCounts[line].lines.push(index + 1);
            } else {
                lineCounts[line] = { count: 1, lines: [index + 1] };
            }
        });

        const duplicates: DuplicateResult[] = Object.entries(lineCounts)
            .filter(([, { count }]) => count > 1)
            .map(([row, { count, lines }]) => ({ row, count, lines }))
            .sort((a, b) => b.count - a.count);
        
        const duplicateRowCount = duplicates.reduce((sum, item) => sum + item.count, 0);
        const totalRows = lines.filter(line => line !== '').length;
        const uniqueCount = totalRows - duplicateRowCount + duplicates.length;

        setResults({ duplicates, uniqueCount, duplicateRowCount, totalRows });
    };

    const handleCopy = () => {
        if (!results || results.duplicates.length === 0) return;
        const textToCopy = results.duplicates.map(d => d.row).join('\n');
        navigator.clipboard.writeText(textToCopy).then(() => {
            setHasCopied(true);
            setTimeout(() => setHasCopied(false), 2000);
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Duplicate Row Finder</CardTitle>
                <CardDescription>
                    Paste your text or data below to find and analyze duplicate rows.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="input-text">Input Data (one entry per line)</Label>
                    <Textarea
                        id="input-text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Paste your list of items, emails, or data rows here..."
                        className="h-64 font-code"
                    />
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                    <Button onClick={findDuplicates} className="w-full sm:w-auto"><ListTree className="mr-2 h-4 w-4"/> Find Duplicates</Button>
                    <Button onClick={() => { setInputText(''); setResults(null); }} variant="outline" className="w-full sm:w-auto"><Trash2 className="mr-2 h-4 w-4" /> Clear</Button>
                </div>
                
                {results && (
                    <div className="space-y-4">
                        <Card className="bg-muted/50">
                             <CardHeader>
                                <CardTitle className="text-lg">Analysis Summary</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {results.duplicates.length === 0 ? (
                                    <Alert className="border-green-500/50">
                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                        <AlertTitle className="text-green-700">No Duplicates Found</AlertTitle>
                                        <AlertDescription>
                                            All {results.totalRows.toLocaleString()} rows in your dataset are unique.
                                        </AlertDescription>
                                    </Alert>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                                        <div className="p-2 bg-background rounded-lg">
                                            <Label>Total Rows</Label>
                                            <p className="text-2xl font-bold">{results.totalRows.toLocaleString()}</p>
                                        </div>
                                        <div className="p-2 bg-background rounded-lg">
                                            <Label>Unique Rows</Label>
                                            <p className="text-2xl font-bold text-primary">{results.uniqueCount.toLocaleString()}</p>
                                        </div>
                                         <div className="p-2 bg-background rounded-lg">
                                            <Label>Duplicate Rows</Label>
                                            <p className="text-2xl font-bold text-destructive">{results.duplicateRowCount.toLocaleString()}</p>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                        
                        {results.duplicates.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="text-lg">Duplicate Items</CardTitle>
                                        <Button variant="ghost" size="sm" onClick={handleCopy}>
                                            {hasCopied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                                            Copy Duplicates
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="overflow-x-auto rounded-md border">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Row Content</TableHead>
                                                    <TableHead className="text-center">Count</TableHead>
                                                    <TableHead>Line Numbers</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {results.duplicates.map((item, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell className="font-code">{item.row}</TableCell>
                                                        <TableCell className="text-center font-medium">{item.count}</TableCell>
                                                        <TableCell className="font-code text-xs text-muted-foreground">{item.lines.join(', ')}</TableCell>
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
            </CardContent>
        </Card>
    );
}

