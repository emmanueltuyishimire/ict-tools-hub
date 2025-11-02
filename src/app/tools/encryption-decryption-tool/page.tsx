
import React from 'react';
import { PageHeader } from '@/components/page-header';
import { EncryptionDecryptionTool } from './encryption-decryption-tool';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { BookOpen, AlertTriangle, Wand, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';

export const metadata = {
    title: 'Encryption & Decryption Tool | AES Cipher | ICT Toolbench',
    description: 'Encrypt and decrypt text using the AES cipher. This tool provides a simple, educational interface to understand the basics of symmetric-key encryption.',
    openGraph: {
        title: 'Encryption & Decryption Tool | ICT Toolbench',
        description: 'A free, client-side tool to encrypt and decrypt messages using AES. Learn about modern encryption standards and key management.',
        url: '/tools/encryption-decryption-tool',
    }
};

const EncryptionDecryptionToolPage = () => {
    const softwareAppSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Encryption / Decryption Tool",
        "operatingSystem": "All",
        "applicationCategory": "SecurityApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "description": "A client-side tool to demonstrate symmetric encryption and decryption using the AES algorithm.",
        "url": "https://www.icttoolbench.com/tools/encryption-decryption-tool"
      };

  return (
    <>
      <StructuredData data={faqData} />
      <StructuredData data={howToSchema} />
      <StructuredData data={softwareAppSchema} />
      <div className="max-w-4xl mx-auto space-y-12">
        <PageHeader
          title="Encryption / Decryption Tool"
          description="A simple tool to encrypt and decrypt text using the AES symmetric-key algorithm. This tool demonstrates the basic principles of modern encryption. All operations are performed securely in your browser."
        />
        
        <EncryptionDecryptionTool />

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use This Tool</h2>
          <Card className="prose prose-sm max-w-none text-foreground p-6">
              <p>This tool provides a hands-on way to understand symmetric encryption.</p>
              <ol>
                  <li><strong>Enter Plaintext or Ciphertext:</strong> Type the message you want to encrypt in the "Plaintext" box, or paste the Base64-encoded ciphertext you want to decrypt into the "Ciphertext" box.</li>
                  <li><strong>Provide a Secret Key:</strong> Enter a password or secret key. This key will be used for both encryption and decryption. <strong>Remember: the exact same key must be used for both operations.</strong></li>
                  <li><strong>Encrypt/Decrypt:</strong> Click the "Encrypt" button to turn your plaintext into ciphertext, or the "Decrypt" button to reverse the process.</li>
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
              <CardDescription>From secret keys to encryption standards, understand the fundamental principles that protect our digital information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
              <section>
                  <h3>What is Encryption?</h3>
                  <p>
                    Encryption is the process of converting readable data (plaintext) into an unreadable format (ciphertext) using an algorithm and a key. The goal is to ensure that even if the data is intercepted, it cannot be understood by anyone without the correct key to decrypt it. It is the absolute cornerstone of modern digital security, protecting everything from your banking transactions to your private messages.
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
                  <h3>AES: The Global Standard</h3>
                  <p>
                    <strong>AES (Advanced Encryption Standard)</strong> is the symmetric encryption algorithm adopted by the U.S. government and is now used worldwide. It is a block cipher, meaning it encrypts data in fixed-size blocks (128 bits). It is considered extremely secure when implemented correctly with a strong, randomly generated key. This tool demonstrates a simplified version of AES to show the basic principle. Real-world implementations involve more complex modes of operation (like GCM or CBC) and initialization vectors (IVs) to ensure even greater security.
                  </p>
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
