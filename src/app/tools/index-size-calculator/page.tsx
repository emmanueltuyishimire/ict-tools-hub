
import React from 'react';
import { PageHeader } from '@/components/page-header';
import { DatabaseIndexSizeCalculator } from './index-size-calculator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { BookOpen, AlertTriangle, Wand, ChevronRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const metadata = {
    title: 'Database Index Size Calculator | ICT Toolbench',
    description: 'Estimate the disk space usage of your database indexes. Plan your storage requirements by calculating the size of single-column and composite indexes.',
    openGraph: {
        title: 'Database Index Size Calculator | ICT Toolbench',
        description: 'A tool for DBAs and developers to forecast index storage needs, helping to balance query performance with storage costs.',
        url: '/tools/index-size-calculator',
    }
};

const DatabaseIndexSizeCalculatorPage = () => {
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
      "name": "Database Index Size Calculator",
      "operatingSystem": "All",
      "applicationCategory": "DeveloperApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "A free online tool to estimate the storage size of a database index based on its columns and the number of rows in the table.",
      "url": "https://www.icttoolbench.com/tools/index-size-calculator"
    };

    return (
        <>
            <StructuredData data={faqSchema} />
            <StructuredData data={howToSchema} />
            <StructuredData data={softwareAppSchema} />
            <div className="max-w-4xl mx-auto space-y-12">
                <PageHeader
                    title="Database Index Size Calculator"
                    description="Estimate the storage footprint of your database indexes. This tool helps you understand the trade-off between faster queries and increased disk usage, allowing for better capacity planning."
                />
                
                <DatabaseIndexSizeCalculator />

                <section>
                    <h2 className="text-2xl font-bold mb-4">How to Use the Calculator</h2>
                    <Card className="prose prose-sm max-w-none text-foreground p-6">
                        <p>This tool provides a baseline estimate for the disk space that a database index will consume.</p>
                        <ol>
                            <li><strong>Define Index Columns:</strong> An index can be on a single column or multiple columns (a composite index). Add a row for each column in your index and select its data type.</li>
                            <li><strong>Enter Table Size:</strong> In the "Total Rows in Table" field, enter the number of rows you expect the table to have.</li>
                            <li><strong>Analyze the Estimate:</strong> The tool will instantly calculate the total estimated size of the index based on the size of the key data plus an average overhead for the index structure itself (like B-Tree pointers).</li>
                        </ol>
                        <Alert>
                            <AlertTriangle className="h-4 w-4" />
                            <AlertTitle>This is an Estimate</AlertTitle>
                            <AlertDescription>
                               Actual index size can vary significantly based on your database engine, page fill factor, and data alignment. Use this tool for initial capacity planning and cost forecasting.
                            </AlertDescription>
                        </Alert>
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
                            <CardTitle className="text-primary">Educational Deep Dive: The Cost of Speed</CardTitle>
                        </div>
                        <CardDescription>From B-Trees to fill factors, understand why indexes are a database's greatest performance tool and one of its biggest storage consumers.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                        <section>
                            <h3>What is a Database Index?</h3>
                            <p>
                                A database index is a data structure that improves the speed of data retrieval operations on a database table. Think of it like the index at the back of a book. Instead of reading the entire book from start to finish to find a topic (a "full table scan"), you can look up the topic in the index and go directly to the correct page. An index does the same for your data.
                            </p>
                            <p>
                                When you create an index on a column (e.g., a `user_id` column), the database creates a separate, sorted copy of that column's data with pointers back to the original table rows. When you run a query like `WHERE user_id = 123`, the database can use this sorted index to find `123` almost instantly using a fast search algorithm (like a binary search), and then use the pointer to fetch the full row data. Without an index, it would have to check every single row in the table.
                            </p>
                        </section>
                        <section>
                            <h3>The Performance vs. Storage Trade-Off</h3>
                            <p>
                                Indexes are essential for read performance, but they are not free. They have two main costs:
                            </p>
                            <ul className="list-disc pl-5">
                                <li><strong>Storage Cost:</strong> An index is a copy of your data, so it consumes additional disk space. A table with many indexes can easily take up more space for its indexes than for the data itself. This calculator helps you estimate this cost.</li>
                                <li><strong>Write Performance Cost:</strong> While indexes speed up reads, they slow down writes (`INSERT`, `UPDATE`, `DELETE`). When you write to a table, the database must also update every index that contains the affected columns. A table with ten indexes will require ten additional write operations, which can become a bottleneck in write-heavy applications.</li>
                            </ul>
                            <p>The art of database design is in finding the right balance: creating enough indexes to make your important queries fast, without adding so many that they consume too much disk space or cripple your write performance.</p>
                        </section>
                         <section>
                            <h3>How Index Size is Calculated</h3>
                            <p>
                               This tool uses a simplified formula to provide a baseline estimate:
                            </p>
                            <p className='text-center font-bold font-code text-xl bg-muted p-4 rounded-md'>
                                (Size of Indexed Columns + Row Overhead) × Number of Rows
                            </p>
                             <ul className="list-disc pl-5 mt-4">
                               <li><strong>Size of Indexed Columns:</strong> The sum of the data types of all columns in the index. For a composite index on `(user_id, created_at)`, this would be the size of `BIGINT` + `TIMESTAMP`.</li>
                               <li><strong>Row Overhead:</strong> Every entry in an index needs to store not only the key value but also a pointer back to the actual row in the main table. This pointer and other metadata add a fixed overhead to each entry, which we estimate at around 24 bytes.</li>
                               <li><strong>Number of Rows:</strong> The total number of rows in the table, as each row must have an entry in the index.</li>
                            </ul>
                            <p>Real-world size is also affected by the `fill factor` (how much empty space is left on each page for future updates) and other database-specific details, but this formula provides a solid foundation for capacity planning.</p>
                        </section>
                    </CardContent>
                </Card>
                
                 <section>
                    <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Planning a New Table</h3>
                            <p className="text-sm text-muted-foreground">A developer is designing a new `orders` table that is expected to grow to 50 million rows. They plan to add an index on the `customer_id` (BIGINT) and `order_date` (TIMESTAMP) columns. Using the calculator, they can estimate the size of this composite index and factor it into their storage provisioning and cloud cost estimates.</p>
                        </div>
                         <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Justifying Performance Tuning</h3>
                            <p className="text-sm text-muted-foreground">A slow query is impacting an application. A DBA identifies that adding a new index will fix the problem. Management is concerned about the storage cost. The DBA uses this tool to show that adding the index to their 100-million-row table will consume approximately 3.2 GB of extra space, providing a clear cost-benefit analysis for the performance improvement.</p>
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
                                <li><strong>Index Selectively:</strong> Don't index every column. Only index columns that are frequently used in `WHERE`, `JOIN`, and `ORDER BY` clauses. Use your database's query analysis tools (like `EXPLAIN`) to identify which queries are performing slow table scans.</li>
                                <li><strong>Composite Index Order Matters:</strong> The order of columns in a composite index is important. Place the column that is most frequently used for filtering first.</li>
                                <li><strong>Index Foreign Keys:</strong> Always create an index on your foreign key columns. This is critical for improving the performance of `JOIN` operations.</li>
                                <li><strong>Monitor and Prune:</strong> Regularly monitor your database for unused indexes. An index that is never used provides no benefit but still adds overhead to every write operation. Drop unused indexes.</li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                             <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                        </CardHeader>
                        <CardContent>
                             <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                                <li><strong>Indexing Everything:</strong> The most common mistake. Adding an index to every column in a table will cripple write performance and waste enormous amounts of disk space.</li>
                                <li><strong>Indexing Large Text Columns:</strong> Creating a standard B-Tree index on a large `TEXT` or `BLOB` column is highly inefficient and often not allowed by the database. For text searching, use a specialized Full-Text Search index.</li>
                                <li><strong>Forgetting About Write Overhead:</strong> Adding a new index to a write-heavy table without considering the performance impact on `INSERT`s and `UPDATE`s.</li>
                                <li><strong>Ignoring Index Maintenance:</strong> Over time, indexes can become fragmented, which can degrade performance. Databases require periodic maintenance tasks (like `REINDEX` or `OPTIMIZE TABLE`) to keep indexes healthy.</li>
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
                                  <CardDescription className="text-xs">Estimate the total size of your table's data, which you can add to your index size estimate.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                      <Link href="/tools/storage-growth-estimator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Storage Growth Estimator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Forecast how your index and table size will grow over time based on a growth rate.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                       <Link href="/tools/query-time-estimator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Query Execution Time Estimator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">A conceptual tool to understand how indexes affect query performance.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                  </div>
              </section>
            </div>
        </>
    );
};

export default DatabaseIndexSizeCalculatorPage;

