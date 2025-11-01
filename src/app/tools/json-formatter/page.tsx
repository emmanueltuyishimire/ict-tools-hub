
import { PageHeader } from '@/components/page-header';
import { JsonFormatter } from './json-formatter';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { Lightbulb, AlertTriangle, BookOpen, ChevronRight, Wand } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
    title: 'JSON Formatter & Validator | ICT Toolbench',
    description: 'Easily format, beautify, and validate your JSON data. Our online tool helps you debug and read complex JSON structures by making them clean and readable.',
    openGraph: {
        title: 'JSON Formatter & Validator | ICT Toolbench',
        description: 'Clean up and validate your JSON data instantly with our free online tool.',
        url: '/tools/json-formatter',
    }
};

const faqData = [
    { question: "What is JSON?", answer: "JSON (JavaScript Object Notation) is a lightweight data-interchange format that is easy for humans to read and write and easy for machines to parse and generate. It is based on a subset of JavaScript and is used ubiquitously for transmitting data between a server and a web application, as an alternative to XML." },
    { question: "Why do I need to format JSON?", answer: "JSON from APIs is often sent in a 'minified' format—a single line of text with all whitespace removed to save bandwidth. While efficient for machines, this is nearly impossible for a human to read. A formatter adds indentation and line breaks, turning the minified string into a readable, tree-like structure, which is essential for debugging and understanding the data." },
    { question: "What does it mean to 'validate' JSON?", answer: "Validation is the process of checking if a piece of text conforms to the strict syntax rules of the JSON format. This includes checking for correctly placed curly braces `{}`, square brackets `[]`, commas, colons, and ensuring that all strings are enclosed in double quotes. A single misplaced comma can make the entire JSON document invalid. This tool validates the JSON before attempting to format it." },
    { question: "What are the basic data types in JSON?", answer: "JSON supports six basic data types: strings (in double quotes), numbers, booleans (`true` or `false`), arrays (an ordered list of values in `[]`), objects (an unordered collection of key/value pairs in `{}`), and the special value `null`." },
    { question: "Can I use single quotes for strings in JSON?", answer: "No. The JSON standard is strict: all keys and string values must be enclosed in double quotes (`\"`). Using single quotes is a common mistake and will result in an invalid JSON document." },
    { question: "Can JSON have comments?", answer: "No, the official JSON standard does not support comments (like `//` or `/* */`). This was a design decision to keep the format simple and portable. If you paste JSON with comments into this tool, it will fail validation." },
    { question: "What is the difference between an object and an array in JSON?", answer: "An object, enclosed in `{}`, is a collection of key-value pairs (e.g., `{\"name\": \"John\"}`). An array, enclosed in `[]`, is an ordered list of values (e.g., `[\"apple\", \"banana\", \"cherry\"]`). Objects and arrays can be nested inside each other to create complex data structures." },
    { question: "Is it safe to paste sensitive data into this tool?", answer: "Yes. This tool operates entirely on the client-side within your browser. The data you paste is not sent to our servers or any third party, ensuring your information remains secure and private." },
];

const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Use the JSON Formatter and Validator',
    description: 'A step-by-step guide to cleaning up and validating your JSON data.',
    step: [
        { '@type': 'HowToStep', name: 'Paste Your JSON', text: 'Paste your raw or minified JSON string into the "Input JSON" text area.' },
        { '@type': 'HowToStep', name: 'Format and Validate', text: 'Click the "Format / Validate" button.' },
        { '@type': 'HowToStep', name: 'Review the Output', text: 'If your JSON is valid, a beautifully formatted, indented version will appear in the "Formatted JSON" output box. If it\'s invalid, a clear error message will be displayed explaining the problem (e.g., "Unexpected token..." or "Expected \',\'").' },
        { '@type': 'HowToStep', name: 'Copy the Result', text: 'Use the copy button to copy the clean JSON to your clipboard for use in your code or documentation.' },
    ],
    totalTime: 'PT1M'
};

const keyTerminologies = [
    { term: 'JSON (JavaScript Object Notation)', definition: 'A lightweight, text-based data-interchange format derived from JavaScript, used to represent structured data.' },
    { term: 'Object', definition: 'A collection of key/value pairs, enclosed in curly braces `{}`.' },
    { term: 'Array', definition: 'An ordered list of values, enclosed in square brackets `[]`.' },
    { term: 'Key-Value Pair', definition: 'The fundamental building block of a JSON object, consisting of a key (a string in double quotes) and a value.' },
    { term: 'Minification', definition: 'The process of removing all unnecessary whitespace from JSON to reduce its file size for efficient network transfer.' },
    { term: 'Validation', definition: 'The process of checking that a JSON string adheres to the strict syntax rules of the JSON format.' },
];

