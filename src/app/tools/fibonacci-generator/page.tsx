
import React from 'react';
import { PageHeader } from '@/components/page-header';
import { FibonacciGeneratorTool } from './fibonacci-generator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { BookOpen, AlertTriangle, Wand, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';

export const metadata = {
    title: 'Fibonacci Sequence Generator | ICT Toolbench',
    description: 'Generate Fibonacci numbers up to a specified length. Explore the golden ratio, its applications in nature, computer science, and its mathematical properties.',
    openGraph: {
        title: 'Fibonacci Sequence Generator | ICT Toolbench',
        description: 'A free online tool to quickly generate the Fibonacci sequence. Includes a deep-dive into its history, applications, and algorithms.',
        url: '/tools/fibonacci-generator',
    }
};

const FibonacciGeneratorPage = () => {
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
    "name": "Fibonacci Sequence Generator",
    "operatingSystem": "All",
    "applicationCategory": "DeveloperApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "A fast, client-side tool to generate the Fibonacci sequence up to a given length, with educational content on its properties and applications.",
    "url": "https://www.your-app-url.com/tools/fibonacci-generator"
  };

  return (
    <>
      <StructuredData data={faqSchema} />
      <StructuredData data={howToSchema} />
      <StructuredData data={softwareAppSchema} />
      <div className="max-w-4xl mx-auto space-y-12">
        <PageHeader
          title="Fibonacci Sequence Generator"
          description="Generate the famous Fibonacci sequence up to any specified length. Explore one of mathematics' most fascinating and ubiquitous patterns."
        />
        
        <FibonacciGeneratorTool />

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use This Tool</h2>
          <Card className="prose prose-sm max-w-none text-foreground p-6">
              <p>This tool generates the Fibonacci sequence based on the number of elements you specify.</p>
              <ol>
                  <li><strong>Set a Length:</strong> Enter the number of Fibonacci numbers you want to generate in the input field. For example, entering `20` will generate the first 20 numbers in the sequence.</li>
                  <li><strong>Generate Sequence:</strong> Click the "Generate Sequence" button.</li>
                  <li><strong>Review the Results:</strong> The tool will instantly display the total count of numbers generated and the full, comma-separated sequence in the text box below.</li>
                  <li><strong>Copy the List:</strong> Use the "Copy" button to copy the sequence to your clipboard for use in other applications, scripts, or documents.</li>
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
                  <CardTitle className="text-primary">Educational Deep Dive: The Golden Sequence</CardTitle>
              </div>
              <CardDescription>From spiral galaxies to the stock market, uncover the history, mathematics, and surprising prevalence of the Fibonacci sequence.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
              <section>
                  <h3 className="font-bold text-xl">What is the Fibonacci Sequence?</h3>
                  <p>
                    The Fibonacci sequence is a series of numbers in which each number is the sum of the two preceding ones. It usually starts with 0 and 1.
                  </p>
                  <p className='text-center font-bold font-code text-2xl'>
                    0, 1, 1, 2, 5, 8, 13, 21, 34, ...
                  </p>
                  <p>
                    The sequence is defined by the recurrence relation: <strong>F(n) = F(n-1) + F(n-2)</strong>, with the seed values F(0) = 0 and F(1) = 1. This simple formula gives rise to a sequence with profound connections to mathematics and the natural world.
                  </p>
              </section>
              <section>
                  <h3 className="font-bold text-xl">The Golden Ratio: A Hidden Connection</h3>
                  <p>
                    One of the most remarkable properties of the Fibonacci sequence is its relationship to the <strong>Golden Ratio</strong>, an irrational number approximately equal to <strong>1.6180339887...</strong>, often denoted by the Greek letter phi (φ). If you take any two successive Fibonacci numbers, their ratio is very close to the Golden Ratio. As the numbers get larger, this ratio gets closer and closer to φ exactly.
                  </p>
                  <p>
                    For example: 8/5 = 1.6, 13/8 = 1.625, 21/13 ≈ 1.615. This ratio appears in geometry, art, architecture, and nature, often cited as a benchmark for aesthetic harmony.
                  </p>
              </section>
              <section>
                  <h3 className="font-bold text-xl">Fibonacci in Code: Iteration vs. Recursion</h3>
                  <p>There are two classic ways to compute the Fibonacci sequence in code. This tool uses the iterative approach for efficiency.</p>
                  <ul className="list-disc pl-5">
                    <li>
                      <strong>Iterative Approach:</strong> This method uses a loop to build the sequence from the beginning. It's fast and memory-efficient. This is the approach our generator uses. You can analyze its time complexity using our <Link href='/tools/big-o-calculator' className='text-primary hover:underline'>Time Complexity Estimator</Link>—it's O(n), linear time.
                    </li>
                     <li>
                      <strong>Recursive Approach:</strong> A recursive function is one that calls itself. A naive recursive implementation (`fib(n) = fib(n-1) + fib(n-2)`) is elegant but incredibly inefficient. It has an exponential time complexity (O(2ⁿ)) because it re-calculates the same values many, many times. It is a classic example used in computer science to teach the dangers of inefficient recursion.
                    </li>
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
                        <li><strong>Nature's Numbers:</strong> Look for Fibonacci numbers in nature. The number of petals on a flower, the spirals on a pinecone or a pineapple, and the branching of trees often follow the sequence.</li>
                        <li><strong>Binet's Formula:</strong> There is a surprising closed-form expression called Binet's Formula that can calculate the nth Fibonacci number directly without iteration or recursion, using the Golden Ratio.</li>
                        <li><strong>Handling Large Numbers:</strong> As the sequence grows, the numbers become very large very quickly. This tool uses JavaScript's `BigInt` to handle numbers that exceed the standard limits of number types, preventing precision errors.</li>
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                     <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes</CardTitle></div>
                </CardHeader>
                <CardContent>
                     <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                        <li><strong>Off-by-One Errors:</strong> Be careful whether a sequence starts with F(0) or F(1). The 10th Fibonacci number can mean different things depending on the starting point. This generator is 0-indexed.</li>
                        <li><strong>Using Inefficient Recursion:</strong> Implementing the naive recursive solution in production code for anything but very small numbers will cause severe performance issues.</li>
                        <li><strong>Integer Overflow:</strong> In languages without built-in support for arbitrarily large integers, calculating Fibonacci numbers beyond about the 93rd will cause an integer overflow and produce incorrect results.</li>
                    </ul>
                </CardContent>
            </Card>
        </div>

        <section>
            <h2 className="text-2xl font-bold mb-4">Real-Life Applications</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Computer Science Algorithms</h3>
                    <p className="text-sm text-muted-foreground">The sequence is used in several computer algorithms. The "Fibonacci search technique" is a method for searching sorted arrays. "Fibonacci heaps" are a data structure for priority queue operations. It's also a common problem for teaching dynamic programming.</p>
                </div>
                <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Financial Market Analysis</h3>
                    <p className="text-sm text-muted-foreground">In technical analysis of financial markets, "Fibonacci retracement levels" are a popular tool. Traders use ratios derived from the sequence (23.6%, 38.2%, 50%, 61.8%, 100%) to predict potential support and resistance levels for stock prices.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Art and Design</h3>
                    <p className="text-sm text-muted-foreground">The Golden Ratio, derived from the Fibonacci sequence, is considered an aesthetically pleasing proportion. Artists, architects, and designers have used it for centuries to create balanced and harmonious compositions, from the layout of the Parthenon to the design of modern websites.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Agile Project Management</h3>
                    <p className="text-sm text-muted-foreground">In Agile software development, a common method for estimating task effort is "Planning Poker," where story points are assigned from a modified Fibonacci sequence (1, 2, 3, 5, 8, 13, 20, 40, 100). The non-linear scale reflects the increasing uncertainty that comes with larger tasks.</p>
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
              <Link href="/tools/prime-number-generator" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Prime Number Generator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Explore another fundamental mathematical sequence with its own unique properties.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
              <Link href="/tools/big-o-calculator" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Time Complexity Estimator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Analyze the performance (Big O) of different Fibonacci algorithms.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
              <Link href="/tools/factorial-calculator" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Factorial Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Calculate another important mathematical function that grows rapidly.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
          </div>
      </section>
      </div>
    </>
  );
};

export default FibonacciGeneratorPage;
