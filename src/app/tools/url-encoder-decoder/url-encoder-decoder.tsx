
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { StructuredData } from '@/components/structured-data';
import { Lightbulb, AlertTriangle, BookOpen, ChevronRight, Wand, Copy, Check, Link as LinkIcon, RefreshCw, ArrowRightLeft } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';

// --- FAQ & Schema Data ---
const faqData = [
    { question: "What is URL encoding?", answer: "URL encoding, also known as percent-encoding, is the process of converting characters into a format that can be safely transmitted over the internet. It replaces unsafe ASCII characters with a '%' followed by two hexadecimal digits that represent the character's ASCII value." },
    { question: "Why is URL encoding necessary?", answer: "URLs can only contain a specific set of characters (unreserved ASCII characters). Special characters like spaces, slashes, or ampersands have specific meanings in a URL's structure. If these characters appear in data (like a search query), they must be encoded to prevent them from being misinterpreted by the server or breaking the URL's structure." },
    { question: "What's the difference between `encodeURI()` and `encodeURIComponent()`?", answer: "This tool uses `encodeURIComponent()`. `encodeURIComponent()` is more aggressive and encodes a larger set of characters, including those with special meaning in URLs like `&, +, =, /, ?`. It's intended for encoding a single part of a URL, like a query parameter value. `encodeURI()` is less aggressive and does not encode those special characters, making it suitable for encoding an entire URL that already has its components in place." },
    { question: "Why is a space encoded as `%20` or `+`?", answer: "The official standard for percent-encoding specifies that a space should be encoded as `%20`. However, in the specific context of HTML form submissions (`application/x-www-form-urlencoded`), a space is often represented as a `+` sign for historical reasons. Most modern systems can interpret both. This tool uses the `%20` standard." },
    { question: "Is this tool safe for sensitive data?", answer: "Yes. All encoding and decoding operations happen entirely within your web browser using JavaScript. Your data is never sent to our server or any third party, ensuring your information remains private." },
    { question: "What are 'unreserved' characters?", answer: "Unreserved characters are those that do not have a special meaning in a URL and do not need to be encoded. They include uppercase and lowercase letters (A-Z, a-z), digits (0-9), and the special characters `-`, `_`, `.`, and `~`." },
    { question: "Can I encode an entire file with this tool?", answer: "This tool is designed for text strings. While you could paste the content of a small text file, it's not suitable for binary files like images or executables. For that, you would typically use Base64 encoding." },
    { question: "What happens if I try to decode a string that isn't URL-encoded?", answer: "The `decodeURIComponent()` function will simply return the original string, leaving any characters that are not percent-encoded unchanged. It will only throw an error if it encounters a malformed encoding sequence, like a '%' not followed by two valid hex digits." },
    { question: "Does encoding affect SEO?", answer: "Yes, proper URL structure is important for SEO. Search engines prefer clean, readable URLs. While they can correctly interpret encoded URLs, it's best practice to use user-friendly slugs (e.g., `/my-blog-post`) where possible and only use URL encoding for query parameters (e.g., `?search=blue%20widget`)." },
    { question: "Why do I see strange characters like `%C3%A9` in URLs?", answer: "This is how non-ASCII characters (like `é`, `ü`, or `ñ`) are represented. The character is first encoded into its UTF-8 byte sequence, and then each byte in that sequence is percent-encoded. For example, the character `é` is represented by two bytes in UTF-8 (`C3` and `A9`), resulting in the encoded string `%C3%A9`. You can learn more about this with our Unicode/ASCII Converter." }
];

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer.replace(/<[^>]*>?/gm, '') } })),
};

const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Use the URL Encoder/Decoder',
    description: 'A step-by-step guide to encoding and decoding URL strings.',
    step: [
        { '@type': 'HowToStep', name: 'Enter Text', text: 'To encode, type or paste your plain text into the "Decoded" text area. To decode, type or paste your encoded string into the "Encoded" text area.' },
        { '@type': 'HowToStep', name: 'View Instant Results', text: 'The tool works in real-time. As you type in one box, the corresponding encoded or decoded text will instantly appear in the other box.' },
        { '@type': 'HowToStep', name: 'Copy the Output', text: 'Click the "Copy" button above the output box you need to copy its contents to your clipboard.' },
        { '@type': 'HowToStep', name: 'Swap and Clear', text: 'Use the "Swap" button to switch the content between the two boxes. Use the "Clear" button to reset both text areas.' }
    ],
    totalTime: 'PT1M',
};

