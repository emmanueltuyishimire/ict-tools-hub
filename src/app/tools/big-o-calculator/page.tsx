

import React from 'react';
import { PageHeader } from '@/components/page-header';
import { BigOCalculator } from './big-o-calculator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { Lightbulb, AlertTriangle, BookOpen, ChevronRight, Wand, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export const metadata = {
    title: 'Time Complexity Estimator & Big O Calculator | ICT Toolbench',
    description: 'An interactive Big O calculator to estimate and visualize algorithm time complexity. Learn the fundamentals of O(n), O(log n), O(n²) with examples and guides.',
    openGraph: {
        title: 'Time Complexity Estimator & Big O Calculator | ICT Toolbench',
        description: 'Visualize how algorithms scale with our interactive Big O calculator. Essential for students and developers learning about time complexity and performance.',
        url: '/tools/big-o-calculator',
    }
};

const BigOCalculatorPage = () => {
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
      "name": "Time Complexity Estimator (Big O Calculator)",
      "operatingSystem": "All",
      "applicationCategory": "DeveloperApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "An interactive, educational tool to help users understand and visualize Big O notation and the performance of common algorithms as data scales.",
      "url": "https://www.icttoolbench.com/tools/big-o-calculator"
    };

    return (
        <>
            <StructuredData data={faqSchema} />
            <StructuredData data={howToSchema} />
            <StructuredData data={softwareAppSchema} />
            <div className="max-w-4xl mx-auto space-y-12">
                <PageHeader
                    title="Time Complexity Estimator (Big O Calculator)"
                    description="An interactive, educational tool to help you understand and visualize Big O notation and the performance of common algorithms as data scales."
                />
                
                <BigOCalculator />

                <section>
                    <h2 className="text-2xl font-bold mb-4">How to Use the Estimator</h2>
                    <Card className="prose prose-sm max-w-none text-foreground p-6">
                        <p>This tool is designed to provide an intuitive understanding of how different algorithmic complexities behave as the amount of data they process grows.</p>
                        <ol>
                            <li><strong>Select a Complexity:</strong> Choose a Big O notation from the dropdown menu (e.g., `O(n)`, `O(n²)`, `O(log n)`). The chart and explanations will update instantly.</li>
                            <li><strong>Adjust Input Size `n`:</strong> Use the slider to increase or decrease the input size `n`. Watch how the line on the chart changes. For complexities like `O(n²)` or `O(2ⁿ)`, you'll see the number of operations explode as `n` gets larger.</li>
                            <li><strong>Analyze the Chart:</strong> The chart provides a visual representation of the growth rate. A flat line (`O(1)`) is ideal, while a line that curves sharply upwards (`O(n²)`) signals a potential performance bottleneck at scale.</li>
                            <li><strong>Review the Code Example:</strong> Below the chart, a simple JavaScript code snippet demonstrates a common algorithm with the selected time complexity, helping you connect the abstract theory to real-world code.</li>
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
                            <CardTitle className="text-primary">Educational Deep Dive: A Developer's Guide to Big O</CardTitle>
                        </div>
                        <CardDescription>From constant time to exponential growth, understand the language of algorithmic efficiency and write code that scales.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                        <section>
                            <h3 className="font-bold text-xl">What is Big O Notation?</h3>
                            <p>
                                Big O notation is a mathematical way to describe the performance and complexity of an algorithm. It answers the fundamental question: "As the input to my algorithm gets bigger, how much slower will it run?" It's not about measuring the exact time in seconds, but about describing the <strong>growth rate</strong> of the algorithm's runtime in the worst-case scenario. This allows developers to compare different solutions and choose the one that will remain efficient and scalable as data volumes increase.
                            </p>
                            <p>
                                When analyzing an algorithm, Big O simplifies the complexity by ignoring constant factors and lower-order terms. For example, an algorithm that takes <strong>3n² + 10n + 5</strong> operations is simply described as <strong>O(n²)</strong>. This is because as the input size `n` becomes very large, the `n²` term will overwhelmingly dominate the runtime, making the other terms insignificant. Understanding this helps in making informed decisions, similar to how our <Link href="/tools/response-time-calculator" className='text-primary hover:underline'>Response Time Calculator</Link> helps in understanding server performance beyond just raw speed.
                            </p>
                        </section>
                        <section>
                            <h3 className="font-bold text-xl">The Hierarchy of Common Complexities</h3>
                            <p>Understanding the common Big O complexities is essential for any developer. They form a hierarchy from best to worst performance at scale:</p>
                             <div className="overflow-x-auto my-4">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Notation</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Typical Example</TableHead>
                                            <TableHead>Performance</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow><TableCell className='font-code'>O(1)</TableCell><TableCell>Constant</TableCell><TableCell>Accessing an array index</TableCell><TableCell className='text-green-600 font-semibold'>Excellent</TableCell></TableRow>
                                        <TableRow><TableCell className='font-code'>O(log n)</TableCell><TableCell>Logarithmic</TableCell><TableCell>Binary search</TableCell><TableCell className='text-green-600 font-semibold'>Excellent</TableCell></TableRow>
                                        <TableRow><TableCell className='font-code'>O(n)</TableCell><TableCell>Linear</TableCell><TableCell>Looping through a list</TableCell><TableCell className='text-lime-600 font-semibold'>Good</TableCell></TableRow>
                                        <TableRow><TableCell className='font-code'>O(n log n)</TableCell><TableCell>Linearithmic</TableCell><TableCell>Efficient sorting (Merge Sort)</TableCell><TableCell className='text-yellow-600 font-semibold'>Fair</TableCell></TableRow>
                                        <TableRow><TableCell className='font-code'>O(n²)</TableCell><TableCell>Quadratic</TableCell><TableCell>Nested loops (Bubble Sort)</TableCell><TableCell className='text-orange-600 font-semibold'>Poor</TableCell></TableRow>
                                        <TableRow><TableCell className='font-code'>O(2ⁿ)</TableCell><TableCell>Exponential</TableCell><TableCell>Recursive Fibonacci</TableCell><TableCell className='text-red-600 font-semibold'>Terrible</TableCell></TableRow>
                                        <TableRow><TableCell className='font-code'>O(n!)</TableCell><TableCell>Factorial</TableCell><TableCell>Traveling Salesman (brute force)</TableCell><TableCell className='text-red-800 font-semibold'>Unusable</TableCell></TableRow>
                                    </TableBody>
                                </Table>
                             </div>
                        </section>
                         <section>
                            <h3 className="font-bold text-xl">Time vs. Space Complexity</h3>
                            <p>
                                While this tool focuses on <strong>Time Complexity</strong> (how long an algorithm takes to run), it's also important to consider <strong>Space Complexity</strong>. Space complexity measures how much additional memory (RAM) an algorithm requires as the input size grows. Sometimes, you can trade space for time, or vice-versa. An algorithm might be very fast but use a lot of memory, while another might be slower but more memory-efficient. A good developer understands this trade-off and chooses the best approach for the given constraints of the problem. For instance, caching results consumes more memory (space) but drastically reduces the time needed for subsequent calculations.
                            </p>
                        </section>
                    </CardContent>
                </Card>

                 <section>
                    <h2 className="text-2xl font-bold mb-4">Worked Examples</h2>
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Example 1: Finding a User in a List (Linear Time - O(n))</CardTitle>
                                <CardDescription>A common task is searching for an item in a collection. If the collection is unsorted, the approach is straightforward but has clear performance implications.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                               <p className="text-sm text-muted-foreground"><strong>Scenario:</strong> You have an array of 1,000 user objects, and you need to find the user with a specific email address.</p>
                               <div className="prose prose-sm max-w-none">
                                   <ol>
                                       <li>The algorithm starts at the first user in the array.</li>
                                       <li>It checks if that user's email matches the one you're looking for.</li>
                                       <li>If it doesn't match, it moves to the next user and repeats the process.</li>
                                   </ol>
                               </div>
                               <p className="text-sm text-muted-foreground"><strong>Worst Case:</strong> The user you are looking for is the very last one in the array, or not in the array at all. The algorithm must check all 1,000 users. If the list grows to 1,000,000 users, the worst-case scenario requires 1,000,000 checks. The number of operations grows in a straight, linear line with the number of users, `n`. This is <strong>O(n)</strong> complexity.</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Example 2: Finding Duplicates (Quadratic Time - O(n²))</CardTitle>
                                <CardDescription>A naive approach to finding if any duplicates exist in a list involves comparing every item to every other item.</CardDescription>
                            </CardHeader>
                             <CardContent className="space-y-4">
                               <p className="text-sm text-muted-foreground"><strong>Scenario:</strong> You have a list of 100 product IDs and you need to verify if there are any duplicates.</p>
                               <div className="prose prose-sm max-w-none">
                                   <ol>
                                       <li>The algorithm takes the first product ID.</li>
                                       <li>It then loops through the entire list again, comparing the first ID to every other ID.</li>
                                       <li>Once finished, it takes the second product ID and repeats the process, comparing it to every other ID.</li>
                                       <li>This continues until every item has been compared to every other item.</li>
                                   </ol>
                               </div>
                               <p className="text-sm text-muted-foreground"><strong>Worst Case:</strong> For a list of 100 items, this results in 100 × 100 = 10,000 comparisons. If the list grows to 1,000 items, it becomes 1,000,000 comparisons. The number of operations grows with the square of the input size, `n`. This is <strong>O(n²)</strong> complexity and becomes very slow, very quickly. A more efficient approach would use a hash set, which has an average time complexity of O(n).</p>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <div className="grid md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <div className='flex items-center gap-2'><Wand className="h-6 w-6 text-accent" /> <CardTitle>Pro Tips</CardTitle></div>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                                <li><strong>Identify the Core Loop:</strong> When analyzing your own code, the first step is to find the main loops. A single loop that goes through the input once is likely O(n). A pair of nested loops is often O(n²).</li>
                                <li><strong>Divide and Conquer is Logarithmic:</strong> If your algorithm works by repeatedly dividing the problem set in half (like binary search), it's likely to have an O(log n) component.</li>
                                <li><strong>Worry About Scale:</strong> Don't prematurely optimize for a small dataset. For an input of 100 items, the difference between O(n) and O(n²) is negligible. Big O matters when your data scales to thousands or millions of items.</li>
                                <li><strong>Hash Maps are O(1) on Average:</strong> A hash map (or Dictionary/Object in JavaScript) provides, on average, O(1) constant time for insertions, deletions, and lookups, making it an incredibly powerful data structure for performance.</li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                             <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                        </CardHeader>
                        <CardContent>
                             <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                                <li><strong>Ignoring Best/Average Case:</strong> Big O describes the worst case. While this is the most important for guaranteeing performance, be aware that an algorithm's average or best-case performance might be much better.</li>
                                <li><strong>Dropping the Wrong Terms:</strong> When simplifying an expression like `O(n² + n)`, the `n` is dropped. However, in `O(n + log n)`, the `log n` is dropped. Always drop the lower-order (faster-growing) term.</li>
                                <li><strong>Confusing `O(n log n)` with `O(n)`:</strong> While efficient, `O(n log n)` is definitively slower than `O(n)`. For very large datasets, this difference can be significant.</li>
                                <li><strong>Thinking Constants Don't Matter:</strong> While Big O ignores constants, in the real world they matter for smaller datasets. An algorithm that is `O(n)` but has a very large constant factor might be slower than an `O(n²)` algorithm for a small `n`. Big O is a tool for analyzing scalability, not for micro-benchmarking.</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
                
                <section>
                    <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Social Media Feed</h3>
                            <p className="text-sm text-muted-foreground">To display a user's feed, a social media app needs to fetch the 50 most recent posts from people they follow. This operation is typically O(1) or O(log n), as it fetches a fixed number of items from an indexed database, regardless of how many total posts exist. It's fast and scalable.</p>
                        </div>
                        <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Finding "Friends of Friends"</h3>
                            <p className="text-sm text-muted-foreground">To suggest new connections, a social network might check for "friends of friends". This involves iterating through all of your friends, and then for each friend, iterating through all of their friends. This nested loop approach leads to O(n²) complexity, which can be slow if you have many friends with many connections.</p>
                        </div>
                        <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Autocomplete Search</h3>
                            <p className="text-sm text-muted-foreground">When you type into a search bar and it suggests completions, this is often powered by a specialized data structure called a Trie. Searching a Trie is O(k) where k is the length of the string you've typed, not the total number of possible words. This makes it incredibly fast and feel instantaneous.</p>
                        </div>
                        <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Sorting an E-commerce Product List</h3>
                            <p className="text-sm text-muted-foreground">An e-commerce site needs to sort thousands of products by price. If it used an inefficient O(n²) sorting algorithm (like bubble sort), the page could take many seconds to load. By using an efficient O(n log n) algorithm (like merge sort or quicksort), the sorting is completed in milliseconds, providing a smooth user experience.</p>
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
                                        <h4 className="font-semibold">Optimize Your Database</h4>
                                        <p className="text-sm text-muted-foreground">
                                            A slow database query can turn a fast <strong>O(1)</strong> request into a multi-second ordeal. Ensure your tables are properly indexed. An index acts like a sorted list for your data, allowing the database to use efficient <strong>O(log n)</strong> search algorithms instead of a full <strong>O(n)</strong> table scan.
                                        </p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold">Choose the Right Data Structure</h4>
                                        <p className="text-sm text-muted-foreground">
                                            The data structure you choose has a profound impact on time complexity. Need fast lookups? A hash map (`Object` or `Map` in JS) offers average <strong>O(1)</strong> access. Need sorted data? A balanced binary search tree provides <strong>O(log n)</strong> insertions and lookups. Knowing the Big O of common operations for different data structures is key.
                                        </p>
                                    </div>
                                </li>
                                 <li className="flex items-start gap-4">
                                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold">Generate Test Data</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Your algorithm might be fast with 100 items, but how does it perform with 100,000? Use our <Link href="/tools/random-number-generator" className="text-primary hover:underline">Random Number Generator</Link> or <Link href="/tools/random-string-generator" className="text-primary hover:underline">Random String Generator</Link> to create large datasets to test your code's performance at scale and see if your Big O analysis holds true.
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
                                        <div dangerouslySetInnerHTML={{ __html: item.answer.replace('Random Number Generator', "<a href='/tools/random-number-generator' class='text-primary hover:underline'>Random Number Generator</a>") }} />
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
                      <Link href="/tools/algorithm-simulator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Algorithm Step Simulator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Visually step through algorithms like Bubble Sort (O(n²)) to see their complexity in action.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                      <Link href="/tools/random-number-generator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Random Number Generator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Generate large datasets to test the performance of your algorithms.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                      <Link href="/tools/data-transfer-calculator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Data Transfer Time Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Understand how the amount of data (`n`) impacts transfer times, a related performance concept.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                  </div>
              </section>
            </div>
        </>
    );
};

export default BigOCalculatorPage;

    
