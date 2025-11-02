
import React from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { BookOpen, AlertTriangle, Wand, ChevronRight, CheckCircle, Database } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from '@/components/ui/table';
import { NormalizationChecker } from './normalization-checker';

export const metadata = {
    title: 'Database Normalization Checker & Guide | 1NF, 2NF, 3NF | ICT Toolbench',
    description: 'Learn to design efficient relational databases with our guide to normalization. Understand 1NF, 2NF, and 3NF with clear examples and best practices to reduce data redundancy.',
    openGraph: {
        title: 'Database Normalization Checker & Guide | ICT Toolbench',
        description: 'An educational guide and framework for understanding and applying database normalization rules to your data models.',
        url: '/tools/normalization-checker',
    }
};

const NormalizationCheckerPage = () => {
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
      "name": "Normalization Checker",
      "operatingSystem": "All",
      "applicationCategory": "DeveloperApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "An educational guide and framework for developers and DBAs to check and understand database normalization forms (1NF, 2NF, 3NF).",
      "url": "https://www.icttoolbench.com/tools/normalization-checker"
    };

    return (
        <>
            <StructuredData data={faqSchema} />
            <StructuredData data={howToSchema} />
            <StructuredData data={softwareAppSchema} />
            <div className="max-w-4xl mx-auto space-y-12">
                <PageHeader
                    title="Database Normalization Guide"
                    description="Build robust and efficient databases by understanding the principles of normalization. This guide provides a step-by-step framework to analyze your table structures and achieve up to Third Normal Form (3NF)."
                />
                
                <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>This is an Interactive Guide</AlertTitle>
                    <AlertDescription>
                        True normalization requires human insight into data relationships. The checklist tool below will guide you through the validation process for your own database design.
                    </AlertDescription>
                </Alert>

                <NormalizationChecker />

                <section>
                    <h2 className="text-2xl font-bold mb-4">How to Use This Tool</h2>
                    <Card className="prose prose-sm max-w-none text-foreground p-6">
                        <p>This interactive checklist helps you apply formal normalization rules to your table design. A table must be in 1NF before it can be in 2NF, and in 2NF before it can be in 3NF.</p>
                        <ol>
                            <li><strong>Step 1: Check for First Normal Form (1NF).</strong> Answer the two questions for 1NF. If your table has a primary key and all columns have single, atomic values, it passes.</li>
                            <li><strong>Step 2: Check for Second Normal Form (2NF).</strong> This step is only relevant if your table has a composite key (made of multiple columns). If it does, you must confirm that all other columns depend on the *entire* key, not just a part of it.</li>
                            <li><strong>Step 3: Check for Third Normal Form (3NF).</strong> Finally, ensure no non-key columns depend on other non-key columns. Each attribute should depend only on the primary key.</li>
                            <li><strong>Review Final Result:</strong> The tool will give you a final status based on the checkboxes you have filled, helping you understand how normalized your design is.</li>
                        </ol>
                    </Card>
                </section>
                
                 <section>
                    <h2 className="text-2xl font-bold mb-4">Worked Examples</h2>
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Example 1: The Project Management Table (Fixing 1NF)</CardTitle>
                                <CardDescription>Normalizing a table that tracks employees and their projects.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-muted-foreground"><strong>Initial (Un-normalized) Table:</strong></p>
                                <Table className="bg-background text-sm">
                                    <TableCaption>Un-normalized `orders` table</TableCaption>
                                    <TableHeader><TableRow><TableHead>employee_id</TableHead><TableHead>employee_name</TableHead><TableHead>projects</TableHead></TableRow></TableHeader>
                                    <TableBody><TableRow><TableCell>E1</TableCell><TableCell>Bob</TableCell><TableCell>Project A, Project B</TableCell></TableRow></TableBody>
                                </Table>
                                <p className="text-sm"><strong>Problem:</strong> Violates 1NF. The `projects` column is not atomic; it contains a list. This makes it impossible to query for all employees on "Project B".</p>
                                <p className="text-sm text-muted-foreground"><strong>1NF Solution:</strong> Split into two tables.</p>
                                <Table className="bg-background text-sm">
                                    <TableCaption>employees</TableCaption>
                                    <TableHeader><TableRow><TableHead>employee_id (PK)</TableHead><TableHead>employee_name</TableHead></TableRow></TableHeader>
                                    <TableBody><TableRow><TableCell>E1</TableCell><TableCell>Bob</TableCell></TableRow></TableBody>
                                </Table>
                                 <Table className="bg-background text-sm mt-2">
                                    <TableCaption>employee_projects (Junction Table)</TableCaption>
                                    <TableHeader><TableRow><TableHead>employee_id (PK, FK)</TableHead><TableHead>project_id (PK, FK)</TableHead></TableRow></TableHeader>
                                    <TableBody>
                                        <TableRow><TableCell>E1</TableCell><TableCell>A</TableCell></TableRow>
                                        <TableRow><TableCell>E1</TableCell><TableCell>B</TableCell></TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Example 2: The University Course Table (Fixing 3NF)</CardTitle>
                                <CardDescription>Fixing a transitive dependency in a student enrollment table.</CardDescription>
                            </CardHeader>
                             <CardContent className="space-y-4">
                               <p className="text-sm text-muted-foreground"><strong>Initial Table (in 2NF):</strong></p>
                                <Table className="bg-background text-sm">
                                     <TableCaption>Violates 3NF</TableCaption>
                                    <TableHeader><TableRow><TableHead>student_id (PK)</TableHead><TableHead>course_id</TableHead><TableHead>professor_id</TableHead><TableHead>professor_office</TableHead></TableRow></TableHeader>
                                    <TableBody><TableRow><TableCell>S101</TableCell><TableCell>CS101</TableCell><TableCell>P5</TableCell><TableCell>Room 302</TableCell></TableRow></TableBody>
                                </Table>
                               <p className="text-sm"><strong>Problem:</strong> Violates 3NF. The `professor_office` does not depend on the primary key (`student_id`). It depends on a non-key column, `professor_id`. If Professor P5 moves offices, you'd have to update every single row for every student they teach.</p>
                               <p className="text-sm text-muted-foreground"><strong>3NF Solution:</strong> Split into two tables.</p>
                                <Table className="bg-background text-sm">
                                    <TableCaption>professors (New Table)</TableCaption>
                                    <TableHeader><TableRow><TableHead>professor_id (PK)</TableHead><TableHead>professor_office</TableHead></TableRow></TableHeader>
                                    <TableBody><TableRow><TableCell>P5</TableCell><TableCell>Room 302</TableCell></TableRow></TableBody>
                                </Table>
                                <Table className="bg-background text-sm mt-2">
                                    <TableCaption>student_enrollments (now in 3NF)</TableCaption>
                                    <TableHeader><TableRow><TableHead>student_id (PK, FK)</TableHead><TableHead>course_id (PK, FK)</TableHead><TableHead>professor_id (FK)</TableHead></TableRow></TableHeader>
                                     <TableBody><TableRow><TableCell>S101</TableCell><TableCell>CS101</TableCell><TableCell>P5</TableCell></TableRow></TableBody>
                                </Table>
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
                                      <dd className="text-muted-foreground text-sm" dangerouslySetInnerHTML={{ __html: item.definition.replace(/href="\/tools\/([^"]*)"/g, 'href="/tools/$1" class="text-primary hover:underline"') }} />
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
                            <CardTitle className="text-primary">Educational Deep Dive: A Step-by-Step Guide to Normalization</CardTitle>
                        </div>
                        <CardDescription>From atomic values to transitive dependencies, learn how to design a clean, efficient, and robust relational database schema.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                        <section>
                            <h3>The Problem: Un-normalized Data is Dangerous</h3>
                            <p>
                                Imagine a simple spreadsheet used to track orders. For each order, you might list the customer's name, their address, the product they bought, its price, and the order date. While this works for a small list, it quickly becomes a data management nightmare. What happens if a customer moves? You would have to find and update their address in every single order row they've ever placed. This is a <strong>modification anomaly</strong>. What if you want to add a new product that no one has ordered yet? You can't, because you need an order to create a row. This is an <strong>insertion anomaly</strong>. What if a customer cancels their only order? Deleting that row might also delete the only record of that customer's existence, an <strong>update anomaly</strong>.
                            </p>
                            <p>
                                Database normalization is the process of organizing columns and tables in a relational database to minimize data redundancy and eliminate these undesirable anomalies. It's a formal process for ensuring your data is clean, consistent, and easy to maintain.
                            </p>
                        </section>
                        <section>
                            <h3>First Normal Form (1NF): Atomicity and Uniqueness</h3>
                            <p>A table is in 1NF if it meets two conditions:</p>
                             <ol className="list-decimal pl-5">
                               <li>The table has a primary key that uniquely identifies each row. Use our <Link href="/tools/key-validator" className="text-primary hover:underline">Primary Key Validator</Link> to understand this concept.</li>
                               <li>Each column contains atomic (indivisible) values, and there are no repeating groups.</li>
                            </ol>
                            <p>Consider this un-normalized table:</p>
                             <Table className="bg-background">
                                <TableCaption>Un-normalized `orders` table</TableCaption>
                                <TableHeader><TableRow><TableHead>order_id</TableHead><TableHead>customer_name</TableHead><TableHead>products</TableHead></TableRow></TableHeader>
                                <TableBody><TableRow><TableCell>101</TableCell><TableCell>Alice</TableCell><TableCell>Laptop, Mouse</TableCell></TableRow></TableBody>
                            </Table>
                            <p>This violates 1NF because the `products` column contains a list, not an atomic value. To fix this, we create a separate `order_items` table, moving the repeating group there:</p>
                            <Table className="bg-background mt-4">
                                <TableCaption>orders (now in 1NF)</TableCaption>
                                <TableHeader><TableRow><TableHead>order_id (PK)</TableHead><TableHead>customer_name</TableHead></TableRow></TableHeader>
                                <TableBody><TableRow><TableCell>101</TableCell><TableCell>Alice</TableCell></TableRow></TableBody>
                            </Table>
                            <Table className="bg-background mt-4">
                                <TableCaption>order_items (new table)</TableCaption>
                                <TableHeader><TableRow><TableHead>order_item_id (PK)</TableHead><TableHead>order_id (FK)</TableHead><TableHead>product_name</TableHead></TableRow></TableHeader>
                                <TableBody>
                                    <TableRow><TableCell>1</TableCell><TableCell>101</TableCell><TableCell>Laptop</TableCell></TableRow>
                                    <TableRow><TableCell>2</TableCell><TableCell>101</TableCell><TableCell>Mouse</TableCell></TableRow>
                                </TableBody>
                            </Table>
                        </section>
                         <section>
                            <h3>Second Normal Form (2NF): Eliminating Partial Dependencies</h3>
                            <p>A table is in 2NF if it is in 1NF and every non-key column is fully functionally dependent on the entire primary key. This rule only applies to tables with a <strong>composite primary key</strong> (a primary key made of two or more columns).</p>
                            <p>Consider our `order_items` table, now with more detail. The primary key is (`order_id`, `product_id`).</p>
                             <Table className="bg-background">
                                <TableCaption>order_items (violates 2NF)</TableCaption>
                                <TableHeader><TableRow><TableHead>order_id (PK)</TableHead><TableHead>product_id (PK)</TableHead><TableHead>product_name</TableHead><TableHead>quantity</TableHead></TableRow></TableHeader>
                                <TableBody><TableRow><TableCell>101</TableCell><TableCell>P5</TableCell><TableCell>Laptop</TableCell><TableCell>1</TableCell></TableRow></TableBody>
                            </Table>
                            <p>Here, `quantity` depends on both the order and the product. But `product_name` depends *only* on the `product_id`. This is a partial dependency. To fix this, we move the product information to its own `products` table:</p>
                            <Table className="bg-background mt-4">
                                <TableCaption>products (new table)</TableCaption>
                                <TableHeader><TableRow><TableHead>product_id (PK)</TableHead><TableHead>product_name</TableHead></TableRow></TableHeader>
                                <TableBody><TableRow><TableCell>P5</TableCell><TableCell>Laptop</TableCell></TableRow></TableBody>
                            </Table>
                            <Table className="bg-background mt-4">
                                <TableCaption>order_items (now in 2NF)</TableCaption>
                                <TableHeader><TableRow><TableHead>order_id (PK, FK)</TableHead><TableHead>product_id (PK, FK)</TableHead><TableHead>quantity</TableHead></TableRow></TableHeader>
                                <TableBody><TableRow><TableCell>101</TableCell><TableCell>P5</TableCell><TableCell>1</TableCell></TableRow></TableBody>
                            </Table>
                        </section>
                         <section>
                            <h3>Third Normal Form (3NF): Eliminating Transitive Dependencies</h3>
                            <p>A table is in 3NF if it is in 2NF and has no transitive dependencies. A transitive dependency is when a non-key column depends on another non-key column, rather than directly on the primary key.</p>
                            <p>Consider our original `orders` table, but with more customer detail:</p>
                             <Table className="bg-background">
                                <TableCaption>orders (violates 3NF)</TableCaption>
                                <TableHeader><TableRow><TableHead>order_id (PK)</TableHead><TableHead>customer_id</TableHead><TableHead>customer_zip_code</TableHead><TableHead>customer_city</TableHead></TableRow></TableHeader>
                                <TableBody><TableRow><TableCell>101</TableCell><TableCell>C1</TableCell><TableCell>90210</TableCell><TableCell>Beverly Hills</TableCell></TableRow></TableBody>
                            </Table>
                            <p>Here, `customer_zip_code` depends on the `order_id` (via the customer). But `customer_city` depends on the `customer_zip_code`, not on the order itself. This is a transitive dependency. To resolve this, we move the address information to a separate `zip_codes` or `customers` table.</p>
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
                                        <h4 className="font-semibold">Start with a Good Design</h4>
                                        <p className="text-sm text-muted-foreground">
                                           It is always easier to normalize your data model during the design phase than to refactor a live database with millions of rows. Draw your tables and relationships on a whiteboard first.
                                        </p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold">Use Surrogate Keys</h4>
                                        <p className="text-sm text-muted-foreground">
                                           Use auto-incrementing integers or UUIDs as your primary keys. They have no business meaning and will never change, which makes relationships much more stable. You can use our <Link href="/tools/random-string-generator" className="text-primary hover:underline">Random String Generator</Link> to create UUIDs.
                                        </p>
                                    </div>
                                </li>
                                 <li className="flex items-start gap-4">
                                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold">Denormalize with Caution</h4>
                                        <p className="text-sm text-muted-foreground">
                                            For read-heavy applications like analytics dashboards, it's sometimes acceptable to intentionally "denormalize" data to avoid complex `JOIN`s and improve query speed. This should be a conscious decision, not an accident of poor design.
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
                                <li><strong>Third Normal Form is Usually Enough:</strong> While higher normal forms exist (BCNF, 4NF, 5NF), achieving 3NF is the standard for most relational database designs and solves the vast majority of data anomaly issues.</li>
                                <li><strong>Know When to Denormalize:</strong> In some high-performance read-heavy systems (like data warehouses), designers may intentionally 'denormalize' data by combining tables to avoid costly `JOIN` operations, trading some data redundancy for faster query speeds. This should be a deliberate, well-justified decision.</li>
                                <li><strong>Use Surrogate Keys:</strong> Use auto-incrementing integers or UUIDs as primary keys. They are stable and have no business meaning, which prevents issues when natural data (like an email address) changes.</li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                             <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes</CardTitle></div>
                        </CardHeader>
                        <CardContent>
                             <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                                <li><strong>Storing Comma-Separated Lists:</strong> Storing a list of values (e.g., 'tags') in a single text column is a common violation of 1NF. This should always be moved to a separate related table.</li>
                                <li><strong>Not Identifying the Primary Key:</strong> Failing to correctly identify the true primary key of a table can lead to incorrect analysis of 2NF and 3NF.</li>
                                <li><strong>Over-Normalization:</strong> Breaking down tables into excessively small pieces can lead to overly complex queries with too many `JOIN`s, which can harm performance. 3NF is usually a good stopping point.</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
                
                <section>
                    <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">E-commerce Product Catalog</h3>
                            <p className="text-sm text-muted-foreground">A properly normalized catalog has a `products` table, a `categories` table, and a `product_categories` junction table. This avoids storing a list of categories in the product table (1NF), prevents storing the category description with every product (3NF), and allows a product to belong to multiple categories efficiently.</p>
                        </div>
                        <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Refactoring a Legacy Spreadsheet</h3>
                            <p className="text-sm text-muted-foreground">A company has been tracking sales in a massive Excel spreadsheet with columns for customer name, customer address, product name, and product price. To build a real application, a developer normalizes this by creating separate `customers`, `products`, and `orders` tables, eliminating huge amounts of redundant data and preventing update anomalies.</p>
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
                      <Link href="/tools/key-validator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Primary / Foreign Key Validator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Explore the concepts of primary and foreign keys, which are central to normalization.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                      <Link href="/tools/db-storage-estimator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Database Storage Estimator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Estimate the storage size of your normalized tables.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                       <Link href="/tools/sql-query-tester" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">SQL Query Tester<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Practice writing the queries that will be used to access your normalized data.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                  </div>
              </section>
            </div>
        </>
    );
};

export default NormalizationCheckerPage;
