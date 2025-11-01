
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { StructuredData } from '@/components/structured-data';
import { Lightbulb, AlertTriangle, BookOpen, ChevronRight, Wand, Copy, Check, ArrowRightLeft } from 'lucide-react';
import Link from 'next/link';

// Entity maps
const basicEntities: { [key: string]: string } = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

const fullEntities: { [key: string]: string } = {
  ...basicEntities,
  ' ': '&nbsp;',
  '¡': '&iexcl;',
  '¢': '&cent;',
  '£': '&pound;',
  '¥': '&yen;',
  '§': '&sect;',
  '©': '&copy;',
  '®': '&reg;',
  '°': '&deg;',
  '±': '&plusmn;',
  '¶': '&para;',
  '·': '&middot;',
  'ç': '&ccedil;',
  'ü': '&uuml;',
  'é': '&eacute;',
  'à': '&agrave;',
  'è': '&egrave;',
  'ö': '&ouml;',
  '™': '&trade;',
  '€': '&euro;',
};

const reverseEntities = Object.fromEntries(Object.entries(fullEntities).map(([key, value]) => [value, key]));

const faqData = [
    { question: "What are HTML entities?", answer: "HTML entities are pieces of text ('strings') that begin with an ampersand (&) and end with a semicolon (;). They are used to display reserved characters (which would otherwise be interpreted as HTML code), and invisible characters (like non-breaking spaces)." },
    { question: "Why do I need to encode HTML entities?", answer: "You need to encode them to prevent the browser from misinterpreting your text as HTML code. For example, if you want to display the text '<p>This is a paragraph.</p>' literally on your webpage, you must encode the '<' and '>' characters as '&lt;' and '&gt;'. Otherwise, the browser would render it as an actual HTML paragraph." },
    { question: "What is the difference between an entity name and an entity number?", answer: "Most entities have both a name (e.g., `&copy;` for copyright) and a number (e.g., `&#169;`). They render the same character. Names are easier to remember, but numbers are better supported across all character sets. This tool uses named entities where available." },
    { question: "Is this safe for sensitive data?", answer: "Yes. All encoding and decoding operations happen entirely within your browser. No data is sent to any server." },
];

const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Use the HTML Entity Encoder/Decoder',
    description: 'A guide to encoding plain text into HTML entities and decoding them back.',
    step: [
        { '@type': 'HowToStep', name: 'Enter Text', text: 'To encode, type plain text into the top box. To decode, paste HTML entities into the bottom box.' },
        { '@type': 'HowToStep', name: 'View Real-Time Results', text: 'As you type in one box, the converted text appears instantly in the other.' },
        { '@type': 'HowToStep', name: 'Copy the Output', text: 'Use the copy button to grab the converted text for your code.' },
        { '@type': 'HowToStep', name: 'Swap or Clear', text: 'Use the swap button to switch the content of the boxes or the clear button to reset.' }
    ],
    totalTime: 'PT1M',
};

const keyTerminologies = [
    { term: 'HTML Entity', definition: 'A string used to represent reserved characters in HTML, starting with `&` and ending with `;` (e.g., `&lt;` for <).' },
    { term: 'Reserved Characters', definition: 'Characters like `<`, `>`, and `&` that have a special meaning in HTML syntax.' },
    { term: 'Character Set', definition: 'A defined list of characters recognized by computer hardware and software (e.g., ASCII, UTF-8).' },
];


