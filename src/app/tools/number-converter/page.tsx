
import { PageHeader } from '@/components/page-header';
import { NumberConverter } from './number-converter';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { Lightbulb, AlertTriangle, BookOpen, ChevronRight, Wand } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
    title: 'Binary, Decimal, Hex Converter | ICT Toolbench',
    description: 'A real-time number base converter for binary, decimal, and hexadecimal values. An essential tool for developers, engineers, and computer science students.',
};

const faqData = [
    { question: "What are number base systems?", answer: "A number base system is the framework for how we count and represent numbers. The most common is decimal (base-10), which uses ten digits (0-9). Computers use binary (base-2), with just two digits (0 and 1). Hexadecimal (base-16) uses sixteen symbols (0-9 and A-F) and is a compact way to represent binary data." },
    { question: "Why do programmers use hexadecimal?", answer: "Hexadecimal is used because it's a human-friendly way to represent binary data. Each hexadecimal digit corresponds to exactly four binary digits (a 'nibble'). This makes it much easier to read and write long binary strings, such as memory addresses, color codes (#RRGGBB), or machine code." },
    { question: "How does binary work?", answer: "Binary is a base-2 system where each digit's position represents a power of two (1, 2, 4, 8, 16, etc.), rather than powers of ten. Computers use binary because the two digits, 0 and 1, can be directly represented by the 'off' and 'on' states of a transistor." },
    { question: "Is this tool safe for sensitive data?", answer: "Yes. All conversions happen entirely within your browser using JavaScript. No data is sent to our servers, ensuring your information remains private." },
    { question: "Can this tool handle large numbers?", answer: "Yes, this tool uses JavaScript's `BigInt` to handle arbitrarily large integers, so you can convert very large numbers between bases without losing precision, which can be a problem with standard number types." },
    { question: "What is a 'nibble'?", answer: "A nibble is a four-bit aggregation, or half of an octet (an 8-bit byte). A single hexadecimal digit can represent one nibble. For example, the byte `10100101` can be seen as two nibbles: `1010` (A in hex) and `0101` (5 in hex), making the hex representation `A5`." },
    { question: "How does this relate to IP addresses?", answer: "An IPv4 address is a 32-bit binary number, typically represented as four 8-bit decimal octets (e.g., 192.168.1.1). Understanding binary-to-decimal conversion is essential for subnetting. You can explore this further with our <a href='/tools/ip-to-binary' class='text-primary hover:underline'>IP to Binary Converter</a>." },
    { question: "How does this relate to colors on the web?", answer: "Hexadecimal color codes (e.g., `#FF0000` for red) are a common way to represent RGB colors. Each pair of hex digits represents the intensity (0-255) of the red, green, and blue color channels. Our <a href='/tools/color-converter' class='text-primary hover:underline'>Hex ↔ RGB Color Converter</a> is specifically designed for this purpose." }
];

const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Convert Between Number Bases',
    description: 'A step-by-step guide to using the number base converter.',
    step: [
        { '@type': 'HowToStep', name: 'Enter a Number', text: 'Type a number into any of the three fields: Decimal (base-10), Hexadecimal (base-16), or Binary (base-2).' },
        { '@type': 'HowToStep', name: 'View Live Conversions', text: 'As you type, the other two fields will instantly update with the converted values.' },
        { '@type': 'HowToStep', name: 'Copy the Result', text: 'Click the copy icon next to any field to copy the number in that base to your clipboard.' },
    ],
    totalTime: 'PT1M'
};

const keyTerminologies = [
    { term: 'Decimal (Base 10)', definition: 'The standard number system used by humans, with ten digits (0-9).' },
    { term: 'Binary (Base 2)', definition: 'The number system used by computers, with two digits (0 and 1).' },
    { term: 'Hexadecimal (Base 16)', definition: 'A number system with sixteen symbols (0-9 and A-F), often used as a compact representation of binary data.' },
    { term: 'Bit', definition: 'A single binary digit (a 0 or a 1).' },
    { term: 'Byte', definition: 'A group of 8 bits.' },
    { term: 'Nibble', definition: 'A group of 4 bits, which can be represented by a single hexadecimal digit.' },
];

