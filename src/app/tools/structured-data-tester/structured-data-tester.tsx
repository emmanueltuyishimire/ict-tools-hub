'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, AlertCircle, Search, Clipboard, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function StructuredDataTester() {
  const [inputData, setInputData] = useState(
    '{\n  "@context": "https://schema.org",\n  "@type": "Person",\n  "name": "John Doe",\n  "url": "http://www.example.com",\n  "jobTitle": "Software Engineer"\n}'
  );
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean;
    message: string;
    errors?: any[];
  } | null>(null);

  const [hasCopied, setHasCopied] = useState(false);
  const { toast } = useToast();

  const handleValidate = () => {
    try {
      const parsedData = JSON.parse(inputData);
      // Basic validation: check for @context and @type
      if (!parsedData['@context'] || !parsedData['@type']) {
        setValidationResult({
          isValid: false,
          message:
            "Validation failed: Structured data must contain '@context' and '@type' properties.",
        });
        return;
      }
      setValidationResult({
        isValid: true,
        message: 'JSON is well-formed and contains basic schema.org properties.',
      });
    } catch (error: any) {
      setValidationResult({
        isValid: false,
        message: `JSON Parsing Error: ${error.message}`,
      });
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(inputData).then(() => {
        setHasCopied(true);
        toast({ title: 'Copied to clipboard!' });
        setTimeout(() => setHasCopied(false), 2000);
      });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Structured Data (JSON-LD) Tester</CardTitle>
        <CardDescription>
          Paste your JSON-LD snippet to validate its basic structure.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <Label htmlFor="json-ld-input">JSON-LD Snippet</Label>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleCopy}>
                    {hasCopied ? <Check className="h-4 w-4 text-primary" /> : <Clipboard className="h-4 w-4" />}
                </Button>
            </div>
          <Textarea
            id="json-ld-input"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            placeholder="Paste your JSON-LD code here..."
            className="h-64 font-mono"
            aria-label="JSON-LD input"
          />
        </div>
        <Button onClick={handleValidate} className="w-full sm:w-auto">
          <Search className="mr-2 h-4 w-4" /> Validate
        </Button>
        {validationResult && (
          <Alert
            variant={validationResult.isValid ? 'default' : 'destructive'}
            className={
              validationResult.isValid ? 'border-green-500/50' : ''
            }
          >
            {validationResult.isValid ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <AlertTitle
              className={validationResult.isValid ? 'text-green-700' : ''}
            >
              {validationResult.isValid ? 'Validation Passed' : 'Validation Failed'}
            </AlertTitle>
            <AlertDescription>{validationResult.message}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}