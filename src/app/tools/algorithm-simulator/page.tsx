

import React from 'react';
import { PageHeader } from '@/components/page-header';
import { AlgorithmStepSimulator } from './algorithm-simulator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { BookOpen, AlertTriangle, Wand, ChevronRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';

export const metadata = {
    title: 'Algorithm Step Simulator | Visualize Sorting & Searching | ICT Toolbench',
    description: 'An interactive, step-by-step simulator to visualize how fundamental algorithms like Bubble Sort and Linear Search work. Perfect for computer science students and developers.',
    openGraph: {
        title: 'Algorithm Step Simulator | Visualize Sorting & Searching | ICT Toolbench',
        description: 'Watch algorithms in action with our step-by-step visualizer. Understand the logic of Bubble Sort, Linear Search, and more with an interactive educational tool.',
        url: '/tools/algorithm-simulator',
    }
};

const AlgorithmSimulatorPage = () => {
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
        "name": "Algorithm Step Simulator",
        "operatingSystem": "All",
        "applicationCategory": "DeveloperApplication",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "description": "An interactive, educational tool to help users visualize how sorting and searching algorithms work on a step-by-step basis.",
        "url": "https://www.icttoolbench.com/tools/algorithm-simulator"
    };

    return (
        <>
            <StructuredData data={faqSchema} />
            <StructuredData data={howToSchema} />
            <StructuredData data={softwareAppSchema} />
            <div className="max-w-4xl mx-auto space-y-12">
                <PageHeader
                    title="Algorithm Step Simulator"
                    description="Visualize the inner workings of fundamental algorithms. Watch step-by-step as data is sorted or searched, making complex logic easy to understand."
                />

                <AlgorithmStepSimulator />

                <section>
                    <h2 className="text-2xl font-bold mb-4">How to Use the Simulator</h2>
                    <Card className="prose prose-sm max-w-none text-foreground p-6">
                        <p>This tool is designed to provide an intuitive, visual understanding of how algorithms process data. Follow these steps to get started:</p>
                        <ol>
                            <li><strong>Select an Algorithm:</strong> Choose which algorithm you'd like to see in action from the dropdown menu, such as <strong>Bubble Sort</strong> or <strong>Linear Search</strong>.</li>
                            <li><strong>Prepare Your Data:</strong> Use the <strong>Randomize</strong> button to create a new array of numbers. If you've selected a search algorithm, an input will appear for you to enter the number you want to find. You can generate custom numbers with our <Link href="/tools/random-number-generator" className="text-primary hover:underline">Random Number Generator</Link>.</li>
                            <li><strong>Control the Simulation:</strong>
                                <ul>
                                    <li>Click <strong>Play</strong> to watch the algorithm run automatically at a set speed.</li>
                                    <li>Click <strong>Pause</strong> to halt the simulation at any point.</li>
                                    <li>Click <strong>Step</strong> to advance the algorithm by one single operation. This is the best way to carefully study the logic.</li>
                                    <li>Click <strong>Reset</strong> to return to the initial state with the same data.</li>
                                </ul>
                            </li>
                            <li><strong>Follow Along:</strong> The visualization will use colors to highlight the elements being compared, swapped, or examined. The log below the visualization provides a plain-English explanation of what is happening at each step.</li>
                        </ol>
                    </Card>
                </section>
                
                <section>
                    <h2 className="text-2xl font-bold mb-4">Worked Examples</h2>
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Example 1: Visualizing Bubble Sort</CardTitle>
                                <CardDescription>Understand how Bubble Sort handles a simple, unsorted array.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                               <p className="text-sm text-muted-foreground"><strong>Scenario:</strong> You want to see how Bubble Sort sorts the array `[60, 20, 40]`. </p>
                               <div className="prose prose-sm max-w-none">
                                   <ol>
                                       <li><strong>Setup:</strong> Select "Bubble Sort" from the algorithm list. Manually create this array or use the randomize function until you get a small array.</li>
                                       <li><strong>Pass 1, Step 1:</strong> Click "Step". The simulator highlights `60` and `20`. The log reads: `Comparing elements at index 0 (60) and 1 (20).` Since 60 > 20, a swap is needed.</li>
                                       <li><strong>Pass 1, Step 2:</strong> Click "Step". The log reads: `Swapping 60 and 20.` Click "Step" again. The array becomes `[20, 60, 40]`.</li>
                                       <li><strong>Pass 1, Step 3:</strong> Click "Step". The simulator highlights `60` and `40`. Since 60 > 40, another swap occurs. The array becomes `[20, 40, 60]`.</li>
                                       <li><strong>End of Pass 1:</strong> The largest element, `60`, is now in its correct final position. The simulator will color it green.</li>
                                       <li><strong>Pass 2:</strong> The simulator compares `20` and `40`. Since they are in the correct order, no swap occurs. The algorithm finishes, as the list is now sorted. This visual feedback makes the O(n²) nature of Bubble Sort, which you can analyze with our <Link href="/tools/big-o-calculator" className="text-primary hover:underline">Time Complexity Estimator</Link>, much clearer.</li>
                                   </ol>
                               </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Example 2: Finding a Value with Linear Search</CardTitle>
                                <CardDescription>Observe the straightforward but methodical process of a Linear Search.</CardDescription>
                            </CardHeader>
                             <CardContent className="space-y-4">
                               <p className="text-sm text-muted-foreground"><strong>Scenario:</strong> You want to find the number `55` in the array `[10, 85, 30, 55, 40]`.</p>
                               <div className="prose prose-sm max-w-none">
                                   <ol>
                                       <li><strong>Setup:</strong> Select "Linear Search", and in the "Value to Find" input, type `55`.</li>
                                       <li><strong>Step 1:</strong> Click "Step". The simulator highlights the first element, `10`. The log indicates it's checking index 0. The value does not match `55`.</li>
                                       <li><strong>Step 2:</strong> Click "Step". The simulator moves to the next element, `85`, and highlights it. No match.</li>
                                       <li><strong>Step 3:</strong> Click "Step". The simulator highlights `30`. No match.</li>
                                       <li><strong>Step 4:</strong> Click "Step". The simulator highlights `55`. The log indicates: `Target 55 found at index 3.` The element is colored green to show a successful find, and the simulation ends.</li>
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
                            <CardTitle className="text-primary">Educational Deep Dive: From Instructions to Insights</CardTitle>
                        </div>
                        <CardDescription>Algorithms are the heart of computer science. Learn how visualizing their behavior demystifies their logic and performance.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                        <section>
                            <h3>What is an Algorithm? The Recipe of Computing</h3>
                            <p>
                                At its core, an algorithm is simply a finite sequence of well-defined, computer-implementable instructions. Think of it as a recipe. A recipe gives you a list of ingredients (input) and a set of steps to follow to produce a dish (output). Similarly, an algorithm takes an input (like an unsorted array of numbers) and follows a precise set of steps (like comparing and swapping elements) to produce a desired output (a sorted array). This simulator lets you watch the "chef" work through the recipe one step at a time.
                            </p>
                        </section>
                        <section>
                            <h3>Bubble Sort: The Simple, Inefficient Classic</h3>
                            <p>
                                <strong>Bubble Sort</strong> is one of the first sorting algorithms taught to computer science students because its logic is very easy to grasp. It works by repeatedly stepping through the list, comparing each pair of adjacent items, and swapping them if they are in the wrong order. The passes through the list are repeated until no swaps are needed, which means the list is sorted.
                            </p>
                            <p>
                                While simple, Bubble Sort is notoriously inefficient. Its performance degrades rapidly as the list size grows, with a worst-case time complexity of <strong>O(n²)</strong>. This means if a list of 10 items takes 100 operations, a list of 100 items could take 10,000 operations. You can analyze this exponential growth with our <Link href="/tools/big-o-calculator" className="text-primary hover:underline">Time Complexity Estimator</Link>. Despite its inefficiency, it's a perfect starting point for understanding how comparison-based sorting works.
                            </p>
                        </section>
                        <section>
                            <h3>Linear Search: A Straightforward Quest</h3>
                            <p>
                                <strong>Linear Search</strong> is the most intuitive search algorithm. To find an item in a list, it starts at the beginning and checks every single element, one by one, until it either finds the target value or reaches the end of the list.
                            </p>
                            <p>
                                Its primary advantage is its simplicity and the fact that it works on any list, sorted or unsorted. Its disadvantage is its inefficiency for large lists, with a time complexity of <strong>O(n)</strong>. In the worst-case scenario (the item is the last element or not in the list at all), it must inspect every single item. For searching large, sorted datasets, much faster algorithms like Binary Search are preferred.
                            </p>
                        </section>
                         <section>
                            <h3>Why Visualization Matters in Learning</h3>
                            <p>
                                Reading about algorithms in a textbook can be abstract and dry. Visualizing an algorithm transforms these abstract steps into a concrete, dynamic process. By watching the elements highlight, move, and settle into place, you build a strong mental model of the algorithm's behavior. This simulator helps you see:
                            </p>
                            <ul className="list-disc pl-5">
                                <li><strong>The Flow of Logic:</strong> You can follow the comparisons and swaps exactly as the computer would, step by step.</li>
                                <li><strong>Performance Differences:</strong> When more algorithms are added, you'll be able to run them on the same dataset and visually see why one is faster than another.</li>
                                <li><strong>Edge Cases:</strong> You can see how an algorithm performs on an already-sorted list versus a reverse-sorted list, which often represent best-case and worst-case scenarios.</li>
                            </ul>
                        </section>
                    </CardContent>
                </Card>

                <section>
                    <h2 className="text-2xl font-bold mb-4">Practical Tips for Learning</h2>
                     <Card>
                        <CardContent className="p-6">
                            <ul className="space-y-4">
                                <li className="flex items-start gap-4">
                                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold">Focus on One Step at a Time</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Don't just hit "Play". Use the "Step" button to walk through the algorithm slowly. Read the log message at each step and make sure you understand why the algorithm is making that specific move. This deliberate practice is the key to deep understanding.
                                        </p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold">Predict the Next Move</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Pause the simulation and ask yourself: "What will happen next?" Which elements will be compared? Will a swap occur? Making a prediction and then verifying it with the next step is a powerful active learning technique.
                                        </p>
                                    </div>
                                </li>
                                 <li className="flex items-start gap-4">
                                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold">Connect to Big O Notation</h4>
                                        <p className="text-sm text-muted-foreground">
                                            As you watch, think about the number of operations. For Bubble Sort, notice how it makes multiple passes over the list. This is a visual representation of its O(n²) complexity. Compare this to the single pass of Linear Search (O(n)). Use our <Link href="/tools/big-o-calculator" className="text-primary hover:underline">Time Complexity Estimator</Link> to explore these concepts further.
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
                                <li><strong>Use the "Step" Button:</strong> The best way to learn is to use the "Step" button to walk through the algorithm one operation at a time. Read the log message for each step to connect the visual change to the underlying logic.</li>
                                <li><strong>Predict the Next Move:</strong> Pause the simulation and try to predict what the algorithm will do next. Which elements will be compared? Will a swap occur? This active learning reinforces the concepts.</li>
                                <li><strong>Compare Algorithms:</strong> Run Bubble Sort on a dataset, then reset and run a different sorting algorithm (when available) on the same data. This will visually demonstrate the vast differences in efficiency between algorithms.</li>
                                <li><strong>Think About Edge Cases:</strong> Use the "Randomize" button to generate different datasets. How does Bubble Sort perform on a list that is already sorted? Or a list that is reverse-sorted? These are important edge cases.</li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Misconceptions</CardTitle></div>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                                <li><strong>"Simple means fast":</strong> Bubble Sort is easy to understand, but it's one of the slowest sorting algorithms for all but the smallest lists. Algorithmic efficiency is often counter-intuitive.</li>
                                <li><strong>"I need to sort first to search":</strong> This is only true for efficient search algorithms like Binary Search. Linear Search works perfectly fine on unsorted data, which is sometimes its main advantage.</li>
                                <li><strong>Ignoring Data Structures:</strong> The choice of algorithm is often tied to the choice of data structure. For example, search operations on a hash table can be O(1) on average, which is vastly faster than O(n) for a linear search on an array.</li>
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
                        <Link href="/tools/big-o-calculator" className="block">
                            <Card className="hover:border-primary transition-colors h-full">
                                <CardHeader>
                                    <CardTitle className="text-base flex items-center justify-between">Time Complexity Estimator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                    <CardDescription className="text-xs">Analyze the Big O notation of the algorithms you are visualizing to understand their performance at scale.</CardDescription>
                                </CardHeader>
                            </Card>
                        </Link>
                        <Link href="/tools/random-number-generator" className="block">
                            <Card className="hover:border-primary transition-colors h-full">
                                <CardHeader>
                                    <CardTitle className="text-base flex items-center justify-between">Random Number Generator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                    <CardDescription className="text-xs">Generate different datasets to test how the algorithms perform with different inputs.</CardDescription>
                                </CardHeader>
                            </Card>
                        </Link>
                         <Link href="/tools/recursion-simulator" className="block">
                            <Card className="hover:border-primary transition-colors h-full">
                                <CardHeader>
                                    <CardTitle className="text-base flex items-center justify-between">Recursion Simulator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                    <CardDescription className="text-xs">Visualize recursive function calls, a common technique in more advanced algorithms.</CardDescription>
                                </CardHeader>
                            </Card>
                        </Link>
                    </div>
                </section>
            </div>
        </>
    );
};

export default AlgorithmSimulatorPage;
