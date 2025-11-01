
import React from 'react';
import { PageHeader } from '@/components/page-header';
import { RandomStringGenerator } from './random-string-generator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { BookOpen, AlertTriangle, Wand, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';

export const metadata = {
    title: 'Random String Generator | Customizable & Secure | ICT Toolbench',
    description: 'Generate secure, random strings with customizable length and character sets (lowercase, uppercase, numbers, symbols). Ideal for creating passwords, API keys, and unique identifiers.',
    openGraph: {
        title: 'Random String Generator | ICT Toolbench',
        description: 'A free, client-side tool to generate cryptographically secure random strings for any development or security need.',
        url: '/tools/random-string-generator',
    }
};

const RandomStringGeneratorPage = () => {
  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Random String Generator",
    "operatingSystem": "All",
    "applicationCategory": "DeveloperApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "A free online tool to generate secure, random strings with customizable length and character sets. Ideal for creating passwords, API keys, and unique identifiers.",
    "url": "https://www.your-app-url.com/tools/random-string-generator"
  };

  return (
    <>
      <StructuredData data={faqData} />
      <StructuredData data={howToSchema} />
      <StructuredData data={softwareAppSchema} />
      <div className="max-w-4xl mx-auto space-y-12">
        <PageHeader
          title="Random String Generator"
          description="Create secure, random strings for any purpose. Customize the length and character sets to generate passwords, API keys, unique IDs, and more."
        />
        
        <RandomStringGenerator />

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use the Random String Generator</h2>
          <Card className="prose prose-sm max-w-none text-foreground p-6">
              <p>This tool provides a simple yet powerful interface for creating cryptographically secure random strings.</p>
              <ol>
                  <li><strong>Set the Length:</strong> Use the slider or the input field to specify the desired length of your random string.</li>
                  <li><strong>Choose Character Sets:</strong> Select the types of characters you want to include by checking the boxes for lowercase, uppercase, numbers, and/or symbols.</li>
                  <li><strong>Exclude Characters (Optional):</strong> If there are specific characters you want to avoid (e.g., characters that are easily confused like 'I', 'l', and '1'), type them into the "Exclude Characters" field.</li>
                  <li><strong>Generate:</strong> Click the "Generate String" button. A new random string that meets your criteria will be instantly created.</li>
                  <li><strong>Copy the Result:</strong> Use the copy button next to the output field to copy the generated string to your clipboard.</li>
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
                  <CardTitle className="text-primary">Educational Deep Dive: The Science of Randomness</CardTitle>
              </div>
              <CardDescription>From pseudo-random numbers to cryptographic security, understand what makes a random string truly random and why it matters.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
              <section>
                  <h3>What is a Random String?</h3>
                  <p>
                    A random string is a sequence of characters where each character is selected from a specified set (or "pool") in a way that is unpredictable. The core purpose of a random string is to create a unique, non-guessable value. This is fundamental to computer security and many programming tasks.
                  </p>
              </section>
              <section>
                  <h3>Pseudo-Random vs. Cryptographically Secure</h3>
                  <p>
                    Computers are deterministic machines, which makes generating true randomness difficult. Most programming languages provide a "pseudo-random number generator" (PRNG). A PRNG produces a sequence of numbers that appears random but is actually generated by a mathematical formula starting from a "seed" value. If you know the algorithm and the seed, you can predict the entire sequence. This is fine for many tasks, like shuffling a playlist or for procedural generation in video games.
                  </p>
                  <p>
                    However, for security purposes like generating passwords, API keys, or session tokens, pseudo-randomness is dangerously insecure. For these cases, we must use a <strong>Cryptographically Secure Pseudo-Random Number Generator (CSPRNG)</strong>. A CSPRNG is designed to be unpredictable, even if an attacker has knowledge of previous random values. It gathers entropy from various unpredictable sources in the operating system (like mouse movements, network packet timing, and hardware noise) to ensure the output cannot be guessed. This tool uses `crypto.getRandomValues`, the modern web standard for cryptographically secure random number generation.
                  </p>
              </section>
               <section>
                  <h3>Entropy: The Measure of Randomness</h3>
                  <p>
                    The strength of a random string is measured by its <strong>entropy</strong>, expressed in bits. Entropy represents the string's unpredictability. It's calculated based on the length of the string and the size of the character pool it's drawn from. The formula is: `Entropy = Length × log₂(Character Pool Size)`.
                  </p>
                  <p>
                    For example, a 12-character password using only lowercase letters has a character pool of 26. Its entropy is `12 * log₂(26) ≈ 56.4 bits`. If you add uppercase letters and numbers, the pool size becomes 62 (`26 + 26 + 10`), and the entropy jumps to `12 * log₂(62) ≈ 71.4 bits`. This exponential increase is why using a diverse character set is so important for creating strong, unguessable strings. You can explore this concept further with our <Link href='/tools/password-strength-checker' className='text-primary hover:underline'>Password Strength Checker</Link> and <Link href='/tools/password-entropy-calculator' className='text-primary hover:underline'>Password Entropy Calculator</Link>.
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
                        <li><strong>Length Over Complexity:</strong> For generating secure tokens or passwords, increasing the length is often more effective at increasing entropy than just adding more symbol types.</li>
                        <li><strong>Avoid Ambiguous Characters:</strong> When generating strings for human use (like one-time codes), use the "Exclude Characters" field to remove easily confused characters like `l`, `1`, `I`, `O`, and `0`.</li>
                        <li><strong>URL-Safe Strings:</strong> If you need a random string for a URL parameter, uncheck the "Symbols" checkbox or manually exclude URL-unsafe characters like `&`, `?`, `/`, and `#`.</li>
                        <li><strong>Test Your Randomness:</strong> For critical security applications, never build your own random number generator. Always use the built-in, cryptographically secure methods provided by your language or platform.</li>
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                     <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                </CardHeader>
                <CardContent>
                     <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                        <li><strong>Using a Weak Seed:</strong> Seeding a standard pseudo-random generator with a predictable value (like the current time) makes the entire sequence guessable and is insecure.</li>
                        <li><strong>Not Enough Length:</strong> Generating a short "random" string (e.g., 6-8 characters) for a password or session token is insecure. It can be easily brute-forced. Aim for at least 16 characters for secure tokens.</li>
                        <li><strong>Misusing for Passwords:</strong> While this tool can generate strong random passwords, a dedicated <Link href='/tools/password-generator' className='text-primary hover:underline'>Password Generator</Link> might offer more user-friendly options, like creating pronounceable passphrases.</li>
                        <li><strong>Displaying Sensitive Tokens:</strong> Never expose sensitive generated strings like API keys or reset tokens on the client-side or in logs. They should be handled securely on the backend.</li>
                    </ul>
                </CardContent>
            </Card>
        </div>

        <section>
            <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Generating Secure API Keys</h3>
                    <p className="text-sm text-muted-foreground">A developer is building an API and needs to issue unique, unguessable keys to their users. They use the generator to create a 32-character alphanumeric string (uppercase, lowercase, numbers) for each user. The high entropy makes it impossible for an attacker to guess another user's key.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Creating Unique Session Identifiers</h3>
                    <p className="text-sm text-muted-foreground">When a user logs into a web application, the server needs to create a secure session ID to store in a cookie. Using a 24-character random string from all character sets ensures the session ID is unique and cannot be hijacked by an attacker guessing common patterns.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Password Reset Tokens</h3>
                    <p className="text-sm text-muted-foreground">For a "forgot password" feature, a secure, single-use token must be generated and sent to the user's email. A 16-character random string provides enough security to ensure the token cannot be guessed during its short lifespan.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Temporary Filenames</h3>
                    <p className="text-sm text-muted-foreground">An application that allows users to upload files needs to store them temporarily on the server before processing. To prevent filename collisions, the application generates a 12-character random alphanumeric string to append to the original filename, ensuring each saved file has a unique name.</p>
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
               <Link href="/tools/password-generator" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Password Generator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">A specialized tool for creating strong, memorable, or completely random passwords.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
              <Link href="/tools/password-strength-checker" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Password Strength Checker<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Analyze the strength and entropy of the strings you generate.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
              <Link href="/tools/hash-generator-md5-sha" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Hash Generator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Turn your generated string into a secure, one-way hash for storage.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
          </div>
      </section>
      </div>
    </>
  );
};

export default RandomStringGeneratorPage;
