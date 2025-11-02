
import React from 'react';
import { PageHeader } from '@/components/page-header';
import { PrimaryForeignKeyValidator } from './key-validator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { BookOpen, AlertTriangle, Wand, ChevronRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const metadata = {
    title: 'Primary & Foreign Key Validator | ICT Toolbench',
    description: 'An interactive tool to understand and validate primary and foreign key relationships. Learn about referential integrity, constraints, and relational database design.',
    openGraph: {
        title: 'Primary & Foreign Key Validator | ICT Toolbench',
        description: 'An educational tool to validate referential integrity between primary and foreign keys and learn the fundamentals of database relationships.',
        url: '/tools/key-validator',
    }
};

const PrimaryForeignKeyValidatorPage = () => {
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
      "name": "Primary / Foreign Key Validator",
      "operatingSystem": "All",
      "applicationCategory": "DeveloperApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "An educational, client-side tool to validate referential integrity between primary and foreign keys and learn about relational database concepts.",
      "url": "https://www.icttoolbench.com/tools/key-validator"
    };

    return (
        <>
            <StructuredData data={faqSchema} />
            <StructuredData data={howToSchema} />
            <StructuredData data={softwareAppSchema} />
            <div className="max-w-4xl mx-auto space-y-12">
                <PageHeader
                    title="Primary / Foreign Key Validator"
                    description="An educational tool to help you understand and validate the core principles of relational databases: primary keys, foreign keys, and referential integrity. Enter your keys to see if the relationship is valid."
                />
                
                <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Educational Tool Only</AlertTitle>
                    <AlertDescription>
                        This tool simulates the logic of a database's referential integrity check in your browser. It does not connect to a real database. It's designed to help you visualize and learn the rules that govern primary and foreign keys.
                    </AlertDescription>
                </Alert>

                <PrimaryForeignKeyValidator />

                <section>
                    <h2 className="text-2xl font-bold mb-4">How to Use the Validator</h2>
                    <Card className="prose prose-sm max-w-none text-foreground p-6">
                        <p>This tool helps you check for two fundamental rules of relational databases: primary key uniqueness and referential integrity.</p>
                        <ol>
                            <li><strong>Enter Primary Keys:</strong> In the "Parent Table" box on the left, enter the list of primary keys. Each key must be on a new line.</li>
                            <li><strong>Enter Foreign Keys:</strong> In the "Child Table" box on the right, enter the list of foreign keys. These are the keys that are supposed to refer back to the parent table. Leave a field empty to simulate a `NULL` value.</li>
                            <li><strong>Add or Remove Keys:</strong> Use the `+` and `Trash` buttons to add or remove keys from either list to build your test scenario.</li>
                            <li><strong>Review Live Validation:</strong> The tool provides immediate feedback. A "Validation Passed" message means your key relationship is valid. If there's an issue, a "Validation Failed" message will appear, listing all the specific errors it found, such as duplicate primary keys or foreign keys that don't point to a valid primary key.</li>
                        </ol>
                    </Card>
                </section>
                
                 <section>
                    <h2 className="text-2xl font-bold mb-4">Worked Example</h2>
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Example: Authors and Books</CardTitle>
                                <CardDescription>A classic example of a one-to-many relationship between a parent table (`authors`) and a child table (`books`).</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                               <p className="text-sm text-muted-foreground"><strong>Scenario:</strong> You have an `authors` table with a primary key `author_id` and a `books` table with a foreign key `author_id` that links each book to its author.</p>
                               <div className="prose prose-sm max-w-none">
                                   <ol>
                                       <li><strong>Set up Primary Keys:</strong> In the "Parent Table" box, enter the `author_id`s: `10`, `11`, and `12`.</li>
                                       <li><strong>Set up Foreign Keys:</strong> In the "Child Table" box, enter the `author_id` for several books. Let's say we have three books, two by author `10` and one by author `11`. We'll also add an invalid entry. Enter: `10`, `11`, `10`, `15`.</li>
                                       <li><strong>Analyze the Result:</strong> The tool will immediately show "Validation Failed" with the error: `Referential integrity violation: Foreign key "15" does not exist in the parent table's primary keys.`</li>
                                       <li><strong>Fix the Data:</strong> If you remove the invalid `15` from the foreign keys list, the validation will pass, as every foreign key now correctly refers to an existing primary key. This simulates how a database enforces data consistency.</li>
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
                            <CardTitle className="text-primary">Educational Deep Dive: The Heart of Relational Databases</CardTitle>
                        </div>
                        <CardDescription>From ensuring uniqueness to maintaining clean relationships, understand the critical roles of primary and foreign keys.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                        <section>
                            <h3>The Primary Key: A Unique Identity</h3>
                            <p>
                                A <strong>primary key</strong> is a special column (or set of columns) in a database table whose main purpose is to uniquely identify each row in that table. Think of it as a Social Security Number or a student ID number; it's a unique identifier that guarantees you can pinpoint one specific record. A primary key has two fundamental rules:
                            </p>
                            <ol>
                                <li>It must contain a <strong>unique</strong> value for each row. No two rows can have the same primary key.</li>
                                <li>It cannot contain <strong>NULL</strong> (empty) values. Every row must have a primary key value.</li>
                            </ol>
                            <p>
                                While you can use a "natural" key (like a user's email address), it is best practice to use a "surrogate" key—an arbitrary number (often an auto-incrementing integer like `1, 2, 3...`) that has no business meaning but serves purely as the unique ID. This is because business data can change (a user might change their email), but a surrogate key never does.
                            </p>
                        </section>
                        <section>
                            <h3>The Foreign Key: Building Relationships</h3>
                            <p>
                                A <strong>foreign key</strong> is a column in one table that contains values that correspond to the values in the primary key column of another table. It's the mechanism that creates a link or relationship between two tables.
                            </p>
                            <p>
                                Consider two tables: `Customers` and `Orders`. The `Customers` table has a primary key `customer_id`. The `Orders` table also has a column named `customer_id`. In the `Orders` table, `customer_id` is a foreign key that points back to the primary key in the `Customers` table. This link allows you to know which customer placed which order. A single customer can place many orders, creating a "one-to-many" relationship.
                            </p>
                        </section>
                         <section>
                            <h3>Referential Integrity: Keeping Data Clean</h3>
                            <p>
                                <strong>Referential integrity</strong> is the core concept this tool helps you validate. It is a database rule that ensures that relationships between tables remain consistent. When referential integrity is enforced, it prevents users or applications from entering inconsistent data. For example:
                            </p>
                             <ul className="list-disc pl-5">
                               <li>You cannot add an order to the `Orders` table with a `customer_id` that does not exist in the `Customers` table.</li>
                               <li>You cannot delete a customer from the `Customers` table if they still have orders in the `Orders` table (unless you have a cascading delete rule set up).</li>
                            </ul>
                            <p>
                                This rule prevents "orphan" records—rows in a child table that have no corresponding parent. By enforcing this, the database guarantees that your data remains clean, accurate, and trustworthy. This validator tool simulates this exact check.
                            </p>
                        </section>
                    </CardContent>
                </Card>
                
                <section>
                    <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">E-commerce Order System</h3>
                            <p className="text-sm text-muted-foreground">In an e-commerce database, the `orders` table has a `customer_id` foreign key referencing the `customers` table. This ensures that every order is linked to a valid, existing customer, preventing "ghost" orders and maintaining data accuracy for shipping and reporting.</p>
                        </div>
                        <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Social Media Posts and Comments</h3>
                            <p className="text-sm text-muted-foreground">A `comments` table has a `post_id` foreign key pointing to the `posts` table. This guarantees that every comment is associated with an actual post. If a post is deleted, a `CASCADE DELETE` rule could automatically remove all its associated comments, keeping the database clean.</p>
                        </div>
                        <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Employee and Department Management</h3>
                            <p className="text-sm text-muted-foreground">An `employees` table might have a `department_id` foreign key referencing the `departments` table. An employee can have a `NULL` department ID if they are unassigned, but if a value is present, it must be a valid ID that exists in the `departments` table.</p>
                        </div>
                         <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Validating Data Imports</h3>
                            <p className="text-sm text-muted-foreground">Before importing a large CSV file of sales data into a database, a data engineer can use a script (or this tool conceptually) to validate that all `product_id`s in the sales data exist in their master `products` table, preventing the import of thousands of rows of invalid data.</p>
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
                                <li><strong>Use Surrogate Keys:</strong> Always prefer using an auto-incrementing integer or a UUID as your primary key over a "natural" key like an email address or username, which might change.</li>
                                <li><strong>Index Your Foreign Keys:</strong> For performance, you should always create a database index on your foreign key columns. This dramatically speeds up `JOIN` operations. You can estimate the storage impact with our <Link href="/tools/index-size-calculator" className="text-primary hover:underline">Index Size Calculator</Link>.</li>
                                <li><strong>Define `ON DELETE` Behavior:</strong> When creating a foreign key, decide what should happen if the parent record is deleted. Options include `RESTRICT` (prevent deletion), `CASCADE` (delete all child records), or `SET NULL` (set the foreign key in child records to NULL).</li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                             <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                        </CardHeader>
                        <CardContent>
                             <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                                <li><strong>Using the Wrong Data Type:</strong> Ensure the foreign key column has the exact same data type as the primary key column it references. A `BIGINT` foreign key cannot point to an `INT` primary key.</li>
                                <li><strong>Forgetting to Add a Foreign Key Constraint:</strong> Simply naming a column `user_id` does not make it a foreign key. You must explicitly define the foreign key constraint in your `CREATE TABLE` or `ALTER TABLE` statement for the database to enforce referential integrity.</li>
                                <li><strong>Creating Orphan Records:</strong> In systems without enforced referential integrity, it's easy to delete a parent record and leave behind "orphan" child records that point to nothing. This leads to data corruption and application errors.</li>
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
                                      <AccordionContent><div dangerouslySetInnerHTML={{ __html: item.answer.replace(/href="\/tools\/([^"]*)"/g, 'href="/tools/$1" class="text-primary hover:underline"') }} /></AccordionContent>
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
                                  <CardDescription className="text-xs">Practice writing `SELECT` statements, which often use key relationships in `JOIN` clauses.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                      <Link href="/tools/db-storage-estimator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Database Storage Estimator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Estimate the storage size of your tables, including primary and foreign key columns.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                       <Link href="/tools/index-size-calculator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Database Index Size Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Estimate the storage cost of adding an index to your foreign key columns for better performance.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                  </div>
              </section>
            </div>
        </>
    );
};

export default PrimaryForeignKeyValidatorPage;

