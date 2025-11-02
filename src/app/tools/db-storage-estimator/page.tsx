
import React from 'react';
import { PageHeader } from '@/components/page-header';
import { DbStorageEstimator } from './db-storage-estimator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { BookOpen, AlertTriangle, Wand, ChevronRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const metadata = {
    title: 'Database Row & Storage Estimator | ICT Toolbench',
    description: 'Estimate your database storage requirements by defining your table schema and row count. A tool for DBAs and developers to plan capacity and forecast costs.',
    openGraph: {
        title: 'Database Row & Storage Estimator | ICT Toolbench',
        description: 'Plan your database storage needs by modeling table schemas and estimating total size, including index overhead.',
        url: '/tools/db-storage-estimator',
    }
};

const DbStorageEstimatorPage = () => {
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
      "name": "Database Row / Storage Estimator",
      "operatingSystem": "All",
      "applicationCategory": "DeveloperApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "A free online tool for developers and DBAs to estimate database storage requirements based on table schema, row count, and index overhead.",
      "url": "https://www.icttoolbench.com/tools/db-storage-estimator"
    };

    return (
        <>
            <StructuredData data={faqSchema} />
            <StructuredData data={howToSchema} />
            <StructuredData data={softwareAppSchema} />
            <div className="max-w-4xl mx-auto space-y-12">
                <PageHeader
                    title="Database Row / Storage Estimator"
                    description="Plan your database capacity by modeling your table schema and forecasting total storage needs, including indexes and overhead. A crucial first step in designing a scalable and cost-effective database."
                />
                
                <DbStorageEstimator />

                <section>
                    <h2 className="text-2xl font-bold mb-4">How to Use the Estimator</h2>
                    <Card className="prose prose-sm max-w-none text-foreground p-6">
                        <p>This tool provides a baseline estimate for database storage needs, helping you with capacity planning and cost forecasting.</p>
                        <ol>
                            <li><strong>Define Your Columns:</strong> Add a row for each column in your database table. For each column, specify its name and select the appropriate data type (e.g., `VARCHAR`, `INT`, `TIMESTAMP`). For variable-length types like `VARCHAR`, enter the maximum length you plan to allow.</li>
                            <li><strong>Enter Row Count:</strong> In the "Estimated Row Count" field, enter the number of rows you expect the table to have.</li>
                            <li><strong>Set Overhead:</strong> In the "Index & Overhead" field, add a percentage to account for storage used by indexes, table metadata, and filesystem overhead. A value of 25-50% is a common starting point.</li>
                            <li><strong>Analyze the Results:</strong> The tool will instantly calculate the estimated size of a single row, the total size of all rows (raw table size), and the total estimated size including overhead.</li>
                        </ol>
                        <Alert>
                            <AlertTriangle className="h-4 w-4" />
                            <AlertTitle>This is a Simplified Estimate</AlertTitle>
                            <AlertDescription>
                               Actual storage usage can vary significantly based on your database engine (MySQL, PostgreSQL, etc.), its page size, data compression, and how it handles variable-length data. Use this tool for initial planning and budgeting, not for exact sizing.
                            </AlertDescription>
                        </Alert>
                    </Card>
                </section>
                
                <section>
                    <h2 className="text-2xl font-bold mb-4">Worked Example</h2>
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Estimating a `users` Table</CardTitle>
                                <CardDescription>A developer is designing a `users` table for a new application and needs to estimate its size for 1 million users.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                               <p className="text-sm text-muted-foreground"><strong>Scenario:</strong> The table will have an auto-incrementing ID, an email, a hashed password, and a creation timestamp. The developer anticipates a 30% overhead for indexes on the `id` and `email` columns.</p>
                               <div className="prose prose-sm max-w-none">
                                   <ol>
                                       <li><strong>Inputs:</strong>
                                            <ul>
                                                <li><strong>Columns:</strong> `id` (BIGINT), `email` (VARCHAR, 128), `password_hash` (CHAR, 60), `created_at` (TIMESTAMP).</li>
                                                <li><strong>Row Count:</strong> `1,000,000`</li>
                                                <li><strong>Overhead:</strong> `30`%</li>
                                            </ul>
                                       </li>
                                       <li><strong>Row Size Calculation:</strong> The tool calculates the size of one row: 8 (BIGINT) + 128 (VARCHAR) + 60 (CHAR) + 4 (TIMESTAMP) ≈ 200 bytes.</li>
                                       <li><strong>Total Size Calculation:</strong>
                                            <ul>
                                                <li>Raw Size: 200 bytes/row × 1,000,000 rows = 200 MB.</li>
                                                <li>Total Size with Overhead: 200 MB + (200 MB × 30%) = <strong>260 MB</strong>.</li>
                                            </ul>
                                       </li>
                                        <li><strong>Result:</strong> The developer now has a reasonable baseline estimate. They know they need to provision at least 260 MB of storage for this table to handle their projected user base. This helps in choosing the right size for a cloud database or a physical server disk.</li>
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
                            <CardTitle className="text-primary">Educational Deep Dive: Database Storage Fundamentals</CardTitle>
                        </div>
                        <CardDescription>From data types to page fills, understand the key factors that determine how much disk space your database actually uses.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                        <section>
                            <h3>It Starts with Data Types</h3>
                            <p>
                                The foundation of any storage estimate is understanding the size of your data types. Choosing the most efficient data type for your data is the first step in storage optimization. Using a `BIGINT` (8 bytes) for a column that will only ever store numbers up to 100 is wasteful when a `TINYINT` (1 byte) would suffice. Similarly, defining a `VARCHAR(500)` for a username that has a maximum length of 20 characters reserves more space than necessary and can impact performance. This tool provides a quick reference for the approximate sizes of common data types.
                            </p>
                        </section>
                        <section>
                            <h3>The Hidden Cost of Indexes</h3>
                            <p>
                                A database index is a special data structure that dramatically speeds up data retrieval operations. Without an index, finding a specific user in a million-row table would require a "full table scan," which is extremely slow. With an index on the `email` column, the database can find that user almost instantly.
                            </p>
                            <p>
                                However, this performance comes at a cost: <strong>storage space</strong>. An index is essentially a sorted copy of the data from one or more columns, along with pointers back to the original rows. This means that every index you create on a table consumes additional disk space. A complex table with 5-6 indexes can easily double its total storage footprint. The "Overhead" percentage in our calculator is designed to help you account for this critical trade-off between read performance and storage cost.
                            </p>
                        </section>
                        <section>
                            <h3>Database Pages and Fill Factor</h3>
                            <p>
                                Databases don't write individual rows to disk one at a time. They read and write data in fixed-size blocks called "pages" (often 8 KB or 16 KB). When you insert a new row, the database engine finds a page with enough free space to hold it. When you update a row and make it larger, the database might need to move it to a new page, leaving empty space behind.
                            </p>
                            <p>
                                To account for future updates, databases use a "fill factor," which means they intentionally leave a certain percentage of each page empty. This avoids the performance penalty of splitting pages but means your database will consume more disk space than the raw data size alone. This inherent overhead is another reason why a real-world database is always larger than a simple calculation of `row_size` × `row_count`.
                            </p>
                        </section>
                    </CardContent>
                </Card>

                 <section>
                    <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Planning a New Application's Database</h3>
                            <p className="text-sm text-muted-foreground">A developer is designing a `users` table and a `posts` table. They use the estimator to model both. They estimate the `users` table will be small, but the `posts` table, with a large `TEXT` column, will grow significantly. This helps them decide to put the two tables in different storage volumes, allowing the `posts` table's storage to scale independently.</p>
                        </div>
                         <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Forecasting Cloud Database Costs</h3>
                            <p className="text-sm text-muted-foreground">A startup needs to choose a managed database plan on a cloud provider. By using this tool to estimate a total size of 500 GB after one year, they can use our <Link href="/tools/cloud-storage-cost-estimator" className="text-primary hover:underline">Cloud Storage Cost Estimator</Link> to accurately forecast the monthly bill and budget accordingly, avoiding "bill shock".</p>
                        </div>
                         <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Justifying an Archiving Strategy</h3>
                            <p className="text-sm text-muted-foreground">A DBA sees their `audit_logs` table is growing by millions of rows a month. They use the estimator to project that the table will consume 2 TB of expensive primary storage within a year. This data provides a clear justification to management for implementing a data archiving strategy where logs older than 90 days are moved to cheaper, long-term storage.</p>
                        </div>
                         <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Deciding on an Index</h3>
                            <p className="text-sm text-muted-foreground">A developer wants to add a new index to a very large table to speed up a query. They use the estimator to calculate the approximate size of the new index by adding its columns and setting the row count. This helps them understand the storage cost of the performance improvement, allowing them to make an informed trade-off.</p>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4">Practical Tips</h2>
                     <Card>
                        <CardContent className="p-6">
                            <ul className="space-y-4">
                                <li className="flex items-start gap-4">
                                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold">Choose the Right Data Type</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Don't use a `BIGINT` when a `TINYINT` will do. Don't use a `VARCHAR(1000)` for a two-letter country code. Use the smallest, most appropriate data type for your data to minimize row size from the start.
                                        </p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold">Be Judicious with Indexes</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Indexes are essential for read performance but they slow down writes (as the index must also be updated) and consume disk space. Only create indexes on columns that are frequently used in `WHERE` clauses, `JOIN` conditions, or `ORDER BY` statements.
                                        </p>
                                    </div>
                                </li>
                                 <li className="flex items-start gap-4">
                                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold">Monitor, Don't Guess</h4>
                                        <p className="text-sm text-muted-foreground">
                                            This tool provides an excellent baseline. However, the best way to plan for the future is to monitor the actual growth of your database over time. Use your database's built-in tools or a monitoring service to track table and index sizes. Use this real-world data to refine your forecasts with our <Link href="/tools/storage-growth-estimator" className="text-primary hover:underline">Storage Growth Estimator</Link>.
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

              <section>
                  <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <Link href="/tools/storage-growth-estimator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Storage Growth Estimator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Once you know your current size, forecast your future storage needs based on a growth rate.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                      <Link href="/tools/cloud-storage-cost-estimator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Cloud Storage Cost Estimator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Translate your estimated storage size into a monthly cloud provider bill.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                       <Link href="/tools/iops-calculator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">IOPS Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Estimate the I/O performance your database will need and the disk array required to support it.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                  </div>
              </section>
            </div>
        </>
    );
};

export default DbStorageEstimatorPage;
