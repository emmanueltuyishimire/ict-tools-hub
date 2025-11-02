'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertCircle, Play, Plus, Trash2, FilePlus2 } from 'lucide-react';
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
  DialogClose
} from '@/components/ui/dialog';

// Default Sample data
const initialTables: { [key: string]: any[] } = {
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
        throw new Error(`Table not found: '${tableName}'. Available tables: ${Object.keys(data).join(', ')}.`);
    }

    let results = table;

    if (whereClause) {
        const whereMatch = whereClause.match(/([a-zA-Z0-9_]+)\s*(=|>|<|>=|<=|!=)\s*(?:'([^']*)'|"([^"]*)"|(\d+(?:\.\d+)?))/);
        if (!whereMatch) {
            throw new Error("Unsupported WHERE clause. Use 'column = 'value'', 'column > number', etc.");
        }
        const [, column, operator, stringValue1, stringValue2, numberValue] = whereMatch;

        if(table.length > 0 && !(column in table[0])) {
            throw new Error(`Column '${column}' not found in table '${tableName}'.`);
        }
        
        const value = stringValue1 !== undefined ? stringValue1 : (stringValue2 !== undefined ? stringValue2 : parseFloat(numberValue));
        
        results = table.filter((row: any) => {
           const rowValue = row[column];
           switch (operator) {
               case '=': return rowValue == value;
               case '!=': return rowValue != value;
               case '>': return rowValue > value;
               case '<': return rowValue < value;
               case '>=': return rowValue >= value;
               case '<=': return rowValue <= value;
               default: return false;
           }
        });
    }
    
    return results;
};

