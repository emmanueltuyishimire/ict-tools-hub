
'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertCircle, Play } from 'lucide-react';
import { CodeBlock } from '@/components/code-block';

// Sample data
const sampleData = {
    users: [
        { id: 1, name: 'Alice', age: 30, country: 'USA' },
        { id: 2, name: 'Bob', age: 25, country: 'Canada' },
        { id: 3, name: 'Charlie', age: 35, country: 'UK' },
        { id: 4, name: 'Diana', age: 28, country: 'USA' },
    ],
    products: [
        { product_id: 101, product_name: 'Laptop', price: 1200 },
        { product_id: 102, product_name: 'Mouse', price: 25 },
        { product_id: 103, product_name: 'Keyboard', price: 75 },
    ]
};

// Basic SQL Parser
const executeQuery = (query: string, data: typeof sampleData) => {
    query = query.trim().replace(/;$/, '');
    const selectMatch = query.match(/^SELECT\s+(.+?)\s+FROM\s+([a-zA-Z0-9_]+)(?:\s+WHERE\s+(.+))?$/i);
    
    if (!selectMatch) {
        throw new Error("Invalid query format. Only 'SELECT * FROM table [WHERE condition]' is supported.");
    }
    
    const [, columns, tableName, whereClause] = selectMatch;
    
    if (columns.trim() !== '*') {
        throw new Error("Only 'SELECT *' is supported in this demo.");
    }

    const table = (data as any)[tableName.toLowerCase()];
    if (!table) {
        throw new Error(`Table not found: '${tableName}'. Available tables: 'users', 'products'.`);
    }

    let results = table;

    if (whereClause) {
        const whereMatch = whereClause.match(/([a-zA-Z0-9_]+)\s*=\s*(?:'([^']*)'|(\d+))/);
        if (!whereMatch) {
            throw new Error("Unsupported WHERE clause. Use 'column = 'value'' or 'column = number'.");
        }
        const [, column, stringValue, numberValue] = whereMatch;

        if(!table[0] || !(column in table[0])) {
            throw new Error(`Column '${column}' not found in table '${tableName}'.`);
        }

        const value = stringValue !== undefined ? stringValue : parseInt(numberValue, 10);
        
        results = table.filter((row: any) => row[column] == value);
    }
    
    return results;
};


export function SqlQueryTester() {
    const [query, setQuery] = useState('SELECT * FROM users WHERE country = \'USA\'');
    const [results, setResults] = useState<any[]>([]);
    const [error, setError] = useState('');
    const [headers, setHeaders] = useState<string[]>([]);
    
    const handleRunQuery = () => {
        try {
            setError('');
            const queryResults = executeQuery(query, sampleData);
            setResults(queryResults);
            if (queryResults.length > 0) {
                setHeaders(Object.keys(queryResults[0]));
            } else {
                setHeaders([]);
            }
        } catch (e: any) {
            setError(e.message);
            setResults([]);
            setHeaders([]);
        }
    };
    
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Query Editor</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="sql-query">SQL Query</Label>
                        <CodeBlock code={query} language="sql" className="h-40 overflow-y-auto">
                            <Textarea
                                id="sql-query"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="SELECT * FROM users WHERE ..."
                                className="font-mono bg-transparent border-0 focus-visible:ring-0 text-base"
                            />
                        </CodeBlock>
                    </div>
                     <Button onClick={handleRunQuery}>
                        <Play className="mr-2 h-4 w-4" /> Run Query
                    </Button>
                    
                    {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Query Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                </CardContent>
            </Card>

            {(results.length > 0 || headers.length > 0) && (
                <Card>
                    <CardHeader>
                        <CardTitle>Results ({results.length} rows)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        {headers.map(h => <TableHead key={h}>{h}</TableHead>)}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {results.map((row, rowIndex) => (
                                        <TableRow key={rowIndex}>
                                            {headers.map(header => (
                                                <TableCell key={`${rowIndex}-${header}`}>{row[header]}</TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            )}

            <Card>
                <CardHeader>
                    <CardTitle>Sample Data</CardTitle>
                    <CardDescription>You can query the following tables: `users` and `products`.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2">
                    <div>
                         <h4 className="font-semibold mb-2">users</h4>
                         <div className="overflow-x-auto rounded-md border">
                            <Table>
                                <TableHeader><TableRow>{Object.keys(sampleData.users[0]).map(h => <TableHead key={h}>{h}</TableHead>)}</TableRow></TableHeader>
                                <TableBody>
                                    {sampleData.users.map((row, i) => <TableRow key={i}>{Object.values(row).map((val, j) => <TableCell key={j}>{val}</TableCell>)}</TableRow>)}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                    <div>
                         <h4 className="font-semibold mb-2">products</h4>
                          <div className="overflow-x-auto rounded-md border">
                            <Table>
                                <TableHeader><TableRow>{Object.keys(sampleData.products[0]).map(h => <TableHead key={h}>{h}</TableHead>)}</TableRow></TableHeader>
                                <TableBody>
                                    {sampleData.products.map((row, i) => <TableRow key={i}>{Object.values(row).map((val, j) => <TableCell key={j}>{val}</TableCell>)}</TableRow>)}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
