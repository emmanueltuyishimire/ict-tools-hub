
import React from 'react';
import { PageHeader } from '@/components/page-header';
import { SqlInjectionTester } from './sql-injection-tester';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { BookOpen, AlertTriangle, Wand, ChevronRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const metadata = {
    title: 'SQL Injection Tester | Educational Tool | ICT Toolbench',
    description: 'Learn how SQL injection attacks work in a safe, interactive environment. Our educational tool demonstrates this critical web security vulnerability and teaches you how to prevent it.',
    openGraph: {
        title: 'SQL Injection Tester | Educational Tool | ICT Toolbench',
        description: 'An interactive guide to understanding and preventing SQL injection, one of the most common and dangerous web application vulnerabilities.',
        url: '/tools/sql-injection-tester',
    }
};

const SqlInjectionTesterPage = () => {
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
      "name": "SQL Injection Tester (Educational)",
      "operatingSystem": "All",
      "applicationCategory": "SecurityApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "An interactive, educational tool to demonstrate how SQL injection vulnerabilities work in a safe, client-side environment.",
      "url": "https://www.icttoolbench.com/tools/sql-injection-tester"
    };

    return (
        <>
            <StructuredData data={faqSchema} />
            <StructuredData data={howToSchema} />
            <StructuredData data={softwareAppSchema} />
            <div className="max-w-4xl mx-auto space-y-12">
                <PageHeader
                    title="SQL Injection Tester (Educational)"
                    description="This tool provides a safe, simulated environment to demonstrate and understand one of the most common and dangerous web security vulnerabilities: SQL Injection. See how improperly constructed queries can lead to unauthorized access."
                />
                
                <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>For Educational Purposes Only</AlertTitle>
                    <AlertDescription>
                        Never attempt to use these techniques on any website or application you do not own. Unauthorized security testing is illegal. This tool operates entirely in your browser and does not interact with a real database.
                    </AlertDescription>
                </Alert>

                <SqlInjectionTester />

                <section>
                    <h2 className="text-2xl font-bold mb-4">How to Use the SQL Injection Simulator</h2>
                    <Card className="prose prose-sm max-w-none text-foreground p-6">
                        <p>This interactive tool simulates a vulnerable login page to demonstrate how SQL injection works.</p>
                        <ol>
                            <li><strong>Examine the Code:</strong> The tool displays the insecure server-side code that builds the SQL query. Notice how it directly concatenates user input into the query string.</li>
                            <li><strong>Try a Normal Login:</strong> Enter a valid username (`admin`) and password (`password123`) from the sample data table to see a successful login.</li>
                            <li><strong>Attempt an Injection Attack:</strong>
                                <ul>
                                    <li>In the "Username" field, enter: <code className="font-code bg-muted p-1 rounded-sm">admin'--</code></li>
                                    <li>Leave the password field empty.</li>
                                    <li>Click "Login".</li>
                                </ul>
                            </li>
                            <li><strong>Analyze the Result:</strong> Observe the "Executed Query" box. The `--` acts as a comment in SQL, effectively removing the rest of the original query, including the password check. The tool will show that the login was successful, demonstrating how the authentication was bypassed.</li>
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
                            <CardTitle className="text-primary">Educational Deep Dive: Anatomy of a SQL Injection Attack</CardTitle>
                        </div>
                        <CardDescription>From unsanitized input to database compromise, understand the mechanics of this critical vulnerability and the best practices for prevention.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                        <section>
                            <h3>What is SQL Injection (SQLi)?</h3>
                            <p>
                                SQL Injection is a code injection technique used to attack data-driven applications. It occurs when an attacker can insert, or "inject," malicious SQL statements into an application's queries, which are then executed by the backend database. A successful SQLi attack can read sensitive data, modify database data, execute administrative operations on the database, and in some cases, issue commands to the operating system. It remains one of the oldest, most prevalent, and most damaging types of web application vulnerabilities.
                            </p>
                        </section>
                        <section>
                            <h3>The Root Cause: Mixing Code and Data</h3>
                            <p>
                                The vulnerability exists when an application builds its SQL queries by directly concatenating user-supplied input into the query string. This fundamentally mixes the data (the user's input) with the code (the SQL statement). An attacker can provide specially crafted input that breaks out of the data context and is interpreted by the database as part of the command itself.
                            </p>
                            <p>
                                Look at the vulnerable code from our simulation:
                            </p>
                            <div className="bg-muted p-4 rounded-md font-code text-sm">
                                <pre>
const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
                                </pre>
                            </div>
                            <p>
                                When a normal user logs in, `username` is `'admin'` and `password` is `'password123'`, resulting in a valid query. But when an attacker enters `' OR 1=1--` as the username, the query becomes:
                            </p>
                             <div className="bg-muted p-4 rounded-md font-code text-sm">
                                <pre>
SELECT * FROM users WHERE username = ''<span className='text-red-500'> OR 1=1--</span>' AND password = ''
                                </pre>
                            </div>
                             <p>
                                The `--` is a comment operator in SQL. The database sees the condition as `WHERE username = '' OR 1=1`, which is always true. It ignores the rest of the line, including the password check. The query then returns all users, and the application, seeing that rows were returned, logs the attacker in.
                            </p>
                        </section>
                         <section>
                            <h3>The Solution: Parameterized Queries (Prepared Statements)</h3>
                            <p>
                                The definitive way to prevent SQL injection is to <strong>never, ever concatenate user input directly into a SQL string.</strong> Instead, you must use <strong>parameterized queries</strong>, also known as prepared statements.
                            </p>
                            <p>
                                This technique separates the SQL command from the data. The application first sends the query structure with placeholders to the database:
                            </p>
                            <div className="bg-muted p-4 rounded-md font-code text-sm">
                                <pre>
SELECT * FROM users WHERE username = <span className='text-blue-500'>?</span> AND password = <span className='text-blue-500'>?</span>;
                                </pre>
                            </div>
                            <p>
                               The database parses this query and "prepares" it. The application then sends the user's input separately. The database engine treats this input strictly as data and safely inserts it into the placeholders. Even if an attacker provides malicious input, it is never executed as code; it is only treated as a literal string to be compared, and the login will fail.
                            </p>
                        </section>
                    </CardContent>
                </Card>
                
                <section>
                    <h2 className="text-2xl font-bold mb-4">Practical Tips for Prevention</h2>
                     <Card>
                        <CardContent className="p-6">
                            <ul className="space-y-4">
                                <li className="flex items-start gap-4">
                                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold">Always Use Parameterized Queries</h4>
                                        <p className="text-sm text-muted-foreground">
                                           This is the most important rule. Whatever your programming language or database library, it will have a standard, safe way to execute parameterized queries. Use it exclusively for all database interactions.
                                        </p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold">Use an ORM</h4>
                                        <p className="text-sm text-muted-foreground">
                                           Object-Relational Mapping (ORM) libraries (like Sequelize for Node.js, SQLAlchemy for Python, or Hibernate for Java) generally use parameterized queries by default, providing a layer of protection automatically.
                                        </p>
                                    </div>
                                </li>
                                 <li className="flex items-start gap-4">
                                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold">Principle of Least Privilege</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Configure your application's database user with only the minimum permissions it needs. For example, a user account for a public-facing website should only have `SELECT`, `INSERT`, and `UPDATE` permissions, not `DROP TABLE` or administrative rights. This limits the damage an attacker can do even if an injection vulnerability is found.
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </CardContent>
                     </Card>
                </section>
                
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
            </div>
        </>
    );
};

export default SqlInjectionTesterPage;

```
  </change>
  <change>
    <file>/src/app/tools/sql-injection-tester/schema.ts</file>
    <content><![CDATA[
export const faqData = [
    { question: "What is SQL Injection?", answer: "SQL Injection is a code injection technique where an attacker inserts malicious SQL code into an application's queries. This can allow them to bypass authentication, read sensitive data, modify data, and potentially take control of the database server. It is one of the most common and dangerous web application vulnerabilities." },
    { question: "Why is this tool for educational purposes only?", answer: "This tool simulates a vulnerable system in a safe, client-side environment. Attempting SQL injection techniques on a real website or application that you do not own is illegal and can cause serious damage. This tool is designed to teach you how to recognize and prevent the vulnerability, not to perform real attacks." },
    { question: "What is the root cause of SQL Injection?", answer: "The vulnerability occurs when an application builds its SQL queries by directly concatenating user-supplied input into the query string. This mixes data and code, allowing an attacker to provide input that the database interprets as part of the command itself." },
    { question: "What is the `' OR 1=1 --` attack?", answer: "This is a classic authentication bypass attack. By injecting this string into a username field, the attacker changes the query's logic. The `OR 1=1` clause is always true, and the `--` comments out the rest of the query (including the password check), causing the database to return a valid user and grant access." },
    { question: "How do I prevent SQL Injection?", answer: "The most effective method is to use **parameterized queries** (also known as prepared statements). This technique strictly separates the SQL command from the user data, ensuring that user input is always treated as data and never as executable code. Using a modern ORM (Object-Relational Mapper) also provides a high level of protection by default." },
    { question: "Is sanitizing user input enough to prevent SQLi?", answer: "No. While input sanitization (like stripping out single quotes) can help, it's a fragile, blacklist-based approach. Attackers are constantly finding new ways to bypass sanitization filters. Parameterized queries are the only truly reliable defense." },
    { question: "Does this tool connect to a real database?", answer: "No. It uses a simple JavaScript array of objects to simulate a 'users' table. All query 'execution' happens locally in your browser, making it completely safe to experiment with." },
    { question: "What are other types of SQL Injection attacks?", answer: "Beyond authentication bypass, attackers can use `UNION`-based attacks to extract data from other tables, `error-based` attacks to reveal database structure through error messages, and `blind` SQL injection to infer data bit by bit when the application doesn't return direct results." },
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Use the SQL Injection Simulator',
    description: 'A step-by-step guide to demonstrating an SQL injection vulnerability.',
    step: [
        { '@type': 'HowToStep', name: 'Step 1: Examine the Vulnerable Code', text: 'Observe the example code that shows how user input is being insecurely concatenated into a SQL query.' },
        { '@type': 'HowToStep', name: 'Step 2: Try a Normal Login', text: 'Enter a valid username and password from the sample data table to see how a legitimate login query is constructed.' },
        { '@type': 'HowToStep', name: 'Step 3: Attempt an Injection', text: 'In the username field, enter an injection string like `admin\'--`. Leave the password field blank.' },
        { '@type': 'HowToStep', name: 'Step 4: Analyze the Executed Query', text: 'Observe how your input has altered the SQL query, causing the password check to be ignored. The simulator will show a 'successful' login, demonstrating the bypass.' },
    ],
    totalTime: 'PT2M'
};

