
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
    description: 'A guide to encoding and decoding URL strings.',
    step: [
        { '@type': 'HowToStep', name: 'Enter Text', text: 'To encode, type or paste your plain text into the "Decoded" text area. To decode, type or paste your encoded string into the "Encoded" text area.' },
        { '@type': 'HowToStep', name: 'View Instant Results', text: 'As you type in one box, the corresponding encoded or decoded text will instantly appear in the other box.' },
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
                            

                         <div className="flex justify-center items-center">
                            <Button variant="outline" size="icon" onClick={handleSwap} aria-label="Swap encoded and decoded text">
                                <ArrowRightLeft className="h-4 w-4" />
                            

                         
                             <div className="flex justify-between items-center">
                                <Label htmlFor="encoded-input">Encoded (URL-Safe)</Label>
                                 <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleCopy(encoded, 'encoded')}>
                                    {copied === 'encoded' ?  : }
                                
                            
                         
                     
                        
                        <Button onClick={handleClear} variant="destructive">Clear All</Button>
                     
                
            
            
                
                
                    
                    
                    The tool provides a seamless, real-time experience for converting text to a URL-safe format and back.
                    
                        
                        
                            Live Conversion:
                             The tool works instantly. Start typing in either the "Decoded" or "Encoded" box. The other box will automatically update with the converted text.
                            
                        
                        
                            To Encode:
                             Type your plain text (e.g., "blue & green widgets?") into the top "Decoded" box. The URL-safe version (e.g., "blue%20%26%20green%20widgets%3F") will appear in the bottom "Encoded" box.
                            
                        
                        
                            To Decode:
                             Paste your encoded string (e.g., "search%20results") into the bottom "Encoded" box. The human-readable version ("search results") will appear in the top "Decoded" box.
                            
                        
                        
                            Swap & Copy:
                             Use the  button () to instantly switch the contents of the two boxes. Use the  icon () above either box to copy its content to your clipboard.
                            
                        
                    
                
            
            
                
                
                    
                    
                    
                        
                            
                                
                                
                            
                            
                                
                                
                            
                        
                    
                
            

             
                
                    
                    
                     Educational Deep Dive: Why URLs Need Encoding
                    
                
                
                    
                    
                        
                         The Anatomy of a URL
                        
                        A Uniform Resource Locator (URL) is more than just a web address; it's a structured string with specific rules. A URL is composed of several parts, and certain characters are reserved to define this structure. For example, the question mark (?) separates the main path from the query string, and the ampersand (&) separates key-value pairs within that query string.
                        
                        The problem arises when these reserved characters, or other "unsafe" characters like spaces, need to be included as part of the data itself. If you have a search query for "cats & dogs", the ampersand would be misinterpreted by the server as a separator for a new parameter, breaking the query. This is where URL encoding comes in.
                    
                    
                        
                         Percent-Encoding: The Universal Language of URLs
                        
                        URL encoding, officially known as 
                        
                        A percent sign (%).
                        Two hexadecimal digits representing the ASCII value of the character.
                        
                        Let's look at some common examples:
                         
                            
                                
                                
                                
                            
                            
                                
                                
                                 
                                Spaces are not allowed in URLs.
                                
                            
                            
                                
                                
                                &
                                
                            
                            
                                Reserved character for separating query parameters.
                                
                            
                            
                                
                                
                                ?
                                
                            
                            
                                Reserved character for starting the query string.
                                
                            
                            
                                
                                
                                /
                                
                            
                            
                                Reserved character for separating path segments.
                                
                            
                            
                                
                                
                                #
                                
                            
                            
                                Reserved character for identifying URL fragments.
                                
                            
                        
                        By encoding these characters, you ensure that they are treated as literal data by the receiving server, rather than as structural parts of the URL.
                    
                     vs. 
                    
                    JavaScript provides two main functions for this purpose, and it's crucial to know which one to use. This tool uses 
                    
                        
                        This function is aggressive. It assumes you are encoding a piece of a URL, like a query parameter's value or a path segment. It encodes all characters that have special meaning, including 
                         You should use this when building a URL from parts, for example: 
                        
                            
                         This function is less aggressive. It assumes you are passing it a full, valid URI and you don't want to break its structure. Therefore, it does 
                        
                    
                
            
            
                
                    Pro Tips & Quick Hacks
                    
                        Check Browser Address Bar:
                         Your browser automatically encodes URLs when you type them or click links. You can often see the encoded result directly in the address bar after submitting a search form.
                        Decoding for Readability:
                         When you see a long, confusing URL in server logs or analytics, paste it into the "Encoded" box of this tool to quickly decode it and understand the user's original query.
                         Use for  Links:
                         URL encoding is essential for creating complex  links that include a pre-filled subject and body, as these fields often contain spaces and special characters.
                        Bookmarklet Creation:
                         Developers often create browser bookmarklets using JavaScript. All code within the bookmarklet must be URL-encoded to function correctly.
                        
                    
                
                
                    Common Mistakes to Avoid
                    
                        Double Encoding:
                         Accidentally encoding a string that is already encoded. This will result in % being encoded as %25, leading to strings like %2520 instead of %20, which will not decode correctly.
                        Encoding the Full URL:
                         Using () on an entire URL (://example.com/path?q=test). This will break the URL by encoding the colons and slashes (https%3A%2F%2Fexample.com...), making it unusable.
                        Not Encoding Query Parameters:
                         Forgetting to encode user-generated content before adding it to a URL's query string. This is a common source of bugs and can lead to security vulnerabilities.
                        Assuming Plus  for Spaces:
                         While some systems use  for spaces, the universal standard is %20. Relying on  can lead to issues if the receiving server does not interpret it correctly.
                        
                    
                
            

            
                
                    
                     Real-Life Application Scenarios
                    
                    Building a Search URL
                     A developer is creating a link to a search engine. The user's query is "best C++ tutorials". To safely add this to a URL, they must encode it. The final URL would be ://www.google.com/search?q=best%20C%2B%2B%20tutorials, ensuring the + characters are correctly encoded as %2B.
                    Passing a URL as a Parameter
                     A redirection service needs to pass a destination URL as a parameter to another URL. For example: ://example.com/redirect?target=://other.com/page?id=1. The  parameter's value must be fully encoded to prevent the  and / from breaking the parent URL. This tool is used to encode the target URL into a safe string.
                    Debugging Analytics Data
                     A data analyst is looking at a report of top landing pages and sees a URL like /products/view?item=T-Shirt%20%28Blue%29. To make their report more readable, they copy the encoded part (T-Shirt%20%28Blue%29) and use the decoder to find the original product name: "T-Shirt (Blue)".
                    Creating Social Media Share Links
                     A content creator wants to make a "Share on X" link that pre-fills a post. The desired text is "Check out this amazing tool! #ICT". They must URL-encode this text to create a valid link, like ://x.com/intent/post?text=Check%20out%20this%20amazing%20tool!%20%23ICT, ensuring the space and '#' are handled correctly.
                    
                
            

            
                
                    Frequently Asked Questions
                    
                        
                            
                                
                                
                                    
                                    
                                
                            
                        
                    
                
            
            
                
                    Related Tools & Articles
                    
                        Base64 Encoder / Decoder
                         For encoding binary data or other content that needs to be safely transmitted in a text-based format.
                        HTTP Header Checker
                         Inspect the headers of a URL to see how a server responds to an encoded request.
                         JSON Formatter / Validator
                         If you are passing JSON objects in a URL, they must be URL-encoded after being stringified.
                        
                    
                
            
        
    );
}
