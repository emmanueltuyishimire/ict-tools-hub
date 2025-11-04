
import { PageHeader } from '@/components/page-header';
import { CacheExpirationCalculator } from './cache-expiry-calculator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Lightbulb, AlertTriangle, BookOpen, ChevronRight, Wand } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
    title: 'Cache Expiration Calculator | HTTP Cache-Control | ICT Toolbench',
    description: 'Calculate the exact expiration date and time for a cached resource based on the `Cache-Control: max-age` directive. Essential for web performance optimization.',
    openGraph: {
        title: 'Cache Expiration Calculator | ICT Toolbench',
        description: 'Instantly calculate cache expiry times to fine-tune your website\'s caching strategy for optimal performance and freshness.',
        url: '/tools/cache-expiry-calculator',
    }
};

const faqData = [
    { question: "What is HTTP caching?", answer: "HTTP caching is a technique where a web browser or an intermediary proxy (like a CDN) stores a copy of a web resource (like an image, CSS file, or even an entire page) so that it doesn't have to be re-downloaded from the server on subsequent requests. This dramatically improves performance, reduces latency, and decreases network traffic." },
    { question: "What is the `Cache-Control` header?", answer: "The `Cache-Control` header is the modern, primary HTTP header used to specify caching policies for both requests and responses. It is highly flexible and provides a range of directives to control how a resource is cached, for how long, and by whom." },
    { question: "What does `max-age` mean?", answer: "`max-age` is a directive in the `Cache-Control` header that specifies the maximum amount of time, in seconds, that a fetched resource is considered fresh. This tool uses the `max-age` value to calculate the expiration date from a given start time." },
    { question: "What's the difference between `Cache-Control` and `Expires`?", answer: "`Expires` is an older HTTP/1.0 header that sets a specific expiration date and time. `Cache-Control` is a newer HTTP/1.1 header that is more flexible (using relative time like `max-age`) and takes precedence over `Expires` if both are present. It is best practice to use `Cache-Control`." },
    { question: "What do `public` vs. `private` mean in Cache-Control?", answer: "`public` indicates that the response may be stored by any cache, including shared caches like CDNs. `private` indicates that the response is intended for a single user and must not be stored by a shared cache; only the user's browser may cache it. This is typically used for pages containing personalized information." },
    { question: "What does `no-cache` mean? Does it prevent caching?", answer: "Confusingly, `no-cache` does *not* mean 'do not cache.' It means the client *must* re-validate the cached resource with the origin server before using it. The server can then respond with a `304 Not Modified` status if the file hasn't changed, saving a re-download. To completely prevent caching, you must use the `no-store` directive." },
    { question: "What is a `304 Not Modified` response?", answer: "This is a response from the server that tells the client, 'The version you already have in your cache is still the current version. You can go ahead and use it.' This avoids re-downloading the entire file and is much faster. It's often used in combination with conditional headers like `ETag` and `Last-Modified`." },
    { question: "What are ETags?", answer: "An ETag (Entity Tag) is a unique identifier assigned by the web server to a specific version of a resource. When a browser re-validates a cached file, it sends the ETag back to the server in an `If-None-Match` header. If the ETag on the server still matches, the server returns a `304 Not Modified` status, saving bandwidth." },
    { question: "How long should I set my `max-age` for?", answer: "It depends on the resource. For static assets that rarely change (like logos, CSS frameworks, fonts), you can set a very long `max-age`, such as one year (`max-age=31536000`). For content that changes more frequently (like a blog post's CSS), you might choose a shorter duration, like one day (`max-age=86400`)." },
    { question: "How do I clear a cached resource?", answer: "If you set a long `max-age` on a file but then need to update it, you need a cache-busting strategy. The most common method is to change the filename, often by appending a version number or a hash (e.g., `style.v2.css` or `style.a1b2c3d4.css`). This forces the browser to download the new file as it has a different URL." }
];

