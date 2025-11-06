'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Plus, Database,Rows, HardDrive, Percent, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type Column = {
    id: number;
    name: string;
    dataType: keyof typeof dataTypeSizes;
    length: number | '';
};

let nextId = 5;

const dataTypeSizes: Record<string, { base: number, perChar?: boolean }> = {
    'INT': { base: 4 },
    'BIGINT': { base: 8 },
    'SMALLINT': { base: 2 },
    'TINYINT': { base: 1 },
    'BOOLEAN': { base: 1 },
    'FLOAT': { base: 4 },
    'DOUBLE': { base: 8 },
    'DECIMAL': { base: 16 }, // Approximate, can vary
    'DATE': { base: 3 },
    'DATETIME': { base: 8 },
    'TIMESTAMP': { base: 4 },
    'CHAR': { base: 0, perChar: true },
    'VARCHAR': { base: 2, perChar: true }, // 2 bytes for length + bytes for data
    'TEXT': { base: 4 }, // Pointer size, actual data stored elsewhere
    'UUID': { base: 16 },
};

export function DbStorageEstimator() {
    const [columns, setColumns] = useState<Column[]>([
        { id: 1, name: 'id', dataType: 'BIGINT', length: '' },
        { id: 2, name: 'email', dataType: 'VARCHAR', length: 128 },
        { id: 3, name: 'user_name', dataType: 'VARCHAR', length: 50 },
        { id: 4, name: 'created_at', dataType: 'TIMESTAMP', length: '' },
    ]);
    const [rowCount, setRowCount] = useState<number | ''>(1000000);
    const [overhead, setOverhead] = useState(25); // 25% for indexes and overhead
    
    const results = useMemo(() => {
        let rowSize = 0;
        columns.forEach(col => {
            const type = dataTypeSizes[col.dataType];
            if (!type) return;
            rowSize += type.base;
            if (type.perChar && col.length) {
                rowSize += col.length;
            }
        });
        
        const numRows = Number(rowCount) || 0;
        const rawTableSize = rowSize * numRows;
        const overheadSize = rawTableSize * (overhead / 100);
        const totalSize = rawTableSize + overheadSize;

        return { rowSize, rawTableSize, overheadSize, totalSize };
    }, [columns, rowCount, overhead]);

    const handleAddColumn = () => {
        setColumns([...columns, { id: nextId++, name: '', dataType: 'VARCHAR', length: 255 }]);
    };
    
    const handleRemoveColumn = (id: number) => {
        setColumns(columns.filter(c => c.id !== id));
    };

    const handleColumnChange = (id: number, field: keyof Column, value: string | number) => {
        setColumns(columns.map(c => (c.id === id ? { ...c, [field]: value } : c)));
    };
    
    const formatBytes = (bytes: number) => {
        if (bytes < 1024) return `${bytes.toFixed(0)} B`;
        if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(2)} KB`;
        if (bytes < 1024 ** 3) return `${(bytes / (1024 ** 2)).toFixed(2)} MB`;
        if (bytes < 1024 ** 4) return `${(bytes / (1024 ** 3)).toFixed(2)} GB`;
        return `${(bytes / (1024 ** 4)).toFixed(2)} TB`;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Database Storage Estimator</CardTitle>
                <CardDescription>
                    Define your table schema and row count to estimate total storage requirements.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <Label>Table Columns</Label>
                    {columns.map(col => (
                        <div key={col.id} className="grid grid-cols-12 gap-2 items-center">
                            <div className="col-span-5">
                                <Input value={col.name} onChange={(e) => handleColumnChange(col.id, 'name', e.target.value)} placeholder="Column Name"/>
                            </div>
                            <div className="col-span-3">
                                 <Select value={col.dataType} onValueChange={(v) => handleColumnChange(col.id, 'dataType', v)}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        {Object.keys(dataTypeSizes).map(dt => <SelectItem key={dt} value={dt}>{dt}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="col-span-3">
                                 <Input 
                                    type="number"
                                    value={col.length}
                                    onChange={(e) => handleColumnChange(col.id, 'length', Number(e.target.value))}
                                    placeholder="Length"
                                    disabled={!dataTypeSizes[col.dataType]?.perChar}
                                />
                            </div>
                            <div className="col-span-1">
                                <Button size="icon" variant="ghost" onClick={() => handleRemoveColumn(col.id)} aria-label="Remove column">
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                            </div>
                        </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={handleAddColumn}><Plus className="mr-2 h-4 w-4" />Add Column</Button>
                </div>
                
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="row-count">Estimated Row Count</Label>
                        <Input id="row-count" type="number" value={rowCount} onChange={e => setRowCount(e.target.value === '' ? '' : parseInt(e.target.value))} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="overhead">Index & Overhead (%)</Label>
                        <Input id="overhead" type="number" value={overhead} onChange={e => setOverhead(parseInt(e.target.value) || 0)} />
                    </div>
                </div>

                <Card className="bg-muted/50">
                     <CardHeader>
                        <CardTitle className="text-lg">Storage Estimation</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                        <div className="p-4 bg-background rounded-lg">
                            <Label className="flex items-center justify-center gap-1"><Rows className="h-4 w-4"/> Est. Size per Row</Label>
                            <p className="text-2xl font-semibold">{results.rowSize.toLocaleString()} bytes</p>
                        </div>
                         <div className="p-4 bg-background rounded-lg">
                            <Label className="flex items-center justify-center gap-1"><Percent className="h-4 w-4"/> Index/Overhead</Label>
                            <p className="text-2xl font-semibold">{formatBytes(results.overheadSize)}</p>
                        </div>
                         <div className="p-4 bg-background rounded-lg border-2 border-primary/50">
                            <Label className="flex items-center justify-center gap-1 text-primary"><HardDrive className="h-4 w-4"/> Total Estimated Size</Label>
                            <p className="text-3xl font-bold text-primary">{formatBytes(results.totalSize)}</p>
                        </div>
                    </CardContent>
                     <CardContent>
                         <Alert>
                            <Info className="h-4 w-4"/>
                            <AlertTitle>This is a simplified estimate.</AlertTitle>
                            <AlertDescription>
                                Actual storage usage can vary based on database engine, page size, fill factor, and data compression. This provides a valuable baseline for capacity planning.
                            </AlertDescription>
                        </Alert>
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    );
}
