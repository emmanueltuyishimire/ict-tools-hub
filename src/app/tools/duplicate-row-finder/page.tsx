
import React from 'react';
import { PageHeader } from '@/components/page-header';
import { DuplicateRowFinder } from './duplicate-row-finder';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BookOpen, AlertTriangle, Wand, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';

export const metadata = {
    title: 'Duplicate Row Finder | Data Cleaning Tool | ICT Toolbench',
    description: 'Quickly find and analyze duplicate rows in your text or CSV data. An essential tool for data cleaning, database preparation, and ensuring data quality.',
    openGraph: {
        title: 'Duplicate Row Finder | Data Cleaning Tool | ICT Toolbench',
        description: 'Easily identify duplicate entries in any list of data to clean your dataset before analysis or import.',
        url: '/tools/duplicate-row-finder',
    }
};

const DuplicateRowFinderPage = () => {
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
      "name": "Duplicate Row Finder",
      "operatingSystem": "All",
      "applicationCategory": "DeveloperApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "A free, client-side tool to find and analyze duplicate rows in a text or CSV dataset.",
      "url": "https://www.icttoolbench.com/tools/duplicate-row-finder"
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
            <div className="max-w-4xl mx-auto space-y-12">
                <PageHeader
                    title="Duplicate Row Finder"
                    description="An essential data cleaning tool that helps you find duplicate rows in any text-based dataset. Paste your data to get a quick analysis of duplicate entries, their frequency, and their locations."
                />
                
                <DuplicateRowFinder />

                <section>
                    <h2 className="text-2xl font-bold mb-4">How to Use This Tool</h2>
                    <Card className="prose prose-sm max-w-none text-foreground p-6">
                        <p>This tool simplifies the process of identifying duplicate entries in a list of data.</p>
                        <ol>
                            <li><strong>Paste Your Data:</strong> In the "Input Data" text area, paste your data. The tool assumes that each line represents a single row or record.</li>
                            <li><strong>Find Duplicates:</strong> Click the "Find Duplicates" button to start the analysis. All processing is done securely in your browser.</li>
                            <li><strong>Review the Summary:</strong> An "Analysis Summary" card will appear, showing you the total number of rows, the count of unique rows, and the count of duplicate rows.</li>
                            <li><strong>Analyze the Duplicates Table:</strong> If duplicates are found, a table will list each duplicate entry, how many times it appeared (count), and the specific line numbers where it was found.</li>
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
                            <CardTitle className="text-primary">Educational Deep Dive: The Importance of Data Quality</CardTitle>
                        </div>
                        <CardDescription>From skewed analytics to failed database imports, understand why duplicate data is a silent killer of data integrity and how to combat it.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                        <section>
                            <h3>What is Data Quality and Why Does it Matter?</h3>
                            <p>
                                Data quality refers to the overall state of completeness, validity, consistency, timeliness, and accuracy that makes data appropriate for a specific use. High-quality data is the foundation of sound business intelligence, reliable machine learning models, and efficient operations. Poor data quality, on the other hand, leads to flawed analysis, bad business decisions, and failed IT projects.
                            </p>
                            <p>
                                Duplicate records are one of the most common and corrosive data quality issues. They can skew analytics, waste resources, and create a confusing experience for users. Identifying and handling duplicates is a fundamental first step in any data cleaning or preparation process.
                            </p>
                        </section>
                        <section>
                            <h3>Common Causes of Duplicate Data</h3>
                            <p>Duplicates can enter a system in many ways:</p>
                            <ul className="list-disc pl-5">
                                <li><strong>Manual Data Entry Errors:</strong> A user signing up for a service multiple times with the same email address, or a data entry clerk accidentally creating two records for the same customer.</li>
                                <li><strong>Data Migration Issues:</strong> Errors during a data migration project where records are imported more than once.</li>
                                <li><strong>Integration Problems:</strong> When two different systems are integrated (e.g., a CRM and an e-commerce platform), slight variations in data format can lead to the creation of duplicate entities.</li>
                                <li><strong>Batch Processing Failures:</strong> A batch job that fails and is re-run without proper checks can insert the same set of records twice.</li>
                            </ul>
                        </section>
                         <section>
                            <h3>Strategies for Handling Duplicates</h3>
                            <p>
                                Once duplicates are identified with a tool like this one, you need a strategy to handle them. The approach depends on the context:
                            </p>
                             <ul className="list-disc pl-5">
                               <li><strong>Deletion:</strong> For simple lists or non-critical data, the most straightforward approach is to delete the duplicate entries, keeping only the first or last occurrence.</li>
                               <li><strong>Merging:</strong> For complex records like customer profiles, you can't just delete one. You need to perform a 'merge' operation, where you create a single 'golden record' that combines the best information from all the duplicate entries before deleting the redundant ones.</li>
                               <li><strong>Prevention:</strong> The best strategy is prevention. In a relational database, you can use `UNIQUE` constraints on columns like `email` to prevent duplicate records from being created in the first place. You can explore this concept with our <Link href="/tools/key-validator" className="text-primary hover:underline">Primary / Foreign Key Validator</Link>.</li>
                            </ul>
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
                                <li><strong>Normalize Your Data First:</strong> Before checking for duplicates, it's often a good idea to normalize your data. This could involve converting all text to lowercase, trimming leading/trailing whitespace, and standardizing date formats to ensure that 'apple' and ' Apple ' are treated as the same entry.</li>
                                <li><strong>Use for CSVs:</strong> While this tool checks entire rows, you can paste a single column from a CSV file to find duplicate values within that specific field (e.g., finding all duplicate email addresses).</li>
                                <li><strong>Use the Command Line for Large Files:</strong> For very large files, this browser-based tool may become slow. Command-line tools in Linux are extremely powerful for this task: `sort data.txt | uniq -d` will show you all duplicate lines in a file.</li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                             <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                        </CardHeader>
                        <CardContent>
                             <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                                <li><strong>Ignoring Case Sensitivity:</strong> Remember that 'Apple' and 'apple' are treated as different strings. Always consider whether you should convert your data to a single case before checking for duplicates.</li>
                                <li><strong>Forgetting About Whitespace:</strong> A common source of "missed" duplicates is hidden whitespace. A line with a trailing space (`"banana "`) will be treated as different from one without (`"banana"`).</li>
                                <li><strong>Relying on a Single Column:</strong> When cleaning a database, finding duplicate emails is a good start, but two people can share an email. A true duplicate check often involves comparing multiple fields (e.g., name, address, and email).</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
                
                <section>
                    <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Cleaning a Mailing List</h3>
                            <p className="text-sm text-muted-foreground">A marketing manager exports a list of 5,000 email addresses for a new campaign. Before importing it into their email marketing software, they paste the entire list into this tool. It finds 150 duplicate entries, which they can remove to save money and avoid sending the same person multiple emails.</p>
                        </div>
                         <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Preparing for a Database Import</h3>
                            <p className="text-sm text-muted-foreground">A data analyst receives a CSV file of product data from a supplier. Before importing it into their database, which has a unique constraint on the `product_sku` column, they paste the entire SKU column into the duplicate finder. This allows them to identify and resolve any duplicate SKUs in the source file, preventing the database import from failing.</p>
                        </div>
                         <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Analyzing Log File Entries</h3>
                            <p className="text-sm text-muted-foreground">A developer is debugging an issue and suspects a specific error message is flooding their log files. They extract all the error messages from the log, paste them into this tool, and instantly see that the error "Connection timed out" has appeared 5,280 times, confirming their suspicion and helping them focus their debugging efforts.</p>
                        </div>
                         <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">SEO Keyword Management</h3>
                            <p className="text-sm text-muted-foreground">An SEO specialist combines keyword lists from three different tools into one large list. To create a master list of unique keywords to target, they paste the combined list into the duplicate finder to easily remove all redundant entries and get a clean, unique set of keywords to work with.</p>
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
                       <Link href="/tools/key-validator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Primary / Foreign Key Validator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Learn how unique constraints in databases help prevent duplicate records.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                      <Link href="/tools/db-storage-estimator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Database Storage Estimator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Estimate how much space your data, including duplicates, is consuming.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                       <Link href="/tools/csv-json-converter" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">CSV &lt;-&gt; JSON Converter<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Convert your data between formats before or after cleaning.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                  </div>
              </section>
            </div>
        </>
    );
};

export default DuplicateRowFinderPage;
