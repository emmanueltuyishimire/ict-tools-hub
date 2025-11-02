
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Default Sample data
const initialData = {
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
const executeQuery = (query: string, data: { [key: string]: any[] }) => {
    query = query.trim().replace(/;$/, '');
    const selectMatch = query.match(/^SELECT\s+(.+?)\s+FROM\s+([a-zA-Z0-9_]+)(?:\s+WHERE\s+(.+))?$/i);
    
    if (!selectMatch) {
        throw new Error("Invalid query format. Only 'SELECT * FROM table [WHERE condition]' is supported.");
    }
    
    const [, columns, tableName, whereClause] = selectMatch;
    
    if (columns.trim() !== '*') {
        throw new Error("Only 'SELECT *' is supported in this demo.");
    }

    const table = data[tableName.toLowerCase()];
    if (!table || !Array.isArray(table)) {
        throw new Error(`Table not found: '${tableName}'. Available tables: 'users', 'products'.`);
    }

    let results = table;

    if (whereClause) {
        const whereMatch = whereClause.match(/([a-zA-Z0-9_]+)\s*=\s*(?:'([^']*)'|"([^"]*)"|(\d+(?:\.\d+)?))/);
        if (!whereMatch) {
            throw new Error("Unsupported WHERE clause. Use 'column = 'value'', 'column = \"value\"', or 'column = number'.");
        }
        const [, column, stringValue1, stringValue2, numberValue] = whereMatch;

        if(!table[0] || !(column in table[0])) {
            throw new Error(`Column '${column}' not found in table '${tableName}'.`);
        }
        
        const value = stringValue1 !== undefined ? stringValue1 : (stringValue2 !== undefined ? stringValue2 : parseFloat(numberValue));
        
        results = table.filter((row: any) => row[column] == value);
    }
    
    return results;
};


export function SqlQueryTester() {
    const [query, setQuery] = useState('SELECT * FROM users WHERE country = \'USA\'');
    const [results, setResults] = useState<any[]>([]);
    const [queryError, setQueryError] = useState('');
    const [headers, setHeaders] = useState<string[]>([]);
    
    const [usersJson, setUsersJson] = useState(JSON.stringify(initialData.users, null, 2));
    const [productsJson, setProductsJson] = useState(JSON.stringify(initialData.products, null, 2));
    const [jsonError, setJsonError] = useState('');

    const currentData = useMemo(() => {
        try {
            setJsonError('');
            return {
                users: JSON.parse(usersJson),
                products: JSON.parse(productsJson),
            };
        } catch (e) {
            setJsonError('Invalid JSON format in one of the tables. Please correct it before running a query.');
            return null;
        }
    }, [usersJson, productsJson]);
    
    const handleRunQuery = () => {
        if (!currentData || jsonError) {
             setQueryError(jsonError || 'Cannot run query due to invalid table data.');
             return;
        }
        try {
            setQueryError('');
            const queryResults = executeQuery(query, currentData);
            setResults(queryResults);
            if (queryResults.length > 0) {
                setHeaders(Object.keys(queryResults[0]));
            } else {
                // If there are no results, we can try to infer headers from the table definition
                const tableName = query.match(/FROM\s+([a-zA-Z0-9_]+)/i)?.[1].toLowerCase();
                if(tableName && currentData[tableName] && currentData[tableName].length > 0) {
                    setHeaders(Object.keys(currentData[tableName][0]));
                } else {
                    setHeaders([]);
                }
            }
        } catch (e: any) {
            setQueryError(e.message);
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
                    
                    {queryError && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Query Error</AlertTitle>
                            <AlertDescription>{queryError}</AlertDescription>
                        </Alert>
                    )}
                </CardContent>
            </Card>

            {(results.length > 0 || (headers.length > 0 && results.length === 0)) && (
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
                         {results.length === 0 && <p className="text-sm text-muted-foreground mt-4">Query executed successfully, but returned no results.</p>}
                    </CardContent>
                </Card>
            )}

            <Card>
                 <Tabs defaultValue="view" className="w-full">
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle>Sample Data</CardTitle>
                            <TabsList>
                                <TabsTrigger value="view">View Data</TabsTrigger>
                                <TabsTrigger value="edit">Edit Data (JSON)</TabsTrigger>
                            </TabsList>
                        </div>
                         <CardDescription>You can query the following tables: `users` and `products`.</CardDescription>
                    </CardHeader>
                    <TabsContent value="view" className="p-6 pt-0 grid gap-6 md:grid-cols-2">
                         <div>
                            <h4 className="font-semibold mb-2">users</h4>
                            <div className="overflow-x-auto rounded-md border">
                                <Table>
                                    <TableHeader><TableRow>{Object.keys(initialData.users[0]).map(h => <TableHead key={h}>{h}</TableHead>)}</TableRow></TableHeader>
                                    <TableBody>
                                        {currentData?.users?.slice(0, 5).map((row: any, i: number) => <TableRow key={i}>{Object.values(row).map((val: any, j) => <TableCell key={j}>{val}</TableCell>)}</TableRow>)}
                                         {currentData && currentData.users.length > 5 && <TableRow><TableCell colSpan={Object.keys(initialData.users[0]).length} className="text-center text-muted-foreground">...and more</TableCell></TableRow>}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2">products</h4>
                            <div className="overflow-x-auto rounded-md border">
                                <Table>
                                    <TableHeader><TableRow>{Object.keys(initialData.products[0]).map(h => <TableHead key={h}>{h}</TableHead>)}</TableRow></TableHeader>
                                    <TableBody>
                                        {currentData?.products?.slice(0,5).map((row: any, i: number) => <TableRow key={i}>{Object.values(row).map((val: any, j) => <TableCell key={j}>{val}</TableCell>)}</TableRow>)}
                                        {currentData && currentData.products.length > 5 && <TableRow><TableCell colSpan={Object.keys(initialData.products[0]).length} className="text-center text-muted-foreground">...and more</TableCell></TableRow>}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="edit" className="p-6 pt-0 space-y-6">
                        {jsonError && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>JSON Error</AlertTitle>
                                <AlertDescription>{jsonError}</AlertDescription>
                            </Alert>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="users-json">users table (JSON)</Label>
                            <Textarea
                                id="users-json"
                                value={usersJson}
                                onChange={(e) => setUsersJson(e.target.value)}
                                className="font-mono h-48"
                            />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="products-json">products table (JSON)</Label>
                            <Textarea
                                id="products-json"
                                value={productsJson}
                                onChange={(e) => setProductsJson(e.target.value)}
                                className="font-mono h-48"
                            />
                        </div>
                    </TabsContent>
                </Tabs>
            </Card>
        </div>
    );
}
