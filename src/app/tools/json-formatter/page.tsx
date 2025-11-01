
import { PageHeader } from '@/components/page-header';
import { JsonFormatter } from './json-formatter';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { Lightbulb, AlertTriangle, BookOpen, ChevronRight, Wand } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
    title: 'JSON Formatter & Validator | ICT Toolbench',
    description: 'Easily format, beautify, and validate your JSON. Our tool helps you debug JSON data by making it readable and identifying syntax errors.',
    openGraph: {
        title: 'JSON Formatter & Validator | ICT Toolbench',
        description: 'Instantly format and validate JSON data to ensure it is well-formed and easy to read.',
        url: '/tools/json-formatter',
    }
};

const faqData = [
    { question: "What is JSON?", answer: "JSON (JavaScript Object Notation) is a lightweight, text-based data-interchange format. It is easy for humans to read and write and easy for machines to parse and generate. It is the most common format for data exchange between web servers and clients (APIs)." },
    { question: "Why do I need to format JSON?", answer: "JSON data is often transmitted in a 'minified' state (without any extra whitespace) to save bandwidth. While this is efficient for machines, it's nearly impossible for humans to read. A formatter adds indentation and line breaks, turning a long, single line of text into a readable, tree-like structure, which is essential for debugging and understanding the data." },
    { question: "What makes JSON 'invalid'?", answer: "JSON has a strict syntax. Common errors that make it invalid include: a missing comma between properties, a trailing comma after the last property, keys or strings that are not enclosed in double quotes (single quotes are not allowed), or mismatched brackets/braces." },
    { question: "Is this JSON validator safe to use?", answer: "Yes. All formatting and validation happen entirely within your browser (client-side). Your data is never sent to our servers, ensuring your information remains private and secure." },
    { question: "What is the difference between an object and an array in JSON?", answer: "A JSON object is an unordered collection of key/value pairs, enclosed in curly braces `{}`. A JSON array is an ordered list of values, enclosed in square brackets `[]`." },
    { question: "Can I use comments in JSON?", answer: "No, the official JSON specification does not support comments. This is a common source of validation errors. If you paste JSON with comments into this tool, it will be flagged as invalid." },
    { question: "How is JSON different from XML?", answer: "JSON is generally less verbose and easier to parse than XML. It has a more natural data mapping to objects in most programming languages. XML is more powerful for complex document structures with mixed content, but for pure data exchange, JSON is now far more common." },
    { question: "What does the 'Validate' function do?", answer: "When you paste your text, the tool attempts to parse it as JSON. If the parsing is successful, it means the JSON is syntactically valid. If it fails, the tool knows there is a syntax error and will display a message to help you locate the problem." },
];

const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Format and Validate JSON',
    description: 'A step-by-step guide to using the JSON formatter and validator.',
    step: [
        { '@type': 'HowToStep', name: 'Paste Your JSON', text: 'Paste your raw, unformatted, or minified JSON text into the input text area.' },
        { '@type': 'HowToStep', name: 'Format and Validate', text: 'Click the "Format / Validate" button.' },
        { '@type': 'HowToStep', name: 'Review the Output', text: 'If your JSON is valid, it will appear beautifully formatted in the output box. If it is invalid, a clear error message will be displayed, often indicating the line and character where the error occurred.' },
        { '@type': 'HowToStep', name: 'Copy the Formatted JSON', text: 'Use the "Copy" button to copy the clean, formatted JSON to your clipboard for use in your projects or documentation.' },
    ],
    totalTime: 'PT1M'
};

const keyTerminologies = [
    { term: 'JSON (JavaScript Object Notation)', definition: 'A lightweight, text-based format for data interchange based on a subset of JavaScript syntax.' },
    { term: 'Object', definition: 'In JSON, an unordered set of key/value pairs enclosed in curly braces `{}`. Keys must be strings in double quotes.' },
    { term: 'Array', definition: 'In JSON, an ordered list of values enclosed in square brackets `[]`.' },
    { term: 'Key-Value Pair', definition: 'The fundamental building block of a JSON object, consisting of a key (a string) and a value (a string, number, boolean, array, or another object).' },
    { term: 'Syntax Error', definition: 'A mistake in the structure of the JSON text that prevents it from being parsed, such as a missing comma or quote.' },
    { term: 'Minification', definition: 'The process of removing all unnecessary whitespace from JSON to reduce its file size for efficient transmission.' },
];

const faqSchemaData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData
};

