
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
    title: 'File Integrity Checker | MD5 & SHA Checksum Tool | ICT Toolbench',
    description: 'Verify file integrity by generating MD5, SHA-1, SHA-256, and SHA-512 checksums. Our secure, client-side tool helps you confirm that your files are not corrupted or tampered with.',
    openGraph: {
        title: 'File Integrity Checker | MD5 & SHA Checksum Tool | ICT Toolbench',
        description: 'Generate and verify file checksums to ensure data integrity. A free, private, browser-based tool for MD5, SHA-1, SHA-256, and SHA-512 hashes.',
        url: '/tools/file-integrity-checker',
    }
};

const FileIntegrityCheckerPage = () => {
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
        "description": "A free, client-side tool to generate MD5, SHA-1, SHA-256, and SHA-512 checksums for files to verify their integrity.",
        "url": "https://www.icttoolbench.com/tools/file-integrity-checker"
    };

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

  return (
    <>
      <StructuredData data={faqSchema} />
      <StructuredData data={howToSchema} />
      <StructuredData data={softwareAppSchema} />
      <div className="max-w-4xl mx-auto space-y-12">
        <PageHeader
          title="File Integrity Checker"
          description="Generate MD5, SHA-1, SHA-256, and SHA-512 checksums for any file. This tool helps you verify that your files are original and have not been corrupted or tampered with."
        />
        
        <FileIntegrityChecker />

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use This Tool</h2>
          <Card className="prose prose-sm max-w-none text-foreground p-6">
              <p>This tool allows you to generate cryptographic hashes, also known as checksums, for any file on your computer. The entire process is done securely in your browser.</p>
              <ol>
                  <li><strong>Select a File:</strong> Click the "Choose File" button and select the file you want to analyze from your device. Your file is not uploaded; it's read directly by your browser.</li>
                  <li><strong>Generate Checksums:</strong> Click the "Generate Checksums" button. The tool will process the file locally and calculate the hashes. For large files, this may take a few moments.</li>
                  <li><strong>Compare the Hashes:</strong> The tool will display the calculated MD5, SHA-1, SHA-256, and SHA-512 hashes. You can then compare these values against the checksum provided by the original source of the file.</li>
                  <li><strong>Copy for Verification:</strong> Use the copy icon next to any hash to copy it to your clipboard for easy comparison.</li>
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
                  <CardTitle className="text-primary">Educational Deep Dive: Ensuring Data Integrity</CardTitle>
              </div>
              <CardDescription>From software downloads to legal documents, understand how checksums act as a digital fingerprint to guarantee your files are authentic and unchanged.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
              <section>
                  <h3>What is File Integrity and Why Does it Matter?</h3>
                  <p>
                    File integrity is the assurance that a file is complete, authentic, and has not been altered from its original state. When you download a file from the internet, how do you know it's the exact same file the author intended for you to have? It could have been corrupted during the download, or worse, maliciously modified by an attacker to include a virus or backdoor.
                  </p>
                  <p>
                    This is where checksums come in. A checksum is a small-sized block of data derived from another block of digital data for the purpose of detecting errors. A cryptographic hash function is a perfect tool for creating a robust checksum. By running a file through a hash function (like SHA-256), you get a unique, fixed-length string of characters—its digital fingerprint.
                  </p>
              </section>
              <section>
                  <h3>How to Verify a File with a Checksum</h3>
                  <p>The process is simple but powerful:</p>
                  <ol className="list-decimal pl-5">
                     <li><strong>The Source Provides a Hash:</strong> The person or organization providing the file (e.g., a Linux distribution) calculates the SHA-256 hash of their file and publishes this hash on their website next to the download link.</li>
                     <li><strong>You Download the File:</strong> You download the software to your computer.</li>
                     <li><strong>You Calculate the Hash:</strong> You use a tool like this one to calculate the SHA-256 hash of the file you just downloaded.</li>
                     <li><strong>You Compare:</strong> You compare the hash you just generated with the hash published on the official website.</li>
                  </ol>
                  <p>
                    If the two hashes match **exactly**, you can be highly confident that your file is identical to the original and has not been corrupted or tampered with. If they do not match, you must not use the file and should download it again from a trusted source. This is because of the "avalanche effect" of hash functions: changing even a single bit in the input file will result in a completely different hash. You can explore this effect with our <Link href="/tools/hash-generator-md5-sha" className="text-primary hover:underline">Hash Generator</Link>.
                  </p>
              </section>
              <section>
                  <h3>Which Hash Algorithm Should I Use?</h3>
                   <ul className="list-disc pl-5">
                       <li><strong>SHA-256:</strong> This is the current industry standard for security and integrity verification. If a SHA-256 hash is provided, you should use it.</li>
                       <li><strong>MD5 and SHA-1:</strong> These are older algorithms that are now considered cryptographically broken, meaning collisions can be found. However, they are still widely used for basic, non-security-critical checksums to detect accidental file corruption. If a provider only gives an MD5 hash, it's better than nothing, but it does not protect against a determined malicious attacker.</li>
                   </ul>
              </section>
          </CardContent>
        </Card>

        <section>
            <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Downloading Open-Source Software</h3>
                    <p className="text-sm text-muted-foreground">A developer downloads an installer for a Linux distribution like Ubuntu. On the official download page, a SHA-256 checksum is listed next to the file. After the download is complete, the developer uses this tool to generate the SHA-256 hash of their downloaded file. They confirm it matches the one on the website, ensuring the file is authentic and free from corruption or malware.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Verifying Forensic Evidence</h3>
                    <p className="text-sm text-muted-foreground">A digital forensics investigator creates an image of a hard drive from a crime scene. To maintain the chain of custody and prove the evidence has not been altered, they immediately calculate the SHA-256 hash of the disk image. This hash is recorded. Any time the evidence is handled, the hash can be recalculated to prove that the copy is a bit-for-bit identical duplicate of the original.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Validating Large Data Transfers</h3>
                    <p className="text-sm text-muted-foreground">A data scientist transfers a massive 500GB dataset from one server to another. A network glitch could easily corrupt a small part of the file. Before the transfer, they calculate the hash of the original file. After the transfer, they calculate the hash of the new file. If the hashes match, they can be confident the transfer was successful without having to compare the entire 500GB file byte by byte.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Software Updates and Patches</h3>
                    <p className="text-sm text-muted-foreground">A software update mechanism often downloads a patch file and a separate signature file containing a hash. Before applying the update, the application first calculates the hash of the downloaded patch file and compares it to the hash in the signature file. This ensures the update package is authentic and has not been hijacked to distribute malware.</p>
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
                        <li><strong>Trust the Source:</strong> A checksum is only useful if you trust the source where you got it. Only compare against checksums listed on the official, HTTPS-secured website of the software provider.</li>
                        <li><strong>Use Command-Line Tools:</strong> For frequent use or scripting, learn your operating system's built-in commands: `certUtil -hashfile <file> SHA256` on Windows, `shasum -a 256 <file>` on macOS/Linux, or `md5sum <file>` on Linux.</li>
                        <li><strong>It's Not Encryption:</strong> Hashing provides integrity, not confidentiality. It proves a file hasn't changed, but it doesn't hide the file's contents. For that, you need encryption.</li>
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                     <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                </CardHeader>
                <CardContent>
                     <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                        <li><strong>Relying on MD5 for Security:</strong> MD5 is cryptographically broken. While it can detect accidental corruption, it should not be trusted to protect against malicious tampering. Always prefer SHA-256 if it's available.</li>
                        <li><strong>Comparing Hashes from Different Algorithms:</strong> The MD5 hash of a file will be completely different from its SHA-256 hash. Ensure you are generating and comparing the same type of hash.</li>
                        <li><strong>Small Typos:</strong> A hash must match **exactly**. Even a single character difference means the files are not identical. Be careful when copying and pasting hashes for comparison.</li>
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
                          <CardDescription className="text-xs">Generate hashes from text input instead of files to see the avalanche effect in action.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
              <Link href="/tools/data-transfer-calculator" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Data Transfer Time Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Estimate how long it will take to download the file you need to check.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
          </div>
      </section>
      </div>
    </>
  