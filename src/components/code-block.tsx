'use client';

import { useState } from 'react';
import { Check, Clipboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeBlock({ code, language, className }: CodeBlockProps) {
  const [hasCopied, setHasCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    });
  };

  return (
    <div className={cn('relative rounded-lg border bg-secondary/50 p-4', className)}>
      <Button
        size="icon"
        variant="ghost"
        className="absolute right-2 top-2 h-8 w-8 text-muted-foreground hover:bg-secondary"
        onClick={copyToClipboard}
      >
        {hasCopied ? (
          <Check className="h-4 w-4 text-primary" />
        ) : (
          <Clipboard className="h-4 w-4" />
        )}
        <span className="sr-only">Copy code</span>
      </Button>
      <pre className="w-full overflow-x-auto text-sm font-code text-secondary-foreground">
        <code>{code}</code>
      </pre>
    </div>
  );
}
