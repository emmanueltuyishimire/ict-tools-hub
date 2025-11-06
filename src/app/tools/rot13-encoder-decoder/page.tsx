
import { PageHeader } from '@/components/page-header';
import { Rot13EncoderDecoder } from './rot13-encoder-decoder';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Lightbulb, AlertTriangle, BookOpen, ChevronRight, Wand, ArrowRightLeft, Copy } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';

export const metadata = {
    title: 'ROT13 Encoder / Decoder | Simple Substitution Cipher | ICT Toolbench',
    description: 'Instantly encode or decode text with the ROT13 cipher. A simple tool for learning about basic substitution ciphers and for light-hearted message obfuscation.',
};

export default function Rot13Page() {
  const faqPageSchema = {
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

  const howToPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Use the ROT13 Encoder/Decoder',
    description: 'A step-by-step guide to encoding and decoding text using the ROT13 cipher.',
    step: howToSchema.step,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToPageSchema) }}
      />
      <div className="max-w-4xl mx-auto space-y-12">
        <PageHeader
          title="ROT13 Encoder / Decoder"
          description="A simple tool to encode and decode text using the ROT13 substitution cipher. Perfect for puzzles, games, and learning the basics of ciphers."
        />
        <Rot13EncoderDecoder />

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use This Tool</h2>
          <Card className="prose prose-sm max-w-none text-foreground p-6">
              <p>This tool provides real-time, two-way conversion for the ROT13 cipher. Because ROT13 is its own inverse, encoding and decoding are the same operation.</p>
              <ol>
                  <li><strong>Live Conversion:</strong> As you type in either box, the other will update instantly with the translated content.</li>
                  <li><strong>Encode/Decode:</strong> Type plain text in the top box to see the ROT13 version below, or paste ROT13 text in the bottom box to see the plain text above.</li>
                  <li><strong>Swap & Copy:</strong> Use the <strong>Swap</strong> button (<ArrowRightLeft className="inline h-4 w-4" />) to instantly switch the contents of the two boxes. Use the <strong>Copy</strong> icon (<Copy className="inline h-4 w-4" />) above either box to copy its content to your clipboard.</li>
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
                  <CardTitle className="text-primary">Educational Deep Dive: A Look at Simple Ciphers</CardTitle>
              </div>
              <CardDescription>Understand how substitution ciphers like ROT13 work and their historical significance in cryptography.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
              <section>
                  <h3 className="font-bold text-xl">The Caesar Cipher Family</h3>
                  <p>ROT13 is a specific example of the <strong>Caesar cipher</strong>, one of the oldest and simplest known encryption techniques. Named after Julius Caesar, who used it in his private correspondence, the cipher works by shifting each letter of the alphabet by a fixed number of places. For example, with a shift of 3, 'A' would become 'D', 'B' would become 'E', and so on. At the end of the alphabet, it wraps around, so 'X' would become 'A'.</p>
                  <p>ROT13 is simply a Caesar cipher with a shift of 13. The number 13 is special because the Latin alphabet has 26 letters, and 13 is exactly half. This means applying the cipher a second time with the same shift of 13 will perfectly reverse the process and return the original text. This unique property makes it its own inverse, so you don't need separate "encrypt" and "decrypt" functions.</p>
              </section>
              <section>
                  <h3 className="font-bold text-xl">ROT13 in Internet Culture</h3>
                  <p>In the early days of the internet on platforms like Usenet newsgroups, there was no built-in way to hide content from casual readers. ROT13 was adopted by the community as a simple and standard method for information hiding. It was never intended for security. Its purpose was to prevent accidental reading of:</p>
                    <ul className="list-disc pl-5">
                       <li><strong>Spoilers:</strong> For movies, books, or games.</li>
                       <li><strong>Punchlines:</strong> To avoid ruining a joke.</li>
                       <li><strong>Puzzle Solutions:</strong> To allow others to attempt a puzzle first.</li>
                       <li><strong>Potentially Offensive Content:</strong> To require a deliberate action from the user before they could read something sensitive.</li>
                    </ul>
                  <p>The act of applying ROT13 to text became a common practice, and many newsgroup readers had a built-in "decode ROT13" button.</p>
              </section>
          </CardContent>
        </Card>
        
        <section>
            <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Geocaching Puzzles</h3>
                    <p className="text-sm text-muted-foreground">Geocaching, a real-world treasure hunting game, often uses simple ciphers for puzzle caches. A cache description might include a hint like "V xabj gur fpebff-gnfgvat," which decoders will recognize as ROT13 for "I know the secret-tasting." It provides a fun, low-barrier challenge for players.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Forum Spoilers</h3>
                    <p className="text-sm text-muted-foreground">In a forum discussing a new movie, a user wants to talk about the ending. To be courteous to others, they write their spoiler-filled paragraph and encode it with ROT13. This allows other users who have seen the movie to decode and participate, while new viewers can safely scroll past.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Introduction to Cryptography</h3>
                    <p className="text-sm text-muted-foreground">An educator teaching a basic computer science class uses the ROT13 tool to demonstrate the concept of a substitution cipher. Students can encode and decode messages instantly, providing a hands-on, interactive way to understand the fundamental principles before moving on to more complex topics like the <a href="/tools/caesar-cipher" className="text-primary hover:underline">Caesar Cipher</a>.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Lightweight Data Obfuscation</h3>
                    <p className="text-sm text-muted-foreground">A developer might use ROT13 to weakly obfuscate email addresses in a web page's source code to deter the most basic email-harvesting bots. While not a security measure, it can prevent simple scrapers from grabbing plaintext email addresses.</p>
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
                        <li><strong>Recognize ROT13:</strong> If you see a block of seemingly random letters but with preserved punctuation and numbers, there's a good chance it's ROT13. Paste it into the decoder to check.</li>
                        <li><strong>Simple Puzzles:</strong> ROT13 is great for creating simple puzzles or secret messages for games and fun activities.</li>
                        <li><strong>Combining Ciphers:</strong> For slightly more advanced (but still insecure) fun, you can combine ROT13 with other simple ciphers, like a reversing cipher. First apply ROT13, then reverse the resulting string.</li>
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                     <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                </CardHeader>
                <CardContent>
                     <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                        <li><strong>Using it for Security:</strong> The most critical mistake. ROT13 provides zero cryptographic security. It can be broken instantly by anyone. Do not use it to protect passwords, private keys, or any sensitive data.</li>
                        <li><strong>Expecting it to Work on All Characters:</strong> ROT13 only works on the 26 letters of the English alphabet. It does not translate numbers, symbols, or letters from other languages.</li>
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
                                <div dangerouslySetInnerHTML={{ __html: item.answer.replace(/<a href='([^']*)' class='[^']*'>/g, "<a href='$1' class='text-primary hover:underline'>") }} />
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
              <Link href="/tools/caesar-cipher" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Caesar Cipher Encoder / Decoder<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Explore the more general version of ROT13 with a variable shift.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
              <Link href="/tools/base64-encoder-decoder" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Base64 Encoder/Decoder<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Learn about a different kind of data transformation: encoding for transport, not obfuscation.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
              <Link href="/tools/encryption-decryption-tool" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">AES Encryption Tool<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Compare this simple cipher with modern, secure symmetric encryption.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
          </div>
      </section>
      </div>
    </>
  );
}
