
import React from 'react';
import { PageHeader } from '@/components/page-header';
import { PrimeNumberGeneratorTool } from './prime-number-generator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { BookOpen, AlertTriangle, Wand, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';

export const metadata = {
    title: 'Prime Number Generator | ICT Toolbench',
    description: 'Generate a list of prime numbers up to a specified limit. Explore algorithms like the Sieve of Eratosthenes and learn about the importance of prime generation in computer science.',
    openGraph: {
        title: 'Prime Number Generator | ICT Toolbench',
        description: 'A free online tool to quickly generate lists of prime numbers. Includes deep-dive explanations of generation algorithms and their applications.',
        url: '/tools/prime-number-generator',
    }
};

const PrimeNumberGeneratorPage = () => {
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
    "name": "Prime Number Generator",
    "operatingSystem": "All",
    "applicationCategory": "DeveloperApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "A fast, client-side tool to generate a list of prime numbers up to a given limit using the Sieve of Eratosthenes algorithm.",
    "url": "https://www.your-app-url.com/tools/prime-number-generator"
  };

  return (
    <>
      <StructuredData data={faqSchema} />
      <StructuredData data={howToSchema} />
      <StructuredData data={softwareAppSchema} />
      <div className="max-w-4xl mx-auto space-y-12">
        <PageHeader
          title="Prime Number Generator"
          description="A fast and efficient tool for generating a list of all prime numbers up to a specified limit. Perfect for students, mathematicians, and developers."
        />
        
        <PrimeNumberGeneratorTool />

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use the Prime Number Generator</h2>
          <Card className="prose prose-sm max-w-none text-foreground p-6">
              <p>This tool uses an efficient algorithm to quickly list all prime numbers within a given range.</p>
              <ol>
                  <li><strong>Set a Limit:</strong> Enter the upper boundary for your prime number search in the "Generate primes up to" field. For performance reasons, the limit is capped.</li>
                  <li><strong>Generate Primes:</strong> Click the "Generate Primes" button.</li>
                  <li><strong>Review the Results:</strong> The tool will instantly display the total count of primes found and a scrollable list of all the prime numbers within your specified limit.</li>
                  <li><strong>Copy the List:</strong> Use the "Copy" button to copy the entire comma-separated list of primes to your clipboard for use in scripts, analysis, or documentation.</li>
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
                  <CardTitle className="text-primary">Educational Deep Dive: Algorithms for Finding Primes</CardTitle>
              </div>
              <CardDescription>From ancient sieves to modern probabilistic tests, explore the clever algorithms developed to identify the fundamental building blocks of numbers.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
              <section>
                  <h3>The Sieve of Eratosthenes: An Ancient and Elegant Algorithm</h3>
                  <p>
                    The most famous and efficient algorithm for finding all prime numbers up to a specified limit is the <strong>Sieve of Eratosthenes</strong>, which this tool uses. Conceived by the ancient Greek mathematician Eratosthenes of Cyrene, this algorithm is remarkable for its simplicity and efficiency. Instead of testing each number for primality one by one, it works by progressively eliminating composite numbers.
                  </p>
                  <p>The process is as follows:</p>
                  <ol className="list-decimal pl-5">
                     <li>Create a list of consecutive integers from 2 up to your limit `n`.</li>
                     <li>Start with the first prime number, `p = 2`.</li>
                     <li>Mark all multiples of `p` (2p, 3p, 4p, etc.) up to `n` as composite. Do not mark `p` itself.</li>
                     <li>Find the next number in the list that has not been marked. This number is the next prime. Set `p` to this new prime number.</li>
                     <li>Repeat steps 3 and 4 until `p` squared is greater than `n`.</li>
                     <li>All remaining unmarked numbers in the list are prime.</li>
                  </ol>
                  <p>
                    This method is highly efficient because it avoids redundant checks. For example, once it eliminates all multiples of 2, it never has to check another even number. The same applies to multiples of 3, 5, and so on.
                  </p>
              </section>
              <section>
                  <h3>Trial Division: Simple but Slow</h3>
                  <p>
                    The most basic method of checking if a single number `n` is prime is <strong>trial division</strong>. This involves dividing `n` by every integer from 2 up to the square root of `n`. If any division results in a whole number (i.e., no remainder), then `n` is composite. If no such divisor is found, `n` is prime. You can see this in action in our <Link href='/tools/prime-checker' className='text-primary hover:underline'>Prime Number Checker</Link> tool.
                  </p>
                  <p>
                    While effective for a single number, this method is very inefficient for generating a list of primes. To find all primes up to 1,000,000, you would have to perform millions of division operations. The Sieve of Eratosthenes, by contrast, finds them all in a single, much faster pass.
                  </p>
              </section>
              <section>
                  <h3>Primality Testing for Massive Numbers</h3>
                  <p>
                    What about the enormous prime numbers used in cryptography, which can have hundreds of digits? Trial division and even the Sieve are far too slow for this. For these numbers, computer scientists use <strong>probabilistic primality tests</strong>, such as the Miller-Rabin test.
                  </p>
                  <p>
                    These tests don't prove with 100% certainty that a number is prime. Instead, they provide a result that is either "definitely composite" or "probably prime." By running the test multiple times, the probability of a composite number being falsely identified as prime becomes astronomically low (e.g., less than 1 in 4<sup>100</sup>), making it a statistical certainty for all practical purposes. These algorithms are essential for generating the large prime numbers needed for RSA key pairs.
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
                        <li><strong>Start Small:</strong> To understand how the Sieve algorithm works, generate primes up to a small limit like 100 and trace the process on paper.</li>
                        <li><strong>Performance Limits:</strong> Notice how the time to generate primes increases as the limit gets larger. This illustrates the computational cost of number theory problems.</li>
                        <li><strong>Scripting Source:</strong> The generated list of primes can be copied and used as a pre-computed list in your own programs or scripts to speed up calculations that require prime numbers.</li>
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                     <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes</CardTitle></div>
                </CardHeader>
                <CardContent>
                     <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                        <li><strong>Setting Too High a Limit:</strong> Requesting all primes up to a very large number (e.g., 1 billion) can consume significant browser memory and CPU, potentially causing it to become unresponsive. This tool has a built-in limit to prevent this.</li>
                        <li><strong>Assuming Random Distribution:</strong> Prime numbers appear to be random, but they are not. Their distribution is deterministic, though the patterns are incredibly complex and are the subject of famous unsolved problems like the Riemann Hypothesis.</li>
                        <li><strong>Confusing Generation with Factoring:</strong> This tool generates a list of primes. It does not perform prime factorization (finding the prime factors of a given composite number), which is a much harder computational problem.</li>
                    </ul>
                </CardContent>
            </Card>
        </div>

        <section>
            <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Algorithm Optimization</h3>
                    <p className="text-sm text-muted-foreground">A developer writing a program that requires frequent primality checks for numbers up to 10,000 decides it's more efficient to pre-generate all primes up to that limit and store them in a hash set. They use this tool to generate the list once, which their program can then use for instant lookups instead of performing costly calculations repeatedly.</p>
                </div>
                <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Educational Exploration</h3>
                    <p className="text-sm text-muted-foreground">A computer science student is learning about the Sieve of Eratosthenes. They use this generator to produce a list of primes up to 500 and then write their own Sieve implementation in Python. They can then compare their output against the tool's result to verify that their own algorithm is correct.</p>
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
              <Link href="/tools/prime-checker" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Prime Number Checker<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">The companion tool. Check if a single, specific number is prime.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
              <Link href="/tools/fibonacci-generator" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Fibonacci Sequence Generator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Explore another fundamental sequence in mathematics with its own unique properties.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
              <Link href="/tools/big-o-calculator" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Time Complexity Estimator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Analyze the efficiency of prime generation algorithms like the Sieve of Eratosthenes.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
          </div>
      </section>
      </div>
    </>
  );
};

export default PrimeNumberGeneratorPage;
