
'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertCircle, Play, Plus, Trash2 } from 'lucide-react';
import { CodeBlock } from '@/components/code-block';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';

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
    
    const [userData, setUserData] = useState(initialData.users);
    const [productsData, setProductsData] = useState(initialData.products);

    const currentData = {
        users: userData,
        products: productsData,
    };
    
    const handleRunQuery = () => {
        try {
            setQueryError('');
            const queryResults = executeQuery(query, currentData);
            setResults(queryResults);
            if (queryResults.length > 0) {
                setHeaders(Object.keys(queryResults[0]));
            } else {
                const tableName = query.match(/FROM\s+([a-zA-Z0-9_]+)/i)?.[1].toLowerCase();
                if(tableName && currentData[tableName as keyof typeof currentData] && currentData[tableName as keyof typeof currentData].length > 0) {
                    setHeaders(Object.keys(currentData[tableName as keyof typeof currentData][0]));
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
    
    const handleTableChange = (tableName: 'users' | 'products', rowIndex: number, column: string, value: string) => {
        const setData = tableName === 'users' ? setUserData : setProductsData;
        setData(prevData => {
            const newData = [...prevData];
            const originalValue = newData[rowIndex][column];
            newData[rowIndex] = { ...newData[rowIndex], [column]: typeof originalValue === 'number' && !isNaN(Number(value)) ? Number(value) : value };
            return newData;
        });
    };

    const handleAddRow = (tableName: 'users' | 'products') => {
        const setData = tableName === 'users' ? setUserData : setProductsData;
        const data = tableName === 'users' ? userData : productsData;
        const newRow = Object.keys(data[0] || {}).reduce((acc, key) => {
            acc[key] = typeof data[0][key] === 'number' ? 0 : '';
            return acc;
        }, {} as any);
        setData(prevData => [...prevData, newRow]);
    };

    const handleRemoveRow = (tableName: 'users' | 'products', rowIndex: number) => {
        const setData = tableName === 'users' ? setUserData : setProductsData;
        setData(prevData => prevData.filter((_, index) => index !== rowIndex));
    };

    const handleAddColumn = (tableName: 'users' | 'products', columnName: string) => {
        if (!columnName || /[^a-zA-Z0-9_]/.test(columnName) || /^[0-9]/.test(columnName)) {
            alert('Invalid column name. Use only letters, numbers, and underscores, and do not start with a number.');
            return;
        }
        const setData = tableName === 'users' ? setUserData : setProductsData;
        setData(prevData => prevData.map(row => ({...row, [columnName]: ''})));
    };

    const handleRemoveColumn = (tableName: 'users' | 'products', columnName: string) => {
        const setData = tableName === 'users' ? setUserData : setProductsData;
        setData(prevData => {
            return prevData.map(row => {
                const newRow = {...row};
                delete (newRow as any)[columnName];
                return newRow;
            });
        });
    };

    const EditableTable = ({ tableName, data, onUpdate, onAddRow, onRemoveRow, onAddColumn, onRemoveColumn }: { tableName: 'users'|'products', data: any[], onUpdate: Function, onAddRow: Function, onRemoveRow: Function, onAddColumn: Function, onRemoveColumn: Function }) => {
        const [newColumnName, setNewColumnName] = useState('');
        if (!data || data.length === 0) return (
             <div className="space-y-2">
                <h4 className="font-semibold capitalize">{tableName}</h4>
                <p className='text-sm text-muted-foreground'>No data to display. Add a row to get started.</p>
                <Button size="sm" variant="outline" onClick={() => onAddRow(tableName)}><Plus className="mr-2 h-4 w-4" /> Add Row to {tableName}</Button>
            </div>
        );
        const tableHeaders = Object.keys(data[0]);
        return (
            <div className="space-y-2">
                <h4 className="font-semibold capitalize">{tableName}</h4>
                <div className="overflow-x-auto rounded-md border">
                    <Table>
                        <TableHeader><TableRow>{tableHeaders.map(h => 
                            <TableHead key={h} className="relative group">
                                {h}
                                <Button size="icon" variant="ghost" className="h-5 w-5 absolute top-1 right-0 opacity-0 group-hover:opacity-100" onClick={() => onRemoveColumn(tableName, h)}>
                                    <Trash2 className="h-3 w-3 text-destructive" />
                                </Button>
                            </TableHead>
                        )}<TableHead className="w-[50px]"></TableHead></TableRow></TableHeader>
                        <TableBody>
                            {data.map((row, rowIndex) => (
                                <TableRow key={rowIndex}>
                                    {tableHeaders.map(header => (
                                        <TableCell key={header}>
                                            <Input
                                                value={row[header]}
                                                onChange={(e) => onUpdate(tableName, rowIndex, header, e.target.value)}
                                                className="h-8 font-mono"
                                                type={typeof row[header] === 'number' ? 'number' : 'text'}
                                            />
                                        </TableCell>
                                    ))}
                                    <TableCell>
                                        <Button size="icon" variant="ghost" onClick={() => onRemoveRow(tableName, rowIndex)}>
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                 <div className="flex gap-2">
                     <Button size="sm" variant="outline" onClick={() => onAddRow(tableName)}><Plus className="mr-2 h-4 w-4" /> Add Row</Button>
                     <Dialog>
                        <DialogTrigger asChild>
                            <Button size="sm" variant="outline"><Plus className="mr-2 h-4 w-4" /> Add Column</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add New Column to '{tableName}'</DialogTitle>
                                <DialogDescription>
                                    Enter a name for the new column. It will be added to all rows with an empty default value.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="column-name" className="text-right">Column Name</Label>
                                    <Input id="column-name" value={newColumnName} onChange={(e) => setNewColumnName(e.target.value)} className="col-span-3 font-code" />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button onClick={() => { onAddColumn(tableName, newColumnName); setNewColumnName(''); }}>Add Column</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                 </div>
            </div>
        )
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
                                <TabsTrigger value="edit">Edit Data</TabsTrigger>
                            </TabsList>
                        </div>
                         <CardDescription>You can query the following tables: `users` and `products`.</CardDescription>
                    </CardHeader>
                    <TabsContent value="view" className="p-6 pt-0 grid gap-6 md:grid-cols-2">
                         <div>
                            <h4 className="font-semibold mb-2">users</h4>
                            <div className="overflow-x-auto rounded-md border">
                                <Table>
                                    <TableHeader><TableRow>{Object.keys(userData[0] || {}).map(h => <TableHead key={h}>{h}</TableHead>)}</TableRow></TableHeader>
                                    <TableBody>
                                        {userData.slice(0, 5).map((row: any, i: number) => <TableRow key={i}>{Object.values(row).map((val: any, j) => <TableCell key={j}>{val}</TableCell>)}</TableRow>)}
                                         {userData.length > 5 && <TableRow><TableCell colSpan={Object.keys(userData[0] || {}).length} className="text-center text-muted-foreground">...and more</TableCell></TableRow>}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2">products</h4>
                            <div className="overflow-x-auto rounded-md border">
                                <Table>
                                    <TableHeader><TableRow>{Object.keys(productsData[0] || {}).map(h => <TableHead key={h}>{h}</TableHead>)}</TableRow></TableHeader>
                                    <TableBody>
                                        {productsData.slice(0,5).map((row: any, i: number) => <TableRow key={i}>{Object.values(row).map((val: any, j) => <TableCell key={j}>{val}</TableCell>)}</TableRow>)}
                                        {productsData.length > 5 && <TableRow><TableCell colSpan={Object.keys(productsData[0] || {}).length} className="text-center text-muted-foreground">...and more</TableCell></TableRow>}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="edit" className="p-6 pt-0 space-y-6">
                        <EditableTable tableName="users" data={userData} onUpdate={handleTableChange} onAddRow={handleAddRow} onRemoveRow={handleRemoveRow} onAddColumn={handleAddColumn} onRemoveColumn={handleRemoveColumn}/>
                        <EditableTable tableName="products" data={productsData} onUpdate={handleTableChange} onAddRow={handleAddRow} onRemoveRow={handleRemoveRow} onAddColumn={handleAddColumn} onRemoveColumn={handleRemoveColumn} />
                    </TabsContent>
                </Tabs>
            </Card>
        </div>
    );
}
