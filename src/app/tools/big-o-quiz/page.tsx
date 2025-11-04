import React from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BookOpen, AlertTriangle, Wand, ChevronRight, CheckCircle, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import BigOQuiz from './big-o-quiz';

export const metadata = {
    title: 'Big-O Complexity Quiz | ICT Tools Hub',
    description: 'Test your understanding of Big O notation by identifying the time complexity of various code snippets. A quick and effective way to sharpen your algorithm analysis skills.',
    openGraph: {
        title: 'Big-O Complexity Quiz | ICT Tools Hub',
        description: 'An interactive quiz to test knowledge of Big O notation and algorithm time complexity.',
        url: 'https://www.icttoolshub.com/tools/big-o-quiz',
    }
};

const BigOComplexityQuizPage = () => {
  const faqPageSchema = {
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
      "name": "Big-O Complexity Quiz",
      "operatingSystem": "All",
      "applicationCategory": "DeveloperApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "An interactive quiz to test knowledge of Big O notation and algorithm time complexity.",
      "url": "https://www.icttoolshub.com/tools/big-o-quiz"
    };

    return (
        <>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
            />
             <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
            />
             <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
            />
            <div className="max-w-4xl mx-auto space-y-12">
                <PageHeader
                    title="Big-O Complexity Quiz"
                    description="Test your understanding of Big O notation by identifying the time complexity of various code snippets. A quick and effective way to sharpen your algorithm analysis skills."
                />
                
                <BigOQuiz />

                <section>
                    <h2 className="text-2xl font-bold mb-4">How to Use the Quiz</h2>
                    <Card className="prose prose-sm max-w-none text-foreground p-6">
                        <p>This quiz is designed to be a quick and interactive learning tool.</p>
                        <ol>
                            <li><strong>Configure Your Quiz:</strong> Choose the difficulty, number of questions you want and set a time limit in minutes.</li>
                            <li><strong>Start the Quiz:</strong> Click the "Start Quiz" button to begin. A random set of questions will be selected.</li>
                            <li><strong>Analyze the Code:</strong> For each question, carefully read the provided JavaScript code snippet. Pay attention to loops, nested loops, and how the function's operations relate to the size of the input.</li>
                            <li><strong>Select an Answer:</strong> Choose the Big O notation that best represents the worst-case time complexity of the function.</li>
                             <li><strong>Proceed or Finish:</strong> Click "Next Question" to continue. After the final question, or when the timer runs out, click "Finish Quiz" to see your score.</li>
                             <li><strong>Review Your Results:</strong> At the end, the tool will show you which questions you got right and wrong, along with detailed explanations for the incorrect answers to help you learn.</li>
                        </ol>
                    </Card>
                </section>
                
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
                            <h3>What is Big O Notation?</h3>
                            <p>
                                Big O notation is a mathematical way to describe the performance and complexity of an algorithm. It answers the fundamental question: "As the input to my algorithm gets bigger, how much slower will it run?" It's not about measuring the exact time in seconds, but about describing the <strong>growth rate</strong> of the algorithm's runtime in the worst-case scenario. This allows developers to compare different solutions and choose the one that will remain efficient and scalable as data volumes increase.
                            </p>
                            <p>
                                When analyzing an algorithm, Big O simplifies the complexity by ignoring constant factors and lower-order terms. For example, an algorithm that takes <strong>3n² + 10n + 5</strong> operations is simply described as <strong>O(n²)</strong>. This is because as the input size `n` becomes very large, the `n²` term will overwhelmingly dominate the runtime, making the other terms insignificant. Understanding this helps in making informed decisions.
                            </p>
                        </section>
                         <section>
                            <h3>The Hierarchy of Common Complexities</h3>
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
                            <h3>Why This Quiz Matters</h3>
                             <p>
                                Being able to look at a piece of code and quickly identify its time complexity is a fundamental skill for any software engineer. It's a common topic in technical interviews and a crucial part of writing performant code. This quiz is designed to help you practice that skill in a fast, interactive format. By internalizing these patterns, you can start to think more critically about the performance implications of the code you write every day. For a more visual exploration, try our <Link href="/tools/big-o-calculator" className="text-primary hover:underline">Time Complexity Estimator</Link>.
                            </p>
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
                                        <h4 className="font-semibold">Identify the Core Loop</h4>
                                        <p className="text-sm text-muted-foreground">
                                            When analyzing your own code, the first step is to find the main loops. A single loop that goes through the input once is likely O(n). A pair of nested loops is often O(n²).
                                        </p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold">Divide and Conquer is Logarithmic</h4>
                                        <p className="text-sm text-muted-foreground">
                                            If your algorithm works by repeatedly dividing the problem set in half (like binary search), it's likely to have an O(log n) component. You can see this in action with our <Link href="/tools/algorithm-simulator" className="text-primary hover:underline">Algorithm Step Simulator</Link>.
                                        </p>
                                    </div>
                                </li>
                                 <li className="flex items-start gap-4">
                                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold">Use the Right Data Structure</h4>
                                        <p className="text-sm text-muted-foreground">
                                           A hash map (or `Object`/`Map` in JavaScript) provides, on average, O(1) constant time for insertions, deletions, and lookups. Using a hash map to check for duplicates is an O(n) operation, which is vastly better than the O(n²) nested loop approach.
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </CardContent>
                     </Card>
                </section>
                
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
                  <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
                  <Card>
                      <CardContent className="p-6">
                          <Accordion type="single" collapsible className="w-full">
                              {faqData.map((item, index) => (
                                  <AccordionItem value={`item-${index}`} key={index}>
                                      <AccordionTrigger>{item.question}</AccordionTrigger>
                                      <AccordionContent>
                                        <div dangerouslySetInnerHTML={{ __html: item.answer.replace(/<a href='([^']*)' class='[^']*'>/g, "<a href='$1' class='text-primary hover:underline'>") }} />
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
                      <Link href="/tools/big-o-calculator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Time Complexity Estimator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Visualize the growth curves of different Big O notations on a graph.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                      <Link href="/tools/algorithm-simulator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Algorithm Step Simulator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Watch algorithms like Bubble Sort (O(n²)) execute step-by-step to see their complexity in action.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                  </div>
              </section>
            </div>
        </>
    );
};

export default BigOComplexityQuizPage;