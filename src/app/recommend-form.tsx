'use client';
import { useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { aiToolRecommendation, type AiToolRecommendationOutput } from '@/ai/flows/ai-tool-recommendation';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { allTools } from '@/lib/tools';
import { Skeleton } from '@/components/ui/skeleton';
import { Lightbulb, Bot } from 'lucide-react';
import React from 'react';

const formSchema = z.object({
  taskDescription: z.string().min(10, 'Please describe your task in at least 10 characters.'),
});

type FormValues = z.infer<typeof formSchema>;

const initialState: AiToolRecommendationOutput | { error: string } | null = null;

export function RecommendForm() {
  const [state, formAction] = useActionState(aiToolRecommendation, initialState);
  const resultRef = React.useRef<HTMLDivElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskDescription: '',
    },
  });

  const { formState } = form;

  React.useEffect(() => {
    if (state && resultRef.current) {
      resultRef.current.focus();
    }
  }, [state]);

  return (
    <div>
      <Form {...form}>
        <form action={formAction} className="space-y-6">
          <FormField
            control={form.control}
            name="taskDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="taskDescription" className="sr-only">Task Description</FormLabel>
                <FormControl>
                  <Textarea
                    id="taskDescription"
                    placeholder="e.g., I need to convert a CIDR notation to a list of subnets..."
                    rows={4}
                    aria-describedby="taskDescription-hint"
                    {...field}
                  />
                </FormControl>
                <FormDescription id="taskDescription-hint">
                  Describe what you want to do, and we'll suggest the right tools.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={formState.isSubmitting}>
             {formState.isSubmitting ? 'Thinking...' : 'Get Recommendations'}
          </Button>
        </form>
      </Form>

      <div ref={resultRef} tabIndex={-1} aria-live="polite" role="region">
        {formState.isSubmitting && (
          <div className="mt-8" aria-label="Loading recommendations">
              <div className="flex items-center space-x-4 mb-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                  </div>
              </div>
               <Skeleton className="h-4 w-full mb-2" />
               <Skeleton className="h-4 w-[80%] mb-2" />
               <Skeleton className="h-4 w-full mb-4" />
               <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-6 w-24 rounded-full" />
                  <Skeleton className="h-6 w-32 rounded-full" />
                  <Skeleton className="h-6 w-28 rounded-full" />
               </div>
          </div>
        )}

        {state && 'recommendedTools' in state && (
          <Card className="mt-8 bg-secondary/30 border-primary/20">
            <CardHeader>
              <div className='flex items-center gap-2 text-primary'>
                  <Bot className="h-6 w-6" aria-hidden="true" />
                  <CardTitle className="text-primary">AI Recommendation</CardTitle>
              </div>
              
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2"><Lightbulb className="h-5 w-5 text-accent" aria-hidden="true"/>Reasoning</h3>
                <p className="text-muted-foreground">{state.reasoning}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Recommended Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {state.recommendedTools.map((toolName) => {
                    const tool = allTools.find((t) => t.name === toolName);
                    if (tool) {
                      return (
                        <Link href={`/tools/${tool.slug}`} key={tool.slug}>
                          <Badge variant="default" className="text-sm py-1 px-3 bg-primary/90 hover:bg-primary transition-colors cursor-pointer">
                            {tool.name}
                          </Badge>
                        </Link>
                      );
                    }
                    return (
                      <Badge variant="secondary" key={toolName} className="text-sm py-1 px-3">
                        {toolName}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
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
