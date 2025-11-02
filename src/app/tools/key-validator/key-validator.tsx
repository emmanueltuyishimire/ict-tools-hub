
'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle, Trash2, Plus, KeyRound } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

type ValidationResult = {
    isValid: boolean;
    errors: string[];
};

const validateKeys = (primaryKeys: (string|number)[], foreignKeys: (string|number)[]): ValidationResult => {
    const errors: string[] = [];
    const primaryKeySet = new Set<string|number>();

    // Check for duplicate primary keys
    for (const pk of primaryKeys) {
        if (pk === '' || pk === null) {
            errors.push('Primary keys cannot be empty or null.');
            break;
        }
        if (primaryKeySet.has(pk)) {
            errors.push(`Duplicate primary key found: "${pk}". Primary keys must be unique.`);
        }
        primaryKeySet.add(pk);
    }
    
    // Check for foreign keys that don't exist in the primary key set
    for (const fk of foreignKeys) {
        if (fk !== '' && fk !== null && !primaryKeySet.has(fk)) {
             errors.push(`Referential integrity violation: Foreign key "${fk}" does not exist in the parent table's primary keys.`);
        }
    }
    
    return {
        isValid: errors.length === 0,
        errors,
    };
};

export function PrimaryForeignKeyValidator() {
    const [primaryKeys, setPrimaryKeys] = useState<string[]>(['101', '102', '103', '104']);
    const [foreignKeys, setForeignKeys] = useState<string[]>(['101', '101', '103', '', '102']);
    
    const [validationResult, setValidationResult] = useState<ValidationResult>({ isValid: true, errors: [] });

    useEffect(() => {
        const pkAsNumbersOrStrings = primaryKeys.map(pk => !isNaN(Number(pk)) && pk !== '' ? Number(pk) : pk);
        const fkAsNumbersOrStrings = foreignKeys.map(fk => !isNaN(Number(fk)) && fk !== '' ? Number(fk) : fk);
        setValidationResult(validateKeys(pkAsNumbersOrStrings, fkAsNumbersOrStrings));
    }, [primaryKeys, foreignKeys]);

    const handleKeyChange = (keys: string[], setKeys: Function, index: number, value: string) => {
        const newKeys = [...keys];
        newKeys[index] = value;
        setKeys(newKeys);
    };

    const handleAddKey = (keys: string[], setKeys: Function) => {
        setKeys([...keys, '']);
    };
    
    const handleRemoveKey = (keys: string[], setKeys: Function, index: number) => {
        setKeys(keys.filter((_, i) => i !== index));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Referential Integrity Validator</CardTitle>
                <CardDescription>
                    Enter your primary and foreign keys below to check for referential integrity.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Primary Key Table */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg text-center">Parent Table</h3>
                         <Card className="p-4 bg-muted/50">
                            <CardHeader className="p-2 pt-0 text-center">
                                <CardTitle className="text-base">Primary Keys</CardTitle>
                            </CardHeader>
                             <CardContent className="p-2 space-y-2">
                                {primaryKeys.map((pk, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <Input
                                            value={pk}
                                            onChange={(e) => handleKeyChange(primaryKeys, setPrimaryKeys, index, e.target.value)}
                                            placeholder="Enter PK"
                                            className="font-code"
                                        />
                                         <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => handleRemoveKey(primaryKeys, setPrimaryKeys, index)}>
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </div>
                                ))}
                                <Button size="sm" variant="outline" className="w-full" onClick={() => handleAddKey(primaryKeys, setPrimaryKeys)}><Plus className="mr-2 h-4 w-4" /> Add Primary Key</Button>
                            </CardContent>
                         </Card>
                    </div>
                    {/* Foreign Key Table */}
                    <div className="space-y-4">
                         <h3 className="font-semibold text-lg text-center">Child Table</h3>
                         <Card className="p-4 bg-muted/50">
                            <CardHeader className="p-2 pt-0 text-center">
                                <CardTitle className="text-base">Foreign Keys</CardTitle>
                            </CardHeader>
                             <CardContent className="p-2 space-y-2">
                                {foreignKeys.map((fk, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <Input
                                            value={fk}
                                            onChange={(e) => handleKeyChange(foreignKeys, setForeignKeys, index, e.target.value)}
                                            placeholder="Enter FK (or leave empty for NULL)"
                                            className="font-code"
                                        />
                                         <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => handleRemoveKey(foreignKeys, setForeignKeys, index)}>
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </div>
                                ))}
                                <Button size="sm" variant="outline" className="w-full" onClick={() => handleAddKey(foreignKeys, setForeignKeys)}><Plus className="mr-2 h-4 w-4" /> Add Foreign Key</Button>
                            </CardContent>
                         </Card>
                    </div>
                </div>
                 <Separator />
                 <div>
                    <h3 className="font-semibold mb-4 text-lg">Validation Result</h3>
                    {validationResult.isValid ? (
                        <Alert className="border-green-500/50">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <AlertTitle className="text-green-700">Validation Passed</AlertTitle>
                            <AlertDescription>
                                Referential integrity is maintained. All foreign keys are valid.
                            </AlertDescription>
                        </Alert>
                    ) : (
                        <Alert variant="destructive">
                             <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Validation Failed</AlertTitle>
                            <AlertDescription>
                                <ul className="list-disc pl-5 space-y-1">
                                    {validationResult.errors.map((err, i) => <li key={i}>{err}</li>)}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

