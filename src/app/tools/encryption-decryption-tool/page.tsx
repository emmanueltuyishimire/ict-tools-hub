
import React from 'react';
import { PageHeader } from '@/components/page-header';
import { EncryptionDecryptionTool } from './encryption-decryption-tool';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { BookOpen, AlertTriangle, Wand, ChevronRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';

export const metadata = {
    title: 'AES Encryption & Decryption Tool | Encrypt & Decrypt Text | ICT Toolbench',
    description: 'Securely encrypt and decrypt text using the AES-GCM standard. Our client-side tool uses the Web Crypto API to ensure your data remains private. Learn about modern symmetric encryption.',
    openGraph: {
        title: 'AES Encryption & Decryption Tool | ICT Toolbench',
        description: 'A free, client-side tool to encrypt and decrypt messages using AES. Learn about modern encryption standards and key management.',
        url: '/tools/encryption-decryption-tool',
    }
};

const EncryptionDecryptionToolPage = () => {
    const softwareAppSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "AES Encryption / Decryption Tool",
        "operatingSystem": "All",
        "applicationCategory": "SecurityApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "description": "A client-side tool to demonstrate symmetric encryption and decryption using the modern AES-GCM algorithm.",
        "url": "https://www.icttoolbench.com/tools/encryption-decryption-tool"
      };

  return (
    <>
      <StructuredData data={faqData} />
      <StructuredData data={howToSchema} />
      <StructuredData data={softwareAppSchema} />
      <div className="max-w-4xl mx-auto space-y-12">
        <PageHeader
          title="AES Encryption & Decryption Tool"
          description="A simple tool to encrypt and decrypt text using the AES-GCM symmetric-key algorithm. All operations are performed securely in your browser; your data never leaves your machine."
        />
        
        <EncryptionDecryptionTool />

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use This Tool</h2>
          <Card className="prose prose-sm max-w-none text-foreground p-6">
              <p>This tool provides a hands-on way to understand modern symmetric encryption using the Advanced Encryption Standard (AES).</p>
              <ol>
                  <li><strong>Enter Plaintext or Ciphertext:</strong> Type the message you want to encrypt in the <strong>Plaintext</strong> box, or paste the Base64-encoded ciphertext you want to decrypt into the <strong>Ciphertext</strong> box.</li>
                  <li><strong>Provide a Secret Key:</strong> Enter a password or secret key. This key will be used to generate the encryption key. <strong>Remember: the exact same secret key must be used for both encryption and decryption.</strong></li>
                  <li><strong>Encrypt/Decrypt:</strong> Click the <strong>Encrypt</strong> button to turn your plaintext into ciphertext, or the <strong>Decrypt</strong> button to reverse the process.</li>
                  <li><strong>Copy the Result:</strong> Use the copy button next to the output to copy the resulting text to your clipboard.</li>
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
                  <CardTitle className="text-primary">Educational Deep Dive: Modern Symmetric Encryption</CardTitle>
              </div>
              <CardDescription>From secret keys to authenticated encryption, understand the fundamental principles that protect our digital information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
              <section>
                  <h3>What is Encryption?</h3>
                  <p>
                    Encryption is the process of converting readable data (<strong>plaintext</strong>) into an unreadable format (<strong>ciphertext</strong>) using an algorithm and a key. The goal is to ensure that even if the data is intercepted, it cannot be understood by anyone without the correct key to decrypt it. It is the absolute cornerstone of modern digital security, protecting everything from your banking transactions to your private messages.
                  </p>
              </section>
              <section>
                  <h3>Symmetric vs. Asymmetric Encryption</h3>
                  <p>There are two main types of encryption:</p>
                    <ul className="list-disc pl-5">
                       <li><strong>Symmetric Encryption:</strong> This is the method this tool uses. It involves a single, shared secret key. The same key is used to both encrypt and decrypt the data. It is very fast and efficient, making it ideal for encrypting large amounts of data. AES (Advanced Encryption Standard) is the most common symmetric algorithm. The main challenge is securely sharing the secret key between parties.</li>
                       <li><strong>Asymmetric Encryption:</strong> Also known as public-key cryptography, this method uses a pair of keys: a public key and a private key. Data encrypted with the public key can only be decrypted with the corresponding private key. This solves the key-sharing problem of symmetric encryption and is what underpins SSL/TLS and digital signatures. It is, however, much slower than symmetric encryption.</li>
                    </ul>
                    <p>In practice, most systems use a hybrid approach. Asymmetric encryption is used to securely exchange a temporary, one-time symmetric key. Then, that fast symmetric key is used to encrypt the bulk of the communication.</p>
              </section>
              <section>
                  <h3>AES-GCM: The Gold Standard</h3>
                  <p>
                    <strong>AES (Advanced Encryption Standard)</strong> is the symmetric encryption algorithm adopted by the U.S. government and is now used worldwide. This tool uses a specific mode of AES called <strong>GCM (Galois/Counter Mode)</strong>.
                  </p>
                  <p>
                    AES-GCM is an "authenticated encryption" mode. This means it provides two crucial security guarantees:
                  </p>
                  <ol>
                    <li><strong>Confidentiality:</strong> It encrypts the data so it cannot be read by unauthorized parties.</li>
                    <li><strong>Authenticity & Integrity:</strong> It produces an "authentication tag" as part of the encryption process. During decryption, this tag is verified. If a single bit of the ciphertext was tampered with in transit, the tag will not match, and the decryption will fail. This prevents an attacker from modifying the encrypted message without being detected.</li>
                  </ol>
                  <p>
                    This tool uses the Web Crypto API, a modern browser standard, to perform secure AES-GCM encryption and decryption. To make the password more secure, it also uses a standard called PBKDF2 to derive the encryption key from your password, adding a random 'salt' to protect against pre-computation attacks.
                  </p>
              </section>
          </CardContent>
        </Card>

        <section>
            <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Secure Note-Taking</h3>
                    <p className="text-sm text-muted-foreground">A user wants to store sensitive information (like private keys or personal notes) in a cloud-based note-taking app. To ensure the cloud provider cannot read their notes, they encrypt the text with a strong, private password using a tool like this before pasting it into the app. They can decrypt it later using the same tool and password.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Sharing Secrets via Email</h3>
                    <p className="text-sm text-muted-foreground">Two colleagues need to share a sensitive credential. They agree on a secret password over a secure channel (like an end-to-end encrypted chat app). One colleague encrypts the credential using this tool and sends the resulting ciphertext via email. The other can then decrypt it using the pre-shared password, ensuring the credential was not exposed in transit.</p>
                </div>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold mb-4">Practical Tips</h2>
             <Card>
                <CardContent className="p-6">
                    <ul className="space-y-4">
                        <li className="flex items-start gap-4">
                            <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                            <div>
                                <h4 className="font-semibold">Use a Strong, Unique Secret Key</h4>
                                <p className="text-sm text-muted-foreground">
                                    The security of the entire encryption rests on the secrecy and strength of your key. Use a long, random password generated by our <strong><Link href="/tools/password-generator" className="text-primary hover:underline">Password Generator</Link></strong> for the best security.
                                </p>
                            </div>
                        </li>
                        <li className="flex items-start gap-4">
                            <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                            <div>
                                <h4 className="font-semibold">Share the Key Securely</h4>
                                <p className="text-sm text-muted-foreground">
                                    Never send the secret key in the same message as the ciphertext. Use a separate, secure channel (like a phone call, encrypted chat, or in-person meeting) to share the key.
                                </p>
                            </div>
                        </li>
                         <li className="flex items-start gap-4">
                            <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                            <div>
                                <h4 className="font-semibold">Do Not Use This for Long-Term Storage</h4>
                                <p className="text-sm text-muted-foreground">
                                    This is an excellent tool for secure transit and education. For long-term storage of critical data, use dedicated, audited encryption software like VeraCrypt or the features built into modern operating systems (like BitLocker or FileVault).
                                </p>
                            </div>
                        </li>
                    </ul>
                </CardContent>
             </Card>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <div className='flex items-center gap-2'><Wand className="h-6 w-6 text-accent" /> <CardTitle>Pro Tips</CardTitle></div>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                        <li><strong>The Ciphertext Contains Everything:</strong> The Base64 ciphertext produced by this tool includes the salt and IV needed for decryption. You only need to transmit the ciphertext and the password separately.</li>
                        <li><strong>Check for Errors:</strong> A "decryption failed" error almost always means one of two things: an incorrect password or the ciphertext was altered or corrupted. The AES-GCM mode's built-in integrity check prevents you from decrypting a tampered message.</li>
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                     <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                </CardHeader>
                <CardContent>
                     <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                        <li><strong>Losing the Key:</strong> If you forget the exact secret key used for encryption, the data is irretrievably lost. There is no recovery mechanism.</li>
                        <li><strong>Using a Weak Key:</strong> Encrypting with a strong algorithm but a weak, guessable password (like "password123") defeats the purpose. The security is only as strong as your key. Use our <strong><Link href="/tools/password-strength-checker" className="text-primary hover:underline">Password Strength Checker</Link></strong> to verify your key's strength.</li>
                        <li><strong>Confusing Encryption with Hashing:</strong> Encryption is a two-way process. Hashing is a one-way process used for verifying data integrity, not for protecting secret data that you need to get back. See our <strong><Link href="/tools/hash-generator-md5-sha" className="text-primary hover:underline">Hash Generator</Link></strong> for comparison.</li>
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

      <section>
          <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link href="/tools/hash-generator-md5-sha" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Hash Generator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Compare encryption (two-way) with hashing (one-way).</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
              <Link href="/tools/password-generator" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Password Generator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Generate a strong, random key to use for your encryption.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
              <Link href="/tools/base64-encoder-decoder" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Base64 Encoder/Decoder<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Understand how binary ciphertext is encoded into a text-safe format.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
          </div>
      </section>
      </div>
    </>
  );
};

export default EncryptionDecryptionToolPage;
