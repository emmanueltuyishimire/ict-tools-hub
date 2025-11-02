'use client';

import { useState, ReactNode } from 'react';
import { Check, Clipboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  code?: string;
  language?: string;
  className?: string;
  children?: ReactNode;
}

export function CodeBlock({ code, language, className, children }: CodeBlockProps) {
  const [hasCopied, setHasCopied] = useState(false);

  const copyToClipboard = () => {
    if (code) {
      navigator.clipboard.writeText(code).then(() => {
        setHasCopied(true);
        setTimeout(() => setHasCopied(false), 2000);
      });
    }
  };

  return (
    <div className={cn('relative rounded-lg border bg-secondary/50', className)}>
      <div className="absolute right-2 top-2 flex items-center gap-2">
        {language && <span className="text-xs text-muted-foreground">{language}</span>}
        {code && (
           <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-muted-foreground hover:bg-secondary"
            onClick={copyToClipboard}
            aria-label={hasCopied ? 'Code copied' : 'Copy code to clipboard'}
          >
            {hasCopied ? (
              <Check className="h-4 w-4 text-primary" />
            ) : (
              <Clipboard className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>
      <pre className="w-full overflow-x-auto p-4 pt-12 text-sm font-code text-secondary-foreground">
        <code>{code || children}</code>
      </pre>
    </div>
  );
}
