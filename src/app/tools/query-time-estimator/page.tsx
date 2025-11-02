
import React from 'react';
import { PageHeader } from '@/components/page-header';
import { QueryTimeEstimator } from './query-time-estimator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { BookOpen, AlertTriangle, Wand, ChevronRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const metadata = {
    title: 'Query Execution Time Estimator | ICT Toolbench',
    description: 'Estimate database query execution time. Understand how indexes, table size, and caching impact SQL query performance. An educational tool for developers and DBAs.',
    openGraph: {
        title: 'Query Execution Time Estimator | ICT Toolbench',
        description: 'Learn how database queries work and estimate their execution time with our interactive tool. See the impact of indexing vs. full table scans.',
        url: '/tools/query-time-estimator',
    }
};

const QueryTimeEstimatorPage = () => {
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
      "name": "Query Execution Time Estimator",
      "operatingSystem": "All",
      "applicationCategory": "DeveloperApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "An educational, client-side tool to estimate and understand the factors affecting database query execution time, such as indexing and table size.",
      "url": "https://www.icttoolbench.com/tools/query-time-estimator"
    };

    return (
        <>
            <StructuredData data={faqSchema} />
            <StructuredData data={howToSchema} />
            <StructuredData data={softwareAppSchema} />
            <div className="max-w-4xl mx-auto space-y-12">
                <PageHeader
                    title="Query Execution Time Estimator"
                    description="Why is one query fast and another slow? This educational tool helps you understand the factors that impact SQL query performance—from table scans and indexes to caching—by providing a conceptual time estimate."
                />
                
                <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Conceptual Tool Only</AlertTitle>
                    <AlertDescription>
                        This calculator provides a high-level, theoretical estimate to demonstrate concepts. It does not execute real queries and cannot replace a database's `EXPLAIN` plan for analyzing real-world performance.
                    </AlertDescription>
                </Alert>

                <QueryTimeEstimator />

                <section>
                    <h2 className="text-2xl font-bold mb-4">How to Use the Estimator</h2>
                    <Card className="prose prose-sm max-w-none text-foreground p-6">
                        <p>This tool simulates the performance difference between various query types to help you understand the fundamentals of database optimization.</p>
                        <ol>
                            <li><strong>Set Table and System Parameters:</strong>
                                <ul>
                                    <li><strong>Rows in Table:</strong> Enter the total number of rows in the table you are querying. Notice how this dramatically affects scan times.</li>
                                    <li><strong>Disk Speed (IOPS):</strong> Choose a disk type to simulate I/O performance. An SSD is significantly faster than an HDD. Explore this with our <Link href="/tools/iops-calculator" className="text-primary hover:underline">IOPS Calculator</Link>.</li>
                                </ul>
                            </li>
                            <li><strong>Define Your Query:</strong>
                                <ul>
                                    <li><strong>Query Type:</strong> Select "Full Table Scan" to simulate a query with no index, or "Indexed Read" to simulate a query that can use an index to find data quickly.</li>
                                    <li><strong>Rows to Read / Return:</strong> Enter how many rows the query needs to examine and how many it will return. For a Full Table Scan, "Rows to Read" will default to the entire table.</li>
                                </ul>
                            </li>
                            <li><strong>Analyze the Estimated Time:</strong> The tool will instantly display a theoretical execution time, broken down into I/O time (reading from disk) and CPU time (processing the data). This visualization helps you see which part is the bottleneck.</li>
                        </ol>
                    </Card>
                </section>
                
                <section>
                    <h2 className="text-2xl font-bold mb-4">Worked Examples</h2>
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Example 1: The Fast Indexed Lookup</CardTitle>
                                <CardDescription>Finding a single user by their indexed ID in a large table.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                               <p className="text-sm text-muted-foreground"><strong>Scenario:</strong> You run `SELECT * FROM users WHERE id = 12345;` on a table with 10 million rows, where the `id` column is a primary key (and therefore indexed).</p>
                               <div className="prose prose-sm max-w-none">
                                   <ol>
                                       <li><strong>Inputs:</strong> Rows in Table: `10,000,000`, Query Type: `Indexed Read`, Rows to Return: `1`.</li>
                                       <li><strong>Simulation:</strong> An indexed read is extremely efficient. The database uses the B-Tree index to find the exact location of the row on disk in just a few reads (logarithmic time). Disk I/O is minimal. CPU time is also minimal as it only processes one row.</li>
                                       <li><strong>Result:</strong> The estimated time will be extremely low, likely under <strong>1 ms</strong>. This demonstrates why indexes are essential for fast lookups.</li>
                                   </ol>
                               </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Example 2: The Slow Full Table Scan</CardTitle>
                                <CardDescription>Searching for a piece of text in a non-indexed column.</CardDescription>
                            </CardHeader>
                             <CardContent className="space-y-4">
                               <p className="text-sm text-muted-foreground"><strong>Scenario:</strong> You run `SELECT * FROM logs WHERE message LIKE '%error%';` on a `logs` table with 10 million rows. The `message` column is not indexed.</p>
                               <div className="prose prose-sm max-w-none">
                                   <ol>
                                       <li><strong>Inputs:</strong> Rows in Table: `10,000,000`, Query Type: `Full Table Scan`, Rows to Return: `500` (an estimate).</li>
                                       <li><strong>Simulation:</strong> Since there is no index on the `message` column, the database has no choice but to read every single one of the 10 million rows from the disk and check if the message contains the word "error". Disk I/O time will be the dominant factor.</li>
                                       <li><strong>Result:</strong> The estimated time will be very high, likely measured in <strong>seconds or even minutes</strong>, depending on the disk speed. This clearly illustrates the performance penalty of a full table scan on a large table.</li>
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
                                      <dt><strong>{item.term}</strong></dt>
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
                            <CardTitle className="text-primary">Educational Deep Dive: How a Database Executes a Query</CardTitle>
                        </div>
                        <CardDescription>From the parser to the execution plan, understand the journey your SQL query takes and what makes it fast or slow.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                        <section>
                            <h3>The Query Lifecycle</h3>
                            <p>
                                When you send a SQL query to a database, it doesn't just immediately fetch the data. It goes through a sophisticated, multi-stage process designed to find the most efficient way to get your results.
                            </p>
                            <ol className="list-decimal pl-5">
                               <li><strong>1. Parsing:</strong> The database first checks your query for syntax errors. Is `SELECT` spelled correctly? Are the commas in the right place? If it's not valid SQL, it stops here.</li>
                               <li><strong>2. Binding & Validation:</strong> The database checks if the tables and columns you referenced actually exist and if you have permission to access them.</li>
                               <li><strong>3. Query Optimization:</strong> This is the most critical step. The query optimizer, the "brain" of the database, analyzes your query and considers many different ways to execute it. Should it use Index A? Index B? Should it do a full table scan? Should it join Table A to Table B, or B to A first? It uses internal statistics about your data to estimate the "cost" of each possible path and chooses the one it believes will be the fastest. The result is an <strong>execution plan</strong>.</li>
                               <li><strong>4. Execution:</strong> The database's execution engine takes the plan from the optimizer and carries it out, performing the actual reads from disk or memory, filtering, sorting, and joining the data to produce the final result set.</li>
                            </ol>
                        </section>
                        <section>
                            <h3>The Most Important Decision: Full Table Scan vs. Index Scan</h3>
                            <p>
                                The single most important decision the optimizer makes is how to access the rows from a table. It has two primary choices:
                            </p>
                            <ul className="list-disc pl-5">
                                <li><strong>Full Table Scan:</strong> This is the brute-force approach. The database reads every single row in the table from start to finish and checks if it matches the `WHERE` clause. For a small table, this is very fast. For a table with millions of rows, this is extremely slow and I/O-intensive.</li>
                                <li><strong>Index Scan:</strong> If you have an index on the column in your `WHERE` clause, the database can use it. An index is a sorted data structure (usually a B-Tree) that allows the database to find the exact location of a specific value in logarithmic time, without reading the whole table. This is like using the index at the back of a book instead of reading every page. For finding a small number of rows in a large table, an index scan is thousands of times faster than a full table scan. You can estimate the storage cost of an index with our <Link href="/tools/index-size-calculator" className="text-primary hover:underline">Index Size Calculator</Link>.</li>
                            </ul>
                            <p>This tool helps you visualize the massive performance difference between these two access methods.</p>
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
                                        <h4 className="font-semibold">Use `EXPLAIN ANALYZE`</h4>
                                        <p className="text-sm text-muted-foreground">
                                            The most powerful tool for debugging a slow query is the database's own `EXPLAIN` command. Running `EXPLAIN ANALYZE` before your query will show you the exact execution plan the optimizer chose and how much time was spent on each step. This will tell you definitively if it's using an index or performing a slow table scan.
                                        </p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold">Index Your Foreign Keys</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Always create an index on any column that is a foreign key. This is critical for the performance of `JOIN` operations.
                                        </p>
                                    </div>
                                </li>
                                 <li className="flex items-start gap-4">
                                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold">Cache Your Hot Data</h4>
                                        <p className="text-sm text-muted-foreground">
                                           The fastest disk read is the one you don't have to make. Ensure your database server has enough RAM to cache its most frequently accessed data. For web applications, using a caching layer like Redis can absorb a huge number of read queries before they even hit the database. Our <Link href="/tools/storage-memory-cost-analyzer" className="text-primary hover:underline">Storage vs. Memory Cost Analyzer</Link> illustrates the performance-cost trade-off here.
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

export default QueryTimeEstimatorPage;