export default function NumberConverterPage() {
  return (
    <>
      <StructuredData data={faqData.map(item => ({'@type': 'Question', name: item.question, acceptedAnswer: {'@type': 'Answer', text: item.answer.replace(/<[^>]*>?/gm, '')}}))} />
      <StructuredData data={howToSchema} />
      <div className="max-w-4xl mx-auto space-y-12">
        <PageHeader
          title="Binary ↔ Decimal ↔ Hex Converter"
          description="A real-time number base conversion tool for developers, engineers, and students working with binary, decimal, and hexadecimal systems."
        />
        
        <NumberConverter />

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use This Tool</h2>
          <Card className="prose prose-sm max-w-none text-foreground p-6">
              <p>This converter offers a seamless way to translate numbers between the three most common bases used in computing.</p>
              <ol>
                  <li><strong>Enter Any Number:</strong> Start typing in any of the three fields—Decimal, Hexadecimal, or Binary.</li>
                  <li><strong>See Instant Conversions:</strong> The other two fields will update in real-time as you type, showing you the equivalent number in the other bases.</li>
                  <li><strong>Copy What You Need:</strong> Click the copy icon next to any field to copy the result to your clipboard.</li>
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
                  <CardTitle className="text-primary">Educational Deep Dive: Understanding Number Systems</CardTitle>
              </div>
              <CardDescription>From human counting to computer logic, learn why different number bases are essential in the world of technology.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
              <section>
                  <h3 className="font-bold text-xl">Why We Don't All Use Base-10</h3>
                  <p>Humans naturally think in **Decimal (Base-10)** because we have ten fingers. It's the system we learn from childhood, with digits 0 through 9. But computers are built on transistors that have only two states: on or off. This makes **Binary (Base-2)**, with its two digits 0 and 1, the native language of all digital hardware.</p>
                  <p>While binary is perfect for computers, long strings of 1s and 0s are very difficult for humans to read. This is where **Hexadecimal (Base-16)** comes in. Hexadecimal uses digits 0-9 and A-F. It serves as a compact, human-friendly shorthand for binary because one hex digit can represent exactly four binary digits (a nibble). This makes it ideal for representing memory addresses, file headers, and color codes without the unwieldy length of a pure binary string.</p>
              </section>
              <section>
                  <h3 className="font-bold text-xl">Real-World Examples</h3>
                  <ul className="list-disc pl-5">
                     <li><strong>Colors in CSS:</strong> A hex color code like `#3B82F6` is actually three hexadecimal numbers combined: `3B` for red, `82` for green, and `F6` for blue. In decimal, this is `rgb(59, 130, 246)`.</li>
                     <li><strong>Networking:</strong> An IPv4 address is a 32-bit binary number. We write it as four decimal numbers (e.g., `192.168.1.1`) for readability.</li>
                     <li><strong>File Permissions in Linux:</strong> File permissions are often represented in octal (base-8), another compact system. The permission `755` is three octal numbers representing the permissions for the owner, group, and others.</li>
                     <li><strong>Low-Level Debugging:</strong> When inspecting a program's memory, developers use hexadecimal because it maps directly to the binary data stored in RAM, making it easier to read than a raw binary dump.</li>
                  </ul>
              </section>
          </CardContent>
        </Card>

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
                <Link href="/tools/ip-to-binary" className="block">
                    <Card className="hover:border-primary transition-colors h-full">
                        <CardHeader>
                            <CardTitle className="text-base flex items-center justify-between">IP to Binary Converter<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                            <CardDescription className="text-xs">See a practical application of decimal-to-binary conversion in networking.</CardDescription>
                        </CardHeader>
                    </Card>
                </Link>
                <Link href="/tools/color-converter" className="block">
                    <Card className="hover:border-primary transition-colors h-full">
                        <CardHeader>
                            <CardTitle className="text-base flex items-center justify-between">Hex ↔ RGB Color Converter<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                            <CardDescription className="text-xs">A specialized converter for the hexadecimal color codes used in web design.</CardDescription>
                        </CardHeader>
                    </Card>
                </Link>
                <Link href="/tools/base64-encoder-decoder" className="block">
                    <Card className="hover:border-primary transition-colors h-full">
                        <CardHeader>
                            <CardTitle className="text-base flex items-center justify-between">Base64 Encoder/Decoder<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                            <CardDescription className="text-xs">Explore another base-system (Base64) used for encoding data, not just numbers.</CardDescription>
                        </CardHeader>
                    </Card>
                </Link>
            </div>
        </section>
      </div>
    </>
  );
}
