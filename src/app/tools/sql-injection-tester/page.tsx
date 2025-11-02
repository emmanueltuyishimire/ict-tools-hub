
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
                    <h2 className="text-2xl font-bold mb-4">Worked Examples</h2>
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Example 1: The Universal Pass - `' OR 1=1 --`</CardTitle>
                                <CardDescription>A classic and powerful SQLi payload that works on many vulnerable systems to log in as the first user in the database, often the administrator.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                               <p className="text-sm text-muted-foreground"><strong>Scenario:</strong> You are testing a login form and want to see if you can log in without knowing any users' credentials.</p>
                               <div className="prose prose-sm max-w-none">
                                   <ol>
                                       <li><strong>Examine the Vulnerable Code:</strong>
                                            <p className="font-code bg-muted p-2 rounded-sm text-xs">SELECT * FROM users WHERE username = '<span className="text-primary">[username]</span>' AND password = '<span className="text-primary">[password]</span>'</p>
                                       </li>
                                       <li><strong>Craft the Payload:</strong> You inject the following string into the username field: <code className="font-code bg-muted p-1 rounded-sm">' OR 1=1--</code>. You leave the password field blank.</li>
                                       <li><strong>Analyze the Executed Query:</strong> The server concatenates your input, resulting in the following query:
                                            <p className="font-code bg-muted p-2 rounded-sm text-xs">SELECT * FROM users WHERE username = '' OR 1=1<span className="text-muted-foreground">--' AND password = ''</span></p>
                                       </li>
                                       <li><strong>Understand the Result:</strong> The database evaluates the `WHERE` clause. Since `1=1` is always true, the condition `username = '' OR 1=1` becomes true for every single row. The `--` comments out the rest of the line, so the password check is completely ignored. The query returns all users, and the application, seeing that rows were returned, typically logs you in as the first user in the table (which is often the `admin`).</li>
                                   </ol>
                               </div>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Example 2: Targeted Login - `admin' -- `</CardTitle>
                                <CardDescription>A more subtle attack that targets a specific, known username to bypass their password check.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                               <p className="text-sm text-muted-foreground"><strong>Scenario:</strong> You know a valid username (`admin`) but do not know their password.</p>
                               <div className="prose prose-sm max-w-none">
                                   <ol>
                                       <li><strong>Craft the Payload:</strong> Enter <code className="font-code bg-muted p-1 rounded-sm">admin'-- </code> into the username field. Note the space after the comment dashes.</li>
                                       <li><strong>Analyze the Executed Query:</strong> The resulting query becomes:
                                            <p className="font-code bg-muted p-2 rounded-sm text-xs">SELECT * FROM users WHERE username = 'admin'<span className="text-muted-foreground">--' AND password = ''</span></p>
                                       </li>
                                       <li><strong>Understand the Result:</strong> The database evaluates `WHERE username = 'admin'`. This is a valid condition that finds the admin user. The `--` then comments out the entire `AND password = ...` part of the query. The database successfully finds and returns the admin user row, and the application grants you access. This is a more targeted attack than the `' OR 1=1` method.</li>
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
{`// THIS IS INSECURE!
const query = \`SELECT * FROM users WHERE username = '\${username}' AND password = '\${password}'\`;
// The database executes this query string.`}
                                </pre>
                            </div>
                            <p>
                                When a normal user logs in, `username` is `'admin'` and `password` is `'password123'`, resulting in a valid query. But when an attacker enters `' OR 1=1--` as the username, the query becomes:
                            </p>
                             <div className="bg-muted p-4 rounded-md font-code text-sm">
                                <pre>
{`SELECT * FROM users WHERE username = '' OR 1=1--' AND password = ''`}
                                </pre>
                            </div>
                             <p>
                                The `--` is a comment operator in SQL. The database sees the condition as `WHERE username = '' OR 1=1`, which is always true. It ignores the rest of the line, including the password check. The query then returns all users, and the application, seeing that rows were returned, logs the attacker in. You can practice writing legitimate queries with our <Link href="/tools/sql-query-tester" className="text-primary hover:underline">SQL Query Tester</Link>.
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
{`SELECT * FROM users WHERE username = ? AND password = ?;`}
                                </pre>
                            </div>
                            <p>
                               The database parses this query and "prepares" it. The application then sends the user's input separately. The database engine treats this input strictly as data and safely inserts it into the placeholders. Even if an attacker provides malicious input, it is never executed as code; it is only treated as a literal string to be compared, and the login will fail. This separation makes injection impossible.
                            </p>
                        </section>
                    </CardContent>
                </Card>
                
                 <section>
                    <h2 className="text-2xl font-bold mb-4">Real-Life Applications & Consequences</h2>
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Authentication Bypass</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">As demonstrated in this tool, an attacker can bypass login forms to gain unauthorized access to an application, potentially as an administrator, giving them full control over the system.</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Information Disclosure</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">Attackers can use `UNION`-based SQLi to append a new query to the original one, allowing them to extract sensitive data from other tables in the database. This is how massive data breaches of customer information, credit card details, and personal data often occur.</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Data Destruction or Modification</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">An attacker could inject a destructive command like `; DROP TABLE users;--` at the end of an input field. If the database user has sufficient permissions, this could delete entire tables, leading to catastrophic and irreversible data loss. This highlights the importance of using least-privilege database users.</p>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <div className="grid md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <div className='flex items-center gap-2'><Wand className="h-6 w-6 text-accent" /> <CardTitle>Pro Tips for Prevention</CardTitle></div>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                                <li><strong>Always Use Parameterized Queries:</strong> This is the most important rule. Whatever your programming language or database library, it will have a standard, safe way to execute parameterized queries. Use it exclusively for all database interactions.</li>
                                <li><strong>Use an ORM:</strong> Object-Relational Mapping (ORM) libraries (like Sequelize for Node.js or SQLAlchemy for Python) generally use parameterized queries by default, providing a layer of protection automatically.</li>
                                <li><strong>Principle of Least Privilege:</strong> Configure your application's database user with only the minimum permissions it needs. For example, a user account for a public-facing website should only have `SELECT`, `INSERT`, and `UPDATE` permissions, not `DROP TABLE` or administrative rights.</li>
                                <li><strong>Validate Input on the Server:</strong> While not a replacement for parameterized queries, you should still validate user input to ensure it conforms to the expected format (e.g., an email looks like an email, a number is a number). Our <Link href="/tools/variable-name-validator" className="text-primary hover:underline">Variable Name Validator</Link> can help with basic checks.</li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                             <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                        </CardHeader>
                        <CardContent>
                             <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                                <li><strong>Trusting Any User Input:</strong> The #1 rule of security: never trust user input. Assume all data from users (including form fields, URL parameters, and HTTP headers) is potentially malicious.</li>
                                <li><strong>"Sanitizing" Instead of Parameterizing:</strong> Trying to write your own function to "sanitize" input by stripping out characters like single quotes. This is a fragile, blacklist-based approach that is easily bypassed by experienced attackers using advanced encoding techniques like those shown in our <Link href="/tools/url-encoder-decoder" className="text-primary hover:underline">URL Encoder</Link>.</li>
                                <li><strong>Concatenating in "Safe" Queries:</strong> Believing that SQL injection only applies to login forms. Any query that includes user input—including `UPDATE` statements or even parts of a `LIMIT` clause—can be vulnerable if not parameterized.</li>
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
                  <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <Link href="/tools/sql-query-tester" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">SQL Query Tester<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Practice writing the legitimate SQL queries that your application will use.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                      <Link href="/tools/key-validator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Primary / Foreign Key Validator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Understand the database structures that SQL injection attacks target.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                      <Link href="/tools/url-encoder-decoder" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">URL Encoder / Decoder<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Attackers often URL-encode their payloads to bypass simple security filters.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                  </div>
              </section>
            </div>
        </>
    );
};

export default SqlInjectionTesterPage;
