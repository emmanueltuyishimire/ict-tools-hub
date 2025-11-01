
'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, XCircle } from 'lucide-react';
import { reservedWords } from './schema';

type Language = 'js' | 'python' | 'java' | 'cpp';

const validationRules = {
    js: {
        pattern: /^[a-zA-Z_$][a-zA-Z0-9_$]*$/,
        reserved: reservedWords.js,
        description: "Must start with a letter, underscore (_), or dollar sign ($). Subsequent characters can be letters, numbers, underscores, or dollar signs."
    },
    python: {
        pattern: /^[a-zA-Z_][a-zA-Z0-9_]*$/,
        reserved: reservedWords.python,
        description: "Must start with a letter or an underscore (_). Subsequent characters can be letters, numbers, or underscores."
    },
    java: {
        pattern: /^[a-zA-Z_$][a-zA-Z0-9_$]*$/,
        reserved: reservedWords.java,
        description: "Must start with a letter, underscore (_), or dollar sign ($). Subsequent characters can be letters, numbers, underscores, or dollar signs."
    },
    cpp: {
        pattern: /^[a-zA-Z_][a-zA-Z0-9_]*$/,
        reserved: reservedWords.cpp,
        description: "Must start with a letter or an underscore (_). Subsequent characters can be letters, numbers, or underscores. Cannot contain two consecutive underscores."
    }
};


const validateName = (name: string, lang: Language) => {
    if (!name) {
        return { isValid: false, message: 'Variable name cannot be empty.' };
    }
    const rules = validationRules[lang];

    if (rules.reserved.has(name)) {
        return { isValid: false, message: `"${name}" is a reserved keyword in ${lang === 'js' ? 'JavaScript' : lang.charAt(0).toUpperCase() + lang.slice(1)}.` };
    }
    
    if (lang === 'cpp' && name.includes('__')) {
        return { isValid: false, message: 'Cannot contain two consecutive underscores.'}
    }
    
    if (!rules.pattern.test(name)) {
         if (/^[0-9]/.test(name)) {
            return { isValid: false, message: 'Cannot start with a number.' };
        }
         if (/[^a-zA-Z0-9_$]/.test(name) && (lang === 'js' || lang === 'java')) {
            return { isValid: false, message: 'Can only contain letters, numbers, underscores (_), and dollar signs ($).' };
        }
         if (/[^a-zA-Z0-9_]/.test(name) && (lang === 'python' || lang === 'cpp')) {
            return { isValid: false, message: 'Can only contain letters, numbers, and underscores (_).' };
        }
        return { isValid: false, message: rules.description };
    }
    
    return { isValid: true, message: 'This is a valid variable name.' };
};

export function VariableNameValidator() {
    const [name, setName] = useState('my_variable');
    const [language, setLanguage] = useState<Language>('python');

    const result = useMemo(() => validateName(name, language), [name, language]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Variable Name Validator</CardTitle>
                <CardDescription>
                    Check if your variable name is valid for your chosen language.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="variable-name">Variable Name</Label>
                        <Input
                            id="variable-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="font-code"
                            autoComplete="off"
                        />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <Select value={language} onValueChange={(v) => setLanguage(v as Language)}>
                            <SelectTrigger id="language"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="js">JavaScript</SelectItem>
                                <SelectItem value="python">Python</SelectItem>
                                <SelectItem value="java">Java</SelectItem>
                                <SelectItem value="cpp">C++</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {name.length > 0 && (
                     <Alert variant={result.isValid ? 'default' : 'destructive'} className={result.isValid ? 'border-green-500/50' : ''}>
                         {result.isValid ? <CheckCircle className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4" />}
                         <AlertTitle className={result.isValid ? 'text-green-700' : ''}>
                            {result.isValid ? 'Valid Name' : 'Invalid Name'}
                         </AlertTitle>
                         <AlertDescription>{result.message}</AlertDescription>
                     </Alert>
                )}
            </CardContent>
        </Card>
    );
}