const keyTerminologies = [
    { term: 'URL Encoding (Percent-Encoding)', definition: 'The process of converting characters in a URL into a universally accepted format, typically replacing reserved or non-ASCII characters with a "%" followed by hexadecimal digits.' },
    { term: 'URI (Uniform Resource Identifier)', definition: 'A string of characters that unambiguously identifies a particular resource. URLs are a specific type of URI.' },
    { term: 'Reserved Characters', definition: 'Characters that have a special meaning within a URL\'s syntax, such as `/`, `?`, `#`, `&`, and `:`. These must be encoded if they are part of data.' },
    { term: 'Unreserved Characters', definition: 'Characters that are safe to use anywhere in a URL without encoding. They include `A-Z`, `a-z`, `0-9`, and the symbols `-`, `_`, `.`, `~`.' },
    { term: 'Query String', definition: 'The part of a URL that follows a question mark (`?`), containing key-value pairs (e.g., `?search=blue-widget&id=123`). Values in a query string must be URL-encoded.' },
    { term: 'UTF-8', definition: 'A variable-width character encoding standard used for electronic communication. It is the dominant character encoding for the World Wide Web, and non-ASCII characters are converted to UTF-8 before being percent-encoded.' },
];

export function UrlEncoderDecoder() {
    const [decoded, setDecoded] = useState('Hello World! This is a test & example?');
    const [encoded, setEncoded] = useState('');
    const [lastChanged, setLastChanged] = useState<'decoded' | 'encoded'>('decoded');
    const [copied, setCopied] = useState<'decoded' | 'encoded' | null>(null);

    useEffect(() => {
        if (lastChanged === 'decoded') {
            try {
                const newEncoded = encodeURIComponent(decoded);
                setEncoded(newEncoded);
            } catch (e) {}
        }
    }, [decoded, lastChanged]);
    
    useEffect(() => {
        if (lastChanged === 'encoded') {
            try {
                // Prevent decoding if it's an incomplete sequence
                if (!/(%[0-9a-fA-F]{0,1})$|(%)$/.test(encoded)) {
                    const newDecoded = decodeURIComponent(encoded);
                    setDecoded(newDecoded);
                }
            } catch (e) {
                // Malformed URI, do nothing to prevent crashing and allow user to fix it
            }
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
        setDecoded(encoded);
        setEncoded(decoded);
        setLastChanged(lastChanged === 'decoded' ? 'encoded' : 'decoded');
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
                                placeholder="Type or paste your plain text here..."
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
                                <Label htmlFor="encoded-input">Encoded (URL-Safe)</Label>
                                 <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleCopy(encoded, 'encoded')}>
                                    {copied === 'encoded' ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                                </Button>
                            </div>
                            <Textarea
                                id="encoded-input"
                                value={encoded}
                                onChange={handleEncodedChange}
                                placeholder="Type or paste your URL-encoded string here..."
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
                <h2 className="text-2xl font-bold mb-4">How to Use the URL Encoder/Decoder</h2>
                <Card className="prose prose-sm max-w-none text-foreground p-6">
                    <p>This tool provides a seamless, real-time experience for converting text to a URL-safe format and back.</p>
                    <ol>
                        <li><strong>Live Conversion:</strong> The tool works instantly. Start typing in either the "Decoded" or "Encoded" box. The other box will automatically update with the converted text.</li>
                        <li><strong>To Encode:</strong> Type your plain text (e.g., "blue & green widgets?") into the top "Decoded" box. The URL-safe version (e.g., "blue%20%26%20green%20widgets%3F") will appear in the bottom "Encoded" box.</li>
                        <li><strong>To Decode:</strong> Paste your encoded string (e.g., "search%20results") into the bottom "Encoded" box. The human-readable version ("search results") will appear in the top "Decoded" box.</li>
                        <li><strong>Swap & Copy:</strong> Use the `Swap` button (<ArrowRightLeft className="inline h-4 w-4" />) to instantly switch the contents of the two boxes. Use the `Copy` icon (<Copy className="inline h-4 w-4" />) above either box to copy its content to your clipboard.</li>
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
                        <CardTitle className="text-primary">Educational Deep Dive: Why URLs Need Encoding</CardTitle>
                    </div>
                    <CardDescription>From spaces to special characters, understand the rules that govern the structure of a URL and why encoding is essential for a functional web.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                    <section>
                        <h3 className="font-bold text-xl">The Anatomy of a URL</h3>
                        <p>A Uniform Resource Locator (URL) is more than just a web address; it's a structured string with specific rules. A URL is composed of several parts, and certain characters are reserved to define this structure. For example, the question mark (`?`) separates the main path from the query string, and the ampersand (`&`) separates key-value pairs within that query string.</p>
                        <p>The problem arises when these reserved characters, or other "unsafe" characters like spaces, need to be included as part of the data itself. If you have a search query for "cats & dogs", the ampersand would be misinterpreted by the server as a separator for a new parameter, breaking the query. This is where URL encoding comes in.</p>
                    </section>
                    <section>
                        <h3 className="font-bold text-xl">Percent-Encoding: The Universal Language of URLs</h3>
                        <p>URL encoding, officially known as <strong>Percent-Encoding</strong>, is a mechanism to represent any character within a URL safely. It works by replacing a problematic character with a three-character sequence:</p>
                        <ol>
                           <li>A percent sign (`%`).</li>
                           <li>Two hexadecimal digits representing the ASCII value of the character.</li>
                        </ol>
                        <p>Let's look at some common examples:</p>
                        <div className="overflow-x-auto my-4">
                           <Table>
                              <TableHeader><TableRow><TableHead>Character</TableHead><TableHead>Encoded Value</TableHead><TableHead>Reason for Encoding</TableHead></TableRow></TableHeader>
                              <TableBody>
                                 <TableRow><TableCell> (space)</TableCell><TableCell className="font-code">%20</TableCell><TableCell>Spaces are not allowed in URLs.</TableCell></TableRow>
                                 <TableRow><TableCell>&</TableCell><TableCell className="font-code">%26</TableCell><TableCell>Reserved character for separating query parameters.</TableCell></TableRow>
                                 <TableRow><TableCell>?</TableCell><TableCell className="font-code">%3F</TableCell><TableCell>Reserved character for starting the query string.</TableCell></TableRow>
                                 <TableRow><TableCell>/</TableCell><TableCell className="font-code">%2F</TableCell><TableCell>Reserved character for separating path segments.</TableCell></TableRow>
                                 <TableRow><TableCell>#</TableCell><TableCell className="font-code">%23</TableCell><TableCell>Reserved character for identifying URL fragments.</TableCell></TableRow>
                               </TableBody>
                           </Table>
                        </div>
                        <p>By encoding these characters, you ensure that they are treated as literal data by the receiving server, rather than as structural parts of the URL.</p>
                    </section>
                     <section>
                        <h3 className="font-bold text-xl">`encodeURIComponent` vs. `encodeURI`</h3>
                        <p>JavaScript provides two main functions for this purpose, and it's crucial to know which one to use. This tool uses `encodeURIComponent` because it is the correct choice for most web development tasks.</p>
                        <ul className="list-disc pl-5">
                           <li><strong>`encodeURIComponent()`:</strong> This function is aggressive. It assumes you are encoding a piece of a URL, like a query parameter's value or a path segment. It encodes all characters that have special meaning, including ` / ? : @ & = + $ # `. You should use this when building a URL from parts, for example: <br/> <code className="font-code bg-muted p-1 rounded-sm">{`const query = encodeURIComponent("Q&A about cats"); const url = \`https://example.com/search?q=\${query}\`;`}</code></li>
                            <li><strong>`encodeURI()`:</strong> This function is less aggressive. It assumes you are passing it a full, valid URI and you don't want to break its structure. Therefore, it does *not* encode the reserved characters listed above. It is useful for encoding a URL that a user might have typed with spaces or non-ASCII characters, but it's generally less common.</li>
                        </ul>
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
                            <li><strong>Check Browser Address Bar:</strong> Your browser automatically encodes URLs when you type them or click links. You can often see the encoded result directly in the address bar after submitting a search form.</li>
                            <li><strong>Decoding for Readability:</strong> When you see a long, confusing URL in server logs or analytics, paste it into the "Encoded" box of this tool to quickly decode it and understand the user's original query.</li>
                            <li><strong>Use for `mailto:` Links:</strong> URL encoding is essential for creating complex `mailto:` links that include a pre-filled subject and body, as these fields often contain spaces and special characters.</li>
                            <li><strong>Bookmarklet Creation:</strong> Developers often create browser bookmarklets using JavaScript. All code within the bookmarklet must be URL-encoded to function correctly.</li>
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                         <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                    </CardHeader>
                    <CardContent>
                         <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                            <li><strong>Double Encoding:</strong> Accidentally encoding a string that is already encoded. This will result in `%` being encoded as `%25`, leading to strings like `%2520` instead of `%20`, which will not decode correctly.</li>
                            <li><strong>Encoding the Full URL:</strong> Using `encodeURIComponent()` on an entire URL (`https://example.com/path?q=test`). This will break the URL by encoding the colons and slashes (`https%3A%2F%2Fexample.com...`), making it unusable.</li>
                            <li><strong>Not Encoding Query Parameters:</strong> Forgetting to encode user-generated content before adding it to a URL's query string. This is a common source of bugs and can lead to security vulnerabilities.</li>
                            <li><strong>Assuming Plus `+` for Spaces:</strong> While some systems use `+` for spaces, the universal standard is `%20`. Relying on `+` can lead to issues if the receiving server does not interpret it correctly.</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
            
            <section>
                <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Building a Search URL</h3>
                        <p className="text-sm text-muted-foreground">A developer is creating a link to a search engine. The user's query is "best C++ tutorials". To safely add this to a URL, they must encode it. The final URL would be `https://www.google.com/search?q=best%20C%2B%2B%20tutorials`, ensuring the `+` characters are correctly encoded as `%2B`.</p>
                    </div>
                     <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Passing a URL as a Parameter</h3>
                        <p className="text-sm text-muted-foreground">A redirection service needs to pass a destination URL as a parameter to another URL. For example: `https://example.com/redirect?target=https://other.com/page?id=1`. The `target` parameter's value must be fully encoded to prevent the `?` and `/` from breaking the parent URL. This tool is used to encode the target URL into a safe string.</p>
                    </div>
                     <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Debugging Analytics Data</h3>
                        <p className="text-sm text-muted-foreground">A data analyst is looking at a report of top landing pages and sees a URL like `/products/view?item=T-Shirt%20%28Blue%29`. To make their report more readable, they copy the encoded part (`T-Shirt%20%28Blue%29`) and use the decoder to find the original product name: "T-Shirt (Blue)".</p>
                    </div>
                     <div className="bg-card p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Creating Social Media Share Links</h3>
                        <p className="text-sm text-muted-foreground">A content creator wants to make a "Share on X" link that pre-fills a post. The desired text is "Check out this amazing tool! #ICT". They must URL-encode this text to create a valid link, like `https://x.com/intent/post?text=Check%20out%20this%20amazing%20tool!%20%23ICT`, ensuring the space and '#' are handled correctly.</p>
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
                                        <div dangerouslySetInnerHTML={{ __html: item.answer.replace('Base64 encoding', "<a href='/tools/base64-encoder-decoder' class='text-primary hover:underline'>Base64 encoding</a>").replace('Unicode/ASCII Converter', "<a href='/tools/unicode-ascii-converter' class='text-primary hover:underline'>Unicode/ASCII Converter</a>") }} />
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>
            </section>
            
            <section>
                <h2 className="text-2xl font-bold mb-4">Related Tools & Articles</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Link href="/tools/base64-encoder-decoder" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">Base64 Encoder / Decoder<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">For encoding binary data or other content that needs to be safely transmitted in a text-based format.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                    <Link href="/tools/http-header-checker" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">HTTP Header Checker<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">Inspect the headers of a URL to see how a server responds to an encoded request.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                     <Link href="/tools/json-formatter" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">JSON Formatter / Validator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">If you are passing JSON objects in a URL, they must be URL-encoded after being stringified.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                </div>
            </section>
        </div>
    );
}
