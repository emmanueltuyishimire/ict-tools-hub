
import { PageHeader } from '@/components/page-header';
import { CompressionEstimator } from './compression-estimator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Lightbulb, AlertTriangle, BookOpen, ChevronRight, Wand } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
    title: 'Compression Savings Estimator | Gzip & Brotli | ICT Toolbench',
    description: 'Estimate the file size savings you can achieve by enabling Gzip or Brotli compression on your web server. A key tool for web performance optimization.',
    openGraph: {
        title: 'Compression Savings Estimator | Gzip & Brotli | ICT Toolbench',
        description: 'See how much bandwidth you can save by implementing Gzip or Brotli compression for your text-based assets like HTML, CSS, and JavaScript.',
        url: '/tools/compression-estimator',
    }
};

const faqData = [
    { question: "What is HTTP compression?", answer: "HTTP compression is a technology that reduces the size of files sent from a web server to a browser. The server compresses the file before sending it, and the browser decompresses it upon arrival. This results in faster download times, reduced bandwidth usage, and improved page load performance." },
    { question: "What are Gzip and Brotli?", answer: "Gzip and Brotli are the two most common compression algorithms used on the web. Gzip is older and widely supported. Brotli is a newer algorithm developed by Google that typically offers better compression ratios (smaller file sizes) than Gzip, especially for text-based files." },
    { question: "Which files should I compress?", answer: "You should compress any text-based assets, including HTML, CSS, JavaScript, JSON, and XML files. You should NOT compress files that are already compressed, such as images (JPEG, PNG, WebP), videos (MP4), and other binary files (PDF, ZIP). Attempting to re-compress these files can sometimes even increase their size." },
    { question: "How does a browser know to accept a compressed file?", answer: "The browser tells the server which compression algorithms it supports by sending an `Accept-Encoding` HTTP header in its request (e.g., `Accept-Encoding: gzip, deflate, br`). The server then checks this header, and if it also supports one of those algorithms, it will send back a compressed response with a `Content-Encoding` header (e.g., `Content-Encoding: gzip`) to inform the browser." },
    { question: "Is Brotli always better than Gzip?", answer: "For text-based files, Brotli almost always provides a better compression ratio, resulting in smaller files (often 15-25% smaller than Gzip). However, Brotli can be slightly slower to compress on the fly at higher quality settings. Most modern web servers and CDNs handle this trade-off effectively." },
    { question: "How do I enable compression on my server?", answer: "Enabling compression depends on your web server software. For Nginx, you would use the `gzip on;` and `brotli on;` directives in your `nginx.conf` file. For Apache, you would use the `mod_deflate` (for Gzip) and `mod_brotli` modules. Most modern hosting providers and CDNs enable this by default." },
    { question: "Does this tool actually compress my file?", answer: "No. This tool provides an *estimate* based on average compression ratios for text-based content. The actual savings you see will depend on the specific content of your files, as some text is more repetitive and compressible than others. The purpose is to demonstrate the potential benefit." },
    { question: "What is the difference between compression and minification?", answer: "They are two different but complementary performance optimizations. Minification removes unnecessary characters (whitespace, comments) from the code itself. Compression applies an algorithm to the minified file to find and replace repeating patterns. For best results, you should always minify your files *before* they are compressed by the server. Use our <a href='/tools/code-minifier' class='text-primary hover:underline'>Code Minifier</a> for this." },
];

const keyTerminologies = [
    { term: 'Gzip', definition: 'A widely supported, fast compression algorithm used to reduce the size of web assets during transfer.' },
    { term: 'Brotli', definition: 'A modern compression algorithm developed by Google that typically offers superior compression ratios compared to Gzip.' },
    { term: 'Accept-Encoding', definition: 'An HTTP request header sent by the browser to tell the server which compression formats it understands (e.g., `gzip`, `br`).' },
    { term: 'Content-Encoding', definition: 'An HTTP response header sent by the server to tell the browser which compression algorithm was used on the file (e.g., `gzip`).' },
    { term: 'Minification', definition: 'The process of removing unnecessary characters from code before compression to further reduce file size.' },
];

