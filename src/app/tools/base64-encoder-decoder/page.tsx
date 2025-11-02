
import React from "react";
import { PageHeader } from '@/components/page-header';
import { Base64EncoderDecoder } from './base64-encoder-decoder';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { Lightbulb, AlertTriangle, BookOpen, ChevronRight, Wand, ArrowRightLeft, Copy } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
    title: 'Base64 Encoder / Decoder | ICT Toolbench',
    description: 'Easily encode text to Base64 or decode Base64 strings back to text. Our online tool is fast, secure, and supports UTF-8 characters.',
    openGraph: {
        title: 'Base64 Encoder / Decoder | ICT Toolbench',
        description: 'Instantly encode and decode Base64 strings. A secure, client-side tool for developers handling data for APIs, data URIs, and more.',
        url: '/tools/base64-encoder-decoder',
    }
};

const faqData = [
    { question: "What is Base64 encoding?", answer: "Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format by translating it into a radix-64 representation. It's used to carry data in systems that are designed to only handle text, such as in email attachments or for embedding binary data directly into HTML or CSS files." },
    { question: "Why is it called Base64?", answer: "It's called Base64 because its character set contains 64 basic ASCII characters (A-Z, a-z, 0-9, +, and /) to represent binary data. A padding character, '=', may also be used at the end of the data." },
    { question: "Is Base64 a form of encryption?", answer: "No, absolutely not. Base64 is an encoding scheme, not an encryption algorithm. It provides no security and is easily reversible. Its only purpose is to safely transport data. Never use Base64 to hide or protect sensitive information." },
    { question: "What is a 'data URI'?", answer: "A data URI is a scheme that allows you to embed small files, like images, directly into a web page's source code instead of linking to them as external resources. Base64 is the encoding used to represent the file's data within the URI. For example: `<img src='data:image/png;base64,iVBORw0KGgo...'>`." },
    { question: "Is it safe to use this tool with sensitive information?", answer: "Yes. This tool performs all encoding and decoding operations entirely in your browser using JavaScript's native `btoa()` and `atob()` functions. Your data is never sent to our servers, ensuring it remains private." },
    { question: "Why does my decoded text look like garbled characters?", answer: "This often happens when decoding a Base64 string that represents non-text data, such as an image or a binary file. The browser tries to interpret the raw binary data as text, resulting in gibberish. This tool is intended for encoding and decoding text." },
    { question: "Why does the encoded string sometimes end with '=' or '=='?", answer: "The `=` character is used for padding. The Base64 algorithm processes data in chunks of 3 bytes (24 bits), which it outputs as 4 Base64 characters. If the input data is not a multiple of 3 bytes, padding is added to the end so that the final encoded string is a multiple of 4 characters." },
    { question: "Does this tool support UTF-8 and other international characters?", answer: "Yes. This tool correctly handles multi-byte characters (like 'é' or '😊') by first encoding them into their UTF-8 byte sequence before applying the Base64 algorithm, which is the modern standard for web applications." },
    { question: "How is Base64 different from URL encoding?", answer: "Base64 is for representing binary data as text. URL encoding is for making sure a string is safe to be part of a URL's address bar. They solve different problems. For example, Base64 uses '+' and '/', which are special characters in URLs and would themselves need to be URL-encoded. You can use our <a href='/tools/url-encoder-decoder' class='text-primary hover:underline'>URL Encoder/Decoder</a> for that purpose." },
    { question: "Can I encode a large file with this tool?", answer: "This tool is designed for text and small data snippets. Attempting to paste the content of a very large file can cause your browser to become unresponsive. For large files, it's better to use a command-line tool or a dedicated library in a programming language." },
];

const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Use the Base64 Encoder/Decoder',
    description: 'A guide to encoding plain text into Base64 and decoding it back.',
    step: [
        { '@type': 'HowToStep', name: 'Enter Text', text: 'To encode, type plain text into the top "Decoded" box. To decode, paste your Base64 string into the bottom "Encoded" box.' },
        { '@type': 'HowToStep', name: 'View Real-Time Results', text: 'The tool works in real-time. As you type in one box, the correctly converted text will instantly appear in the other.' },
        { '@type': 'HowToStep', name: 'Copy the Output', text: 'Use the copy button above your desired output box to copy the converted text to your clipboard.' },
        { '@type': 'HowToStep', name: 'Swap or Clear', text: 'Use the swap button to switch the contents of the two boxes, or the clear button to reset both fields.' }
    ],
    totalTime: 'PT1M',
};