export default function JsonFormatterPage() {
  return (
    <>
      <StructuredData data={faqSchemaData} />
      <StructuredData data={howToSchema} />
      <div className="max-w-4xl mx-auto space-y-12">
        <PageHeader
          title="JSON Formatter & Validator"
          description="Paste your JSON to format, beautify, and validate it. Our tool helps you debug JSON data by making it readable and identifying syntax errors."
        />
        
        <JsonFormatter />

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use This Tool</h2>
          <Card className="prose prose-sm max-w-none text-foreground p-6">
              <p>
                This tool is designed to make working with JSON simple and error-free. It helps you format jumbled data and find syntax errors.
              </p>
              <ol>
                  <li>
                    <strong>Paste Your JSON:</strong> Copy your JSON data—whether it's a single, long, unreadable line from an API response or a file you're working on—and paste it into the input box.
                  </li>
                  <li>
                    <strong>Format & Validate:</strong> Click the "Format / Validate" button.
                  </li>
                  <li>
                    <strong>Review the Output:</strong>
                    <ul>
                        <li>If your JSON is valid, it will instantly appear in the output box, beautifully formatted with consistent indentation and colors for easy reading.</li>
                        <li>If your JSON is invalid, a clear error message will appear, telling you what's wrong and often pointing to the line and character where the error was found. This makes debugging much faster.</li>
                    </ul>
                  </li>
                   <li>
                    <strong>Copy the Result:</strong> Use the copy button to grab the clean, formatted JSON for your code, documentation, or to share with colleagues.
                  </li>
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
                  <CardTitle className="text-primary">Educational Deep Dive: The Language of APIs</CardTitle>
              </div>
              <CardDescription>Understand the strict rules of JSON and why it has become the universal standard for data exchange on the modern web.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
              <section>
                  <h3 className="font-bold text-xl">What is JSON?</h3>
                  <p>
                    JSON (JavaScript Object Notation) is a text-based format for representing structured data. Although it originated from JavaScript, it is now a language-independent standard, meaning it can be used by virtually any programming language. Its popularity comes from its simplicity and readability. It represents data in two basic structures:
                  </p>
                  <ul className="list-disc pl-5">
                     <li><strong>Objects:</strong> A collection of key-value pairs, enclosed in `{}`. Example: `{ "name": "John Doe", "age": 30 }`.</li>
                     <li><strong>Arrays:</strong> An ordered list of values, enclosed in `[]`. Example: `[ "apple", "banana", "cherry" ]`.</li>
                  </ul>
                  <p>
                    These structures can be nested to represent complex data, making JSON incredibly versatile for everything from simple configuration files to massive API responses.
                  </p>
              </section>
              <section>
                  <h3 className="font-bold text-xl">The Strict Rules of JSON Syntax</h3>
                  <p>While it looks simple, JSON has very strict syntax rules that must be followed for it to be considered valid. A single misplaced comma or using the wrong type of quote will cause a parsing error. This strictness is a feature, not a bug, as it ensures that data is unambiguous and can be reliably processed by any machine.</p>
                  <p>Here are the most common rules that trip people up:</p>
                    <ul className="list-disc pl-5">
                       <li><strong>Double Quotes Only:</strong> All keys and all string values MUST be enclosed in double quotes (`"`). Single quotes (`'`) are not allowed.</li>
                       <li><strong>No Trailing Commas:</strong> A comma is used to separate elements in an array or key-value pairs in an object. There must not be a comma after the last element.</li>
                       <li><strong>No Comments:</strong> The official JSON specification does not allow for comments.</li>
                       <li><strong>Keys Must Be Strings:</strong> All keys in an object must be strings enclosed in double quotes.</li>
                    </ul>
                    <p>Our validator checks for all these rules and more, instantly telling you if your JSON is well-formed.</p>
              </section>
          </CardContent>
      </Card>
      
      <div className="grid md:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <div className='flex items-center gap-2'><Wand className="h-6 w-6 text-accent" /> <CardTitle>Pro Tips & Quick Hacks</CardTitle></div>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                        <li><strong>Debug API Responses:</strong> When you get an unexpected error from an API, paste the raw response body into the validator. Often, the "error" is simply malformed JSON that your application can't parse.</li>
                        <li><strong>Create Mock Data:</strong> Quickly draft and format JSON data to use as mock responses when developing your application's frontend before the backend API is ready.</li>
                        <li><strong>Inspect JWTs:</strong> A JWT (JSON Web Token) is made of three Base64-encoded parts, one of which is a JSON payload. You can use our <Link href="/tools/base64-encoder-decoder" className="text-primary hover:underline">Base64 Decoder</Link> to get the JSON payload, then paste it here to inspect its contents.</li>
                        <li><strong>Clean up Config Files:</strong> Many modern applications use `.json` files for configuration. Use this tool to keep them neat and verify they are free of syntax errors before deploying.</li>
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                     <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                </CardHeader>
                <CardContent>
                     <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                        <li><strong>Using Single Quotes:</strong> A developer accustomed to JavaScript objects might use single quotes for keys or strings. This is the most common validation error. JSON requires double quotes.</li>
                        <li><strong>The Dangling Comma:</strong> Forgetting to remove the comma after the last item in an object or array. This is valid in modern JavaScript but invalid in JSON.</li>
                        <li><strong>Unquoted Keys:</strong> Another common mistake from JavaScript developers. Object keys in JSON must be strings in double quotes.</li>
                        <li><strong>Mixing Data Types Incorrectly:</strong> Ensure numbers are not quoted (unless they should be treated as strings) and booleans are the literals `true` or `false` (not strings).</li>
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
              <Link href="/tools/base64-encoder-decoder" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Base64 Encoder / Decoder<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Encode your JSON into Base64 for safe transmission or decode a Base64 string to see the JSON inside.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
              <Link href="/tools/url-encoder-decoder" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">URL Encoder / Decoder<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">If you need to pass a JSON string as a URL parameter, you must URL-encode it first.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
              <Link href="/tools/code-minifier" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Code Minifier<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Minify your JSON to reduce its size for production use.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
          </div>
      </section>
      </div>
    </>
  );
}
