
import React from 'react';
import { PageHeader } from '@/components/page-header';
import { FactorialCalculator } from './factorial-calculator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { BookOpen, AlertTriangle, Wand, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';

export const metadata = {
    title: 'Factorial Calculator | Online Tool for n! | ICT Toolbench',
    description: 'Quickly calculate the factorial (n!) of any number. Our tool handles large numbers and provides a detailed educational guide on factorials, their properties, and their use in mathematics and computer science.',
    openGraph: {
        title: 'Factorial Calculator | Online Tool for n! | ICT Toolbench',
        description: 'A fast, client-side factorial calculator with explanations on permutations, combinations, and algorithms like recursion and iteration.',
        url: '/tools/factorial-calculator',
    }
};

const FactorialCalculatorPage = () => {
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
    "name": "Factorial Calculator",
    "operatingSystem": "All",
    "applicationCategory": "DeveloperApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "A fast, client-side tool to calculate the factorial of a number, with educational content on its mathematical properties and applications in computer science.",
    "url": "https://www.your-app-url.com/tools/factorial-calculator"
  };

  return (
    <>
      <StructuredData data={faqSchema} />
      <StructuredData data={howToSchema} />
      <StructuredData data={softwareAppSchema} />
      <div className="max-w-4xl mx-auto space-y-12">
        <PageHeader
          title="Factorial Calculator"
          description="A simple and fast tool to calculate the factorial (n!) of a non-negative integer. Handles large numbers with ease."
        />
        
        <FactorialCalculator />

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use the Factorial Calculator</h2>
          <Card className="prose prose-sm max-w-none text-foreground p-6">
              <p>This tool provides a straightforward way to calculate the factorial of any non-negative integer.</p>
              <ol>
                  <li><strong>Enter a Number:</strong> Type a non-negative integer into the input field. The calculator is designed to handle large numbers, but there is a practical limit for browser performance.</li>
                  <li><strong>Calculate:</strong> Click the "Calculate" button.</li>
                  <li><strong>View the Result:</strong> The tool will instantly display the calculated factorial. For large results, the number will be displayed in scientific notation for readability, with the full number available in a separate box.</li>
                  <li><strong>Copy the Result:</strong> Use the "Copy" button to copy the full factorial result to your clipboard.</li>
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
                  <CardTitle className="text-primary">Educational Deep Dive: Understanding Factorials</CardTitle>
              </div>
              <CardDescription>From simple multiplication to complex probability, explore the mathematical concept of the factorial and its importance.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
              <section>
                  <h3 className="font-bold text-xl">What is a Factorial?</h3>
                  <p>
                    The factorial of a non-negative integer <strong>n</strong>, denoted by <strong>n!</strong>, is the product of all positive integers up to <strong>n</strong>. It's a simple concept with surprisingly deep implications in many areas of mathematics and computer science.
                  </p>
                  <p>The formula is: <strong>n! = n × (n-1) × (n-2) × ... × 1</strong></p>
                  <p>For example, 5! is calculated as:</p>
                  <p className='text-center font-bold font-code text-2xl'>
                    5! = 5 × 4 × 3 × 2 × 1 = 120
                  </p>
                  <p>
                    By special definition, the factorial of 0 (0!) is 1. This is a convention that makes many mathematical formulas and identities, especially in combinatorics, work correctly.
                  </p>
              </section>
              <section>
                  <h3 className="font-bold text-xl">Combinatorics: Counting the Possibilities</h3>
                  <p>
                    The most intuitive application of factorials is in <strong>combinatorics</strong>, the field of counting arrangements. The value of n! represents the number of unique ways you can arrange n distinct objects. This is also known as the number of <strong>permutations</strong>.
                  </p>
                  <p>
                    For example, if you have three letters (A, B, C), how many different ways can you order them?
                  </p>
                   <ul className="list-disc pl-5">
                    <li>ABC, ACB</li>
                    <li>BAC, BCA</li>
                    <li>CAB, CBA</li>
                  </ul>
                  <p>There are 6 possible arrangements. This is calculated by 3! = 3 × 2 × 1 = 6.</p>
              </section>
               <section>
                  <h3 className="font-bold text-xl">Recursion vs. Iteration</h3>
                  <p>In computer science, there are two primary ways to calculate a factorial:</p>
                   <ul className="list-disc pl-5">
                       <li><strong>Iteration:</strong> This approach uses a simple loop that starts at 1 and multiplies each number up to n. It is efficient in both time (O(n)) and memory. This is the method our calculator uses.</li>
                       <li><strong>Recursion:</strong> A recursive function is one that calls itself. A factorial can be elegantly defined recursively: `factorial(n) = n * factorial(n-1)`. While elegant, this can be less efficient for very large numbers due to the overhead of function calls, which can lead to a "stack overflow" error. It's a classic example used to teach the concept of recursion.</li>
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
                        <li><strong>Stirling's Approximation:</strong> For very large n, calculating n! directly becomes impossible. Stirling's approximation is a famous formula used to estimate the value of n!, especially useful in physics and statistics.</li>
                        <li><strong>Combinations:</strong> Factorials are the basis for calculating combinations (the number of ways to choose k items from a set of n, where order doesn't matter), using the formula n! / (k! * (n-k)!).</li>
                        <li><strong>Handling Large Numbers:</strong> Factorial values grow incredibly fast. `20!` is already over 2 quintillion. This tool uses `BigInt` to handle numbers that exceed the limits of standard JavaScript numbers, but even that has its limits in a browser environment.</li>
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                     <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes</CardTitle></div>
                </CardHeader>
                <CardContent>
                     <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                        <li><strong>Negative Numbers:</strong> Factorials are only defined for non-negative integers. Attempting to calculate the factorial of a negative number is a mathematical error.</li>
                        <li><strong>Non-Integers:</strong> The standard factorial function is not defined for fractions or decimals (though its generalization, the Gamma function, is).</li>
                        <li><strong>Underestimating Growth:</strong> Misjudging how quickly factorials grow. `70!` is already larger than the estimated number of atoms in the observable universe, leading to overflow errors in programs that use standard 64-bit integers.</li>
                    </ul>
                </CardContent>
            </Card>
        </div>

        <section>
            <h2 className="text-2xl font-bold mb-4">Real-Life Applications</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Probability and Statistics</h3>
                    <p className="text-sm text-muted-foreground">Factorials are fundamental to calculating permutations and combinations, which are the building blocks of probability theory. They are used to determine the number of possible outcomes in an experiment, like the odds of drawing a specific hand in poker.</p>
                </div>
                <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Computer Science (Algorithms)</h3>
                    <p className="text-sm text-muted-foreground">Factorials appear in the analysis of algorithms, particularly those involving permutations, like the "traveling salesman problem" where one must find the shortest possible route that visits a set of cities. The number of possible routes is related to (n-1)!.</p>
                </div>
                <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Calculus and Series Expansions</h3>
                    <p className="text-sm text-muted-foreground">Factorials are a key component in the Taylor series expansions of many important functions, such as e<sup>x</sup>, sin(x), and cos(x), which are used to approximate these functions in calculators and computer programs.</p>
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
                                <div dangerouslySetInnerHTML={{ __html: item.answer.replace(/<a href='([^']*)' class='[^']*'>/g, "<a href='$1' class='text-primary hover:underline'>") }} />
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
                          <CardDescription className="text-xs">Explore another fundamental concept in number theory.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
              <Link href="/tools/fibonacci-generator" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Fibonacci Sequence Generator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Generate another important mathematical sequence with unique properties.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
          </div>
      </section>
      </div>
    </>
  );
};

export default FactorialCalculatorPage;

    