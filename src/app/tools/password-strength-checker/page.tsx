
import { PageHeader } from '@/components/page-header';
import { PasswordStrengthChecker } from './password-strength-checker';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { Lightbulb, AlertTriangle, BookOpen, ChevronRight, Wand, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
    title: 'Password Strength Checker | Analyze Password Security | ICT Toolbench',
    description: 'Analyze password strength in real-time. Our tool checks for length, complexity, entropy, and common patterns to help you create more secure passwords for maximum protection.',
    openGraph: {
        title: 'Password Strength Checker | Analyze Password Security | ICT Toolbench',
        description: 'Instantly check password strength against modern security standards. Get feedback on entropy, character variety, and crack time estimates.',
        url: '/tools/password-strength-checker',
    }
};

const faqData = [
    { question: "Why is password length so important?", answer: "Length is the single most important factor in password strength. Each character you add increases the number of possible combinations exponentially, making it much harder for attackers to guess or 'brute-force' your password. A long, simpler passphrase is often stronger than a short, complex password. You can estimate the impact of length with our <a href='/tools/password-entropy-calculator' class='text-primary hover:underline'>Password Entropy Calculator</a>." },
    { question: "What is password entropy?", answer: "Entropy is a measure of a password's randomness or unpredictability. It's measured in 'bits.' A higher bit value means the password is more secure. For example, a password with 80 bits of entropy is astronomically harder to crack than one with 40 bits. The calculation is based on the password's length and the size of the character set used (e.g., lowercase, uppercase, numbers, symbols)." },
    { question: "Is it safe to type my password into this tool?", answer: "Yes. This password strength checker operates entirely within your browser. Your password is never sent over the internet or stored anywhere. All calculations are performed on your local machine using JavaScript, ensuring complete privacy." },
    { question: "Are passphrases better than complex passwords?", answer: "Often, yes. A long passphrase like 'Correct-Horse-Battery-Staple' is easier for a human to remember but has high entropy due to its length, making it very difficult for a computer to crack. This is often a better strategy than a short, complex password like 'Tr0ub4d&r' that is hard to remember. Our <a href='/tools/password-generator' class='text-primary hover:underline'>Password Generator</a> can help create both types." },
    { question: "Why should I avoid using personal information?", answer: "Attackers often use information they know about you (your name, birthday, pet's name, etc.) in 'dictionary attacks.' They will try common words and personal details first. A password should be completely random and unrelated to your personal life." },
    { question: "What is a 'brute-force' attack?", answer: "A brute-force attack is a method where an attacker systematically tries every possible combination of characters until they find the correct password. The stronger and longer your password, the more time and computing power this attack requires, making it impractical." },
    { question: "Why is using the same password on multiple sites dangerous?", answer: "This is called password reuse. If one site you use suffers a data breach and your password is leaked, attackers will try that same email and password combination on hundreds of other popular sites (like banking, email, and social media). This is known as 'credential stuffing.' Using a unique password for every site is critical." },
    { question: "What is a password manager and should I use one?", answer: "A password manager is a secure application designed to store and manage all your passwords in an encrypted vault. It allows you to generate and use long, complex, unique passwords for every site without having to memorize them. You only need to remember one strong master password. Using a password manager is one of the most effective security practices you can adopt." },
    { question: "What is hashing and how does it relate to passwords?", answer: "Hashing is a one-way process that turns a password into a fixed-length, unique string of characters. Websites should store the 'hash' of your password, not the password itself. When you log in, they hash what you type and compare it to the stored hash. This means even if their database is stolen, your actual password is not revealed. You can see this in action with our <a href='/tools/hash-generator-md5-sha' class='text-primary hover:underline'>Hash Generator</a>." },
    { question: "What is 2FA (Two-Factor Authentication)?", answer: "2FA adds a second layer of security beyond your password, usually a temporary code from an app on your phone. Even if an attacker steals your password, they cannot log in without this second factor. You should enable it on every service that offers it. Explore how it works with our <a href='/tools/totp-demo' class='text-primary hover:underline'>Two-Factor Auth TOTP Demo</a>." }
];

