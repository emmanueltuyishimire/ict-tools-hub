
import React from 'react';
import { PageHeader } from '@/components/page-header';
import { ColumnTypeConverter } from './column-type-converter';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { BookOpen, AlertTriangle, Wand, ChevronRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const metadata = {
    title: 'Column Type Converter & Optimizer | ICT Toolbench',
    description: 'Get recommendations for optimal database column types. Our tool analyzes your sample data to suggest more efficient types like INT, VARCHAR, or TEXT, helping you save storage and improve performance.',
    openGraph: {
        title: 'Column Type Converter & Optimizer | ICT Toolbench',
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
      "name": "Column Type Converter",
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
            <StructuredData data={faqSchema} />
            <StructuredData data={howToSchema} />
            <StructuredData data={softwareAppSchema} />
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
            </div>
        </>
    );
};

export default ColumnTypeConverterPage;
