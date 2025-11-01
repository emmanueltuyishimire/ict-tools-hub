
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Check, Trash2, Wand } from 'lucide-react';
import { CodeBlock } from '@/components/code-block';

type CodeType = 'js' | 'python' | 'html' | 'css';

// Basic formatters. A real-world app would use a library like Prettier.
const formatHtml = (code: string): string => {
  let formatted = '';
  let indentLevel = 0;
  const tab = '  '; // 2 spaces for indentation
  code.split(/>\s*</).forEach(element => {
    if (element.match(/^\/\w/)) {
      indentLevel--;
    }
    let padding = tab.repeat(Math.max(0, indentLevel));
    // Handle self-closing tags and comments
    if (element.startsWith('!') || element.startsWith('?')) {
        formatted += `${padding}<${element}>\n`;
    } else {
         formatted += `${padding}<${element.replace(/\/$/, '').trim()}>\n`;
    }
    
    if (element.match(/^<?\w/) && !element.match(/.*\/\s*$/) && !['br', 'hr', 'img', 'input', 'meta', 'link'].some(tag => element.startsWith(tag))) {
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
      result += '\n' + tab.repeat(Math.max(0, indentLevel)) + '}\n';
    } else if (char === ';') {
      result += ';\n';
    } else if (result.endsWith('\n') || result.length === 0) {
      result += tab.repeat(indentLevel) + char;
    } else {
      result += char;
    }
  }
  return result.replace(/\n\s*\n/g, '\n').trim();
};

const formatJs = (code: string): string => {
    let indentLevel = 0;
    const tab = '  ';
    let formattedCode = '';
    const lines = code.split('\n');

    lines.forEach(line => {
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

const formatPython = (code: string): string => {
    let indentLevel = 0;
    const tab = '    '; // 4 spaces for Python
    let formattedCode = '';
    const lines = code.split('\n');

    lines.forEach(line => {
        let trimmedLine = line.trim();
        
        if (/^(elif|else|except|finally).*:/.test(trimmedLine) && indentLevel > 0) {
             indentLevel--;
        }
        
        if (trimmedLine) {
            formattedCode += tab.repeat(indentLevel) + trimmedLine + '\n';
        }

        if (trimmedLine.endsWith(':') && !/^(elif|else|except|finally).*:/.test(trimmedLine)) {
            indentLevel++;
        }
    });

    return formattedCode.trim();
}


const placeholderCode = {
  js: `
function greet(name){const message="Hello, "+name+"!";return message;}console.log(greet("World"));
  `.trim(),
  python: `
def fib(n):
 a, b = 0, 1
 while a < n:
  print(a, end=' ')
  a, b = b, a+b
 print()
fib(1000)
  `.trim(),
  html: `
<div class="container"><h1>Formatted HTML</h1><p>This will be properly indented.</p></div>
  `.trim(),
  css: `
body{font-family:Arial,sans-serif;background-color:#f0f0f0}.container{max-width:800px;margin:auto;}
  `.trim(),
};

export function CodeSnippetFormatter() {
  const [codeType, setCodeType] = useState<CodeType>('js');
  const [inputCode, setInputCode] = useState(placeholderCode.js);
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
      case 'python':
        formatted = formatPython(inputCode);
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
        <CardTitle>Code Snippet Formatter</CardTitle>
        <CardDescription>Select a language, paste your code, and click "Format" to get a clean, shareable snippet.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={codeType} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="js">JavaScript</TabsTrigger>
            <TabsTrigger value="python">Python</TabsTrigger>
            <TabsTrigger value="html">HTML</TabsTrigger>
            <TabsTrigger value="css">CSS</TabsTrigger>
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
              <Tabs defaultValue="output" className="w-full">
                <div className="flex justify-between items-center">
                  <TabsList>
                    <TabsTrigger value="output">Formatted Snippet</TabsTrigger>
                  </TabsList>
                   <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleCopy} disabled={!outputCode} aria-label="Copy output code">
                      {hasCopied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <TabsContent value="output">
                   <CodeBlock
                      code={outputCode}
                      language={codeType}
                      className="mt-2 max-h-[500px] overflow-y-auto"
                  />
                </TabsContent>
              </Tabs>
            )}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
