'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Check, Clipboard, AlertCircle } from 'lucide-react';
import { Label } from '@/components/ui/label';

export function BinaryToIpConverter() {
  const [binary, setBinary] = useState('11000000.10101000.00000001.00000001');
  const [ip, setIp] = useState('');
  const [error, setError] = useState('');
  const [hasCopied, setHasCopied] = useState(false);
  const resultRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ip && resultRef.current) {
        resultRef.current.focus();
    }
  }, [ip])

  const validateAndConvert = () => {
    setError('');
    setIp('');

    const binaryInput = binary.replace(/\s/g, ''); // Remove all whitespace
    const sanitizedBinary = binaryInput.replace(/\./g, ''); // Remove dots for validation

    if (!/^[01]+$/.test(sanitizedBinary) && sanitizedBinary.length > 0) {
      setError('Invalid input: Only 0s and 1s are allowed.');
      return;
    }

    if (sanitizedBinary.length !== 32) {
      setError(`Invalid input: Binary string must be 32 bits long. You entered ${sanitizedBinary.length} bits.`);
      return;
    }

    try {
      let octets;
      if (binaryInput.includes('.')) {
        const inputWithDots = binaryInput.split('.');
        if (inputWithDots.length !== 4 || inputWithDots.some(o => o.length > 8 || !/^[01]+$/.test(o))) {
            setError('Invalid format. Please use four 8-bit octets separated by dots.');
            return;
        }
        octets = inputWithDots;
      } else {
         octets = binaryInput.match(/.{1,8}/g);
      }
      
      if (!octets || octets.length !== 4) {
        setError('Invalid format. Please ensure the binary string can be split into four 8-bit octets.');
        return;
      }
      
      const decimalOctets = octets.map(octet => {
          if(octet.length !== 8) throw new Error("Each octet must be 8 bits long.");
          return parseInt(octet, 2);
      });

      const convertedIp = decimalOctets.join('.');
      setIp(convertedIp);
    } catch (e) {
      setError('Conversion failed. Please check the binary format.');
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow binary digits, dots, and spaces
    if (/^[01.\s]*$/.test(value)) {
        setBinary(value);
    }
  };

  const handleConvert = () => {
    validateAndConvert();
  };

  const handleClear = () => {
    setBinary('');
    setIp('');
    setError('');
    setHasCopied(false);
  };

  const handleCopyToClipboard = () => {
    if (!ip) return;
    navigator.clipboard.writeText(ip).then(() => {
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    });
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Enter Binary String</CardTitle>
        <CardDescription>
            Input a 32-bit binary string, with or without dots between octets.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
            <Label htmlFor="binary-input">Binary IPv4 Address</Label>
            <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  id="binary-input"
                  type="text"
                  value={binary}
                  onChange={handleInputChange}
                  placeholder="e.g., 11000000.10101000.00000001.00000001"
                  className="font-code flex-grow"
                  aria-invalid={!!error}
                  aria-describedby="binary-error"
                />
                <div className='flex gap-2'>
                    <Button onClick={handleConvert} className="w-full sm:w-auto">Convert</Button>
                    <Button onClick={handleClear} variant="outline" className="w-full sm:w-auto">Clear</Button>
                </div>
            </div>
        </div>

        {error && (
            <Alert variant="destructive" id="binary-error" role="alert">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}

        {ip && (
          <div className="space-y-2" aria-live="polite">
            <Label htmlFor="converted-ip">Converted IP Address</Label>
            <div className="relative">
              <Input
                id="converted-ip"
                ref={resultRef}
                type="text"
                value={ip}
                readOnly
                className="pr-10 font-code bg-secondary"
                aria-label="Converted IP Address"
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                onClick={handleCopyToClipboard}
                aria-label={hasCopied ? 'Copied IP Address' : 'Copy IP Address to clipboard'}
              >
                {hasCopied ? <Check className="h-4 w-4 text-primary" /> : <Clipboard className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