export function HtmlEntityEncoderDecoder() {
    const [decoded, setDecoded] = useState('<p>Hello World!</p>');
    const [encoded, setEncoded] = useState('');
    const [lastChanged, setLastChanged] = useState<'decoded' | 'encoded'>('decoded');
    const [copied, setCopied] = useState<'decoded' | 'encoded' | null>(null);

    useEffect(() => {
        if (lastChanged === 'decoded') {
            const newEncoded = decoded.split('').map(char => fullEntities[char] || char).join('');
            setEncoded(newEncoded);
        }
    }, [decoded, lastChanged]);
    
    useEffect(() => {
        if (lastChanged === 'encoded') {
            const newDecoded = encoded.replace(/(&#?[a-zA-Z0-9]+;)/g, (match) => reverseEntities[match] || match);
            setDecoded(newDecoded);
        }
    }, [encoded, lastChanged]);

    const handleDecodedChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setLastChanged('decoded');
        setDecoded(e.target.value);
    };

    const handleEncodedChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setLastChanged('encoded');
        setEncoded(e.target.value);
    };

    const handleSwap = () => {
        const temp = decoded;
        setDecoded(encoded);
        setEncoded(temp);
    };
    
    const handleClear = () => {
        setDecoded('');
        setEncoded('');
    };

    const handleCopy = (text: string, type: 'decoded' | 'encoded') => {
        navigator.clipboard.writeText(text);
        setCopied(type);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <StructuredData data={faqSchema} />
            <StructuredData data={howToSchema} />
            <Card>
                <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <Label htmlFor="decoded-input">Decoded (Plain Text)</Label>
                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleCopy(decoded, 'decoded')}>
                                    {copied === 'decoded' ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                                </Button>
                            </div>
                            <Textarea
                                id="decoded-input"
                                value={decoded}
                                onChange={handleDecodedChange}
                                placeholder="Type or paste plain text here..."
                                className="h-32 font-code"
                                aria-label="Decoded text input"
                            />
                        </div>

                         <div className="flex justify-center items-center">
                            <Button variant="outline" size="icon" onClick={handleSwap} aria-label="Swap encoded and decoded text">
                                <ArrowRightLeft className="h-4 w-4" />
                            </Button>
                        </div>
                        
                        <div className="space-y-2">
                             <div className="flex justify-between items-center">
                                <Label htmlFor="encoded-input">Encoded (HTML Entities)</Label>
                                 <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleCopy(encoded, 'encoded')}>
                                    {copied === 'encoded' ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                                </Button>
                            </div>
                            <Textarea
                                id="encoded-input"
                                value={encoded}
                                onChange={handleEncodedChange}
                                placeholder="Type or paste HTML entities here..."
                                className="h-32 font-code"
                                aria-label="Encoded text input"
                            />
                        </div>
                    </div>
                     <div className="flex justify-center">
                        <Button onClick={handleClear} variant="destructive">Clear All</Button>
                     </div>
                </CardContent>
            </Card>

            <section>
                <h2 className="text-2xl font-bold mb-4">How to Use This Tool</h2>
                <Card className="prose prose-sm max-w-none text-foreground p-6">
                    <p>This tool provides real-time, two-way conversion between plain text and HTML entities.</p>
                    <ol>
                        <li><strong>Live Conversion:</strong> As you type in one box, the other updates instantly.</li>
                        <li><strong>To Encode:</strong> Type plain text with special characters (e.g., <strong>&lt;h1&gt;Title&lt;/h1&gt;</strong>) into the top "Decoded" box. The safe HTML entity version will appear in the "Encoded" box.</li>
                        <li><strong>To Decode:</strong> Paste text containing HTML entities (e.g., <strong>&amp;lt;p&amp;gt;</strong>) into the bottom "Encoded" box to see the original plain text.</li>
                    </ol>
                </Card>
            </section>
            
            <section>
                <h2 className="text-2xl font-bold mb-4">Key Terminologies</h2>
                <Card>
                    <CardContent className="p-6">
                        <dl className="space-y-4">
                            {keyTerminologies.map((item) => (
                                <div key={item.term}>
                                    <dt className="font-semibold">{item.term}</dt>
                                    <dd className="text-muted-foreground text-sm">{item.definition}</dd>
                                </div>
                            ))}
                        </dl>
                    </CardContent>
                </Card>
            </section>

             <Card className='bg-secondary/30 border-primary/20'>
                <CardHeader>
                    <div className='flex items-center gap-2 text-primary'>
                        <BookOpen className="h-6 w-6" aria-hidden="true" />
                        <CardTitle className="text-primary">Educational Deep Dive</CardTitle>
                    </div>
                    <CardDescription>Understand why displaying code and special symbols on a web page requires special handling.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                    <section>
                        <h3 className="font-bold text-xl">The Browser's Dilemma: Code vs. Content</h3>
                        <p>A web browser's primary job is to interpret HTML code and render a visual page. This creates a problem: what if you want to *display* a piece of HTML code as text, instead of having the browser render it? If you write <strong>&lt;p&gt;</strong> in your HTML file, the browser will create a paragraph. It has no way of knowing you just wanted to show the literal characters '<', 'p', and '>'.</p>
                        <p>HTML entities are the solution to this problem. They are a special syntax that tells the browser, "Do not interpret this as code; instead, display the character that this entity represents." By converting reserved characters into their entity equivalents, we can safely include any text or code snippet on a webpage without breaking the layout or structure.</p>
                    </section>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <div className='flex items-center gap-2'><Wand className="h-6 w-6 text-accent" /> <CardTitle>Pro Tips & Quick Hacks</CardTitle></div>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                            <li><strong>Use for Code Snippets:</strong> Before displaying sample code (HTML, XML, etc.) on your website inside <strong>&lt;code&gt;</strong> or <strong>&lt;pre&gt;</strong> tags, run it through the encoder to ensure it renders as text.</li>
                            <li><strong>Non-Breaking Spaces:</strong> Use the entity <strong>&amp;nbsp;</strong> when you need to ensure two words are not separated by a line break.</li>
                            <li><strong>Copyright & Trademarks:</strong> Quickly find the entities for common symbols like Copyright (<strong>&amp;copy;</strong>), Registered Trademark (<strong>&amp;reg;</strong>), and Trademark (<strong>&amp;trade;</strong>).</li>
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                         <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                    </CardHeader>
                    <CardContent>
                         <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                            <li><strong>Forgetting to Encode:</strong> Pasting code directly into an HTML file without encoding it first is a common mistake that can break your page layout.</li>
                            <li><strong>Double Encoding:</strong> Accidentally running already-encoded text through the encoder again. This will encode the ampersands (e.g., <strong>&amp;amp;lt;</strong>), resulting in incorrect output.</li>
                            <li><strong>Confusing with URL Encoding:</strong> HTML entity encoding and <Link href="/tools/url-encoder-decoder" className="text-primary hover:underline">URL Encoding</Link> are for different purposes. Use entity encoding for displaying content in HTML, and URL encoding for passing data in URLs.</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
            
            <section>
                <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
                <Card>
                    <CardContent className="p-6">
                        <Accordion type="single" collapsible className="w-full">
                            {faqData.map((item, index) => (
                                <AccordionItem value={`item-${index}`} key={index}>
                                    <AccordionTrigger>{item.question}</AccordionTrigger>
                                    <AccordionContent>{item.answer}</AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>
            </section>
        </div>
    );
}