export default function CompressionEstimatorPage() {
  const faqSchemaData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer.replace(/<[^>]*>?/gm, '') } }))
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }}
      />
      <PageHeader
        title="Compression Savings Estimator"
        description="Estimate how much smaller your text-based assets (HTML, CSS, JS) can be by enabling Gzip or Brotli compression on your server. A simple way to see the impact of a crucial web performance optimization."
      />
      
      <div className="max-w-4xl mx-auto space-y-12">
        <CompressionEstimator />

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use This Tool</h2>
          <Card className="prose prose-sm max-w-none text-foreground p-6">
              <p>
                This tool provides a quick estimate of the bandwidth savings you can achieve by enabling HTTP compression on your web server.
              </p>
              <ol>
                  <li>
                    <strong>Enter File Size:</strong> Input the original size of your text-based file (like a CSS or JavaScript bundle).
                  </li>
                  <li>
                    <strong>Choose the Unit:</strong> Select whether the size you entered is in Kilobytes (KB) or Megabytes (MB).
                  </li>
                  <li>
                    <strong>Review the Estimates:</strong> The tool will instantly show you two cards. One displays the estimated size and savings for Gzip compression, and the other for Brotli, a more modern and often more effective algorithm. The results are based on typical compression ratios for web assets.
                  </li>
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
                  <CardTitle className="text-primary">Educational Deep Dive: Compressing the Web</CardTitle>
              </div>
              <CardDescription>From finding repeating patterns to serving smaller files, understand how HTTP compression makes the web faster for everyone.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
              <section>
                  <h3 className="font-bold text-xl">The Principle of Compression</h3>
                  <p>
                    Text-based files like HTML, CSS, and JavaScript are inherently repetitive. The same words, code patterns, and sequences of characters appear over and over. Compression algorithms work by finding these repeating patterns and replacing them with shorter references.
                  </p>
                  <p>
                    Imagine the phrase "the quick brown fox jumps over the lazy dog." A compression algorithm might notice "the " appears twice and replace it with a short pointer. When you apply this logic to a 500KB CSS file with thousands of repeating class names and properties, the savings become enormous. The server does this work, sends the much smaller compressed file to the browser, and the browser then quickly reconstructs the original file. This entire process is far faster than sending the large, uncompressed file over the network.
                  </p>
              </section>
              <section>
                  <h3 className="font-bold text-xl">Gzip vs. Brotli: Which Should You Use?</h3>
                  <p>For years, <strong>Gzip</strong> was the de facto standard for web compression. It's fast, effective, and supported by virtually all servers and browsers. It's a fantastic baseline for performance.</p>
                  <p>
                    More recently, <strong>Brotli</strong>, a newer algorithm from Google, has gained widespread adoption. Brotli uses a more advanced compression technique and a pre-defined dictionary of common web keywords and phrases, which allows it to achieve significantly better compression ratios than Gzip—often producing files that are 15-25% smaller.
                  </p>
                  <p>
                    <strong>The recommendation is simple: use Brotli if you can, with Gzip as a fallback.</strong> Most modern web servers and CDNs can be configured to check if a browser supports Brotli (via the `Accept-Encoding: br` header) and serve the Brotli-compressed file if it does. If not, it will fall back to serving the Gzip version. This ensures you provide the best possible performance for modern browsers while maintaining compatibility with older ones.
                  </p>
              </section>
          </CardContent>
      </Card>

      <section>
          <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
          <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Web Performance Optimization</h3>
                  <p className="text-sm text-muted-foreground">A developer runs a performance audit on their website and finds their main JavaScript bundle is 800 KB. By using this tool, they see that enabling Brotli compression could reduce it to around 160 KB. This 80% reduction in file size would dramatically speed up the site's load time, especially for mobile users.</p>
              </div>
              <div className="bg-card p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Reducing Cloud Egress Costs</h3>
                  <p className="text-sm text-muted-foreground">A company hosts a web app that serves large JSON API responses, leading to high data transfer (egress) costs. An engineer uses the estimator to show that by enabling Gzip compression on their API server, they could reduce their monthly bandwidth usage from 2 TB to approximately 500 GB, resulting in significant cost savings on their cloud bill.</p>
              </div>
          </div>
      </section>
      
      <div className="grid md:grid-cols-2 gap-8">
          <Card>
              <CardHeader>
                  <div className='flex items-center gap-2'><Wand className="h-6 w-6 text-accent" /> <CardTitle>Pro Tips & Quick Hacks</CardTitle></div>
              </CardHeader>
              <CardContent>
                  <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                      <li><strong>Check Your Server's Compression:</strong> Use your browser's developer tools (Network tab), load your website, and inspect the response headers for a key asset like your main CSS file. Look for the `Content-Encoding: gzip` or `Content-Encoding: br` header. If it's missing, compression is not enabled.</li>
                      <li><strong>Minify First, Compress Second:</strong> Always run your text assets through a minifier before compression. Minification removes unnecessary code, giving the compression algorithm a cleaner, denser file to work with, resulting in even smaller final sizes.</li>
                      <li><strong>Dynamic vs. Static Compression:</strong> Servers can compress files "on the fly" for each request (dynamic compression) or pre-compress them and save them to disk (static compression). Static compression is more efficient as the work is only done once, making it ideal for assets that don't change often.</li>
                  </ul>
              </CardContent>
          </Card>
          <Card>
              <CardHeader>
                   <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
              </CardHeader>
              <CardContent>
                   <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                      <li><strong>Compressing Images:</strong> Don't try to Gzip or Brotli images (JPG, PNG, WebP). They are already highly compressed. Doing so can actually make the file size larger due to the compression overhead.</li>
                      <li><strong>Low Compression Level:</strong> Both Gzip and Brotli have compression levels (usually 1-9 for Gzip, 1-11 for Brotli). Using a very low level might be fast but will result in poor savings. For pre-compressing static assets, use the highest level. For on-the-fly compression, a mid-range level (like 4-6) is a good balance of speed and effectiveness.</li>
                      <li><strong>Ignoring Caching:</strong> Compression reduces size for the first download. Proper caching headers prevent the browser from needing to re-download the file at all on subsequent visits. The two work together for optimal performance.</li>
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
              <Link href="/tools/code-minifier" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Code Minifier<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Minify your code before compressing it for maximum file size reduction.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
              <Link href="/tools/data-transfer-calculator" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Data Transfer Time Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">See how the file size savings from compression translate into faster download times.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
              <Link href="/tools/http-header-checker" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">HTTP Header Checker<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Verify that your server is correctly sending the `Content-Encoding` header.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
          </div>
      </section>
      </div>
    </>
  );
}

    