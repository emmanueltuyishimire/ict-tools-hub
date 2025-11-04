
import { PageHeader } from '@/components/page-header';
import { CodeMinifier } from './code-minifier';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Lightbulb, AlertTriangle, BookOpen, ChevronRight, Wand } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
    title: 'HTML, CSS, & JS Minifier | Free Online Code Optimizer | ICT Toolbench',
    description: 'Reduce the file size of your HTML, CSS, and JavaScript code with our free online minifier. Paste your code to get a smaller version for faster web page loading, improving performance and SEO.',
    openGraph: {
        title: 'HTML, CSS, & JS Minifier | Free Online Code Optimizer | ICT Toolbench',
        description: 'Optimize your website by reducing the file size of your code assets. Our tool helps you create a faster, more efficient user experience.',
        url: '/tools/code-minifier',
    }
};

const faqData = [
    { question: "What is minification?", answer: "Minification (also known as minimization) is the process of removing all unnecessary characters from source code without changing its functionality. This includes removing white space, comments, and new line characters, as well as shortening variable names (in the case of advanced JavaScript minification)." },
    { question: "Why is minifying code important?", answer: "Minifying code reduces the file size of your HTML, CSS, and JavaScript assets. Smaller files download faster, which leads to a significant improvement in your website's loading speed and overall performance. Faster load times improve user experience and are a positive ranking factor for SEO." },
    { question: "Is this tool safe to use? Does it store my code?", answer: "Yes, this tool is completely safe. All minification processes happen entirely within your browser (client-side). Your code is never sent to or stored on our servers, ensuring your data remains private and secure." },
    { question: "What's the difference between minification and compression (like Gzip)?", answer: "Minification modifies the code itself to make it smaller. Compression (like Gzip or Brotli) is a process where the web server applies an algorithm to the files before sending them to the browser, which then decompresses them. They are not mutually exclusive; for best results, you should both minify your code and have your server compress it." },
    { question: "Will this tool break my code?", answer: "Our minifier uses safe, regex-based methods to remove comments and whitespace, which is very unlikely to break your code. However, more advanced JavaScript minification (which we don't do here, to be safe) can sometimes break code if it relies on specific function or variable names. It's always best practice to test your minified code in a staging environment before deploying to production." },
    { question: "What is the difference between minification and uglification?", answer: "Minification primarily focuses on removing unnecessary characters like whitespace and comments. Uglification is a more advanced process, typically for JavaScript, that goes further by renaming variables, functions, and parameters to be as short as possible (e.g., `myAwesomeFunction` becomes `a`). This makes the code unreadable to humans but even smaller in size." },
    { question: "Should I minify my code during development?", answer: "No, you should only minify code for your production build. During development, you need your code to be readable for debugging purposes, complete with comments and proper formatting. Most modern build tools (like Webpack, Vite, or the Next.js compiler) automatically handle minification when you create a production build." },
    { question: "Does minifying HTML have a big impact?", answer: "The impact of minifying HTML is typically smaller than for CSS or JavaScript, as HTML files often contain more content than code. However, for large and complex pages, removing all the extra whitespace and comments can still result in a noticeable performance improvement." },
    { question: "Can I minify backend code like Python or PHP?", answer: "This tool is specifically for front-end code (HTML, CSS, JS). While minification concepts can apply to backend languages, it's less common and requires different tools, as server-side execution speed is usually less dependent on file transfer size." },
    { question: "How does minification affect page rendering?", answer: "By reducing the file size of CSS and JavaScript, the browser can download these render-blocking resources faster. This allows the browser to parse the styles and execute the scripts more quickly, leading to a faster First Contentful Paint (FCP) and a more responsive page." }
];

