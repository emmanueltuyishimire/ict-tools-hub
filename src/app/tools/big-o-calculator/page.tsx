
import { PageHeader } from '@/components/page-header';
import { BigOCalculator } from './big-o-calculator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { Lightbulb, AlertTriangle, BookOpen, ChevronRight, Wand } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
    title: 'Time Complexity Estimator & Big O Calculator | ICT Toolbench',
    description: 'Learn and visualize Big O notation with our Time Complexity Estimator. Understand how algorithms scale with O(1), O(n), O(log n), O(n²), and more.',
    openGraph: {
        title: 'Time Complexity Estimator & Big O Calculator | ICT Toolbench',
        description: 'An interactive guide to understanding algorithm efficiency. Visualize Big O complexities, see code examples, and learn why performance matters.',
        url: '/tools/big-o-calculator',
    }
};

const faqData = [
    { question: "What is Big O notation?", answer: "Big O notation is a mathematical notation used in computer science to describe the performance or complexity of an algorithm. It specifically describes the worst-case scenario, focusing on how the execution time or space requirements grow as the input size increases." },
    { question: "Why is Big O notation important?", answer: "It allows developers to compare the efficiency of different algorithms in a standardized way, independent of hardware or programming language. Understanding Big O helps in choosing the most efficient solution for a problem, especially when dealing with large datasets where performance is critical." },
    { question: "Is O(1) the best complexity?", answer: "Yes, O(1) or 'Constant Time' is the ideal complexity. It means that the algorithm's execution time is constant and does not change, regardless of the size of the input data. An example is accessing an element in an array by its index." },
    { question: "What's the difference between `O(n)` and `O(log n)`?", answer: "`O(n)` (Linear Time) means the time grows directly in proportion to the input size `n`. If you double the input, you double the time. `O(log n)` (Logarithmic Time) is much more efficient; the time grows very slowly as the input size increases. Doubling the input size only increases the time by a constant amount. Binary search is a classic example of O(log n)." },
    { question: "Why should I avoid `O(n²)` or `O(2^n)` algorithms for large inputs?", answer: "`O(n²)` (Quadratic Time) and `O(2^n)` (Exponential Time) have a performance that degrades very quickly as the input size grows. For `O(n²)`, doubling the input size quadruples the run time. For `O(2^n)`, every single addition to the input size doubles the run time. These complexities are only practical for very small datasets." },
    { question: "Does this tool actually calculate the Big O of my code?", answer: "No, this is an educational tool designed to help you *understand* and *visualize* different time complexities. Automatically determining the Big O of an arbitrary piece of code is an extremely complex problem (related to the Halting Problem) and is not what this tool does. Instead, it provides canonical examples for each complexity class." },
    { question: "What about best-case (Omega) and average-case (Theta) notation?", answer: "Big O describes the upper bound or worst-case performance. Big Omega (Ω) describes the lower bound or best-case scenario. Big Theta (Θ) describes the tight bound, or average-case scenario. While all are important in academic analysis, Big O is the most commonly used in the industry because developers are often most concerned with preparing for the worst-case performance." },
    { question: "Can constants and lower-order terms be ignored?", answer: "Yes. In Big O notation, we are only concerned with the long-term growth rate. Therefore, constants and lower-order terms are dropped. An algorithm that is `O(2n + 1)` is simplified to `O(n)`. An algorithm that is `O(n² + n)` is simplified to `O(n²)`, because as `n` becomes very large, the `n²` term completely dominates the growth rate." },
    { question: "How does recursion affect time complexity?", answer: "Recursion can lead to various complexities. A simple recursive function that calls itself once per execution might be O(n), like in a factorial calculation. However, a function that calls itself twice on a smaller problem size, like a naive Fibonacci implementation, can lead to exponential O(2^n) complexity. Our <a href='/tools/recursion-simulator' class='text-primary hover:underline'>Recursion Simulator</a> can help visualize these call stacks." },
    { question: "Does Big O apply to memory usage as well?", answer: "Yes. While this tool focuses on Time Complexity, Big O notation is also used to describe Space Complexity, which is how an algorithm's memory usage grows with the input size. For example, an algorithm that creates a copy of an input array has O(n) space complexity." }
];

