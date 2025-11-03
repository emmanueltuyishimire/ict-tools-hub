
'use client';

import { useState } from 'react';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CodeBlock } from '@/components/code-block';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Wand, Bot } from 'lucide-react';
// import { generateCode } from './actions';

type Language = 'javascript' | 'python' | 'html' | 'css';

const formSchema = z.object({
  mode: z.enum(['generate', 'debug']),
  language: z.enum(['javascript', 'python', 'html', 'css']),
  requirements: z.string().min(10, 'Please provide more detail in your requirements.'),
  codeSnippet: z.string().optional(),
  problem: z.string().optional(),
}).refine(data => {
    if (data.mode === 'debug') {
        return !!data.codeSnippet && data.codeSnippet.length > 10;
    }
    return true;
}, {
    message: 'A code snippet is required for debugging.',
    path: ['codeSnippet'],
});

type FormData = z.infer<typeof formSchema>;

async function generateCode(data: FormData): Promise<{success: boolean; message?: string; code?: string; explanation?: string;}> {
    return {
        success: false,
        message: "The AI Code Generator is disabled in this static deployment environment. It requires a server to function."
    }
}


export function CodeForm() {
    const [mode, setMode] = useState<'generate' | 'debug'>('generate');
    const [generatedCode, setGeneratedCode] = useState('');
    const [explanation, setExplanation] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            mode: 'generate',
            language: 'javascript',
            requirements: 'Create a function that returns the factorial of a number.',
        },
    });

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        setGeneratedCode('');
        setExplanation('');
        setError('');
        
        const result = await generateCode(data);

        if (result.success) {
            setGeneratedCode(result.code || '');
            setExplanation(result.explanation || '');
        } else {
            setError(result.message || 'An unknown error occurred.');
        }
        setIsLoading(false);
    };

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Tabs value={mode} onValueChange={(value) => {
                    setMode(value as 'generate' | 'debug');
                    form.setValue('mode', value as 'generate' | 'debug');
                }} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="generate">Generate Code</TabsTrigger>
                        <TabsTrigger value="debug">Debug Code</TabsTrigger>
                    </TabsList>
                    <TabsContent value="generate" className="space-y-4 pt-4">
                        <div className="space-y-2">
                            <Label htmlFor="gen-requirements">What do you want to build?</Label>
                            <Textarea
                                id="gen-requirements"
                                {...form.register('requirements')}
                                placeholder="e.g., A React component for a pricing table with three tiers."
                                className="h-24"
                            />
                            {form.formState.errors.requirements && <p className="text-sm text-destructive">{form.formState.errors.requirements.message}</p>}
                        </div>
                    </TabsContent>
                    <TabsContent value="debug" className="space-y-4 pt-4">
                        <div className="space-y-2">
                             <Label htmlFor="debug-snippet">Code Snippet to Debug</Label>
                             <Textarea
                                id="debug-snippet"
                                {...form.register('codeSnippet')}
                                placeholder="Paste your code snippet here."
                                className="font-mono h-32"
                            />
                             {form.formState.errors.codeSnippet && <p className="text-sm text-destructive">{form.formState.errors.codeSnippet.message}</p>}
                        </div>
                         <div className="space-y-2">
                             <Label htmlFor="debug-problem">Describe the Problem</Label>
                             <Textarea
                                id="debug-problem"
                                {...form.register('problem')}
                                placeholder="e.g., 'This code should return 'true' but it returns 'false'. I'm getting a TypeError.'"
                                className="h-24"
                            />
                        </div>
                    </TabsContent>
                </Tabs>

                <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select onValueChange={(value) => form.setValue('language', value as Language)} defaultValue={form.getValues('language')}>
                        <SelectTrigger id="language">
                            <SelectValue placeholder="Select a language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="javascript">JavaScript</SelectItem>
                            <SelectItem value="python">Python</SelectItem>
                            <SelectItem value="html">HTML</SelectItem>
                            <SelectItem value="css">CSS</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                
                <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? (
                        <>
                            <Bot className="mr-2 h-4 w-4 animate-spin" />
                            Thinking...
                        </>
                    ) : (
                        <>
                           <Wand className="mr-2 h-4 w-4" />
                           {mode === 'generate' ? 'Generate Code' : 'Debug Code'}
                        </>
                    )}
                </Button>
                
                 {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {(generatedCode || explanation) && (
                    <div className="space-y-6 pt-4">
                        <Card>
                             <CardHeader>
                                <CardTitle>AI Response</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {generatedCode && (
                                     <div>
                                        <h4 className="font-semibold mb-2">{mode === 'generate' ? 'Generated Code' : 'Suggested Fix'}</h4>
                                        <CodeBlock language={form.getValues('language')} code={generatedCode} />
                                    </div>
                                )}
                                {explanation && (
                                     <div>
                                        <h4 className="font-semibold mb-2">Explanation</h4>
                                        <div className="prose prose-sm max-w-none text-foreground p-4 bg-muted/50 rounded-md border">
                                            <p>{explanation}</p>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                )}
            </form>
        </FormProvider>
    );
}
