'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Check, Trash2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type CodeType = 'html' | 'css' | 'js';

const minifyHTML = (code: string): string => {
  return code
    .replace(/<!--[\s\S]*?-->/g, '') // Remove comments
    .replace(/\s+/g, ' ') // Collapse whitespace
    .replace(/>\s+</g, '><') // Remove space between tags
    .trim();
};

const minifyCSS = (code: string): string => {
  return code
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
    .replace(/\s*([:;{}])\s*/g, '$1') // Remove space around separators
    .replace(/\s+/g, ' ') // Collapse whitespace
    .trim();
};

const minifyJS = (code: string): string => {
  // This is a basic regex-based minifier. It's good for removing whitespace and comments
  // but won't perform advanced optimizations like variable renaming.
  return code
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
    .replace(/\/\/(?!:).*/g, '')         // Remove single-line comments, avoiding URLs
    .replace(/\s+/g, ' ')           // Collapse whitespace
    .replace(/\s*([=;:{}(),\[\]])\s*/g, '$1') // Remove space around operators and brackets
    .trim();
};

const placeholderCode = {
  html: `
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>My Awesome Page</title>
    <!-- This is an HTML comment and will be removed -->
  </head>
  <body>

    <h1>Welcome!</h1>
    
    <p>
      This is a paragraph with extra    spacing.
    </p>

  </body>
</html>
  `.trim(),
  css: `
/* 
  This is a multi-line CSS comment.
  It will be stripped out by the minifier.
*/
body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  background-color: #f4f4f4; /* A light grey background */
}

.container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}
  `.trim(),
  js: `
// This is a single-line comment that will be removed.
function greet(name) {

  // Create a greeting message.
  const message = "Hello, " + name + "!";

  return message;
}

console.log( greet("World") );
  `.trim(),
};

export function CodeMinifier() {
  const [codeType, setCodeType] = useState<CodeType>('html');
  const [inputCode, setInputCode] = useState(placeholderCode.html);
  const [outputCode, setOutputCode] = useState('');
  const [hasCopied, setHasCopied] = useState(false);

  const handleMinify = () => {
    let minified = '';
    switch (codeType) {
      case 'html':
        minified = minifyHTML(inputCode);
        break;
      case 'css':
        minified = minifyCSS(inputCode);
        break;
      case 'js':
        minified = minifyJS(inputCode);
        break;
    }
    setOutputCode(minified);
  };

  const handleCopy = () => {
    if (outputCode) {
      navigator.clipboard.writeText(outputCode);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    }
  };
  
  const handleClear = () => {
      setInputCode('');
      setOutputCode('');
  }

  const handleTabChange = (value: string) => {
    const newCodeType = value as CodeType;
    setCodeType(newCodeType);
    setInputCode(placeholderCode[newCodeType]);
    setOutputCode('');
  };

  const inputSize = new Blob([inputCode]).size;
  const outputSize = new Blob([outputCode]).size;
  const savings = inputSize > 0 && outputSize > 0 ? ((inputSize - outputSize) / inputSize) * 100 : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Minify Your Code</CardTitle>
        <CardDescription>Select the code type, paste your code, and click "Minify" to reduce its file size.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={codeType} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="html">HTML</TabsTrigger>
            <TabsTrigger value="css">CSS</TabsTrigger>
            <TabsTrigger value="js">JavaScript</TabsTrigger>
          </TabsList>
          <div className="space-y-6 pt-6">
            <div className="space-y-2">
              <Label htmlFor="input-code">Input Code</Label>
              <Textarea
                id="input-code"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder={`Paste your ${codeType.toUpperCase()} code here...`}
                className="font-code h-64"
                aria-label="Input code"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button onClick={handleMinify} className="w-full sm:w-auto">Minify Code</Button>
               <Button onClick={handleClear} variant="outline" className="w-full sm:w-auto"><Trash2 className="mr-2 h-4 w-4" /> Clear</Button>
            </div>

            {outputCode && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <Label htmlFor="output-code">Minified Output</Label>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleCopy} disabled={!outputCode} aria-label="Copy output code">
                        {hasCopied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                    </Button>
                </div>
                <Textarea
                  id="output-code"
                  value={outputCode}
                  readOnly
                  placeholder="Minified code will appear here..."
                  className="font-code h-64 bg-muted/50"
                  aria-label="Minified output code"
                />
                 <Alert variant="default" className="border-green-500/50">
                    <AlertTitle className="text-green-700">Analysis Complete</AlertTitle>
                    <AlertDescription>
                        <div className="flex justify-between text-sm text-muted-foreground">
                            <span>Original Size: <strong>{inputSize.toLocaleString()}</strong> bytes</span>
                            <span>Minified Size: <strong>{outputSize.toLocaleString()}</strong> bytes</span>
                            <span className="font-bold text-primary">Savings: {savings.toFixed(2)}%</span>
                        </div>
                    </AlertDescription>
                </Alert>
              </div>
            )}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