const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Use the Time Complexity Explorer',
    description: 'A guide to understanding different Big O notations.',
    step: [
        { '@type': 'HowToStep', name: 'Select a Complexity', text: 'Choose a Big O notation (e.g., O(n), O(log n)) from the dropdown menu.' },
        { '@type': 'HowToStep', name: 'Analyze the Graph', text: 'Observe the performance graph to see a visual representation of how the number of operations (time) scales as the input size (n) increases.' },
        { '@type': 'HowToStep', name: 'Review the Example', text: 'Examine the example code provided to understand a common algorithm or operation that results in the selected time complexity.' },
        { '@type': 'HowToStep', name: 'Compare Performance', text: 'The performance table gives a concrete comparison of the number of operations for different input sizes, illustrating how quickly inefficient algorithms become impractical.' },
    ],
    totalTime: 'PT3M'
};

const keyTerminologies = [
    { term: 'Time Complexity', definition: 'A concept in computer science that describes the amount of time an algorithm takes to run as a function of the length of the input.' },
    { term: 'Big O Notation', definition: 'A mathematical notation that describes the limiting behavior of a function when the argument tends towards a particular value or infinity. Used to classify algorithms according to their worst-case run-time or space requirements.' },
    { term: 'Algorithm', definition: 'A finite sequence of well-defined, computer-implementable instructions, typically to solve a class of problems or to perform a computation.' },
    { term: 'Input Size (n)', definition: 'A measure of the size of the data that an algorithm processes (e.g., the number of elements in an array).' },
    { term: 'Scalability', definition: 'The measure of a system\'s ability to handle a growing amount of work by adding resources to the system.' },
    { term: 'Space Complexity', definition: 'A measure of the amount of memory space an algorithm requires in relation to the size of its input.' }
];

