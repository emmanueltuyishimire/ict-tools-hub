
import React from 'react';
import { PageHeader } from '@/components/page-header';
import { FileIntegrityChecker } from './file-integrity-checker';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { BookOpen, AlertTriangle, Wand, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';

export const metadata = {
    title: 'File Integrity Checker (SHA Checksum) | ICT Toolbench',
    description: 'Verify file integrity by generating SHA-1, SHA-256, and SHA-512 hashes. Our secure, client-side tool helps you confirm that your files are not corrupted or tampered with.',
    openGraph: {
        title: 'File Integrity Checker (SHA Checksum) | ICT Toolbench',
        description: 'Generate cryptographic checksums for any file directly in your browser to verify integrity. Secure, private, and fast.',
        url: '/tools/file-integrity-checker',
    }
};

const FileIntegrityCheckerPage = () => {
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
    "name": "File Integrity Checker",
    "operatingSystem": "All",
    "applicationCategory": "SecurityApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "A free, client-side tool to generate SHA-1, SHA-256, and SHA-512 checksums for any file to verify its integrity.",
    "url": "https://www.icttoolbench.com/tools/file-integrity-checker"
  };

  return (
    <>
      <StructuredData data={faqSchema} />
      <StructuredData data={howToSchema} />
      <StructuredData data={softwareAppSchema} />
      <div className="max-w-4xl mx-auto space-y-12">
        <PageHeader
          title="File Integrity Checker"
          description="Verify that your files are original and uncorrupted by generating their cryptographic hashes. This tool helps you ensure file integrity by calculating SHA-1, SHA-256, and SHA-512 checksums directly in your browser."
        />
        
        <FileIntegrityChecker />

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use This Tool</h2>
          <Card className="prose prose-sm max-w-none text-foreground p-6">
              <p>This tool creates a "digital fingerprint" for your files, allowing you to verify that they haven't been altered or corrupted.</p>
              <ol>
                  <li><strong>Select a File:</strong> Drag and drop a file into the designated area, or click on it to open a file selection dialog. The file will not be uploaded; all processing happens on your local machine.</li>
                  <li><strong>Wait for Calculation:</strong> The tool will read the file and calculate its hashes. For very large files, this may take a few moments. A loading indicator will appear.</li>
                  <li><strong>Compare the Hashes:</strong> Compare the generated hash (usually SHA-256) with the one provided by the source of the file (e.g., the download page for a piece of software).</li>
                  <li><strong>Verify Integrity:</strong> If the hashes match exactly, you can be confident that your file is identical to the original. If they do not match, the file may have been corrupted during download or tampered with.</li>
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
                  <CardTitle className="text-primary">Educational Deep Dive: The Importance of File Integrity</CardTitle>
              </div>
              <CardDescription>From software downloads to legal documents, understand why ensuring a file is unchanged is a cornerstone of digital trust and security.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
              <section>
                  <h3>What is a Checksum?</h3>
                  <p>
                    A checksum is a small, fixed-size piece of data computed from a larger block of digital data. Its purpose is to detect errors or changes that may have been introduced during transmission or storage. A cryptographic hash function (like SHA-256) is an advanced type of checksum algorithm. It creates a unique "digital fingerprint" for a file.
                  </p>
                  <p>The key property of a cryptographic hash is that if even a single bit in the original file is changed, the resulting hash will be completely different and unrecognizable. This makes it an incredibly powerful tool for verifying file integrity.</p>
              </section>
              <section>
                  <h3>How to Verify a Download</h3>
                  <p>
                    Reputable software providers often publish the checksums for their files on their download pages. The verification process is simple:
                  </p>
                  <ol className="list-decimal pl-5">
                     <li>Download the software installer.</li>
                     <li>Find the official SHA-256 hash provided on the download page.</li>
                     <li>Use this tool (or a command-line utility) to calculate the SHA-256 hash of the file you just downloaded.</li>
                     <li>Compare the two hashes. <strong>They must match exactly.</strong></li>
                  </ol>
                  <p>
                    If the hashes match, you can be confident that the file you have is the exact same one the provider intended for you to have. If they don't match, you should delete the file immediately and download it again, preferably from a different source, as it may be corrupted or, in a worst-case scenario, infected with malware.
                  </p>
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
                        <li><strong>Trust SHA-256:</strong> When given a choice of hashes, always use the most secure one available, which is typically SHA-256 or SHA-512. SHA-1 is considered insecure for collision resistance and should only be used if it's the only option provided.</li>
                        <li><strong>Command-Line Alternatives:</strong> On macOS, you can use `shasum -a 256 /path/to/file`. On Windows, you can use PowerShell with `Get-FileHash /path/to/file -Algorithm SHA256`. On Linux, use `sha256sum /path/to/file`.</li>
                        <li><strong>Automate Verification:</strong> For critical workflows, verification can be scripted. Download a file and its corresponding checksum file, then have a script automatically compute the hash and perform the comparison.</li>
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                     <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                </CardHeader>
                <CardContent>
                     <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                        <li><strong>Ignoring Mismatches:</strong> The most dangerous mistake is to see a hash mismatch and assume it's "probably fine." A mismatch is a definitive sign that the file is not the original. Do not run or open it.</li>
                        <li><strong>Getting the Checksum from an Untrusted Source:</strong> The checksum is only useful if you get it from the official, legitimate source (e.g., the developer's HTTPS-secured website). Don't trust a checksum provided in a forum post or a third-party download site.</li>
                        <li><strong>Comparing Different Hash Types:</strong> An MD5 hash will never match a SHA-256 hash. Ensure you are calculating and comparing the same type of hash.</li>
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
                          <CardTitle className="text-base flex items-center justify-between">Hash Generator (Text)<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Generate the same hashes for text input instead of files.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
              <Link href="/tools/data-transfer-calculator" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Data Transfer Time Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Estimate how long it will take to download the files you need to check.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
                <Link href="/tools/encryption-decryption-tool" className="block">
                    <Card className="hover:border-primary transition-colors h-full">
                        <CardHeader>
                            <CardTitle className="text-base flex items-center justify-between">Encryption/Decryption Tool<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                            <CardDescription className="text-xs">Learn about encryption, a different cryptographic use case from hashing.</CardDescription>
                        </CardHeader>
                    </Card>
                </Link>
          </div>
      </section>
      </div>
    </>
  );
};

export default FileIntegrityCheckerPage;
