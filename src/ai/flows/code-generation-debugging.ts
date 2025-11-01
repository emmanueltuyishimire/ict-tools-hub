'use server';

/**
 * @fileOverview A code generation and debugging AI agent.
 *
 * - codeGenerationAndDebugging - A function that handles the code generation and debugging process.
 * - CodeGenerationAndDebuggingInput - The input type for the codeGenerationAndDebugging function.
 * - CodeGenerationAndDebuggingOutput - The return type for the codeGenerationAndDebugging function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CodeGenerationAndDebuggingInputSchema = z.object({
  requirements: z
    .string()
    .describe('The requirements for the code generation or debugging task.'),
  language: z
    .enum(['JS', 'Python', 'HTML', 'CSS'])
    .describe('The desired programming language for the code.'),
  codeSnippet: z.string().optional().describe('Optional code snippet to debug.'),
});
export type CodeGenerationAndDebuggingInput = z.infer<typeof CodeGenerationAndDebuggingInputSchema>;

const CodeGenerationAndDebuggingOutputSchema = z.object({
  generatedCode: z.string().optional().describe('The generated code snippet.'),
  debuggingSuggestions: z
    .string()
    .optional()
    .describe('Suggestions for debugging the provided code snippet.'),
});
export type CodeGenerationAndDebuggingOutput = z.infer<typeof CodeGenerationAndDebuggingOutputSchema>;

export async function codeGenerationAndDebugging(
  input: CodeGenerationAndDebuggingInput
): Promise<CodeGenerationAndDebuggingOutput> {
  return codeGenerationAndDebuggingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'codeGenerationAndDebuggingPrompt',
  input: {schema: CodeGenerationAndDebuggingInputSchema},
  output: {schema: CodeGenerationAndDebuggingOutputSchema},
  prompt: `You are an AI-powered code generation and debugging assistant.

You will either generate code based on the given requirements or debug the provided code snippet, depending on the input.

If requirements are provided, generate code in the specified language that meets those requirements.
If a code snippet is provided, analyze it and provide debugging suggestions.

Language: {{{language}}}
Requirements: {{{requirements}}}
Code Snippet:
{{#if codeSnippet}}
\`\`\`{{{language}}}
{{{codeSnippet}}}
\`\`\`
{{/if}}


Output:
{{#if codeSnippet}}
Debugging Suggestions:
{{else}}
Generated Code:
\`\`\`{{{language}}}
{{/if}}
`,
});

const codeGenerationAndDebuggingFlow = ai.defineFlow(
  {
    name: 'codeGenerationAndDebuggingFlow',
    inputSchema: CodeGenerationAndDebuggingInputSchema,
    outputSchema: CodeGenerationAndDebuggingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