export const keyTerminologies = [
    { term: 'SQL Injection (SQLi)', definition: 'A web security vulnerability that allows an attacker to interfere with the queries that an application makes to its database.' },
    { term: 'Parameterized Queries (Prepared Statements)', definition: 'The primary defense against SQLi. A technique where the SQL query and the user-supplied data are sent to the database separately, preventing the data from being interpreted as code.' },
    { term: 'Authentication Bypass', definition: 'A common goal of SQLi where an attacker bypasses a login form without needing a valid password.' },
    { term: 'Concatenation', definition: 'The process of joining strings together. In this context, insecurely joining user input directly into a SQL query string, which is the root cause of the vulnerability.' },
    { term: 'Database Schema', definition: 'The structure of a database, including its tables, columns, and relationships. An attacker can often extract schema information using SQLi.' },
    { term: 'ORM (Object-Relational Mapper)', definition: 'A library that provides a high-level abstraction over a database. Modern ORMs use parameterized queries by default, helping to prevent SQLi.' },
];
```
  </change>
  <change>
    <file>/src/app/tools/sql-injection-tester/sql-injection-tester.tsx</file>
    <content><![CDATA[
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ShieldAlert, ShieldCheck, LogIn, Server, User, KeyRound } from 'lucide-react';
import { CodeBlock } from '@/components/code-block';

// Sample in-memory "database"
const usersTable = [
    { id: 1, username: 'admin', password: 'password123', role: 'administrator' },
    { id: 2, name: 'bob', password: 'bobspassword', role: 'user' },
];

export function SqlInjectionTester() {
    const [username, setUsername] = useState("admin'--");
    const [password, setPassword] = useState('');
    const [query, setQuery] = useState('');
    const [result, setResult] = useState<{ status: 'success' | 'failure'; message: string; data?: any } | null>(null);

    const handleLogin = () => {
        // --- THIS IS THE VULNERABLE PART ---
        // In a real application, this would be a database query.
        // We are simulating the insecure string concatenation here.
        const constructedQuery = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
        setQuery(constructedQuery);

        // --- SIMULATED EXECUTION ---
        // This is a simplified check to demonstrate the bypass. A real DB would parse the query.
        if (username.includes("'--") || username.toLowerCase().includes("' or 1=1--")) {
            setResult({
                status: 'success',
                message: 'Authentication Bypassed! The query returned a user without a valid password.',
                data: usersTable[0] // Return the admin user
            });
        } else {
            const user = usersTable.find(u => u.username === username && u.password === password);
            if (user) {
                setResult({
                    status: 'success',
                    message: 'Login successful.',
                    data: user
                });
            } else {
                setResult({
                    status: 'failure',
                    message: 'Login failed. Invalid username or password.'
                });
            }
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left side: The Tool */}
            <Card>
                <CardHeader>
                    <CardTitle>Vulnerable Login Form</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="username"><User className="inline-block h-4 w-4 mr-1" /> Username</Label>
                        <Input
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                            className="font-code"
                            autoComplete="off"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password"><KeyRound className="inline-block h-4 w-4 mr-1" /> Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            className="font-code"
                             autoComplete="new-password"
                        />
                    </div>
                    <Button onClick={handleLogin} className="w-full">
                        <LogIn className="mr-2 h-4 w-4" /> Login
                    </Button>
                </CardContent>
            </Card>

            {/* Right side: The Explanation */}
            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle>Simulation Details</CardTitle>
                    <CardDescription>See what happens on the "server".</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <h4 className="font-semibold mb-2">Vulnerable Server-Side Code:</h4>
                        <CodeBlock
                            language="javascript"
                            code={`// THIS IS INSECURE!
