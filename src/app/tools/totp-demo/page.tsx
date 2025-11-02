
import React from 'react';
import { PageHeader } from '@/components/page-header';
import { TotpDemo } from './totp-demo';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { BookOpen, AlertTriangle, Wand, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';

export const metadata = {
    title: 'Two-Factor Auth (2FA) TOTP Demo | ICT Toolbench',
    description: 'An interactive demo of Time-based One-Time Passwords (TOTP) used in 2FA. Scan a QR code, see the code sync, and understand how modern authentication works.',
    openGraph: {
        title: 'Two-Factor Auth (2FA) TOTP Demo | ICT Toolbench',
        description: 'Learn how 2FA and TOTP authenticator apps work with this live, interactive demonstration. Understand the roles of secret keys, time steps, and HMAC algorithms.',
        url: '/tools/totp-demo',
    }
};

const TotpDemoPage = () => {
    const softwareAppSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Two-Factor Auth TOTP Demo",
        "operatingSystem": "All",
        "applicationCategory": "SecurityApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "description": "An interactive, educational tool demonstrating how Time-based One-Time Passwords (TOTP) for two-factor authentication work.",
        "url": "https://www.icttoolbench.com/tools/totp-demo"
    };

    return (
    <>
      <StructuredData data={faqData} />
      <StructuredData data={howToSchema} />
      <StructuredData data={softwareAppSchema} />
      <div className="max-w-4xl mx-auto space-y-12">
        <PageHeader
          title="Two-Factor Authentication (TOTP) Demo"
          description="An interactive demonstration of how Time-based One-Time Passwords (TOTP), the technology behind apps like Google Authenticator, actually work. See the magic of shared secrets and time synchronization in action."
        />
        
        <TotpDemo />

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use This Demo</h2>
          <Card className="prose prose-sm max-w-none text-foreground p-6">
              <p>This tool provides a live simulation of a server-side TOTP implementation, allowing you to pair it with a real authenticator app on your phone.</p>
              <ol>
                  <li><strong>Generate a Secret:</strong> The tool automatically generates a new shared secret key and a corresponding QR code when you load the page. You can click "Regenerate Secret" at any time.</li>
                  <li><strong>Scan with Your App:</strong> Open an authenticator app on your phone (like Google Authenticator, Microsoft Authenticator, or Authy) and add a new account. Choose to scan a QR code and point your phone's camera at the QR code displayed in the tool.</li>
                  <li><strong>Observe Synchronization:</strong> Your authenticator app will now display a 6-digit code that changes every 30 seconds. You will see that the code displayed in this tool ("Server's Current Code") perfectly matches the one on your phone. The progress bar shows how much time is left before both codes change simultaneously.</li>
                  <li><strong>Verify a Code:</strong> You can type the code from your app into the "Verify Code" input field and click "Verify". The tool will confirm if the code is correct for the current time step.</li>
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
                  <CardTitle className="text-primary">Educational Deep Dive: How TOTP Secures Your Accounts</CardTitle>
              </div>
              <CardDescription>From shared secrets to HMAC algorithms, demystify the magic behind the 6-digit codes that protect your digital life.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
              <section>
                  <h3>Beyond the Password: The Need for 2FA</h3>
                  <p>
                    Passwords, even strong ones, have a fundamental weakness: if they are stolen, an attacker has full access. Data breaches, phishing attacks, and keyloggers make password theft a constant threat. This is where <strong>Two-Factor Authentication (2FA)</strong>, a subset of Multi-Factor Authentication (MFA), comes in. It adds a crucial second layer of security by requiring you to provide two different types of credentials to log in:
                  </p>
                  <ol>
                    <li>Something you <strong>know</strong> (your password).</li>
                    <li>Something you <strong>have</strong> (your phone, a physical security key).</li>
                  </ol>
                  <p>
                    Even if an attacker steals your password, they cannot log in without also having physical access to your second factor. This makes your account exponentially more secure.
                  </p>
              </section>
              <section>
                  <h3>How Does TOTP Work? The Secret Handshake</h3>
                  <p>
                    Time-based One-Time Password (TOTP) is the algorithm that powers most authenticator apps. It's an open standard (RFC 6238) that allows a server and a client (your phone) to independently generate the same code without communicating with each other. This is how it works:
                  </p>
                  <ul className="list-disc pl-5">
                     <li><strong>The Shared Secret:</strong> When you enable 2FA on a website, it generates a unique, secret key. This is the string of random characters you see, often also encoded into a QR code. When you scan the QR code, your authenticator app saves a copy of this secret key. This is the only time the key is ever shared.</li>
                     <li><strong>The Time Step:</strong> The algorithm uses the current Unix time as a moving factor. It divides the time by a specific interval, usually 30 seconds, to create a "time step" counter. This means for a 30-second window, the time value used in the calculation is the same.</li>
                     <li><strong>The HMAC Algorithm:</strong> Both the server and your app then take the shared secret key and the current time step and feed them into a cryptographic hashing function called HMAC (Hash-based Message Authentication Code). This tool uses HMAC-SHA1, a common standard. HMAC combines the secret and the time step to produce a unique hash.</li>
                     <li><strong>The 6-Digit Code:</strong> The resulting hash is a long string of characters. The algorithm performs a final step to truncate this hash down to a 6-digit number that is easy for a human to read and type.</li>
                  </ul>
                  <p>
                    Because both your phone and the server know the same secret key and use the same synchronized time, they both perform the exact same calculation and arrive at the exact same 6-digit code. When you enter the code to log in, the server simply performs the same calculation and checks if your code matches its own. If it does, it proves you are in possession of the secret key, and therefore, you are authenticated.
                  </p>
              </section>
          </CardContent>
        </Card>

        <section>
            <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Securing Your Email Account</h3>
                    <p className="text-sm text-muted-foreground">This is the most critical account to secure. By enabling 2FA on your email, you prevent an attacker who has stolen your password from gaining access, reading your emails, or using it to reset the passwords for all your other accounts.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Protecting Financial and Crypto Accounts</h3>
                    <p className="text-sm text-muted-foreground">For any service involving money, from banking apps to cryptocurrency exchanges, 2FA is non-negotiable. It provides a vital barrier against unauthorized transactions, even if your login credentials are compromised.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Securing Administrative Access</h3>
                    <p className="text-sm text-muted-foreground">System administrators protect their SSH access to servers, cloud provider dashboards (like AWS or Azure), and other critical infrastructure with MFA. This ensures that only authorized personnel with both a password and a second factor can make changes to production systems.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Gaming and Social Media Accounts</h3>
                    <p className="text-sm text-muted-foreground">Protecting your online identity is important. Enabling 2FA on your gaming accounts (like Steam or Epic Games) and social media profiles prevents takeovers, which can be used to scam your friends or sell your valuable in-game items.</p>
                </div>
            </div>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <div className='flex items-center gap-2'><Wand className="h-6 w-6 text-accent" /> <CardTitle>Pro Tips</CardTitle></div>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                        <li><strong>Backup Your 2FA:</strong> When you set up 2FA, most services provide a set of one-time-use "backup codes." Save these codes in a secure location (like a password manager). They are your only way to get back into your account if you lose your phone.</li>
                        <li><strong>Use a Cloud-Syncing App:</strong> Apps like Authy or 1Password can securely sync your 2FA secrets across multiple devices. This prevents you from being locked out if your primary phone is lost or damaged, a drawback of using Google Authenticator which stores secrets only on a single device.</li>
                        <li><strong>Prefer TOTP over SMS:</strong> If a service offers both app-based 2FA and SMS-based 2FA, always choose the app. SMS messages can be intercepted by sophisticated "SIM-swapping" attacks, making app-based TOTP the more secure option.</li>
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                     <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                </CardHeader>
                <CardContent>
                     <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                        <li><strong>Not Saving Backup Codes:</strong> This is the most common and disastrous mistake. Losing your phone without having backup codes can lead to being permanently locked out of your accounts.</li>
                        <li><strong>Phishing for 2FA Codes:</strong> Be aware of phishing attacks where a fake login page asks for your password and then immediately asks for your 2FA code. The attacker uses your credentials on the real site in real-time and enters the 2FA code you just gave them.</li>
                        <li><strong>Relying on 2FA Alone:</strong> 2FA is a powerful second layer, but it doesn't mean you can use a weak password. A strong, unique password is still your first line of defense. Use our <Link href="/tools/password-generator" className="text-primary hover:underline">Password Generator</Link> to create one.</li>
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
              <Link href="/tools/password-generator" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Password Generator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Create a strong, unique password, your first factor of authentication.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
              <Link href="/tools/password-entropy-calculator" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Password Entropy Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Understand the mathematical strength of your master password.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
              <Link href="/tools/hash-generator-md5-sha" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Hash Generator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Learn about the one-way hashing functions used in the TOTP algorithm.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
          </div>
      </section>
      </div>
    </>
  );
};

export default TotpDemoPage;
