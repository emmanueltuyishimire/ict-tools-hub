
import { PageHeader } from '@/components/page-header';
import { HashGenerator } from './hash-generator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { Lightbulb, AlertTriangle, BookOpen, ChevronRight, Wand } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
    title: 'MD5 & SHA Hash Generator | Online Checksum Tool | ICT Toolbench',
    description: 'Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from any text. A secure, client-side tool for developers to verify data integrity and for educational purposes.',
};

const faqData = [
    { question: "What is a cryptographic hash function?", answer: "A cryptographic hash function is a mathematical algorithm that takes an input of any size and produces a fixed-size string of characters, which is the 'hash'. This process is one-way, meaning it's practically impossible to reverse. Key properties include determinism (the same input always produces the same output) and collision resistance (it's extremely difficult to find two different inputs that produce the same output)." },
    { question: "Is MD5 secure? Why is it considered broken?", answer: "No, MD5 is not secure for cryptographic purposes like password storage. It is considered 'cryptographically broken' because practical collision attacks have been demonstrated, meaning attackers can find two different inputs that produce the same MD5 hash. This makes it vulnerable. It should only be used for non-security purposes, like as a basic checksum to verify file integrity." },
    { question: "What is the difference between SHA-1, SHA-256, and SHA-512?", answer: "They are all part of the SHA (Secure Hash Algorithm) family but differ in their output size and security level. SHA-1 produces a 160-bit hash and is now considered insecure. SHA-256 and SHA-512 are part of the SHA-2 family, producing 256-bit and 512-bit hashes respectively. SHA-256 is the current industry standard for most applications, including SSL certificates and blockchain technology, while SHA-512 offers an even higher level of security." },
    { question: "Is it safe to enter my data into this tool?", answer: "Yes. All hashing calculations are performed entirely within your web browser using JavaScript's built-in Web Crypto API (and a JS implementation for MD5). Your data is never sent to our servers, ensuring your privacy and security." },
    { question: "What is a 'hash collision'?", answer: "A hash collision occurs when two different inputs produce the exact same hash output. For a secure cryptographic hash function, finding a collision should be computationally infeasible (i.e., it would take millions of years with current technology). The discovery of practical collision attacks against MD5 and SHA-1 is why they are no longer considered secure." },
    { question: "What is 'salting' and how does it relate to hashing?", answer: "Salting is a crucial technique used in password hashing. Before hashing a user's password, a unique, random string (the 'salt') is added to it. This means that even if two users have the same password, their stored hashes will be different. Salting makes 'rainbow table' attacks (which use pre-computed hash values) ineffective. Our <a href='/tools/salting-hashing-demo' className='text-primary hover:underline'>Salting & Hashing Demo Tool</a> illustrates this concept." },
    { question: "Can I use this tool to hash a file?", answer: "This tool is designed for text input only. To hash a file, you would need a tool that can read the file's binary data and process it through the hashing algorithm. Command-line tools like `md5sum` or `shasum` are commonly used for this purpose." },
    { question: "Why do the SHA hashes look longer than the MD5 hash?", answer: "This is because they have a larger output size. MD5 produces a 128-bit hash (32 hexadecimal characters). SHA-1 produces a 160-bit hash (40 characters). SHA-256 produces a 256-bit hash (64 characters), and SHA-512 produces a 512-bit hash (128 characters). The longer the hash, the more possible combinations exist, making it more secure against collisions and brute-force attacks." },
    { question: "What are checksums?", answer: "A checksum is a value calculated from a block of data, used to detect errors that may have been introduced during its transmission or storage. While any hash function can be used to generate a checksum, non-cryptographic checksums are often faster but offer no security against intentional modification. MD5 is commonly used as a checksum to verify file integrity after a download." },
    { question: "How does blockchain technology use hashing?", answer: "Hashing is fundamental to blockchain. Each block in the chain contains a hash of the previous block's header, creating a secure, tamper-evident chain. If a single piece of data in a previous block is altered, its hash will change, which would cause all subsequent block hashes to change, immediately revealing the tampering. Bitcoin, for example, heavily uses the SHA-256 algorithm." }
];

const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Generate MD5/SHA Hashes',
    description: 'A step-by-step guide to generating cryptographic hashes from text.',
    step: [
        { '@type': 'HowToStep', name: 'Enter Input Text', text: 'Type or paste the text you want to hash into the "Input Text" area.' },
        { '@type': 'HowToStep', name: 'View Real-Time Results', text: 'The tool automatically calculates the MD5, SHA-1, SHA-256, and SHA-512 hashes for your input as you type.' },
        { '@type': 'HowToStep', name: 'Copy a Hash', text: 'Click the copy icon next to any of the generated hashes to copy it to your clipboard for use in your application, script, or documentation.' },
    ],
    totalTime: 'PT1M'
};

const keyTerminologies = [
    { term: 'Hash Function', definition: 'An algorithm that converts an input of arbitrary size into a fixed-size output, known as the hash value.' },
    { term: 'One-Way Function', definition: 'A function that is easy to compute in one direction (input to output) but computationally infeasible to compute in the reverse direction (output to input).' },
    { term: 'Collision Resistance', definition: 'A property of a cryptographic hash function that makes it extremely difficult to find two different inputs that produce the same hash output.' },
    { term: 'Checksum', definition: 'A value used to verify the integrity of a file or data transfer, ensuring it has not been accidentally corrupted.' },
    { term: 'Salting', definition: 'The process of adding a unique, random string to a password before hashing it to protect against rainbow table attacks.' },
    { term: 'SHA (Secure Hash Algorithm)', definition: 'A family of cryptographic hash functions published by the National Institute of Standards and Technology (NIST).' },
];

export default function HashGeneratorPage() {
  return (
    <>
      <StructuredData data={faqData.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer.replace(/<[^>]*>?/gm, '') } }))} />
      <StructuredData data={howToSchema} />
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
                    A cryptographic hash function is like a magical blender for data. You can put anything into it—a short password, a large file, an entire movie—and it produces a fixed-length, unique-looking string of text called a "hash" or "digest". This process has three critical properties:
                  </p>
                  <ul className="list-disc pl-5">
                     <li><strong>Deterministic:</strong> The same input will *always* produce the same output. Hashing "hello" will produce the same result every single time.</li>
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
                    <p className="text-sm text-muted-foreground">When you sign up for a website, the service should never store your password in plain text. Instead, they hash it (with a salt). When you log in, they hash the password you just entered and compare it to the stored hash. If they match, you're authenticated. This way, even if their database is breached, the attackers only get a list of hashes, not the actual passwords. Our <a href='/tools/password-strength-checker' className='text-primary hover:underline'>Password Strength Checker</a> can help you create strong passwords to begin with.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">File Integrity Verification</h3>
                    <p className="text-sm text-muted-foreground">A software developer releases a new program. Alongside the download link, they publish the SHA-256 hash of the installation file. Users can download the file, calculate its hash on their own computer, and compare it to the one on the website. If the hashes match, the user can be confident that the file was not corrupted during download or tampered with by a third party. This can be verified with our <a href='/tools/file-integrity-checker' className='text-primary hover:underline'>File Integrity Checker</a> tool.</p>
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