export default function JsonFormatterPage() {
  return (
    <>
      <StructuredData data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqData,
      }} />
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
                Whether you're dealing with a minified API response or writing your own configuration file, this tool makes working with JSON simple and error-free.
              </p>
              <ol>
                  <li>
                    <strong>Paste Your JSON:</strong> Copy your JSON data and paste it into the "Input JSON" area. It can be a single, unformatted line or a roughly structured document.
                  </li>
                  <li>
                    <strong>Format & Validate:</strong> Click the "Format / Validate" button. The tool will first check if the JSON is syntactically correct.
                  </li>
                  <li>
                    <strong>Review the Output:</strong>
                    <ul>
                        <li>If the JSON is <strong>valid</strong>, a clean, indented version will appear in the "Formatted JSON" box, making it easy to read and understand the data structure.</li>
                        <li>If the JSON is <strong>invalid</strong>, a specific error message will appear, telling you what's wrong and often pointing to the line and character where the error occurred.</li>
                    </ul>
                  </li>
                   <li>
                    <strong>Copy or Clear:</strong> Use the "Copy" button to grab the clean JSON, or the "Clear" button to start over.
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
                  <CardTitle className="text-primary">Educational Deep Dive: The JSON Syntax</CardTitle>
              </div>
              <CardDescription>From objects and arrays to the strict rules of its syntax, learn the fundamentals of the web's most popular data format.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
              <section>
                  <h3 className="font-bold text-xl">The Structure of JSON</h3>
                  <p>
                    JSON is built on two universal data structures:
                  </p>
                  <ul className="list-disc pl-5">
                     <li><strong>A collection of key/value pairs:</strong> In most programming languages, this is realized as an object, record, struct, dictionary, hash table, or associative array. In JSON, it's called an <strong>Object</strong> and is enclosed in curly braces `{}`.</li>
                     <li><strong>An ordered list of values:</strong> In most languages, this is realized as an array, vector, list, or sequence. In JSON, it's called an <strong>Array</strong> and is enclosed in square brackets `[]`.</li>
                  </ul>
              </section>
              <section>
                  <h3 className="font-bold text-xl">The Strict Rules of Validation</h3>
                  <p>While JSON looks like JavaScript, it has a much stricter syntax which this tool enforces:</p>
                    <ul className="list-disc pl-5">
                       <li><strong>Keys must be strings in double quotes:</strong> `{"key": "value"}` is valid. `{key: "value"}` is invalid.</li>
                       <li><strong>String values must be in double quotes:</strong> `{"key": "value"}` is valid. `{"key": 'value'}` is invalid.</li>
                       <li><strong>No trailing commas:</strong> A comma after the last element in an object or array is forbidden. `{"a":1, "b":2,}` is invalid.</li>
                       <li><strong>No comments:</strong> Comments are not part of the JSON specification.</li>
                    </ul>
                  <p>These strict rules ensure that JSON is simple, unambiguous, and can be parsed consistently by any programming language, making it an ideal format for data exchange.</p>
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
                        <li><strong>Debug API Responses:</strong> When you get an unexpected response from an API, paste it here. Formatting it will make the structure clear and help you find the data you need.</li>
                        <li><strong>Create Test Data:</strong> Quickly draft and format JSON here to use as mock data for your application's frontend or tests.</li>
                        <li><strong>Convert from a JS Object:</strong> If you have a JavaScript object literal in your code, you can often paste it here and fix the minor syntax differences (e.g., add quotes to keys) to turn it into valid JSON.</li>
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                     <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                </CardHeader>
                <CardContent>
                     <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                        <li><strong>Using Single Quotes:</strong> The most common error. JavaScript allows single quotes for strings, but JSON does not. All strings and keys must use double quotes.</li>
                        <li><strong>Trailing Commas:</strong> Adding a comma after the last item in a list or object. While some JavaScript environments allow this, it is strictly forbidden in JSON.</li>
                        <li><strong>Unquoted Keys:</strong> In JavaScript, you can write `{ name: "John" }`. In JSON, you must write `{ "name": "John" }`.</li>
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
                          <CardDescription className="text-xs">For encoding binary data, which can then be embedded as a string in a JSON object.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
              <Link href="/tools/url-encoder-decoder" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">URL Encoder / Decoder<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">If you need to pass a JSON string as a parameter in a URL, it must be URL-encoded.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
              <Link href="/tools/code-minifier" className="block">
                  <Card className="hover:border-primary transition-colors h-full">
                      <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">Code Minifier<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                          <CardDescription className="text-xs">Minify your formatted JSON to reduce file size for production use.</CardDescription>
                      </CardHeader>
                  </Card>
              </Link>
          </div>
      </section>
      </div>
    </>
  );
}
