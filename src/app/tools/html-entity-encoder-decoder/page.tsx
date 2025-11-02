
import React from "react";
import { PageHeader } from '@/components/page-header';
import { HtmlEntityEncoderDecoder } from './html-entity-encoder-decoder';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { Lightbulb, AlertTriangle, BookOpen, ChevronRight, Wand, ArrowRightLeft, Copy } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';

export const metadata = {
    title: 'HTML Entity Encoder / Decoder | ICT Toolbench',
    description: 'Easily encode and decode HTML entities to safely display special characters and code snippets on your website. Real-time, client-side conversion.',
};

const faqData = [
    { question: "What are HTML entities?", answer: "HTML entities are pieces of text ('strings') that begin with an ampersand (&) and end with a semicolon (;). They are used to display reserved characters (which would otherwise be interpreted as HTML code), and invisible characters (like non-breaking spaces)." },
    { question: "Why do I need to encode HTML entities?", answer: "You need to encode them to prevent the browser from misinterpreting your text as HTML code. For example, if you want to display the text '<p>This is a paragraph.</p>' literally on your webpage, you must encode the '<' and '>' characters as '&lt;' and '&gt;'. Otherwise, the browser would render it as an actual HTML paragraph." },
    { question: "What is the difference between an entity name and an entity number?", answer: "Most entities have both a name (e.g., `&copy;` for copyright) and a number (e.g., `&#169;`). They render the same character. Names are easier to remember, but numbers are better supported across all character sets. This tool uses named entities where available." },
    { question: "Is this safe for sensitive data?", answer: "Yes. All encoding and decoding operations happen entirely within your browser. No data is sent to any server." },
    { question: "What are 'unreserved' characters?", answer: "Unreserved characters are those that do not have a special meaning in a URL and do not need to be encoded. They include uppercase and lowercase letters (A-Z, a-z), digits (0-9), and the special characters `-`, `_`, `.`, and `~`." },
    { question: "What happens if I try to decode a string that isn't properly encoded?", answer: "The decoder will only convert valid entity sequences (like `&amp;` or `&#169;`). Any other text will remain as-is. If it encounters a malformed entity (like `&amp`), it might not convert it correctly." },
    { question: "Can I encode non-ASCII characters like 'é' or '€'?", answer: "Yes. This tool encodes a wide range of common non-ASCII characters into their respective HTML entities (e.g., `&eacute;` and `&euro;`), ensuring they are displayed correctly in any HTML document." },
    { question: "How is this different from URL encoding?", answer: "HTML entity encoding is for safely displaying text within an HTML document. URL encoding (or percent-encoding) is for safely passing data within a URL's query string. They solve different problems and use different formats. You can use our URL Encoder/Decoder for that purpose." },
    { question: "Should I encode all special characters?", answer: "It is best practice to encode at least the five main reserved HTML characters: & < > \" '. Encoding other characters like the copyright symbol © ensures they are displayed correctly regardless of the document's character set." },
    { question: "Why does a space sometimes appear as `&nbsp;`?", answer: "The `&nbsp;` entity stands for Non-Breaking Space. It's used when you want to ensure that a space is rendered and prevents a line break from occurring at that point, which can be useful for formatting." },
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
    { term: 'Percent-Encoding', definition: 'The encoding mechanism used for URLs, which is different from HTML entity encoding. Use a URL Encoder for this.' },
    { term: 'Non-Breaking Space', definition: 'An HTML entity (`&nbsp;`) that creates a space that will not be collapsed by the browser and prevents a line break.' },
];


export default function HtmlEntityEncoderDecoderPage() {
  return (
    <>
      <StructuredData data={faqData.map(item => ({'@type': 'Question', name: item.question, acceptedAnswer: {'@type': 'Answer', text: item.answer.replace(/<[^>]*>?/gm, '')}}))} />
      <StructuredData data={howToSchema} />
      <div className="max-w-4xl mx-auto space-y-12">
          <PageHeader
              title="HTML Entity Encoder / Decoder"
              description="Convert text to HTML entities to safely display special characters and code, or decode entities back to plain text."
          />
          <HtmlEntityEncoderDecoder />
          <section>
              <h2 className="text-2xl font-bold mb-4">How to Use This Tool</h2>
              <Card className="prose prose-sm max-w-none text-foreground p-6">
                  <p>This tool provides real-time, two-way conversion between plain text and HTML entities.</p>
                  <ol>
                      <li><strong>Live Conversion:</strong> As you type in either box, the other will update instantly with the converted content.</li>
                      <li><strong>To Encode:</strong> Type plain text with special characters (e.g., <strong>&lt;h1&gt;Title&lt;/h1&gt;</strong>) into the top "Decoded" box. The safe HTML entity version will appear in the "Encoded" box.</li>
                      <li><strong>To Decode:</strong> Paste text containing HTML entities (e.g., <strong>&amp;lt;p&amp;gt;</strong>) into the bottom "Encoded" box to see the original plain text.</li>
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
                      <CardTitle className="text-primary">Educational Deep Dive</CardTitle>
                  </div>
                  <CardDescription>Understand why displaying code and special symbols on a web page requires special handling.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                  <section>
                      <h3 className="font-bold text-xl">The Browser's Dilemma: Code vs. Content</h3>
                      <p>A web browser's primary job is to interpret HTML code and render a visual page. This creates a problem: what if you want to <strong>display</strong> a piece of HTML code as text, instead of having the browser render it? If you write <code>&lt;p&gt;</code> in your HTML file, the browser will create a paragraph. It has no way of knowing you just wanted to show the literal characters '&lt;', 'p', and '&gt;'.</p>
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
                          <li><strong>Use for Code Snippets:</strong> Before displaying sample code (HTML, XML, etc.) on your website inside <code>&lt;code&gt;</code> or <code>&lt;pre&gt;</code> tags, run it through the encoder to ensure it renders as text.</li>
                          <li><strong>Non-Breaking Spaces:</strong> Use the entity <code>&amp;nbsp;</code> when you need to ensure two words are not separated by a line break.</li>
                          <li><strong>Copyright & Trademarks:</strong> Quickly find the entities for common symbols like Copyright (<code>&amp;copy;</code>), Registered Trademark (<code>&amp;reg;</code>), and Trademark (<code>&amp;trade;</code>).</li>
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
                          <li><strong>Double Encoding:</strong> Accidentally running already-encoded text through the encoder again. This will encode the ampersands (e.g., <code>&amp;amp;lt;</code>), resulting in incorrect output.</li>
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
                                  <AccordionContent>
                                    <div dangerouslySetInnerHTML={{ __html: item.answer.replace('URL Encoder/Decoder', "<a href='/tools/url-encoder-decoder' class='text-primary hover:underline'>URL Encoder/Decoder</a>") }} />
                                  </AccordionContent>
                              </AccordionItem>
                          ))}
                      </AccordionContent>
                  </Card>
              </section>
      </div>
    </>
  );
}