export function SqlQueryTester() {
    const [query, setQuery] = useState('SELECT * FROM users WHERE country = \'USA\'');
    const [results, setResults] = useState<any[]>([]);
    const [queryError, setQueryError] = useState('');
    const [headers, setHeaders] = useState<string[]>([]);
    
    const [tables, setTables] = useState(initialTables);

    const handleRunQuery = () => {
        try {
            setQueryError('');
            const queryResults = executeQuery(query, tables);
            setResults(queryResults);
            if (queryResults.length > 0) {
                setHeaders(Object.keys(queryResults[0]));
            } else {
                const tableNameMatch = query.match(/FROM\s+([a-zA-Z0-9_]+)/i);
                if (tableNameMatch) {
                    const tableName = tableNameMatch[1].toLowerCase();
                     if(tables[tableName] && tables[tableName].length > 0) {
                        setHeaders(Object.keys(tables[tableName][0]));
                    } else if (tables[tableName]) {
                        setHeaders([]); // Table exists but is empty
                    } else {
                        setHeaders([]);
                    }
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
    
    const handleTableChange = (tableName: string, rowIndex: number, column: string, value: string) => {
        setTables(prevTables => {
            const newTableData = [...prevTables[tableName]];
            const originalValue = newTableData[rowIndex][column];
            newTableData[rowIndex] = { ...newTableData[rowIndex], [column]: typeof originalValue === 'number' && !isNaN(Number(value)) ? Number(value) : value };
            return { ...prevTables, [tableName]: newTableData };
        });
    };

    const handleAddRow = (tableName: string) => {
        setTables(prevTables => {
            const table = prevTables[tableName];
            if (!table || table.length === 0) {
                 // If table is empty, create a row with a default 'id' column
                return { ...prevTables, [tableName]: [{ id: 1 }] };
            }
            const newRow = Object.keys(table[0]).reduce((acc, key) => {
                acc[key] = typeof table[0][key] === 'number' ? 0 : '';
                return acc;
            }, {} as any);
            return { ...prevTables, [tableName]: [...table, newRow] };
        });
    };

    const handleRemoveRow = (tableName: string, rowIndex: number) => {
        setTables(prevTables => ({
            ...prevTables,
            [tableName]: prevTables[tableName].filter((_, index) => index !== rowIndex)
        }));
    };

    const handleAddColumn = (tableName: string, columnName: string) => {
        if (!columnName || /[^a-zA-Z0-9_]/.test(columnName) || /^[0-9]/.test(columnName)) {
            alert('Invalid column name. Use only letters, numbers, and underscores, and do not start with a number.');
            return;
        }
        setTables(prevTables => ({
            ...prevTables,
            [tableName]: prevTables[tableName].map(row => ({...row, [columnName]: ''}))
        }));
    };

    const handleRemoveColumn = (tableName: string, columnName: string) => {
        setTables(prevTables => ({
            ...prevTables,
            [tableName]: prevTables[tableName].map(row => {
                const newRow = {...row};
                delete (newRow as any)[columnName];
                return newRow;
            })
        }));
    };

    const handleCreateTable = (tableName: string) => {
        if (!tableName || /[^a-zA-Z0-9_]/.test(tableName) || /^[0-9]/.test(tableName)) {
            alert('Invalid table name. Use only letters, numbers, and underscores, and do not start with a number.');
            return;
        }
        if (tables[tableName.toLowerCase()]) {
            alert(`Table '${tableName}' already exists.`);
            return;
        }
        setTables(prevTables => ({
            ...prevTables,
            [tableName.toLowerCase()]: [{ id: 1, name: 'new_value' }]
        }));
    };

     const handleRemoveTable = (tableName: string) => {
        if (window.confirm(`Are you sure you want to delete the table '${tableName}'? This cannot be undone.`)) {
             setTables(prevTables => {
                const newTables = {...prevTables};
                delete newTables[tableName];
                return newTables;
            });
        }
    };

    const handleBuildFromCsv = (tableName: string, csvData: string) => {
        if (!tableName || /[^a-zA-Z0-9_]/.test(tableName) || /^[0-9]/.test(tableName)) {
            alert('Invalid table name. Use only letters, numbers, and underscores, and do not start with a number.');
            return;
        }
        
        const lines = csvData.trim().split('\n');
        if (lines.length === 0) return;
        
        const headers = lines[0].split(',').map(h => h.trim());
        const dataRows = lines.slice(1).map(line => {
            const values = line.split(',');
            const row: {[key: string]: any} = {};
            headers.forEach((header, index) => {
                const value = values[index]?.trim() || '';
                row[header] = !isNaN(Number(value)) && value !== '' ? Number(value) : value;
            });
            return row;
        });
        
        setTables(prev => ({...prev, [tableName.toLowerCase()]: dataRows }));
    };

    const EditableTable = ({ tableName, data, onUpdate, onAddRow, onRemoveRow, onAddColumn, onRemoveColumn }: { tableName: string, data: any[], onUpdate: Function, onAddRow: Function, onRemoveRow: Function, onAddColumn: Function, onRemoveColumn: Function }) => {
        const [newColumnName, setNewColumnName] = useState('');
        if (!data) return null;
        
        const tableHeaders = data.length > 0 ? Object.keys(data[0]) : [];

        return (
            <div className="space-y-2 border p-4 rounded-lg">
                <div className='flex justify-between items-center'>
                    <h4 className="font-semibold capitalize">{tableName}</h4>
                    <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => handleRemoveTable(tableName)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                </div>
                {data.length === 0 ? (
                    <p className='text-sm text-muted-foreground'>This table is empty. Add a row or column to get started.</p>
                ) : (
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
                )}
                 <div className="flex gap-2 pt-2">
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
                                <DialogClose asChild>
                                    <Button onClick={() => { onAddColumn(tableName, newColumnName); setNewColumnName(''); }}>Add Column</Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                 </div>
            </div>
        )
    };
    
     const AddTableDialog = ({ trigger }: { trigger: React.ReactNode }) => {
        const [newTableName, setNewTableName] = useState('');
        return (
             <Dialog>
                <DialogTrigger asChild>{trigger}</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Table</DialogTitle>
                        <DialogDescription>
                            Enter a name for the new table. It will be initialized with a sample row and column.
                        </DialogDescription>
                    </DialogHeader>
                     <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="table-name" className="text-right">Table Name</Label>
                            <Input id="table-name" value={newTableName} onChange={(e) => setNewTableName(e.target.value)} className="col-span-3 font-code" />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                             <Button onClick={() => { handleCreateTable(newTableName); setNewTableName(''); }}>Create Table</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    };

    const BuildFromCsvDialog = ({ trigger }: { trigger: React.ReactNode }) => {
        const [tableName, setTableName] = useState('new_table');
        const [csv, setCsv] = useState('id,name,value\n1,item_a,100\n2,item_b,200');

        return (
             <Dialog>
                <DialogTrigger asChild>{trigger}</DialogTrigger>
                <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>
                        <DialogTitle>Build Table from Scratch</DialogTitle>
                        <DialogDescription>
                           Create or replace a table by pasting comma-separated data. The first line should be the headers.
                        </DialogDescription>
                    </DialogHeader>
                     <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                             <Label htmlFor="build-table-name">Table Name</Label>
                             <Input id="build-table-name" value={tableName} onChange={(e) => setTableName(e.target.value)} className="font-code" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="csv-data">Comma-Separated Data</Label>
                            <Textarea id="csv-data" value={csv} onChange={(e) => setCsv(e.target.value)} className="font-mono h-48" />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                             <Button onClick={() => { handleBuildFromCsv(tableName, csv); }}>Create / Replace Table</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        )
    }

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
                                                <TableCell key={`${rowIndex}-${header}`}>{String(row[header])}</TableCell>
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
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <CardTitle>Sample Data</CardTitle>
                                <CardDescription>You can query the following tables: {Object.keys(tables).join(', ')}.</CardDescription>
                            </div>
                            <TabsList>
                                <TabsTrigger value="view">View Data</TabsTrigger>
                                <TabsTrigger value="edit">Edit Data</TabsTrigger>
                            </TabsList>
                        </div>
                    </CardHeader>
                    <TabsContent value="view" className="p-6 pt-0 grid gap-6">
                        {Object.entries(tables).map(([tableName, data]) => (
                            <div key={tableName}>
                                <h4 className="font-semibold mb-2 capitalize">{tableName}</h4>
                                <div className="overflow-x-auto rounded-md border">
                                    <Table>
                                        <TableHeader><TableRow>{Object.keys(data[0] || {}).map(h => <TableHead key={h}>{h}</TableHead>)}</TableRow></TableHeader>
                                        <TableBody>
                                            {data.slice(0, 5).map((row: any, i: number) => <TableRow key={i}>{Object.values(row).map((val: any, j) => <TableCell key={j}>{String(val)}</TableCell>)}</TableRow>)}
                                            {data.length > 5 && <TableRow><TableCell colSpan={Object.keys(data[0] || {}).length} className="text-center text-muted-foreground">...and {data.length - 5} more rows</TableCell></TableRow>}
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>
                        ))}
                    </TabsContent>
                    <TabsContent value="edit" className="p-6 pt-0 space-y-6">
                        {Object.entries(tables).map(([tableName, data]) => (
                            <EditableTable key={tableName} tableName={tableName} data={data} onUpdate={handleTableChange} onAddRow={handleAddRow} onRemoveRow={handleRemoveRow} onAddColumn={handleAddColumn} onRemoveColumn={handleRemoveColumn}/>
                        ))}
                        <div className="flex gap-2">
                             <AddTableDialog trigger={
                                <Button><Plus className="mr-2 h-4 w-4" /> Create New Table</Button>
                             }/>
                            <BuildFromCsvDialog trigger={
                                <Button variant="secondary"><FilePlus2 className="mr-2 h-4 w-4" /> Build from Scratch</Button>
                            }/>
                        </div>
                    </TabsContent>
                </Tabs>
            </Card>
        </div>
    );
}