
import { PageHeader } from '@/components/page-header';
import { CaesarCipher } from './caesar-cipher';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { Lightbulb, AlertTriangle, BookOpen, ChevronRight, Wand, ArrowRightLeft, Copy } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
    title: 'Caesar Cipher Encoder / Decoder | ICT Toolbench',
    description: 'Explore the classic Caesar cipher with our real-time encoder and decoder. Choose any shift value from 1 to 25 to encrypt and decrypt messages instantly.',
};

const faqData = [
    { question: "What is a Caesar cipher?", answer: "A Caesar cipher is one of the oldest and simplest forms of encryption. It is a substitution cipher where each letter in the plaintext is shifted a certain number of places down the alphabet. For example, with a shift of 3, 'A' would become 'D', 'B' would become 'E', and so on. The alphabet wraps around, so 'Z' with a shift of 3 would become 'C'." },
    { question: "Is the Caesar cipher secure?", answer: "Absolutely not. It is extremely insecure by modern standards. Since there are only 25 possible shifts, an attacker can easily try all of them in a brute-force attack to find the original message. It should only be used for educational purposes or simple puzzles." },
    { question: "How does this tool work?", answer: "This tool takes your text and a chosen shift value (from 1 to 25). For each letter in the text, it calculates its new position in the alphabet based on the shift and reconstructs the new message. The same process works in reverse for decoding." },
    { question: "What is the difference between this and ROT13?", answer: "ROT13 is a specific type of Caesar cipher where the shift value is always 13. Because 13 is half of 26, ROT13 is its own inverse (encoding and decoding use the same operation). This tool allows you to use any shift from 1 to 25, making it a more general Caesar cipher implementation. You can try our dedicated <a href='/tools/rot13-encoder-decoder' class='text-primary hover:underline'>ROT13 tool</a> to see this in action." },
    { question: "What happens to numbers, spaces, and symbols?", answer: "In a standard Caesar cipher, any characters that are not letters of the alphabet are left unchanged. This tool follows that convention, only shifting the letters A-Z (both uppercase and lowercase)." },
    { question: "Who was Caesar and did he really use this?", answer: "The cipher is named after Julius Caesar, the Roman general and statesman, who, according to the historian Suetonius, used it with a shift of three to protect his military communications. If a message was intercepted, it would be unreadable to anyone who didn't know the secret shift key." },
    { question: "What is 'brute-force attack' in this context?", answer: "A brute-force attack is a trial-and-error method used to decode encrypted data. For a Caesar cipher, an attacker would simply try decoding the message with a shift of 1, then a shift of 2, then 3, and so on, up to 25. One of these attempts will produce readable text, breaking the cipher instantly." },
    { question: "Is it possible to have a shift greater than 25?", answer: "While you could, it would be redundant. A shift of 26 would result in the original text. A shift of 27 would be identical to a shift of 1, as the alphabet wraps around. Therefore, only shifts from 1 to 25 produce unique ciphers." },
    { question: "What is a 'substitution cipher'?", answer: "A substitution cipher is a method of encryption where units of plaintext are replaced with ciphertext according to a regular system. In a simple substitution cipher like Caesar's, each letter is replaced by another letter. More complex ciphers can substitute letters for symbols or groups of letters." },
    { question: "How could I make this cipher stronger?", answer: "A simple Caesar cipher is weak because every letter is shifted by the same amount. A stronger (but still breakable) version would be a 'polyalphabetic cipher' like the Vigenère cipher, where the shift value changes for each letter based on a keyword. Modern encryption, like AES, is vastly more complex and not based on simple letter substitution." },
];

const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Use the Caesar Cipher Tool',
    description: 'A step-by-step guide to encoding and decoding text with a Caesar cipher.',
    step: [
        { '@type': 'HowToStep', name: 'Select a Shift Value', text: 'Use the slider to choose a shift value between 1 and 25. This is your secret key.' },
        { '@type': 'HowToStep', name: 'Enter Text', text: 'To encode, type your message into the top "Decoded" box. To decode, paste the ciphertext into the bottom "Encoded" box.' },
        { '@type': 'HowToStep', name: 'View Instant Results', text: 'The tool will automatically apply the shift to your text and display the result in the other box in real-time.' },
        { '@type': 'HowToStep', name: 'Copy or Swap', text: 'Use the copy icon to copy the output. Use the swap button to switch the contents of the two text boxes.' },
    ],
    totalTime: 'PT1M'
};

const keyTerminologies = [
    { term: 'Caesar Cipher', definition: 'A substitution cipher where each letter is shifted a fixed number of places down the alphabet.' },
    { term: 'Shift Key', definition: 'The number of positions each letter is shifted in a Caesar cipher. This is the "secret" needed to decode the message.' },
    { term: 'Plaintext', definition: 'The original, readable message before encryption.' },
    { term: 'Ciphertext', definition: 'The encrypted, unreadable message after the cipher has been applied.' },
    { term: 'Brute-Force Attack', definition: 'An attack method that involves systematically trying all possible keys (in this case, all 25 shifts) until the correct one is found.' },
    { term: 'Cryptography', definition: 'The practice and study of techniques for secure communication in the presence of third parties.' },
];

export default function CaesarCipherPage() {
  return (
    <>
      <StructuredData data={{'@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqData.map(item => ({'@type': 'Question', name: item.question, acceptedAnswer: {'@type': 'Answer', text: item.answer.replace(/<[^>]*>?/gm, '')}}))}} />
      <StructuredData data={howToSchema} />
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
                  <li><strong>Swap or Copy:</strong> Use the swap button (<ArrowRightLeft className="inline h-4 w-4" />) to switch the plaintext and ciphertext. Use the copy button (<Copy className="inline h-4 w-4" />) to grab the output.</li>
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
                  <p>A value of 0 corresponds to the letter 'A'. So, 'X' becomes 'A'. The special case of this is <a href="/tools/rot13-encoder-decoder" className="text-primary hover:underline">ROT13</a>, where the shift is 13. Since 13 is half of 26, adding 13 twice brings you back to the start, making it its own inverse.</p>
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
                    <p className="text-sm text-muted-foreground">The Caesar cipher is a classic tool for creating puzzles in escape rooms, scavenger hunts, and educational materials for children. It offers a fun and engaging way to introduce the basic concepts of cryptography without being overly complex.</p>
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
                          <AccordionItem value={\`item-\${index}\`} key={index}>
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
          </div>
      </section>
      </div>
    </>
  );
}
