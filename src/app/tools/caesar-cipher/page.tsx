
import { PageHeader } from '@/components/page-header';
import { CaesarCipher } from './caesar-cipher';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Lightbulb, AlertTriangle, BookOpen, ChevronRight, Wand, ArrowRightLeft, Copy } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';


export const metadata = {
    title: 'Caesar Cipher Encoder / Decoder | ICT Toolbench',
    description: 'Explore the classic Caesar cipher with our real-time encoder and decoder. Choose any shift value from 1 to 25 to encrypt and decrypt messages instantly.',
};

export default function CaesarCipherPage() {
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
      "name": "Caesar Cipher Encoder / Decoder",
      "operatingSystem": "All",
      "applicationCategory": "SecurityApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "An educational tool to demonstrate the Caesar substitution cipher with a variable shift.",
      "url": "https://www.icttoolbench.com/tools/caesar-cipher"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
      <div className="max-w-4xl mx-auto space-y-12">
        <PageHeader
          title="Caesar Cipher Encoder / Decoder"
          description="Encrypt and decrypt messages using the classic Caesar cipher. Choose any shift value to transform your text and learn the fundamentals of substitution ciphers."
        />
        <CaesarCipher />

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use This Tool</h2>
          <Card className="prose prose-sm max-w-none text-foreground p-6">
              <p>This tool lets you experiment with one of history's most famous ciphers. It works in real-time for both encoding and decoding.</p>
              <ol>
                  <li><strong>Select the Shift Value:</strong> Use the slider to pick your "secret key"—the number of places you want to shift the letters (from 1 to 25). A shift of 3 is the classic Caesar cipher.</li>
                  <li><strong>Enter Your Text:</strong> Type your plaintext message into the top "Decoded" box to encrypt it, or paste your ciphertext into the bottom "Encoded" box to decrypt it.</li>
                  <li><strong>See the Instant Result:</strong> The translated text will appear in the other box as you type.</li>
                  <li><strong>Swap or Copy:</strong> Use the swap button (<ArrowRightLeft className="inline h-4 w-4" />) to instantly switch the contents of the two boxes. Use the copy button (<Copy className="inline h-4 w-4" />) to grab the output.</li>
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
                  <CardTitle className="text-primary">Educational Deep Dive: A Foundation of Cryptography</CardTitle>
              </div>
              <CardDescription>Explore the history of the Caesar cipher, how it works, and why its weaknesses paved the way for modern encryption.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
              <section>
                  <h3 className="font-bold text-xl">The First Military-Grade Encryption</h3>
                  <p>
                    The Caesar cipher is named after Julius Caesar, who used it to protect sensitive military communications over 2,000 years ago. By shifting each letter by a pre-agreed number (his was a shift of 3), he could send messages that would be meaningless to an enemy if intercepted. Only a receiver who knew the "key" (the shift value) could reverse the process and read the original message. This represents one of the earliest documented uses of a substitution cipher for tactical advantage.
                  </p>
              </section>
              <section>
                  <h3 className="font-bold text-xl">How it Works: Modular Arithmetic</h3>
                  <p>The cipher's logic is based on modular arithmetic. Each letter is assigned a number (A=0, B=1, etc.). To encrypt, you add the shift value to the letter's number and take the result modulo 26 (the number of letters in the alphabet). To decrypt, you subtract the shift value.</p>
                  <p>For example, with a shift of 3, the letter 'X' (value 23) becomes:</p>
                  <p className="font-code bg-muted p-2 rounded-md">(23 + 3) mod 26 = 26 mod 26 = 0</p>
                  <p>A value of 0 corresponds to the letter 'A'. So, 'X' becomes 'A'. The special case of this is <Link href="/tools/rot13-encoder-decoder" className="text-primary hover:underline">ROT13</Link>, where the shift is 13. Since 13 is half of 26, adding 13 twice brings you back to the start, making it its own inverse.</p>
              </section>
              <section>
                  <h3 className="font-bold text-xl">Why It's Insecure: Frequency Analysis</h3>
                  <p>
                    The Caesar cipher is trivial to break. Since there are only 25 possible keys, an attacker can simply try every key until one produces readable text (a brute-force attack). Even more powerfully, it can be broken with <strong>frequency analysis</strong>. In any language, certain letters appear more frequently than others (in English, 'E', 'T', and 'A' are the most common). By analyzing the ciphertext and seeing which letter appears most often, a cryptanalyst can make an educated guess about what that letter corresponds to (likely 'E') and thereby deduce the shift key. This weakness is inherent in all monoalphabetic substitution ciphers and led to the development of more complex polyalphabetic ciphers.
                  </p>
              </section>
          </CardContent>
        </Card>
        
        <section>
            <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Educational Puzzles</h3>
                    <p className="text-sm text-muted-foreground">The Caesar cipher is a classic tool for creating puzzles in escape rooms, scavenger hunts, and educational materials for children. It provides a fun and engaging way to introduce the basic concepts of cryptography without being overly complex.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Basic Data Obfuscation</h3>
                    <p className="text-sm text-muted-foreground">While not secure, a Caesar cipher can be used for very basic obfuscation to hide plain text from a casual glance. For example, a developer might use it to lightly obscure a hint or answer in a game's source code.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Historical Context</h3>
                    <p className="text-sm text-muted-foreground">Studying the Caesar cipher is a great way to understand the history of cryptography and appreciate the ingenuity of ancient military communications. It provides a baseline for understanding why modern, complex algorithms are necessary.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Learning Programming Logic</h3>
                    <p className="text-sm text-muted-foreground">Implementing a Caesar cipher is a common and excellent beginner's exercise in programming. It teaches fundamental concepts like character encoding (ASCII), string manipulation, and modular arithmetic.</p>
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
                        <li><strong>Brute-Force Decoding:</strong> If you receive a Caesar-encrypted message but don't know the key, you can simply use this tool and slide the shift value from 1 to 25. One of the positions will reveal the original message.</li>
                        <li><strong>Recognizing the Cipher:</strong> If a block of text seems to be gibberish but has the same letter frequency and word structure as normal text, it might be a simple substitution cipher like Caesar's.</li>
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
                        <li><strong>Using it for Security:</strong> The most critical mistake. The Caesar cipher provides no real security. Never use it to protect any information that is even remotely sensitive.</li>
                        <li><strong>Forgetting the Key:</strong> If you encrypt a message with a specific shift and forget the value, you'll have to brute-force it yourself to get it back (though with only 25 options, this is easy).</li>
                        <li><strong>Assuming it Works on All Characters:</strong> Remember that numbers and symbols are not affected. If your message contains them, they will remain in the ciphertext, which can be a clue for a cryptanalyst.</li>
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
                              <AccordionContent><div dangerouslySetInnerHTML={{ __html: item.answer }} /></AccordionContent>
                          </AccordionItem>
                      ))}
                  </Accordion>
              </CardContent>
          </Card>
      </section>
      
        <section>
          <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link href="/tools/rot13-encoder-decoder" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">ROT13 Encoder / Decoder<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Try out the most famous and specific version of the Caesar cipher.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
              <Link href="/tools/hash-generator-md5-sha" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Hash Generator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Compare this simple cipher to modern, one-way hash functions used for real security.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
               <Link href="/tools/encryption-decryption-tool" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">AES Encryption Tool<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Explore modern, secure symmetric encryption using the AES standard.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
          </div>
      </section>
      </div>
    </>
  );
}

    