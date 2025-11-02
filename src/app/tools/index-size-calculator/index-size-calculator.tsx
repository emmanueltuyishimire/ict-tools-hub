
'use client';

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Plus, HardDrive, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type Column = {
    id: number;
    dataType: keyof typeof dataTypeSizes;
    length: number | '';
};

let nextId = 3;

// Average sizes for common data types in bytes
const dataTypeSizes: Record<string, { base: number, perChar?: boolean }> = {
    'INT': { base: 4 },
    'BIGINT': { base: 8 },
    'SMALLINT': { base: 2 },
    'BOOLEAN': { base: 1 },
    'FLOAT': { base: 4 },
    'DOUBLE': { base: 8 },
    'DECIMAL': { base: 16 },
    'DATE': { base: 3 },
    'DATETIME': { base: 8 },
    'TIMESTAMP': { base: 4 },
    'UUID': { base: 16 },
    'CHAR': { base: 0, perChar: true },
    'VARCHAR': { base: 2, perChar: true },
    'TEXT': { base: 4 }, // Pointer size
};

const INDEX_ROW_OVERHEAD = 24; // Average overhead per index entry in bytes (e.g., for B-Tree headers, pointers)

export function DatabaseIndexSizeCalculator() {
    const [columns, setColumns] = useState<Column[]>([
        { id: 1, dataType: 'INT', length: '' },
        { id: 2, dataType: 'VARCHAR', length: 50 },
    ]);
    const [rowCount, setRowCount] = useState<number | ''>(1000000);
    
    const results = useMemo(() => {
        let keySize = 0;
        columns.forEach(col => {
            const type = dataTypeSizes[col.dataType];
            if (!type) return;
            keySize += type.base;
            if (type.perChar && col.length) {
                keySize += col.length;
            }
        });

        const totalIndexEntrySize = keySize + INDEX_ROW_OVERHEAD;
        const numRows = Number(rowCount) || 0;
        const totalIndexSize = totalIndexEntrySize * numRows;

        return { keySize, totalIndexEntrySize, totalIndexSize };
    }, [columns, rowCount]);

    const handleAddColumn = () => {
        setColumns([...columns, { id: nextId++, dataType: 'VARCHAR', length: 255 }]);
    };
    
    const handleRemoveColumn = (id: number) => {
        if (columns.length > 1) {
            setColumns(columns.filter(c => c.id !== id));
        }
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
                <CardTitle>Index Size Estimator</CardTitle>
                <CardDescription>
                    Define the columns in your index and the table size to estimate storage requirements.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <Label>Columns in Index</Label>
                    {columns.map(col => (
                        <div key={col.id} className="grid grid-cols-12 gap-2 items-center">
                            <div className="col-span-7">
                                 <Select value={col.dataType} onValueChange={(v) => handleColumnChange(col.id, 'dataType', v)}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        {Object.keys(dataTypeSizes).map(dt => <SelectItem key={dt} value={dt}>{dt}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="col-span-4">
                                 <Input 
                                    type="number"
                                    value={col.length}
                                    onChange={(e) => handleColumnChange(col.id, 'length', Number(e.target.value))}
                                    placeholder="Length"
                                    disabled={!dataTypeSizes[col.dataType]?.perChar}
                                />
                            </div>
                            <div className="col-span-1">
                                <Button size="icon" variant="ghost" onClick={() => handleRemoveColumn(col.id)} aria-label="Remove column" disabled={columns.length <= 1}>
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                            </div>
                        </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={handleAddColumn}><Plus className="mr-2 h-4 w-4" />Add Column to Index</Button>
                </div>
                
                 <div className="space-y-2">
                    <Label htmlFor="row-count">Total Rows in Table</Label>
                    <Input id="row-count" type="number" value={rowCount} onChange={e => setRowCount(e.target.value === '' ? '' : parseInt(e.target.value))} />
                </div>

                <Card className="bg-muted/50">
                     <CardHeader>
                        <CardTitle className="text-lg">Index Size Estimation</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-center">
                         <div className="p-4 bg-background rounded-lg border-2 border-primary/50">
                            <Label className="flex items-center justify-center gap-1 text-primary"><HardDrive className="h-4 w-4"/> Total Estimated Index Size</Label>
                            <p className="text-3xl font-bold text-primary">{formatBytes(results.totalIndexSize)}</p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Based on an estimated key size of <strong>{results.keySize} bytes</strong> and row overhead of <strong>{INDEX_ROW_OVERHEAD} bytes</strong>, for a total of <strong>{results.totalIndexEntrySize} bytes per index entry</strong>.
                        </p>
                         <Alert>
                            <Info className="h-4 w-4"/>
                            <AlertTitle>This is a simplified estimate.</AlertTitle>
                            <AlertDescription>
                                Actual index size varies based on database engine, page fill factor, and data alignment. This tool provides a valuable baseline for capacity planning.
                            </AlertDescription>
                        </Alert>
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    );
}
