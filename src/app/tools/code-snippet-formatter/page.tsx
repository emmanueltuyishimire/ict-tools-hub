
import React from 'react';
import { PageHeader } from '@/components/page-header';
import { CodeSnippetFormatter } from './code-snippet-formatter';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BookOpen, AlertTriangle, Wand, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';

export const metadata = {
    title: 'Code Snippet Formatter | Clean & Shareable Code | ICT Toolbench',
    description: 'Quickly format messy code snippets into clean, readable, and shareable blocks. Supports JavaScript, Python, HTML, and CSS. Ideal for documentation, presentations, and tutorials.',
};

const CodeSnippetFormatterPage = () => {
  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Code Snippet Formatter",
    "operatingSystem": "All",
    "applicationCategory": "DeveloperApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "A free online tool to format and beautify code snippets in JavaScript, Python, HTML, and CSS for better readability and presentation.",
    "url": "https://www.icttoolbench.com/tools/code-snippet-formatter"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
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
          title="Code Snippet Formatter"
          description="Transform jumbled, single-line, or poorly indented code into a clean, professional, and readable format. Perfect for preparing code examples for documentation, presentations, or sharing with colleagues."
        />
        
        <CodeSnippetFormatter />

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use the Formatter</h2>
          <Card className="prose prose-sm max-w-none text-foreground p-6">
              <p>This tool helps you turn messy code into a clean, shareable snippet with consistent styling.</p>
              <ol>
                  <li><strong>Select the Language:</strong> Choose the appropriate tab for your code: JavaScript, Python, HTML, or CSS.</li>
                  <li><strong>Paste Your Code:</strong> Paste your unformatted or minified code snippet into the "Input Code" box.</li>
                  <li><strong>Format the Snippet:</strong> Click the "Format Code" button to apply standard indentation and spacing rules.</li>
                  <li><strong>Copy the Result:</strong> The clean, formatted code will appear in the "Formatted Snippet" box. Use the copy button to grab it for your presentation, blog post, or documentation.</li>
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
                  <CardTitle className="text-primary">Educational Deep Dive: The Art of Readable Code</CardTitle>
              </div>
              <CardDescription>Explore why code is read more than it is written and how consistent formatting is a cornerstone of professional software development.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
              <section>
                  <h3>Code for Humans, Not Just Computers</h3>
                  <p>
                    While a computer can perfectly execute a single, mile-long line of minified code, humans cannot. We rely on visual structure—indentation, line breaks, and consistent spacing—to parse logic, understand control flow, and spot errors. This is why code formatting, or "beautifying," is a non-negotiable part of professional software development. Its sole purpose is to improve readability for the human developers who will read, debug, and maintain the code long after it's written.
                  </p>
                  <p>
                    A well-formatted code snippet respects the reader's time and cognitive load. It makes collaboration easier, code reviews faster, and debugging less painful. Adopting a consistent style is a mark of a professional developer. This tool helps you instantly apply a standard, conventional style to your code snippets, making them immediately more understandable.
                  </p>
              </section>
              <section>
                  <h3>Language-Specific Conventions</h3>
                  <p>Different languages have different stylistic conventions, and a good formatter respects them:</p>
                  <ul className="list-disc pl-5">
                     <li><strong>JavaScript/CSS/HTML:</strong> The common convention is to use 2 spaces for indentation. Braces for functions and blocks often follow specific styles (like opening on the same line). Our <Link href="/tools/code-formatter" className="text-primary hover:underline">main Code Formatter</Link> provides more detail on these web languages.</li>
                     <li><strong>Python:</strong> Python is unique in that whitespace is syntactically significant. The official style guide, PEP 8, mandates 4 spaces for indentation. Incorrect indentation will not just look bad—it will break the code. This formatter applies the 4-space rule automatically for Python code.</li>
                  </ul>
                  <p>This tool applies these common conventions to instantly improve the readability of your code, no matter which of these languages you're working with.</p>
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
                        <li><strong>Un-minify for Debugging:</strong> If you're inspecting a minified `.js` or `.css` file on a live website, paste it into this tool to quickly make it readable and start debugging.</li>
                        <li><strong>Prepare for Presentations:</strong> Before pasting a code example into a PowerPoint or Google Slides presentation, run it through the formatter to ensure it's clean, professional, and easy for your audience to read.</li>
                        <li><strong>Standardize Documentation:</strong> When writing technical documentation or tutorials, use a formatter to ensure all your code examples share a single, consistent style.</li>
                        <li><strong>Find Missing Braces:</strong> Formatting messy code can often reveal structural errors, such as a missing closing brace `}` or parenthesis `)`, as the indentation will look "off".</li>
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                     <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes</CardTitle></div>
                </CardHeader>
                <CardContent>
                     <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                        <li><strong>Mixing Tabs and Spaces:</strong> A classic source of formatting chaos. This tool helps by standardizing on spaces. Configure your code editor to do the same to prevent issues.</li>
                        <li><strong>Assuming Formatters Fix Bugs:</strong> A formatter makes code look good; it does not fix logical errors. A beautifully formatted but incorrect algorithm is still incorrect. For help with logic, use our <Link href="/tools/code-generator" className="text-primary hover:underline">AI Code Generator & Debugger</Link>.</li>
                        <li><strong>Arguing Over Style:</strong> Debating whether to use 2 or 4 spaces is a classic time-waster. The best style is a consistent style. Agree on a standard with your team and use automated tools to enforce it.</li>
                    </ul>
                </CardContent>
            </Card>
        </div>

        <section>
            <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Technical Blogging</h3>
                    <p className="text-sm text-muted-foreground">A developer is writing a blog post tutorial with several JavaScript examples. To ensure the code blocks in their article are clean and easy for readers to follow, they run each snippet through the formatter before embedding it.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Creating Code for Stack Overflow</h3>
                    <p className="text-sm text-muted-foreground">A programmer is asking a question on Stack Overflow and wants to provide a minimal, reproducible example. After writing the code, they paste it into the formatter to clean up the indentation, making it easier for others to read and increasing the chances of getting a helpful answer.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Internal Team Documentation</h3>
                    <p className="text-sm text-muted-foreground">A senior engineer is writing an internal wiki page explaining a complex Python function. They paste the function into the formatter to ensure it adheres to PEP 8 styling, providing a professional and clear example for junior developers on the team.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Quickly Understanding Foreign Code</h3>
                    <p className="text-sm text-muted-foreground">A developer inherits a project with inconsistent and messy CSS. To quickly get a sense of the structure, they copy a large, poorly formatted CSS rule and paste it into the formatter. The resulting clean output makes the hierarchy and nested rules immediately obvious.</p>
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
              <Link href="/tools/code-minifier" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">HTML/CSS/JS Minifier<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">The opposite of a formatter. Reduces file size for production deployment.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
              <Link href="/tools/code-diff-checker" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Code Diff Checker<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Compare a snippet before and after formatting to see the whitespace changes.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
              <Link href="/tools/syntax-highlighter" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Syntax Highlighter / Preview<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">After formatting your code, add syntax highlighting for even better presentation.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
          </div>
      </section>
      </div>
    </>
  );
};

export default CodeSnippetFormatterPage;
