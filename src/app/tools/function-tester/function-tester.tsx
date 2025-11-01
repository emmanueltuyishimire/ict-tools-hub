'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Play, AlertCircle } from 'lucide-react';
import { CodeBlock } from '@/components/code-block';

export function FunctionTester() {
    const [functionBody, setFunctionBody] = useState('// Your function should return a value\nreturn a + b;');
    const [params, setParams] = useState('10, 20');
    const [output, setOutput] = useState<{ result: any; error: string | null }>({ result: null, error: null });

    const handleRun = () => {
        try {
            // Basic sanitization for parameter names if needed, though Function constructor is somewhat sandboxed
            const paramNames = ['a', 'b', 'c', 'd', 'e'].slice(0, params.split(',').length);
            
            // This creates a new function in a safer scope than eval()
            const func = new Function(...paramNames, functionBody);
            
            // Parse parameters
            const paramValues = JSON.parse(`[${params}]`);

            const result = func(...paramValues);
            
            setOutput({ result: JSON.stringify(result, null, 2), error: null });
        } catch (e: any) {
            setOutput({ result: null, error: e.toString() });
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>JavaScript Function Tester</CardTitle>
                <CardDescription>Write a JavaScript function body, provide parameters, and see the result.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="function-body">Function Body (JavaScript)</Label>
                    <Textarea
                        id="function-body"
                        value={functionBody}
                        onChange={(e) => setFunctionBody(e.target.value)}
                        placeholder="return a * b;"
                        className="font-code h-40"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="params">Parameters (comma-separated)</Label>
                    <Textarea
                        id="params"
                        value={params}
                        onChange={(e) => setParams(e.target.value)}
                        placeholder="e.g., 10, 'hello', [1, 2]"
                        className="font-code h-20"
                    />
                    <p className="text-xs text-muted-foreground">Parameters are assigned to variables a, b, c, etc. Ensure they are valid JSON values (e.g., strings in double quotes).</p>
                </div>

                <Button onClick={handleRun}>
                    <Play className="mr-2 h-4 w-4" /> Run Test
                </Button>

                {(output.result !== null || output.error) && (
                    <div className="space-y-2">
                        <Label>Output</Label>
                        {output.error ? (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Execution Error</AlertTitle>
                                <AlertDescription className="font-mono">{output.error}</AlertDescription>
                            </Alert>
                        ) : (
                             <CodeBlock code={output.result as string} language="json" />
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
