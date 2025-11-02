
'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Copy, Check, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PasswordStrengthChecker } from '@/app/tools/password-strength-checker/password-strength-checker';

export function PasswordGenerator() {
    const [length, setLength] = useState(16);
    const [charSets, setCharSets] = useState({
        lowercase: true,
        uppercase: true,
        numbers: true,
        symbols: true,
    });
    const [exclude, setExclude] = useState('Il1O0');
    const [generatedPassword, setGeneratedPassword] = useState('');
    const { toast } = useToast();

    const characterPool = useMemo(() => {
        let pool = '';
        if (charSets.lowercase) pool += 'abcdefghijklmnopqrstuvwxyz';
        if (charSets.uppercase) pool += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (charSets.numbers) pool += '0123456789';
        if (charSets.symbols) pool += '!@#$%^&*()_+-=[]{};\':"\\|,.<>/?';

        const excludeChars = new Set(exclude.split(''));
        return pool.split('').filter(char => !excludeChars.has(char)).join('');
    }, [charSets, exclude]);

    const generatePassword = () => {
        if (!characterPool) {
            setGeneratedPassword('');
            toast({
                variant: 'destructive',
                title: 'No Characters Selected',
                description: 'Please select at least one character set to generate a password.',
            });
            return;
        }

        const cryptoArray = new Uint32Array(length);
        window.crypto.getRandomValues(cryptoArray);
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characterPool[cryptoArray[i] % characterPool.length];
        }
        setGeneratedPassword(result);
    };

    const copyPassword = () => {
        if (!generatedPassword) return;
        navigator.clipboard.writeText(generatedPassword).then(() => {
            toast({
                title: 'Password Copied!',
                description: 'The generated password has been copied to your clipboard.',
            });
        });
    };

    return (
        <div className="grid gap-8 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Generator Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <Label htmlFor="length-slider">Password Length</Label>
                            <span className="font-bold text-primary text-lg">{length}</span>
                        </div>
                        <Slider
                            id="length-slider"
                            min={8}
                            max={64}
                            step={1}
                            value={[length]}
                            onValueChange={(value) => setLength(value[0])}
                        />
                    </div>

                    <div className="space-y-4">
                        <Label>Character Sets</Label>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="lowercase" checked={charSets.lowercase} onCheckedChange={() => setCharSets(p => ({...p, lowercase: !p.lowercase}))} />
                                <Label htmlFor="lowercase" className="cursor-pointer">Lowercase (a-z)</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="uppercase" checked={charSets.uppercase} onCheckedChange={() => setCharSets(p => ({...p, uppercase: !p.uppercase}))} />
                                <Label htmlFor="uppercase" className="cursor-pointer">Uppercase (A-Z)</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="numbers" checked={charSets.numbers} onCheckedChange={() => setCharSets(p => ({...p, numbers: !p.numbers}))} />
                                <Label htmlFor="numbers" className="cursor-pointer">Numbers (0-9)</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="symbols" checked={charSets.symbols} onCheckedChange={() => setCharSets(p => ({...p, symbols: !p.symbols}))} />
                                <Label htmlFor="symbols" className="cursor-pointer">Symbols (!@#...)</Label>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="exclude-chars">Exclude Ambiguous Characters</Label>
                        <Input
                            id="exclude-chars"
                            value={exclude}
                            onChange={(e) => setExclude(e.target.value)}
                            placeholder="e.g., Il1O0"
                            className="font-code"
                        />
                    </div>
                     
                    <Button onClick={generatePassword} className="w-full">
                        <RefreshCw className="mr-2 h-4 w-4" /> Generate Password
                    </Button>
                    
                    {generatedPassword && (
                        <div className="space-y-2 pt-4">
                            <Label htmlFor="output-string">Generated Password</Label>
                            <div className="relative">
                                <Input
                                    id="output-string"
                                    readOnly
                                    value={generatedPassword}
                                    className="font-mono text-lg pr-10 h-12 bg-muted/50"
                                />
                                <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" onClick={copyPassword}>
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
            <div className="space-y-6">
                <PasswordStrengthChecker />
            </div>
        </div>
    );
}
