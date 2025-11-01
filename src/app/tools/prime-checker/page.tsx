
import React from 'react';
import { PageHeader } from '@/components/page-header';
import { PrimeChecker } from './prime-checker';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { BookOpen, AlertTriangle, Wand, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';

export const metadata = {
    title: 'Prime Number Checker | ICT Toolbench',
    description: 'Instantly check if a number is prime with our fast and simple tool. Learn the definition of prime numbers, explore algorithms, and see real-world applications in cryptography.',
    openGraph: {
        title: 'Prime Number Checker | ICT Toolbench',
        description: 'A free online tool to quickly determine if any number is prime. Includes a deep-dive into primality testing, FAQs, and more.',
        url: '/tools/prime-checker',
    }
};

const PrimeCheckerPage = () => {
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
    "name": "Prime Number Checker",
    "operatingSystem": "All",
    "applicationCategory": "DeveloperApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "A fast, client-side tool to determine if a number is prime. Includes educational content on primality testing and its applications.",
    "url": "https://www.your-app-url.com/tools/prime-checker"
  };

  return (
    <>
      <StructuredData data={faqSchema} />
      <StructuredData data={howToSchema} />
      <StructuredData data={softwareAppSchema} />
      <div className="max-w-4xl mx-auto space-y-12">
        <PageHeader
          title="Prime Number Checker"
          description="A quick and easy tool to determine if a number is prime. Enter any integer to see if it has any divisors other than 1 and itself."
        />
        
        <PrimeChecker />

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use the Prime Number Checker</h2>
          <Card className="prose prose-sm max-w-none text-foreground p-6">
              <p>This tool provides a straightforward way to test if any given integer is a prime number.</p>
              <ol>
                  <li><strong>Enter a Number:</strong> Type any integer into the input field. The tool works best with positive whole numbers.</li>
                  <li><strong>Check the Result:</strong> The tool will instantly analyze the number and display a clear result: "Prime" or "Not Prime".</li>
                  <li><strong>View the Explanation:</strong> For composite (not prime) numbers, the tool will provide a factor pair to demonstrate why it's not prime. For prime numbers, it confirms that it's only divisible by 1 and itself.</li>
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
                  <CardTitle className="text-primary">Educational Deep Dive: The World of Prime Numbers</CardTitle>
              </div>
              <CardDescription>Explore what makes prime numbers the fundamental building blocks of mathematics and a cornerstone of modern cryptography.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
              <section>
                  <h3 className="font-bold text-xl">What is a Prime Number?</h3>
                  <p>
                    A prime number is a whole number greater than 1 that cannot be formed by multiplying two smaller whole numbers. In other words, its only divisors are 1 and itself. The first few prime numbers are 2, 3, 5, 7, 11, 13, 17, and 19. The number 2 is the only even prime number. Any whole number greater than 1 that is not prime is called a <strong>composite number</strong>. For example, 10 is a composite number because it can be factored as 2 × 5.
                  </p>
                  <p>
                    Prime numbers are the "atoms" of the number system. The <strong>Fundamental Theorem of Arithmetic</strong> states that every integer greater than 1 is either a prime number itself or can be represented as a unique product of prime numbers (its prime factorization). This uniqueness is what makes primes so foundational.
                  </p>
              </section>
              <section>
                  <h3 className="font-bold text-xl">How Primality Testing Works</h3>
                  <p>How does a computer determine if a number is prime? The simplest method is <strong>trial division</strong>. For generating a list of primes, an even better method is the Sieve of Eratosthenes, which you can explore with our <Link href='/tools/prime-number-generator' className='text-primary hover:underline'>Prime Number Generator</Link>. For checking a single number, trial division is effective:</p>
                  <ol className="list-decimal pl-5">
                     <li>Take the input number, <code>n</code>.</li>
                     <li>Check if <code>n</code> is less than or equal to 1. If so, it's not prime.</li>
                     <li>Check if <code>n</code> is 2. If so, it is prime.</li>
                     <li>Check if <code>n</code> is divisible by 2. If so, it's not prime.</li>
                     <li>Loop through all odd numbers from 3 up to the square root of <code>n</code>. For each number <code>i</code>, check if <code>n</code> is divisible by <code>i</code>. If you find any divisor, you can immediately stop and conclude that <code>n</code> is not prime.</li>
                     <li>If the loop finishes without finding any divisors, <code>n</code> must be a prime number.</li>
                  </ol>
                  <p>
                    We only need to check up to the square root of <code>n</code> because if <code>n</code> has a factor larger than its square root, it must also have a corresponding factor smaller than its square root. This optimization makes the process much faster. For very large numbers, more advanced and probabilistic algorithms like the Miller-Rabin test are used, as trial division becomes too slow.
                  </p>
              </section>
              <section>
                  <h3 className="font-bold text-xl">The Unbreakable Code: Primes in Cryptography</h3>
                  <p>
                    The most important real-world application of prime numbers is in public-key cryptography, the system that secures almost all digital communication. The security of algorithms like <strong>RSA</strong> relies on the fact that it is easy to multiply two very large prime numbers together, but it is computationally infeasible to do the reverse—that is, to take the resulting product and find its original prime factors.
                  </p>
                  <p>
                    When you connect to a secure website via HTTPS, your browser and the server use this principle to exchange encryption keys. The website's public key is derived from the product of two massive, secret prime numbers. You can use this public key to encrypt data, but only the server, which knows the original prime factors, can decrypt it. The difficulty of factoring this large number is what keeps your data safe.
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
                        <li><strong>Divisibility Rules:</strong> Before testing a large number, use simple divisibility rules. If a number ends in 0 or 5, it's divisible by 5. If the sum of its digits is divisible by 3, the number is divisible by 3.</li>
                        <li><strong>The Sieve of Eratosthenes:</strong> If you need to find all primes up to a certain limit, the Sieve of Eratosthenes is a highly efficient algorithm. You can use our <Link href="/tools/prime-number-generator" className="text-primary hover:underline">Prime Number Generator</Link> to see it in action.</li>
                        <li><strong>Prime Numbers are Infinite:</strong> The ancient Greek mathematician Euclid proved that there is an infinite number of prime numbers.</li>
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                     <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes</CardTitle></div>
                </CardHeader>
                <CardContent>
                     <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                        <li><strong>Forgetting that 1 is Not Prime:</strong> By definition, a prime number must be greater than 1. The number 1 is a special case and is considered a "unit".</li>
                        <li><strong>Assuming All Odd Numbers are Prime:</strong> While 2 is the only even prime, not all odd numbers are prime. For example, 9 is odd but is composite (3 × 3).</li>
                        <li><strong>Testing Divisors Too Far:</strong> When checking for factors of a number <code>n</code>, you only need to test up to its square root. Any factor larger than the square root would have a corresponding factor smaller than it, which you would have already found.</li>
                    </ul>
                </CardContent>
            </Card>
        </div>

        <section>
            <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Cryptography & Secure Communication</h3>
                    <p className="text-sm text-muted-foreground">The most critical application. Algorithms like RSA use the difficulty of factoring large composite numbers (products of two large primes) to secure everything from e-commerce transactions to encrypted messaging.</p>
                </div>
                <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Generating Procedural Content in Gaming</h3>
                    <p className="text-sm text-muted-foreground">Game developers sometimes use prime numbers in algorithms for procedural generation (e.g., creating star systems, terrain, or noise patterns) because their unique properties can help create seemingly random but deterministic and non-repeating patterns.</p>
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
                          <CardDescription className="text-xs">Generate a list of prime numbers up to a specified limit.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
              <Link href="/tools/fibonacci-generator" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Fibonacci Sequence Generator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Explore another fundamental sequence in mathematics.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
              <Link href="/tools/number-converter" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Binary, Decimal, &amp; Hex Converter<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Understand the number systems that computers use to perform calculations.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
          </div>
      </section>
      </div>
    </>
  );
};

export default PrimeCheckerPage;
