
'use client';

import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';


// --- Password Analysis Logic ---
const checkPasswordStrength = (password: string) => {
    let score = 0;
    const checks = {
        length: password.length >= 12,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /\d/.test(password),
        specialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    };

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (checks.uppercase) score++;
    if (checks.lowercase) score++;
    if (checks.number) score++;
    if (checks.specialChar) score++;

    // Bonus for mixing character types
    const typesCount = Object.values(checks).filter(v => v === true).length - (checks.length && checks.length ? 1 : 0);
    if (typesCount >= 3) score++;
    if (typesCount >= 4) score++;
    
    // Penalize common patterns
    if (/(.)\1\1/.test(password)) score = Math.max(0, score - 1); // Repeated characters
    if (/123|abc|password|qwerty/i.test(password)) score = Math.max(0, score - 2);

    return { score: Math.min(score, 8), checks };
};

const calculateEntropy = (password: string) => {
    if (!password) return 0;
    let charPool = 0;
    if (/[a-z]/.test(password)) charPool += 26;
    if (/[A-Z]/.test(password)) charPool += 26;
    if (/\d/.test(password)) charPool += 10;
    if (/[^a-zA-Z0-9]/.test(password)) charPool += 32; // Approximate special characters
    if (charPool === 0) return 0;
    
    const entropy = password.length * Math.log2(charPool);
    return parseFloat(entropy.toFixed(2));
};

const getStrengthLabel = (score: number, length: number) => {
    if (length === 0) return { label: 'Start Typing...', color: 'bg-muted' };
    if (score < 3) return { label: 'Very Weak', color: 'bg-red-500' };
    if (score < 4) return { label: 'Weak', color: 'bg-orange-500' };
    if (score < 6) return { label: 'Medium', color: 'bg-yellow-500' };
    if (score < 8) return { label: 'Strong', color: 'bg-green-500' };
    return { label: 'Very Strong', color: 'bg-emerald-600' };
};

// --- Component ---
export function PasswordStrengthChecker() {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [analysis, setAnalysis] = useState({ score: 0, checks: {}, entropy: 0 });

    useEffect(() => {
        const scoreChecks = checkPasswordStrength(password);
        const entropyValue = calculateEntropy(password);
        setAnalysis({ ...scoreChecks, entropy: entropyValue });
    }, [password]);

    const { label, color } = getStrengthLabel(analysis.score, password.length);
    const strengthPercentage = password.length > 0 ? (analysis.score / 8) * 100 : 0;
    
    const checklistItems = [
        { label: "At least 12 characters long", met: analysis.checks.length },
        { label: "Contains lowercase letters (a-z)", met: analysis.checks.lowercase },
        { label: "Contains uppercase letters (A-Z)", met: analysis.checks.uppercase },
        { label: "Contains numbers (0-9)", met: analysis.checks.number },
        { label: "Contains special characters (!@#...)", met: analysis.checks.specialChar },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Real-Time Password Analyzer</CardTitle>
                <CardDescription>
                    Enter a password below to see a real-time analysis of its strength.
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
                            placeholder="Enter password to test"
                            className="pr-10"
                            aria-label="Password to check"
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
                
                <div className='space-y-3'>
                     <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Strength: <strong className={cn(color.replace('bg-', 'text-'))}>{label}</strong></span>
                         <span className="text-sm font-medium">Entropy: <Link href="/tools/password-entropy-calculator" className="text-primary hover:underline font-bold font-code">{analysis.entropy} bits</Link></span>
                     </div>
                    <Progress value={strengthPercentage} className={cn('h-3 transition-all', color)} />
                </div>

                <div>
                    <ul className="space-y-2">
                       {checklistItems.map((item, index) => (
                           <li key={index} className={cn("flex items-center text-sm", item.met ? 'text-green-600' : 'text-muted-foreground')}>
                               {item.met ? <CheckCircle className="h-4 w-4 mr-2" /> : <XCircle className="h-4 w-4 mr-2" />}
                               {item.label}
                           </li>
                       ))}
                    </ul>
                </div>

            </CardContent>
        </Card>
    );
}
