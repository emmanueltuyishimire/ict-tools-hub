
import React from 'react';
import { PageHeader } from '@/components/page-header';
import { UnicodeAsciiConverter } from './unicode-ascii-converter';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { BookOpen, AlertTriangle, Wand, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';

export const metadata = {
    title: 'Unicode & ASCII Converter | Character to Code Point | ICT Toolbench',
    description: 'Instantly convert characters to their Unicode or ASCII code points and back. A tool for developers working with character encoding, UTF-8, and text processing.',
    openGraph: {
        title: 'Unicode & ASCII Converter | ICT Toolbench',
        description: 'A real-time tool to convert text to Unicode and ASCII code points. Includes deep-dive explanations of character encoding standards.',
        url: '/tools/unicode-ascii-converter',
    }
};

const UnicodeAsciiConverterPage = () => {
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
    "name": "Unicode / ASCII Converter",
    "operatingSystem": "All",
    "applicationCategory": "DeveloperApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "A real-time tool for converting text characters to and from their Unicode and ASCII code points.",
    "url": "https://www.icttoolbench.com/tools/unicode-ascii-converter"
  };

  return (
    <>
      <StructuredData data={faqSchema} />
      <StructuredData data={howToSchema} />
      <StructuredData data={softwareAppSchema} />
      <div className="max-w-4xl mx-auto space-y-12">
        <PageHeader
          title="Unicode / ASCII Converter"
          description="A real-time tool to convert text characters to and from their Unicode and ASCII code points. Essential for developers working with text processing, data formats, and character encoding."
        />
        
        <UnicodeAsciiConverter />

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use the Converter</h2>
          <Card className="prose prose-sm max-w-none text-foreground p-6">
              <p>This tool provides a simple, two-way interface for translating between characters and their numerical code points.</p>
              <ol>
                  <li><strong>Enter Your Text:</strong> You can start in either box.
                    <ul>
                      <li>Type or paste plain text (like "Hello 😊") into the top "Text" box to see its code points.</li>
                      <li>Type or paste code points (like "U+0048 U+0065 U+006C U+006C U+006F") into the bottom "Code Points" box to see the resulting text.</li>
                    </ul>
                  </li>
                  <li><strong>Review the Instant Results:</strong> The tool converts in real-time as you type.</li>
                  <li><strong>Copy the Output:</strong> Use the copy button next to either box to copy the result to your clipboard.</li>
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
                              <dt><strong>{item.term}</strong></dt>
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
                  <CardTitle className="text-primary">Educational Deep Dive: From ASCII to Unicode</CardTitle>
              </div>
              <CardDescription>Explore the history and technology of character encoding, the system that allows computers to represent all human languages.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
              <section>
                  <h3>The Beginning: ASCII</h3>
                  <p>
                    In the early days of computing, communication was primarily in English. <strong>ASCII</strong> (American Standard Code for Information Interchange) was created to solve this. It's a 7-bit character encoding standard that assigns a unique number to 128 characters: the English alphabet (uppercase and lowercase), numbers (0-9), punctuation, and control characters. For example, 'A' is assigned the number 65, 'B' is 66, and so on. This was revolutionary, as it created a universal standard for representing text.
                  </p>
              </section>
              <section>
                  <h3>The Problem: A World of Languages</h3>
                  <p>
                    ASCII's 128 slots were quickly found to be insufficient for a global world. It had no room for accented characters (like 'é'), symbols ('€'), or entire writing systems like Cyrillic, Greek, or Chinese. This led to a chaotic period where hundreds of different, conflicting "code pages" were invented to map the upper 128 slots of an 8-bit system to different character sets. A file written using one code page would appear as gibberish on a system using another.
                  </p>
              </section>
               <section>
                  <h3>The Solution: Unicode</h3>
                  <p>
                    <strong>Unicode</strong> was created to solve this problem permanently. It's not an encoding, but a universal character set—a giant, standardized map that assigns a unique number, called a <strong>code point</strong>, to every character in every language in the world, plus thousands of symbols and emoji. A code point is written in hexadecimal with a "U+" prefix, like `U+0041` for 'A' or `U+1F60A` for the 😊 emoji.
                  </p>
                  <p>
                    Unicode defines the "what" (which number maps to which character), but it doesn't define the "how" (how to store those numbers in bytes). That's the job of an encoding.
                  </p>
              </section>
              <section>
                  <h3>UTF-8: The Dominant Encoding of the Web</h3>
                  <p>
                    <strong>UTF-8</strong> is the most common encoding for Unicode. Its genius is that it's a <strong>variable-width encoding</strong>.
                  </p>
                   <ul className="list-disc pl-5">
                       <li>For any character that is part of the original ASCII set, UTF-8 uses just a single byte, making it 100% backward compatible with ASCII.</li>
                       <li>For characters from other European languages (like 'é'), it uses two bytes.</li>
                       <li>For characters from many Asian languages, it uses three bytes.</li>
                       <li>For the rarest characters, including most emoji, it uses four bytes.</li>
                    </ul>
                    <p>
                        This efficiency and backward compatibility made UTF-8 the de facto standard for the web, email, and most modern file systems. It allows a single document to contain English, Russian, Japanese, and emoji characters, all represented correctly.
                    </p>
              </section>
          </CardContent>
        </Card>

        <section>
            <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Debugging Garbled Text</h3>
                    <p className="text-sm text-muted-foreground">A developer retrieves data from a legacy database and finds that a user's name, "José", is displayed as "JosÃ©". By pasting the garbled text into the converter, they can see the code points for "Ã" and "©", helping them diagnose that UTF-8 multi-byte characters are being incorrectly interpreted as single-byte characters in a different encoding.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Stripping Emojis from Text</h3>
                    <p className="text-sm text-muted-foreground">An application needs to process user input but cannot handle emojis. A developer can convert the input string to code points, filter out any code points in the emoji range (e.g., U+1F600 to U+1F64F), and then convert the remaining code points back to a clean string, effectively stripping all emojis.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Working with Escaped Sequences</h3>
                    <p className="text-sm text-muted-foreground">When working with JSON or some programming languages, Unicode characters are often "escaped", like `\u20AC` for the Euro symbol (€). A developer can use this tool to quickly convert `U+20AC` to the actual character to verify they are using the correct code.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Understanding URL Encoding</h3>
                    <p className="text-sm text-muted-foreground">A user sees a URL like `.../search?q=caf%C3%A9`. To understand it, they can use our <Link href="/tools/url-encoder-decoder" className="text-primary hover:underline">URL Decoder</Link> to get `café`. Then, pasting `é` into this converter shows its code point is U+00E9, which is represented in UTF-8 by the bytes `C3` and `A9`, explaining the `%C3%A9` sequence.</p>
                </div>
            </div>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <div className='flex items-center gap-2'><Wand className="h-6 w-6 text-accent" /> <CardTitle>Pro Tips</CardTitle></div>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                        <li><strong>Find Hidden Characters:</strong> Sometimes text copied from a PDF or website contains invisible characters (like zero-width spaces) that can break code. Pasting the text into this tool will reveal the code points for all characters, visible or not.</li>
                        <li><strong>Debugging Encoding Issues:</strong> If text from a database or API is showing up as garbled symbols (like "â€" instead of a dash), it's often an encoding mismatch. Use this tool to inspect the code points of the garbled text to help diagnose the issue.</li>
                        <li><strong>HTML Entities:</strong> The Unicode code point can be used to create an HTML entity. For example, the Euro symbol (€) is U+20AC. You can represent it in HTML as `&amp;#x20AC;` (hexadecimal) or `&amp;#8364;` (decimal). Explore this with our <Link href='/tools/html-entity-encoder-decoder' className='text-primary hover:underline'>HTML Entity Encoder</Link>.</li>
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                     <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes</CardTitle></div>
                </CardHeader>
                <CardContent>
                     <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                        <li><strong>Confusing Unicode and UTF-8:</strong> Remembering that Unicode is the standard (the map of characters to numbers), while UTF-8 is the encoding (the way those numbers are stored in bytes).</li>
                        <li><strong>Assuming Single-Byte Characters:</strong> In modern programming, it's a mistake to assume one character equals one byte of memory. With UTF-8, a character can be 1 to 4 bytes.</li>
                        <li><strong>Incorrect File Encoding:</strong> Saving a file with Unicode characters using an old encoding like ANSI can lead to data loss or corruption. Always save text files intended for the web as UTF-8.</li>
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
};

export default UnicodeAsciiConverterPage;
