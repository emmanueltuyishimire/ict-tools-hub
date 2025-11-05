
import React from 'react';
import { PageHeader } from '@/components/page-header';
import { FileConversionEstimator } from './file-conversion-estimator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BookOpen, AlertTriangle, Wand, ChevronRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const metadata = {
    title: 'File Conversion Size Estimator | ICT Toolbench',
    description: 'Estimate the final file size when converting between formats like PNG to JPG, DOCX to PDF, or WAV to MP3. Understand the impact of lossy vs. lossless compression.',
    openGraph: {
        title: 'File Conversion Size Estimator | ICT Toolbench',
        description: 'Plan your storage and bandwidth by estimating file size changes after conversion. A practical tool for developers, designers, and content creators.',
        url: '/tools/file-conversion-estimator',
    }
};

const FileConversionEstimatorPage = () => {
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
      "name": "File Conversion Estimator",
      "operatingSystem": "All",
      "applicationCategory": "DeveloperApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "A free online tool to estimate file size changes when converting between common formats like PNG, JPG, DOCX, PDF, WAV, and MP3.",
      "url": "https://www.icttoolbench.com/tools/file-conversion-estimator"
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
            <div className="max-w-4xl mx-auto space-y-12">
                <PageHeader
                    title="File Conversion Estimator"
                    description="Estimate the potential change in file size when converting from one format to another. This tool helps you understand the trade-offs between quality, size, and compatibility for common image, document, and audio formats."
                />
                
                <FileConversionEstimator />

                <section>
                    <h2 className="text-2xl font-bold mb-4">How to Use the Estimator</h2>
                    <Card className="prose prose-sm max-w-none text-foreground p-6">
                        <p>This tool provides a high-level estimate of file size changes to help you plan storage and bandwidth needs. Note that actual results can vary based on content and compression settings.</p>
                        <ol>
                            <li><strong>Enter Original File Size:</strong> Input the size of your source file and select its unit (KB, MB, GB).</li>
                            <li><strong>Select Conversion Type:</strong> Choose the category of conversion you're interested in (e.g., Image, Document, Audio).</li>
                            <li><strong>Choose Formats:</strong> Based on your selection, choose the 'From' and 'To' formats from the dropdown menus (e.g., converting from PNG to JPG).</li>
                            <li><strong>Estimate Size Change:</strong> Click the "Estimate New Size" button.</li>
                            <li><strong>Analyze the Results:</strong> The tool will display the estimated new file size and the percentage of size reduction or increase, along with a brief explanation of why the change occurred (e.g., due to lossy compression).</li>
                        </ol>
                    </Card>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4">Worked Examples</h2>
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Example 1: Compressing a Screenshot for Web Use</CardTitle>
                                <CardDescription>A web developer has a 2 MB screenshot saved as a PNG and needs to make it smaller for faster page loads.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                               <p className="text-sm text-muted-foreground"><strong>Scenario:</strong> You want to convert a large 2 MB PNG file to a web-optimized JPG.</p>
                               <div className="prose prose-sm max-w-none">
                                   <ol>
                                       <li><strong>Inputs:</strong> Original Size: `2` MB, Conversion: Image, From: `PNG`, To: `JPG`.</li>
                                       <li><strong>Calculation:</strong> The tool applies a typical lossy compression ratio for JPGs (e.g., an 80-90% size reduction).</li>
                                       <li><strong>Result:</strong> The estimated new size is around <strong>200-400 KB</strong>. This demonstrates the massive bandwidth savings possible by switching from a lossless format (PNG) to a lossy one (JPG) for photographic content. This faster download time can be quantified with our <Link href="/tools/data-transfer-calculator" className="text-primary hover:underline">Data Transfer Time Calculator</Link>.</li>
                                   </ol>
                               </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Example 2: Preparing a Document for Email</CardTitle>
                                <CardDescription>An office worker needs to email a 10 MB DOCX file but wants to ensure the recipient can open it easily and that the file size is reasonable.</CardDescription>
                            </CardHeader>
                             <CardContent className="space-y-4">
                               <p className="text-sm text-muted-foreground"><strong>Scenario:</strong> Convert a 10 MB DOCX file to a universally compatible PDF.</p>
                               <div className="prose prose-sm max-w-none">
                                   <ol>
                                       <li><strong>Inputs:</strong> Original Size: `10` MB, Conversion: Document, From: `DOCX`, To: `PDF`.</li>
                                       <li><strong>Calculation:</strong> The tool estimates the change. PDF conversion often results in a smaller file if the original document has complex formatting or embedded fonts, but can be larger if it contains many high-resolution images that are not compressed effectively. The tool might estimate a 10-30% reduction.</li>
                                       <li><strong>Result:</strong> The estimated size is around <strong>7-9 MB</strong>. This conversion not only makes the file smaller but also ensures consistent formatting and readability for anyone with a PDF reader, regardless of whether they have Microsoft Word.</li>
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
                            <CardTitle className="text-primary">Educational Deep Dive: Lossy vs. Lossless Compression</CardTitle>
                        </div>
                        <CardDescription>From perfect copies to acceptable losses, understand the fundamental trade-off between file size and quality that governs all digital media.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                        <section>
                            <h3>The Core Problem: Data is Big</h3>
                            <p>
                                Raw, uncompressed digital data is enormous. A single high-resolution photograph can be tens of megabytes, and a minute of uncompressed audio can be even larger. Storing and transmitting this raw data is impractical and expensive. To solve this, we use <strong>compression</strong>, the science of encoding information using fewer bits than the original representation. You can estimate the impact of web compression on file sizes with our <Link href="/tools/compression-estimator" className="text-primary hover:underline">Compression Savings Estimator</Link>.
                            </p>
                            <p>
                                File formats are standards that define how data is compressed and stored. When you convert a file, you are often changing the compression algorithm being used. The two primary categories of compression are Lossless and Lossy.
                            </p>
                        </section>
                        <section>
                            <h3>Lossless Compression: Perfect Fidelity</h3>
                            <p>
                                <strong>Lossless compression</strong> reduces file size without losing a single bit of the original data. When the file is uncompressed, it is a perfect, bit-for-bit reconstruction of the original. It works by finding and eliminating statistical redundancy. For example, in an image with a large block of solid blue sky, a lossless algorithm can store "1000 pixels of blue" instead of storing the color blue 1000 times.
                            </p>
                            <p>
                                Lossless formats are essential when data integrity is paramount.
                            </p>
                            <ul className="list-disc pl-5">
                                <li><strong>Text & Documents:</strong> Every letter must be preserved.</li>
                                <li><strong>Software & Code:</strong> A single changed bit would corrupt the entire program.</li>
                                <li><strong>Medical Imaging & Scientific Data:</strong> Accuracy is non-negotiable.</li>
                                <li><strong>Image Formats:</strong> `PNG`, `GIF`, `TIFF` are common lossless image formats. PNG is excellent for graphics with sharp lines and transparency, like logos and screenshots.</li>
                                <li><strong>Audio Formats:</strong> `WAV`, `FLAC`, `ALAC` are lossless audio formats prized by audiophiles.</li>
                            </ul>
                            <p>The trade-off is that lossless compression ratios are generally lower than lossy methods. It makes files smaller, but not as small as they could be.</p>
                        </section>
                         <section>
                            <h3>Lossy Compression: The Art of Imperfection</h3>
                            <p>
                                <strong>Lossy compression</strong> achieves much greater file size reduction by permanently discarding some of the data. The key is that it's designed to discard data that the human eye or ear is least likely to notice. This is a form of "perceptual coding."
                            </p>
                            <p>
                                When you save a `JPG` image, the algorithm analyzes blocks of pixels and discards subtle color information that is hard for the human eye to perceive. When you create an `MP3` file, the algorithm removes sound frequencies that are likely to be masked by louder sounds. The amount of data discarded is determined by the "quality" setting—a lower quality setting means a smaller file size but more noticeable artifacts.
                            </p>
                            <ul className="list-disc pl-5">
                                <li><strong>Image Formats:</strong> `JPG` (or `JPEG`) is the king of lossy image compression, ideal for photographs and complex images. `WebP` is a modern format that can provide even better lossy compression than JPG.</li>
                                <li><strong>Audio Formats:</strong> `MP3` and `AAC` are the most common lossy audio formats, used for almost all digital music streaming.</li>
                                <li><strong>Video Formats:</strong> All modern video formats (`H.264`, `HEVC`, `AV1`) use extremely sophisticated lossy compression to make streaming high-definition video over the internet possible.</li>
                            </ul>
                            <p>
                                Lossy compression is a trade-off. You sacrifice perfect fidelity for a dramatically smaller file size, which is essential for web performance and streaming. The art is in finding the right quality setting that provides the best balance of size and visible quality.
                            </p>
                        </section>
                    </CardContent>
                </Card>

                <section>
                    <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Web Design and Development</h3>
                            <p className="text-sm text-muted-foreground">A web developer receives a logo as a JPG file. They notice it has compression artifacts (blurriness). They ask the designer for the original source file, which is a lossless PNG. They use the PNG for the website to ensure the logo is crisp and clear. For all photographic images on the site, they convert them from PNG or other formats to compressed JPGs to ensure fast page load times.</p>
                        </div>
                         <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Audio Production and Distribution</h3>
                            <p className="text-sm text-muted-foreground">An audio engineer records and mixes a song in a studio, saving the master copy as a large, lossless WAV file to preserve every detail. For distribution to streaming services like Spotify, they convert this WAV file into a high-quality (e.g., 320kbps) MP3 file. The MP3 is small enough for efficient streaming but retains most of the audible quality for listeners.</p>
                        </div>
                         <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Document Management in an Office</h3>
                            <p className="text-sm text-muted-foreground">A legal assistant drafts a contract in Microsoft Word (DOCX). To send it to a client for review and signature, they convert the DOCX to a PDF. This ensures the formatting, fonts, and layout are preserved perfectly on any device the client uses. It also makes the document non-editable, protecting its integrity.</p>
                        </div>
                         <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Video Archiving</h3>
                            <p className="text-sm text-muted-foreground">A video archivist has raw, uncompressed video footage that takes up terabytes of space. To save on long-term storage costs, they convert the footage to a high-quality but compressed format like H.265 (HEVC). This drastically reduces the storage footprint while retaining enough quality for future use. The cost savings can be estimated with our <Link href="/tools/cloud-storage-cost-estimator" className="text-primary hover:underline">Cloud Storage Cost Estimator</Link>.</p>
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
                                <li><strong>Choose the Right Tool for the Job:</strong> Use PNG for logos, icons, and graphics with sharp lines or transparency. Use JPG for photographs.</li>
                                <li><strong>Don't Re-compress a Lossy File:</strong> Opening a JPG, making minor edits, and saving it as a JPG again will add another layer of compression, further degrading the quality. Always work from the highest-quality original source file if possible.</li>
                                <li><strong>Use Modern Formats:</strong> For web images, consider using modern formats like WebP or AVIF. They offer superior compression compared to JPG and PNG at similar quality levels.</li>
                                <li><strong>Batch Processing:</strong> For converting many files, use a dedicated tool or a command-line utility like ImageMagick (for images) or FFmpeg (for audio/video) to automate the process.</li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                             <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                        </CardHeader>
                        <CardContent>
                             <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                                <li><strong>Using JPG for Logos:</strong> Saving a logo with sharp text and lines as a JPG will often result in ugly, blurry compression artifacts around the edges. Use PNG or SVG for logos.</li>
                                <li><strong>Over-compressing:</strong> Setting the quality setting too low when saving a JPG or MP3. While the file size will be tiny, the quality loss will be very noticeable and unprofessional.</li>
                                <li><strong>Forgetting About Transparency:</strong> JPG does not support transparency. If you need a transparent background for an image, you must use a format like PNG, GIF, or WebP.</li>
                                <li><strong>Ignoring Metadata:</strong> Some conversion processes strip out important metadata from files (like camera information in photos or artist info in music files). Be aware of your tool's settings if this data is important to you.</li>
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
                                      <AccordionContent>{item.answer}</AccordionContent>
                                  </AccordionItem>
                              ))}
                          </Accordion>
                      </CardContent>
                  </Card>
              </section>

              <section>
                  <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <Link href="/tools/compression-estimator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Compression Savings Estimator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Estimate savings from web compression (Gzip/Brotli) on top of file format compression.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                      <Link href="/tools/data-transfer-calculator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Data Transfer Time Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">See how the file size changes from conversion impact download and upload times.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                       <Link href="/tools/backup-storage-calculator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Backup Storage Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Plan your backup storage needs, considering potential savings from file conversion.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                  </div>
              </section>
            </div>
        </>
    );
};

export default FileConversionEstimatorPage;
