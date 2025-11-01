import React from 'react';
import { PageHeader } from '@/components/page-header';
import { FunctionTester } from './function-tester';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { BookOpen, AlertTriangle, Wand, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';

export const metadata = {
    title: 'JavaScript Function & Formula Tester | ICT Toolbench',
    description: 'A safe, client-side JavaScript sandbox to test functions, formulas, and code snippets in real-time. Instantly execute code and see the output or errors.',
    openGraph: {
        title: 'JavaScript Function & Formula Tester | ICT Toolbench',
        description: 'Test and debug your JavaScript functions and logic quickly with our interactive sandbox environment.',
        url: '/tools/function-tester',
    }
};

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
  "name": "Function / Formula Tester",
  "operatingSystem": "All",
  "applicationCategory": "DeveloperApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "A client-side JavaScript sandbox for testing functions and code snippets safely and instantly.",
  "url": "https://www.icttoolbench.com/tools/function-tester"
};

const FunctionTesterPage = () => {
  return (
    <>
      <StructuredData data={faqSchema} />
      <StructuredData data={howToSchema} />
      <StructuredData data={softwareAppSchema} />
      <div className="max-w-4xl mx-auto space-y-12">
        <PageHeader
          title="Function / Formula Tester"
          description="A simple sandbox to test JavaScript functions and formulas in real-time. Write your logic, provide parameters, and see the output instantly without leaving your browser."
        />
        
        <FunctionTester />

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use the Tester</h2>
          <Card className="prose prose-sm max-w-none text-foreground p-6">
              <p>This tool provides a quick and safe way to run arbitrary JavaScript code to test logic, algorithms, or simple formulas.</p>
              <ol>
                  <li><strong>Write Your Function Body:</strong> In the "Function Body" text area, write the JavaScript code you want to execute. Your code should assume it has access to variables named `a`, `b`, `c`, etc., which will correspond to the parameters you provide. You must include a `return` statement to see an output.</li>
                  <li><strong>Provide Parameters:</strong> In the "Parameters" text area, enter the values you want to pass to your function, separated by commas. The values must be in valid JSON format (e.g., strings in double quotes, numbers as-is).</li>
                  <li><strong>Run the Test:</strong> Click the "Run Test" button.</li>
                  <li><strong>Analyze the Output:</strong> The result of your function's `return` statement will be displayed in the "Output" box. If there's an error in your code, the error message will be shown in a red alert box, helping you to debug.</li>
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
                  <CardTitle className="text-primary">Educational Deep Dive: Safe Code Execution & Function Scope</CardTitle>
              </div>
              <CardDescription>Explore how this tool runs code safely and understand the fundamental JavaScript concepts of function scope and closures.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
              <section>
                  <h3>`new Function()`: A Safer Sandbox</h3>
                  <p>
                    Executing arbitrary code in a browser is inherently risky. A naive approach might use the `eval()` function, but `eval()` is dangerous because it executes code within the current scope, giving it access to all your local variables and the global `window` object. This can lead to security vulnerabilities and unexpected side effects.
                  </p>
                  <p>
                    This tool uses a safer alternative: the `new Function()` constructor. When you create a function this way (e.g., `new Function('a', 'b', 'return a + b')`), JavaScript creates a new function that runs in its own isolated scope. It can only access its own parameters (`a`, `b`) and global variables. It cannot access variables from the scope in which it was created, providing a sandboxed environment that is much more secure and predictable for testing snippets.
                  </p>
              </section>
              <section>
                  <h3>Understanding Function Scope and Closures</h3>
                  <p>
                    <strong>Scope</strong> in JavaScript determines the accessibility of variables. There are two main types:
                  </p>
                  <ul className="list-disc pl-5">
                     <li><strong>Global Scope:</strong> Variables declared outside of any function are in the global scope and accessible from anywhere.</li>
                     <li><strong>Local Scope (Function Scope):</strong> Variables declared inside a function are only accessible within that function. This is why the code you write in our tester can't interfere with the website's own code.</li>
                  </ul>
                  <p>
                    A <strong>closure</strong> is a powerful JavaScript feature where an inner function has access to the variables of its outer (enclosing) function, even after the outer function has finished executing. This allows for the creation of private variables and stateful functions. While our simple tester doesn't explicitly create closures, understanding this concept is key to mastering JavaScript.
                  </p>
              </section>
          </CardContent>
        </Card>
        
        <section>
            <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Testing an Algorithm Snippet</h3>
                    <p className="text-sm text-muted-foreground">A student is trying to understand a sorting algorithm they found online. They can paste the core logic of the sorting function into the tester, provide an unsorted array like `[5, 2, 8, 1]` as a parameter, and instantly see if it returns the correctly sorted array `[1, 2, 5, 8]`, helping them to verify and understand the logic.</p>
                </div>
                <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Prototyping a Data Transformation</h3>
                    <p className="text-sm text-muted-foreground">A developer needs to write a function that takes an array of user objects and returns just a list of their email addresses. They can quickly prototype this in the tester. Function Body: `return a.map(user => user.email);`. Parameters: `[[{"name": "Alice", "email": "a@test.com"}, {"name": "Bob", "email": "b@test.com"}]]`. The output will be `["a@test.com", "b@test.com"]`, confirming their logic before adding it to their main codebase.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Verifying a Mathematical Formula</h3>
                    <p className="text-sm text-muted-foreground">Someone needs to calculate the area of a circle for several different radii. They can set the function body to `return Math.PI * a * a;` and then test it with different numbers in the parameters box (`10`, then `15`, then `20`), using it as a quick, specialized calculator for their formula.</p>
                </div>
                <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Answering a Question on Stack Overflow</h3>
                    <p className="text-sm text-muted-foreground">A developer wants to provide a working code example in an answer on a forum. They can use this tool to quickly write and test their example function, ensuring it's correct and produces the expected output before posting it publicly, saving them from potential corrections and edits.</p>
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
                        <li><strong>Use `console.log` for Debugging:</strong> If your function is complex, you can add `console.log()` statements inside the function body. The output will appear in your browser's own developer console (F12), allowing for step-by-step debugging.</li>
                        <li><strong>Test Edge Cases:</strong> Don't just test with typical inputs. Test with edge cases like empty strings, zero, negative numbers, or empty arrays to see how your function behaves and ensure it's robust.</li>
                        <li><strong>Prototype Complex Logic:</strong> Before integrating a complex piece of logic into a large application, isolate it and test it here. This can save significant time compared to debugging within a larger framework.</li>
                        <li><strong>Remember JSON Format:</strong> When passing arrays or objects as parameters, they must be in valid JSON format. This means strings and property keys must be in double quotes.</li>
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                     <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                </CardHeader>
                <CardContent>
                     <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                        <li><strong>Forgetting the `return` Statement:</strong> A function that doesn't explicitly return a value will result in an output of `null` or `undefined`. Make sure your code ends with `return ...;`.</li>
                        <li><strong>Invalid JSON Parameters:</strong> Using single quotes for strings (e.g., `['hello']`) instead of double quotes (`["hello"]`) in the parameters box will cause a parsing error.</li>
                        <li><strong>Assuming Global Scope:</strong> Trying to access variables defined outside the function body. The `new Function()` constructor creates an isolated scope for security.</li>
                        <li><strong>Infinite Loops:</strong> A `while(true)` loop or other infinite loop in your function will cause the browser tab to freeze and potentially crash. Be careful with your loop conditions.</li>
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
               <Link href="/tools/regex-tester" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Regex Tester<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Test string-matching logic and patterns that you might use within your functions.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
              <Link href="/tools/code-formatter" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Code Formatter / Beautifier<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Clean up the formatting of your function before testing or sharing it.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
              <Link href="/tools/big-o-calculator" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Time Complexity Estimator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Analyze the theoretical performance of the algorithm you are testing.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
          </div>
      </section>
      </div>
    </>
  );
};

export default FunctionTesterPage;
