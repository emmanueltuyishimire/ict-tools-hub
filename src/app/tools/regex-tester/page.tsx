
import React from "react";
import { PageHeader } from "@/components/page-header";
import { StructuredData } from "@/components/structured-data";
import { RegexTester } from "./regex-tester";
import { faqSchemaData, howToSchema, keyTerminologies, faqData } from "./schema";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Lightbulb, AlertTriangle, BookOpen, ChevronRight, Wand } from 'lucide-react';
import Link from 'next/link';

const RegexTesterPage = () => {
  return (
    <>
      <StructuredData data={faqSchemaData} />
      <StructuredData data={howToSchema} />
      <div className="max-w-4xl mx-auto space-y-12">
        <PageHeader
            title="Regex Tester / Generator"
            description="Test your regular expressions against sample text in real-time. Our tool uses the JavaScript regex engine and provides match highlighting and detailed group information."
        />
        <RegexTester />

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use This Tool</h2>
          <Card className="prose prose-sm max-w-none text-foreground p-6">
              <p>This interactive tool helps you build, test, and debug regular expressions with instant visual feedback.</p>
              <ol>
                  <li><strong>Enter Your Pattern:</strong> Type your regex pattern into the "Regular Expression" field. Omit the leading and trailing slashes `/`.</li>
                  <li><strong>Set Flags:</strong> Select the flags you need. `g` (global) is essential to find all matches, not just the first one. `i` makes your pattern case-insensitive. `m` allows `^` and `$` to match the start/end of lines.</li>
                  <li><strong>Provide Your Text:</strong> Paste or type the string you want to test against in the "Test String" area.</li>
                  <li><strong>See the Results:</strong> The tool instantly highlights all matches in the test string. Below, a "Match Information" card appears, listing each match and any captured groups, along with their index in the string.</li>
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
                  <CardTitle className="text-primary">Educational Deep Dive: The Power of Pattern Matching</CardTitle>
              </div>
              <CardDescription>From simple searches to complex data extraction, understand the core concepts that make regular expressions an indispensable tool for developers.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
              <section>
                  <h3 className="font-bold text-xl">What are Regular Expressions?</h3>
                  <p>
                    A regular expression (or regex) is a mini-language for finding patterns in text. Instead of searching for a fixed, literal string like "hello", a regex lets you define a pattern to search for. For example, the pattern `h.llo` would match "hello", "hallo", and "hullo". They are used everywhere in programming: for validating user input (e.g., ensuring an email address looks valid), extracting data from log files, finding and replacing text in an editor, and rewriting URLs on a web server.
                  </p>
              </section>
              <section>
                  <h3 className="font-bold text-xl">Core Concepts</h3>
                  <p>Mastering regex involves understanding a few core building blocks:</p>
                  <ul className="list-disc pl-5">
                     <li><strong>Character Classes:</strong> Match one of a set of characters. `[aeiou]` matches any vowel. `\\d` matches any digit (0-9). `\\s` matches any whitespace character.</li>
                     <li><strong>Quantifiers:</strong> Control how many times something can match. `*` means "zero or more times", `+` means "one or more times", and `?` means "zero or one time". You can be more specific with curly braces, like `\\d{3}` to match exactly three digits.</li>
                     <li><strong>Anchors:</strong> Match a position, not a character. `^` matches the start of the string, and `$` matches the end. This is how you can ensure a pattern matches the entire string and not just a part of it.</li>
                     <li><strong>Groups:</strong> Parentheses `()` create a capture group. This lets you extract a portion of the match. For example, in the text "Email: test@example.com", the pattern `Email: (.*)` captures "test@example.com" into group 1.</li>
                  </ul>
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
                        <li><strong>Be Specific:</strong> The more specific your pattern, the less likely it is to have unintended matches. Use anchors (`^`, `$`) and word boundaries (`\\b`) to lock your pattern to specific positions.</li>
                        <li><strong>Use Non-Capturing Groups:</strong> If you need to group part of a pattern for a quantifier but don't need to capture the result, use a non-capturing group `(?:...)`. This is slightly more efficient.</li>
                        <li><strong>Build Incrementally:</strong> Don't try to write a complex regex all at once. Start with a small part of the pattern, get it working against your test string, and then gradually add more pieces.</li>
                        <li><strong>Escape Special Characters:</strong> If you need to match a character that has a special meaning in regex (like `.`, `*`, or `+`), you must escape it with a backslash `\\`. For example, to match a literal `.` character, use `\\.`.</li>
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                     <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                </CardHeader>
                <CardContent>
                     <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                        <li><strong>Greedy Matching:</strong> Forgetting that `*` and `+` are "greedy" and will match as much as possible. When matching HTML tags, a pattern like `&lt;.*&gt;` on `&lt;h1&gt;A&lt;/h1&gt;&lt;p&gt;B&lt;/p&gt;` will match the entire string. Use the lazy quantifier `&lt;.*?&gt;` to match just `&lt;h1&gt;` and `&lt;/h1&gt;`.</li>
                        <li><strong>Forgetting the Global Flag:</strong> A common source of confusion in code is when a regex only replaces the first occurrence of a pattern. This is because the `g` flag was omitted.</li>
                        <li><strong>Complex Email Validation:</strong> Trying to write a perfect, RFC-compliant regex for email validation. The official standard is incredibly complex. It's almost always better to use a simple regex to check the basic format and then verify the email by sending a confirmation link.</li>
                        <li><strong>Catastrophic Backtracking:</strong> Creating a regex with nested quantifiers like `(a*)*` can cause the engine to hang on certain strings. Avoid complex nested "star" or "plus" quantifiers where possible.</li>
                    </ul>
                </CardContent>
            </Card>
        </div>

        <section>
            <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Form Input Validation</h3>
                    <p className="text-sm text-muted-foreground">A developer needs to ensure that a username only contains letters, numbers, and underscores, and is between 3 and 16 characters long. They use the regex <code className="font-code bg-muted p-1 rounded-sm">^[a-zA-Z0-9_]&#123;3,16&#125;$</code> to instantly validate the input on the client-side before it's even sent to the server.</p>
                </div>
                <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Parsing Log Files</h3>
                    <p className="text-sm text-muted-foreground">A system administrator needs to find all error messages from a large server log. They use a regex like <code className="font-code bg-muted p-1 rounded-sm">^(\\d&#123;4&#125;-\\d&#123;2&#125;-\\d&#123;2&#125;).*ERROR: (.*)$</code> with the 'g' and 'm' flags. This allows them to capture the date (group 1) and the specific error message (group 2) from every line that contains "ERROR:", ignoring all other log entries.</p>
                </div>
                <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Code Refactoring (Find & Replace)</h3>
                    <p className="text-sm text-muted-foreground">A developer is refactoring code and needs to change all instances of a deprecated function `getUser(id)` to a new async function `fetchUser(&#123; id &#125;)`. They use a regex find-and-replace in their code editor. Find: <code className="font-code bg-muted p-1 rounded-sm">getUser\\((\\w+)\\)</code>. Replace: <code className="font-code bg-muted p-1 rounded-sm">fetchUser(&#123; id: $1 &#125;)</code>. This instantly updates hundreds of files correctly, saving hours of manual work.</p>
                </div>
                <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">URL Rewriting</h3>
                    <p className="text-sm text-muted-foreground">A webmaster wants to create user-friendly URLs. They want a URL like `/product/123` to be internally handled by the script `/products.php?id=123`. They configure their web server (like Apache or Nginx) with a rewrite rule that uses the regex <code className="font-code bg-muted p-1 rounded-sm">^/product/(\\d+)$</code> to capture the product ID and redirect the request server-side.</p>
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
                              <AccordionContent>{item.answer}</AccordionContent>
                          </AccordionItem>
                      ))}
                  </Accordion>
              </CardContent>
          </Card>
      </section>
      </div>
    </>
  );
};

export default RegexTesterPage;
