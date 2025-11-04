
import React from 'react';
import { PageHeader } from '@/components/page-header';
import { Base32_58EncoderDecoder } from './base32-58-encoder-decoder';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BookOpen, AlertTriangle, Wand, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';


export const metadata = {
    title: 'Base32 & Base58 Encoder / Decoder | ICT Toolbench',
    description: 'Instantly convert text to and from Base32 and Base58 formats. A crucial tool for working with cryptocurrency addresses, unique IDs, and other specialized data formats.',
    openGraph: {
        title: 'Base32 & Base58 Encoder / Decoder | ICT Toolbench',
        description: 'A free, client-side tool for encoding and decoding Base32 and Base58 data, with detailed explanations on their use cases and differences from Base64.',
        url: '/tools/base32-58-encoder-decoder',
    }
};

const Base32_58Page = () => {
    const softwareAppSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Base32 / Base58 Encoder & Decoder",
        "operatingSystem": "All",
        "applicationCategory": "DeveloperApplication",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "description": "A free online tool to encode and decode text to and from Base32 and Base58 formats, with educational content on their applications.",
        "url": "https://www.icttoolbench.com/tools/base32-58-encoder-decoder"
    };
    
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

    return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
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
          title="Base32 / Base58 Encoder & Decoder"
          description="A real-time tool to convert text to and from Base32 and Base58 formats, essential for developers working with specialized data representations like cryptocurrency addresses."
        />
        
        <Base32_58EncoderDecoder />

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use This Tool</h2>
          <Card className="prose prose-sm max-w-none text-foreground p-6">
              <p>This tool provides a simple, two-way interface for translating text into Base32 or Base58 formats.</p>
              <ol>
                  <li><strong>Select the Encoding:</strong> Choose either the "Base32" or "Base58" tab depending on the format you need.</li>
                  <li><strong>Enter Your Text:</strong> Type plain text into the "Decoded" box to encode it, or paste an encoded string into the "Encoded" box to decode it.</li>
                  <li><strong>View Instant Results:</strong> The tool converts in real-time as you type, showing the result in the other text box.</li>
                  <li><strong>Copy the Output:</strong> Use the copy icon next to any box to copy the result to your clipboard.</li>
              </ol>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Worked Examples</h2>
          <div className="space-y-6">
              <Card>
                  <CardHeader>
                      <CardTitle className="text-xl">Example 1: Encoding a String to Base32</CardTitle>
                      <CardDescription>See how the word "Hello" is converted into a case-insensitive Base32 string.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <p className="text-sm text-muted-foreground"><strong>Scenario:</strong> You need to encode the simple text "Hello" for a system that requires Base32.</p>
                     <div className="prose prose-sm max-w-none">
                         <ol>
                             <li><strong>ASCII to Binary:</strong> First, each character is converted to its 8-bit ASCII binary representation.
                                <ul className="list-disc pl-5">
                                  <li>H → 01001000</li>
                                  <li>e → 01100101</li>
                                  <li>l → 01101100</li>
                                  <li>l → 01101100</li>
                                  <li>o → 01101111</li>
                                </ul>
                             </li>
                             <li><strong>Concatenate and Re-group:</strong> The binary strings are joined together and then re-grouped into 5-bit chunks (since 2<sup>5</sup> = 32).
                               <p className="font-code bg-muted p-2 rounded-sm break-all">01001 00001 10010 10110 11000 11011 00011 01111</p>
                             </li>
                             <li><strong>Binary to Base32 Characters:</strong> Each 5-bit chunk is converted to its decimal value, which then maps to a character in the Base32 alphabet (A-Z, 2-7).
                                <ul className="list-disc pl-5">
                                  <li>01001 (9) → J</li>
                                  <li>00001 (1) → B</li>
                                  <li>10010 (18) → S</li>
                                  <li>...and so on.</li>
                                </ul>
                             </li>
                             <li><strong>Final Result:</strong> The final encoded string is <code className="font-code bg-muted p-1 rounded-sm">JBSWY3DP</code>. Notice how it's all uppercase and uses no ambiguous characters.</li>
                         </ol>
                     </div>
                  </CardContent>
              </Card>
              <Card>
                  <CardHeader>
                      <CardTitle className="text-xl">Example 2: Generating a Bitcoin-like Address with Base58</CardTitle>
                      <CardDescription>Understand why Base58 is the choice for cryptocurrencies.</CardDescription>
                  </CardHeader>
                   <CardContent className="space-y-4">
                     <p className="text-sm text-muted-foreground"><strong>Scenario:</strong> You have a hexadecimal string representing a wallet hash (e.g., from our <Link href="/tools/hash-generator-md5-sha" className="text-primary hover:underline">Hash Generator</Link>) and need to convert it to the human-readable Base58 format.</p>
                     <div className="prose prose-sm max-w-none">
                         <ol>
                            <li><strong>Start with a Hex String:</strong> Let's use a simplified hex string like `00E4A4...`</li>
                            <li><strong>Convert to a Large Integer:</strong> The entire hex string is treated as one massive number.</li>
                            <li><strong>Repeated Division:</strong> This large number is repeatedly divided by 58 (the size of the Base58 alphabet). The remainder of each division gives us an index for a character in the Base58 character set (`123...abc...`).</li>
                            <li><strong>Construct the String:</strong> The characters are collected in reverse order to form the final Base58 string. The process also accounts for leading zeros, which are preserved as '1's at the start of the address.</li>
                             <li><strong>Final Result:</strong> A long, unambiguous string like <code className="font-code bg-muted p-1 rounded-sm">1PMycacnSnD...</code> is produced. The key takeaway is the character set: it contains no `0`, `O`, `I`, or `l`, making it much safer to transcribe manually than a Base64 string. You can test this by encoding and decoding a hex string with our tool.</li>
                         </ol>
                     </div>
                  </CardContent>
              </Card>
          </div>
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
                  <CardTitle className="text-primary">Educational Deep Dive: Beyond Base64</CardTitle>
              </div>
              <CardDescription>Explore why alternative encodings like Base32 and Base58 were created and where they excel.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
              <section>
                  <h3>Why Not Just Use Base64?</h3>
                  <p>
                    While our <Link href="/tools/base64-encoder-decoder" className="text-primary hover:underline">Base64 Encoder</Link> is a standard for many applications, it has drawbacks. Its character set includes uppercase, lowercase, numbers, and two symbols (`+` and `/`). This can be problematic:
                  </p>
                  <ul className="list-disc pl-5">
                    <li><strong>Case-Sensitivity:</strong> The mix of uppercase and lowercase can lead to errors in transcription or in systems that are not case-sensitive.</li>
                    <li><strong>URL Unsafe:</strong> The `+` and `/` characters have special meanings in URLs and must be URL-encoded, adding complexity.</li>
                    <li><strong>Readability:</strong> The mix of characters can be difficult for humans to read and transcribe accurately.</li>
                  </ul>
                  <p>Base32 and Base58 were created to solve these specific problems.</p>
              </section>
              <section>
                  <h3>Base32: Case-Insensitive and File-Safe</h3>
                  <p>
                    Base32 uses a smaller, 32-character set consisting of the 26 uppercase letters (A-Z) and the numbers 2 through 7. Its key advantages are:
                  </p>
                  <ul className="list-disc pl-5">
                     <li><strong>Case-Insensitive:</strong> Because it only uses uppercase letters, there's no ambiguity between 'a' and 'A'.</li>
                     <li><strong>Filesystem-Safe:</strong> Its character set is safe to use in filenames on virtually all operating systems.</li>
                     <li><strong>Human-Readable:</strong> It avoids visually similar characters, although not as thoroughly as Base58.</li>
                  </ul>
                   <p>The trade-off is efficiency. Because it uses a smaller alphabet, Base32-encoded data is about 20% larger than its Base64 equivalent.</p>
              </section>
              <section>
                  <h3>Base58: The Language of Cryptocurrency</h3>
                  <p>
                    Base58 is most famously used for encoding Bitcoin and other cryptocurrency addresses. It was specifically designed to be as human-friendly and error-resistant as possible for a critical use case: transcribing long addresses.
                  </p>
                  <p>
                    It takes the full alphanumeric character set and removes the characters that are easy to misread: `0` (zero), `O` (uppercase o), `I` (uppercase i), and `l` (lowercase L). This results in a 58-character alphabet that is unambiguous and easier for humans to copy and paste or even read aloud without making costly mistakes. The omission of `+` and `/` also makes it URL-safe by default.
                  </p>
              </section>
          </CardContent>
        </Card>

        <section>
            <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Cryptocurrency Addresses</h3>
                    <p className="text-sm text-muted-foreground">The most prominent use case. Bitcoin, Ethereum, and many other cryptocurrencies use Base58Check (a variant with a checksum) to encode public key hashes into the familiar wallet addresses. The design minimizes transcription errors when sending funds.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Short, Readable Unique IDs</h3>
                    <p className="text-sm text-muted-foreground">URL shortening services like bit.ly and photo-sharing sites like Flickr have used Base58 to generate their short, unique, and easy-to-type identifiers for URLs and images.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Two-Factor Authentication Keys</h3>
                    <p className="text-sm text-muted-foreground">When setting up 2FA, besides the QR code, services often provide a "secret key" you can type manually. This key is typically Base32 encoded because it's case-insensitive and lacks ambiguous characters, making it easier for users to type correctly. You can see this in our <Link href="/tools/totp-demo" className="text-primary hover:underline">2FA TOTP Demo</Link>.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Decentralized Naming Systems</h3>
                    <p className="text-sm text-muted-foreground">Some decentralized naming systems and peer-to-peer protocols use Base32 for encoding public keys or resource identifiers, as its case-insensitivity makes it robust for DNS-like applications.</p>
                </div>
            </div>
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
                                <div dangerouslySetInnerHTML={{ __html: item.answer.replace(/<a href='([^']*)' class='[^']*'>/g, "<a href='$1' class='text-primary hover:underline'>") }} />
                              </AccordionContent>
                          </AccordionItem>
                      ))}
                  </Accordion>
              </CardContent>
          </Card>
      </section>

      <div className="grid md:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <div className='flex items-center gap-2'><Wand className="h-6 w-6 text-accent" /> <CardTitle>Pro Tips & Quick Hacks</CardTitle></div>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                        <li><strong>Identify by Character Set:</strong> If you see an encoded string that contains only uppercase letters and numbers 2-7, it's Base32. If it contains mixed-case letters and numbers but no 0, O, I, or l, it's Base58.</li>
                        <li><strong>Choose for Your Use Case:</strong> Use Base58 for anything a human might have to read or type. Use Base32 for case-insensitive systems or filenames. Use Base64 for general-purpose data transfer where human readability is not a concern.</li>
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                     <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                </CardHeader>
                <CardContent>
                     <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                        <li><strong>Assuming Encryption:</strong> Like Base64, these are encoding schemes, not encryption. They provide zero security and are easily reversible.</li>
                        <li><strong>Mixing Up Alphabets:</strong> Trying to decode a Base58 string with a Base32 decoder (or vice-versa) will fail due to the different character sets.</li>
                        <li><strong>Ignoring Checksums:</strong> Real-world implementations like Bitcoin's Base58Check include a checksum to validate the address and prevent typos. This tool uses the raw Base58 encoding, so it won't validate those checksums.</li>
                    </ul>
                </CardContent>
            </Card>
        </div>

      <section>
        <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/tools/base64-encoder-decoder" className="block">
                <Card className="hover:border-primary transition-colors h-full">
                    <CardHeader>
                        <CardTitle className="text-base flex items-center justify-between">Base64 Encoder/Decoder<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                        <CardDescription className="text-xs">Compare Base32/58 with the most common binary-to-text encoding standard.</CardDescription>
                    </CardHeader>
                </Card>
            </Link>
            <Link href="/tools/totp-demo" className="block">
                <Card className="hover:border-primary transition-colors h-full">
                    <CardHeader>
                        <CardTitle className="text-base flex items-center justify-between">2FA TOTP Demo<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                        <CardDescription className="text-xs">See how Base32 is used in practice to create secret keys for two-factor authentication.</CardDescription>
                    </CardHeader>
                </Card>
            </Link>
            <Link href="/tools/hash-generator-md5-sha" className="block">
                <Card className="hover:border-primary transition-colors h-full">
                    <CardHeader>
                        <CardTitle className="text-base flex items-center justify-between">Hash Generator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                        <CardDescription className="text-xs">Generate the kind of cryptographic hash that is often encoded using Base58 for wallet addresses.</CardDescription>
                    </CardHeader>
                </Card>
            </Link>
        </div>
      </section>

      </div>
    </>
  );
};

export default Base32_58Page;