const query = \`SELECT * FROM users WHERE username = '\${username}' AND password = '\${password}'\`;
// The database executes this query string.`}
                        />
                    </div>
                    {query && (
                        <div>
                             <h4 className="font-semibold mb-2">Executed Query:</h4>
                             <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription className="font-code break-all">{query}</AlertDescription>
                            </Alert>
                        </div>
                    )}
                    {result && (
                         <div>
                            <h4 className="font-semibold mb-2">Result:</h4>
                            {result.status === 'success' ? (
                                <Alert className="border-green-500/50">
                                    <ShieldCheck className="h-4 w-4 text-green-600" />
                                    <AlertTitle className="text-green-700">Success!</AlertTitle>
                                    <AlertDescription>
                                        {result.message} <br/>
                                        <span className="font-code text-xs">Logged in as: {JSON.stringify(result.data)}</span>
                                    </AlertDescription>
                                </Alert>
                            ) : (
                                <Alert>
                                    <ShieldAlert className="h-4 w-4"/>
                                    <AlertTitle>Failure</AlertTitle>
                                    <AlertDescription>{result.message}</AlertDescription>
                                </Alert>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
```
  </change>
  <change>
    <file>/src/lib/tools.ts</file>
    <content><![CDATA[
import {
  type LucideIcon,
  Network,
  Server,
  Code2,
  Shield,
  Cloud,
  Database,
  BookOpen,
  BrainCircuit,
  Wrench,
  Boxes,
  Sparkles,
  FileCode2,
  Calculator,
  Palette,
  Timer,
  KeyRound,
  FileCheck,
} from 'lucide-react';

export type Tool = {
  name: string;
  slug: string;
  description: string;
};

export type ToolCategory = {
  name: string;
  icon: LucideIcon;
  tools: Tool[];
};

export const toolCategories: ToolCategory[] = [
  {
    name: 'Networking & IP Tools',
    icon: Network,
    tools: [
      { name: 'IP Address to Binary Converter', slug: 'ip-to-binary', description: 'Convert IPv4 addresses to binary format.' },
      { name: 'Binary to IP Address Converter', slug: 'binary-to-ip', description: 'Convert binary strings to IPv4 addresses.' },
      { name: 'Subnet Calculator', slug: 'subnet-calculator', description: 'Calculate network ranges, broadcast addresses, and available hosts for any subnet.' },
      { name: 'Subnet Mask Converter', slug: 'subnet-mask-converter', description: 'Convert between CIDR, wildcard, and subnet masks.' },
      { name: 'VLSM Calculator', slug: 'vlsm-calculator', description: 'Design efficient network schemes with Variable Length Subnet Masking.' },
      { name: 'Network Bandwidth Estimator', slug: 'bandwidth-estimator', description: 'Estimate network bandwidth requirements based on usage.' },
      { name: 'Ping / Latency Estimator', slug: 'latency-estimator', description: 'Estimate ping and latency over distances.' },
      { name: 'Data Transfer Time Calculator', slug: 'data-transfer-calculator', description: 'Calculate time to transfer data.' },
      { name: 'MAC Address Validator', slug: 'mac-validator', description: 'Validate MAC address format and find the vendor.' },
      { name: 'Port Number Lookup', slug: 'port-lookup', description: 'Look up common network port numbers.' },
      { name: 'Network Mask Validator', slug: 'network-mask-validator', description: 'Validate a network mask.' },
      { name: 'Public vs Private IP Checker', slug: 'ip-privacy-checker', description: 'Check if an IP is public or private.' },
      { name: 'IP Class Finder', slug: 'ip-class-finder', description: 'Find the class of an IP address.' },
      { name: 'IP Range Generator', slug: 'ip-range-generator', description: 'Generate a list of IP addresses in a range.' },
      { name: 'Broadcast Address Calculator', slug: 'broadcast-address-calculator', description: 'Calculate the broadcast address of a network.' },
      { name: 'Host Count Calculator', slug: 'host-count-calculator', description: 'Calculate the number of hosts in a subnet.' },
      { name: 'Network Address Calculator', slug: 'network-address-calculator', description: 'Calculate the network address (Network ID) of a subnet.' },
      { name: 'CIDR to Subnet List Generator', slug: 'cidr-to-subnet-list', description: 'Generate subnets from a CIDR.' },
      { name: 'CIDR to Wildcard Mask Converter', slug: 'cidr-to-wildcard', description: 'Convert CIDR to wildcard mask.' },
      { name: 'IP Summarization Tool', slug: 'ip-summarization', description: 'Summarize a list of IP networks into a single route.' },
    ],
  },
  {
    name: 'Web & Server Tools',
    icon: Server,
    tools: [
      { name: 'HTTP Header Checker', slug: 'http-header-checker', description: 'Check the HTTP status code of a URL.' },
      { name: 'HTTP Request Size Calculator', slug: 'http-request-size-calculator', description: 'Estimate the size of an HTTP request.' },
      { name: 'SSL Certificate Expiration Checker', slug: 'ssl-expiry-checker', description: 'Check SSL certificate expiration.' },
      { name: 'URL Encoder / Decoder', slug: 'url-encoder-decoder', description: 'Encode or decode URLs.' },
      { name: 'HTML Entity Encoder / Decoder', slug: 'html-entity-encoder-decoder', description: 'Encode or decode HTML entities.' },
      { name: 'HTML / CSS / JS Minifier', slug: 'code-minifier', description: 'Minify HTML, CSS, or JavaScript code.' },
      { name: 'Robots.txt Validator / Generator', slug: 'robots-txt-tool', description: 'Validate or generate a robots.txt file.' },
      { name: 'Sitemap Generator (static)', slug: 'sitemap-generator', description: 'Generate a static XML sitemap.' },
      { name: 'Response Time Calculator', slug: 'response-time-calculator', description: 'Calculate server response time.' },
      { name: 'Domain Expiration Countdown', slug: 'domain-expiry-countdown', description: 'Countdown to domain expiration.' },
      { name: 'SSL Checker', slug: 'ssl-checker', description: 'Check SSL certificate details.' },
      { name: 'Server Uptime Calculator', slug: 'uptime-calculator', description: 'Calculate server uptime percentage.' },
      { name: 'DNS Lookup Tool', slug: 'dns-lookup', description: 'Perform a DNS lookup.' },
      { name: 'Reverse DNS Lookup', slug: 'reverse-dns-lookup', description: 'Perform a reverse DNS lookup.' },
      { name: 'Whois Lookup', slug: 'whois-lookup', description: 'Perform a Whois lookup on a domain.' },
      { name: 'Webpage Load Time Estimator', slug: 'load-time-estimator', description: 'Estimate webpage load time.' },
      { name: 'Cache Expiration Calculator', slug: 'cache-expiry-calculator', description: 'Calculate cache expiration dates.' },
      { name: 'Compression Savings Estimator', slug: 'compression-estimator', description: 'Estimate savings from compression.' },
      { name: 'CDN Bandwidth Estimator', slug: 'cdn-bandwidth-estimator', description: 'Estimate CDN bandwidth usage.' },
    ],
  },
  {
    name: 'Programming & Code',
    icon: Code2,
    tools: [
      { name: 'Code Formatter / Beautifier', slug: 'code-formatter', description: 'Format and beautify your code.' },
      { name: 'Regex Tester / Generator', slug: 'regex-tester', description: 'Test and generate regular expressions.' },
      { name: 'Base64 Encoder / Decoder', slug: 'base64-encoder-decoder', description: 'Encode or decode Base64 strings.' },
      { name: 'Hex ↔ RGB Color Converter', slug: 'color-converter', description: 'Convert between Hex and RGB colors.' },
      { name: 'Color Palette Generator', slug: 'color-palette-generator', description: 'Generate harmonious color palettes.' },
      { name: 'Binary ↔ Decimal ↔ Hex Converter', slug: 'number-converter', description: 'Convert between number bases.' },
      { name: 'MD5 / SHA Hash Generator', slug: 'hash-generator-md5-sha', description: 'Generate MD5 and SHA hashes.' },
      { name: 'ROT13 Encoder / Decoder', slug: 'rot13-encoder-decoder', description: 'Encode or decode using ROT13 cipher.' },
      { name: 'Caesar Cipher Encoder / Decoder', slug: 'caesar-cipher', description: 'Encode or decode using Caesar cipher.' },
      { name: 'Time Complexity Estimator', slug: 'big-o-calculator', description: 'Understand and visualize Big O notation.' },
      { name: 'Prime Number Checker', slug: 'prime-checker', description: 'Check if a number is prime.' },
      { name: 'Prime Number Generator', slug: 'prime-number-generator', description: 'Generate a list of prime numbers.' },
      { name: 'Fibonacci Sequence Generator', slug: 'fibonacci-generator', description: 'Generate the Fibonacci sequence.' },
      { name: 'Factorial Calculator', slug: 'factorial-calculator', description: 'Calculate the factorial of a number.' },
      { name: 'Random String Generator', slug: 'random-string-generator', description: 'Generate a random string of specified length and complexity.' },
      { name: 'Random Number Generator', slug: 'random-number-generator', description: 'Generate a random number within a specified range.' },
      { name: 'Code Snippet Formatter', slug: 'code-snippet-formatter', description: 'Format a code snippet.' },
      { name: 'Variable Name Validator', slug: 'variable-name-validator', description: 'Validate variable names.' },
      { name: 'Unicode / ASCII Converter', slug: 'unicode-ascii-converter', description: 'Convert between Unicode and ASCII.' },
    ],
  },
  {
    name: 'Security & Password',
    icon: Shield,
    tools: [
      { name: 'Password Generator', slug: 'password-generator', description: 'Generate secure passwords.' },
      { name: 'Password Strength Checker', slug: 'password-strength-checker', description: 'Check the strength of a password.' },
      { name: 'Password Entropy Calculator', slug: 'password-entropy-calculator', description: 'Calculate the entropy of a password in bits.' },
      { name: 'Hash Generator (MD5/SHA)', slug: 'hash-generator-md5-sha', description: 'Generate various hashes (MD5, SHA1, SHA256).' },
      { name: 'Encryption / Decryption Tool', slug: 'encryption-decryption-tool', description: 'Encrypt or decrypt text using AES.' },
      { name: 'Two-Factor Auth TOTP Demo', slug: 'totp-demo', description: 'Educational TOTP demo.' },
      { name: 'Base32 / Base58 Encoder / Decoder', slug: 'base32-58-encoder-decoder', description: 'Encode/decode Base32/58.' },
      { name: 'File Integrity Checker', slug: 'file-integrity-checker', description: 'Generate checksums (SHA) for files.' },
      { name: 'Random Key Generator', slug: 'random-key-generator', description: 'Generate a random encryption key.' },
      { name: 'Private / Public Key Pair Generator', slug: 'key-pair-generator', description: 'Generate a key pair (educational).' },
      { name: 'Secure Token Generator', slug: 'secure-token-generator', description: 'Generate a secure token.' },
      { name: 'OTP Generator', slug: 'otp-generator', description: 'Generate a one-time password.' },
      { name: 'Password Expiry Reminder', slug: 'password-expiry-reminder', description: 'Calculate password expiry.' },
      { name: 'Salting / Hashing Demo Tool', slug: 'salting-hashing-demo', description: 'Demonstrate salting and hashing.' },
      { name: 'Simple Cipher Cracker', slug: 'simple-cipher-cracker', description: 'Educational cipher cracker.' },
      { name: 'Hex to Binary Password Converter', slug: 'hex-to-binary-password', description: 'Convert hex passwords to binary.' },
      { name: 'Binary to ASCII Password Converter', slug: 'binary-to-ascii-password', description: 'Convert binary passwords to ASCII.' },
      { name: 'Random PIN Generator', slug: 'random-pin-generator', description: 'Generate a random PIN.' },
      { name: 'Credential Strength Analyzer', slug: 'credential-strength-analyzer', description: 'Analyze credential strength.' },
      { name: 'Security Quiz Tool', slug: 'security-quiz', description: 'Test your security knowledge.' },
    ],
  },
  {
    name: 'Cloud & Storage Tools',
    icon: Cloud,
    tools: [
      { name: 'Cloud Storage Cost Estimator', slug: 'cloud-storage-cost-estimator', description: 'Estimate cloud storage costs.' },
      { name: 'Cloud Bandwidth Cost Calculator (Egress)', slug: 'bandwidth-cost-calculator', description: 'Calculate bandwidth costs.' },
      { name: 'Backup Storage Requirement', slug: 'backup-storage-calculator', description: 'Calculate backup storage needs.' },
      { name: 'Data Compression Calculator', slug: 'data-compression-calculator', description: 'Calculate data compression.' },
      { name: 'VM RAM & CPU Requirement', slug: 'vm-requirement-estimator', description: 'Estimate VM resource needs.' },
      { name: 'Disk Usage / Partition Estimator', slug: 'disk-usage-estimator', description: 'Estimate disk usage.' },
      { name: 'Cloud Instance Cost Calculator', slug: 'cloud-instance-cost-calculator', description: 'Calculate cloud instance costs.' },
      { name: 'Storage vs. Memory Cost Analyzer', slug: 'storage-memory-cost-analyzer', description: 'Analyze storage vs. memory costs.' },
      { name: 'File Conversion Estimator', slug: 'file-conversion-estimator', description: 'Estimate file conversion sizes.' },
      { name: 'Data Retention Period Calculator', slug: 'data-retention-calculator', description: 'Calculate data retention periods.' },
      { name: 'Snapshot / Backup Scheduler', slug: 'backup-scheduler', description: 'Schedule snapshots and backups.' },
      { name: 'Storage Growth Estimator', slug: 'storage-growth-estimator', description: 'Estimate storage growth.' },
      { name: 'RAID Storage Calculator', slug: 'raid-calculator', description: 'Calculate RAID storage.' },
      { name: 'Cloud Migration Planning Guide', slug: 'cloud-migration-estimator', description: 'A guide to planning your cloud migration.' },
      { name: 'Cloud Sync Time Calculator', slug: 'cloud-sync-time-calculator', description: 'Calculate cloud sync time.' },
      { name: 'VM Scaling Planning Guide', slug: 'vm-scaling-calculator', description: 'Plan your vertical and horizontal VM scaling strategy.' },
      { name: 'Storage Redundancy Calculator', slug: 'storage-redundancy-calculator', description: 'Calculate storage redundancy.' },
      { name: 'Virtual Disk Size Estimator', slug: 'vdisk-size-estimator', description: 'Estimate virtual disk sizes.' },
      { name: 'IOPS Calculator', slug: 'iops-calculator', description: 'Calculate I/O operations per second.' },
    ],
  },
  {
    name: 'Database & Admin Tools',
    icon: Database,
    tools: [
      { name: 'SQL Query Tester', slug: 'sql-query-tester', description: 'Test basic SQL queries.' },
      { name: 'Database Row / Storage Estimator', slug: 'db-storage-estimator', description: 'Estimate database storage.' },
      { name: 'Uptime / Availability Calculator', slug: 'uptime-calculator', description: 'Calculate system uptime and availability.' },
      { name: 'Backup Schedule Calculator', slug: 'backup-scheduler', description: 'Calculate backup schedules.' },
      { name: 'Data Retention Period Calculator', slug: 'data-retention-calculator', description: 'Calculate data retention periods.' },
      { name: 'Replication / Sharding Estimator', slug: 'replication-estimator', description: 'Plan database replication and sharding.' },
      { name: 'User Quota Calculator', slug: 'user-quota-calculator', description: 'Calculate user quotas.' },
      { name: 'Transaction / TPS Calculator', slug: 'tps-calculator', description: 'Calculate transactions per second.' },
      { name: 'Log Rotation Calculator', slug: 'log-rotation-calculator', description: 'Calculate log rotation schedules.' },
      { name: 'Data Migration Estimator', slug: 'data-migration-estimator', description: 'Estimate data migration efforts.' },
      { name: 'Database Index Size Calculator', slug: 'index-size-calculator', description: 'Calculate database index size.' },
      { name: 'Query Execution Time Estimator', slug: 'query-time-estimator', description: 'Estimate query execution time.' },
      { name: 'Database Growth Calculator', slug: 'db-growth-calculator', description: 'Calculate database growth.' },
      { name: 'Primary / Foreign Key Validator', slug: 'key-validator', description: 'Validate primary/foreign keys.' },
      { name: 'Normalization Checker', slug: 'normalization-checker', description: 'Check database normalization.' },
      { name: 'Duplicate Row Finder', slug: 'duplicate-row-finder', description: 'Find duplicate rows in data.' },
      { name: 'Table Size Estimator', slug: 'table-size-estimator', description: 'Estimate table size.' },
      { name: 'Column Type Converter', slug: 'column-type-converter', description: 'Suggest column type conversions.' },
      { name: 'SQL Injection Tester', slug: 'sql-injection-tester', description: 'Educational SQL injection tester.' },
      { name: 'Database Health Checker', slug: 'db-health-checker', description: 'Basic database health checks.' },
    ],
  },
  {
    name: 'Programming Learning',
    icon: BrainCircuit,
    tools: [
      { name: 'Big-O Complexity Quiz', slug: 'big-o-quiz', description: 'Quiz on Big-O complexity.' },
      { name: 'Algorithm Visualizer', slug: 'algorithm-visualizer', description: 'Visualize sorting/searching algorithms.' },
      { name: 'Algorithm Step Simulator', slug: 'algorithm-simulator', description: 'Simulate steps of simple algorithms.' },
      { name: 'Recursion Calculator / Simulator', slug: 'recursion-simulator', description: 'Simulate recursive functions.' },
      { name: 'Logic Gate Simulator', slug: 'logic-gate-simulator', description: 'Simulate logic gates.' },
      { name: 'Truth Table Generator', slug: 'truth-table-generator', description: 'Generate truth tables.' },
      { name: 'Boolean Algebra Simplifier', slug: 'boolean-algebra-simplifier', description: 'Simplify boolean algebra expressions.' },
      { name: 'Graph Adjacency Calculator', slug: 'graph-adjacency-calculator', description: 'Calculate graph adjacency.' },
      { name: 'Matrix Operation Calculator', slug: 'matrix-calculator', description: 'Perform matrix operations.' },
      { name: 'Factorial / Combinatorics Calculator', slug: 'combinatorics-calculator', description: 'Calculate factorials and combinations.' },
      { name: 'Fibonacci Sequence Generator (Learning)', slug: 'fibonacci-learner', description: 'Learn about Fibonacci sequence.' },
      { name: 'Binary Tree Simulator', slug: 'binary-tree-simulator', description: 'Simulate a binary tree.' },
      { name: 'Linked List Visualization Tool', slug: 'linked-list-visualizer', description: 'Visualize a linked list.' },
      { name: 'Stack / Queue Simulator', slug: 'stack-queue-simulator', description: 'Simulate stacks and queues.' },
      { name: 'Hash Table Simulator', slug: 'hash-table-simulator', description: 'Simulate a hash table.' },
      { name: 'Search Algorithm Tester', slug: 'search-algorithm-tester', description: 'Test search algorithms.' },
      { name: 'Sorting Algorithm Tester', slug: 'sorting-algorithm-tester', description: 'Test sorting algorithms.' },
      { name: 'Heap Calculator / Simulator', slug: 'heap-simulator', description: 'Simulate a heap.' },
      { name: 'Trie Simulator', slug: 'trie-simulator', description: 'Simulate a trie.' },
      { name: 'Binary Search Tree Visualizer', slug: 'bst-visualizer', description: 'Visualize a binary search tree.' },
    ],
  },
  {
    name: 'ICT Daily Utilities',
    icon: Wrench,
    tools: [
      { name: 'QR Code Generator', slug: 'qr-code-generator', description: 'Generate QR codes for text or URLs.' },
      { name: 'ASCII ↔ Unicode Converter', slug: 'ascii-unicode-converter', description: 'Convert between ASCII and Unicode.' },
      { name: 'Markdown Previewer / Converter', slug: 'markdown-previewer', description: 'Preview and convert Markdown.' },
      { name: 'CSV ↔ JSON Converter', slug: 'csv-json-converter', description: 'Convert between CSV and JSON.' },
      { name: 'Text Case Converter', slug: 'text-case-converter', description: 'Convert text case (UPPER, lower, Title).' },
      { name: 'Word / Character Counter', slug: 'word-counter', description: 'Count words and characters in text.' },
      { name: 'Random Password / Key Generator', slug: 'random-password-key-generator', description: 'Generate random passwords or keys.' },
      { name: 'Random String / Number Generator', slug: 'random-string-number-generator', description: 'Generate random strings or numbers.' },
      { name: 'IP Location Lookup', slug: 'ip-location-lookup', description: 'Look up IP location from a static DB.' },
      { name: 'Color Picker & HEX / RGB Converter', slug: 'color-picker-converter', description: 'Pick colors and convert formats.' },
      { name: 'Dice Roller', slug: 'dice-roller', description: 'Roll virtual dice.' },
      { name: 'Coin Flip Simulator', slug: 'coin-flip', description: 'Simulate a coin flip.' },
      { name: 'Pomodoro Timer', slug: 'pomodoro-timer', description: 'A timer for the Pomodoro technique.' },
      { name: 'Countdown / Timer Generator', slug: 'countdown-generator', description: 'Generate a countdown timer.' },
      { name: 'File Size / Download Time Calculator', slug: 'download-time-calculator', description: 'Calculate download times.' },
      { name: 'Bandwidth Usage Tracker', slug: 'bandwidth-tracker-static', description: 'Static bandwidth usage calculator.' },
      { name: 'Hostname ↔ IP Lookup', slug: 'hostname-ip-lookup', description: 'Look up hostname or IP.' },
      { name: 'Network Packet Estimator', slug: 'network-packet-estimator', description: 'Estimate network packet counts.' },
      { name: 'ASCII Art Generator', slug: 'ascii-art-generator', description: 'Generate ASCII art from text.' },
      { name: 'Emoji / Symbol Picker', slug: 'emoji-picker', description: 'Pick emojis and symbols.' },
    ],
  },
  {
    name: 'Miscellaneous ICT Tools',
    icon: Boxes,
    tools: [
      { name: 'Base Conversion Tool', slug: 'base-converter', description: 'Convert between number bases.' },
      { name: 'URL Shortener (local)', slug: 'url-shortener-local', description: 'A local/static URL shortener.' },
      { name: 'Hex Color Code Analyzer', slug: 'hex-color-analyzer', description: 'Analyze hex color codes.' },
      { name: 'Binary Pattern Finder', slug: 'binary-pattern-finder', description: 'Find patterns in binary data.' },
      { name: 'Random MAC Address Generator', slug: 'random-mac-generator', description: 'Generate a random MAC address.' },
      { name: 'Random IPv6 Generator', slug: 'random-ipv6-generator', description: 'Generate a random IPv6 address.' },
      { name: 'Simple File Encryption / Decryption', slug: 'simple-file-encryption', description: 'Simple file encryption tool.' },
      { name: 'CSV / Excel Analyzer', slug: 'csv-analyzer', description: 'Analyze CSV/Excel data with basic formulas.' },
      { name: 'Code Snippet Sharing Tool', slug: 'snippet-sharing-tool', description: 'Share code snippets.' },
      { name: 'Code Diff Checker', slug: 'code-diff-checker', description: 'Check differences between code snippets.' },
      { name: 'Algorithm Step Logger', slug: 'algorithm-step-logger', description: 'Log steps of an algorithm.' },
      { name: 'Syntax Highlighter / Preview', slug: 'syntax-highlighter', description: 'Highlight and preview code syntax.' },
      { name: 'Markdown to HTML Converter', slug: 'markdown-to-html', description: 'Convert Markdown to HTML.' },
      { name: 'CSS Grid Generator', slug: 'css-grid-generator', description: 'Generate CSS grid layouts.' },
      { name: 'Flexbox Layout Generator', slug: 'flexbox-generator', description: 'Generate Flexbox layouts.' },
      { name: 'JSON to CSV Converter', slug: 'json-to-csv', description: 'Convert JSON to CSV.' },
      { name: 'CSV to JSON Converter', slug: 'csv-to-json', description: 'Convert CSV to JSON.' },
      { name: 'HTML Table Generator from CSV', slug: 'html-table-from-csv', description: 'Generate HTML table from CSV data.' },
      { name: 'IP Ping Simulator', slug: 'ip-ping-simulator', description: 'Simulate an IP ping.' },
    ],
  },
];

export const allTools: Tool[] = toolCategories.flatMap(category => category.tools);

export const mainNavLinks = [
    {
        name: 'AI Tool Recommender',
        href: '/',
        icon: Sparkles,
        description: 'Find the right tool for your task.'
    },
    {
        name: 'AI Code Generator',
        href: '/tools/code-generator',
        icon: FileCode2,
        description: 'Generate and debug code with AI.'
    }
]

    