const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Minify HTML, CSS, or JavaScript Code',
    description: 'A step-by-step guide to reducing the file size of your web assets.',
    step: [
        { '@type': 'HowToStep', name: 'Select Code Type', text: 'Choose the correct tab for the code you want to minify: HTML, CSS, or JavaScript.' },
        { '@type': 'HowToStep', name: 'Paste Your Code', text: 'Paste your un-minified source code into the "Input Code" text area.' },
        { '@type': 'HowToStep', name: 'Minify the Code', text: 'Click the "Minify Code" button.' },
        { '@type': 'HowToStep', name: 'Review and Copy', text: 'The minified code will appear in the "Minified Output" box. The tool also shows you the file size savings. Use the copy button to copy the minified code to your clipboard.' },
        { '@type': 'HowToStep', name: 'Test Your Code', text: 'Always test the minified code on your website or application to ensure it functions identically to the original.' }
    ],
    totalTime: 'PT1M',
};

const keyTerminologies = [
    { term: 'Minification', definition: 'The process of removing unnecessary characters (like whitespace, comments, newlines) from source code to reduce its file size without changing its functionality.' },
    { term: 'Uglification', definition: 'A more aggressive form of code optimization, primarily for JavaScript, that renames variables and functions to make the code shorter and harder to read.' },
    { term: 'Compression', definition: 'A process (like Gzip or Brotli) performed by a server to shrink file sizes before sending them over the network. The browser then decompresses them. This is done in addition to minification.' },
    { term: 'Render-Blocking Resources', definition: 'Files, typically CSS and JavaScript, that the browser must download and process before it can render the visible part of a web page.' },
    { term: 'Build Process', definition: 'A series of automated tasks that transform development code (readable, commented) into production-ready code (minified, optimized, bundled).' },
];

