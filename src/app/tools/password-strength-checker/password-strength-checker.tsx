'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { StructuredData } from '@/components/structured-data';
import { Progress } from '@/components/ui/progress';
import { Eye, EyeOff, CheckCircle, XCircle, KeyRound, BookOpen, AlertTriangle, Wand, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

// --- Password Analysis Logic ---
const checkPasswordStrength = (password: string) => {
    let score = 0;
    const checks = {
        length: password.length >= 12,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /\d/.test(password),
        specialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    };

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (checks.uppercase) score++;
    if (checks.lowercase) score++;
    if (checks.number) score++;
    if (checks.specialChar) score++;

    // Bonus for mixing character types
    const typesCount = Object.values(checks).filter(v => v === true).length - (checks.length ? 1 : 0);
    if (typesCount >= 3) score++;
    if (typesCount >= 4) score++;
    
    // Penalize common patterns
    if (/(.)\1\1/.test(password)) score = Math.max(0, score - 1); // Repeated characters
    if (/123|abc|password|qwerty/i.test(password)) score = Math.max(0, score - 2);

    return { score: Math.min(score, 8), checks };
};

const calculateEntropy = (password: string) => {
    if (!password) return 0;
    let charPool = 0;
    if (/[a-z]/.test(password)) charPool += 26;
    if (/[A-Z]/.test(password)) charPool += 26;
    if (/\d/.test(password)) charPool += 10;
    if (/[^a-zA-Z0-9]/.test(password)) charPool += 32; // Approximate special characters
    if (charPool === 0) return 0;
    
    const entropy = password.length * Math.log2(charPool);
    return parseFloat(entropy.toFixed(2));
};

const getStrengthLabel = (score: number, length: number) => {
    if (length === 0) return { label: 'Start Typing...', color: 'bg-muted' };
    if (score < 3) return { label: 'Very Weak', color: 'bg-red-500' };
    if (score < 4) return { label: 'Weak', color: 'bg-orange-500' };
    if (score < 6) return { label: 'Medium', color: 'bg-yellow-500' };
    if (score < 8) return { label: 'Strong', color: 'bg-green-500' };
    return { label: 'Very Strong', color: 'bg-emerald-600' };
};

// --- FAQ & Schema Data ---
const faqData = [
    { question: "Why is password length so important?", answer: "Length is the single most important factor in password strength. Each character you add increases the number of possible combinations exponentially, making it much harder for attackers to guess or 'brute-force' your password. A short, complex password is often weaker than a long, simpler passphrase." },
    { question: "What is password entropy?", answer: "Entropy is a measure of a password's randomness or unpredictability. It's measured in 'bits.' A higher bit value means the password is more secure. For example, a password with 80 bits of entropy is astronomically harder to crack than one with 40 bits. The calculation is based on the password's length and the size of the character set used (e.g., lowercase, uppercase, numbers, symbols)." },
    { question: "Is it safe to type my password into this tool?", answer: "Yes. This password strength checker operates entirely within your browser. Your password is never sent over the internet or stored anywhere. All calculations are performed on your local machine using JavaScript." },
    { question: "Are passphrases better than complex passwords?", answer: "Often, yes. A long passphrase like 'Correct-Horse-Battery-Staple' is easier for a human to remember but has high entropy due to its length, making it very difficult for a computer to crack. This is often a better strategy than a short, complex password like 'Tr0ub4d&r' that is hard to remember." },
    { question: "Why should I avoid using personal information?", answer: "Attackers often use information they know about you (your name, birthday, pet's name, etc.) in 'dictionary attacks.' They will try common words and personal details first. A password should be completely random and unrelated to your personal life." },
    { question: "What is a 'brute-force' attack?", answer: "A brute-force attack is a method where an attacker systematically tries every possible combination of characters until they find the correct password. The stronger and longer your password, the more time and computing power this attack requires, making it impractical." },
    { question: "Why is using the same password on multiple sites dangerous?", answer: "This is called password reuse. If one site you use suffers a data breach and your password is leaked, attackers will try that same email and password combination on hundreds of other popular sites (like banking, email, and social media). This is known as 'credential stuffing.' Using a unique password for every site is critical." },
    { question: "What is a password manager and should I use one?", answer: "A password manager is a secure application designed to store and manage all your passwords in an encrypted vault. It allows you to generate and use long, complex, unique passwords for every site without having to memorize them. You only need to remember one master password. Using a password manager is one of the most effective security practices you can adopt." },
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

// --- Component ---
export function PasswordStrengthChecker() {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const { score, checks } = useMemo(() => checkPasswordStrength(password), [password]);
    const entropy = useMemo(() => calculateEntropy(password), [password]);
    const { label, color } = useMemo(() => getStrengthLabel(score, password.length), [score, password.length]);

    const strengthPercentage = password.length > 0 ? (score / 8) * 100 : 0;
    
    const checklistItems = [
        { label: "At least 12 characters long", met: checks.length },
        { label: "Contains lowercase letters (a-z)", met: checks.lowercase },
        { label: "Contains uppercase letters (A-Z)", met: checks.uppercase },
        { label: "Contains numbers (0-9)", met: checks.number },
        { label: "Contains special characters (!@#...)", met: checks.specialChar },
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <StructuredData data={faqData.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } }))} />
            <StructuredData data={howToSchema} />
            <Card>
                <CardHeader>
                    <CardTitle>Real-Time Password Analyzer</CardTitle>
                    <CardDescription>
                        Enter a password below to see a real-time analysis of its strength.
                        <span className="block mt-2 font-semibold text-destructive">This tool is 100% client-side. Your password never leaves your browser.</span>
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="password-input">Password</Label>
                        <div className="relative">
                            <Input
                                id="password-input"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password to test"
                                className="pr-10"
                                aria-label="Password to check"
                            />
                            <Button
                                size="icon"
                                variant="ghost"
                                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                        </div>
                    </div>
                    
                    <div className='space-y-3'>
                         <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Strength: <span className={cn('font-bold', color.replace('bg-', 'text-'))}>{label}</span></span>
                             <span className="text-sm font-medium">Entropy: <span className="font-bold font-code">{entropy} bits</span></span>
                         </div>
                        <Progress value={strengthPercentage} className={cn('h-3 transition-all', color)} />
                    </div>

                    <div>
                        <ul className="space-y-2">
                           {checklistItems.map((item, index) => (
                               <li key={index} className={cn("flex items-center text-sm", item.met ? 'text-green-600' : 'text-muted-foreground')}>
                                   {item.met ? <CheckCircle className="h-4 w-4 mr-2" /> : <XCircle className="h-4 w-4 mr-2" />}
                                   {item.label}
                               </li>
                           ))}
                        </ul>
                    </div>

                </CardContent>
            </Card>

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
                        <h3 className="font-bold text-xl">Beyond Complexity: Why Length is King</h3>
                        <p>For decades, we were taught that a "complex" password with a mix of symbols, numbers, and cases was the key to security. While character variety is important, modern password cracking techniques have shown that **length is the single most dominant factor in password strength.**</p>
                        <p>An attacker's primary method is the brute-force attack, where they try every possible combination. Each character you add to your password increases the number of possible combinations exponentially. A 10-character password using all character types is significantly stronger than an 8-character one, and a 16-character password is astronomically stronger still. This is why many security experts now recommend longer "passphrases" (e.g., `GreenDeskRunFast47!`) over shorter, more complex, and harder-to-remember passwords (e.g., `G#4rF&9k`).</p>
                    </section>
                     <section>
                        <h3 className="font-bold text-xl">Understanding Entropy: The True Measure of Strength</h3>
                        <p>The "Strength" meter gives you a general idea, but the **Entropy** value provides a precise, mathematical measure of a password's unpredictability. Entropy is measured in "bits." The higher the number of bits, the more random and secure the password is. Here’s a simple guide to interpreting entropy values:</p>
                        <ul className="list-disc pl-5">
                           <li>**Below 40 bits:** Very Weak. Can be cracked almost instantly by modern hardware.</li>
                            <li>**40 - 60 bits:** Weak. Vulnerable to standard brute-force attacks.</li>
                            <li>**60 - 80 bits:** Medium. Reasonably secure against casual attackers but potentially vulnerable to dedicated, high-powered attacks.</li>
                            <li>**80 - 120 bits:** Strong. Considered secure for most purposes. It would take centuries or longer to crack with current technology.</li>
                            <li>**Above 120 bits:** Very Strong. Overkill for most uses, but provides extreme security, resistant even to future advances in computing power (for the foreseeable future).</li>
                        </ul>
                        <p>Entropy is calculated based on two factors: the length of the password and the size of the character pool it draws from (lowercase, uppercase, numbers, symbols). Adding just one character type (e.g., a single number to an all-lowercase password) can significantly increase the character pool and boost the entropy.</p>
                    </section>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <div className='flex items-center gap-2'><Wand className="h-6 w-6 text-accent" /> <CardTitle>Pro Tips for Password Security</CardTitle></div>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                            <li><strong>Use a Password Manager:</strong> The single best thing you can do for your security. A password manager can generate and store long, unique, random passwords for every website. You only need to remember one strong master password.</li>
                            <li><strong>Embrace Passphrases:</strong> Create a long password from a memorable but random sequence of words. `Correct-Horse-Battery-Staple` is a famous example. It's easy to remember but incredibly hard to crack.</li>
                            <li><strong>Enable Two-Factor Authentication (2FA):</strong> 2FA adds a second layer of security, usually a code from your phone. Even if an attacker steals your password, they can't log in without this second factor. Enable it everywhere you can.</li>
                            <li><strong>Be Unique:</strong> Never reuse passwords across different websites. If one site is breached, attackers will use your leaked credentials to try to access your other accounts.</li>
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                         <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                    </CardHeader>
                    <CardContent>
                         <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                            <li><strong>Predictable Substitutions:</strong> Avoid common substitutions like `P@ssw0rd` for 'Password'. Attackers' dictionaries are programmed to check for these (e.g., 'a' -> '@', 'o' -> '0', 'i' -> '1').</li>
                            <li><strong>Using Personal Information:</strong> Don't use your name, birthday, pet's name, or other easily guessable information. Attackers use this personal data in targeted attacks.</li>
                            <li><strong>Sequential Keyboard Patterns:</strong> Avoid patterns like `qwerty`, `asdfgh`, or `123456`. These are among the first things a cracking program will try.</li>
                            <li><strong>Incrementing Passwords:</strong> Don't just change the number at the end of your password when forced to update (e.g., from `Summer2023!` to `Summer2024!`). This is a predictable pattern that offers little additional security.</li>
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
                                    <AccordionContent>{item.answer}</AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>
            </section>
            
            <section>
                <h2 className="text-2xl font-bold mb-4">Related Tools & Articles</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Link href="/tools/password-generator" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">Password Generator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">Struggling to create a strong password? Let our generator create a random, secure one for you.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                    <Link href="/tools/hash-generator" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">Hash Generator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">Understand how websites store your passwords securely by hashing them.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                    <Link href="/tools/totp-demo" className="block">
                        <Card className="hover:border-primary transition-colors h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center justify-between">Two-Factor Auth Demo<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                <CardDescription className="text-xs">Learn about the technology behind the second factor that protects your accounts.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                </div>
            </section>
        </div>
    );
}
