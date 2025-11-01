
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Check, Plus, Trash2, AlertCircle, CheckCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

type Rule = { id: number; type: 'Allow' | 'Disallow'; path: string };
type RuleGroup = { id: number; userAgent: string; rules: Rule[] };

let nextRuleGroupId = 1;
let nextRuleId = 1;

const defaultRules: RuleGroup[] = [
    { id: nextRuleGroupId++, userAgent: '*', rules: [{ id: nextRuleId++, type: 'Disallow', path: '/admin/' }] }
];

const commonBots = ['*', 'Googlebot', 'Bingbot', 'DuckDuckBot', 'Baiduspider', 'YandexBot'];

export function RobotsTxtTool() {
    const [mode, setMode] = useState<'generate' | 'validate'>('generate');
    
    // Generator State
    const [defaultPolicy, setDefaultPolicy] = useState<'allow' | 'disallow'>('allow');
    const [ruleGroups, setRuleGroups] = useState<RuleGroup[]>(defaultRules);
    const [sitemaps, setSitemaps] = useState<string[]>(['']);
    const [generatedContent, setGeneratedContent] = useState('');
    const [hasCopied, setHasCopied] = useState(false);

    // Validator State
    const [validationContent, setValidationContent] = useState('');
    const [validationResults, setValidationResults] = useState<{ type: 'error' | 'warning' | 'success', message: string }[]>([]);

    // --- Generator Logic ---
    useEffect(() => {
        let content = '';
        ruleGroups.forEach(group => {
            content += `User-agent: ${group.userAgent}\n`;
            if (group.rules.length === 0 && defaultPolicy === 'allow' && group.userAgent === '*') {
                // If default is allow and there are no specific rules for all agents, we can add Allow: /
                 content += 'Allow: /\n';
            }
             if (group.rules.length === 0 && defaultPolicy === 'disallow' && group.userAgent === '*') {
                content += 'Disallow: /\n';
            }
            group.rules.forEach(rule => {
                content += `${rule.type}: ${rule.path}\n`;
            });
            content += '\n';
        });

        sitemaps.filter(s => s.trim() !== '').forEach(sitemap => {
            content += `Sitemap: ${sitemap}\n`;
        });
        
        // Handle global default policy if no specific '*' group exists
        if (!ruleGroups.some(g => g.userAgent === '*')) {
            let defaultContent = `User-agent: *\n`;
            if(defaultPolicy === 'allow') {
                defaultContent += `Allow: /\n`;
            } else {
                defaultContent += `Disallow: /\n`;
            }
            content = defaultContent + '\n' + content;
        }

        setGeneratedContent(content.trim());
    }, [ruleGroups, sitemaps, defaultPolicy]);
    
    // --- Generator Handlers ---

    const addRuleGroup = () => setRuleGroups([...ruleGroups, { id: nextRuleGroupId++, userAgent: '', rules: [] }]);
    const removeRuleGroup = (id: number) => setRuleGroups(ruleGroups.filter(g => g.id !== id));
    const updateRuleGroup = (id: number, userAgent: string) => setRuleGroups(ruleGroups.map(g => g.id === id ? { ...g, userAgent } : g));
    
    const addRule = (groupId: number) => {
        setRuleGroups(ruleGroups.map(g => g.id === groupId ? { ...g, rules: [...g.rules, { id: nextRuleId++, type: 'Disallow', path: '' }] } : g));
    };
    const removeRule = (groupId: number, ruleId: number) => {
        setRuleGroups(ruleGroups.map(g => g.id === groupId ? { ...g, rules: g.rules.filter(r => r.id !== ruleId) } : g));
    };
    const updateRule = (groupId: number, ruleId: number, field: 'type' | 'path', value: string) => {
        setRuleGroups(ruleGroups.map(g => g.id === groupId ? { ...g, rules: g.rules.map(r => r.id === ruleId ? { ...r, [field]: value } : r) } : g));
    };
    
    const addSitemap = () => setSitemaps([...sitemaps, '']);
    const removeSitemap = (index: number) => setSitemaps(sitemaps.filter((_, i) => i !== index));
    const updateSitemap = (index: number, value: string) => setSitemaps(sitemaps.map((s, i) => i === index ? value : s));

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedContent);
        setHasCopied(true);
        setTimeout(() => setHasCopied(false), 2000);
    };

    // --- Validator Logic ---
    useEffect(() => {
        const results: { type: 'error' | 'warning' | 'success', message: string }[] = [];
        const lines = validationContent.trim().split('\n');

        if (validationContent.trim() === '') {
            setValidationResults([]);
            return;
        }
        
        let hasUserAgent = false;
        lines.forEach((line, index) => {
            const lineNumber = index + 1;
            const trimmedLine = line.trim();
            if (trimmedLine.startsWith('#') || trimmedLine === '') return; // Skip comments and empty lines

            const parts = trimmedLine.split(':');
            if (parts.length < 2) {
                results.push({ type: 'error', message: `Line ${lineNumber}: Invalid syntax. Each line should be a 'Directive: value' pair.` });
                return;
            }
            
            const directive = parts[0].trim().toLowerCase();
            const value = parts.slice(1).join(':').trim();

            if (directive === 'user-agent') {
                hasUserAgent = true;
                if(value === '') results.push({ type: 'error', message: `Line ${lineNumber}: 'User-agent' directive cannot be empty.` });
            } else if (['allow', 'disallow', 'sitemap'].includes(directive)) {
                if (!hasUserAgent && directive !== 'sitemap') {
                    results.push({ type: 'warning', message: `Line ${lineNumber}: Directive '${parts[0]}' found before any 'User-agent'. It will be ignored.` });
                }
                if (value === '') {
                    results.push({ type: 'error', message: `Line ${lineNumber}: '${parts[0]}' directive cannot be empty.` });
                }
                 if (directive === 'sitemap' && !value.startsWith('http')) {
                    results.push({ type: 'error', message: `Line ${lineNumber}: Sitemap URL must be an absolute URL (starting with http/https).` });
                }
            } else {
                 results.push({ type: 'warning', message: `Line ${lineNumber}: Unknown directive '${parts[0]}'. It will likely be ignored by crawlers.` });
            }
        });
        
        if (!hasUserAgent && validationContent.trim() !== '') {
            results.unshift({ type: 'error', message: 'No "User-agent" directive found. A robots.txt file must have at least one user-agent.' });
        }

        if (results.length === 0) {
            results.push({ type: 'success', message: 'No syntax errors or common issues found. Your robots.txt file appears to be valid.' });
        }
        
        setValidationResults(results);
    }, [validationContent]);


    return (
        <Card>
            <CardHeader>
                <CardTitle>Robots.txt Tool</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs value={mode} onValueChange={(v) => setMode(v as any)} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="generate">Generate</TabsTrigger>
                        <TabsTrigger value="validate">Validate</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="generate" className="space-y-6 pt-6">
                        <div className='space-y-2'>
                            <Label>Default Policy</Label>
                            <Select value={defaultPolicy} onValueChange={(v) => setDefaultPolicy(v as any)}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="allow">Allow All</SelectItem>
                                    <SelectItem value="disallow">Disallow All</SelectItem>
                                </SelectContent>
                            </Select>
                             <p className='text-xs text-muted-foreground'>This sets the base rule for all crawlers (`*`) if no specific rule group for `*` is added.</p>
                        </div>
                        
                        <div className="space-y-4">
                            <Label>Specific Rules</Label>
                            {ruleGroups.map((group) => (
                                <Card key={group.id} className="p-4 space-y-4">
                                     <div className="flex justify-between items-center">
                                        <div className='flex-grow'>
                                            <Label htmlFor={`ua-${group.id}`}>User-Agent</Label>
                                             <Input
                                                id={`ua-${group.id}`}
                                                list="common-bots"
                                                value={group.userAgent}
                                                onChange={(e) => updateRuleGroup(group.id, e.target.value)}
                                                placeholder="e.g., Googlebot or *"
                                            />
                                            <datalist id="common-bots">
                                                {commonBots.map(bot => <option key={bot} value={bot} />)}
                                            </datalist>
                                        </div>
                                        <Button size="icon" variant="ghost" className="ml-2 mt-6" onClick={() => removeRuleGroup(group.id)}><Trash2 className="h-4 w-4 text-destructive"/></Button>
                                    </div>
                                    <div className="pl-4 border-l-2 space-y-2">
                                        {group.rules.map(rule => (
                                            <div key={rule.id} className="flex gap-2 items-center">
                                                <Select value={rule.type} onValueChange={(v) => updateRule(group.id, rule.id, 'type', v)}>
                                                    <SelectTrigger className="w-[120px]"><SelectValue /></SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Disallow">Disallow</SelectItem>
                                                        <SelectItem value="Allow">Allow</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                 <Input
                                                    value={rule.path}
                                                    onChange={(e) => updateRule(group.id, rule.id, 'path', e.target.value)}
                                                    placeholder="/path/to/directory/"
                                                    className='font-code'
                                                />
                                                <Button size="icon" variant="ghost" onClick={() => removeRule(group.id, rule.id)}><Trash2 className="h-4 w-4 text-destructive"/></Button>
                                            </div>
                                        ))}
                                        <Button size="sm" variant="outline" onClick={() => addRule(group.id)}><Plus className="h-4 w-4 mr-2" />Add Path</Button>
                                    </div>
                                </Card>
                            ))}
                            <Button size="sm" onClick={addRuleGroup}><Plus className="h-4 w-4 mr-2" />Add Rule Group</Button>
                        </div>
                        
                        <div className="space-y-2">
                            <Label>Sitemaps</Label>
                            {sitemaps.map((sitemap, index) => (
                                <div key={index} className="flex gap-2 items-center">
                                    <Input
                                        value={sitemap}
                                        onChange={(e) => updateSitemap(index, e.target.value)}
                                        placeholder="https://example.com/sitemap.xml"
                                        className="font-code"
                                    />
                                    <Button size="icon" variant="ghost" onClick={() => removeSitemap(index)}><Trash2 className="h-4 w-4 text-destructive"/></Button>
                                </div>
                            ))}
                            <Button size="sm" variant="outline" onClick={addSitemap}><Plus className="h-4 w-4 mr-2" />Add Sitemap</Button>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <Label htmlFor="output">Generated robots.txt</Label>
                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleCopy}>
                                    {hasCopied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                                </Button>
                            </div>
                            <Textarea id="output" readOnly value={generatedContent} className="h-64 font-mono bg-muted/50" />
                        </div>
                    </TabsContent>
                    
                    <TabsContent value="validate" className="space-y-6 pt-6">
                        <div className="space-y-2">
                            <Label htmlFor="validate-input">Paste your robots.txt content here</Label>
                            <Textarea
                                id="validate-input"
                                value={validationContent}
                                onChange={(e) => setValidationContent(e.target.value)}
                                className="h-64 font-mono"
                                placeholder="User-agent: *&#10;Disallow: /admin/"
                            />
                        </div>
                        {validationResults.length > 0 && (
                            <div className="space-y-2">
                                <h3 className="font-semibold">Validation Results</h3>
                                {validationResults.map((result, index) => (
                                     <Alert key={index} variant={result.type === 'error' ? 'destructive' : 'default'} className={
                                         result.type === 'warning' ? 'border-yellow-500/50' : result.type === 'success' ? 'border-green-500/50' : ''
                                     }>
                                         {result.type === 'error' && <AlertCircle className="h-4 w-4" />}
                                         {result.type === 'warning' && <AlertTriangle className="h-4 w-4 text-yellow-600" />}
                                         {result.type === 'success' && <CheckCircle className="h-4 w-4 text-green-600" />}
                                         <AlertTitle className={
                                             result.type === 'warning' ? 'text-yellow-700' : result.type === 'success' ? 'text-green-700' : ''
                                         }>
                                            {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                                         </AlertTitle>
                                        <AlertDescription>{result.message}</AlertDescription>
                                    </Alert>
                                ))}
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