const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Calculate a Cache Expiration Date',
    description: 'A step-by-step guide to calculating the expiry date of a cached web resource.',
    step: [
        { '@type': 'HowToStep', name: 'Set the Start Date', text: 'Enter the date and time when the resource was first cached. By default, it uses the current time.' },
        { '@type': 'HowToStep', name: 'Enter the `max-age` Value', text: 'Input the `max-age` value (in seconds) from the `Cache-Control` HTTP header. You can use the quick presets for common values like one day or one year.' },
        { '@type': 'HowToStep', name: 'Review the Expiration Date', text: 'The tool will instantly calculate and display the exact date and time when the cached resource will be considered stale and need re-validation.' }
    ],
    totalTime: 'PT1M'
};

const keyTerminologies = [
    { term: 'Cache-Control', definition: 'The primary HTTP header for specifying caching policies. `max-age` is its most common directive.' },
    { term: 'max-age', definition: 'A `Cache-Control` directive that specifies the maximum time in seconds that a resource is considered fresh.' },
    { term: 'Expires Header', definition: 'An older HTTP/1.0 header that sets a specific expiration date. It is overridden by `Cache-Control: max-age`.' },
    { term: 'Re-validation', definition: 'The process where a browser checks with the origin server to see if a cached (stale) resource is still valid, typically using `ETag` or `Last-Modified` headers.' },
    { term: '304 Not Modified', definition: 'An HTTP status code sent by the server to indicate that the cached version of a resource is still current, avoiding a re-download.' },
    { term: 'Cache Busting', definition: 'A technique for forcing a browser to download a new version of a cached file, usually by changing its filename or adding a query parameter.' },
];

