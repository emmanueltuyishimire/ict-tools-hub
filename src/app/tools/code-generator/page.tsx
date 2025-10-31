import { PageHeader } from '@/components/page-header';
import { CodeForm } from './code-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function CodeGeneratorPage() {
  return (
    <>
      <PageHeader
        title="AI Code Generator & Debugger"
        description="Your AI partner for writing and fixing code. Generate snippets from scratch or get help debugging existing code in JS, Python, HTML, and CSS."
      />
      <Card className="max-w-4xl mx-auto">
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
    </>
  );
}
