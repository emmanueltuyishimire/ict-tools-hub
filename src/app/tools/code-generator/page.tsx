import { PageHeader } from '@/components/page-header';
import { CodeForm } from './code-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

const keyTerminologies = [
    { term: 'Generative AI', definition: 'A type of artificial intelligence that can create new content, including code, text, and images, based on the data it was trained on.' },
    { term: 'Code Snippet', definition: 'A small, reusable block of source code. In the context of this tool, it is the code you provide for debugging.' },
    { term: 'Debugging', definition: 'The process of finding and resolving defects or problems within a computer program that prevent correct operation.' },
    { term: 'Programming Language', definition: 'A formal language comprising a set of instructions that produce various kinds of output. This tool supports JavaScript, Python, HTML, and CSS.' },
    { term: 'Requirements', definition: 'A detailed description of what a piece of software should do. Clear requirements lead to better AI-generated code.' },
];


export default function CodeGeneratorPage() {
  return (
    <>
      <PageHeader
        title="AI Code Generator & Debugger"
        description="Your AI partner for writing and fixing code. Generate snippets from scratch or get help debugging existing code in JS, Python, HTML, and CSS."
      />
      <div className="max-w-4xl mx-auto space-y-12">
        <Card>
            <CardHeader>
                <CardTitle>Code Assistant</CardTitle>
                <CardDescription>
                    Select a tab below to either generate new code based on your requirements or get help debugging a code snippet.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <CodeForm />
            </CardContent>
        </Card>
        
        <section>
            <h2 className="text-2xl font-bold mb-4">Key Terminologies</h2>
            <Card>
                <CardContent className="p-6">
                    <dl className="space-y-4">
                        {keyTerminologies.map((item) => (
                            <div key={item.term}>
                                <dt className="font-semibold">{item.term}</dt>
                                <dd className="text-muted-foreground text-sm">{item.definition}</dd>
                            </div>
                        ))}
                    </dl>
                </CardContent>
            </Card>
        </section>

        <Card className='bg-secondary/30 border-primary/20'>
            <CardHeader>
                <div className='flex items-center gap-2 text-primary'>
                    <BookOpen className="h-6 w-6" aria-hidden="true" />
                    <CardTitle className="text-primary">Educational Deep Dive: Working with AI Code Assistants</CardTitle>
                </div>
                <CardDescription>Understand how to effectively prompt and interact with AI to accelerate your development workflow.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                <section>
                    <h3 className="font-bold text-xl">The Art of Prompt Engineering</h3>
                    <p>An AI code assistant is a powerful tool, but its output is only as good as your input. The skill of crafting effective prompts is known as "prompt engineering." To get the best results, be specific, provide context, and clearly define your desired output.</p>
                    <p>Instead of a vague prompt like "make a button," a much better prompt would be: "Generate a React component for a primary action button using Tailwind CSS. The button should have a blue background, white text, rounded corners, and a subtle shadow. It should accept an `onClick` handler and a `children` prop for the text." This level of detail guides the AI to produce code that is much closer to your actual needs.</p>
                </section>
                <section>
                    <h3 className="font-bold text-xl">Using AI for Debugging</h3>
                    <p>AI is an excellent partner for debugging. When you provide a code snippet and a problem description, the AI can analyze the code for common errors, logical fallacies, or anti-patterns. To get the most out of it:</p>
                    <ul className="list-disc pl-5">
                       <li><strong>Provide the Error Message:</strong> If you have a specific error message from your console or compiler, include it in your problem description.</li>
                       <li><strong>Explain the Expected Behavior:</strong> Clearly state what you expected the code to do.</li>
                       <li><strong>Explain the Actual Behavior:</strong> Describe what is actually happening. The difference between expected and actual behavior is the core of the bug.</li>
                       <li><strong>Isolate the Problem:</strong> Provide the smallest possible code snippet that reproduces the error. This helps the AI focus on the specific problem area without getting distracted by unrelated code.</li>
                    </ul>
                </section>
                 <section>
                    <h3 className="font-bold text-xl">AI as a Learning Tool</h3>
                    <p>Don't just copy and paste the AI's output. Treat it as a learning opportunity. When the AI generates code, ask yourself why it chose that approach. If it fixes a bug, study the correction to understand the underlying principle. You can even ask the AI to explain its code or suggestions. For example, after getting a piece of code, you could follow up with: "Explain the purpose of the `useEffect` hook in the code you just generated." This iterative process of generating and questioning is one of the most effective ways to learn new programming concepts and techniques.</p>
                </section>
            </CardContent>
        </Card>
      </div>
    </>
  );
}
