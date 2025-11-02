
import React from 'react';
import { PageHeader } from '@/components/page-header';
import { SqlQueryTester } from './sql-query-tester';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { BookOpen, AlertTriangle, Wand, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const metadata = {
    title: 'SQL Query Tester | Online SQL Editor | ICT Toolbench',
    description: 'A simple, client-side SQL query tester for practicing basic SELECT statements. Run queries against sample data sets and learn the fundamentals of SQL.',
    openGraph: {
        title: 'SQL Query Tester | Online SQL Editor | ICT Toolbench',
        description: 'Practice your SQL skills with our interactive, in-browser query tester. No database required.',
        url: '/tools/sql-query-tester',
    }
};

const SqlQueryTesterPage = () => {
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
      "name": "SQL Query Tester",
      "operatingSystem": "All",
      "applicationCategory": "DeveloperApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "An educational, client-side tool for testing basic SQL SELECT queries against sample datasets.",
      "url": "https://www.icttoolbench.com/tools/sql-query-tester"
    };

    return (
        <>
            <StructuredData data={faqSchema} />
            <StructuredData data={howToSchema} />
            <StructuredData data={softwareAppSchema} />
            <div className="max-w-5xl mx-auto space-y-12">
                <PageHeader
                    title="SQL Query Tester (Educational)"
                    description="Practice writing basic SQL queries in a safe, client-side environment. This tool allows you to run simple SELECT statements against pre-defined sample tables to help you learn and test SQL syntax."
                />
                
                <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Educational Tool Only</AlertTitle>
                    <AlertDescription>
                        This tool simulates a database in your browser and only supports basic `SELECT * FROM ... WHERE ...` queries. It is designed for learning and demonstration, not for production database work.
                    </AlertDescription>
                </Alert>

                <SqlQueryTester />

                <section>
                    <h2 className="text-2xl font-bold mb-4">How to Use the SQL Query Tester</h2>
                    <Card className="prose prose-sm max-w-none text-foreground p-6">
                        <p>This interactive tool lets you practice the fundamentals of SQL without needing to set up a database.</p>
                        <ol>
                            <li><strong>Examine the Sample Data:</strong> Below the query editor, you'll find sample tables like `users` and `products`. Familiarize yourself with the available columns and data.</li>
                            <li><strong>Write Your Query:</strong> In the "SQL Query" text area, write a simple `SELECT` statement. Start with something easy like <code className="font-code bg-muted p-1 rounded-sm">SELECT * FROM users</code>.</li>
                            <li><strong>Add a Filter (Optional):</strong> Try adding a `WHERE` clause to filter your results, for example: <code className="font-code bg-muted p-1 rounded-sm">SELECT * FROM users WHERE country = 'Canada'</code>.</li>
                            <li><strong>Execute the Query:</strong> Click the "Run Query" button.</li>
                            <li><strong>Analyze the Results:</strong> The "Results" table will update to show the rows returned by your query. If there's a syntax error, a helpful message will appear.</li>
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
                            <CardTitle className="text-primary">Educational Deep Dive: The Language of Data</CardTitle>
                        </div>
                        <CardDescription>From simple lookups to complex joins, understand the core statements that allow you to communicate with relational databases.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                        <section>
                            <h3>What is SQL?</h3>
                            <p>
                                SQL (Structured Query Language) is the standard language for managing and manipulating relational databases. A relational database organizes data into tables with rows and columns, similar to a collection of spreadsheets that can be linked together. SQL provides a declarative way to tell the database what data you want, and the database engine figures out the most efficient way to retrieve it.
                            </p>
                        </section>
                        <section>
                            <h3>The Four Core Operations: CRUD</h3>
                            <p>Most database interactions can be broken down into four basic operations, known as CRUD:</p>
                             <ul className="list-disc pl-5">
                               <li><strong>Create:</strong> Adding new data. Done with the `INSERT` statement.</li>
                               <li><strong>Read:</strong> Retrieving data. Done with the `SELECT` statement. This is the most common operation and the focus of this tool.</li>
                               <li><strong>Update:</strong> Modifying existing data. Done with the `UPDATE` statement.</li>
                               <li><strong>Delete:</strong> Removing data. Done with the `DELETE` statement.</li>
                            </ul>
                        </section>
                         <section>
                            <h3>The `SELECT` Statement: Asking Questions</h3>
                            <p>The `SELECT` statement is how you query the database for information. Its basic structure is:</p>
                             <div className="bg-muted p-4 rounded-md font-code text-sm">
                                SELECT <span className="text-primary">[column1, column2, ...]</span> FROM <span className="text-accent">[table_name]</span> WHERE <span className="text-yellow-600">[condition]</span>;
                            </div>
                             <ul className="list-disc pl-5 mt-4">
                                <li>The `SELECT` clause specifies which columns you want to see. Using `*` means you want all columns.</li>
                                <li>The `FROM` clause specifies which table you are querying.</li>
                                <li>The `WHERE` clause is an optional filter to specify which rows you want to retrieve based on a condition (e.g., `WHERE price > 100`).</li>
                             </ul>
                             <p>As you get more advanced, you can add clauses like `JOIN` (to combine data from multiple tables), `GROUP BY` (to aggregate data), and `ORDER BY` (to sort the results).</p>
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
                                <li><strong>Be Specific with Columns:</strong> Avoid using `SELECT *` in production code. Explicitly list the columns you need. This makes your query clearer and more resilient to database schema changes.</li>
                                <li><strong>Filter with `WHERE`:</strong> Always use a `WHERE` clause to filter your data. Retrieving an entire multi-million row table is slow and inefficient.</li>
                                <li><strong>Use `LIMIT`:</strong> When exploring data, add `LIMIT 100` to the end of your query to get a small sample of the results quickly without having to wait for the full query to complete.</li>
                                <li><strong>Format for Readability:</strong> For complex queries, use line breaks and indentation to make them easier to read and debug. You can use our <Link href="/tools/code-formatter" className="text-primary hover:underline">Code Formatter</Link> for this.</li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                             <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                        </CardHeader>
                        <CardContent>
                             <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                                <li><strong>SQL Injection:</strong> A critical security vulnerability where user input is directly concatenated into a query string. This can allow an attacker to run malicious SQL commands. Always use parameterized queries or prepared statements in your application code to prevent this. This educational tool does not have this vulnerability as it doesn't connect to a real database.</li>
                                <li><strong>Forgetting `WHERE` in an `UPDATE` or `DELETE`:</strong> The most terrifying mistake for a DBA. Forgetting the `WHERE` clause in an `UPDATE` or `DELETE` statement will cause it to apply to *every single row* in the table, potentially leading to catastrophic data loss.</li>
                                <li><strong>Ambiguous `JOIN`s:</strong> When joining tables that have columns with the same name, failing to specify which table you mean (e.g., `users.id` vs. `orders.id`) will result in an error.</li>
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
                      <Link href="/tools/db-storage-estimator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Database Storage Estimator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Estimate how much disk space your tables might consume.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                      <Link href="/tools/json-formatter" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">JSON Formatter<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Format and validate JSON, a common data format returned by database APIs.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                       <Link href="/tools/code-formatter" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Code Formatter<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Clean up and format your complex SQL queries for better readability.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                  </div>
              </section>
            </div>
        </>
    );
};

export default SqlQueryTesterPage;