const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Check Your Password Strength',
    description: 'A step-by-step guide to analyzing the security of your password.',
    step: [
        { '@type': 'HowToStep', name: 'Enter Your Password', text: 'Type or paste the password you want to check into the input field. The analysis is performed in real-time.' },
        { '@type': 'HowToStep', name: 'Toggle Visibility (Optional)', text: 'Click the eye icon to show or hide the password to ensure you typed it correctly.' },
        { '@type': 'HowToStep', name: 'Review the Strength Meter', text: 'The colored progress bar provides an immediate visual indication of the password\'s strength, from "Very Weak" to "Very Strong".' },
        { '@type': 'HowToStep', name: 'Check the Feedback List', text: 'The checklist below the input field shows which security criteria your password meets, such as length and character types.' },
        { '@type': 'HowToStep', name: 'Understand the Entropy', text: 'The entropy value (in bits) gives a precise mathematical measure of your password\'s randomness. Aim for a value above 70 bits for strong security.' },
    ],
    totalTime: 'PT1M',
};

const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Password Strength Checker",
    "operatingSystem": "All",
    "applicationCategory": "SecurityApplication",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    },
    "description": "A free, client-side tool to analyze password strength in real-time based on length, complexity, entropy, and common patterns.",
    "url": "https://www.icttoolbench.com/tools/password-strength-checker"
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

