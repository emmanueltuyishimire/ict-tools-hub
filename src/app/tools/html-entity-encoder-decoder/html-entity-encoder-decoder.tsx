
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { StructuredData } from '@/components/structured-data';
import { Lightbulb, AlertTriangle, BookOpen, ChevronRight, Wand, Copy, Check, LinkIcon, RefreshCw, ArrowRightLeft } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';

// --- Encoding/Decoding Logic ---
function encodeEntities(text: string): string {
    const element = document.createElement('div');
    element.innerText = text;
    return element.innerHTML;
}

function decodeEntities(text: string): string {
    const element = document.createElement('div');
    element.innerHTML = text;
    return element.textContent || '';
}

// --- FAQ & Schema Data ---
const faqData = [
    { question: "What are HTML entities?", answer: "HTML entities are pieces of text ('strings') that begin with an ampersand (`&`) and end with a semicolon (`;`). They are used to display reserved characters (which would otherwise be interpreted as HTML code) or special characters that are not easily typed on a standard keyboard." },
    { question: "Why do I need to encode HTML entities?", answer: "Encoding is necessary when you want to display text that contains HTML's special characters, such as `<` or `>`. If you write `<h1>` directly in your HTML content, the browser will interpret it as a heading tag. To display the literal text `<h1>`, you must encode it as `&lt;h1&gt;`." },
    { question: "What is the difference between named and numeric entities?", answer: "Named entities are mnemonics, like `&copy;` for the copyright symbol (©). They are easier for humans to read. Numeric entities represent a character by its Unicode code point, like `&#169;` for the same copyright symbol. All characters have a numeric entity, but only the most common ones have named entities." },
    { question: "When should I use the decoder?", answer: "You would use the decoder if you have text that contains HTML entities and you want to convert it back to its original, plain-text form. This is common when you are pulling data from a database or API that has stored pre-encoded text, and you need to process it as raw text in a script." },
    { question: "Is this tool safe for sensitive data?", answer: "Yes. All encoding and decoding operations happen entirely within your web browser using JavaScript. Your data is never sent to our server or any third party, ensuring your information remains private." },
    { question: "Does this tool encode all characters or just special ones?", answer: "This tool focuses on encoding characters that are reserved in HTML (`<`, `>`, `&`, `\"`) and other non-ASCII characters to ensure they are displayed correctly and safely in an HTML document. It provides a robust way to prevent HTML injection and rendering issues." },
    { question: "How is this different from URL encoding?", answer: "HTML entity encoding is for safely displaying text within an HTML document. URL encoding is for safely transmitting data within a URL's path or query string. They encode different sets of characters for different purposes. For example, a space is `&nbsp;` or `&#32;` in HTML but `%20` in a URL. Use our <a href='/tools/url-encoder-decoder' class='text-primary hover:underline'>URL Encoder</a> for that purpose." },
    { question: "What is XSS and how does this help prevent it?", answer: "Cross-Site Scripting (XSS) is a security vulnerability where an attacker injects malicious scripts into a web page viewed by other users. Encoding user-provided content into HTML entities is a primary defense against XSS. By converting characters like `<` and `>` into `&lt;` and `&gt;`, you ensure that any injected `<script>` tags are displayed as plain text instead of being executed by the browser." }
];

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer.replace(/<[^>]*>?/gm, '') } })),
};

const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Use the HTML Entity Encoder/Decoder',
    description: 'A step-by-step guide to encoding special HTML characters and decoding them back to plain text.',
    step: [
        { '@type': 'HowToStep', name: 'Enter Text', text: 'To encode, type or paste plain text containing special characters (like `<h1>`) into the "Decoded" text area. To decode, paste entity-encoded text (like `&lt;h1&gt;`) into the "Encoded" box.' },
        { '@type': 'HowToStep', name: 'View Instant Conversion', text: 'The tool operates in real-time. As you type in one box, the correctly converted text will appear in the other box immediately.' },
        { '@type': 'HowToStep', name: 'Copy the Result', text: 'Click the "Copy" button above the output box you need to copy its contents to your clipboard.' },
        { '@type': 'HowToStep', name: 'Swap and Clear', text: 'Use the "Swap" button to switch the content between the two boxes, or "Clear All" to reset both fields.' }
    ],
    totalTime: 'PT1M',
};