const keyTerminologies = [
    { term: 'Base64', definition: 'A group of binary-to-text encoding schemes that represent binary data in an ASCII string format by translating it into a radix-64 representation.' },
    { term: 'Encoding vs. Encryption', definition: 'Encoding transforms data into a different format for usability. Encryption scrambles data into an unreadable format for security. Base64 is encoding, not encryption.' },
    { term: 'Data URI', definition: 'A scheme that allows embedding files (often Base64-encoded images) directly into documents instead of linking to them.' },
    { term: 'ASCII', definition: 'A character encoding standard for electronic communication. Base64 produces text that is safe for all systems that handle ASCII.' },
    { term: 'Padding', definition: 'The use of one or two `=` characters at the end of a Base64 string to ensure its length is a multiple of 4.' },
    { term: 'UTF-8', definition: 'A variable-width character encoding capable of encoding all possible characters. This tool correctly handles UTF-8 text for Base64 conversion.' },
];

export default function Base64Page() {
  return (
    <>
      <StructuredData data={faqData.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer.replace(/<[^>]*>?/gm, '') } }))} />
      <StructuredData data={howToSchema} />
      <div className="max-w-4xl mx-auto space-y-12">
        <PageHeader
            title="Base64 Encoder / Decoder"
            description="Convert text data into a Base64 encoded string, or decode a Base64 string back to its original form. All operations are done securely in your browser."
        />
        <Base64EncoderDecoder />
        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use This Tool</h2>
          <Card className="prose prose-sm max-w-none text-foreground p-6">
              <p>This tool provides real-time, two-way conversion for Base64 encoding.</p>
              <ol>
                  <li><strong>Live Conversion:</strong> As you type in either box, the other will update instantly with the converted content.</li>
                  <li><strong>To Encode:</strong> Type or paste your plain text into the top "Decoded" box. The Base64 string will appear in the "Encoded" box below.</li>
                  <li><strong>To Decode:</strong> Paste a valid Base64 string into the bottom "Encoded" box. The original plain text will appear in the "Decoded" box above. An error will be shown for invalid Base64 input.</li>
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
                  <CardTitle className="text-primary">Educational Deep Dive: Why We Need Base64</CardTitle>
              </div>
              <CardDescription>Understand the fundamental problem that Base64 solves and where it's used in modern web development.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
              <section>
                  <h3 className="font-bold text-xl">The Problem: Binary Data in Text-Based Systems</h3>
                  <p>
                    At their core, many of the internet's foundational systems—like email (SMTP) and HTTP—were originally designed to handle only text data within the limited ASCII character set. This created a problem: how do you send a file, like an image or a PDF, through a system that only understands text? If you were to just paste the raw binary data of an image into an email, the system would misinterpret the non-text bytes as control characters or formatting, corrupting the data.
                  </p>
                  <p>
                    <strong>Base64 is the solution to this problem.</strong> It is a standardized encoding scheme that translates any binary data into a safe, text-only format using just 64 common ASCII characters. This encoded string can then be safely transmitted through any text-based system without data loss or corruption. The receiving system can then decode the Base64 string back into the original binary data.
                  </p>
              </section>
              <section>
                  <h3 className="font-bold text-xl">How Base64 Works: From 3 Bytes to 4 Characters</h3>
                  <p>The Base64 algorithm is clever and efficient. It processes the input data in chunks of 3 bytes (24 bits). It then re-divides these 24 bits into four 6-bit groups. Each 6-bit group can represent 2<sup>6</sup> = 64 different values (from 0 to 63). These values are then mapped to the 64-character Base64 alphabet (`A-Z`, `a-z`, `0-9`, `+`, `/`).</p>
                  <p>
                    The result is that every 3 bytes of binary input become 4 characters of ASCII text output. This makes the encoded data about 33% larger than the original, but it is now completely safe for text-based transport. If the original data isn't a multiple of 3 bytes, padding characters (`=`) are added to the end to make the output length a multiple of 4.
                  </p>
              </section>
          </CardContent>
        </Card>

        <section>
            <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Embedding Images in HTML/CSS</h3>
                    <p className="text-sm text-muted-foreground">A developer wants to include a tiny icon in their CSS without an extra HTTP request. They Base64-encode the icon image and embed it directly in the CSS using a Data URI: `background-image: url('data:image/png;base64,iVBORw0KGgo...');`. This is a common optimization for small, critical assets.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Transmitting Binary Data in JSON</h3>
                    <p className="text-sm text-muted-foreground">An application needs to send a small thumbnail image as part of a JSON API response. Since JSON only supports text, the server Base64-encodes the image binary into a string. The client application can then receive the JSON, extract the Base64 string, and decode it back into an image to display to the user.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Basic HTTP Authentication</h3>
                    <p className="text-sm text-muted-foreground">The 'Basic' HTTP authentication scheme requires the username and password to be sent in the `Authorization` header. The credentials are combined as `username:password` and then Base64-encoded. While not secure (as it's easily decoded), it's a simple, standardized way to transport the credentials in a text-safe format.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Email Attachments</h3>
                    <p className="text-sm text-muted-foreground">The original use case for Base64. When you attach a file (like a PDF or image) to an email, the email client encodes the file's binary data into a Base64 string so it can be safely transmitted as part of the plain-text email message body (MIME standard).</p>
                </div>
            </div>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <div className='flex items-center gap-2'><Wand className="h-6 w-6 text-accent" /> <CardTitle>Common Use Cases</CardTitle></div>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                        <li><strong>Email Attachments:</strong> The original and most classic use case for sending files via email.</li>
                        <li><strong>Data URIs:</strong> Embedding small images or fonts directly into CSS or HTML files to reduce the number of HTTP requests. This is very common for icons or small background images.</li>
                        <li><strong>Basic HTTP Authentication:</strong> The 'Basic' authentication scheme transmits credentials by sending a Base64-encoded string of `username:password` in the `Authorization` header.</li>
                        <li><strong>Storing Binary Data in JSON:</strong> JSON does not support raw binary data. If you need to include a small binary object (like a thumbnail) in a JSON payload, you must first encode it as a Base64 string.</li>
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                     <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                </CardHeader>
                <CardContent>
                     <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                        <li><strong>Using it for Security:</strong> Base64 is not encryption. It is trivially reversible. Never use it to "protect" passwords, API keys, or other sensitive information.</li>
                        <li><strong>Forgetting UTF-8 Support:</strong> Older Base64 implementations can fail on international characters. Modern web standards require text to be UTF-8 encoded *before* being Base64 encoded. This tool handles that correctly.</li>
                        <li><strong>Embedding Large Files:</strong> While you *can* embed a large image in a data URI, it's often a bad practice. It significantly bloats the size of your HTML or CSS file, blocking page rendering, and is less cacheable than an external image file.</li>
                        <li><strong>URL Safety:</strong> The standard Base64 alphabet includes `+` and `/`, which have special meanings in URLs. If you need to put a Base64 string in a URL, you must use a "URL-safe" variant of Base64 that replaces these characters (usually with `-` and `_`).</li>
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
                              <AccordionContent>
                                <div dangerouslySetInnerHTML={{ __html: item.answer }} />
                              </AccordionContent>
                          </AccordionItem>
                      ))}
                  </Accordion>
              </CardContent>
          </Card>
      </section>

      <section>
          <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link href="/tools/url-encoder-decoder" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">URL Encoder / Decoder<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">For encoding strings to be safely used in URLs, which is different from Base64.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
              <Link href="/tools/hash-generator-md5-sha" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Hash Generator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">For creating one-way cryptographic hashes of data, used for security and data integrity.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
              <Link href="/tools/file-integrity-checker" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">File Integrity Checker<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Another method for representing binary data, focused on creating a unique checksum.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
          </div>
      </section>
      </div>
    </>
  );
}
