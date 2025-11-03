import { z } from 'zod';
import { ai } from '@/ai/genkit';
import { generate } from 'genkit';

const formSchema = z.object({
  mode: z.enum(['generate', 'debug']),
  language: z.enum(['javascript', 'python', 'html', 'css']),
  requirements: z.string().min(10, 'Please provide more detail in your requirements.'),
  codeSnippet: z.string().optional(),
  problem: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export async function generateCode(data: FormData) {
  const result = formSchema.safeParse(data);
  if (!result.success) {
    return { success: false, message: 'Invalid input.' };
  }

  const { mode, language, requirements, codeSnippet, problem } = result.data;

  let prompt = '';
  if (mode === 'generate') {
    prompt = `You are a helpful code generator. Generate a code snippet in ${language} based on the following requirements. Only output the code, with no extra explanation before or after the code block.
Requirements: ${requirements}`;
  } else {
    prompt = `You are a helpful code debugger. Analyze the following ${language} code snippet and the described problem. Provide a fixed version of the code and a brief explanation of what was wrong.
Problem: ${problem}
Code snippet:
\`\`\`${language}
${codeSnippet}
\`\`\`
Respond in the following format:
[CODE]
// Your suggested code fix here
[/CODE]
[EXPLANATION]
Your brief explanation here
[/EXPLANATION]
`;
  }

  try {
    const { text } = await generate({
      prompt,
      model: 'googleai/gemini-2.5-flash',
      config: { temperature: 0.3 },
    });

    if (mode === 'generate') {
      const code = text.replace(/```[\w]*\n/g, '').replace(/```/g, '').trim();
      return { success: true, code, explanation: 'Code generated successfully.' };
    } else {
      const codeMatch = text.match(/\[CODE\]([\s\S]*?)\[\/CODE\]/);
      const explanationMatch = text.match(/\[EXPLANATION\]([\s\S]*?)\[\/EXPLANATION\]/);
      const code = codeMatch ? codeMatch[1].trim() : 'Could not extract code from response.';
      const explanation = explanationMatch ? explanationMatch[1].trim() : 'Could not extract explanation from response.';
      return { success: true, code, explanation };
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Failed to generate code due to an AI model error.' };
  }
}
