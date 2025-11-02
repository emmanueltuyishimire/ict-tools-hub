
import React from 'react';
import { PageHeader } from '@/components/page-header';
import { RandomNumberGenerator } from './random-number-generator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { BookOpen, AlertTriangle, Wand, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';

export const metadata = {
    title: 'Random Number Generator | Secure & Customizable | ICT Toolbench',
    description: 'Generate secure, random numbers within a custom range. Specify a minimum, maximum, and count, and choose to allow or disallow duplicates. Ideal for simulations, testing, and more.',
    openGraph: {
        title: 'Random Number Generator | ICT Toolbench',
        description: 'A free, client-side tool to generate cryptographically secure random numbers for any application.',
        url: '/tools/random-number-generator',
    }
};

const RandomNumberGeneratorPage = () => {
  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Random Number Generator",
    "operatingSystem": "All",
    "applicationCategory": "DeveloperApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "A free online tool to generate secure, random numbers with customizable ranges and uniqueness constraints.",
    "url": "https://www.your-app-url.com/tools/random-number-generator"
  };

  return (
    <>
      <StructuredData data={faqData} />
      <StructuredData data={howToSchema} />
      <StructuredData data={softwareAppSchema} />
      <div className="max-w-4xl mx-auto space-y-12">
        <PageHeader
          title="Random Number Generator"
          description="Generate cryptographically secure random numbers. Customize the range, quantity, and uniqueness to fit your needs for testing, simulations, or contests."
        />
        
        <RandomNumberGenerator />

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use the Random Number Generator</h2>
          <Card className="prose prose-sm max-w-none text-foreground p-6">
              <p>This tool provides a powerful interface for creating lists of random numbers for a wide range of applications.</p>
              <ol>
                  <li><strong>Set the Range:</strong> Enter the <strong>Minimum</strong> and <strong>Maximum</strong> values for your desired number range. The numbers generated will be inclusive of these values.</li>
                  <li><strong>Define the Quantity:</strong> In the <strong>Count</strong> field, specify how many random numbers you want to generate.</li>
                  <li><strong>Control Uniqueness:</strong> Use the <strong>Allow Duplicates</strong> checkbox. If checked, numbers can appear more than once. If unchecked, every number in the output will be unique.</li>
                  <li><strong>Generate:</strong> Click the "Generate Numbers" button to create your list.</li>
                  <li><strong>Copy the Result:</strong> The generated numbers will appear in a text box. Use the copy button to easily copy the comma-separated list to your clipboard.</li>
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
                  <CardTitle className="text-primary">Educational Deep Dive: The Nature of Digital Randomness</CardTitle>
              </div>
              <CardDescription>From simple dice rolls to complex cryptographic keys, understand the difference between predictable and truly unpredictable numbers in computing.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
              <section>
                  <h3>Pseudo-Random vs. Cryptographically Secure Randomness</h3>
                  <p>
                    A computer, being a deterministic machine, cannot create true randomness on its own. Most programming languages offer a standard <strong>Pseudo-Random Number Generator (PRNG)</strong>, often via a function like `Math.random()`. A PRNG generates a sequence of numbers that appears random, but is actually produced by a mathematical formula starting from an initial value called a "seed". If you know the algorithm and the seed, you can reproduce the exact same sequence of "random" numbers. This is perfectly acceptable for applications like video games (e.g., for procedural terrain generation) or simulations where reproducibility can be useful.
                  </p>
                  <p>
                    However, for any security-related application, this predictability is a critical flaw. If an attacker can guess the seed, they can predict your "random" numbers. This is why for things like generating passwords, creating encryption keys, or even running a fair online lottery, we must use a <strong>Cryptographically Secure Pseudo-Random Number Generator (CSPRNG)</strong>.
                  </p>
                   <p>
                    A CSPRNG is a much more advanced algorithm that is specifically designed to be unpredictable. It gathers <strong>entropy</strong> (a measure of randomness) from unpredictable sources within the computer's operating system, such as the precise timing of hardware interrupts, network packet arrivals, or tiny variations in mouse movements. It uses this entropy to constantly re-seed its internal state, making its output impossible to guess, even if an attacker has seen previous numbers from the sequence. This tool uses your browser's built-in CSPRNG (`crypto.getRandomValues`), which is the modern standard for generating high-quality random numbers for web applications.
                  </p>
              </section>
              <section>
                  <h3>Uniform Distribution: Ensuring Fairness</h3>
                  <p>
                    Another important property of a good RNG is that it should produce a <strong>uniform distribution</strong>. This means that for a given range, every number has an equal probability of being chosen. If you generate thousands of numbers between 1 and 100, you would expect the number of times you see '7' to be roughly the same as the number of times you see '53'.
                  </p>
                   <p>
                    Poorly implemented RNGs can suffer from bias, where certain numbers or ranges of numbers appear more frequently than others. This is a critical flaw in applications like online gaming or lotteries, as it means the results are not truly fair. The CSPRNG used by this tool is designed to produce a uniform distribution, making it suitable for such applications.
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
                        <li><strong>Generate Test Data:</strong> Need a set of random numbers to test a sorting algorithm? Generate a list of 1,000 numbers and use it as a realistic, unsorted input for our <a href='/tools/algorithm-simulator' className='text-primary hover:underline'>Algorithm Step Simulator</a>.</li>
                        <li><strong>Simulate Dice Rolls:</strong> To simulate rolling two standard six-sided dice, set the min to 1, max to 6, and count to 2.</li>
                        <li><strong>Statistical Sampling:</strong> If you have a list of 500 items and need to select a random sample of 20 for analysis, generate 20 unique numbers between 1 and 500 to use as your sample indices.</li>
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                     <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                </CardHeader>
                <CardContent>
                     <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                        <li><strong>Using `Math.random()` for Security:</strong> Never use a standard PRNG like JavaScript's `Math.random()` to generate anything that needs to be secure, like a password reset token or an encryption key. It is predictable and insecure.</li>
                        <li><strong>Modulo Bias:</strong> A common mistake when creating an RNG for a specific range is to use the modulo operator (e.g., `randomNumber % max`). This can introduce a subtle bias where lower numbers in the range are slightly more likely to be chosen. This tool avoids this by using a statistically sound method.</li>
                        <li><strong>Assuming Uniqueness:</strong> Don't assume a set of random numbers will be unique unless you explicitly request it. In a large set of numbers, duplicates are statistically likely to occur.</li>
                    </ul>
                </CardContent>
            </Card>
        </div>

        <section>
            <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Conducting a Lottery or Giveaway</h3>
                    <p className="text-sm text-muted-foreground">An organization is running a giveaway with 500 entrants and needs to pick 5 unique winners. They use the random number generator to create 5 unique numbers between 1 and 500. The numbers correspond to the entry numbers, ensuring a fair and unbiased selection of winners.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Video Game Development</h3>
                    <p className="text-sm text-muted-foreground">A game developer is designing a loot drop system. When a monster is defeated, the game generates a random number between 1 and 1000. If the number is 1-500, the monster drops a common item. If it's 501-800, an uncommon item. If it's 801-990, a rare item. If it's 991-1000, a legendary item. This creates a probabilistic and exciting reward system.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Scientific Simulation</h3>
                    <p className="text-sm text-muted-foreground">A researcher is simulating the spread of a disease in a small population of 10,000 individuals. They use a random number generator to model the probability of transmission during each interaction, allowing them to run hundreds of simulations and gather statistical data on potential outcomes.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Creating Unique Order IDs</h3>
                    <p className="text-sm text-muted-foreground">An e-commerce site wants to create short, unique, human-readable order IDs. They decide to use a random 8-digit number. By setting the range from 10,000,000 to 99,999,999 and generating a single number, they can create a unique ID for each new order.</p>
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
               <Link href="/tools/random-string-generator" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Random String Generator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">For when you need random text, passwords, or API keys instead of numbers.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
              <Link href="/tools/password-generator" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Password Generator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">A specialized tool for creating strong, random passwords and passphrases.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
          </div>
      </section>
      </div>
    </>
  );
};

export default RandomNumberGeneratorPage;
