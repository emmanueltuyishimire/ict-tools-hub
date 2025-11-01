
'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface HighlightedTextProps {
    text: string;
    pattern: RegExp | null;
}

const HighlightedText: React.FC<HighlightedTextProps> = ({ text, pattern }) => {
    if (!text || !pattern) {
        return <>{text}</>;
    }

    try {
        const globalPattern = new RegExp(pattern.source, pattern.flags.includes('g') ? pattern.flags : pattern.flags + 'g');
        const parts = text.split(globalPattern);
        const matches = text.match(globalPattern);

        return (
            <p className="whitespace-pre-wrap font-code text-sm">
                {parts.map((part, index) => (
                    <React.Fragment key={index}>
                        {part}
                        {matches && index < matches.length && (
                            <span className="bg-primary/20 rounded-sm">{matches[index]}</span>
                        )}
                    </React.Fragment>
                ))}
            </p>
        );
    } catch (error) {
        return <p className="whitespace-pre-wrap font-code text-sm">{text}</p>;
    }
};

export function RegexTester() {
    const [pattern, setPattern] = useState('(\\w+@\\w+\\.\\w+)');
    const [flags, setFlags] = useState({ g: true, i: false, m: false });
    const [testString, setTestString] = useState('Contact us at support@example.com or for sales at sales@example.org.');
    const [error, setError] = useState<string | null>(null);

    const regex = useMemo(() => {
        try {
            const flagString = Object.entries(flags)
                .filter(([, value]) => value)
                .map(([key]) => key)
                .join('');
            setError(null);
            return new RegExp(pattern, flagString);
        } catch (e: any) {
            setError(e.message);
            return null;
        }
    }, [pattern, flags]);
    
    const matches = useMemo(() => {
        if (!regex || !testString) return [];
        
        try {
            const localRegex = new RegExp(regex.source, regex.flags);
            const allMatches: (RegExpExecArray)[] = [];
            if (localRegex.global) {
                let match;
                while ((match = localRegex.exec(testString)) !== null) {
                    allMatches.push(match);
                }
            } else {
                const match = localRegex.exec(testString);
                if (match) {
                    allMatches.push(match);
                }
            }
            return allMatches;
        } catch (e) {
            return [];
        }
    }, [regex, testString]);

    const handleFlagChange = (flag: 'g' | 'i' | 'm') => {
        setFlags(prev => ({ ...prev, [flag]: !prev[flag] }));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>JavaScript Regex Tester</CardTitle>
                <CardDescription>Enter a regular expression and a test string to see the matches in real-time.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="regex-pattern">Regular Expression</Label>
                    <div className='flex gap-2 items-center'>
                         <span className="font-mono text-muted-foreground">/</span>
                         <Input
                            id="regex-pattern"
                            value={pattern}
                            onChange={(e) => setPattern(e.target.value)}
                            placeholder="Your pattern here"
                            className="font-code flex-grow"
                        />
                         <span className="font-mono text-muted-foreground">/</span>
                         <div className="flex items-center space-x-4">
                            {['g', 'i', 'm'].map(flag => (
                                <div key={flag} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`flag-${flag}`}
                                        checked={flags[flag as keyof typeof flags]}
                                        onCheckedChange={() => handleFlagChange(flag as 'g' | 'i' | 'm')}
                                    />
                                    <Label htmlFor={`flag-${flag}`} className='font-mono'>{flag}</Label>
                                </div>
                            ))}
                        </div>
                    </div>
                     {error && (
                        <Alert variant="destructive" className="mt-2">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Invalid Regex</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="test-string">Test String</Label>
                    <Textarea
                        id="test-string"
                        value={testString}
                        onChange={(e) => setTestString(e.target.value)}
                        placeholder="Text to test your regex against..."
                        className="font-code h-40"
                    />
                    <div className="p-4 border rounded-md min-h-[8rem] bg-muted/50">
                        <HighlightedText text={testString} pattern={regex} />
                    </div>
                </div>

                {matches.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Match Information ({matches.length} found)</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <div className="space-y-4">
                                {matches.map((match, index) => (
                                    <div key={index} className="border p-4 rounded-lg bg-background">
                                        <h4 className="font-semibold flex items-center justify-between">
                                            <span>Match {index + 1}</span>
                                            <span className="text-xs font-normal text-muted-foreground">index: {match.index}</span>
                                        </h4>
                                        <div className="mt-2">
                                            <Badge variant="secondary" className="font-code text-base p-2">{match[0]}</Badge>
                                        </div>
                                        {match.length > 1 && (
                                            <div className="mt-4">
                                                <p className="text-sm font-medium mb-2">Capture Groups:</p>
                                                <ul className="space-y-2 list-decimal list-inside">
                                                    {match.slice(1).map((group, groupIndex) => (
                                                        <li key={groupIndex} className="text-sm">
                                                            <span className="font-code bg-muted px-2 py-1 rounded">{group}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}
                {pattern && testString && matches.length === 0 && !error && (
                     <Alert>
                        <AlertCircle className="h-4 w-4"/>
                        <AlertTitle>No Matches Found</AlertTitle>
                        <AlertDescription>
                           Your regular expression did not match any part of the test string. Try adjusting your pattern or flags.
                        </AlertDescription>
                    </Alert>
                )}

            </CardContent>
        </Card>
    );
}