export default function CacheExpirationCalculatorPage() {
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
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      <PageHeader
        title="Cache Expiration Calculator"
        description="Calculate the expiration date of a cached web resource based on its `Cache-Control: max-age` header. A simple tool for web developers and performance engineers."
      />
      
      <div className="max-w-4xl mx-auto space-y-12">
        <CacheExpirationCalculator />

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use This Tool</h2>
          <Card className="prose prose-sm max-w-none text-foreground p-6">
              <p>
                This calculator helps you understand and visualize how the `Cache-Control: max-age` header works.
              </p>
              <ol>
                  <li>
                    <strong>Set a Start Time:</strong> By default, the tool uses the current date and time. You can adjust this to any past or future date to simulate different scenarios.
                  </li>
                  <li>
                    <strong>Enter `max-age`:</strong> Input the `max-age` value in seconds. This is the value you would find in an HTTP `Cache-Control` header (e.g., `Cache-Control: public, max-age=3600`). Use the quick presets for common durations like one day or one year.
                  </li>
                  <li>
                    <strong>See the Result:</strong> The "Expiration Date" field instantly updates to show the exact date and time when the resource will expire and become stale.
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
                  <CardTitle className="text-primary">Educational Deep Dive: Mastering HTTP Caching</CardTitle>
              </div>
              <CardDescription>From `max-age` to `ETags`, understand the core concepts that make websites fast and efficient.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
              <section>
                  <h3 className="font-bold text-xl">The Foundation of Web Performance</h3>
                  <p>
                    HTTP caching is one of the most important aspects of web performance optimization. When a user visits a webpage, their browser downloads numerous files: HTML, CSS, JavaScript, images, and fonts. Caching is the process of storing these files locally on the user's device. On subsequent visits, the browser can load these files directly from its local cache instead of re-downloading them from the server, resulting in dramatically faster load times and a better user experience.
                  </p>
                  <p>
                    This process is controlled by specific HTTP headers sent by the server. The most important of these is the `Cache-Control` header.
                  </p>
              </section>
              <section>
                  <h3 className="font-bold text-xl">Understanding the `Cache-Control` Header</h3>
                  <p>The `Cache-Control` header is a powerful tool that provides a flexible set of instructions (directives) for how a resource should be cached. This tool focuses on the most common directive, `max-age`.</p>
                  <ul className="list-disc pl-5">
                     <li><strong>`max-age`</strong>: This directive tells the browser how long, in seconds, the resource can be reused from the cache without checking with the server. For example, `max-age=3600` means the file is considered 'fresh' for one hour.</li>
                     <li><strong>`public` / `private`</strong>: `public` allows the resource to be stored in shared caches (like a CDN), while `private` restricts it to the user's browser cache.</li>
                     <li><strong>`no-cache`</strong>: This directive forces the browser to re-validate with the server before using a cached copy. The server can then respond with `304 Not Modified` if the file is unchanged, saving a download.</li>
                     <li><strong>`no-store`</strong>: This is the most restrictive directive, completely forbidding the browser and any intermediaries from storing any version of the resource. It is used for highly sensitive data.</li>
                  </ul>
                  <p>By using our <Link href="/tools/http-header-checker" className="text-primary hover:underline">HTTP Header Checker</Link>, you can inspect the `Cache-Control` headers of any live website.</p>
              </section>
              <section>
                  <h3 className="font-bold text-xl">The Re-validation Model: ETags and Last-Modified</h3>
                  <p>What happens after `max-age` expires? The resource is now considered 'stale'. The next time the user requests it, the browser must re-validate it with the server. It does this by sending a conditional request using one of two headers:</p>
                  <ul className="list-disc pl-5">
                      <li><strong>`If-None-Match`</strong>: The browser sends the `ETag` (a unique version identifier) of the file it has in its cache. If the server's version still has the same `ETag`, it knows the file hasn't changed.</li>
                      <li><strong>`If-Modified-Since`</strong>: The browser sends the `Last-Modified` date of the file it has. If the server's version hasn't been modified since that date, it knows the file is still current.</li>
                  </ul>
                  <p>In both cases, if the server determines the file is unchanged, it replies with a lightweight `304 Not Modified` response, telling the browser to use its cached copy. This is much faster than re-downloading the entire file. A proper caching strategy uses a combination of a long `max-age` and `ETag`/`Last-Modified` headers for optimal performance.</p>
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
                      <li><strong>Cache-Busting for Static Assets:</strong> For CSS and JS files, use a build tool (like Webpack or Vite) to automatically append a unique hash to the filename (e.g., `app.a1b2c3d4.js`). This allows you to set a very long `max-age` (e.g., 1 year), as any change will result in a new filename, forcing a fresh download.</li>
                      <li><strong>`stale-while-revalidate`</strong>: This powerful directive allows the browser to serve a stale resource from the cache immediately (for speed) while it re-validates it in the background. If a new version is available, it will be used for the *next* page load.</li>
                      <li><strong>Immutable Directive:</strong> For cache-busted resources that will never, ever change, you can add the `immutable` directive (e.g., `Cache-Control: public, max-age=31536000, immutable`). This tells the browser it never even needs to re-validate the file, saving an extra request.</li>
                  </ul>
              </CardContent>
          </Card>
          <Card>
              <CardHeader>
                   <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
              </CardHeader>
              <CardContent>
                   <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                      <li><strong>No Caching Headers:</strong> Failing to set any caching headers at all. This forces browsers to re-download every asset on every page load, severely degrading performance.</li>
                      <li><strong>Using `Last-Modified` for HTML:</strong> Dynamically generated HTML pages often have a `Last-Modified` date of the time they were generated, which makes them appear new on every request and prevents effective caching. It's better to use `ETag` validation for dynamic content.</li>
                      <li><strong>Setting `max-age=0`:</strong> While this forces re-validation, it adds latency to every request. It's better to set a short cache duration (e.g., `max-age=60` for one minute) for content that changes frequently but not instantly.</li>
                      <li><strong>Forgetting `public`/`private`:</strong> A common mistake is to cache user-specific content (like a user's account page) in a public cache. Always use `Cache-Control: private` for personalized data to prevent it from being served to other users.</li>
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
              <Link href="/tools/http-header-checker" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">HTTP Header Checker<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Inspect the live `Cache-Control` headers of any website.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
              <Link href="/tools/response-time-calculator" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Response Time Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Measure your server's Time to First Byte (TTFB), which is heavily influenced by caching.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
              <Link href="/tools/data-transfer-calculator" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Data Transfer Time Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">See how caching reduces download times by avoiding re-transferring data.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
          </div>
      </section>
      </div>
    </>
  );
}
