
import React from 'react';
import { PageHeader } from '@/components/page-header';
import { PasswordGenerator } from './password-generator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { BookOpen, AlertTriangle, Wand, ChevronRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const metadata = {
    title: 'Secure Password Generator | ICT Toolbench',
    description: 'Generate strong, secure, and random passwords with customizable length and character sets. Our tool helps you create unguessable passwords for all your online accounts.',
    openGraph: {
        title: 'Secure Password Generator | ICT Toolbench',
        description: 'Create cryptographically secure and random passwords to enhance your digital security. Fully customizable and operates client-side for privacy.',
        url: '/tools/password-generator',
    }
};

const PasswordGeneratorPage = () => {
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
    "name": "Secure Password Generator",
    "operatingSystem": "All",
    "applicationCategory": "SecurityApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "A free, client-side tool to generate strong, random, and customizable passwords to enhance digital security.",
    "url": "https://www.icttoolbench.com/tools/password-generator"
  };

  return (
    <>
      <StructuredData data={faqSchema} />
      <StructuredData data={howToSchema} />
      <StructuredData data={softwareAppSchema} />
      <div className="max-w-4xl mx-auto space-y-12">
        <PageHeader
          title="Secure Password Generator"
          description="Create strong, random, and unique passwords to protect your digital identity. Customize the length and character sets to meet any requirement, and instantly check the strength of your new password."
        />
        
        <PasswordGenerator />

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use the Password Generator</h2>
          <Card className="prose prose-sm max-w-none text-foreground p-6">
              <p>This tool helps you create strong, unpredictable passwords to secure your accounts. The generated password is also fed into a strength checker on the right for immediate feedback.</p>
              <ol>
                  <li><strong>Set the Length:</strong> Use the slider to choose a password length. For strong security, aim for <strong>16 characters or more</strong>.</li>
                  <li><strong>Select Character Sets:</strong> Check the boxes to include lowercase letters, uppercase letters, numbers, and/or symbols. The more sets you include, the stronger the password will be.</li>
                  <li><strong>Exclude Characters (Optional):</strong> If you need to avoid ambiguous characters (like 'I', 'l', '1', 'O', '0'), you can leave them in the exclusion box.</li>
                  <li><strong>Generate Password:</strong> Click the "Generate Password" button. A new, secure password will be created based on your settings.</li>
                  <li><strong>Copy and Use:</strong> Click the copy icon to copy the password to your clipboard. It is highly recommended to save this password in a secure <a href="#password-manager-faq">password manager</a> rather than trying to memorize it.</li>
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
                  <CardTitle className="text-primary">Educational Deep Dive: The Anatomy of a Secure Password</CardTitle>
              </div>
              <CardDescription>From randomness and entropy to the pitfalls of human psychology, understand what truly makes a password secure in an age of sophisticated attacks.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
              <section>
                  <h3>Why "Password123" is a Catastrophe</h3>
                  <p>
                    The single biggest mistake in password creation is human predictability. We are creatures of habit, drawn to simple patterns, common words, and personal information. Attackers know this. They don't start by guessing random letters; they start with <strong>dictionary attacks</strong>, using massive lists of common passwords, names, places, and simple keyboard patterns (like "qwerty"). A password like "Password123!" might seem to meet complexity requirements, but it will be one of the first things an attacker tries.
                  </p>
                  <p>
                    A truly secure password has one key property: <strong>randomness</strong>. It should be an unpredictable string of characters that gives an attacker no clues. This is why using a password generator is fundamentally more secure than creating one yourself. A computer is far better at generating true randomness than a human.
                  </p>
              </section>
              <section>
                  <h3>Entropy: The Mathematical Measure of Strength</h3>
                  <p>
                    The security of a password is mathematically measured in <strong>entropy</strong>, expressed in "bits". Entropy quantifies a password's unpredictability. Every bit of entropy doubles the number of possible combinations an attacker would have to guess in a brute-force attack.
                  </p>
                  <p>
                    Entropy is calculated based on the password's length and the size of the character pool used. This is why a long passphrase of four random words can be stronger than a short, complex password. The sheer length creates a much larger number of possible combinations. You can analyze this directly with our <Link href="/tools/password-entropy-calculator" className="text-primary hover:underline">Password Entropy Calculator</Link>. For a quick check on any password, this page includes our <Link href="/tools/password-strength-checker" className="text-primary hover:underline">Password Strength Checker</Link>.
                  </p>
              </section>
               <section>
                  <h3>The Importance of Uniqueness</h3>
                  <p>
                    One of the most common and dangerous security mistakes is <strong>password reuse</strong>. Using the same password for multiple websites is like using the same key for your house, your car, and your office. If a thief steals one key, they have access to everything.
                  </p>
                   <p>
                    Data breaches are now a common occurrence. When a website you use is breached, your password may be leaked onto the dark web. Attackers then take these lists of emails and passwords and use automated bots to try them on hundreds of other high-value sites (your email, bank, social media). This attack, called "credential stuffing," is a leading cause of account takeovers. The only effective defense is to use a <strong>unique, strong password for every single account</strong>, a task that is only feasible with a password manager.
                  </p>
              </section>
          </CardContent>
        </Card>
        
        <section>
            <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Creating New User Accounts</h3>
                    <p className="text-sm text-muted-foreground">When signing up for a new online service, instead of trying to invent a memorable but weak password, use the generator to create a 16+ character random password. Save it directly to your password manager. This ensures your new account is secure from day one without the mental effort.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Generating API Keys and Secrets</h3>
                    <p className="text-sm text-muted-foreground">A developer needs to generate a client secret for an OAuth 2.0 application. This secret must be highly random and unguessable. They use the generator to create a 48-character alphanumeric string. Since this key will only be used by machines, memorability is irrelevant, and maximum entropy is the goal. For this purpose, they can use our <Link href='/tools/random-string-generator' className='text-primary hover:underline'>Random String Generator</Link> tool.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Securing a Home Wi-Fi Network</h3>
                    <p className="text-sm text-muted-foreground">To prevent neighbors or unauthorized users from accessing their home network, a user generates a long, 24-character random password including letters, numbers, and symbols. While slightly inconvenient to enter the first time, it provides strong protection for all devices on the network. They can then share this password with guests via their phone's QR code feature.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Setting Up a New Server or Database</h3>
                    <p className="text-sm text-muted-foreground">A system administrator is provisioning a new database server. To secure the root user account, they generate a 32-character random password. This password is then stored securely in the company's enterprise password vault and is never written down or memorized, ensuring the database is protected against brute-force attacks from its inception.</p>
                </div>
            </div>
        </section>

         <section>
            <h2 className="text-2xl font-bold mb-4">Practical Tips for Password Nirvana</h2>
             <Card>
                <CardContent className="p-6">
                    <ul className="space-y-4">
                        <li className="flex items-start gap-4">
                            <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                            <div>
                                <h4 className="font-semibold">Use a Password Manager</h4>
                                <p className="text-sm text-muted-foreground">
                                    This is the most important step. A password manager (like Bitwarden, 1Password, or LastPass) generates, stores, and fills in unique, strong passwords for you. You only need to remember one strong master password.
                                </p>
                            </div>
                        </li>
                        <li className="flex items-start gap-4">
                            <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                            <div>
                                <h4 className="font-semibold">Enable Two-Factor Authentication (2FA)</h4>
                                <p className="text-sm text-muted-foreground">
                                    Enable 2FA (or MFA) on every account that supports it. This requires a second code (usually from your phone) to log in, meaning an attacker can't get in even if they steal your password.
                                </p>
                            </div>
                        </li>
                         <li className="flex items-start gap-4">
                            <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                            <div>
                                <h4 className="font-semibold">Aim for Length</h4>
                                <p className="text-sm text-muted-foreground">
                                    When creating a master password or a password for a critical account, prioritize length. A four-word random passphrase is an excellent, memorable, and highly secure option.
                                </p>
                            </div>
                        </li>
                        <li className="flex items-start gap-4">
                            <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                            <div>
                                <h4 className="font-semibold">Be Wary of Public Wi-Fi</h4>
                                <p className="text-sm text-muted-foreground">
                                    Avoid logging into sensitive accounts on public Wi-Fi networks unless you are using a VPN. An attacker on the same network could potentially intercept your traffic.
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
                        <li><strong>For API Keys:</strong> Generate long (32+ characters), fully random strings using all character sets for maximum security. Since you won't need to type them, memorability is irrelevant.</li>
                        <li><strong>For Wi-Fi Passwords:</strong> Generate a long (20+ characters) password. It's a one-time entry for most devices, so complexity is fine.</li>
                        <li><strong>For Master Passwords:</strong> Consider a long passphrase made of 4-6 random, unrelated words. It's easier to type on mobile devices than a complex password and has extremely high entropy.</li>
                        <li><strong>Exclude Ambiguous Characters:</strong> If you ever need to read a password over the phone, use the "Exclude Characters" feature to remove easily confused characters like 'I', 'l', '1', 'O', and '0'.</li>
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                     <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                </CardHeader>
                <CardContent>
                     <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                        <li><strong>Writing Passwords Down:</strong> Never write passwords on sticky notes or in unencrypted text files. This completely defeats the purpose of a strong password.</li>
                        <li><strong>Reusing Passwords:</strong> The cardinal sin of password security. A single data breach at one site will compromise all your accounts that share that password.</li>
                        <li><strong>Using Predictable Patterns:</strong> Don't create "formulas" for your passwords, like "Facebook2024!" and "Google2024!". Attackers can easily guess this pattern if one of your passwords is breached.</li>
                        <li><strong>Trusting Browser Password Managers for Everything:</strong> While convenient, dedicated password managers offer better security features, cross-platform syncing, and secure sharing options.</li>
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
                          <AccordionItem value={`item-${index}`} id={item.id} key={index}>
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
                          <CardDescription className="text-xs">Analyze the strength of your existing passwords or the one you just generated.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
               <Link href="/tools/password-entropy-calculator" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Password Entropy Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Dive deeper into the math of password security by calculating entropy in bits.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
              <Link href="/tools/hash-generator-md5-sha" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Hash Generator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Learn how your passwords should be securely stored using one-way hashing.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
          </div>
      </section>
      </div>
    </>
  );
};

export default PasswordGeneratorPage;
