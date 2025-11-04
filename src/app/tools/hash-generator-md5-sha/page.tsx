
import { PageHeader } from '@/components/page-header';
import { HashGenerator } from './hash-generator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Lightbulb, AlertTriangle, BookOpen, ChevronRight, Wand } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';

export const metadata = {
    title: 'MD5 & SHA Hash Generator | Online Checksum Tool | ICT Toolbench',
    description: 'Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from any text. A secure, client-side tool for developers to verify data integrity and for educational purposes.',
};

export default function HashGeneratorPage() {
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
  
  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "MD5 / SHA Hash Generator",
    "operatingSystem": "All",
    "applicationCategory": "DeveloperApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "A free, client-side tool to generate MD5, SHA-1, SHA-256, and SHA-512 hashes from text input for data integrity checks and educational purposes.",
    "url": "https://www.icttoolbench.com/tools/hash-generator-md5-sha"
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
          title="MD5 / SHA Hash Generator"
          description="Generate cryptographic hashes in MD5, SHA-1, SHA-256, and SHA-512 formats. A secure, client-side tool for data integrity checks and development purposes."
        />
        <HashGenerator />

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use This Tool</h2>
          <Card className="prose prose-sm max-w-none text-foreground p-6">
              <p>This tool provides an instant way to generate common cryptographic hashes from any piece of text.</p>
              <ol>
                  <li><strong>Enter Text:</strong> Type or paste any string of text into the "Input Text" field.</li>
                  <li><strong>See Live Hashes:</strong> As you type, the tool will automatically generate the corresponding hashes for MD5, SHA-1, SHA-256, and SHA-512 in the fields below.</li>
                  <li><strong>Copy the Result:</strong> Click the copy icon next to any hash to copy it to your clipboard.</li>
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
                  <CardTitle className="text-primary">Educational Deep Dive: The Digital Fingerprint</CardTitle>
              </div>
              <CardDescription>Understand what hashing is, why it's a cornerstone of modern security, and the difference between secure and insecure algorithms.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
              <section>
                  <h3 className="font-bold text-xl">What is Hashing?</h3>
                  <p>
                    A cryptographic hash function is like a magical blender for data. You can put anything into it—a short password, a large file, an entire movie—and it produces a fixed-size, unique-looking string of text called a "hash" or "digest". This process has three critical properties:
                  </p>
                  <ul className="list-disc pl-5">
                     <li><strong>Deterministic:</strong> The same input will <strong>always</strong> produce the same output. Hashing "hello" will produce the same result every single time.</li>
                     <li><strong>One-Way Function:</strong> It's computationally impossible to go backwards. If you only have the hash, you cannot figure out the original input. This is what makes it perfect for password security.</li>
                     <li><strong>Avalanche Effect:</strong> Changing even a single bit of the input (like from "hello" to "Hello") will produce a completely different and unrecognizable hash.</li>
                  </ul>
              </section>
              <section>
                  <h3 className="font-bold text-xl">MD5 vs. SHA: A Tale of Two Algorithms</h3>
                  <p>
                    <strong>MD5 (Message Digest 5)</strong> is a fast but old hashing algorithm. In the early 2000s, cryptographic weaknesses were discovered that made it possible for attackers to create "collisions" (two different inputs that create the same hash). Because of this, <strong>MD5 is considered broken and must not be used for security purposes like password storage.</strong> Its only modern use is as a basic checksum to verify file integrity against accidental corruption, not malicious tampering.
                  </p>
                  <p><strong>SHA (Secure Hash Algorithm)</strong> is a family of algorithms developed by the NSA.</p>
                    <ul>
                        <li><strong>SHA-1:</strong> The successor to MD5, SHA-1 was widely used but is also now considered broken and deprecated as collision attacks have become practical.</li>
                        <li><strong>SHA-2 (SHA-256, SHA-512):</strong> This is the current industry standard. SHA-256 is used extensively in blockchain technology (like Bitcoin) and for signing SSL certificates. SHA-512 offers even greater security with a larger hash output. For any new development, SHA-256 is the recommended minimum.</li>
                    </ul>
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
                        <li><strong>Verify File Downloads:</strong> After downloading a large file (like a Linux ISO), the provider will often list its SHA-256 hash. You can use a command-line tool (`shasum -a 256 file.iso`) to generate the hash of your downloaded file and compare it to the one on the website to ensure your file is authentic and not corrupted.</li>
                        <li><strong>Use for API Signing:</strong> Hashes are used to ensure that data sent to an API has not been tampered with. A common method is to create a signature by hashing the request body along with a secret key.</li>
                        <li><strong>Git Commits:</strong> The version control system Git uses SHA-1 hashes to uniquely identify every single commit, ensuring the integrity of the entire code history.</li>
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                     <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                </CardHeader>
                <CardContent>
                     <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                        <li><strong>Using Hashes for Encryption:</strong> Hashing is not encryption. Encryption is a two-way process (you can encrypt and decrypt), while hashing is a one-way process. Never use a hash to "store" data you need to retrieve later.</li>
                        <li><strong>Storing Passwords as Plain Hashes:</strong> Never store a user's password as a plain MD5 or SHA hash. Always use a "salt" (a unique random string per user) before hashing to defeat rainbow table attacks. Better yet, use a modern, dedicated password hashing algorithm like Argon2 or bcrypt.</li>
                        <li><strong>Trusting MD5 for Security:</strong> Using MD5 for anything other than a basic checksum is a serious security vulnerability.</li>
                    </ul>
                </CardContent>
            </Card>
        </div>

        <section>
            <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Password Storage</h3>
                    <p className="text-sm text-muted-foreground">When you sign up for a website, the service should never store your password in plain text. Instead, they hash it (with a salt). When you log in, they hash the password you just entered and compare it to the stored hash. If they match, you're authenticated. This way, even if their database is breached, the attackers only get a list of hashes, not the actual passwords. Our <Link href='/tools/password-strength-checker' className='text-primary hover:underline'>Password Strength Checker</Link> can help you create strong passwords to begin with.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">File Integrity Verification</h3>
                    <p className="text-sm text-muted-foreground">A software developer releases a new program. Alongside the download link, they publish the SHA-256 hash of the installation file. Users can download the file, calculate its hash on their own computer, and compare it to the one on the website. If the hashes match, the user can be confident that the file was not corrupted during download or tampered with by a third party. This can be verified with our <Link href='/tools/file-integrity-checker' className='text-primary hover:underline'>File Integrity Checker</Link> tool.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Digital Signatures</h3>
                    <p className="text-sm text-muted-foreground">To create a digital signature, a person first hashes the document they want to sign. Then, they encrypt that hash with their private key. The recipient can then decrypt the signature with the sender's public key to get the original hash and compare it to the hash of the document they received. If they match, it proves the document is authentic and hasn't been altered.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Blockchain</h3>
                    <p className="text-sm text-muted-foreground">In a cryptocurrency like Bitcoin, every block contains the hash of the previous block. This creates an unbroken, chronological chain. If an attacker tries to change a transaction in an old block, the hash of that block would change, which would invalidate the hash in the next block, and so on, making tampering immediately obvious to the entire network.</p>
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

      <section>
          <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link href="/tools/password-strength-checker" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Password Strength Checker<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Before hashing a password, check if it's strong enough to withstand attacks.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
              <Link href="/tools/base64-encoder-decoder" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Base64 Encoder/Decoder<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Explore a different kind of data transformation: encoding vs. hashing.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
               <Link href="/tools/salting-hashing-demo" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Salting & Hashing Demo<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Visually understand why salting is a critical part of password security.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
          </div>
      </section>
      </div>
    </>
  );
}
