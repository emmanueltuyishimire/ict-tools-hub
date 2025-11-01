
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Check, Clipboard, ListRestart, Wand2 } from 'lucide-react';
import { CodeBlock } from '@/components/code-block';

export function JsonFormatter() {
  const [inputJson, setInputJson] = useState('{"name":"John Doe","age":30,"isStudent":false,"courses":[{"name":"History","credits":3},{"name":"Math","credits":4}]}');
  const [outputJson, setOutputJson] = useState('');
  const [error, setError] = useState('');
  const [hasCopied, setHasCopied] = useState(false);

  const handleFormat = () => {
    setError('');
    setOutputJson('');
    if (inputJson.trim() === '') {
      setError('Input JSON cannot be empty.');
      return;
    }
    try {
      const parsed = JSON.parse(inputJson);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutputJson(formatted);
      setError('');
    } catch (e: any) {
      setError(`Invalid JSON: ${e.message}`);
    }
  };
  
  const handleClear = () => {
    setInputJson('');
    setOutputJson('');
    setError('');
  };

  const handleCopy = () => {
    if (outputJson) {
      navigator.clipboard.writeText(outputJson);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>JSON Formatter & Validator</CardTitle>
        <CardDescription>
          Paste your JSON data to format it into a readable structure and validate its syntax.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="input-json">Input JSON</Label>
          <Textarea
            id="input-json"
            value={inputJson}
            onChange={(e) => setInputJson(e.target.value)}
            placeholder='Paste your JSON here... e.g., {"key":"value"}'
            className="h-48 font-mono"
            aria-label="Input JSON"
          />
        </div>
        <div className="flex flex-wrap gap-2">
            <Button onClick={handleFormat}><Wand2 className="mr-2 h-4 w-4" />Format / Validate</Button>
            <Button onClick={handleClear} variant="outline"><ListRestart className="mr-2 h-4 w-4" />Clear</Button>
        </div>

        {error && (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Validation Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}

        {outputJson && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="output-json">Formatted JSON</Label>
              <Button variant="ghost" size="icon" onClick={handleCopy} aria-label={hasCopied ? 'Copied' : 'Copy formatted JSON'}>
                {hasCopied ? <Check className="h-4 w-4 text-primary" /> : <Clipboard className="h-4 w-4" />}
              </Button>
            </div>
            <CodeBlock code={outputJson} language="json" className="max-h-[500px] overflow-y-auto" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

    