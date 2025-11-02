
import { PageHeader } from '@/components/page-header';
import { PasswordEntropyCalculator } from './password-entropy-calculator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { Lightbulb, AlertTriangle, BookOpen, ChevronRight, Wand } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
    title: 'Password Entropy Calculator | ICT Toolbench',
    description: 'Calculate the entropy of a password in bits to measure its true strength and resistance to brute-force attacks. Learn how password length and character set size affect security.',
    openGraph: {
        title: 'Password Entropy Calculator | ICT Toolbench',
        description: 'Quantify your password\'s strength by calculating its entropy. An essential tool for understanding modern password security principles.',
        url: '/tools/password-entropy-calculator',
    }
};

const faqData = [
    { question: "What is password entropy?", answer: "Password entropy is a quantitative measure of a password's unpredictability or randomness. It is measured in 'bits.' A higher entropy value means there are more possible combinations, making the password exponentially harder for an attacker to guess or brute-force." },
    { question: "How is entropy calculated?", answer: "The formula is `E = L * log₂(R)`, where 'E' is the entropy in bits, 'L' is the password length, and 'R' is the size of the character pool (e.g., 26 for lowercase letters, 62 for alphanumeric). This tool calculates 'R' based on the characters you actually use in your password." },
    { question: "What is a 'good' entropy value?", answer: "Security standards vary, but a common guideline is: Below 40 bits is very weak. 40-60 bits is weak. 60-80 bits is acceptable. 80-120 bits is strong. Above 120 bits is very strong and provides excellent protection against all current and foreseeable brute-force attacks." },
    { question: "Why is entropy a better measure than just 'strength'?", answer: "A 'strength' meter is often a qualitative guess based on simple rules (e.g., has a number, has a symbol). Entropy is a quantitative, mathematical measure of a password's resistance to brute-force attacks. A long, simple passphrase can have much higher entropy than a short, 'complex' password, a fact this tool can demonstrate clearly." },
    { question: "Is it safe to type my password here?", answer: "Yes. This tool is 100% client-side. All calculations are performed in your browser using JavaScript. Your password is never sent to our servers or stored anywhere." },
    { question: "What is a 'character pool'?", answer: "The character pool is the set of unique characters a password could be made from. For example, if you only use lowercase letters, the pool size is 26. If you use lowercase, uppercase, and numbers, the pool size is 26 + 26 + 10 = 62. The larger the character pool, the higher the entropy for a given length." },
    { question: "How does this relate to the Password Strength Checker?", answer: "Our <a href='/tools/password-strength-checker' class='text-primary hover:underline'>Password Strength Checker</a> provides a quick, visual score. This tool provides the underlying mathematical value (entropy) that determines that score. It's for users who want to dive deeper into the 'why' of password security." },
    { question: "What is a brute-force attack?", answer: "A brute-force attack is an attempt to crack a password by systematically trying every single possible combination. The time it takes is directly related to the password's entropy. Higher entropy means an exponentially longer time to crack." },
    { question: "Does entropy account for dictionary attacks?", answer: "No. The standard entropy calculation assumes every character is chosen with equal randomness. It does not account for an attacker using a 'dictionary' of common words, names, or previously breached passwords. This is why using random, non-dictionary words in a passphrase is so important." },
    { question: "How can I increase my password's entropy?", answer: "There are two ways: 1) Increase the length of the password. This is the most effective method. 2) Increase the size of the character pool by including more character types (uppercase, lowercase, numbers, symbols)." },
];

const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Calculate Password Entropy',
    description: 'A step-by-step guide to measuring the entropy of your password.',
    step: [
        { '@type': 'HowToStep', name: 'Enter Your Password', text: 'Type or paste the password you want to analyze into the input field.' },
        { '@type': 'HowToStep', name: 'Review the Entropy Score', text: 'The tool will instantly calculate and display the entropy value in bits.' },
        { '@type': 'HowToStep', name: 'Analyze the Breakdown', text: 'The results will show the factors used in the calculation: the password length and the detected size of the character pool (e.g., lowercase + numbers).' },
    ],
    totalTime: 'PT1M'
};

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

export default function PasswordEntropyCalculatorPage() {
  return (
    <>
      <StructuredData data={faqSchema} />
      <StructuredData data={howToSchema} />
      <StructuredData data={softwareAppSchema} />
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
                    For years, password strength was judged by simple, rule-based systems: "must contain an uppercase letter, a number, and a symbol." Our <Link href="/tools/password-strength-checker" className="text-primary hover:underline">Password Strength Checker</a> uses these rules for a quick assessment. However, a more accurate way to measure a password's true strength is by calculating its <strong>entropy</strong>.
                  </p>
                  <p>
                    Entropy, measured in "bits," is a concept from information theory that quantifies unpredictability. In the context of passwords, it tells you how many guesses a brute-force attack would need to make, on average, to crack your password. Each bit of entropy doubles the difficulty of cracking the password. The difference between a 40-bit password and a 41-bit password is that the 41-bit password is twice as hard to crack.
                  </p>
              </section>
              <section>
                  <h3>The Formula for Strength: `E = L * log₂(R)`</h3>
                  <p>The entropy (E) of a password is calculated with a simple formula:</p>
                   <p className='text-center font-bold font-code text-xl bg-muted p-4 rounded-md'>
                        Entropy = Length × log₂(Size of Character Pool)
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
