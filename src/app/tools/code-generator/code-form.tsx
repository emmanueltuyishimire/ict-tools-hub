'use client';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { codeGenerationAndDebugging, type CodeGenerationAndDebuggingOutput } from '@/ai/flows/code-generation-debugging';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CodeBlock } from '@/components/code-block';
import { Skeleton } from '@/components/ui/skeleton';
import { Bot } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import React from 'react';

const formSchema = z.object({
  task: z.enum(['generate', 'debug']),
  language: z.enum(['JS', 'Python', 'HTML', 'CSS']),
  requirements: z.string().min(10, 'Please describe your requirements in at least 10 characters.'),
  codeSnippet: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const initialState: CodeGenerationAndDebuggingOutput | { error: string } | null = null;

async function formActionHandler(_prevState: typeof initialState, formData: FormData) {
  const data = Object.fromEntries(formData);
  const parsed = formSchema.safeParse(data);

  if (!parsed.success) {
    return { error: 'Invalid form data.' };
  }

  return codeGenerationAndDebugging(parsed.data);
}

export function CodeForm() {
  const [state, formAction] = useFormState(formActionHandler, initialState);
  const resultRef = React.useRef<HTMLDivElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      task: 'generate',
      language: 'JS',
      requirements: 'Create a JavaScript function that returns a random item from an array.',
      codeSnippet: 'function sortArray(arr) {\n  return arr.sort();\n}\n\nconst numbers = [3, 1, 4, 1, 5, 9];\nconsole.log(sortArray(numbers)); \n// Why is it sorting [1, 1, 3, 4, 5, 9] instead of numerically?',
    },
  });

  const { formState, setValue } = form;

  const handleTabChange = (value: string) => {
    setValue('task', value as 'generate' | 'debug');
  };
  
  React.useEffect(() => {
    if (state && resultRef.current) {
      resultRef.current.focus();
    }
  }, [state]);

  return (
    <div>
      <Form {...form}>
        <form action={formAction} className="space-y-6">
          <Tabs defaultValue="generate" className="w-full" onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="generate">Generate Code</TabsTrigger>
              <TabsTrigger value="debug">Debug Code</TabsTrigger>
            </TabsList>
            <TabsContent value="generate" className="space-y-4 pt-4">
              <FormField
                control={form.control}
                name="requirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="generate-requirements">Requirements</FormLabel>
                    <FormControl>
                      <Textarea
                        id="generate-requirements"
                        placeholder="e.g., Create a JavaScript function that returns a random item from an array."
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
            <TabsContent value="debug" className="space-y-4 pt-4">
               <FormField
                control={form.control}
                name="requirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="debug-requirements">Problem Description</FormLabel>
                    <FormControl>
                      <Textarea
                        id="debug-requirements"
                        placeholder="e.g., This code should sort the array, but it's not working correctly."
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="codeSnippet"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="code-snippet">Code to Debug</FormLabel>
                    <FormControl>
                      <Textarea
                        id="code-snippet"
                        placeholder="Paste your code snippet here..."
                        rows={8}
                        className="font-code"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
          </Tabs>

          <input type="hidden" {...form.register('task')} />

          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Language</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger aria-label="Select a language">
                      <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="JS">JavaScript</SelectItem>
                    <SelectItem value="Python">Python</SelectItem>
                    <SelectItem value="HTML">HTML</SelectItem>
                    <SelectItem value="CSS">CSS</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={formState.isSubmitting}>
            {formState.isSubmitting ? 'Working on it...' : 'Submit'}
          </Button>
        </form>
      </Form>

      <div ref={resultRef} tabIndex={-1} aria-live="polite" role="region">
        {formState.isSubmitting && (
          <div className="mt-8 space-y-4" aria-label="Loading AI response">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-48 w-full" />
          </div>
        )}

        {state && (state.generatedCode || state.debuggingSuggestions) && (
          <div className="mt-8 space-y-4">
              <div className='flex items-center gap-2 text-primary font-semibold'>
                  <Bot className="h-6 w-6" aria-hidden="true" />
                  <h3 className="text-xl">AI Response</h3>
              </div>
              <Card className="bg-secondary/30 border-primary/20">
                <CardContent className="p-4">
                  {state.generatedCode && (
                    <div>
                      <h4 className="font-semibold mb-2">Generated Code:</h4>
                      <CodeBlock code={state.generatedCode} language={form.getValues('language').toLowerCase()} />
                    </div>
                  )}
                  {state.debuggingSuggestions && (
                    <div>
                      <h4 className="font-semibold mb-2">Debugging Suggestions:</h4>
                      <div className="prose prose-sm max-w-none text-muted-foreground bg-background/50 p-4 rounded-md">
                          <p>{state.debuggingSuggestions}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
          </div>
        )}
        
        {state && 'error' in state && (
          <div className="mt-8 text-destructive-foreground bg-destructive p-4 rounded-md" role="alert">
              <p>{state.error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