const keyTerminologies = [
    { term: 'HTML Entity', definition: 'A sequence of characters that represents a reserved or special character in HTML, starting with `&` and ending with `;` (e.g., `&lt;` for <).' },
    { term: 'Reserved Characters', definition: 'Characters that have a special meaning in HTML syntax, such as `<`, `>`, `&`, and `"`.' },
    { term: 'Character Set (e.g., UTF-8)', definition: 'A standard that maps characters to unique numerical code points. HTML entities are used to represent these characters.' },
    { term: 'XSS (Cross-Site Scripting)', definition: 'A type of security vulnerability where malicious scripts are injected into web pages. HTML entity encoding is a key defense against it.' },
    { term: 'Plain Text', definition: 'Text that does not contain any special formatting or markup, such as HTML tags.' }
];

export function HtmlEntityEncoderDecoder() {
    const [decoded, setDecoded] = useState('<h1>Hello & Welcome!</h1>');
    const [encoded, setEncoded] = useState('');
    const [lastChanged, setLastChanged] = useState<'decoded' | 'encoded'>('decoded');
    const [copied, setCopied] = useState<'decoded' | 'encoded' | null>(null);

    useEffect(() => {
        if (lastChanged === 'decoded') {
            setEncoded(encodeEntities(decoded));
        }
    }, [decoded, lastChanged]);
    
    useEffect(() => {
        if (lastChanged === 'encoded') {
            setDecoded(decodeEntities(encoded));
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
        const tempDecoded = decoded;
        const tempEncoded = encoded;
        setLastChanged(lastChanged === 'decoded' ? 'encoded' : 'decoded');
        setDecoded(tempEncoded);
        setEncoded(tempDecoded);
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
                    <p>This tool provides a real-time converter for HTML entities, which is essential for displaying special characters or code snippets on a web page safely.</p>
                    <ol>
                        <li><strong>Live Conversion:</strong> The tool works instantly. Start typing in either the "Decoded" (top) or "Encoded" (bottom) box, and the other box will update in real-time.</li>
                        <li><strong>To Encode:</strong> Type plain text with special characters (e.g., `5 > 3`) into the "Decoded" box. The safe HTML entity version (`5 &gt; 3`) will appear in the "Encoded" box.</li>
                        <li><strong>To Decode:</strong> Paste text containing HTML entities (e.g., `&copy; 2024`) into the "Encoded" box. The plain text version (`© 2024`) will appear in the "Decoded" box.</li>
                        <li><strong>Swap & Copy:</strong> Use the `Swap` button to switch the contents of the two boxes. Use the `Copy` icon above either box to copy its contents to your clipboard.</li>
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
                        <CardTitle className="text-primary">Educational Deep Dive: The Necessity of HTML Entities</CardTitle>
                    </div>
                    <CardDescription>From rendering code to preventing security holes, understand why encoding characters is a fundamental part of web development.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                    <section>
                        <h3 className="font-bold text-xl">Why Can't I Just Type `<` in my HTML?</h3>
                        <p>The HyperText Markup Language (HTML) is built on a system of tags, which are defined by angle brackets (`<` and `>`). When a web browser parses an HTML document, it interprets any text inside these brackets as an instruction—to create a heading, a paragraph, a link, etc. This creates a problem: what if you want to literally display the text `<p>` on your page, perhaps as part of a code tutorial?</p>
                        <p>If you simply type `<p>`, the browser will try to render a new paragraph element, not display the text. This is where **HTML entities** come in. They are a special syntax that tells the browser, "Don't interpret this as code; display it as the literal character it represents." By converting `<p>` to `&lt;p&gt;`, you ensure the browser shows the text instead of executing the tag.</p>
                    </section>
                    <section>
                        <h3 className="font-bold text-xl">Named vs. Numeric Entities</h3>
                        <p>There are two primary ways to write an HTML entity:</p>
                        <ul className="list-disc pl-5">
                           <li><strong>Named Entities:</strong> These are human-readable mnemonics for common characters. They are easy to remember but are only available for a limited set of characters. For example, `&copy;` for the copyright symbol (©) or `&amp;` for an ampersand (&).</li>
                           <li><strong>Numeric Entities:</strong> These can represent any character in the Unicode character set. They use the character's unique Unicode code point, written as either decimal (`&#...;`) or hexadecimal (`&#x...;`). For example, the copyright symbol can also be written as `&#169;` (decimal) or `&#xA9;` (hex).</li>
                        </ul>
                        <p>While named entities are convenient, numeric entities are more universal and guarantee that any character can be represented correctly.</p>
                    </section>
                     <section>
                        <h3 className="font-bold text-xl">A Critical Defense Against Cross-Site Scripting (XSS)</h3>
                        <p>Beyond just displaying text correctly, HTML entity encoding is a cornerstone of web security. One of the most common web vulnerabilities is **Cross-Site Scripting (XSS)**. An XSS attack occurs when a malicious user injects a script into a web page that is then viewed by other users.</p>
                        <p>Imagine a blog comment section where a user submits the following comment: `<script>alert('You have been hacked!');</script>`. If the website stores and renders this comment directly without encoding it, every user who views that comment will have that JavaScript executed in their browser. This could be used to steal cookies, redirect users to malicious sites, or deface the page.</p>
                        <p>By properly encoding the user's input before displaying it, the malicious comment becomes: `&lt;script&gt;alert('You have been hacked!');&lt;/script&gt;`. The browser will now render this as harmless text on the page, completely neutralizing the attack. **Never trust user input; always encode it before rendering it in HTML.**</p>
                    </section>
                </CardContent>
            </Card>

            <section>
                <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Displaying Code Snippets</h3>
                        <p className="text-sm text-muted-foreground">A developer writing a blog post wants to show an example of HTML code. They paste their code snippet into this tool to encode it, ensuring that the browser displays the HTML tags as text instead of trying to render them as part of the page layout.</p>
                    </div>
                     <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Sanitizing User Input</h3>
                        <p className="text-sm text-muted-foreground">A web application has a user profile page where users can enter a "Bio". To prevent XSS attacks, the backend developer ensures that any text submitted by a user is passed through an HTML entity encoder before it is stored or displayed anywhere on the site.</p>
                    </div>
                     <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Working with XML/RSS Feeds</h3>
                        <p className="text-sm text-muted-foreground">A programmer is generating an XML file for an RSS feed. The content of a blog post might contain ampersands or other special characters. They must be encoded as `&amp;` to create a valid XML document that won't cause parsing errors for feed readers.</p>
                    </div>
                     <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Fixing Broken Content</h3>
                        <p className="text-sm text-muted-foreground">A content manager copies text from a word processor into a CMS and finds that characters like smart quotes (“ ”) and em-dashes (—) are appearing as garbled symbols on the website. They use an entity encoder to convert these special characters into their proper HTML entities (`&ldquo;`, `&rdquo;`, `&mdash;`), ensuring they render correctly for all users.</p>
                    </div>
                </div>
            </section>
            
            <section>
                <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
                <Card>
                    <CardContent className="p-6">
                        <Accordion type="single" collapsible className="w-full">
                            {faqData.map((item, index) => (
                                <AccordionItem value={`item-${index}`} key={index}>
                                    <AccordionTrigger>{item.question}</AccordionTrigger>
                                    <AccordionContent>
                                        <div dangerouslySetInnerHTML={{ __html: item.answer.replace(/<a href='([^']*)' class='[^']*'>/g, "<a href='$1' class='text-primary hover:underline'>") }} />
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>
            </section>
        </div>
    );
}
