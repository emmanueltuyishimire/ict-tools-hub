
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
{`SELECT * FROM users WHERE username = ? AND password = ?;`}
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
                                      <AccordionContent>
                                        <div dangerouslySetInnerHTML={{ __html: item.answer }} />
                                      </AccordionContent>
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
