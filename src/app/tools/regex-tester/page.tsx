
import { PageHeader } from '@/components/page-header';
import { RegexTester } from './regex-tester';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { Lightbulb, AlertTriangle, BookOpen, ChevronRight, Wand } from 'lucide-react';

export const metadata = {
    title: 'Regex Tester & Generator | ICT Toolbench',
    description: 'Test your regular expressions in real-time. Our online regex tester supports JavaScript syntax and highlights matches, groups, and provides detailed match information.',
    openGraph: {
        title: 'Regex Tester & Generator | ICT Toolbench',
        description: 'A real-time JavaScript regex tester with syntax highlighting, match explanations, and a quick reference cheat sheet.',
        url: '/tools/regex-tester',
    }
};

const faqData = [
    { question: "What is a regular expression (regex)?", answer: "A regular expression is a sequence of characters that specifies a search pattern. It's a powerful tool used in programming and text editing to find, match, and manage text. For example, the regex `\\d+` will match one or more digits in a string." },
    { question: "Is this tool safe to use?", answer: "Yes. All processing, including regex matching and highlighting, is done entirely on your computer (client-side) using JavaScript. Your text and patterns are never sent to any server." },
    { question: "What regex engine does this tool use?", answer: "This tool uses the JavaScript regular expression engine, which is built into your web browser. The syntax and behavior will match what you would expect when using regex in JavaScript code. It supports modern features like lookaheads, lookbehinds, and named capture groups." },
    { question: "What do the `g`, `i`, and `m` flags do?", answer: "`g` (Global): Finds all matches instead of stopping after the first one. `i` (Case-insensitive): Ignores case when matching (e.g., 'a' will match 'A'). `m` (Multiline): Allows the `^` and `$` anchors to match the start and end of individual lines within the text, not just the start and end of the whole string." },
    { question: "What is a 'capture group'?", answer: "A capture group is a part of a regex pattern enclosed in parentheses `()`. It 'captures' the portion of the string that matches the pattern inside the parentheses. This allows you to extract specific sub-strings from a larger match. For example, in the date `2024-10-26`, the regex `(\\d{4})-(\\d{2})-(\\d{2})` has three capture groups to extract the year, month, and day separately." },
    { question: "What is the difference between greedy and lazy matching?", answer: "By default, quantifiers like `*` and `+` are 'greedy,' meaning they match as much text as possible. For example, in `<h1>title</h1>`, the regex `<.*>` would match the entire string from the first `<` to the last `>`. By making a quantifier 'lazy' with a `?` (e.g., `<.*?>`), it matches as little text as possible, correctly matching `<h1>` and `</h1>` separately." },
    { question: "How can I use this tool to build a regex?", answer: "Start with a simple pattern and a sample test string. Gradually add more complexity to your regex, observing how the matches change in real-time. The instant feedback loop is the best way to learn and build complex patterns." },
    { question: "Why is my regex causing the page to freeze?", answer: "This can happen due to a phenomenon called 'catastrophic backtracking.' It occurs with poorly written regexes that have nested quantifiers and multiple paths to a match. When a match fails, the engine has to backtrack through an exponentially large number of possibilities, causing it to hang. A common example is `(a*)*$`. Be careful with nested quantifiers." },
];

const faqSchemaData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData
};

const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Use the Regex Tester',
    description: 'A step-by-step guide to testing and debugging your regular expressions.',
    step: [
        { '@type': 'HowToStep', name: 'Enter Regex Pattern', text: 'In the "Regular Expression" field, type your pattern. You don\'t need to include the starting and ending slashes (e.g., use `\\d+`, not `/\\d+/`).' },
        { '@type': 'HowToStep', name: 'Select Flags', text: 'Choose the regex flags you need, such as `g` for global search or `i` for case-insensitive matching.' },
        { '@type': 'HowToStep', name: 'Provide Test String', text: 'In the "Test String" field, enter the text you want to test your regex against.' },
        { '@type': 'HowToStep', name: 'Analyze Results', text: 'The tool will update in real-time. Matches will be highlighted in the test string. A "Match Information" card will appear, listing all the found matches and any capture groups within them.' },
    ],
    totalTime: 'PT2M'
};

const keyTerminologies = [
    { term: 'Literal', definition: 'An ordinary character in a regex that matches itself (e.g., `a` matches "a").' },
    { term: 'Metacharacter', definition: 'A character with a special meaning, like `.` (matches any character) or `*` (matches zero or more times).' },
    { term: 'Quantifier', definition: 'Specifies how many times a character or group must appear (e.g., `+` for one or more, `{2,4}` for two to four).' },
    { term: 'Anchor', definition: 'A token that matches a position, not a character (e.g., `^` for start of string, `$` for end of string).' },
    { term: 'Character Class', definition: 'A set of characters to match, enclosed in square brackets `[]` (e.g., `[aeiou]` matches any vowel).' },
    { term: 'Capture Group', definition: 'A part of the pattern enclosed in parentheses `()` that captures the matched substring for later use or extraction.' },
];

export default function RegexTesterPage() {
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
                        <li><strong>Greedy Matching:</strong> Forgetting that `*` and `+` are "greedy" and will match as much as possible. When matching HTML tags, a pattern like `<.*>` on `<h1>A</h1><p>B</p>` will match the entire string. Use the lazy quantifier `<.*?>` to match just `<h1>` and `</h1>`.</li>
                        <li><strong>Forgetting the Global Flag:</strong> A common source of confusion in code is when a regex only replaces the first occurrence of a pattern. This is because the `g` flag was omitted.</li>
                        <li><strong>Complex Email Validation:</strong> Trying to write a perfect, RFC-compliant regex for email validation. The official standard is incredibly complex. It's almost always better to use a simple regex to check the basic format and then verify the email by sending a confirmation link.</li>
                        <li><strong>Catastrophic Backtracking:</strong> Creating a regex with nested quantifiers like `(a*)*` can cause the engine to hang on certain strings. Avoid complex nested "star" or "plus" quantifiers where possible.</li>
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
    </>
  );
}