export default function BigOCalculatorPage() {
    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqData.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer.replace(/<[^>]*>?/gm, '') } }))
    };

    return (
        <>
            <StructuredData data={faqSchema} />
            <StructuredData data={howToSchema} />
            <PageHeader
                title="Time Complexity Estimator"
                description="An interactive, educational tool to help you understand and visualize Big O notation and the performance of common algorithms as data scales."
            />
            
            <div className="max-w-4xl mx-auto space-y-12">
                <BigOCalculator />

                <section>
                    <h2 className="text-2xl font-bold mb-4">How to Use This Tool</h2>
                    <Card className="prose prose-sm max-w-none text-foreground p-6">
                        <p>This tool is an interactive explorer designed to help students, developers, and interview candidates build an intuitive understanding of algorithm efficiency.</p>
                        <ol>
                            <li><strong>Select a Time Complexity:</strong> Choose a Big O notation from the dropdown menu, such as `O(1)`, `O(n)`, or `O(n²)`.</li>
                            <li><strong>Analyze the Growth Curve:</strong> The chart provides a powerful visual representation of the selected complexity. Notice how `O(n²)` curves upwards dramatically, while `O(log n)` flattens out, illustrating how each complexity class scales as the input size (`n`) increases.</li>
                            <li><strong>Study the Code Example:</strong> Review the provided JavaScript code snippet. It shows a common, real-world example of an algorithm that exhibits the chosen time complexity.</li>
                            <li><strong>Compare the Performance Table:</strong> The table gives you concrete numbers, showing the estimated number of operations for different input sizes. This clearly demonstrates why a complexity like `O(n²)` is fine for 10 items but disastrous for 1,000.</li>
                        </ol>
                    </Card>
                </section>

                <Card className='bg-secondary/30 border-primary/20'>
                    <CardHeader>
                        <div className='flex items-center gap-2 text-primary'>
                            <BookOpen className="h-6 w-6" aria-hidden="true" />
                            <CardTitle className="text-primary">Educational Deep Dive: Thinking in Big O</CardTitle>
                        </div>
                        <CardDescription>From constant time to exponential explosions, understand the fundamental language of algorithm efficiency.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                        <section>
                            <h3 className="font-bold text-xl">What is Algorithmic Complexity?</h3>
                            <p>When you write code to solve a problem, there are often many different ways to do it. Algorithmic complexity is a way to measure how "good" a solution is, not in terms of correctness, but in terms of its efficiency. It helps us answer the question: "How will this algorithm perform as the amount of data it has to process gets larger?" We primarily measure two things: **Time Complexity** (how long it takes to run) and **Space Complexity** (how much memory it uses). This tool focuses on Time Complexity.</p>
                            <p>Big O notation is the language we use to express this complexity. It describes the **worst-case scenario** for an algorithm's performance as the input size (`n`) approaches infinity. By focusing on the "big picture" growth rate, it allows us to make meaningful comparisons between different approaches.</p>
                        </section>
                        <section>
                            <h3 className="font-bold text-xl">A Practical Guide to Common Complexities</h3>
                            <p>Understanding the common Big O categories is essential for writing scalable code. This interactive tool helps you visualize them, but here's a detailed breakdown:</p>
                             <ul className="list-disc pl-5 space-y-4">
                                <li><strong>O(1) - Constant Time:</strong> The holy grail of efficiency. The algorithm takes the same amount of time regardless of the input size. Think of looking up a value in a hash map by its key or accessing an array element by its index. No matter how large the array, `array[5]` takes the same amount of time.</li>
                                <li><strong>O(log n) - Logarithmic Time:</strong> Incredibly efficient and a hallmark of well-designed algorithms that work on large datasets. The time taken grows very slowly. If you double the input size, the time it takes only increases by a single step. The classic example is binary search on a sorted array. To find an item in a list of 1,000,000 elements, you don't check every one; you check the middle, discard half the list, and repeat. This takes only about 20 steps, not a million. You can test this with our <Link href="/tools/search-algorithm-tester" className='text-primary hover:underline'>Search Algorithm Tester</Link>.</li>
                                <li><strong>O(n) - Linear Time:</strong> This is a common and generally acceptable complexity. The algorithm's run time grows in direct, linear proportion to the input size `n`. If you double the input, the time it takes also roughly doubles. A simple `for` loop that iterates through every element of an array to find a value is a classic O(n) operation.</li>
                                <li><strong>O(n log n) - Log-Linear Time:</strong> This complexity is slightly worse than linear but still very efficient for most problems. It often appears in "divide and conquer" algorithms. The most efficient general-purpose sorting algorithms, like Merge Sort and Heap Sort, have O(n log n) time complexity. They work by breaking the problem down into smaller logarithmic steps and then performing a linear amount of work on those steps. You can see this in action with our <Link href="/tools/sorting-algorithm-tester" className='text-primary hover:underline'>Sorting Algorithm Tester</Link>.</li>
                                <li><strong>O(n²) - Quadratic Time:</strong> Performance starts to degrade quickly. The time taken grows with the square of the input size. A common example is a nested loop where you compare every element of a collection to every other element (like finding duplicate values the naive way). This is acceptable for small `n` (e.g., 100 items), but becomes very slow for large `n` (e.g., 10,000 items would take 100,000,000 operations).</li>
                                <li><strong>O(2ⁿ) - Exponential Time:</strong> The danger zone. The algorithm's runtime doubles with every single new element added to the input. This is often seen in naive recursive solutions to problems like finding the Fibonacci sequence. These algorithms are only practical for trivial input sizes (e.g., n < 25) before they become impossibly slow. Our <Link href="/tools/recursion-simulator" className='text-primary hover:underline'>Recursion Simulator</Link> can help illustrate how quickly the number of function calls explodes.</li>
                            </ul>
                        </section>
                    </CardContent>
                </Card>
                 <section>
                    <h2 className="text-2xl font-bold mb-4">Real-Life Applications</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Database Indexing - O(log n)</h3>
                            <p className="text-sm text-muted-foreground">A database index works like a binary search tree. Instead of scanning an entire table (O(n)) to find a record, the database can use the index to find it in O(log n) time. For a table with billions of rows, this is the difference between a query taking milliseconds versus minutes.</p>
                        </div>
                        <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Social Network "People You May Know" - O(n²)</h3>
                            <p className="text-sm text-muted-foreground">A naive implementation of a friend suggestion feature might compare every one of your friends to every friend of your friends to find mutual connections. This is a quadratic operation and would be too slow for users with many friends. Real systems use more optimized graph algorithms.</p>
                        </div>
                         <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Rendering a Web Page - O(n)</h3>
                            <p className="text-sm text-muted-foreground">When a browser renders a list of items on a web page, it must iterate through each item in the data array and create a corresponding HTML element. If you have 1,000 items, it performs 1,000 operations. This is a linear relationship.</p>
                        </div>
                         <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Cryptography - O(1)</h3>
                            <p className="text-sm text-muted-foreground">A good cryptographic hash function, like SHA-256, should take roughly the same amount of time to compute, regardless of the input size. Our <Link href="/tools/hash-generator-md5-sha" className='text-primary hover:underline'>Hash Generator</Link> demonstrates this constant-time property of hashing.</p>
                        </div>
                    </div>
                </section>

                 <div className="grid md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <div className='flex items-center gap-2'><Wand className="h-6 w-6 text-accent" /> <CardTitle>Pro Tips & Quick Hacks</CardTitle></div>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                                <li><strong>Know Your Data Structures:</strong> The time complexity of an operation depends heavily on the data structure. Accessing an element in a hash map (Object/Map in JS) is O(1), but in a linked list, it's O(n).</li>
                                <li><strong>Identify the Bottleneck:</strong> When analyzing your code, find the part that will grow the fastest as `n` increases. A single O(n²) loop will dominate a dozen O(n) loops in the same function.</li>
                                <li><strong>The "Drop the Constants" Rule:</strong> Big O notation ignores constants. An algorithm that iterates through an array twice (`2n`) is still considered O(n) because the linear growth rate is what matters at scale.</li>
                                <li><strong>The "Drop Lower-Order Terms" Rule:</strong> We only care about the most significant term. An algorithm that is `O(n² + n)` is simplified to just `O(n²)`, because as `n` gets large, the `n²` term's growth makes the `n` term irrelevant.</li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                                <li><strong>Premature Optimization:</strong> Don't spend hours optimizing a function to be O(log n) if it only ever runs on 10 items. Focus your optimization efforts on the parts of your application that deal with large or growing datasets.</li>
                                <li><strong>Ignoring Space Complexity:</strong> An algorithm might be fast (low time complexity) but use a huge amount of memory (high space complexity), making it impractical for systems with limited RAM.</li>
                                <li><strong>Misinterpreting Nested Loops:</strong> A nested loop does not always mean O(n²). If the inner loop's iterations depend on the outer loop in a non-linear way, or if the loops iterate over different collections (e.g., `n` and `m`), the complexity would be different (e.g., O(n*m)).</li>
                                <li><strong>Forgetting about API Calls:</strong> If your loop makes a network API call on every iteration, the time complexity is dominated by the network latency, not just the CPU operations.</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
                
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
                        <Link href="/tools/algorithm-visualizer" className="block">
                            <Card className="hover:border-primary transition-colors h-full">
                                <CardHeader>
                                    <CardTitle className="text-base flex items-center justify-between">Algorithm Visualizer<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                    <CardDescription className="text-xs">See sorting and searching algorithms in action to visually understand their complexity.</CardDescription>
                                </CardHeader>
                            </Card>
                        </Link>
                         <Link href="/tools/recursion-simulator" className="block">
                            <Card className="hover:border-primary transition-colors h-full">
                                <CardHeader>
                                    <CardTitle className="text-base flex items-center justify-between">Recursion Simulator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                    <CardDescription className="text-xs">Understand how recursive function calls can lead to different time complexities like O(2^n).</CardDescription>
                                </CardHeader>
                            </Card>
                        </Link>
                         <Link href="/tools/data-transfer-calculator" className="block">
                            <Card className="hover:border-primary transition-colors h-full">
                                <CardHeader>
                                    <CardTitle className="text-base flex items-center justify-between">Data Transfer Time Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                    <CardDescription className="text-xs">While Big O measures operations, this tool measures how long data takes to transfer, another key aspect of performance.</CardDescription>
                                </CardHeader>
                            </Card>
                        </Link>
                    </div>
                </section>
            </div>
        </>
    );
}

    