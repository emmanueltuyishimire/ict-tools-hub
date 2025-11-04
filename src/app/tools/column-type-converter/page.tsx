
import React from 'react';
import { PageHeader } from '@/components/page-header';
import { ColumnTypeConverter } from './column-type-converter';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BookOpen, AlertTriangle, Wand, ChevronRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const metadata = {
    title: 'Column Type Optimizer & Recommender | ICT Toolbench',
    description: 'Get recommendations for optimal database column types. Our tool analyzes your sample data to suggest more efficient types like INT, VARCHAR, or TEXT, helping you save storage and improve performance.',
    openGraph: {
        title: 'Column Type Optimizer & Recommender | ICT Toolbench',
        description: 'An educational tool for developers and DBAs to choose the most efficient data types for their database schema.',
        url: '/tools/column-type-converter',
    }
};

const ColumnTypeConverterPage = () => {
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
      "name": "Column Type Optimizer",
      "operatingSystem": "All",
      "applicationCategory": "DeveloperApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "An educational tool and guide for developers and DBAs to choose optimal data types for database columns based on sample data.",
      "url": "https://www.icttoolbench.com/tools/column-type-converter"
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
            <div className="max-w-4xl mx-auto space-y-12">
                <PageHeader
                    title="Column Type Optimizer"
                    description="Choosing the right data type is a critical step in database design. This tool helps you select the most efficient data type for your columns by analyzing sample data, helping you save storage and improve query performance."
                />
                
                <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>This is a Recommendation Engine</AlertTitle>
                    <AlertDescription>
                        This tool provides suggestions based on the sample data you provide. It does not perform an actual database `ALTER TABLE` command. Always test schema changes in a development environment.
                    </AlertDescription>
                </Alert>

                <ColumnTypeConverter />

                <section>
                    <h2 className="text-2xl font-bold mb-4">How to Use the Optimizer</h2>
                    <Card className="prose prose-sm max-w-none text-foreground p-6">
                        <p>This tool analyzes sample data to suggest a more space-efficient data type for a database column.</p>
                        <ol>
                            <li><strong>Select Current Data Type:</strong> Choose the data type you are currently using or considering for your column. If it's a `VARCHAR` or `CHAR`, specify its length.</li>
                            <li><strong>Provide Sample Data:</strong> In the text area, paste a representative sample of the data that will be stored in the column, with one value per line. The more accurate the sample, the better the recommendation.</li>
                            <li><strong>Review the Recommendation:</strong> The tool will instantly analyze the sample data and suggest an optimal data type. The reason for the recommendation (e.g., "All values fit within the range of a TINYINT") will be provided.</li>
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
                            <CardTitle className="text-primary">Educational Deep Dive: The Importance of "Rightsizing" Data Types</CardTitle>
                        </div>
                        <CardDescription>From saving gigabytes of storage to speeding up queries, learn why choosing the smallest appropriate data type is a fundamental database optimization.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                        <section>
                            <h3>Why Data Types Matter</h3>
                            <p>
                                In a relational database, every column is assigned a data type. This type tells the database what kind of data it should store (e.g., integers, strings, dates) and, crucially, how much disk space to reserve for it. Choosing the correct data type is one of the most important decisions in database design, with significant impacts on both storage costs and query performance.
                            </p>
                            <p>
                                The core principle is <strong>"rightsizing"</strong>: using the smallest possible data type that can safely accommodate all potential values for that column. Using a data type that is too large wastes disk space, while using one that is too small can lead to data truncation and errors.
                            </p>
                        </section>
                        <section>
                            <h3>The Cost of Wasted Space</h3>
                            <p>
                                A few wasted bytes per row might seem trivial, but in a table with millions or billions of rows, this adds up to gigabytes or even terabytes of unnecessary storage.
                            </p>
                             <ul className="list-disc pl-5">
                                <li><strong>Storage Costs:</strong> More storage costs more money, whether you're buying physical drives or paying for cloud storage. You can estimate this with our <Link href="/tools/cloud-storage-cost-estimator" className="text-primary hover:underline">Cloud Storage Cost Estimator</Link>.</li>
                                <li><strong>Performance Costs:</strong> Smaller data types mean smaller rows. Smaller rows mean more rows can fit into a single database page (the unit of data read from disk). This allows the database to satisfy a query by reading fewer pages from disk, which is a major performance enhancement. Furthermore, smaller rows mean more data can be cached in RAM, leading to a higher cache hit ratio and faster queries.</li>
                            </ul>
                        </section>
                         <section>
                            <h3>Common Optimization Scenarios</h3>
                             <ul className="list-disc pl-5">
                               <li><strong>Integer Sizing:</strong> A common mistake is to use a standard `INT` (4 bytes) for a column that will only ever store small numbers, like a status flag (0, 1, 2). A `TINYINT` (1 byte) is far more efficient. This tool will analyze the range of your sample numbers and suggest the smallest possible integer type.</li>
                               <li><strong>VARCHAR Sizing:</strong> Using `VARCHAR(255)` for everything is a frequent habit. While it works, if a `username` column never exceeds 30 characters, defining it as `VARCHAR(30)` more accurately reflects the data's constraints and can be more efficient for the database engine's memory allocation.</li>
                                <li><strong>CHAR vs. VARCHAR:</strong> For storing fixed-length strings like a two-letter country code, `CHAR(2)` is more efficient than `VARCHAR(2)`. `CHAR` reserves a fixed amount of space, while `VARCHAR` has a small overhead to store the length of the string.</li>
                            </ul>
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
                                        <h4 className="font-semibold">Analyze Existing Data</h4>
                                        <p className="text-sm text-muted-foreground">
                                            If you have an existing table, run a query to find the maximum value or maximum string length in a column. This provides real-world data to make an informed decision, rather than guessing.
                                        </p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold">Think About Future Growth</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Don't just size for today. If your user ID column is currently at 50,000 but you expect millions of users, don't use a `SMALLINT` (max ~32,000). Choose an `INT` or `BIGINT` to leave room for future growth.
                                        </p>
                                    </div>
                                </li>
                                 <li className="flex items-start gap-4">
                                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold">Test `ALTER TABLE` Statements</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Changing a data type on a large production table with an `ALTER TABLE` command can be a slow, blocking operation that causes downtime. Always test such changes on a staging server first to understand the performance impact.
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
                                <li><strong>Use `BOOLEAN` or `TINYINT(1)` for Flags:</strong> For true/false flags, a `BOOLEAN` or `TINYINT(1)` type is the most space-efficient option, using only one byte per row.</li>
                                <li><strong>Prefer `INT` for Primary Keys:</strong> Unless you anticipate more than 2 billion rows, a standard `INT` is a perfectly good and efficient choice for a primary key. Use `BIGINT` only when you project massive scale.</li>
                                <li><strong>`DECIMAL` for Financial Data:</strong> Never use `FLOAT` or `DOUBLE` for storing currency. These are floating-point types and can introduce small rounding errors. The `DECIMAL` or `NUMERIC` type is designed for exact precision and should always be used for financial data.</li>
                                <li><strong>`TIMESTAMP` vs. `DATETIME`:</strong> Use `TIMESTAMP` when you need to store a point in time that is timezone-aware. It's stored as a UTC value and converted to the client's timezone on retrieval. `DATETIME` stores a literal date and time with no timezone information.</li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                             <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                        </CardHeader>
                        <CardContent>
                             <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                                <li><strong>Using `VARCHAR` for Everything:</strong> The "one size fits all" approach of using `VARCHAR(255)` for numbers, dates, and flags is inefficient and prevents the database from performing type-specific optimizations and validations.</li>
                                <li><strong>Using `INT` for Phone Numbers or ZIP Codes:</strong> While they look like numbers, ZIP codes and phone numbers should be stored as strings (`VARCHAR`). They can have leading zeros that would be lost if stored as an integer, and you will never perform mathematical operations on them.</li>
                                <li><strong>Ignoring Enum Types:</strong> For a column that can only have a small, fixed set of values (e.g., status: 'pending', 'active', 'suspended'), using the database's `ENUM` type is far more space-efficient than storing the full string.</li>
                                <li><strong>Not Planning for IPv6:</strong> Storing an IP address in a `VARCHAR(15)` is fine for IPv4, but an IPv6 address is much longer. A `VARCHAR(45)` is a safer choice for future-proofing.</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
                
                 <section>
                    <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Optimizing a `users` Table</h3>
                            <p className="text-sm text-muted-foreground">A developer inherits a database where the `is_active` column is a `VARCHAR(5)` storing "true" or "false". By analyzing the data, they realize a `BOOLEAN` or `TINYINT(1)` would be much more efficient. For a table with 10 million users, this simple change can save nearly 40 MB of disk space and make queries filtering on that column faster.</p>
                        </div>
                         <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Designing a Product Catalog</h3>
                            <p className="text-sm text-muted-foreground">When designing a `products` table, a DBA uses this tool to plan their data types. For the `price` column, they choose `DECIMAL(10, 2)` to ensure financial accuracy. For the `SKU` (Stock Keeping Unit), which might look like `ABC-00123`, they correctly choose `VARCHAR` instead of an integer type. For the `quantity_on_hand`, they analyze sales data and realize the stock never exceeds 50,000, so they choose a `SMALLINT` instead of a larger `INT`.</p>
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
                                        <div dangerouslySetInnerHTML={{ __html: item.answer.replace(/href="\/tools\/([^"]*)"/g, 'href="/tools/$1" class="text-primary hover:underline"') }} />
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
                      <Link href="/tools/db-storage-estimator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Database Storage Estimator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">After choosing your data types, use this tool to estimate the total size of your table.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                      <Link href="/tools/normalization-checker" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Normalization Checker<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Ensure your table structure is sound before you even begin to choose data types.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                       <Link href="/tools/sql-query-tester" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">SQL Query Tester<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Practice querying against different data types in our educational SQL environment.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                  </div>
              </section>
            </div>
        </>
    );
};

export default ColumnTypeConverterPage;
