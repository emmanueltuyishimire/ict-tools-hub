
import React from 'react';
import { PageHeader } from '@/components/page-header';
import { RecursionSimulator } from './recursion-simulator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { BookOpen, AlertTriangle, Wand, ChevronRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';

export const metadata = {
    title: 'Recursion Simulator | Visualize the Call Stack | ICT Toolbench',
    description: 'An interactive, educational tool to visualize how recursion works. See the call stack build and unwind with a classic factorial function example, making abstract concepts concrete.',
    openGraph: {
        title: 'Recursion Simulator | ICT Toolbench',
        description: 'Learn recursion by visualizing the call stack. An interactive demo for students and developers to understand base cases, recursive steps, and stack frames.',
        url: '/tools/recursion-simulator',
    }
};

const RecursionSimulatorPage = () => {
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
      "name": "Recursion Calculator / Simulator",
      "operatingSystem": "All",
      "applicationCategory": "DeveloperApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "An interactive, educational tool to visualize how recursive functions and the call stack work using a factorial example.",
      "url": "https://www.icttoolbench.com/tools/recursion-simulator"
    };

    return (
        <>
            <StructuredData data={faqSchema} />
            <StructuredData data={howToSchema} />
            <StructuredData data={softwareAppSchema} />
            <div className="max-w-4xl mx-auto space-y-12">
                <PageHeader
                    title="Recursion Calculator / Simulator"
                    description="Demystify recursion by visualizing the call stack in action. This tool provides a step-by-step animation of how a recursive factorial function is executed, making this fundamental computer science concept easier to grasp."
                />
                
                <RecursionSimulator />

                <section>
                    <h2 className="text-2xl font-bold mb-4">How to Use the Simulator</h2>
                    <Card className="prose prose-sm max-w-none text-foreground p-6">
                        <p>This tool helps you see how a recursive function builds up a "call stack" and then unwinds it to produce a final result.</p>
                        <ol>
                            <li><strong>Enter a Number:</strong> Input a small non-negative integer (0-15) for which you want to calculate the factorial.</li>
                            <li><strong>Start Simulation:</strong> Click the "Start" button. This will generate all the steps of the recursive calculation.</li>
                            <li><strong>Control the Flow:</strong> Use the "Play" button to watch a full, animated simulation, or use the "Step" button to walk through the process one call at a time. You can "Reset" at any point.</li>
                            <li><strong>Observe the Call Stack:</strong> The "Call Stack" box is the main visualization. Watch as function calls are pushed onto the stack. When the base case is hit, watch as they are popped off, returning their values to the caller.</li>
                            <li><strong>Follow the Explanation:</strong> The "Explanation" box provides a running commentary, describing what is happening at each step of the simulation.</li>
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
                            <CardTitle className="text-primary">Educational Deep Dive: Thinking Recursively</CardTitle>
                        </div>
                        <CardDescription>From base cases to the call stack, understand the core principles behind one of programming's most elegant and powerful concepts.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                        <section>
                            <h3>What is Recursion?</h3>
                            <p>
                                Recursion is a programming technique where a function solves a problem by calling itself with a smaller version of the same problem. It's a powerful way to solve problems that can be broken down into repeating sub-problems. Think of it like a set of Russian nesting dolls; to open the set, you open the largest doll, which contains a slightly smaller doll, which you also open, and so on, until you reach the smallest, solid doll.
                            </p>
                            <p>Every recursive function must have two parts:</p>
                             <ol className="list-decimal pl-5">
                                <li><strong>Base Case:</strong> This is the condition under which the function stops calling itself and returns a simple, known value. It's the "smallest doll" that can't be opened any further. Without a base case, a recursive function would call itself forever, leading to a "stack overflow" error. In our factorial example, the base case is `if (n === 0)`, which returns 1.</li>
                                <li><strong>Recursive Step:</strong> This is where the function calls itself, but with a modified argument that moves it closer to the base case. In our example, the recursive step is `return n * factorial(n - 1)`. The problem `factorial(5)` is broken down into `5 * factorial(4)`, which is a smaller version of the same problem.</li>
                            </ol>
                        </section>
                        <section>
                            <h3>Visualizing the Call Stack</h3>
                            <p>
                                The "magic" of recursion is managed by the <strong>call stack</strong>. The call stack is a data structure that a programming language uses to keep track of function calls. When a function is called, a "stack frame" containing its local variables and its place in the code is pushed onto the top of the stack.
                            </p>
                            <p>In our simulation for `factorial(3)`:</p>
                            <ul className="list-disc pl-5">
                               <li>`factorial(3)` is called. It gets pushed onto the stack. It needs the result of `factorial(2)`.</li>
                               <li>`factorial(2)` is called. It gets pushed on top of `factorial(3)`. It needs the result of `factorial(1)`.</li>
                               <li>`factorial(1)` is called. It gets pushed on top of `factorial(2)`. It needs the result of `factorial(0)`.</li>
                               <li>`factorial(0)` is called. It gets pushed on top. This is the base case! It doesn't call itself; it simply returns `1`.</li>
                               <li>`factorial(0)` is popped off the stack, returning `1` to its caller, `factorial(1)`.</li>
                               <li>`factorial(1)` can now complete its calculation (`1 * 1 = 1`) and is popped off the stack, returning `1` to `factorial(2)`.</li>
                               <li>`factorial(2)` can now complete its calculation (`2 * 1 = 2`) and is popped off the stack, returning `2` to `factorial(3)`.</li>
                               <li>`factorial(3)` can now complete its calculation (`3 * 2 = 6`) and is popped off the stack, returning the final result.</li>
                            </ul>
                            <p>This visualization of the stack building up and then unwinding is key to truly understanding how recursion works.</p>
                        </section>
                         <section>
                            <h3>Recursion vs. Iteration</h3>
                            <p>
                                Any problem that can be solved recursively can also be solved iteratively (using a loop). Iteration is often more performant in terms of memory and speed because it doesn't have the overhead of multiple function calls. However, for some problems—like traversing a tree data structure or certain sorting algorithms—a recursive solution can be far more elegant and easier to read and write. For example, our <Link href="/tools/algorithm-simulator" className="text-primary hover:underline">Algorithm Step Simulator</Link> uses an iterative approach for Bubble Sort. The classic factorial calculation in our <Link href="/tools/factorial-calculator" className="text-primary hover:underline">Factorial Calculator</Link> also uses an efficient iterative loop.
                            </p>
                        </section>
                    </CardContent>
                </Card>
                
                 <section>
                    <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">File System Traversal</h3>
                            <p className="text-sm text-muted-foreground">A common task is to find a file or calculate the size of a directory and all its subdirectories. A recursive function is a natural fit: to get the size of a folder, get the size of all files inside it, and then for each subdirectory inside, call the same function on that subdirectory.</p>
                        </div>
                         <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Parsing Hierarchical Data (JSON/XML)</h3>
                            <p className="text-sm text-muted-foreground">When parsing nested data structures like JSON or XML, a recursive function can easily traverse the tree. A function to process a node would check if the node has children; if it does, it calls itself for each child node.</p>
                        </div>
                        <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Divide and Conquer Algorithms</h3>
                            <p className="text-sm text-muted-foreground">Many efficient algorithms, like Merge Sort and Quick Sort, are recursive. They work by breaking a large problem down into smaller sub-problems, recursively solving the sub-problems, and then combining the results. You can visualize a simple version of this with our <Link href="/tools/algorithm-simulator" className="text-primary hover:underline">Algorithm Step Simulator</Link>.</p>
                        </div>
                         <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Rendering a Comment Thread</h3>
                            <p className="text-sm text-muted-foreground">On a site like Reddit, comments can have replies, which can have replies, and so on. To render a comment thread, a front-end framework would use a recursive component: a "Comment" component would display its own content, and then for each of its replies, it would render another "Comment" component.</p>
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
                                <li><strong>Trust the "Recursive Leap of Faith":</strong> When writing a recursive function, assume it already works for `n-1`. Your only job is to figure out how to use that result to solve for `n`.</li>
                                <li><strong>Always Define the Base Case First:</strong> Before you write any recursive logic, always define the simplest possible input and its output. This is your exit condition and prevents infinite loops.</li>
                                <li><strong>Pass State as Arguments:</strong> Avoid relying on global variables. Instead, pass all necessary state down through the function's arguments. This makes your function pure and easier to reason about.</li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                             <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                        </CardHeader>
                        <CardContent>
                             <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                                <li><strong>Forgetting the Base Case:</strong> This is the most common mistake and will always lead to a "maximum call stack size exceeded" or "stack overflow" error, as the function calls itself infinitely.</li>
                                <li><strong>Not Changing the Argument:</strong> The recursive call must be made with a modified argument that moves it closer to the base case (e.g., `n-1`). Calling the function with the same argument (`factorial(n)`) will also lead to an infinite loop.</li>
                                <li><strong>Using Recursion for Simple Loops:</strong> While you *can* calculate the sum of an array recursively, a simple `for` loop is far more efficient and readable for that task. Use recursion when the problem has a naturally recursive, self-similar structure.</li>
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
                      <Link href="/tools/factorial-calculator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Factorial Calculator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Calculate the final result of the factorial function using a more efficient iterative approach.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                       <Link href="/tools/algorithm-simulator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Algorithm Step Simulator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Visualize iterative algorithms like Bubble Sort and Linear Search.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                       <Link href="/tools/big-o-calculator" className="block">
                          <Card className="hover:border-primary transition-colors h-full">
                              <CardHeader>
                                  <CardTitle className="text-base flex items-center justify-between">Time Complexity Estimator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                  <CardDescription className="text-xs">Analyze the exponential time complexity (O(2^n)) of a poorly-written recursive Fibonacci function.</CardDescription>
                              </CardHeader>
                          </Card>
                      </Link>
                  </div>
              </section>
            </div>
        </>
    );
};

export default RecursionSimulatorPage;
