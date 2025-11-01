
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Check, Trash2, Wand } from 'lucide-react';
import { CodeBlock } from '@/components/code-block';

type CodeType = 'html' | 'css' | 'js';

// Basic formatters. A real-world app would use a library like Prettier.
const formatHtml = (code: string): string => {
  let formatted = '';
  let indentLevel = 0;
  const tab = '  '; // 2 spaces for indentation
  code.split(/>\s*</).forEach(element => {
    if (element.match(/^\/\w/)) {
      indentLevel--;
    }
    formatted += `${tab.repeat(indentLevel)}<${element}>\n`;
    if (element.match(/^<?\w[^>]*[^\/]$/) && !element.startsWith("input") && !element.startsWith("br") && !element.startsWith("hr")) {
      indentLevel++;
    }
  });
  return formatted.trim();
};

const formatCss = (code: string): string => {
  let formatted = code
    .replace(/\s*([{};])\s*/g, '$1') // Normalize spaces around separators
    .replace(/;}/g, '}'); // Remove trailing semicolon in a block

  let indentLevel = 0;
  let result = '';
  const tab = '  ';

  for (let i = 0; i < formatted.length; i++) {
    const char = formatted[i];
    if (char === '{') {
      result += ' {\n';
      indentLevel++;
    } else if (char === '}') {
      indentLevel--;
      result += '\n' + tab.repeat(indentLevel) + '}\n';
    } else if (char === ';') {
      result += ';\n';
    } else if (result.endsWith('\n')) {
      result += tab.repeat(indentLevel) + char;
    } else {
      result += char;
    }
  }
  return result.replace(/\n\s*\n/g, '\n').trim();
};

const formatJs = (code: string): string => {
    // A very basic JS formatter
    let indentLevel = 0;
    const tab = '  ';
    let formattedCode = '';

    code.split('\n').forEach(line => {
        let trimmedLine = line.trim();
        if (trimmedLine.startsWith('}') || trimmedLine.startsWith(']')) {
            indentLevel = Math.max(0, indentLevel - 1);
        }
        
        if (trimmedLine !== '') {
            formattedCode += tab.repeat(indentLevel) + trimmedLine + '\n';
        }

        if (trimmedLine.endsWith('{') || trimmedLine.endsWith('[')) {
            indentLevel++;
        }
    });

    return formattedCode.trim();
};

const placeholderCode = {
  html: `
<div class="container"><h1>Formatted HTML</h1><p>This will be properly indented.</p></div>
  `.trim(),
  css: `
body{font-family:Arial,sans-serif;background-color:#f0f0f0}.container{max-width:800px;margin:auto;}
  `.trim(),
  js: `
function greet(name){const message="Hello, "+name+"!";return message;}console.log(greet("World"));
  `.trim(),
};

export function CodeFormatter() {
  const [codeType, setCodeType] = useState<CodeType>('html');
  const [inputCode, setInputCode] = useState(placeholderCode.html);
  const [outputCode, setOutputCode] = useState('');
  const [hasCopied, setHasCopied] = useState(false);

  const handleFormat = () => {
    let formatted = '';
    switch (codeType) {
      case 'html':
        formatted = formatHtml(inputCode);
        break;
      case 'css':
        formatted = formatCss(inputCode);
        break;
      case 'js':
        formatted = formatJs(inputCode);
        break;
    }
    setOutputCode(formatted);
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Code Formatter / Beautifier</CardTitle>
        <CardDescription>Select the code type, paste your messy code, and click "Format" to beautify it.</CardDescription>
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
                placeholder={`Paste your unformatted ${codeType.toUpperCase()} code here...`}
                className="font-code h-64"
                aria-label="Input code"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button onClick={handleFormat} className="w-full sm:w-auto"><Wand className="mr-2 h-4 w-4"/> Format Code</Button>
               <Button onClick={handleClear} variant="outline" className="w-full sm:w-auto"><Trash2 className="mr-2 h-4 w-4" /> Clear</Button>
            </div>

            {outputCode && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <Label htmlFor="output-code">Formatted Output</Label>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleCopy} disabled={!outputCode} aria-label="Copy output code">
                        {hasCopied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                    </Button>
                </div>
                <CodeBlock
                    code={outputCode}
                    language={codeType}
                    className="max-h-[500px] overflow-y-auto"
                />
              </div>
            )}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