export default function PasswordStrengthCheckerPage() {
  return (
    <>
      <StructuredData data={faqSchema} />
      <StructuredData data={howToSchema} />
      <StructuredData data={softwareAppSchema} />
      <div className="max-w-4xl mx-auto space-y-12">
        <PageHeader
            title="Password Strength Checker"
            description="Analyze your password's strength against modern security criteria. Get instant feedback on length, character variety, and entropy to create more secure passwords for maximum protection."
        />
        
        <PasswordStrengthChecker />

        <section>
            <h2 className="text-2xl font-bold mb-4">How to Use the Password Strength Checker</h2>
            <Card className="prose prose-sm max-w-none text-foreground p-6">
              <p>This tool gives you instant, real-time feedback on your password's security. It's designed to be simple and educational.</p>
              <ol>
                  <li><strong>Enter Password:</strong> Start typing your password in the input field. All analysis happens securely in your browser—nothing is sent to our servers.</li>
                  <li><strong>Review Strength Meter:</strong> The colored bar provides an at-a-glance assessment of the password's strength, from "Very Weak" (red) to "Very Strong" (emerald).</li>
                  <li><strong>Check the Criteria:</strong> The checklist below the meter will update in real-time, showing if your password meets key criteria like length, use of uppercase letters, numbers, and symbols.</li>
                  <li><strong>Understand Entropy:</strong> The "Entropy" score gives you a precise mathematical value for your password's randomness. For a deeper understanding of this metric, check out our <Link href="/tools/password-entropy-calculator" className="text-primary hover:underline">Password Entropy Calculator</Link>.</li>
              </ol>
            </Card>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Worked Examples</h2>
          <div className="space-y-6">
              <Card>
                  <CardHeader>
                      <CardTitle className="text-xl">Example 1: The Short, "Complex" Password</CardTitle>
                      <CardDescription>A common but flawed approach to password creation.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <p className="text-sm text-muted-foreground"><strong>Password:</strong> <code className="font-code bg-muted p-1 rounded-sm">P@ssw0rd!</code></p>
                     <div className="prose prose-sm max-w-none">
                         <ol>
                             <li><strong>Analysis:</strong> The tool will check all the boxes: it has uppercase, lowercase, numbers, and symbols. The length, however, is only 9 characters.</li>
                             <li><strong>Result:</strong> The strength meter will likely show "Medium" or "Weak". The entropy score will be relatively low despite the character variety.</li>
                             <li><strong>Insight:</strong> This demonstrates that while complexity helps, short length is a critical weakness. This password is a common dictionary word with simple substitutions (`a` to `@`, `o` to `0`), making it vulnerable to modern dictionary and brute-force attacks.</li>
                         </ol>
                     </div>
                  </CardContent>
              </Card>
              <Card>
                  <CardHeader>
                      <CardTitle className="text-xl">Example 2: The Long Passphrase</CardTitle>
                      <CardDescription>Illustrating the power of length and memorability.</CardDescription>
                  </CardHeader>
                   <CardContent className="space-y-4">
                     <p className="text-sm text-muted-foreground"><strong>Password:</strong> <code className="font-code bg-muted p-1 rounded-sm">eating-correct-battery-staples</code></p>
                     <div className="prose prose-sm max-w-none">
                         <ol>
                            <li><strong>Analysis:</strong> The tool notes the excellent length (32 characters). It only uses lowercase letters and hyphens (a special character).</li>
                            <li><strong>Result:</strong> The strength meter will show "Very Strong". The entropy score will be very high.</li>
                            <li><strong>Insight:</strong> This proves that a long, easy-to-remember passphrase is far more secure than a short, complex password. The sheer number of possible combinations from the length outweighs the limited character set. For even stronger passphrases, use our <Link href="/tools/password-generator" className="text-primary hover:underline">Password Generator</Link> to create one.</li>
                         </ol>
                     </div>
                  </CardContent>
              </Card>
          </div>
        </section>

        <Card className='bg-secondary/30 border-primary/20'>
            <CardHeader>
                <div className='flex items-center gap-2 text-primary'>
                    <BookOpen className="h-6 w-6" aria-hidden="true" />
                    <CardTitle className="text-primary">Educational Deep Dive: The Art of Strong Passwords</CardTitle>
                </div>
                <CardDescription>Move beyond simple rules and understand the principles that make a password truly secure in the modern digital landscape.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                <section>
                    <h3>Beyond Complexity: Why Length is King</h3>
                    <p>
                        For decades, we were taught that a "complex" password with a mix of symbols, numbers, and cases was the key to security. While character variety is important, modern password cracking techniques have shown that <strong>length is the single most dominant factor in password strength.</strong>
                    </p>
                    <p>
                        An attacker's primary method is the brute-force attack, where they try every possible combination. Each character you add to your password increases the number of possible combinations exponentially. A 10-character password using all character types is significantly stronger than an 8-character one, and a 16-character password is astronomically stronger still. This is why many security experts now recommend longer "passphrases" (e.g., <strong>GreenDeskRunFast47!</strong>) over shorter, more complex, and harder-to-remember passwords (e.g., <strong>Tr0ub4d&amp;r</strong>).
                    </p>
                </section>
                 <section>
                    <h3>Understanding Entropy: The True Measure of Strength</h3>
                    <p>
                        The "Strength" meter gives you a general idea, but the <strong>Entropy</strong> value provides a precise, mathematical measure of a password's unpredictability. Entropy is measured in "bits." The higher the number of bits, the more random and secure the password is. Here’s a simple guide to interpreting entropy values:
                    </p>
                    <ul className="list-disc pl-5">
                       <li><strong>Below 40 bits:</strong> Very Weak. Can be cracked almost instantly by modern hardware.</li>
                        <li><strong>40 - 60 bits:</strong> Weak. Vulnerable to standard brute-force attacks.</li>
                        <li><strong>60 - 80 bits:</strong> Medium. Reasonably secure against casual attackers but potentially vulnerable to dedicated, high-powered attacks.</li>
                        <li><strong>80 - 120 bits:</strong> Strong. Considered secure for most purposes. It would take centuries or longer to crack with current technology.</li>
                        <li><strong>Above 120 bits:</strong> Very Strong. Overkill for most uses, but provides extreme security, resistant even to future advances in computing power (for the foreseeable future).</li>
                    </ul>
                    <p>
                        Entropy is calculated based on two factors: the length of the password and the size of the character pool it draws from (lowercase, uppercase, numbers, symbols). Adding just one character type (e.g., a single number to an all-lowercase password) can significantly increase the character pool and boost the entropy. You can explore this concept further with our <Link href="/tools/password-entropy-calculator" className="text-primary hover:underline">Password Entropy Calculator</Link>.
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
                              <h4 className="font-semibold">Use a Password Manager</h4>
                              <p className="text-sm text-muted-foreground">
                                The single best thing you can do for your security. A password manager can generate and store long, unique, random passwords for every website. You only need to remember one strong master password. This eliminates password reuse, the #1 cause of account takeovers.
                              </p>
                          </div>
                      </li>
                      <li className="flex items-start gap-4">
                          <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                          <div>
                              <h4 className="font-semibold">Enable Two-Factor Authentication (2FA)</h4>
                              <p className="text-sm text-muted-foreground">
                                2FA adds a second layer of security, usually a temporary code from an app on your phone. Even if an attacker steals your password, they can't log in without this second factor. Enable it on every service that offers it. Explore how it works with our <Link href="/tools/totp-demo" className="text-primary hover:underline">Two-Factor Auth TOTP Demo</Link>.
                              </p>
                          </div>
                      </li>
                       <li className="flex items-start gap-4">
                          <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                          <div>
                              <h4 className="font-semibold">Favor Long Passphrases</h4>
                              <p className="text-sm text-muted-foreground">
                                Create a long password from a memorable but random sequence of words, like <strong>Green-Desk-Run-Fast-47!</strong>. It's easier to remember than <strong>Tr0ub4d&amp;r</strong> but significantly harder to crack due to its length. Our <Link href="/tools/password-generator" className="text-primary hover:underline">Password Generator</Link> can help create these.
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
                        <li><strong>Be Unique:</strong> Never reuse passwords across different websites. If one site is breached, attackers will use your leaked credentials to try to access your other accounts (this is called "credential stuffing").</li>
                        <li><strong>Audit Your Passwords:</strong> Periodically review the passwords stored in your password manager. Update any that are old, weak, or have been involved in a known data breach.</li>
                        <li><strong>Secure Your "Key to the Kingdom":</strong> Your email account password and your password manager's master password should be your strongest and most unique passwords, as they guard access to everything else.</li>
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                     <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                </CardHeader>
                <CardContent>
                     <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                        <li><strong>Predictable Substitutions:</strong> Avoid common substitutions like <strong>P@ssw0rd</strong> for 'Password'. Attackers' dictionaries are programmed to check for these (e.g., 'a' → '@', 'o' → '0').</li>
                        <li><strong>Using Personal Information:</strong> Don't use your name, birthday, pet's name, or other easily guessable information. Attackers use this personal data in targeted attacks.</li>
                        <li><strong>Sequential Keyboard Patterns:</strong> Avoid patterns like `qwerty`, `asdfgh`, or `123456`. These are among the first things a cracking program will try.</li>
                        <li><strong>Incrementing Passwords:</strong> Don't just change the number at the end of your password when forced to update (e.g., from <strong>Summer2023!</strong> to <strong>Summer2024!</strong>). This is a predictable pattern that offers little additional security.</li>
                    </ul>
                </CardContent>
            </Card>
        </div>

        <section>
            <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Creating a New Online Account</h3>
                    <p className="text-sm text-muted-foreground">When signing up for a new service, a user types their proposed password into the checker. The tool shows it as "Weak". Following the feedback, they add more characters and a symbol until the tool rates it "Strong", ensuring they start the new account with a secure credential.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Corporate Password Policy Training</h3>
                    <p className="text-sm text-muted-foreground">A security officer uses this tool during an employee training session. They demonstrate how common, weak passwords get a low score, and then show how a long passphrase gets a high score, visually teaching employees the principles of creating better passwords.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Auditing System Passwords</h3>
                    <p className="text-sm text-muted-foreground">A system administrator is auditing the default passwords for a set of new network devices. They check each password's strength to determine if they are sufficiently random or if they need to be immediately changed to a more secure, generated password before deployment.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Justifying a Password Policy Change</h3>
                    <p className="text-sm text-muted-foreground">A developer wants to change their application's password requirement from a minimum of 8 characters with complexity to a minimum of 14 characters without complexity rules. They use this tool to demonstrate to management that a 14-character simple password has significantly higher entropy and is more secure than a shorter "complex" one, providing a data-driven reason for the policy change.</p>
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
                            <CardDescription className="text-xs">Struggling to create a strong password? Let our generator create a random, secure one for you.</CardDescription>
                        </CardHeader>
                    </Card>
                </Link>
                 <Link href="/tools/password-entropy-calculator" className="block">
                    <Card className="hover:border-primary transition-colors h-full">
                        <CardHeader>
                            <CardTitle className="text-base flex items-center justify-between">Password Entropy Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                            <CardDescription className="text-xs">Dive deeper into the math behind password strength by calculating entropy values.</CardDescription>
                        </CardHeader>
                    </Card>
                </Link>
                <Link href="/tools/hash-generator-md5-sha" className="block">
                    <Card className="hover:border-primary transition-colors h-full">
                        <CardHeader>
                            <CardTitle className="text-base flex items-center justify-between">Hash Generator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                            <CardDescription className="text-xs">Understand how websites should securely store your passwords by hashing them.</CardDescription>
                        </CardHeader>
                    </Card>
                </Link>
            </div>
        </section>
      </div>
    </>
  );
}
