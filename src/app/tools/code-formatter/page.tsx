
import { PageHeader } from '@/components/page-header';
import { CodeFormatter } from './code-formatter';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { Lightbulb, AlertTriangle, BookOpen, ChevronRight, Wand } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
    title: 'Code Formatter & Beautifier | HTML, CSS, JS | ICT Toolbench',
    description: 'Clean up and beautify your messy HTML, CSS, and JavaScript code. Our free online formatter makes your code readable and consistently styled with proper indentation.',
};

const faqData = [
    { question: "What is code formatting?", answer: "Code formatting (also known as code beautifying or pretty-printing) is the process of arranging source code according to a set of stylistic rules. This includes adding consistent indentation, line breaks, and spacing to make the code easier for humans to read and understand." },
    { question: "Why is code formatting important?", answer: "Readability is a cornerstone of maintainable software. Well-formatted code is easier to debug, review, and collaborate on. It reduces cognitive load, allowing developers to focus on the logic of the code rather than struggling to parse its structure. Consistent formatting across a project is a key part of professional development standards." },
    { question: "Is this tool safe to use? Does it store my code?", answer: "Yes, this tool is completely safe. All formatting operations are performed client-side, directly in your browser using JavaScript. Your code is never sent to our servers, ensuring your data remains private and secure." },
    { question: "Will this formatter change the logic of my code?", answer: "No. The formatters used in this tool are designed to only change the whitespace and structure of the code. They do not alter the code's functionality, variable names, or logic. It simply makes the code look neater." },
    { question: "What's the difference between a formatter and a linter?", answer: "A formatter is concerned only with the style and appearance of the code (indentation, spacing). A linter is a more powerful tool that analyzes your code for potential errors, bugs, stylistic inconsistencies, and suspicious constructs. A linter might tell you that you've used a variable before declaring it, while a formatter just fixes the indentation of that line." },
    { question: "Can I use this for production code?", answer: "While this tool is great for quick cleanups, for professional projects you should use an integrated formatter like Prettier or ESLint within your code editor (like VS Code). These tools can automatically format your code on save, ensuring consistency across your entire team and project." },
    { question: "Why doesn't the JavaScript formatter rename my variables?", answer: "Renaming variables (a process called 'mangling' or 'uglification') is a feature of code minifiers, not formatters. The goal of a formatter is to improve readability, while the goal of a minifier is to reduce file size, often at the expense of readability. Use our <a href='/tools/code-minifier' class='text-primary hover:underline'>Code Minifier</a> for that purpose." },
    { question: "What indentation style does this tool use?", answer: "This tool uses a standard style of 2 spaces for indentation, which is a common convention in web development for HTML, CSS, and JavaScript." },
];

const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Format Your Code',
    description: 'A step-by-step guide to using the code formatter and beautifier.',
    step: [
        { '@type': 'HowToStep', name: 'Select Language', text: 'Choose the appropriate tab for the code you want to format: HTML, CSS, or JavaScript.' },
        { '@type': 'HowToStep', name: 'Paste Your Code', text: 'Paste your messy or unformatted source code into the "Input Code" text area.' },
        { '@type': 'HowToStep', name: 'Format the Code', text: 'Click the "Format Code" button.' },
        { '@type': 'HowToStep', name: 'Review and Copy', text: 'The formatted, beautified code will appear in the "Formatted Output" box. Use the copy button to copy the clean code to your clipboard.' },
    ],
    totalTime: 'PT1M',
};

const keyTerminologies = [
    { term: 'Formatter (Beautifier)', definition: 'A tool that automatically restructures source code to conform to a consistent set of stylistic rules, focusing on readability.' },
    { term: 'Indentation', definition: 'The practice of using whitespace (spaces or tabs) at the beginning of lines to show the structure and nesting of code blocks.' },
    { term: 'Linter', definition: 'A static code analysis tool used to find programmatic errors, bugs, and stylistic errors.' },
    { term: 'Minifier', definition: 'A tool that removes all unnecessary characters from source code to reduce its file size for faster loading. This is the opposite of a formatter.' },
    { term: 'Code Style Guide', definition: 'A set of rules and conventions for writing code in a particular language or project, ensuring consistency and readability.' },
];

