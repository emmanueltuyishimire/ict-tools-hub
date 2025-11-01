
'use client';

import { useState, useId } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, Check, Plus, Trash2 } from 'lucide-react';
import { CodeBlock } from '@/components/code-block';

type UrlEntry = {
    id: string;
    loc: string;
    lastmod: string;
    changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority: string;
};

const getTodayString = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
};

export function SitemapGenerator() {
    const [urls, setUrls] = useState<UrlEntry[]>(() => [
        { id: `id-${Math.random()}`, loc: 'https://example.com/', lastmod: getTodayString(), changefreq: 'daily', priority: '1.0' },
        { id: `id-${Math.random()}`, loc: 'https://example.com/about', lastmod: getTodayString(), changefreq: 'monthly', priority: '0.8' }
    ]);
    const [generatedSitemap, setGeneratedSitemap] = useState('');
    const [hasCopied, setHasCopied] = useState(false);
    const baseId = useId();

    const handleAddUrl = () => {
        setUrls([...urls, { id: `id-${Math.random()}`, loc: '', lastmod: getTodayString(), changefreq: 'monthly', priority: '0.5' }]);
    };

    const handleRemoveUrl = (id: string) => {
        setUrls(urls.filter(url => url.id !== id));
    };

    const handleUrlChange = (id: string, field: keyof Omit<UrlEntry, 'id'>, value: string) => {
        setUrls(urls.map(url => (url.id === id ? { ...url, [field]: value } : url)));
    };

    const generateSitemap = () => {
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
        urls.forEach(url => {
            if (url.loc) {
                xml += '  <url>\n';
                xml += `    <loc>${url.loc}</loc>\n`;
                if (url.lastmod) xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
                xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
                xml += `    <priority>${url.priority}</priority>\n`;
                xml += '  </url>\n';
            }
        });
        xml += '</urlset>';
        setGeneratedSitemap(xml);
    };

    const handleCopy = () => {
        if (generatedSitemap) {
            navigator.clipboard.writeText(generatedSitemap);
            setHasCopied(true);
            setTimeout(() => setHasCopied(false), 2000);
        }
    };
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Static Sitemap Generator</CardTitle>
                <CardDescription>Add the URLs for your site below to generate a static XML sitemap.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <Label>URL List</Label>
                    {urls.map((urlEntry, index) => {
                        const uniqueId = `${baseId}-${urlEntry.id}`;
                        return (
                            <div key={uniqueId} className="grid grid-cols-1 md:grid-cols-12 gap-2 p-3 border rounded-lg">
                                <div className="md:col-span-12 space-y-2">
                                    <Label htmlFor={`loc-${uniqueId}`} className="text-xs text-muted-foreground">URL</Label>
                                    <Input
                                        id={`loc-${uniqueId}`}
                                        value={urlEntry.loc}
                                        onChange={(e) => handleUrlChange(urlEntry.id, 'loc', e.target.value)}
                                        placeholder="https://example.com/your-page"
                                        className="font-code"
                                    />
                                </div>
                                <div className="md:col-span-4 space-y-2">
                                    <Label htmlFor={`lastmod-${uniqueId}`} className="text-xs text-muted-foreground">Last Modified</Label>
                                    <Input
                                        id={`lastmod-${uniqueId}`}
                                        type="date"
                                        value={urlEntry.lastmod}
                                        onChange={(e) => handleUrlChange(urlEntry.id, 'lastmod', e.target.value)}
                                    />
                                </div>
                                <div className="md:col-span-4 space-y-2">
                                    <Label htmlFor={`changefreq-${uniqueId}`} className="text-xs text-muted-foreground">Change Frequency</Label>
                                    <Select value={urlEntry.changefreq} onValueChange={(v) => handleUrlChange(urlEntry.id, 'changefreq', v)}>
                                        <SelectTrigger id={`changefreq-${uniqueId}`}><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="always">Always</SelectItem>
                                            <SelectItem value="hourly">Hourly</SelectItem>
                                            <SelectItem value="daily">Daily</SelectItem>
                                            <SelectItem value="weekly">Weekly</SelectItem>
                                            <SelectItem value="monthly">Monthly</SelectItem>
                                            <SelectItem value="yearly">Yearly</SelectItem>
                                            <SelectItem value="never">Never</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="md:col-span-3 space-y-2">
                                    <Label htmlFor={`priority-${uniqueId}`} className="text-xs text-muted-foreground">Priority</Label>
                                    <Select value={urlEntry.priority} onValueChange={(v) => handleUrlChange(urlEntry.id, 'priority', v)}>
                                         <SelectTrigger id={`priority-${uniqueId}`}><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            {Array.from({ length: 11 }, (_, i) => (1 - i * 0.1).toFixed(1)).map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                                 <div className="md:col-span-1 flex items-end">
                                    <Button size="icon" variant="ghost" onClick={() => handleRemoveUrl(urlEntry.id)} aria-label="Remove URL">
                                        <Trash2 className="h-4 w-4 text-destructive"/>
                                    </Button>
                                </div>
                            </div>
                        )
                    })}
                     <Button variant="outline" onClick={handleAddUrl}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add URL
                    </Button>
                </div>
                 <Button onClick={generateSitemap}>Generate Sitemap</Button>
                
                {generatedSitemap && (
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <Label htmlFor="output-sitemap">Generated Sitemap.xml</Label>
                             <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleCopy} disabled={!generatedSitemap}>
                                {hasCopied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                        <CodeBlock
                            code={generatedSitemap}
                            language="xml"
                            className="max-h-[500px] overflow-y-auto"
                        />
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
