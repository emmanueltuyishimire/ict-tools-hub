
import React from 'react';
import { PageHeader } from '@/components/page-header';
import { VariableNameValidator } from './variable-name-validator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { BookOpen, AlertTriangle, Wand, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { faqData, howToSchema, keyTerminologies } from './schema';

export const metadata = {
    title: 'Variable Name Validator | JS, Python, Java, C++ | ICT Toolbench',
    description: 'Check if a variable name is valid for JavaScript, Python, Java, or C++. Our tool validates against language rules and reserved keywords, with a guide on best practices.',
    openGraph: {
        title: 'Variable Name Validator | ICT Toolbench',
        description: 'Instantly validate your variable names for multiple programming languages and learn about naming conventions like camelCase and snake_case.',
        url: '/tools/variable-name-validator',
    }
};

const VariableNameValidatorPage = () => {
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
    "name": "Variable Name Validator",
    "operatingSystem": "All",
    "applicationCategory": "DeveloperApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "A free online tool to validate variable names against the syntax rules and reserved keywords of JavaScript, Python, Java, and C++.",
    "url": "https://www.icttoolbench.com/tools/variable-name-validator"
  };

  return (
    <>
      <StructuredData data={faqSchema} />
      <StructuredData data={howToSchema} />
      <StructuredData data={softwareAppSchema} />
      <div className="max-w-4xl mx-auto space-y-12">
        <PageHeader
          title="Variable Name Validator"
          description="Check if your variable name is valid for JavaScript, Python, Java, or C++. Our tool validates against syntax rules and reserved keywords to help you write cleaner, error-free code."
        />
        
        <VariableNameValidator />

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use the Validator</h2>
          <Card className="prose prose-sm max-w-none text-foreground p-6">
              <p>This tool provides instant feedback on the validity of a variable name according to the rules of your chosen programming language.</p>
              <ol>
                  <li><strong>Enter a Variable Name:</strong> Type the name you want to check into the "Variable Name" input field.</li>
                  <li><strong>Select the Language:</strong> Choose the programming language (e.g., JavaScript, Python) you are working with from the dropdown menu. The validation rules will update accordingly.</li>
                  <li><strong>Review the Instant Result:</strong> The tool will immediately tell you if the name is "Valid" or "Invalid".</li>
                  <li><strong>Understand the Reason:</strong> If the name is invalid, the tool will provide a clear explanation, such as "Cannot start with a number" or "Is a reserved keyword". If valid, it will confirm it meets the language's syntax rules.</li>
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
                  <CardTitle className="text-primary">Educational Deep Dive: The Art of Naming</CardTitle>
              </div>
              <CardDescription>From syntax rules to team conventions, learn why choosing the right variable name is one of the most important skills in programming.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
              <section>
                  <h3>What Makes a Variable Name "Valid"?</h3>
                  <p>
                    Every programming language has a strict set of rules for what constitutes a valid identifier (the formal name for a variable, function, or class name). While the specifics vary, they generally follow a common pattern:
                  </p>
                  <ul className="list-disc pl-5">
                    <li><strong>Starting Character:</strong> Most languages require a variable to start with a letter (a-z, A-Z) or an underscore (_). JavaScript also allows a dollar sign ($). A variable can almost never start with a number.</li>
                    <li><strong>Subsequent Characters:</strong> After the first character, you can typically use letters, numbers, or underscores.</li>
                    <li><strong>Reserved Keywords:</strong> Every language has a set of "reserved keywords" that have a special meaning to the compiler or interpreter. Words like `if`, `for`, `while`, `class`, or `return` cannot be used as variable names. This tool checks your input against a list of reserved keywords for the selected language.</li>
                  </ul>
              </section>
              <section>
                  <h3>Beyond Validity: The Importance of Naming Conventions</h3>
                  <p>
                    A name can be syntactically valid but still be a "bad" name. Good naming is about clarity and communication. The name of a variable should describe its purpose. A variable named `x` is valid, but it tells you nothing. A variable named `userAge` or `customer_last_name` is instantly understandable. This is where naming conventions come in.
                  </p>
                    <ul className="list-disc pl-5">
                       <li><strong>camelCase:</strong> Used primarily in JavaScript and Java. The first word is lowercase, and subsequent words are capitalized (e.g., `firstName`, `calculateTotalAmount`).</li>
                        <li><strong>PascalCase:</strong> Also known as UpperCamelCase. Every word is capitalized. Used for class names in many object-oriented languages like Java and C# (e.g., `DatabaseConnection`, `UserPrompts`).</li>
                       <li><strong>snake_case:</strong> Used extensively in Python and for database column names. All words are lowercase and separated by underscores (e.g., `first_name`, `calculate_total_amount`).</li>
                       <li><strong>kebab-case:</strong> Uses hyphens to separate words (e.g., `first-name`). This is NOT valid for variable names in most languages but is the standard convention for CSS class names and URL slugs.</li>
                    </ul>
                    <p>Following the established convention for your language makes your code consistent and easier for other developers to read.</p>
              </section>
          </CardContent>
        </Card>

        <section>
            <h2 className="text-2xl font-bold mb-4">Real-Life Applications</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Collaborative Software Development</h3>
                    <p className="text-sm text-muted-foreground">In a team environment, developers are constantly reading each other's code. Using clear, descriptive variable names (`approvedUserList` instead of `data`) and adhering to a consistent naming convention (like camelCase in JavaScript) is critical. It reduces ambiguity and makes the codebase easier to navigate, speeding up development and reducing bugs caused by misunderstanding.</p>
                </div>
                <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Code Maintenance & Debugging</h3>
                    <p className="text-sm text-muted-foreground">A developer returns to a project six months later to fix a bug. If variables are named poorly (e.g., `temp`, `val`, `arr`), they must spend significant time re-learning the code's logic. If variables are named descriptively (`customerOrderHistory`, `itemsInCart`), the purpose of the code is self-evident, making it much faster to locate and fix the bug.</p>
                </div>
                <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Building a Public API</h3>
                    <p className="text-sm text-muted-foreground">When creating a public API, the names of fields in the JSON response become part of the public contract. Using a consistent and predictable convention (e.g., camelCase for a JavaScript-focused API) makes the API professional and easy for other developers to consume. A messy mix of naming styles would be confusing and look unprofessional.</p>
                </div>
                <div className="bg-card p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Onboarding New Developers</h3>
                    <p className="text-sm text-muted-foreground">A new hire joins a team. A codebase with self-documenting variable names allows them to get up to speed much more quickly. When they see a function called `calculateSalesTax(price, state)` that returns a value stored in a variable named `finalTaxAmount`, they can infer its purpose without needing to read extensive documentation or ask for help.</p>
                </div>
            </div>
        </section>
        
        <div className="grid md:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <div className='flex items-center gap-2'><Wand className="h-6 w-6 text-accent" /> <CardTitle>Pro Tips for Better Naming</CardTitle></div>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                        <li><strong>Be Descriptive, But Concise:</strong> `userName` is better than `u` or `theNameOfTheUser`.</li>
                        <li><strong>Use Nouns for Variables:</strong> Variables hold data, so they should be nouns (e.g., `customer`, `age`, `address`).</li>
                        <li><strong>Use Verbs for Functions:</strong> Functions perform actions, so they should be verbs (e.g., `getUser()`, `calculateTax()`, `saveToDatabase()`).</li>
                        <li><strong>Avoid Single-Letter Names:</strong> The only acceptable use for single-letter variables is typically as counters in short, simple loops (e.g., `for (let i = 0; ...)`).</li>
                        <li><strong>Don't Include the Data Type:</strong> Avoid names like `stringName` or `ageInt`. Modern languages and editors make it easy to see the type, so this is just redundant noise.</li>
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                     <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                </CardHeader>
                <CardContent>
                     <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                        <li><strong>Using Reserved Keywords:</strong> Trying to name a variable `class` in Java or `for` in Python will always result in a syntax error.</li>
                        <li><strong>Starting with a Number:</strong> `1stPlace` is an invalid variable name in all major languages.</li>
                        <li><strong>Using Hyphens:</strong> `first-name` is invalid for variables. The hyphen is interpreted as a minus sign. Use `firstName` or `first_name` instead.</li>
                        <li><strong>Inconsistent Casing:</strong> Mixing `camelCase` and `snake_case` in the same project makes the code jarring and hard to read. Stick to one convention.</li>
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
      </div>
    </>
  );
};

export default VariableNameValidatorPage;