export default function CodeFormatterPage() {
  return (
    <>
      <StructuredData data={faqData.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer.replace(/<[^>]*>?/gm, '') } }))} />
      <StructuredData data={howToSchema} />
      <PageHeader
        title="Code Formatter / Beautifier"
        description="Clean up, format, and beautify your HTML, CSS, and JavaScript code. Paste your messy code to get a clean, readable, and consistently styled result."
      />
      
      <div className="max-w-4xl mx-auto space-y-12">
        <CodeFormatter />

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use This Tool</h2>
          <Card className="prose prose-sm max-w-none text-foreground p-6">
              <p>This formatter helps you turn jumbled, messy code into a clean, readable format, making it easier to understand and debug.</p>
              <ol>
                  <li><strong>Select the Language:</strong> Choose the tab corresponding to the code you want to format (HTML, CSS, or JS).</li>
                  <li><strong>Paste Your Code:</strong> Paste your code into the "Input Code" box. It can be minified, poorly indented, or just inconsistent.</li>
                  <li><strong>Format:</strong> Click the "Format Code" button.</li>
                  <li><strong>Get Clean Code:</strong> The properly indented and spaced code will appear in the "Formatted Output" box. Use the copy button to grab it for your project.</li>
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
                  <CardTitle className="text-primary">Educational Deep Dive: The Importance of Code Readability</CardTitle>
              </div>
              <CardDescription>Explore why clean, well-formatted code is a hallmark of professional software development and a gift to your future self.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
              <section>
                  <h3 className="font-bold text-xl">"Any fool can write code that a computer can understand. Good programmers write code that humans can understand."</h3>
                  <p className="italic text-muted-foreground">- Martin Fowler</p>
                  <p>
                    This quote is the essence of why code formatting matters. While a computer can parse a single, unformatted line of JavaScript that is thousands of characters long, a human developer cannot. Code is read far more often than it is written. Whether you're debugging your own code six months from now, or a teammate is trying to add a new feature, readability is paramount.
                  </p>
                  <p>
                    Code formatting is the practice of applying a consistent style to source code. It doesn't change what the code does, but it dramatically changes how it looks. Proper formatting uses indentation, line breaks, and consistent spacing to visually represent the structure and logic of the program, making it easier to follow, debug, and maintain.
                  </p>
              </section>
              <section>
                  <h3 className="font-bold text-xl">Formatter vs. Linter vs. Minifier</h3>
                  <p>It's important to understand the difference between these related but distinct tools:</p>
                  <ul className="list-disc pl-5">
                     <li><strong>Formatter (Beautifier):</strong> Only cares about style. Its job is to enforce consistent indentation, spacing, and line breaks. This is what our tool does.</li>
                     <li><strong>Linter:</strong> A code quality tool. It analyzes your code for potential problems, such as syntax errors, use of undeclared variables, or deviations from a defined coding standard (e.g., "always use `const` instead of `var`").</li>
                     <li><strong>Minifier:</strong> The opposite of a formatter. Its goal is to make the code as small as possible for production use by removing all whitespace, comments, and shortening variable names. You can use our <Link href="/tools/code-minifier" className="text-primary hover:underline">Code Minifier</Link> for this task.</li>
                  </ul>
                  <p>In a professional workflow, these tools are often used together. A linter checks for errors, and a formatter automatically cleans up the style as you code, ensuring everything is consistent before it gets minified for deployment.</p>
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
                        <li><strong>Un-minify Code:</strong> Have you ever needed to inspect a minified JavaScript or CSS file from a website? Paste it into this tool to "un-minify" it into a more readable format for debugging.</li>
                        <li><strong>Integrate into Your Editor:</strong> For professional work, install a formatter extension in your code editor (like Prettier for VS Code). Configure it to "format on save" to make consistent styling effortless.</li>
                        <li><strong>Establish Team Standards:</strong> Agree on a single, consistent code style for your team and enforce it with an automated formatter. This eliminates arguments about style and makes code reviews more focused on logic.</li>
                        <li><strong>Format Before Asking for Help:</strong> If you're asking a colleague or posting on a forum for help with a piece of code, always format it first. Presenting clean, readable code makes it much more likely that others will be willing and able to help you.</li>
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                     <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes</CardTitle></div>
                </CardHeader>
                <CardContent>
                     <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                        <li><strong>Arguing Over Style:</strong> Debating whether to use 2 spaces or 4 spaces is a waste of time. The most important thing is consistency. Pick a standard and let an automated tool enforce it.</li>
                        <li><strong>Mixing Tabs and Spaces:</strong> A classic source of formatting chaos. Configure your editor to automatically convert tabs to spaces to ensure consistent indentation everywhere.</li>
                        <li><strong>Committing Unformatted Code:</strong> Committing messy code to a shared repository makes it harder for everyone else to read and can create messy "diffs" where the only changes are whitespace.</li>
                        <li><strong>Assuming Formatters Fix Logic:</strong> A formatter will make your code look nice, but it will not fix logical errors. A beautifully formatted but broken algorithm is still broken.</li>
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
              <Link href="/tools/code-minifier" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">HTML/CSS/JS Minifier<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">The opposite of a formatter. Reduces file size for production.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
              <Link href="/tools/json-formatter" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">JSON Formatter / Validator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Specifically for formatting and validating JSON data structures.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
              <Link href="/tools/code-diff-checker" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Code Diff Checker<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Compare two pieces of code to see the differences before or after formatting.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
          </div>
      </section>
      </div>
    </>
  );
}