export default function CodeMinifierPage() {
  const faqSchemaData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } }))
  };
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <PageHeader
        title="HTML, CSS, & JS Minifier"
        description="Optimize your website's performance by reducing the file size of your code. Paste your code into the appropriate tab to get a clean, minified version."
      />
      
      <CodeMinifier />

      <section>
          <h2 className="text-2xl font-bold mb-4">How to Use This Tool</h2>
          <Card className="prose prose-sm max-w-none text-foreground p-6">
              <p>This tool removes unnecessary characters from your code to make it more compact and faster to load. Follow these simple steps:</p>
              <ol>
                  <li><strong>Select the Language:</strong> Click on the appropriate tab for your code: "HTML", "CSS", or "JavaScript". The tool provides placeholder code to show you an example.</li>
                  <li><strong>Paste Your Code:</strong> Replace the placeholder text by pasting your own code into the "Input Code" box.</li>
                  <li><strong>Minify:</strong> Click the "Minify Code" button. The optimized code will instantly appear in the "Minified Output" box below.</li>
                  <li><strong>Review the Savings:</strong> An analysis card will show you the original size, the new smaller size, and the percentage of data you've saved.</li>
                  <li><strong>Copy the Result:</strong> Use the copy icon next to the output box to copy the minified code to your clipboard, ready to be used in your production files.</li>
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
                  <CardTitle className="text-primary">Educational Deep Dive: The Need for Speed</CardTitle>
              </div>
              <CardDescription>From user experience to SEO rankings, understand why every byte counts and how minification plays a critical role in web performance.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
              <section>
                  <h3 className="font-bold text-xl">What is Minification and Why Does It Matter?</h3>
                  <p>
                    When developers write code, they use spacing, comments, and descriptive variable names to make it readable and maintainable for humans. This is great for development, but it results in files that are larger than they need to be. A web browser doesn't care about comments or indentation; it just needs to execute the code.
                  </p>
                  <p><strong>Minification</strong> is an automated process that strips out all of this "human-friendly" formatting. It removes whitespace, newlines, and comments, effectively packing the code into the smallest possible space without altering its logic. The result is a functionally identical file that is significantly smaller in size.</p>
                  <p>
                    This matters because file size directly impacts website performance. Smaller files mean faster download times, especially on mobile networks. A faster website leads to a better user experience, lower bounce rates, higher conversion rates, and improved search engine rankings, as page speed is a key factor in Google's algorithm. You can estimate the impact of file size on download times with our <Link href="/tools/data-transfer-calculator" className="text-primary hover:underline">Data Transfer Time Calculator</Link>.
                  </p>
              </section>
              <section>
                  <h3 className="font-bold text-xl">Minification vs. Compression: A Two-Step Optimization</h3>
                  <p>It's important to distinguish minification from compression. They are two different but complementary techniques for reducing file size.</p>
                  <ul className="list-disc pl-5">
                     <li><strong>Minification</strong> happens before the files are uploaded to the server. It's a one-time change to the source code itself.</li>
                     <li><strong>Compression</strong> (like Gzip or Brotli) happens on the fly. When a browser requests a file, the web server compresses it before sending it. The browser then decompresses it upon receipt.</li>
                  </ul>
                  <p>You should always do both. Minifying the code first means the server has a smaller initial file to work with, allowing the compression algorithm to be even more effective. This two-step process provides the maximum possible file size reduction.</p>
              </section>
          </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
          <Card>
              <CardHeader>
                  <div className='flex items-center gap-2'><Wand className="h-6 w-6 text-accent" /> <CardTitle>Pro Tips & Quick Hacks</CardTitle></div>
              </CardHeader>
              <CardContent>
                  <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                      <li><strong>Automate in Your Build Process:</strong> Don't minify code manually. Integrate a minifier into your project's build pipeline (e.g., using Webpack's TerserPlugin, Vite's built-in minification, or Gulp/Grunt tasks). This ensures all your production code is automatically optimized.</li>
                      <li><strong>Generate Source Maps:</strong> When minifying JavaScript, generate a "source map". This is a separate file that maps the minified code back to the original source. It allows you to see readable code in your browser's developer tools when debugging production issues, which is incredibly useful.</li>
                      <li><strong>Combine Files Before Minifying:</strong> For older projects without a modern bundler, it's often beneficial to combine multiple CSS or JS files into a single file *before* minifying. This reduces the number of HTTP requests the browser needs to make, which can also improve performance.</li>
                      <li><strong>Check Your Server Configuration:</strong> Ensure your web server (like Apache or Nginx) is configured to serve minified assets with the correct `Content-Type` and to apply Gzip or Brotli compression. You can use our <Link href="/tools/http-header-checker" className="text-primary hover:underline">HTTP Header Checker</Link> to verify compression headers.</li>
                  </ul>
              </CardContent>
          </Card>
          <Card>
              <CardHeader>
                   <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
              </CardHeader>
              <CardContent>
                   <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                      <li><strong>Editing Minified Files:</strong> Never try to directly edit a minified file. It's unreadable and any changes will be overwritten the next time you build your project. Always make changes to the original source files.</li>
                      <li><strong>Committing Minified Files to Git:</strong> In most modern projects, you should not commit the minified output files to your version control system. They are build artifacts and just add noise to your commit history. Add your build directory (e.g., `/dist`, `/.next`) to your `.gitignore` file.</li>
                       <li><strong>Forgetting to Clear Cache:</strong> After deploying newly minified files, you or your users might still be served the old, un-minified versions from a browser or CDN cache. Ensure you have a cache-busting strategy in place, such as renaming files with a hash.</li>
                      <li><strong>Using Unsafe Optimizations:</strong> Be cautious with advanced JavaScript minifiers that perform "unsafe" optimizations. These can sometimes change the behavior of your code in subtle ways. Stick to the default, safe settings unless you know exactly what you are doing.</li>
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
              <Link href="/tools/data-transfer-calculator" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Data Transfer Time Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">See exactly how much time minification saves by calculating download times for different file sizes.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
              <Link href="/tools/http-header-checker" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">HTTP Header Checker<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Verify that your server is correctly applying Gzip or Brotli compression to your minified assets.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
              <Link href="/tools/json-formatter" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">JSON Formatter / Validator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">While not the same as minifying, this tool helps you format or compact JSON data, which is often used in APIs.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
          </div>
      </section>
    </div>
  );
}
