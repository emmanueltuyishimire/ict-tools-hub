
'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table"

const calculateEntropyDetails = (password: string) => {
    if (!password) return { entropy: 0, poolSize: 0, length: 0 };
    
    let charPool = new Set<string>();
    let poolSize = 0;
    
    const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
    const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+-=[]{};':\"\\|,.<>/?";

    if (/[a-z]/.test(password)) {
        lowerCaseChars.split('').forEach(c => charPool.add(c));
        poolSize += 26;
    }
    if (/[A-Z]/.test(password)) {
        upperCaseChars.split('').forEach(c => charPool.add(c));
        poolSize += 26;
    }
    if (/\d/.test(password)) {
        numberChars.split('').forEach(c => charPool.add(c));
        poolSize += 10;
    }
    // A simplified but effective approximation for symbols
    if (/[^a-zA-Z0-9]/.test(password)) {
        symbolChars.split('').forEach(c => charPool.add(c));
        poolSize += 32;
    }

    if (poolSize === 0) return { entropy: 0, poolSize: 0, length: password.length };
    
    const entropy = password.length * Math.log2(poolSize);
    
    return { 
        entropy: parseFloat(entropy.toFixed(2)), 
        poolSize, 
        length: password.length 
    };
};

const getStrengthLabel = (entropy: number) => {
    if (entropy === 0) return { label: 'Enter a password', color: 'text-muted-foreground' };
    if (entropy < 40) return { label: 'Very Weak', color: 'text-red-500' };
    if (entropy < 60) return { label: 'Weak', color: 'text-orange-500' };
    if (entropy < 80) return { label: 'Medium', color: 'text-yellow-500' };
    if (entropy < 120) return { label: 'Strong', color: 'text-green-500' };
    return { label: 'Very Strong', color: 'text-emerald-600' };
};


export function PasswordEntropyCalculator() {
    const [password, setPassword] = useState('Correct-Horse-Battery-Staple');
    const [showPassword, setShowPassword] = useState(false);

    const { entropy, poolSize, length } = useMemo(() => calculateEntropyDetails(password), [password]);
    const { label, color } = useMemo(() => getStrengthLabel(entropy), [entropy]);
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Entropy Calculator</CardTitle>
                <CardDescription>
                    Enter a password to calculate its entropy in bits.
                    <span className="block mt-2 font-semibold text-destructive">This tool is 100% client-side. Your password never leaves your browser.</span>
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="password-input">Password</Label>
                    <div className="relative">
                        <Input
                            id="password-input"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password to calculate entropy"
                            className="pr-10"
                            aria-label="Password for entropy calculation"
                        />
                        <Button
                            size="icon"
                            variant="ghost"
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-6 text-center">
                        <CardTitle className={cn("text-5xl font-bold mb-2", color)}>{entropy}</CardTitle>
                        <CardDescription>Bits of Entropy</CardDescription>
                    </Card>
                     <Card className="p-6 text-center bg-muted/50">
                        <CardTitle className="text-2xl font-bold">{label}</CardTitle>
                        <CardDescription>Strength Assessment</CardDescription>
                    </Card>
                </div>
                
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Calculation Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-center font-mono text-sm text-muted-foreground mb-4 bg-muted p-2 rounded-md">
                           Entropy = Length × log<sub>2</sub>(Character Pool)
                        </p>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableHead className="w-1/3">Password Length (L)</TableHead>
                                    <TableCell className="font-mono">{length}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableHead>Character Pool Size (R)</TableHead>
                                    <TableCell className="font-mono">{poolSize}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableHead>Calculation</TableHead>
                                    <TableCell className="font-mono">{length} &times; log<sub>2</sub>({poolSize}) = {entropy} bits</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    );
}
