
import { PageHeader } from '@/components/page-header';
import { PasswordEntropyCalculator } from './password-entropy-calculator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Lightbulb, AlertTriangle, BookOpen, ChevronRight, Wand, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';

export const metadata = {
    title: 'Password Entropy Calculator | ICT Toolbench',
    description: 'Calculate the entropy of a password in bits to measure its true strength and resistance to brute-force attacks. Learn how password length and character set size affect security.',
    openGraph: {
        title: 'Password Entropy Calculator | ICT Toolbench',
        description: 'Quantify your password\'s strength by calculating its entropy. An essential tool for understanding modern password security principles.',
        url: '/tools/password-entropy-calculator',
    }
};

const PasswordEntropyCalculatorPage = () => {
    const softwareAppSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Password Entropy Calculator",
        "operatingSystem": "All",
        "applicationCategory": "SecurityApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "description": "A free, client-side tool to calculate the entropy of a password in bits, providing a quantitative measure of its strength against brute-force attacks.",
        "url": "https://www.icttoolbench.com/tools/password-entropy-calculator"
    };

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
      <div className="max-w-4xl mx-auto space-y-12">
        <PageHeader
          title="Password Entropy Calculator"
          description="Quantify your password's security by calculating its entropy in bits. This tool provides a precise mathematical measure of a password's resistance to brute-force attacks."
        />
        <PasswordEntropyCalculator />

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use This Tool</h2>
          <Card className="prose prose-sm max-w-none text-foreground p-6">
              <p>
                This calculator provides a precise, mathematical score for your password's strength, based on information theory.
              </p>
              <ol>
                  <li>
                    <strong>Enter a Password:</strong> Type a password into the input field. All calculations are done in your browser; your password is never sent to our servers.
                  </li>
                  <li>
                    <strong>Analyze the Results:</strong> The tool instantly calculates and displays three key metrics:
                    <ul>
                      <li><strong>Entropy (bits):</strong> The primary measure of the password's randomness. Higher is exponentially better.</li>
                      <li><strong>Password Length:</strong> The number of characters in your password.</li>
                      <li><strong>Character Pool:</strong> The number of unique character types detected (lowercase, uppercase, numbers, symbols).</li>
                    </ul>
                  </li>
                  <li><strong>Understand the Strength:</strong> A label ("Weak", "Strong", etc.) provides a quick interpretation of the entropy score.</li>
              </ol>
          </Card>
        </section>

        <section>
            <h2 className="text-2xl font-bold mb-4">Worked Examples</h2>
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">Example 1: The "Complex" but Short Password</CardTitle>
                        <CardDescription>A common password that meets typical complexity rules but lacks sufficient entropy.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground"><strong>Password:</strong> <code className="font-code bg-muted p-1 rounded-sm">P@ssw0rd!9</code></p>
                        <div className="prose prose-sm max-w-none">
                            <ol>
                                <li><strong>Analysis:</strong> The password has a length of 10. It uses four character sets: uppercase ('P'), lowercase ('a', 's', 'w', 'r', 'd'), symbols ('@', '!'), and numbers ('0', '9'). The character pool size is 26+26+10+32 = 94.</li>
                                <li><strong>Entropy Calculation:</strong> `10 * log₂(94) ≈ 10 * 6.55 = 65.5 bits`.</li>
                                <li><strong>Result:</strong> The tool will show an entropy of around 65 bits, which is considered "Medium" or "Acceptable" but not truly strong. While it ticks all the complexity boxes, its short length and dictionary-based root word ("password") make it vulnerable.</li>
                            </ol>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">Example 2: The Long Passphrase</CardTitle>
                        <CardDescription>Demonstrating how length is the most powerful factor in creating high-entropy passwords.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground"><strong>Password:</strong> <code className="font-code bg-muted p-1 rounded-sm">green-desk-run-fast</code></p>
                        <div className="prose prose-sm max-w-none">
                            <ol>
                                <li><strong>Analysis:</strong> The password has a length of 21. It uses only two character sets: lowercase letters and one symbol ('-'). The character pool size is 26+1 = 27.</li>
                                <li><strong>Entropy Calculation:</strong> `21 * log₂(27) ≈ 21 * 4.75 = 99.8 bits`.</li>
                                <li><strong>Result:</strong> The tool will show an entropy of nearly 100 bits, which is "Strong". This demonstrates how significantly length outweighs complexity. This passphrase is far more secure than the first example, despite being simpler to type and remember.</li>
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
                  <CardTitle className="text-primary">Educational Deep Dive: What is Password Entropy?</CardTitle>
              </div>
              <CardDescription>Go beyond simple "strong" or "weak" labels and understand the mathematical foundation of password security.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
              <section>
                  <h3>From Rules to Randomness</h3>
                  <p>
                    For years, password strength was judged by simple, rule-based systems: "must contain an uppercase letter, a number, and a symbol." Our <strong><Link href="/tools/password-strength-checker" className="text-primary hover:underline">Password Strength Checker</Link></strong> uses these rules for a quick assessment. However, a more accurate way to measure a password's true strength is by calculating its <strong>entropy</strong>.
                  </p>
                  <p>
                    Entropy, measured in "bits," is a concept from information theory that quantifies unpredictability. In the context of passwords, it tells you how many guesses a brute-force attack would need to make, on average, to crack your password. Each bit of entropy doubles the difficulty of cracking the password. The difference between a 40-bit password and a 41-bit password is that the 41-bit password is twice as hard to crack.
                  </p>
              </section>
              <section>
                  <h3>The Formula for Strength: `E = L * log₂(R)`</h3>
                  <p>The entropy (E) of a password is calculated with a simple formula:</p>
                   <p className='text-center font-bold font-code text-xl bg-muted p-4 rounded-md'>
                        Entropy = Length × log<sub>2</sub>(Size of Character Pool)
                   </p>
                   <p>Let's break that down:</p>
                  <ul className="list-disc pl-5">
                     <li><strong>Length (L):</strong> The number of characters in your password. This is the most powerful multiplier in the equation.</li>
                     <li><strong>Character Pool (R):</strong> The total number of unique characters that could have been used for each position. For example:
                        <ul>
                            <li>Just numbers (0-9): R = 10</li>
                            <li>Lowercase letters (a-z): R = 26</li>
                            <li>Lowercase + Uppercase + Numbers: R = 26 + 26 + 10 = 62</li>
                            <li>All characters on a US keyboard: R ≈ 95</li>
                        </ul>
                     </li>
                  </ul>
                  <p>
                    This tool detects which character sets you have used to determine 'R' and applies this formula to give you a precise entropy score. This explains why a long passphrase of 25 lowercase letters (25 * log₂(26) ≈ 117 bits) is far stronger than a short, "complex" 8-character password using all character types (8 * log₂(95) ≈ 52 bits).
                  </p>
              </section>
          </CardContent>
        </Card>

        <section>
            <h2 className="text-2xl font-bold mb-4">Practical Tips</h2>
            <Card>
                <CardContent className="p-6">
                    <ul className="space-y-4">
                        <li className="flex items-start gap-4">
                            <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                            <div>
                                <h4 className="font-semibold">Prioritize Length Above All</h4>
                                <p className="text-sm text-muted-foreground">
                                    The easiest way to dramatically increase entropy is to add more characters. A 16-character password is exponentially stronger than a 12-character one, even with the same character set.
                                </p>
                            </div>
                        </li>
                        <li className="flex items-start gap-4">
                            <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                            <div>
                                <h4 className="font-semibold">Use Passphrases for Memorability</h4>
                                <p className="text-sm text-muted-foreground">
                                    For master passwords you must memorize, use a passphrase of 4-5 random, unrelated words (e.g., "Correct-Horse-Battery-Staple"). This provides high entropy while being easier to remember than a complex random string. Use our <strong><Link href="/tools/password-generator" className="text-primary hover:underline">Password Generator</Link></strong> to create these.
                                </p>
                            </div>
                        </li>
                        <li className="flex items-start gap-4">
                            <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                            <div>
                                <h4 className="font-semibold">Store Passwords Securely</h4>
                                <p className="text-sm text-muted-foreground">
                                    Never store passwords in plain text. They should always be processed with a secure one-way hashing algorithm like Argon2 or bcrypt. You can learn the basics of this process with our <strong><Link href="/tools/hash-generator-md5-sha" className="text-primary hover:underline">Hash Generator</Link></strong>.
                                </p>
                            </div>
                        </li>
                    </ul>
                </CardContent>
            </Card>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <div className='flex items-center gap-2'><Wand className="h-6 w-6 text-accent" /> <CardTitle>Pro Tips</CardTitle></div>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                        <li><strong>Target 80+ Bits:</strong> For any important account, aim for an entropy score of at least 80 bits. This is considered strong enough to resist brute-force attacks from even the most powerful adversaries for the foreseeable future.</li>
                        <li><strong>Entropy is Not Everything:</strong> This calculation assumes pure randomness. If your "random" password is a common phrase or a word from a dictionary, its real-world security is much lower. Avoid dictionary words.</li>
                        <li><strong>Use a Password Manager:</strong> The best way to achieve high entropy is to let a password manager generate and store a long, truly random password for each account. You don't need to remember it, so it can be as complex as possible.</li>
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                     <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes</CardTitle></div>
                </CardHeader>
                <CardContent>
                     <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                        <li><strong>Confusing Complexity with Strength:</strong> Adding one symbol to an 8-character password makes it 'complex' but only adds a small amount of entropy. Adding four more letters adds far more security.</li>
                        <li><strong>Predictable Patterns:</strong> Passwords like "Summer2024!" might seem random, but attackers' tools are programmed to check for common words followed by years and symbols.</li>
                        <li><strong>Ignoring Leaked Password Databases:</strong> An attacker's first step is often to check if your password has appeared in a previous data breach. A password's strength is irrelevant if it's already on a public list.</li>
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
              <Link href="/tools/password-strength-checker" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Password Strength Checker<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Get a quick, rule-based analysis of your password's strength.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
              <Link href="/tools/password-generator" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Password Generator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Create new passwords and passphrases with high entropy.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
              <Link href="/tools/hash-generator-md5-sha" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Hash Generator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Learn how strong passwords should be stored securely using one-way hashing.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
          </div>
      </section>
      </div>
    </>
  );
}

export default PasswordEntropyCalculatorPage;
