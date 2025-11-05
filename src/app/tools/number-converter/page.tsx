
import { PageHeader } from '@/components/page-header';
import { NumberConverter } from './number-converter';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Lightbulb, AlertTriangle, BookOpen, ChevronRight, Wand } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
    title: 'Binary, Decimal, & Hex Converter | Real-Time Number Base Tool | ICT Toolbench',
    description: 'A real-time number base converter for binary, decimal, and hexadecimal values. An essential tool for developers, engineers, and computer science students to master number systems.',
    openGraph: {
        title: 'Binary, Decimal, & Hex Converter | ICT Toolbench',
        description: 'Instantly convert between binary, decimal, and hexadecimal. Includes educational guides, examples, and pro tips for developers and students.',
        url: '/tools/number-converter',
    }
};

const faqData = [
    { question: "What are number base systems?", answer: "A number base system is the framework for how we count and represent numbers. The most common is decimal (base-10), which uses ten digits (0-9). Computers use binary (base-2), with just two digits (0 and 1). Hexadecimal (base-16) uses sixteen symbols (0-9 and A-F) and is a compact way to represent binary data." },
    { question: "Why do programmers use hexadecimal?", answer: "Hexadecimal is used because it's a human-friendly way to represent binary data. Each hexadecimal digit corresponds to exactly four binary digits (a 'nibble'). This makes it much easier to read and write long binary strings, such as memory addresses, color codes (#RRGGBB), or machine code." },
    { question: "How does binary work?", answer: "Binary is a base-2 system where each digit's position represents a power of two (1, 2, 4, 8, 16, etc.), rather than powers of ten. Computers use binary because the two digits, 0 and 1, can be directly represented by the 'off' and 'on' states of a transistor." },
    { question: "Is this tool safe for sensitive data?", answer: "Yes. All conversions happen entirely within your browser using JavaScript. No data is sent to our servers, ensuring your information remains private." },
    { question: "Can this tool handle large numbers?", answer: "Yes, this tool uses JavaScript's `BigInt` to handle arbitrarily large integers, so you can convert very large numbers between bases without losing precision, which can be a problem with standard number types." },
    { question: "What is a 'nibble'?", answer: "A nibble is a four-bit aggregation, or half of an octet (an 8-bit byte). A single hexadecimal digit can represent one nibble. For example, the byte `10100101` can be seen as two nibbles: `1010` (A in hex) and `0101` (5 in hex), making the hex representation `A5`." },
    { question: "How does this relate to IP addresses?", answer: "An IPv4 address is a 32-bit binary number, typically represented as four 8-bit decimal octets (e.g., 192.168.1.1). Understanding binary-to-decimal conversion is essential for subnetting. You can explore this further with our <a href='/tools/ip-to-binary' class='text-primary hover:underline'>IP to Binary Converter</a>." },
    { question: "How does this relate to colors on the web?", answer: "Hexadecimal color codes (e.g., `#FF0000` for red) are a common way to represent RGB colors. Each pair of hex digits represents the intensity (0-255) of the red, green, and blue color channels. Our <a href='/tools/color-converter' class='text-primary hover:underline'>Hex ↔ RGB Color Converter</a> is specifically designed for this purpose." },
    { question: "How do you manually convert from decimal to binary?", answer: "To convert a number like 192, find the largest power of 2 that fits into it (128), subtract it, and repeat for the remainder until you reach 0. For 192: it's 1*128 (remainder 64), then 1*64 (remainder 0). So, the 8-bit binary is `11000000`." },
    { question: "What is the maximum value for an 8-bit, 16-bit, or 32-bit number?", answer: "For an n-bit unsigned number, the maximum value is 2^n - 1. An 8-bit number's max value is 255. A 16-bit number's max value is 65,535. A 32-bit number's max value is 4,294,967,295." }
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
  const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqData.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer.replace(/<[^>]*>?/gm, '') } }))
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
      <div className="max-w-4xl mx-auto space-y-12">
        <PageHeader
          title="Binary ↔ Decimal ↔ Hex Converter"
          description="A real-time number base conversion tool for developers, engineers, and students working with binary, decimal, and hexadecimal systems. Instantly see how numbers are represented across the foundational bases of computing."
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
                  <h3>Why We Don't All Use Base-10</h3>
                  <p>
                    Humans naturally think in <strong>Decimal (Base-10)</strong> because we have ten fingers. It's the system we learn from childhood, with digits 0 through 9. But computers are built on transistors that have only two states: on or off. This makes <strong>Binary (Base-2)</strong>, with its two digits 0 and 1, the native language of all digital hardware.
                  </p>
                  <p>
                    While binary is perfect for computers, long strings of 1s and 0s are very difficult for humans to read. This is where <strong>Hexadecimal (Base-16)</strong> comes in. Hexadecimal uses digits 0-9 and letters A-F. It serves as a compact, human-friendly shorthand for binary because one hex digit can represent exactly four binary digits (a nibble). This makes it ideal for representing memory addresses, file headers, and color codes without the unwieldy length of a pure binary string.
                  </p>
                  <p>
                    Understanding how to convert between these bases is not just an academic exercise; it's a fundamental skill for anyone working in technology. It's the bridge between human logic and computer execution.
                  </p>
              </section>
              <section>
                  <h3>Manual Conversion: From Decimal to Binary and Hex</h3>
                   <p>Understanding how the conversion works manually solidifies the concepts. Let's convert the decimal number <strong>214</strong>.</p>
                    <h4>Decimal to Binary</h4>
                    <p>We use powers of 2. Find the largest power of 2 that fits into 214 and subtract it, then repeat with the remainder.</p>
                    <ol className='list-decimal pl-5'>
                        <li>The largest power of 2 less than 214 is 128 (2<sup>7</sup>). 214 - 128 = 86. (Bit 7 is <strong>1</strong>)</li>
                        <li>The largest power of 2 less than 86 is 64 (2<sup>6</sup>). 86 - 64 = 22. (Bit 6 is <strong>1</strong>)</li>
                        <li>22 is less than 32 (2<sup>5</sup>). (Bit 5 is <strong>0</strong>)</li>
                        <li>The largest power of 2 less than 22 is 16 (2<sup>4</sup>). 22 - 16 = 6. (Bit 4 is <strong>1</strong>)</li>
                        <li>6 is less than 8 (2<sup>3</sup>). (Bit 3 is <strong>0</strong>)</li>
                        <li>The largest power of 2 less than 6 is 4 (2<sup>2</sup>). 6 - 4 = 2. (Bit 2 is <strong>1</strong>)</li>
                        <li>The largest power of 2 less than 2 is 2 (2<sup>1</sup>). 2 - 2 = 0. (Bit 1 is <strong>1</strong>)</li>
                        <li>The remainder is 0, so the last bit is 0. (Bit 0 is <strong>0</strong>)</li>
                    </ol>
                    <p>Combining these gives the 8-bit binary number: <strong>11010110</strong>.</p>
                     <h4>Decimal to Hexadecimal</h4>
                    <p>We use division by 16 and find the remainders.</p>
                    <ol className='list-decimal pl-5'>
                       <li>Divide 214 by 16: 214 / 16 = 13 with a remainder of 6.</li>
                       <li>The remainder, 6, is our last hex digit.</li>
                       <li>The quotient, 13, corresponds to the hex digit 'D'.</li>
                    </ol>
                    <p>Reading the digits from bottom to top gives us the hexadecimal number: <strong>D6</strong>.</p>
              </section>
          </CardContent>
        </Card>

        <section>
            <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Web Development (CSS Colors)</h3>
                    <p className="text-sm text-muted-foreground">A web designer provides a color in RGB format, `rgb(239, 68, 68)`. The developer needs the hex code for their CSS stylesheet. They enter `239`, `68`, `68` into a converter to get the hex equivalent `#EF4444` for the `background-color` property. This can be done directly with our <Link href="/tools/color-converter" className='text-primary hover:underline'>Hex ↔ RGB Color Converter</Link>.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Networking (Subnetting)</h3>
                    <p className="text-sm text-muted-foreground">A network engineer is calculating a subnet mask. They know the mask's last octet is `240`. To understand how many bits this mask uses, they convert `240` to binary, which is `11110000`. This tells them the mask uses the first 4 bits of the last octet, which is crucial for their <Link href="/tools/subnet-calculator" className='text-primary hover:underline'>subnet calculations</Link>.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Low-Level Programming/Debugging</h3>
                    <p className="text-sm text-muted-foreground">A C++ programmer is debugging a memory issue. The debugger shows a memory address as `0x7FFF5FBFFD60`. To understand the bit-level flags or structure at that address, they might convert parts of the hex value to binary to see which specific flags are turned on or off.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Character Encoding (UTF-8)</h3>
                    <p className="text-sm text-muted-foreground">A developer is working with character encodings. They see that the Euro symbol (€) is represented in a URL as `%E2%82%AC`. By converting the hex values `E2`, `82`, and `AC` to binary, they can see the underlying three-byte UTF-8 sequence used to represent that character.</p>
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
                        <li><strong>Grouping Binary:</strong> To make long binary strings readable, group them into nibbles (4 bits). `11011010` is easier to read as `1101 1010`. Each nibble corresponds to one hex digit.</li>
                        <li><strong>Powers of 2:</strong> Memorizing powers of two (1, 2, 4, 8, 16, 32, 64, 128) is the key to fast manual binary-to-decimal conversion.</li>
                        <li><strong>Hex to Binary in Your Head:</strong> To convert a hex digit to binary, just convert its decimal equivalent to a 4-bit number. `C` is 12, which is `8+4`, so its binary is `1100`.</li>
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                     <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes</CardTitle></div>
                </CardHeader>
                <CardContent>
                     <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                        <li><strong>Invalid Characters:</strong> Using digits other than 0 or 1 in binary, or letters other than A-F in hexadecimal.</li>
                        <li><strong>Forgetting `0x` or `0b`:</strong> In many programming languages, you must prefix hexadecimal numbers with `0x` (e.g., `0xFF`) and binary numbers with `0b` (e.g., `0b1101`) for the compiler to understand them.</li>
                        <li><strong>Case Sensitivity:</strong> Hexadecimal is case-insensitive (`ff` is the same as `FF`), but consistency is good practice.</li>
                        <li><strong>Manual Calculation Errors:</strong> It's easy to make a mistake when manually converting large numbers. Always use a tool like this one to double-check important values.</li>
                    </ul>
                </CardContent>
            </Card>
        </div>

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
