
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Copy, Check, Trash2, AlertCircle, CheckCircle } from 'lucide-react';
import { CodeBlock } from '@/components/code-block';

const placeholderJson = `{
  "id": 123,
  "product": "Laptop",
  "isAvailable": true,
  "price": 999.99,
  "specs": {
    "cpu": "Intel i7",
    "ram": 16,
    "storage": ["512GB SSD", "1TB HDD"]
  },
  "notes": null
}`;

export function JsonFormatter() {
  const [inputJson, setInputJson] = useState(placeholderJson);
  const [outputJson, setOutputJson] = useState('');
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [hasCopied, setHasCopied] = useState(false);

  const handleFormat = () => {
    setError('');
    setIsValid(null);
    setOutputJson('');

    if (inputJson.trim() === '') {
      setError('Input cannot be empty.');
      setIsValid(false);
      return;
    }

    try {
      const parsed = JSON.parse(inputJson);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutputJson(formatted);
      setIsValid(true);
    } catch (e: any) {
      setError(`Invalid JSON: ${e.message}`);
      setIsValid(false);
    }
  };
  
  const handleMinify = () => {
    setError('');
    setIsValid(null);
    setOutputJson('');

    if (inputJson.trim() === '') {
      setError('Input cannot be empty.');
      setIsValid(false);
      return;
    }
    
    try {
      const parsed = JSON.parse(inputJson);
      const minified = JSON.stringify(parsed);
      setOutputJson(minified);
      setIsValid(true);
    } catch (e: any) {
      setError(`Invalid JSON: ${e.message}`);
      setIsValid(false);
    }
  }

  const handleCopy = () => {
    if (outputJson) {
      navigator.clipboard.writeText(outputJson);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    }
  };
  
  const handleClear = () => {
    setInputJson('');
    setOutputJson('');
    setError('');
    setIsValid(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>JSON Formatter & Validator</CardTitle>
        <CardDescription>Paste your JSON and format it for readability or minify it for production.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="input-json">Input JSON</Label>
          <Textarea
            id="input-json"
            value={inputJson}
            onChange={(e) => setInputJson(e.target.value)}
            placeholder='Paste your JSON data here... e.g., {"key": "value"}'
            className="font-mono h-64"
            aria-label="Input JSON"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
            <Button onClick={handleFormat} className="w-full sm:w-auto">Format / Validate</Button>
            <Button onClick={handleMinify} variant="secondary" className="w-full sm:w-auto">Minify</Button>
            <Button onClick={handleClear} variant="outline" className="w-full sm:w-auto ml-auto"><Trash2 className="mr-2 h-4 w-4" /> Clear</Button>
        </div>

        {isValid === false && error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Validation Failed</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {isValid === true && (
             <Alert variant="default" className="border-green-500/50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-700">JSON is Valid</AlertTitle>
                <AlertDescription>
                    The provided JSON has been successfully parsed.
                </AlertDescription>
            </Alert>
        )}

        {outputJson && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="output-json">Output</Label>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleCopy} disabled={!outputJson}>
                {hasCopied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <CodeBlock
                code={outputJson}
                language="json"
                className="max-h-[500px] overflow-y-auto"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
